# Plan de Ejecución — ETAPA 10
## Centro Administrativo Unificado

- **Etapa**: ETAPA-10
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-10-centro-administrativo-unificado`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)

---

### 1. Contexto y Objetivos

La **ETAPA 10** consolida la gobernanza institucional, pedagógica y tecnológica de la **Plataforma Educativa ALSIZ para Ekballo Church**, unificando los módulos construidos en las etapas precedentes en un centro de control operativo integral con altos estándares de seguridad (RBAC), auditoría inmutable (LOPDP) y supervisión humana.

#### Objetivos Primarios:
1. **Dashboard y Visión General**: Tarjetas KPI reales (usuarios, programas, asignaturas, matrículas, fuentes RAG, agentes IA, salud de servicios) y bandeja de acción prioritaria (fuentes pendientes de revisión, borradores de materiales generados por IA, conflictos doctrinales).
2. **Gestión Integral de Usuarios y Tutela Familiar**: Exploración y filtrado por rol, modificación controlada de roles y estados operativos con salvaguarda del último administrador, y vinculación/desvinculación de representantes legales con estudiantes (`student_representatives`).
3. **Gestión Curricular y Académica**: Administración de programas, niveles y asignaturas de la malla, incluyendo creación y **modificación en caliente** con validaciones estrictas y protección RBAC.
4. **Cursos, Docentes y Evaluaciones**: Asignación de docentes titulares, calendarios y seguimiento de entregas.
5. **Centro de Conocimiento Editorial**: Modificación de fuentes aprobadas con recálculo criptográfico (SHA-256), re-fragmentación FTS5 y consulta del **historial inmutable de auditoría**.
6. **Orquestación de Agentes IA y Piloto Interactivo**: Monitoreo de directivas, versión, conmutador de emergencia (Kill-Switch) en caliente y estados operativos.
7. **Telemetría de Errores y Disponibilidad**: Vista unificada de errores de integración, latencias críticas y sesiones interrumpidas basada en datos reales.
8. **Informes Administrativos y Académicos**: Consolidado de rendimiento académico por materia y distribución de dominio competencial MINEDUC (`DEMONSTRATED_MASTERY`, `COMPLETED_NO_MASTERY`, `IN_PROGRESS`).
9. **Libro Mayor de Auditoría Inmutable (LOPDP Art. 21 y 22)**: Visualización y filtrado de eventos sensibles con anonimización de IPs (SHA-256) y estricta exclusión de secretos.
10. **Configuración Institucional**: Edición y persistencia de parámetros globales de la institución en tabla relacional `institution_settings`, restringida a `ADMIN`.

---

### 2. Criterios de Aceptación

- [x] **C1**: Un administrador autorizado puede crear una asignatura de prueba (`POST /api/v1/academic/subjects`).
- [x] **C2**: Un administrador autorizado puede modificar una asignatura de prueba (`PUT /api/v1/academic/subjects/:subjectId`).
- [x] **C3**: Un rol sin permiso (ej. estudiante) es rechazado al crear o modificar asignaturas con `HTTP 403 Forbidden`.
- [x] **C4**: Es posible actualizar una fuente de conocimiento con justificación registrada (`PUT /api/v1/knowledge/sources/:id`).
- [x] **C5**: Se puede consultar el historial completo de cambios y auditoría de la fuente (`GET /api/v1/knowledge/sources/:id/history`).
- [x] **C6**: Es posible revisar el estado y configuración pública del agente piloto interactivo (`GET /api/v1/pilot/status`).
- [x] **C7**: Vista de errores de integración, fallbacks y disponibilidad con datos reales (`GET /api/v1/admin/telemetry/errors`).
- [x] **C8**: Las acciones sensibles quedan registradas en el libro mayor de auditoría sin filtrar contraseñas ni secretos (LOPDP).
- [x] **C9**: Consulta y actualización de configuración institucional por rol `ADMIN` (`GET` y `PUT /api/v1/admin/settings`).
- [x] **C10**: Roles no autorizados son rechazados al intentar modificar la configuración institucional (`HTTP 403`).
- [x] **C11**: Dashboard consolidado retorna métricas reales y tareas pendientes calculadas directamente en base de datos.
- [x] **C12**: Nómina de usuarios con filtros por rol y relaciones de tutela familiar enriquecidas.
- [x] **C13**: Reporte académico consolidado con distribución de competencias MINEDUC sin invención.
- [x] **C14**: La interfaz gráfica es responsiva en iPad/tablet y escritorio.
- [x] **C15**: Las suites de regresión previas (05, 06, 07, 08, 09) se mantienen en 100% aprobadas.

