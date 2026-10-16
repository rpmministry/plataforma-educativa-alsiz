# ETAPA-00 — Plan de Reversión (Rollback)

## 1. Alcance de la Reversión
Los únicos cambios introducidos en la ETAPA-00 son:
1. La creación de la rama local `etapa-00-inicializacion-y-linea-base`.
2. La creación del directorio `docs/ejecucion/` con sus subdirectorios y archivos Markdown/evidencias.

No se alteró ningún archivo funcional del proyecto ni se modificó `main`.

---

## 2. Procedimiento de Reversión Paso a Paso

### Opción A: Descartar los cambios de documentación manteniendo la rama
Si se desea eliminar la documentación creada en esta etapa pero conservar la rama local:
```powershell
Remove-Item -Path "docs/ejecucion" -Recurse -Force
```

### Opción B: Reversión Completa (Regreso a `main` intacto)
Para regresar al estado exacto previo a la ETAPA-00:
1. Cambiar a la rama `main`:
   ```powershell
   git checkout main
   ```
2. Eliminar la rama local de la etapa:
   ```powershell
   git branch -D etapa-00-inicializacion-y-linea-base
   ```
3. Si los archivos de `docs/ejecucion/` quedaron sin rastrear en el directorio de trabajo:
   ```powershell
   Remove-Item -Path "docs/ejecucion" -Recurse -Force
   ```

---

## 3. Verificación Post-Reversión
Comprobar que el repositorio vuelve al estado exacto inicial:
```powershell
git status --short --branch
```
Salida esperada:
```
## main...origin/main
?? "DOCUMENTOS EKBALLO/"
?? WISDOM-SCHOOL-SHOWCASE.md
```
*Los insumos de usuario (`DOCUMENTOS EKBALLO/` y `WISDOM-SCHOOL-SHOWCASE.md`) no se verán afectados bajo ninguna circunstancia.*

