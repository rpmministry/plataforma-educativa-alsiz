# Plan de Ejecución — ETAPA 12
## Cursos Profesionales, Artes, Oficios y Educación Continua No Formal

- **Etapa**: ETAPA-12
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-12-cursos-profesionales-artes-oficios`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)

---

### 1. Contexto y Objetivos

La **ETAPA 12** implementa el subsistema de **Formación No Escolar, Artes, Oficios, Habilidades Profesionales y Educación Continua** de la **Plataforma Educativa ALSIZ para Ekballo Church**. 

El propósito fundamental es dotar a la comunidad de una oferta técnica y ministerial práctica (electricidad, carpintería, programación con Python e IA, artes plásticas y diseño, idiomas, emprendimiento y homilética ministerial) bajo el régimen de **educación no escolarizada**, emitiendo certificados de participación y aprovechamiento con firma criptográfica (SHA-256) y el descargo legal expreso prescrito en el **Art. 32 del Acuerdo Ministerial MINEDUC-2023-00069-A**.

#### Objetivos Primarios:
1. **Catálogo Estructurado de Cursos y Talleres**:
   - Campos canónicos: código único, título, slug, categoría (`ARTES`, `OFICIOS`, `TECNOLOGIA`, `IDIOMAS`, `EMPRENDIMIENTO`, `HABILIDADES_PROFESIONALES`, `FORMACION_MINISTERIAL`), modalidad (`ONLINE_ASYNC`, `ONLINE_SYNC`, `PRESENCIAL`, `HYBRID`), nivel (`PRINCIPIANTE`, `INTERMEDIO`, `AVANZADO`, `TODOS_LOS_NIVELES`), idioma (`es`, `en`, `bilingual`), duración estimada en horas lectivas, instructor/facilitador con semblanza, objetivos de aprendizaje (JSON array), prerrequisitos (JSON array), estado del ciclo de vida (`DRAFT`, `PUBLISHED`, `ARCHIVED`), cupo máximo de participantes (`max_capacity`) y modelo de precios (`FREE`, `PAID`).
2. **Estructura Modular Jerárquica**:
   - `Curso -> Módulos Temáticos -> Lecciones Didácticas y Talleres Prácticos -> Recursos y Actividades`.
   - Soporte para lecciones tipo `VIDEO`, `READING`, `PRACTICE`, `WORKSHOP` e `INTERACTIVE_LAB`.
3. **Inscripción, Control de Cupos y Progreso Dinámico**:
   - Registro de inscripciones de usuarios con estatus (`ACTIVE`, `COMPLETED`, `DROPPED`).
   - Salvaguarda estricta de cupo: rechazo automático e informativo si `enrolled_count >= max_capacity`.
   - Seguimiento granular por lección en `course_lesson_progress` con recálculo dinámico en tiempo real del porcentaje de avance del estudiante (`progress_percent`).
4. **Evaluaciones de Curso y Calificación Docente**:
   - Creación de evaluaciones tipo `FINAL_EXAM`, `PRACTICAL_PROJECT` y `QUIZ` con umbral mínimo aprobatorio (ej. 7.00 / 10.00).
   - Entrega de proyectos por parte del estudiante y retroalimentación/calificación por parte del docente.
5. **Certificados Criptográficos con Descargo Legal Obligatorio**:
   - Generación de código único de certificado (ej. `CERT-OFIC-2026-XXXX`).
   - Generación de huella hash SHA-256 inmutable vinculando código, estudiante, curso, fecha y texto normativo.
   - Inclusión inmutable del descargo legal del **Art. 32 del Acuerdo Ministerial MINEDUC-2023-00069-A**: *"Constancia de formación continua y capacitación no formal emitida por la Plataforma Educativa ALSIZ para Ekballo Church... no constituye título oficial de bachillerato, título universitario de educación superior ni habilitación profesional regulada por el Estado ecuatoriano"*.
6. **Verificador Público Universal**:
   - Endpoint público de libre acceso para que terceros, empleadores o familias verifiquen la autenticidad del certificado ingresando su código único o hash SHA-256.
7. **Informes Analíticos de Curso**:
   - Reporte analítico con métricas reales: inscritos totales, participantes activos, participantes finalizados, tasa de finalización (`completionRatePercent`), certificados emitidos y promedio de calificaciones.
8. **Separación Académica Estricta**:
   - Aislamiento arquitectónico total: los cursos no formales no se mezclan con las materias escolares EGB (`subjects`), matrículas formales K-12 (`student_subject_enrollments`) ni afectan promedios o proyectos interdisciplinarios del año lectivo oficial.

---

### 2. Exclusiones y Restricciones Operativas

- **PROHIBIDO mezclar con malla formal K-12**: No utilizar tablas escolares (`subjects`, `programs` tipo K12) para alojar cursos no formales.
- **PROHIBIDO prometer o emitir títulos oficiales**: Toda constancia emitida debe contener el descargo legal expreso del Art. 32 MINEDUC-2023-00069-A.
- **PROHIBIDO transacciones de cobro sin pasarela autorizada**: Los cursos de pago validan precio referencial en USD pero no ejecutan cargos automáticos sin pasarela auditada.
- **PROHIBIDO registrar PII en logs o repositorios públicos**: Cero credenciales, documentos de identidad ni expedientes en claro.
- **PROHIBIDO iniciar la Etapa 13**: Finalizar la etapa en estado de espera para validación humana.

---

### 3. Criterios de Aceptación

- [x] **C1**: Esquema de base de datos relacional versionado (`012_continuing_education_courses.sql`) con 8 tablas (`continuing_courses`, `course_modules`, `course_lessons`, `course_enrollments`, `course_lesson_progress`, `course_evaluations`, `course_evaluation_submissions`, `course_certificates`), claves foráneas e índices.
- [x] **C2**: Catálogo de cursos con 4 cursos semilla canónicos (Oficios, Tecnología, Artes, Formación Ministerial) y filtrado multicriterio.
- [x] **C3**: Gestión administrativa completa: creación, actualización de cursos, módulos, lecciones y control de cupos.
- [x] **C4**: Registro de inscripciones y progreso dinámico por lección recalculando `progress_percent` en tiempo real.
- [x] **C5**: Evaluaciones prácticas y exámenes con calificación docente y validación de nota mínima aprobatoria.
- [x] **C6**: Emisión de certificados no formales con código único, hash SHA-256 inmutable y descargo legal Art. 32 MINEDUC.
- [x] **C7**: Verificación pública universal de certificados sin requerir autenticación.
- [x] **C8**: Informe analítico de desempeño y finalización de cada curso.
- [x] **C9**: Interfaz de usuario en la consola administrativa (`AdminContinuingEdTab.tsx` en `AdminShell.tsx`) con visor de cursos y verificador integrado.
- [x] **C10**: Suite de pruebas automatizadas `scripts/test-etapa-12.ts` con 12/12 pruebas aprobadas y cero regresiones en etapas 05-11.

