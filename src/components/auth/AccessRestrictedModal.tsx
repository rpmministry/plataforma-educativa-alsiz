import React, { useEffect } from 'react';
import { ShieldAlert, Lock, Mail, MessageCircle, X, User } from 'lucide-react';
import { CONTACT_INFO, MAILTO_HREF, WHATSAPP_HREF } from '../../data/contactInfo';

interface AccessRestrictedModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Correo de Google con el que se intentó ingresar (opcional, solo informativo). */
  email?: string;
}

/**
 * Cápsula de Información (Auth Guard): en lugar de un error rojo genérico cuando
 * alguien intenta entrar con una cuenta no inscrita, mostramos un diálogo amable
 * con los datos de contacto de administración.
 */
export const AccessRestrictedModal: React.FC<AccessRestrictedModalProps> = ({ isOpen, onClose, email }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="access-restricted-title"
        className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        {/* Encabezado */}
        <div className="relative bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 p-6 sm:p-8 border-b border-slate-800 shrink-0">
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors after:absolute after:-inset-1 after:content-['']"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                <Lock className="w-3 h-3" />
                <span>Cuenta no registrada</span>
              </span>
              <h2 id="access-restricted-title" className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Acceso Restringido
              </h2>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-5 overflow-y-auto overscroll-contain">
          <p className="text-sm text-slate-300 leading-relaxed">
            El correo que intentas usar no se encuentra inscrito en la <strong className="text-white">Plataforma Educativa ALSIZ</strong>. Si deseas inscribir a tu hijo(a) o acceder a un plan de estudios de homeschooling, comunícate directamente con administración:
          </p>

          {email && (
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
              <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{email}</span>
            </div>
          )}

          {/* Tarjeta de contacto integrada */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-300 shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Director</span>
                <span className="block text-sm font-bold text-white truncate">{CONTACT_INFO.name}</span>
              </div>
            </div>

            <a
              href={MAILTO_HREF}
              className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 hover:bg-indigo-500/10 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-300 shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">Correo</span>
                <span className="block text-sm font-semibold text-slate-200 group-hover:text-white truncate">{CONTACT_INFO.email}</span>
              </div>
            </a>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-emerald-500/10 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-300 shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-black uppercase tracking-wider text-slate-500">WhatsApp</span>
                <span className="block text-sm font-semibold text-slate-200 group-hover:text-white">{CONTACT_INFO.whatsappDisplay}</span>
              </div>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-950/50 transition-all active:scale-95"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessRestrictedModal;
