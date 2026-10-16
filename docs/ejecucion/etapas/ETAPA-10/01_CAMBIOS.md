# Registro de Cambios — ETAPA 10
## Centro Administrativo Unificado

- **Etapa**: ETAPA-10
- **Fecha**: 2026-10-16
- **Rama**: `etapa-10-centro-administrativo-unificado`

---

### 1. Migraciones de Base de Datos

- **`server/db/migrations/011_unified_admin.sql`** (NUEVO):
  - Creación de tabla `institution_settings` con clave primaria `setting_key`, `setting_value`, `category`, `description` y `updated_at`.
  - Carga inicial de parámetros clave: nombre institucional de Ekballo Church, año lectivo activo (`2026-2027`), horas K-12 mínimas (800h MINEDUC), límites de turnos IA y habilitación del conmutador de emergencia.
  - Índices administrativos de rendimiento: `idx_audit_user_event`, `idx_audit_resource`, `idx_settings_cat`.

---

### 2. Servicios de Backend

- **`server/academic/academicService.ts`** (MODIFICADO):
  - Implementación del método `updateSubject(id, data)` para modificación en caliente de asignaturas.
  - Transformación del campo interno `db` a un *getter* dinámico (`private get db(): DatabaseSync`), garantizando compatibilidad con reinicializaciones transaccionales de base de datos en pruebas automatizadas.
- **`server/knowledge/knowledgeService.ts`** (MODIFICADO):
  - Implementación del método `updateSource(id, input, justification, userId)`:
    - Recálculo del checksum criptográfico SHA-256 ante modificaciones de contenido.
    - Re-segmentación automática de chunks en SQLite FTS5.
    - Registro inmutable en `knowledge_source_history` con acción `'UPDATED'`.
  - Implementación del método `getSourceHistory(sourceId)` para consulta de la trazabilidad completa.
- **`server/routes/academicRoutes.ts`** (MODIFICADO):
  - Incorporación del endpoint `PUT /api/v1/academic/subjects/:subjectId`:
    - Validación de permisos con `requireRole('ADMIN', 'ACADEMIC_COORDINATOR')`.
    - Validación de esquema de datos con Zod.
    - Emisión de evento en bitácora de auditoría `ACADEMIC_SUBJECT_UPDATED`.
- **`server/routes/knowledgeRoutes.ts`** (MODIFICADO):
  - Incorporación del endpoint `PUT /api/v1/knowledge/sources/:id` con justificación obligatoria.
  - Incorporación del endpoint `GET /api/v1/knowledge/sources/:id/history` para consulta del árbol editorial.
- **`server/routes/adminRoutes.ts`** (COMPLETAMENTE ACTUALIZADO Y EXPANDIDO):
  - `GET /api/v1/admin/dashboard-summary`: KPIs en tiempo real de usuarios, programas, asignaturas, matrículas, fuentes RAG, agentes IA, salud de servicios y bandeja de tareas pendientes (action items).
  - `GET /api/v1/admin/users`: Listado de usuarios con filtros por búsqueda y rol, excluyendo hashes de contraseñas.
  - `PATCH /api/v1/admin/users/:userId/role`: Cambio controlado de rol con salvaguarda del último administrador activo y auditoría.
  - `PATCH /api/v1/admin/users/:userId/status`: Actualización de estado (`ACTIVE`, `INACTIVE`, `SUSPENDED`).
  - `GET /api/v1/admin/representatives`: Listado de tutores con teléfonos de emergencia y estudiantes a cargo.
  - `POST /api/v1/admin/representatives/link-student`: Vinculación N:M de tutela legal familiar con auditoría LOPDP.
  - `GET /api/v1/admin/telemetry/errors`: Registro de errores críticos, fallbacks de proveedores y sesiones interrumpidas.
  - `GET /api/v1/admin/settings` y `PUT /api/v1/admin/settings`: Parámetros institucionales exclusivos de `ADMIN`.
  - `GET /api/v1/admin/reports/academic-summary`: Reporte de rendimiento por materia y distribución de destrezas MINEDUC.
  - `GET /api/v1/admin/audit-logs`: Consulta de eventos inmutables LOPDP con filtros por tipo de evento y recursos.

---

### 3. Interfaz de Usuario (Frontend)

- **`src/components/admin/AdminOverviewTab.tsx`** (NUEVO):
  - Tarjetas métricas ejecutivas, diagnóstico de salud de servicios y bandeja de tareas pendientes.
- **`src/components/admin/AdminUsersTab.tsx`** (NUEVO):
  - Pestaña de usuarios con buscador, filtro de roles, modales de cambio de rol y estado, y sección de tutela familiar.
- **`src/components/admin/AdminAcademicTab.tsx`** (NUEVO):
  - Vista curricular: selector de programas, listado de niveles y tabla de asignaturas con modales para **crear y editar materias**.
- **`src/components/admin/AdminKnowledgeModals.tsx`** (NUEVO):
  - `EditKnowledgeModal`: Formulario de edición con campo mandatorio de justificación técnica/editorial.
  - `SourceHistoryModal`: Visualizador del historial inmutable de cambios con marcas temporales y autores.
- **`src/components/admin/AdminReportsTab.tsx`** (NUEVO):
  - Informe curricular con barras de progreso de dominio competencial MINEDUC y métricas por asignatura.
- **`src/components/admin/AdminSettingsTab.tsx`** (NUEVO):
  - Formulario de ajustes institucionales con salvaguarda en tiempo real y confirmación visual.
- **`src/components/admin/AdminShell.tsx`** (MODIFICADO Y UNIFICADO):
  - Navegación articulada en 8 pestañas: Visión General, Usuarios & Familias, Gestión Académica, Evaluaciones, Base de Conocimiento, Agentes & Piloto, Telemetría & Errores, Auditoría & Ajustes.

---

### 4. Automatización y Verificación

- **`scripts/test-etapa-10.ts`** (NUEVO):
  - Suite de 15 pruebas automatizadas cubriendo los 10 criterios de aceptación de la Etapa 10.
- **`package.json`** (MODIFICADO):
  - Incorporación del script `"test:etapa10": "tsx scripts/test-etapa-10.ts"`.

