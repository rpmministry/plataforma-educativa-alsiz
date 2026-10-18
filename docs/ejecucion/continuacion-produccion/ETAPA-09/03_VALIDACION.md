# Matriz de Aceptación y Validación de Requisitos — Etapa 09: Procedimiento de Creación y Colocación de Claves API

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-09 (Continuación a Producción)  
**Rama:** `continuacion-produccion-etapa-09`  
**Fecha:** 17 de octubre de 2026  

---

## 1. Matriz de Cumplimiento de Requisitos del Prompt 09

| Requisito / Bloque | Criterio Específico | Estado | Justificación y Referencia Técnica |
|---|---|:---:|---|
| **A. Google Gemini (1)** | Enlace oficial a Google AI Studio (`ai.google.dev/gemini-api/docs/api-key`) | **CUMPLIDO** | Documentado en Sección 1.1 con URLs oficiales a la documentación y a Google AI Studio. |
| **A. Google Gemini (2)** | Creación o selección de proyecto en Google Cloud y generación de clave | **CUMPLIDO** | Detallado paso a paso en Sección 1.1 para la cuenta institucional de Ekballo Church. |
| **A. Google Gemini (3)** | Aplicación de restricciones de API (`Generative Language API`) y prohibición de OAuth Client ID | **CUMPLIDO** | Sección 1.2 instruye la restricción estricta en Google Cloud Console y advierte enfáticamente no confundir con `VITE_GOOGLE_CLIENT_ID`. |
| **A. Google Gemini (4)** | Variable `GEMINI_API_KEY` en backend, nunca con prefijo `VITE_` | **CUMPLIDO** | Sección 1.3 y banner P0 prohíben explícitamente el prefijo `VITE_` para salvaguardar el secreto de la exposición en el cliente. |
| **A. Google Gemini (5)** | Comprobación de presencia sin imprimir la clave y rotación | **CUMPLIDO** | Secciones 1.4 y 1.5 documentan `test-ai-providers-config.ts`, `/api/ai/health`, llamada sintética en vivo y protocolo de rotación sin caída. |
| **B. DeepSeek (1)** | Enlace oficial a `platform.deepseek.com/api_keys` | **CUMPLIDO** | Documentado en Sección 2.1 con enlaces de creación y gestión de saldo. |
| **B. DeepSeek (2)** | Condiciones de cuenta, facturación y modelo prepagado | **CUMPLIDO** | Sección 2.1 detalla el sistema de recargas iniciales ($5-$10 USD) y alertas de saldo. |
| **B. DeepSeek (3)** | Configuración de `DEEPSEEK_API_KEY` en el entorno backend | **CUMPLIDO** | Documentado en Sección 2.2 con opciones `DEEPSEEK_MODEL` y `DEEPSEEK_BASE_URL`. |
| **B. DeepSeek (4)** | Prueba de llamada corta según `api-docs.deepseek.com/api/create-chat-completion/` | **CUMPLIDO** | Sección 2.3 documenta el uso de `scripts/test-ai-providers-live.ts` para enviar un ping sintético con cero fugas. |
| **B. DeepSeek (5)** | Verificación de cascada y fallback transparente | **CUMPLIDO** | Sección 2.4 instruye cómo alterar temporalmente `AI_PROVIDER_PRIORITY` para validar la transición inmediata a DeepSeek y luego a `SIMULATED_LOCAL`. |
| **C. OpenRouter / OpenCode** | Confirmación técnica de integración y advertencia sobre OpenCode | **CUMPLIDO** | Sección 3.1 documenta OpenRouter integrado. Sección 3.2 declara honestamente que OpenCode **NO** está integrado en runtime, prohibiendo crear cuentas o configurar variables. |
| **D. Variables de Entorno** | Inventario completo de variables que lee el backend | **CUMPLIDO** | Sección 4 documenta `NODE_ENV`, `PORT`, `APP_URL`, `DATABASE_PATH`, `SESSION_SECRET`, `SESSION_TTL_HOURS`, `GEMINI_API_KEY`, `DEEPSEEK_API_KEY`, `OPENROUTER_API_KEY`, `EMAIL_USER`, `EMAIL_PASS`, `RESEND_API_KEY`, etc. |
| **D. Variables de Entorno** | Reglas de `.env.example`, `.env` no versionados y redeploy obligatorio en Vercel | **CUMPLIDO** | Sección 4.3 cita formalmente la documentación oficial de Vercel y explica la necesidad de redeploy tras cambios. |
| **D. Variables de Entorno** | Pruebas de email/PIN sin datos de estudiantes reales | **CUMPLIDO** | Sección 4.2 establece el uso obligatorio de cuentas sintéticas administradas por el equipo técnico. |
| **E. Variables por Plataforma** | Arquitectura Recomendada (Vercel CDN + Backend Persistente Node 22) | **CUMPLIDO** | Sección 5.1 detalla qué va en el backend persistente (secretos) y qué en Vercel (`BACKEND_URL`), prohibiendo SQLite en el bundle de Vercel. |
| **E. Variables por Plataforma** | Arquitectura Alternativa (Vercel Serverless + Turso Cloud) | **CUMPLIDO** | Sección 5.2 mapea las variables exactas en `Production` y `Preview`, con procedimiento de smoke test previo a confirmación. |
| **Criterio de Aceptación** | Comprensión autónoma sin adivinar nombres, exponer claves ni confundir entornos | **CUMPLIDO** | Manual completamente guiado, estructurado en tablas claras con checklist de verificación final. |

---

## 2. Conclusión de Validación

El manual operativo [`docs/operacion/guia_configuracion_apis_piloto.md`](file:///docs/operacion/guia_configuracion_apis_piloto.md) cumple el 100% de los requisitos estipulados en el Prompt 09 y las directrices de seguridad P0 del proyecto ALSIZ.

