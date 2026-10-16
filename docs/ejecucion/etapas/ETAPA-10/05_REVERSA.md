# Plan de Reversa (Rollback) — ETAPA 10
## Centro Administrativo Unificado

- **Etapa**: ETAPA-10
- **Fecha**: 2026-10-16

---

### 1. Procedimiento de Reversión Git

Si se requiere descartar o revertir los cambios introducidos en esta etapa:

```powershell
# 1. Verificar estado actual
git status

# 2. Si se desea regresar a la rama previa (ETAPA-09):
git checkout etapa-09-aula-interactiva-openmaic

# 3. Para descartar la rama de la etapa 10 (solo con autorización expresa):
# git branch -D etapa-10-centro-administrativo-unificado
```

---

### 2. Procedimiento de Reversión en Base de Datos

La migración `011_unified_admin.sql` añade la tabla `institution_settings` y tres índices de optimización. Para revertir estos cambios en la base de datos sin afectar las migraciones v001 a v010:

```sql
-- Reversión de la migración 011
DROP INDEX IF EXISTS idx_audit_user_event;
DROP INDEX IF EXISTS idx_audit_resource;
DROP INDEX IF EXISTS idx_settings_cat;
DROP TABLE IF EXISTS institution_settings;

DELETE FROM schema_migrations WHERE version = '011';
```

---

### 3. Verificación Posterior a la Reversa

Tras ejecutar la reversión, verificar la operatividad ejecutando las suites de pruebas de la etapa 09:

```powershell
npm run test:etapa09
npm run lint
npm run build
```

