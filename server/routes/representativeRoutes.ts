import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getDatabaseAdapter } from '../db/dal';
import { AuthenticatedRequest, requireAuth, requireRole } from '../middleware/authMiddleware';
import { recordAuditEvent } from '../middleware/auditMiddleware';
import crypto from 'node:crypto';

export const representativeRouter = Router();

const consentSchema = z.object({
  consentAccepted: z.literal(true, {
    message: 'Debe aceptar los términos de tratamiento de datos LOPDP.',
  }),
  documentVersion: z.string().default('LOPDP-2026-V1'),
});

/**
 * GET /api/v1/representatives/my-family
 * Retorna los estudiantes legalmente vinculados al representante autenticado
 */
representativeRouter.get(
  '/my-family',
  requireAuth,
  requireRole('REPRESENTATIVE'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const repId = req.user?.representativeId;
      if (!repId) {
        res.status(403).json({
          success: false,
          error: { code: 'NO_REPRESENTATIVE_PROFILE', message: 'No se encontró perfil de representante para este usuario.' },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const db = getDatabaseAdapter();
      const query = `
        SELECT 
          s.id,
          s.student_code,
          s.birth_date,
          s.motto,
          u.first_name,
          u.last_name,
          u.avatar_asset_key,
          sr.relationship_type,
          sr.is_primary_contact
        FROM student_representatives sr
        JOIN students s ON s.id = sr.student_id
        JOIN users u ON u.id = s.user_id
        WHERE sr.representative_id = ?
      `;

      const familyMembers = await db.query(query, [repId]);

      // Complementar cada hijo con sus matrículas activas
      const enrichedStudents = await Promise.all(
        familyMembers.map(async (student: any) => {
          const enrollments = await db.query(
            `
              SELECT p.name as program_name, l.name as level_name, e.school_year
              FROM student_program_enrollments e
              JOIN programs p ON p.id = e.program_id
              JOIN levels l ON l.id = e.level_id
              WHERE e.student_id = ? AND e.status = 'ACTIVE'
            `,
            [student.id]
          );

          return {
            id: student.id,
            studentCode: student.student_code,
            firstName: student.first_name,
            lastName: student.last_name,
            birthDate: student.birth_date,
            relationship: student.relationship_type,
            isPrimaryContact: Boolean(student.is_primary_contact),
            avatarUrl: student.avatar_asset_key ? `/avatars/${student.avatar_asset_key}.png` : undefined,
            enrollments,
          };
        })
      );

      res.json({
        success: true,
        data: {
          representativeId: repId,
          totalChildren: enrichedStudents.length,
          children: enrichedStudents,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/v1/representatives/consent
 * Firma formal del consentimiento informado de tratamiento de datos de menores (Art. 21 y 22 LOPDP)
 */
representativeRouter.post(
  '/consent',
  requireAuth,
  requireRole('REPRESENTATIVE'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const repId = req.user?.representativeId;
      const { documentVersion } = consentSchema.parse(req.body);

      const db = getDatabaseAdapter();
      const signedAt = new Date().toISOString();
      const docHash = crypto
        .createHash('sha256')
        .update(`${repId}:${documentVersion}:${signedAt}`)
        .digest('hex');

      await db.execute(
        `
        UPDATE representatives
        SET consent_lopdp_signed_at = ?, consent_document_hash = ?
        WHERE id = ?;
      `,
        [signedAt, docHash, repId]
      );

      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'CONSENT_SIGNED',
        resourceType: 'representatives',
        resourceId: repId,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { documentVersion, documentHash: docHash, signedAt },
      });

      res.json({
        success: true,
        data: {
          message: 'Consentimiento informado registrado exitosamente conforme a la LOPDP.',
          signedAt,
          documentHash: docHash,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);
