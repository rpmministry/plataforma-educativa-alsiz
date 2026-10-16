# Etapa 04 — Pantallas Prioritarias Implementadas
**Plataforma Educativa ALSIZ para Ekballo Church**

---

## 1. Relación de Pantallas y Componentes

| Pestaña | Archivo del Componente | Propósito y Contenido Principal |
| :--- | :--- | :--- |
| **`home`** | `src/components/landing/LandingView.tsx` | **Inicio Institucional**: Presenta la misión dual de ALSIZ y Ekballo Church (Homeschooling K-12 + Discipulado), banners de modo demo, pilares pedagógicos y acceso por perfiles. |
| **`access`** | `src/components/auth/AccessView.tsx` | **Portal Unificado de Acceso**: Selector interactivo para Estudiante, Representante, Docente y Administrador con información pedagógica y atajos rápidos. |
| **`space`** | `src/components/dashboard/StudentDashboard.tsx` | **Panel del Estudiante**: Banner de mundo temático, devocional diario, selector de día lectivo, clases programadas del día y widgets de progreso con distintivo de desarrollo. |
| **`subjects`** | `src/components/subjects/SubjectsView.tsx` | **Vista de Asignaturas**: Malla completa del año escolar con porcentaje de avance, tutores IA asignados y botones duales ("Detalle y Sílabo" y "Clase de Hoy"). |
| **`subject-detail`** | `src/components/subjects/CourseDetailView.tsx` | **Detalle de Curso**: Vista profunda de la materia con perfil del profesor tutor, desglose de unidades curriculares, temas, horarios y botón para iniciar la lección del día. |
| **`classes`** | `src/components/classes/DailyClassView.tsx` | **Aula / Lección**: Entorno de aprendizaje dividido en Masterclass (micro-lecciones), Laboratorio (PhET), Taller y Evidencias, con chat socrático asistido por IA. |
| **`parent`** | `src/components/parent/ParentDashboard.tsx` | **Panel Parental**: Bitácora de homeschooling, contador de horas de estudio acumuladas (meta 800h / 200 días), seguimiento de proyectos y consentimiento legal LOPDP. |
| **`admin`** | `src/components/admin/AdminShell.tsx` | **Shell Administrativo**: Consola institucional para gestión de programas, nómina de estudiantes, telemetría de IA (`/api/v1/health`) y registro inmutable de auditoría LOPDP. |

---

## 2. Etiquetado de Datos de Desarrollo

Todas las pantallas que consumen o proyectan datos simulados incluyen el componente:
```tsx
<DevelopmentBadge stage="Etapa 04" label="Datos de desarrollo controlado" />
```
Esto asegura que ni el estudiante, ni la familia, ni los evaluadores confundan datos de prueba locales con registros definitivos de bases de datos de producción.

