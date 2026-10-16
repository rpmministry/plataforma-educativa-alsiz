# Registro de Cambios — ETAPA 06: Núcleo Académico LMS

## 1. Resumen de la Etapa
- **Identificador**: `ETAPA-06`
- **Nombre**: Núcleo Académico LMS
- **Rama de trabajo**: `etapa-06-nucleo-academico-lms`
- **Fecha de ejecución**: 2026-10-16
- **Estado**: APROBADA (lista para revisión humana)

---

## 2. Dependencias Añadidas
- **Dependencias de producción (`dependencies`)**: Ninguna dependencia nueva requerida. Se reutilizó el stack base validado (Express, SQLite3, jsonwebtoken, bcryptjs, React 19, Lucide React).
- **Dependencias de desarrollo (`devDependencies`)**: Ninguna dependencia añadida.
- **Scripts de npm añadidos en `package.json`**:
  - `"test:etapa06": "tsx scripts/test-etapa-06.ts"` (Suite automatizada de 25 pruebas de integración del núcleo LMS).

---

## 3. Migraciones de Base de Datos
1. **`server/db/migrations/004_lms_academic_core.sql`**:
   - **Propósito**: Extensión relacional de base de datos para soportar el ciclo de vida del aprendizaje LMS.
   - **Tablas creadas**:
     - `academic_periods`: Ciclos lectivos (Sierra-Amazonía / Costa), fechas de inicio/fin y bandera de periodo actual.
     - `academic_calendar_events`: Cronograma de hitos, trimestres, evaluaciones y fechas límites de entrega.
     - `student_subject_enrollments`: Matriculación normalizada N:M de estudiantes a asignaturas, con tutor/docente asignado.
     - `lesson_objectives`: Metas pedagógicas observables y medibles vinculadas a lecciones diarias.
     - `learning_resources`: Recursos didácticos (video, lectura, simulación, enlace) con atributo de idioma (`es`, `en`, etc.).
     - `submission_grade_history`: Libro mayor inmutable de calificaciones, rúbricas y justificación pedagógica de re-evaluaciones.
     - `student_competency_mastery`: Registro de dominio competencial con separación estricta entre actividades completadas y dominio demostrado.
   - **Columnas añadidas a `evaluations`**: `competency_id`, `rubric_criteria_json`, `due_date`.
   - **Índices de seguridad y desempeño**: Se definieron índices compuestos para optimizar consultas de matriculación, historial y cálculo de progreso.

2. **`server/db/migrations/005_lms_seed_data.sql`**:
   - **Propósito**: Datos semilla sintéticos para desarrollo y pruebas del núcleo académico LMS.
   - **Contenido**: Periodo lectivo 2026-2027, eventos de calendario, matriculaciones de prueba, asignaturas de 4.º y 8.º EGB, competencias MINEDUC, unidades trimestrales, clases diarias socráticas, recursos bilingües con fallback e historial de prueba.

---

## 4. Archivos Creados

| Archivo | Tipo | Razón del Cambio / Responsabilidad |
| :--- | :--- | :--- |
| `server/db/migrations/004_lms_academic_core.sql` | SQL DDL | Migración de esquema relacional para el núcleo académico LMS. |
| `server/db/migrations/005_lms_seed_data.sql` | SQL DML | Semilla sintética de programas, periodos, unidades, competencias y recursos. |
| `server/academic/academicService.ts` | Backend (TypeScript) | Lógica de negocio y servicio de dominio: programas, niveles, materias, matrículas, lecciones, recursos bilingües, entregas, rúbricas cuantitativas, historial inmutable, cálculo de dominio competencial y emisión de boletines Art. 32. |
| `server/routes/academicRoutes.ts` | Backend (Express Router) | Endpoints RESTful protegidos por RBAC (`requireRole`) y aislamiento Anti-IDOR (`requireStudentAccess`). |
| `scripts/test-etapa-06.ts` | Script de Pruebas | Suite automatizada integral de 25 pruebas de integración y aceptación para ETAPA-06. |
| `docs/ejecucion/etapas/ETAPA-06/00_PLAN.md` | Documentación | Plan de trabajo, riesgos, criterios de aceptación y directivas de ejecución. |
| `docs/ejecucion/etapas/ETAPA-06/01_CAMBIOS.md` | Documentación | Este registro detallado de modificaciones, dependencias y mapa de módulos. |
| `docs/ejecucion/etapas/ETAPA-06/02_PRUEBAS.md` | Documentación | Detalle de comandos de prueba, entorno de ejecución y evidencias reproducibles. |
| `docs/ejecucion/etapas/ETAPA-06/03_VALIDACION.md` | Documentación | Matriz de trazabilidad de los criterios de aceptación con estado `CUMPLE`. |
| `docs/ejecucion/etapas/ETAPA-06/04_RIESGOS_Y_DECISIONES.md` | Documentación | Registro de decisiones de arquitectura (ADR) y gestión de riesgos residuales. |
| `docs/ejecucion/etapas/ETAPA-06/05_REVERSA.md` | Documentación | Procedimiento documentado y seguro de rollback sin pérdida de datos. |
| `docs/ejecucion/etapas/ETAPA-06/06_CIERRE.md` | Documentación | Informe ejecutivo de cierre y dictamen técnico final. |
| `docs/ejecucion/etapas/ETAPA-06/evidencias/01_suite_pruebas_etapa_06.txt` | Evidencia | Salida completa y reproducible de la suite `npm run test:etapa06`. |
| `docs/manuales/manual_configuracion_academica.md` | Manual Operativo | Guía práctica para administradores y docentes sobre configuración curricular. |

---

## 5. Archivos Modificados

| Archivo | Razón del Cambio | Impacto |
| :--- | :--- | :--- |
| `package.json` | Incorporación del script `"test:etapa06": "tsx scripts/test-etapa-06.ts"`. | Facilita la ejecución automatizada de pruebas sin afectar scripts existentes. |
| `server.ts` | Montaje de `academicRouter` en `/api/v1/academic`. | Expone la API académica RESTful protegiéndola con la infraestructura de seguridad. |
| `src/types/index.ts` | Extensión de `Subject` (`category?: string; weeklyHours?: number;`). | Alineación del modelo de tipos frontend con la malla curricular y el backend. |
| `src/components/admin/AdminShell.tsx` | Consumo dinámico de `/api/v1/academic/programs` y modal de creación de programas. | Panel de administración conectado a la base de datos real con retroalimentación inmediata. |
| `src/components/subjects/CourseDetailView.tsx` | Selector interactivo de idioma (`Español` / `English`), renderizado de objetivos y aviso de fallback de traducción. | Experiencia del estudiante enriquecida con soporte multilingüe real y transparente. |
| `src/components/dashboard/StudentDashboard.tsx` | Tarjeta de Seguimiento Competencial con distinción de actividades entregadas vs. dominio demostrado (umbral >= 7.00). | El estudiante visualiza con claridad sus destrezas alcanzadas y las pendientes de refuerzo. |
| `src/components/parent/ParentDashboard.tsx` | Botón y diálogo modal interactivo para consultar el Boletín Oficial (MINEDUC Art. 32) en vista imprimible. | El representante legal accede a reportes académicos oficiales protegidos por parentesco. |
| `scripts/test-etapa-05.ts` | Actualización de aserción de cantidad de migraciones (`>= 3`). | Previene falsos positivos en suites de regresión previas al evolucionar el esquema. |
| `docs/arquitectura/modelo_datos_y_diccionario.md` | Inclusión de las entidades 7 a 20 (núcleo académico LMS) y actualización del diagrama ERD. | Documentación técnica canónica actualizada y alineada con la base de datos efectiva. |
| `docs/ejecucion/bitacora.md` | Registro de la entrada oficial correspondiente a la ETAPA-06. | Trazabilidad histórica del proyecto conforme al estándar de documentación. |
| `docs/ejecucion/README.md` | Actualización del índice de etapas y estado de ejecución. | Índice maestro de documentación sincronizado. |

---

## 6. Mapa de Módulos y Funciones Afectadas

```
[ Frontend: React / Vite ]
  ├── AdminShell.tsx ──────────► POST /api/v1/academic/programs, GET /api/v1/academic/programs
  ├── CourseDetailView.tsx ────► GET /api/v1/academic/lessons/:id/resources?lang=en|es
  ├── StudentDashboard.tsx ────► GET /api/v1/academic/students/:id/competencies-progress
  └── ParentDashboard.tsx ─────► GET /api/v1/academic/students/:id/report-card
                                       │
                                       ▼
                             [ REST API Router: academicRoutes.ts ]
                               (Middlewares: requireAuth, requireRole, requireStudentAccess)
                                       │
                                       ▼
                             [ Domain Service: academicService.ts ]
                               ├── createProgram(), getPrograms()
                               ├── createLevel(), getLevels()
                               ├── createPeriod(), getPeriods()
                               ├── createSubject(), getSubjects()
                               ├── enrollStudentInProgram(), enrollStudentInSubject()
                               ├── createCurriculumUnit(), getCurriculumUnits()
                               ├── createDailyClass(), getDailyClassDetail()
                               ├── addLessonObjective(), getLessonObjectives()
                               ├── addLearningResource(), getLearningResources()
                               ├── createEvaluation(), submitActivity()
                               ├── evaluateSubmission() ──► Inserta en submission_grade_history
                               │                          └──► Actualiza student_competency_mastery
                               ├── getCompetenciesProgress() (Filtra >= 7.00 para DEMONSTRATED_MASTERY)
                               └── generateStudentReportCard() (Formato oficial Art. 32)
                                       │
                                       ▼
                             [ SQLite3 Database: alsiz_dev.db ]
                               (Tablas: programs, levels, subjects, academic_periods,
                                academic_calendar_events, student_subject_enrollments,
                                curriculum_units, daily_classes, lesson_objectives,
                                learning_resources, evaluations, student_submissions,
                                submission_grade_history, student_competency_mastery)
```

---

## 7. Políticas de Seguridad y Privacidad Verificadas en los Cambios
1. **No exposición de credenciales ni hashes**: Ningún endpoint académico retorna `password_hash` ni `pin_code_hash`.
2. **Defensa Anti-IDOR / Anti-BOLA**:
   - `requireStudentAccess` valida en base de datos que el usuario solicitante sea el propio alumno o un representante con vínculo formal en `student_representatives`.
   - Representantes de una familia no pueden acceder a datos ni boletines de otra familia (403 `FORBIDDEN_FAMILY_ACCESS`).
3. **RBAC estricto**:
   - La creación de programas, grados y materias exige rol `ADMIN` (403 para docentes y alumnos).
   - La creación de unidades, lecciones y calificación exige rol `TEACHER` o `ADMIN` (403 para alumnos).
4. **Datos sintéticos en pruebas**: Toda la suite y semillas utilizan estudiantes y representantes ficticios (`Mateo Santos`, `Familia Santos`, etc.), protegiendo los datos de los estudiantes reales del colegio.

