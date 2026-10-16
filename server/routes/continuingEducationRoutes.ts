/**
 * ==============================================================================
 * Enrutador RESTful — Formación No Escolar, Artes, Oficios y Educación Continua
 * ETAPA 12 (ALSIZ / Ekballo Church)
 * ==============================================================================
 */

import { Router, Response } from 'express';
import { z } from 'zod';
import { AuthenticatedRequest, requireAuth, requireRole } from '../middleware/authMiddleware';
import { ContinuingEducationService } from '../continuing-ed/continuingEducationService';

export const continuingEducationRouter = Router();
const service = new ContinuingEducationService();

// ==========================================
// 1. CATÁLOGO PÚBLICO / CURSOS
// ==========================================

/**
 * GET /api/v1/continuing-ed/courses
 * Listado de cursos con filtros de categoría, modalidad, nivel, costo y término de búsqueda
 */
continuingEducationRouter.get('/courses', (req: AuthenticatedRequest, res: Response) => {
  try {
    const { category, modality, level, pricingType, search, page, limit, status } = req.query;

    // Solo ADMIN o TEACHER pueden solicitar borradores o estados no publicados
    const isAdminOrTeacher = req.user && ['ADMIN', 'TEACHER', 'ACADEMIC_COORDINATOR'].includes(req.user.role);
    const includeDrafts = isAdminOrTeacher && (req.query.includeDrafts === 'true' || Boolean(status));

    const result = service.getCourses({
      category: category ? String(category) : undefined,
      modality: modality ? String(modality) : undefined,
      level: level ? String(level) : undefined,
      pricingType: pricingType ? String(pricingType) : undefined,
      search: search ? String(search) : undefined,
      status: status ? String(status) : undefined,
      includeDrafts,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
    });

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Error al obtener catálogo de cursos' });
  }
});

/**
 * GET /api/v1/continuing-ed/courses/:idOrSlug
 * Detalle completo de un curso con sus módulos y lecciones
 */
continuingEducationRouter.get('/courses/:idOrSlug', (req: AuthenticatedRequest, res: Response) => {
  try {
    const { idOrSlug } = req.params;
    let course = service.getCourseById(idOrSlug);
    if (!course) {
      course = service.getCourseBySlug(idOrSlug);
    }

    if (!course) {
      res.status(404).json({ success: false, error: 'Curso no encontrado' });
      return;
    }

    // Si es DRAFT o ARCHIVED y el usuario no tiene rol docente/admin, denegar
    if (course.status !== 'PUBLISHED') {
      const isPrivileged = req.user && ['ADMIN', 'TEACHER', 'ACADEMIC_COORDINATOR'].includes(req.user.role);
      if (!isPrivileged) {
        res.status(404).json({ success: false, error: 'Curso no disponible' });
        return;
      }
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Error al obtener detalle del curso' });
  }
});

// ==========================================
// 2. ADMINISTRACIÓN DE CURSOS (ADMIN / TEACHER)
// ==========================================

const CreateCourseSchema = z.object({
  code: z.string().min(2).max(30),
  title: z.string().min(3).max(200),
  slug: z.string().optional(),
  category: z.enum(['ARTES', 'OFICIOS', 'TECNOLOGIA', 'IDIOMAS', 'EMPRENDIMIENTO', 'HABILIDADES_PROFESIONALES', 'FORMACION_MINISTERIAL']),
  modality: z.enum(['ONLINE_ASYNC', 'ONLINE_SYNC', 'PRESENCIAL', 'HYBRID']),
  level: z.enum(['PRINCIPIANTE', 'INTERMEDIO', 'AVANZADO', 'TODOS_LOS_NIVELES']),
  language: z.enum(['es', 'en', 'bilingual']).optional(),
  estimatedDurationHours: z.number().int().min(1).max(1000),
  instructorUserId: z.string().optional(),
  instructorName: z.string().min(2),
  instructorBio: z.string().optional(),
  shortDescription: z.string().min(10).max(500),
  fullDescription: z.string().optional(),
  learningObjectives: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  maxCapacity: z.number().int().nullable().optional(),
  pricingType: z.enum(['FREE', 'PAID']).optional(),
  priceUsd: z.number().min(0).optional(),
  thumbnailUrl: z.string().optional(),
});

/**
 * POST /api/v1/continuing-ed/courses
 * Creación de un nuevo curso no formal
 */
continuingEducationRouter.post(
  '/courses',
  requireAuth,
  requireRole('ADMIN', 'TEACHER', 'ACADEMIC_COORDINATOR'),
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const validated = CreateCourseSchema.parse(req.body);
      const actorId = req.user?.id || 'usr-admin-01';
      const created = service.createCourse(validated, actorId);

      res.status(201).json({
        success: true,
        data: created,
        message: 'Curso creado exitosamente',
      });
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ success: false, error: 'Datos inválidos', details: (err as any).issues || (err as any).errors });
        return;
      }
      res.status(400).json({ success: false, error: err.message || 'Error al crear curso' });
    }
  }
);

/**
 * PUT /api/v1/continuing-ed/courses/:id
 * Actualización de metadatos, estado o cupos de un curso
 */
continuingEducationRouter.post(
  '/courses/:id',
  requireAuth,
  requireRole('ADMIN', 'TEACHER', 'ACADEMIC_COORDINATOR'),
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const actorId = req.user?.id || 'usr-admin-01';
      const updated = service.updateCourse(id, req.body, actorId);

      res.json({
        success: true,
        data: updated,
        message: 'Curso actualizado exitosamente',
      });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || 'Error al actualizar curso' });
    }
  }
);

/**
 * POST /api/v1/continuing-ed/courses/:id/modules
 * Creación de un módulo temático dentro del curso
 */
continuingEducationRouter.post(
  '/courses/:id/modules',
  requireAuth,
  requireRole('ADMIN', 'TEACHER', 'ACADEMIC_COORDINATOR'),
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, orderIndex } = req.body;
      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        res.status(400).json({ success: false, error: 'El título del módulo es requerido' });
        return;
      }

      const mod = service.createModule(id, { title, description, orderIndex });
      res.status(201).json({
        success: true,
        data: mod,
        message: 'Módulo creado exitosamente',
      });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || 'Error al crear módulo' });
    }
  }
);

/**
 * POST /api/v1/continuing-ed/modules/:moduleId/lessons
 * Creación de una lección o taller práctico dentro de un módulo
 */
continuingEducationRouter.post(
  '/modules/:moduleId/lessons',
  requireAuth,
  requireRole('ADMIN', 'TEACHER', 'ACADEMIC_COORDINATOR'),
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const { moduleId } = req.params;
      const {
        title,
        lessonType,
        contentMarkdown,
        videoUrl,
        externalResources,
        estimatedMinutes,
        orderIndex,
      } = req.body;

      if (!title || !lessonType || !contentMarkdown) {
        res.status(400).json({ success: false, error: 'title, lessonType y contentMarkdown son requeridos' });
        return;
      }

      const lesson = service.createLesson(moduleId, {
        title,
        lessonType,
        contentMarkdown,
        videoUrl,
        externalResources,
        estimatedMinutes,
        orderIndex,
      });

      res.status(201).json({
        success: true,
        data: lesson,
        message: 'Lección creada exitosamente',
      });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || 'Error al crear lección' });
    }
  }
);

/**
 * POST /api/v1/continuing-ed/courses/:id/evaluations
 * Creación de evaluación sumativa o proyecto práctico de finalización
 */
continuingEducationRouter.post(
  '/courses/:id/evaluations',
  requireAuth,
  requireRole('ADMIN', 'TEACHER', 'ACADEMIC_COORDINATOR'),
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, evaluationType, passingScore, maxScore, questions } = req.body;

      if (!title || !evaluationType) {
        res.status(400).json({ success: false, error: 'title y evaluationType son obligatorios' });
        return;
      }

      const evaluation = service.createEvaluation(id, {
        title,
        description,
        evaluationType,
        passingScore,
        maxScore,
        questions,
      });

      res.status(201).json({
        success: true,
        data: evaluation,
        message: 'Evaluación de curso creada exitosamente',
      });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || 'Error al crear evaluación' });
    }
  }
);

// ==========================================
// 3. INSCRIPCIONES Y PROGRESO DEL ESTUDIANTE
// ==========================================

/**
 * POST /api/v1/continuing-ed/courses/:id/enroll
 * Inscripción del estudiante en un curso abierto
 */
continuingEducationRouter.post(
  '/courses/:id/enroll',
  requireAuth,
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.user!.id;

      const enrollment = service.enrollUser(id, userId);

      res.status(201).json({
        success: true,
        data: enrollment,
        message: 'Inscripción confirmada correctamente',
      });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || 'Error al procesar inscripción' });
    }
  }
);

/**
 * GET /api/v1/continuing-ed/my-enrollments
 * Lista de cursos en los que el usuario autenticado está inscrito con su progreso
 */
continuingEducationRouter.get(
  '/my-enrollments',
  requireAuth,
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user!.id;
      const enrollments = service.getUserEnrollments(userId);

      res.json({
        success: true,
        data: enrollments,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message || 'Error al obtener inscripciones' });
    }
  }
);

/**
 * GET /api/v1/continuing-ed/enrollments/:enrollmentId
 * Detalle de una inscripción con progreso y certificado si aplica
 */
continuingEducationRouter.get(
  '/enrollments/:enrollmentId',
  requireAuth,
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const { enrollmentId } = req.params;
      const enrollment = service.getEnrollmentById(enrollmentId);

      if (!enrollment) {
        res.status(404).json({ success: false, error: 'Inscripción no encontrada' });
        return;
      }

      // Validar pertenencia o rol administrativo
      const isOwner = enrollment.user_id === req.user!.id;
      const isPrivileged = ['ADMIN', 'TEACHER', 'ACADEMIC_COORDINATOR'].includes(req.user!.role);

      if (!isOwner && !isPrivileged) {
        res.status(403).json({ success: false, error: 'Acceso no autorizado a este registro' });
        return;
      }

      res.json({
        success: true,
        data: enrollment,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message || 'Error al obtener inscripción' });
    }
  }
);

/**
 * POST /api/v1/continuing-ed/enrollments/:enrollmentId/lessons/:lessonId/complete
 * Registrar lección completada y actualizar porcentaje de avance
 */
continuingEducationRouter.post(
  '/enrollments/:enrollmentId/lessons/:lessonId/complete',
  requireAuth,
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const { enrollmentId, lessonId } = req.params;
      const userId = req.user!.id;

      const progressResult = service.markLessonComplete(enrollmentId, lessonId, userId);

      res.json({
        success: true,
        data: progressResult,
        message: 'Progreso de lección registrado exitosamente',
      });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || 'Error al actualizar progreso' });
    }
  }
);

/**
 * POST /api/v1/continuing-ed/evaluations/:evaluationId/submit
 * Envío de respuestas o proyecto práctico para evaluación
 */
continuingEducationRouter.post(
  '/evaluations/:evaluationId/submit',
  requireAuth,
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const { evaluationId } = req.params;
      const { enrollmentId, submissionContent } = req.body;
      const userId = req.user!.id;

      if (!enrollmentId || !submissionContent) {
        res.status(400).json({ success: false, error: 'enrollmentId y submissionContent son obligatorios' });
        return;
      }

      const submission = service.submitEvaluation(evaluationId, enrollmentId, userId, submissionContent);

      res.status(201).json({
        success: true,
        data: submission,
        message: 'Evaluación enviada para calificación docente',
      });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || 'Error al enviar evaluación' });
    }
  }
);

/**
 * POST /api/v1/continuing-ed/submissions/:submissionId/grade
 * Calificación docente de una entrega práctica o examen
 */
continuingEducationRouter.post(
  '/submissions/:submissionId/grade',
  requireAuth,
  requireRole('ADMIN', 'TEACHER', 'ACADEMIC_COORDINATOR'),
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const { submissionId } = req.params;
      const { score, feedback } = req.body;
      const graderId = req.user!.id;

      if (score === undefined || feedback === undefined) {
        res.status(400).json({ success: false, error: 'score y feedback son requeridos' });
        return;
      }

      const gradeResult = service.gradeEvaluation(submissionId, Number(score), String(feedback), graderId);

      res.json({
        success: true,
        data: gradeResult,
        message: 'Calificación registrada exitosamente',
      });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || 'Error al calificar entrega' });
    }
  }
);

// ==========================================
// 4. CERTIFICACIÓN Y DESCARGO LEGAL
// ==========================================

/**
 * POST /api/v1/continuing-ed/enrollments/:enrollmentId/issue-certificate
 * Emisión formal de certificado de curso con firma hash SHA-256 y descargo Art. 32 MINEDUC
 */
continuingEducationRouter.post(
  '/enrollments/:enrollmentId/issue-certificate',
  requireAuth,
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const { enrollmentId } = req.params;
      const enrollment = service.getEnrollmentById(enrollmentId);

      if (!enrollment) {
        res.status(404).json({ success: false, error: 'Inscripción no encontrada' });
        return;
      }

      // El propio estudiante puede solicitar su certificado una vez cumplidos los requisitos, o un admin/teacher
      const isOwner = enrollment.user_id === req.user!.id;
      const isPrivileged = ['ADMIN', 'TEACHER', 'ACADEMIC_COORDINATOR'].includes(req.user!.role);

      if (!isOwner && !isPrivileged) {
        res.status(403).json({ success: false, error: 'No autorizado para emitir certificado de este usuario' });
        return;
      }

      const cert = service.issueCertificate(enrollmentId, req.user!.id);

      res.status(201).json({
        success: true,
        data: cert,
        message: 'Certificado de formación no formal emitido con firma criptográfica y descargo normativo',
      });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || 'Error al emitir certificado' });
    }
  }
);

/**
 * GET /api/v1/continuing-ed/certificates/verify/:codeOrHash
 * Verificación pública universal de certificados y constancias no formales
 * (Acceso público sin autenticación requerida)
 */
continuingEducationRouter.get('/certificates/verify/:codeOrHash', (req: AuthenticatedRequest, res: Response) => {
  try {
    const { codeOrHash } = req.params;
    const verification = service.verifyCertificate(codeOrHash);

    if (!verification.isValid) {
      res.status(404).json({
        success: false,
        data: verification,
        message: verification.message,
      });
      return;
    }

    res.json({
      success: true,
      data: verification,
      message: 'Certificado auténtico verificado en la Plataforma ALSIZ',
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Error al verificar certificado' });
  }
});

// ==========================================
// 5. INFORMES ANALÍTICOS DE CURSO
// ==========================================

/**
 * GET /api/v1/continuing-ed/courses/:id/report
 * Métricas analíticas de progreso, tasas de finalización y emisión de certificados
 */
continuingEducationRouter.get(
  '/courses/:id/report',
  requireAuth,
  requireRole('ADMIN', 'TEACHER', 'ACADEMIC_COORDINATOR'),
  (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const report = service.getCourseReport(id);

      res.json({
        success: true,
        data: report,
      });
    } catch (err: any) {
      res.status(404).json({ success: false, error: err.message || 'Error al generar informe del curso' });
    }
  }
);
