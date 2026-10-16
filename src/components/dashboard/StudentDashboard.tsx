import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { StudentAvatar } from '../common/StudentAvatar';
import { WorldHeaderBanner } from '../common/WorldCharacters';
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
  FileCheck2,
  AlertCircle,
  HelpCircle,
  Coffee,
  Award,
  ChevronRight,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const isReviewWeek = new Date() < new Date('2026-09-07T00:00:00');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    currentStudent,
    studentSubjects,
    todayClasses,
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
  const activeClass = todayClasses[0];
  const activeSubject = activeClass
    ? studentSubjects.find((s: any) => s.id === activeClass.subjectId)
    : studentSubjects[0];

  const plan = currentStudent.academicPlan;
  const currentProject = plan.projects.find((p: any) => p.status === 'active') || plan.projects[0];

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

  const isAvril = currentStudent.id === 'avril' || currentStudent.id === 'karen';

  if (!isMounted) {
    return (
      <div className="space-y-6 animate-pulse" aria-hidden>
        <div className="h-10 w-56 rounded-xl bg-slate-800/70" />
        <div className="h-40 rounded-3xl bg-slate-800/60" />
        <div className="h-20 rounded-2xl bg-slate-800/60" />
        <div className="h-64 rounded-3xl bg-slate-800/60" />
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Única puerta de entrada: widgets + clases del día en una sola vista */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <PageHeader title="Mi Espacio de Estudio" />
        <DevelopmentBadge stage="Etapa 04" label="Entorno de Desarrollo" />
      </div>

      {/* Student Movie World Banner */}
      <WorldHeaderBanner
        studentId={currentStudent.id}
        studentName={currentStudent.name}
      />

      {/* Devocional Diario - nuevo */}
      <DevocionalCard />

      {/* Day Selector Bar */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border ${
        isAvril
          ? 'bg-slate-900/90 border-amber-500/30'
          : 'bg-slate-900/90 border-red-500/30'
      }`}>
        <div className="flex items-center gap-2">
          <Calendar className={`w-5 h-5 ${isAvril ? 'text-amber-400' : 'text-red-400'}`} />
          <span className="text-sm font-extrabold text-white">Seleccionar Día Escolar:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {schoolWeek.map(({ day, dateLabel, isToday, isFirstSchoolDay }) => {
            const isSelected = day === selectedDayOfWeek;
            return (
              <button
                key={day}
                onClick={() => setSelectedDayOfWeek(day)}
                className={`flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? isAvril
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 scale-105 ring-2 ring-amber-300'
                      : 'bg-red-600 text-white shadow-md shadow-red-600/30 scale-105 ring-2 ring-red-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/60'
                }`}
              >
                <span>{day}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    isSelected
                      ? isAvril ? 'bg-amber-600 text-amber-100' : 'bg-red-700 text-red-100'
                      : 'bg-slate-700/80 text-slate-400'
                  }`}
                >
                  {dateLabel}
                </span>
                {isFirstSchoolDay && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Primer Día de Clases (07 Sep 2026)" />
                )}
                {!isFirstSchoolDay && isToday && (
                  <span className="w-2 h-2 rounded-full bg-amber-400" title="Día de hoy" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Trimester 1 Project Spotlight Banner */}
      {currentProject && (
        <section className={`p-5 sm:p-6 rounded-3xl border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-all ${
          isAvril
            ? 'bg-gradient-to-r from-amber-950/50 via-slate-900 to-amber-900/30 border-amber-500/40 shadow-amber-950/20'
            : 'bg-gradient-to-r from-red-950/50 via-slate-900 to-red-900/30 border-red-500/40 shadow-red-950/20'
        }`}>
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                isAvril
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-red-500/20 text-red-300 border-red-500/40'
              }`}>
                {isAvril ? '🐶 PROYECTO MAESTRO • TRIMESTRE ' : '🍄 MISIÓN ESPECIAL • TRIMESTRE '}{currentProject.trimesterNumber}
              </span>
              <span className="text-xs text-slate-300">Evaluación por Productos y Evidencias</span>
            </div>
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Award className={`w-5 h-5 shrink-0 ${isAvril ? 'text-amber-400' : 'text-red-400'}`} />
              <span>Proyecto: "{currentProject.title}"</span>
            </h3>
            <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
              {currentProject.description}
            </p>
          </div>
        </section>
      )}

      {/* Grid: Main Today's Class & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Classes for selected day (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className={`w-5 h-5 ${isAvril ? 'text-amber-400' : 'text-red-400'}`} />
              <span>Clases Programadas ({selectedDayOfWeek})</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                isAvril
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-red-500/20 text-red-300 border-red-500/30'
              }`}>
                {todayClasses.length} {todayClasses.length === 1 ? 'clase' : 'clases'}
              </span>
            </h2>
          </div>

          {/* List of classes for the selected day */}
          {todayClasses.length > 0 ? (
            <div className="space-y-4">
              {todayClasses.map((cls: any, idx: number) => {
                const sub = studentSubjects.find((s: any) => s.id === cls.subjectId);
                const isFeatured = idx === 0;
                return (
                  <div
                    key={cls.id}
                    className={`rounded-2xl border transition-all ${
                      isFeatured
                        ? isAvril
                          ? 'bg-slate-900/90 border-amber-500/50 p-6 shadow-xl shadow-amber-950/20'
                          : 'bg-slate-900/90 border-red-500/50 p-6 shadow-xl shadow-red-950/20'
                        : 'bg-slate-900/60 border-slate-800 p-5 hover:border-slate-700'
                    } space-y-4`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          isAvril
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}>
                          {sub?.name || 'Materia'}
                        </span>
                        {isFeatured && (
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                            isAvril
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-red-500/20 text-red-300 border-red-500/30'
                          }`}>
                            {isAvril ? '🐶 Cuento Vivo del Día' : '⭐ Misión Principal del Día'}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-300 flex items-center gap-1 font-mono">
                        <Clock className={`w-3.5 h-3.5 ${isAvril ? 'text-amber-400' : 'text-red-400'}`} />
                        <span>{cls.scheduleTime || '08:00 - 09:30'}</span>
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-extrabold text-white hover:text-amber-200 transition-colors">
                        {cls.theme}
                      </h3>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                        {cls.unit}
                      </p>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {cls.objective}
                      </p>
                    </div>

                    {/* Progress and quick action */}
                    <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <BookOpen className={`w-4 h-4 ${isAvril ? 'text-amber-400' : 'text-red-400'}`} />
                          <span>{cls.resources?.length || 1} recursos</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>{cls.activities?.length || 1} actividades</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        
                        <button
                          onClick={() => handleStartClass(cls)}
                          className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-black shadow-md transition-all flex items-center justify-center gap-2 ${
                            isAvril
                              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                              : 'bg-red-600 hover:bg-red-500 text-white'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Entrar a Clase</span>
                        </button>

                        {sub && (
                          <button
                            onClick={() => openTeacherDrawerWithContext(sub, cls)}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all flex items-center gap-1"
                            title="Preguntar al Profesor IA"
                          >
                            <Bot className={`w-4 h-4 ${isAvril ? 'text-amber-400' : 'text-red-400'}`} />
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
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center text-slate-400 space-y-2">
              <Calendar className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="font-bold text-white">No hay clases programadas para el {selectedDayOfWeek}.</p>
              <p className="text-xs text-slate-400">Selecciona otro día en la barra superior para explorar las clases.</p>
            </div>
          )}

          {/* Seguimiento por Competencias (Etapa 06 - Actividad vs Dominio Demostrado) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <span>Seguimiento de Competencias MINEDUC</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Normativa Art. 32
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Diferenciación estricta entre actividades entregadas y dominio conceptual demostrado.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">Dominio Requerido:</span>
                <span className="text-amber-400 font-bold">≥ 7.00 / 10.00</span>
              </div>
            </div>

            {/* Métricas diferenciadas: Actividades vs Dominio */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-[#0A0D11]/70 border border-[#283545]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Destrezas</span>
                <p className="text-xl font-black text-white mt-0.5">18</p>
                <span className="text-[10px] text-slate-500">Malla 2026-2027</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#0A0D11]/70 border border-[#283545]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Entregadas</span>
                <p className="text-xl font-black text-indigo-300 mt-0.5">12</p>
                <span className="text-[10px] text-indigo-400/80">Actividades listas</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#0A0D11]/70 border border-emerald-500/30 bg-emerald-500/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Dominio Demostrado</span>
                <p className="text-xl font-black text-emerald-300 mt-0.5">9</p>
                <span className="text-[10px] text-emerald-400/80">≥ 7.00 alcanzado</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#0A0D11]/70 border border-amber-500/30 bg-amber-500/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Sin Dominio / Refuerzo</span>
                <p className="text-xl font-black text-amber-300 mt-0.5">3</p>
                <span className="text-[10px] text-amber-400/80">Entregado &lt; 7.00</span>
              </div>
            </div>

            {/* Barra de progreso de dominio real */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Progreso hacia Perfil de Egreso y Acreditación</span>
                <span className="font-mono text-emerald-400 font-bold">50% de Dominio Consolidado</span>
              </div>
              <div className="h-2.5 w-full bg-[#0A0D11] rounded-full overflow-hidden flex border border-[#283545]">
                <div style={{ width: '50%' }} className="bg-emerald-500 h-full rounded-full transition-all" title="Dominio demostrado" />
                <div style={{ width: '16.6%' }} className="bg-amber-500/70 h-full transition-all" title="Actividad completada sin alcanzar dominio" />
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Dominio Demostrado (Verificado)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Actividad Entregada (Refuerzo Requerido)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-700" /> Por Iniciar</span>
              </div>
            </div>
          </div>

          {/* Subjects Progress Grid */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className={`w-5 h-5 ${isAvril ? 'text-amber-400' : 'text-red-400'}`} />
                {/* INDICADOR VISUAL PARA CONFIRMAR EL CAMBIO */}
                <span>Materias del Plan - Modo Repaso</span>
              </h2>
              <button
                onClick={() => setActiveTab('subjects')}
                className={`text-xs font-bold flex items-center gap-1 ${isAvril ? 'text-amber-400 hover:text-amber-300' : 'text-red-400 hover:text-red-300'}`}
              >
                <span>Ver todas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {studentSubjects.map((subject: any) => {
                // Cálculo visual del progreso interceptado
                const displayProgress = isReviewWeek ? 0 : subject.progressPercentage;

                return (
                <div
                  key={subject.id}
                  onClick={() => handleOpenSubject(subject)}
                  className={`p-4 rounded-2xl bg-slate-900/80 border transition-all cursor-pointer group shadow-sm hover:shadow-md ${
                    isAvril ? 'border-amber-500/30 hover:border-amber-400/60' : 'border-red-500/30 hover:border-red-400/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        isAvril
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          : 'bg-red-500/10 text-red-300 border-red-500/20'
                      }`}>
                        {subject.code}
                      </span>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                        {subject.name}
                      </h4>
                    </div>
                    <img
                      src={subject.teacher.avatar}
                      alt={subject.teacher.name}
                      title={`Profesor: ${subject.teacher.name}`}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-600 shrink-0"
                    />
                  </div>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {subject.description}
                  </p>

                  <div className="mt-4 pt-2 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400">Progreso del curso</span>
                      <span className={`font-bold ${isAvril ? 'text-amber-300' : 'text-red-300'}`}>
                        {displayProgress}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isAvril
                            ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                            : 'bg-gradient-to-r from-red-500 to-amber-500'
                        }`}
                        style={{ width: `${displayProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>

        </div>

          {/* Right Sidebar: Schedule for selected day & Devocional */}
          <div className="space-y-6">
            {/* Schedule Mini-Timeline for selected day (08:00 - 12:00) */}
            <div className={`p-5 rounded-2xl border shadow-md ${
              isAvril
                ? 'bg-slate-900/90 border-amber-500/30'
                : 'bg-slate-900/90 border-red-500/30'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${isAvril ? 'text-amber-400' : 'text-red-400'}`} />
                  <span>Horario ({selectedDayOfWeek})</span>
                </h3>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`text-xs font-bold ${isAvril ? 'text-amber-400 hover:text-amber-300' : 'text-red-400 hover:text-red-300'}`}
                >
                  Ver Plan
                </button>
              </div>

              <div className="space-y-2.5">
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
                      className={`p-3 rounded-xl border transition-all ${
                        entry.isRecess
                          ? 'bg-amber-950/20 border-amber-500/30'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono text-slate-300 flex items-center gap-1">
                          <Clock className={`w-3 h-3 ${isAvril ? 'text-amber-400' : 'text-red-400'}`} />
                          {entry.startTime} - {entry.endTime}
                        </span>
                        {entry.isRecess ? (
                          <span className="text-[10px] font-bold text-amber-300 flex items-center gap-1">
                            <Coffee className="w-3 h-3" />
                            Descanso
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                            ▶ Ver clase
                          </span>
                        )}
                      </div>
                      <h4 className={`text-xs font-bold mt-1 ${entry.isRecess ? 'text-amber-200' : 'text-slate-200'}`}>
                        {entry.subjectName}
                      </h4>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-slate-400">
                  Fin de la jornada escolar: 12:00
                </span>
              </div>
            </div>

          </div>

      </div>

    </div>
  );
};