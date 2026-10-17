# Procedimiento de Reversión — ETAPA 00
## Plataforma Educativa ALSIZ para Ekballo Church

- **Etapa**: ETAPA-00 (Auditoría Técnica Post-Etapas 00–14)
- **Fecha**: 2026-10-16
- **Rama Actual**: `continuacion-produccion-etapa-00`
- **Rama Base**: `main`

---

### 1. Garantía de Inocuidad
Dado que en esta etapa de auditoría técnica **no se modificó ninguna línea de código de producción**, esquemas de base de datos ni configuraciones operativas, el estado del código fuente funcional permanece 100% idéntico al commit base `57a063a502d01e1a49b1a608ffd1db91633a572a`.

---

### 2. Procedimiento de Retorno Inmediato a `main`
Si se requiere descartar o archivar la documentación generada en esta etapa de auditoría y regresar a la rama principal:

1. **Guardar o respaldar la carpeta de auditoría** (opcional):
   ```powershell
   Copy-Item -Path "docs/ejecucion/continuacion-produccion/ETAPA-00" -Destination "backups/audit_etapa00_backup" -Recurse
   ```

2. **Cambiar de vuelta a la rama `main`**:
   ```bash
   git checkout main
   ```

3. **Verificar la limpieza del árbol de trabajo**:
   ```bash
   git status
   ```
   El working tree en `main` debe reportarse completamente limpio (`nothing to commit, working tree clean`).

4. **Eliminar la rama de auditoría** (solo si el usuario lo ordena expresamente):
   ```bash
   git branch -D continuacion-produccion-etapa-00
   ```

---

### 3. Puntos de Verificación Post-Reversión
- Comprobar que `git branch --show-current` reporte `main`.
- Comprobar que `git log -1 --oneline` muestre `57a063a feat: culminacion integral...`.
- Comprobar que `data/alsiz.db` conserve su integridad (`PRAGMA integrity_check`).

