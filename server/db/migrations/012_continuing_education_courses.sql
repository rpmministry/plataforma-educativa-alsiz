-- Migración 012: Formación No Escolar, Cursos Profesionales, Artes y Oficios
-- Version: 012
-- Description: Creación de tablas de cursos de educación continua, módulos, lecciones, inscripciones, progreso, evaluaciones y certificados no formales

-- 1. Catálogo de Cursos y Talleres de Formación Continua (Separación Estricta de Malla Escolar K-12)
CREATE TABLE IF NOT EXISTS continuing_courses (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL CHECK(category IN ('ARTES', 'OFICIOS', 'TECNOLOGIA', 'IDIOMAS', 'EMPRENDIMIENTO', 'HABILIDADES_PROFESIONALES', 'FORMACION_MINISTERIAL')),
    modality TEXT NOT NULL CHECK(modality IN ('ONLINE_ASYNC', 'ONLINE_SYNC', 'PRESENCIAL', 'HYBRID')),
    level TEXT NOT NULL CHECK(level IN ('PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO', 'TODOS_LOS_NIVELES')),
    language TEXT NOT NULL DEFAULT 'es' CHECK(language IN ('es', 'en', 'bilingual')),
    estimated_duration_hours INTEGER NOT NULL DEFAULT 20,
    instructor_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    instructor_name TEXT NOT NULL,
    instructor_bio TEXT,
    short_description TEXT NOT NULL,
    full_description TEXT,
    learning_objectives_json TEXT, -- JSON array de strings
    prerequisites_json TEXT,       -- JSON array de strings
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK(status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
    max_capacity INTEGER,          -- NULL = Ilimitado, >0 = Cupo máximo
    pricing_type TEXT NOT NULL DEFAULT 'FREE' CHECK(pricing_type IN ('FREE', 'PAID')),
    price_usd REAL NOT NULL DEFAULT 0.00,
    enrolled_count INTEGER NOT NULL DEFAULT 0,
    thumbnail_url TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Módulos Temáticos del Curso
CREATE TABLE IF NOT EXISTS course_modules (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES continuing_courses(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 3. Lecciones Didácticas de Cada Módulo
CREATE TABLE IF NOT EXISTS course_lessons (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL REFERENCES course_modules(id) ON DELETE CASCADE,
    order_index INTEGER NOT NULL,
    title TEXT NOT NULL,
    lesson_type TEXT NOT NULL CHECK(lesson_type IN ('VIDEO', 'READING', 'PRACTICE', 'WORKSHOP', 'INTERACTIVE_LAB')),
    content_markdown TEXT NOT NULL,
    video_url TEXT,
    external_resources_json TEXT, -- JSON array de { title, url, type }
    estimated_minutes INTEGER NOT NULL DEFAULT 30,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 4. Inscripción de Usuarios a Cursos de Educación Continua
CREATE TABLE IF NOT EXISTS course_enrollments (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES continuing_courses(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE', 'COMPLETED', 'DROPPED')),
    enrolled_at TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at TEXT,
    progress_percent REAL NOT NULL DEFAULT 0.00,
    last_accessed_at TEXT,
    UNIQUE(course_id, user_id)
);

-- 5. Progreso Individual de Lecciones
CREATE TABLE IF NOT EXISTS course_lesson_progress (
    id TEXT PRIMARY KEY,
    enrollment_id TEXT NOT NULL REFERENCES course_enrollments(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL REFERENCES course_lessons(id) ON DELETE CASCADE,
    is_completed INTEGER NOT NULL DEFAULT 1,
    completed_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(enrollment_id, lesson_id)
);

-- 6. Instrumentos Evaluativos de Cursos (Examen, Proyecto o Quiz Final)
CREATE TABLE IF NOT EXISTS course_evaluations (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES continuing_courses(id) ON DELETE CASCADE,
    module_id TEXT REFERENCES course_modules(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    evaluation_type TEXT NOT NULL CHECK(evaluation_type IN ('FINAL_EXAM', 'PRACTICAL_PROJECT', 'QUIZ')),
    passing_score REAL NOT NULL DEFAULT 7.00,
    max_score REAL NOT NULL DEFAULT 10.00,
    questions_json TEXT, -- JSON array de preguntas o rúbrica
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 7. Entregas y Calificaciones de Evaluaciones de Curso
CREATE TABLE IF NOT EXISTS course_evaluation_submissions (
    id TEXT PRIMARY KEY,
    evaluation_id TEXT NOT NULL REFERENCES course_evaluations(id) ON DELETE CASCADE,
    enrollment_id TEXT NOT NULL REFERENCES course_enrollments(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    submission_content TEXT NOT NULL,
    score REAL,
    feedback TEXT,
    status TEXT NOT NULL DEFAULT 'SUBMITTED' CHECK(status IN ('SUBMITTED', 'GRADED', 'REVISION_REQUESTED')),
    graded_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
    graded_at TEXT
);

-- 8. Certificados y Constancias de Participación / Aprobación No Formal
CREATE TABLE IF NOT EXISTS course_certificates (
    id TEXT PRIMARY KEY,
    certificate_code TEXT NOT NULL UNIQUE,
    enrollment_id TEXT NOT NULL UNIQUE REFERENCES course_enrollments(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES continuing_courses(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_full_name TEXT NOT NULL,
    course_title TEXT NOT NULL,
    category TEXT NOT NULL,
    hours_completed INTEGER NOT NULL,
    final_score REAL,
    issued_at TEXT NOT NULL DEFAULT (datetime('now')),
    verification_hash_sha256 TEXT NOT NULL UNIQUE,
    disclaimer_legal TEXT NOT NULL
);

-- 9. Índices de Rendimiento y Búsqueda
CREATE INDEX IF NOT EXISTS idx_continuing_courses_cat ON continuing_courses(category, status);
CREATE INDEX IF NOT EXISTS idx_continuing_courses_slug ON continuing_courses(slug);
CREATE INDEX IF NOT EXISTS idx_course_modules_course ON course_modules(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_course_lessons_module ON course_lessons(module_id, order_index);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_user ON course_enrollments(user_id, status);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course ON course_enrollments(course_id, status);
CREATE INDEX IF NOT EXISTS idx_course_certs_hash ON course_certificates(verification_hash_sha256);
CREATE INDEX IF NOT EXISTS idx_course_certs_code ON course_certificates(certificate_code);

-- 10. Datos Semilla Canónicos de Formación No Escolar
INSERT OR IGNORE INTO continuing_courses (
    id, code, title, slug, category, modality, level, language, 
    estimated_duration_hours, instructor_name, instructor_bio, 
    short_description, full_description, learning_objectives_json, 
    prerequisites_json, status, max_capacity, pricing_type, price_usd
) VALUES 
(
    'course-ofic-elec-01',
    'OFIC-ELEC-101',
    'Taller de Electricidad Práctica y Seguridad en el Hogar',
    'electricidad-practica-seguridad-hogar',
    'OFICIOS',
    'HYBRID',
    'PRINCIPIANTE',
    'es',
    30,
    'Ing. Roberto Calderón',
    'Técnico especialista en instalaciones eléctricas residenciales con 15 años de experiencia.',
    'Aprende a diagnosticar, instalar y reparar circuitos residenciales de forma segura con normas NEC.',
    '# Taller Práctico de Electricidad Residencial\n\nEste curso capacita a los participantes en principios fundamentales de corriente alterna, uso de multímetro, cuadros de distribución y protocolos de seguridad.',
    '["Comprender leyes de Ohm y Watt aplicadas al hogar", "Instalar interruptores, tomacorrientes e iluminación LED", "Dimensionar térmicos y disyuntores de seguridad"]',
    '["Mayor de 15 años", "Herramientas manuales básicas de aislamiento"]',
    'PUBLISHED',
    25,
    'FREE',
    0.00
),
(
    'course-tech-python-01',
    'TECH-DEV-201',
    'Fundamentos de Programación con Python e Inteligencia Artificial',
    'programacion-python-ia-fundamentos',
    'TECNOLOGIA',
    'ONLINE_ASYNC',
    'PRINCIPIANTE',
    'es',
    40,
    'Ing. Alan Turing',
    'Ingeniero de software e investigador en inteligencia artificial aplicada.',
    'Domina la sintaxis moderna de Python 3 y construye tus primeras herramientas automatizadas con IA.',
    '# Python Moderno e IA\n\nAprende a programar desde cero sin frustraciones, dominando estructuras de datos, funciones, consumo de APIs y prompting estructurado.',
    '["Dominar variables, bucles y funciones en Python 3", "Consumir APIs RESTful y manipular datos JSON", "Integrar modelos de IA generativa para resolver tareas"]',
    '["Computadora con acceso a internet", "Ganas de resolver problemas lógicos"]',
    'PUBLISHED',
    NULL,
    'FREE',
    0.00
),
(
    'course-art-ilustra-01',
    'ARTE-ILUS-102',
    'Taller de Técnicas de Composición Visual y Dibujo',
    'composicion-visual-dibujo-artistico',
    'ARTES',
    'HYBRID',
    'TODOS_LOS_NIVELES',
    'es',
    25,
    'Mtra. Clara Monet',
    'Licenciada en Artes Visuales y tallerista de expresión plástica.',
    'Explora teoría del color, perspectiva y técnicas mixtas de dibujo y pintura.',
    '# Taller de Artes Visuales\n\nDesarrolla tu lenguaje plástico personal a través de ejercicios de observación, anatomía básica y armonía cromática.',
    '["Aplicar reglas de composición y proporción áurea", "Dominar contrastes de color y luminosidad", "Crear una obra final para exposición comunitaria"]',
    '["Bitácora de dibujo", "Lápices graduados o acuarelas básicas"]',
    'PUBLISHED',
    20,
    'FREE',
    0.00
),
(
    'course-minis-homil-01',
    'MINIS-HOM-301',
    'Homilética Práctica y Comunicación del Evangelio',
    'homiletica-practica-comunicacion-evangelio',
    'FORMACION_MINISTERIAL',
    'ONLINE_SYNC',
    'INTERMEDIO',
    'es',
    35,
    'Pastor David',
    'Teólogo y pastor docente en Ekballo Church.',
    'Herramientas hermenéuticas y expositivas para comunicar la Palabra de Dios con fidelidad y unción.',
    '# Homilética y Discipulado\n\nCapacitación ministerial para predicadores, maestros y líderes de células en preparación de sermones expositivos e impacto transformador.',
    '["Realizar exégesis bíblica rigurosa de pasajes bíblicos", "Estructurar bosquejos de sermones claros y cristocéntricos", "Aplicar principios de oratoria y conexión pastoral"]',
    '["Llamado al servicio ministerial", "Lectura bíblica regular"]',
    'PUBLISHED',
    50,
    'FREE',
    0.00
);

