# Registro de Cambios — ETAPA 12
## Cursos Profesionales, Artes, Oficios y Educación Continua No Formal

- **Etapa**: ETAPA-12
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-12-cursos-profesionales-artes-oficios`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)

---

### 1. Archivos Creados

1. `server/db/migrations/012_continuing_education_courses.sql`:
   - **Razón**: Definición DDL relacional y versionada para la oferta no escolarizada de ALSIZ / Ekballo Church.
   - **Estructura**:
     - `continuing_courses`: Catálogo con metadatos técnicos (código, categoría, modalidad, nivel, horas, instructor, cupo, precio, objetivos y prerrequisitos en JSON).
     - `course_modules`: Módulos temáticos del curso con orden secuencial.
     - `course_lessons`: Lecciones prácticas y talleres (`VIDEO`, `READING`, `PRACTICE`, `WORKSHOP`, `INTERACTIVE_LAB`) con minutos estimados y recursos externos.
     - `course_enrollments`: Inscripciones con control de estado (`ACTIVE`, `COMPLETED`, `DROPPED`) y porcentaje de avance (`progress_percent`).
     - `course_lesson_progress`: Registro de lecciones completadas por estudiante.
     - `course_evaluations`: Evaluaciones sumativas, proyectos prácticos y cuestionarios de fin de curso.
     - `course_evaluation_submissions`: Entregas de los estudiantes con calificación y retroalimentación docente.
     - `course_certificates`: Constancias de finalización con código único, hash SHA-256 inmutable y descargo legal normativo.
     - Datos semilla iniciales: 4 cursos canónicos (`OFIC-ELEC-101`, `TECH-DEV-201`, `ARTE-ILUS-102`, `MINIS-HOM-301`).

2. `server/continuing-ed/continuingEducationService.ts`:
   - **Razón**: Servicio de dominio que encapsula la lógica de negocio para educación continua.
   - **Métodos principales**:
     - `createCourse()`, `getCourses()`, `getCourseById()`, `updateCourse()`: Catálogo y filtros.
     - `createModule()`, `createLesson()`: Estructuración modular.
     - `enrollUser()`: Inscripción con verificación de estado (`PUBLISHED`) y salvaguarda de cupo máximo (`max_capacity`).
     - `markLessonComplete()`: Marcado de avance y cálculo dinámico de `progress_percent`.
     - `createEvaluation()`, `submitEvaluation()`, `gradeEvaluation()`: Evaluación práctica y calificación docente.
     - `issueCertificate()`: Emisión de certificado criptográfico con hash SHA-256 e inclusión obligatoria del descargo legal del Art. 32 MINEDUC-2023-00069-A.
     - `verifyCertificate()`: Verificación pública universal por código o hash.
     - `getCourseReport()`: Métricas de analítica, tasas de finalización y emisión.

3. `server/routes/continuingEducationRoutes.ts`:
   - **Razón**: Enrutador RESTful modular montado en `/api/v1/continuing-ed` con control de acceso RBAC.
   - **Endpoints**:
     - `GET /courses`: Catálogo público con filtros.
     - `GET /courses/:idOrSlug`: Detalle del curso y módulos.
     - `POST /courses`: Creación de curso (ADMIN/TEACHER).
     - `POST /courses/:id`: Actualización de curso (ADMIN/TEACHER).
     - `POST /courses/:id/modules`: Creación de módulo (ADMIN/TEACHER).
     - `POST /modules/:moduleId/lessons`: Creación de lección (ADMIN/TEACHER).
     - `POST /courses/:id/evaluations`: Creación de evaluación (ADMIN/TEACHER).
     - `POST /courses/:id/enroll`: Inscripción de estudiante (Autenticado).
     - `GET /my-enrollments`: Cursos del estudiante autenticado.
     - `GET /enrollments/:enrollmentId`: Detalle de inscripción.
     - `POST /enrollments/:enrollmentId/lessons/:lessonId/complete`: Registro de lección completada.
     - `POST /evaluations/:evaluationId/submit`: Envío de proyecto para calificación.
     - `POST /submissions/:submissionId/grade`: Calificación docente (ADMIN/TEACHER).
     - `POST /enrollments/:enrollmentId/issue-certificate`: Emisión de certificado.
     - `GET /certificates/verify/:codeOrHash`: Verificación pública universal sin autenticación.
     - `GET /courses/:id/report`: Informe analítico del curso (ADMIN/TEACHER).

4. `src/components/admin/AdminContinuingEdTab.tsx`:
   - **Razón**: Interfaz de usuario para la administración y visualización del catálogo no formal, creación de cursos y verificación pública de certificados con la leyenda legal Art. 32 MINEDUC.

5. `scripts/test-etapa-12.ts`:
   - **Razón**: Suite de pruebas automatizadas con 12 criterios de verificación integral.

---

### 2. Archivos Editados

1. `server.ts`:
   - Importación y montaje de `continuingEducationRouter` en `/api/v1/continuing-ed`.

2. `src/components/admin/AdminShell.tsx`:
   - Incorporación de pestaña `'continuing-ed'` ("Artes & Oficios") en la barra de navegación del Centro Administrativo Unificado.
   - Renderizado del componente `AdminContinuingEdTab`.

3. `package.json`:
   - Adición del script `"test:etapa12": "tsx scripts/test-etapa-12.ts"`.

---

### 3. Dependencias y Migraciones

- **Nuevas Dependencias**: Ninguna (`crypto` nativo de Node.js, `node:sqlite` nativo, `zod` existente y `express` existente).
- **Nueva Migración**: `012_continuing_education_courses.sql` (v012), idempotente y con integridad referencial.
- **Riesgo de Regresión**: Nulo. Aislamiento completo respecto a la malla formal K-12 de EGB.

