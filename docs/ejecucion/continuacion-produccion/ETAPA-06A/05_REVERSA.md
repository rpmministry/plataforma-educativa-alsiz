# Plan y Procedimiento de Reversión (Rollback) — Etapa 06A

**Fecha:** 17 de octubre de 2026  
**Rama de trabajo:** `continuacion-produccion-etapa-06a`  
**Rama base:** `main` (commit base: `8a53b2a chore(etapa-05): normalizar saltos de linea`)  

---

### 1. Principio de Reversibilidad
Todos los cambios implementados durante la Etapa 06A se encuentran aislados en la rama de trabajo `continuacion-produccion-etapa-06a`. No se han ejecutado comandos `git push`, no se han fusionado ramas con `main` y no se ha desplegado ningún artefacto a servidores remotos o bases de producción.

---

### 2. Procedimiento de Reversión Total (Descartar la Etapa 06A)
Si el revisor humano decide rechazar la totalidad de los cambios de esta etapa y regresar al estado exacto del commit base `8a53b2a`:

1. **Verificar estado de git:**
   ```powershell
   git status --short
   ```

2. **Regresar a la rama principal `main`:**
   ```powershell
   git checkout main
   ```

3. **Eliminar la rama de trabajo local de la Etapa 06A:**
   ```powershell
   git branch -D continuacion-produccion-etapa-06a
   ```

4. **Verificar que el directorio de trabajo quedó en el commit `8a53b2a`:**
   ```powershell
   git log -1 --oneline
   ```

---

### 3. Procedimiento de Reversión Parcial (Restaurar solo archivos específicos)
Si se desea conservar la documentación o los scripts en `scripts/lotes/`, pero restaurar únicamente el archivo de datos de clases de Gael (`src/data/dailyClassesGael.ts`) o los tipos (`src/types/index.ts`):

1. **Restaurar `src/data/dailyClassesGael.ts` desde `main`:**
   ```powershell
   git checkout main -- src/data/dailyClassesGael.ts
   ```

2. **Restaurar `src/types/index.ts` desde `main`:**
   ```powershell
   git checkout main -- src/types/index.ts
   ```

3. **Verificar compilación limpia:**
   ```powershell
   npx tsc --noEmit
   ```

