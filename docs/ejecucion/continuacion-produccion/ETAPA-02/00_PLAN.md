# PLAN DE TRABAJO — ETAPA 02: PERSISTENCIA REAL Y ARQUITECTURA TEMPORAL DE DESPLIEGUE
## Plataforma Educativa ALSIZ para Ekballo Church

- **Fecha:** 2026-10-17
- **Rama de Trabajo:** `continuacion-produccion-etapa-02`
- **Commit Base:** `c35d468` (`feat(etapa-01): culminacion tecnica de etapa 01 de continuacion a produccion`)
- **Estado Inicial:** En Planificación
- **Responsable:** Antigravity (Advanced Agentic Coding)

---

## 1. OBJETIVO DE LA ETAPA
Definir, documentar y dejar completamente preparada e instrumentada una arquitectura de despliegue compatible con la base de datos existente (SQLite con WAL sobre disco persistente), eliminando el riesgo de pérdida de datos por ejecución efímera en serverless, preservando la compatibilidad con las consultas síncronas de la plataforma, unificando el gestor de paquetes y asegurando un proxy transparente `/api/*` desde la interfaz pública en Vercel hacia el servicio persistente de backend.

---

## 2. DECISIÓN DE ARQUITECTURA (ADR-002 RESUMEN)
Se compararon dos opciones arquitectónicas fundamentales:
1. **Opción A (Recomendada y Seleccionada):** Frontend estático servido globalmente por Vercel CDN y Backend Express modular ejecutado en un proceso Node.js 22 LTS persistente con volumen montado para SQLite (`/data/alsiz.db`). Las peticiones `/api/*` se canalizan desde Vercel hacia el backend persistente mediante reescritura/proxy transparente.
2. **Opción B (Descartada para esta etapa):** Toda la aplicación en Vercel Serverless con base de datos externa remota (Turso Cloud libSQL / PostgreSQL) y refactorización asíncrona total de todas las consultas existentes.

**Justificación técnica:** La Opción A conserva las consultas síncronas existentes de `node:sqlite`, minimiza la latencia de red en cada query transaccional, evita riesgos de regresión masiva en más de 20 controladores y scripts, y permite una transición segura sin interrumpir el piloto educativo.

*(El análisis comparativo exhaustivo, matriz de ventajas/desventajas y criterios de transición futura se registran formalmente en `04_RIESGOS_Y_DECISIONES.md`).*

---

## 3. ALCANCE Y TAREAS DE IMPLEMENTACIÓN

### Tarea 1: Despliegue del Backend Express Persistente (Node 22 LTS y Proceso Único)
- Definir la configuración de ejecución para Node.js 22 LTS (v22.12.0+ / v22.14.0+) requerida por el módulo nativo `node:sqlite`.
- Garantizar ejecución en modo single-process (`instances: 1`, `exec_mode: 'fork'`) para evitar bloqueos concurrentes de escritura en SQLite WAL.
- Generar manifiestos de despliegue listos para producción:
  - `ecosystem.config.cjs` (PM2 para VPS / Ubuntu LTS).
  - `Dockerfile` y `docker-compose.yml` (para entornos contenerizados con volumen persistente).
  - `render.yaml` (Blueprint para Render Web Service con persistent disk).
  - `fly.toml` (Configuración para Fly.io con volumen persistente).

### Tarea 2: Montaje de Disco Persistente y Normalización de `DATABASE_PATH`
- Actualizar `server/db/database.ts` para que `getDatabasePath()` resuelva correctamente rutas absolutas montadas (`/data/alsiz.db`, `/var/data/alsiz.db`) en sistemas Linux/Docker.
- Impedir terminantemente que la base de datos operativa se aloje en el repositorio git, en `dist/` o en `/tmp`.
- Garantizar creación segura de subdirectorios y permisos adecuados (`chmod 700 /data`).

### Tarea 3: Control Estricto de Migraciones en Release / Operación
- Desacoplar las migraciones de las peticiones HTTP: ninguna petición web ejecutará escrituras de esquema improvisadas.
- Establecer `npm run db:migrate` como comando obligatorio de pre-despliegue / release step.
- Implementar en `server/db/migrator.ts` la función `checkMigrationsStatus()` de solo lectura que valide versiones y checksums SHA-256 sin mutar la base de datos.
- Configurar el arranque del servidor para comprobar integridad de migraciones sin reescribir esquemas innecesariamente.

### Tarea 4: Configuración de Vercel (Frontend Estático + Proxy `/api/*`)
- Actualizar `vercel.json` para servir la SPA compilada en `dist/` como artefacto puramente estático.
- Reconfigurar `api-entry.js` para que actúe como proxy inverso inteligente y seguro hacia el backend persistente (`BACKEND_URL`), o documentar la directiva `rewrites` nativa de Vercel.
- Eliminar la ambigüedad de rutas: ninguna petición `/api/*` debe bifurcarse hacia una base SQLite efímera en serverless. Si `BACKEND_URL` no está configurado, responder con un error claro 503 indicando acción pendiente del administrador.

### Tarea 5: Preservación de Cookies de Sesión y Configuración de Proxy
- Configurar `app.set('trust proxy', 1)` en Express para que `req.ip`, `req.protocol` y `req.secure` funcionen correctamente detrás del proxy inverso / CDN.
- Asegurar que `Set-Cookie` (`alsiz_session`) mantenga directivas `HttpOnly`, `SameSite=Lax`, y `Secure` cuando la petición entre por HTTPS o en producción.
- Validar el flujo bidireccional de cookies (`Set-Cookie` del backend al navegador y `Cookie` del navegador al backend a través del proxy).

### Tarea 6: Documentación Operativa Paso a Paso
- Actualizar `docs/operacion/guia_instalacion_despliegue.md` reflejando la arquitectura de la Opción A.
- Documentar pasos de despliegue para Vercel y para el proveedor persistente (Render, VPS, Fly.io).
- Marcar claramente como `PENDIENTE DEL ADMINISTRADOR` la creación de cuentas, provisionamiento de discos y configuración de URLs reales, sin inventar credenciales ni enlaces.

### Tarea 7: Separación Estricta de Variables de Entorno
- Crear documentación clara de variables de entorno segregadas por rol y entorno:
  - Frontend (sólo variables públicas no sensibles, prohibiendo claves de IA).
  - Backend Local (`.env.local`).
  - Staging.
  - Producción.
- Auditar y actualizar `.env.example`.

### Tarea 8: Health Checks Enriquecidos y Seguros
- Actualizar los endpoints `/api/health` y `/api/v1/health` en `server.ts` para reportar:
  - Versión de la API (`1.0.0`).
  - Conectividad activa y verificada a la base de datos.
  - Conteo y estado de migraciones aplicadas.
  - Estado de proveedores de IA configurados (booleanos honestos).
  - Uptime y estado general del servicio.
- Asegurar cero filtración de secretos, tokens, rutas internas o datos de estudiantes en las respuestas de salud.
- Actualizar `scripts/health-check.ts` para alinearse con esta estructura.

### Tarea 9: Unificación de Gestor de Paquetes (`npm`)
- Comparar `package-lock.json` y `bun.lock`.
- Constatar que no existen dependencias operativas sobre Bun ni scripts que lo requieran.
- Eliminar `bun.lock` para prevenir que Vercel o pipelines de CI/CD detecten e invoquen Bun erróneamente con dependencias desactualizadas.
- Estandarizar formalmente en `npm` y `npm ci`.

### Tarea 10: Prevención de Datos Productivos
- No crear cuentas reales ni ejecutar migración de estudiantes en esta etapa.

---

## 4. METODOLOGÍA DE PRUEBAS
Se desarrollará una suite de pruebas automatizada `scripts/test-etapa-02.ts` (`npm run test:etapa02`) para validar:
1. **Resolución de rutas de persistencia:** Validación de rutas absolutas vs relativas en `DATABASE_PATH`.
2. **Chequeo no destructivo de migraciones:** Verificación de checksums y estado sin escrituras.
3. **Health Check seguro:** Respuesta JSON completa con verificación de BD viva y cero secretos expuestos.
4. **Proxy `/api/*` y Cookies E2E:** Levantamiento de backend de ensayo y validación de reenvío de peticiones, `trust proxy`, headers `X-Forwarded-*`, `Cookie` y `Set-Cookie`.
5. **Revisión estática de dependencias:** Verificación de ausencia de `bun.lock` y consistencia de `package-lock.json`.
6. **No regresión:** Ejecución de pruebas de seguridad P0 (`npm run test:security-p0`) y compilación (`npm run build`).

---

## 5. CRITERIOS DE ACEPTACIÓN
- [ ] ADR formal registrado comparando Opción A vs Opción B con recomendación justificada.
- [ ] Backend preparado con soporte para Node 22 LTS, single-process SQLite WAL y volumen persistente.
- [ ] Migraciones desacopladas de las llamadas HTTP y con verificación de checksums en salud.
- [ ] Vercel configurado para frontend estático y proxy `/api/*` sin rutas efímeras ambiguas.
- [ ] Cookies HttpOnly/Secure probadas y verificadas a través del proxy con `trust proxy`.
- [ ] Guía paso a paso con acciones pendientes del administrador explícitamente etiquetadas.
- [ ] Variables de entorno documentadas por separado para frontend, backend local, staging y producción.
- [ ] Endpoint `/api/health` robusto, seguro y sin exposición de datos privados.
- [ ] Gestor de paquetes unificado exclusivamente en `npm`.
- [ ] Todas las pruebas locales y revisiones estáticas aprobadas con evidencia reproducible.

