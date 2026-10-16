/**
 * Sistema de Diseño ALSIZ — Tokens de Identidad y Tema Visual
 * Ekballo Church • Plataforma Educativa ALSIZ
 * 
 * Basado en los lineamientos verificados de la marca Ekballo Church:
 * - Fondo institucional oscuro: #0A0D11
 * - Tono plata/gris identidad: #BCBEBE
 * - Acento K-12 / Sabiduría: Indigo (#4F46E5) y Ámbar (#E59000 / #F59E0B)
 */

export const DESIGN_TOKENS = {
  // Paleta Institucional Ekballo
  colors: {
    brand: {
      background: '#0A0D11',
      surface: '#121820',
      surfaceRaised: '#18202A',
      card: '#1F2937',
      border: '#283545',
      borderLight: '#374151',
      silver: '#BCBEBE',
      silverLight: '#E2E8F0',
      gold: '#E59000',
      goldHover: '#F59E0B',
      goldLight: '#FEF3C7',
    },
    // Semántica de Estados Educativos
    state: {
      success: {
        text: '#34D399',
        bg: 'rgba(16, 185, 129, 0.12)',
        border: 'rgba(16, 185, 129, 0.35)',
        solid: '#10B981',
      },
      warning: {
        text: '#FBBF24',
        bg: 'rgba(245, 158, 11, 0.12)',
        border: 'rgba(245, 158, 11, 0.35)',
        solid: '#F59E0B',
      },
      error: {
        text: '#FB7185',
        bg: 'rgba(244, 63, 94, 0.12)',
        border: 'rgba(244, 63, 94, 0.35)',
        solid: '#F43F5E',
      },
      info: {
        text: '#60A5FA',
        bg: 'rgba(59, 130, 246, 0.12)',
        border: 'rgba(59, 130, 246, 0.35)',
        solid: '#3B82F6',
      },
      development: {
        text: '#A78BFA',
        bg: 'rgba(139, 92, 246, 0.15)',
        border: 'rgba(139, 92, 246, 0.40)',
        solid: '#8B5CF6',
      },
    },
    // Acentos Pedagógicos por Alumno / Modalidad
    worlds: {
      snoopy: {
        primary: '#F59E0B',
        secondary: '#D97706',
        accent: '#FBBF24',
        badge: '🐶 Mundo Snoopy',
      },
      mario: {
        primary: '#EF4444',
        secondary: '#DC2626',
        accent: '#F87171',
        badge: '🍄 Mundo Mario',
      },
      ekballo: {
        primary: '#E59000',
        secondary: '#4F46E5',
        accent: '#38BDF8',
        badge: '✨ Discipulado Ekballo',
      },
    },
  },

  // Tipografías
  typography: {
    fontFamilies: {
      sans: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      heading: "'Outfit', 'Plus Jakarta Sans', sans-serif",
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

  // Radios de Borde
  radii: {
    sm: '0.375rem',  // 6px
    md: '0.625rem',  // 10px
    lg: '1rem',      // 16px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Sombras y Elevaciones
  elevations: {
    card: '0 10px 30px rgba(10, 13, 17, 0.50)',
    cardHover: '0 16px 40px rgba(10, 13, 17, 0.70)',
    modal: '0 25px 60px rgba(0, 0, 0, 0.85)',
    glowGold: '0 0 25px rgba(229, 144, 0, 0.20)',
    glowIndigo: '0 0 25px rgba(99, 102, 241, 0.20)',
  },

  // Puntos de quiebre responsivos
  breakpoints: {
    sm: '640px',   // Móvil grande / phablet
    md: '768px',   // Tableta vertical / iPad portrait
    lg: '1024px',  // iPad landscape / Laptop compacta
    xl: '1280px',  // Escritorio estándar
    '2xl': '1536px' // Pantallas amplias
  },

  // Roles de la Plataforma
  roles: {
    student: {
      id: 'student',
      label: 'Estudiante',
      description: 'Acceso a clases, microcurrículo, tutor IA socrático y portafolio de evidencias',
      defaultTab: 'space',
      color: 'amber',
    },
    representative: {
      id: 'representative',
      label: 'Representante',
      description: 'Bitácora ministerial de homeschooling, registro de horas, seguimiento MINEDUC y consentimientos LOPDP',
      defaultTab: 'parent',
      color: 'emerald',
    },
    teacher: {
      id: 'teacher',
      label: 'Docente / Tutor Socrático',
      description: 'Supervisión curricular, retroalimentación formativa de evidencias y personalización de guías',
      defaultTab: 'classes',
      color: 'indigo',
    },
    admin: {
      id: 'admin',
      label: 'Administrador',
      description: 'Control de programas, matrículas, diagnóstico del sistema e historial de auditoría LOPDP',
      defaultTab: 'admin',
      color: 'purple',
    },
  },
} as const;

export type UserRole = keyof typeof DESIGN_TOKENS.roles;

