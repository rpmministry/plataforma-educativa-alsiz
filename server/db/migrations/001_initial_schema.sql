-- Migración 001: Esquema Inicial Relacional ALSIZ (Ekballo Church)
-- Version: 001
-- Description: Creación de tablas de identidad, familias, programas, LMS, evaluaciones y auditoría

CREATE TABLE IF NOT EXISTS schema_migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    version TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    checksum_sha256 TEXT NOT NULL,
    applied_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 1. Tabla de Usuarios y Credenciales
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER', 'REPRESENTATIVE', 'STUDENT', 'SERVICE_AGENT')),
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE', 'SUSPENDED', 'PENDING_ACTIVATION')),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    avatar_asset_key TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Perfil Académico del Estudiante (1:1 con users)
CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    pin_code_hash TEXT,
    student_code TEXT NOT NULL UNIQUE,
    birth_date TEXT NOT NULL,
    motto TEXT,
    color_theme_json TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3. Perfil de Representantes Legales (1:1 con users)
CREATE TABLE IF NOT EXISTS representatives (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    identification_type TEXT NOT NULL CHECK(identification_type IN ('CEDULA', 'PASAPORTE')),
    identification_number TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    address_text TEXT,
    consent_lopdp_signed_at TEXT,
    consent_document_hash TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 4. Vínculo Familiar Representante - Estudiante (N:M con Corresponsabilidad)
CREATE TABLE IF NOT EXISTS student_representatives (
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    representative_id TEXT NOT NULL REFERENCES representatives(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL CHECK(relationship_type IN ('FATHER', 'MOTHER', 'LEGAL_GUARDIAN')),
    is_primary_contact INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (student_id, representative_id)
);

-- 5. Sesiones de Servidor Seguras (Token Criptográfico Hashed)
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    student_id TEXT REFERENCES students(id) ON DELETE SET NULL,
    representative_id TEXT REFERENCES representatives(id) ON DELETE SET NULL,
    ip_hash TEXT NOT NULL,
    user_agent TEXT,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 6. Programas Formativos
CREATE TABLE IF NOT EXISTS programs (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    program_type TEXT NOT NULL CHECK(program_type IN ('K12_HOMESCHOOL', 'DISCIPLESHIP', 'CONTINUING_ED', 'SUMMER_CAMP')),
    description TEXT,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 7. Subniveles o Grados del Programa
CREATE TABLE IF NOT EXISTS levels (
    id TEXT PRIMARY KEY,
    program_id TEXT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    min_recommended_age INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 8. Matrículas Multi-Programa de Estudiantes
CREATE TABLE IF NOT EXISTS student_program_enrollments (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    program_id TEXT NOT NULL REFERENCES programs(id) ON DELETE RESTRICT,
    level_id TEXT NOT NULL REFERENCES levels(id) ON DELETE RESTRICT,
    school_year TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE', 'COMPLETED', 'SUSPENDED', 'WITHDRAWN')),
    enrolled_at TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at TEXT
);

-- 9. Asignaturas de la Malla Curricular
CREATE TABLE IF NOT EXISTS subjects (
    id TEXT PRIMARY KEY,
    program_id TEXT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    level_id TEXT NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('TRONCAL_MINEDUC', 'FORMACION_CRISTIANA', 'COMPLEMENTARIA', 'AMPLIACION_INTERNACIONAL')),
    weekly_hours INTEGER NOT NULL DEFAULT 3,
    default_teacher_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 10. Destrezas y Competencias Curriculares (MINEDUC / Internacional)
CREATE TABLE IF NOT EXISTS competencies (
    id TEXT PRIMARY KEY,
    subject_id TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    official_code TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    domain_category TEXT NOT NULL CHECK(domain_category IN ('COMUNICACIONAL', 'MATEMATICA', 'DIGITAL', 'SOCIOEMOCIONAL', 'ESPIRITUAL')),
    source_standard TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 11. Unidades Curriculares Trimestrales
CREATE TABLE IF NOT EXISTS curriculum_units (
    id TEXT PRIMARY KEY,
    subject_id TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    unit_number INTEGER NOT NULL,
    trimester_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    learning_axis TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 12. Clases Diarias Socráticas
CREATE TABLE IF NOT EXISTS daily_classes (
    id TEXT PRIMARY KEY,
    unit_id TEXT NOT NULL REFERENCES curriculum_units(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    socratic_question TEXT NOT NULL,
    dynamic_activity TEXT NOT NULL,
    content_markdown TEXT NOT NULL,
    lab_type TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 13. Evaluaciones y Rúbricas
CREATE TABLE IF NOT EXISTS evaluations (
    id TEXT PRIMARY KEY,
    daily_class_id TEXT REFERENCES daily_classes(id) ON DELETE SET NULL,
    unit_id TEXT REFERENCES curriculum_units(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    evaluation_type TEXT NOT NULL CHECK(evaluation_type IN ('PROJECT_RUBRIC', 'QUIZ_ADAPTIVE', 'SOCRATIC_DIALOGUE', 'PORTFOLIO_EVIDENCE')),
    max_score REAL NOT NULL DEFAULT 10.00,
    rubric_definition_json TEXT,
    is_mineduc_evidence INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 14. Entregas y Evidencias de los Estudiantes
CREATE TABLE IF NOT EXISTS student_submissions (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    evaluation_id TEXT NOT NULL REFERENCES evaluations(id) ON DELETE CASCADE,
    submission_text TEXT,
    attachment_asset_key TEXT,
    status TEXT NOT NULL DEFAULT 'SUBMITTED' CHECK(status IN ('SUBMITTED', 'EVALUATED', 'NEEDS_REVISION')),
    score REAL,
    qualitative_feedback TEXT,
    evaluated_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    ai_pre_evaluation_json TEXT,
    submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
    evaluated_at TEXT
);

-- 15. Libro Mayor de Auditoría Inmutable (LOPDP Art. 21 y 22)
CREATE TABLE IF NOT EXISTS audit_events (
    id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    event_type TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    ip_hash TEXT NOT NULL,
    user_agent TEXT,
    details_json TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 16. Recuperación Segura de Acceso (Password Resets)
CREATE TABLE IF NOT EXISTS password_resets (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reset_token_hash TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    used_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

