import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { CONTACT_INFO, MAILTO_HREF, WHATSAPP_HREF } from '../../data/contactInfo';
import { Lock, Sparkles, UserPlus, X, Mail, MessageCircle, User } from 'lucide-react';

interface DemoLockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

/**
 * "Candado Demo": se muestra cuando un perfil de prueba (Karen o Mauricio)
 * intenta completar la clase o avanzar en el plan de estudios.
 * La interacción con la IA es libre, pero el progreso no se desbloquea.
 */
export const DemoLockModal: React.FC<DemoLockModalProps> = ({ isOpen, onClose, onRegister }) => {
  const { currentStudent } = useSchool();

  if (!isOpen) return null;

  const gradeLabel = currentStudent.grade || 'Demostración Académica';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#27272A] shadow-2xl overflow-hidden bg-[#18181B]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#27272A]/70 hover:bg-[#27272A] text-[#A1A1AA] hover:text-white transition-colors z-10"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto overscroll-contain">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-14 h-14 rounded-2xl border border-[#E0A82E]/30 bg-[#E0A82E]/10 text-[#E0A82E] flex items-center justify-center">
              <Lock className="w-7 h-7" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E0A82E]/30 bg-[#E0A82E]/10 text-[#E0A82E] text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Modo Demostración · {gradeLabel}
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              ¡Excelente trabajo, {currentStudent.name}!
            </h2>

            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-md">
              Has completado la clase de prueba. Para continuar aprendiendo y acceder al plan de estudios
              completo, contáctanos:
            </p>
          </div>

          {/* Datos de contacto oficiales */}
          <div className="mt-6 space-y-2.5">
            <div className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#27272A] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#27272A] border border-[#3F3F46] flex items-center justify-center shrink-0 text-[#E0A82E]">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">Asesor académico</span>
                <span className="block text-sm font-semibold text-white truncate">{CONTACT_INFO.name}</span>
              </div>
            </div>

            <a
              href={MAILTO_HREF}
              className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#27272A] flex items-center gap-3 transition-colors hover:border-[#3F3F46] hover:bg-[#121214]"
            >
              <div className="w-9 h-9 rounded-lg bg-[#27272A] border border-[#3F3F46] flex items-center justify-center shrink-0 text-[#A1A1AA]">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">Correo institucional</span>
                <span className="block text-sm font-medium text-[#D4D4D8] truncate">{CONTACT_INFO.email}</span>
              </div>
            </a>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-[#0A0A0A] border border-[#27272A] flex items-center gap-3 transition-colors hover:border-[#3F3F46] hover:bg-[#121214]"
            >
              <div className="w-9 h-9 rounded-lg bg-[#27272A] border border-[#3F3F46] flex items-center justify-center shrink-0 text-emerald-400">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#71717A]">WhatsApp</span>
                <span className="block text-sm font-medium text-[#D4D4D8]">{CONTACT_INFO.whatsappDisplay}</span>
              </div>
            </a>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRegister}
              className="flex-1 py-3 px-6 rounded-xl bg-[#E0A82E] hover:bg-[#B77D06] text-[#0A0A0A] font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Registrarme ahora</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] border border-[#3F3F46] text-[#E4E4E7] font-medium text-sm transition-colors"
            >
              Seguir explorando
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoLockModal;
