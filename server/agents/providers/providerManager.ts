/**
 * ==============================================================================
 * Administrador de Proveedores LLM con Cascada y Degradación Elegante
 * Plataforma Educativa ALSIZ para Ekballo Church (ETAPA-08)
 * ==============================================================================
 */

import { ILLMProvider, LLMRequest, LLMResponse } from '../types';
import { GeminiProvider } from './geminiProvider';
import { DeepSeekProvider } from './deepseekProvider';
import { SimulatedProvider } from './simulatedProvider';

export class ProviderManager {
  private static gemini = new GeminiProvider();
  private static deepseek = new DeepSeekProvider();
  private static simulated = new SimulatedProvider();

  public static getAvailableProviders(): string[] {
    const list: string[] = ['SIMULATED_LOCAL'];
    if (this.gemini.isAvailable()) list.push(this.gemini.name);
    if (this.deepseek.isAvailable()) list.push(this.deepseek.name);
    return list;
  }

  public static async executeWithTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
    let timer: NodeJS.Timeout;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error(`TIMEOUT_${label}: Excedido el tiempo límite de ${timeoutMs}ms.`)), timeoutMs);
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

  /**
   * Genera respuesta orquestando la cascada:
   * 1. Si se solicita expresamente un proveedor (ej. en pruebas de aislamiento), se invoca ese.
   * 2. Intento primario: Gemini (si configurado).
   * 3. Intento secundario: DeepSeek (si configurado).
   * 4. Salvaguarda inquebrantable: Proveedor Simulado Socrático Local.
   */
  public static async generateResponse(request: LLMRequest): Promise<LLMResponse> {
    // Caso 1: Forzado a proveedor específico (utilizado en testing y simulación determinista)
    if (request.forceProvider === 'SIMULATED' || request.forceProvider === 'SIMULATED_LOCAL') {
      return this.simulated.generateResponse(request);
    }

    if (request.forceProvider === 'DEEPSEEK' && this.deepseek.isAvailable()) {
      return this.deepseek.generateResponse(request);
    }

    if (request.forceProvider === 'GEMINI' && this.gemini.isAvailable()) {
      return this.gemini.generateResponse(request);
    }

    // Caso 2: Intento primario con Gemini
    if (this.gemini.isAvailable()) {
      try {
        return await this.executeWithTimeout(this.gemini.generateResponse(request), 8000, 'GEMINI');
      } catch (err: any) {
        console.warn(`[ProviderManager] Falló Gemini (${err.message}). Intentando siguiente proveedor...`);
      }
    }

    // Caso 3: Intento secundario con DeepSeek
    if (this.deepseek.isAvailable()) {
      try {
        return await this.executeWithTimeout(this.deepseek.generateResponse(request), 8000, 'DEEPSEEK');
      } catch (err: any) {
        console.warn(`[ProviderManager] Falló DeepSeek (${err.message}). Intentando fallback local...`);
      }
    }

    // Caso 4: Degradación elegante a Simulador Local Socrático (Garantiza cero 500 para el usuario)
    const simulatedResponse = await this.simulated.generateResponse(request);
    return {
      ...simulatedResponse,
      isFallback: true,
    };
  }
}

