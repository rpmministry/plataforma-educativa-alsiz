# Procedimiento de Reversión — Etapa 06B: Completar el Currículo y Clases de Avril (8.º EGB Superior)

## 1. Alcance de la Reversión
Este procedimiento detalla los pasos exactos para restaurar el estado del repositorio al commit inicial de la etapa (`ab66dbe chore(etapa-06a): normalizar saltos de linea`) en caso de que la revisión humana rechace los cambios o se requiera volver al estado previo.

---

## 2. Procedimiento Paso a Paso

### Opción A: Descartar los cambios no commiteados (si la rama no se ha congelado)
Si se desea descartar las modificaciones locales antes de realizar el commit:
```powershell
# 1. Eliminar archivos generados de scripts y documentación
Remove-Item -Recurse -Force scripts/lotes-avril
Remove-Item -Force scripts/build-avril-curriculum.ts
Remove-Item -Force scripts/inspect-legacy-avril.js
Remove-Item -Recurse -Force docs/ejecucion/continuacion-produccion/ETAPA-06B

# 2. Restaurar src/data/dailyClassesAvril.ts al estado del commit ab66dbe
git checkout HEAD -- src/data/dailyClassesAvril.ts

# 3. Verificar estado limpio
git status --short
```

### Opción B: Reversión controlada tras haber realizado el commit local
Si se realizó el commit local en la rama `continuacion-produccion-etapa-06b`:
```powershell
# 1. Regresar al commit de la Etapa 06A (ab66dbe)
git reset --hard ab66dbe

# 2. Volver a la rama de la etapa 06a o a la rama base
git checkout continuacion-produccion-etapa-06a

# 3. (Opcional) Eliminar la rama local de trabajo
git branch -D continuacion-produccion-etapa-06b
```

---

## 3. Plan de Contingencia y Seguridad de Datos
1. **Bases de datos:** No se ejecutaron migraciones ni escrituras sobre ninguna base de datos SQLite/Turso de producción ni desarrollo durante la Etapa 06B. Los datos de estudiantes en base de datos permanecen intactos.
2. **Currículo de Gael:** El archivo `src/data/dailyClassesGael.ts` y sus lotes en `scripts/lotes/` no fueron alterados en ningún momento.
3. **Credenciales:** No se modificaron ni expusieron variables de entorno ni archivos `.env`.

