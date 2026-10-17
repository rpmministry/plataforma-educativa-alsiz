import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { NavigationTab } from '../../types';
import { isNavItemActive } from '../../utils/navigation';
import { SchoolLogo } from '../common/SchoolLogo';
import { StudentAvatar } from '../common/StudentAvatar';
import {
  Home,
  User,
  BookMarked,
  CalendarDays,
  TrendingUp,
  Users,
  Shield,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, currentStudent, todayClasses } = useSchool();

  const navItems: NavItem[] = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'space', label: 'Mi Espacio de Estudio', icon: User, badge: todayClasses.length > 0 ? todayClasses.length.toString() : undefined },
    { id: 'subjects', label: 'Materias', icon: BookMarked },
    { id: 'schedule', label: 'Horario Escolar', icon: CalendarDays },
    { id: 'progress', label: 'Progreso y Evaluaciones', icon: TrendingUp },
  ];

  return (
    <aside className="w-56 lg:w-64 xl:w-72 border-r border-[#27272A] bg-[#0A0A0A] p-4 flex flex-col justify-between hidden md:flex shrink-0 transition-colors duration-200">
      <div className="space-y-6">
        {/* Tarjeta de Perfil del Estudiante */}
        <div className="p-3.5 rounded-2xl border border-[#27272A] bg-[#18181B] space-y-2.5 shadow-sm">
          <div className="flex items-center gap-3">
            <StudentAvatar
              studentId={currentStudent.id}
              name={currentStudent.name}
              size="md"
              editable={true}
            />
            <div className="overflow-hidden min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white truncate">{currentStudent.name}</span>
                {currentStudent.isDemo && (
                  <span className="text-[9px] bg-[#B42318]/20 text-[#F87171] border border-[#B42318]/30 px-1 py-0.2 rounded font-bold">
                    DEMO
                  </span>
                )}
                <span className="text-[11px] font-medium text-[#71717A]">({currentStudent.age}a)</span>
              </div>
              <p className="text-xs font-medium text-[#D4D4D8] truncate">
                {currentStudent.grade}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#27272A] flex items-center justify-between text-[11px]">
            <span className="text-[#A1A1AA] font-medium">Plan Lectivo</span>
            <span className="text-xs font-mono font-semibold text-[#E0A82E]">2026 - 2027</span>
          </div>

          {currentStudent.motto && (
            <p className="text-[11px] text-[#A1A1AA] italic line-clamp-2 leading-relaxed">
              "{currentStudent.motto}"
            </p>
          )}
        </div>

        {/* Lista de Navegación */}
        <nav className="space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
            Aprendizaje
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isNavItemActive(item.id, activeTab);
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between min-h-[40px] px-3 py-2 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'bg-[#18181B] text-white border-l-2 border-[#E0A82E] font-semibold shadow-sm'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#18181B]/60 font-medium'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#E0A82E]' : 'text-[#71717A]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-[#E0A82E]/20 text-[#E0A82E] border border-[#E0A82E]/30'
                        : 'bg-[#27272A] text-[#A1A1AA]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Sección de Gestión & Roles Institucionales */}
          <div className="pt-4 mt-3 border-t border-[#27272A] space-y-1">
            <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
              Gestión & Roles
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('parent')}
              className={`w-full flex items-center justify-between min-h-[38px] px-3 py-2 rounded-xl text-xs transition-all ${
                activeTab === 'parent'
                  ? 'bg-[#18181B] text-white border-l-2 border-[#1B7F4B] font-semibold'
                  : 'text-[#A1A1AA] hover:text-[#34D399] hover:bg-[#18181B]/60 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-[#1B7F4B]" />
                <span>Portal Familias</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1B7F4B]/15 text-[#34D399] font-mono">
                Tutor
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`w-full flex items-center justify-between min-h-[38px] px-3 py-2 rounded-xl text-xs transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#18181B] text-white border-l-2 border-[#1D4ED8] font-semibold'
                  : 'text-[#A1A1AA] hover:text-[#60A5FA] hover:bg-[#18181B]/60 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-[#1D4ED8]" />
                <span>Consola Admin</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1D4ED8]/15 text-[#60A5FA] font-mono">
                Admin
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Tarjeta de Pedagogía Institucional */}
      <div className="p-3.5 rounded-2xl border border-[#27272A] bg-[#18181B] text-xs text-[#D4D4D8] space-y-2 shadow-sm">
        <div className="flex items-center gap-2 font-semibold">
          <div className="w-5 h-5 rounded-md bg-[#0A0A0A] p-0.5 border border-[#27272A] flex items-center justify-center shrink-0">
            <SchoolLogo size="xs" variant="monogram" className="w-3.5 h-3.5 object-contain" />
          </div>
          <span className="text-white text-xs font-bold">Wisdom Academy</span>
        </div>
        <p className="text-[11px] leading-relaxed text-[#A1A1AA]">
          Tutoría socrática inteligente, microcurrículo estructurado y evaluación formativa basada en evidencias.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
