# Catálogo de Cambios — Etapa 02: Persistencia Real y Arquitectura Temporal de Despliegue
**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha de Ejecución:** 17 de Octubre de 2026  
**Rama:** `feature/arquitectura-vercel-turso`  
**Estado:** Cambios Completados y Verificados

---

## 1. Resumen Ejecutivo de Cambios

En esta etapa se implementó y validó la **Arquitectura Vercel Serverless + Turso Cloud libSQL (Plan Gratuito Inicial $0/mes)**, manteniendo plena compatibilidad hacia atrás con la **Opción A (Render / VPS con SQLite en disco montado)** y preservando el entorno de pruebas locales ultrarrápido con `node:sqlite`.

Para lograrlo sin alterar los datos reales de los estudiantes ni comprometer la seguridad del sistema:
1. Se generó un respaldo físico previo inmutable en `backups/alsiz_pre_turso_migracion_20261017.db`.
2. Se enriqueció la capa de abstracción de base de datos (`server/db/dal.ts`) con una interfaz unificada `IDatabaseAdapter` y la función de salud asíncrona `isDatabaseConnectedAsync()`.
3. Se adaptaron el migrador y los módulos de rutas y servicios para soportar consultas asíncronas (`await`), permitiendo operar fluidamente tanto en la nube de Turso como en SQLite local.
4. Se transformó `api-entry.js` en un despachador dual que ejecuta Express en Vercel cuando `TURSO_DATABASE_URL` está configurada, o actúa como proxy reverso cuando se especifica `BACKEND_URL`.
5. Se validaron las 52 tablas y 12 migraciones en Turso Cloud, aprobando 9/9 pruebas E2E en vivo con `npm run test:turso` y 100% de las suites de regresión local.

---

## 2. Inventario Detallado de Modificaciones

| Archivo | Tipo de Operación | Propósito y Descripción Técnica |
| :--- | :--- | :--- |
| `server/db/dal.ts` | Modificación | Implementación de `IDatabaseAdapter`, con adaptadores `LibsqlAdapter` (Turso Cloud) y `SqliteLocalAdapter` (`node:sqlite`). Se añadió `isDatabaseConnectedAsync()`, soporte de parametrización unificada y aislamiento de tests (`NODE_ENV === 'test'` o `USE_LOCAL_SQLITE`). |
| `server/db/migrator.ts` | Modificación | Implementación de `runMigrationsAsync()` y `checkMigrationsStatusAsync()` usando el DAL agnóstico, permitiendo aplicar y verificar migraciones en Turso Cloud y SQLite sin código duplicado. |
| `server/middleware/authMiddleware.ts` | Modificación | Conversión de `requireStudentAccess` a asíncrono (`async/await`) utilizando `getDalAdapter()` para validar parentesco familiar (Anti-IDOR) contra Turso o SQLite. |
| `server/routes/representativeRoutes.ts` | Modificación | Rutas `/my-family` y `/consent` adaptadas a `async/await` mediante `getDalAdapter()` para consultar datos familiares y registrar consentimientos informados. |
| `server/routes/studentRoutes.ts` | Modificación | Adaptación a consultas asíncronas para el perfil del estudiante, materias asignadas, historial de tareas, calificaciones y entregas. |
| `server/routes/adminRoutes.ts` | Modificación | Migración de consultas en endpoints administrativos: panel de control, listado de usuarios, nóminas, asignación de roles, enlaces familiares, auditoría y telemetría del sistema. |
| `server/academic/academicService.ts` | Modificación | Refactorización de los 31 métodos del servicio académico (`getSubjectById`, `createSubject`, `listSubjects`, `listAssignments`, `submitAssignment`, `gradeSubmission`, etc.) para operar de forma asíncrona sobre `IDatabaseAdapter`. |
| `server/routes/academicRoutes.ts` | Modificación | Controladores de materias, asignaciones y calificaciones adaptados a llamadas `await academicService...`. |
| `server/pilot/pilotConfigService.ts` | Modificación | Conversión a llamadas asíncronas para la configuración del piloto escolar, directivas pedagógicas y políticas de retención. |
| `server/pilot/pilotSessionService.ts` | Modificación | Sesiones de estudio, métricas de interacción con tutores IA, validación de TTL y auditoría de eventos pedagógicos adaptadas a `IDatabaseAdapter`. |
| `server/routes/pilotRoutes.ts` | Modificación | Endpoints de inicio, seguimiento y culminación de sesiones de estudio adaptados a consumo asíncrono con verificación Anti-PII. |
| `server/routes/agentRoutes.ts` | Modificación | Verificación de autorización de conversación de agentes socráticos convertida a `async/await` con `getDalAdapter()`. |
| `server.ts` | Modificación | Actualización de endpoints de salud `/api/health` y `/api/v1/health` para utilizar `isDatabaseConnectedAsync()` y `checkMigrationsStatusAsync()`, reportando versión, BD viva, migraciones y uptime. |
| `api-entry.js` | Modificación | Arquitectura dual: si `TURSO_DATABASE_URL` está presente en Vercel, delega directamente en la app Express compilada (`dist/server.cjs`); si `BACKEND_URL` está presente, actúa como proxy reverso; si ninguna existe, retorna HTTP 503 estructurado (`PENDIENTE_DEL_ADMINISTRADOR`). |
| `package.json` | Modificación | Declaración estricta de motores (`engines`: Node `>=22.12.0`, npm `>=10.0.0`), adición de scripts `test:etapa02` y `test:turso`. |
| `bun.lock` | Eliminación | Eliminación de archivo de bloqueo divergente para estandarizar en `npm ci`. |
| `server/db/database.ts` | Modificación | Normalización multiplataforma de `DATABASE_PATH` para admitir volúmenes montados absolutos (`/data/alsiz.db`) y rutas relativas; configuración de `PRAGMA busy_timeout = 5000;`. |
| `server/routes/authRoutes.ts` | Modificación | Detección de `req.secure` y `X-Forwarded-Proto === 'https'` para emisión segura de cookies `HttpOnly`, `SameSite=Lax`. |
| `.env.example` | Modificación | Segregación formal de variables para Vercel Serverless (Sección A) y Backend Persistente (Sección B). |
| `docs/operacion/guia_instalacion_despliegue.md` | Modificación | Documentación completa paso a paso de despliegue en Vercel + Turso y en Render/VPS con disco persistente. |
| `ecosystem.config.cjs` | Creación | Manifiesto PM2 para despliegue en VPS Linux con proceso único. |
| `render.yaml` | Creación | Blueprint de infraestructura para Render Web Service con disco persistente `/data` (10 GB). |
| `Dockerfile` | Creación | Imagen Docker Node 22 con volumen persistente `/data`. |
| `docker-compose.yml` | Creación | Orquestación local/servidor con volumen persistente. |
| `scripts/test-etapa-02.ts` | Creación | Suite de 10 pruebas automatizadas para la arquitectura de persistencia. |

---

## 3. Revisión de Políticas de Seguridad y Alcance
- **Cero claves expuestas:** Ningún secreto, token o variable sensible fue añadido a Git ni expuesto en frontend.
- **Cero datos de alumnos alterados:** El respaldo físico `backups/alsiz_pre_turso_migracion_20261017.db` (1.14 MB) se verificó intacto antes de cualquier operación.
- **Pruebas con datos sintéticos:** Ningún registro real fue utilizado en las pruebas locales ni en las pruebas en vivo de Turso Cloud.
- **Sin refactorizaciones oportunistas:** La migración a consultas asíncronas se limitó estrictamente a los módulos que consumen base de datos para habilitar la interoperabilidad con Turso Cloud y SQLite.
