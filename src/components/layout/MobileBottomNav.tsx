import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { NavigationTab } from '../../types';
import { isNavItemActive } from '../../utils/navigation';
import {
  LayoutDashboard,
  BookMarked,
  CalendarDays,
  TrendingUp,
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  fullLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, todayClasses } = useSchool();

  const navItems: NavItem[] = [
    {
      id: 'space',
      label: 'Mi Espacio',
      fullLabel: 'Mi Espacio de Estudio',
      icon: LayoutDashboard,
      badge: todayClasses.length > 0 ? todayClasses.length.toString() : undefined,
    },
    { id: 'subjects', label: 'Materias', icon: BookMarked },
    { id: 'schedule', label: 'Horario', icon: CalendarDays },
    { id: 'progress', label: 'Progreso', icon: TrendingUp },
  ];

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-t border-[#27272A] pb-safe"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around px-2 py-1.5 overflow-x-auto scrollbar-none touch-scroll-x">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isNavItemActive(item.id, activeTab);
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.fullLabel || item.label}
              aria-label={item.fullLabel || item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl transition-all min-w-[60px] min-h-[50px] relative border ${
                isActive
                  ? 'text-[#E0A82E] bg-[#18181B] border-[#27272A] font-semibold'
                  : 'text-[#A1A1AA] border-transparent hover:text-white hover:bg-[#18181B]/40 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#E0A82E]' : 'text-[#71717A]'}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full text-[9px] font-black flex items-center justify-center bg-[#E0A82E] text-[#0A0A0A]">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] leading-none tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
