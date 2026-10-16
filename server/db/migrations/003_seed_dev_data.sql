-- Migración 003: Datos Semilla de Desarrollo (Datos Sintéticos / Prohibido Gael y Avril)
-- Version: 003
-- Description: Carga de usuarios sintéticos para pruebas de RBAC, aislamiento familiar IDOR y navegación

-- 1. Usuarios del Sistema
-- Admin General (Pass: DevAdmin2026!)
INSERT OR IGNORE INTO users (id, email, username, password_hash, role, status, first_name, last_name, avatar_asset_key)
VALUES (
    'usr-admin-01',
    'admin@alsiz.local',
    'admin_alsiz',
    'scrypt$6040516b4a073576c9615a67b7197b9f$9a98743be07f47e4f51e358f6025c0e9c9d973d74e17aa20d75df4d4afefa8962325bb40fb3a174c7cfa8981b604fb090f640d69ea1649798437975c0885d7d5',
    'ADMIN',
    'ACTIVE',
    'Administrador',
    'Tecnológico ALSIZ',
    'admin_shield'
);

-- Coordinación Académica (Pass: DevPass123!)
INSERT OR IGNORE INTO users (id, email, username, password_hash, role, status, first_name, last_name, avatar_asset_key)
VALUES (
    'usr-coord-01',
    'coordinacion@alsiz.local',
    'coord_academica',
    'scrypt$1f7f1a05482f5baedce83d4fa23c5395$48e4238349cddfffdf9a2e4606594db268f585ef6d007e7c2ce28a2906803a12220f259e60d08ff733cd7b9d1f123b740c1dfb4d2f745f56280d92b1a75c1a24',
    'ACADEMIC_COORDINATOR',
    'ACTIVE',
    'Coordinadora',
    'Pedagógica Ekballo',
    'coord_book'
);

-- Docente / Mentor (Pass: DevPass123!)
INSERT OR IGNORE INTO users (id, email, username, password_hash, role, status, first_name, last_name, avatar_asset_key)
VALUES (
    'usr-teacher-01',
    'profesor.mentoria@alsiz.local',
    'prof_mentoria',
    'scrypt$1f7f1a05482f5baedce83d4fa23c5395$48e4238349cddfffdf9a2e4606594db268f585ef6d007e7c2ce28a2906803a12220f259e60d08ff733cd7b9d1f123b740c1dfb4d2f745f56280d92b1a75c1a24',
    'TEACHER',
    'ACTIVE',
    'Profesor',
    'Mentor Socrático',
    'teacher_star'
);

-- Familia 1: Representante Padre Santos (Pass: DevPass123!)
INSERT OR IGNORE INTO users (id, email, username, password_hash, role, status, first_name, last_name, avatar_asset_key)
VALUES (
    'usr-rep-01',
    'familia.santos@alsiz.local',
    'padre_santos',
    'scrypt$1f7f1a05482f5baedce83d4fa23c5395$48e4238349cddfffdf9a2e4606594db268f585ef6d007e7c2ce28a2906803a12220f259e60d08ff733cd7b9d1f123b740c1dfb4d2f745f56280d92b1a75c1a24',
    'REPRESENTATIVE',
    'ACTIVE',
    'Carlos',
    'Santos (Tutor Familia 1)',
    'family_shield'
);

-- Familia 1: Estudiante Sintético 1 (Pass: DevPass123!, PIN: 1234)
INSERT OR IGNORE INTO users (id, email, username, password_hash, role, status, first_name, last_name, avatar_asset_key)
VALUES (
    'usr-stu-01',
    'alumno.santos@alsiz.local',
    'alumno_santos_1',
    'scrypt$1f7f1a05482f5baedce83d4fa23c5395$48e4238349cddfffdf9a2e4606594db268f585ef6d007e7c2ce28a2906803a12220f259e60d08ff733cd7b9d1f123b740c1dfb4d2f745f56280d92b1a75c1a24',
    'STUDENT',
    'ACTIVE',
    'Mateo',
    'Santos (Sintético 8vo)',
    'student_avatar_01'
);

-- Familia 2: Representante Madre Mendoza (Pass: DevPass123!)
INSERT OR IGNORE INTO users (id, email, username, password_hash, role, status, first_name, last_name, avatar_asset_key)
VALUES (
    'usr-rep-02',
    'familia.mendoza@alsiz.local',
    'madre_mendoza',
    'scrypt$1f7f1a05482f5baedce83d4fa23c5395$48e4238349cddfffdf9a2e4606594db268f585ef6d007e7c2ce28a2906803a12220f259e60d08ff733cd7b9d1f123b740c1dfb4d2f745f56280d92b1a75c1a24',
    'REPRESENTATIVE',
    'ACTIVE',
    'Elena',
    'Mendoza (Tutora Familia 2)',
    'family_shield'
);

-- Familia 2: Estudiante Sintético 2 (Pass: DevPass123!, PIN: 5678)
INSERT OR IGNORE INTO users (id, email, username, password_hash, role, status, first_name, last_name, avatar_asset_key)
VALUES (
    'usr-stu-02',
    'alumno.mendoza@alsiz.local',
    'alumno_mendoza_2',
    'scrypt$1f7f1a05482f5baedce83d4fa23c5395$48e4238349cddfffdf9a2e4606594db268f585ef6d007e7c2ce28a2906803a12220f259e60d08ff733cd7b9d1f123b740c1dfb4d2f745f56280d92b1a75c1a24',
    'STUDENT',
    'ACTIVE',
    'Lucía',
    'Mendoza (Sintética 4to)',
    'student_avatar_02'
);

-- 2. Perfiles de Representantes
INSERT OR IGNORE INTO representatives (id, user_id, identification_type, identification_number, phone_number, address_text, consent_lopdp_signed_at, consent_document_hash)
VALUES (
    'rep-01',
    'usr-rep-01',
    'CEDULA',
    '1790000001',
    '+593990000001',
    'Quito Norte, Sector Monteserrín',
    '2026-09-01T08:00:00Z',
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
);

INSERT OR IGNORE INTO representatives (id, user_id, identification_type, identification_number, phone_number, address_text, consent_lopdp_signed_at, consent_document_hash)
VALUES (
    'rep-02',
    'usr-rep-02',
    'CEDULA',
    '1790000002',
    '+593990000002',
    'Cumbayá, Sector La Primavera',
    '2026-09-02T09:30:00Z',
    'd41d8cd98f00b204e9800998ecf8427e00000000000000000000000000000000'
);

-- 3. Perfiles de Estudiantes Sintéticos
INSERT OR IGNORE INTO students (id, user_id, pin_code_hash, student_code, birth_date, motto, color_theme_json)
VALUES (
    'stu-01',
    'usr-stu-01',
    'scrypt$707078e67a296cb86dbbabedb827085c$1053a24bf5014b5c6cf5a72ce87ee34da94384d4a0af1b061795a4466a5aca7bf9c309c57ec590ef41c0692bd7281fd87656f00b10703a444a051dd20666b86c',
    'STU-SYNTH-01',
    '2013-05-14',
    'Creciendo en sabiduría y gracia cada día',
    '{"primary":"#4F46E5","accent":"#06B6D4","gradient":"from-indigo-600 to-cyan-500"}'
);

INSERT OR IGNORE INTO students (id, user_id, pin_code_hash, student_code, birth_date, motto, color_theme_json)
VALUES (
    'stu-02',
    'usr-stu-02',
    'scrypt$ff16ac6e8120f81f9010b5a2ecd809db$2babb39f9ecd691ef56dbdc798c6310552fb14a64384b0e3b975b33d2f3871b6e800428c24e8243ac9c8766148b3cf9b2fbb1b942bf6a3087351051ef0fd66dc',
    'STU-SYNTH-02',
    '2017-09-22',
    'Explorando el mundo con asombro y fe',
    '{"primary":"#D97706","accent":"#F59E0B","gradient":"from-amber-600 to-yellow-400"}'
);

-- 4. Vínculos Familiares Estrictos (Aislamiento Familiar)
-- Familia 1: Carlos Santos es padre de Mateo Santos
INSERT OR IGNORE INTO student_representatives (student_id, representative_id, relationship_type, is_primary_contact)
VALUES ('stu-01', 'rep-01', 'FATHER', 1);

-- Familia 2: Elena Mendoza es madre de Lucía Mendoza
INSERT OR IGNORE INTO student_representatives (student_id, representative_id, relationship_type, is_primary_contact)
VALUES ('stu-02', 'rep-02', 'MOTHER', 1);

-- 5. Programas y Niveles
INSERT OR IGNORE INTO programs (id, code, name, program_type, description, is_active)
VALUES (
    'prog-homeschool',
    'EKB-HOMESCHOOL',
    'Educación en Casa K-12',
    'K12_HOMESCHOOL',
    'Currículo integral de homeschooling con alineación MINEDUC y formación cristiana',
    1
);

INSERT OR IGNORE INTO programs (id, code, name, program_type, description, is_active)
VALUES (
    'prog-discipleship',
    'EKB-DISCIPLESHIP',
    'Discipulado Institucional Ekballo',
    'DISCIPLESHIP',
    'Programa institucional de 7 clases doctrinales para crecimiento espiritual y liderazgo cristiano',
    1
);

INSERT OR IGNORE INTO levels (id, program_id, code, name, order_index, min_recommended_age)
VALUES
    ('lvl-elem-4', 'prog-homeschool', 'EGB-ELEM-4', '4.º Grado EGB Elemental', 4, 8),
    ('lvl-sup-8', 'prog-homeschool', 'EGB-SUP-8', '8.º Grado EGB Superior', 8, 12);

-- 6. Matrículas de Estudiantes Sintéticos
INSERT OR IGNORE INTO student_program_enrollments (id, student_id, program_id, level_id, school_year, status)
VALUES
    ('enr-01', 'stu-01', 'prog-homeschool', 'lvl-sup-8', '2026-2027', 'ACTIVE'),
    ('enr-02', 'stu-02', 'prog-homeschool', 'lvl-elem-4', '2026-2027', 'ACTIVE');

-- 7. Asignaturas de Muestra
INSERT OR IGNORE INTO subjects (id, program_id, level_id, code, name, category, weekly_hours, default_teacher_id)
VALUES
    ('subj-mat-801', 'prog-homeschool', 'lvl-sup-8', 'MAT-801', 'Matemáticas', 'TRONCAL_MINEDUC', 4, 'usr-teacher-01'),
    ('subj-rel-801', 'prog-homeschool', 'lvl-sup-8', 'REL-801', 'Relación con Dios', 'FORMACION_CRISTIANA', 3, 'usr-teacher-01');

-- 8. Unidades Curriculares y Clases Diarias
INSERT OR IGNORE INTO curriculum_units (id, subject_id, unit_number, trimester_number, title, learning_axis)
VALUES (
    'unit-mat-801-u1',
    'subj-mat-801',
    1,
    1,
    'Unidad 1: Conjuntos numéricos y patrones algebraicos',
    'Razonamiento lógico-formal y modelización matemática'
);

INSERT OR IGNORE INTO daily_classes (id, unit_id, day_number, title, socratic_question, dynamic_activity, content_markdown, lab_type)
VALUES (
    'class-mat-day-01',
    'unit-mat-801-u1',
    1,
    'Clase 1: Los números enteros y su presencia en la creación',
    '¿Cómo nos ayudan los números negativos a entender equilibrios y deudas en la vida real?',
    'Construcción de una recta numérica interactiva y resolución de 3 dilemas de altitud y temperatura.',
    '# Los Números Enteros (Z)\n\nLos números enteros extienden los números naturales incluyendo valores negativos y el cero...',
    'scratch'
);

-- 9. Instrumento de Evaluación de Muestra
INSERT OR IGNORE INTO evaluations (id, daily_class_id, unit_id, title, evaluation_type, max_score, is_mineduc_evidence)
VALUES (
    'eval-mat-day-01',
    'class-mat-day-01',
    'unit-mat-801-u1',
    'Taller Socrático: Retos de Números Enteros',
    'PROJECT_RUBRIC',
    10.00,
    1
);

-- 10. Entrega de Estudiante 1 (stu-01) para pruebas de IDOR
INSERT OR IGNORE INTO student_submissions (id, student_id, evaluation_id, submission_text, status, score, qualitative_feedback, evaluated_by_user_id)
VALUES (
    'sub-01',
    'stu-01',
    'eval-mat-day-01',
    'Completé el taller de la recta numérica. Comprendí que el nivel del mar representa el cero.',
    'EVALUATED',
    9.50,
    'Excelente razonamiento geométrico y contextualización del valor cero.',
    'usr-teacher-01'
);

-- 11. Evento de Auditoría Inicial
INSERT OR IGNORE INTO audit_events (id, user_id, event_type, resource_type, resource_id, ip_hash, user_agent, details_json)
VALUES (
    'aud-01',
    'usr-admin-01',
    'SYSTEM_SEED_INITIALIZED',
    'database',
    'schema_v003',
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'ALSIZ_Seed_Runner/1.0',
    '{"message":"Semilla sintética de desarrollo cargada exitosamente"}'
);

