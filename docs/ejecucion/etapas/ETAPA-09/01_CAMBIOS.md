# Registro Detallado de Cambios — ETAPA 09
## Aula Interactiva e Integración Evaluada de OpenMAIC

- **Etapa**: ETAPA-09
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-09-aula-interactiva-openmaic`
- **Responsable**: Líder Técnico — Plataforma Educativa ALSIZ para Ekballo Church
- **Estado**: APROBADA (Lista para revisión humana)

---

### 1. Resumen Ejecutivo de la Etapa

La **ETAPA-09** evalúa la tecnología de **OpenMAIC** (`THU-MAIC/OpenMAIC`), analizando su viabilidad técnica, licencias, dependencias y riesgos de integración, e implementa un **Piloto Aislado de Aula Interactiva Multiagente** gobernado por banderas de funcionalidad (*Feature Flags*), sandbox criptográfico sin datos personales (Anti-PII) y conmutador de emergencia (*Kill-Switch*).

Principales logros de la etapa:
1. **Evaluación Técnica y de Licencias de OpenMAIC**:
   - Se verificó la disparidad de stack: OpenMAIC depende de Next.js 16 (App Router), pnpm workspaces, LangGraph y PostgreSQL dedicado con procesos de larga duración, incompatible con la arquitectura SPA ligera (React 19 + Vite 6 + Express + SQLite WAL) de ALSIZ.
   - Se detectó ambigüedad legal: código fuente bajo MIT pero sitios comerciales y documentación externa que reclaman licenciamiento AGPL-3.0 y consultas comerciales obligatorias.
   - **Decisión arquitectónica**: Descartar la fusión directa de código ajeno e implementar un **Adaptador Desacoplado / Sandbox de Aula Interactiva** de desarrollo propio que replica limpiamente la interacción multiagente (profesor + compañero virtual + simulador de física) sin pasivos de licencias ni dependencias externas pesadas.
2. **Feature Flagging y Desactivación de Emergencia (Kill-Switch)**:
   - Configuración persistente en base de datos (`interactive_pilot_config`) y soporte por variable de entorno (`FEATURE_OPENMAIC_PILOT`).
   - Endpoint administrativo `POST /api/v1/pilot/admin/toggle` que desactiva de inmediato el piloto, retornando `403 PILOT_DISABLED` a nuevos intentos sin errores 500.
3. **Aislamiento Criptográfico Estricto (Anti-PII)**:
   - Sesiones efímeras con token criptográfico temporal (`pilot-tok-...`) con TTL de 15 minutos.
   - Asignación de alias sintéticos anónimos (`Estudiante Explorador #...`). Cero exposición de nombres reales, correos, contraseñas o tokens JWT hacia el sandbox.
4. **Dinámica Multiagente en Vivo (Física BGU / Óptica)**:
   - Simulación socrática de la Ley de Snell ($n_1 \cdot \sin(\theta_1) = n_2 \cdot \sin(\theta_2)$) con cálculo físico exacto, trazado de rayos en Canvas y detección de Reflexión Total Interna (TIR).
   - Diálogo pedagógico entre el Profesor Socrático (Kepler) y la Compañera Virtual (Sofía), promoviendo la indagación activa.
5. **Control de Costos de Tokens**:
   - Límite estricto de 6 turnos por sesión (`429 MAX_TURNS_EXCEEDED` ante intentos de saturación).
6. **Resiliencia y Salida Rápida ("Volver al Aula Tradicional")**:
   - Botón de escape que cierra la sesión con código `USER_EXIT`, registra telemetría y regresa al aula estándar sin alterar la clase original.

---

### 2. Archivos Creados y Modificados

#### 2.1 Base de Datos y Migraciones
- `server/db/migrations/010_interactive_pilot.sql`:
  - `interactive_pilot_config`: Configuración global del piloto, kill-switch, asignaturas permitidas y límites.
  - `interactive_pilot_sessions`: Sesiones efímeras sintéticas con TTL y estado (`ACTIVE`, `COMPLETED`, `ABORTED_BY_USER`, `TERMINATED_ERROR`).
  - `interactive_pilot_telemetry`: Métricas de latencia, turnos, tokens y razones de salida.

#### 2.2 Capa de Servicios Backend y Rutas
- `server/pilot/types.ts`: Tipado estricto para configuración, sesiones efímeras, turnos multiagente y telemetría.
- `server/pilot/pilotConfigService.ts`: Servicio para consulta y alternancia del Kill-Switch y parámetros.
- `server/pilot/pilotSessionService.ts`: Ciclo de vida de sesiones efímeras y agregación de telemetría administrativa.
- `server/pilot/pilotMultiAgentEngine.ts`: Motor de simulación física y diálogo concurrente (Kepler + Sofía).
- `server/routes/pilotRoutes.ts`: Endpoints RESTful bajo `/api/v1/pilot`:
  - `GET /status`: Configuración pública del feature flag.
  - `POST /sessions/initiate`: Inicio de sesión Anti-PII.
  - `GET /sessions/:token`: Estado de sesión activa.
  - `POST /sessions/:token/interact`: Turno multiagente interactivo.
  - `POST /sessions/:token/terminate`: Cierre ordenado y guardado de telemetría.
  - `GET /admin/telemetry`: Métricas operativas (RBAC: ADMIN / COORDINATOR).
  - `POST /admin/toggle`: Conmutador maestro de emergencia (Kill-Switch).
- `server.ts`: Montaje del enrutador `/api/v1/pilot`.
- `server/agents/providers/simulatedProvider.ts`: Normalización de diacríticos y optimización del orden de evaluación en la simulación socrática.
- `server/agents/agentService.ts`: Corrección de comillas en sentencia SQL `datetime('now')`.

#### 2.3 Frontend y Experiencia de Usuario
- `src/components/classes/InteractivePilotSandbox.tsx`: Componente de aula interactiva con trazado de rayos en Canvas, controles de medios e índices, diálogo multiagente y botón de salida rápida.
- `src/components/classes/DailyClassView.tsx`: Integración del botón condicional de lanzamiento del piloto y encapsulamiento que preserva al 100% el aula tradicional.
- `src/components/admin/AdminShell.tsx`: Panel administrativo de control del piloto con indicador visual de Kill-Switch, botón de alternancia y tarjetas de telemetría.
- `package.json`: Script `"test:etapa09": "tsx scripts/test-etapa-09.ts"`.

#### 2.4 Suite de Pruebas Automatizadas
- `scripts/test-etapa-09.ts`: Suite con 14 criterios de aceptación automatizados (100% aprobados).

---

### 3. Verificación de Integridad y Regresión
- Verificación estricta de tipos TypeScript (`npm run lint` / `tsc --noEmit` -> Código 0).
- Compilación de producción (`npm run build` -> Código 0).
- Cobertura de regresión completa:
  - Etapa 05 (Seguridad, Auth, LOPDP): 16/16 PASÓ.
  - Etapa 06 (LMS Académico, Rúbricas): 25/25 PASÓ.
  - Etapa 07 (Centro de Conocimiento RAG): 16/16 PASÓ.
  - Etapa 08 (Profesores IA, Multiagente): 17/17 PASÓ.
  - Etapa 09 (Aula Interactiva, OpenMAIC Sandbox): 14/14 PASÓ.

