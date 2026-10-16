# Procedimiento de Reversión (Rollback Plan) — ETAPA 14
## Plataforma Educativa ALSIZ para Ekballo Church

- **Etapa**: ETAPA-14: Despliegue y Operación
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-14-despliegue-y-operacion`

---

### 1. Principio de Aislamiento de la Reversión

La **Etapa 14** se desarrolló en la rama local aislada `etapa-14-despliegue-y-operacion`, sin realizar commits destructivos, sin alterar la base de datos de producción `data/alsiz.db`, y sin realizar operaciones remotas (`git push`).

En consecuencia, revertir la totalidad de los cambios introducidos en esta etapa es un procedimiento seguro, determinista e inmediato que no compromete en modo alguno las etapas previas (00 a 13).

---

### 2. Procedimiento de Reversión Paso a Paso

#### Paso 1: Retorno a la Rama Previa Aprobada (Etapa 13)
Para regresar al estado exacto validado al término de la Etapa 13:
```bash
git checkout etapa-13-auditoria-integral-y-aceptacion
```

#### Paso 2: Eliminación de Archivos Nuevos Creados en la Etapa 14
Si se desea eliminar físicamente los archivos creados durante la Etapa 14 en el espacio de trabajo:

En sistemas Windows (PowerShell):
```powershell
# 1. Eliminar scripts operacionales incorporados en Etapa 14
Remove-Item -Path "scripts\backup-db.ts" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts\restore-db.ts" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts\health-check.ts" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts\test-etapa-14.ts" -Force -ErrorAction SilentlyContinue

# 2. Eliminar documentación operativa generada
Remove-Item -Path "docs\operacion" -Recurse -Force -ErrorAction SilentlyContinue

# 3. Eliminar la carpeta de la etapa
Remove-Item -Path "docs\ejecucion\etapas\ETAPA-14" -Recurse -Force -ErrorAction SilentlyContinue
```

En sistemas Linux / macOS:
```bash
rm -f scripts/backup-db.ts scripts/restore-db.ts scripts/health-check.ts scripts/test-etapa-14.ts
rm -rf docs/operacion
rm -rf docs/ejecucion/etapas/ETAPA-14
```

#### Paso 3: Reversión de Comandos en `package.json`
Revertir la adición de los scripts `"db:backup"`, `"db:restore"`, `"health"` y `"test:etapa14"` restaurando la versión previa de `package.json` mediante git o edición manual.

#### Paso 4: Verificación de Estado Limpio
```bash
git status --short --branch
npm run lint
npm run test:etapa13
```
- Debe confirmar el retorno limpio a la rama `etapa-13-auditoria-integral-y-aceptacion`.
- La suite de auditoría integral `test:etapa13` debe aprobarse al 100% (10/10).

---

### 3. Reversión de Base de Datos (Si Hubiera Sido Afectada)

Dado que la Etapa 14 no aplicó migraciones nuevas (el esquema se mantiene en la versión 012), la base de datos de producción `data/alsiz.db` no sufrió modificaciones estructurales.

En caso de requerir restaurar el estado previo de datos a partir del respaldo de seguridad:
```bash
npx tsx scripts/restore-db.ts backups/alsiz_backup_2026-10-16T22-20-18-763Z.db data/alsiz.db
```
Verificar con:
```bash
npm run health
```

