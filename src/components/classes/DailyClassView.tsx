import React, { useState, useEffect, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useScrollToTopOnChange } from '../../hooks/useScrollToTopOnChange';
import { useTouchTablet } from '../../hooks/useTouchTablet';
import { scrollAppToTop } from '../../utils/scrollToTop';
import { DailyClass, ClassActivity } from '../../types';
import { getYouTubeWatchUrl } from '../../utils/youtube';
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
  ListTodo,
  Upload,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Layers,
  Lightbulb,
  Calendar,
  AlertCircle,
  BrainCircuit,
  Lock,
  ChevronDown,
  Bot,
  Target,
  BookOpen,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

const forceSpanishUrl = (url: string) => {
  if (!url || url === '#') return '#';
  try {
    const u = new URL(url);
    if (u.hostname.includes('phet.colorado.edu')) u.searchParams.set('locale', 'es');
    if (u.hostname.includes('storyweaver.org.in')) u.searchParams.set('hl', 'es-MX');
    if (u.hostname.includes('youtube.com')) {
      u.searchParams.set('hl', 'es');
      u.searchParams.set('cc_lang_pref', 'es');
    }
    return u.toString();
  } catch (e) {
    return url;
  }
};

type ActiveSubTab = 'content' | 'simulator' | 'activities' | 'homework';

const SUBTAB_ORDER: ActiveSubTab[] = ['content', 'simulator', 'activities', 'homework'];
const SUBTAB_LABELS: Record<ActiveSubTab, string> = {
  content: 'Lección Socrática',
  simulator: 'Laboratorio Digital',
  activities: 'Taller Práctico',
  homework: 'Guía & Evidencias',
};
const SUBTAB_HINTS: Record<ActiveSubTab, string> = {
  content: `Completa las ${MICRO_TOTAL} micro-lecciones con sus retos formativos.`,
  simulator: 'Refuerza conceptos mediante simulación interactiva y video con voz.',
  activities: 'Resuelve las actividades temáticas del taller práctico.',
  homework: 'Descarga tu diario oficial del día y entrega la evidencia.',
};

export const DailyClassView: React.FC = () => {
  const [isReviewWeek, setIsReviewWeek] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isPilotAvailable, setIsPilotAvailable] = useState<boolean>(false);
  const [showInteractivePilot, setShowInteractivePilot] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    setIsReviewWeek(new Date() < new Date('2026-09-07T00:00:00'));

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
    activeClass,
    todayClasses,
    allStudentClasses,
    selectedDayOfWeek,
    setSelectedDayOfWeek,
    setActiveClass,
    studentSubjects,
    activeSubject,
    setActiveSubject,
    openTeacherDrawerWithContext,
    toggleActivityCompletion,
    currentStudent,
    schoolWeek,
    microRouteProgress,
    markMicroCleared,
    resetMicroRoute,
  } = useSchool();

  const isTouchTablet = useTouchTablet();

  const [activeSubTab, setActiveSubTab] = useState<ActiveSubTab>('content');
  const [showResources, setShowResources] = useState(false);
  const [routeSteps, setRouteSteps] = useState<{ title: string; text: string }[]>([]);
  const [batchProgress, setBatchProgress] = useState<{ done: number; total: number } | null>(null);
  const [batchMessage, setBatchMessage] = useState<{ kind: 'ok' | 'warn' | 'error'; text: string } | null>(null);
  const routeStepsForClass = useRef<string | null>(null);
  const [selectedActivityForModal, setSelectedActivityForModal] = useState<ClassActivity | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const currentClass = activeClass || todayClasses[0] || allStudentClasses[0];
  const subject = currentClass
    ? studentSubjects.find((s: any) => s.id === currentClass.subjectId) || activeSubject
    : studentSubjects[0];

  const activitiesList = currentClass?.activities || [];
  const resourcesList = currentClass?.resources || [];

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
  const lockedSteps = SUBTAB_ORDER.filter(
    (s) => s !== 'homework' && !stepDone[s] && SUBTAB_ORDER.indexOf(s) > firstIncompleteIndex
  );
  const nextStepLabel = `${SUBTAB_LABELS[firstIncomplete]}${
    firstIncomplete === 'content' && !microDone ? ` · ${microCleared.length}/${MICRO_TOTAL}` : ''
  }`;

  const dayClassCount = todayClasses.filter((c: any) => c.studentId === currentStudent.id).length;

  useScrollToTopOnChange([activeSubTab, currentClass?.id]);

  const handleDownloadDailyGuides = () => {
    void renderConsolidatedGuide();
  };

  const renderConsolidatedGuide = async () => {
    setBatchMessage(null);
    let dayClasses = todayClasses.filter((c: any) => c.studentId === currentStudent.id);
    let origenDia = 'horario del día seleccionado';
    if (!dayClasses.length && currentClass?.date) {
      dayClasses = allStudentClasses.filter(
        (c: any) => c.studentId === currentStudent.id && c.date === currentClass.date
      );
      origenDia = 'horario del día de la clase activa';
    }
    if (!dayClasses.length) {
      setBatchMessage({
        kind: 'warn',
        text: 'No hay asignaturas programadas en el horario para este día. Cambia de día en el selector y vuelve a intentar.',
      });
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
        if (steps.length < 2 && routeStepsForClass.current === cls.id && routeSteps.length >= 2) {
          steps = routeSteps;
        }
        let ai: any = null;
        if (subj) {
          try {
            ai = await requestGuideContent({
              student: currentStudent,
              subject: subj,
              dailyClass: cls,
              steps: steps.length >= 2 ? steps : undefined,
            });
          } catch {
            ai = null;
          }
          if (!ai && steps.length >= 2) {
            ai = routeGuideContent(steps, {
              theme: cls.theme,
              studentGrade: currentStudent.grade,
              studentId: currentStudent.id,
              subjectName: subj.name,
            });
          }
        }
        items.push({ currentClass: cls as DailyClass, subject: subj, ai });
      }
      const filename = downloadDailyGuidesBundle({
        studentName: currentStudent.name,
        studentGrade: currentStudent.grade,
        dateStr,
        dayLabel: selectedDayOfWeek,
        studentId: currentStudent.id,
        items,
      });
      setBatchMessage({
        kind: 'ok',
        text: `Diario listo: ${items.length} guía${items.length === 1 ? '' : 's'} (${origenDia}) en un solo documento → ${filename}. Ábrelo y usa «Imprimir / Guardar PDF».`,
      });
      setTimeout(() => setBatchMessage(null), 15000);
    } catch (e: any) {
      setBatchMessage({
        kind: 'error',
        text: `No se pudo armar el diario: ${e?.message || 'error inesperado'}. Vuelve a intentarlo.`,
      });
    } finally {
      setBatchProgress(null);
    }
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

  const handleGoToSubmitWork = () => handleStepClick('activities');

  if (!isMounted) {
    return (
      <div className="space-y-6 animate-pulse" aria-hidden>
        <div className="h-10 w-56 rounded-2xl bg-[#18181B]" />
        <div className="h-24 rounded-3xl bg-[#18181B]" />
        <div className="h-48 rounded-3xl bg-[#18181B]" />
        <div className="h-64 rounded-3xl bg-[#18181B]" />
      </div>
    );
  }

  if (!currentClass || !subject) {
    return (
      <div className="p-12 text-center rounded-3xl bg-[#18181B] border border-[#27272A] text-zinc-300 space-y-3">
        <BookOpen className="w-10 h-10 text-amber-400 mx-auto" />
        <h3 className="text-lg font-bold text-white">No hay clases seleccionadas</h3>
        <p className="text-xs text-[#A1A1AA]">
          Selecciona un día en el cronograma superior para visualizar las lecciones académicas disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title={isReviewWeek ? 'Aulas Interactivas · Modo Repaso Curricular' : 'Aula Virtual & Clases del Día'}
      />

      {currentStudent.isDemo && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs flex items-start gap-2.5">
          <Lock className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <p className="leading-relaxed">
            Estás explorando en <strong className="text-amber-100">Modo Demo</strong>: puedes cursar la clase
            completa con tu profesor virtual, reproducir audio y experimentar con los simuladores interactivos.
          </p>
        </div>
      )}

      {/* Selector de Día Escolar y Horario */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#18181B] border border-[#27272A] shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold text-white">
              Cronograma Escolar ({currentStudent.name}):
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {schoolWeek.map(({ day, dateLabel, isToday }) => {
              const isSelected = day === selectedDayOfWeek;
              const countForDay = allStudentClasses.filter(
                (c: any) => c.studentId === currentStudent.id && c.dayOfWeek === day
              ).length;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => {
                    setSelectedDayOfWeek(day);
                    const classesOnDay = allStudentClasses.filter(
                      (c: any) => c.studentId === currentStudent.id && c.dayOfWeek === day
                    );
                    if (classesOnDay.length > 0) {
                      setActiveClass(classesOnDay[0]);
                      const clsSub = studentSubjects.find((s: any) => s.id === classesOnDay[0].subjectId);
                      if (clsSub) setActiveSubject(clsSub);
                    }
                  }}
                  className={`px-3.5 py-1.5 min-h-[42px] rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-[#121215] text-[#A1A1AA] hover:bg-[#27272A] hover:text-white border border-[#27272A]'
                  }`}
                >
                  <span>{day}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isSelected ? 'bg-amber-600/30 text-zinc-950 font-bold' : 'bg-[#18181B] text-[#71717A]'
                    }`}
                  >
                    {dateLabel}
                  </span>
                  {isToday && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Día actual" />}
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-zinc-900/80 text-amber-200' : 'bg-[#27272A] text-zinc-400'
                    }`}
                  >
                    {countForDay}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Secuencia Pedagógica de Aprendizaje (OpenMAIC Phase Stepper) */}
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

      {/* Tarjeta Principal de Identidad de la Clase */}
      <div className="rounded-3xl bg-[#18181B] border border-[#27272A] p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/25 uppercase">
              {subject.code} · {subject.name}
            </span>
            {currentClass.unit && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#27272A] text-zinc-300 border border-[#3F3F46]">
                {currentClass.unit}
              </span>
            )}
            <span className="text-xs text-[#A1A1AA] font-mono">
              {currentClass.dayOfWeek} {currentClass.date}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isPilotAvailable && !showInteractivePilot && (
              <button
                type="button"
                onClick={() => setShowInteractivePilot(true)}
                className="flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold bg-[#27272A] hover:bg-[#323238] border border-cyan-500/40 text-cyan-300 shadow-md transition-all"
                title="Explora la clase con simulación multi-agente interactiva"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Piloto Multi-Agente (Beta)</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownloadDailyGuides}
              disabled={!!batchProgress}
              className="flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-70 disabled:cursor-wait text-white shadow-md transition-all"
            >
              <Layers className={`w-4 h-4 ${batchProgress ? 'animate-pulse' : ''}`} />
              <span>
                {batchProgress
                  ? `Generando diario ${batchProgress.done}/${batchProgress.total}…`
                  : 'Descargar Guía Didáctica (PDF)'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => openTeacherDrawerWithContext(subject, currentClass)}
              className="flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-bold bg-[#27272A] hover:bg-[#3F3F46] text-amber-300 border border-amber-500/30 transition-all"
              title="Abrir diálogo con el tutor virtual"
            >
              <Bot className="w-4 h-4" />
              <span>Tutor Virtual</span>
            </button>

            {allActivitiesCompleted && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Clase Completada ✓</span>
              </span>
            )}
          </div>
        </div>

        {batchMessage && (
          <p
            className={`text-xs font-semibold ${
              batchMessage.kind === 'ok'
                ? 'text-emerald-300'
                : batchMessage.kind === 'warn'
                ? 'text-amber-300'
                : 'text-rose-300'
            }`}
          >
            {batchMessage.text}
          </p>
        )}

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {currentClass.theme}
          </h1>
        </div>

        {/* Bloque Pedagógico: Objetivo y Competencia Oficial */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#121215] border border-[#27272A] flex items-start gap-3.5">
          <Target className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
              Objetivo de Aprendizaje Curricular
            </span>
            <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
              {currentClass.objective}
            </p>
            {currentClass.competencyDcd && (
              <p className="text-[11px] text-[#A1A1AA] pt-1">
                <strong className="text-zinc-300">Destreza / Criterio:</strong> {currentClass.competencyDcd}
              </p>
            )}
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
          {/* FASE 1: LECCIÓN SOCRÁTICA GUIADA */}
          {activeSubTab === 'content' && (
            <div className="space-y-6 animate-fade-in">
              {/* Tarjeta de Aula Socrática Multi-Agente */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#18181B] via-[#1E1E22] to-[#141417] border border-[#27272A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <span>Aula Socrática de Aprendizaje Activo</span>
                    </h2>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">
                      {subject.teacher.name} te orienta a través de {MICRO_TOTAL} micro-lecciones interactivas. Avanza a tu propio ritmo.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#A1A1AA] bg-[#121215] px-3.5 py-2 rounded-xl border border-[#27272A] shrink-0">
                  <Bot className="w-4 h-4 text-amber-400" />
                  <span>Tutoría socrática permanente</span>
                </div>
              </div>

              {/* Distribución: 8 cols lección + 4 cols tutor/recursos */}
              <div className={`grid grid-cols-1 gap-6 items-start ${isTouchTablet ? '' : 'xl:grid-cols-12'}`}>
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
                    onStepsResolved={(steps) => {
                      routeStepsForClass.current = currentClass.id;
                      setRouteSteps(steps);
                    }}
                  />
                </div>

                <aside className={`space-y-6 ${isTouchTablet ? '' : 'xl:col-span-4'}`}>
                  <ClassTeacherChat compact />

                  {/* Acordeón de Recursos y Materiales de Consulta */}
                  <div className="rounded-3xl bg-[#18181B] border border-[#27272A] shadow-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowResources((v) => !v)}
                      aria-expanded={showResources}
                      className="w-full min-h-[52px] px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-[#1E1E22] transition-colors"
                    >
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>Herramientas & Material de Apoyo</span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#A1A1AA] transition-transform ${
                          showResources ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {showResources && (
                      <div className="px-5 pb-5 space-y-3 border-t border-[#27272A] pt-4">
                        {resourcesList.length > 0 && (
                          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <p>Consulta estos materiales complementarios para enriquecer tus evidencias.</p>
                          </div>
                        )}

                        {resourcesList.length > 0 ? (
                          resourcesList.map((res: any) => (
                            <div
                              key={res.id}
                              className="p-3.5 rounded-2xl bg-[#121215] border border-[#27272A] space-y-2 hover:border-[#3F3F46] transition-all"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                  {res.type}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-zinc-200 line-clamp-2">{res.title}</h4>
                              {res.url && res.url !== '#' && (
                                <a
                                  href={forceSpanishUrl(
                                    res.type === 'video'
                                      ? getYouTubeWatchUrl(res.url, res.title)
                                      : res.url
                                  )}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 pt-1"
                                >
                                  <span>{res.type === 'video' ? 'Ver video' : 'Abrir recurso'}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-4 rounded-2xl bg-[#121215] border border-[#27272A] text-xs text-[#A1A1AA] text-center italic">
                            Material conceptual cubierto en la lección teórica y en la guía oficial.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          )}

          {/* FASE 2: LABORATORIO DIGITAL & SIMULACIONES */}
          {activeSubTab === 'simulator' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in items-start">
              {/* Simulador Interactivo */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#18181B] border border-[#27272A] space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span>Laboratorio Interactivo de Simulación</span>
                  </h3>
                  {currentClass.simulatorUrl && (
                    <a
                      href={forceSpanishUrl(currentClass.simulatorUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                    >
                      <span>Pantalla completa</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {currentClass.simulatorUrl ? (
                  <div className="w-full h-[380px] rounded-2xl overflow-hidden border border-[#27272A] bg-black shadow-inner">
                    <iframe
                      src={forceSpanishUrl(currentClass.simulatorUrl)}
                      title="Simulador Didáctico Interactivo"
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="p-12 text-center bg-[#121215] rounded-2xl border border-[#27272A] flex flex-col items-center justify-center space-y-2">
                    <Cpu className="w-10 h-10 text-[#71717A] mb-1" />
                    <span className="text-sm font-bold text-zinc-200">
                      Esta lección no requiere simulador digital web.
                    </span>
                    <p className="text-xs text-[#A1A1AA] max-w-sm">
                      Las observaciones prácticas de hoy se fundamentan en esquemas en libreta y materiales físicos del entorno.
                    </p>
                  </div>
                )}
              </div>

              {/* Centro de Video Multimedia */}
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

          {/* FASE 3: TALLER PRÁCTICO & ACTIVIDADES */}
          {activeSubTab === 'activities' && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#18181B] border border-[#27272A] space-y-6 shadow-xl animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#27272A]">
                <div>
                  <div className="flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">Taller Práctico & Aplicación</h3>
                  </div>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    Actividades de consolidación conceptual y proyectos aplicados de la lección.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs px-3.5 py-1.5 rounded-xl bg-[#121215] border border-[#27272A] text-zinc-300 font-medium">
                    Completadas:{' '}
                    <strong className="text-emerald-400 font-mono">
                      {isReviewWeek ? 0 : activitiesList.filter((a: any) => a.completed).length}
                    </strong>{' '}
                    de {activitiesList.length}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {activitiesList.length > 0 ? (
                  activitiesList.map((act: any, index: number) => {
                    const displayActCompleted = isReviewWeek ? false : act.completed;

                    return (
                      <div
                        key={act.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          displayActCompleted
                            ? 'bg-[#141E18] border-emerald-500/40 text-zinc-200'
                            : 'bg-[#121215] border-[#27272A] hover:border-[#3F3F46] text-zinc-300'
                        }`}
                      >
                        <div
                          className="flex items-start gap-3.5 flex-1 cursor-pointer"
                          onClick={() => setSelectedActivityForModal(act)}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleActivityCompletion(currentClass.id, act.id);
                            }}
                            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all text-xs font-mono font-bold ${
                              displayActCompleted
                                ? 'bg-emerald-500 text-zinc-950 shadow-md'
                                : 'border border-[#3F3F46] bg-[#18181B] text-[#A1A1AA] hover:border-amber-400 hover:text-white'
                            }`}
                            title={displayActCompleted ? 'Marcar como pendiente' : 'Marcar como completada'}
                          >
                            {displayActCompleted ? '✓' : index + 1}
                          </button>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-sm sm:text-base font-bold text-white hover:text-amber-300 transition-colors">
                                {act.title}
                              </h4>
                              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-[#18181B] border border-[#27272A] text-amber-300">
                                {act.type === 'practice'
                                  ? 'Práctica'
                                  : act.type === 'project'
                                  ? 'Proyecto'
                                  : act.type === 'reflection'
                                  ? 'Reflexión'
                                  : act.type === 'experiment'
                                  ? 'Experimento'
                                  : 'Evaluación'}
                              </span>
                              {displayActCompleted && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Completada
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-2xl">
                              {act.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#27272A] shrink-0">
                          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                            +{act.points} pts
                          </span>
                          <button
                            type="button"
                            onClick={() => setSelectedActivityForModal(act)}
                            className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                              displayActCompleted
                                ? 'bg-[#27272A] hover:bg-[#3F3F46] text-zinc-200 border border-[#3F3F46]'
                                : 'bg-amber-500 hover:bg-amber-400 text-zinc-950'
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{displayActCompleted ? 'Ver / Editar' : 'Resolver ▶'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 rounded-2xl bg-[#121215] border border-[#27272A] text-center space-y-2">
                    <ListTodo className="w-8 h-8 text-[#71717A] mx-auto" />
                    <h4 className="text-sm font-bold text-zinc-300">Sin actividades adicionales</h4>
                    <p className="text-xs text-[#A1A1AA]">
                      El contenido práctico principal fue desarrollado durante la lección socrática guiada.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FASE 4: SÍNTESIS & EVIDENCIAS */}
          {activeSubTab === 'homework' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in items-start">
              {/* Tarjeta del Diario Oficial Consolidado */}
              <div className="p-6 rounded-3xl bg-[#18181B] border border-[#27272A] space-y-4 flex flex-col justify-between shadow-xl">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Diario Didáctico de Wisdom Academy</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    Genera y descarga el documento unificado con <b>todas las asignaturas del horario de hoy</b>: portada formal con datos de matrícula + ficha por clase con desarrollo temático y taller socrático.
                  </p>
                  <div className="p-3 rounded-xl bg-[#121215] border border-[#27272A] text-xs text-emerald-300">
                    📄 {dayClassCount} materia{dayClassCount === 1 ? '' : 's'} programada{dayClassCount === 1 ? '' : 's'} · 1 hoja por clase · listo para impresión o portafolio
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadDailyGuides}
                    disabled={!!batchProgress}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-70 disabled:cursor-wait text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Layers className={`w-4 h-4 ${batchProgress ? 'animate-pulse' : ''}`} />
                    <span>
                      {batchProgress
                        ? `Generando diario ${batchProgress.done}/${batchProgress.total}…`
                        : `Descargar Diario del Día (${dayClassCount} materias)`}
                    </span>
                  </button>
                  {batchMessage && (
                    <p
                      className={`text-xs text-center font-semibold ${
                        batchMessage.kind === 'ok'
                          ? 'text-emerald-300'
                          : batchMessage.kind === 'warn'
                          ? 'text-amber-300'
                          : 'text-rose-300'
                      }`}
                    >
                      {batchMessage.text}
                    </p>
                  )}
                  <p className="text-[10px] text-[#71717A] text-center leading-relaxed">
                    Al abrir el archivo selecciona «Imprimir / Guardar como PDF»: cada asignatura se genera en hoja individual con el logotipo oficial de Wisdom Academy.
                  </p>
                </div>
              </div>

              {/* Tarjeta de Tarea y Entrega de Evidencia */}
              <div className="p-6 rounded-3xl bg-[#18181B] border border-[#27272A] space-y-4 flex flex-col justify-between shadow-xl">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                    <Upload className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Consigna de Tarea & Registro de Evidencia</h3>
                  <div className="p-3.5 rounded-xl bg-[#121215] border border-[#27272A] space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
                      Consigna de Hoy:
                    </span>
                    <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                      {currentClass.homeworkTask}
                    </p>
                  </div>
                  <p className="text-xs text-[#A1A1AA]">
                    Adjunta la fotografía de tu libreta de evidencias o resuelve las actividades en el taller para que el tutor {subject.teacher.name} evalúe tu argumentación.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleGoToSubmitWork}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Ir al Taller para Entregar Evidencia</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <ActivityDetailModal
        isOpen={Boolean(selectedActivityForModal)}
        onClose={() => setSelectedActivityForModal(null)}
        activity={selectedActivityForModal}
        dailyClass={currentClass}
        subject={subject}
        onToggleCompletion={toggleActivityCompletion}
        onAskTeacher={openTeacherDrawerWithContext}
      />
    </div>
  );
};