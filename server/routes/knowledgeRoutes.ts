/**
 * ==============================================================================
 * Enrutador de API RESTful: Centro de Conocimiento (ETAPA-07)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 */

import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { requireRole } from '../middleware/authMiddleware';
import { KnowledgeService } from '../knowledge/knowledgeService';

const router = Router();

// ==========================================
// 1. Catálogo de Fuentes de Conocimiento
// ==========================================

/**
 * GET /api/v1/knowledge/sources
 * Listado paginado de fuentes con filtros de estado, procedencia y materia
 * Acceso: ADMIN, ACADEMIC_COORDINATOR, TEACHER
 */
router.get(
  '/sources',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  (req: Request, res: Response): void => {
    try {
      const { status, sourceType, subjectId, page, limit } = req.query;
      const result = KnowledgeService.getSources({
        status: status as any,
        sourceType: sourceType as any,
        subjectId: subjectId as string,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 20,
      });

      res.status(200).json({
        success: true,
        data: result,
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
 * POST /api/v1/knowledge/sources
 * Carga de un nuevo documento en estado PENDIENTE con extracción y segmentación automática
 * Acceso: ADMIN, ACADEMIC_COORDINATOR, TEACHER
 */
router.post(
  '/sources',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  (req: Request, res: Response): void => {
    try {
      const user = (req as any).user;
      const {
        code,
        title,
        description,
        sourceType,
        formatType,
        uriOrUrl,
        contentText,
        subjectId,
        levelId,
        competencyId,
        language,
        targetAgentFamily,
        trustLevel,
        licenseType,
        authorOrPublisher,
      } = req.body;

      if (!code || !title || !sourceType || !formatType || !uriOrUrl || !contentText) {
        res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Faltan campos obligatorios: code, title, sourceType, formatType, uriOrUrl, contentText.',
          },
        });
        return;
      }

      const source = KnowledgeService.createSource(
        {
          code,
          title,
          description,
          sourceType,
          formatType,
          uriOrUrl,
          contentText,
          subjectId,
          levelId,
          competencyId,
          language,
          targetAgentFamily,
          trustLevel,
          licenseType,
          authorOrPublisher,
        },
        user.userId || user.id
      );

      res.status(201).json({
        success: true,
        data: source,
        message: 'Fuente de conocimiento registrada en estado PENDIENTE. Requiere revisión editorial.',
      });
    } catch (err: any) {
      const isConflict = err.message.startsWith('CONFLICT_');
      const isValidation = err.message.startsWith('VALIDATION_');
      const statusCode = isConflict ? 409 : isValidation ? 400 : 500;

      res.status(statusCode).json({
        success: false,
        error: {
          code: isConflict ? 'CONFLICT' : isValidation ? 'VALIDATION_ERROR' : 'INTERNAL_ERROR',
          message: err.message,
        },
      });
    }
  }
);

/**
 * GET /api/v1/knowledge/sources/:id
 * Detalle completo de una fuente, incluyendo fragmentos e historial de auditoría
 */
router.get(
  '/sources/:id',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  (req: Request, res: Response): void => {
    try {
      const source = KnowledgeService.getSourceById(req.params.id);
      if (!source) {
        res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Fuente de conocimiento no encontrada.' },
        });
        return;
      }

      const chunks = KnowledgeService.getSourceChunks(req.params.id);
      const history = KnowledgeService.getSourceHistory(req.params.id);

      res.status(200).json({
        success: true,
        data: {
          ...source,
          chunks,
          history,
        },
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
 * POST /api/v1/knowledge/sources/:id/review
 * Revisión editorial: aprobación o rechazo de una fuente
 * Restringido a: ADMIN, ACADEMIC_COORDINATOR
 */
router.post(
  '/sources/:id/review',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  (req: Request, res: Response): void => {
    try {
      const user = (req as any).user;
      const { status, justification } = req.body;

      if (!status || !['APROBADO', 'RECHAZADO', 'EN_REVISION'].includes(status)) {
        res.status(400).json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'El estado debe ser APROBADO, RECHAZADO o EN_REVISION.' },
        });
        return;
      }

      if (!justification || justification.trim().length < 5) {
        res.status(400).json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Debe proporcionar una justificación editorial de al menos 5 caracteres.' },
        });
        return;
      }

      const updated = KnowledgeService.reviewSource(req.params.id, status, justification, user.userId || user.id);

      res.status(200).json({
        success: true,
        data: updated,
        message: `Fuente de conocimiento actualizada a estado "${status}".`,
      });
    } catch (err: any) {
      const isNotFound = err.message.startsWith('NOT_FOUND:');
      const statusCode = isNotFound ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: { code: isNotFound ? 'NOT_FOUND' : 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

/**
 * POST /api/v1/knowledge/sources/:id/retire
 * Retirada / desactivación efectiva de una fuente
 * Restringido a: ADMIN, ACADEMIC_COORDINATOR
 */
router.post(
  '/sources/:id/retire',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  (req: Request, res: Response): void => {
    try {
      const user = (req as any).user;
      const { justification } = req.body;

      if (!justification || justification.trim().length < 5) {
        res.status(400).json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Debe justificar el motivo de la retirada del recurso.' },
        });
        return;
      }

      const updated = KnowledgeService.retireSource(req.params.id, justification, user.userId || user.id);

      res.status(200).json({
        success: true,
        data: updated,
        message: 'Fuente desactivada. Sus fragmentos han sido retirados inmediatamente de todo retrieval.',
      });
    } catch (err: any) {
      const isNotFound = err.message.startsWith('NOT_FOUND:');
      const statusCode = isNotFound ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: { code: isNotFound ? 'NOT_FOUND' : 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

/**
 * POST /api/v1/knowledge/sources/:id/versions
 * Creación de una nueva versión a partir de una fuente existente
 * Acceso: ADMIN, ACADEMIC_COORDINATOR, TEACHER
 */
router.post(
  '/sources/:id/versions',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  (req: Request, res: Response): void => {
    try {
      const user = (req as any).user;
      const newVersion = KnowledgeService.createNewVersion(req.params.id, req.body, user.userId || user.id);

      res.status(201).json({
        success: true,
        data: newVersion,
        message: `Nueva versión creada con código "${newVersion.code}". Inicia en estado PENDIENTE.`,
      });
    } catch (err: any) {
      const isNotFound = err.message.startsWith('NOT_FOUND:');
      const statusCode = isNotFound ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: { code: isNotFound ? 'NOT_FOUND' : 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

/**
 * PUT /api/v1/knowledge/sources/:id
 * Actualiza los metadatos o contenido de una fuente existente
 * Acceso: ADMIN, ACADEMIC_COORDINATOR
 */
router.put(
  '/sources/:id',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  (req: Request, res: Response): void => {
    try {
      const user = (req as any).user;
      const { justification, ...data } = req.body;
      const updated = KnowledgeService.updateSource(
        req.params.id,
        data,
        justification || 'Actualización de datos de la fuente de conocimiento.',
        user.userId || user.id
      );

      res.status(200).json({
        success: true,
        data: updated,
        message: 'Fuente de conocimiento actualizada correctamente.',
      });
    } catch (err: any) {
      const isNotFound = err.message && err.message.startsWith('NOT_FOUND:');
      const statusCode = isNotFound ? 404 : 500;
      res.status(statusCode).json({
        success: false,
        error: { code: isNotFound ? 'NOT_FOUND' : 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

/**
 * GET /api/v1/knowledge/sources/:id/history
 * Consulta el historial de cambios, revisiones y versiones de una fuente
 * Acceso: ADMIN, ACADEMIC_COORDINATOR, TEACHER
 */
router.get(
  '/sources/:id/history',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  (req: Request, res: Response): void => {
    try {
      const source = KnowledgeService.getSourceById(req.params.id);
      if (!source) {
        res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Fuente de conocimiento no encontrada.' },
        });
        return;
      }

      const history = KnowledgeService.getSourceHistory(req.params.id);
      res.status(200).json({
        success: true,
        data: {
          sourceId: req.params.id,
          sourceCode: source.code,
          sourceTitle: source.title,
          totalEvents: history.length,
          history,
        },
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

// ==========================================
// 2. Motor de Búsqueda y Retrieval (RAG Ready)
// ==========================================

/**
 * GET /api/v1/knowledge/search
 * Consulta FTS5 BM25 sobre fragmentos de fuentes APROBADAS exclusivamente
 * Acceso: Todos los usuarios autenticados y agentes
 */
router.get(
  '/search',
  requireAuth,
  (req: Request, res: Response): void => {
    try {
      const { q, subjectId, competencyId, targetAgentFamily, language, limit } = req.query;

      if (!q || !(q as string).trim()) {
        res.status(400).json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Debe especificar el parámetro de búsqueda "q".' },
        });
        return;
      }

      const results = KnowledgeService.searchKnowledge({
        query: q as string,
        subjectId: subjectId as string,
        competencyId: competencyId as string,
        targetAgentFamily: targetAgentFamily as any,
        language: language as string,
        limit: limit ? parseInt(limit as string, 10) : 5,
      });

      res.status(200).json({
        success: true,
        data: {
          query: q,
          totalResults: results.length,
          results,
        },
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

// ==========================================
// 3. Conflictos Doctrinales y Curriculares
// ==========================================

/**
 * POST /api/v1/knowledge/conflicts
 * Reporte de un conflicto o discrepancia entre dos fuentes
 */
router.post(
  '/conflicts',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  (req: Request, res: Response): void => {
    try {
      const user = (req as any).user;
      const { sourceIdA, sourceIdB, conflictType, description } = req.body;

      if (!sourceIdA || !sourceIdB || !conflictType || !description) {
        res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Faltan campos obligatorios: sourceIdA, sourceIdB, conflictType, description.',
          },
        });
        return;
      }

      const conflict = KnowledgeService.reportConflict(
        sourceIdA,
        sourceIdB,
        conflictType,
        description,
        user.userId || user.id
      );

      res.status(201).json({
        success: true,
        data: conflict,
        message: 'Conflicto registrado y escalado para revisión editorial.',
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
 * POST /api/v1/knowledge/conflicts/:id/resolve
 * Resolución de un conflicto reportado
 */
router.post(
  '/conflicts/:id/resolve',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  (req: Request, res: Response): void => {
    try {
      const user = (req as any).user;
      const { resolutionNotes } = req.body;

      if (!resolutionNotes || resolutionNotes.trim().length < 5) {
        res.status(400).json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Debe especificar las notas de resolución.' },
        });
        return;
      }

      KnowledgeService.resolveConflict(req.params.id, resolutionNotes, user.userId || user.id);

      res.status(200).json({
        success: true,
        message: 'Conflicto resuelto exitosamente.',
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

// ==========================================
// 4. Estadísticas del Centro de Conocimiento
// ==========================================

/**
 * GET /api/v1/knowledge/stats
 * Resumen de fuentes por estado, tipo y volumen de fragmentos
 */
router.get(
  '/stats',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  (_req: Request, res: Response): void => {
    try {
      const stats = KnowledgeService.getKnowledgeStats();
      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_ERROR', message: err.message },
      });
    }
  }
);

export default router;

