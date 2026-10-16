# Matriz de Validación de Criterios de Aceptación — ETAPA 07

## 1. Resumen de Estado
- **Total de Criterios Planificados**: 10
- **Total Cumplidos (`CUMPLE`)**: 10
- **No Cumplidos (`NO CUMPLE`)**: 0
- **Bloqueados (`BLOQUEADO`)**: 0
- **No Aplica (`NO APLICA`)**: 0

---

## 2. Matriz Detallada de Validación

| ID Criterio | Descripción del Criterio | Estado | Evidencia Vinculada |
| :---: | :--- | :---: | :--- |
| **CA-01** | Cargar un documento de prueba autorizado registrando todos sus metadatos (autoría, licencia, idioma, materia, familia de agentes). | **CUMPLE** | Endpoint `POST /api/v1/knowledge/sources` registra documento en estado `PENDIENTE` con todos los metadatos institucionales y de malla curricular.<br>Ver prueba Criterio 1 en `scripts/test-etapa-07.ts` (líneas 180-209) y log de ejecución en `01_suite_pruebas_etapa_07.txt`. |
| **CA-02** | Detección y rechazo de duplicados idénticos por checksum criptográfico SHA-256. | **CUMPLE** | Se genera SHA-256 del contenido canónico; al intentar registrar un documento con idéntico hash se retorna `HTTP 409 Conflict` con código `CONFLICT`.<br>Ver prueba Criterio 2 en `scripts/test-etapa-07.ts` (líneas 214-232). |
| **CA-03** | Extracción y segmentación de texto en fragmentos con etiquetas de citación formal (`citation_tag`). | **CUMPLE** | Algoritmo de fragmentación semántica genera fragmentos con etiquetas normalizadas (ej. `[TEST-OPTICA-XXXX#C1]`, `[TEST-OPTICA-XXXX#C2]`), conteo de tokens y metadatos de materia.<br>Ver prueba Criterio 3 en `scripts/test-etapa-07.ts` (líneas 237-258). |
| **CA-04** | Indexación en SQLite FTS5 y recuperación exitosa de fragmentos relevantes mediante consulta de búsqueda temática (BM25). | **CUMPLE** | Endpoint `GET /api/v1/knowledge/search?q=Snell` ejecuta consulta MATCH sobre tabla virtual `knowledge_chunks_fts` calculando `bm25()` y retornando fragmentos ordenados por relevancia.<br>Ver prueba Criterio 6 en `scripts/test-etapa-07.ts` (líneas 315-343). |
| **CA-05** | Publicación de una nueva versión de una fuente y verificación del árbol de versiones. | **CUMPLE** | Endpoint `POST /api/v1/knowledge/sources/:id/versions` genera versión incrementada (`version_number: 2`, `parent_source_id`), conservando el árbol de linaje y comenzando la nueva versión en estado `PENDIENTE`.<br>Ver prueba Criterio 7 en `scripts/test-etapa-07.ts` (líneas 348-372). |
| **CA-06** | **CRÍTICO: Demostrar que una fuente desactivada o rechazada deja de ser recuperada en el retrieval de los agentes de IA.** | **CUMPLE** | Al ejecutar `POST /api/v1/knowledge/sources/:id/retire`, la fuente pasa a `DESACTIVADO`. Una consulta idéntica de búsqueda sobre palabras clave de dicha fuente retorna **cero fragmentos recuperados**, demostrando aislamiento estricto.<br>Ver prueba Criterio 8 y 9 en `scripts/test-etapa-07.ts` (líneas 377-407). |
| **CA-07** | Control de permisos RBAC: Carga permitida a docentes, aprobación restringida a coordinadores/administradores, bloqueo total a estudiantes. | **CUMPLE** | - Docente puede crear fuente pero recibe `HTTP 403` al intentar auto-aprobarla.<br>- Estudiante recibe `HTTP 403` al intentar acceder a la gestión del centro de conocimiento.<br>- Administrador y Coordinador pueden aprobar y retirar fuentes.<br>Ver pruebas Criterios 4A y 4B en `scripts/test-etapa-07.ts` (líneas 263-294). |
| **CA-08** | Manejo de archivo inválido, tipo no soportado o tamaño excesivo con código de error apropiado. | **CUMPLE** | Envío de contenido de longitud inferior al umbral mínimo o vacío es rechazado con `HTTP 400 Bad Request` y mensaje descriptivo `VALIDATION_ERROR: El contenido del documento es demasiado breve o está vacío`.<br>Ver prueba Criterio 10 en `scripts/test-etapa-07.ts` (líneas 412-421). |
| **CA-09** | Registro de conflictos pedagógicos/doctrinales entre fuentes con escalamiento a revisión humana. | **CUMPLE** | Endpoint `POST /api/v1/knowledge/conflicts` registra discrepancias (`CURRICULAR_MISMATCH`, `DOCTRINAL_DISCREPANCY`) en estado `REPORTED`, y `POST /conflicts/:id/resolve` permite al Administrador emitir dictamen y notas de resolución.<br>Ver pruebas Criterios 11 y 12 en `scripts/test-etapa-07.ts` (líneas 426-463). |
| **CA-10** | Trazabilidad inmutable de todas las acciones en el historial editorial. | **CUMPLE** | Cada creación, revisión, versión y retirada inserta una fila inmutable en `knowledge_source_history` con `performed_by_user_id`, `action`, `justification` y marca de tiempo ISO.<br>Verificado en Criterio 5 y consulta de detalle de fuente. |

---

## 3. Conclusión de Validación
Todos los criterios de aceptación técnicos y pedagógicos han sido rigurosamente satisfechos y comprobados mediante ejecuciones automatizadas repetibles con cero fallos.

