# Registro de Cambios — ETAPA 07: Centro de Conocimiento y Matrices Temáticas

## 1. Información General
- **Etapa**: `ETAPA-07`
- **Nombre**: Centro de Conocimiento y Matrices Temáticas
- **Rama Git**: `etapa-07-centro-de-conocimiento`
- **Fecha**: 2026-10-16
- **Responsable**: Líder Técnico AI

---

## 2. Archivos Creados

| Archivo | Propósito / Responsabilidad |
| :--- | :--- |
| `server/db/migrations/006_knowledge_base_core.sql` | Esquema relacional del centro de conocimiento: tablas `knowledge_sources`, `knowledge_chunks`, tabla virtual SQLite `knowledge_chunks_fts` (FTS5 con BM25), disparadores automáticos de sincronización (`trg_kc_ai`, `trg_kc_ad`, `trg_kc_au`), `knowledge_source_history` y `knowledge_source_conflicts`. |
| `server/db/migrations/007_knowledge_seed_data.sql` | Datos semilla canónicos de producción controlada: recurso doctrinal Ekballo (`EKB-DOC-CLASE-01`) y recurso oficial curricular MINEDUC (`MINEDUC-FIS-BGU-01`), con sus fragmentos etiquetados e historial inicial. |
| `server/knowledge/knowledgeService.ts` | Servicio de dominio integral: hashing criptográfico SHA-256 para deduplicación, segmentación de texto inteligente en chunks de 200-500 palabras con etiquetas `[DOC#C#]`, ciclo de vida editorial (`PENDIENTE`, `EN_REVISION`, `APROBADO`, `RECHAZADO`, `DESACTIVADO`), búsqueda indexada FTS5 BM25 con filtro estricto de aprobación, versionado y registro/resolución de conflictos. |
| `server/routes/knowledgeRoutes.ts` | Enrutador RESTful montado en `/api/v1/knowledge`: catálogo, carga, detalle, revisión editorial, retirada efectiva, versionado, búsqueda RAG, gestión de conflictos y telemetría protegidos por `requireAuth` y `requireRole`. |
| `scripts/test-etapa-07.ts` | Suite completa de 16 pruebas automatizadas que cubren los 13 criterios de aceptación funcionales, de seguridad, deduplicación, FTS5 y retirada crítica de fuentes. |
| `docs/ejecucion/etapas/ETAPA-07/00_PLAN.md` | Plan de ejecución detallado de la etapa. |
| `docs/ejecucion/etapas/ETAPA-07/01_CAMBIOS.md` | Este documento de cambios. |
| `docs/ejecucion/etapas/ETAPA-07/02_PRUEBAS.md` | Registro de comandos y resultados de ejecución. |
| `docs/ejecucion/etapas/ETAPA-07/03_VALIDACION.md` | Matriz de criterios de aceptación y evidencias vinculadas. |
| `docs/ejecucion/etapas/ETAPA-07/04_RIESGOS_Y_DECISIONES.md` | Registro de riesgos residuales y decisiones de arquitectura. |
| `docs/ejecucion/etapas/ETAPA-07/05_REVERSA.md` | Procedimiento de reversión controlada sin pérdida de datos ajenos. |
| `docs/ejecucion/etapas/ETAPA-07/06_CIERRE.md` | Resumen ejecutivo y recomendación de cierre. |
| `docs/ejecucion/etapas/ETAPA-07/evidencias/01_suite_pruebas_etapa_07.txt` | Salida cruda de la ejecución exitosa de la suite de pruebas automatizadas. |

---

## 3. Archivos Modificados

| Archivo | Razón del Cambio | Impacto |
| :--- | :--- | :--- |
| `server.ts` | 1. Registro del enrutador modular `knowledgeRouter` en `/api/v1/knowledge`.<br>2. Exportación dual de `app` (`export { app }` y `export default app`) para compatibilidad de suites de prueba y servidores HTTP. | Centraliza endpoints del centro de conocimiento bajo autenticación unificada y permite testeo automatizado de integración. |
| `src/components/admin/AdminShell.tsx` | 1. Integración de la pestaña `knowledge` con métricas operativas (Total recursos, Aprobados, Fragmentos, Conflictos pendientes).<br>2. Sandbox interactivo para probar en tiempo real las consultas FTS5/BM25 de los agentes.<br>3. Listado de fuentes con badges de estado, procedencia, versión y botones de revisión/retirada.<br>4. Modal para registrar y fragmentar nuevos recursos. | Los administradores y coordinadores disponen de interfaz visual reactiva para gobernar el conocimiento institucional. |
| `package.json` | Adición del script `"test:etapa07": "tsx scripts/test-etapa-07.ts"`. | Facilita la ejecución repetible y auditable de la suite de pruebas. |

---

## 4. Dependencias Añadidas
- **Cero dependencias npm externas añadidas**: Se utilizó el soporte nativo de SQLite (`node:sqlite`) con su módulo virtual FTS5 y función BM25 integrada, cumpliendo rigurosamente con el ADR-005 para evitar costos recurrentes de bases de datos vectoriales externas innecesarias en esta escala.

---

## 5. Migraciones de Base de Datos
- `006_knowledge_base_core.sql`: Crea las tablas del catálogo de conocimiento, fragmentos, historial, conflictos y FTS5.
- `007_knowledge_seed_data.sql`: Carga datos iniciales canónicos para pruebas y desarrollo.
- **Estado**: Ambas migraciones fueron aplicadas con éxito (`APPLIED`) en `data/alsiz.db` y en bases de datos efímeras de pruebas.

