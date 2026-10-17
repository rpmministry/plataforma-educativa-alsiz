# Plan de Reversión (Rollback) — Etapa 07: Catálogo Completo de Profesores IA por Asignatura y Nivel

**Rama de Trabajo:** `continuacion-produccion-etapa-07`  
**Punto de Restauración Git:** Commit inicial `570a61cfce48c7ddafec68aa1035cf6677f55bdd`  
**Estado de Producción:** Intacto (ninguna migración ni escritura fue ejecutada sobre la base de producción `data/alsiz.db`).

---

## 1. Escenarios de Reversión

### Escenario A: Reversión Completa de la Rama de Trabajo (Código y Documentación)

Si se requiriera anular por completo los cambios de esta etapa y regresar al estado original exacto de `main`:

```powershell
# 1. Regresar a la rama main
git checkout main

# 2. Eliminar la rama de trabajo local (si no fue fusionada)
git branch -D continuacion-produccion-etapa-07

# 3. Eliminar bases de datos de prueba temporales generadas localmente
Remove-Item -Path "data/test_alsiz_etapa07.db" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "data/test_alsiz_etapa07.db-wal" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "data/test_alsiz_etapa07.db-shm" -Force -ErrorAction SilentlyContinue
```

---

### Escenario B: Reversión Específica de la Base de Datos (Si se hubiese aplicado la migración 013)

En caso de que la migración `013_ai_agents_complete_catalog.sql` se hubiese aplicado en un entorno de desarrollo o staging y se desee revertir su esquema y registros:

```sql
-- Script de reversión atómica para la migración 013
BEGIN TRANSACTION;

-- 1. Eliminar los 20 profesores especializados y 5 agentes transversales creados
DELETE FROM ai_agents WHERE id LIKE 'agt-%';

-- 2. Eliminar los 20 fragmentos de conocimiento
DELETE FROM knowledge_chunks WHERE id LIKE 'chk-%-01';

-- 3. Eliminar las 20 fuentes del Centro de Conocimiento
DELETE FROM knowledge_sources WHERE id LIKE 'src-%';

-- 4. Eliminar las asignaturas canónicas incorporadas en 013
DELETE FROM subjects WHERE id IN (
    'subj-len-401', 'subj-mat-401', 'subj-cni-401', 'subj-soc-401', 'subj-ing-401',
    'subj-soft-401', 'subj-rel-401', 'subj-art-401', 'subj-efi-401',
    'subj-len-801', 'subj-mat-801', 'subj-cni-801', 'subj-soc-801', 'subj-ing-801',
    'subj-soft-801', 'subj-pol-801', 'subj-adm-801', 'subj-rel-801', 'subj-art-801',
    'subj-efi-801'
);

-- 5. Eliminar el registro de versión en la tabla de control de migraciones
DELETE FROM schema_migrations WHERE version = '013';

COMMIT;
```

---

### Escenario C: Verificación Post-Reversión

Tras aplicar cualquiera de los escenarios de reversión:
1. Comprobar el estado del repositorio:
   ```powershell
   git status
   ```
2. Ejecutar la compilación estática para asegurar que no persistan dependencias rotas:
   ```powershell
   npx tsc --noEmit
   ```

