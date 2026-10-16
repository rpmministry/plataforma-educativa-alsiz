-- ==============================================================================
-- Migración 008: Orquestación de Agentes IA Educativos, Diálogos y Telemetría
-- Plataforma Educativa ALSIZ para Ekballo Church (ETAPA-08)
-- ==============================================================================

-- 1. Catálogo de Agentes IA Especializados
CREATE TABLE IF NOT EXISTS ai_agents (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    role_type TEXT NOT NULL CHECK(role_type IN ('SOCRATIC_TUTOR', 'DOCTRINAL_MENTOR', 'ESSAY_EVALUATOR', 'LESSON_PLANNER', 'COORDINATOR')),
    subject_id TEXT REFERENCES subjects(id) ON DELETE SET NULL,
    level_id TEXT REFERENCES levels(id) ON DELETE SET NULL,
    default_language TEXT NOT NULL DEFAULT 'es',
    system_prompt TEXT NOT NULL,
    pedagogical_style TEXT NOT NULL,
    safety_restrictions TEXT NOT NULL,
    allowed_source_codes_json TEXT, -- JSON Array con códigos permitidos o NULL para todos los aprobados
    is_active INTEGER NOT NULL DEFAULT 1,
    version_number INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_agents_code ON ai_agents(code);
CREATE INDEX IF NOT EXISTS idx_agents_role ON ai_agents(role_type);
CREATE INDEX IF NOT EXISTS idx_agents_subject ON ai_agents(subject_id);

-- 2. Hilos de Conversación entre Estudiante y Agente
CREATE TABLE IF NOT EXISTS ai_conversations (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    agent_id TEXT NOT NULL REFERENCES ai_agents(id) ON DELETE CASCADE,
    subject_id TEXT REFERENCES subjects(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE', 'ARCHIVED', 'FLAGGED_SAFETY')),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_conv_student ON ai_conversations(student_id);
CREATE INDEX IF NOT EXISTS idx_conv_agent ON ai_conversations(agent_id);
CREATE INDEX IF NOT EXISTS idx_conv_status ON ai_conversations(status);

-- 3. Mensajes de Conversación con Citación RAG y Auditoría
CREATE TABLE IF NOT EXISTS ai_messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
    sender_type TEXT NOT NULL CHECK(sender_type IN ('STUDENT', 'AGENT', 'SYSTEM', 'COORDINATOR_FEEDBACK')),
    content TEXT NOT NULL,
    citation_tags_json TEXT, -- Ej. [" [MINEDUC-FIS-BGU-01#C2]"]
    rag_sources_json TEXT,   -- Metadatos de fragmentos recuperados
    telemetry_json TEXT,     -- Latencia, proveedor, tokens
    safety_flags_json TEXT,  -- Alertas de seguridad o derivación
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_msg_conv ON ai_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_msg_created ON ai_messages(created_at);

-- 4. Registro de Telemetría Operativa (Sin PII de Estudiantes)
CREATE TABLE IF NOT EXISTS ai_telemetry_logs (
    id TEXT PRIMARY KEY,
    agent_code TEXT NOT NULL,
    provider_name TEXT NOT NULL,
    model_name TEXT NOT NULL,
    latency_ms INTEGER NOT NULL,
    tokens_prompt INTEGER NOT NULL DEFAULT 0,
    tokens_completion INTEGER NOT NULL DEFAULT 0,
    status_code INTEGER NOT NULL DEFAULT 200,
    error_message TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_telem_agent ON ai_telemetry_logs(agent_code);
CREATE INDEX IF NOT EXISTS idx_telem_created ON ai_telemetry_logs(created_at);

-- 5. Materiales Generados por IA con Flujo de Supervisión Humana
CREATE TABLE IF NOT EXISTS ai_generated_materials (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content_markdown TEXT NOT NULL,
    agent_id TEXT NOT NULL REFERENCES ai_agents(id),
    subject_id TEXT REFERENCES subjects(id),
    target_level_id TEXT REFERENCES levels(id),
    status TEXT NOT NULL DEFAULT 'DRAFT_REVIEW' CHECK(status IN ('DRAFT_REVIEW', 'APPROVED_PUBLISHED', 'REJECTED')),
    reviewed_by_user_id TEXT REFERENCES users(id),
    review_notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_genmat_status ON ai_generated_materials(status);

