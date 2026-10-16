import React from 'react';
import {
  Loader2,
  Inbox,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

/**
 * 1. Estado de Carga (LoadingState)
 * Accesible con aria-live y visualmente armónico con el tema oscuro #0A0D11.
 */
export const LoadingState: React.FC<{
  title?: string;
  description?: string;
  className?: string;
}> = ({
  title = 'Cargando contenido...',
  description = 'Obteniendo datos pedagógicos y sincronizando con el servidor local.',
  className = '',
}) => (
  <div
    role="status"
    aria-live="polite"
    className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl bg-[#121820]/80 border border-[#283545] space-y-4 ${className}`}
  >
    <div className="relative">
      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
      <div className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-xl animate-pulse" />
    </div>
    <div className="space-y-1 max-w-sm">
      <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

/**
 * 2. Estado Vacío (EmptyState)
 * Comunica ausencia de registros sin frustrar al usuario, ofreciendo acción de recuperación.
 */
export const EmptyState: React.FC<{
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = Inbox,
  className = '',
}) => (
  <div
    className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl bg-[#121820]/60 border border-dashed border-[#283545] space-y-4 ${className}`}
  >
    <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400">
      <Icon className="w-7 h-7" />
    </div>
    <div className="space-y-1.5 max-w-md">
      <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
    {actionLabel && onAction && (
      <button
        type="button"
        onClick={onAction}
        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all hover:scale-105"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

/**
 * 3. Estado de Error (ErrorState)
 * Diagnóstico claro, sin tecnicismos opacos y con botón de reintento.
 */
export const ErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}> = ({
  title = 'No se pudo cargar la información',
  message = 'Ocurrió un problema temporal al procesar la solicitud. Por favor intenta de nuevo.',
  onRetry,
  className = '',
}) => (
  <div
    role="alert"
    className={`flex flex-col items-center justify-center p-8 sm:p-10 text-center rounded-3xl bg-rose-950/20 border border-rose-500/30 space-y-4 ${className}`}
  >
    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
      <AlertTriangle className="w-6 h-6" />
    </div>
    <div className="space-y-1.5 max-w-md">
      <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
      <p className="text-xs text-rose-300 leading-relaxed">{message}</p>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Reintentar</span>
      </button>
    )}
  </div>
);

/**
 * 4. Estado de Acceso Denegado (AccessDeniedState)
 * Para roles insuficientes o sesiones no autorizadas.
 */
export const AccessDeniedState: React.FC<{
  title?: string;
  message?: string;
  requiredRole?: string;
  onNavigateHome?: () => void;
  className?: string;
}> = ({
  title = 'Acceso Restringido por Rol',
  message = 'Esta vista requiere credenciales específicas de perfil para garantizar la privacidad y seguridad pedagógica.',
  requiredRole,
  onNavigateHome,
  className = '',
}) => (
  <div
    role="alert"
    className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl bg-amber-950/20 border border-amber-500/30 space-y-4 ${className}`}
  >
    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
      <ShieldAlert className="w-7 h-7" />
    </div>
    <div className="space-y-1.5 max-w-md">
      {requiredRole && (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
          Rol Requerido: {requiredRole}
        </span>
      )}
      <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{message}</p>
    </div>
    {onNavigateHome && (
      <button
        type="button"
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al Inicio</span>
      </button>
    )}
  </div>
);

/**
 * 5. Estado de Éxito (SuccessState)
 */
export const SuccessState: React.FC<{
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}> = ({
  title,
  message,
  actionLabel,
  onAction,
  className = '',
}) => (
  <div
    role="status"
    className={`flex flex-col items-center justify-center p-8 sm:p-10 text-center rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-4 ${className}`}
  >
    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
      <CheckCircle2 className="w-6 h-6" />
    </div>
    <div className="space-y-1.5 max-w-md">
      <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
      <p className="text-xs text-emerald-300 leading-relaxed">{message}</p>
    </div>
    {actionLabel && onAction && (
      <button
        type="button"
        onClick={onAction}
        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

/**
 * 6. Badge de Datos de Desarrollo
 * Garantiza cumplimiento de la regla:
 * "Usa contenido de muestra solamente cuando esté marcado como datos de desarrollo; no lo presentes como información real."
 */
export const DevelopmentBadge: React.FC<{
  stage?: string;
  label?: string;
  className?: string;
}> = ({
  stage = 'Etapa 04',
  label = 'Datos de desarrollo controlado',
  className = '',
}) => (
  <div
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${className}`}
    title="Los registros exhibidos en esta vista son demostrativos para validación de interfaz."
  >
    <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
    <span>{stage}: {label}</span>
  </div>
);

