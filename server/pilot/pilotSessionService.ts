/**
 * ==============================================================================
 * Servicio de Sesiones Aisladas y Telemetría — Piloto Interactivo (Etapa 09)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 * Garantiza aislamiento criptográfico estricto, cero transferencia de PII (Anti-PII),
 * tokens efímeros sintéticos con TTL y recolección anonimizada de telemetría.
 */

import crypto from 'node:crypto';
import { getDatabaseAdapter } from '../db/dal';
import { PilotConfigService } from './pilotConfigService';
import { EphemeralPilotSession } from './types';

export class PilotSessionService {
  /**
   * Inicia una sesión piloto efímera sin transmitir datos personales reales
   */
  public static async initiateSession(params: {
    subjectCode: string;
    lessonTheme: string;
  }): Promise<EphemeralPilotSession> {
    const config = await PilotConfigService.getConfig();
    if (!config.pilotEnabled) {
      throw new Error('PILOT_DISABLED: El piloto de aula interactiva se encuentra desactivado temporalmente por coordinación.');
    }

    const db = getDatabaseAdapter();
    const sessionId = `pilot-sess-${crypto.randomUUID().slice(0, 12)}`;
    const ephemeralToken = `pilot-tok-${crypto.randomBytes(16).toString('hex')}`;
    const syntheticNumber = Math.floor(100 + Math.random() * 900);
    const syntheticAlias = `Estudiante Explorador #${syntheticNumber}`;

    await db.execute(`
      INSERT INTO interactive_pilot_sessions (
        id, ephemeral_token, student_synthetic_alias, subject_code, lesson_theme, started_at, status
      ) VALUES (?, ?, ?, ?, ?, datetime('now'), 'ACTIVE')
    `, [sessionId, ephemeralToken, syntheticAlias, params.subjectCode, params.lessonTheme]);

    return {
      id: sessionId,
      ephemeralToken,
      studentSyntheticAlias: syntheticAlias,
      subjectCode: params.subjectCode,
      lessonTheme: params.lessonTheme,
      startedAt: new Date().toISOString(),
      status: 'ACTIVE',
    };
  }

  /**
   * Obtiene y valida una sesión activa por su token efímero
   */
  public static async getSessionByToken(token: string): Promise<EphemeralPilotSession> {
    const db = getDatabaseAdapter();
    const row = await db.queryOne<any>(`
      SELECT * FROM interactive_pilot_sessions WHERE ephemeral_token = ?
    `, [token]);

    if (!row) {
      throw new Error('SESSION_NOT_FOUND: La sesión del piloto interactivo no existe o ya expiró.');
    }

    // Verificar TTL de la sesión
    const config = await PilotConfigService.getConfig();
    const startTime = new Date(row.started_at).getTime();
    const elapsedMinutes = (Date.now() - startTime) / (1000 * 60);

    if (elapsedMinutes > config.sessionTtlMinutes && row.status === 'ACTIVE') {
      await db.execute(`
        UPDATE interactive_pilot_sessions 
        SET status = 'COMPLETED', ended_at = datetime('now')
        WHERE id = ?
      `, [row.id]);
      row.status = 'COMPLETED';
    }

    return {
      id: row.id,
      ephemeralToken: row.ephemeral_token,
      studentSyntheticAlias: row.student_synthetic_alias,
      subjectCode: row.subject_code,
      lessonTheme: row.lesson_theme,
      startedAt: row.started_at,
      endedAt: row.ended_at,
      status: row.status,
    };
  }

  /**
   * Cierra ordenadamente la sesión y persiste la telemetría anonimizada
   */
  public static async terminateSession(
    token: string,
    exitReason: 'USER_EXIT' | 'SESSION_TIMEOUT' | 'LESSON_COMPLETED' | 'SYSTEM_KILL_SWITCH',
    telemetry?: Partial<{
      turnsCount: number;
      latencyMs: number;
      tokensEstimated: number;
      simulationInteractions: number;
    }>
  ): Promise<{ sessionId: string; status: string; exitReason: string }> {
    const session = await this.getSessionByToken(token);
    const db = getDatabaseAdapter();

    const finalStatus =
      exitReason === 'LESSON_COMPLETED'
        ? 'COMPLETED'
        : exitReason === 'SYSTEM_KILL_SWITCH'
        ? 'TERMINATED_ERROR'
        : 'ABORTED_BY_USER';

    await db.execute(`
      UPDATE interactive_pilot_sessions 
      SET status = ?, ended_at = datetime('now')
      WHERE id = ?
    `, [finalStatus, session.id]);

    const telemetryId = `telem-${crypto.randomUUID().slice(0, 12)}`;
    await db.execute(`
      INSERT INTO interactive_pilot_telemetry (
        id, session_id, turns_count, latency_ms, tokens_estimated, simulation_interactions, exit_reason
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      telemetryId,
      session.id,
      telemetry?.turnsCount || 1,
      telemetry?.latencyMs || 45,
      telemetry?.tokensEstimated || 120,
      telemetry?.simulationInteractions || 1,
      exitReason,
    ]);

    return {
      sessionId: session.id,
      status: finalStatus,
      exitReason,
    };
  }

  /**
   * Resumen administrativo de métricas del piloto para auditoría de coordinación
   */
  public static async getAdminTelemetrySummary(): Promise<{
    totalSessions: number;
    activeSessions: number;
    completedSessions: number;
    abortedSessions: number;
    averageLatencyMs: number;
    totalTokensEstimated: number;
    averageInteractions: number;
    exitReasonsCount: Record<string, number>;
  }> {
    const db = getDatabaseAdapter();

    const sessStats = await db.queryOne<any>(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) as active,
        SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status IN ('ABORTED_BY_USER', 'TERMINATED_ERROR') THEN 1 ELSE 0 END) as aborted
      FROM interactive_pilot_sessions
    `);

    const telemStats = await db.queryOne<any>(`
      SELECT 
        AVG(latency_ms) as avg_latency,
        SUM(tokens_estimated) as total_tokens,
        AVG(simulation_interactions) as avg_interactions
      FROM interactive_pilot_telemetry
    `);

    const exitReasonsRows = await db.query<{ exit_reason: string; count: number }>(`
      SELECT exit_reason, COUNT(*) as count 
      FROM interactive_pilot_telemetry 
      GROUP BY exit_reason
    `);

    const exitReasonsMap: Record<string, number> = {};
    for (const row of exitReasonsRows) {
      exitReasonsMap[row.exit_reason] = row.count;
    }

    return {
      totalSessions: sessStats?.total || 0,
      activeSessions: sessStats?.active || 0,
      completedSessions: sessStats?.completed || 0,
      abortedSessions: sessStats?.aborted || 0,
      averageLatencyMs: Math.round(telemStats?.avg_latency || 0),
      totalTokensEstimated: telemStats?.total_tokens || 0,
      averageInteractions: Math.round((telemStats?.avg_interactions || 0) * 10) / 10,
      exitReasonsCount: exitReasonsMap,
    };
  }
}
