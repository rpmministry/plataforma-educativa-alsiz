-- Migración 004: Núcleo Académico LMS ALSIZ (Ekballo Church)
-- Version: 004
-- Description: Tablas para periodos, calendarios, matrícula en asignaturas, objetivos, recursos bilingües, historial de calificaciones y seguimiento competencial

-- 1. Periodos Académicos (Trimestres / Ciclos)
CREATE TABLE IF NOT EXISTS academic_periods (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    school_year TEXT NOT NULL,
    trimester_number INTEGER CHECK(trimester_number IN (1, 2, 3)),
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    is_current INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Eventos y Fechas del Calendario Académico
CREATE TABLE IF NOT EXISTS academic_calendar_events (
    id TEXT PRIMARY KEY,
    period_id TEXT REFERENCES academic_periods(id) ON DELETE CASCADE,
    program_id TEXT REFERENCES programs(id) ON DELETE CASCADE,
    subject_id TEXT REFERENCES subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL CHECK(event_type IN ('CLASS_DAY', 'EXAM_PERIOD', 'HOLIDAY', 'EVALUATION_DEADLINE', 'PARENT_MEETING', 'INSTITUTIONAL')),
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    is_mandatory INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3. Matrícula Normalizada de Estudiantes en Asignaturas
CREATE TABLE IF NOT EXISTS student_subject_enrollments (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject_id TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    program_enrollment_id TEXT REFERENCES student_program_enrollments(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE', 'COMPLETED', 'WITHDRAWN')),
    enrolled_at TEXT NOT NULL DEFAULT (datetime('now')),
    final_grade REAL,
    UNIQUE(student_id, subject_id)
);

-- 4. Objetivos Específicos de Aprendizaje por Lección/Unidad
CREATE TABLE IF NOT EXISTS lesson_objectives (
    id TEXT PRIMARY KEY,
    daily_class_id TEXT REFERENCES daily_classes(id) ON DELETE CASCADE,
    unit_id TEXT REFERENCES curriculum_units(id) ON DELETE CASCADE,
    competency_id TEXT REFERENCES competencies(id) ON DELETE SET NULL,
    description TEXT NOT NULL,
    order_index INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 5. Recursos Didácticos Multilingües con Detección de Idioma
CREATE TABLE IF NOT EXISTS learning_resources (
    id TEXT PRIMARY KEY,
    daily_class_id TEXT REFERENCES daily_classes(id) ON DELETE CASCADE,
    unit_id TEXT REFERENCES curriculum_units(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    resource_type TEXT NOT NULL CHECK(resource_type IN ('PDF', 'VIDEO', 'LINK', 'WORKSHEET', 'INTERACTIVE_LAB', 'PHET_SIMULATION', 'SCRIPTURE_REFERENCE')),
    url_or_key TEXT NOT NULL,
    language TEXT NOT NULL CHECK(language IN ('es', 'en', 'bilingual')) DEFAULT 'es',
    is_translated INTEGER NOT NULL DEFAULT 1,
    fallback_language TEXT DEFAULT 'es',
    order_index INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 6. Historial Inmutable de Calificaciones y Reevaluación
CREATE TABLE IF NOT EXISTS submission_grade_history (
    id TEXT PRIMARY KEY,
    submission_id TEXT NOT NULL REFERENCES student_submissions(id) ON DELETE CASCADE,
    changed_by_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    previous_score REAL,
    new_score REAL NOT NULL,
    feedback TEXT,
    rubric_scores_json TEXT,
    change_reason TEXT NOT NULL,
    changed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 7. Seguimiento Competencial (Actividad Completada vs. Dominio Demostrado)
CREATE TABLE IF NOT EXISTS student_competency_mastery (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    competency_id TEXT NOT NULL REFERENCES competencies(id) ON DELETE CASCADE,
    activities_completed_count INTEGER NOT NULL DEFAULT 0,
    evidences_evaluated_count INTEGER NOT NULL DEFAULT 0,
    latest_score REAL,
    average_score REAL,
    mastery_status TEXT NOT NULL CHECK(mastery_status IN ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED_NO_MASTERY', 'DEMONSTRATED_MASTERY')) DEFAULT 'NOT_STARTED',
    mastery_demonstrated_at TEXT,
    last_evaluated_at TEXT,
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(student_id, competency_id)
);

-- 8. Extensión de Columnas en Tabla de Evaluaciones
ALTER TABLE evaluations ADD COLUMN due_date TEXT;
ALTER TABLE evaluations ADD COLUMN instructions TEXT;
ALTER TABLE evaluations ADD COLUMN passing_score REAL DEFAULT 7.00;
ALTER TABLE evaluations ADD COLUMN competency_id TEXT REFERENCES competencies(id) ON DELETE SET NULL;

-- 9. Índices de Rendimiento Académico
CREATE INDEX IF NOT EXISTS idx_subj_enroll_student ON student_subject_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_subj_enroll_subject ON student_subject_enrollments(subject_id);
CREATE INDEX IF NOT EXISTS idx_resources_class_lang ON learning_resources(daily_class_id, language);
CREATE INDEX IF NOT EXISTS idx_grade_hist_submission ON submission_grade_history(submission_id);
CREATE INDEX IF NOT EXISTS idx_comp_mastery_student ON student_competency_mastery(student_id, competency_id);
CREATE INDEX IF NOT EXISTS idx_cal_events_period ON academic_calendar_events(period_id, start_date);
CREATE INDEX IF NOT EXISTS idx_evaluations_comp ON evaluations(competency_id);

