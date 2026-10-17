import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getDatabaseAdapter } from '../db/dal';
import {
  AuthenticatedRequest,
  requireAuth,
  requireStudentAccess,
} from '../middleware/authMiddleware';
import { recordAuditEvent } from '../middleware/auditMiddleware';

export const studentRouter = Router();

const updateProfileSchema = z.object({
  motto: z.string().max(255).optional(),
  colorThemeJson: z.string().optional(),
});

/**
 * GET /api/v1/students/:studentId
 * Obtiene el expediente y perfil del alumno.
 * Protegido contra IDOR: Solo el propio alumno, sus padres vinculados o admin pueden consultarlo.
 */
studentRouter.get(
  '/:studentId',
  requireAuth,
  requireStudentAccess,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { studentId } = req.params;
      const db = getDatabaseAdapter();

      const query = `
        SELECT 
          s.id,
          s.student_code,
          s.birth_date,
          s.motto,
          s.color_theme_json,
          u.first_name,
          u.last_name,
          u.email,
          u.avatar_asset_key
        FROM students s
        JOIN users u ON u.id = s.user_id
        WHERE s.id = ? OR s.student_code = ?
      `;

      const student = await db.queryOne(query, [studentId, studentId]);
      if (!student) {
        res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'Estudiante no encontrado.' },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      // Matrículas activas
      const enrollmentsQuery = `
        SELECT 
          e.id as enrollment_id,
          p.name as program_name,
          p.code as program_code,
          l.name as level_name,
          l.code as level_code,
          e.school_year,
          e.status
        FROM student_program_enrollments e
        JOIN programs p ON p.id = e.program_id
        JOIN levels l ON l.id = e.level_id
        WHERE e.student_id = ? AND e.status = 'ACTIVE'
      `;
      const enrollments = await db.query(enrollmentsQuery, [student.id]);

      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'STUDENT_DATA_VIEW',
        resourceType: 'students',
        resourceId: student.id,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { requesterRole: req.user?.role },
      });

      res.json({
        success: true,
        data: {
          id: student.id,
          studentCode: student.student_code,
          firstName: student.first_name,
          lastName: student.last_name,
          email: student.email,
          birthDate: student.birth_date,
          motto: student.motto,
          colorTheme: student.color_theme_json ? JSON.parse(student.color_theme_json) : null,
          avatarUrl: student.avatar_asset_key ? `/avatars/${student.avatar_asset_key}.png` : undefined,
          enrollments,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/v1/students/:studentId/subjects
 * Malla de asignaturas del estudiante. Protegido contra IDOR.
 */
studentRouter.get(
  '/:studentId/subjects',
  requireAuth,
  requireStudentAccess,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { studentId } = req.params;
      const db = getDatabaseAdapter();

      // Resolver ID canónico
      const stu = await db.queryOne<{ id: string }>('SELECT id FROM students WHERE id = ? OR student_code = ?', [studentId, studentId]);
      if (!stu) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Estudiante no encontrado.' } });
        return;
      }

      const subjectsQuery = `
        SELECT 
          s.id,
          s.code,
          s.name,
          s.category,
          s.weekly_hours,
          u.first_name as teacher_first_name,
          u.last_name as teacher_last_name
        FROM subjects s
        JOIN student_program_enrollments e ON e.level_id = s.level_id AND e.program_id = s.program_id
        LEFT JOIN users u ON u.id = s.default_teacher_id
        WHERE e.student_id = ? AND e.status = 'ACTIVE'
      `;

      const subjects = await db.query(subjectsQuery, [stu.id]);

      res.json({
        success: true,
        data: {
          studentId: stu.id,
          subjects,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/v1/students/:studentId/submissions
 * Entregas y notas del estudiante. Protegido contra IDOR.
 */
studentRouter.get(
  '/:studentId/submissions',
  requireAuth,
  requireStudentAccess,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { studentId } = req.params;
      const db = getDatabaseAdapter();

      const stu = await db.queryOne<{ id: string }>('SELECT id FROM students WHERE id = ? OR student_code = ?', [studentId, studentId]);
      if (!stu) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Estudiante no encontrado.' } });
        return;
      }

      const submissionsQuery = `
        SELECT 
          sub.id,
          sub.submission_text,
          sub.attachment_asset_key,
          sub.status,
          sub.score,
          sub.qualitative_feedback,
          sub.submitted_at,
          sub.evaluated_at,
          ev.title as evaluation_title,
          ev.max_score,
          ev.evaluation_type
        FROM student_submissions sub
        JOIN evaluations ev ON ev.id = sub.evaluation_id
        WHERE sub.student_id = ?
        ORDER BY sub.submitted_at DESC
      `;

      const submissions = await db.query(submissionsQuery, [stu.id]);

      res.json({
        success: true,
        data: {
          studentId: stu.id,
          submissions,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PUT /api/v1/students/:studentId/profile
 * Actualización de preferencias personales (motto, tema de color). Protegido contra IDOR.
 */
studentRouter.put(
  '/:studentId',
  requireAuth,
  requireStudentAccess,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { studentId } = req.params;
      const validated = updateProfileSchema.parse(req.body);
      const db = getDatabaseAdapter();

      const stu = await db.queryOne<{ id: string }>('SELECT id FROM students WHERE id = ? OR student_code = ?', [studentId, studentId]);
      if (!stu) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Estudiante no encontrado.' } });
        return;
      }

      if (validated.motto !== undefined || validated.colorThemeJson !== undefined) {
        await db.execute(
          `
          UPDATE students 
          SET motto = COALESCE(?, motto), color_theme_json = COALESCE(?, color_theme_json)
          WHERE id = ?
        `,
          [validated.motto ?? null, validated.colorThemeJson ?? null, stu.id]
        );
      }

      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'STUDENT_PROFILE_UPDATED',
        resourceType: 'students',
        resourceId: stu.id,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { fieldsUpdated: Object.keys(validated) },
      });

      res.json({
        success: true,
        data: { message: 'Perfil de estudiante actualizado correctamente.' },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

