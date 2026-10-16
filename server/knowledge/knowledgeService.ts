/**
 * ==============================================================================
 * Servicio de Dominio: Centro de Conocimiento y Matrices Temáticas (ETAPA-07)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 * Responsabilidades:
 * 1. Catálogo editorial con metadatos completos, licencias, autorías y familias de agentes.
 * 2. Deduplicación criptográfica (SHA-256) y validación de tipos y tamaños.
 * 3. Extracción y segmentación inteligente (chunking) con etiquetas de citación formal.
 * 4. Indexación en SQLite FTS5 con algoritmo BM25 y filtrado facetado.
 * 5. Ciclo de vida editorial estricto: PENDIENTE -> EN_REVISION -> APROBADO / RECHAZADO / DESACTIVADO.
 *    (Ningún recurso nuevo se auto-aprueba).
 * 6. RETIRADA EFECTIVA: Desactivación inmediata que excluye la fuente de todo retrieval de IA.
 * 7. Registro de conflictos doctrinales/curriculares y auditoría inmutable de cambios.
 */

import crypto from 'node:crypto';
import { getDb } from '../db/database';

export type KnowledgeSourceStatus =
  | 'PENDIENTE'
  | 'EN_REVISION'
  | 'APROBADO'
  | 'RECHAZADO'
  | 'DESACTIVADO'
  | 'ERROR';

export type SourceType =
  | 'OFICIAL_MINEDUC'
  | 'DOCTRINAL_EKBALLO'
  | 'EDITORIAL_EXTERNA'
  | 'RECURSO_ABIERTO';

export type FormatType =
  | 'DOCUMENT_MD'
  | 'DOCUMENT_TXT'
  | 'DOCUMENT_PDF'
  | 'DOCUMENT_DOCX'
  | 'URL_REFERENCE'
  | 'MEDIA_REFERENCE';

export type TargetAgentFamily =
  | 'SOCRATIC_TUTOR'
  | 'ESSAY_EVALUATOR'
  | 'LESSON_PLANNER'
  | 'GENERAL_KNOWLEDGE';

export type TrustLevel =
  | 'CANONICAL_ALTO'
  | 'VERIFICADO_MEDIO'
  | 'SUPLEMENTARIO_BAJO';

export type LicenseType =
  | 'CREATIVE_COMMONS'
  | 'PROPIETARIO_EKBALLO'
  | 'DOMINIO_PUBLICO_MINEDUC'
  | 'USO_EDUCATIVO_AUTORIZADO';

export interface KnowledgeSource {
  id: string;
  code: string;
  title: string;
  description?: string | null;
  source_type: SourceType;
  format_type: FormatType;
  uri_or_url: string;
  content_text?: string | null;
  checksum_sha256: string;
  subject_id?: string | null;
  level_id?: string | null;
  competency_id?: string | null;
  language: string;
  target_agent_family: TargetAgentFamily;
  status: KnowledgeSourceStatus;
  version_number: number;
  parent_source_id?: string | null;
  trust_level: TrustLevel;
  license_type: LicenseType;
  author_or_publisher?: string | null;
  incorporation_date: string;
  verification_date?: string | null;
  reviewed_by_user_id?: string | null;
  created_by_user_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeChunk {
  id: string;
  source_id: string;
  chunk_index: number;
  citation_tag: string;
  section_title?: string | null;
  content_text: string;
  token_count: number;
  metadata_json?: string | null;
  embedding_json?: string | null;
  created_at: string;
}

export interface CreateSourceInput {
  code: string;
  title: string;
  description?: string;
  sourceType: SourceType;
  formatType: FormatType;
  uriOrUrl: string;
  contentText: string;
  subjectId?: string;
  levelId?: string;
  competencyId?: string;
  language?: string;
  targetAgentFamily?: TargetAgentFamily;
  trustLevel?: TrustLevel;
  licenseType?: LicenseType;
  authorOrPublisher?: string;
}

export interface SearchQueryInput {
  query: string;
  subjectId?: string;
  competencyId?: string;
  targetAgentFamily?: TargetAgentFamily;
  language?: string;
  limit?: number;
}

export interface SearchResultChunk {
  chunkId: string;
  sourceId: string;
  sourceCode: string;
  sourceTitle: string;
  sourceType: SourceType;
  trustLevel: TrustLevel;
  citationTag: string;
  sectionTitle?: string;
  contentText: string;
  tokenCount: number;
  relevanceScore: number;
}

export class KnowledgeService {
  /**
   * Calcula el checksum SHA-256 normalizado de un contenido
   */
  public static computeChecksum(content: string): string {
    return crypto
      .createHash('sha256')
      .update(content.trim().replace(/\r\n/g, '\n'), 'utf8')
      .digest('hex');
  }

  /**
   * Segmentación inteligente en fragmentos (chunks) con solapamiento
   */
  public static chunkContent(
    text: string,
    sourceCode: string,
    maxWords: number = 100,
    overlapWords: number = 15
  ): Array<{ index: number; citationTag: string; sectionTitle?: string; content: string; tokenCount: number }> {
    const cleanText = text.trim();
    if (!cleanText) return [];

    // Separar por secciones o párrafos
    const paragraphs = cleanText.split(/\n\s*\n/);
    const chunks: Array<{ index: number; citationTag: string; sectionTitle?: string; content: string; tokenCount: number }> = [];

    let currentSectionTitle = 'General';
    let currentWords: string[] = [];
    let chunkCount = 1;

    for (const paragraph of paragraphs) {
      const trimmedPara = paragraph.trim();
      if (!trimmedPara) continue;

      // Detectar encabezado Markdown
      if (/^#{1,4}\s+(.+)$/.test(trimmedPara)) {
        const headerMatch = trimmedPara.match(/^#{1,4}\s+(.+)$/);
        if (headerMatch) {
          currentSectionTitle = headerMatch[1].trim();
        }
      }

      const words = trimmedPara.split(/\s+/);

      // Si el párrafo acumulado supera el límite
      if (currentWords.length + words.length > maxWords && currentWords.length > 0) {
        const chunkText = currentWords.join(' ');
        chunks.push({
          index: chunkCount,
          citationTag: `[${sourceCode}#C${chunkCount}]`,
          sectionTitle: currentSectionTitle,
          content: chunkText,
          tokenCount: Math.ceil(currentWords.length * 1.3),
        });
        chunkCount++;

        // Mantener solapamiento
        const overlap = currentWords.slice(-overlapWords);
        currentWords = [...overlap, ...words];
      } else {
        currentWords.push(...words);
      }
    }

    if (currentWords.length > 0) {
      const chunkText = currentWords.join(' ');
      chunks.push({
        index: chunkCount,
        citationTag: `[${sourceCode}#C${chunkCount}]`,
        sectionTitle: currentSectionTitle,
        content: chunkText,
        tokenCount: Math.ceil(currentWords.length * 1.3),
      });
    }

    return chunks;
  }

  /**
   * Crea una nueva fuente de conocimiento en estado PENDIENTE
   * (Regla: no se aprueba automáticamente al cargar)
   */
  public static createSource(input: CreateSourceInput, userId: string): KnowledgeSource {
    const db = getDb();

    // 1. Validación de tamaño y contenido
    if (!input.contentText || input.contentText.trim().length < 20) {
      throw new Error('VALIDATION_ERROR: El contenido del documento es demasiado breve o está vacío.');
    }
    if (input.contentText.length > 5 * 1024 * 1024) {
      throw new Error('VALIDATION_ERROR: El tamaño del contenido excede el límite permitido de 5 MB.');
    }

    // 2. Detección de duplicados por código y por checksum
    const checksum = this.computeChecksum(input.contentText);
    const existingByCode = db.prepare('SELECT id, status FROM knowledge_sources WHERE code = ?').get(input.code) as any;
    if (existingByCode) {
      throw new Error(`CONFLICT_DUPLICATE_CODE: Ya existe una fuente con el código "${input.code}".`);
    }

    const existingByChecksum = db.prepare(
      "SELECT id, code, title, status FROM knowledge_sources WHERE checksum_sha256 = ? AND status != 'DESACTIVADO'"
    ).get(checksum) as any;
    if (existingByChecksum) {
      throw new Error(
        `CONFLICT_DUPLICATE_CONTENT: Contenido idéntico detectado en la fuente "${existingByChecksum.code}" (${existingByChecksum.title}).`
      );
    }

    const sourceId = `src-${crypto.randomUUID().slice(0, 12)}`;

    // Inserción de la fuente (Estado inicial: PENDIENTE)
    db.prepare(`
      INSERT INTO knowledge_sources (
        id, code, title, description, source_type, format_type, uri_or_url,
        content_text, checksum_sha256, subject_id, level_id, competency_id,
        language, target_agent_family, status, version_number, parent_source_id,
        trust_level, license_type, author_or_publisher, incorporation_date,
        created_by_user_id
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, 'PENDIENTE', 1, NULL,
        ?, ?, ?, date('now'),
        ?
      )
    `).run(
      sourceId,
      input.code,
      input.title,
      input.description || null,
      input.sourceType,
      input.formatType,
      input.uriOrUrl,
      input.contentText,
      checksum,
      input.subjectId || null,
      input.levelId || null,
      input.competencyId || null,
      input.language || 'es',
      input.targetAgentFamily || 'GENERAL_KNOWLEDGE',
      input.trustLevel || 'VERIFICADO_MEDIO',
      input.licenseType || 'USO_EDUCATIVO_AUTORIZADO',
      input.authorOrPublisher || null,
      userId
    );

    // 3. Segmentación e inserción de fragmentos
    const chunks = this.chunkContent(input.contentText, input.code);
    const insertChunk = db.prepare(`
      INSERT INTO knowledge_chunks (
        id, source_id, chunk_index, citation_tag, section_title, content_text, token_count, metadata_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const chunk of chunks) {
      const chunkId = `chk-${crypto.randomUUID().slice(0, 12)}`;
      insertChunk.run(
        chunkId,
        sourceId,
        chunk.index,
        chunk.citationTag,
        chunk.sectionTitle || null,
        chunk.content,
        chunk.tokenCount,
        JSON.stringify({
          sourceCode: input.code,
          subjectId: input.subjectId || null,
          targetAgentFamily: input.targetAgentFamily || 'GENERAL_KNOWLEDGE',
        })
      );
    }

    // 4. Registro en el historial editorial
    db.prepare(`
      INSERT INTO knowledge_source_history (
        id, source_id, action, performed_by_user_id, justification, details_json
      ) VALUES (?, ?, 'CREATED', ?, ?, ?)
    `).run(
      `ksh-${crypto.randomUUID().slice(0, 12)}`,
      sourceId,
      userId,
      'Carga inicial del recurso en el centro de conocimiento (estado PENDIENTE).',
      JSON.stringify({ chunksCreated: chunks.length, checksum })
    );

    return this.getSourceById(sourceId)!;
  }

  /**
   * Obtiene una fuente por ID
   */
  public static getSourceById(sourceId: string): KnowledgeSource | null {
    const db = getDb();
    const row = db.prepare('SELECT * FROM knowledge_sources WHERE id = ?').get(sourceId) as unknown as KnowledgeSource | undefined;
    return row || null;
  }

  /**
   * Obtiene una fuente por Código
   */
  public static getSourceByCode(code: string): KnowledgeSource | null {
    const db = getDb();
    const row = db.prepare('SELECT * FROM knowledge_sources WHERE code = ?').get(code) as unknown as KnowledgeSource | undefined;
    return row || null;
  }

  /**
   * Revisa y actualiza el estado editorial de una fuente (APROBADO, RECHAZADO, EN_REVISION)
   * Restringido a editores, coordinadores y administradores
   */
  public static reviewSource(
    sourceId: string,
    newStatus: 'APROBADO' | 'RECHAZADO' | 'EN_REVISION',
    justification: string,
    userId: string
  ): KnowledgeSource {
    const db = getDb();
    const source = this.getSourceById(sourceId);
    if (!source) {
      throw new Error(`NOT_FOUND: No se encontró la fuente de conocimiento ${sourceId}.`);
    }

    if (source.status === 'DESACTIVADO') {
      throw new Error('INVALID_STATE: No se puede cambiar el estado de una fuente desactivada sin un proceso de reactivación.');
    }

    db.prepare(`
      UPDATE knowledge_sources
      SET status = ?,
          verification_date = datetime('now'),
          reviewed_by_user_id = ?,
          updated_at = datetime('now')
      WHERE id = ?
    `).run(newStatus, userId, sourceId);

    const action = newStatus === 'APROBADO' ? 'APPROVED' : newStatus === 'RECHAZADO' ? 'REJECTED' : 'SUBMITTED_FOR_REVIEW';

    db.prepare(`
      INSERT INTO knowledge_source_history (
        id, source_id, action, performed_by_user_id, justification, details_json
      ) VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      `ksh-${crypto.randomUUID().slice(0, 12)}`,
      sourceId,
      action,
      userId,
      justification,
      JSON.stringify({ previousStatus: source.status, newStatus })
    );

    return this.getSourceById(sourceId)!;
  }

  /**
   * RETIRADA EFECTIVA DE RECURSO: Desactiva la fuente de modo que deje de recuperarse inmediatamente
   */
  public static retireSource(sourceId: string, justification: string, userId: string): KnowledgeSource {
    const db = getDb();
    const source = this.getSourceById(sourceId);
    if (!source) {
      throw new Error(`NOT_FOUND: No se encontró la fuente de conocimiento ${sourceId}.`);
    }

    db.prepare(`
      UPDATE knowledge_sources
      SET status = 'DESACTIVADO',
          updated_at = datetime('now')
      WHERE id = ?
    `).run(sourceId);

    db.prepare(`
      INSERT INTO knowledge_source_history (
        id, source_id, action, performed_by_user_id, justification, details_json
      ) VALUES (?, ?, 'DEACTIVATED', ?, ?, ?)
    `).run(
      `ksh-${crypto.randomUUID().slice(0, 12)}`,
      sourceId,
      userId,
      justification,
      JSON.stringify({ previousStatus: source.status, action: 'RETIRE' })
    );

    return this.getSourceById(sourceId)!;
  }

  /**
   * Actualiza los metadatos o contenido de una fuente de conocimiento existente
   * Si cambia el contenido, recalcula checksum y re-fragmenta los chunks FTS5
   * Registra la acción 'UPDATED' en knowledge_source_history
   */
  public static updateSource(
    sourceId: string,
    input: Partial<CreateSourceInput>,
    justification: string,
    userId: string
  ): KnowledgeSource {
    const db = getDb();
    const source = this.getSourceById(sourceId);
    if (!source) {
      throw new Error(`NOT_FOUND: No se encontró la fuente de conocimiento ${sourceId}.`);
    }

    const updates: string[] = ["updated_at = datetime('now')"];
    const values: any[] = [];

    if (input.title !== undefined) {
      updates.push('title = ?');
      values.push(input.title.trim());
    }
    if (input.description !== undefined) {
      updates.push('description = ?');
      values.push(input.description);
    }
    if (input.trustLevel !== undefined) {
      updates.push('trust_level = ?');
      values.push(input.trustLevel);
    }
    if (input.licenseType !== undefined) {
      updates.push('license_type = ?');
      values.push(input.licenseType);
    }
    if (input.authorOrPublisher !== undefined) {
      updates.push('author_or_publisher = ?');
      values.push(input.authorOrPublisher);
    }
    if (input.targetAgentFamily !== undefined) {
      updates.push('target_agent_family = ?');
      values.push(input.targetAgentFamily);
    }
    if (input.language !== undefined) {
      updates.push('language = ?');
      values.push(input.language);
    }
    if (input.subjectId !== undefined) {
      updates.push('subject_id = ?');
      values.push(input.subjectId);
    }

    let contentChanged = false;
    if (input.contentText !== undefined && input.contentText.trim() !== (source.content_text || '').trim()) {
      contentChanged = true;
      const newChecksum = this.computeChecksum(input.contentText);
      updates.push('content_text = ?', 'checksum_sha256 = ?');
      values.push(input.contentText, newChecksum);
    }

    values.push(sourceId);
    db.prepare(`UPDATE knowledge_sources SET ${updates.join(', ')} WHERE id = ?`).run(...values);

    // Si cambió el contenido, re-crear fragmentos
    if (contentChanged && input.contentText) {
      db.prepare('DELETE FROM knowledge_chunks WHERE source_id = ?').run(sourceId);
      const chunks = this.chunkContent(input.contentText, source.code);
      const insertChunk = db.prepare(`
        INSERT INTO knowledge_chunks (
          id, source_id, chunk_index, citation_tag, section_title, content_text, token_count, metadata_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const chunk of chunks) {
        insertChunk.run(
          `chk-${crypto.randomUUID().slice(0, 12)}`,
          sourceId,
          chunk.index,
          chunk.citationTag,
          chunk.sectionTitle || null,
          chunk.content,
          chunk.tokenCount,
          JSON.stringify({ sourceCode: source.code, version: source.version_number })
        );
      }
    }

    // Registrar en el historial de la fuente
    db.prepare(`
      INSERT INTO knowledge_source_history (
        id, source_id, action, performed_by_user_id, justification, details_json
      ) VALUES (?, ?, 'UPDATED', ?, ?, ?)
    `).run(
      `ksh-${crypto.randomUUID().slice(0, 12)}`,
      sourceId,
      userId,
      justification || 'Actualización de metadatos o contenido de la fuente.',
      JSON.stringify({
        updatedFields: Object.keys(input),
        contentChanged,
      })
    );

    return this.getSourceById(sourceId)!;
  }

  /**
   * Crea una nueva versión de una fuente existente
   */
  public static createNewVersion(
    parentSourceId: string,
    input: Partial<CreateSourceInput>,
    userId: string
  ): KnowledgeSource {
    const db = getDb();
    const parent = this.getSourceById(parentSourceId);
    if (!parent) {
      throw new Error(`NOT_FOUND: No se encontró la fuente padre ${parentSourceId}.`);
    }

    const newVersionNumber = parent.version_number + 1;
    const newCode = `${parent.code}-V${newVersionNumber}`;
    const newContent = input.contentText || parent.content_text || '';
    const checksum = this.computeChecksum(newContent);
    const newSourceId = `src-${crypto.randomUUID().slice(0, 12)}`;

    db.prepare(`
      INSERT INTO knowledge_sources (
        id, code, title, description, source_type, format_type, uri_or_url,
        content_text, checksum_sha256, subject_id, level_id, competency_id,
        language, target_agent_family, status, version_number, parent_source_id,
        trust_level, license_type, author_or_publisher, incorporation_date,
        created_by_user_id
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?, 'PENDIENTE', ?, ?,
        ?, ?, ?, date('now'),
        ?
      )
    `).run(
      newSourceId,
      newCode,
      input.title || `${parent.title} (v${newVersionNumber})`,
      input.description || parent.description,
      input.sourceType || parent.source_type,
      input.formatType || parent.format_type,
      input.uriOrUrl || parent.uri_or_url,
      newContent,
      checksum,
      input.subjectId !== undefined ? input.subjectId : parent.subject_id,
      input.levelId !== undefined ? input.levelId : parent.level_id,
      input.competencyId !== undefined ? input.competencyId : parent.competency_id,
      input.language || parent.language,
      input.targetAgentFamily || parent.target_agent_family,
      newVersionNumber,
      parentSourceId,
      input.trustLevel || parent.trust_level,
      input.licenseType || parent.license_type,
      input.authorOrPublisher || parent.author_or_publisher,
      userId
    );

    // Fragmentar el nuevo contenido
    const chunks = this.chunkContent(newContent, newCode);
    const insertChunk = db.prepare(`
      INSERT INTO knowledge_chunks (
        id, source_id, chunk_index, citation_tag, section_title, content_text, token_count, metadata_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const chunk of chunks) {
      const chunkId = `chk-${crypto.randomUUID().slice(0, 12)}`;
      insertChunk.run(
        chunkId,
        newSourceId,
        chunk.index,
        chunk.citationTag,
        chunk.sectionTitle || null,
        chunk.content,
        chunk.tokenCount,
        JSON.stringify({
          sourceCode: newCode,
          version: newVersionNumber,
          parentSourceId,
        })
      );
    }

    db.prepare(`
      INSERT INTO knowledge_source_history (
        id, source_id, action, performed_by_user_id, justification, details_json
      ) VALUES (?, ?, 'VERSIONED', ?, ?, ?)
    `).run(
      `ksh-${crypto.randomUUID().slice(0, 12)}`,
      newSourceId,
      userId,
      `Creación de la versión ${newVersionNumber} a partir de la fuente previa ${parent.code}.`,
      JSON.stringify({ parentSourceId, versionNumber: newVersionNumber })
    );

    return this.getSourceById(newSourceId)!;
  }

  /**
   * BÚSQUEDA Y RETRIEVAL DE FRAGMENTOS (Para Asistentes y Profesores IA)
   * REGLA TÉCNICA CRÍTICA:
   * Consulta FTS5 con BM25 unida exclusivamente con knowledge_sources donde status = 'APROBADO'.
   * Las fuentes DESACTIVADAS, RECHAZADAS o PENDIENTES quedan 100% EXCLUIDAS del resultado.
   */
  public static searchKnowledge(filter: SearchQueryInput): SearchResultChunk[] {
    const db = getDb();
    const limit = filter.limit || 5;
    const cleanQuery = filter.query.trim().replace(/['"*]/g, ' ');

    if (!cleanQuery) return [];

    // Formatear tokens para coincidencia FTS5
    const tokens = cleanQuery
      .split(/\s+/)
      .filter((t) => t.length > 1)
      .map((t) => `"${t}"*`)
      .join(' OR ');

    if (!tokens) return [];

    let sql = `
      SELECT 
        kc.id AS chunk_id,
        kc.source_id,
        ks.code AS source_code,
        ks.title AS source_title,
        ks.source_type,
        ks.trust_level,
        kc.citation_tag,
        kc.section_title,
        kc.content_text,
        kc.token_count,
        bm25(knowledge_chunks_fts) AS bm25_score
      FROM knowledge_chunks_fts
      JOIN knowledge_chunks kc ON kc.id = knowledge_chunks_fts.chunk_id
      JOIN knowledge_sources ks ON ks.id = kc.source_id
      WHERE knowledge_chunks_fts MATCH ?
        AND ks.status = 'APROBADO'
    `;

    const params: any[] = [tokens];

    if (filter.subjectId) {
      sql += ' AND (ks.subject_id = ? OR ks.subject_id IS NULL)';
      params.push(filter.subjectId);
    }

    if (filter.targetAgentFamily) {
      sql += " AND (ks.target_agent_family = ? OR ks.target_agent_family = 'GENERAL_KNOWLEDGE')";
      params.push(filter.targetAgentFamily);
    }

    if (filter.language) {
      sql += " AND (ks.language = ? OR ks.language = 'es')";
      params.push(filter.language);
    }

    sql += ' ORDER BY bm25_score ASC LIMIT ?';
    params.push(limit);

    try {
      const rows = db.prepare(sql).all(...params) as Array<{
        chunk_id: string;
        source_id: string;
        source_code: string;
        source_title: string;
        source_type: SourceType;
        trust_level: TrustLevel;
        citation_tag: string;
        section_title: string | null;
        content_text: string;
        token_count: number;
        bm25_score: number;
      }>;

      return rows.map((r) => ({
        chunkId: r.chunk_id,
        sourceId: r.source_id,
        sourceCode: r.source_code,
        sourceTitle: r.source_title,
        sourceType: r.source_type,
        trustLevel: r.trust_level,
        citationTag: r.citation_tag,
        sectionTitle: r.section_title || undefined,
        contentText: r.content_text,
        tokenCount: r.token_count,
        relevanceScore: Math.abs(r.bm25_score),
      }));
    } catch (err: any) {
      console.warn('[KnowledgeService] Error en búsqueda FTS5:', err.message);
      return [];
    }
  }

  /**
   * Registro y escalamiento de conflictos entre fuentes (doctrinales o curriculares)
   */
  public static reportConflict(
    sourceIdA: string,
    sourceIdB: string,
    conflictType: 'DOCTRINAL_DISCREPANCY' | 'CURRICULAR_MISMATCH' | 'FACTUAL_CONTRADICTION' | 'COPYRIGHT_CLAIM',
    description: string,
    userId: string
  ): { conflictId: string; status: string } {
    const db = getDb();
    const conflictId = `ksc-${crypto.randomUUID().slice(0, 12)}`;

    db.prepare(`
      INSERT INTO knowledge_source_conflicts (
        id, source_id_a, source_id_b, conflict_type, description, status, reported_by_user_id
      ) VALUES (?, ?, ?, ?, ?, 'REPORTED', ?)
    `).run(conflictId, sourceIdA, sourceIdB, conflictType, description, userId);

    return { conflictId, status: 'REPORTED' };
  }

  /**
   * Resolución de un conflicto reportado
   */
  public static resolveConflict(
    conflictId: string,
    resolutionNotes: string,
    userId: string
  ): void {
    const db = getDb();
    db.prepare(`
      UPDATE knowledge_source_conflicts
      SET status = 'RESOLVED',
          resolution_notes = ?,
          resolved_by_user_id = ?,
          resolved_at = datetime('now')
      WHERE id = ?
    `).run(resolutionNotes, userId, conflictId);
  }

  /**
   * Listado paginado de fuentes con filtros
   */
  public static getSources(filters?: {
    status?: KnowledgeSourceStatus;
    sourceType?: SourceType;
    subjectId?: string;
    page?: number;
    limit?: number;
  }): { sources: KnowledgeSource[]; total: number; page: number; totalPages: number } {
    const db = getDb();
    const page = Math.max(1, filters?.page || 1);
    const limit = Math.max(1, Math.min(100, filters?.limit || 20));
    const offset = (page - 1) * limit;

    let countSql = 'SELECT COUNT(*) as total FROM knowledge_sources WHERE 1=1';
    let sql = 'SELECT * FROM knowledge_sources WHERE 1=1';
    const params: any[] = [];

    if (filters?.status) {
      countSql += ' AND status = ?';
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters?.sourceType) {
      countSql += ' AND source_type = ?';
      sql += ' AND source_type = ?';
      params.push(filters.sourceType);
    }

    if (filters?.subjectId) {
      countSql += ' AND subject_id = ?';
      sql += ' AND subject_id = ?';
      params.push(filters.subjectId);
    }

    const totalRow = db.prepare(countSql).get(...params) as { total: number };
    const total = totalRow.total;

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const rows = db.prepare(sql).all(...params, limit, offset) as unknown as KnowledgeSource[];

    return {
      sources: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Obtiene los fragmentos de una fuente
   */
  public static getSourceChunks(sourceId: string): KnowledgeChunk[] {
    const db = getDb();
    return db.prepare('SELECT * FROM knowledge_chunks WHERE source_id = ? ORDER BY chunk_index ASC').all(sourceId) as unknown as KnowledgeChunk[];
  }

  /**
   * Obtiene el historial editorial de una fuente
   */
  public static getSourceHistory(sourceId: string): any[] {
    const db = getDb();
    return db.prepare(`
      SELECT ksh.*, u.first_name, u.last_name, u.role
      FROM knowledge_source_history ksh
      JOIN users u ON u.id = ksh.performed_by_user_id
      WHERE ksh.source_id = ?
      ORDER BY ksh.rowid DESC, ksh.performed_at DESC
    `).all(sourceId);
  }

  /**
   * Resumen estadístico del centro de conocimiento
   */
  public static getKnowledgeStats(): any {
    const db = getDb();
    const statusCounts = db.prepare(`
      SELECT status, count(*) as count FROM knowledge_sources GROUP BY status
    `).all();

    const typeCounts = db.prepare(`
      SELECT source_type, count(*) as count FROM knowledge_sources GROUP BY source_type
    `).all();

    const chunkCount = db.prepare('SELECT count(*) as count FROM knowledge_chunks').get() as { count: number };
    const conflictCount = db.prepare("SELECT count(*) as count FROM knowledge_source_conflicts WHERE status = 'REPORTED'").get() as { count: number };

    return {
      byStatus: statusCounts,
      byType: typeCounts,
      totalChunks: chunkCount.count,
      pendingConflicts: conflictCount.count,
    };
  }
}

