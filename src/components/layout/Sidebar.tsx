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
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, currentStudent, todayClasses } = useSchool();

  // "Mi Espacio de Estudio" es la única puerta de entrada: fusiona el antiguo
  // "Mi Espacio" con "Clases del Día". Las clases ya no son una pestaña aparte.
  const navItems: NavItem[] = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'space', label: 'Mi Espacio de Estudio', icon: User, badge: todayClasses.length > 0 ? todayClasses.length.toString() : undefined },
    { id: 'subjects', label: 'Materias', icon: BookMarked },
    { id: 'schedule', label: 'Horario', icon: CalendarDays },
    { id: 'progress', label: 'Progreso', icon: TrendingUp },
  ];

  const isAvril = currentStudent.id === 'avril' || currentStudent.id === 'karen';

  return (
    <aside className={`w-56 lg:w-64 xl:w-72 border-r p-4 flex flex-col justify-between hidden md:flex shrink-0 transition-colors duration-300 ${
      isAvril
        ? 'bg-slate-900/95 border-amber-500/20'
        : 'bg-slate-900/95 border-red-500/20'
    }`}>
      <div className="space-y-6">
        
        {/* Student Profile Card in Sidebar */}
        <div className={`p-4 rounded-2xl border shadow-lg space-y-2.5 transition-all ${
          isAvril
            ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-amber-900/20 border-amber-500/40 shadow-amber-950/20'
            : 'bg-gradient-to-br from-red-950/40 via-slate-900 to-red-900/20 border-red-500/40 shadow-red-950/20'
        }`}>
          <div className="flex items-center gap-3">
            <StudentAvatar
              studentId={currentStudent.id}
              name={currentStudent.name}
              size="md"
              editable={true}
            />
            <div className="overflow-hidden">
<div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-white">{currentStudent.name}</span>
                {currentStudent.isDemo && (
                  <span className="text-[10px] bg-red-500/40 text-red-200 px-1.5 py-0.5 rounded-full">TEST</span>
                )}
                <span className="text-[11px] font-medium text-slate-400">({currentStudent.age}a)</span>
              </div>
              <p className={`text-xs font-bold truncate ${isAvril ? 'text-amber-300' : 'text-red-300'}`}>
                {currentStudent.grade}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
              isAvril
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-red-500/20 text-red-300 border-red-500/40'
            }`}>
              {isAvril ? '🐶 Mundo Snoopy' : '🍄 Mundo Mario'}
            </span>
            <span className="text-[10px] font-bold text-slate-300 font-mono">
              {isAvril ? '🐾 Woodstock' : '🪙 +10 Coins'}
            </span>
          </div>

          <p className="text-[11px] text-slate-300 italic line-clamp-2 leading-relaxed">
            "{currentStudent.motto}"
          </p>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Espacio de Estudio</span>
            <span className="text-[10px] opacity-75">{isAvril ? '🐶 Peanuts' : '🍄 Level 1'}</span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isNavItemActive(item.id, activeTab);
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? isAvril
                      ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm'
                      : 'bg-red-500/20 text-red-200 border border-red-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? (isAvril ? 'text-amber-400' : 'text-red-400') : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? isAvril
                          ? 'bg-amber-500/30 text-amber-200'
                          : 'bg-red-500/30 text-red-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Sección de Gestión & Roles Institucionales */}
          <div className="pt-3 border-t border-white/10">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Gestión & Roles
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('parent')}
              className={`w-full flex items-center justify-between min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'parent'
                  ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Portal Padres</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                MINEDUC
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('admin')}
              className={`w-full flex items-center justify-between min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-purple-500/20 text-purple-200 border border-purple-500/40'
                  : 'text-slate-400 hover:text-purple-300 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Consola Admin</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                TI
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Themed Pedagogy Badge */}
      <div className={`p-3.5 rounded-2xl border text-xs text-slate-300 space-y-2 ${
        isAvril
          ? 'bg-amber-950/20 border-amber-500/30'
          : 'bg-red-950/20 border-red-500/30'
      }`}>
        <div className="flex items-center gap-2 font-bold">
          <div className="w-5 h-5 rounded-md bg-slate-800 p-0.5 border border-slate-700 flex items-center justify-center shrink-0">
            <SchoolLogo size="xs" className="w-4 h-4 object-contain" />
          </div>
          <span className={isAvril ? 'text-amber-300' : 'text-red-300'}>
            {isAvril ? '🐶 Cuentos de Snoopy' : '🍄 Reino Champiñón'}
          </span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-300">
          {isAvril
            ? 'Método Montessori y Charlotte Mason guiado por Snoopy y la libreta de evidencias de Avril.'
            : 'Misiones paso a paso con Cajas [?], Yoshi y monedas de aprendizaje para Gael.'}
        </p>
      </div>
    </aside>
  );
};
