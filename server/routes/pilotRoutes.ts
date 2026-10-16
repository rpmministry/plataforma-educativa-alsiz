/**
 * ==============================================================================
 * Enrutador RESTful — Piloto de Aula Interactiva (Etapa 09)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 */

import { Router, Request, Response } from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware';
import { PilotConfigService } from '../pilot/pilotConfigService';
import { PilotSessionService } from '../pilot/pilotSessionService';
import { PilotMultiAgentEngine } from '../pilot/pilotMultiAgentEngine';

export const pilotRouter = Router();

/**
 * GET /api/v1/pilot/status
 * Consulta el estado del feature flag del piloto y parámetros públicos
 */
pilotRouter.get('/status', (req: Request, res: Response) => {
  try {
    const config = PilotConfigService.getConfig();
    res.json({
      success: true,
      data: {
        pilotEnabled: config.pilotEnabled,
        allowedSubjectCodes: config.allowedSubjectCodes,
        sandboxSecurityMode: config.sandboxSecurityMode,
        maxTurnsPerSession: config.maxTurnsPerSession,
        sessionTtlMinutes: config.sessionTtlMinutes,
      },
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/v1/pilot/sessions/initiate
 * Inicia una sesión piloto efímera (Anti-PII: no expone credenciales ni datos personales)
 */
pilotRouter.post('/sessions/initiate', requireAuth, (req: Request, res: Response) => {
  try {
    const { subjectCode, lessonTheme } = req.body;
    if (!subjectCode || !lessonTheme) {
      res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR: subjectCode y lessonTheme son requeridos.',
      });
      return;
    }

    const session = PilotSessionService.initiateSession({
      subjectCode: String(subjectCode),
      lessonTheme: String(lessonTheme),
    });

    res.status(201).json({
      success: true,
      data: session,
      notice: 'Sesión piloto efímera iniciada en modo seguro Anti-PII.',
    });
  } catch (err: any) {
    const status = err.message.startsWith('PILOT_DISABLED') ? 403 : 500;
    res.status(status).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/v1/pilot/sessions/:token
 * Consulta el estado de una sesión por su token efímero
 */
pilotRouter.get('/sessions/:token', (req: Request, res: Response) => {
  try {
    const session = PilotSessionService.getSessionByToken(req.params.token);
    res.json({ success: true, data: session });
  } catch (err: any) {
    const status = err.message.startsWith('SESSION_NOT_FOUND') ? 404 : 500;
    res.status(status).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/v1/pilot/sessions/:token/interact
 * Ejecuta un turno multiagente en el aula interactiva (Profesor + Compañero + Simulador)
 */
pilotRouter.post('/sessions/:token/interact', (req: Request, res: Response) => {
  try {
    const session = PilotSessionService.getSessionByToken(req.params.token);
    if (session.status !== 'ACTIVE') {
      res.status(400).json({
        success: false,
        error: `INVALID_SESSION_STATE: La sesión se encuentra en estado ${session.status}.`,
      });
      return;
    }

    const { turnIndex, userAction, studentMessage, n1, n2, angleIncidentDeg } = req.body;

    const config = PilotConfigService.getConfig();
    if (turnIndex && turnIndex > config.maxTurnsPerSession) {
      res.status(429).json({
        success: false,
        error: `MAX_TURNS_EXCEEDED: Se ha alcanzado el límite pedagógico de ${config.maxTurnsPerSession} turnos para esta sesión exploratoria.`,
      });
      return;
    }

    const turnResponse = PilotMultiAgentEngine.processTurn({
      turnIndex: Number(turnIndex) || 1,
      userAction: userAction || 'ADJUST_ANGLE',
      studentMessage: studentMessage ? String(studentMessage) : undefined,
      n1: n1 !== undefined ? Number(n1) : undefined,
      n2: n2 !== undefined ? Number(n2) : undefined,
      angleIncidentDeg: angleIncidentDeg !== undefined ? Number(angleIncidentDeg) : undefined,
    });

    res.json({
      success: true,
      data: turnResponse,
    });
  } catch (err: any) {
    const status = err.message.startsWith('SESSION_NOT_FOUND') ? 404 : 500;
    res.status(status).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/v1/pilot/sessions/:token/terminate
 * Finaliza la sesión piloto y registra telemetría operativa
 */
pilotRouter.post('/sessions/:token/terminate', (req: Request, res: Response) => {
  try {
    const { exitReason, telemetry } = req.body;
    const validReasons = ['USER_EXIT', 'SESSION_TIMEOUT', 'LESSON_COMPLETED', 'SYSTEM_KILL_SWITCH'];
    const reason = validReasons.includes(exitReason) ? exitReason : 'USER_EXIT';

    const result = PilotSessionService.terminateSession(req.params.token, reason, telemetry);

    res.json({
      success: true,
      data: result,
      message: 'Sesión piloto finalizada correctamente.',
    });
  } catch (err: any) {
    const status = err.message.startsWith('SESSION_NOT_FOUND') ? 404 : 500;
    res.status(status).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/v1/pilot/admin/telemetry
 * Métricas agregadas del piloto para coordinación y auditoría técnica
 */
pilotRouter.get(
  '/admin/telemetry',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  (req: Request, res: Response) => {
    try {
      const summary = PilotSessionService.getAdminTelemetrySummary();
      res.json({ success: true, data: summary });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

/**
 * POST /api/v1/pilot/admin/toggle
 * Interruptor maestro (Kill-Switch) para activar o desactivar el piloto
 */
pilotRouter.post(
  '/admin/toggle',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  (req: Request, res: Response) => {
    try {
      const { enabled } = req.body;
      const isEnabled = Boolean(enabled);
      PilotConfigService.setPilotEnabled(isEnabled);

      res.json({
        success: true,
        data: { pilotEnabled: isEnabled },
        message: `Piloto interactivo ${isEnabled ? 'ACTIVADO' : 'DESACTIVADO (Kill-Switch accionado)'} exitosamente.`,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

