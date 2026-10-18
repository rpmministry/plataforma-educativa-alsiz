import React, { useEffect } from 'react';
import {
  Compass,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export interface FeatureNoticeDetails {
  title: string;
  stage: string;
  description: string;
  plannedCapability: string;
  actionHint?: string;
}

interface FeatureNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: FeatureNoticeDetails | null;
}

export const FeatureNoticeModal: React.FC<FeatureNoticeModalProps> = ({
  isOpen,
  onClose,
  details,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !details) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feature-notice-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#18181B] border border-[#27272A] p-6 sm:p-7 shadow-2xl space-y-6 text-[#F4F4F5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado con badge y botón de cerrar */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0A82E]/10 border border-[#E0A82E]/30 text-[#E0A82E] text-[11px] font-semibold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#E0A82E]" />
              <span>{details.stage}</span>
            </div>
            <h2 id="feature-notice-title" className="text-xl font-bold text-white tracking-tight mt-2">
              {details.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de información"
            className="p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-[#27272A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explicación pedagógica y técnica */}
        <div className="space-y-4 text-sm text-[#D4D4D8]">
          <p className="leading-relaxed">
            {details.description}
          </p>

          <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#27272A] space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E0A82E] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#E0A82E]" />
              <span>Capacidad Planificada</span>
            </div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              {details.plannedCapability}
            </p>
          </div>

          {details.actionHint && (
            <p className="text-xs text-[#E0A82E] italic">
              💡 {details.actionHint}
            </p>
          )}
        </div>

        {/* Acciones del Modal */}
        <div className="pt-2 border-t border-[#27272A] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E0A82E] hover:bg-[#B77D06] text-[#0A0A0A] font-semibold text-xs shadow-md transition-colors"
          >
            Entendido • Continuar Explorando
          </button>
        </div>
      </div>
    </div>
  );
};

