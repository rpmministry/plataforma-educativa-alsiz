# Plan de Ejecución — Etapa 08: Configuración Verificable de APIs de IA y Prueba Real de Proveedores

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-08 (Continuación a Producción)  
**Rama de Trabajo:** `continuacion-produccion-etapa-08`  
**Commit Inicial:** `ae0a63c2ad37711a93b984a104e6157f765ea56e`  
**Fecha:** 17 de octubre de 2026  
**Responsable Técnico:** Antigravity (Google DeepMind Team)  

---

## 1. Objetivos de la Etapa

El objetivo central de la Etapa 08 es enlazar los 25 profesores y tutores IA de la plataforma ALSIZ con proveedores LLM externos reales, garantizando:
1. **Unificación Arquitectónica:** Todos los agentes y rutas de IA (incluyendo rutas legadas del profesor como `/api/ai/teacher-chat`) convergen en un único gestor backend (`ProviderManager`), eliminando llamadas dispersas y duplicidad de lógica.
2. **Prioridad, Resiliencia y Fallback Honesto:** Cascada jerárquica con tiempos límite estrictos (timeouts), límite de 1 reintento serial ante fallos transitorios, y degradación elegante al simulador socrático local (`SIMULATED_LOCAL`), explícitamente identificado al usuario y en métricas.
3. **Cero Fuga de Credenciales (P0):** Claves API alojadas exclusivamente en el backend (servidor Node.js). Cero variables `VITE_*` secretas en frontend y verificación estática en `dist/`.
4. **Verificación Determinista y Conexión Real:**
   - Prueba de configuración segura que reporta únicamente `VARIABLE=configurada/no configurada` sin exponer jamás valores.
   - Prueba de conexión real externa separada, que envía peticiones sintéticas no sensibles y marca `BLOCKED: falta configurar secreto` si falta alguna clave.
5. **Protección Presupuestaria y Seguridad Infantil (LOPDP):** Límites de cuota por estudiante (15 req/min, 100 req/día), activación manual/actividad sin llamadas autónomas por temporizador, y trazabilidad sin PII de menores.
6. **Fundamentación RAG Estricta:** Separación entre fuentes recuperadas (`retrievedChunks`) y citas realmente presentes en la respuesta (`citationTags`).
7. **Endpoint de Salud Sanitizado:** `GET /api/v1/agents/health` y `GET /api/ai/health`.
8. **Documentación Integral:** Actualización de `.env.example`, manual de proveedores y matriz técnica.

---

## 2. Alcance y Límites de la Etapa

### Dentro del Alcance
- Auditoría y refactorización de `server/agents/providers/providerManager.ts`, `geminiProvider.ts`, `deepseekProvider.ts`, `openRouterProvider.ts`, `simulatedProvider.ts`.
- Auditoría y unificación de `executeResilientAIPipeline` en `server.ts` y `/api/ai/teacher-chat` para consumir `ProviderManager`.
- Corrección de la validación de etiquetas de citación RAG en todos los proveedores.
- Implementación de control de cuotas y limitador de tasa para alumnos en `AgentService` / `ProviderManager`.
- Creación de endpoint de salud `GET /api/v1/agents/health` y `GET /api/ai/health`.
- Creación de scripts:
  - `scripts/test-ai-providers-config.ts` (auditoría segura de configuración).
  - `scripts/test-ai-providers-live.ts` (prueba de conexión real externa).
  - `scripts/test-etapa-08-unified.ts` (suite integral de validación).
- Compilación `npm run build` y escaneo con `scripts/test-scan-dist-secrets.ts`.
- Documentación: `docs/manuales/manual_proveedores_ia.md`, `docs/ai-agents/matriz_proveedores_ia.md`, `.env.example`.
- Documentación formal de ejecución en `docs/ejecucion/continuacion-produccion/ETAPA-08/`.

### Fuera del Alcance
- Modificación del catálogo de agentes y matrices curriculares (cerradas en Etapa 07).
- Cambios en el motor de base de datos Turso/SQLite (cerrados en Etapa 02/03).
- Despliegue en producción o push remoto (requiere autorización previa expresa).

---

## 3. Matriz de Entregables

| # | Archivo | Propósito |
|---|---|---|
| 1 | `server/agents/providers/providerManager.ts` | Orquestador unificado con prioridad, cuotas, timeouts y fallback transparente |
| 2 | `server/agents/providers/geminiProvider.ts` | Conexión real con `@google/genai` (Google AI Studio Free Tier) con filtrado de citas exactas |
| 3 | `server/agents/providers/deepseekProvider.ts` | Conexión real DeepSeek API con timeout, citas exactas y manejo de cuotas |
| 4 | `server/agents/providers/openRouterProvider.ts` | Conexión real OpenRouter API con timeout y citas exactas |
| 5 | `server/agents/providers/simulatedProvider.ts` | Fallback socrático local con marcado de fallback honesto |
| 6 | `server/agents/types.ts` | Tipos y contratos actualizados para cuotas, salud y telemetría |
| 7 | `server/agents/agentService.ts` | Integración de rate limiting infantil, trazabilidad sin PII y RAG honesto |
| 8 | `server/routes/agentRoutes.ts` | Endpoint de salud `/health` y protección contra llamadas automatizadas |
| 9 | `server.ts` | Unificación de `/api/ai/teacher-chat` y `executeResilientAIPipeline` hacia `ProviderManager` |
| 10 | `scripts/test-ai-providers-config.ts` | Script de comprobación de configuración sanitizada |
| 11 | `scripts/test-ai-providers-live.ts` | Script de prueba de conexión real externa de proveedores configurados |
| 12 | `scripts/test-etapa-08-unified.ts` | Suite completa determinista de la Etapa 08 |
| 13 | `.env.example` | Plantilla actualizada de variables de entorno de IA |
| 14 | `docs/manuales/manual_proveedores_ia.md` | Manual de configuración y gobernanza de proveedores de IA |
| 15 | `docs/ai-agents/matriz_proveedores_ia.md` | Matriz de proveedores, modelos, latencias y contingencias |

---

## 4. Fases de Ejecución

1. **Fase 1 — Auditoría y Alineación de Proveedores:**
   Refactorizar proveedores para manejo de timeouts estrictos con `AbortController`, corrección del bug de extracción de citas y códigos de error estándar.
2. **Fase 2 — Orquestador Unificado (`ProviderManager`):**
   Implementar prioridad configurable (`AI_PROVIDER_PRIORITY`), límite de reintentos (máx 1), rate limiting de alumnos y detección honesta de fallback.
3. **Fase 3 — Unificación de Rutas en `server.ts`:**
   Redirigir las llamadas de IA legadas (`executeResilientAIPipeline`, `/api/ai/teacher-chat`, `/api/profesor`) para que pasen exclusivamente por `ProviderManager`.
4. **Fase 4 — Endpoint de Salud Sanitizado:**
   Implementar `/api/v1/agents/health` y `/api/ai/health`.
5. **Fase 5 — Scripts de Prueba y Verificación Real:**
   Crear los scripts de prueba de configuración y de conexión en vivo con registro sanitizado.
6. **Fase 6 — Verificación de Bundles y Seguridad P0:**
   Ejecutar `npm run build` y escanear `dist/` para verificar cero fugas de secretos y cero URLs externas en el bundle.
7. **Fase 7 — Documentación y Cierre:**
   Actualizar `.env.example`, redactar manuales y generar los reportes de Etapa 08 en `docs/ejecucion/continuacion-produccion/ETAPA-08/`.

