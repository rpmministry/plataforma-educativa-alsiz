# Plan y Procedimiento de Reversa (Rollback) — ETAPA 06: Núcleo Académico LMS

## 1. Alcance de la Reversa
Este documento establece los pasos operativos exactos para desmantelar o revertir de manera segura los cambios introducidos en la **ETAPA 06** (Núcleo Académico LMS), retornando el sistema al estado estable validado de la **ETAPA 05** (Backend, Base de Datos y Seguridad), sin provocar pérdida de datos previos, sin corromper migraciones anteriores y sin afectar ramas ajenas.

---

## 2. Puntos de Control y Respaldo Previo
Antes de ejecutar cualquier acción de reversa, verificar la existencia de los respaldos:
- **Base de datos previa a la etapa**: El archivo `alsiz_dev.db` dispone de respaldos automáticos en la carpeta del proyecto generados por `VACUUM INTO` durante las pruebas de la Etapa 05 (ej. `alsiz_backup_*.db`).
- **Estado Git**: La etapa se encuentra completamente aislada en la rama `etapa-06-nucleo-academico-lms`. La rama `etapa-05-backend-bd-y-seguridad` y `main` permanecen intactas.

---

## 3. Procedimiento Paso a Paso de Reversa

### Paso 1: Detener los Procesos en Ejecución
Si el servidor de desarrollo o la API se encuentran activos:
```powershell
# Detener procesos Node/Vite en puertos 3000 y 3001 si estuvieran activos
Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
```

### Paso 2: Revertir las Migraciones de Base de Datos
Si se requiere volver la base de datos al esquema exacto de la Etapa 05 (migraciones 001 a 003):

1. **Opción A (Recomendada - Restauración desde Backup de Etapa 05)**:
   ```powershell
   # Localizar el último backup generado por Etapa 05
   $backup = Get-ChildItem -Filter "alsiz_backup_*.db" | Sort-Object LastWriteTime -Descending | Select-Object -First 1
   Copy-Item $backup.FullName -Destination "alsiz_dev.db" -Force
   Write-Host "Base de datos restaurada desde $($backup.Name)"
   ```

2. **Opción B (Reversión Manual DDL de Tablas de Etapa 06)**:
   Si no se desea restaurar el backup completo, ejecutar las sentencias de eliminación de tablas de Etapa 06 en SQLite:
   ```sql
   DROP TABLE IF EXISTS student_competency_mastery;
   DROP TABLE IF EXISTS submission_grade_history;
   DROP TABLE IF EXISTS learning_resources;
   DROP TABLE IF EXISTS lesson_objectives;
   DROP TABLE IF EXISTS student_subject_enrollments;
   DROP TABLE IF EXISTS academic_calendar_events;
   DROP TABLE IF EXISTS academic_periods;
   DELETE FROM schema_migrations WHERE version IN ('004', '005');
   ```

### Paso 3: Revertir Cambios en Código Fuente

Si se desea volver al commit de inicio de la etapa en Git sin alterar ramas ajenas:
```powershell
# Confirmar la rama actual
git branch --show-current
# Debe ser: etapa-06-nucleo-academico-lms

# Para retornar a la rama de Etapa 05 sin alterar el repositorio principal:
git checkout etapa-05-backend-bd-y-seguridad
```

Si se requiere limpiar los archivos específicos creados en esta etapa dentro de la rama:
```powershell
# Archivos específicos a remover en caso de anulación total:
Remove-Item "server/academic/academicService.ts" -Force -ErrorAction SilentlyContinue
Remove-Item "server/routes/academicRoutes.ts" -Force -ErrorAction SilentlyContinue
Remove-Item "server/db/migrations/004_lms_academic_core.sql" -Force -ErrorAction SilentlyContinue
Remove-Item "server/db/migrations/005_lms_seed_data.sql" -Force -ErrorAction SilentlyContinue
Remove-Item "scripts/test-etapa-06.ts" -Force -ErrorAction SilentlyContinue
```

### Paso 4: Verificación de Integridad Post-Reversa
Tras aplicar la reversa, ejecutar los comandos de verificación de la Etapa 05:
```powershell
# 1. Ejecutar suite de pruebas de Etapa 05
npm run test:etapa05

# 2. Verificar compilación estática de tipos
npm run lint

# 3. Verificar construcción de producción
npm run build
```

**Criterio de éxito de la reversa**:
- Las 16 pruebas de `npm run test:etapa05` pasan exitosamente (`PASÓ: 16, FALLÓ: 0`).
- `npm run lint` y `npm run build` concluyen con código 0.
- El sistema opera normalmente sin referencias a los endpoints `/api/v1/academic`.

