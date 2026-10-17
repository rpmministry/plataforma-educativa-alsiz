/**
 * Sistema de Diseño Wisdom Academy — Tokens de Identidad y Sistema Visual
 * Basado en las directrices oficiales de Wisdom Academy:
 * - 90% neutros: Tinta (#0A0A0A), Grafito (#18181B), Línea oscura (#27272A), Pizarra (#52525B), Niebla (#E4E4E7), Papel (#F4F4F5)
 * - 10% acento: Luz (#E0A82E), Luz-600 (#B77D06), Luz-800 (#8A5A00)
 * - Principios: ElevenLabs (herramienta profesional), Canvas LMS (organización académica),
 *   Carbon Design System (tokens, contraste, accesibilidad WCAG AA) e Impeccable (sobriedad, proporción).
 */

export const DESIGN_TOKENS = {
  // Paleta Oficial Wisdom Academy
  colors: {
    brand: {
      ink: '#0A0A0A',
      graphite: '#18181B',
      surface: '#18181B',
      surfaceRaised: '#202024',
      border: '#27272A',
      borderSubtle: '#1E1E22',
      slate: '#52525B',
      mist: '#E4E4E7',
      paper: '#F4F4F5',
      white: '#FFFFFF',
      luz: '#E0A82E',
      luz600: '#B77D06',
      luz800: '#8A5A00',
    },
    // Semántica de Estados Educativos (Accesibles WCAG AA)
    state: {
      success: {
        text: '#1B7F4B',
        textOnDark: '#34D399',
        bg: 'rgba(27, 127, 75, 0.12)',
        border: 'rgba(27, 127, 75, 0.35)',
        solid: '#1B7F4B',
      },
      warning: {
        text: '#B45309',
        textOnDark: '#FBBF24',
        bg: 'rgba(180, 83, 9, 0.12)',
        border: 'rgba(180, 83, 9, 0.35)',
        solid: '#B45309',
      },
      error: {
        text: '#B42318',
        textOnDark: '#F87171',
        bg: 'rgba(180, 35, 24, 0.12)',
        border: 'rgba(180, 35, 24, 0.35)',
        solid: '#B42318',
      },
      info: {
        text: '#1D4ED8',
        textOnDark: '#60A5FA',
        bg: 'rgba(29, 78, 216, 0.12)',
        border: 'rgba(29, 78, 216, 0.35)',
        solid: '#1D4ED8',
      },
    },
  },

  // Tipografías Oficiales
  typography: {
    fontFamilies: {
      display: "'Poppins', system-ui, -apple-system, sans-serif",
      body: "'Figtree', system-ui, -apple-system, sans-serif",
      scripture: "'Lora', Georgia, serif",
      mono: "'Fira Code', monospace",
    },
    fontSizes: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
  },

  // Radios de Borde (Consistentes y sobrios)
  radii: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.25rem', // 20px
    full: '9999px',
  },

  // Sombras y Elevaciones (Neutras, sin resplandores neón)
  elevations: {
    card: '0 4px 20px rgba(0, 0, 0, 0.35)',
    cardHover: '0 8px 30px rgba(0, 0, 0, 0.50)',
    modal: '0 20px 50px rgba(0, 0, 0, 0.75)',
    dropdown: '0 10px 25px rgba(0, 0, 0, 0.55)',
  },

  // Puntos de quiebre responsivos
  breakpoints: {
    sm: '640px',   // Móvil amplio
    md: '768px',   // Tableta vertical
    lg: '1024px',  // Tableta horizontal / Laptop
    xl: '1280px',  // Escritorio estándar
    '2xl': '1536px' // Pantallas panorámicas
  },

  // Roles de la Plataforma
  roles: {
    student: {
      id: 'student',
      label: 'Estudiante',
      description: 'Acceso a clases, microcurrículo, tutor IA socrático y portafolio de evidencias',
      defaultTab: 'space',
      color: 'luz',
    },
    representative: {
      id: 'representative',
      label: 'Representante',
      description: 'Seguimiento del plan educativo, registro de horas y boletines de calificaciones',
      defaultTab: 'parent',
      color: 'slate',
    },
    teacher: {
      id: 'teacher',
      label: 'Docente / Tutor Socrático',
      description: 'Supervisión pedagógica, acompañamiento en clase y retroalimentación formativa',
      defaultTab: 'classes',
      color: 'slate',
    },
    admin: {
      id: 'admin',
      label: 'Administrador',
      description: 'Gestión académica, directoria de usuarios, centro de conocimiento RAG y supervisión',
      defaultTab: 'admin',
      color: 'slate',
    },
  },
} as const;

export type UserRole = keyof typeof DESIGN_TOKENS.roles;
