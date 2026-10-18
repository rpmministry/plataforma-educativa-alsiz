/**
 * ==============================================================================
 * Importador Controlado de Progreso LocalStorage
 * Plataforma Educativa ALSIZ — Ekballo Church
 * ==============================================================================
 */

import { DatabaseSync } from 'node:sqlite';
import crypto from 'node:crypto';
import { z } from 'zod';

export const LocalProgressSchema = z.object({
  version: z.literal('1.0'),
  exportedAt: z.string(),
  sourceOrigin: z.string().optional(),
  userAgent: z.string().optional(),
  students: z.array(z.any()).default([]),
  completedClasses: z.array(z.object({
    classId: z.string(),
    studentId: z.string().optional(),
    isCompleted: z.boolean(),
    completedActivities: z.array(z.string()).default([]),
  })).default([]),
  submissions: z.array(z.object({
    id: z.string(),
    studentId: z.string(),
    classId: z.string().optional(),
    assignmentId: z.string().optional(),
    content: z.string().optional(),
    submittedAt: z.string().optional(),
    score: z.number().optional(),
  })).default([]),
  customAvatars: z.record(z.string(), z.string()).default({}),
  microRouteProgress: z.record(z.string(), z.array(z.number())).default({}),
  guideNotes: z.array(z.object({
    key: z.string(),
    studentId: z.string().optional(),
    classId: z.string().optional(),
    dateKey: z.string().optional(),
    data: z.any(),
  })).default([]),
});

export type LocalProgressData = z.infer<typeof LocalProgressSchema>;

export interface ProgressImportStats {
  dryRun: boolean;
  completedClassesFound: number;
  completedClassesMapped: number;
  submissionsFound: number;
  submissionsInserted: number;
  avatarsUpdated: number;
  guidesFound: number;
  skipped: number;
  errors: string[];
}

export class LocalProgressImporter {
  /**
   * Valida e importa un archivo de exportación de progreso de localStorage en la base de datos.
   */
  public importProgress(db: DatabaseSync, rawJson: unknown, options: { dryRun?: boolean; actorUserId?: string } = {}): ProgressImportStats {
    const { dryRun = true, actorUserId = 'usr-admin-01' } = options;

    const stats: ProgressImportStats = {
      dryRun,
      completedClassesFound: 0,
      completedClassesMapped: 0,
      submissionsFound: 0,
      submissionsInserted: 0,
      avatarsUpdated: 0,
      guidesFound: 0,
      skipped: 0,
      errors: [],
    };

    const parsed = LocalProgressSchema.safeParse(rawJson);
    if (!parsed.success) {
      stats.errors.push(`Esquema inválido: ${parsed.error.message}`);
      return stats;
    }

    const data = parsed.data;
    stats.completedClassesFound = data.completedClasses.length;
    stats.submissionsFound = data.submissions.length;
    stats.guidesFound = data.guideNotes.length;

    if (dryRun) {
      stats.completedClassesMapped = data.completedClasses.length;
      stats.submissionsInserted = data.submissions.length;
      stats.avatarsUpdated = Object.keys(data.customAvatars).length;
      return stats;
    }

    db.exec('BEGIN TRANSACTION;');
    try {
      // 1. Mapeo y actualización de avatares
      for (const [studentKey, avatarUrl] of Object.entries(data.customAvatars)) {
        const studentRow = db.prepare(`
          SELECT s.id, s.user_id 
          FROM students s
          JOIN users u ON s.user_id = u.id
          WHERE s.id LIKE ? OR u.username LIKE ?
        `).get(`%${studentKey}%`, `%${studentKey}%`) as { id: string; user_id: string } | undefined;

        if (studentRow && avatarUrl) {
          db.prepare('UPDATE users SET avatar_asset_key = ?, updated_at = datetime(\'now\') WHERE id = ?')
            .run(avatarUrl, studentRow.user_id);
          stats.avatarsUpdated++;
        }
      }

      // 2. Mapeo de Submissions (si existen en el dispositivo)
      for (const sub of data.submissions) {
        // Encontrar estudiante en BD
        const studentRow = db.prepare(`
          SELECT s.id 
          FROM students s
          JOIN users u ON s.user_id = u.id
          WHERE s.id LIKE ? OR u.username LIKE ?
        `).get(`%${sub.studentId}%`, `%${sub.studentId}%`) as { id: string } | undefined;

        if (!studentRow) {
          stats.skipped++;
          continue;
        }

        // Encontrar evaluación asociada a la clase
        let evalId: string | null = null;
        if (sub.classId) {
          const evalRow = db.prepare(`
            SELECT id FROM evaluations 
            WHERE daily_class_id LIKE ? OR id LIKE ?
            LIMIT 1
          `).get(`%${sub.classId}%`, `%${sub.classId}%`) as { id: string } | undefined;
          if (evalRow) evalId = evalRow.id;
        }

        if (evalId) {
          const subId = `sub-mig-${sub.id || crypto.randomBytes(6).toString('hex')}`;
          db.prepare(`
            INSERT INTO student_submissions (id, student_id, evaluation_id, submission_text, status, score, submitted_at)
            VALUES (?, ?, ?, ?, 'SUBMITTED', ?, ?)
            ON CONFLICT(id) DO UPDATE SET
              submission_text = excluded.submission_text;
          `).run(
            subId,
            studentRow.id,
            evalId,
            sub.content || 'Evidencia migrada desde dispositivo físico local',
            sub.score !== undefined ? sub.score : null,
            sub.submittedAt || new Date().toISOString()
          );
          stats.submissionsInserted++;
        } else {
          stats.skipped++;
        }
      }

      // 3. Auditoría de importación
      const auditId = `aud-prog-imp-${crypto.randomBytes(6).toString('hex')}`;
      db.prepare(`
        INSERT INTO audit_events (id, user_id, event_type, resource_type, resource_id, ip_hash, user_agent, details_json)
        VALUES (?, ?, 'LOCAL_PROGRESS_IMPORTED', 'students', 'multi-students', ?, 'ALSIZ_Progress_Importer/1.0', ?)
      `).run(
        auditId,
        actorUserId,
        crypto.createHash('sha256').update('127.0.0.1').digest('hex'),
        JSON.stringify({
          action: 'IMPORT_LOCAL_DEVICE_PROGRESS',
          completedClassesFound: stats.completedClassesFound,
          submissionsInserted: stats.submissionsInserted,
          avatarsUpdated: stats.avatarsUpdated,
          exportedAt: data.exportedAt,
          sourceOrigin: data.sourceOrigin,
        })
      );

      db.exec('COMMIT;');
    } catch (err: any) {
      db.exec('ROLLBACK;');
      stats.errors.push(err.message || String(err));
      throw err;
    }

    return stats;
  }
}
