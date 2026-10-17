# Matriz de Aceptación y Validación — Etapa 02: Persistencia Real y Arquitectura Temporal de Despliegue
**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha de Validación:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-02`  

---

## 1. Criterio de Aceptación Global

> "El diseño de despliegue garantiza persistencia entre invocaciones y reinicios del backend; el proxy `/api/*` se prueba localmente con el backend de ensayo; las instrucciones distinguen con claridad los pasos automáticos y los que requieren la intervención del administrador."

**Evaluación Global:** **CUMPLIDO SATISFACTORIAMENTE (10 / 10 REQUISITOS)**.

---

## 2. Matriz de Validación Detallada

| # | Requisito del Prompt 02 | Estado | Evidencia y Mecanismo de Verificación |
| :- | :--- | :--- | :--- |
| **1** | **Backend Express en Node 22 con proceso único para SQLite WAL** | ✅ CUMPLIDO | Configuración en `package.json` (`engines`: Node `>=22.12.0`), `ecosystem.config.cjs` (`instances: 1`, `exec_mode: 'fork'`), `render.yaml` y `Dockerfile`. Verificado en test `E2-TEST-09`. |
| **2** | **Montaje de disco persistente y `DATABASE_PATH` fuera de repo, `dist/` o `/tmp`** | ✅ CUMPLIDO | Normalización en `server/db/database.ts` admitiendo `/data/alsiz.db`, volumen en `render.yaml` (`mountPath: /data`, 10GB) y advertencia activa si la ruta apunta a carpetas volátiles (`dist`, `tmp`). Verificado en test `E2-TEST-01`. |
| **3** | **Migraciones como paso controlado de release/operación, no en peticiones HTTP** | ✅ CUMPLIDO | Script `npm run db:migrate` establecido como pre-deploy en `render.yaml`. En `server.ts` se retiró la ejecución automática en peticiones. Se implementó `checkMigrationsStatus()` con validación no destructiva de checksums y versiones. Verificado en test `E2-TEST-03`. |
| **4** | **Vercel sirve frontend estático y reenvía `/api/*` mediante proxy sin SQLite efímero** | ✅ CUMPLIDO | `vercel.json` reescribe `/api/(.*)` hacia `api-entry.js`. `api-entry.js` actúa exclusivamente como proxy HTTP hacia `BACKEND_URL`. Si no está configurada, retorna HTTP 503 con código `persistent_backend_not_configured` y acción `PENDIENTE_DEL_ADMINISTRADOR`. Verificado en tests `E2-TEST-05` y `E2-TEST-07`. |
| **5** | **Preservación de cookies `HttpOnly`, `Secure` en HTTPS, `SameSite` y `trust proxy`** | ✅ CUMPLIDO | Configurado `app.set('trust proxy', 1)` en `server.ts`. En `server/routes/authRoutes.ts` se detecta `req.secure` y `X-Forwarded-Proto === 'https'`. En `api-entry.js` se preservan y reenvían las cabeceras `Set-Cookie`. Verificado en test `E2-TEST-06`. |
| **6** | **Documentación paso a paso distinguiendo pasos automáticos de los que requieren intervención del administrador** | ✅ CUMPLIDO | `docs/operacion/guia_instalacion_despliegue.md` detalla el flujo completo marcando expresamente con la etiqueta `[PENDIENTE DEL ADMINISTRADOR]` la creación de cuentas en Render/Vercel, discos y aprovisionamiento de URLs. |
| **7** | **Segregación de variables de entorno (frontend vs backend local, staging y producción)** | ✅ CUMPLIDO | `.env.example` reestructurado en Sección A (Vercel Frontend + Proxy) y Sección B (Backend Persistente). Cero claves de IA ni secretos de sesión en variables con prefijo `VITE_*`. Verificado en test `E2-TEST-10`. |
| **8** | **Health checks que comprueban versión de API, conectividad de BD y migraciones sin exponer secretos** | ✅ CUMPLIDO | Endpoints `/api/health` y `/api/v1/health` en `server.ts` reportan `apiVersion: '1.0.0'`, `status`, `uptime`, `database: { connected, engine, path, migrations }`, respondiendo 503 si la BD falla y sin filtrar credenciales ni datos de alumnos. Verificado en test `E2-TEST-04`. |
| **9** | **Unificación del gestor de paquetes (eliminación segura de `bun.lock` y validación de `npm ci`)** | ✅ CUMPLIDO | Eliminado `bun.lock` tras verificar que no contenía dependencias recientes del proyecto. `package-lock.json` verificado con `npm ci --prefer-offline`. Configurado `package.json` para requerir Node `>=22.12.0` y npm `>=10.0.0`. Verificado en test `E2-TEST-08`. |
| **10** | **Prohibición de crear cuentas productivas y migración real de estudiantes** | ✅ CUMPLIDO | No se crearon cuentas reales ni se importaron estudiantes. Solo se utilizaron esquemas sintéticos y tests en memoria o SQLite local aislado. Confirmado en `scripts/health-check.ts`. |

---

## 3. Matriz de Trazabilidad entre Requisitos y Evidencias

```
[Requisito 01, 02, 09] ---> E2-TEST-01, E2-TEST-09 ---> evidencias/01_test_etapa_02.txt
[Requisito 03, 08]     ---> E2-TEST-03, E2-TEST-04 ---> evidencias/01_test_etapa_02.txt, 02_health_check.txt
[Requisito 04, 05]     ---> E2-TEST-05, E2-TEST-06, E2-TEST-07 ---> evidencias/01_test_etapa_02.txt
[Requisito 06, 07]     ---> E2-TEST-10, guia_instalacion_despliegue.md ---> evidencias/01_test_etapa_02.txt
[Requisito 08, Seguridad] -> test:security-p0, test:security-scan ---> evidencias/03_security_p0_and_scan.txt
[Calidad de Código]    ---> lint (tsc), build (vite+esbuild) ---> evidencias/04_lint_and_build.txt
```

