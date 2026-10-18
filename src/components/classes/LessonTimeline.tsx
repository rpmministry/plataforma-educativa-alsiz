import React from 'react';
import { BookOpen, Cpu, ListTodo, Upload, CheckCircle2, Clock, Lock, ArrowRight, Sparkles } from 'lucide-react';

interface LessonTimelineProps {
  activeStep: string;
  onStepClick: (step: string) => void;
  completedSteps: string[];
  totalMinutes?: number;
  /** Pasos que el estudiante todavía no puede abrir (aún no llega su turno en la ruta). */
  lockedSteps?: string[];
  /** Paso sugerido por el sistema para continuar de inmediato. */
  nextStepId?: string;
  nextStepLabel?: string;
  nextStepSublabel?: string;
}

const STEPS = [
  {
    id: 'content',
    label: 'Fase 1: Lección Socrática',
    short: 'Lección Socrática',
    phaseNumber: '01',
    icon: BookOpen,
    description: 'Desarrollo conceptual, analogías y retos interactivos',
  },
  {
    id: 'simulator',
    label: 'Fase 2: Laboratorio & Recursos',
    short: 'Laboratorio Digital',
    phaseNumber: '02',
    icon: Cpu,
    description: 'Simulaciones PhET / GeoGebra y video con narración',
  },
  {
    id: 'activities',
    label: 'Fase 3: Taller de Aplicación',
    short: 'Taller Práctico',
    phaseNumber: '03',
    icon: ListTodo,
    description: 'Ejercicios aplicados, problemas guiados y proyectos',
  },
  {
    id: 'homework',
    label: 'Fase 4: Síntesis & Evidencias',
    short: 'Guía & Evidencias',
    phaseNumber: '04',
    icon: Upload,
    description: 'Diario imprimible oficial y entrega de libreta',
  },
];

const getStepStatus = (stepId: string, activeStep: string, completedSteps: string[]) => {
  if (activeStep === stepId) return 'active';
  if (completedSteps.includes(stepId)) return 'completed';
  return 'pending';
};

export const LessonTimeline: React.FC<LessonTimelineProps> = ({
  activeStep,
  onStepClick,
  completedSteps,
  totalMinutes = 90,
  lockedSteps = [],
  nextStepId,
  nextStepLabel,
  nextStepSublabel,
}) => {
  const completedCount = completedSteps.filter((s) => s !== 'reflection').length;
  const percent = Math.min(100, Math.round((completedCount / 4) * 100));
  const nextStep = STEPS.find((s) => s.id === nextStepId);

  return (
    <div className="rounded-3xl bg-[#18181B] border border-[#27272A] p-5 sm:p-6 shadow-xl space-y-5">
      {/* Encabezado del Camino Pedagógico */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
              Metodología Socrática OpenMAIC
            </span>
            <span className="text-xs text-[#A1A1AA] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {totalMinutes} min estimados
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <span>Secuencia Pedagógica de la Clase</span>
          </h3>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            {nextStep ? (
              <>Tu siguiente objetivo es: <strong className="text-zinc-200">{nextStep.short}</strong>.</>
            ) : (
              'Has completado todas las etapas de aprendizaje de esta lección.'
            )}
          </p>
        </div>

        {/* Métrica de Progreso Global */}
        <div className="sm:text-right shrink-0">
          <div className="flex items-baseline sm:justify-end gap-1.5">
            <span className="text-2xl font-black font-mono text-white">{percent}%</span>
            <span className="text-xs text-[#A1A1AA]">completado</span>
          </div>
          <div className="w-36 h-2 rounded-full bg-[#121215] border border-[#27272A] overflow-hidden mt-1">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-[11px] text-[#A1A1AA] font-mono mt-0.5 block">
            {completedCount} de 4 fases superadas
          </span>
        </div>
      </div>

      {/* Banner de Siguiente Paso Destacado */}
      {nextStep && (
        <button
          type="button"
          onClick={() => onStepClick(nextStep.id)}
          className="w-full px-5 py-3.5 rounded-2xl flex items-center justify-between gap-3 text-left bg-gradient-to-r from-[#222226] via-[#1E1E22] to-[#18181B] hover:from-[#2A2A30] hover:to-[#222226] border border-amber-500/30 hover:border-amber-500/50 text-white shadow-lg transition-all group active:scale-[0.99]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300/80">
                Paso Recomendado Ahora
              </span>
              <span className="block text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                {nextStepLabel || nextStep.short}
              </span>
              {nextStepSublabel && (
                <span className="block text-[11px] text-[#A1A1AA] truncate">
                  {nextStepSublabel}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform shrink-0">
            <span className="hidden sm:inline">Continuar</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      )}

      {/* Tarjetas de las 4 Fases de la Clase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const status = getStepStatus(step.id, activeStep, completedSteps);
          const isActive = status === 'active';
          const isCompleted = status === 'completed';
          const isLocked = lockedSteps.includes(step.id);

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick(step.id)}
              disabled={isLocked}
              aria-disabled={isLocked}
              className={`relative flex flex-col items-start text-left p-4 rounded-2xl border transition-all ${
                isLocked
                  ? 'bg-[#121215]/60 border-[#27272A]/40 text-[#71717A] cursor-not-allowed opacity-60'
                  : isActive
                  ? 'bg-[#222226] border-amber-500/60 ring-1 ring-amber-500/30 text-white shadow-lg'
                  : isCompleted
                  ? 'bg-[#141E18] border-emerald-500/40 text-zinc-200 hover:border-emerald-500/60'
                  : 'bg-[#141417] border-[#27272A] text-[#A1A1AA] hover:border-zinc-500 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A1AA]">
                  Fase {step.phaseNumber}
                </span>
                {isLocked ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#71717A]">
                    <Lock className="w-3 h-3" /> Bloqueado
                  </span>
                ) : isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> Superado
                  </span>
                ) : isActive ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30 animate-pulse">
                    En curso
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-[#71717A]">Pendiente</span>
                )}
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${
                    isLocked
                      ? 'bg-[#18181B] border-[#27272A] text-[#71717A]'
                      : isActive
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : isCompleted
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : 'bg-[#18181B] border-[#27272A] text-[#A1A1AA]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h4
                  className={`text-sm font-bold leading-tight ${
                    isActive ? 'text-white' : isCompleted ? 'text-emerald-100' : 'text-zinc-200'
                  }`}
                >
                  {step.short}
                </h4>
              </div>

              <p className="text-[11px] text-[#A1A1AA] leading-snug line-clamp-2 mt-auto">
                {step.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
