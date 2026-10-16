import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { PageHeader } from '../layout/PageHeader';
import { DevelopmentBadge } from '../common/StateFeedback';
import {
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Calendar,
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  // Lógica de validación de la Semana de Repaso
  const [isReviewWeek, setIsReviewWeek] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const today = new Date();
    // Fecha oficial de inicio: 7 de Septiembre de 2026
    const schoolStart = new Date('2026-09-07T00:00:00');
    setIsReviewWeek(today < schoolStart);
  }, []);

  const { currentStudent, studentSubjects, submissions, todayClasses } = useSchool();

  const studentSubmissions = submissions.filter((s: any) => s.studentId === currentStudent.id);
  const totalClassesCompleted = studentSubjects.reduce((acc: number, sub: any) => acc + sub.classesCompleted, 0);
  const totalClassesTotal = studentSubjects.reduce((acc: number, sub: any) => acc + sub.totalClasses, 0);
  const overallPercentage = totalClassesTotal > 0 ? Math.round((totalClassesCompleted / totalClassesTotal) * 100) : 0;

  // Variables calculadas para mostrar 0 en la semana de repaso
  const displayOverallPercentage = isReviewWeek ? 0 : overallPercentage;
  const displayTotalCompleted = isReviewWeek ? 0 : totalClassesCompleted;
  const displaySubmissionsCount = isReviewWeek ? 0 : studentSubmissions.length;
  const displayStreak = isReviewWeek ? 0 : 18; // 18 era el valor duro en tu diseño

  if (!isMounted) return null;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
            <TrendingUp className="w-4 h-4" />
            <span>Seguimiento y Registro Académico</span>
          </div>
          <DevelopmentBadge stage="Etapa 04" label="Métricas de Desarrollo" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Progreso Académico de {currentStudent.name}
        </h1>
        <p className="text-sm text-slate-400">
          {isReviewWeek 
            ? "Semana de repaso activa. El registro de métricas iniciará el 7 de septiembre." 
            : "Métricas de dominio competencial, lecciones cursadas y retroalimentaciones socráticas registradas."}
        </p>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Progreso Global</span>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{displayOverallPercentage}%</div>
          <div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${displayOverallPercentage}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Clases Concluidas</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">
            {displayTotalCompleted} <span className="text-sm font-normal text-slate-400">/ {totalClassesTotal}</span>
          </div>
          <p className="text-[11px] text-slate-400">En todas las materias activas</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Trabajos Evaluados</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400">
            {displaySubmissionsCount}
          </div>
          <p className="text-[11px] text-slate-400">Con feedback formativo IA</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Racha de Homeschool</span>
            <Zap className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400">
            {displayStreak} <span className="text-sm font-normal text-slate-400">días</span>
          </div>
          <p className="text-[11px] text-slate-400">Constancia y aprendizaje diario</p>
        </div>

      </div>

      {/* Progress Breakdown by Subject */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-400" />
          <span>Dominio y Avance por Materia {isReviewWeek && "(En Pausa)"}</span>
        </h2>

        <div className="space-y-6">
          {studentSubjects.map((subject: any) => {
            const displaySubjectProgress = isReviewWeek ? 0 : subject.progressPercentage;
            const displaySubjectCompleted = isReviewWeek ? 0 : subject.classesCompleted;

            return (
              <div key={subject.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={subject.teacher.avatar}
                      alt={subject.teacher.name}
                      className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-600"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-white">{subject.name}</h3>
                      <p className="text-[11px] text-slate-400">Profesor: {subject.teacher.name}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-indigo-400">{displaySubjectProgress}%</span>
                    <span className="text-[11px] text-slate-400 block">
                      {displaySubjectCompleted} / {subject.totalClasses} lecciones
                    </span>
                  </div>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-700/50">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${displaySubjectProgress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};