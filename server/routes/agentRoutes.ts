/**
 * ==============================================================================
 * Enrutador de API RESTful: Agentes Educativos y Orquestación IA (ETAPA-08)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 */

import { Router, Request, Response } from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware';
import { AgentService } from '../agents/agentService';
import { CoordinationService } from '../agents/coordinationService';
import { HumanSupervisionService } from '../agents/humanSupervisionService';
import { ProviderManager } from '../agents/providers/providerManager';
import { getDatabaseAdapter } from '../db/dal';

const router = Router();

// ==========================================
// 1. Catálogo y Configuración de Agentes
// ==========================================

/**
 * GET /api/v1/agents
 * Lista todos los agentes piloto activos
 */
router.get('/', requireAuth, (_req: Request, res: Response): void => {
  try {
    const agents = AgentService.getAgents();
    res.status(200).json({
      success: true,
      data: agents,
      providersAvailable: ProviderManager.getAvailableProviders(),
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: err.message },
    });
  }
});

/**
 * GET /api/v1/agents/:id
 * Detalle completo de un agente por ID
 */
router.get('/:id', requireAuth, (req: Request, res: Response): void => {
  try {
    const agent = AgentService.getAgentById(req.params.id);
    if (!agent) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Agente educativo no encontrado.' },
      });
      return;
    }
    res.status(200).json({ success: true, data: agent });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: err.message },
    });
  }
});

/**
 * PUT /api/v1/agents/:id
 * Actualización de directivas y estilo del agente
 * Restringido a: ADMIN, ACADEMIC_COORDINATOR
 */
router.put(
  '/:id',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  (req: Request, res: Response): void => {
    try {
      const updated = AgentService.updateAgent(req.params.id, req.body);
      res.status(200).json({
        success: true,
        data: updated,
        message: 'Agente educativo actualizado exitosamente.',
      });
    } catch (err: any) {
      const isNotFound = err.message.startsWith('NOT_FOUND:');
      res.status(isNotFound ? 404 : 500).json({
        success: false,
        error: { code: isNotFound ? 'NOT_FOUND' : 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

// ==========================================
// 2. Conversaciones e Interacción Socrática
// ==========================================

/**
 * POST /api/v1/agents/conversations
 * Inicia un nuevo diálogo socrático para el estudiante autenticado
 */
router.post('/conversations', requireAuth, (req: Request, res: Response): void => {
  try {
    const user = (req as any).user;
    const { agentId, title, targetStudentId } = req.body;

    if (!agentId) {
      res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Debe especificar el agentId.' },
      });
      return;
    }

    // Resolver student_id según el rol
    let effectiveStudentId = user.studentId;
    if (['ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'].includes(user.role) && targetStudentId) {
      effectiveStudentId = targetStudentId;
    }

    if (!effectiveStudentId) {
      res.status(400).json({
        success: false,
        error: { code: 'STUDENT_REQUIRED', message: 'No se detectó un perfil de estudiante para iniciar la conversación.' },
      });
      return;
    }

    const conversation = AgentService.createConversation(effectiveStudentId, agentId, title);

    res.status(201).json({
      success: true,
      data: conversation,
      message: 'Conversación socrática iniciada.',
    });
  } catch (err: any) {
    const isNotFound = err.message.startsWith('NOT_FOUND:');
    res.status(isNotFound ? 404 : 500).json({
      success: false,
      error: { code: isNotFound ? 'NOT_FOUND' : 'INTERNAL_ERROR', message: err.message },
    });
  }
});

/**
 * GET /api/v1/agents/conversations
 * Lista las conversaciones del estudiante autenticado
 */
router.get('/conversations', requireAuth, (req: Request, res: Response): void => {
  try {
    const user = (req as any).user;
    const studentId = user.studentId;

    if (!studentId && user.role === 'STUDENT') {
      res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Perfil de estudiante no asociado.' },
      });
      return;
    }

    const conversations = studentId ? AgentService.getStudentConversations(studentId) : [];
    res.status(200).json({ success: true, data: conversations });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: err.message },
    });
  }
});

/**
 * GET /api/v1/agents/conversations/:id
 * Obtiene los mensajes de una conversación con control estricto Anti-IDOR
 */
router.get('/conversations/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const conv = AgentService.getConversationById(req.params.id);

    if (!conv) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Conversación no encontrada.' },
      });
      return;
    }

    // Aislamiento Anti-IDOR:
    // 1. Estudiante solo puede ver su propia conversación.
    if (user.role === 'STUDENT' && user.studentId !== conv.student_id) {
      res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN_STUDENT_ACCESS', message: 'No tiene autorización para acceder a la conversación de otro estudiante.' },
      });
      return;
    }

    // 2. Representante solo puede ver las de sus hijos vinculados.
    if (user.role === 'REPRESENTATIVE') {
      const db = getDatabaseAdapter();
      const link = await db.queryOne(
        'SELECT 1 FROM student_representatives WHERE student_id = ? AND representative_id = ?',
        [conv.student_id, user.representativeId]
      );

      if (!link) {
        res.status(403).json({
          success: false,
          error: { code: 'FORBIDDEN_FAMILY_ACCESS', message: 'No tiene autorización para ver conversaciones de alumnos ajenos a su núcleo familiar.' },
        });
        return;
      }
    }

    const messages = AgentService.getConversationMessages(req.params.id);
    res.status(200).json({
      success: true,
      data: {
        conversation: conv,
        messages,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: err.message },
    });
  }
});

/**
 * POST /api/v1/agents/conversations/:id/messages
 * Envía un mensaje y genera la respuesta socrática fundamentada (RAG)
 */
router.post('/conversations/:id/messages', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { content, language, forceProvider } = req.body;

    if (!content || !content.trim()) {
      res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'El contenido del mensaje no puede estar vacío.' },
      });
      return;
    }

    const conv = AgentService.getConversationById(req.params.id);
    if (!conv) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Conversación no encontrada.' },
      });
      return;
    }

    // Aislamiento Anti-IDOR para estudiantes
    const effectiveStudentId = user.studentId || conv.student_id;
    if (user.role === 'STUDENT' && user.studentId !== conv.student_id) {
      res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN_STUDENT_ACCESS', message: 'No puede interactuar en una conversación que pertenece a otro alumno.' },
      });
      return;
    }

    const interaction = await AgentService.sendMessage(
      req.params.id,
      effectiveStudentId,
      content,
      { language, forceProvider }
    );

    res.status(200).json({
      success: true,
      data: interaction,
    });
  } catch (err: any) {
    const isForbidden = err.message.startsWith('FORBIDDEN_');
    const isNotFound = err.message.startsWith('NOT_FOUND:');
    const isValidation = err.message.startsWith('VALIDATION_');
    const statusCode = isForbidden ? 403 : isNotFound ? 404 : isValidation ? 400 : 500;

    res.status(statusCode).json({
      success: false,
      error: {
        code: isForbidden ? 'FORBIDDEN' : isNotFound ? 'NOT_FOUND' : isValidation ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR',
        message: err.message,
      },
    });
  }
});

/**
 * POST /api/v1/agents/conversations/:id/coordinate-eval
 * Coordinación multiagente: solicita al Evaluador de Rúbricas evaluar el trabajo del alumno
 */
router.post('/conversations/:id/coordinate-eval', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (req as any).user;
    const { studentWorkText, rubricCriteria } = req.body;

    if (!studentWorkText || !studentWorkText.trim()) {
      res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Debe proporcionar el trabajo del estudiante para evaluación.' },
      });
      return;
    }

    const conv = AgentService.getConversationById(req.params.id);
    if (!conv) {
      res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Conversación no encontrada.' },
      });
      return;
    }

    const effectiveStudentId = user.studentId || conv.student_id;
    if (user.role === 'STUDENT' && user.studentId !== conv.student_id) {
      res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN_STUDENT_ACCESS', message: 'No puede solicitar evaluación sobre otra conversación.' },
      });
      return;
    }

    const evalResult = await CoordinationService.evaluateStudentSubmission(
      req.params.id,
      effectiveStudentId,
      studentWorkText,
      rubricCriteria
    );

    res.status(200).json({
      success: true,
      data: evalResult,
      message: 'Evaluación formativa multiagente completada.',
    });
  } catch (err: any) {
    const isForbidden = err.message.startsWith('FORBIDDEN_');
    const statusCode = isForbidden ? 403 : 500;
    res.status(statusCode).json({
      success: false,
      error: { code: isForbidden ? 'FORBIDDEN' : 'INTERNAL_ERROR', message: err.message },
    });
  }
});

// ==========================================
// 3. Supervisión Humana de Materiales (Human-in-the-Loop)
// ==========================================

/**
 * POST /api/v1/agents/materials/generate
 * Un agente genera una propuesta de material educativo en estado DRAFT_REVIEW
 */
router.post(
  '/materials/generate',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  (req: Request, res: Response): void => {
    try {
      const { title, contentMarkdown, agentId, subjectId, targetLevelId } = req.body;

      if (!title || !contentMarkdown || !agentId) {
        res.status(400).json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Faltan campos obligatorios: title, contentMarkdown, agentId.' },
        });
        return;
      }

      const material = HumanSupervisionService.proposeMaterial({
        title,
        contentMarkdown,
        agentId,
        subjectId,
        targetLevelId,
      });

      res.status(201).json({
        success: true,
        data: material,
        message: 'Material propuesto en estado DRAFT_REVIEW. Pendiente de aprobación docente.',
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

/**
 * GET /api/v1/agents/materials
 * Lista materiales generados
 */
router.get(
  '/materials',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  (req: Request, res: Response): void => {
    try {
      const { status } = req.query;
      const materials = HumanSupervisionService.listMaterials(status as any);
      res.status(200).json({ success: true, data: materials });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

/**
 * POST /api/v1/agents/materials/:id/review
 * Aprobación o rechazo formal de un material propuesto por IA
 */
router.post(
  '/materials/:id/review',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  (req: Request, res: Response): void => {
    try {
      const user = (req as any).user;
      const { status, reviewNotes } = req.body;

      if (!['APPROVED_PUBLISHED', 'REJECTED'].includes(status)) {
        res.status(400).json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'El estado debe ser APPROVED_PUBLISHED o REJECTED.' },
        });
        return;
      }

      if (!reviewNotes || reviewNotes.trim().length < 5) {
        res.status(400).json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Debe incluir notas de revisión docente (mínimo 5 caracteres).' },
        });
        return;
      }

      const updated = HumanSupervisionService.reviewMaterial(
        req.params.id,
        status,
        user.userId || user.id,
        reviewNotes
      );

      res.status(200).json({
        success: true,
        data: updated,
        message: `Material didáctico calificado como "${status}".`,
      });
    } catch (err: any) {
      const isNotFound = err.message.startsWith('NOT_FOUND:');
      res.status(isNotFound ? 404 : 500).json({
        success: false,
        error: { code: isNotFound ? 'NOT_FOUND' : 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

// ==========================================
// 4. Telemetría de Agentes
// ==========================================

/**
 * GET /api/v1/agents/telemetry/stats
 * Resumen de métricas operativas (latencias, llamadas y tokens)
 */
router.get(
  '/telemetry/stats',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  (_req: Request, res: Response): void => {
    try {
      const stats = AgentService.getTelemetryStats();
      res.status(200).json({ success: true, data: stats });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

/**
 * GET /api/v1/agents/health
 * Estado de salud e inventario sanitizado de proveedores IA (sin secretos ni PII)
 */
router.get('/health', requireAuth, (_req: Request, res: Response): void => {
  try {
    const report = ProviderManager.getHealthReport();
    res.status(200).json({ success: true, data: report });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: err.message },
    });
  }
});

export default router;

