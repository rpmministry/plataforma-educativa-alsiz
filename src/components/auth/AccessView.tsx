import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { UserRole } from '../../types';
import { SchoolLogo } from '../common/SchoolLogo';
import { DevelopmentBadge } from '../common/StateFeedback';
import { StudentAvatar } from '../common/StudentAvatar';
import {
  GraduationCap,
  Users,
  Bot,
  Shield,
  ArrowRight,
  Lock,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';

export const AccessView: React.FC = () => {
  const {
    studentsList,
    currentUser,
    isAuthenticated,
    loginAsTestStudent,
    setActiveTab,
    setCurrentRole,
    openAuthModal,
  } = useSchool();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const mainStudents = studentsList.filter((s) => !s.isDemo);
  const demoStudents = studentsList.filter((s) => s.isDemo);

  const handleStudentSelect = (studentId: string) => {
    // Si ya existe sesión activa válida para este estudiante, navegar a su espacio
    if (isAuthenticated && (currentUser?.studentId === studentId || currentUser?.id === studentId)) {
      setCurrentRole('student');
      setActiveTab('space');
    } else {
      // De lo contrario, exigir autenticación con credenciales o PIN
      openAuthModal(studentId);
    }
  };

  const handleDemoSelect = (demoId: string) => {
    loginAsTestStudent(demoId);
    setCurrentRole('student');
    setActiveTab('space');
  };

  const handleRepresentativeAccess = () => {
    if (isAuthenticated && currentUser?.role === 'REPRESENTATIVE') {
      setCurrentRole('representative');
      setActiveTab('parent');
    } else {
      openAuthModal();
    }
  };

  const handleTeacherAccess = () => {
    if (isAuthenticated && (currentUser?.role === 'TEACHER' || currentUser?.role === 'ADMIN')) {
      setCurrentRole('teacher');
      setActiveTab('classes');
    } else {
      openAuthModal();
    }
  };

  const handleAdminAccess = () => {
    if (isAuthenticated && currentUser?.role === 'ADMIN') {
      setCurrentRole('admin');
      setActiveTab('admin');
    } else {
      openAuthModal();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 space-y-8 animate-in fade-in duration-200">
      {/* Botón Volver y Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio Institucional</span>
        </button>

        <DevelopmentBadge stage="Etapa 04" label="Portal Unificado de Acceso" />
      </div>

      {/* Tarjeta Central de Identidad Institucional */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <div className="p-3 rounded-2xl bg-[#18181B] border border-[#27272A] shadow-xl">
            <SchoolLogo size="lg" variant="monogram" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Ingreso a Wisdom Academy
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Selecciona tu perfil educativo para ingresar a tu espacio adaptativo de estudio, supervisión o gestión.
        </p>
      </div>

      {/* Selector de Roles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'student' as UserRole, label: 'Estudiante', icon: GraduationCap, color: 'text-amber-400', activeBg: 'border-amber-500/50 bg-amber-500/10' },
          { id: 'representative' as UserRole, label: 'Representante', icon: Users, color: 'text-emerald-400', activeBg: 'border-emerald-500/50 bg-emerald-500/10' },
          { id: 'teacher' as UserRole, label: 'Docente / IA', icon: Bot, color: 'text-indigo-400', activeBg: 'border-indigo-500/50 bg-indigo-500/10' },
          { id: 'admin' as UserRole, label: 'Administrador', icon: Shield, color: 'text-purple-400', activeBg: 'border-purple-500/50 bg-purple-500/10' },
        ].map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelectedRole(role.id)}
              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                isSelected
                  ? `${role.activeBg} shadow-lg ring-1 ring-white/20`
                  : 'bg-[#121820] border-[#283545] text-slate-400 hover:text-white hover:bg-[#18202A]'
              }`}
            >
              <Icon className={`w-6 h-6 ${role.color}`} />
              <span className="text-xs font-bold">{role.label}</span>
            </button>
          );
        })}
      </div>

      {/* Panel específico según rol seleccionado */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#121820] border border-[#283545] shadow-2xl space-y-6">
        {selectedRole === 'student' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <span>Acceso de Estudiantes Titulares</span>
              </h2>
              <p className="text-xs text-slate-400">
                Selecciona tu perfil de estudio para ingresar a tus cursos, horario y clases interactivas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mainStudents.map((st) => (
                <div
                  key={st.id}
                  onClick={() => handleStudentSelect(st.id)}
                  className="group p-5 rounded-2xl bg-[#0A0D11] border border-[#283545] hover:border-amber-500/50 transition-all cursor-pointer flex items-center justify-between shadow-md hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3">
                    <StudentAvatar studentId={st.id} name={st.name} size="md" />
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {st.name}
                      </h3>
                      <p className="text-xs text-slate-400">{st.grade}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>
              ))}
            </div>

            {/* Alternativa de ingreso con credenciales o Google */}
            <div className="pt-4 border-t border-[#283545] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">¿Prefieres ingresar con correo y PIN secreto?</span>
              <button
                type="button"
                onClick={() => openAuthModal()}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center gap-2"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>Ingreso con Correo / PIN</span>
              </button>
            </div>

            {/* Acceso a Modo Demo */}
            {demoStudents.length > 0 && (
              <div className="pt-4 border-t border-[#283545] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Modo Demo • Evaluación Sin Registro</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {demoStudents.map((demo) => (
                    <button
                      key={demo.id}
                      type="button"
                      onClick={() => handleDemoSelect(demo.id)}
                      className="p-3.5 rounded-xl bg-[#0A0D11]/60 border border-[#283545] hover:border-purple-500/40 text-left transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <StudentAvatar studentId={demo.id} name={demo.name} size="xs" />
                        <div>
                          <p className="text-xs font-bold text-white">{demo.name} (Prueba)</p>
                          <p className="text-[10px] text-slate-400">{demo.grade}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                        Probar
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedRole === 'representative' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <span>Portal Familiar y Bitácora Ministerial de Homeschooling</span>
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Supervisión del cumplimiento de 200 días lectivos (MINEDUC), registro de horas y portafolio de evidencias formativas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#283545] space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Protección LOPDP y Privacidad de Menores Activa</span>
              </div>
              <p>
                Los representantes legales tienen acceso continuo a los informes pedagógicos, estado de avance curricular y consentimientos de tratamiento de evidencias fotográficas.
              </p>
            </div>

            <button
              type="button"
              onClick={handleRepresentativeAccess}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <span>Ingresar al Portal de Representante</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {selectedRole === 'teacher' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-400" />
                <span>Consola Docente y Supervisión de Aulas Socráticas</span>
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Supervisa el desarrollo de las guías diarias, ajusta el nivel de desafío socrático y evalúa las tareas formativas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#283545] space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-indigo-300 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Asistencia de IA de Doble Capa Conectada</span>
              </div>
              <p>
                Los profesores virtuales entregan retroalimentación formativa sin emitir calificaciones numéricas punitivas ni exámenes memorísticos.
              </p>
            </div>

            <button
              type="button"
              onClick={handleTeacherAccess}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm shadow-xl shadow-indigo-950/40 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <span>Acceder a la Supervisión de Clases</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {selectedRole === 'admin' && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span>Consola de Administración Central & Gobierno TI</span>
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configuración de programas educativos, nómina estudiantil, auditoría inmutable de accesos y telemetría de IA.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0A0D11] border border-[#283545] space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-purple-300 font-bold">
                <Lock className="w-4 h-4" />
                <span>Entorno Seguro para Auditoría Legal y Cumplimiento Ministerial</span>
              </div>
              <p>
                Permite exportar pistas de auditoría LOPDP y supervisar la disponibilidad del motor socrático en tiempo real.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAdminAccess}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-purple-950/40 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <span>Entrar al Shell Administrativo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

