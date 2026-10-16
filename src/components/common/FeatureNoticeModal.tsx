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
        className="relative w-full max-w-lg rounded-3xl bg-[#121820] border border-[#283545] p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado con badge y botón de cerrar */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{details.stage}</span>
            </div>
            <h2 id="feature-notice-title" className="text-xl font-extrabold text-white tracking-tight mt-2">
              {details.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana de información"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Explicación pedagógica y técnica */}
        <div className="space-y-4 text-sm text-slate-300">
          <p className="leading-relaxed">
            {details.description}
          </p>

          <div className="p-4 rounded-2xl bg-[#0A0D11]/80 border border-[#283545] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Capacidad Planificada</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {details.plannedCapability}
            </p>
          </div>

          {details.actionHint && (
            <p className="text-xs text-indigo-300 italic">
              💡 {details.actionHint}
            </p>
          )}
        </div>

        {/* Acciones del Modal */}
        <div className="pt-2 border-t border-[#283545] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-950/40 transition-all hover:scale-105"
          >
            Entendido • Continuar Explorando
          </button>
        </div>
      </div>
    </div>
  );
};

