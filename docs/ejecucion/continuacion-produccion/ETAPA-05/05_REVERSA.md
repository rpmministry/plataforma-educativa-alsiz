# Procedimiento de Reversión Quirúrgica (Rollback) — Etapa 05: Auditoría de Completitud Curricular y Calendario Anual

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-05`  
**Commit Inicial de Retorno:** `1bc8469`

---

## 1. Alcance de los Cambios de la Etapa 05

Durante la Etapa 05 se preservó escrupulosamente la integridad del código fuente preexistente y de las bases de datos:
- **Cero escrituras en la base de datos de producción** ni en bases de datos activas.
- **Cero alteraciones en datos de estudiantes o expedientes migrados en la Etapa 04**.
- Los cambios realizados consisten exclusivamente en:
  1. Matrices y documentación curricular en `docs/curriculum/`:
     - `docs/curriculum/estado_completitud_2026_2027.md`
     - `docs/curriculum/matriz_seguimiento_curriculo_2026_2027.csv`
  2. Scripts de auditoría y validación automatizada en `scripts/`:
     - `scripts/test-curriculum-completeness.ts`
     - `scripts/generate-curriculum-audit-matrix.ts`
     - `scripts/audit-curriculum-deep.ts`
     - `scripts/audit-classify-resources.ts`
     - `scripts/audit-curriculum-inspect.ts`
     - `scripts/audit-check-invalid-urls.ts`
     - `scripts/audit-microcurriculum-resources.ts`
     - `scripts/audit-daily-classes-dates.ts`
  3. Carpeta de documentación de ejecución y evidencias:
     - `docs/ejecucion/continuacion-produccion/ETAPA-05/`

---

## 2. Procedimiento de Reversión Quirúrgica Paso a Paso

Si por cualquier motivo de gobernanza institucional o decisión del usuario se requiriera retirar los artefactos de esta etapa y regresar exactamente al estado previo al inicio de la Etapa 05:

### Paso 1: Retiro de Archivos Creados
Ejecutar en la consola PowerShell los siguientes comandos para eliminar los artefactos generados sin afectar los archivos preexistentes:

```powershell
# 1. Retirar matrices curriculares generadas en docs/curriculum/
Remove-Item -Path "docs/curriculum/estado_completitud_2026_2027.md" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "docs/curriculum/matriz_seguimiento_curriculo_2026_2027.csv" -Force -ErrorAction SilentlyContinue

# 2. Retirar scripts de auditoría creados
Remove-Item -Path "scripts/test-curriculum-completeness.ts" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/generate-curriculum-audit-matrix.ts" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/audit-curriculum-deep.ts" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/audit-classify-resources.ts" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/audit-curriculum-inspect.ts" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/audit-check-invalid-urls.ts" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/audit-microcurriculum-resources.ts" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/audit-daily-classes-dates.ts" -Force -ErrorAction SilentlyContinue

# 3. Retirar carpeta de documentación de ejecución de ETAPA-05
Remove-Item -Path "docs/ejecucion/continuacion-produccion/ETAPA-05" -Recurse -Force -ErrorAction SilentlyContinue
```

### Paso 2: Retorno de Rama Git
Para regresar a la rama previa `continuacion-produccion-etapa-04` o al commit base:

```powershell
# Verificar estado de git
git status

# Regresar a la rama de la etapa 04
git checkout continuacion-produccion-etapa-04

# Si se desea eliminar la rama de trabajo de la etapa 05:
git branch -D continuacion-produccion-etapa-05
```

### Paso 3: Verificación de Integridad Post-Reversión
Comprobar que el repositorio queda en su estado limpio en el commit `1bc8469`:

```powershell
git log -1 --oneline
# Debe mostrar: 1bc8469 docs(etapa-04): documentacion de cierre y evidencias de migracion controlada

git status --short
# Debe mostrar árbol de trabajo limpio sin modificaciones residuales
```

---

## 3. Garantía de Inocuidad sobre Bases de Datos y Cuentas
Dado que durante toda la Etapa 05 rigió la prohibición de ejecutar migraciones o escrituras en producción:
- La base de datos SQLite / Turso permanece en su estado exacto de la Etapa 04.
- Las cuentas de los estudiantes, representantes legales y credenciales no sufrieron ninguna mutación.
- Los respaldos generados en la Etapa 04 (`backups/`) permanecen intactos y validados con sus respectivos checksums SHA-256.
