import React, { useEffect, useRef, useState } from 'react';
import { DailyClass, MicroLesson, Student, Subject } from '../../types';
import { requestLessonBite, requestReExplanation } from '../../services/aiService';
import { getWorldDecor, getWorldTheme } from '../../utils/studentTheme';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  FlaskConical,
  HelpCircle,
  Lightbulb,
  Loader2,
  RotateCcw,
  Sparkles,
  XCircle,
  GraduationCap,
} from 'lucide-react';

interface MicroLessonPlayerProps {
  dailyClass: DailyClass;
  subject: Subject;
  student: Student;
  onGoToLab: () => void;
  onStepsResolved?: (steps: { title: string; text: string }[]) => void;
  /** Índices de micro-lecciones ya superadas (estado persistente del progreso). */
  cleared: number[];
  onMarkCleared: (index: number) => void;
  onResetRoute: () => void;
  onRouteComplete?: () => void;
}

type BiteState = { status: 'loading' } | { status: 'failed' } | { status: 'ready'; lesson: MicroLesson };
type AiHelp = { status: 'idle' | 'loading' | 'ready' | 'failed'; text: string | null };

export const MICRO_TOTAL = 3;
const OPTION_LETTERS = ['A', 'B', 'C'];

const firstUnclearedIndex = (arr: number[]) => {
  for (let i = 0; i < MICRO_TOTAL; i++) if (!arr.includes(i)) return i;
  return MICRO_TOTAL - 1;
};

// Contenido de respaldo determinista: el learningPath ya redactado de la clase.
const fallbackLesson = (dailyClass: DailyClass, i: number): MicroLesson => {
  const stage = (dailyClass.learningPath || [])[i];
  const cc = stage?.coreConcept;
  return {
    id: `micro-${dailyClass.id}-L${i + 1}-fb`,
    title: stage?.title ? stage.title.replace(/^Paso\s*\d+\s*[:\-—]\s*/i, '') : `Concepto fundamental de ${dailyClass.theme} (${i + 1})`,
    theory: [cc?.summary, cc?.detailedExplanation].filter(Boolean).join(' ') || `Hoy exploramos una parte esencial de "${dailyClass.theme}". Avanza con tu profesor virtual en este concepto socrático.`,
    analogy: cc?.visualAnalogy,
    example: Array.isArray(cc?.keyTakeaways) ? cc.keyTakeaways.slice(0, 2).join(' · ') : undefined,
    quiz: null,
  };
};

export const MicroLessonPlayer: React.FC<MicroLessonPlayerProps> = ({
  dailyClass,
  subject,
  student,
  onGoToLab,
  onStepsResolved,
  cleared,
  onMarkCleared,
  onResetRoute,
  onRouteComplete,
}) => {
  const theme = getWorldTheme(student);
  const world = getWorldDecor(student);
  const teacher = subject.teacher;

  const [lessonIndex, setLessonIndex] = useState(0);
  const [bites, setBites] = useState<Record<number, BiteState>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [aiHelp, setAiHelp] = useState<AiHelp>({ status: 'idle', text: null });
  const [wrongCount, setWrongCount] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [finished, setFinished] = useState(false);
  const requestingRef = useRef<Set<number>>(new Set());
  const aiCallsRef = useRef<Record<number, number>>({});

  const view = (i: number): MicroLesson => {
    const b = bites[i];
    if (b?.status === 'ready') return b.lesson;
    return fallbackLesson(dailyClass, i);
  };

  const ensureBite = async (i: number, force = false) => {
    if (i < 0 || i >= MICRO_TOTAL) return;
    if (!force && (bites[i] || requestingRef.current.has(i))) return;
    requestingRef.current.add(i);
    setBites((prev) => ({ ...prev, [i]: { status: 'loading' } }));
    const covered = Array.from({ length: i }, (__, k) => view(k)).map((l) => l.title).filter(Boolean);
    const lesson = await requestLessonBite({
      student,
      teacher,
      subject,
      dailyClass,
      index: i + 1,
      total: MICRO_TOTAL,
      covered,
    });
    requestingRef.current.delete(i);
    setBites((prev) => ({ ...prev, [i]: lesson ? { status: 'ready', lesson } : { status: 'failed' } }));
  };

  useEffect(() => {
    setBites({});
    setLessonIndex(firstUnclearedIndex(cleared));
    setSelectedOption(null);
    setReviewOpen(false);
    setAiHelp({ status: 'idle', text: null });
    setWrongCount(0);
    setFinished(false);
    requestingRef.current = new Set();
    aiCallsRef.current = {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dailyClass?.id, student?.id, subject?.id]);

  useEffect(() => {
    void ensureBite(lessonIndex);
    void ensureBite(lessonIndex + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonIndex, dailyClass?.id, bites]);

  const lesson = view(lessonIndex);

  useEffect(() => {
    if (!onStepsResolved) return;
    const allSettled = Array.from({ length: MICRO_TOTAL }).every((_, i) => bites[i] && bites[i].status !== 'loading');
    if (!allSettled) return;
    const steps = Array.from({ length: MICRO_TOTAL }).map((_, i) => {
      const l = view(i);
      return { title: l.title, text: [l.theory, l.analogy, l.example].filter(Boolean).join(' ') };
    });
    onStepsResolved(steps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bites, dailyClass?.id, subject?.id]);

  const quiz = lesson.quiz;
  const answered = selectedOption !== null;
  const isCorrect = answered && !!quiz && selectedOption === quiz.correctIndex;
  const isLast = lessonIndex >= MICRO_TOTAL - 1;
  const canAdvance = !quiz || cleared.includes(lessonIndex);
  const maxUnlocked = canAdvance ? Math.min(lessonIndex + 1, MICRO_TOTAL - 1) : lessonIndex;

  const goTo = (i: number) => {
    if (i < 0 || i >= MICRO_TOTAL || i > maxUnlocked) return;
    setLessonIndex(i);
    setSelectedOption(null);
    setReviewOpen(false);
    setAiHelp({ status: 'idle', text: null });
  };

  const handleAnswer = (i: number) => {
    if (selectedOption !== null || !quiz) return;
    setSelectedOption(i);
    const correctText = quiz.options[quiz.correctIndex];
    if (i === quiz.correctIndex) {
      setCelebrate(true);
      window.setTimeout(() => setCelebrate(false), 1600);
      setReviewOpen(false);
      onMarkCleared(lessonIndex);
      return;
    }
    setWrongCount((w) => w + 1);
    setCelebrate(false);
    setReviewOpen(true);
    if (!aiCallsRef.current[lessonIndex]) {
      aiCallsRef.current[lessonIndex] = 1;
      setAiHelp({ status: 'loading', text: null });
      requestReExplanation({
        student,
        teacher,
        subject,
        dailyClass,
        explanation: {
          theory: lesson.theory,
          analogy: lesson.analogy,
          example: lesson.example,
          question: quiz.question,
          correctAnswer: correctText,
        },
      })
        .then((text) => setAiHelp(text ? { status: 'ready', text } : { status: 'failed', text: null }))
        .catch(() => setAiHelp({ status: 'failed', text: null }));
    }
  };

  const retryQuiz = () => {
    setSelectedOption(null);
  };

  const handleContinue = () => {
    if (isLast) {
      setFinished(true);
      return;
    }
    goTo(lessonIndex + 1);
  };

  const correctText = quiz ? quiz.options[quiz.correctIndex] : '';
  const correctLetter = quiz ? OPTION_LETTERS[quiz.correctIndex] : '';
  const routeCompleted = (isLast && answered && isCorrect) || finished;

  useEffect(() => {
    if (routeCompleted) onRouteComplete?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeCompleted]);

  const restart = () => {
    setFinished(false);
    setReviewOpen(false);
    setSelectedOption(null);
    setAiHelp({ status: 'idle', text: null });
    setWrongCount(0);
    setLessonIndex(0);
    aiCallsRef.current = {};
    onResetRoute();
  };

  const bite = bites[lessonIndex];
  const quizPreparing = !!bite && bite.status !== 'ready' && !quiz;

  return (
    <div className="rounded-3xl border border-[#27272A] bg-[#18181B] shadow-xl overflow-hidden relative">
      {/* Indicador sutil de verificación */}
      {celebrate && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-fade-in flex items-center gap-1.5 shadow-lg">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>¡Respuesta correcta verificada!</span>
        </div>
      )}

      {/* Cabecera de la Lección Socrática */}
      <div className="p-5 sm:p-6 border-b border-[#27272A] bg-gradient-to-r from-[#18181B] via-[#1E1E22] to-[#18181B]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Fase 01 · Lección Socrática Guiada
              </span>
              <span className="text-xs text-[#A1A1AA] truncate">
                {dailyClass.theme}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
              {lesson.title}
            </h2>
          </div>

          <div className="sm:text-right shrink-0">
            <span className="text-xs font-mono font-bold text-amber-400">
              Micro-lección {Math.min(lessonIndex + 1, MICRO_TOTAL)} de {MICRO_TOTAL}
            </span>
            <span className="text-[10px] uppercase font-semibold text-[#71717A] block">
              Paso guiado con tutor IA
            </span>
          </div>
        </div>

        {/* Barra de progreso de micro-lecciones */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {Array.from({ length: MICRO_TOTAL }).map((__, i) => {
            const isCleared = cleared.includes(i) || i < lessonIndex;
            const isCurrent = i === lessonIndex;
            return (
              <div key={i} className="space-y-1">
                <div className="h-1.5 w-full rounded-full bg-[#27272A] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: isCleared ? '100%' : isCurrent ? (answered ? '100%' : '50%') : '0%',
                      background: isCleared ? '#10B981' : isCurrent ? '#E0A82E' : 'transparent',
                    }}
                  />
                </div>
                <span className="text-[9px] font-mono block text-[#71717A]">
                  Paso 0{i + 1} {isCleared ? '✓' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cuerpo Académico */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Ficha Teórica Principal */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#121215] border border-[#27272A] space-y-4">
          <div className="flex items-center justify-between gap-2 border-b border-[#27272A] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Fundamento Conceptual</span>
            </span>
            {bite?.status === 'loading' && (
              <span className="text-xs text-[#A1A1AA] inline-flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>{teacher?.name} prepara el reto socrático…</span>
              </span>
            )}
          </div>

          <p className="text-[15px] sm:text-base text-zinc-200 leading-relaxed font-normal whitespace-pre-line">
            {lesson.theory}
          </p>

          {/* Analogía Socrática */}
          {lesson.analogy && (
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                  Analogía Didáctica
                </span>
                <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                  {lesson.analogy}
                </p>
              </div>
            </div>
          )}

          {/* Ejemplo Práctico */}
          {lesson.example && (
            <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300 block">
                  Ejemplo en la Realidad
                </span>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {lesson.example}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Explicación Socrática de Apoyo en caso de fallo */}
        {reviewOpen && quiz && (
          <div className="p-5 sm:p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
              <HelpCircle className="w-4 h-4" />
              <span>Orientación Socrática del Profesor {teacher?.name}</span>
            </div>

            <div className="p-4 rounded-xl bg-[#121215] border border-[#27272A] space-y-2">
              <p className="text-xs sm:text-sm text-emerald-400 font-semibold">
                ✔ Respuesta correcta esperada: <strong className="underline decoration-emerald-500/40">«{correctText}»</strong> (opción {correctLetter}).
              </p>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedOption !== null
                  ? lesson.theory
                  : `${quiz.question} → «${correctText}» porque ${quiz.correctExplanation || 'así se desprende del concepto estudiado'}.`}
              </p>
              {aiHelp.status === 'loading' && (
                <p className="text-xs text-[#A1A1AA] flex items-center gap-1.5 pt-1">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>Generando explicación alternativa adaptada…</span>
                </p>
              )}
              {aiHelp.status === 'ready' && aiHelp.text && (
                <div className="pt-2 border-t border-[#27272A] mt-2 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] block">
                    Explicación con enfoque alternativo:
                  </span>
                  <p className="text-xs sm:text-sm text-amber-100 leading-relaxed whitespace-pre-line">
                    {aiHelp.text}
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={retryQuiz}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reintentar el Reto de Comprensión</span>
            </button>
          </div>
        )}

        {/* Zona del Reto Interactivo */}
        {quiz && !answered && (
          <div className="p-5 sm:p-6 rounded-2xl bg-[#141417] border border-[#27272A] space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A1AA]">
                Reto de Comprensión Socrática
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              {quiz.question}
            </h3>

            <div className="space-y-2 pt-1">
              {quiz.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left p-3.5 sm:p-4 rounded-xl border border-[#27272A] bg-[#18181B] hover:border-amber-500/50 hover:bg-[#1E1E22] text-zinc-200 transition-all flex items-center gap-3.5 group active:scale-[0.99]"
                >
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold shrink-0 bg-[#27272A] text-zinc-300 group-hover:bg-amber-500/20 group-hover:text-amber-300 transition-colors">
                    {OPTION_LETTERS[i]}
                  </span>
                  <span className="text-xs sm:text-sm font-medium leading-relaxed flex-1">
                    {opt}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Retroalimentación de Éxito Inmediata */}
        {quiz && answered && isCorrect && (
          <div className={`p-5 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 space-y-3 ${isLast ? 'hidden' : ''}`}>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>¡Comprensión demostrada exitosamente!</span>
            </div>
            {quiz.correctExplanation && (
              <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                {quiz.correctExplanation}
              </p>
            )}
            <button
              type="button"
              onClick={handleContinue}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{isLast ? 'Finalizar lección socrática' : 'Continuar al siguiente paso'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Desglose de opciones tras fallo */}
        {quiz && answered && !isCorrect && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {quiz.options.map((opt, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border text-xs leading-snug flex items-start gap-2 ${
                  i === quiz.correctIndex
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : i === selectedOption
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                    : 'bg-[#121215] border-[#27272A] text-[#71717A]'
                }`}
              >
                {i === quiz.correctIndex ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : i === selectedOption ? (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <span className="w-4 shrink-0 font-mono text-[10px]">{OPTION_LETTERS[i]}.</span>
                )}
                <span><strong>{OPTION_LETTERS[i]}.</strong> {opt}</span>
              </div>
            ))}
          </div>
        )}

        {quizPreparing && !answered && (
          <div className="p-4 rounded-xl border border-dashed border-[#27272A] bg-[#121215] flex items-center gap-3">
            <Loader2 className="w-4 h-4 animate-spin text-amber-400 shrink-0" />
            <p className="text-xs text-[#A1A1AA]">
              Revisa la ficha teórica mientras tu tutor genera el reto socrático…
            </p>
          </div>
        )}

        {bite?.status === 'failed' && !quiz && (
          <div className="p-3.5 rounded-xl bg-[#121215] border border-[#27272A] flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xs text-[#A1A1AA]">
              Reto generado mediante síntesis local determinista. Puedes dialogar con {teacher?.name} en cualquier momento.
            </p>
            <button
              type="button"
              onClick={() => void ensureBite(lessonIndex, true)}
              className="px-3 py-1.5 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-bold"
            >
              Reintentar
            </button>
          </div>
        )}

        {!quiz && !reviewOpen && (
          <button
            type="button"
            onClick={handleContinue}
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{isLast ? 'Finalizar lección socrática' : 'Continuar a la siguiente micro-lección'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* Barra de Navegación Inferior Discreta */}
        <div className="pt-4 border-t border-[#27272A] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => goTo(lessonIndex - 1)}
            disabled={lessonIndex === 0}
            className="px-3.5 py-2 min-h-[40px] rounded-xl bg-[#27272A] hover:bg-[#3F3F46] disabled:opacity-30 disabled:cursor-not-allowed text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Paso Anterior</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: MICRO_TOTAL }).map((__, i) => {
              const isUnlocked = i <= maxUnlocked;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  disabled={!isUnlocked}
                  className="p-1 disabled:cursor-not-allowed"
                  title={`Paso ${i + 1}${cleared.includes(i) ? ' · superado' : isUnlocked ? '' : ' · pendiente'}`}
                  aria-label={`Ir al paso ${i + 1}`}
                >
                  <span
                    className={`block w-2.5 h-2.5 rounded-full transition-all ${
                      cleared.includes(i)
                        ? 'bg-emerald-400'
                        : i === lessonIndex
                        ? 'bg-amber-400 scale-125'
                        : isUnlocked
                        ? 'bg-zinc-600'
                        : 'bg-[#27272A]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {isLast ? (
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canAdvance && !finished}
              className={`px-4 py-2 min-h-[40px] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                canAdvance
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                  : 'bg-[#27272A] text-[#71717A] cursor-not-allowed'
              }`}
            >
              <span>Finalizar Fase 1</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canAdvance}
              className="px-4 py-2 min-h-[40px] rounded-xl bg-[#27272A] hover:bg-[#3F3F46] disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <span>Avanzar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tarjeta de Cierre de la Fase Socrática */}
      {routeCompleted && (
        <div className="border-t border-emerald-500/30 p-6 bg-gradient-to-b from-[#141E18] to-[#121215] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Fase 1 Completada con Éxito</span>
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                ¡Conceptos asimilados, {student.name}!
              </h3>
              <p className="text-xs text-zinc-300 max-w-xl leading-relaxed">
                Has superado los {MICRO_TOTAL} fundamentos de <strong className="text-white">{dailyClass.theme}</strong>. Tu siguiente paso pedagógico es reforzar lo aprendido mediante simulación o laboratorio.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onGoToLab}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <FlaskConical className="w-4 h-4" />
                <span>Ir al Laboratorio Digital (Fase 2)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={restart}
                className="px-3.5 py-3 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-zinc-300 text-xs font-bold transition-all flex items-center gap-1.5"
                title="Repasar conceptos desde el inicio"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Repasar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
