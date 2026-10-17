# Registro de Cambios — Etapa 08: Configuración Verificable de APIs de IA y Prueba Real de Proveedores

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-08 (Continuación a Producción)  
**Rama de Trabajo:** `continuacion-produccion-etapa-08`  
**Commit Inicial:** `ae0a63c2ad37711a93b984a104e6157f765ea56e`  
**Fecha:** 17 de octubre de 2026  
**Responsable Técnico:** Antigravity (Google DeepMind Team)  

---

## 1. Resumen Ejecutivo de Modificaciones

Durante la Etapa 08 se auditó y unificó toda la infraestructura de ejecución de modelos de lenguaje en el backend de la plataforma ALSIZ, garantizando que los 25 agentes IA operen mediante un único orquestador con cascada de contingencia, timeouts estrictos, límites de cuota para menores y verificación honesta de proveedores externos reales.

---

## 2. Detalle de Archivos Modificados y Creados

### A. Capa de Proveedores y Orquestación Backend

1. **[`server/agents/types.ts`](file:///server/agents/types.ts):**
   - Agregada la interfaz tipada `AIErrorCode` (`AI_ERROR_AUTH`, `AI_ERROR_TIMEOUT`, `AI_ERROR_QUOTA`, `AI_ERROR_MODEL_UNAVAILABLE`, `AI_ERROR_NETWORK`, `AI_ERROR_RATE_LIMIT`, `AI_ERROR_BAD_REQUEST`, `AI_ALL_PROVIDERS_FAILED`).
   - Creada la clase estándar `AIProviderError` que encapsula código, reintentabilidad y código de estado HTTP.
   - Extendida la interfaz `LLMRequest` con `timeoutMs`, `studentId`, `isManualUserAction`.
   - Extendida la interfaz `LLMResponse` con `isFallback: boolean`.
   - Creadas las interfaces `ProviderStatusInfo` y `AIHealthReport` con `activeCascadeOrder`.

2. **[`server/agents/providers/providerManager.ts`](file:///server/agents/providers/providerManager.ts):**
   - Implementada la orquestación unificada como único punto de entrada para todos los agentes de la plataforma.
   - Implementado control de cuota por estudiante (`checkRateLimit`): máximo 15 solicitudes por minuto y 100 por día por alumno.
   - Implementado el rechazo obligatorio de llamadas autónomas o automáticas por temporizador (`isManualUserAction: false`), arrojando `AI_ERROR_BAD_REQUEST` con mensaje `REJECTED_AUTONOMOUS_CALL`.
   - Implementada la cascada configurable (`getPriorityOrder`) leyendo `AI_PROVIDER_PRIORITY` (default: `GEMINI,DEEPSEEK,OPENROUTER`).
   - Implementado límite estricto de máximo 1 reintento serial ante errores transitorios (`executeWithTimeout`).
   - Implementado reporte de salud sanitizado `getHealthReport()` con disponibilidad de proveedores, modelos activos y cero exposición de credenciales o PII.

3. **[`server/agents/providers/geminiProvider.ts`](file:///server/agents/providers/geminiProvider.ts):**
   - Integrado el SDK oficial `@google/genai` con modelo configurable (`gemini-3.8-flash`).
   - Configurado `thinkingConfig: { thinkingBudget: 0 }` para eliminar retardos excesivos en producción.
   - Corregida la extracción de citas RAG: sólo se devuelven en `citationTags` aquellas etiquetas presentes literalmente en el texto generado (`text.includes(chunk.citationTag)`).
   - Manejo tipado de errores (clasificación de 429 como `AI_ERROR_QUOTA`).

4. **[`server/agents/providers/deepseekProvider.ts`](file:///server/agents/providers/deepseekProvider.ts):**
   - Integrada la API oficial de DeepSeek con modelo configurable (`deepseek-chat` / `deepseek-flash`).
   - Implementado timeout estricto con `AbortController`.
   - Corregida la extracción de citas RAG exactas.
   - Manejo tipado de errores con `AIProviderError`.

5. **[`server/agents/providers/openRouterProvider.ts`](file:///server/agents/providers/openRouterProvider.ts):**
   - Integrada la API de OpenRouter con soporte para modelos gratuitos activos (`nvidia/nemotron-3.5-lightning:free`).
   - Implementado timeout con `AbortController` y extracción estricta de citas RAG.

6. **[`server/agents/providers/simulatedProvider.ts`](file:///server/agents/providers/simulatedProvider.ts):**
   - Actualizado para marcar honestamente `isFallback: true` cuando se ejecuta en modalidad de contingencia.
   - Mantenida la salvaguarda de protección infantil, rechazo de inyecciones de prompt y fundamentación socrática.

### B. Servicios y Rutas del Servidor

7. **[`server/agents/agentService.ts`](file:///server/agents/agentService.ts):**
   - Conectada la llamada a `ProviderManager.generateResponse()` inyectando `studentId` y `isManualUserAction: true`.
   - Separados formalmente los fragmentos recuperados en `rag_sources_json` de las citas realmente utilizadas en `citation_tags_json`.
   - Registro de telemetría sin PII de menores en `ai_telemetry_logs`.

8. **[`server/routes/agentRoutes.ts`](file:///server/routes/agentRoutes.ts):**
   - Añadido el endpoint sanitizado `GET /api/v1/agents/health`.
   - Validación de `isManualUserAction` en las peticiones de envío de mensajes.

9. **[`server.ts`](file:///server.ts):**
   - Reemplazada la lógica heredada `executeResilientAIPipeline` y `callGeminiWithModelFallback` por delegación directa a `ProviderManager.generateResponse()`.
   - Actualizados `/api/ai/teacher-chat` y `/api/ai/analyze-work` para usar `ProviderManager` e informar `isOfflineSimulation: result.isFallback`.
   - Añadido el endpoint de salud `GET /api/ai/health`.

### C. Esquema y Migraciones de Base de Datos

10. **[`server/db/migrations/013_ai_agents_complete_catalog.sql`](file:///server/db/migrations/013_ai_agents_complete_catalog.sql):**
    - Corregida la integridad referencial para ejecuciones limpias de producción: asegurada la inserción de los programas canónicos (`prog-homeschool`) y niveles (`lvl-elem-4`, `lvl-sup-8`) antes de las asignaturas, y consulta segura de `default_teacher_id` con subquery `(SELECT id FROM users WHERE id = 'usr-teacher-01')`.

### D. Plantillas y Manuales Operativos

11. **[`.env.example`](file:///.env.example):**
    - Sincronizada la sección de IA distinguiendo claves obligatorias de opcionales, prioridades, timeouts y límites de cuota para menores.

12. **[`docs/manuales/manual_proveedores_ia.md`](file:///docs/manuales/manual_proveedores_ia.md):**
    - Manual operativo detallando arquitectura, gobernanza, gestión de claves y endpoints de salud.

13. **[`docs/ai-agents/matriz_proveedores_ia.md`](file:///docs/ai-agents/matriz_proveedores_ia.md):**
    - Matriz comparativa con latencias reales, planes de cuota y códigos de error tipados.

### E. Scripts de Verificación y Evidencias

14. **[`scripts/test-ai-providers-config.ts`](file:///scripts/test-ai-providers-config.ts):** Auditoría de configuración segura (solo presencia de claves, cero exposición de secretos).
15. **[`scripts/test-ai-providers-live.ts`](file:///scripts/test-ai-providers-live.ts):** Prueba en vivo de conexión con APIs externas reales.
16. **[`scripts/test-etapa-08-unified.ts`](file:///scripts/test-etapa-08-unified.ts):** Suite unificada determinista que valida los 9 criterios del Prompt 08.
17. **Carpeta de Evidencias:** `docs/ejecucion/continuacion-produccion/ETAPA-08/evidencias/` con registros reproducibles de ejecución.

