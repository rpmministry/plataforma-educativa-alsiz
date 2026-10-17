import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { getDevotionalPool, studentDevotionalSeed } from '../../data/devotionals';
import { BookOpen, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const DevocionalCard: React.FC = () => {
  const { currentStudent, schoolWeek, selectedDayOfWeek, schoolWeekIndex } = useSchool();
  const [offset, setOffset] = useState(0);

  // El día escolar seleccionado (el mismo que muestran las clases) define la fecha del devocional.
  const dayIndexInWeek = Math.max(0, schoolWeek.findIndex((info) => info.day === selectedDayOfWeek));
  const selectedDayInfo = schoolWeek[dayIndexInWeek];

  // La edad decide el repertorio; la fecha + una semilla por estudiante deciden el devocional del día.
  // Con un día escolar distinto cambia la selección, por lo que nunca se repite el mismo dos días seguidos.
  const pool = getDevotionalPool(currentStudent.age);
  const seed = studentDevotionalSeed(currentStudent.id);
  const schoolDayNumber = schoolWeekIndex * 5 + dayIndexInWeek;
  const baseIndex = ((schoolDayNumber + seed) % pool.length + pool.length) % pool.length;
  const currentIndex = ((baseIndex + offset) % pool.length + pool.length) % pool.length;
  const currentDevocional = pool[currentIndex];

  // Al cambiar de estudiante o de día escolar, volvemos al devocional que corresponde a ese día.
  useEffect(() => { setOffset(0); }, [currentStudent.id, selectedDayOfWeek]);

  const goNext = () => setOffset((prev) => prev + 1);
  const goPrev = () => setOffset((prev) => prev - 1);

  const dateLabel = selectedDayInfo
    ? `${selectedDayOfWeek}, ${selectedDayInfo.dateLabelLong}`
    : selectedDayOfWeek;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#27272A] bg-[#18181B] shadow-xl text-[#F4F4F5]">
      <div className="relative p-6 sm:p-7 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#E0A82E]/10 border border-[#E0A82E]/30 text-[#E0A82E]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A1A1AA]">Reflexión Pedagógica y Valores</p>
              <p className="text-sm font-bold text-white">{dateLabel}</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E0A82E]/30 bg-[#E0A82E]/10 text-[#E0A82E]">
            {currentDevocional.tema}
          </span>
        </div>

        <div className="pt-2 border-t border-[#27272A]">
          <div className="flex items-start gap-3">
            <span className="text-2xl font-serif text-[#E0A82E] shrink-0 mt-0.5 leading-none">“</span>
            <div className="flex-1 min-w-0">
              <p className="text-[#F4F4F5] leading-relaxed text-sm sm:text-base font-serif italic">"{currentDevocional.versiculo.texto}"</p>
              <p className="text-xs text-[#A1A1AA] mt-2 text-right font-medium">— {currentDevocional.versiculo.referencia} ({currentDevocional.versiculo.version})</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <div className="p-4 rounded-xl border border-[#27272A] bg-[#0A0A0A]">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg shrink-0 bg-[#27272A] text-[#E0A82E]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#E0A82E]">Enseñanza para hoy</p>
                <p className="text-[#D4D4D8] text-xs sm:text-sm mt-1 leading-relaxed">{currentDevocional.ensenanza}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#27272A] bg-[#0A0A0A]">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg shrink-0 bg-[#27272A] text-emerald-400">
                <Heart className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Oración para iniciar el día</p>
                <p className="text-[#D4D4D8] text-xs sm:text-sm mt-1 leading-relaxed italic">"{currentDevocional.oracion}"</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-3 border-t border-[#27272A]">
          <button
            onClick={goPrev}
            className="p-1.5 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-[#A1A1AA] hover:text-white transition-colors"
            aria-label="Devocional anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-[11px] font-medium text-[#71717A] tabular-nums">
            Reflexión {currentIndex + 1} de {pool.length}
          </span>
          <button
            onClick={goNext}
            className="p-1.5 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-[#A1A1AA] hover:text-white transition-colors"
            aria-label="Siguiente devocional"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
