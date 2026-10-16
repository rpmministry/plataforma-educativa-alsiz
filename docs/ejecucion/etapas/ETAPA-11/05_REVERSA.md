# Plan de Reversión — ETAPA 11
## Migración Controlada de Expedientes y Materiales (Estudiante A y Estudiante G)

- **Etapa**: ETAPA-11
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-11-migracion-controlada-gael-avril`

---

### 1. Reversión Rápida de la Base de Datos

Si en cualquier momento se requiere eliminar todos los registros introducidos por la migración controlada sin afectar a los usuarios, representantes ni estudiantes sintéticos previos, ejecute el siguiente comando CLI:

```powershell
# Reversión en base de datos de staging/ensayo:
npx tsx scripts/migrate-students.ts --staging --rollback
```

Este comando ejecuta la función `LegacyMigrationEngine.rollbackMigration(db)`, la cual elimina de forma transaccional y en orden inverso de claves foráneas únicamente los registros que contienen los prefijos de migración (`*-mig-*`):

```sql
BEGIN TRANSACTION;
DELETE FROM audit_events WHERE event_type = 'STUDENT_MIGRATION_CONTROLLED';
DELETE FROM academic_calendar_events WHERE id LIKE 'ev-mig-%';
DELETE FROM evaluations WHERE id LIKE 'eval-mig-%';
DELETE FROM learning_resources WHERE id LIKE 'res-mig-%';
DELETE FROM lesson_objectives WHERE id LIKE 'obj-mig-%';
DELETE FROM daily_classes WHERE id LIKE 'class-mig-%';
DELETE FROM curriculum_units WHERE id LIKE 'unit-mig-%';
DELETE FROM student_subject_enrollments WHERE id LIKE 'subenr-stu-mig-%';
DELETE FROM subjects WHERE id LIKE 'subj-mig-%';
DELETE FROM student_program_enrollments WHERE id LIKE 'enr-mig-%';
DELETE FROM students WHERE id LIKE 'stu-mig-%';
DELETE FROM users WHERE id LIKE 'usr-mig-%';
COMMIT;
```

**Garantía**: Los registros de prueba preexistentes (`usr-admin-01`, `usr-teacher-01`, `usr-rep-01`, `usr-stu-01`, `usr-stu-02`, etc.) **permanecen 100% intactos**.

---

### 2. Restauración desde Respaldo Transaccional Físico

En caso de requerir una restauración completa del archivo de base de datos previo a cualquier ensayo:

1. Localice el archivo de respaldo más reciente en `backups/`:
   ```powershell
   Get-ChildItem -Path backups -Recurse -Filter "*.db" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
   ```
2. Ejecute la restauración mediante el servicio verificado:
   ```typescript
   import { restoreFromBackup } from './server/backup/backupService';
   restoreFromBackup('backups/ruta_del_respaldo.db', 'data/alsiz.db');
   ```

---

### 3. Reversión de Archivos de Código de la Etapa

Para revertir los archivos creados en el código fuente de esta etapa sin perder los cambios de etapas anteriores:

```powershell
# 1. Eliminar los archivos creados en ETAPA 11
Remove-Item -Force "server/migration/legacyMigrationEngine.ts"
Remove-Item -Force "scripts/migrate-students.ts"
Remove-Item -Force "scripts/test-etapa-11.ts"
Remove-Item -Recurse -Force "docs/ejecucion/etapas/ETAPA-11"

# 2. Deshacer la línea añadida en package.json
git checkout package.json

# 3. Regresar a la rama previa si fuera necesario
git checkout etapa-10-centro-administrativo-unificado
```

