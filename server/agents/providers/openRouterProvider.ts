/**
 * ==============================================================================
 * Proveedor OpenRouter API (Server-Side)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 */

import { ILLMProvider, LLMRequest, LLMResponse } from '../types';

export class OpenRouterProvider implements ILLMProvider {
  public readonly name = 'OPENROUTER_API';
  private readonly defaultModel = process.env.AI_TIER1_MODEL || 'meta-llama/llama-3.3-70b-instruct:free';

  public isAvailable(): boolean {
    const key = process.env.OPENROUTER_API_KEY;
    return Boolean(key && key.trim().length > 10);
  }

  public async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();
    const apiKey = (process.env.OPENROUTER_API_KEY || '').trim();

    if (!apiKey) {
      throw new Error('OPENROUTER_UNAVAILABLE: Clave OPENROUTER_API_KEY no configurada.');
    }

    let ragBlock = '';
    const citationTags: string[] = [];
    if (request.ragContext && request.ragContext.length > 0) {
      ragBlock = '\n\n--- MATERIALES CURRICULARES AUTORIZADOS ---\n';
      for (const chunk of request.ragContext) {
        ragBlock += `\n[FUENTE: ${chunk.sourceTitle} | ETIQUETA: ${chunk.citationTag}]\n${chunk.contentText}\n`;
        citationTags.push(chunk.citationTag);
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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

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
          model: this.defaultModel,
          messages,
          temperature: request.temperature ?? 0.7,
          max_tokens: request.maxTokens ?? 1024,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter HTTP ${response.status}: ${errorText.slice(0, 150)}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || '';
      const latencyMs = Date.now() - startTime;

      return {
        content,
        citationTags,
        tokensPrompt: data.usage?.prompt_tokens || 0,
        tokensCompletion: data.usage?.completion_tokens || 0,
        providerName: this.name,
        modelName: data.model || this.defaultModel,
        latencyMs,
        isFallback: false,
      };
    } catch (err: any) {
      clearTimeout(timeout);
      throw err;
    }
  }
}

