/**
 * ==============================================================================
 * Servicio de Configuración y Kill-Switch — Piloto Interactivo (Etapa 09)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 */

import { getDb } from '../db/database';
import { InteractivePilotConfig } from './types';

export class PilotConfigService {
  /**
   * Obtiene la configuración completa del piloto
   */
  public static getConfig(): InteractivePilotConfig {
    const db = getDb();
    const rows = db.prepare('SELECT key, value FROM interactive_pilot_config').all() as Array<{ key: string; value: string }>;
    
    const configMap = new Map<string, string>();
    for (const r of rows) {
      configMap.set(r.key, r.value);
    }

    let allowedSubjects: string[] = ['subj-mat-801', 'subj-fis-bgu-01', 'CN.F.5.1'];
    try {
      const allowedStr = configMap.get('allowed_subject_codes');
      if (allowedStr) allowedSubjects = JSON.parse(allowedStr);
    } catch { /* usar predeterminados */ }

    // Permitir anulación por variable de entorno si existe
    const envFlag = process.env.FEATURE_OPENMAIC_PILOT;
    const isEnabled = envFlag !== undefined ? envFlag === 'true' : (configMap.get('pilot_enabled') === 'true');

    return {
      pilotEnabled: isEnabled,
      maxTurnsPerSession: Number(configMap.get('max_turns_per_session')) || 6,
      sessionTtlMinutes: Number(configMap.get('session_ttl_minutes')) || 15,
      allowedSubjectCodes: allowedSubjects,
      sandboxSecurityMode: configMap.get('sandbox_security_mode') || 'STRICT_ISOLATED',
    };
  }

  /**
   * Alterna o establece el estado del interruptor general (Kill-Switch)
   */
  public static setPilotEnabled(enabled: boolean): boolean {
    const db = getDb();
    db.prepare(`
      INSERT INTO interactive_pilot_config (key, value, updated_at)
      VALUES ('pilot_enabled', ?, datetime('now'))
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
    `).run(enabled ? 'true' : 'false');

    return enabled;
  }

  /**
   * Actualiza parámetros operativos del piloto
   */
  public static updateConfig(params: Partial<{ maxTurns: number; ttlMinutes: number; allowedSubjects: string[] }>): InteractivePilotConfig {
    const db = getDb();
    if (params.maxTurns !== undefined) {
      db.prepare(`
        INSERT INTO interactive_pilot_config (key, value, updated_at)
        VALUES ('max_turns_per_session', ?, datetime('now'))
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
      `).run(params.maxTurns.toString());
    }
    if (params.ttlMinutes !== undefined) {
      db.prepare(`
        INSERT INTO interactive_pilot_config (key, value, updated_at)
        VALUES ('session_ttl_minutes', ?, datetime('now'))
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
      `).run(params.ttlMinutes.toString());
    }
    if (params.allowedSubjects !== undefined) {
      db.prepare(`
        INSERT INTO interactive_pilot_config (key, value, updated_at)
        VALUES ('allowed_subject_codes', ?, datetime('now'))
        ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
      `).run(JSON.stringify(params.allowedSubjects));
    }

    return this.getConfig();
  }
}

