import React, { useState, useEffect, useRef } from 'react';
import { useSchool, useTeacherContext } from '../../context/SchoolContext';
import { askAITeacher, ChatMessage, renderMarkdownToHtml } from '../../services/aiService';
import { ttsService } from '../../services/ttsService';
import { useTouchTablet } from '../../hooks/useTouchTablet';
import { Bot, X, Send, Loader2, Volume2, Play, Pause, StopCircle, Square } from 'lucide-react';

/**
 * Renderiza el Markdown UNA sola vez por contenido.
 * Evita re-parsear todos los mensajes en cada re-render (p. ej. al alternar isLoading
 * mientras la IA "piensa"), que es lo que podía sentirse como congelamiento.
 */
const MarkdownMessage = React.memo(({ content }: { content: string }) => (
  <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(content) }} />
));
MarkdownMessage.displayName = 'MarkdownMessage';

export const AITeacherDrawer: React.FC = () => {
  const {
    isTeacherDrawerOpen,
    setIsTeacherDrawerOpen,
    activeSubject,
    activeClass,
    currentStudent,
    studentSubjects,
    todayClasses,
  } = useSchool();

  // Guía v4 EXACTA del día (mismo string del PDF). Se relee del contexto en cada envío:
  // si el estudiante cambia de clase con el drawer abierto, el siguiente mensaje usa la nueva guía.
  const { guiaDelDia } = useTeacherContext();

  const subject = activeSubject || studentSubjects[0];
  const dailyClass = activeClass || todayClasses[0];
  const teacher = subject?.teacher;

  const studentTheme = (() => {
    const base = currentStudent?.colorTheme || { accent: '#6366f1', primary: 'indigo', secondary: 'violet', gradient: 'from-indigo-600 via-violet-600 to-purple-600' };
    return { ...base, chip: '#1f2937', textStrong: '#f8fafc', label: 'Wisdom Academy' };
  })();

  // Tablet táctil (iPad, Android…), en cualquier orientación y ancho, incluso con teclado/trackpad:
  // el panel lateral angosto se desborda. En estos dispositivos usamos una hoja inferior a todo el ancho;
  // Windows de escritorio mantiene el panel lateral.
  const isTouchTablet = useTouchTablet();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  // Solo auto-scrolleamos si el niño ya está al final y no está tocando la pantalla.
  // Un scrollTo programático durante su gesto le "roba" el scroll y lo deja trabado.
  const pinnedToBottomRef = useRef(true);
  const isTouchingRef = useRef(false);
  const pointerDownRef = useRef(false);

  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

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
    if (!isTeacherDrawerOpen) handleStopVoice();
  }, [isTeacherDrawerOpen]);

  useEffect(() => {
    if (teacher && subject && isTeacherDrawerOpen && messages.length === 0) {
      const greetingId = `msg-${Date.now()}`;
      const greetingContent = `¡Hola ${currentStudent.name}! Soy ${teacher.name}, tu tutor de ${subject.name}. Hoy: "${dailyClass?.theme || 'el tema de hoy'}". Te acompaño paso a paso: escribe tu pregunta cuando quieras.`;

      const greeting: ChatMessage = { id: greetingId, role: 'model', content: greetingContent, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages([greeting]);
    }
  }, [teacher?.id, currentStudent.id, subject?.id, dailyClass?.id, isTeacherDrawerOpen]);

  useEffect(() => {
    if (!isTeacherDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsTeacherDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isTeacherDrawerOpen, setIsTeacherDrawerOpen]);

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
    if (!textToSend || isLoading || !teacher || !subject) return;

    handleStopVoice();

    const userMessage: ChatMessage = { id: `msg-${Date.now()}`, role: 'user', content: textToSend, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    pinnedToBottomRef.current = true; // al enviar, siempre queremos ver el final
    setInputValue('');
    setIsLoading(true);

    try {
      const fallbackClass = dailyClass || { id: 'repaso-general', theme: 'Repaso General', objective: 'Repasar.' };
      const reply = await askAITeacher({
        student: currentStudent, teacher, subject, dailyClass: fallbackClass as any,
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

  if (!isTeacherDrawerOpen || !teacher || !subject) return null;

  return (
    /* Panel lateral SIN capa a pantalla completa.
       Antes había un <div fixed inset-0 ... bg-black/60> que (a) capturaba todos los
       eventos porque el scroll vive en <main>, y (b) obligaba a recomponer toda la app
       en cada re-render de la IA. Ahora no hay overlay global: el resto de la interfaz
       queda 100% usable (scroll y clics) y `contain:content` aísla el repintado al panel. */
    <aside
      role="dialog"
      aria-modal="false"
      aria-label={`Chat con ${teacher.name}`}
      className={`fixed z-[100] w-full pointer-events-auto flex flex-col shadow-2xl bg-slate-900 [contain:content] ${
        isTouchTablet
          ? 'inset-x-0 bottom-0 h-[min(82dvh,100dvh)] rounded-t-3xl border-t max-h-[100dvh]'
          : 'top-0 right-0 bottom-0 max-w-lg h-[100dvh] max-h-[100dvh] border-l'
      }`}
      style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.94))', borderColor: `${studentTheme.accent}55` }}
    >

        {isTouchTablet && (
          <button
            onClick={() => setIsTeacherDrawerOpen(false)}
            aria-label="Cerrar tutor"
            className="w-full pt-2.5 pb-1 flex items-center justify-center text-slate-500 hover:text-white shrink-0"
          >
            <span className="w-12 h-1.5 rounded-full bg-slate-600" />
          </button>
        )}

        <div className="p-4 sm:p-5 border-b flex items-center justify-between gap-3 shadow-md shrink-0" style={{ background: `linear-gradient(135deg, ${studentTheme.accent}22, rgba(15,23,42,0.92) 60%, rgba(2,6,23,0.96))` }}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <img src={teacher.avatar} alt={teacher.name} className="w-12 h-12 rounded-2xl object-cover ring-2 shadow" style={{ boxShadow: `0 0 0 2px ${studentTheme.accent}55` }} />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900" title="Activo" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-white truncate">{teacher.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Voz manual</span>
              </div>
              <p className="text-xs font-medium mt-1 truncate" style={{ color: studentTheme.accent }}>{subject.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setIsTeacherDrawerOpen(false)} aria-label="Cerrar tutor" className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors after:absolute after:-inset-1.5 after:content-['']"><X className="w-5 h-5" /></button>
          </div>
        </div>

        <div
          ref={scrollBoxRef}
          onScroll={handleThreadScroll}
          onTouchStart={() => { isTouchingRef.current = true; }}
          onTouchEnd={() => { isTouchingRef.current = false; }}
          onTouchCancel={() => { isTouchingRef.current = false; }}
          className="flex-1 min-h-0 overflow-y-auto touch-pan-y [overflow-anchor:none] p-4 space-y-5"
        >
          <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
            <Volume2 className="w-3 h-3" /> El audio se reproduce solo cuando tú presionas <strong className="text-emerald-400">REPRODUCIR</strong>.
          </p>
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const isActiveSpeech = speakingId === msg.id;

            return (
              <div key={msg.id} className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && <img src={teacher.avatar} alt={teacher.name} className="w-8 h-8 rounded-lg object-cover mt-1 shadow-md" />}

                <div className={`flex flex-col min-w-0 max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>

                  <div className="p-4 rounded-2xl text-[15px] leading-relaxed shadow-lg break-words [overflow-wrap:anywhere]" style={isUser ? { background: `linear-gradient(135deg, ${studentTheme.accent}, ${studentTheme.accent}cc)`, color: '#fff', borderBottomRightRadius: 0 } : { background: 'rgba(15, 23, 42, 0.95)', border: `1px solid ${isActiveSpeech && !isPaused ? '#10b981' : studentTheme.accent + '55'}`, color: '#e2e8f0', borderBottomLeftRadius: 0 }}>
                    {isUser ? <div className="whitespace-pre-wrap [overflow-wrap:anywhere] font-medium">{msg.content}</div> : <MarkdownMessage content={msg.content} />}
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
                        {/* Botón Reproducir / Reanudar */}
                        <button
                          onClick={() => {
                            if (isActiveSpeech && isPaused) {
                              ttsService.resume();
                              setIsPaused(false);
                            } else {
                              handlePlayVoice(msg.content, msg.id);
                            }
                          }}
                          className={`flex-1 flex items-center justify-center gap-1 px-2.5 py-2 min-h-[38px] rounded-lg font-bold text-[11px] sm:text-xs transition-all active:scale-95 ${
                            isActiveSpeech && !isPaused
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/30'
                              : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-md border border-emerald-500/20'
                          }`}
                          disabled={isActiveSpeech && !isPaused}
                          title={isActiveSpeech && isPaused ? 'Reanudar audio' : 'Reproducir audio'}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{isActiveSpeech && isPaused ? 'REANUDAR' : 'REPRODUCIR'}</span>
                        </button>

                        {/* Botón Pausar */}
                        <button
                          onClick={handlePauseVoice}
                          className={`flex-1 flex items-center justify-center gap-1 px-2.5 py-2 min-h-[38px] rounded-lg font-bold text-[11px] sm:text-xs transition-all active:scale-95 ${
                            isActiveSpeech && !isPaused
                              ? 'bg-amber-600 text-white hover:bg-amber-500 shadow-md border border-amber-500/20'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/30'
                          }`}
                          disabled={!isActiveSpeech || isPaused}
                          title="Pausar audio"
                        >
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>PAUSAR</span>
                        </button>

                        {/* Botón Detener */}
                        <button
                          onClick={handleStopVoice}
                          className={`flex-1 flex items-center justify-center gap-1 px-2.5 py-2 min-h-[38px] rounded-lg font-bold text-[11px] sm:text-xs transition-all active:scale-95 ${
                            isActiveSpeech
                              ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-md border border-rose-500/20'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/30'
                          }`}
                          disabled={!isActiveSpeech}
                          title="Detener audio"
                        >
                          <StopCircle className="w-3.5 h-3.5 fill-current" />
                          <span>DETENER</span>
                        </button>
                      </div>
                    </div>
                  )}
                  {isUser && <span className="text-[9px] text-indigo-200/70 font-mono mt-1 pr-1">{msg.timestamp}</span>}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <img src={teacher.avatar} alt={teacher.name} className="w-8 h-8 rounded-lg object-cover animate-pulse shadow-md" />
              <div className="p-3 rounded-2xl bg-slate-800 border border-slate-700 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin text-indigo-400" /><span className="font-bold tracking-wide">Pensando…</span></div>
            </div>
          )}
          <div />
        </div>

        {/* BARRA GLOBAL DE AUDIO: pausar/detener la voz disponible en CUALQUIER momento mientras hay reproducción */}
        {speakingId && (
          <div className="px-4 py-2.5 border-t shrink-0 bg-slate-950/95 flex items-center justify-between gap-3 shadow-[0_-8px_20px_-6px_rgba(0,0,0,0.6)]">
            <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2" style={{ color: isPaused ? '#fbbf24' : '#34d399' }}>
              {isPaused ? <><Pause className="w-3.5 h-3.5" /> Audio en pausa</> : <><Volume2 className="w-3.5 h-3.5 animate-pulse" /> {teacher.name} está hablando</>}
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

        <div className="p-3 border-t flex flex-wrap items-center gap-2 bg-slate-900/90 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.3)] z-10 relative shrink-0">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider pl-1 w-full sm:w-auto">Atajos</span>
          {['¿Me das un ejemplo cotidiano?', '¿Por qué ocurre esto?', 'Ya lo entendí, siguiente paso'].map((promptText, idx) => (
            <button key={idx} onClick={() => handleSendMessage(promptText)} disabled={isLoading} className="inline-flex items-center min-h-[40px] max-w-full px-3 py-1.5 rounded-lg border bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-200 text-left transition-colors shadow-sm">{promptText}</button>
          ))}
        </div>

        <div className="px-4 pt-4 bg-slate-900 z-10 relative shrink-0" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}>
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
            <input id="input-teacher-chat" type="text" enterKeyHint="send" autoCapitalize="sentences" autoComplete="off" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={`Escribe tu respuesta para ${teacher.name}...`} className="flex-1 min-w-0 rounded-xl px-4 py-3.5 text-base bg-slate-800 text-white focus:outline-none border-2 border-slate-700 focus:border-indigo-500 transition-all font-medium shadow-inner" />
            <button type="submit" disabled={!inputValue.trim() || isLoading} aria-label="Enviar mensaje" className="p-3.5 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-600/30 active:scale-95 shrink-0"><Send className="w-5 h-5" /></button>
          </form>
        </div>
    </aside>
  );
};
