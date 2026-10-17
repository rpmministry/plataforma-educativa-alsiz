/**
 * ==============================================================================
 * Proveedor OpenRouter API (Server-Side)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 */

import { ILLMProvider, LLMRequest, LLMResponse, AIProviderError } from '../types';

export class OpenRouterProvider implements ILLMProvider {
  public readonly name = 'OPENROUTER_API';
  private readonly defaultModel = 'nvidia/nemotron-3.5-lightning:free';

  public isAvailable(): boolean {
    const key = process.env.OPENROUTER_API_KEY;
    return Boolean(key && key.trim().length > 10);
  }

  public getModelName(): string {
    const raw = (process.env.OPENROUTER_MODEL || this.defaultModel).trim();
    const first = raw.split(',')[0].trim();
    return first || this.defaultModel;
  }

  public async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();
    const apiKey = (process.env.OPENROUTER_API_KEY || '').trim();

    if (!apiKey) {
      throw new AIProviderError(
        'AI_ERROR_AUTH',
        'OPENROUTER_UNAVAILABLE: Clave OPENROUTER_API_KEY no configurada.',
        false,
        401
      );
    }

    const activeModel = this.getModelName();
    let ragBlock = '';
    const availableTags: string[] = [];
    if (request.ragContext && request.ragContext.length > 0) {
      ragBlock = '\n\n--- MATERIALES CURRICULARES AUTORIZADOS ---\n';
      for (const chunk of request.ragContext) {
        ragBlock += `\n[FUENTE: ${chunk.sourceTitle} | ETIQUETA: ${chunk.citationTag}]\n${chunk.contentText}\n`;
        availableTags.push(chunk.citationTag);
      }
      ragBlock += '\n--- INSTRUCCIÓN DE CITACIÓN: Cita obligatoriamente las etiquetas [CODIGO#C#] de los fragmentos que utilices. Si no hay evidencia suficiente, indícalo con honestidad. ---\n';
    }

    const messages: any[] = [
      {
        role: 'system',
        content: `${request.systemPrompt}\n\nESTILO: ${request.pedagogicalStyle || 'Socrático'}\nSEGURIDAD: ${request.safetyRestrictions || 'No dar diagnósticos médicos.'}${ragBlock}`,
      },
    ];

    if (request.history && request.history.length > 0) {
      for (const h of request.history) {
        messages.push({
          role: h.role === 'model' ? 'assistant' : 'user',
          content: h.content,
        });
      }
    }

    messages.push({
      role: 'user',
      content: request.userPrompt,
    });

    const timeoutMs = request.timeoutMs || Number(process.env.AI_PROVIDER_TIMEOUT_MS) || 8000;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': process.env.APP_URL || 'https://alsiz.ekballochurch.org',
          'X-Title': 'Plataforma Educativa ALSIZ',
        },
        body: JSON.stringify({
          model: activeModel,
          messages,
          temperature: request.temperature ?? 0.7,
          max_tokens: request.maxTokens ?? 1024,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        if (response.status === 401 || response.status === 403) {
          throw new AIProviderError('AI_ERROR_AUTH', `OPENROUTER_AUTH_ERROR: ${errorText.slice(0, 150)}`, false, response.status);
        }
        if (response.status === 429) {
          throw new AIProviderError('AI_ERROR_QUOTA', `OPENROUTER_QUOTA_ERROR: ${errorText.slice(0, 150)}`, true, 429);
        }
        if (response.status === 404) {
          throw new AIProviderError('AI_ERROR_MODEL_UNAVAILABLE', `OPENROUTER_MODEL_ERROR: ${errorText.slice(0, 150)}`, false, 404);
        }
        throw new AIProviderError('AI_ERROR_NETWORK', `OpenRouter HTTP ${response.status}: ${errorText.slice(0, 150)}`, true, response.status);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      const latencyMs = Date.now() - startTime;

      const matchedCitations: string[] = [];
      for (const tag of availableTags) {
        if (content.includes(tag)) matchedCitations.push(tag);
      }

      return {
        content,
        citationTags: matchedCitations, // Solo las que efectivamente se citaron en el texto
        tokensPrompt: data.usage?.prompt_tokens || 0,
        tokensCompletion: data.usage?.completion_tokens || 0,
        providerName: this.name,
        modelName: data.model || activeModel,
        latencyMs,
        isFallback: false,
      };
    } catch (err: any) {
      clearTimeout(timeout);
      if (err instanceof AIProviderError) throw err;
      if (err?.name === 'AbortError' || err?.code === 20) {
        throw new AIProviderError('AI_ERROR_TIMEOUT', `OPENROUTER_TIMEOUT: Excedido límite de ${timeoutMs}ms`, true, 408);
      }
      throw new AIProviderError('AI_ERROR_NETWORK', `OPENROUTER_NETWORK_ERROR: ${err?.message || err}`, true, 500);
    }
  }
}


