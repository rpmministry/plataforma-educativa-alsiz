# Catálogo de Cambios — Etapa 02: Persistencia Real y Arquitectura Temporal de Despliegue
**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha de Ejecución:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-02`  
**Estado:** Cambios Completados y Verificados

---

## 1. Resumen Ejecutivo de Cambios

En esta etapa se implementó la arquitectura aprobada en el **ADR-002: Opción A (Frontend Estático en Vercel + Backend Express en Servicio Node Persistente con Disco Montado)**. Se eliminó la presencia de base de datos efímera en Vercel, se aseguró la persistencia en disco montado para SQLite WAL (`DATABASE_PATH`), se integraron comprobaciones de salud activas y de migraciones no destructivas, se unificó el gestor de paquetes exclusivamente en `npm`, y se crearon los manifiestos de infraestructura para Render, Docker y PM2.

---

## 2. Inventario Detallado de Modificaciones y Creaciones

| Archivo | Tipo de Operación | Propósito y Descripción Técnica |
| :--- | :--- | :--- |
| `package.json` | Modificación | Declaración estricta de motores (`engines`: Node `>=22.12.0`, npm `>=10.0.0`) y adición del script de verificación de etapa `test:etapa02`. |
| `bun.lock` | Eliminación | Eliminación de archivo de bloqueo divergente para evitar que plataformas como Vercel o Render infieran incorrectamente Bun como runtime o fallen por dependencias faltantes. |
| `server/db/database.ts` | Modificación | Normalización multiplataforma de `DATABASE_PATH` para admitir volúmenes montados absolutos (`/data/alsiz.db`) y rutas relativas; configuración de `PRAGMA busy_timeout = 5000;`; advertencia operativa ante directorios volátiles (`dist/`, `tmp/`); y función `isDatabaseConnected()`. |
| `server/db/migrator.ts` | Modificación | Normalización de finales de línea CRLF a LF en `computeChecksum()` para hashes deterministas en Windows y Linux; adición de la función de diagnóstico no destructivo `checkMigrationsStatus()`. |
| `server.ts` | Modificación | Configuración de `app.set('trust proxy', 1);`; desactivación de migraciones improvisadas en peticiones entrantes; actualización de endpoints de salud `/api/health` y `/api/v1/health` para reportar versión, estado de conexión a BD, conteo de migraciones y uptime, retornando 503 en fallo. |
| `server/routes/authRoutes.ts` | Modificación | Actualización de `setSessionCookie` y `logout` para reconocer `req.secure` o cabecera `X-Forwarded-Proto === 'https'`, garantizando cookies `Secure` en HTTPS detrás de proxy reverso. |
| `api-entry.js` | Reescribir | Transformación de función Serverless con SQLite embebido en un Proxy Reverso HTTP puro que reenvía `/api/*` hacia `BACKEND_URL`, preservando `Set-Cookie` y emitiendo 503 informativo (`PENDIENTE_DEL_ADMINISTRADOR`) si falta la URL. |
| `server/db/dal.ts` | Modificación | Actualización de `SqliteLocalAdapter` para resolver `getDb()` de forma dinámica y forzar SQLite local cuando `NODE_ENV === 'test'` o `USE_LOCAL_SQLITE === 'true'`, aislando los tests locales. |
| `scripts/health-check.ts` | Modificación | Integración de `checkMigrationsStatus()` en el script de diagnóstico de terminal. |
| `.env.example` | Modificación | Segregación formal de variables en Sección A (Vercel Frontend + Proxy con `BACKEND_URL`) y Sección B (Backend Persistente con `DATABASE_PATH`, secretos de sesión e integraciones). |
| `docs/operacion/guia_instalacion_despliegue.md` | Modificación | Documentación completa paso a paso de la arquitectura Opción A, configuración de Vercel y Render/VPS, runbook de migraciones y delimitación de tareas `[PENDIENTE DEL ADMINISTRADOR]`. |
| `ecosystem.config.cjs` | Creación | Manifiesto PM2 para despliegue en VPS Linux con un único proceso (`instances: 1`, `exec_mode: 'fork'`), asegurando compatibilidad con SQLite WAL. |
| `render.yaml` | Creación | Blueprint de infraestructura para Render Web Service con disco persistente `/data` (10 GB), Node 22, y pre-deploy command `npm run db:migrate`. |
| `Dockerfile` | Creación | Imagen de contenedor Node 22 con volumen persistente `/data`, healthcheck integrado y ejecución no privilegiada. |
| `docker-compose.yml` | Creación | Orquestación local/servidor con volumen nombrado `alsiz_data` montado en `/data` y variables de entorno aisladas. |
| `scripts/test-etapa-02.ts` | Creación | Suite de 10 pruebas automatizadas que valida la arquitectura completa de la Etapa 02. |
| `docs/ejecucion/continuacion-produccion/ETAPA-02/00_PLAN.md` | Creación | Plan de trabajo detallado de la Etapa 02. |
| `docs/ejecucion/continuacion-produccion/ETAPA-02/04_RIESGOS_Y_DECISIONES.md` | Creación | Registro de Decisión Arquitectónica (ADR-002) y matriz de riesgos de despliegue y persistencia. |

---

## 3. Revisión de Políticas de Seguridad y Alcance
- **Cero claves expuestas:** Ningún secreto, token o variable sensible fue añadido a Git ni expuesto en frontend.
- **Cero cuentas creadas:** No se registraron usuarios productivos ni se ejecutaron migraciones de estudiantes.
- **Sin refactorizaciones oportunistas:** Los cambios se limitaron con rigor a la capa de persistencia, proxy y despliegue requerida por el Prompt 02.

