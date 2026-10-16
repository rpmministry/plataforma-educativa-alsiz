# ADR-006: Modelo de Datos Extensible: Matrícula Multi-Programa por Estudiante sin Duplicación de Expediente

- **Estado**: Aprobado
- **Fecha**: 2026-10-16
- **Autores**: Antigravity / Liderazgo Técnico ALSIZ
- **Contexto**:
  En Wisdom School, el esquema asumía un estudiante rígidamente anclado a un único grado escolar (ej. Avril solo 8.º EGB, Gael solo 4.º EGB). La visión integral de Ekballo Church demanda que un estudiante pueda cursar simultáneamente su programa escolar K-12 de educación en casa, el curso doctrinal de discipulado de la iglesia y talleres de formación complementaria (STEM / Ciencias Políticas), sin tener que crear cuentas múltiples ni duplicar expedientes.
- **Alternativas Evaluadas**:
  1. *Cuentas separadas por programa*: Obligar a que un alumno tenga un usuario para la escuela y otro para el discipulado eclesial. Confuso para los padres, fragmenta las bitácoras y viola los principios de diseño centrado en el usuario.
  2. *Campos fijos agregados en la tabla de estudiantes*: Añadir columnas booleanas (`is_enrolled_in_discipleship`). Poco extensible ante futuros programas de extensión o campamentos juveniles.
  3. *Modelo de Matrícula N:M Desacoplada (`student_program_enrollments`) (Elegida)*: Separar la identidad del estudiante de sus inscripciones en programas y materias.
- **Decisión**:
  Implementar la entidad asociativa `student_program_enrollments`, donde un `student_id` único se vincula a múltiples tuplas `(program_id, level_id, school_year, status)`. Las calificaciones y asistencias se relacionan a través de `student_subject_enrollments`.
- **Consecuencias**:
  - *Positivas*: El estudiante navega con un solo inicio de sesión entre su aula escolar y su curso de discipulado; el representante tiene una vista consolidada del avance familiar; escalabilidad para nuevos cursos ministeriales sin cambios de esquema.
  - *Negativas*: Las consultas SQL requieren uniones (`JOIN`) entre estudiantes, matrículas y materias (mitigado mediante índices compuestos adecuados).

