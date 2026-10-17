import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { academicService } from '../academic/academicService';
import {
  AuthenticatedRequest,
  requireAuth,
  requireRole,
  requireStudentAccess,
} from '../middleware/authMiddleware';
import { recordAuditEvent } from '../middleware/auditMiddleware';
import { getDatabaseAdapter } from '../db/dal';

export const academicRouter = Router();

// ==========================================
// SCHEMAS DE VALIDACIÓN ZOD
// ==========================================

const programSchema = z.object({
  code: z.string().min(2).max(32),
  name: z.string().min(3).max(150),
  programType: z.enum(['K12_HOMESCHOOL', 'DISCIPLESHIP', 'CONTINUING_ED', 'SUMMER_CAMP']),
  description: z.string().max(1000).optional(),
  isActive: z.boolean().optional(),
});

const levelSchema = z.object({
  programId: z.string(),
  code: z.string().min(2).max(32),
  name: z.string().min(3).max(100),
  orderIndex: z.number().int().min(1),
  minRecommendedAge: z.number().int().min(3).max(25).optional(),
});

const periodSchema = z.object({
  code: z.string().min(2).max(32),
  name: z.string().min(3).max(100),
  schoolYear: z.string().min(4).max(32),
  trimesterNumber: z.number().int().min(1).max(3).optional(),
  startDate: z.string(),
  endDate: z.string(),
  isCurrent: z.boolean().optional(),
});

const subjectSchema = z.object({
  programId: z.string(),
  levelId: z.string(),
  code: z.string().min(2).max(32),
  name: z.string().min(3).max(150),
  category: z.enum(['TRONCAL_MINEDUC', 'FORMACION_CRISTIANA', 'COMPLEMENTARIA', 'AMPLIACION_INTERNACIONAL']),
  weeklyHours: z.number().int().min(1).max(20).optional(),
  defaultTeacherId: z.string().optional(),
});

const enrollmentSchema = z.object({
  studentId: z.string(),
  programId: z.string(),
  levelId: z.string(),
  schoolYear: z.string().default('2026-2027'),
});

const subjectEnrollmentSchema = z.object({
  studentId: z.string(),
  subjectId: z.string(),
  programEnrollmentId: z.string().optional(),
});

const competencySchema = z.object({
  officialCode: z.string().min(2).max(32),
  title: z.string().min(3).max(255),
  description: z.string().min(5),
  domainCategory: z.enum(['COMUNICACIONAL', 'MATEMATICA', 'DIGITAL', 'SOCIOEMOCIONAL', 'ESPIRITUAL']),
  sourceStandard: z.string().min(2).max(64),
});

const unitSchema = z.object({
  unitNumber: z.number().int().min(1),
  trimesterNumber: z.number().int().min(1).max(3),
  title: z.string().min(3).max(200),
  learningAxis: z.string().optional(),
});

const lessonSchema = z.object({
  dayNumber: z.number().int().min(1),
  title: z.string().min(3).max(200),
  socraticQuestion: z.string().min(5),
  dynamicActivity: z.string().min(5),
  contentMarkdown: z.string().min(10),
  labType: z.string().optional(),
});

const resourceSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().optional(),
  resourceType: z.enum(['PDF', 'VIDEO', 'LINK', 'WORKSHEET', 'INTERACTIVE_LAB', 'PHET_SIMULATION', 'SCRIPTURE_REFERENCE']),
  urlOrKey: z.string().min(3),
  language: z.enum(['es', 'en', 'bilingual']).default('es'),
  isTranslated: z.boolean().default(true),
  fallbackLanguage: z.string().default('es'),
  orderIndex: z.number().int().default(1),
});

const evaluationSchema = z.object({
  title: z.string().min(3).max(200),
  evaluationType: z.enum(['PROJECT_RUBRIC', 'QUIZ_ADAPTIVE', 'SOCRATIC_DIALOGUE', 'PORTFOLIO_EVIDENCE']),
  maxScore: z.number().min(1).max(100).default(10.0),
  rubricDefinitionJson: z.string().optional(),
  isMineducEvidence: z.boolean().default(false),
  dueDate: z.string().optional(),
  instructions: z.string().optional(),
  passingScore: z.number().min(1).max(100).default(7.0),
  competencyId: z.string().optional(),
});

const submissionSchema = z.object({
  studentId: z.string().optional(),
  submissionText: z.string().optional(),
  attachmentAssetKey: z.string().optional(),
});

const evaluationGradingSchema = z.object({
  score: z.number().min(0).max(100),
  qualitativeFeedback: z.string().min(3),
  rubricScores: z.record(z.string(), z.number()).optional(),
  changeReason: z.string().min(3),
});

const calendarEventSchema = z.object({
  periodId: z.string().optional(),
  programId: z.string().optional(),
  subjectId: z.string().optional(),
  title: z.string().min(3).max(200),
  description: z.string().optional(),
  eventType: z.enum(['CLASS_DAY', 'EXAM_PERIOD', 'HOLIDAY', 'EVALUATION_DEADLINE', 'PARENT_MEETING', 'INSTITUTIONAL']),
  startDate: z.string(),
  endDate: z.string(),
  isMandatory: z.boolean().optional(),
});

// ==========================================
// 1. RUTAS DE PROGRAMAS Y NIVELES
// ==========================================

academicRouter.get(
  '/programs',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const activeOnly = req.query.activeOnly === 'true';
      const programType = req.query.programType as string;
      const page = req.query.page ? Number(req.query.page) : undefined;
      const limit = req.query.limit ? Number(req.query.limit) : undefined;

      const result = await academicService.getPrograms({ activeOnly, programType, page, limit });
      res.json({ success: true, ...result, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.post(
  '/programs',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = programSchema.parse(req.body);
      const program = await academicService.createProgram(validated);

      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'ACADEMIC_PROGRAM_CREATED',
        resourceType: 'programs',
        resourceId: (program as any)?.id,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { code: validated.code, name: validated.name },
      });

      res.status(201).json({ success: true, data: program, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.post(
  '/levels',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = levelSchema.parse(req.body);
      const level = await academicService.createLevel(validated);
      res.status(201).json({ success: true, data: level, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.get(
  '/programs/:programId/levels',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const levels = await academicService.getLevelsByProgram(req.params.programId);
      res.json({ success: true, data: levels, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.get(
  '/periods',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const schoolYear = req.query.schoolYear as string;
      const periods = await academicService.getAcademicPeriods(schoolYear);
      res.json({ success: true, data: periods, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.post(
  '/periods',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = periodSchema.parse(req.body);
      const period = await academicService.createAcademicPeriod(validated);
      res.status(201).json({ success: true, data: period, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

// ==========================================
// 2. RUTAS DE ASIGNATURAS Y MALLA
// ==========================================

academicRouter.get(
  '/subjects',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const programId = req.query.programId as string;
      const levelId = req.query.levelId as string;
      const category = req.query.category as string;
      const search = req.query.search as string;
      const page = req.query.page ? Number(req.query.page) : undefined;
      const limit = req.query.limit ? Number(req.query.limit) : undefined;

      const result = await academicService.getSubjects({ programId, levelId, category, search, page, limit });
      res.json({ success: true, ...result, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.post(
  '/subjects',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = subjectSchema.parse(req.body);
      const subject = await academicService.createSubject(validated);

      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'ACADEMIC_SUBJECT_CREATED',
        resourceType: 'subjects',
        resourceId: (subject as any)?.id,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { code: validated.code, name: validated.name },
      });

      res.status(201).json({ success: true, data: subject, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.get(
  '/subjects/:subjectId',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const subject = await academicService.getSubjectById(req.params.subjectId);
      if (!subject) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Asignatura no encontrada.' } });
        return;
      }
      res.json({ success: true, data: subject, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.put(
  '/subjects/:subjectId',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const partialSubjectSchema = subjectSchema.partial();
      const validated = partialSubjectSchema.parse(req.body);
      const updated = await academicService.updateSubject(req.params.subjectId, validated);

      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'ACADEMIC_SUBJECT_UPDATED',
        resourceType: 'subjects',
        resourceId: (updated as any)?.id,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { code: (updated as any)?.code, name: (updated as any)?.name },
      });

      res.json({ success: true, data: updated, timestamp: new Date().toISOString() });
    } catch (err: any) {
      if (err.message && err.message.startsWith('NOT_FOUND:')) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: err.message } });
        return;
      }
      next(err);
    }
  }
);

// ==========================================
// 3. MATRICULACIÓN DE ESTUDIANTES
// ==========================================

academicRouter.post(
  '/enrollments',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = enrollmentSchema.parse(req.body);
      const enrollment = await academicService.enrollStudentInProgram(validated);

      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'STUDENT_ENROLLED_PROGRAM',
        resourceType: 'student_program_enrollments',
        resourceId: (enrollment as any)?.id,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { studentId: validated.studentId, programId: validated.programId, levelId: validated.levelId },
      });

      res.status(201).json({ success: true, data: enrollment, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.post(
  '/subject-enrollments',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = subjectEnrollmentSchema.parse(req.body);
      const enrollment = await academicService.enrollStudentInSubject(validated);
      res.status(201).json({ success: true, data: enrollment, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.get(
  '/students/:studentId/enrollments',
  requireAuth,
  requireStudentAccess,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const enrollments = await academicService.getStudentSubjectEnrollments(req.params.studentId);
      res.json({ success: true, data: enrollments, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

// ==========================================
// 4. UNIDADES, LECCIONES, COMPETENCIAS Y RECURSOS
// ==========================================

academicRouter.post(
  '/subjects/:subjectId/competencies',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = competencySchema.parse(req.body);
      const comp = await academicService.createCompetency({ ...validated, subjectId: req.params.subjectId });
      res.status(201).json({ success: true, data: comp, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.get(
  '/subjects/:subjectId/competencies',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const compList = await academicService.getCompetenciesBySubject(req.params.subjectId);
      res.json({ success: true, data: compList, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.post(
  '/subjects/:subjectId/units',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = unitSchema.parse(req.body);
      const unit = await academicService.createUnit({ ...validated, subjectId: req.params.subjectId });
      res.status(201).json({ success: true, data: unit, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.get(
  '/subjects/:subjectId/units',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const units = await academicService.getUnitsBySubject(req.params.subjectId);
      res.json({ success: true, data: units, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.post(
  '/units/:unitId/lessons',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = lessonSchema.parse(req.body);
      const lesson = await academicService.createLesson({ ...validated, unitId: req.params.unitId });
      res.status(201).json({ success: true, data: lesson, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.get(
  '/units/:unitId/lessons',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const lessons = await academicService.getLessonsByUnit(req.params.unitId);
      res.json({ success: true, data: lessons, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.get(
  '/lessons/:lessonId',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const lesson = await academicService.getLessonById(req.params.lessonId);
      if (!lesson) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Lección no encontrada.' } });
        return;
      }
      res.json({ success: true, data: lesson, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.post(
  '/lessons/:lessonId/resources',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = resourceSchema.parse(req.body);
      const resource = await academicService.createResource({ ...validated, dailyClassId: req.params.lessonId });
      res.status(201).json({ success: true, data: resource, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.get(
  '/lessons/:lessonId/resources',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const lang = (req.query.lang as string) || 'es';
      const resources = await academicService.getLessonResources(req.params.lessonId, lang);
      res.json({
        success: true,
        requestedLanguage: lang,
        data: resources,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

// ==========================================
// 5. EVALUACIONES, ENTREGAS Y CALIFICACIONES
// ==========================================

academicRouter.post(
  '/lessons/:lessonId/evaluations',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = evaluationSchema.parse(req.body);
      const evaluation = await academicService.createEvaluation({ ...validated, dailyClassId: req.params.lessonId });
      res.status(201).json({ success: true, data: evaluation, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.get(
  '/evaluations/:evaluationId',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const ev = await academicService.getEvaluationById(req.params.evaluationId);
      if (!ev) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Evaluación no encontrada.' } });
        return;
      }
      res.json({ success: true, data: ev, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.post(
  '/evaluations/:evaluationId/submissions',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = submissionSchema.parse(req.body);

      // Determinar studentId efectivo: si el usuario es STUDENT, debe ser su propio student_id
      let effectiveStudentId = validated.studentId;
      if (req.user?.role === 'STUDENT') {
        effectiveStudentId = req.user.studentId;
      } else if (!effectiveStudentId) {
        res.status(400).json({
          success: false,
          error: { code: 'BAD_REQUEST', message: 'Falta especificar studentId en la entrega.' },
        });
        return;
      }

      // Si el rol es REPRESENTATIVE, verificar vínculo
      if (req.user?.role === 'REPRESENTATIVE') {
        const db = getDatabaseAdapter();
        const link = await db.queryOne(`
          SELECT 1 FROM student_representatives WHERE student_id = ? AND representative_id = ?
        `, [effectiveStudentId, req.user.representativeId]);
        if (!link) {
          res.status(403).json({
            success: false,
            error: { code: 'FORBIDDEN_FAMILY_ACCESS', message: 'No tiene autorización familiar para entregar por este estudiante.' },
          });
          return;
        }
      }

      const submission = await academicService.submitActivity({
        studentId: effectiveStudentId!,
        evaluationId: req.params.evaluationId,
        submissionText: validated.submissionText,
        attachmentAssetKey: validated.attachmentAssetKey,
      });

      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'STUDENT_ACTIVITY_SUBMITTED',
        resourceType: 'student_submissions',
        resourceId: (submission as any)?.id,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { evaluationId: req.params.evaluationId, studentId: effectiveStudentId },
      });

      res.status(201).json({ success: true, data: submission, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.post(
  '/submissions/:submissionId/evaluate',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = evaluationGradingSchema.parse(req.body);

      const result = await academicService.evaluateSubmission({
        submissionId: req.params.submissionId,
        evaluatorUserId: req.user!.userId,
        score: validated.score,
        qualitativeFeedback: validated.qualitativeFeedback,
        rubricScores: validated.rubricScores,
        changeReason: validated.changeReason,
      });

      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'STUDENT_SUBMISSION_GRADED',
        resourceType: 'student_submissions',
        resourceId: req.params.submissionId,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { score: validated.score, changeReason: validated.changeReason },
      });

      res.json({ success: true, data: result, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.get(
  '/submissions/:submissionId/history',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const history = await academicService.getSubmissionGradeHistory(req.params.submissionId);
      res.json({ success: true, data: history, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

// ==========================================
// 6. SEGUIMIENTO DE COMPETENCIAS Y REPORTES
// ==========================================

academicRouter.get(
  '/students/:studentId/competencies-progress',
  requireAuth,
  requireStudentAccess,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const subjectId = req.query.subjectId as string;
      const progress = await academicService.getStudentCompetencyProgress(req.params.studentId, subjectId);
      res.json({ success: true, data: progress, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.get(
  '/students/:studentId/report-card',
  requireAuth,
  requireStudentAccess,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const schoolYear = (req.query.schoolYear as string) || '2026-2027';
      const report = await academicService.generateStudentAcademicReport(req.params.studentId, schoolYear);
      res.json({ success: true, data: report, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

// ==========================================
// 7. CALENDARIO ACADÉMICO
// ==========================================

academicRouter.get(
  '/calendar/events',
  requireAuth,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const periodId = req.query.periodId as string;
      const programId = req.query.programId as string;
      const subjectId = req.query.subjectId as string;
      const eventType = req.query.eventType as string;
      const fromDate = req.query.fromDate as string;
      const toDate = req.query.toDate as string;

      const events = await academicService.getCalendarEvents({
        periodId,
        programId,
        subjectId,
        eventType,
        fromDate,
        toDate,
      });

      res.json({ success: true, data: events, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

academicRouter.post(
  '/calendar/events',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const validated = calendarEventSchema.parse(req.body);
      const event = await academicService.createCalendarEvent(validated);
      res.status(201).json({ success: true, data: event, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  }
);

