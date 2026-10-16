# Matriz de Validación y Criterios de Aceptación — ETAPA 06: Núcleo Académico LMS

## 1. Validación de los Criterios de Aceptación del Prompt

| # | Criterio de Aceptación | Estado | Evidencia Vinculada / Verificación Técnica |
| :---: | :--- | :---: | :--- |
| **CA-01** | **Un administrador crea un programa, grado y asignatura.** | `CUMPLE` | - Test 1A, 1B, 1C en `scripts/test-etapa-06.ts`<br>- Endpoints: `POST /api/v1/academic/programs`, `POST /api/v1/academic/levels`, `POST /api/v1/academic/subjects`<br>- UI: Modal interactivo de creación en `src/components/admin/AdminShell.tsx`. |
| **CA-02** | **Asigna un estudiante de prueba a ese programa y materia mediante relaciones normalizadas.** | `CUMPLE` | - Test 2A, 2B en `scripts/test-etapa-06.ts`<br>- Endpoints: `POST /api/v1/academic/enrollments`, `POST /api/v1/academic/subject-enrollments`<br>- Tablas: `student_program_enrollments` y `student_subject_enrollments`<br>- Respeta unicidad de expediente de estudiante sin duplicación de usuarios. |
| **CA-03** | **Un docente autorizado crea una unidad, una lección y una actividad.** | `CUMPLE` | - Test 3A, 3B, 3C, 3D en `scripts/test-etapa-06.ts`<br>- Endpoints: `POST /api/v1/academic/subjects/:id/units`, `POST /api/v1/academic/units/:id/lessons`, `POST /api/v1/academic/lessons/:id/evaluations`<br>- Validación de rol: Restringido a `TEACHER` y `ADMIN` mediante middleware `requireRole`. |
| **CA-04** | **El estudiante de prueba accede al contenido y entrega la actividad.** | `CUMPLE` | - Test 4A, 4C en `scripts/test-etapa-06.ts`<br>- Endpoints: `GET /api/v1/academic/lessons/:id`, `POST /api/v1/academic/evaluations/:id/submissions`<br>- La entrega se almacena en `student_submissions` con estado `SUBMITTED`. |
| **CA-05** | **El docente evalúa con una rúbrica y deja retroalimentación.** | `CUMPLE` | - Test 5A, 5B, 5C en `scripts/test-etapa-06.ts`<br>- Endpoint: `POST /api/v1/academic/submissions/:id/evaluate`<br>- Rúbrica desglosada por criterios cuantitativos, puntaje total calculado y devolución cualitativa registrada en `submission_grade_history`. |
| **CA-06** | **El panel refleja el estado correspondiente sin declarar dominio si no se cumplen los criterios.** | `CUMPLE` | - Test 6A en `scripts/test-etapa-06.ts`<br>- Evaluación con nota 5.50 (< 7.00): Marca `COMPLETED_NO_MASTERY`, `is_mastered = false`<br>- Test 6B en `scripts/test-etapa-06.ts`<br>- Re-evaluación con nota 8.50 (>= 7.00): Marca `DEMONSTRATED_MASTERY`, `is_mastered = true`<br>- UI: Widget en `StudentDashboard.tsx` separa actividades entregadas vs. destrezas dominadas. |
| **CA-07** | **Un usuario sin permisos no puede ver ni cambiar la información.** | `CUMPLE` | - Test 7A (401 sin token), 7B (403 estudiante calificador), 7C (403 Anti-IDOR entre estudiantes), 7D (403 Anti-IDOR familiar entre representantes)<br>- Middlewares: `requireAuth`, `requireRole(['TEACHER', 'ADMIN'])`, `requireStudentAccess`. |

---

## 2. Validación de las 10 Funcionalidades Requeridas

| # | Funcionalidad | Estado | Implementación y Evidencia |
| :---: | :--- | :---: | :--- |
| **FN-01** | Gestión de programas, periodos, niveles, grados y asignaturas. | `CUMPLE` | Entidades relacionales en migración `004`, seed en `005`, endpoints CRUD en `academicRoutes.ts`. |
| **FN-02** | Vinculación de estudiantes con su programa y asignaturas mediante relaciones normalizadas. | `CUMPLE` | Esquema normalizado en `student_program_enrollments` y `student_subject_enrollments` con verificación de unicidad. |
| **FN-03** | Organización de asignaturas en unidades, lecciones, objetivos, competencias y recursos. | `CUMPLE` | Jerarquía relacional completa: `subjects` -> `curriculum_units` -> `daily_classes` -> `lesson_objectives`, `learning_resources`, `evaluations`. |
| **FN-04** | Calendarios académicos y fechas de actividades. | `CUMPLE` | Entidad `academic_calendar_events` vinculada a `academic_periods`, endpoints de consulta de cronograma e hitos. |
| **FN-05** | Tareas, ejercicios, entregas y evaluaciones formativas. | `CUMPLE` | Entidad `evaluations` y `student_submissions` con ciclo de estados (`SUBMITTED`, `EVALUATED`, `NEEDS_REVISION`). |
| **FN-06** | Calificaciones, rúbricas y retroalimentación con historial de cambios. | `CUMPLE` | Tabla inmutable `submission_grade_history` con autor, motivo de reajuste, desglose de rúbrica y notas anterior/nueva. |
| **FN-07** | Seguimiento por competencia, distinguiendo actividad completada de dominio demostrado. | `CUMPLE` | Tabla `student_competency_mastery`. Umbral mínimo legal de 7.00/10.00 para certificar `DEMONSTRATED_MASTERY`. |
| **FN-08** | Panel del estudiante y vistas académicas esenciales del representante. | `CUMPLE` | Vistas actualizadas en `StudentDashboard.tsx` (progreso competencial) y `ParentDashboard.tsx` (acceso a boletín Art. 32). |
| **FN-09** | Informes exportables dentro del alcance técnico aprobado. | `CUMPLE` | Endpoint `GET /api/v1/academic/students/:studentId/report-card` con generación de boletín oficial (MINEDUC Art. 32) y vista imprimible (`window.print()`). |
| **FN-10** | Selección de idioma para materiales disponibles con degradación transparente. | `CUMPLE` | Parámetro `?lang=en` en `learning_resources`. Si no hay traducción, entrega el recurso base español con notificación en frontend sin romper la interfaz. |

---

## 3. Resumen de Cumplimiento
- Criterios de Aceptación Críticos: **7 de 7 CUMPLEN (100%)**
- Funcionalidades Requeridas: **10 de 10 CUMPLEN (100%)**
- Criterios No Cumplidos (`NO CUMPLE`): **0**
- Criterios Bloqueados (`BLOQUEADO`): **0**
- Criterios No Aplicables (`NO APLICA`): **0**
- Estado de Validación: **APROBADO**

