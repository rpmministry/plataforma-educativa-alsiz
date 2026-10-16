# Etapa 04 — Registro Detallado de Cambios
**Sistema de diseño y estructura frontend**
*Rama:* `etapa-04-sistema-diseno-y-frontend` • *Fecha:* 2026-10-16

---

## 1. Resumen de la Intervención
En la **Etapa 04**, se implementaron componentes visuales, tokens de diseño y rutas de navegación para la **Plataforma Educativa ALSIZ para Ekballo Church**. No se agregaron dependencias externas a `package.json` (se reutilizaron React 19, TypeScript, Lucide React y Tailwind CSS). Todos los cambios se realizaron con rutas absolutas verificables en el repositorio.

---

## 2. Archivos Creados

| Ruta del Archivo Creado | Razón del Cambio | Impacto en la Aplicación |
|---|---|---|
| `src/styles/tokens.ts` | Centralizar tokens de diseño oficiales de Ekballo Church. | Provee paleta `#0A0D11`, acentos dorado/índigo, tipografía, radios, elevaciones y estados. |
| `src/components/common/StateFeedback.tsx` | Proveer componentes reutilizables de estados de UI. | Estandariza estados de carga, vacío, error, denegado, éxito y el distintivo `DevelopmentBadge`. |
| `src/components/common/FeatureNoticeModal.tsx` | Evitar botones inertes según la regla "No dead buttons". | Muestra modal accesible con explicación de funciones programadas para etapas futuras. |
| `src/components/auth/AccessView.tsx` | Pasarela de acceso y selección de roles unificada. | Permite seleccionar entre Estudiante, Representante, Docente y Administrador. |
| `src/components/subjects/CourseDetailView.tsx` | Vista de drill-down curricular de una asignatura. | Muestra perfil del tutor IA, sílabo, unidades curriculares y enlace a la clase del día. |
| `src/components/parent/ParentDashboard.tsx` | Portal familiar y bitácora de homeschooling. | Supervisión de 800h/200 días, proyectos MINEDUC, acompañamiento ministerial y LOPDP. |
| `src/components/admin/AdminShell.tsx` | Consola administrativa y gobierno de TI. | Gestión de programas, nómina de estudiantes, telemetría `/api/v1/health` y auditoría. |
| `docs/diseno/sistema_de_diseno.md` | Manual técnico completo del sistema de diseño. | Documenta la guía de estilos, paleta de colores, accesibilidad y componentes. |

---

## 3. Archivos Modificados

| Ruta del Archivo Modificado | Razón de la Modificación | Impacto y Módulos Afectados |
|---|---|---|
| `index.html` | Adoptar branding institucional, metadatos y favicons de Ekballo Church. | Título actualizado a *Plataforma Educativa ALSIZ — Ekballo Church*, tema `#0A0D11` y favicons oficiales. |
| `src/App.tsx` | Integrar las 8 pantallas prioritarias en el router principal. | Enruta `home`, `access`, `space`, `subjects`, `subject-detail`, `classes`, `parent`, `admin`. Oculta navegación en landing y access. |
| `src/components/common/SchoolLogo.tsx` | Sustituir vectores antiguos por la marca Ekballo Church. | Implementa monograma "E" en gradiente dorado y wordmark completo en SVG. |
| `src/components/layout/Navbar.tsx` | Reemplazar "WISDOM SCHOOL" por "ALSIZ • EKBALLO" y añadir selector de rol. | Marca actualizada, badge de perfil activo, acceso a roles y switch de estudiante. |
| `src/components/layout/Sidebar.tsx` | Añadir sección de "Gestión & Roles" institucionales. | Enlaces rápidos al Portal Padres (`parent`) y Consola Admin (`admin`). |
| `src/components/landing/LandingView.tsx` | Reflejar la misión dual (Homeschooling K-12 + Discipulado). | Hero section con monograma Ekballo, pilares pedagógicos ALSIZ y botón directo a roles. |
| `src/components/subjects/SubjectsView.tsx` | Incorporar botones duales en cada tarjeta de materia. | Permite abrir "Detalle y Sílabo" (`CourseDetailView`) o "Clase de Hoy" (`DailyClassView`). |
| `src/components/dashboard/StudentDashboard.tsx` | Añadir `DevelopmentBadge` en encabezado. | Identifica formalmente los datos demostrativos en el espacio del alumno. |
| `src/components/progress/ProgressView.tsx` | Añadir `DevelopmentBadge` en encabezado. | Identifica formalmente las métricas demostrativas. |
| `src/context/SchoolContext.tsx` | Agregar `currentRole`, `setCurrentRole` y liberar rutas públicas. | Permite navegación pública a `home` y `access`, y navegación contextual para `parent` y `admin`. |
| `src/types/index.ts` | Extender tipos de dominio para roles y navegación. | Añade `UserRole = 'student' \| 'representative' \| 'teacher' \| 'admin'` y nuevas pestañas a `NavigationTab`. |
| `src/utils/navigation.ts` | Mapear alias de navegación. | Mantiene resaltada la pestaña de materias cuando se visualiza `subject-detail`. |

---

## 4. Archivos Eliminados
- Ningún archivo de producto preexistente fue eliminado.

---

## 5. Migraciones y Dependencias
- **Dependencias nuevas**: Ninguna (`npm install` no fue requerido; stack existente intacto).
- **Migraciones de base de datos**: No aplica en esta etapa (previsto para Etapa 05).
- **Protección de Datos Personales (LOPDP)**: No se almacenan secretos ni datos de menores reales en el código fuente.

