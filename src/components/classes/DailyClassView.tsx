import React, { useState, useEffect, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useScrollToTopOnChange } from '../../hooks/useScrollToTopOnChange';
import { useTouchTablet } from '../../hooks/useTouchTablet';
import { scrollAppToTop } from '../../utils/scrollToTop';
import { DailyClass, ClassActivity } from '../../types';
import { formatYouTubeEmbedUrl, getYouTubeWatchUrl, getYouTubeSearchUrl } from '../../utils/youtube';
import { downloadDailyGuidesBundle, routeGuideContent, DailyGuideBundleItem } from '../../utils/guideGenerator';
import { requestGuideContent, readCachedBiteSteps } from '../../services/aiService';
import { ActivityDetailModal } from '../activities/ActivityDetailModal';
import { ClassVideoPlayer } from './ClassVideoPlayer';
import { MicroLessonPlayer, MICRO_TOTAL } from './MicroLessonPlayer';
import { ClassTeacherChat } from './ClassTeacherChat';
import { LessonTimeline } from './LessonTimeline';
import { InteractivePilotSandbox } from './InteractivePilotSandbox';
import { PageHeader } from '../layout/PageHeader';
import {
  ListTodo, Upload, Sparkles, ExternalLink,
  CheckCircle2, Cpu, Layers, Lightbulb, Calendar, AlertCircle, BrainCircuit, Lock, ChevronDown,
} from 'lucide-react';

const forceSpanishUrl = (url: string) => {
  if (!url || url === '#') return '#';
  try {
    const u = new URL(url);
    if (u.hostname.includes('phet.colorado.edu')) u.searchParams.set('locale', 'es');
    if (u.hostname.includes('storyweaver.org.in')) u.searchParams.set('hl', 'es-MX');
    if (u.hostname.includes('youtube.com')) { u.searchParams.set('hl', 'es'); u.searchParams.set('cc_lang_pref', 'es'); }
    return u.toString();
  } catch (e) { return url; }
};

type ActiveSubTab = 'content' | 'simulator' | 'activities' | 'homework';

const SUBTAB_ORDER: ActiveSubTab[] = ['content', 'simulator', 'activities', 'homework'];
const SUBTAB_LABELS: Record<ActiveSubTab, string> = {
  content: 'Masterclass',
  simulator: 'Laboratorio',
  activities: 'Taller',
  homework: 'Evidencias',
};
const SUBTAB_HINTS: Record<ActiveSubTab, string> = {
  content: `Completa las ${MICRO_TOTAL} mini-lecciones con sus retos.`,
  simulator: 'Refuerza lo aprendido con video y simulador.',
  activities: 'Resuelve las actividades pendientes del taller.',
  homework: 'Descarga tu guía y entrega la evidencia.',
};

export const DailyClassView: React.FC = () => {
  const [isReviewWeek, setIsReviewWeek] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isPilotAvailable, setIsPilotAvailable] = useState<boolean>(false);
  const [showInteractivePilot, setShowInteractivePilot] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    setIsReviewWeek(new Date() < new Date('2026-09-07T00:00:00'));

    // Consultar disponibilidad del piloto interactivo
    fetch('/api/v1/pilot/status')
      .then((r) => r.json())
      .then((data) => {
        if (data?.success && data.data?.pilotEnabled) {
          setIsPilotAvailable(true);
        }
      })
      .catch(() => {
        setIsPilotAvailable(false);
      });
  }, []);

  const {
    activeClass, todayClasses, allStudentClasses, selectedDayOfWeek, setSelectedDayOfWeek,
    setActiveClass, studentSubjects, activeSubject, setActiveSubject, openTeacherDrawerWithContext,
    toggleActivityCompletion, currentStudent, schoolWeek,
    microRouteProgress, markMicroCleared, resetMicroRoute,
  } = useSchool();

  // En tablet horizontal (cualquier ancho, incluidas las de 12.9" que superan xl) el chat NO debe
  // quedar en una columna angosta a la derecha: se apila a todo el ancho debajo de la clase.
  const isTouchTablet = useTouchTablet();

  const [activeSubTab, setActiveSubTab] = useState<ActiveSubTab>('content');
  const [viewMode, setViewMode] = useState<'focus' | 'all-classes'>('focus');
  const [showResources, setShowResources] = useState(false);
  const [routeSteps, setRouteSteps] = useState<{ title: string; text: string }[]>([]);
  const [batchProgress, setBatchProgress] = useState<{ done: number; total: number } | null>(null);
  const [batchMessage, setBatchMessage] = useState<{ kind: 'ok' | 'warn' | 'error'; text: string } | null>(null);
  const routeStepsForClass = useRef<string | null>(null);
  const [selectedActivityForModal, setSelectedActivityForModal] = useState<ClassActivity | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const currentClass = activeClass || todayClasses[0] || allStudentClasses[0];
  const subject = currentClass ? studentSubjects.find((s: any) => s.id === currentClass.subjectId) : studentSubjects[0];

  const activitiesList = currentClass?.activities || [];
  const resourcesList = currentClass?.resources || [];
  const socraticQuestionsList = currentClass?.socraticQuestions || [];

  const currentClassIndex = currentClass ? todayClasses.findIndex((c: any) => c.id === currentClass.id) : -1;
  const prevClass = currentClassIndex > 0 ? todayClasses[currentClassIndex - 1] : null;
  const nextClass = currentClassIndex >= 0 && currentClassIndex < todayClasses.length - 1 ? todayClasses[currentClassIndex + 1] : null;

  const allActivitiesCompleted = activitiesList.length > 0 && activitiesList.every((a: any) => a.completed);

  // --- Ruta guiada: un único "siguiente paso" derivado del progreso real ---
  const microCleared = (currentClass && microRouteProgress[currentClass.id]) || [];
  const microDone = microCleared.length >= MICRO_TOTAL || Boolean(currentClass?.isCompleted);
  const stepDone: Record<ActiveSubTab, boolean> = {
    content: microDone,
    simulator: completedSteps.has('simulator'),
    activities: allActivitiesCompleted,
    homework: completedSteps.has('homework') && allActivitiesCompleted,
  };
  const firstIncomplete = SUBTAB_ORDER.find((s) => !stepDone[s]) || 'homework';
  const firstIncompleteIndex = SUBTAB_ORDER.indexOf(firstIncomplete);
  // "Evidencias" (guía descargable + entrega) SIEMPRE accesible: no se bloquea por la ruta,
  // para poder generar y descargar la guía didáctica en cualquier momento y en cualquier perfil.
  const lockedSteps = SUBTAB_ORDER.filter((s) => s !== 'homework' && !stepDone[s] && SUBTAB_ORDER.indexOf(s) > firstIncompleteIndex);
  const nextStepLabel = `${SUBTAB_LABELS[firstIncomplete]}${firstIncomplete === 'content' && !microDone ? ` · ${microCleared.length}/${MICRO_TOTAL}` : ''}`;

  // Materias programadas HOY para el estudiante activo (según el horario) → contenido del diario.
  const dayClassCount = todayClasses.filter((c: any) => c.studentId === currentStudent.id).length;

  const handleSelectClass = (targetClass: DailyClass) => {
    setActiveClass(targetClass);
    const targetSub = studentSubjects.find((s: any) => s.id === targetClass.subjectId);
    if (targetSub) setActiveSubject(targetSub);
    setActiveSubTab('content'); setViewMode('focus'); scrollAppToTop('smooth');
  };

  // Dentro de la ventana de clase también es una "sub-ruta": sub-pestaña, modo o clase distinta => vista arriba.
  useScrollToTopOnChange([activeSubTab, viewMode, currentClass?.id]);

  // ÚNICA fuente de descarga: el DIARIO del día con TODAS las materias del horario del estudiante.
  const handleDownloadDailyGuides = () => { void renderConsolidatedGuide(); };

  // DESCARGA POR LOTES: todas las asignaturas del horario del día → un único PDF combinado.
  // Por cada clase reutiliza los pasos REALES ya generados en la Ruta Interactiva (caché local, sin red);
  // si la IA responde, añade intro y taller A/B; si no, compone localmente con esos mismos pasos.
  const renderConsolidatedGuide = async () => {
    setBatchMessage(null);
    // 1) Asignaturas programadas para el día seleccionado. Si el día no tuviera clases, usa el día de la clase activa.
    let dayClasses = todayClasses.filter((c: any) => c.studentId === currentStudent.id);
    let origenDia = 'horario del día seleccionado';
    if (!dayClasses.length && currentClass?.date) {
      dayClasses = allStudentClasses.filter((c: any) => c.studentId === currentStudent.id && c.date === currentClass.date);
      origenDia = 'horario del día de la clase activa';
    }
    if (!dayClasses.length) {
      setBatchMessage({ kind: 'warn', text: 'No hay asignaturas programadas en el horario para este día. Cambia de día en el selector y vuelve a intentar.' });
      return;
    }
    const dateStr = String(dayClasses.map((c: any) => c.date).find(Boolean) || 'Fecha del día');
    setBatchProgress({ done: 0, total: dayClasses.length });
    try {
      const items: DailyGuideBundleItem[] = [];
      let done = 0;
      for (const cls of dayClasses) {
        done++;
        setBatchProgress({ done, total: dayClasses.length });
        const subj: any = studentSubjects.find((s: any) => s.id === cls.subjectId) || subject;
        let steps = readCachedBiteSteps(currentStudent, cls, 3);
        if (steps.length < 2 && routeStepsForClass.current === cls.id && routeSteps.length >= 2) steps = routeSteps;
        let ai: any = null;
        if (subj) {
          try {
            ai = await requestGuideContent({ student: currentStudent, subject: subj, dailyClass: cls, steps: steps.length >= 2 ? steps : undefined });
          } catch { ai = null; }
          if (!ai && steps.length >= 2) {
            ai = routeGuideContent(steps, { theme: cls.theme, studentGrade: currentStudent.grade, studentId: currentStudent.id, subjectName: subj.name });
          }
        }
        items.push({ currentClass: cls as DailyClass, subject: subj, ai });
      }
      const filename = downloadDailyGuidesBundle({ studentName: currentStudent.name, studentGrade: currentStudent.grade, dateStr, dayLabel: selectedDayOfWeek, studentId: currentStudent.id, items });
      setBatchMessage({ kind: 'ok', text: `Diario listo: ${items.length} guía${items.length === 1 ? '' : 's'} (${origenDia}) en un solo documento → ${filename}. Ábrelo y usa «Imprimir / Guardar PDF combinado».` });
      setTimeout(() => setBatchMessage(null), 15000);
    } catch (e: any) {
      setBatchMessage({ kind: 'error', text: `No se pudo armar el diario: ${e?.message || 'error inesperado'}. Vuelve a intentarlo.` });
    } finally { setBatchProgress(null); }
  };

  const handleStepClick = (stepId: string) => {
    if (lockedSteps.includes(stepId as ActiveSubTab)) return;
    setActiveSubTab(stepId as ActiveSubTab);
    setCompletedSteps((prev) => {
      const next = new Set<string>(prev);
      next.add(stepId);
      return next;
    });
  };

  const handleAskTeacher = (promptText: string) => {
    openTeacherDrawerWithContext(subject, currentClass);
  };

  // La entrega de evidencias vive dentro de la propia clase (Taller), ya no en una pestaña aparte.
  const handleGoToSubmitWork = () => handleStepClick('activities');

  if (!isMounted) {
    return (
      <div className="space-y-6 animate-pulse" aria-hidden>
        <div className="h-10 w-56 rounded-xl bg-slate-800/70" />
        <div className="h-24 rounded-3xl bg-slate-800/60" />
        <div className="h-48 rounded-3xl bg-slate-800/60" />
        <div className="h-64 rounded-3xl bg-slate-800/60" />
      </div>
    );
  }
  if (!currentClass || !subject) return (<div className="p-12 text-center rounded-3xl bg-slate-800/40 border border-slate-700/40 text-white">No hay clases seleccionadas</div>);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title={isReviewWeek ? "Clases de Entrenamiento (Modo Repaso)" : "Clases del Día"} />

      {currentStudent.isDemo && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
          <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <p className="leading-relaxed">
            Estás en <strong className="text-amber-100">Modo Demo</strong>: puedes cursar la clase completa con tu
            profesor IA y la voz, pero al intentar <strong className="text-amber-100">completar o avanzar</strong> el
            progreso no se guardará.
          </p>
        </div>
      )}

      {/* Day Selector */}
      <div className="p-5 rounded-3xl bg-slate-800/90 border border-slate-700/80 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-indigo-400" /><span className="text-sm font-extrabold text-white">Día Escolar ({currentStudent.name}):</span></div>
          <div className="flex flex-wrap items-center gap-2">
            {schoolWeek.map(({ day, dateLabel, isToday }) => {
              const isSelected = day === selectedDayOfWeek;
              const countForDay = allStudentClasses.filter((c: any) => c.studentId === currentStudent.id && c.dayOfWeek === day).length;
              return (
                <button key={day} onClick={() => { setSelectedDayOfWeek(day); const classesOnDay = allStudentClasses.filter((c: any) => c.studentId === currentStudent.id && c.dayOfWeek === day); if (classesOnDay.length > 0) { setActiveClass(classesOnDay[0]); const clsSub = studentSubjects.find((s: any) => s.id === classesOnDay[0].subjectId); if (clsSub) setActiveSubject(clsSub); } }} className={`touch-lift px-3.5 py-1.5 min-h-[44px] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${isSelected ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400' : 'bg-slate-900/80 text-slate-300 hover:bg-slate-700 border border-slate-700/60'}`}>
                  <span>{day}</span><span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isSelected ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'}`}>{dateLabel}</span>{isToday && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Día de hoy" />}<span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-indigo-800 text-white font-mono' : 'bg-slate-800 text-slate-400 font-mono'}`}>{countForDay}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {viewMode === 'focus' && (
        <>
          {/* Learning Path Timeline */}
          <LessonTimeline
            activeStep={activeSubTab}
            onStepClick={handleStepClick}
            completedSteps={SUBTAB_ORDER.filter((s) => stepDone[s])}
            totalMinutes={currentClass.timeBreakdown?.reduce((sum, p) => sum + p.minutes, 0) || 90}
            lockedSteps={lockedSteps}
            nextStepId={stepDone[firstIncomplete] ? undefined : firstIncomplete}
            nextStepLabel={stepDone[firstIncomplete] ? undefined : nextStepLabel}
            nextStepSublabel={stepDone[firstIncomplete] ? undefined : SUBTAB_HINTS[firstIncomplete]}
          />

          {/* Main Class Card */}
          <div className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{subject.name}</span>
                <span className="text-xs text-slate-400 font-medium">{currentClass.date}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {isPilotAvailable && !showInteractivePilot && (
                  <button
                    onClick={() => setShowInteractivePilot(true)}
                    className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-black bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-md transition-all touch-lift"
                    title="Explora la clase con simulación multiagente y trazado de rayos"
                  >
                    <Cpu className="w-4 h-4 text-cyan-200" />
                    <span>Piloto Interactivo (Beta)</span>
                  </button>
                )}
                {/* Descarga de la guía didáctica SIEMPRE visible (inscritos y demo) */}
                <button
                  onClick={handleDownloadDailyGuides}
                  disabled={!!batchProgress}
                  className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 disabled:opacity-70 disabled:cursor-wait text-white shadow-md transition-all touch-lift"
                >
                  <Layers className={`w-4 h-4 ${batchProgress ? 'animate-pulse' : ''}`} />
                  <span>{batchProgress ? `Generando diario ${batchProgress.done}/${batchProgress.total}…` : 'Descargar Guía Didáctica'}</span>
                </button>
                {allActivitiesCompleted && (
                  <span className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-200">
                    <CheckCircle2 className="w-4 h-4" /><span>Clase Completada ✓</span>
                  </span>
                )}
              </div>
            </div>
            {batchMessage && (
              <p className={`text-[11px] font-semibold ${batchMessage.kind === 'ok' ? 'text-emerald-300' : batchMessage.kind === 'warn' ? 'text-amber-300' : 'text-rose-300'}`}>{batchMessage.text}</p>
            )}
            <div><h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{currentClass.theme}</h1></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="lg:col-span-2 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div><span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-0.5">Objetivo de Aprendizaje</span><p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{currentClass.objective}</p></div>
              </div>
            </div>
          </div>

          {showInteractivePilot ? (
            <InteractivePilotSandbox
              subjectCode={subject?.id || 'subj-fis-bgu-01'}
              lessonTheme={currentClass.theme}
              onExit={() => setShowInteractivePilot(false)}
            />
          ) : (
            <>
              {/* SUB-TAB 1: CLASE EN VIVO — EL PROFESOR IA PROTAGONIZA EL ESPACIO CENTRAL */}
              {activeSubTab === 'content' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-indigo-900/80 to-slate-900 border-2 border-indigo-500/30 shadow-xl">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2"><BrainCircuit className="w-6 h-6 text-indigo-400" /> Tu Sala de Clase Interactiva</h2>
                  <p className="text-indigo-200 mt-1 text-xs sm:text-sm">
                    {subject.teacher.name} te acompaña en {MICRO_TOTAL} mini-lecciones con retos. Avanza una y responde su reto.
                  </p>
                </div>
              </div>

              {/* En tablet táctil (iPad/Android, cualquier ancho) NO se parte en dos columnas: el chat
                  quedaría angosto a la derecha. Solo el escritorio (puntero fino) usa 2 columnas en xl+. */}
              <div className={`grid grid-cols-1 gap-6 items-start ${isTouchTablet ? '' : 'xl:grid-cols-12'}`}>
                {/* COLUMNA CENTRAL: RUTA DE MICRO-LECCIONES DIRIGIDA POR TU PROFESOR */}
                <div className={isTouchTablet ? '' : 'xl:col-span-8'}>
                  <MicroLessonPlayer
                    dailyClass={currentClass}
                    subject={subject}
                    student={currentStudent}
                    cleared={microCleared}
                    onMarkCleared={(index) => markMicroCleared(currentClass.id, index)}
                    onResetRoute={() => resetMicroRoute(currentClass.id)}
                    onRouteComplete={() => setCompletedSteps((prev) => new Set(prev).add('content'))}
                    onGoToLab={() => handleStepClick('simulator')}
                    onStepsResolved={(steps) => { routeStepsForClass.current = currentClass.id; setRouteSteps(steps); }}
                  />
                </div>

                {/* COLUMNA LATERAL: COMPAÑERO IA + RECURSOS */}
                <aside className={`space-y-6 ${isTouchTablet ? '' : 'xl:col-span-4'}`}>
                  <ClassTeacherChat compact />
                  <div className="rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowResources((v) => !v)}
                      aria-expanded={showResources}
                      className="w-full min-h-[56px] px-6 py-4 flex items-center justify-between gap-3 text-left hover:bg-slate-800 transition-colors"
                    >
                      <span className="text-base font-bold text-white flex items-center gap-2"><Layers className="w-5 h-5 text-indigo-400" /><span>Herramientas de apoyo</span></span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showResources ? 'rotate-180' : ''}`} />
                    </button>
                    {showResources && (
                      <div className="px-6 pb-6 space-y-3">
                        {resourcesList.length > 0 && (
                          <div className="flex items-start gap-2 p-3 mb-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-200">
                            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                            <p>Úsalos si necesitas ayuda extra para pasar los niveles.</p>
                          </div>
                        )}
                        {resourcesList.length > 0 ? (
                          resourcesList.map((res: any) => (
                            <div key={res.id} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-700/60 space-y-2 hover:border-slate-500 transition-all">
                              <div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">{res.type}</span></div>
                              <h4 className="text-xs font-bold text-slate-200 line-clamp-2">{res.title}</h4>
                              {res.url && res.url !== '#' && <a href={forceSpanishUrl(res.type === 'video' ? getYouTubeWatchUrl(res.url, res.title) : res.url)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 pt-1.5"><span>{res.type === 'video' ? 'Ver video' : 'Abrir recurso'}</span><ExternalLink className="w-3 h-3" /></a>}
                            </div>
                          ))
                        ) : (
                          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-700/60 text-xs text-slate-400 text-center italic">Material incluido en la Masterclass y la Guía.</div>
                        )}
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: LABORATORIO Y SIMULADOR */}
          {activeSubTab === 'simulator' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
              <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-emerald-400" /><span>Laboratorio Interactivo</span>
                  </h3>
                  {currentClass.simulatorUrl && (
                    <a href={forceSpanishUrl(currentClass.simulatorUrl)} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                      <span>Abrir en nueva pestaña</span><ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                {currentClass.simulatorUrl ? (
                  <div className="w-full h-[350px] rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-900 relative shadow-inner">
                    <iframe src={forceSpanishUrl(currentClass.simulatorUrl)} title="Simulador Interactivo" className="w-full h-full border-0" allowFullScreen />
                  </div>
                ) : (
                  <div className="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-700 flex flex-col items-center justify-center">
                    <Cpu className="w-12 h-12 text-slate-500 mb-3" />
                    <span className="text-sm font-bold text-slate-300">Esta lección no usa un simulador web.</span>
                    <p className="text-xs text-slate-400 mt-1">Los experimentos de hoy se realizan con materiales físicos.</p>
                  </div>
                )}
              </div>

              <ClassVideoPlayer
                currentClass={currentClass}
                subject={subject}
                onActivitySelect={(actId: string) => {
                  const act = currentClass.activities?.find((a: any) => a.id === actId);
                  if (act) setSelectedActivityForModal(act);
                }}
              />
            </div>
          )}

          {/* SUB-TAB 3: TALLER PRÁCTICO */}
          {activeSubTab === 'activities' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-6 shadow-xl animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
                <div>
                  <div className="flex items-center gap-2"><ListTodo className="w-5 h-5 text-indigo-400" /><h3 className="text-lg font-bold text-white">Taller Práctico de la Lección</h3></div>
                  <p className="text-xs text-slate-400 mt-1">Actividades temáticas alineadas al camino progresivo de la Masterclass.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-medium">
                    Completadas: <strong className="text-emerald-400 font-mono">{isReviewWeek ? 0 : activitiesList.filter((a: any) => a.completed).length}</strong> / {activitiesList.length}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {activitiesList.length > 0 ? (
                  activitiesList.map((act: any, index: number) => {
                    const displayActCompleted = isReviewWeek ? false : act.completed;

                    return (
                      <div key={act.id} className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${displayActCompleted ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200' : 'bg-slate-900/80 border-slate-700/80 hover:border-indigo-500/50 hover:bg-slate-900 text-slate-300'}`}>
                        <div className="flex items-start gap-3.5 flex-1 cursor-pointer" onClick={() => setSelectedActivityForModal(act)}>
                          <button type="button" onClick={(e) => { e.stopPropagation(); toggleActivityCompletion(currentClass.id, act.id); }} className={`relative w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all text-xs font-bold after:absolute after:-inset-2 after:content-[''] ${displayActCompleted ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'border border-slate-600 bg-slate-800 text-slate-400 hover:border-indigo-400 hover:text-white'}`} title={displayActCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}>
                            {displayActCompleted ? '✓' : index + 1}
                          </button>
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300">{act.title}</h4>
                              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-indigo-300">{act.type === 'practice' ? 'Práctica' : act.type === 'project' ? 'Proyecto' : act.type === 'reflection' ? 'Reflexión' : act.type === 'experiment' ? 'Experimento' : 'Evaluación'}</span>
                              {displayActCompleted && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Completada</span>}
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{act.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-800 shrink-0">
                          <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">+{act.points} pts</span>
                          <button type="button" onClick={() => setSelectedActivityForModal(act)} className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${displayActCompleted ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'}`}>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{displayActCompleted ? 'Ver / Editar' : 'Resolver ▶'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-700 text-center space-y-2">
                    <ListTodo className="w-8 h-8 text-slate-500 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-300">Sin actividades adicionales</h4>
                    <p className="text-xs text-slate-500">Todo el taller se realizó dentro de la Masterclass Interactiva.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SUB-TAB 4: GUÍA Y EVIDENCIAS */}
          {activeSubTab === 'homework' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-4 flex flex-col justify-between shadow-lg">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Diario de Guías Didácticas del Día</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Un solo documento con <b>todas las materias del horario de hoy</b>: portada + una hoja por clase (Desarrollo del Tema + Taller A/B con cajones de escritura).
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-emerald-300">
                    📄 {dayClassCount} materia{dayClassCount === 1 ? '' : 's'} programada{dayClassCount === 1 ? '' : 's'} · 1 hoja por clase · listo para firmar
                  </div>
                </div>
                <div className="space-y-2">
                  <button onClick={handleDownloadDailyGuides} disabled={!!batchProgress} className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-70 disabled:cursor-wait text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2">
                    <Layers className={`w-4 h-4 ${batchProgress ? "animate-pulse" : ""}`} />
                    <span>{batchProgress ? `Generando diario ${batchProgress.done}/${batchProgress.total}…` : `Descargar diario del día (${dayClassCount} materias)`}</span>
                  </button>
                  {batchMessage && (
                    <p className={`text-[11px] text-center font-semibold ${batchMessage.kind === 'ok' ? 'text-emerald-300' : batchMessage.kind === 'warn' ? 'text-amber-300' : 'text-rose-300'}`}>{batchMessage.text}</p>
                  )}
                  <p className="text-[10px] text-slate-500 text-center leading-relaxed">Al abrir el archivo usa «Imprimir / Guardar PDF combinado»: cada materia sale en su propia hoja A4 con el logo de Wisdom School.</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/60 space-y-4 flex flex-col justify-between shadow-lg">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Subir Tarea / Evidencia</h3>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700/80">
                    {currentClass.homeworkTask}
                  </p>
                  <p className="text-xs text-slate-400">
                    Sube la foto de tu libreta para que la IA y tu profesor {subject.teacher.name} evalúen tu razonamiento.
                  </p>
                </div>
                <button onClick={handleGoToSubmitWork} className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" /><span>Entregar Trabajo</span>
                </button>
              </div>
            </div>
          )}
            </>
          )}

        </>
      )}

      <ActivityDetailModal isOpen={Boolean(selectedActivityForModal)} onClose={() => setSelectedActivityForModal(null)} activity={selectedActivityForModal} dailyClass={currentClass} subject={subject} onToggleCompletion={toggleActivityCompletion} onAskTeacher={openTeacherDrawerWithContext} />
    </div>
  );
};