# Registro de Cambios — ETAPA 11
## Migración Controlada de Expedientes y Materiales (Estudiante A y Estudiante G)

- **Etapa**: ETAPA-11
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-11-migracion-controlada-gael-avril`

---

### 1. Archivos Creados y Modificados

| Ruta del Archivo | Tipo de Acción | Razón Técnica del Cambio |
| :--- | :--- | :--- |
| `server/migration/legacyMigrationEngine.ts` | **CREADO** | Motor central de migración idempotente, inventario, auditoría de recursos, desambiguación de IDs legados, verificación relacional y reversión quirúrgica. |
| `scripts/migrate-students.ts` | **CREADO** | Script CLI para ejecución controlada de la migración en modos `--dry-run`, `--staging`, `--verify`, `--rollback`, `--audit` y salvaguarda contra `--production`. |
| `scripts/test-etapa-11.ts` | **CREADO** | Suite de pruebas automatizadas con 16 verificaciones críticas de aceptación para la Etapa 11. |
| `package.json` | **MODIFICADO** | Incorporación del comando npm `"test:etapa11": "tsx scripts/test-etapa-11.ts"`. |
| `docs/ejecucion/etapas/ETAPA-11/00_PLAN.md` | **CREADO** | Plan técnico, alcance, objetivos, exclusiones y criterios de aceptación. |
| `docs/ejecucion/etapas/ETAPA-11/01_CAMBIOS.md` | **CREADO** | Este documento de registro detallado de modificaciones e inventario. |
| `docs/ejecucion/etapas/ETAPA-11/02_PRUEBAS.md` | **CREADO** | Registro de comandos ejecutados, entorno y resultados reales. |
| `docs/ejecucion/etapas/ETAPA-11/03_VALIDACION.md` | **CREADO** | Matriz formal de cumplimiento de criterios de aceptación con evidencias. |
| `docs/ejecucion/etapas/ETAPA-11/04_RIESGOS_Y_DECISIONES.md`| **CREADO** | Análisis de riesgos residuales, decisiones arquitectónicas y colisiones resueltas. |
| `docs/ejecucion/etapas/ETAPA-11/05_REVERSA.md` | **CREADO** | Plan concreto de reversión paso a paso sin afectar datos ajenos. |
| `docs/ejecucion/etapas/ETAPA-11/06_CIERRE.md` | **CREADO** | Resumen ejecutivo de la etapa y recomendación final de cierre. |
| `docs/ejecucion/etapas/ETAPA-11/informe_brechas_curriculares.md` | **CREADO** | Informe exhaustivo de brechas curriculares frente a la norma MINEDUC y recomendaciones. |
| `docs/ejecucion/etapas/ETAPA-11/evidencias/01_suite_pruebas_etapa_11.txt` | **CREADO** | Evidencia física de ejecución exitosa de la suite de 16 pruebas automatizadas. |
| `docs/ejecucion/etapas/ETAPA-11/evidencias/02_auditoria_recursos_y_brechas.txt` | **CREADO** | Evidencia física de la auditoría de 86 recursos didácticos. |

---

### 2. Tabla de Correspondencia (Mapeo Estructural)

Se formalizó la correspondencia exacta entre las fuentes estáticas previas (`src/data/`) y el modelo relacional normalizado de ALSIZ:

| Entidad Origen (Wisdom School) | Esquema Destino ALSIZ (Ekballo Church) | Campos y Transformación Aplicada | Justificación / Tratamiento |
| :--- | :--- | :--- | :--- |
| `Student` (id: 'avril', 'gael') | `users` | `id` -> `usr-mig-std-{id}`, `username` -> `{id}_ekballo`, `password_hash` (`scryptSync` con sal aleatoria) | Eliminación absoluta de contraseñas en claro. Cero PII en logs. |
| `Student` (pinCode, age, grade, motto, colorTheme) | `students` | `id` -> `stu-mig-{id}`, `pin_code_hash` (`scryptSync`), `student_code` ('ALSIZ-8VO-AVR', 'ALSIZ-4TO-GAE'), `birth_date` (2014-01-01 / 2018-01-01 deducidas por edad de 12 y 8 años sin inventar día/mes no registrado) | Cumplimiento del Art. 22 LOPDP. Honestidad en datos faltantes. |
| `Student.academicPlan` | `student_program_enrollments` | `program_id` = 'prog-homeschool', `level_id` ('lvl-sup-8' / 'lvl-elem-4'), `school_year` = '2026-2027', `status` = 'ACTIVE' | Matrícula formal en el programa de Educación en Casa K-12. |
| `Student.academicPlan.trimesters` | `academic_periods` | 3 periodos (`PER-2026-2027-T1..T3`) con fechas exactas del calendario 2026-2027 | Preservación de la estructura trimestral de 200 días. |
| `Subject` (11 Avril, 9 Gael) | `subjects` | `id` -> `subj-mig-{id}`, `program_id` = 'prog-homeschool', `category` ('TRONCAL_MINEDUC', 'FORMACION_CRISTIANA', 'AMPLIACION_INTERNACIONAL', 'COMPLEMENTARIA') | Mapeo riguroso a la matriz curricular aprobada. |
| Asignación Estudiante-Materia | `student_subject_enrollments` | `student_id`, `subject_id`, `program_enrollment_id`, `status` = 'ACTIVE' | 20 matrículas individuales activas (11 Superior, 9 Elemental). |
| `CurriculumUnit` (33 Avril, 9 Gael) | `curriculum_units` | `id` -> `unit-mig-{id}`, `subject_id`, `unit_number`, `trimester_number`, `title`, `learning_axis` | Preservación del 100% de las 42 unidades temáticas. |
| `DailyClass` (23 Avril, 20 Gael) | `daily_classes` | `id` -> `class-mig-{id}`, `unit_id`, `day_number`, `title`, `socratic_question`, `dynamic_activity`, `content_markdown`, `lab_type` | Preservación del 100% de las 43 lecciones socráticas diarias. |
| `DailyClass.objective` | `lesson_objectives` | `id` -> `obj-mig-{id}`, `daily_class_id`, `unit_id`, `description` | 43 objetivos de aprendizaje vinculados a las lecciones. |
| `DailyClass.resources` | `learning_resources` | `id` -> `res-mig-{id}`, `resource_type` ('PHET_SIMULATION', 'INTERACTIVE_LAB', 'PDF', 'VIDEO'), `url_or_key` | 86 recursos pedagógicos auditados y clasificados. |
| `DailyClass.activities` | `evaluations` | `id` -> `eval-mig-{id}`, `evaluation_type` ('PROJECT_RUBRIC', 'SOCRATIC_DIALOGUE', 'PORTFOLIO_EVIDENCE') | 129 actividades formativas convertidas en instrumentos evaluables. |
| `Student.academicPlan.projects` | `academic_calendar_events` | `id` -> `ev-mig-{id}`, `period_id`, `event_type` = 'EVALUATION_DEADLINE' | Hitos evaluativos de proyectos integradores en calendario. |

---

### 3. Clasificación de Información Legada

1. **Información de Expediente**: Identificadores internos (`avril`, `gael`), año lectivo 2026-2027, grados oficiales (8.° Superior, 4.° Elemental), 200 días laborales, modelos evaluativos y periodos trimestrales.
2. **Material Pedagógico Reutilizable**: Preguntas socráticas disparadoras, lecturas de introducción, simuladores PhET Colorado (Átomo, Ecosistemas), applets GeoGebra (Álgebra, Geometría), proyectos integradores y dinámicas activas.
3. **Preferencias Configurables**: Paletas de color (índigo/violeta para Avril, ámbar/esmeralda para Gael), lemas de vida y avatares visuales.
4. **Información Obsoleta Descartada**: Contraseñas y PINs en claro, 43 enlaces rotos a `https://wisdom-school.edu/guides/`, 25 enlaces simulados de YouTube (Rickroll) y código destructivo de `localStorage.clear()`.

---

### 4. Hallazgo Crítico y Resolución de Colisiones en Origen

Durante la auditoría del código legado se detectó un error humano preexistente en los archivos de datos de Wisdom School: tres lecciones distintas tenían identificadores duplicados idénticos:
- `class-mat-avril-02`: utilizado para la lección del 09/09/2026 y re-utilizado para la lección del 11/09/2026.
- `class-mat-gael-02`: utilizado para la lección del 08/09/2026 y re-utilizado para la lección del 09/09/2026.
- `class-sci-gael-01`: utilizado para la lección del 07/09/2026 y re-utilizado para la lección del 10/09/2026.

**Solución Técnica Aplicada**: El motor `LegacyMigrationEngine` detecta en tiempo real la repetición de identificadores y desambigua quirúrgicamente la segunda lección con el sufijo `-dup2` en su clave primaria, protegiendo también a sus recursos y actividades. Gracias a esta desambiguación, se conservaron íntegramente las **43 lecciones, los 86 recursos y las 129 actividades**, evitando la sobreescritura silenciosa que ocurría en el sistema original.

