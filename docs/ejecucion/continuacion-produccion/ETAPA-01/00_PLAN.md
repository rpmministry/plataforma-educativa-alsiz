# PLAN TÉCNICO FORMAL — ETAPA 01 (CONTINUACIÓN A PRODUCCIÓN)
## Plataforma Educativa ALSIZ para Ekballo Church
**Fecha:** 2026-10-16  
**Rama de trabajo:** `continuacion-produccion-etapa-01`  
**Estado:** EJECUTADO Y EN EVALUACIÓN DE ACEPTACIÓN  

---

## 1. OBJETIVO DE LA ETAPA
Implementar con rigor técnico y trazabilidad absoluta las decisiones arquitectónicas y salvaguardas P0 acordadas tras la auditoría de la Etapa 00:
1. **Infraestructura de Despliegue Híbrida**: Configurar el backend y frontend para desplegar en Vercel (frontend estático + funciones serverless) con base de datos relacional remota persistente en **Turso Cloud** (plan gratuito Starter) a través de un cliente libSQL seguro sobre HTTPS.
2. **Capa de Abstracción de Datos (DAL)**: Crear `server/db/dal.ts` desacoplando la aplicación de un proveedor específico para permitir una migración futura sin fricción hacia PostgreSQL o auto-hospedaje en Docker.
3. **Servicio de Correos Transaccionales (Resend)**: Implementar `server/email/emailService.ts` integrando la API de Resend para el envío seguro de PINs de acceso táctil a los estudiantes y sus representantes, con fallback automático a SMTP y simulación en desarrollo offline.
4. **Prueba Única Controlada de IA (Google Gemini)**: Ejecutar una única llamada técnica de verificación desde el backend a la API oficial de Gemini (`gemini-3.8-flash`) usando el SDK `@google/genai` con datos sintéticos, certificando costo cero ($0.00 USD) en el Free Tier y disponibilidad del modelo.
5. **Seguridad P0 y Eliminación de Credenciales de Cliente**:
   - Eliminar del frontend (`src/services/aiService.ts`, `src/vite-env.d.ts`) cualquier referencia a `VITE_GEMINI_API_KEY`, `VITE_OPENROUTER_API_KEY`, endpoints externos de Google o OpenRouter, y cualquier fallback en el cliente que simule respuestas locales como modelos reales.
   - Enrutamiento estricto de toda llamada de IA a través del backend propio (`/api/v1/agents` y `/api/ai/*`).
6. **Unificación de Proveedores de Servidor**:
   - Consolidar en `ProviderManager` los proveedores soportados: `GeminiProvider`, `DeepSeekProvider`, `OpenRouterProvider` y `SimulatedProvider` (fallback socrático).
   - Eliminar referencias a proveedores no implementados (ej. OpenCode Zen) para garantizar un catálogo honesto.
7. **Salvaguarda de Sesión en Producción (SESSION_SECRET)**:
   - Exigir clave de al menos 32 caracteres y rechazar en tiempo de inicio cualquier valor nulo, corto o correspondiente a ejemplos públicos por defecto (`validateProductionSessionSecret`).
8. **Aislamiento de Semillas en Producción y Bootstrap de Administrador**:
   - Omitir `003_seed_dev_data.sql` en migraciones de producción para no sembrar contraseñas predeterminadas ni datos demo.
   - Implementar herramienta segura `scripts/bootstrap-admin.ts` para inicializar el primer administrador con política de contraseñas robustas y hashing scrypt sin volcar contraseñas a logs.
9. **Conexión UI <-> Backend (/api/v1)**: Conectar los componentes de autenticación del frontend (`StudentLoginModal.tsx`, `AccessView.tsx`, `SchoolContext.tsx`) con los endpoints reales del servidor `/api/v1/auth/login`, `/api/v1/auth/pin-login`, `/api/v1/auth/me` y `/api/v1/auth/logout`.

---

## 2. RESTRICCIONES Y SALVAGUARDAS OBLIGATORIAS
- **Cero divulgación de secretos**: Prohibido imprimir, copiar, comitear o registrar valores de API keys, contraseñas, PINs, tokens de sesión o variables de `.env.local`.
- **Protección de menores (LOPDP)**: Datos reales de los estudiantes fuera de capturas, logs de consola y archivos de evidencia. Todas las pruebas usan cuentas sintéticas (`usr-synth-*`, `STU-TEST-*`).
- **Aislamiento de bases de datos**: No modificar `data/alsiz.db` productivo durante los tests. Las pruebas de regresión locales corren contra SQLite en memoria o archivos sandbox temporales; las pruebas remotas se ejecutan en Turso Cloud con limpieza garantizada.
- **Límite de consumo de IA**: Exactamente una llamada real autorizada a Gemini con datos sintéticos; cero llamadas adicionales automáticas.
- **Control de versiones**: Prohibido hacer `git push`, fusión a `main` o despliegue en vivo sin autorización expresa previa.

---

## 3. METODOLOGÍA PASO A PASO
1. **Verificación de Entorno**: Confirmar rama `continuacion-produccion-etapa-01`, variables en `.env.local` y ausencia de secretos expuestos.
2. **Diseño e Implementación del DAL (`server/db/dal.ts`)**:
   - Definir interfaz agnóstica `IDatabaseAdapter` (métodos `query`, `queryOne`, `execute`, `executeMultiple`, `transaction`).
   - Implementar `TursoAdapter` usando `@libsql/client` para Turso Cloud.
   - Implementar `SqliteLocalAdapter` envolviendo `node:sqlite` (`DatabaseSync`) para desarrollo local y suites offline.
   - Implementar fábrica `getDatabaseAdapter()` singleton.
3. **Servicio Transaccional de Email (`server/email/emailService.ts`)**:
   - Integrar Resend SDK (`resend.emails.send`).
   - Fallback a Nodemailer (SMTP) y fallback simulado para entornos de test.
4. **Verificación de Migraciones en Turso Cloud**:
   - Ejecutar de forma segura las 12 migraciones (v001 a v012) en Turso Cloud mediante `executeMultiple`.
5. **Llamada Controlada a Gemini**:
   - Ejecutar script `scripts/test-gemini-controlled.ts` verificando el modelo `gemini-3.8-flash` con datos sintéticos pedagógicos y registrando tokens y costo ($0.00).
6. **Saneamiento de Frontend y Capa de Servidor**:
   - Purgar claves de `src/services/aiService.ts` y tipos de `src/vite-env.d.ts`.
   - Implementar `server/agents/providers/openRouterProvider.ts` e integrar en `ProviderManager`.
   - Limpiar el health check de `/api/health` para reportar honestamente sin anunciar OpenCode.
7. **Salvaguardas P0 de Producción**:
   - Validar `SESSION_SECRET` >= 32 chars en `server/auth/crypto.ts` y arranque de `server.ts`.
   - Aislar `003_seed_dev_data.sql` en `server/db/migrator.ts`.
   - Desarrollar `scripts/bootstrap-admin.ts` con hashing scrypt.
8. **Baterías de Pruebas Automatizadas**:
   - Suite P0 de seguridad: `npm run test:security-p0` (10/10 pasadas).
   - Escáner estático de secretos en bundles: `npm run test:security-scan` (0 secretos en 44 archivos).
   - E2E Turso Cloud: `npm run test:turso` (9/9 pasadas).
   - Regresión Etapas 05 a 14 (130/130 pasadas).
   - Compilación y tipado: `npm run lint` y `npm run build`.
