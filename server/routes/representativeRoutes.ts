import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getDatabaseAdapter } from '../db/dal';
import { AuthenticatedRequest, requireAuth, requireRole } from '../middleware/authMiddleware';
import { recordAuditEvent } from '../middleware/auditMiddleware';
import { hashPassword, hashPin, generateUuid } from '../auth/crypto';
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

/**
 * Esquema para que el representante matricule a un hijo bajo su tutela
 */
const repRegisterStudentSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres.'),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha de nacimiento YYYY-MM-DD requerido.'),
  programId: z.string().min(1, 'Programa educativo requerido.'),
  levelId: z.string().min(1, 'Nivel o grado requerido.'),
  relationshipType: z.enum(['FATHER', 'MOTHER', 'LEGAL_GUARDIAN']).default('LEGAL_GUARDIAN'),
  initialPin: z.string().regex(/^\d{4,6}$/, 'El PIN debe componerse de 4 a 6 dígitos numéricos.').optional(),
  initialPassword: z.string().min(6, 'La contraseña inicial debe tener al menos 6 caracteres.').optional(),
});

/**
 * POST /api/v1/representatives/students
 * Creación de cuenta y matrícula de estudiante realizada directamente por su representante legal verificado
 */
representativeRouter.post(
  '/students',
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

      // 1. Validar que el representante haya firmado el consentimiento informado LOPDP
      const rep = await db.queryOne<{ id: string; consent_lopdp_signed_at: string | null }>(
        'SELECT id, consent_lopdp_signed_at FROM representatives WHERE id = ?',
        [repId]
      );

      if (!rep?.consent_lopdp_signed_at) {
        res.status(400).json({
          success: false,
          error: {
            code: 'REPRESENTATIVE_CONSENT_REQUIRED',
            message: 'Debe firmar el consentimiento de tratamiento de datos personales de menores (LOPDP) antes de matricular a un estudiante.',
          },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const data = repRegisterStudentSchema.parse(req.body);

      // 2. Validar Programa y Nivel
      const program = await db.queryOne<{ id: string; name: string }>(
        'SELECT id, name FROM programs WHERE id = ? OR code = ?',
        [data.programId, data.programId]
      );
      if (!program) {
        res.status(404).json({
          success: false,
          error: { code: 'PROGRAM_NOT_FOUND', message: 'El programa educativo especificado no existe.' },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const level = await db.queryOne<{ id: string; name: string }>(
        'SELECT id, name FROM levels WHERE (id = ? OR code = ?) AND program_id = ?',
        [data.levelId, data.levelId, program.id]
      ) || await db.queryOne<{ id: string; name: string }>(
        'SELECT id, name FROM levels WHERE id = ? OR code = ?',
        [data.levelId, data.levelId]
      );

      if (!level) {
        res.status(404).json({
          success: false,
          error: { code: 'LEVEL_NOT_FOUND', message: 'El nivel/grado académico especificado no existe.' },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      // 3. Generación segura de identificadores y credenciales
      const pin = data.initialPin || Math.floor(1000 + Math.random() * 9000).toString();
      const rawPassword = data.initialPassword || `Alsiz${Math.floor(100000 + Math.random() * 900000)}!`;
      const cleanFirst = data.firstName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanLast = data.lastName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      const randomSuffix = Math.floor(10 + Math.random() * 89);
      const username = `${cleanFirst}.${cleanLast}${randomSuffix}`;
      const email = `${username}@alsiz.local`;
      const studentCode = `STU-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

      const passwordHash = hashPassword(rawPassword);
      const pinHash = hashPin(pin);
      const newUserId = generateUuid();
      const newStudentId = generateUuid();
      const enrollmentId = generateUuid();

      // 4. Escritura en base de datos
      await db.execute(`
        INSERT INTO users (id, email, username, password_hash, role, status, first_name, last_name, avatar_asset_key)
        VALUES (?, ?, ?, ?, 'STUDENT', 'ACTIVE', ?, ?, ?)
      `, [newUserId, email, username, passwordHash, data.firstName.trim(), data.lastName.trim(), 'student_avatar_01']);

      await db.execute(`
        INSERT INTO students (id, user_id, pin_code_hash, student_code, birth_date)
        VALUES (?, ?, ?, ?, ?)
      `, [newStudentId, newUserId, pinHash, studentCode, data.birthDate]);

      await db.execute(`
        INSERT INTO student_representatives (student_id, representative_id, relationship_type, is_primary_contact)
        VALUES (?, ?, ?, 1)
      `, [newStudentId, repId, data.relationshipType]);

      await db.execute(`
        INSERT INTO student_program_enrollments (id, student_id, program_id, level_id, school_year, status)
        VALUES (?, ?, ?, ?, '2026-2027', 'ACTIVE')
      `, [enrollmentId, newStudentId, program.id, level.id]);

      // Asignaturas
      const subjects = await db.query<{ id: string }>(
        'SELECT id FROM subjects WHERE level_id = ? AND program_id = ?',
        [level.id, program.id]
      );
      for (const sub of subjects) {
        await db.execute(`
          INSERT OR IGNORE INTO student_subject_enrollments (id, student_id, subject_id, program_enrollment_id, status)
          VALUES (?, ?, ?, ?, 'ACTIVE')
        `, [generateUuid(), newStudentId, sub.id, enrollmentId]);
      }

      // 5. Auditoría
      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'REPRESENTATIVE_REGISTERED_STUDENT',
        resourceType: 'students',
        resourceId: newStudentId,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: {
          representativeId: repId,
          studentId: newStudentId,
          studentCode,
          username,
          programId: program.id,
          levelId: level.id,
          relationshipType: data.relationshipType,
        },
      });

      res.status(201).json({
        success: true,
        data: {
          student: {
            id: newStudentId,
            userId: newUserId,
            studentCode,
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            username,
            email,
            birthDate: data.birthDate,
            programName: program.name,
            levelName: level.name,
          },
          temporaryCredentials: {
            username,
            email,
            studentCode,
            initialPin: pin,
            initialPassword: rawPassword,
          },
        },
        message: 'Estudiante matriculado y vinculado exitosamente a su tutela.',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/v1/representatives/students/:studentId/academic-summary
 * Anti-BOLA: Retorna resumen académico únicamente si el estudiante está bajo tutela legal del representante
 */
representativeRouter.get(
  '/students/:studentId/academic-summary',
  requireAuth,
  requireRole('REPRESENTATIVE'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const repId = req.user?.representativeId;
      const { studentId } = req.params;

      if (!repId) {
        res.status(403).json({
          success: false,
          error: { code: 'NO_REPRESENTATIVE_PROFILE', message: 'No se encontró perfil de representante para este usuario.' },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      const db = getDatabaseAdapter();

      // Verificación estricta de parentesco / tutela legal (Anti-BOLA)
      const link = await db.queryOne<{ student_id: string }>(
        'SELECT student_id FROM student_representatives WHERE representative_id = ? AND student_id = ?',
        [repId, studentId]
      );

      if (!link) {
        recordAuditEvent({
          userId: req.user?.userId,
          eventType: 'CROSS_FAMILY_ACCESS_BLOCKED',
          resourceType: 'students',
          resourceId: studentId,
          ip: req.ip,
          userAgent: req.get('user-agent'),
          details: { representativeId: repId, targetStudentId: studentId, reason: 'ANTI_BOLA_VIOLATION' },
        });

        res.status(403).json({
          success: false,
          error: {
            code: 'FORBIDDEN_STUDENT_ACCESS',
            message: 'Acceso denegado. No posee autorización legal ni tutela sobre el estudiante solicitado.',
          },
          timestamp: new Date().toISOString(),
        });
        return;
      }

      // Obtener datos del estudiante y sus matrículas
      const student = await db.queryOne<any>(`
        SELECT s.id, s.student_code, s.birth_date, s.motto, u.first_name, u.last_name, u.avatar_asset_key
        FROM students s
        JOIN users u ON u.id = s.user_id
        WHERE s.id = ?
      `, [studentId]);

      const enrollments = await db.query(`
        SELECT p.name as program_name, l.name as level_name, e.school_year, e.status
        FROM student_program_enrollments e
        JOIN programs p ON p.id = e.program_id
        JOIN levels l ON l.id = e.level_id
        WHERE e.student_id = ?
      `, [studentId]);

      res.json({
        success: true,
        data: {
          student,
          enrollments,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

