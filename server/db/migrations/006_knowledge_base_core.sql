-- ==============================================================================
-- Migración 006: Centro de Conocimiento, Fragmentación, FTS5 y Matrices Temáticas
-- Plataforma Educativa ALSIZ para Ekballo Church (ETAPA-07)
-- ==============================================================================

-- 1. Catálogo de Fuentes de Conocimiento (Knowledge Sources)
CREATE TABLE IF NOT EXISTS knowledge_sources (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    source_type TEXT NOT NULL CHECK(source_type IN ('OFICIAL_MINEDUC', 'DOCTRINAL_EKBALLO', 'EDITORIAL_EXTERNA', 'RECURSO_ABIERTO')),
    format_type TEXT NOT NULL CHECK(format_type IN ('DOCUMENT_MD', 'DOCUMENT_TXT', 'DOCUMENT_PDF', 'DOCUMENT_DOCX', 'URL_REFERENCE', 'MEDIA_REFERENCE')),
    uri_or_url TEXT NOT NULL,
    content_text TEXT,
    checksum_sha256 TEXT NOT NULL,
    subject_id TEXT REFERENCES subjects(id) ON DELETE SET NULL,
    level_id TEXT REFERENCES levels(id) ON DELETE SET NULL,
    competency_id TEXT REFERENCES competencies(id) ON DELETE SET NULL,
    language TEXT NOT NULL DEFAULT 'es',
    target_agent_family TEXT NOT NULL DEFAULT 'GENERAL_KNOWLEDGE' CHECK(target_agent_family IN ('SOCRATIC_TUTOR', 'ESSAY_EVALUATOR', 'LESSON_PLANNER', 'GENERAL_KNOWLEDGE')),
    status TEXT NOT NULL DEFAULT 'PENDIENTE' CHECK(status IN ('PENDIENTE', 'EN_REVISION', 'APROBADO', 'RECHAZADO', 'DESACTIVADO', 'ERROR')),
    version_number INTEGER NOT NULL DEFAULT 1,
    parent_source_id TEXT REFERENCES knowledge_sources(id) ON DELETE SET NULL,
    trust_level TEXT NOT NULL DEFAULT 'VERIFICADO_MEDIO' CHECK(trust_level IN ('CANONICAL_ALTO', 'VERIFICADO_MEDIO', 'SUPLEMENTARIO_BAJO')),
    license_type TEXT NOT NULL DEFAULT 'USO_EDUCATIVO_AUTORIZADO' CHECK(license_type IN ('CREATIVE_COMMONS', 'PROPIETARIO_EKBALLO', 'DOMINIO_PUBLICO_MINEDUC', 'USO_EDUCATIVO_AUTORIZADO')),
    author_or_publisher TEXT,
    incorporation_date TEXT NOT NULL DEFAULT (date('now')),
    verification_date TEXT,
    reviewed_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Índices de consulta rápida y búsqueda facetada
CREATE INDEX IF NOT EXISTS idx_ks_status ON knowledge_sources(status);
CREATE INDEX IF NOT EXISTS idx_ks_source_type ON knowledge_sources(source_type);
CREATE INDEX IF NOT EXISTS idx_ks_subject ON knowledge_sources(subject_id);
CREATE INDEX IF NOT EXISTS idx_ks_target_agent ON knowledge_sources(target_agent_family);
CREATE INDEX IF NOT EXISTS idx_ks_checksum ON knowledge_sources(checksum_sha256);
CREATE INDEX IF NOT EXISTS idx_ks_parent ON knowledge_sources(parent_source_id);

-- 2. Fragmentos de Conocimiento (Knowledge Chunks)
CREATE TABLE IF NOT EXISTS knowledge_chunks (
    id TEXT PRIMARY KEY,
    source_id TEXT NOT NULL REFERENCES knowledge_sources(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    citation_tag TEXT NOT NULL,
    section_title TEXT,
    content_text TEXT NOT NULL,
    token_count INTEGER NOT NULL DEFAULT 0,
    metadata_json TEXT,
    embedding_json TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_kc_source ON knowledge_chunks(source_id);
CREATE INDEX IF NOT EXISTS idx_kc_citation ON knowledge_chunks(citation_tag);

-- 3. Tabla Virtual FTS5 para Búsqueda Semántica Textual de Alto Desempeño (BM25)
CREATE VIRTUAL TABLE IF NOT EXISTS knowledge_chunks_fts USING fts5(
    chunk_id UNINDEXED,
    source_id UNINDEXED,
    citation_tag UNINDEXED,
    content_text,
    section_title,
    tokenize = 'unicode61'
);

-- Triggers de Sincronización Automática entre Chunks y FTS5
CREATE TRIGGER IF NOT EXISTS trg_kc_ai AFTER INSERT ON knowledge_chunks
BEGIN
    INSERT INTO knowledge_chunks_fts(chunk_id, source_id, citation_tag, content_text, section_title)
    VALUES (new.id, new.source_id, new.citation_tag, new.content_text, coalesce(new.section_title, ''));
END;

CREATE TRIGGER IF NOT EXISTS trg_kc_ad AFTER DELETE ON knowledge_chunks
BEGIN
    DELETE FROM knowledge_chunks_fts WHERE chunk_id = old.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_kc_au AFTER UPDATE ON knowledge_chunks
BEGIN
    DELETE FROM knowledge_chunks_fts WHERE chunk_id = old.id;
    INSERT INTO knowledge_chunks_fts(chunk_id, source_id, citation_tag, content_text, section_title)
    VALUES (new.id, new.source_id, new.citation_tag, new.content_text, coalesce(new.section_title, ''));
END;

-- 4. Historial y Auditoría Editorial de Fuentes
CREATE TABLE IF NOT EXISTS knowledge_source_history (
    id TEXT PRIMARY KEY,
    source_id TEXT NOT NULL REFERENCES knowledge_sources(id) ON DELETE CASCADE,
    action TEXT NOT NULL CHECK(action IN ('CREATED', 'UPDATED', 'SUBMITTED_FOR_REVIEW', 'APPROVED', 'REJECTED', 'DEACTIVATED', 'RETIRED', 'VERSIONED')),
    performed_by_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    justification TEXT,
    details_json TEXT,
    performed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_ksh_source ON knowledge_source_history(source_id);
CREATE INDEX IF NOT EXISTS idx_ksh_user ON knowledge_source_history(performed_by_user_id);

-- 5. Registro de Conflictos y Discrepancias Doctrinales o Curriculares
CREATE TABLE IF NOT EXISTS knowledge_source_conflicts (
    id TEXT PRIMARY KEY,
    source_id_a TEXT NOT NULL REFERENCES knowledge_sources(id) ON DELETE CASCADE,
    source_id_b TEXT NOT NULL REFERENCES knowledge_sources(id) ON DELETE CASCADE,
    conflict_type TEXT NOT NULL CHECK(conflict_type IN ('DOCTRINAL_DISCREPANCY', 'CURRICULAR_MISMATCH', 'FACTUAL_CONTRADICTION', 'COPYRIGHT_CLAIM')),
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'REPORTED' CHECK(status IN ('REPORTED', 'UNDER_REVIEW', 'RESOLVED', 'DISMISSED')),
    reported_by_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    resolution_notes TEXT,
    resolved_by_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    resolved_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_ksc_status ON knowledge_source_conflicts(status);

