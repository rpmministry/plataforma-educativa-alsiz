import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { StudentAvatar } from '../common/StudentAvatar';
import { DevocionalCard } from './DevocionalCard';
import { PageHeader } from '../layout/PageHeader';
import { DevelopmentBadge } from '../common/StateFeedback';
import {
  Play,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  Bot,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Coffee,
  GraduationCap,
  FileCheck2,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    currentStudent,
    studentSubjects,
    todayClasses,
    allStudentClasses,
    selectedDayOfWeek,
    setSelectedDayOfWeek,
    setActiveTab,
    setActiveSubject,
    setActiveClass,
    openTeacherDrawerWithContext,
    submissions,
    todaySchedule,
    schoolWeek,
  } = useSchool();

  const studentSubmissions = submissions.filter((s: any) => s.studentId === currentStudent.id);
  const featuredClass = todayClasses[0];
  const featuredSubject = featuredClass
    ? studentSubjects.find((s: any) => s.id === featuredClass.subjectId)
    : studentSubjects[0];

  const plan = currentStudent.academicPlan;
  const currentProject = plan?.projects?.find((p: any) => p.status === 'active') || plan?.projects?.[0];

  // Métricas reales derivadas de los datos del estudiante
  const totalActivitiesCount = allStudentClasses.reduce((acc: number, c: any) => acc + (c.activities?.length || 0), 0);
  const completedSubmissionsCount = studentSubmissions.length;
  const avgProgress = studentSubjects.length > 0
    ? Math.round(studentSubjects.reduce((acc: number, s: any) => acc + (s.progressPercentage || 0), 0) / studentSubjects.length)
    : 0;

  const handleStartClass = (cls: typeof todayClasses[0]) => {
    setActiveClass(cls);
    const sub = studentSubjects.find((s: any) => s.id === cls.subjectId) || null;
    setActiveSubject(sub);
    setActiveTab('classes');
  };

  const handleOpenSubject = (subject: typeof studentSubjects[0]) => {
    setActiveSubject(subject);
    setActiveTab('subjects');
  };

  if (!isMounted) {
    return (
      <div className="space-y-6 animate-pulse" aria-hidden>
        <div className="h-10 w-56 rounded-xl bg-[#18181B]" />
        <div className="h-40 rounded-2xl bg-[#18181B]" />
        <div className="h-16 rounded-xl bg-[#18181B]" />
        <div className="h-64 rounded-2xl bg-[#18181B]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Encabezado Institucional de la Vista */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <PageHeader title="Panel del Estudiante" />
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#A1A1AA] hidden sm:inline">Período Lectivo 2026-2027</span>
          <DevelopmentBadge stage="Etapa 04" label="Entorno de Aprendizaje" />
        </div>
      </div>

      {/* 1. Tarjeta de Perfil Institucional (Genérica y Autorizada) */}
      <section className="relative overflow-hidden rounded-2xl bg-[#18181B] border border-[#27272A] p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <StudentAvatar
              studentId={currentStudent.id}
              name={currentStudent.name}
              size="xl"
              editable={true}
            />
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#E0A82E]/10 border border-[#E0A82E]/30 text-[#E0A82E] text-xs font-semibold">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{currentStudent.grade || 'Educación Básica'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                ¡Bienvenido(a), {currentStudent.name}!
              </h2>
              <p className="text-xs text-[#A1A1AA] max-w-xl leading-relaxed">
                {plan?.educationLevel || 'Plan Académico Oficial Integrado'} • Trimestre {currentProject?.trimesterNumber || 1}: Fundamentación Teórica y Aprendizaje Guiado.
              </p>
            </div>
          </div>

          {/* Acciones Rápidas del Perfil */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-[#27272A]">
            {featuredSubject && (
              <button
                type="button"
                onClick={() => openTeacherDrawerWithContext(featuredSubject, featuredClass || undefined)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] border border-[#3F3F46] text-[#F4F4F5] text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                title="Abrir diálogo socrático con el Profesor Virtual"
              >
                <Bot className="w-4 h-4 text-[#E0A82E]" />
                <span>Tutor Socrático IA</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('schedule')}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-[#121214] hover:bg-[#27272A] border border-[#27272A] text-[#A1A1AA] hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Horario</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('progress')}
              className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-[#121214] hover:bg-[#27272A] border border-[#27272A] text-[#A1A1AA] hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Progreso</span>
            </button>
          </div>
        </div>

        {/* Barra resumida de indicadores educativos reales */}
        <div className="mt-6 pt-5 border-t border-[#27272A] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">Clases Hoy</span>
            <p className="text-lg font-bold text-white tabular-nums">{todayClasses.length}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">Asignaturas</span>
            <p className="text-lg font-bold text-white tabular-nums">{studentSubjects.length}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">Actividades Entregadas</span>
            <p className="text-lg font-bold text-emerald-400 tabular-nums">{completedSubmissionsCount}</p>
          </div>
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wider">Avance Promedio</span>
            <p className="text-lg font-bold text-[#E0A82E] tabular-nums">{avgProgress}%</p>
          </div>
        </div>
      </section>

      {/* 2. Hero Action: Continuar Aprendiendo (Prioridad para el Estudiante) */}
      {featuredClass ? (
        <section className="relative overflow-hidden rounded-2xl border border-[#E0A82E]/40 bg-gradient-to-r from-[#18181B] via-[#18181B] to-[#241F16] p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E0A82E] text-[#0A0A0A] text-[11px] font-bold uppercase tracking-wider">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Continuar Aprendiendo</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#27272A] text-[#F4F4F5] text-xs font-semibold border border-[#3F3F46]">
                  {featuredSubject?.name || 'Asignatura'}
                </span>
                <span className="text-xs text-[#A1A1AA] flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#E0A82E]" />
                  <span>{featuredClass.scheduleTime || '08:00 - 09:30'}</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {featuredClass.theme}
                </h3>
                <p className="text-xs font-medium text-[#71717A] uppercase tracking-wider mt-0.5">
                  {featuredClass.unit}
                </p>
                <p className="text-xs sm:text-sm text-[#D4D4D8] mt-1.5 line-clamp-2 leading-relaxed">
                  {featuredClass.objective}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#A1A1AA] pt-1">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#E0A82E]" />
                  <span>{featuredClass.resources?.length || 0} recursos didácticos</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{featuredClass.activities?.length || 0} actividades formativas</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => handleStartClass(featuredClass)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E0A82E] hover:bg-[#B77D06] text-[#0A0A0A] font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Entrar a Clase Ahora</span>
              </button>
              {featuredSubject && (
                <button
                  type="button"
                  onClick={() => openTeacherDrawerWithContext(featuredSubject, featuredClass)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] border border-[#3F3F46] text-[#E4E4E7] text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Bot className="w-3.5 h-3.5 text-[#E0A82E]" />
                  <span>Preguntar a Docente IA</span>
                </button>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="p-6 rounded-2xl bg-[#18181B] border border-[#27272A] text-center text-[#A1A1AA] space-y-2">
          <BookOpen className="w-8 h-8 text-[#71717A] mx-auto" />
          <h3 className="text-base font-bold text-white">Jornada escolar sin clases programadas</h3>
          <p className="text-xs text-[#A1A1AA] max-w-md mx-auto">
            Selecciona un día en la barra superior o explora tus asignaturas para repasar contenidos y adelantar actividades.
          </p>
        </section>
      )}

      {/* 3. Selector de Jornada Escolar (Lunes - Viernes) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border border-[#27272A] bg-[#18181B]">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#E0A82E]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Jornada Escolar:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {schoolWeek.map(({ day, dateLabel, isToday, isFirstSchoolDay }) => {
            const isSelected = day === selectedDayOfWeek;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDayOfWeek(day)}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#E0A82E] text-[#0A0A0A] shadow-sm'
                    : 'bg-[#27272A] text-[#A1A1AA] hover:text-white hover:bg-[#3F3F46]'
                }`}
              >
                <span>{day}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                  isSelected ? 'bg-[#0A0A0A]/20 text-[#0A0A0A]' : 'text-[#71717A]'
                }`}>
                  {dateLabel}
                </span>
                {isFirstSchoolDay && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Inicio de Año Lectivo" />
                )}
                {!isFirstSchoolDay && isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E0A82E]" title="Día actual" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Grid Principal: Clases & Materias (Col-span 2) vs Horario & Progreso (Col-span 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Columna Izquierda: Clases programadas + Asignaturas + Proyecto */}
        <div className="lg:col-span-2 space-y-6">

          {/* Clases programadas para el día seleccionado */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E0A82E]" />
                <span>Clases del {selectedDayOfWeek}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#27272A] text-[#E0A82E] border border-[#3F3F46]">
                  {todayClasses.length} {todayClasses.length === 1 ? 'clase' : 'clases'}
                </span>
              </h3>
            </div>

            {todayClasses.length > 0 ? (
              <div className="space-y-3.5">
                {todayClasses.map((cls: any, idx: number) => {
                  const sub = studentSubjects.find((s: any) => s.id === cls.subjectId);
                  const isFirst = idx === 0;

                  return (
                    <div
                      key={cls.id}
                      className="p-5 rounded-xl border border-[#27272A] bg-[#18181B] hover:border-[#3F3F46] transition-colors space-y-3.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#27272A] text-[#F4F4F5] border border-[#3F3F46]">
                            {sub?.name || 'Materia'}
                          </span>
                          {isFirst && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase bg-[#E0A82E]/10 text-[#E0A82E] border border-[#E0A82E]/30">
                              Primera Sesión
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#A1A1AA] flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5 text-[#E0A82E]" />
                          <span>{cls.scheduleTime || '08:00 - 09:30'}</span>
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-white">
                          {cls.theme}
                        </h4>
                        <p className="text-xs font-medium text-[#71717A] uppercase tracking-wider">
                          {cls.unit}
                        </p>
                        <p className="text-xs text-[#D4D4D8] line-clamp-2 leading-relaxed">
                          {cls.objective}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#27272A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-4 text-xs text-[#A1A1AA]">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5 text-[#E0A82E]" />
                            <span>{cls.resources?.length || 1} recursos</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{cls.activities?.length || 1} actividades</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => handleStartClass(cls)}
                            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#E0A82E] hover:bg-[#B77D06] text-[#0A0A0A] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Entrar a Clase</span>
                          </button>

                          {sub && (
                            <button
                              type="button"
                              onClick={() => openTeacherDrawerWithContext(sub, cls)}
                              className="px-3 py-2 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] text-[#E4E4E7] text-xs font-medium border border-[#3F3F46] transition-colors flex items-center gap-1"
                              title="Consultar al Docente IA"
                            >
                              <Bot className="w-3.5 h-3.5 text-[#E0A82E]" />
                              <span className="hidden sm:inline">Tutor IA</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-[#18181B] border border-[#27272A] text-center text-[#A1A1AA] space-y-1.5">
                <Calendar className="w-6 h-6 text-[#71717A] mx-auto" />
                <p className="font-semibold text-white">No hay clases programadas para el {selectedDayOfWeek}.</p>
                <p className="text-xs text-[#71717A]">Selecciona otro día en la barra superior para explorar la planificación.</p>
              </div>
            )}
          </div>

          {/* Asignaturas en Curso */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#E0A82E]" />
                <span>Asignaturas del Plan Académico</span>
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('subjects')}
                className="text-xs font-semibold text-[#E0A82E] hover:underline flex items-center gap-1"
              >
                <span>Ver todas ({studentSubjects.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {studentSubjects.map((subject: any) => (
                <div
                  key={subject.id}
                  onClick={() => handleOpenSubject(subject)}
                  className="p-4 rounded-xl bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] transition-colors cursor-pointer group shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#27272A] text-[#A1A1AA] border border-[#3F3F46]">
                          {subject.code}
                        </span>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#E0A82E] transition-colors">
                          {subject.name}
                        </h4>
                      </div>
                      <img
                        src={subject.teacher?.avatar}
                        alt={subject.teacher?.name}
                        title={`Docente: ${subject.teacher?.name}`}
                        className="w-8 h-8 rounded-lg object-cover ring-1 ring-[#3F3F46] shrink-0"
                      />
                    </div>
                    <p className="text-xs text-[#A1A1AA] mt-2 line-clamp-2 leading-relaxed">
                      {subject.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-[#27272A]">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#71717A]">Avance curricular</span>
                      <span className="font-semibold text-[#E0A82E]">
                        {subject.progressPercentage || 0}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[#27272A] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#E0A82E] transition-all"
                        style={{ width: `${subject.progressPercentage || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Proyecto Interdisciplinario Activo */}
          {currentProject && (
            <section className="p-5 sm:p-6 rounded-2xl border border-[#27272A] bg-[#18181B] shadow-md space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E0A82E]/10 text-[#E0A82E] border border-[#E0A82E]/30">
                  Proyecto Interdisciplinario • Trimestre {currentProject.trimesterNumber}
                </span>
                <span className="text-xs text-[#71717A]">Evaluación Continua y Portafolio</span>
              </div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E0A82E] shrink-0" />
                <span>{currentProject.title}</span>
              </h4>
              <p className="text-xs text-[#D4D4D8] leading-relaxed">
                {currentProject.description}
              </p>
            </section>
          )}

        </div>

        {/* Columna Derecha: Horario + Resumen de Progreso + Devocional */}
        <div className="space-y-6">

          {/* Horario del día */}
          <div className="p-5 rounded-2xl border border-[#27272A] bg-[#18181B] shadow-md space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E0A82E]" />
                <span>Horario ({selectedDayOfWeek})</span>
              </h4>
              <button
                type="button"
                onClick={() => setActiveTab('schedule')}
                className="text-xs font-semibold text-[#E0A82E] hover:underline"
              >
                Ver completo
              </button>
            </div>

            <div className="space-y-2">
              {todaySchedule.map((entry: any) => {
                const matchingClass = entry.classId
                  ? todayClasses.find((c: any) => c.id === entry.classId)
                  : null;

                return (
                  <div
                    key={entry.id}
                    onClick={() => {
                      if (matchingClass) handleStartClass(matchingClass);
                      else if (!entry.isRecess && todayClasses[0]) handleStartClass(todayClasses[0]);
                    }}
                    className={`p-3 rounded-xl border transition-colors ${
                      entry.isRecess
                        ? 'bg-[#1F1B14] border-[#E0A82E]/20 text-[#E0A82E]'
                        : 'bg-[#0A0A0A] border-[#27272A] hover:border-[#3F3F46] cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-[#A1A1AA] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#E0A82E]" />
                        {entry.startTime} - {entry.endTime}
                      </span>
                      {entry.isRecess ? (
                        <span className="text-[10px] font-bold text-[#E0A82E] flex items-center gap-1">
                          <Coffee className="w-3 h-3" />
                          Descanso
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-emerald-400">
                          Entrar
                        </span>
                      )}
                    </div>
                    <h5 className={`text-xs font-semibold mt-1 ${entry.isRecess ? 'text-[#E0A82E]' : 'text-white'}`}>
                      {entry.subjectName}
                    </h5>
                  </div>
                );
              })}
            </div>

            <div className="pt-1 text-center border-t border-[#27272A]">
              <span className="text-[11px] text-[#71717A]">
                Jornada formativa: 08:00 a 12:00
              </span>
            </div>
          </div>

          {/* Resumen de Progreso y Actividades */}
          <div className="p-5 rounded-2xl border border-[#27272A] bg-[#18181B] shadow-md space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#27272A] pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#E0A82E]" />
                <span>Progreso de Actividades</span>
              </h4>
              <button
                type="button"
                onClick={() => setActiveTab('progress')}
                className="text-xs font-semibold text-[#E0A82E] hover:underline"
              >
                Detalle
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A1A1AA]">Entregas registradas</span>
                <span className="font-semibold text-white tabular-nums">{completedSubmissionsCount}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A1A1AA]">Actividades en plan</span>
                <span className="font-semibold text-white tabular-nums">{totalActivitiesCount}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A1A1AA]">Asignaturas cubiertas</span>
                <span className="font-semibold text-white tabular-nums">{studentSubjects.length}</span>
              </div>

              <div className="pt-2 border-t border-[#27272A]">
                <button
                  type="button"
                  onClick={() => setActiveTab('progress')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#27272A] hover:bg-[#3F3F46] border border-[#3F3F46] text-[#F4F4F5] text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-[#E0A82E]" />
                  <span>Ver Portafolio de Evaluación</span>
                </button>
              </div>
            </div>
          </div>

          {/* Devocional y Valores */}
          <DevocionalCard />

        </div>

      </div>
    </div>
  );
};