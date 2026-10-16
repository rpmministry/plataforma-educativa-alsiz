# Registro de Riesgos y Decisiones de Arquitectura — ETAPA 10
## Centro Administrativo Unificado

- **Etapa**: ETAPA-10
- **Fecha**: 2026-10-16

---

### 1. Decisiones de Arquitectura (ADR)

#### ADR-10-01: Almacenamiento Centralizado de Parámetros Globales en Tabla Relacional (`institution_settings`)
- **Contexto**: Diversas configuraciones de la plataforma residían parcialmente en variables de entorno fijas (`.env`) o valores codificados en archivos TypeScript, impidiendo ajustes dinámicos por el administrador sin necesidad de redeploy.
- **Alternativas consideradas**:
  1. *Archivos JSON locales en disco*: Rápido de implementar, pero carente de transaccionalidad, integridad referencial y auditoría ACID en SQLite WAL.
  2. *Variables de entorno dinámicas*: Requerirían reiniciar el proceso Node.js y no permiten gobernanza desde el frontend de forma segura.
  3. *Tabla relacional `institution_settings` con clave-valor categorizada (Elegida)*:
     - Clave primaria `setting_key`, tipado descriptivo, categoría administrativa y marca temporal.
     - Permite control estricto RBAC a nivel de endpoint (`requireRole('ADMIN')`) y registro en `audit_events`.
- **Decisión**: Se implementó la alternativa 3 mediante la migración `011_unified_admin.sql`.

#### ADR-10-02: Salvaguarda del Último Administrador Activo
- **Contexto**: Un administrador podría degradar inadvertidamente su propio rol a `TEACHER` o suspender su cuenta cuando es el único administrador del sistema, dejando la plataforma acéfala.
- **Decisión**: Implementación de una regla dura a nivel de backend en `PATCH /api/v1/admin/users/:userId/role`: si el usuario es `ADMIN`, el nuevo rol no es `ADMIN`, y el conteo de administradores activos es $\le 1$, la solicitud es rechazada con código `400 LAST_ADMIN_PROTECTED`.

#### ADR-10-03: Desacoplamiento del Acceso a Base de Datos en Servicios Singleton (`AcademicService`)
- **Contexto**: `AcademicService` instanciaba y almacenaba una referencia a `DatabaseSync` en su constructor durante la carga inicial del módulo. Al cerrarse y volverse a inicializar la base de datos en suites de pruebas o procesos de restauración en caliente, los métodos fallaban con `ERR_INVALID_STATE: database is not open`.
- **Decisión**: Se transformó la propiedad `db` a un *getter* dinámico que invoca `getDb()` en cada transacción salvo que se haya inyectado explícitamente una conexión personalizada en el constructor.

---

### 2. Gestión de Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Estrategia de Mitigación |
|---|:---:|:---:|---|
| **Fuga accidental de hashes o contraseñas en nómina de usuarios** | Baja | Crítico | La consulta `GET /api/v1/admin/users` lista explícitamente los campos autorizados (`id, username, email, role, status, first_name, last_name, avatar_asset_key, created_at`), excluyendo de forma absoluta `password_hash` y `pin_code_hash`. |
| **Pérdida de trazabilidad ante modificaciones de fuentes RAG** | Media | Alto | Toda edición en `PUT /api/v1/knowledge/sources/:id` exige justificación técnica obligatoria (mínimo 5 caracteres), recalcula el checksum SHA-256 e inserta un registro inmutable en `knowledge_source_history`. |
| **Inconsistencias en relaciones de tutela familiar N:M** | Baja | Medio | La vinculación en `student_representatives` utiliza `ON CONFLICT ... DO UPDATE` y verifica previamente la existencia de ambos perfiles antes de insertar. |

