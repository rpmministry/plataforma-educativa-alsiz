import React, { useState, useEffect } from 'react';
import { DailyClass, Subject } from '../../types';
import { formatYouTubeEmbedUrl, getYouTubeWatchUrl, getYouTubeSearchUrl } from '../../utils/youtube';
import { ttsService } from '../../services/ttsService';
import {
  Tv,
  ExternalLink,
  Search,
  RefreshCw,
  Play,
  Pause,
  StopCircle,
  Volume2,
  Sparkles,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ListVideo,
  Radio,
  Share2,
} from 'lucide-react';

interface ClassVideoPlayerProps {
  currentClass: DailyClass;
  subject?: Subject;
  onActivitySelect?: (activityId: string) => void;
}

export const ClassVideoPlayer: React.FC<ClassVideoPlayerProps> = ({
  currentClass,
  subject,
}) => {
  const [playerTab, setPlayerTab] = useState<'video' | 'interactive' | 'channels'>('video');
  const [videoUrlOverride, setVideoUrlOverride] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [showCustomBar, setShowCustomBar] = useState(false);

  // Interactive slide & speech synthesis state (narración SOLO manual: nunca se reproduce sola)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPausedNarration, setIsPausedNarration] = useState(false);

  const activeVideoUrl = videoUrlOverride || currentClass.videoUrl;
  const isEnglishSubject = subject?.id?.startsWith('ing') || subject?.name?.toLowerCase().includes('inglés');
  const searchQuery = `${subject?.name || 'Educación'} ${currentClass.theme} explicación clase`;

  // Define curated alternative video sources based on the subject
  const alternativeSources = isEnglishSubject
    ? [
        { label: 'Opción 1: BBC Learning English', q: `BBC Learning English ${currentClass.theme}` },
        { label: 'Opción 2: Oxford Online English', q: `Oxford Online English ${currentClass.theme}` },
        { label: 'Opción 3: Learn English with Emma / engVid', q: `engVid ${currentClass.theme}` },
        { label: 'Opción 4: British Council', q: `British Council LearnEnglish ${currentClass.theme}` },
      ]
    : subject?.id?.startsWith('mat') || subject?.name?.toLowerCase().includes('matemática')
    ? [
        { label: 'Opción 1: Daniel Carreón', q: `Daniel Carreón ${currentClass.theme}` },
        { label: 'Opción 2: Profe Alex', q: `Profe Alex ${currentClass.theme}` },
        { label: 'Opción 3: Khan Academy Español', q: `Khan Academy Español ${currentClass.theme}` },
        { label: 'Opción 4: JulioProfe', q: `JulioProfe ${currentClass.theme}` },
      ]
    : subject?.id?.startsWith('sci') || subject?.name?.toLowerCase().includes('ciencias')
    ? [
        { label: 'Opción 1: Happy Learning Español', q: `Happy Learning Español ${currentClass.theme}` },
        { label: 'Opción 2: CuriosaMente', q: `CuriosaMente ${currentClass.theme}` },
        { label: 'Opción 3: Smile and Learn', q: `Smile and Learn ${currentClass.theme}` },
        { label: 'Opción 4: TED-Ed Español', q: `TED-Ed Español ${currentClass.theme}` },
      ]
    : [
        { label: 'Opción 1: Academia Play', q: `Academia Play ${currentClass.theme}` },
        { label: 'Opción 2: CuriosaMente', q: `CuriosaMente ${currentClass.theme}` },
        { label: 'Opción 3: La Eduteca', q: `La Eduteca ${currentClass.theme}` },
        { label: 'Opción 4: Bully Magnets', q: `Bully Magnets ${currentClass.theme}` },
      ];

  // Slides structure for the interactive multimedia classroom with Socratic method and practical evidence
  const slides = [
    {
      title: '1. Introducción y Objetivo de Aprendizaje',
      badge: 'Objetivo Principal',
      content: currentClass.introduction || 'Bienvenido a esta lección interactiva. Explora los conceptos fundamentales a tu propio ritmo.',
      highlight: currentClass.objective ? `🎯 Objetivo de la clase: ${currentClass.objective}` : 'Aprender con profundidad. Avanzar con propósito.',
      speechText: `Lección de ${subject?.name || 'la materia'}: ${currentClass.theme}. Objetivo: ${currentClass.objective}. ${currentClass.introduction || ''}`,
    },
    {
      title: '2. Contenido Teórico y Conceptos Clave',
      badge: 'Guía Pedagógica',
      content: currentClass.reading || 'Revisa la lectura detallada de la clase en tu cuaderno o guía descargable.',
      highlight: currentClass.unit ? `Unidad: ${currentClass.unit} • Desarrollo conceptual` : 'Desarrollo conceptual',
      speechText: `Paso 2: Desarrollo conceptual de ${currentClass.theme}. ${currentClass.reading?.substring(0, 300) || currentClass.theme}`,
    },
    {
      title: '3. Preguntas de Pensamiento y Reflexión',
      badge: 'Método Socrático',
      content: currentClass.socraticQuestions?.length
        ? currentClass.socraticQuestions.map((q, idx) => `💬 Pregunta ${idx + 1}: ${q}`).join('\n\n')
        : 'Reflexiona sobre cómo aplicar lo aprendido hoy en situaciones reales.',
      highlight: currentClass.reflectionPrompt || '¿Qué fue lo más significativo que aprendiste hoy y cómo lo aplicarías en tu día a día?',
      speechText: currentClass.socraticQuestions?.length
        ? `Preguntas de reflexión socrática: ${currentClass.socraticQuestions.join('. ')}`
        : currentClass.reflectionPrompt || 'Reflexiona sobre lo aprendido.',
    },
    {
      title: '4. Taller Práctico y Tarea del Día',
      badge: 'Actividad Guiada',
      content: currentClass.activities?.length
        ? currentClass.activities.map((a, idx) => `• Actividad ${idx + 1}: ${a.title} - ${a.description}`).join('\n\n')
        : 'Realiza los ejercicios prácticos en tu libreta de evidencias.',
      highlight: currentClass.homeworkTask || 'Completa tu tarea diaria en la libreta.',
      speechText: `Paso 4: Taller práctico de la lección. Consigna: ${currentClass.homeworkTask || 'Completa tus ejercicios en la libreta de evidencias.'}`,
    },
  ];

  // Cleanup speech when unmounting or changing slide/class
  useEffect(() => {
    return () => {
      ttsService.stop();
      setIsSpeaking(false);
      setIsPausedNarration(false);
    };
  }, [currentClass.id, currentSlideIndex]);

  const handleSpeak = (text: string) => {
    if (isSpeaking && isPausedNarration) {
      ttsService.resume();
      setIsPausedNarration(false);
      return;
    }
    if (isSpeaking) {
      ttsService.pause();
      return;
    }

    const teacherName = subject?.teacher?.name || '';
    ttsService.play({
      messageId: `video-${currentClass.id}-${currentSlideIndex}`,
      text,
      teacherName,
      onEnd: () => { setIsSpeaking(false); setIsPausedNarration(false); },
      onPause: () => { setIsPausedNarration(true); },
      onPlay: () => { setIsSpeaking(true); setIsPausedNarration(false); },
    });
  };

  const handleStopSpeech = () => {
    ttsService.stop();
    setIsSpeaking(false);
    setIsPausedNarration(false);
  };

  return (
    <div className="rounded-2xl bg-slate-800/70 border border-slate-700/70 overflow-hidden shadow-xl space-y-0">
      {/* Top Header & Mode Navigation Tabs */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-700/70 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Centro Multimedia & Video de la Clase
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                100% Disponible
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Tema: <span className="text-slate-200 font-medium">{currentClass.theme}</span>
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs max-w-full overflow-x-auto overscroll-x-contain touch-scroll-x scrollbar-none">
          <button
            onClick={() => {
              handleStopSpeech();
              setPlayerTab('video');
            }}
            className={`px-3 py-1.5 min-h-[40px] shrink-0 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              playerTab === 'video'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Video YouTube</span>
          </button>

          <button
            onClick={() => {
              setPlayerTab('interactive');
            }}
            className={`px-3 py-1.5 min-h-[40px] shrink-0 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              playerTab === 'interactive'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Clase con Voz</span>
          </button>

          <button
            onClick={() => {
              handleStopSpeech();
              setPlayerTab('channels');
            }}
            className={`px-3 py-1.5 min-h-[40px] shrink-0 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
              playerTab === 'channels'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ListVideo className="w-3.5 h-3.5" />
            <span>Fuentes & Canales</span>
          </button>
        </div>
      </div>

      {/* TAB 1: YOUTUBE VIDEO PLAYER WITH DIRECT WATCH ACTIONS */}
      {playerTab === 'video' && (
        <div className="p-4 sm:p-6 space-y-4">
          {/* Active Player Box */}
          <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl relative">
            <iframe
              src={formatYouTubeEmbedUrl(activeVideoUrl || 'https://www.youtube.com/embed/')}
              title={`Video Didáctico: ${currentClass.theme}`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Quick Troubleshooting & Action Banner */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Radio className="w-3.5 h-3.5 animate-pulse text-rose-400" />
                <span>¿El video integrado muestra "No disponible" o restricción del navegador?</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Puedes abrirlo directamente en la web de YouTube o usar una de las fuentes certificadas:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <a
                href={getYouTubeWatchUrl(activeVideoUrl, searchQuery)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-900/30 transition-all text-center"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ver en YouTube Oficial</span>
              </a>

              <a
                href={getYouTubeSearchUrl(searchQuery)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-900/30 transition-all text-center"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Buscar Videos del Tema</span>
              </a>

              <button
                onClick={() => setPlayerTab('interactive')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-bold transition-all text-center"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Activar Modo con Voz</span>
              </button>
            </div>
          </div>

          {/* Alternative Quick Source Selector */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <ListVideo className="w-3.5 h-3.5 text-indigo-400" />
                <span>Alternar Fuente de Video / Canales Oficiales:</span>
              </span>
              <button
                onClick={() => setShowCustomBar(!showCustomBar)}
                className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1"
              >
                <Search className="w-3 h-3" />
                <span>{showCustomBar ? 'Ocultar buscador manual' : 'Pegar enlace o ID de YouTube'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {alternativeSources.map((src, idx) => (
                <a
                  key={idx}
                  href={getYouTubeSearchUrl(src.q)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600/30 border border-slate-700 hover:border-indigo-500/50 text-xs text-slate-200 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <Play className="w-2.5 h-2.5 text-rose-400" />
                  <span>{src.label}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                </a>
              ))}
            </div>

            {/* Custom URL Input Bar */}
            {showCustomBar && (
              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Pega un enlace de YouTube (ej. https://www.youtube.com/watch?v=...)"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-850 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => {
                    if (customInput.trim()) {
                      setVideoUrlOverride(customInput.trim());
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
                >
                  Cargar
                </button>
                {videoUrlOverride && (
                  <button
                    onClick={() => {
                      setVideoUrlOverride(null);
                      setCustomInput('');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs transition-all"
                    title="Restablecer video predeterminado"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE GUIDED AUDIOVISUAL CLASSROOM WITH VOICE */}
      {playerTab === 'interactive' && (
        <div className="p-4 sm:p-6 space-y-4">
          {/* Slide Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950/40 border border-indigo-500/30 shadow-2xl relative space-y-4 min-h-[300px] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {slides[currentSlideIndex].badge} • Diapositiva {currentSlideIndex + 1} de {slides.length}
                </span>

                {/* Audio Narration Bar — controles manuales siempre disponibles durante la reproducción */}
                <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-700">
                  <button
                    onClick={() => handleSpeak(slides[currentSlideIndex].speechText)}
                    className={`flex items-center gap-1.5 px-3 py-1 min-h-[40px] rounded-lg text-xs font-bold transition-all active:scale-95 ${
                      isSpeaking && !isPausedNarration
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {isSpeaking && !isPausedNarration ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? (isPausedNarration ? 'Reanudar Narración' : 'Pausar Narración') : 'Escuchar Clase con Voz'}</span>
                  </button>

                  {isSpeaking && (
                    <button
                      onClick={handleStopSpeech}
                      className="flex items-center gap-1 px-2.5 py-1 min-h-[36px] rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold transition-all active:scale-95"
                      title="Detener voz"
                    >
                      <StopCircle className="w-3.5 h-3.5" />
                      <span>DETENER</span>
                    </button>
                  )}
                </div>
              </div>

              <h4 className="text-lg font-bold text-white tracking-tight">
                {slides[currentSlideIndex].title}
              </h4>

              {slides[currentSlideIndex].highlight && (
                <div className="p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-200 text-xs leading-relaxed font-medium">
                  💡 <span className="font-semibold text-white">Punto Clave:</span> {slides[currentSlideIndex].highlight}
                </div>
              )}

              <div className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto overscroll-contain pr-2 custom-scrollbar">
                {slides[currentSlideIndex].content}
              </div>
            </div>

            {/* Navigation Buttons for slides */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
              <button
                onClick={() => {
                  handleStopSpeech();
                  setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
                }}
                disabled={currentSlideIndex === 0}
                className="px-3.5 py-1.5 min-h-[44px] rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition-all touch-lift"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleStopSpeech();
                      setCurrentSlideIndex(idx);
                    }}
                    aria-label={`Ir a la diapositiva ${idx + 1}`}
                    className="relative p-2.5 -m-1 rounded-full after:absolute after:-inset-1 after:content-['']"
                  >
                    <span
                      className={`block w-2.5 h-2.5 rounded-full transition-all ${
                        currentSlideIndex === idx
                          ? 'bg-indigo-400 scale-125'
                          : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  handleStopSpeech();
                  setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
                }}
                disabled={currentSlideIndex === slides.length - 1}
                className="px-3.5 py-1.5 min-h-[44px] rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md touch-lift"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            🎙️ Este modo interactivo sintetiza la explicación pedagógica directamente en tu dispositivo sin depender de servidores externos.
          </p>
        </div>
      )}

      {/* TAB 3: CHANNELS & CURATED KNOWLEDGE SOURCES */}
      {playerTab === 'channels' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Canales y Recursos Didácticos Oficiales Recomendados</span>
            </h4>
            <p className="text-xs text-slate-400">
              Explora lecciones de este tema producidas por las mejores instituciones educativas del mundo:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {alternativeSources.map((src, idx) => (
              <a
                key={idx}
                href={getYouTubeSearchUrl(src.q)}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-700/80 hover:border-indigo-500/60 transition-all flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {src.label}
                  </span>
                  <p className="text-[11px] text-slate-400">
                    Buscar: "{src.q}"
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-rose-600 transition-all">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

          {/* Quick Direct YouTube Search Input */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700 space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Búsqueda Libre en YouTube para este tema:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                defaultValue={searchQuery}
                id="search-query-field"
                className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => {
                  const input = document.getElementById('search-query-field') as HTMLInputElement;
                  if (input && input.value) {
                    window.open(getYouTubeSearchUrl(input.value), '_blank');
                  }
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Buscar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
