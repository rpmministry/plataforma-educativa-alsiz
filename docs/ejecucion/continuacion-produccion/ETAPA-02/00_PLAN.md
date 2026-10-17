# PLAN DE TRABAJO — ETAPA 02: PERSISTENCIA REAL Y ARQUITECTURA TEMPORAL DE DESPLIEGUE
## Plataforma Educativa ALSIZ para Ekballo Church

- **Fecha:** 2026-10-17
- **Rama de Trabajo:** `feature/arquitectura-vercel-turso` (base de etapa: `continuacion-produccion-etapa-02`)
- **Commit Base:** `c35d468` (`feat(etapa-01): culminacion tecnica de etapa 01 de continuacion a produccion`)
- **Estado:** Completado y Verificado
- **Responsable:** Antigravity (Advanced Agentic Coding)

---

## 1. OBJETIVO DE LA ETAPA
Definir, documentar y dejar completamente preparada e instrumentada una arquitectura de despliegue compatible con la base de datos existente, eliminando el riesgo de pérdida de datos por ejecución efímera en serverless, minimizando el costo inicial a **$0.00 USD/mes** para el piloto de la iglesia, preservando la compatibilidad con las consultas existentes mediante un adaptador desacoplado (DAL `IDatabaseAdapter`), unificando el gestor de paquetes y asegurando persistencia real.

---

## 2. DECISIÓN DE ARQUITECTURA Y VALIDACIÓN DE INFRAESTRUCTURA

Inicialmente se evaluaron dos opciones en el ADR-002:
1. **Opción A:** Frontend estático en Vercel y Backend Express en un servicio Node persistente con disco montado (Render / VPS) usando SQLite local.
2. **Opción B:** Toda la aplicación en Vercel, con una base de datos externa persistente (Turso Cloud libSQL) y adaptación asíncrona de la capa de datos.

### Validación de Costos e Infraestructura Solicitada:
Tras la solicitud de evaluación de infraestructura para reducir los costos iniciales a $0 sin comprometer la persistencia:
- Se verificó que **Render no ofrece discos persistentes en su capa gratuita** (requiere plan Starter de $7/mo + $2.50/mo por 10GB de disco = mínimo **$9.50 USD/mes**).
- Se validó que **Turso Cloud (libSQL)** ofrece un **Starter Plan gratuito ($0.00 USD/mes)** que incluye:
  - 9 GB de almacenamiento distribuido.
  - 1 billón de lecturas al mes.
  - 25 millones de escrituras al mes.
  - Hasta 500 bases de datos.
- **Conclusión arquitectónica aprobada:** Se implementó una **Arquitectura Dual-Agnóstica** en la que:
  - **Producción Serverless ($0 Costo):** La aplicación puede desplegarse 100% en Vercel Serverless conectada a Turso Cloud mediante `@libsql/client` asíncrono.
  - **Contingencia / Render / VPS:** La aplicación conserva compatibilidad total con Render/VPS con disco persistente y proxy reverso mediante `BACKEND_URL`.
  - **Pruebas Locales e Integración Continua:** Todas las pruebas locales y pipelines de CI continúan ejecutándose de forma instantánea y aislada con `node:sqlite` en memoria o en disco local, sin requerir internet ni credenciales externas.

---

## 3. ALCANCE Y TAREAS DE IMPLEMENTACIÓN

### Tarea 1: Despliegue del Backend y Adaptabilidad de Entorno
- Definir compatibilidad de Node.js 22 LTS (v22.12.0+) requerida por el proyecto.
- Mantener manifiestos para despliegue persistente tradicional (`render.yaml`, `Dockerfile`, `docker-compose.yml`, `ecosystem.config.cjs`) como alternativa de hosting.
- Implementar punto de entrada dual en `api-entry.js`: ejecución directa de la API Express en Vercel Serverless cuando `TURSO_DATABASE_URL` está configurada, o proxy reverso hacia `BACKEND_URL` si se utiliza un backend independiente. Si ninguna está configurada en Vercel, responder con 503 `PENDIENTE_DEL_ADMINISTRADOR`.

### Tarea 2: Abstracción de Datos Asíncrona (DAL Agnóstico)
- Extender `server/db/dal.ts` para proveer `IDatabaseAdapter` con implementaciones duales:
  - `LibsqlAdapter`: Conexión remota a Turso Cloud mediante `@libsql/client`.
  - `SqliteLocalAdapter`: Conexión síncrona local con `node:sqlite` para desarrollo y tests.
- Implementar `isDatabaseConnectedAsync()` para validación de salud en ambas tecnologías.

### Tarea 3: Migración Controlada de Rutas y Servicios a Consultas Asíncronas
- Convertir a consultas asíncronas vía `getDalAdapter()` los módulos críticos:
  - `server/middleware/authMiddleware.ts` (control de acceso de tutores a estudiantes con Anti-IDOR).
  - `server/routes/representativeRoutes.ts` (listado familiar y consentimientos informados).
  - `server/routes/studentRoutes.ts` (perfiles de alumnos, materias, entregas y tareas).
  - `server/routes/adminRoutes.ts` (panel de control, usuarios, nóminas, telemetría y auditoría).
  - `server/academic/academicService.ts` y `server/routes/academicRoutes.ts` (31 métodos de materias, tareas, calificaciones y rúbricas).
  - `server/pilot/pilotConfigService.ts`, `server/pilot/pilotSessionService.ts` y `server/routes/pilotRoutes.ts` (sesiones de estudio, métricas de retención, Anti-PII).
  - `server/routes/agentRoutes.ts` (conversaciones de tutor IA y validación de parentesco).

### Tarea 4: Control Estricto de Migraciones (SQLite y Turso Cloud)
- Implementar `runMigrationsAsync()` y `checkMigrationsStatusAsync()` en `server/db/migrator.ts`.
- Desacoplar las migraciones de peticiones HTTP.
- Crear y verificar migración real a Turso Cloud (52 tablas sincronizadas, 12 migraciones aplicadas).
- Crear respaldo físico previo inmutable: `backups/alsiz_pre_turso_migracion_20261017.db`.

### Tarea 5: Preservación de Seguridad, Sesiones y Cookies
- Preservar cookies `HttpOnly`, `SameSite=Lax` y `Secure` en HTTPS tanto en Vercel como en Express.
- Garantizar que las claves de IA (`GEMINI_API_KEY`, `DEEPSEEK_API_KEY`) y `SESSION_SECRET` residan exclusivamente en el servidor y nunca en el frontend ni en variables `VITE_*`.

### Tarea 6: Documentación Operativa Paso a Paso
- Actualizar `docs/operacion/guia_instalacion_despliegue.md` reflejando ambas alternativas operativas (Vercel + Turso $0/mo y Render con Disco Persistente).
- Documentar las variables de entorno para Vercel y Backend en `.env.example`.
- Marcar claramente como `PENDIENTE DEL ADMINISTRADOR` las acciones de creación de cuentas y tokens reales.

### Tarea 7: Health Checks Seguros y Enriquecidos
- Endpoints `/api/health` y `/api/v1/health` actualizados con soporte asíncrono, reportando conectividad a BD, conteo de migraciones y proveedores configurados como booleanos honestos, sin revelar secretos.

### Tarea 8: Unificación de Gestor de Paquetes (`npm`)
- Eliminación de `bun.lock`.
- Estandarización en `npm` y `npm ci`.

### Tarea 9: Protección de Datos Reales de Estudiantes
- Ningún dato real de estudiante fue expuesto, modificado, anonimizado erróneamente ni utilizado en tests.
- Las pruebas utilizaron únicamente datos sintéticos.

---

## 4. METODOLOGÍA DE PRUEBAS
1. **Pruebas Locales Automatizadas:**
   - `npm run test:etapa02` (10/10 pasadas).
   - `npm run test:turso` (9/9 pasadas en vivo contra Turso Cloud).
   - `npm run test:security-p0` (10/10 pasadas).
   - `npm run test:security-scan` (44 archivos escaneados, 0 secretos).
   - `npm run health` (Diagnóstico de salud integral APROBADO).
2. **Pruebas de Regresión:**
   - `npm run test:etapa05` a `npm run test:etapa14` (100% pasadas).
3. **Revisión Estática:**
   - `npm run lint` (`tsc --noEmit` con 0 errores).
   - `npm run build` (`vite build && esbuild server.ts`, compilación limpia).

---

## 5. CRITERIOS DE ACEPTACIÓN
- [x] Evaluación de arquitectura Turso Cloud vs Render Disks documentada.
- [x] Respaldo físico de base de datos generado y verificado.
- [x] Capa DAL `IDatabaseAdapter` y migrador asíncrono implementados.
- [x] Rutas y servicios convertidos a llamadas asíncronas compatibles con Turso y SQLite.
- [x] Dual-mode en `api-entry.js` listo para Vercel Serverless o proxy reverso.
- [x] Pruebas en vivo contra Turso Cloud (`npm run test:turso`) 100% exitosas.
- [x] Cero regresiones en la suite local completa (`test:etapa02` a `test:etapa14`).
- [x] Cero secretos expuestos y compilación TypeScript limpia.
- [x] Documentación de ejecución y operativa actualizada con tareas pendientes del administrador.
