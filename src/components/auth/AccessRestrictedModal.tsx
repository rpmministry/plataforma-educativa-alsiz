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
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="access-restricted-title"
        className="relative w-full max-w-md bg-[#18181B] border border-[#27272A] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#F4F4F5]"
        onClick={(e) => e.stopPropagation()}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        {/* Encabezado */}
        <div className="relative bg-[#121214] p-6 sm:p-7 border-b border-[#27272A] shrink-0">
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-4 right-4 p-2 rounded-xl bg-[#27272A]/70 hover:bg-[#27272A] text-[#A1A1AA] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#E0A82E]/10 border border-[#E0A82E]/30 text-[#E0A82E]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E0A82E]/15 text-[#E0A82E] border border-[#E0A82E]/25 text-[11px] font-semibold uppercase tracking-wider">
                <Lock className="w-3 h-3" />
                <span>Cuenta no registrada</span>
              </span>
              <h2 id="access-restricted-title" className="text-xl sm:text-2xl font-bold text-white mt-1">
                Acceso Restringido
              </h2>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-7 space-y-5 overflow-y-auto overscroll-contain">
          <p className="text-sm text-[#D4D4D8] leading-relaxed">
            El correo que intentas usar no se encuentra inscrito en <strong className="text-white">Wisdom Academy</strong>. Si deseas inscribir a tu hijo(a) o acceder a un plan de estudios, comunícate directamente con administración:
          </p>

          {email && (
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#27272A] text-xs text-[#A1A1AA]">
              <Mail className="w-3.5 h-3.5 text-[#71717A] shrink-0" />
              <span className="truncate">{email}</span>
            </div>
          )}

          {/* Tarjeta de contacto integrada */}
          <div className="rounded-xl border border-[#27272A] bg-[#0A0A0A] overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#27272A]">
              <div className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#E0A82E] shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">Director</span>
                <span className="block text-sm font-semibold text-white truncate">{CONTACT_INFO.name}</span>
              </div>
            </div>

            <a
              href={MAILTO_HREF}
              className="flex items-center gap-3 px-4 py-3 border-b border-[#27272A] hover:bg-[#18181B] transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-[#A1A1AA] shrink-0 group-hover:text-white">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">Correo</span>
                <span className="block text-sm font-medium text-[#D4D4D8] group-hover:text-white truncate">{CONTACT_INFO.email}</span>
              </div>
            </a>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#18181B] transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#27272A] flex items-center justify-center text-emerald-400 shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">WhatsApp</span>
                <span className="block text-sm font-medium text-[#D4D4D8] group-hover:text-white">{CONTACT_INFO.whatsappDisplay}</span>
              </div>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full min-h-[44px] py-2.5 px-6 rounded-xl bg-[#E0A82E] hover:bg-[#B77D06] text-[#0A0A0A] font-semibold text-sm transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessRestrictedModal;
