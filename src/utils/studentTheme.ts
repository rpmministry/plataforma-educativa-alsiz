import { Student } from '../types';

// Temas visuales de aula académica para Wisdom Academy.
export interface ThemeColors {
  accent: string;
  chip: string;
  textStrong: string;
  label: 'Wisdom Academy' | 'Original';
}

export const getWorldTheme = (student: Student): ThemeColors => {
  const base: any = student?.colorTheme || {
    primary: 'amber',
    secondary: 'indigo',
    accent: '#E0A82E',
    gradient: 'from-amber-600 via-amber-500 to-amber-700',
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  };
  return { ...base, accent: base?.accent || '#E0A82E', chip: '#18181B', textStrong: '#F4F4F5', label: 'Wisdom Academy' };
};

export interface WorldDecor {
  emoji: string;
  title: (name: string) => string;
  accentLabel: string;
  celebrationWord: string;
}

export const getWorldDecor = (student: Student): WorldDecor => {
  return {
    emoji: '🎓',
    title: (n) => `Aula de Aprendizaje de ${n}`,
    accentLabel: 'Tutoría académica socrática activa',
    celebrationWord: '¡Excelente avance conceptual!',
  };
};
