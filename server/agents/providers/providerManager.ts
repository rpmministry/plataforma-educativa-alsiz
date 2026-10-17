/**
 * ==============================================================================
 * Administrador de Proveedores LLM con Cascada, Resiliencia y Control de Cuota
 * Plataforma Educativa ALSIZ para Ekballo Church (ETAPA-08)
 * ==============================================================================
 */

import {
  ILLMProvider,
  LLMRequest,
  LLMResponse,
  AIProviderError,
  AIHealthReport,
  ProviderStatusInfo,
} from '../types';
import { GeminiProvider } from './geminiProvider';
import { DeepSeekProvider } from './deepseekProvider';
import { OpenRouterProvider } from './openRouterProvider';
import { SimulatedProvider } from './simulatedProvider';

export class ProviderManager {
  private static gemini = new GeminiProvider();
  private static deepseek = new DeepSeekProvider();
  private static openrouter = new OpenRouterProvider();
  private static simulated = new SimulatedProvider();

  // Control de cuota y volumen por alumno (evita gastos excesivos y protege a menores)
  private static requestLogsByStudent: Map<string, number[]> = new Map();
  private static dailyCountByStudent: Map<string, { date: string; count: number }> = new Map();

  public static getAvailableProviders(): string[] {
    const list: string[] = ['SIMULATED_LOCAL'];
    if (this.gemini.isAvailable()) list.push(this.gemini.name);
    if (this.deepseek.isAvailable()) list.push(this.deepseek.name);
    if (this.openrouter.isAvailable()) list.push(this.openrouter.name);
    return list;
  }

  public static isProviderAvailable(providerName: string): boolean {
    const upper = providerName.toUpperCase();
    if (upper === 'GOOGLE_GEMINI' || upper === 'GEMINI') return this.gemini.isAvailable();
    if (upper === 'DEEPSEEK_API' || upper === 'DEEPSEEK') return this.deepseek.isAvailable();
    if (upper === 'OPENROUTER_API' || upper === 'OPENROUTER') return this.openrouter.isAvailable();
    if (upper === 'SIMULATED_LOCAL' || upper === 'SIMULATED') return true;
    return false;
  }

  public static checkRateLimit(studentId?: string, isManualUserAction?: boolean): void {
    if (isManualUserAction === false) {
      throw new AIProviderError(
        'AI_ERROR_BAD_REQUEST',
        'REJECTED_AUTONOMOUS_CALL: Las llamadas autónomas por temporizador están prohibidas para proteger las cuotas.',
        false,
        400
      );
    }

    if (!studentId) return;

    const now = Date.now();
    const maxPerMinute = Number(process.env.AI_STUDENT_MAX_REQ_PER_MIN || 15);
    const maxPerDay = Number(process.env.AI_STUDENT_MAX_REQ_PER_DAY || 100);

    // 1. Minuto
    const recent = this.requestLogsByStudent.get(studentId) || [];
    const oneMinAgo = now - 60000;
    const filteredRecent = recent.filter((t) => t > oneMinAgo);
    if (filteredRecent.length >= maxPerMinute) {
      throw new AIProviderError(
        'AI_ERROR_RATE_LIMIT',
        `RATE_LIMIT_EXCEEDED: Has alcanzado el límite de ${maxPerMinute} preguntas por minuto. Tómate un momento para reflexionar en lo aprendido.`,
        true,
        429
      );
    }
    filteredRecent.push(now);
    this.requestLogsByStudent.set(studentId, filteredRecent);

    // 2. Diario
    const today = new Date().toISOString().slice(0, 10);
    const daily = this.dailyCountByStudent.get(studentId) || { date: today, count: 0 };
    if (daily.date !== today) {
      daily.date = today;
      daily.count = 0;
    }
    if (daily.count >= maxPerDay) {
      throw new AIProviderError(
        'AI_ERROR_RATE_LIMIT',
        `DAILY_LIMIT_EXCEEDED: Has completado tus ${maxPerDay} interacciones didácticas de hoy. Consulta con tu profesor o tutor familiar.`,
        false,
        429
      );
    }
    daily.count++;
    this.dailyCountByStudent.set(studentId, daily);
  }

  public static async executeWithTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
    let timer: NodeJS.Timeout;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timer = setTimeout(
        () => reject(new AIProviderError('AI_ERROR_TIMEOUT', `TIMEOUT_${label}: Excedido el tiempo límite de ${timeoutMs}ms.`, true, 408)),
        timeoutMs
      );
    });

    try {
      const res = await Promise.race([promise, timeoutPromise]);
      clearTimeout(timer!);
      return res;
    } catch (err) {
      clearTimeout(timer!);
      throw err;
    }
  }

  public static getPriorityOrder(): Array<{ id: string; provider: ILLMProvider }> {
    const prioritySetting = (process.env.AI_PROVIDER_PRIORITY || 'GEMINI,DEEPSEEK,OPENROUTER')
      .split(',')
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);

    const map: Record<string, ILLMProvider> = {
      GEMINI: this.gemini,
      GOOGLE_GEMINI: this.gemini,
      DEEPSEEK: this.deepseek,
      DEEPSEEK_API: this.deepseek,
      OPENROUTER: this.openrouter,
      OPENROUTER_API: this.openrouter,
    };

    const ordered: Array<{ id: string; provider: ILLMProvider }> = [];
    for (const p of prioritySetting) {
      const prov = map[p];
      if (prov && !ordered.some((o) => o.provider === prov)) {
        ordered.push({ id: p, provider: prov });
      }
    }

    if (!ordered.some((o) => o.provider === this.gemini)) ordered.push({ id: 'GEMINI', provider: this.gemini });
    if (!ordered.some((o) => o.provider === this.deepseek)) ordered.push({ id: 'DEEPSEEK', provider: this.deepseek });
    if (!ordered.some((o) => o.provider === this.openrouter)) ordered.push({ id: 'OPENROUTER', provider: this.openrouter });

    return ordered;
  }

  /**
   * Genera respuesta orquestando la cascada:
   * 1. Validación de cuota y llamada manual del estudiante.
   * 2. Si se solicita expresamente un proveedor (ej. en pruebas de aislamiento), se invoca ese.
   * 3. Cascada configurada (Gemini -> DeepSeek -> OpenRouter) con máx 1 reintento serial.
   * 4. Salvaguarda inquebrantable: Proveedor Simulado Socrático Local (marcado como fallback).
   */
  public static async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    // 1. Control de cuota y protección de menores
    this.checkRateLimit(request.studentId, request.isManualUserAction);

    const timeoutMs = request.timeoutMs || Number(process.env.AI_PROVIDER_TIMEOUT_MS) || 8000;
    const maxRetries = Math.min(1, Math.max(0, Number(process.env.AI_MAX_RETRIES ?? 1)));

    // 2. Caso forzado (para tests de aislamiento o requerimientos específicos)
    if (request.forceProvider) {
      const forced = request.forceProvider.toUpperCase();
      if (forced === 'SIMULATED' || forced === 'SIMULATED_LOCAL') {
        const simRes = await this.simulated.generateResponse(request);
        return { ...simRes, isFallback: true };
      }

      let targetProvider: ILLMProvider | null = null;
      if (forced === 'GEMINI' || forced === 'GOOGLE_GEMINI') targetProvider = this.gemini;
      else if (forced === 'DEEPSEEK' || forced === 'DEEPSEEK_API') targetProvider = this.deepseek;
      else if (forced === 'OPENROUTER' || forced === 'OPENROUTER_API') targetProvider = this.openrouter;

      if (!targetProvider) {
        throw new AIProviderError('AI_ERROR_BAD_REQUEST', `PROVEEDOR_DESCONOCIDO: ${request.forceProvider}`, false, 400);
      }

      if (!targetProvider.isAvailable()) {
        throw new AIProviderError('AI_ERROR_AUTH', `BLOCKED: falta configurar secreto para ${forced}`, false, 401);
      }

      return await this.executeWithTimeout(
        targetProvider.generateResponse({ ...request, timeoutMs }),
        timeoutMs,
        forced
      );
    }

    // 3. Cascada jerárquica con reintentos controlados
    const priorityList = this.getPriorityOrder();
    for (const { id, provider } of priorityList) {
      if (!provider.isAvailable()) continue;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          const response = await this.executeWithTimeout(
            provider.generateResponse({ ...request, timeoutMs }),
            timeoutMs,
            id
          );
          return {
            ...response,
            isFallback: false,
          };
        } catch (err: any) {
          const isRetryable = err instanceof AIProviderError ? err.retryable : true;
          console.warn(`[ProviderManager] Falló ${id} (intento ${attempt + 1}/${maxRetries + 1}): ${err?.message || err}`);

          if (!isRetryable || attempt >= maxRetries) {
            break; // Siguiente proveedor en la cascada
          }

          // Espera breve (backoff de 800ms) antes del único reintento serial
          await new Promise((resolve) => setTimeout(resolve, 800));
        }
      }
    }

    // 4. Salvaguarda inquebrantable: Fallback socrático local
    console.info('[ProviderManager] Activando degradación elegante a SIMULATED_LOCAL.');
    const simulatedResponse = await this.simulated.generateResponse(request);
    return {
      ...simulatedResponse,
      isFallback: true,
    };
  }

  /**
   * Reporte de salud e inventario de proveedores (sanitizado, sin secretos ni PII)
   */
  public static getHealthReport(): AIHealthReport {
    const geminiConfigured = this.gemini.isAvailable();
    const deepseekConfigured = this.deepseek.isAvailable();
    const openrouterConfigured = this.openrouter.isAvailable();

    const providers: ProviderStatusInfo[] = [
      {
        name: 'GOOGLE_GEMINI',
        status: geminiConfigured ? 'CONFIGURED' : 'BLOCKED_SECRET_MISSING',
        model: this.gemini.getModelName(),
        priority: 1,
        isPrimary: true,
        isFallback: false,
      },
      {
        name: 'DEEPSEEK_API',
        status: deepseekConfigured ? 'CONFIGURED' : 'BLOCKED_SECRET_MISSING',
        model: this.deepseek.getModelName(),
        priority: 2,
        isPrimary: false,
        isFallback: false,
      },
      {
        name: 'OPENROUTER_API',
        status: openrouterConfigured ? 'CONFIGURED' : 'BLOCKED_SECRET_MISSING',
        model: this.openrouter.getModelName(),
        priority: 3,
        isPrimary: false,
        isFallback: false,
      },
      {
        name: 'SIMULATED_LOCAL',
        status: 'AVAILABLE',
        model: 'alsiz-socratic-local-v1',
        priority: 99,
        isPrimary: false,
        isFallback: true,
      },
    ];

    let status: 'HEALTHY' | 'DEGRADED' | 'OFFLINE' = 'DEGRADED';
    if (geminiConfigured || deepseekConfigured) {
      status = 'HEALTHY';
    } else if (openrouterConfigured) {
      status = 'DEGRADED';
    }

    const active = geminiConfigured
      ? 'GOOGLE_GEMINI'
      : deepseekConfigured
      ? 'DEEPSEEK_API'
      : openrouterConfigured
      ? 'OPENROUTER_API'
      : 'SIMULATED_LOCAL';

    return {
      status,
      timestamp: new Date().toISOString(),
      activeProvider: active,
      activeCascadeOrder: this.getPriorityOrder().map((p) => p.id),
      providers,
      quotaPolicy: {
        maxRequestsPerMinute: Number(process.env.AI_STUDENT_MAX_REQ_PER_MIN || 15),
        maxDailyPerStudent: Number(process.env.AI_STUDENT_MAX_REQ_PER_DAY || 100),
        mode: 'ON_DEMAND_STUDENT_ACTIVITY',
      },
    };
  }
}
