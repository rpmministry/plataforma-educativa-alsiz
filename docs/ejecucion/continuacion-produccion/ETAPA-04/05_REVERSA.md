# Procedimiento de Reversión y Contingencia — Etapa 04: Preparar y Ejecutar la Migración Controlada de Gael y Avril

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-04`  
**Estado:** `PROBADO Y CERTIFICADO EN STAGING`

---

## 1. Estrategia de Reversibilidad

La Etapa 04 cuenta con dos niveles de recuperación y reversión ante cualquier imprevisto técnico:
1. **Nivel 1 — Reversión Quirúrgica Relacional (`rollbackMigration`)**:
   Elimina de forma granular y en cascada inversa únicamente los registros creados durante la migración controlada (`usr-real-%`, `stu-real-%`, `rep-real-%`, `subj-real-%`, etc.), dejando completamente intactos los registros del sistema, los usuarios sintéticos de desarrollo (`usr-admin-01`, etc.) y las tablas de configuración.
2. **Nivel 2 — Restauración Atómica de Respaldo (`restoreFromBackup`)**:
   En caso de corrupción de base de datos o fallo catastrófico, se sustituye el archivo de base de datos por la copia de seguridad caliente generada inmediatamente antes de la intervención, verificando su integridad mediante SHA-256 y `PRAGMA integrity_check`.

---

## 2. Procedimiento de Reversión Quirúrgica (Paso a Paso)

### 2.1 Ejecución mediante CLI
Para revertir de forma limpia los registros migrados:

```bash
# Reversión en base de datos de staging:
npx tsx scripts/migrate-students.ts --staging --rollback

# Verificación inmediata del estado post-reversión:
npx tsx scripts/migrate-students.ts --staging --verify
```

### 2.2 Orden Transaccional de Eliminación
El motor ejecuta las siguientes instrucciones dentro de una única transacción atómica (`BEGIN TRANSACTION` ... `COMMIT`):

```sql
DELETE FROM audit_events WHERE event_type = 'STUDENT_MIGRATION_CONTROLLED';
DELETE FROM student_submissions WHERE id LIKE 'sub-real-%';
DELETE FROM academic_calendar_events WHERE id LIKE 'ev-real-%';
DELETE FROM evaluations WHERE id LIKE 'eval-real-%';
DELETE FROM learning_resources WHERE id LIKE 'res-real-%';
DELETE FROM lesson_objectives WHERE id LIKE 'obj-real-%';
DELETE FROM daily_classes WHERE id LIKE 'class-real-%';
DELETE FROM curriculum_units WHERE id LIKE 'unit-real-%';
DELETE FROM student_subject_enrollments WHERE id LIKE 'subenr-stu-real-%';
DELETE FROM subjects WHERE id LIKE 'subj-real-%';
DELETE FROM student_program_enrollments WHERE id LIKE 'enr-real-%';
DELETE FROM student_representatives WHERE student_id LIKE 'stu-real-%';
DELETE FROM representatives WHERE id LIKE 'rep-real-%';
DELETE FROM students WHERE id LIKE 'stu-real-%';
DELETE FROM users WHERE id LIKE 'usr-real-%';
```

### 2.3 Evidencia Comprobada en Staging
- **Total de registros eliminados quirúrgicamente**: **399 registros**.
- **Estudiantes migrados restantes tras el rollback**: **0**.
- **Usuarios sintéticos de desarrollo preservados**: **100% intactos** (`usr-admin-01`, `usr-coord-01`, `usr-teacher-01`, `usr-rep-01`, etc.).

---

## 3. Procedimiento de Restauración desde Copia de Seguridad

Si fuese necesario restaurar la base de datos completa a su estado previo a la migración:

### 3.1 Archivo de Respaldo Pre-Migración de Producción
Se generó el respaldo validado en caliente inmediatamente antes de la ejecución productiva:
- **Ruta del Respaldo:** `backups/alsiz_backup_2026-10-17T15-04-10-913Z.db`
- **Tamaño:** `1,200,128 bytes` (`1172.00 KB`)
- **Checksum SHA-256:** `863e266d7e879852a4e6eb395f0829d66780602596d97be9b5e568ebf30279bb`

### 3.2 Verificar el Checksum SHA-256
```powershell
Get-FileHash -Path "backups\alsiz_backup_2026-10-17T15-04-10-913Z.db" -Algorithm SHA256
```

### 3.3 Restaurar mediante el Servicio de Base de Datos
```bash
# Cerrar conexiones activas y restaurar archivo
npx tsx -e "
import { restoreFromBackup } from './server/backup/backupService';
const res = restoreFromBackup('backups/alsiz_backup_<timestamp>.db');
console.log(res);
"
```

### 3.4 Verificación de Integridad Post-Restauración
```sql
PRAGMA integrity_check;
PRAGMA foreign_key_check;
```
Resultado esperado: `ok` y cero filas con errores.

