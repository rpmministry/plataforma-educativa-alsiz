import React from 'react';
import { SchoolLogo } from '../common/SchoolLogo';
import { CONTACT_INFO, MAILTO_HREF, WHATSAPP_HREF } from '../../data/contactInfo';
import { Mail, MessageCircle, User, ShieldAlert } from 'lucide-react';

/**
 * Pie de página institucional de la Plataforma Educativa ALSIZ • Ekballo Church.
 * Incluye datos de contacto y descargo expreso de servicio de apoyo pedagógico y homeschooling.
 */
export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Marca */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-900/90 border border-amber-500/40 p-1.5 flex items-center justify-center shadow-lg shadow-black/30">
              <SchoolLogo size="sm" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="block font-extrabold text-base tracking-tight text-white">ALSIZ • EKBALLO CHURCH</span>
              <span className="block text-xs text-amber-300/80">Plataforma de Apoyo Pedagógico &amp; Tutoría Socrática</span>
            </div>
          </div>

          {/* Contacto oficial */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-800 text-xs font-bold text-slate-200">
              <User className="w-3.5 h-3.5 text-amber-400" />
              {CONTACT_INFO.name}
            </span>

            <a
              href={MAILTO_HREF}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 hover:text-white text-xs font-bold text-slate-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              {CONTACT_INFO.email}
            </a>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 hover:text-white text-xs font-bold text-slate-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp: {CONTACT_INFO.whatsappDisplay}
            </a>
          </div>
        </div>

        {/* Descargo Legal y Alcance del Servicio Educativo */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-1.5 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-[11px] uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Naturaleza y Alcance del Servicio Educativo</span>
          </div>
          <p className="leading-relaxed">
            La <strong>Plataforma Educativa ALSIZ</strong> es un entorno digital de apoyo pedagógico, tutoría socrática inteligente y discipulado cristiano para familias en educación en casa (Homeschooling). Este servicio complementario no constituye por sí mismo un establecimiento educativo escolarizado presencial con código AMIE ni emite títulos oficiales de bachiller de forma directa. La convalidación y registro de estudios ante el Ministerio de Educación de Ecuador corresponde a los representantes legales conforme a la normativa vigente de educación en casa.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>Copyright © 2026 Plataforma Educativa ALSIZ • Ekballo Church / RPM Ministry</span>
          <span className="font-mono">Año Lectivo 2026 - 2027</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
