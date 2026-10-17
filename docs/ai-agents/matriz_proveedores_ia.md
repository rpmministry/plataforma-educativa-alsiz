# Matriz Técnica de Proveedores de Inteligencia Artificial (ETAPA-08)

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Versión:** 2.0.0 (Producción)  
**Fecha:** 17 de octubre de 2026  
**Ámbito:** Orquestación Backend en [`ProviderManager`](file:///server/agents/providers/providerManager.ts)

---

## 1. Matriz Comparativa de Proveedores

| Parámetro | Google Gemini (Primario) | DeepSeek API (Secundario) | OpenRouter API (Terciario) | Simulador Local (Fallback) |
|---|---|---|---|---|
| **Identificador Interno** | `GOOGLE_GEMINI` / `GEMINI` | `DEEPSEEK_API` / `DEEPSEEK` | `OPENROUTER_API` / `OPENROUTER` | `SIMULATED_LOCAL` |
| **Rol en Cascada** | Proveedor Primario Oficial | Respaldo Primario de Alta Capacidad | Respaldo Terciario Multimodelo | Contingencia Socrática Offline |
| **Prioridad por Defecto** | 1 | 2 | 3 | 99 |
| **Modelo Predeterminado** | `gemini-3.8-flash` | `deepseek-chat` / `deepseek-flash` | `nvidia/nemotron-3.5-lightning:free` | `alsiz-socratic-local-v1` |
| **Nivel de Costo / Plan** | Gratuito (Google AI Studio Free Tier) | Comercial de bajo costo / Créditos | Gratuito (Modelos `:free`) | $0.00 (Motor de reglas TypeScript) |
| **Límite de Cuota Oficial** | 20 peticiones/día (Free Tier por proyecto) | Variable según saldo de cuenta | Variable según disponibilidad de enrutamiento | Ilimitado |
| **Latencia Típica Observada** | 2.5s – 3.8s (con `thinkingBudget: 0`) | 1.0s – 2.6s | 1.8s – 4.5s | < 5ms |
| **Optimización de Pensamiento** | `thinkingConfig: { thinkingBudget: 0 }` | Estándar directo sin retardo | Directo según modelo | Algorítmico socrático directo |
| **Timeout Máximo** | 30 000 ms (30 segundos) | 30 000 ms (30 segundos) | 30 000 ms (30 segundos) | Inmediato (< 500 ms) |
| **Reintentos Máximos** | 1 reintento serial | 1 reintento serial | 1 reintento serial | 0 (resolución inmediata) |
| **Manejo de Errores** | Mapea 429 a `AI_ERROR_QUOTA`, salta a cascada | Mapea errores HTTP a `AIProviderError` | Mapea caídas de modelo a `AIProviderError` | Nunca falla (salvaguarda de último nivel) |
| **Atribución de Fallback** | `isFallback: false` | `isFallback: false` | `isFallback: false` | `isFallback: true` (honesto y transparente) |
| **Verificación de Citas RAG** | Estricta (solo tags presentes en texto) | Estricta (solo tags presentes en texto) | Estricta (solo tags presentes en texto) | Estricta (incluye chunk 0 si aplica) |
| **Soporte de Voz (TTS)** | Vía Google Cloud TTS (`GOOGLE_TTS_API_KEY`)| N/A | N/A | Síntesis WebSpeech / MP3 |

---

## 2. Comportamiento Observado en Pruebas de Carga Real

Durante la ejecución de las pruebas reales de la Etapa 08 se obtuvieron las siguientes métricas reproducibles:

1. **Google Gemini (`gemini-3.8-flash`):**
   - **Llamada Exitosa:** En frío, una llamada sintética con `@google/genai` tardó **3675ms** con respuesta completa.
   - **Comportamiento ante Agotamiento de Cuota:** Al superar las 20 peticiones diarias del Free Tier de Google AI Studio, la API responde con HTTP 429 `RESOURCE_EXHAUSTED`.
   - **Manejo en ProviderManager:** El gestor atrapa el código 429, lo tipifica como error de cuota sin exponer el mensaje interno con la clave, y pasa inmediatamente a DeepSeek en 0ms adicionales.

2. **DeepSeek API (`deepseek-flash`):**
   - **Llamada Exitosa:** Latencia de **1025ms** en ping sintético directo y **2605ms** en la respuesta socrática de ciencias naturales ("Una planta es un ser vivo que crece en la tierra...").
   - **Resiliencia:** Actúa como respaldo de alta velocidad cuando Gemini entra en ventana de enfriamiento de cuota.

3. **Simulador Socrático Local (`SIMULATED_LOCAL`):**
   - **Disponibilidad:** 100% garantizada tanto en desarrollo como en producción.
   - **Latencia:** 2ms.
   - **Atribución:** Marca incondicionalmente `isFallback: true`, permitiendo a la interfaz de usuario informar al alumno y a los coordinadores que se está operando en modalidad de contingencia pedagógica socrática.

---

## 3. Matriz de Códigos de Error Estandarizados (`AIErrorCode`)

| Código | Significado | HTTP Status | Acción del Sistema |
|---|---|---|---|
| `AI_ERROR_AUTH` | Clave API faltante, inválida o revocada | 401 | Registra en log de auditoría sin exponer claves y salta al siguiente proveedor |
| `AI_ERROR_TIMEOUT` | La petición superó el tiempo límite configurado (`AI_TIMEOUT_MS`) | 408 | Cancela la conexión vía `AbortController`, registra métrica y reintenta 1 vez o salta |
| `AI_ERROR_QUOTA` | Cuota diaria o por minuto agotada en el proveedor (HTTP 429) | 429 | Salta inmediatamente al siguiente proveedor de la cascada |
| `AI_ERROR_RATE_LIMIT` | Estudiante superó límite de 15 req/min o 100 req/día | 429 | Bloquea la petición y orienta al alumno a reflexionar pedagógicamente |
| `AI_ERROR_BAD_REQUEST` | Petición malformada o llamada autónoma por temporizador (`isManualUserAction: false`)| 400 | Rechaza la llamada sin consumir tokens ni invocar al LLM |
| `AI_ERROR_NETWORK` | Error de conexión TCP o DNS hacia el proveedor | 503 | Reintenta 1 vez serialmente y salta en cascada |
| `AI_ALL_PROVIDERS_FAILED` | Todos los proveedores externos fallaron | 500 | Degrada automáticamente a `SIMULATED_LOCAL` con `isFallback: true` |

---

## 4. Gobernanza y Privacidad Infantil (LOPDP)

1. **Cero Retención de PII en Telemetría:** La tabla `ai_telemetry_logs` almacena únicamente `agent_code`, `provider_name`, `model_name`, `latency_ms`, `tokens_prompt`, `tokens_completion` y `status_code`. No se guardan nombres de alumnos, correos electrónicos, identificaciones ni direcciones IP directas.
2. **Filtrado de Entradas Sensibles:** Las preguntas que intenten solicitar contraseñas, PINs, cédulas o direcciones domiciliarias son interceptadas por las directivas socráticas de protección de datos, rechazando la solicitud con orientación formativa.
3. **Prohibición de Disparadores Autónomos:** Los temporizadores de frontend o tareas programadas no pueden emitir mensajes automáticos de profesores IA a los alumnos a menos que exista una acción manual interactiva del estudiante o docente tutor.

