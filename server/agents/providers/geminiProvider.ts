/**
 * ==============================================================================
 * Proveedor Oficial Google Gemini API (@google/genai)
 * Plataforma Educativa ALSIZ para Ekballo Church (ETAPA-08)
 * ==============================================================================
 */

import { ILLMProvider, LLMRequest, LLMResponse, AIProviderError } from '../types';

export class GeminiProvider implements ILLMProvider {
  public readonly name = 'GOOGLE_GEMINI';
  private client: any = null;
  private readonly defaultModel = 'gemini-3.8-flash';

  public isAvailable(): boolean {
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    return Boolean(key && key.trim().length > 10);
  }

  public getModelName(): string {
    return (process.env.GEMINI_MODEL || this.defaultModel).trim();
  }

  private async getClient(): Promise<any> {
    if (this.client) return this.client;
    const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '').trim();
    if (!apiKey) return null;

    try {
      const { GoogleGenAI } = await import('@google/genai');
      this.client = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'alsiz-ekballo-platform/1.0',
          },
        },
      });
      return this.client;
    } catch (err: any) {
      console.warn('[GeminiProvider] Error inicializando cliente SDK @google/genai:', err?.message || err);
      return null;
    }
  }

  public async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();
    const client = await this.getClient();

    if (!client) {
      throw new AIProviderError(
        'AI_ERROR_AUTH',
        'GEMINI_UNAVAILABLE: Clave de API no configurada o cliente no disponible.',
        false,
        401
      );
    }

    const activeModel = this.getModelName();

    // Preparar el contexto de fuentes RAG si está disponible
    let ragBlock = '';
    const availableTags: string[] = [];
    if (request.ragContext && request.ragContext.length > 0) {
      ragBlock = '\n\n--- MATERIALES CURRICULARES AUTORIZADOS (CENTRO DE CONOCIMIENTO ALSIZ) ---\n';
      for (const chunk of request.ragContext) {
        ragBlock += `\n[FUENTE: ${chunk.sourceTitle} | ETIQUETA: ${chunk.citationTag}]\n${chunk.contentText}\n`;
        availableTags.push(chunk.citationTag);
      }
      ragBlock += '\n--- INSTRUCCIÓN DE CITACIÓN: Si utilizas información de los materiales anteriores, cita explícitamente la etiqueta correspondiente (ej. [EKB-DOC-CLASE-01#C1]). Si no hay evidencia suficiente en los materiales para responder, indícalo con honestidad sin inventar. ---\n';
    }

    const fullSystemInstruction = `${request.systemPrompt}\n\nESTILO PEDAGÓGICO: ${request.pedagogicalStyle || 'Socrático'}\nRESTRICCIONES DE SEGURIDAD: ${request.safetyRestrictions || 'No dar diagnósticos médicos ni contenido inapropiado para menores.'}${ragBlock}`;

    // Construir contenido para el modelo
    const contents: any[] = [];
    if (request.history && request.history.length > 0) {
      for (const h of request.history) {
        contents.push({
          role: h.role === 'model' ? 'model' : 'user',
          parts: [{ text: h.content }],
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: request.userPrompt }],
    });

    try {
      // Llamada al SDK oficial Google GenAI
      const response = await client.models.generateContent({
        model: activeModel,
        contents,
        config: {
          systemInstruction: fullSystemInstruction,
          temperature: request.temperature ?? 0.3,
          maxOutputTokens: request.maxTokens ?? 1024,
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      });

      const latencyMs = Date.now() - startTime;
      const textOutput = response?.text || '';

      // Extracción estricta: ÚNICAMENTE las etiquetas que realmente aparecen en el texto generado
      const matchedCitations: string[] = [];
      for (const tag of availableTags) {
        if (textOutput.includes(tag)) {
          matchedCitations.push(tag);
        }
      }

      return {
        content: textOutput,
        citationTags: matchedCitations, // Solo las que efectivamente se citaron en el texto
        tokensPrompt: response?.usageMetadata?.promptTokenCount || Math.ceil(request.userPrompt.length / 4),
        tokensCompletion: response?.usageMetadata?.candidatesTokenCount || Math.ceil(textOutput.length / 4),
        providerName: this.name,
        modelName: activeModel,
        latencyMs,
        isFallback: false,
      };
    } catch (err: any) {
      const errMsg = err?.message || String(err);
      console.warn('[GeminiProvider] Fallo en generateContent:', errMsg);

      if (/API_KEY_INVALID|UNAUTHENTICATED|401|403/i.test(errMsg)) {
        throw new AIProviderError('AI_ERROR_AUTH', `GEMINI_AUTH_ERROR: ${errMsg}`, false, 401);
      }
      if (/RESOURCE_EXHAUSTED|429|quota/i.test(errMsg)) {
        throw new AIProviderError('AI_ERROR_QUOTA', `GEMINI_QUOTA_ERROR: ${errMsg}`, true, 429);
      }
      if (/NOT_FOUND|404/i.test(errMsg)) {
        throw new AIProviderError('AI_ERROR_MODEL_UNAVAILABLE', `GEMINI_MODEL_ERROR: ${errMsg}`, false, 404);
      }
      if (/timeout|aborted|deadline/i.test(errMsg)) {
        throw new AIProviderError('AI_ERROR_TIMEOUT', `GEMINI_TIMEOUT_ERROR: ${errMsg}`, true, 408);
      }

      throw new AIProviderError('AI_ERROR_NETWORK', `GEMINI_ERROR: ${errMsg}`, true, 500);
    }
  }
}


