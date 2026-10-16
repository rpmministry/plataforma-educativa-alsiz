# Plan de Ejecución — ETAPA 06: Núcleo Académico LMS

## 1. Identificación de la Etapa
- **Código de Etapa**: `ETAPA-06`
- **Nombre**: Núcleo Académico LMS
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)
- **Rama Git de Trabajo**: `etapa-06-nucleo-academico-lms`
- **Directorio de Trabajo Autorizado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Repositorio Remoto Autorizado**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Fecha de Inicio**: 2026-10-16

---

## 2. Objetivos
Implementar el flujo académico integral de la **Plataforma Educativa ALSIZ para Ekballo Church**, desde la configuración curricular y matriculación formal hasta la entrega de actividades, evaluación por rúbricas y seguimiento competencial distinguido entre actividad completada y dominio demostrado:

1. **Gestión Curricular Completa**: Programas, periodos académicos, subniveles/grados y asignaturas conformes a la matriz curricular aprobada (MINEDUC, Formación Cristiana Ekballo, STEM y Bilingüismo).
2. **Matriculación Normalizada Multi-Programa**: Vinculación relacional de estudiantes a programas (`student_program_enrollments`) y a asignaturas específicas (`student_subject_enrollments`) sin duplicación de expedientes.
3. **Estructura Pedagógica de Asignaturas**: Organización en unidades trimestrales, lecciones diarias socráticas, objetivos de aprendizaje, competencias y recursos didácticos multilingües.
4. **Calendarios y Cronogramas Académicos**: Periodos trimestrales, fechas de entrega, hitos formativos y eventos institucionales.
5. **Tareas, Actividades y Entregas**: Instrumentos evaluativos formativos asociados a lecciones o unidades, con soporte para entregas de estudiantes y control de estados (`SUBMITTED`, `EVALUATED`, `NEEDS_REVISION`).
6. **Calificaciones y Rúbricas con Historial Inmutable de Cambios**: Evaluación analítica basada en rúbricas cuantitativas y cualitativas con auditoría de re-calificación (`submission_grade_history`).
7. **Seguimiento Competencial Riguroso**: Algoritmo y modelo de seguimiento que distingue inequívocamente entre *actividad completada* (entregada/realizada) y *dominio demostrado* (criterio de logro >= 7.00/10.00 cumplido).
8. **Vistas Académicas Esenciales**: Endpoints y componentes para el panel del estudiante y el portal del representante legal, con protección estricta Anti-IDOR / Anti-BOLA.
9. **Informes y Boletines Exportables**: Generador de reportes de progreso académico y boletines descargables en formato estructurado e imprimible.
10. **Selección de Idioma de Materiales**: Soporte explícito de idioma (`es`, `en`, `bilingual`) con detección de recursos traducidos y degradación transparente a idioma base.

---

## 3. Alcance Específico y Tareas

### Tarea 1: Extensión del Modelo Relacional de Base de Datos
- Creación de migración `004_lms_academic_core.sql` para incorporar:
  - `academic_periods`
  - `academic_calendar_events`
  - `student_subject_enrollments`
  - `lesson_objectives`
  - `learning_resources`
  - `submission_grade_history`
  - `student_competency_mastery`
  - Columnas adicionales en `evaluations` (`due_date`, `instructions`, `passing_score`, `competency_id`).
- Creación de migración de datos semilla sintéticos `005_lms_seed_data.sql` con calendario 2026-2027, asignaturas de 4.º y 8.º EGB, competencias MINEDUC, unidades, clases diarias, recursos bilingües y rúbricas.

### Tarea 2: Módulo y Servicio Académico (`server/academic/academicService.ts`)
- Implementación de lógica de negocio para:
  - Creación y listado paginado de programas, grados, asignaturas y periodos.
  - Asignación de estudiantes a programas y asignaturas.
  - Gestión de unidades, lecciones, objetivos y recursos con filtrado de idioma.
  - Publicación de actividades y recepción de entregas con validación de identidad.
  - Calificación con rúbrica, retroalimentación y registro en historial.
  - Cálculo de dominio competencial con umbral configurable (7.00/10.00).
  - Emisión de boletines e informes exportables.

### Tarea 3: Enrutador de API Académica RESTful (`server/routes/academicRoutes.ts`)
- Endpoints protegidos con `requireAuth`, `requireRole` y `requireStudentAccess`:
  - `POST /api/v1/academic/programs`, `GET /api/v1/academic/programs` (con paginación)
  - `POST /api/v1/academic/levels`, `GET /api/v1/academic/levels`
  - `POST /api/v1/academic/periods`, `GET /api/v1/academic/periods`
  - `POST /api/v1/academic/subjects`, `GET /api/v1/academic/subjects`
  - `POST /api/v1/academic/enrollments`, `POST /api/v1/academic/subject-enrollments`
  - `POST /api/v1/academic/subjects/:subjectId/units`, `GET /api/v1/academic/subjects/:subjectId/units`
  - `POST /api/v1/academic/units/:unitId/lessons`, `GET /api/v1/academic/units/:unitId/lessons`
  - `GET /api/v1/academic/lessons/:lessonId`
  - `POST /api/v1/academic/lessons/:lessonId/resources`, `GET /api/v1/academic/lessons/:lessonId/resources`
  - `POST /api/v1/academic/lessons/:lessonId/evaluations`, `GET /api/v1/academic/evaluations/:evaluationId`
  - `POST /api/v1/academic/evaluations/:evaluationId/submissions` (entrega de estudiante)
  - `POST /api/v1/academic/submissions/:submissionId/evaluate` (calificación docente + rúbrica + historial)
  - `GET /api/v1/academic/submissions/:submissionId/history`
  - `GET /api/v1/academic/students/:studentId/competencies-progress`
  - `GET /api/v1/academic/students/:studentId/report-card`
  - `GET /api/v1/academic/calendar/events`, `POST /api/v1/academic/calendar/events`

### Tarea 4: Actualización del Frontend
- Integración en `AdminShell.tsx` para listar programas reales y permitir la creación de nuevos programas y asignaturas.
- Actualización de `CourseDetailView.tsx` para exponer selector de idioma de materiales, objetivos y estado de entrega.
- Actualización de `StudentDashboard.tsx` y `ParentDashboard.tsx` con widget de Competencias distinguiendo actividad completada de dominio demostrado.

### Tarea 5: Suite Automatizada de Pruebas de Integración (`scripts/test-etapa-06.ts`)
- Verificación automatizada de los 7 criterios de aceptación del prompt:
  1. Admin crea programa, grado y asignatura.
  2. Asigna estudiante a programa y materia.
  3. Docente crea unidad, lección y actividad formativa con rúbrica.
  4. Estudiante accede al contenido y realiza la entrega.
  5. Docente califica con rúbrica y deja retroalimentación; se genera historial.
  6. Panel refleja el estado correspondiente sin declarar dominio cuando no se alcanza el puntaje de aprobación (<= 6.99) y declarando dominio cuando supera >= 7.00.
  7. Usuario sin permisos (no autenticado, rol insuficiente o estudiante no vinculado) es rechazado con 401/403.

### Tarea 6: Documentación Formal y Cierre
- Diccionario de entidades actualizado en `docs/arquitectura/modelo_datos_y_diccionario.md`.
- Manual breve de configuración académica en `docs/manuales/manual_configuracion_academica.md`.
- Archivos `00_PLAN.md` a `06_CIERRE.md` en `docs/ejecucion/etapas/ETAPA-06/`.
- Actualización de `docs/ejecucion/bitacora.md` y `docs/ejecucion/README.md`.

---

## 4. Exclusiones Explícitas
- No se implementa indexación vectorial RAG ni orquestación de agentes LLM en esta etapa (corresponde a la Etapa 07).
- No se importan datos reales de Gael ni Avril; se trabaja exclusivamente con datos sintéticos identificados.
- No se implementan pasarelas de pago ni facturación electrónica SRI (etapa posterior).
- No se realizan despliegues ni operaciones de `git push` a repositorios remotos sin autorización expresa.

---

## 5. Dependencias
- Base de datos relacional nativa `node:sqlite` con modo WAL activa (Etapa 05).
- Sistema de autenticación con cookies seguras y tokens criptográficos (Etapa 05).
- Matriz curricular y estándares bilingües aprobados (Etapas 02 y 03).
- Tokens de diseño e interfaz institucional Ekballo Church (Etapa 04).

---

## 6. Riesgos Previos y Mitigaciones
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Inconsistencia en cálculo de dominio de competencias | Alto | Regla de negocio explícita en `academicService.ts`: `evidences_evaluated > 0` y `latest_score >= 7.00` para dominio; entregas sin nota o con puntaje inferior quedan catalogadas como `IN_PROGRESS` o `COMPLETED_NO_MASTERY`. |
| Manipulación de calificaciones por usuarios no autorizados | Crítico | Validación estricta de rol `TEACHER` o `ADMIN` en backend; registro inmutable en `submission_grade_history` y en `audit_events`. |
| Fuga IDOR de entregas y notas de otros estudiantes | Crítico | Reutilización y ampliación del middleware `requireStudentAccess` en todas las rutas de entregas, notas y progreso. |
| Mezcla de cursos profesionales con expedientes escolares | Medio | Aislamiento a nivel de tabla `programs` con campo `program_type` que separa `K12_HOMESCHOOL` de `DISCIPLESHIP` y `CONTINUING_ED`. |

---

## 7. Criterios de Aceptación
1. `CA-01`: Administrador crea programa, grado y asignatura mediante API validada.
2. `CA-02`: Estudiante de prueba es matriculado exitosamente en el programa y en la asignatura.
3. `CA-03`: Docente autorizado crea unidad curricular, lección socrática, objetivos, recursos bilingües y actividad con rúbrica.
4. `CA-04`: Estudiante consulta el contenido y registra entrega de la actividad.
5. `CA-05`: Docente evalúa la entrega con puntaje y retroalimentación cualitativa, generándose registro en `submission_grade_history`.
6. `CA-06`: El sistema distingue con precisión entre actividad completada y dominio demostrado (evaluación con nota reprobatoria no otorga dominio; evaluación con nota aprobatoria >= 7.00 otorga dominio demostrado).
7. `CA-07`: Los controles de seguridad rechazan intentos de acceso no autorizado y consultas IDOR entre alumnos no vinculados.
8. `CA-08`: La suite automatizada de pruebas `npm run test:etapa06` se ejecuta y concluye con el 100% de pruebas aprobadas (código 0).
9. `CA-09`: `npm run lint` y `npm run build` pasan sin errores.

