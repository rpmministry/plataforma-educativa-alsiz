/**
 * ==============================================================================
 * Servicio de Supervisión Humana (Human-in-the-Loop) (ETAPA-08)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 * Todo material educativo, guía o reto generado por agentes de IA
 * inicia en estado DRAFT_REVIEW y requiere aprobación explícita de un docente.
 */

import crypto from 'node:crypto';
import { getDb } from '../db/database';
import { AIGeneratedMaterial } from './types';

export class HumanSupervisionService {
  /**
   * Propone un nuevo material didáctico generado por un agente (estado DRAFT_REVIEW)
   */
  public static proposeMaterial(input: {
    title: string;
    contentMarkdown: string;
    agentId: string;
    subjectId?: string;
    targetLevelId?: string;
  }): AIGeneratedMaterial {
    const db = getDb();
    const materialId = `mat-gen-${crypto.randomUUID().slice(0, 12)}`;

    db.prepare(`
      INSERT INTO ai_generated_materials (
        id, title, content_markdown, agent_id, subject_id, target_level_id, status
      ) VALUES (?, ?, ?, ?, ?, ?, 'DRAFT_REVIEW')
    `).run(
      materialId,
      input.title,
      input.contentMarkdown,
      input.agentId,
      input.subjectId || null,
      input.targetLevelId || null
    );

    return db.prepare('SELECT * FROM ai_generated_materials WHERE id = ?').get(materialId) as unknown as AIGeneratedMaterial;
  }

  /**
   * Obtiene un material por ID
   */
  public static getMaterialById(id: string): AIGeneratedMaterial | null {
    const db = getDb();
    const row = db.prepare('SELECT * FROM ai_generated_materials WHERE id = ?').get(id) as unknown as AIGeneratedMaterial | undefined;
    return row || null;
  }

  /**
   * Lista materiales generados con filtro opcional por estado
   */
  public static listMaterials(status?: 'DRAFT_REVIEW' | 'APPROVED_PUBLISHED' | 'REJECTED'): AIGeneratedMaterial[] {
    const db = getDb();
    if (status) {
      return db.prepare('SELECT * FROM ai_generated_materials WHERE status = ? ORDER BY created_at DESC').all(status) as unknown as AIGeneratedMaterial[];
    }
    return db.prepare('SELECT * FROM ai_generated_materials ORDER BY created_at DESC').all() as unknown as AIGeneratedMaterial[];
  }

  /**
   * Revisa formalmente un material (Aprobación o Rechazo por Docente o Admin)
   */
  public static reviewMaterial(
    materialId: string,
    newStatus: 'APPROVED_PUBLISHED' | 'REJECTED',
    teacherUserId: string,
    reviewNotes: string
  ): AIGeneratedMaterial {
    const db = getDb();
    const mat = this.getMaterialById(materialId);
    if (!mat) {
      throw new Error(`NOT_FOUND: Material generado ${materialId} no encontrado.`);
    }

    db.prepare(`
      UPDATE ai_generated_materials
      SET status = ?,
          reviewed_by_user_id = ?,
          review_notes = ?,
          updated_at = datetime('now')
      WHERE id = ?
    `).run(newStatus, teacherUserId, reviewNotes, materialId);

    return this.getMaterialById(materialId)!;
  }
}

