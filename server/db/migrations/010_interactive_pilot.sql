-- ==============================================================================
-- Migración 010: Configuración, Sesiones Aisladas y Telemetría del Piloto Interactivo
-- Plataforma Educativa ALSIZ para Ekballo Church
-- ==============================================================================

-- 1. Tabla de Configuración Global del Piloto (Kill-Switch y parámetros operativos)
CREATE TABLE IF NOT EXISTS interactive_pilot_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- 2. Tabla de Sesiones del Piloto Interactivo (Completamente Desacopladas y Anti-PII)
CREATE TABLE IF NOT EXISTS interactive_pilot_sessions (
  id TEXT PRIMARY KEY,
  ephemeral_token TEXT NOT NULL UNIQUE,
  student_synthetic_alias TEXT NOT NULL,
  subject_code TEXT NOT NULL,
  lesson_theme TEXT NOT NULL,
  started_at TEXT NOT NULL DEFAULT (datetime('now')),
  ended_at TEXT,
  status TEXT NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'COMPLETED', 'ABORTED_BY_USER', 'TERMINATED_ERROR'
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_pilot_sess_token ON interactive_pilot_sessions(ephemeral_token);
CREATE INDEX IF NOT EXISTS idx_pilot_sess_status ON interactive_pilot_sessions(status);

-- 3. Tabla de Telemetría Operacional del Piloto Interactivo
CREATE TABLE IF NOT EXISTS interactive_pilot_telemetry (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES interactive_pilot_sessions(id) ON DELETE CASCADE,
  turns_count INTEGER NOT NULL DEFAULT 0,
  latency_ms INTEGER NOT NULL DEFAULT 0,
  tokens_estimated INTEGER NOT NULL DEFAULT 0,
  simulation_interactions INTEGER NOT NULL DEFAULT 0,
  exit_reason TEXT NOT NULL DEFAULT 'USER_EXIT', -- 'USER_EXIT', 'SESSION_TIMEOUT', 'LESSON_COMPLETED', 'SYSTEM_KILL_SWITCH'
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_pilot_telem_sess ON interactive_pilot_telemetry(session_id);

-- 4. Semilla de Configuración Inicial del Piloto Interactivo
INSERT OR IGNORE INTO interactive_pilot_config (key, value, description) VALUES
  ('pilot_enabled', 'true', 'Bandera de activación del piloto interactivo (Kill-Switch)'),
  ('max_turns_per_session', '6', 'Límite estricto de turnos conversacionales por sesión para control de costos'),
  ('session_ttl_minutes', '15', 'Tiempo de expiración de tokens efímeros sintéticos'),
  ('allowed_subject_codes', '["subj-mat-801", "subj-fis-bgu-01", "CN.F.5.1"]', 'Asignaturas autorizadas para el piloto'),
  ('sandbox_security_mode', 'STRICT_ISOLATED', 'Modo de seguridad del iframe: allow-scripts allow-forms (sin allow-same-origin)');

