/**
 * ==============================================================================
 * Servicio de Dominio: Agentes Educativos y Orquestación Socrática (ETAPA-08)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 */

import crypto from 'node:crypto';
import { getDb } from '../db/database';
import { AIAgent, AIConversation, AIMessage, RagContextChunk } from './types';
import { ProviderManager } from './providers/providerManager';
import { KnowledgeService } from '../knowledge/knowledgeService';

export class AgentService {
  /**
   * Obtiene todos los agentes disponibles
   */
  public static getAgents(includeInactive = false): AIAgent[] {
    const db = getDb();
    const sql = includeInactive
      ? 'SELECT * FROM ai_agents ORDER BY name ASC'
      : 'SELECT * FROM ai_agents WHERE is_active = 1 ORDER BY name ASC';
    return db.prepare(sql).all() as unknown as AIAgent[];
  }

  /**
   * Obtiene un agente por ID o Código
   */
  public static getAgentById(agentId: string): AIAgent | null {
    const db = getDb();
    const row = db.prepare('SELECT * FROM ai_agents WHERE id = ?').get(agentId) as unknown as AIAgent | undefined;
    return row || null;
  }

  public static getAgentByCode(code: string): AIAgent | null {
    const db = getDb();
    const row = db.prepare('SELECT * FROM ai_agents WHERE code = ?').get(code) as unknown as AIAgent | undefined;
    return row || null;
  }

  /**
   * Actualiza la configuración de un agente (Admin / Coordinador)
   */
  public static updateAgent(
    agentId: string,
    updates: Partial<{
      name: string;
      description: string;
      system_prompt: string;
      pedagogical_style: string;
      safety_restrictions: string;
      is_active: number;
    }>
  ): AIAgent {
    const db = getDb();
    const current = this.getAgentById(agentId);
    if (!current) {
      throw new Error(`NOT_FOUND: No se encontró el agente ${agentId}.`);
    }

    db.prepare(`
      UPDATE ai_agents
      SET name = ?,
          description = ?,
          system_prompt = ?,
          pedagogical_style = ?,
          safety_restrictions = ?,
          is_active = ?,
          version_number = version_number + 1,
          updated_at = datetime('now')
      WHERE id = ?
    `).run(
      updates.name || current.name,
      updates.description !== undefined ? updates.description : current.description,
      updates.system_prompt || current.system_prompt,
      updates.pedagogical_style || current.pedagogical_style,
      updates.safety_restrictions || current.safety_restrictions,
      updates.is_active !== undefined ? updates.is_active : current.is_active,
      agentId
    );

    return this.getAgentById(agentId)!;
  }

  /**
   * Inicia o crea una nueva conversación entre estudiante y agente
   */
  public static createConversation(
    studentId: string,
    agentId: string,
    title?: string
  ): AIConversation {
    const db = getDb();
    const agent = this.getAgentById(agentId);
    if (!agent) {
      throw new Error(`NOT_FOUND: Agente educativo ${agentId} no encontrado.`);
    }

    // Verificar que el estudiante existe
    const student = db.prepare('SELECT id FROM students WHERE id = ?').get(studentId) as any;
    if (!student) {
      throw new Error(`NOT_FOUND: Estudiante ${studentId} no encontrado.`);
    }

    const conversationId = `conv-${crypto.randomUUID().slice(0, 12)}`;
    const convTitle = title || `Diálogo socrático con ${agent.name}`;

    db.prepare(`
      INSERT INTO ai_conversations (id, student_id, agent_id, subject_id, title, status)
      VALUES (?, ?, ?, ?, ?, 'ACTIVE')
    `).run(conversationId, studentId, agentId, agent.subject_id || null, convTitle);

    return db.prepare('SELECT * FROM ai_conversations WHERE id = ?').get(conversationId) as unknown as AIConversation;
  }

  /**
   * Lista conversaciones de un estudiante (Aislamiento de menor)
   */
  public static getStudentConversations(studentId: string): AIConversation[] {
    const db = getDb();
    return db.prepare(
      'SELECT * FROM ai_conversations WHERE student_id = ? ORDER BY updated_at DESC'
    ).all(studentId) as unknown as AIConversation[];
  }

  /**
   * Obtiene conversación por ID
   */
  public static getConversationById(conversationId: string): AIConversation | null {
    const db = getDb();
    const row = db.prepare('SELECT * FROM ai_conversations WHERE id = ?').get(conversationId) as unknown as AIConversation | undefined;
    return row || null;
  }

  /**
   * Obtiene los mensajes de una conversación
   */
  public static getConversationMessages(conversationId: string): AIMessage[] {
    const db = getDb();
    return db.prepare(
      'SELECT * FROM ai_messages WHERE conversation_id = ? ORDER BY created_at ASC'
    ).all(conversationId) as unknown as AIMessage[];
  }

  /**
   * Enviar mensaje y procesar respuesta pedagógica fundamentada (RAG)
   */
  public static async sendMessage(
    conversationId: string,
    studentId: string,
    userContent: string,
    options?: {
      language?: string;
      forceProvider?: string;
    }
  ): Promise<{ studentMessage: AIMessage; agentMessage: AIMessage }> {
    const db = getDb();
    const conv = this.getConversationById(conversationId);
    if (!conv) {
      throw new Error(`NOT_FOUND: Conversación ${conversationId} no encontrada.`);
    }

    // Aislamiento Anti-IDOR: solo el alumno dueño puede interactuar
    if (conv.student_id !== studentId) {
      throw new Error('FORBIDDEN_STUDENT_ACCESS: No tiene autorización para interactuar en esta conversación de otro estudiante.');
    }

    const agent = this.getAgentById(conv.agent_id);
    if (!agent) {
      throw new Error(`NOT_FOUND: Agente ${conv.agent_id} no encontrado.`);
    }

    const cleanInput = userContent.trim();
    if (!cleanInput) {
      throw new Error('VALIDATION_ERROR: El mensaje no puede estar vacío.');
    }

    // 1. Registrar mensaje del estudiante
    const studentMsgId = `msg-${crypto.randomUUID().slice(0, 12)}`;
    db.prepare(`
      INSERT INTO ai_messages (id, conversation_id, sender_type, content)
      VALUES (?, ?, 'STUDENT', ?)
    `).run(studentMsgId, conversationId, cleanInput);

    // 2. Recuperación RAG de fuentes del Centro de Conocimiento (Etapa 07)
    let ragChunks: RagContextChunk[] = [];
    try {
      const searchResults = KnowledgeService.searchKnowledge({
        query: cleanInput,
        subjectId: conv.subject_id || undefined,
        language: options?.language || agent.default_language,
        limit: 3,
      });

      // Si el agente tiene fuentes restringidas por código
      let allowedCodes: string[] | null = null;
      if (agent.allowed_source_codes_json) {
        try {
          allowedCodes = JSON.parse(agent.allowed_source_codes_json);
        } catch { /* ignorar */ }
      }

      for (const res of searchResults) {
        if (!allowedCodes || allowedCodes.includes(res.sourceCode)) {
          ragChunks.push({
            citationTag: res.citationTag,
            sourceCode: res.sourceCode,
            sourceTitle: res.sourceTitle,
            sectionTitle: res.sectionTitle,
            contentText: res.contentText,
            relevanceScore: res.relevanceScore,
          });
        }
      }
    } catch (ragErr: any) {
      console.warn('[AgentService] Advertencia en recuperación RAG:', ragErr.message);
    }

    // 3. Obtener historial reciente para contexto conversacional
    const historyRows = db.prepare(`
      SELECT sender_type, content 
      FROM ai_messages 
      WHERE conversation_id = ? AND id != ?
      ORDER BY created_at DESC 
      LIMIT 6
    `).all(conversationId, studentMsgId) as Array<{ sender_type: string; content: string }>;

    const history = historyRows.reverse().map((h) => ({
      role: (h.sender_type === 'STUDENT' ? 'user' : 'model') as 'user' | 'model',
      content: h.content,
    }));

    // 4. Invocación al Administrador de Proveedores LLM
    const llmResponse = await ProviderManager.generateResponse({
      agentCode: agent.code,
      systemPrompt: agent.system_prompt,
      userPrompt: cleanInput,
      history,
      ragContext: ragChunks,
      pedagogicalStyle: agent.pedagogical_style,
      safetyRestrictions: agent.safety_restrictions,
      language: options?.language || agent.default_language,
      forceProvider: options?.forceProvider,
    });

    // 5. Registrar respuesta del Agente
    const agentMsgId = `msg-${crypto.randomUUID().slice(0, 12)}`;
    db.prepare(`
      INSERT INTO ai_messages (
        id, conversation_id, sender_type, content, citation_tags_json, rag_sources_json, telemetry_json, safety_flags_json
      ) VALUES (?, ?, 'AGENT', ?, ?, ?, ?, ?)
    `).run(
      agentMsgId,
      conversationId,
      llmResponse.content,
      JSON.stringify(llmResponse.citationTags),
      JSON.stringify(ragChunks.map((c) => ({ tag: c.citationTag, source: c.sourceCode }))),
      JSON.stringify({
        provider: llmResponse.providerName,
        model: llmResponse.modelName,
        latencyMs: llmResponse.latencyMs,
        isFallback: llmResponse.isFallback,
      }),
      llmResponse.safetyFlags ? JSON.stringify(llmResponse.safetyFlags) : null
    );

    // 6. Actualizar fecha de la conversación
    db.prepare("UPDATE ai_conversations SET updated_at = datetime('now') WHERE id = ?").run(conversationId);

    // 7. Registro de Telemetría Operativa (Sin PII del menor)
    db.prepare(`
      INSERT INTO ai_telemetry_logs (
        id, agent_code, provider_name, model_name, latency_ms, tokens_prompt, tokens_completion, status_code
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 200)
    `).run(
      `tel-${crypto.randomUUID().slice(0, 12)}`,
      agent.code,
      llmResponse.providerName,
      llmResponse.modelName,
      llmResponse.latencyMs,
      llmResponse.tokensPrompt,
      llmResponse.tokensCompletion
    );

    const studentMessage = db.prepare('SELECT * FROM ai_messages WHERE id = ?').get(studentMsgId) as unknown as AIMessage;
    const agentMessage = db.prepare('SELECT * FROM ai_messages WHERE id = ?').get(agentMsgId) as unknown as AIMessage;

    return { studentMessage, agentMessage };
  }

  /**
   * Estadísticas de telemetría de agentes
   */
  public static getTelemetryStats(): any {
    const db = getDb();
    const countTotal = db.prepare('SELECT count(*) as total, avg(latency_ms) as avgLatency FROM ai_telemetry_logs').get() as any;
    const byAgent = db.prepare('SELECT agent_code, count(*) as count, avg(latency_ms) as avgLatency FROM ai_telemetry_logs GROUP BY agent_code').all();
    const byProvider = db.prepare('SELECT provider_name, count(*) as count FROM ai_telemetry_logs GROUP BY provider_name').all();

    return {
      totalInteractions: countTotal.total,
      averageLatencyMs: Math.round(countTotal.avgLatency || 0),
      interactionsByAgent: byAgent,
      interactionsByProvider: byProvider,
    };
  }
}

