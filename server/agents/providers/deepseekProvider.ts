/**
 * ==============================================================================
 * Proveedor DeepSeek API (OpenAI Compatible)
 * Plataforma Educativa ALSIZ para Ekballo Church (ETAPA-08)
 * ==============================================================================
 */

import { ILLMProvider, LLMRequest, LLMResponse } from '../types';

export class DeepSeekProvider implements ILLMProvider {
  public readonly name = 'DEEPSEEK_API';
  private readonly defaultModel = 'deepseek-chat';

  public isAvailable(): boolean {
    const key = process.env.DEEPSEEK_API_KEY;
    return Boolean(key && key.trim().length > 10);
  }

  public async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    const startTime = Date.now();
    const apiKey = (process.env.DEEPSEEK_API_KEY || '').trim();

    if (!apiKey) {
      throw new Error('DEEPSEEK_UNAVAILABLE: Clave DEEPSEEK_API_KEY no configurada.');
    }

    let ragBlock = '';
    const citationTags: string[] = [];
    if (request.ragContext && request.ragContext.length > 0) {
      ragBlock = '\n\n--- MATERIALES CURRICULARES AUTORIZADOS ---\n';
      for (const chunk of request.ragContext) {
        ragBlock += `\n[FUENTE: ${chunk.sourceTitle} | ETIQUETA: ${chunk.citationTag}]\n${chunk.contentText}\n`;
        citationTags.push(chunk.citationTag);
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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout

    try {
      const res = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: (process.env.DEEPSEEK_MODEL || this.defaultModel).trim(),
          messages,
          temperature: request.temperature ?? 0.3,
          max_tokens: request.maxTokens ?? 1024,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        throw new Error(`DEEPSEEK_HTTP_ERROR_${res.status}: ${errorText.slice(0, 150)}`);
      }

      const data: any = await res.json();
      const textOutput = data?.choices?.[0]?.message?.content || '';
      const latencyMs = Date.now() - startTime;

      const matchedCitations: string[] = [];
      for (const tag of citationTags) {
        if (textOutput.includes(tag)) matchedCitations.push(tag);
      }

      return {
        content: textOutput,
        citationTags: matchedCitations.length > 0 ? matchedCitations : citationTags,
        tokensPrompt: data?.usage?.prompt_tokens || Math.ceil(request.userPrompt.length / 4),
        tokensCompletion: data?.usage?.completion_tokens || Math.ceil(textOutput.length / 4),
        providerName: this.name,
        modelName: data?.model || this.defaultModel,
        latencyMs,
        isFallback: false,
      };
    } catch (err: any) {
      clearTimeout(timeout);
      throw err;
    }
  }
}

