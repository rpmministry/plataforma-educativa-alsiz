# Guía de Configuración de Entornos y Variables
## Plataforma Educativa ALSIZ para Ekballo Church

- **Documento**: `docs/operacion/guia_configuracion_entornos.md`
- **Versión**: 1.0.0
- **Fecha**: 2026-10-16
- **Audiencia**: Administradores de Sistemas, Desarrolladores y Oficiales de Seguridad

---

### 1. Política de Separación de Entornos

Para garantizar la estabilidad operativa, la privacidad de los menores de edad conforme a la LOPDP y la integridad de las bases de datos, el proyecto define tres entornos claramente diferenciados:

```
  +------------------+       +------------------+       +------------------+
  |   DESARROLLO     |  -->  |     STAGING      |  -->  |    PRODUCCIÓN    |
  |  (Local / Dev)   |       |  (Pre-producción)|       |   (Ekballo Live) |
  +------------------+       +------------------+       +------------------+
  - Datos sintéticos         - Réplica sanitizada       - Expedientes reales
  - Proveedor IA simulado    - IA Free / Quota baja     - DeepSeek / Gemini Prod
  - Cookies lax / HTTP       - HTTPS obligatorio        - HTTPS estricto + HSTS
  - Logs detallados verbose  - Logs informativos        - Logs audit anonimizados
```

#### Comparativa de Entornos:

| Parámetro | Desarrollo (`development`) | Staging (`staging`) | Producción (`production`) |
|---|---|---|---|
| **Archivo de Variables** | `.env.local` / `.env` | `.env.staging` | Variables de Sistema / `.env.production` |
| **Persistencia SQLite** | `./data/alsiz-dev.db` | `./data/alsiz-staging.db` | `./data/alsiz.db` (Volumen persistente) |
| **Proveedores IA** | `SIMULATED_LOCAL` / Free tiers | OpenRouter / Gemini Free | DeepSeek V3 + Gemini 2.0 Flash + Simulador |
| **Seguridad de Cookies** | `Secure: false`, `SameSite: 'lax'` | `Secure: true`, `SameSite: 'strict'` | `Secure: true`, `SameSite: 'strict'`, `HttpOnly` |
| **Firma de Sesión** | Clave de desarrollo local | Clave sintética 64 bytes | Clave de alta entropía generada en vault |
| **Exposición de Stacktrace** | Sí (en consola) | No (código de error) | No (código de error ofuscado) |

---

### 2. Inventario Completo de Variables de Entorno

> [!CAUTION]
> **REGLA DE ORO DE SEGURIDAD**: Nunca registre claves de producción, credenciales de correo o secretos en el control de versiones (Git). Use siempre archivos locales no rastreados (`.env.local`) o el gestor de secretos de la infraestructura. Todos los valores presentados en este manual son sintéticos y de ejemplo.

#### 2.1. Núcleo del Servidor y Persistencia

| Variable | Tipo | Obligatorio | Valor por Defecto | Descripción y Ejemplo Sintético |
|---|---|---|---|---|
| `NODE_ENV` | String | Sí | `development` | Entorno de ejecución: `development`, `staging`, `production`, `test`. |
| `PORT` | Número | No | `3000` | Puerto TCP donde escucha el servidor web (ej. `3000`, `8080`). |
| `DATABASE_PATH` | String | No | `./data/alsiz.db` | Ruta relativa o absoluta al archivo SQLite (ej. `/var/data/alsiz.db`). |
| `SESSION_SECRET` | String | Sí (Prod) | Clave de desarrollo | Clave de derivación criptográfica (mínimo 32 caracteres alfanuméricos de alta entropía). Ejemplo sintético: `sec_prod_9f8e7d6c5b4a3a2b1c0d9e8f7a6b5c4d3e2f1a0b` |
| `SESSION_TTL_HOURS`| Número | No | `72` | Tiempo de vida de la sesión autenticada en horas (ej. `24` o `72`). |
| `APP_URL` | String | No | `http://localhost:3000` | URL pública base de la plataforma (ej. `https://educacion.ekballochurch.org`). |

#### 2.2. Jerarquía de Proveedores de Inteligencia Artificial (IA)

La plataforma utiliza una arquitectura en cascada con *circuit-breaker* para garantizar cero interrupciones en la docencia de los estudiantes:

| Variable | Tipo | Rol en la Jerarquía | Ejemplo Sintético |
|---|---|---|---|
| `DEEPSEEK_API_KEY` | String | **Capa Principal** (Alta precisión pedagógica y socrática). Si se define, lidera las consultas. | `sk-synthetickey000000000000000000000000000` |
| `DEEPSEEK_MODEL` | String | Modelo a invocar en DeepSeek. Por defecto: `deepseek-chat` (o `deepseek-reasoner`). | `deepseek-chat` |
| `DEEPSEEK_BASE_URL`| String | URL base compatible OpenAI. Por defecto: `https://api.deepseek.com/v1`. | `https://api.deepseek.com/v1` |
| `GEMINI_API_KEY` | String | **Capa de Respaldo Primario** (Google AI Studio). Formato `AIzaSy...`. | `AIzaSySyntheticKeyExample1234567890abcdef` |
| `OPENROUTER_API_KEY` | String | **Capa de Respaldo Secundario** (Caza de modelos `:free`). | `sk-or-v1-synthetickeyopenrouter1234567890` |
| `OPENCODE_API_KEY` | String | **Capa de Respaldo Terciario** (Catálogo de modelos libres). | `sk-opencode-synthetic-free-catalog-key` |
| `GOOGLE_TTS_API_KEY`| String | **Voz Neuronal Docente** (Google Cloud Text-to-Speech Neuronal2). | `AIzaSyTTSKeyExampleSynthetic987654321` |

#### 2.3. Parámetros de Resiliencia y Presupuesto de Tiempo de IA

| Variable | Por Defecto | Descripción |
|---|---|---|
| `AI_MODEL_TIMEOUT_MS` | `6000` (6 s) | Tiempo máximo de espera por cada intento de modelo individual antes de saltar al siguiente en la cascada. |
| `AI_TIER_BUDGET_MS` | `20000` (20 s) | Presupuesto total de tiempo por capa de modelos libres. |
| `AI_LAST_TIER_BUDGET_MS` | `12000` (12 s) | Presupuesto para el intento final de contingencia. |
| `AI_FREE_MODEL_MAX` | `8` | Número máximo de modelos encolados dinámicamente en OpenRouter. |

#### 2.4. Notificaciones y Correo Electrónico

| Variable | Obligatorio | Descripción | Ejemplo Sintético |
|---|---|---|---|
| `SMTP_HOST` | No | Servidor saliente para correos de PIN y avisos. | `smtp.mailgun.org` o `smtp.sendgrid.net` |
| `SMTP_PORT` | No | Puerto seguro TLS/STARTTLS. | `587` o `465` |
| `SMTP_USER` | No | Usuario del servicio de correo. | `notificaciones@ekballochurch.org` |
| `SMTP_PASS` | No | Contraseña o API key del remitente. | `smtp_password_synthetic_secret` |
| `SMTP_FROM` | No | Remitente visible institucional. | `"Ekballo Church ALSIZ" <notificaciones@ekballochurch.org>` |

---

### 3. Plantillas de Configuración de Ejemplo

#### 3.1. Plantilla `.env.development` (Desarrollo Local Seguro)
```bash
NODE_ENV=development
PORT=3000
DATABASE_PATH=./data/alsiz.db
SESSION_SECRET=dev_secret_ekballo_alsiz_local_only_test_key_32bytes
SESSION_TTL_HOURS=72

# En desarrollo, si no se configuran keys, opera el SIMULATED_LOCAL de forma transparente
DEEPSEEK_API_KEY=
GEMINI_API_KEY=
OPENROUTER_API_KEY=
```

#### 3.2. Plantilla `.env.production` (Producción en Servidor Dedicado)
```bash
NODE_ENV=production
PORT=3000
DATABASE_PATH=/var/data/alsiz.db
APP_URL=https://educacion.ekballochurch.org

# Generar con: openssl rand -hex 32
SESSION_SECRET=REPLACE_WITH_A_REAL_SECURE_RANDOM_HEX_64_CHARS_GENERATED_VIA_OPENSSL
SESSION_TTL_HOURS=24

# Credenciales de IA provistas por la administración de Ekballo Church
DEEPSEEK_API_KEY=sk-prod-your-real-key-here
DEEPSEEK_MODEL=deepseek-chat
GEMINI_API_KEY=AIzaSyYourRealGeminiKeyHere
GOOGLE_TTS_API_KEY=AIzaSyYourRealGoogleTTSKeyHere

# Configuración de timeouts
AI_MODEL_TIMEOUT_MS=8000
AI_TIER_BUDGET_MS=25000
```

---

### 4. Procedimiento de Generación Segura de Secretos

Para generar una clave criptográficamente segura para `SESSION_SECRET`:

En sistemas Linux / macOS:
```bash
openssl rand -hex 32
```

En sistemas Windows (PowerShell):
```powershell
[BitConverter]::ToString((New-Object Security.Cryptography.RNGCryptoServiceProvider).GetBytes((New-Object byte[] 32))).Replace("-", "").ToLower()
```
*El valor resultante debe asignarse exclusivamente en la consola de variables del servidor.*

