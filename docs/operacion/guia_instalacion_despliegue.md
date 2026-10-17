# Guía de Instalación y Despliegue Operativo
## Plataforma Educativa ALSIZ para Ekballo Church

- **Documento**: `docs/operacion/guia_instalacion_despliegue.md`
- **Versión**: 2.1.0 (Producción / Arquitectura Dual Serverless y Persistente)
- **Fecha**: 2026-10-17
- **Audiencia**: Administradores de Sistemas, Ingenieros DevOps y Líderes Técnicos

---

### 1. Modelos de Arquitectura Soportados

La Plataforma Educativa ALSIZ cuenta con una arquitectura de persistencia flexible basada en un Adaptador Agnóstico de Base de Datos (DAL `IDatabaseAdapter`). Admite dos opciones de despliegue según el presupuesto y la estrategia operativa:

```
                                      [ Navegador del Usuario ]
                                                 │
                                                 ▼
                       [ Vercel — Frontend Estático y Servidor Serverless ]
                              https://educacion.ekballochurch.org
                                        │               │
                                        │               │
               (Opción 1: $0/mes)       │               │       (Opción 2: $9.50+/mes)
        ┌───────────────────────────────┘               └───────────────────────────────┐
        ▼                                                                               ▼
[ api-entry.js Serverless Directo ]                                            [ api-entry.js Proxy Reverso ]
        │                                                                               │
        ▼                                                                               ▼
[ Turso Cloud libSQL ]                                                       [ Backend Express en Render / VPS ]
(9 GB distribuidos, $0/mes)                                                  (Disco montado /data/alsiz.db)
```

#### Opción 1 (Recomendada para Iniciar a Costo $0): Vercel Serverless + Turso Cloud libSQL
- **Frontend y Backend:** Alojados conjuntamente en Vercel.
- **Base de Datos:** Turso Cloud (libSQL remoto de alta velocidad sobre HTTP/2).
- **Costo:** **$0.00 USD/mes** (Starter Plan gratuito permanente con 9 GB de almacenamiento, 1B lecturas/mes y 25M escrituras/mes).
- **Mantenimiento:** Cero servidores que administrar (*Zero Ops*). Sin riesgo de pérdida de datos en `/tmp`.

#### Opción 2 (Alternativa Tradicional): Vercel CDN + Backend Persistente en Render / VPS
- **Frontend:** Estático en Vercel CDN.
- **Backend:** Servicio Node 22 persistente en Render, Fly.io o VPS Linux con volumen de disco montado (`/data/alsiz.db`).
- **Enrutamiento:** Vercel reenvía `/api/*` mediante proxy reverso (`BACKEND_URL`).
- **Costo:** Mínimo **$9.50 USD/mes** en Render (requiere plan Starter para disco persistente).

---

### 2. Guía Paso a Paso — Opción 1: Vercel Serverless + Turso Cloud ($0/mes)

#### Paso 1.1: Aprovisionar Base de Datos en Turso Cloud
1. **[PENDIENTE DEL ADMINISTRADOR]** Crear cuenta gratuita en [Turso Cloud](https://turso.tech).
2. Instalar Turso CLI localmente (o usar el panel web):
   ```bash
   # En Windows (PowerShell):
   irm https://get.tur.so/install.ps1 | iex
   ```
3. Iniciar sesión y crear la base de datos:
   ```bash
   turso auth login
   turso db create alsiz-db
   ```
4. **[PENDIENTE DEL ADMINISTRADOR]** Obtener la URL y generar el token de autenticación:
   ```bash
   turso db show alsiz-db --url
   # Ejemplo: libsql://alsiz-db-ekballo.turso.io

   turso db tokens create alsiz-db
   # Guarda el token generado de forma segura
   ```
5. Aplicar las migraciones a Turso (desde el entorno local con las variables configuradas):
   ```bash
   # Configura temporalmente en tu .env local:
   # TURSO_DATABASE_URL=libsql://alsiz-db-ekballo.turso.io
   # TURSO_AUTH_TOKEN=<tu-token>
   npm run db:migrate
   ```

#### Paso 1.2: Desplegar en Vercel
1. **[PENDIENTE DEL ADMINISTRADOR]** Iniciar sesión en [Vercel](https://vercel.com) e importar el repositorio `rpmministry/plataforma-educativa-alsiz`.
2. Configurar Build & Output:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`
3. **[PENDIENTE DEL ADMINISTRADOR]** Configurar Variables de Entorno en Vercel (**Project Settings -> Environment Variables**):
   - `TURSO_DATABASE_URL`: `libsql://alsiz-db-ekballo.turso.io`
   - `TURSO_AUTH_TOKEN`: `<tu-token-secreto>`
   - `SESSION_SECRET`: Generar una cadena de 32+ caracteres criptográficos (`node -e "console.log(crypto.randomBytes(32).toString('hex'))"`).
   - `GEMINI_API_KEY`: Clave de Google AI Studio.
   - `RESEND_API_KEY`: Clave de despacho de correos Resend.
   - `RESEND_FROM_EMAIL`: Remitente verificado (ej. `onboarding@resend.dev` o `no-responder@ekballochurch.org`).
   - `NODE_ENV`: `production`
4. Desplegar haciendo clic en **Deploy**.
5. **[PENDIENTE DEL ADMINISTRADOR]** Asignar el dominio institucional (ej. `educacion.ekballochurch.org`).

---

### 3. Guía Paso a Paso — Opción 2: Vercel CDN + Backend en Render / VPS ($9.50+/mes)

#### Paso 2.1: Despliegue del Backend en Render con Disco Persistente
1. **[PENDIENTE DEL ADMINISTRADOR]** Crear cuenta en [Render.com](https://render.com) e iniciar sesión.
2. Crear un **Web Service** usando el repositorio `rpmministry/plataforma-educativa-alsiz` o el archivo `render.yaml`.
   - **Environment:** `Node`
   - **Plan:** `Starter` ($7/mes)
   - **Build Command:** `npm ci && npm run build`
   - **Pre-Deploy Command:** `npm run db:migrate`
   - **Start Command:** `npm run start`
3. **[PENDIENTE DEL ADMINISTRADOR]** Crear el **Persistent Disk**:
   - **Mount Path:** `/data`
   - **Size:** `10 GB` ($2.50/mes)
4. Configurar Variables de Entorno en Render:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `DATABASE_PATH`: `/data/alsiz.db`
   - `RUN_MIGRATIONS_ON_STARTUP`: `false`
   - `TRUST_PROXY`: `1`
   - `SESSION_SECRET`: `<cadena-criptografica>`
   - `GEMINI_API_KEY`: `<clave-gemini>`
   - `RESEND_API_KEY`: `<clave-resend>`
5. Desplegar el Web Service y copiar la URL pública (ej. `https://alsiz-backend-api.onrender.com`).

#### Paso 2.2: Conectar Vercel con el Backend Persistente
1. En el panel de Vercel (**Project Settings -> Environment Variables**):
   - Configurar `BACKEND_URL`: `https://alsiz-backend-api.onrender.com`.
   - *Nota:* Asegúrese de NO definir `TURSO_DATABASE_URL` para que `api-entry.js` opere como proxy reverso hacia `BACKEND_URL`.
2. Re-desplegar Vercel para activar el proxy reverso.

---

### 4. Verificación Posterior al Despliegue (Smoke Tests)

Independientemente de la opción elegida, verifique el correcto funcionamiento del sistema:

1. **Chequeo de Salud de la API**:
   ```bash
   curl -i https://<tu-app>.vercel.app/api/health
   # Respuesta esperada: HTTP 200 OK
   # {
   #   "status": "ok",
   #   "version": "1.0.0",
   #   "database": { "connected": true, "status": "HEALTHY", "migrations": { "status": "SYNCED" } }
   # }
   ```

2. **Verificación de Inyección de Credenciales**:
   El JSON retornado por `/api/health` debe mostrar `geminiConfigured: true` (o false) como booleano, **sin jamás mostrar las claves API**.

3. **Prueba de Autenticación de Estudiante (Sintética)**:
   - Acceder al frontend en `https://<tu-app>.vercel.app`.
   - Abrir DevTools (pestaña Red).
   - Iniciar sesión con el modal de PIN de estudiante sintético.
   - Constatar que la respuesta HTTP incluye la cookie `alsiz_session` con flags `HttpOnly; SameSite=Lax; Secure`.
   - Recargar la página y confirmar que la sesión del alumno persiste.

4. **Respaldo de Base de Datos**:
   - En **Turso Cloud**: Generar dump con `turso db dump alsiz-db > backup.sql`.
   - En **Render/VPS**: Ejecutar `npm run db:backup` para generar el snapshot en `/data/backups/`.
