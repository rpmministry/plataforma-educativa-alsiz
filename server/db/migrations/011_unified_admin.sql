-- ==============================================================================
-- Migración 011: Configuración Institucional y Administración Unificada
-- Plataforma Educativa ALSIZ para Ekballo Church (Etapa 10)
-- ==============================================================================

-- 1. Tabla de configuración institucional y parámetros globales
CREATE TABLE IF NOT EXISTS institution_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'GENERAL', -- GENERAL, SECURITY, ACADEMIC, AI_PILOT
  is_editable BOOLEAN NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_by_user_id TEXT,
  FOREIGN KEY (updated_by_user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 2. Valores semilla institucionales por defecto
INSERT OR IGNORE INTO institution_settings (key, value, description, category, is_editable) VALUES
  ('institution_name', 'Ekballo Church — Plataforma Educativa ALSIZ', 'Nombre oficial de la institución educativa', 'GENERAL', 1),
  ('institution_code', 'ALSIZ-EKB-2026', 'Código de registro institucional MINEDUC / Ekballo', 'GENERAL', 0),
  ('current_school_year', '2026-2027', 'Año lectivo activo para matrículas y periodos', 'ACADEMIC', 1),
  ('support_email', 'contacto@ekballochurch.org', 'Correo electrónico para soporte y atención a familias', 'GENERAL', 1),
  ('audit_retention_days', '365', 'Plazo mínimo de retención de registros de auditoría (LOPDP Art. 21)', 'SECURITY', 1),
  ('maintenance_mode', 'false', 'Interruptor de modo mantenimiento para la plataforma', 'SECURITY', 1),
  ('require_parent_consent', 'true', 'Exigencia de consentimiento informado de tutores para menores', 'SECURITY', 1),
  ('max_daily_ai_turns_student', '30', 'Límite de turnos diarios de interacción socrática por estudiante', 'AI_PILOT', 1);

-- 3. Índices de optimización para consultas administrativas
CREATE INDEX IF NOT EXISTS idx_audit_event_type ON audit_events(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_resource ON audit_events(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_users_role_status ON users(role, status);

