# Plan de Reversión Controlada — ETAPA 07

## 1. Alcance de la Reversión
Este procedimiento define los pasos exactos y seguros para revertir los cambios introducidos en la **ETAPA-07 (Centro de Conocimiento y Matrices Temáticas)** sin comprometer el trabajo de etapas anteriores ni la integridad de los datos de usuarios o calificaciones académicas.

---

## 2. Reversión de Base de Datos

Si se requiere desinstalar las tablas del centro de conocimiento de la base de datos `data/alsiz.db`, ejecutar en una sesión SQLite o mediante un script Node.js:

```sql
-- 1. Eliminar disparadores y tabla virtual FTS5
DROP TRIGGER IF EXISTS trg_kc_ai;
DROP TRIGGER IF EXISTS trg_kc_ad;
DROP TRIGGER IF EXISTS trg_kc_au;
DROP TABLE IF EXISTS knowledge_chunks_fts;

-- 2. Eliminar tablas del centro de conocimiento
DROP TABLE IF EXISTS knowledge_source_conflicts;
DROP TABLE IF EXISTS knowledge_source_history;
DROP TABLE IF EXISTS knowledge_chunks;
DROP TABLE IF EXISTS knowledge_sources;

-- 3. Revertir el registro en _migrations
DELETE FROM _migrations WHERE name IN ('006_knowledge_base_core.sql', '007_knowledge_seed_data.sql');
```

---

## 3. Reversión en Código Fuente

Si se desea restaurar el código a la etapa anterior (`etapa-06-nucleo-academico-lms`):

1. **Revertir archivos creados**:
   ```bash
   rm -f server/db/migrations/006_knowledge_base_core.sql
   rm -f server/db/migrations/007_knowledge_seed_data.sql
   rm -f server/knowledge/knowledgeService.ts
   rm -f server/routes/knowledgeRoutes.ts
   rm -f scripts/test-etapa-07.ts
   rm -rf docs/ejecucion/etapas/ETAPA-07
   ```

2. **Revertir modificaciones puntuales**:
   - En `server.ts`: Remover la línea `import knowledgeRouter from './server/routes/knowledgeRoutes';` y la línea `app.use('/api/v1/knowledge', knowledgeRouter);`.
   - En `src/components/admin/AdminShell.tsx`: Remover la opción `'knowledge'` del selector de pestañas y su bloque condicional de renderizado.
   - En `package.json`: Eliminar la entrada `"test:etapa07": "tsx scripts/test-etapa-07.ts"`.

3. **Verificación post-reversa**:
   ```bash
   npm run test:etapa06
   npm run lint
   npm run build
   ```

