# REGISTRO DE CAMBIOS TÉCNICOS — ETAPA 01
## Plataforma Educativa ALSIZ para Ekballo Church
**Fecha:** 2026-10-16  
**Rama:** `continuacion-produccion-etapa-01`  

---

## 1. ARCHIVOS CREADOS

| Archivo | Propósito / Responsabilidad |
| :--- | :--- |
| `server/db/dal.ts` | Capa de abstracción de acceso a datos (`IDatabaseAdapter`). Implementa `TursoAdapter` (libSQL remoto) y `SqliteLocalAdapter` (`node:sqlite`). |
| `server/email/emailService.ts` | Servicio transaccional de correo con Resend SDK (`resend.emails.send`), fallback a SMTP (Nodemailer) y simulación para testing. |
| `server/agents/providers/openRouterProvider.ts` | Proveedor LLM del servidor para OpenRouter (`ILLMProvider`) desacoplado y seguro. |
| `src/services/apiClient.ts` | Cliente HTTP centralizado del frontend para `/api/v1` con soporte Bearer token y cookies `credentials: 'include'`. |
| `scripts/bootstrap-admin.ts` | Herramienta segura de inicialización del primer administrador en producción con validación de política de contraseñas y hashing scrypt. |
| `scripts/test-scan-dist-secrets.ts` | Escáner estático de seguridad que inspecciona los bundles en `dist/` en busca de claves API y llamadas directas externas. |
| `scripts/test-security-p0.ts` | Suite automatizada de verificación de las 10 directrices críticas de seguridad P0. |
| `scripts/test-turso-auth-flow.ts` | Batería E2E de pruebas reales contra Turso Cloud, autenticación por contraseña/PIN, aislamiento IDOR y revocación de sesión. |
| `scripts/test-turso-migrations.ts` | Ejecución y validación de las 12 migraciones relacionales en Turso Cloud. |
| `scripts/test-gemini-controlled.ts` | Prueba única controlada contra Gemini en cuota gratuita con datos sintéticos. |

---

## 2. ARCHIVOS MODIFICADOS

| Archivo | Modificación Realizada |
| :--- | :--- |
| `src/services/aiService.ts` | **Seguridad P0**: Eliminadas claves `VITE_GEMINI_API_KEY` y `VITE_OPENROUTER_API_KEY`. Eliminadas llamadas directas a `generativelanguage.googleapis.com` y `openrouter.ai`. Reemplazadas por llamadas al servidor propio con mensaje honesto de contingencia si el backend no responde. |
| `src/vite-env.d.ts` | Eliminada declaración de `VITE_GEMINI_API_KEY` de la interfaz `ImportMetaEnv`. |
| `server/agents/providers/providerManager.ts` | Registrado `OpenRouterProvider`, unificados `GeminiProvider`, `DeepSeekProvider`, `OpenRouterProvider` y `SimulatedProvider`. Añadido método de inspección `isProviderAvailable()`. |
| `server/auth/crypto.ts` | Implementada función `validateProductionSessionSecret(secret, isProd)` que aborta el arranque si la clave es nula, menor a 32 caracteres o coincide con valores de ejemplo inseguros. |
| `server/db/migrator.ts` | Incorporado `MigrationOptions` con `skipDevSeeds`. Omitido estrictamente `003_seed_dev_data.sql` en entornos de producción (`NODE_ENV === 'production'` o `VERCEL`). |
| `server/middleware/auditMiddleware.ts` | Adaptado `recordAuditEvent` para utilizar `getDatabaseAdapter()` (soporte asíncrono para Turso y SQLite) con redacción estricta de secretos en `sanitizeAuditDetails` y hash HMAC-SHA256 para direcciones IP. |
| `server.ts` | Integrada validación de `SESSION_SECRET` en producción al arranque. Actualizados endpoints `/api/health` y `/api/v1/health` para consultar `ProviderManager` sin reportar OpenCode ni claves privadas. |
| `src/context/SchoolContext.tsx` | Conectado el estado de sesión del estudiante con `apiClient.post('/auth/pin-login')` y `/auth/logout`. |
| `src/components/auth/StudentLoginModal.tsx` | Integrado envío de PIN táctil real contra el backend vía `/api/send-pin` (Resend). |
| `.env.example` | Documentadas exhaustivamente todas las variables requeridas (`TURSO_*`, `RESEND_*`, `SESSION_SECRET`, etc.) con cero claves utilizables o valores por defecto inseguros. |
| `package.json` | Añadidos comandos `"db:bootstrap-admin"`, `"test:security-scan"` y `"test:security-p0"`. Añadidas dependencias `@libsql/client`, `resend`, `nodemailer`. |
