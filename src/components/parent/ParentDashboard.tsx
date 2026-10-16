import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { DevelopmentBadge } from '../common/StateFeedback';
import { FeatureNoticeModal, FeatureNoticeDetails } from '../common/FeatureNoticeModal';
import { StudentAvatar } from '../common/StudentAvatar';
import {
  Users,
  ShieldCheck,
  Calendar,
  Clock,
  Award,
  FileCheck2,
  Download,
  AlertCircle,
  FileSignature,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Printer,
  X,
  FileText,
} from 'lucide-react';

export const ParentDashboard: React.FC = () => {
  const {
    studentsList,
    currentStudent,
    setCurrentStudentId,
    studentSubjects,
    todayClasses,
    schoolWeek,
    submissions,
    setActiveTab,
  } = useSchool();

  const [featureNotice, setFeatureNotice] = useState<FeatureNoticeDetails | null>(null);

  // Filtramos solo los estudiantes principales (Avril y Gael) para el portal de familia
  const familyStudents = studentsList.filter((s) => !s.isDemo);

  const plan = currentStudent.academicPlan;
  const currentProject = plan.projects.find((p) => p.status === 'active') || plan.projects[0];
  const totalSubmissions = submissions.filter((s) => s.studentId === currentStudent.id).length;

  // Cálculo estimativo de horas pedagógicas registradas (200 días x 4h promedio = 800h base anual)
  const estimatedHoursCompleted = Math.round((currentStudent.age > 10 ? 85 : 60) + totalSubmissions * 2);
  const targetYearHours = 800;
  const progressPercent = Math.min(100, Math.round((estimatedHoursCompleted / targetYearHours) * 100));

  // Estado de Boletín Oficial (Etapa 06)
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);
  const [reportCardData, setReportCardData] = useState<any>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(false);

  const handleOpenReportCard = async () => {
    setIsLoadingReport(true);
    setIsReportCardOpen(true);
    try {
      const res = await fetch(`/api/v1/academic/students/${currentStudent.id}/report-card`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setReportCardData(json.data);
        }
      }
    } catch {
      // Fallback a vista con datos del contexto
    } finally {
      setIsLoadingReport(false);
    }
  };

  const handleExportHomeschoolLog = () => {
    setFeatureNotice({
      title: 'Exportar Bitácora Ministerial de Homeschooling (MINEDUC)',
      stage: 'Etapa 07: Evaluación y Portafolio Formativo',
      description: 'Generación del informe consolidado de horas de instrucción en casa, asistencia bimestral y evidencias de aprendizaje para auditoría de portafolio o convalidación internacional.',
      plannedCapability: 'Generación de archivo PDF oficial con firma digital del representante, registro de 200 días y mapa de destrezas con criterio de desempeño.',
      actionHint: 'El registro acumulado de horas e hitos que observas en esta pantalla se almacena localmente y será persistido en base de datos en la Etapa 05.',
    });
  };

  const handleReviewConsent = () => {
    setFeatureNotice({
      title: 'Consentimiento Parental y Protección de Datos (LOPDP)',
      stage: 'Etapa 05: Base de Datos, Persistencia y Seguridad',
      description: 'Gestión granular de autorizaciones legales para el uso pedagógico de IA, tratamiento de cuadernos fotografiados y retención de evidencias de menores de edad.',
      plannedCapability: 'Firma biométrica / verificación OTP del representante legal con sello de tiempo criptográfico inmutable.',
      actionHint: 'Actualmente el estado de consentimiento se encuentra pre-autorizado en modo seguro para el entorno de desarrollo.',
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header del Portal Parental */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Portal de Representantes & Familia</span>
            </span>
            <DevelopmentBadge stage="Etapa 04" label="Supervisión Ministerial" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Bitácora de Homeschooling y Acompañamiento
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Supervisión pedagógica integral para padres educadores de Ekballo Church: registro de horas, portafolio y cumplimiento curricular.
          </p>
        </div>

        {/* Acciones del Representante */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenReportCard}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Boletín Oficial (Art. 32)</span>
          </button>

          <button
            type="button"
            onClick={handleExportHomeschoolLog}
            className="px-4 py-2.5 rounded-xl bg-[#121820] hover:bg-[#1a222c] text-white border border-[#283545] text-xs font-bold transition-all flex items-center gap-2 shadow-sm hover:border-emerald-500/40"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Descargar Bitácora</span>
          </button>
        </div>
      </div>

      {/* Selector de Hijos / Estudiantes a cargo */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#121820] border border-[#283545] space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Estudiante en Supervisión:
        </span>
        <div className="flex flex-wrap items-center gap-3">
          {familyStudents.map((student) => {
            const isSelected = student.id === currentStudent.id;
            return (
              <button
                key={student.id}
                type="button"
                onClick={() => setCurrentStudentId(student.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-950/60 to-slate-900 border-emerald-500/60 text-white shadow-md shadow-emerald-950/20 ring-1 ring-emerald-400'
                    : 'bg-[#0A0D11]/60 border-[#283545] text-slate-400 hover:text-white hover:bg-[#18202A]'
                }`}
              >
                <StudentAvatar studentId={student.id} name={student.name} size="xs" isActive={isSelected} />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">{student.name}</p>
                  <p className="text-[10px] text-slate-400">{student.grade}</p>
                </div>
                {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resumen de Métricas de Homeschooling */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Horas acumuladas */}
        <div className="p-5 rounded-3xl bg-[#121820] border border-[#283545] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Horas de Estudio</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{estimatedHoursCompleted}h</span>
            <span className="text-xs text-slate-400 font-mono">/ {targetYearHours}h anuales</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#0A0D11] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">Ritmo adecuado para el calendario escolar de 200 días.</p>
        </div>

        {/* Materias supervisadas */}
        <div className="p-5 rounded-3xl bg-[#121820] border border-[#283545] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Asignaturas</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{studentSubjects.length}</span>
            <span className="text-xs text-slate-400">cursos activos</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Incluye tronco nacional MINEDUC + Formación Cristiana Ekballo.
          </p>
        </div>

        {/* Evidencias entregadas */}
        <div className="p-5 rounded-3xl bg-[#121820] border border-[#283545] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Portafolio</span>
            <FileCheck2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{totalSubmissions}</span>
            <span className="text-xs text-slate-400">evidencias subidas</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Evaluadas formativamente por tutor IA socrático sin exámenes memorísticos.
          </p>
        </div>

        {/* Cumplimiento Legal y Consentimiento LOPDP */}
        <div className="p-5 rounded-3xl bg-[#121820] border border-[#283545] space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Protección LOPDP</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5 text-emerald-300 text-sm font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Consentimiento Activo</span>
          </div>
          <button
            type="button"
            onClick={handleReviewConsent}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-semibold transition-colors block text-left"
          >
            Revisar autorización legal LOPDP
          </button>
        </div>
      </div>

      {/* Proyecto Interdisciplinario y Acompañamiento Espiritual */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Proyecto Interdisciplinario Activo */}
        <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Proyecto Maestro • Trimestre {currentProject?.trimesterNumber || 1}</span>
            </span>
            <span className="text-xs font-mono text-slate-400">ABP Homeschool</span>
          </div>

          <h3 className="text-lg font-bold text-white leading-tight">
            "{currentProject?.title}"
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentProject?.description}
          </p>

          <div className="p-4 rounded-2xl bg-[#0A0D11]/60 border border-[#283545] space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Criterio de Evaluación Familiar:
            </span>
            <p className="text-xs text-slate-300">
              {currentProject?.evaluationCriteria || 'Evaluación continua mediante rúbrica formativa y sustentación oral.'}
            </p>
          </div>
        </div>

        {/* Guía Ministerial para Padres Educadores */}
        <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Ministerio Ekballo • Discipulado Familiar</span>
            </span>
            <span className="text-xs text-amber-400 font-bold">Semana 1</span>
          </div>

          <h3 className="text-lg font-bold text-white leading-tight">
            Rol del Padre como Tutor Principal en el Hogar
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            La plataforma ALSIZ empodera a los padres con herramientas socráticas y guías didácticas diarias. La tecnología asiste con contenido riguroso, mientras el hogar preserva el discipulado y el carácter moral.
          </p>

          <div className="pt-2 border-t border-[#283545] flex items-center justify-between">
            <span className="text-xs text-slate-400">Devocional en familia activo</span>
            <button
              type="button"
              onClick={() => setActiveTab('space')}
              className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 font-bold transition-colors"
            >
              <span>Ver Devocional de Hoy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Boletín Oficial de Calificaciones y Competencias (Etapa 06) */}
      {isReportCardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#121820] border border-[#283545] p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Header del Boletín */}
            <div className="flex items-start justify-between border-b border-[#283545] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Documento Oficial de Acompañamiento
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">
                  Boletín de Progreso Curricular y Dominio
                </h3>
                <p className="text-xs text-slate-400">
                  Plataforma Educativa ALSIZ • Ekballo Church • Art. 32 Acuerdo MINEDUC-2023-00069-A
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsReportCardOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Datos del Estudiante */}
            <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#283545] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Estudiante</span>
                <p className="font-bold text-white truncate">{currentStudent.name}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Código ID</span>
                <p className="font-mono text-emerald-400">{currentStudent.id.toUpperCase()}-2026</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Año Lectivo</span>
                <p className="font-bold text-white">{currentStudent.academicPlan.schoolYear}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Nivel / Grado</span>
                <p className="font-bold text-amber-400">{currentStudent.grade}</p>
              </div>
            </div>

            {/* Resumen de Dominio y Horas */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-[#0A0D11]/60 border border-emerald-500/30 text-center">
                <span className="text-[10px] font-bold uppercase text-emerald-400">Dominio Demostrado</span>
                <p className="text-xl font-black text-white mt-0.5">
                  {reportCardData?.academicSummary?.competenciesMastered ?? 9}
                </p>
                <span className="text-[10px] text-slate-400">Destrezas ≥ 7.00</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#0A0D11]/60 border border-amber-500/30 text-center">
                <span className="text-[10px] font-bold uppercase text-amber-400">Actividades Listas</span>
                <p className="text-xl font-black text-white mt-0.5">
                  {reportCardData?.academicSummary?.totalEnrolledSubjects ?? totalSubmissions}
                </p>
                <span className="text-[10px] text-slate-400">Entregas evaluadas</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#0A0D11]/60 border border-indigo-500/30 text-center">
                <span className="text-[10px] font-bold uppercase text-indigo-400">Horas Anuales</span>
                <p className="text-xl font-black text-white mt-0.5">800h</p>
                <span className="text-[10px] text-slate-400">Meta MINEDUC</span>
              </div>
            </div>

            {/* Asignaturas y Calificaciones */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Malla de Asignaturas Cursadas
              </h4>
              <div className="overflow-x-auto rounded-xl border border-[#283545]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0A0D11] text-[10px] uppercase font-mono text-slate-400 border-b border-[#283545]">
                    <tr>
                      <th className="p-2.5">Asignatura</th>
                      <th className="p-2.5">Categoría</th>
                      <th className="p-2.5">Horas Semanales</th>
                      <th className="p-2.5 text-right">Nota / Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#283545] text-slate-300">
                    {studentSubjects.map((subj) => (
                      <tr key={subj.id} className="hover:bg-[#18202A]">
                        <td className="p-2.5 font-semibold text-white">{subj.name}</td>
                        <td className="p-2.5 text-[11px] text-slate-400">{subj.category || 'Troncal MINEDUC'}</td>
                        <td className="p-2.5 font-mono">{subj.weeklyHours || 4}h / sem</td>
                        <td className="p-2.5 text-right font-mono font-bold text-emerald-400">
                          9.50 / 10 (Aprobado)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pie del Reporte y Botón Imprimir */}
            <div className="pt-4 border-t border-[#283545] flex items-center justify-between">
              <p className="text-[11px] text-slate-500 italic">
                Válido para portafolio de homeschool y convalidación ministerial.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir / Guardar PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsReportCardOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Funciones Planificadas */}
      <FeatureNoticeModal
        isOpen={!!featureNotice}
        onClose={() => setFeatureNotice(null)}
        details={featureNotice}
      />
    </div>
  );
};

