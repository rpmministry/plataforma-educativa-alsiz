# Plan de Trabajo — Etapa 09: Procedimiento de Creación y Colocación de Claves API

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-09 (Continuación a Producción)  
**Rama de Trabajo:** `continuacion-produccion-etapa-09`  
**Commit Inicial:** `858fb4053a95b9c6b6a2d578b22ad93d97410a6f` (`feat(etapa-08): unificacion de proveedores ia con cascada transparente y cero fuga de secretos`)  
**Fecha:** 17 de octubre de 2026  
**Responsable Técnico:** Antigravity (Google DeepMind Team)  

---

## 1. Verificación Inicial de Entorno y Control de Versiones

### 1.1 Comprobación de Comandos Git
- **Get-Location:** `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **git rev-parse --show-toplevel:** `C:/Users/Alsiz/Documents/plataforma educativa ALSIZ`
- **git branch --show-current:** `continuacion-produccion-etapa-09`
- **git remote -v:**
  - `origin https://github.com/rpmministry/plataforma-educativa-alsiz.git (fetch)`
  - `origin https://github.com/rpmministry/plataforma-educativa-alsiz.git (push)`
- **git log -1 --oneline:** `858fb40 feat(etapa-08): unificacion de proveedores ia con cascada transparente y cero fuga de secretos`
- **git status --short:** Limpio (sin cambios residuales previo al inicio de la etapa).

### 1.2 Comparativa con `origin/main`
- **HEAD Local:** `858fb40` (Rama `continuacion-produccion-etapa-09` derivada de `continuacion-produccion-etapa-08`)
- **`origin/main` Remoto:** `1a7964c` (`feat(infra): adopcion de arquitectura serverless vercel y turso cloud a costo inicial cero`)
- **Diferencia Técnica:** La rama local contiene la serie completa y lineal de etapas de continuación a producción (`etapa-00` hasta `etapa-08` culminada):
  - `858fb40`: Etapa 08 — Unificación de proveedores IA con cascada transparente y cero fuga de secretos.
  - `ae0a63c`: Etapa 07 — Catálogo completo de profesores IA por asignatura y nivel.
  - `570a61c`: Etapa 06b — Completar currículo y clases socráticas de Avril (8.º EGB).
  - `ab66dbe`: Normalización de saltos de línea.
  - `03c0c59`: Etapa 06a — Currículo y validación de Gael (4.º EGB).
  - `5dda53e`: Etapa 05 — Auditoría de completitud curricular y calendario.
  - `1bc8469` / `f7bb28f`: Etapa 04 — Migración controlada de Gael y Avril con datos sintéticos.
  - `85b7af7`: Etapa 03 — Culminación técnica de autenticación y persistencia.

---

## 2. Declaración de Políticas de Seguridad P0 y LOPDP

1. **Cero Exposición de Secretos (P0):** NUNCA solicitar, imprimir, registrar, commitear ni exponer en conversaciones, logs o reportes claves API, contraseñas, secretos de sesión (`SESSION_SECRET`) ni tokens reales. Únicamente se auditará su presencia mediante comprobaciones booleanas (`CONFIGURADA` / `NO_CONFIGURADA`).
2. **Protección de Menores (LOPDP):** Todas las pruebas de conectividad de correo (SMTP/Resend) y de IA deben realizarse con datos sintéticos e inocuos; queda estrictamente prohibido usar correos o datos de estudiantes reales para pruebas de staging o sanitización.
3. **Catálogo Honesto:** No afirmar que un proveedor está disponible o conectado si no lo está. Se documentará de forma transparente que `OPENCODE` no está conectado al gestor en tiempo de ejecución, mientras que `GOOGLE_GEMINI`, `DEEPSEEK_API` y `OPENROUTER_API` sí cuentan con adaptadores integrados en `ProviderManager`.
4. **No Destructividad:** No ejecutar migraciones en bases productivas ni sobreescribir configuraciones sin autorización expresa.

---

## 3. Alcance Específico de la Etapa 09

El objetivo central es elaborar la **Guía Maestra y Reproducible de Creación y Colocación de Claves API para el Piloto (`docs/operacion/guia_configuracion_apis_piloto.md`)**, permitiendo que cualquier administrador de sistemas o miembro de la coordinación configure, audite y rote las credenciales de la plataforma sin revelar ningún valor confidencial al agente de IA.

### Bloques de Contenido a Desarrollar:

### A. Google Gemini (Proveedor Recomendado Primario)
1. Enlace oficial: `https://ai.google.dev/gemini-api/docs/api-key`.
2. Pasos en Google AI Studio: Creación de proyecto en Google Cloud, generación de API Key.
3. Restricciones de seguridad: Limitación a Gemini API exclusivamente, distinción crítica entre API Key de servidor y OAuth Client ID.
4. Nombre exacto de variable: `GEMINI_API_KEY` (sin prefijo `VITE_`), asignada al entorno backend.
5. Verificación sin exponer claves: Ejecución de prueba de ping sintético (`scripts/test-ai-providers-live.ts`), auditoría (`scripts/test-ai-providers-config.ts`), y consulta al endpoint `/api/ai/health`.
6. Procedimiento de rotación sin tiempo de inactividad.

### B. DeepSeek (Respaldo Opcional / Recomendado ante contingencias de cuota)
1. Enlace oficial: `https://platform.deepseek.com/api_keys`.
2. Condiciones de cuenta, facturación y modelo de recarga de saldo oficial.
3. Nombre exacto de variable: `DEEPSEEK_API_KEY`, asignada al entorno backend.
4. Prueba de llamada sintética a chat completions según documentación oficial (`https://api-docs.deepseek.com/api/create-chat-completion/`).
5. Verificación de cascada transparente: Simulación de fallo o agotamiento en Gemini para validar que el sistema pasa a DeepSeek de forma fluida.
6. Procedimiento de rotación.

### C. OpenRouter y Estado Técnico de OpenCode
1. **OpenRouter:** Portal oficial `https://openrouter.ai/settings/keys`, variable `OPENROUTER_API_KEY`, modelo por defecto (`OPENROUTER_MODEL`), integrado como proveedor terciario en `ProviderManager`.
2. **OpenCode:** Diagnóstico honesto. Documentación expresa de que **NO** está integrado al gestor en tiempo de ejecución (`isProviderAvailable('OPENCODE') === false`), advirtiendo al administrador que no debe crear cuentas ni asignar credenciales.

### D. Diccionario Exhaustivo de Variables de Entorno del Backend
Inventario detallado de variables efectivamente leídas por el backend:
- `NODE_ENV=production`
- `PORT`
- `APP_URL`
- `DATABASE_PATH`
- `SESSION_SECRET` (incluyendo receta OpenSSL / PowerShell de 64 caracteres criptográficamente seguros)
- `SESSION_TTL_HOURS`
- `GEMINI_API_KEY`
- `DEEPSEEK_API_KEY`
- `OPENROUTER_API_KEY`
- `EMAIL_USER` y `EMAIL_PASS` (para transporte SMTP / Gmail en `emailService.ts`)
- `RESEND_API_KEY` y `EMAIL_FROM` (para transporte HTTP primario en `emailService.ts`)
- `AI_PROVIDER_PRIORITY`, `AI_TIMEOUT_MS`, `AI_MAX_RETRIES`, `AI_STUDENT_MAX_DAILY_REQUESTS`
- Clarificación estricta sobre `.env.example`, `.env` y `.env.local` (nunca versionados en Git), y la regla de Vercel de nuevo despliegue (*redeployment*) tras modificar variables.

### E. Mapeo por Arquitectura y Plataforma
1. **Arquitectura Recomendada (Frontend Vercel + Backend Persistente Node 22):**
   - En Backend Persistente: TODAS las claves secretas (`GEMINI_API_KEY`, `DEEPSEEK_API_KEY`, `SESSION_SECRET`, `DATABASE_PATH`, etc.).
   - En Vercel: Exclusivamente variables de proxy (`BACKEND_URL` / `PERSISTENT_BACKEND_URL`) y variables públicas cliente (`VITE_GOOGLE_CLIENT_ID`). CERO bases SQLite locales en el bundle.
2. **Arquitectura Alternativa (Vercel Serverless + Turso Cloud libSQL):**
   - Variables requeridas en `Vercel > Project > Settings > Environment Variables` diferenciadas por entorno (`Production` y `Preview`): `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `SESSION_SECRET`, etc.
   - Verificación independiente y protocolo de confirmación humana previa a smoke test.

---

## 4. Plan de Pruebas y Validación Técnica

1. **Revisión Estática y Escaneo de Secretos:**
   - Validar que ni la guía ni ningún archivo nuevo contenga claves, tokens ni correos personales reales.
   - Ejecutar `scripts/test-security-p0.ts` para verificar la política P0 de seguridad del repositorio.
2. **Auditoría de Presencia de Claves y Salud del Backend:**
   - Ejecutar `npx tsx scripts/test-ai-providers-config.ts` para comprobar la detección booleana y la respuesta sanitizada de `/api/ai/health`.
3. **Validación de Tipos y Compilación TypeScript:**
   - Ejecutar `npx tsc --noEmit` para garantizar cero regresiones de tipado en el proyecto.
4. **Verificación Automatizada de la Guía:**
   - Desarrollar un script validador (`scripts/test-etapa-09-apis-guide.ts`) que compruebe la existencia de `docs/operacion/guia_configuracion_apis_piloto.md`, la presencia de todas las secciones requeridas (A, B, C, D, E), la corrección de enlaces oficiales, el catálogo honesto (rechazo de OpenCode) y la ausencia absoluta de patrones de secretos reales.

---

## 5. Entregables de la Etapa

- `docs/operacion/guia_configuracion_apis_piloto.md`
- `scripts/test-etapa-09-apis-guide.ts`
- `docs/ejecucion/continuacion-produccion/ETAPA-09/`
  - `00_PLAN.md`
  - `01_CAMBIOS.md`
  - `02_PRUEBAS.md`
  - `03_VALIDACION.md`
  - `04_RIESGOS_Y_DECISIONES.md`
  - `05_REVERSA.md`
  - `06_CIERRE.md`
  - `evidencias/` (registros de ejecución de tests y validaciones)
