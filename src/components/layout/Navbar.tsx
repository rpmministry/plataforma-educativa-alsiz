import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolLogo } from '../common/SchoolLogo';
import { StudentAvatar } from '../common/StudentAvatar';
import { AccountSettingsModal } from '../auth/AccountSettingsModal';
import {
  Lock,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Settings,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    studentsList,
    currentStudent,
    currentStudentId,
    setCurrentStudentId,
    authenticatedStudentId,
    logoutStudent,
    openAuthModal,
    activeTab,
    setActiveTab,
  } = useSchool();

  // Paso 1: detectamos qué perfil está activo para aplicar el tema visual correcto (Avril o Gael).
  const isAvril = currentStudentId === 'avril' || currentStudentId === 'karen';
  // Check if authenticated student is a demo/test student
  const isDemoStudent = authenticatedStudentId 
    ? studentsList.some((s) => s.id === authenticatedStudentId && s.isDemo)
    : false;
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-30 backdrop-blur-md text-slate-100 transition-colors duration-300 border-b border-slate-800/50 ${
        isAvril
          ? 'bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900'
          : 'bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="max-w-[100vw] px-3 sm:px-6 lg:px-8 mx-auto min-h-14 sm:min-h-16 flex items-center justify-between gap-2">

        
        {/* Marca oficial: Wisdom Academy */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 shrink-0 rounded-xl bg-[#18181B] border border-[#27272A] p-1.5 shadow-md shadow-black/40 flex items-center justify-center group-hover:scale-105 transition-all duration-300">
            <SchoolLogo size="sm" variant="monogram" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="hidden min-[400px]:inline font-extrabold text-base sm:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-amber-200 truncate">
                Wisdom Academy
              </span>
              <span className={`text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full border shadow-sm flex items-center gap-1 ${
                isAvril
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-red-500/20 text-red-300 border-red-500/40'
              }`}>
                {currentStudent.name} ({currentStudent.grade.split(' ')[0]})
                {isDemoStudent && (
                  <span className="bg-red-500/40 text-red-200 px-1 py-0.5 rounded text-[9px] font-bold">TEST</span>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Aprender con profundidad · Avanzar con propósito
            </p>
          </div>
        </div>

        {/* Paso 3: el lado derecho muestra controles y acceso a roles */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Botón de Acceso a Roles */}
          <button
            type="button"
            onClick={() => setActiveTab('access')}
            className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              activeTab === 'access'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700/60 hover:bg-slate-800'
            }`}
            title="Seleccionar rol de usuario (Estudiante, Representante, Docente, Admin)"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Acceso / Roles</span>
          </button>

          {/* Student Selector Switcher or Auth Badge */}
          {authenticatedStudentId && !isDemoStudent && activeTab !== 'home' ? (
            <div className="relative flex items-center">
              {/* Active Student Dropdown Trigger */}
              <button
                type="button"
                onClick={() => openAuthModal(currentStudentId)}
                className="group flex items-center gap-2 min-h-[44px] px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/50 hover:border-slate-600 backdrop-blur-sm text-xs font-medium transition-all duration-200"
                title="Perfil autenticado • Click para cambiar de cuenta"
              >
                <div className="relative">
                  <StudentAvatar studentId={currentStudent.id} name={currentStudent.name} size="xs" isActive={true} />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900">
                    <div className="absolute inset-0 bg-emerald-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-white font-semibold leading-tight">{currentStudent.name}</span>
                  {isDemoStudent && (
                    <span className="ml-2 text-xs bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded-full">
                      TEST
                    </span>
                  )}
                  <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    ACTIVO
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
              </button>

              {/* Compact Action Buttons */}
              <div className="flex items-center gap-1 ml-2">
                {/* Account Settings Button */}
                <button
                  type="button"
                  onClick={() => setSettingsModalOpen(true)}
                  className="relative p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/30 hover:border-slate-600/50 text-slate-400 hover:text-white transition-all duration-200 after:absolute after:-inset-2 after:content-['']"
                  title="Seguridad y contraseña"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>

                {/* Log Out Button */}
                <button
                  type="button"
                  onClick={logoutStudent}
                  className="relative p-1.5 rounded-lg bg-slate-800/60 hover:bg-rose-950/30 border border-slate-700/30 hover:border-rose-500/30 text-slate-400 hover:text-rose-300 transition-all duration-200 after:absolute after:-inset-2 after:content-['']"
                  title="Cerrar sesión de estudiante"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal()}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-950/40 transition-all transform hover:scale-105"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Iniciar Sesión</span>
            </button>
          )}

        </div>

      </div>

      <AccountSettingsModal 
        isOpen={settingsModalOpen} 
        onClose={() => setSettingsModalOpen(false)} 
      />
    </header>
  );
};
