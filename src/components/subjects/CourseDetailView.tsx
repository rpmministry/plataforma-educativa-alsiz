import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { PageHeader } from '../layout/PageHeader';
import { DevelopmentBadge } from '../common/StateFeedback';
import { FeatureNoticeModal, FeatureNoticeDetails } from '../common/FeatureNoticeModal';
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Award,
  CheckCircle2,
  FileText,
  Play,
  Bot,
  ArrowLeft,
  Download,
  Share2,
  Sparkles,
  Layers,
  ChevronRight,
  GraduationCap,
  Globe,
} from 'lucide-react';

export const CourseDetailView: React.FC = () => {
  const {
    activeSubject,
    studentSubjects,
    setActiveSubject,
    setActiveTab,
    setActiveClass,
    getClassForSubjectOnDay,
    selectedDayOfWeek,
    openTeacherDrawerWithContext,
    currentStudent,
  } = useSchool();

  const [featureNotice, setFeatureNotice] = useState<FeatureNoticeDetails | null>(null);
  const [selectedLang, setSelectedLang] = useState<'es' | 'en'>('es');

  // Si no hay materia activa seleccionada, caemos a la primera materia del estudiante
  const subject = activeSubject || studentSubjects[0];

  if (!subject) {
    return (
      <div className="p-8 text-center text-slate-400 space-y-4">
        <p>No se encontró la materia seleccionada.</p>
        <button
          onClick={() => setActiveTab('subjects')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
        >
          Volver a Asignaturas
        </button>
      </div>
    );
  }

  const units = subject.units || [];
  const teacher = subject.teacher;

  const handleStartTodayClass = () => {
    const todayCls = getClassForSubjectOnDay(subject.id, selectedDayOfWeek);
    if (todayCls) {
      setActiveClass(todayCls);
      setActiveTab('classes');
    } else {
      setActiveTab('classes');
    }
  };

  const handleDownloadSyllabus = () => {
    setFeatureNotice({
      title: `Descarga de Sílabo Oficial: ${subject.name}`,
      stage: 'Etapa 07: Evaluación y Portafolio',
      description: 'El sílabo curricular unificado con competencias MINEDUC y matriz de evidencias está siendo compilado por el generador de reportes pedagógicos.',
      plannedCapability: 'Descarga en PDF con firma digital institucional, tabla de ponderaciones y criterios de rúbrica socrática.',
      actionHint: 'Durante la Etapa 04 puedes explorar todos los temas, objetivos y unidades directamente en pantalla.',
    });
  };

  const handleShareSubject = () => {
    setFeatureNotice({
      title: 'Compartir Plan de Asignatura con Representante',
      stage: 'Etapa 06: Módulo de Comunicación y Agentes',
      description: 'La función para exportar enlaces protegidos de avance curricular y cronograma para padres estará disponible en la integración del portal familiar.',
      plannedCapability: 'Generación de enlace criptográfico de un solo uso para revisión familiar sin exponer credenciales de acceso.',
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Botón Volver y Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('subjects')}
            className="p-2.5 rounded-2xl bg-[#121820] hover:bg-[#1f2937] text-slate-300 hover:text-white border border-[#283545] transition-all flex items-center justify-center shrink-0"
            title="Volver a la lista de asignaturas"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                {subject.code}
              </span>
              <DevelopmentBadge stage="Etapa 04" label="Detalle Curricular" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
              {subject.name}
            </h1>
          </div>
        </div>

        {/* Acciones del encabezado */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadSyllabus}
            className="px-3.5 py-2 rounded-xl bg-[#121820] hover:bg-[#1a222c] text-slate-300 hover:text-white border border-[#283545] text-xs font-bold transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Descargar Sílabo</span>
          </button>

          <button
            type="button"
            onClick={handleShareSubject}
            className="p-2 rounded-xl bg-[#121820] hover:bg-[#1a222c] text-slate-300 hover:text-white border border-[#283545] transition-all"
            title="Compartir enlace de asignatura"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Banner Principal de la Materia */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121820] via-[#161e28] to-[#0A0D11] border border-[#283545] shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{currentStudent.grade} • Año Lectivo {currentStudent.academicPlan.schoolYear}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {subject.curriculumOverview || subject.description}
            </p>
          </div>

          {/* Tarjeta del Profesor IA */}
          <div className="p-4 rounded-2xl bg-[#0A0D11]/80 border border-[#283545] flex items-center gap-4 shrink-0">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-500/40 shrink-0"
            />
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Tutor Socrático Asignado
              </span>
              <h4 className="text-sm font-bold text-white leading-tight">{teacher.name}</h4>
              <p className="text-xs text-slate-400">{teacher.title}</p>
              <button
                type="button"
                onClick={() => openTeacherDrawerWithContext(subject)}
                className="mt-1 inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-bold transition-colors"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Conversar con Tutor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Métricas clave del curso */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#283545]">
          <div className="p-3 rounded-2xl bg-[#0A0D11]/60 border border-[#283545]/60">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Clases Totales</span>
            <p className="text-lg font-extrabold text-white mt-0.5">{subject.totalClasses || 35} lecciones</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#0A0D11]/60 border border-[#283545]/60">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Completadas</span>
            <p className="text-lg font-extrabold text-emerald-400 mt-0.5">{subject.classesCompleted || 0} lecciones</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#0A0D11]/60 border border-[#283545]/60">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Horario Asignado</span>
            <p className="text-lg font-extrabold text-white mt-0.5">{subject.scheduleTime || '08:00 - 09:30'}</p>
          </div>
          <div className="p-3 rounded-2xl bg-[#0A0D11]/60 border border-[#283545]/60">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">Días de Semana</span>
            <p className="text-lg font-extrabold text-amber-300 mt-0.5">{(subject.daysOfWeek || ['Lunes']).join(', ')}</p>
          </div>
        </div>

        {/* CTA para entrar a la clase de hoy */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>Clase correspondiente al día escolar: <strong>{selectedDayOfWeek}</strong></span>
          </div>

          <button
            type="button"
            onClick={handleStartTodayClass}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-950/40 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Entrar a la Clase de Hoy</span>
          </button>
        </div>
      </div>

      {/* Unidades Curriculares del Plan Anual */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Unidades Curriculares y Microtemas</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Estructura didáctica por trimestres con metodología socrática y evidencias prácticas.
            </p>
          </div>

          {/* Selector de idioma de materiales didácticos (Etapa 06) */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Idioma:</span>
            </span>
            <div className="flex items-center p-1 rounded-xl bg-[#0A0D11] border border-[#283545]">
              <button
                type="button"
                onClick={() => setSelectedLang('es')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedLang === 'es'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇪🇸 Español
              </button>
              <button
                type="button"
                onClick={() => setSelectedLang('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedLang === 'en'
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>
        </div>

        {selectedLang === 'en' && (
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold">🌐 Bilingual Mode Active:</span>
              <span>Displaying materials translated to English. Untranslated resources smoothly fallback to the original Spanish text.</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/40 shrink-0">
              MCER Additive
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {units.length > 0 ? (
            units.map((unit: any, idx: number) => (
              <div
                key={unit.id || idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#121820] border border-[#283545] space-y-4 hover:border-indigo-500/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                      Unidad {idx + 1}
                    </span>
                    <h3 className="text-base font-extrabold text-white">{unit.title}</h3>
                  </div>
                  {unit.duration && (
                    <span className="text-xs font-mono text-slate-400 bg-[#0A0D11] px-3 py-1 rounded-full border border-[#283545] self-start sm:self-auto">
                      {unit.duration}
                    </span>
                  )}
                </div>

                {unit.description && (
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {unit.description}
                  </p>
                )}

                {/* Lista de temas o microcurrículo */}
                {unit.topics && unit.topics.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#283545]">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Temas de Aprendizaje:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {unit.topics.map((topic: string, tIdx: number) => (
                        <div
                          key={tIdx}
                          className="flex items-center gap-2 p-2 rounded-xl bg-[#0A0D11]/60 border border-[#283545]/60 text-xs text-slate-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center rounded-2xl bg-[#121820]/60 border border-[#283545] text-slate-400 space-y-2">
              <BookOpen className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="font-bold text-white">Unidades Curriculares en Carga</p>
              <p className="text-xs text-slate-400">
                El microcurrículo de esta asignatura se sincroniza en vivo con el calendario escolar 2026-2027.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Funciones Planificadas */}
      <FeatureNoticeModal
        isOpen={!!featureNotice}
        onClose={() => setFeatureNotice(null)}
        details={featureNotice}
      />
    </div>
  );
};

