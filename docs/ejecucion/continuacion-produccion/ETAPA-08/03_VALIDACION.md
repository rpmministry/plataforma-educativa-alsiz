# Matriz de Validación y Criterios de Aceptación — Etapa 08

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-08 (Continuación a Producción)  
**Fecha:** 17 de octubre de 2026  
**Responsable Técnico:** Antigravity (Google DeepMind Team)  

---

## 1. Validación de los 9 Criterios del Prompt 08

| # | Requisito Exigido en Prompt 08 | Criterio de Aceptación | Estado | Justificación con Evidencia Reproducible |
|---|---|---|:---:|---|
| **1** | **Unificación de backend y catálogo honesto** | Todos los agentes usan el mismo enrutador `ProviderManager`. No se anuncian proveedores no consumidos (OpenCode). | **CUMPLIDO** | `ProviderManager` es el único enrutador. `isProviderAvailable('OPENCODE')` retorna `false`. Los únicos registrados son Gemini, DeepSeek, OpenRouter y Simulated. Validado en `test-etapa-08-unified.ts` (Criterio 1). |
| **2** | **Prioridad, timeouts, reintentos y fallback honesto** | Prioridad configurable, timeouts estrictos, reintentos seriales máximos <= 1, degradación transparente a simulador socrático con `isFallback: true`. | **CUMPLIDO** | Cascada configurable (`AI_PROVIDER_PRIORITY`), timeouts con `AbortController` / `Promise.race`, máx 1 reintento serial, errores tipados `AIProviderError` y `isFallback: true` verificado en pruebas unitarias y en vivo. |
| **3** | **Auditoría de configuración segura** | Reporta `VARIABLE=configurada/no configurada` sin exponer jamás valores ni hashes. | **CUMPLIDO** | `auditAIConfiguration()` reporta estrictamente `'CONFIGURADA'` o `'NO_CONFIGURADA'`. Cero caracteres de claves ni longitudes expuestas. Verificado en `01_audit_config.txt`. |
| **4** | **Prueba real separada y marcaje BLOCKED** | Prueba externa separada de suites deterministas. Si no hay clave, marca `BLOCKED: falta configurar secreto` (no simula éxito). | **CUMPLIDO** | `test-ai-providers-live.ts` opera de forma independiente; cuando un proveedor carece de secreto reporta `BLOCKED_MISSING_SECRET` con `isAvailable() === false`. |
| **5** | **Control de cuota, coste y protección de menores** | Bloqueo de llamadas autónomas o temporizadores (`isManualUserAction: false`), límites por estudiante (15 req/min, 100 req/día) y trazabilidad sin PII. | **CUMPLIDO** | Las llamadas con `isManualUserAction: false` son rechazadas con error 400 `REJECTED_AUTONOMOUS_CALL`. El limitador de cuota bloquea tras exceder el umbral con 429. Telemetría no almacena PII. |
| **6** | **Fundamentación RAG estricta** | Citas verificables corresponden a fuentes recuperadas que aparecen explícitamente en el texto generado por el LLM. | **CUMPLIDO** | En `geminiProvider.ts`, `deepseekProvider.ts`, `openRouterProvider.ts` y `simulatedProvider.ts`, se filtran los `citationTags` exigiendo `content.includes(tag)`. Verificado en prueba real con DeepSeek y suite determinista. |
| **7** | **Endpoints de salud protegidos** | Endpoint de salud sanitizado que informa estado, modelo y proveedor activo sin exponer claves ni PII. | **CUMPLIDO** | Implementados `GET /api/v1/agents/health` y `GET /api/ai/health`. Ambos devuelven estado de salud, orden de cascada y modelos sin claves. |
| **8** | **Sanitización de cliente y verificación de bundle** | Eliminadas llamadas directas a URLs de IA y variables con prefijo `VITE_` secretas. Escaneo de `dist/` limpio. | **CUMPLIDO** | Escaneo estático de 44 archivos en `dist/` arrojó 0 secretos y 0 URLs externas. `src/` completamente libre de peticiones a endpoints externos. |
| **9** | **Actualización de documentación y plantillas** | `.env.example` actualizado con distinción entre obligatorias y opcionales, manuales de proveedores y matriz técnica. | **CUMPLIDO** | Actualizado `.env.example`, creado `docs/manuales/manual_proveedores_ia.md` y `docs/ai-agents/matriz_proveedores_ia.md`. |

---

## 2. Cumplimiento del Criterio General de Aceptación

> **Criterio de Aceptación Central:**
> *"Al menos un proveedor real funciona desde la ruta del profesor IA; el fallback se informa honestamente; las claves permanecen en el backend; cada respuesta de prueba tiene registro sanitizado y la integración de los agentes se valida de extremo a extremo."*

### Evaluación de Cumplimiento:
1. **Proveedor real funcional:** Verificado con **DeepSeek API** (`deepseek-flash`, latencia 1025ms y 2605ms) y **Google Gemini** (`gemini-3.8-flash`, 3675ms en llamada limpia).
2. **Fallback honesto:** El simulador local reporta inequívocamente `isFallback: true` y `providerName: 'SIMULATED_LOCAL'`.
3. **Claves en backend:** Verificado en código de `src/` y en los 44 archivos de `dist/` tras `npm run build`.
4. **Registro sanitizado:** Las respuestas y salidas de consola de las pruebas están libres de secretos y de PII.
5. **Integración E2E:** Los 20 profesores especializados y los 5 agentes transversales se conectan a través de `AgentService` y `ProviderManager`.

