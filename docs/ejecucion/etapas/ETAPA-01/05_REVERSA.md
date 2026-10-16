# ETAPA-01 — Plan de Reversión (Rollback)

## 1. Alcance de los Cambios de la Etapa 01
Los únicos cambios introducidos en la ETAPA-01 corresponden a la creación de la carpeta de documentación `docs/ejecucion/etapas/ETAPA-01/` y la actualización de los índices en `docs/ejecucion/README.md` y `docs/ejecucion/bitacora.md`.

No se modificó ningún archivo funcional del sistema.

---

## 2. Procedimiento de Reversión Paso a Paso

### Opción A: Descartar exclusivamente la documentación de la Etapa 01
Si se desea eliminar los archivos generados en esta etapa y mantener la rama local:
```powershell
Remove-Item -Path "docs/ejecucion/etapas/ETAPA-01" -Recurse -Force
```

### Opción B: Regreso a la rama previa de la Etapa 00
Para descartar la rama de la Etapa 01 y regresar a `etapa-00-inicializacion-y-linea-base`:
1. Cambiar de rama:
   ```powershell
   git checkout etapa-00-inicializacion-y-linea-base
   ```
2. Eliminar la rama local de la etapa 01:
   ```powershell
   git branch -D etapa-01-auditoria-repositorios-y-requisitos
   ```
3. Si los archivos de la Etapa 01 permanecen en el árbol no rastreado:
   ```powershell
   Remove-Item -Path "docs/ejecucion/etapas/ETAPA-01" -Recurse -Force
   ```

---

## 3. Verificación Post-Reversión
Comprobar con `git status --short --branch` que el árbol queda libre de residuos y que `DOCUMENTOS EKBALLO/` y `WISDOM-SCHOOL-SHOWCASE.md` continúan íntegros.

