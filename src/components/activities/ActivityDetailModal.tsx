import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ListTodo,
  Sparkles,
  Bot,
  FileText,
  Upload,
  Image as ImageIcon,
  HelpCircle,
  Award,
  BookOpen,
  Send,
  RotateCcw,
  Check,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ClassActivity, DailyClass, Subject } from '../../types';

interface ActivityDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: ClassActivity | null;
  dailyClass: DailyClass | null;
  subject: Subject | null;
  onToggleCompletion: (classId: string, activityId: string) => void;
  onAskTeacher: (subject?: Subject, dailyClass?: DailyClass) => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  isOpen,
  onClose,
  activity,
  dailyClass,
  subject,
  onToggleCompletion,
  onAskTeacher,
}) => {
  if (!isOpen || !activity || !dailyClass) return null;

  const storageKey = `wisdom_activity_response_${activity.id}`;
  const [responseNotes, setResponseNotes] = useState<string>(() => {
    return localStorage.getItem(storageKey) || '';
  });
  const [evidencePhoto, setEvidencePhoto] = useState<string | null>(() => {
    return localStorage.getItem(`${storageKey}_img`) || null;
  });
  const [showSocraticGuide, setShowSocraticGuide] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey) || '';
    const savedImg = localStorage.getItem(`${storageKey}_img`) || null;
    setResponseNotes(saved);
    setEvidencePhoto(savedImg);
    setShowCelebration(false);
    setSavedSuccess(false);
  }, [activity.id, storageKey]);

  const handleSaveNotes = (markComplete = false) => {
    localStorage.setItem(storageKey, responseNotes);
    if (evidencePhoto) {
      localStorage.setItem(`${storageKey}_img`, evidencePhoto);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);

    if (markComplete && !activity.completed) {
      onToggleCompletion(dailyClass.id, activity.id);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setEvidencePhoto(result);
        localStorage.setItem(`${storageKey}_img`, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInsertTemplate = () => {
    const template = `1. Planteamiento / Datos clave:\n- \n\n2. Desarrollo / Procedimiento paso a paso:\n- \n\n3. Conclusión / Respuesta final:\n- `;
    if (!responseNotes.trim()) {
      setResponseNotes(template);
    } else {
      setResponseNotes((prev) => `${prev}\n\n${template}`);
    }
  };

  const typeLabels: Record<string, { label: string; color: string }> = {
    practice: { label: 'Taller Práctico', color: 'bg-amber-500/10 text-amber-300 border-amber-500/20' },
    project: { label: 'Proyecto Interdisciplinario', color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
    reflection: { label: 'Indagación & Reflexión Socrática', color: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' },
    experiment: { label: 'Laboratorio Experimental', color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' },
    quiz: { label: 'Reto de Evaluación Formativa', color: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
  };

  const typeInfo = typeLabels[activity.type] || {
    label: 'Actividad Práctica',
    color: 'bg-[#27272A] text-zinc-300 border-zinc-700',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[#18181B] border border-[#27272A] rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="p-5 sm:p-6 bg-[#141417] border-b border-[#27272A] flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${typeInfo.color}`}>
                {typeInfo.label}
              </span>
              {subject && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#27272A] text-zinc-300 border border-[#3F3F46]">
                  {subject.name}
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-400" />
                <span>+{activity.points} pts</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
              {activity.title}
            </h2>
            <p className="text-xs text-[#A1A1AA]">
              Lección: <span className="text-zinc-200 font-medium">{dailyClass.theme}</span> ({dailyClass.dayOfWeek})
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-[#A1A1AA] hover:text-white transition-all border border-[#3F3F46]"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto overscroll-contain">
          
          {/* Banner de Felicitación al Completar */}
          {showCelebration && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 flex items-center gap-3 animate-fade-in">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-emerald-100">¡Excelente avance! Actividad completada</h4>
                <p className="text-xs text-emerald-300">Se han sumado +{activity.points} puntos a tu registro académico de evidencias.</p>
              </div>
            </div>
          )}

          {/* Enunciado e Instrucciones */}
          <div className="p-5 rounded-2xl bg-[#121215] border border-[#27272A] space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Instrucciones y Consigna del Ejercicio</span>
            </h3>
            <p className="text-sm text-zinc-200 leading-relaxed">
              {activity.description}
            </p>
          </div>

          {/* Acordeón de Orientación Socrática */}
          <div className="rounded-2xl bg-[#141417] border border-[#27272A] overflow-hidden">
            <button
              type="button"
              onClick={() => setShowSocraticGuide(!showSocraticGuide)}
              className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-zinc-300 hover:bg-[#1E1E22] transition-all"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>¿Cómo estructurar tu respuesta paso a paso? (Guía Socrática)</span>
              </div>
              {showSocraticGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showSocraticGuide && (
              <div className="p-4 pt-0 border-t border-[#27272A] text-xs text-[#A1A1AA] space-y-2 leading-relaxed">
                <p>
                  1. <strong>Identificación:</strong> Anota los datos fundamentales y las preguntas clave en tu libreta o en el editor.
                </p>
                <p>
                  2. <strong>Aplicación:</strong> Conecta los conceptos analizados en la lección teórica y el laboratorio.
                </p>
                <p>
                  3. <strong>Verificación:</strong> Si necesitas orientación, consulta al Tutor Virtual para recibir pistas y retroalimentación formativa.
                </p>
                {subject && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onAskTeacher(subject, dailyClass);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all mt-1"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Consultar con el Profesor {subject.teacher.name}</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Libreta Digital / Cuadro de Respuesta */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Tu Libreta Digital / Procedimiento de Resolución</span>
              </label>
              <button
                type="button"
                onClick={handleInsertTemplate}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                + Insertar estructura recomendada
              </button>
            </div>

            <textarea
              value={responseNotes}
              onChange={(e) => setResponseNotes(e.target.value)}
              placeholder="Escribe aquí tu procedimiento, fórmulas, análisis o conclusiones sobre esta actividad..."
              rows={6}
              className="w-full p-4 rounded-2xl bg-[#121215] border border-[#27272A] text-zinc-100 text-sm focus:outline-none focus:border-amber-500/70 placeholder:text-[#71717A] transition-all font-sans leading-relaxed"
            />
          </div>

          {/* Adjuntar Evidencia Fotográfica */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Evidencia Fotográfica de Cuaderno (Opcional)</span>
            </label>

            {evidencePhoto ? (
              <div className="relative rounded-2xl overflow-hidden border border-[#27272A] bg-[#121215] p-2 space-y-2">
                <img
                  src={evidencePhoto}
                  alt="Evidencia fotográfica adjunta"
                  className="max-h-56 w-full object-contain rounded-xl"
                />
                <div className="flex items-center justify-between text-xs px-2 py-1">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Evidencia cargada correctamente
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEvidencePhoto(null);
                      localStorage.removeItem(`${storageKey}_img`);
                    }}
                    className="text-rose-400 hover:text-rose-300 font-medium"
                  >
                    Eliminar imagen
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#27272A] hover:border-amber-500/40 rounded-2xl bg-[#121215] hover:bg-[#18181B] cursor-pointer transition-all text-center group">
                <ImageIcon className="w-8 h-8 text-[#71717A] group-hover:text-amber-400 transition-colors mb-2" />
                <span className="text-xs font-bold text-zinc-300 group-hover:text-white">
                  Subir foto de tu libreta de apuntes o esquema
                </span>
                <span className="text-[11px] text-[#71717A] mt-0.5">
                  Formatos compatibles: JPG, PNG o WebP (hasta 5MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Cambios guardados en tu espacio local con éxito.</span>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 sm:p-6 bg-[#141417] border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {activity.completed ? (
              <button
                type="button"
                onClick={() => onToggleCompletion(dailyClass.id, activity.id)}
                className="px-4 py-2.5 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-zinc-300 text-xs font-bold flex items-center justify-center gap-2 border border-[#3F3F46] transition-all w-full sm:w-auto"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Marcar como Pendiente</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSaveNotes(false)}
                className="px-4 py-2.5 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-zinc-300 text-xs font-bold flex items-center justify-center gap-2 border border-[#3F3F46] transition-all w-full sm:w-auto"
              >
                <span>Guardar Borrador</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {subject && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onAskTeacher(subject, dailyClass);
                }}
                className="px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                title="Consultar al Profesor Virtual"
              >
                <Bot className="w-4 h-4" />
                <span className="hidden sm:inline">Consultar Tutor</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                handleSaveNotes(true);
                if (activity.completed) {
                  onClose();
                }
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{activity.completed ? 'Guardar y Cerrar' : 'Marcar como Completada'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
