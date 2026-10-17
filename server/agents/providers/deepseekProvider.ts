/**
 * ==============================================================================
 * Proveedor DeepSeek API (OpenAI Compatible)
 * Plataforma Educativa ALSIZ para Ekballo Church (ETAPA-08)
 * ==============================================================================
 */

import { ILLMProvider, LLMRequest, LLMResponse, AIProviderError } from '../types';

export class DeepSeekProvider implements ILLMProvider {
  public readonly name = 'DEEPSEEK_API';
  private readonly defaultModel = 'deepseek-chat';

  public isAvailable(): boolean {
    const key = process.env.DEEPSEEK_API_KEY;
    return Boolean(key && key.trim().length > 10);
  }

  public getModelName(): string {
    return (process.env.DEEPSEEK_MODEL || this.defaultModel).trim();
  }

  public async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();
    const apiKey = (process.env.DEEPSEEK_API_KEY || '').trim();

    if (!apiKey) {
      throw new AIProviderError(
        'AI_ERROR_AUTH',
        'DEEPSEEK_UNAVAILABLE: Clave DEEPSEEK_API_KEY no configurada.',
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
      ragBlock += '\n--- INSTRUCCIÓN DE CITACIÓN: Cita obligatoriamente las etiquetas [CODIGO#C#] de los fragmentos que utilices. Si no hay evidencia suficiente, indícalo honestamente. ---\n';
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

    const baseUrl = (process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1').replace(/\/+$/, '');
    const endpoint = baseUrl.endsWith('/chat/completions') ? baseUrl : `${baseUrl}/chat/completions`;

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: activeModel,
          messages,
          temperature: request.temperature ?? 0.3,
          max_tokens: request.maxTokens ?? 1024,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        if (res.status === 401 || res.status === 403) {
          throw new AIProviderError('AI_ERROR_AUTH', `DEEPSEEK_AUTH_ERROR: ${errorText.slice(0, 150)}`, false, res.status);
        }
        if (res.status === 429) {
          throw new AIProviderError('AI_ERROR_QUOTA', `DEEPSEEK_QUOTA_ERROR: ${errorText.slice(0, 150)}`, true, 429);
        }
        if (res.status === 404) {
          throw new AIProviderError('AI_ERROR_MODEL_UNAVAILABLE', `DEEPSEEK_MODEL_ERROR: ${errorText.slice(0, 150)}`, false, 404);
        }
        throw new AIProviderError('AI_ERROR_NETWORK', `DEEPSEEK_HTTP_ERROR_${res.status}: ${errorText.slice(0, 150)}`, true, res.status);
      }

      const data: any = await res.json();
      const textOutput = data?.choices?.[0]?.message?.content || '';
      const latencyMs = Date.now() - startTime;

      const matchedCitations: string[] = [];
      for (const tag of availableTags) {
        if (textOutput.includes(tag)) matchedCitations.push(tag);
      }

      return {
        content: textOutput,
        citationTags: matchedCitations, // Solo las que efectivamente se citaron en el texto
        tokensPrompt: data?.usage?.prompt_tokens || Math.ceil(request.userPrompt.length / 4),
        tokensCompletion: data?.usage?.completion_tokens || Math.ceil(textOutput.length / 4),
        providerName: this.name,
        modelName: data?.model || activeModel,
        latencyMs,
        isFallback: false,
      };
    } catch (err: any) {
      clearTimeout(timeout);
      if (err instanceof AIProviderError) throw err;
      if (err?.name === 'AbortError' || err?.code === 20) {
        throw new AIProviderError('AI_ERROR_TIMEOUT', `DEEPSEEK_TIMEOUT: Excedido límite de ${timeoutMs}ms`, true, 408);
      }
      throw new AIProviderError('AI_ERROR_NETWORK', `DEEPSEEK_NETWORK_ERROR: ${err?.message || err}`, true, 500);
    }
  }
}


