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
    authenticatedStudentId,
    logoutStudent,
    openAuthModal,
    activeTab,
    setActiveTab,
  } = useSchool();

  const isDemoStudent = authenticatedStudentId 
    ? studentsList.some((s) => s.id === authenticatedStudentId && s.isDemo)
    : false;

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md bg-[#0A0A0A]/90 text-[#F4F4F5] transition-colors duration-200 border-b border-[#27272A]"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="max-w-[100vw] px-3 sm:px-6 lg:px-8 mx-auto min-h-14 sm:min-h-16 flex items-center justify-between gap-2">
        {/* Marca oficial: Wisdom Academy */}
        <div
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group min-w-0"
          onClick={() => setActiveTab('home')}
        >
          <div className="w-10 h-10 shrink-0 rounded-xl bg-[#18181B] border border-[#27272A] p-1.5 shadow-sm flex items-center justify-center group-hover:border-[#3F3F46] transition-colors duration-200">
            <SchoolLogo size="sm" variant="monogram" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-[#E0A82E] transition-colors duration-200 truncate">
                Wisdom Academy
              </span>
              <span className="text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded-full bg-[#18181B] text-[#D4D4D8] border border-[#27272A] hidden min-[540px]:inline-flex items-center gap-1.5">
                <span>{currentStudent.name}</span>
                <span className="text-[#71717A]">·</span>
                <span className="text-[#A1A1AA]">{currentStudent.grade.split(' ')[0]}</span>
                {isDemoStudent && (
                  <span className="bg-[#B42318]/20 text-[#F87171] border border-[#B42318]/30 px-1 py-0.2 rounded text-[9px] font-bold">
                    DEMO
                  </span>
                )}
              </span>
            </div>
            <p className="text-xs text-[#A1A1AA] hidden sm:block">
              Aprender con profundidad · Avanzar con propósito
            </p>
          </div>
        </div>

        {/* Lado derecho: Roles y Perfil autenticado */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Botón de Acceso a Roles */}
          <button
            type="button"
            onClick={() => setActiveTab('access')}
            className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
              activeTab === 'access'
                ? 'bg-[#E0A82E]/15 text-[#E0A82E] border-[#E0A82E]/40'
                : 'bg-[#18181B] text-[#D4D4D8] hover:text-white border-[#27272A] hover:bg-[#27272A]'
            }`}
            title="Seleccionar rol de usuario (Estudiante, Representante, Docente, Admin)"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#E0A82E]" />
            <span className="hidden sm:inline">Portal Roles</span>
          </button>

          {/* Student Selector Switcher or Auth Badge */}
          {authenticatedStudentId && !isDemoStudent && activeTab !== 'home' ? (
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => openAuthModal(currentStudentId)}
                className="group flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] text-xs font-medium transition-colors duration-200"
                title="Perfil autenticado • Click para cambiar de cuenta"
              >
                <div className="relative">
                  <StudentAvatar studentId={currentStudent.id} name={currentStudent.name} size="xs" isActive={true} />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-[#1B7F4B] rounded-full border border-[#18181B]" />
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-white font-medium leading-tight">{currentStudent.name}</span>
                  <span className="text-[9px] text-[#1B7F4B] font-mono uppercase tracking-wider">
                    Activo
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#71717A] group-hover:text-white transition-colors" />
              </button>

              {/* Botones de acción compactos */}
              <div className="flex items-center gap-1 ml-2">
                <button
                  type="button"
                  onClick={() => setSettingsModalOpen(true)}
                  className="p-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#A1A1AA] hover:text-white transition-colors duration-200"
                  title="Seguridad y configuración"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={logoutStudent}
                  className="p-1.5 rounded-lg bg-[#18181B] hover:bg-[#B42318]/15 border border-[#27272A] hover:border-[#B42318]/40 text-[#A1A1AA] hover:text-[#F87171] transition-colors duration-200"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal()}
              className="inline-flex items-center gap-2 min-h-[40px] px-4 py-2 rounded-xl bg-[#E0A82E] hover:bg-[#F0B840] text-[#0A0A0A] font-semibold text-xs shadow-sm transition-all"
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

export default Navbar;
