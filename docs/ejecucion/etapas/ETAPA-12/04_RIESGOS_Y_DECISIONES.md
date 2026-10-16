# Riesgos y Decisiones Técnicas — ETAPA 12
## Cursos Profesionales, Artes, Oficios y Educación Continua No Formal

- **Etapa**: ETAPA-12
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-12-cursos-profesionales-artes-oficios`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)

---

### 1. Decisiones Técnicas Principales

1. **Separación de Tablas vs. Flag en Malla Escolar**:
   - *Alternativa descartada*: Reutilizar las tablas escolares `subjects` y `student_subject_enrollments` agregando un flag `is_continuing_education`.
   - *Decisión tomada*: Crear tablas independientes (`continuing_courses`, `course_modules`, `course_lessons`, `course_enrollments`, etc.).
   - *Razón*: La normativa ecuatoriana (LOEI y Acuerdo MINEDUC-2023-00069-A Art. 32) exige clara separación entre el régimen formal de educación general básica/bachillerato y la formación no escolarizada. Compartir tablas aumentaría el riesgo de contaminación de los cómputos trimestrales, portafolios de evidencias y reportes oficiales para el Distrito Educativo.

2. **Criptografía Inmutable para Certificados (SHA-256)**:
   - *Decisión*: El hash de verificación del certificado se calcula a partir de un payload inmutable compuesto por: `certificate_code|user_id|course_id|issued_at|disclaimer_legal`.
   - *Razón*: Cualquier intento de alteración en la base de datos o en una constancia impresa invalidará la verificación en el verificador público universal.

3. **Inclusión Textual Inmutable del Descargo Legal (Art. 32 MINEDUC)**:
   - *Decisión*: El texto legal se almacena directamente en la fila de cada certificado emitido en la columna `disclaimer_legal`, garantizando que futuras modificaciones a textos normativos no alteren la literalidad con la que fue expedido cada documento histórico.

4. **Salvaguarda de Cupo Atómica**:
   - *Decisión*: Antes de crear el registro en `course_enrollments`, se valida que `course.max_capacity === null || enrolled_count < course.max_capacity`.
   - *Razón*: Previene sobreinscripción y asegura equidad en talleres de cupo restringido (ej. talleres prácticos de electricidad o carpintería).

5. **Modelo de Precios con Salvaguarda**:
   - *Decisión*: Se admiten cursos gratuitos (`FREE`) y de pago (`PAID`). Sin embargo, no se implementa cobro automático con pasarelas de pago no auditadas; se valida el monto en USD y se mantiene desacoplado de pasarelas externas hasta que exista aprobación y contratación expresa de un procesador financiero autorizado.

---

### 2. Gestión de Riesgos Residuales

| Riesgo | Probabilidad | Impacto | Mitigación Implementada |
| :--- | :--- | :--- | :--- |
| Confusión entre constancias no formales y títulos de bachillerato | Baja | Alto | Descargo legal normativo obligatorio impreso e incorporado en la verificación SHA-256 conforme al Art. 32 del Acuerdo MINEDUC-2023-00069-A. |
| Contaminación de promedios de estudiantes escolares (Avril y Gael) | Nula | Crítico | Tablas relacionales, endpoints y servicios 100% aislados de la malla curricular K-12. Comprobado en Test 12. |
| Emisión prematura de certificados sin terminar el curso | Nula | Medio | Validación en servicio: exige `progress_percent === 100` y todas las evaluaciones aprobadas con nota mayor o igual a `passing_score`. |
| Duplicación de certificados en reintentos | Nula | Bajo | Patrón idempotente en `issueCertificate()`: devuelve el certificado previo si ya existe para esa inscripción. |

