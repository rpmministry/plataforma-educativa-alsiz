import React, { useState, useEffect, useRef } from 'react';
import { useSchool, useTeacherContext } from '../../context/SchoolContext';
import { askAITeacher, ChatMessage, renderMarkdownToHtml } from '../../services/aiService';
import { ttsService } from '../../services/ttsService';
import { Bot, Send, Loader2, Volume2, VolumeX, Play, Pause, StopCircle, MessageSquare, ArrowRight, Target, GraduationCap, Square } from 'lucide-react';

/** Markdown memoizado: solo se re-parsea cuando cambia el contenido del mensaje. */
const MarkdownMessage = React.memo(({ content }: { content: string }) => (
  <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(content) }} />
));
MarkdownMessage.displayName = 'MarkdownMessage';

interface NextStepInfo {
  label: string;
  sublabel?: string;
  onAction: () => void;
}

interface ClassTeacherChatProps {
  className?: string;
  compact?: boolean;
  nextStep?: NextStepInfo;
}

const getStudentTheme = (student: any) => {
  const base = student?.colorTheme || { accent: '#6366f1', primary: 'indigo', secondary: 'violet', gradient: 'from-indigo-600 via-violet-600 to-purple-600' };
  return { ...base, chip: '#1f2937', textStrong: '#f8fafc', label: 'Wisdom Academy' };
};

export const ClassTeacherChat: React.FC<ClassTeacherChatProps> = ({ className = '', compact = false, nextStep }) => {
  const {
    activeSubject,
    activeClass,
    currentStudent,
    studentSubjects,
    todayClasses,
  } = useSchool();

  // Guía v4 EXACTA del día (mismo string del PDF). Se relee del contexto en cada envío,
  // por lo que si cambia la clase activa el profesor usa la nueva guía en el siguiente mensaje.
  const { guiaDelDia } = useTeacherContext();

  const subject = activeSubject || studentSubjects[0];
  const dailyClass = activeClass || todayClasses[0];
  const teacher = subject?.teacher;
  const studentTheme = getStudentTheme(currentStudent);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  // Solo auto-scrolleamos si el niño ya está al final y no hay ningún puntero/touch activo.
  // Un scroll programático durante un gesto deja el scroller "trabado" (sobre todo en iOS).
  const pinnedToBottomRef = useRef(true);
  const isTouchingRef = useRef(false);
  const pointerDownRef = useRef(false);

  const handlePlayVoice = async (text: string, messageId: string) => {
    await ttsService.play({
      messageId,
      text,
      teacherName: teacher?.name || '',
      onEnd: () => { setSpeakingId(null); setIsPaused(false); },
      onPause: () => { setIsPaused(true); },
      onPlay: () => { setSpeakingId(messageId); setIsPaused(false); },
    });
  };

  const handlePauseVoice = () => {
    ttsService.pause();
  };

  const handleStopVoice = () => {
    ttsService.stop();
    setSpeakingId(null);
    setIsPaused(false);
  };

  useEffect(() => {
    if (teacher && subject && messages.length === 0) {
      const greetingId = `msg-${Date.now()}`;
      const greetingContent = `¡Hola ${currentStudent.name}! Soy ${teacher.name}, tu profe de ${subject.name}. Hoy: "${dailyClass?.theme || 'repaso'}". Avanza por las mini-lecciones y aquí me preguntas lo que quieras.`;
      const greeting: ChatMessage = { id: greetingId, role: 'model', content: greetingContent, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages([greeting]);
    }
  }, [teacher?.id, currentStudent.id, subject?.id, dailyClass?.id]);

  const handleThreadScroll = () => {
    const box = scrollBoxRef.current;
    if (!box) return;
    pinnedToBottomRef.current = box.scrollHeight - box.scrollTop - box.clientHeight < 72;
  };

  // Cualquier puntero activo (incluido el dedo sobre "Enviar") pausa el auto-scroll.
  useEffect(() => {
    const down = () => { pointerDownRef.current = true; };
    const up = () => { pointerDownRef.current = false; };
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('pointercancel', up, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, []);

  // Auto-scroll solo cuando entra/llega un MENSAJE, si el usuario está al final y
  // sin ningún puntero activo. Sin 'smooth'.
  useEffect(() => {
    if (!pinnedToBottomRef.current || isTouchingRef.current || pointerDownRef.current) return;
    const box = scrollBoxRef.current;
    if (!box) return;
    const raf = requestAnimationFrame(() => {
      if (isTouchingRef.current || pointerDownRef.current) return;
      box.scrollTop = box.scrollHeight;
    });
    return () => cancelAnimationFrame(raf);
  }, [messages]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue.trim();
    if (!textToSend || isLoading || !teacher || !subject || !currentStudent) return;

    handleStopVoice();

    const userMessage: ChatMessage = { id: `msg-${Date.now()}`, role: 'user', content: textToSend, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    pinnedToBottomRef.current = true; // al enviar, siempre queremos ver el final
    setInputValue('');
    setIsLoading(true);

    try {
      const fallbackClass = dailyClass || { id: 'repaso-general', theme: 'Repaso General', objective: 'Repasar.' } as any;
      const reply = await askAITeacher({
        student: currentStudent, teacher, subject, dailyClass: fallbackClass,
        conversationHistory: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        message: textToSend,
        guideContext: guiaDelDia,
      });

      const replyId = `msg-model-${Date.now()}`;
      const modelMessage: ChatMessage = { id: replyId, role: 'model', content: reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.error(err);
      const errId = `msg-err-${Date.now()}`;
      const errorMessage: ChatMessage = { id: errId, role: 'model', content: 'Disculpa, se me trabó la voz. ¿Me repites tu idea, por favor?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = ['¿Me das un ejemplo cotidiano?', '¿Por qué ocurre esto?', 'Ya lo entendí, siguiente paso'];

  return (
    <div className={`flex flex-col rounded-3xl border overflow-clip bg-slate-900/80 shadow-2xl ${className}`} style={{ borderColor: `${studentTheme.accent}44` }}>

      {/* CABECERA: EL PROFESOR COMO PROTAGONISTA DE LA CLASE */}
      <div className="p-5 sm:p-6 border-b space-y-4" style={{ background: `linear-gradient(135deg, ${studentTheme.accent}26, rgba(15,23,42,0.94) 55%, rgba(2,6,23,0.97))` }}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" style={{ color: studentTheme.accent }} />
            <h1 className="text-sm sm:text-base font-black uppercase tracking-widest text-white">Clase Interactiva</h1>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-slate-950/70 border border-slate-700 text-slate-300 shrink-0">
            Tutoría Académica Socrática
          </span>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <img src={teacher?.avatar} alt={teacher?.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover ring-2 shadow-xl" style={{ boxShadow: `0 0 0 3px ${studentTheme.accent}66` }} />
              <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" title="Profesor en clase" style={{ width: 18, height: 18 }} />
            </div>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border" style={{ background: `${studentTheme.accent}22`, color: studentTheme.accent, borderColor: `${studentTheme.accent}55` }}>
                <Bot className="w-3 h-3" /> En clase ahora
              </span>
              <h2 className="text-base sm:text-xl font-black text-white leading-tight mt-1">{teacher?.name}</h2>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-300">
                {teacher?.title} · {subject?.name} <span className="text-slate-500">— Clase privada para {currentStudent.name}</span>
              </p>
            </div>
          </div>
        </div>

        {/* CONTEXTO DE LA SESIÓN: MATERIA / UNIDAD / TEMA / OBJETIVO */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">{subject?.name}</span>
          {dailyClass?.unit && <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">{dailyClass.unit}</span>}
          {dailyClass?.date && <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-400 border border-slate-700">{dailyClass.dayOfWeek} {dailyClass.date}</span>}
        </div>
        {!compact && dailyClass?.theme && (
          <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
            <Target className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 block">Tema de hoy</span>
              <p className="text-sm font-extrabold text-white leading-snug">{dailyClass.theme}</p>
              {dailyClass.objective && <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{dailyClass.objective}</p>}
            </div>
          </div>
        )}
        <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
          <VolumeX className="w-3 h-3" /> El audio se reproduce solo cuando tú presionas <strong className="text-emerald-400">REPRODUCIR</strong>.
        </p>
      </div>

      {/* ZONA CENTRAL: EL DESARROLLO DE LA CLASE (EXPLICACIÓN ↔ RESPUESTA) */}
      <div
        ref={scrollBoxRef}
        onScroll={handleThreadScroll}
        onTouchStart={() => { isTouchingRef.current = true; }}
        onTouchEnd={() => { isTouchingRef.current = false; }}
        onTouchCancel={() => { isTouchingRef.current = false; }}
        className={`shrink-0 min-h-0 overflow-y-auto touch-pan-y [overflow-anchor:none] p-4 sm:p-6 space-y-5 ${compact ? 'h-[min(46dvh,420px)]' : 'h-[min(60dvh,620px)]'}`}
        style={{ scrollbarWidth: 'thin', scrollbarColor: studentTheme.accent }}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
            <Bot className="w-12 h-12 mb-1" style={{ color: studentTheme.accent }} />
            <p className="text-sm text-slate-400 font-medium">Tu profesor está entrando al salón…</p>
          </div>
        )}
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isActiveSpeech = speakingId === msg.id;

          return (
            <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && <img src={teacher?.avatar} alt={teacher?.name} className="w-9 h-9 rounded-xl object-cover mt-1 shadow-md shrink-0" />}

              <div className={`flex flex-col min-w-0 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                {!isUser && <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 mb-1 pl-1">{teacher?.name} explica</span>}
                <div className="p-4 rounded-2xl text-[15px] leading-relaxed shadow-lg break-words [overflow-wrap:anywhere]" style={isUser ? { background: `linear-gradient(135deg, ${studentTheme.accent}, ${studentTheme.accent}cc)`, color: '#fff', borderBottomRightRadius: 0 } : { background: 'rgba(15, 23, 42, 0.95)', border: `1px solid ${isActiveSpeech && !isPaused ? '#10b981' : studentTheme.accent + '55'}`, color: '#e2e8f0', borderBottomLeftRadius: 0 }}>
                  {isUser ? <div className="whitespace-pre-wrap [overflow-wrap:anywhere]"><span className="text-[9px] uppercase font-black opacity-70 block mb-0.5">Tu respuesta</span>{msg.content}</div> : <MarkdownMessage content={msg.content} />}
                </div>

                {!isUser && (
                  <div className="mt-2 w-full min-w-0 max-w-sm p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col gap-2 shadow-inner">
                    <div className="flex items-center justify-between border-b border-slate-800/60 pb-1.5 px-1">
                      <span className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">Controles de Audio</span>
                      <div className="flex items-center gap-1.5">
                        {isActiveSpeech && !isPaused && (
                          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider animate-pulse flex items-center gap-1">
                            <Volume2 className="w-3 h-3" /> Reproduciendo
                          </span>
                        )}
                        {isActiveSpeech && isPaused && (
                          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                            <Pause className="w-3 h-3" /> Pausado
                          </span>
                        )}
                        {!isActiveSpeech && (
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider">Listo para escuchar</span>
                        )}
                        <span className="text-[9px] text-slate-500 font-mono">{msg.timestamp}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => {
                          if (isActiveSpeech && isPaused) {
                            ttsService.resume();
                            setIsPaused(false);
                          } else {
                            handlePlayVoice(msg.content, msg.id);
                          }
                        }}
                        className={`flex-1 flex items-center justify-center gap-1 px-2.5 py-2 min-h-[38px] rounded-lg font-bold text-[11px] sm:text-xs transition-all active:scale-95 ${isActiveSpeech && !isPaused ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/30' : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md border border-emerald-500/20'}`}
                        disabled={isActiveSpeech && !isPaused}
                        title={isActiveSpeech && isPaused ? 'Reanudar audio' : 'Reproducir audio'}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>{isActiveSpeech && isPaused ? 'REANUDAR' : 'REPRODUCIR'}</span>
                      </button>

                      <button
                        onClick={handlePauseVoice}
                        className={`flex-1 flex items-center justify-center gap-1 px-2.5 py-2 min-h-[38px] rounded-lg font-bold text-[11px] sm:text-xs transition-all active:scale-95 ${isActiveSpeech && !isPaused ? 'bg-amber-600 text-white hover:bg-amber-500 shadow-md border border-amber-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/30'}`}
                        disabled={!isActiveSpeech || isPaused}
                        title="Pausar audio"
                      >
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>PAUSAR</span>
                      </button>

                      <button
                        onClick={handleStopVoice}
                        className={`flex-1 flex items-center justify-center gap-1 px-2.5 py-2 min-h-[38px] rounded-lg font-bold text-[11px] sm:text-xs transition-all active:scale-95 ${isActiveSpeech ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-md border border-rose-500/20' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/30'}`}
                        disabled={!isActiveSpeech}
                        title="Detener audio"
                      >
                        <StopCircle className="w-3.5 h-3.5 fill-current" />
                        <span>DETENER</span>
                      </button>
                    </div>
                  </div>
                )}
                {isUser && <span className="text-[9px] mt-1 pr-1 font-mono" style={{ color: `${studentTheme.accent}cc` }}>{msg.timestamp}</span>}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 items-center text-slate-400 text-sm">
            <img src={teacher?.avatar} alt={teacher?.name} className="w-9 h-9 rounded-xl object-cover animate-pulse shadow-md" />
            <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-indigo-400" /><span className="font-bold tracking-wide">{teacher?.name} está pensando…</span></div>
          </div>
        )}
      </div>
      {/* ATAJOS DE INTERACCIÓN — envuelven en varias líneas para no recortarse */}
      <div className="p-3 border-t flex flex-wrap items-center gap-2 bg-slate-900/90 shrink-0">
        <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider pl-1 w-full sm:w-auto"><MessageSquare className="w-3 h-3 inline mr-1" />Atajos</span>
        {quickPrompts.map((promptText, idx) => (
          <button key={idx} onClick={() => handleSendMessage(promptText)} disabled={isLoading} className="inline-flex items-center min-h-[40px] max-w-full px-3 py-1.5 rounded-lg border bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-200 text-left transition-colors shadow-sm">{promptText}</button>
        ))}
      </div>

      {/* SIGUIENTE PASO DE LA CLASE */}
      {nextStep && (
        <div className="px-4 py-3 border-t shrink-0 flex items-center justify-between gap-3" style={{ background: `linear-gradient(90deg, ${studentTheme.accent}14, rgba(2,6,23,0.6))`, borderColor: '#1e293b' }}>
          <div className="min-w-0">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 block">Siguiente paso guiado</span>
            {nextStep.sublabel && <p className="text-[11px] text-slate-400 truncate">{nextStep.sublabel}</p>}
          </div>
          <button
            onClick={nextStep.onAction}
            className="shrink-0 px-4 py-2.5 rounded-xl text-xs font-black text-white shadow-lg transition-all active:scale-95 flex items-center gap-2 hover:brightness-110"
            style={{ background: studentTheme.accent, boxShadow: `0 8px 24px ${studentTheme.accent}44` }}
          >
            <span>{nextStep.label}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* BARRA GLOBAL DE AUDIO: pausar/detener disponible en CUALQUIER momento mientras hay voz */}
      {speakingId && (
        <div className="px-4 py-2.5 border-t shrink-0 bg-slate-950/95 flex items-center justify-between gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2" style={{ color: isPaused ? '#fbbf24' : '#34d399' }}>
            {isPaused ? <><Pause className="w-3.5 h-3.5" /> Audio en pausa</> : <><Volume2 className="w-3.5 h-3.5 animate-pulse" /> {teacher?.name} está hablando</>}
          </span>
          <div className="flex items-center gap-2">
            {isPaused ? (
              <button
                onClick={() => { ttsService.resume(); setIsPaused(false); }}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> REANUDAR
              </button>
            ) : (
              <button
                onClick={handlePauseVoice}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-black flex items-center gap-1.5 transition-all active:scale-95"
              >
                <Pause className="w-3.5 h-3.5" /> PAUSAR
              </button>
            )}
            <button
              onClick={handleStopVoice}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-black flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Square className="w-3.5 h-3.5 fill-current" /> DETENER
            </button>
          </div>
        </div>
      )}

      {/* ENTRADA DEL ESTUDIANTE */}
      <div className="p-4 bg-slate-900 border-t shrink-0">
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
          <input id={`input-teacher-chat-${compact ? 'compact' : 'full'}`} type="text" enterKeyHint="send" autoCapitalize="sentences" autoComplete="off" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={`Escribe tu respuesta para ${teacher?.name}...`} className="flex-1 min-w-0 rounded-xl px-4 py-3.5 text-base bg-slate-800 text-white focus:outline-none border-2 border-slate-700 transition-all font-medium shadow-inner" style={{ caretColor: studentTheme.accent }} />
          <button type="submit" disabled={!inputValue.trim() || isLoading} aria-label="Enviar mensaje" className="p-3.5 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl text-white hover:brightness-110 disabled:opacity-50 transition-all shadow-lg active:scale-95 shrink-0" style={{ background: studentTheme.accent, boxShadow: `0 6px 20px ${studentTheme.accent}55` }}><Send className="w-5 h-5" /></button>
        </form>
        <p className="text-[10px] text-slate-500 italic mt-2 text-center">Tutoría interactiva socrática de Wisdom Academy</p>
      </div>
    </div>
  );
};

export const ClassTeacherChatCompact: React.FC<ClassTeacherChatProps> = (props) => (
  <ClassTeacherChat {...props} compact />
);
