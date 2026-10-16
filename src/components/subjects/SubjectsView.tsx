import React from 'react';
import { useSchool, DayOfWeekName } from '../../context/SchoolContext';
import { DailyClass } from '../../types';
import { PageHeader } from '../layout/PageHeader';
import {
  Calendar,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Award,
} from 'lucide-react';

const isReviewWeek = new Date() < new Date('2026-09-07T00:00:00');

export const SubjectsView: React.FC = () => {
  const {
    studentSubjects,
    currentStudent,
    setActiveSubject,
    setActiveTab,
    setActiveClass,
    selectedDayOfWeek,
    setSelectedDayOfWeek,
    getClassForSubjectOnDay,
  } = useSchool();

  // Si la materia no tiene clase el día seleccionado, buscamos en todo el plan y,
  // como último recurso, construimos una clase sintética para esa materia.
  const buildSyntheticClass = (subject: typeof studentSubjects[0]): DailyClass => ({
    id: `synthetic-${subject.id}`,
    subjectId: subject.id,
    studentId: currentStudent.id,
    date: '2026-09-07',
    dayOfWeek: selectedDayOfWeek,
    unit: `Unidad Curricular - ${subject.name}`,
    theme: subject.description || subject.name,
    objective: `Explorar los conceptos clave de ${subject.name} con tu profesor IA.`,
    introduction: `Sesión de ${subject.name} guiada por el método socrático.`,
    reading: subject.curriculumOverview || `Desarrollo conceptual de ${subject.name}.`,
    socraticQuestions: [`¿Qué idea central de ${subject.name} te resulta más relevante y por qué?`],
    resources: [],
    activities: [],
    homeworkTask: `Documenta en tu libreta la exploración de "${subject.name}".`,
    reflectionPrompt: `¿Cómo aplicas lo aprendido en ${subject.name} a tu vida diaria?`,
  });

  const handleOpenDetail = (subject: typeof studentSubjects[0], e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveSubject(subject);
    setActiveTab('subject-detail');
  };

  const handleOpenSubject = (subject: typeof studentSubjects[0]) => {
    // Abrimos siempre la clase del día asignado con el temario de la semana en curso.
    const targetDay = ((subject.daysOfWeek && subject.daysOfWeek[0]) || selectedDayOfWeek) as DayOfWeekName;
    const cls = getClassForSubjectOnDay(subject.id, targetDay) || buildSyntheticClass(subject);
    setActiveSubject(subject);
    setSelectedDayOfWeek(targetDay);
    setActiveClass(cls);
    setActiveTab('classes');
  };

  return (
    <div className="space-y-6">
      <PageHeader title={isReviewWeek ? `Materias de ${currentStudent.name} (Modo Repaso)` : `Materias de ${currentStudent.name}`} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <Calendar className="w-4 h-4" />
            <span>{currentStudent.academicPlan.schoolYear}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {isReviewWeek ? 'Materias (Modo Repaso)' : 'Materias del Año Escolar'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isReviewWeek
              ? 'Semana de repaso activa. El registro de avance curricular oficial comenzará el 7 de septiembre.'
              : 'Currículo oficial adaptado con enfoque socrático, ABP y recursos verificados día a día.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {studentSubjects.map((subject: any) => {
          const displayProgress = isReviewWeek ? 0 : subject.progressPercentage;
          const classesCompleted = isReviewWeek ? 0 : subject.classesCompleted;
          const totalClasses = subject.totalClasses || 35;

          return (
            <div
              key={subject.id}
              onClick={() => handleOpenSubject(subject)}
              className="group p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 hover:border-indigo-500/40 transition-all cursor-pointer shadow-sm hover:shadow-lg space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {subject.code}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {subject.name}
                  </h3>
                </div>
                <img
                  src={subject.teacher.avatar}
                  alt={subject.teacher.name}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-600 shrink-0"
                />
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {subject.description}
              </p>

              <div className="pt-3 border-t border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Clases completadas
                  </span>
                  <span className="font-bold text-emerald-400">
                    {classesCompleted} / {totalClasses}
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${displayProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Progreso</span>
                  <span className="text-xs font-bold text-indigo-400">{displayProgress}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-700/60 gap-2">
                <button
                  type="button"
                  onClick={(e) => handleOpenDetail(subject, e)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-semibold transition-all"
                  title="Ver unidades curriculares y sílabo"
                >
                  Detalle y Sílabo
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenSubject(subject)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Clase de Hoy</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};