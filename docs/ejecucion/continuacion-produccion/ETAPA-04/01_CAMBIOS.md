# Registro Detallado de Cambios — Etapa 04: Preparar y Ejecutar la Migración Controlada de Gael y Avril

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-04`  
**Commit Base:** `85b7af7`  
**Estado:** `COMPLETADO Y AUDITADO`

---

## 1. Resumen Ejecutivo de la Intervención

La Etapa 04 transforma el prototipo preliminar de la Etapa 11 en un motor de migración de nivel de producción, seguro, idempotente, atómico y plenamente trazable. 
Se abordaron las omisiones críticas detectadas en el ensayo histórico:
1. **Inclusión del Representante Legal y Vínculos Familiares**: Se incorporó a Mauricio Andrade Luna (`CONTACT_INFO`), creando su usuario institucional, su perfil en `representatives` y los vínculos de corresponsabilidad en `student_representatives` para Gael y Avril.
2. **Seguridad Criptográfica Estricta de Credenciales**: Se eliminó la importación insegura de contraseñas planas de mockData (`avril`, `gael`, etc.). Todas las credenciales iniciales se derivan con `scryptSync` y sal criptográfica aleatoria de 16 bytes, manteniendo los registros seguros y listos para actualización en primer acceso.
3. **Bloqueo de Producción de Cuatro Factores**: Se blindó la bandera `--production` en `scripts/migrate-students.ts` exigiendo: token de aprobación humana, respaldo validado con hash SHA-256, confirmación exacta de ruta de BD y commit de Git HEAD.
4. **Ejecución Productiva Controlada (Autorizada Expresamente)**:
   - Respaldo previo generado: `backups/alsiz_backup_2026-10-17T15-04-10-913Z.db`
   - Tamaño del respaldo: 1,200,128 bytes (1172.00 KB)
   - Checksum SHA-256 del respaldo: `863e266d7e879852a4e6eb395f0829d66780602596d97be9b5e568ebf30279bb`
   - Base de datos destino: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ\data\alsiz.db`
   - Commit de código utilizado: `f7bb28f8f81306a7f8da59bd4f6c118b2a8a777d`
   - Evento de auditoría LOPDP registrado: `aud-real-3581c9c10724`
5. **Herramientas de Progreso LocalStorage**: Al ser el progreso del navegador imposible de reconstruir únicamente desde Git, se implementó el exportador para navegador `src/utils/localStorageMigrationExporter.ts`, el importador con esquema Zod `server/migration/localProgressImporter.ts` y la CLI `scripts/import-local-progress.ts`.
6. **Transparencia en Campos No Provistos**: Cero invención de notas, fechas falsas ni documentos. Los campos ausentes en los datos estáticos fueron marcados formalmente como `PENDIENTE_VERIFICACION`.

---

## 2. Catálogo de Archivos Creados y Modificados

### 2.1 Backend y Motor de Migración

#### A. `server/migration/legacyMigrationEngine.ts` (Modificado / Reescrito)
- **Aprovisionamiento de Representante Legal**:
  - Inserción de `usr-real-rep-mauricio` en la tabla `users` con rol `REPRESENTATIVE` y estado `ACTIVE`.
  - Inserción de `rep-real-mauricio` en la tabla `representatives` vinculando teléfono oficial (`+593 0979376810`), con cédula y dirección marcadas como `PENDIENTE_VERIFICACION`.
  - Inserción en `student_representatives` vinculando al padre con ambos estudiantes con custodia primaria (`is_primary_contact = 1`, `relationship_type = 'FATHER'`).
- **Aprovisionamiento de Estudiantes**:
  - Identificadores estables: `usr-real-avril`, `stu-real-avril`, `usr-real-gael`, `stu-real-gael`.
  - Códigos únicos: `ALSIZ-8VO-AVR` y `ALSIZ-4TO-GAE`.
  - Asignación de niveles: `lvl-sup-8` (8.º Grado EGB Superior) para Avril y `lvl-elem-4` (4.º Grado EGB Elemental) para Gael.
  - Fechas de nacimiento: año deducido honestamente de la edad documentada (2014 para 12 años, 2018 para 8 años). Día y mes fijados en `01-01` con nota formal de verificación pendiente.
- **Seguridad Criptográfica**:
  - Generación de hashes `scrypt` tanto para contraseña (`users.password_hash`) como para PIN (`students.pin_code_hash`).
  - Total rechazo a importar contraseñas planas de archivos mock.
- **Desambiguación de Colisiones Legadas**:
  - Detección de colisiones en los datos heredados de Wisdom School (`class-mat-avril-02`, `class-mat-gael-02`, `class-sci-gael-01`) y adición determinista del sufijo `-dup2`, evitando sobreescritura de 3 clases, 6 recursos y 9 actividades.
- **Preservación Integral de Contenidos**:
  - Inserción relacional de: 20 asignaturas, 42 unidades curriculares, 43 clases socráticas, 43 objetivos pedagógicos, 86 recursos didácticos clasificados, 129 evaluaciones formativas y 4 hitos de proyectos en calendario.
- **Verificación y Rollback Reforzados**:
  - `verifyMigration()`: valida 12 puntos de control relacional, incluyendo `PRAGMA foreign_key_check`, ausencia total de huérfanos y presencia de vínculos familiares.
  - `rollbackMigration()`: borrado quirúrgico en cascada inversa por claves foráneas que elimina 399 registros migrados sin tocar registros sintéticos.

#### B. `server/migration/localProgressImporter.ts` (Nuevo)
- Validador Zod `LocalProgressSchema` para estructuras de progreso extraídas de `localStorage`.
- Método `importProgress()` con soporte `dryRun` transaccional.
- Ingesta de clases completadas, entregas de estudiantes (`student_submissions`) y avatares personalizados.
- Auditoría LOPDP registrada en `audit_events`.

### 2.2 Scripts de Operación y CLI

#### C. `scripts/migrate-students.ts` (Modificado)
- Actualización de la CLI para soportar:
  - `--inventory`: inventario sin escritura en disco con desglose de materias, unidades, clases, recursos y campos pendientes.
  - `--audit`: auditoría y clasificación formal de los 86 recursos didácticos.
  - `--dry-run`: simulación completa en memoria con estadísticas proyectadas.
  - `--staging`: ejecución real sobre base de datos SQLite aislada (`data/test_alsiz_staging_etapa04.db`), con prueba de idempotencia automática.
  - `--rollback`: reversión quirúrgica de registros migrados.
  - `--production`: bloqueo de 4 factores:
    1. `--approval-token`: validación contra `PRODUCTION_MIGRATION_APPROVAL_TOKEN`.
    2. `--backup-path`: verificación de existencia, tamaño y hash SHA-256 de copia de seguridad.
    3. `--confirm-target-db`: validación estricta de ruta canónica de la base de datos de destino.
    4. `--commit-hash`: verificación de coincidencia con `git rev-parse HEAD`.

#### D. `scripts/import-local-progress.ts` (Nuevo)
- CLI operativa para que el administrador técnico pueda importar el progreso extraído de dispositivos locales usando `npx tsx scripts/import-local-progress.ts --file <ruta> [--apply]`.

#### E. `scripts/test-etapa-04.ts` (Nuevo)
- Suite completa de 12 pruebas automatizadas reproducibles que certifican:
  1. Respaldo hot backup y checksum SHA-256.
  2. Inventario sin escritura y detección de pendientes.
  3. Simulación dry-run con cero escrituras persistentes.
  4. Aprovisionamiento de usuarios, estudiantes, representante y vínculos familiares.
  5. Validación curricular de niveles (4.° EGB y 8.° EGB).
  6. Seguridad de credenciales con scryptSync y rechazo de claves planas.
  7. Equivalencia exhaustiva de contenidos de la malla académica.
  8. Resolución de colisiones legadas con sufijo `-dup2`.
  9. Integridad referencial absoluta (`foreign_key_check = 0` y cero huérfanos).
  10. Idempotencia estricta tras re-ejecución inmediata.
  11. Reversión quirúrgica limpia sin afectación de usuarios sintéticos.
  12. Validación de esquema Zod para importador/exportador de progreso local.

### 2.3 Frontend y Herramientas de Cliente

#### F. `src/utils/localStorageMigrationExporter.ts` (Nuevo)
- Utilidad ejecutable en cliente que lee las claves de almacenamiento local:
  - `wisdom_students_v2026`
  - `wisdom_classes_v2026`
  - `wisdom_submissions_v2026`
  - `wisdom_avatars_v2026`
  - `wisdom_micro_route_v2026`
  - `wisdom_guide_*`
- Función `exportLocalStudentProgress()` para empaquetado estructurado.
- Función `downloadProgressExportFile()` para descarga automática de `alsiz_device_progress_export.json`.
- Exposición global en `window.__ALSIZ_EXPORT_PROGRESS__` para soporte técnico asistido.

### 2.4 Configuración del Proyecto

#### G. `package.json` (Modificado)
- Agregados los scripts:
  - `"test:etapa04": "tsx scripts/test-etapa-04.ts"`
  - `"migrate:students": "tsx scripts/migrate-students.ts"`

