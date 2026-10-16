-- Migración 002: Índices de Seguridad, Búsqueda y Aislamiento Familiar
-- Version: 002
-- Description: Creación de índices para optimizar consultas de autenticación, control de acceso RBAC e IDOR

CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

CREATE INDEX IF NOT EXISTS idx_students_user_id ON students(user_id);
CREATE INDEX IF NOT EXISTS idx_students_code ON students(student_code);

CREATE INDEX IF NOT EXISTS idx_representatives_user_id ON representatives(user_id);
CREATE INDEX IF NOT EXISTS idx_rep_id_num ON representatives(identification_number);

-- Índice crítico para validación de pertenencia familiar (Anti-IDOR)
CREATE INDEX IF NOT EXISTS idx_student_rep_lookup ON student_representatives(representative_id, student_id);
CREATE INDEX IF NOT EXISTS idx_student_rep_reverse ON student_representatives(student_id, representative_id);

-- Índices de sesiones de usuario y caducidad
CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- Índices académicos
CREATE INDEX IF NOT EXISTS idx_enrollment_student_prog ON student_program_enrollments(student_id, program_id, school_year);
CREATE INDEX IF NOT EXISTS idx_levels_program_order ON levels(program_id, order_index);
CREATE INDEX IF NOT EXISTS idx_subjects_level ON subjects(level_id);
CREATE INDEX IF NOT EXISTS idx_competencies_subject ON competencies(subject_id);
CREATE INDEX IF NOT EXISTS idx_units_subject_trimester ON curriculum_units(subject_id, trimester_number);
CREATE INDEX IF NOT EXISTS idx_classes_unit_day ON daily_classes(unit_id, day_number);
CREATE INDEX IF NOT EXISTS idx_eval_class ON evaluations(daily_class_id);
CREATE INDEX IF NOT EXISTS idx_eval_unit ON evaluations(unit_id);

-- Índices de tareas y autoría
CREATE INDEX IF NOT EXISTS idx_submissions_student ON student_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_submissions_eval ON student_submissions(evaluation_id);

-- Índices de auditoría y LOPDP
CREATE INDEX IF NOT EXISTS idx_audit_user_time ON audit_events(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_audit_event_type ON audit_events(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_resource ON audit_events(resource_type, resource_id);

CREATE INDEX IF NOT EXISTS idx_pw_reset_hash ON password_resets(reset_token_hash);

