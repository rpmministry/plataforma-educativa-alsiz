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
 * Accesible con aria-live y visualmente sobrio sin resplandores neón.
 */
export const LoadingState: React.FC<{
  title?: string;
  description?: string;
  className?: string;
}> = ({
  title = 'Cargando contenido...',
  description = 'Obteniendo datos pedagógicos y sincronizando con el servidor.',
  className = '',
}) => (
  <div
    role="status"
    aria-live="polite"
    className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-[#18181B] border border-[#27272A] space-y-4 ${className}`}
  >
    <div className="w-12 h-12 rounded-xl bg-[#27272A] border border-[#3F3F46] flex items-center justify-center text-[#E0A82E]">
      <Loader2 className="w-6 h-6 animate-spin" />
    </div>
    <div className="space-y-1 max-w-sm">
      <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
      <p className="text-xs text-[#A1A1AA] leading-relaxed">{description}</p>
    </div>
  </div>
);

/**
 * 2. Estado Vacío (EmptyState)
 * Comunica ausencia de registros sin frustrar al usuario, ofreciendo acción clara.
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
    className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-[#18181B]/50 border border-dashed border-[#27272A] space-y-4 ${className}`}
  >
    <div className="w-12 h-12 rounded-xl bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#71717A]">
      <Icon className="w-6 h-6" />
    </div>
    <div className="space-y-1.5 max-w-md">
      <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
      <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">{description}</p>
    </div>
    {actionLabel && onAction && (
      <button
        type="button"
        onClick={onAction}
        className="px-4 py-2 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-white font-medium text-xs border border-[#3F3F46] transition-colors"
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
    className={`flex flex-col items-center justify-center p-8 sm:p-10 text-center rounded-2xl bg-[#18181B] border border-[#B42318]/40 space-y-4 ${className}`}
  >
    <div className="w-12 h-12 rounded-xl bg-[#B42318]/15 border border-[#B42318]/30 flex items-center justify-center text-[#F87171]">
      <AlertTriangle className="w-6 h-6" />
    </div>
    <div className="space-y-1.5 max-w-md">
      <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
      <p className="text-xs text-[#F87171] leading-relaxed">{message}</p>
    </div>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B42318] hover:bg-[#991B1B] text-white font-semibold text-xs transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Reintentar</span>
      </button>
    )}
  </div>
);

/**
 * 4. Estado de Acceso Restringido (AccessDeniedState)
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
    className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-[#18181B] border border-[#B45309]/40 space-y-4 ${className}`}
  >
    <div className="w-12 h-12 rounded-xl bg-[#B45309]/15 border border-[#B45309]/30 flex items-center justify-center text-[#FBBF24]">
      <ShieldAlert className="w-6 h-6" />
    </div>
    <div className="space-y-1.5 max-w-md">
      {requiredRole && (
        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#B45309]/15 text-[#FBBF24] border border-[#B45309]/30">
          Rol Requerido: {requiredRole}
        </span>
      )}
      <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
      <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">{message}</p>
    </div>
    {onNavigateHome && (
      <button
        type="button"
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-white font-medium text-xs border border-[#3F3F46] transition-colors"
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
    className={`flex flex-col items-center justify-center p-8 sm:p-10 text-center rounded-2xl bg-[#18181B] border border-[#1B7F4B]/40 space-y-4 ${className}`}
  >
    <div className="w-12 h-12 rounded-xl bg-[#1B7F4B]/15 border border-[#1B7F4B]/30 flex items-center justify-center text-[#34D399]">
      <CheckCircle2 className="w-6 h-6" />
    </div>
    <div className="space-y-1.5 max-w-md">
      <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
      <p className="text-xs text-[#34D399] leading-relaxed">{message}</p>
    </div>
    {actionLabel && onAction && (
      <button
        type="button"
        onClick={onAction}
        className="px-4 py-2 rounded-xl bg-[#1B7F4B] hover:bg-[#15803D] text-white font-semibold text-xs transition-colors"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

/**
 * 6. Badge de Datos de Desarrollo
 */
export const DevelopmentBadge: React.FC<{
  stage?: string;
  label?: string;
  className?: string;
}> = ({
  stage = 'Validación',
  label = 'Modo controlado',
  className = '',
}) => (
  <div
    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#18181B] border border-[#27272A] text-[#A1A1AA] text-[10px] font-medium tracking-wide ${className}`}
    title="Entorno activo"
  >
    <span className="w-1.5 h-1.5 rounded-full bg-[#E0A82E]" />
    <span>{stage}: {label}</span>
  </div>
);
