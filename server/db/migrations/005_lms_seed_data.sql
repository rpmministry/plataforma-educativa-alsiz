-- Migración 005: Datos Semilla del Núcleo Académico LMS
-- Version: 005
-- Description: Carga de periodos académicos, calendario, matrícula de asignaturas, competencias, objetivos y recursos bilingües

-- 1. Periodos Académicos Año Lectivo 2026-2027
INSERT OR IGNORE INTO academic_periods (id, code, name, school_year, trimester_number, start_date, end_date, is_current)
VALUES 
    ('per-2026-t1', 'PER-2026-T1', 'Primer Trimestre 2026-2027', '2026-2027', 1, '2026-09-01', '2026-11-27', 1),
    ('per-2026-t2', 'PER-2026-T2', 'Segundo Trimestre 2026-2027', '2026-2027', 2, '2026-12-01', '2027-03-05', 0),
    ('per-2027-t3', 'PER-2027-T3', 'Tercer Trimestre 2026-2027', '2026-2027', 3, '2027-03-15', '2027-06-18', 0);

-- 2. Eventos Clave del Calendario Académico
INSERT OR IGNORE INTO academic_calendar_events (id, period_id, program_id, subject_id, title, description, event_type, start_date, end_date, is_mandatory)
VALUES
    ('cal-evt-01', 'per-2026-t1', 'prog-homeschool', NULL, 'Inauguración del Ciclo Lectivo Homeschool', 'Reunión general de orientación pedagógica con familias y mentores', 'INSTITUTIONAL', '2026-09-01T09:00:00Z', '2026-09-01T12:00:00Z', 1),
    ('cal-evt-02', 'per-2026-t1', 'prog-homeschool', 'subj-mat-801', 'Entrega Taller Números Enteros Z', 'Hito de entrega del taller socrático y portafolio de recta numérica', 'EVALUATION_DEADLINE', '2026-09-20T23:59:00Z', '2026-09-20T23:59:00Z', 1),
    ('cal-evt-03', 'per-2026-t1', 'prog-homeschool', NULL, 'Cierre de Portafolio Trimestre 1', 'Revisión y consolidación de bitácoras de aprendizaje (MINEDUC)', 'EXAM_PERIOD', '2026-11-20T08:00:00Z', '2026-11-27T18:00:00Z', 1);

-- 3. Matrícula de Asignaturas para Estudiante Sintético 1 (stu-01)
INSERT OR IGNORE INTO student_subject_enrollments (id, student_id, subject_id, program_enrollment_id, status, enrolled_at, final_grade)
VALUES
    ('sub-enr-01', 'stu-01', 'subj-mat-801', 'enr-01', 'ACTIVE', '2026-09-01T08:00:00Z', 9.50),
    ('sub-enr-02', 'stu-01', 'subj-rel-801', 'enr-01', 'ACTIVE', '2026-09-01T08:00:00Z', NULL),
    ('sub-enr-03', 'stu-02', 'subj-mat-801', 'enr-02', 'ACTIVE', '2026-09-01T08:00:00Z', NULL);

-- 4. Competencias Curriculares (MINEDUC y Formación Integral)
INSERT OR IGNORE INTO competencies (id, subject_id, official_code, title, description, domain_category, source_standard)
VALUES
    ('comp-mat-801-01', 'subj-mat-801', 'M.4.1.1', 'Operaciones con Enteros', 'Reconocer el conjunto de los números enteros Z y operar con suma y multiplicación aplicando la ley de signos.', 'MATEMATICA', 'MINEDUC_2023'),
    ('comp-mat-801-02', 'subj-mat-801', 'M.4.1.2', 'Resolución de Problemas con Z', 'Plantear y resolver problemas contextualizados aplicando operaciones combinadas con números enteros.', 'MATEMATICA', 'MINEDUC_2023'),
    ('comp-rel-801-01', 'subj-rel-801', 'EKB.REL.8.1', 'Cosmovisión Bíblica y Carácter', 'Reconocer el diseño divino y los atributos de Dios en la naturaleza y en las decisiones éticas de la vida diaria.', 'ESPIRITUAL', 'EKBALLO_DOCTRINAL');

-- 5. Objetivos de Aprendizaje para la Clase 1 de Matemáticas
INSERT OR IGNORE INTO lesson_objectives (id, daily_class_id, unit_id, competency_id, description, order_index)
VALUES
    ('obj-mat-01', 'class-mat-day-01', 'unit-mat-801-u1', 'comp-mat-801-01', 'Comprender el concepto de número negativo a través de situaciones de altitud y economía cotidiana.', 1),
    ('obj-mat-02', 'class-mat-day-01', 'unit-mat-801-u1', 'comp-mat-801-02', 'Ubicar con precisión cantidades enteras positivas y negativas en una recta numérica.', 2);

-- 6. Recursos Didácticos Multilingües
INSERT OR IGNORE INTO learning_resources (id, daily_class_id, unit_id, title, description, resource_type, url_or_key, language, is_translated, fallback_language, order_index)
VALUES
    ('res-mat-01-es', 'class-mat-day-01', 'unit-mat-801-u1', 'Guía Socrática de Números Enteros (Español)', 'Documento estructurado con 5 retos cotidianos para debatir en familia.', 'PDF', '/resources/mat801/guia_enteros_es.pdf', 'es', 1, 'es', 1),
    ('res-mat-01-en', 'class-mat-day-01', 'unit-mat-801-u1', 'Integers Exploration Guide (English)', 'Bilingual vocabulary and conceptual exercises on positive and negative integers.', 'PDF', '/resources/mat801/guide_integers_en.pdf', 'en', 1, 'es', 2),
    ('res-mat-02-bi', 'class-mat-day-01', 'unit-mat-801-u1', 'Simulador PhET: Recta Numérica y Operaciones', 'Laboratorio visual interactivo para manipular números enteros en inglés y español.', 'PHET_SIMULATION', 'https://phet.colorado.edu/sims/html/number-line-integers/latest/number-line-integers_all.html', 'bilingual', 1, 'es', 3);

-- 7. Actualización de la Evaluación Existente vinculándola a Competencia
UPDATE evaluations 
SET due_date = '2026-09-20T23:59:00Z', 
    instructions = 'Resuelve los 3 dilemas de altitud y dibuja la recta numérica justificando tus respuestas con el método socrático.',
    passing_score = 7.00,
    competency_id = 'comp-mat-801-01'
WHERE id = 'eval-mat-day-01';

-- 8. Historial de Calificación Inicial de sub-01
INSERT OR IGNORE INTO submission_grade_history (id, submission_id, changed_by_user_id, previous_score, new_score, feedback, rubric_scores_json, change_reason)
VALUES
    ('grd-hist-01', 'sub-01', 'usr-teacher-01', NULL, 9.50, 'Excelente razonamiento geométrico y contextualización del valor cero.', '{"criterio1_razonamiento":4.8,"criterio2_precision":4.7}', 'Calificación inicial de taller presencial/virtual');

-- 9. Seguimiento de Dominio Competencial Inicial
INSERT OR IGNORE INTO student_competency_mastery (id, student_id, competency_id, activities_completed_count, evidences_evaluated_count, latest_score, average_score, mastery_status, mastery_demonstrated_at, last_evaluated_at)
VALUES
    ('mst-01', 'stu-01', 'comp-mat-801-01', 1, 1, 9.50, 9.50, 'DEMONSTRATED_MASTERY', '2026-09-21T10:00:00Z', '2026-09-21T10:00:00Z'),
    ('mst-02', 'stu-01', 'comp-mat-801-02', 0, 0, NULL, NULL, 'NOT_STARTED', NULL, NULL);

