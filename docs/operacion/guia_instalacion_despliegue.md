# Guía de Instalación y Despliegue Operativo
## Plataforma Educativa ALSIZ para Ekballo Church

- **Documento**: `docs/operacion/guia_instalacion_despliegue.md`
- **Versión**: 2.0.0 (Producción / Arquitectura Opción A)
- **Fecha**: 2026-10-17
- **Audiencia**: Administradores de Sistemas, Ingenieros DevOps y Líderes Técnicos

---

### 1. Arquitectura de Despliegue Aprobada (Opción A)

Para garantizar la persistencia de datos del colegio sin riesgo de escrituras volátiles en entornos serverless, la **Plataforma Educativa ALSIZ** adopta formalmente la **Opción A** (registrada en ADR-002):

```
                                  [ Navegador del Usuario ]
                                             │
                                             ▼
                      [ Vercel CDN — Frontend Estático y Punto de Entrada ]
                             https://educacion.ekballochurch.org
                                       │              │
                   ┌───────────────────┘              └───────────────────┐
                   ▼                                                      ▼
           Rutas Estáticas                                          Rutas /api/*
       (/, /assets/*, SPA)                                        (api-entry.js Proxy)
     Servidas desde dist/ en CDN                                          │
                                                                          ▼
                                                       [ Backend Node.js 22 LTS Persistente ]
                                                        (Render / Fly.io / VPS con PM2/Docker)
                                                                          │
                                                                          ▼
                                                              [ Disco Montado Persistente ]
                                                                     /data/alsiz.db
                                                                  (SQLite WAL 1 Proceso)
```

1. **Frontend Estático (Vercel CDN)**:
   - Compilado con Vite en `./dist`.
   - Distribuido globalmente por la red CDN de Vercel con latencia ultra-baja y caché óptimo.
   - Actúa como la URL pública principal para tutores, estudiantes y docentes (`educacion.ekballochurch.org` o `*.vercel.app`).
   - Cero secretos o claves de IA en el cliente; el bundle solo contiene código de presentación.

2. **Reescritura Transparente de API (Vercel Proxy)**:
   - Las peticiones hacia `/api/*` son interceptadas por `api-entry.js` en Vercel.
   - Reenvía el tráfico con todas las cabeceras (`Authorization`, `Cookie`, `X-Forwarded-*`) hacia el backend persistente definido en la variable de entorno `BACKEND_URL`.
   - Preserva los encabezados `Set-Cookie` del backend hacia el cliente con flags `HttpOnly`, `SameSite=Lax` y `Secure`.
   - Si `BACKEND_URL` no está definida, retorna un error 503 claro y estructurado impidiendo cualquier creación de base de datos efímera.

3. **Backend Express Persistente (Node 22 LTS)**:
   - Proceso único (`instances: 1`, `exec_mode: 'fork'`) ejecutando Node.js 22 LTS.
   - Hospedado en un servicio con soporte de almacenamiento persistente montado (Render Web Service con Persistent Disk, Fly.io con Volume, o VPS Ubuntu LTS).
   - Base de datos relacional transaccional embebida SQLite3 vía `node:sqlite` con Write-Ahead Logging (`WAL`), `PRAGMA foreign_keys = ON;`, `PRAGMA busy_timeout = 5000;`.
   - Las migraciones de esquema (`npm run db:migrate`) se ejecutan como paso controlado de pre-despliegue (*release step*), nunca de forma improvisada en tiempo de petición web.
   - Aloja exclusivamente en su entorno privado `SESSION_SECRET`, `GEMINI_API_KEY`, `RESEND_API_KEY`, etc.

---

### 2. Requisitos Previos del Sistema

| Componente | Requisito Mínimo | Requisito Recomendado |
|---|---|---|
| **Sistema Operativo (Backend)** | Ubuntu 22.04 LTS o Debian 12 (Bookworm) | Ubuntu Server 24.04 LTS |
| **Node.js** | v22.12.0 LTS (soporte nativo `node:sqlite`) | v22.14.0 LTS |
| **npm** | v10.x | v10.9.x (`npm ci` obligatorio) |
| **Memoria RAM** | 1 GB disponible | 2 GB RAM |
| **Almacenamiento Persistente** | 5 GB SSD montados en `/data` | 10 GB SSD montados en `/data` |
| **Puertos de Red** | 3000 o 10000 para el servicio backend | 80/443 (Reverse Proxy Nginx) |

---

### 3. Procedimiento de Despliegue del Backend Persistente

El backend debe desplegarse y estar operativo **antes** de conectar Vercel.

#### Opción 3.1: Despliegue en Render.com (Recomendado para PaaS Administrado)
1. **[PENDIENTE DEL ADMINISTRADOR]** Crear cuenta en [Render.com](https://render.com) e iniciar sesión.
2. **[PENDIENTE DEL ADMINISTRADOR]** Conectar el repositorio de GitHub `rpmministry/plataforma-educativa-alsiz`.
3. Crear un **Web Service** seleccionando el repositorio o aplicar el archivo `render.yaml` incluido:
   - **Name:** `alsiz-backend-api`
   - **Environment:** `Node`
   - **Region:** `Oregon` (o más cercana)
   - **Branch:** Rama autorizada (`main` tras aprobación)
   - **Build Command:** `npm ci && npm run build`
   - **Pre-Deploy Command (Release Step):** `npm run db:migrate`
   - **Start Command:** `npm run start`
   - **Plan:** `Starter` (requerido para asociar disco persistente)
4. **[PENDIENTE DEL ADMINISTRADOR]** Crear y asociar el Persistent Disk:
   - **Disk Name:** `alsiz-data`
   - **Mount Path:** `/data`
   - **Size:** `10 GB`
5. **[PENDIENTE DEL ADMINISTRADOR]** Configurar Variables de Entorno en el panel de Render:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `DATABASE_PATH`: `/data/alsiz.db`
   - `RUN_MIGRATIONS_ON_STARTUP`: `false`
   - `TRUST_PROXY`: `1`
   - `SESSION_SECRET`: Generar una cadena de 32+ caracteres criptográficos (`openssl rand -hex 32`).
   - `GEMINI_API_KEY`: Clave de Google AI Studio.
   - `RESEND_API_KEY`: Clave de despacho de correos Resend (`re_...`).
   - `RESEND_FROM_EMAIL`: Remitente verificado (ej. `onboarding@resend.dev` o `no-responder@ekballochurch.org`).
6. Desplegar el servicio.
7. **[PENDIENTE DEL ADMINISTRADOR]** Copiar la URL pública generada por Render (ej. `https://alsiz-backend-api.onrender.com`).
8. Verificar disponibilidad ejecutando:
   ```bash
   curl -s https://alsiz-backend-api.onrender.com/api/health
   # Debe responder HTTP 200 con status "ok" y database.connected: true
   ```

#### Opción 3.2: Despliegue en VPS Linux con PM2 (Ubuntu 22.04 / 24.04 LTS)
1. **[PENDIENTE DEL ADMINISTRADOR]** Provisionar el servidor VPS y configurar acceso SSH seguro.
2. Instalar Node.js 22 LTS y PM2:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```
3. Preparar el directorio de persistencia:
   ```bash
   sudo mkdir -p /data/backups
   sudo chown -R $USER:$USER /data
   chmod 700 /data
   ```
4. Clonar el repositorio y compilar:
   ```bash
   git clone https://github.com/rpmministry/plataforma-educativa-alsiz.git /var/www/alsiz
   cd /var/www/alsiz
   npm ci --prefer-offline
   ```
5. Configurar el archivo `.env` en `/var/www/alsiz/.env` con permisos restringidos (`chmod 600 .env`).
6. Ejecutar migraciones controladas:
   ```bash
   npm run db:migrate
   ```
7. Compilar artefactos de producción:
   ```bash
   npm run build
   ```
8. Iniciar el servicio con PM2 (proceso único):
   ```bash
   pm2 start ecosystem.config.cjs
   pm2 save
   pm2 startup
   ```

---

### 4. Procedimiento de Despliegue del Frontend en Vercel

1. **[PENDIENTE DEL ADMINISTRADOR]** Iniciar sesión en [Vercel](https://vercel.com) e importar el repositorio `rpmministry/plataforma-educativa-alsiz`.
2. Configuración de Build & Output Settings:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm ci`
3. **[PENDIENTE DEL ADMINISTRADOR]** Configurar Variables de Entorno en el panel de Vercel (**Project Settings -> Environment Variables**):
   - `BACKEND_URL`: Asignar la URL del backend persistente obtenido en el Paso 3 (ej. `https://alsiz-backend-api.onrender.com`).
   - *Nota de seguridad:* NO configure `SESSION_SECRET`, `GEMINI_API_KEY` ni `RESEND_API_KEY` en Vercel; esos secretos pertenecen exclusivamente al backend.
4. Desplegar el proyecto en Vercel.
5. Vercel desplegará los activos estáticos y utilizará `api-entry.js` como proxy reverso hacia `BACKEND_URL`.
6. **[PENDIENTE DEL ADMINISTRADOR]** Asignar el dominio personalizado del colegio (ej. `educacion.ekballochurch.org`) en el panel de Vercel.

---

### 5. Configuración de Red, Cookies y Proxy Reverso

#### Flujo de Sesión y Cookies:
- El navegador se comunica con `https://educacion.ekballochurch.org` (Vercel).
- Al autenticarse (`/api/v1/auth/login` o `/api/v1/auth/student-pin-login`), la petición viaja al proxy de Vercel y este la remite al backend persistente.
- El backend Express (con `app.set('trust proxy', 1)`) detecta la conexión segura y genera la cookie de sesión:
  `Set-Cookie: alsiz_session=<token>; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=259200`
- El proxy de Vercel reenvía exactamente el encabezado `Set-Cookie` al navegador.
- El navegador almacena la cookie asociada al dominio principal (`educacion.ekballochurch.org`), garantizando que todas las peticiones subsiguientes envíen la cabecera `Cookie: alsiz_session=...` en contexto de primer origen (*first-party*), sin bloqueos de cookies de terceros.

---

### 6. Comprobaciones Posteriores al Despliegue (Smoke Tests)

Una vez completados los despliegues de backend y frontend:

1. **Chequeo de Salud a través de Vercel**:
   ```bash
   curl -i https://<tu-app>.vercel.app/api/health
   # Salida esperada: HTTP 200 OK con:
   # {
   #   "status": "ok",
   #   "version": "1.0.0",
   #   "database": { "connected": true, "status": "HEALTHY", "migrations": { "status": "SYNCED" } }
   # }
   ```

2. **Verificación de Inyección de Credenciales**:
   El JSON retornado por `/api/health` debe mostrar `deepSeekConfigured`, `geminiConfigured` y `openRouterConfigured` como booleanos (`true` o `false`), sin jamás mostrar las claves.

3. **Prueba de Autenticación de Estudiante (Sintética)**:
   - Acceder al frontend en `https://<tu-app>.vercel.app`.
   - Probar el modal de inicio de sesión con PIN.
   - En DevTools (pestaña Red), verificar que la petición POST responde con la cabecera `Set-Cookie: alsiz_session=...; Path=/; HttpOnly; SameSite=Lax; Secure`.
   - Refrescar la página y verificar que la sesión persiste entre recargas.

4. **Prueba de Respaldo Inicial de Base de Datos**:
   En el servidor persistente, ejecutar:
   ```bash
   npm run db:backup
   ```
   Confirmar que se crea el archivo `.db` en `/data/backups/`.
