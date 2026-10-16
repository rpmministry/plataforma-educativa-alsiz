# Riesgos Técnicos y Decisiones de Arquitectura — ETAPA 07

## 1. Decisiones Técnicas Clave

### DEC-01: SQLite FTS5 con Algoritmo BM25 vs. Bases de Datos Vectoriales Externas (ADR-005)
- **Contexto**: Para alimentar los agentes socráticos de IA, se requiere recuperación semántica y léxica de fragmentos documentales con relevancia.
- **Alternativa Descartada**: Montar servicios vectoriales externos (Pinecone, Qdrant, Weaviate o Milvus). Implica dependencias de red, costos en dólares mensuales recurrentes e innecesarios para el volumen inicial de Ekballo Church.
- **Decisión Adoptada**: Utilizar el motor virtual nativo de SQLite `FTS5` (*Full-Text Search*) con el ranking BM25 (`bm25(knowledge_chunks_fts)`). 
- **Beneficio**: Rendimiento sub-milisegundo en local, costo $0 en infraestructura, portabilidad en un solo archivo `.db` y cero latencia de red. El esquema cuenta además con una columna `embedding_json` preparada para cuando se decida incorporar embeddings densos vía `@google/genai` en etapas posteriores.

### DEC-02: Exclusión Estricta de Fuentes Retiradas en la Cláusula WHERE de Retrieval
- **Contexto**: Un riesgo crítico en sistemas RAG educativos es que un recurso obsoleto, revocado o con doctrina errónea siga siendo citado por el modelo de IA debido a cachés o indexaciones perezosas.
- **Decisión Adoptada**: La consulta de búsqueda (`KnowledgeService.searchKnowledge`) realiza un `INNER JOIN` directo entre `knowledge_chunks_fts`, `knowledge_chunks` y `knowledge_sources` forzando la condición:
  ```sql
  WHERE knowledge_chunks_fts MATCH ? AND ks.status = 'APROBADO'
  ```
- **Beneficio**: Garantiza a nivel de base de datos relacional y transaccional que cualquier fuente que cambie a `DESACTIVADO`, `RECHAZADO` o `PENDIENTE` deja de aparecer inmediatamente en cualquier consulta de los agentes, sin requerir reconstrucciones lentas de índices vectoriales.

### DEC-03: Separación entre Identificador de Sesión (`id`) y de Usuario (`userId`)
- **Contexto**: Durante la prueba se detectó que `validateSession()` retorna un objeto `AuthSessionUser` donde `.id` corresponde a `session_id` y `.userId` corresponde a `user_id` de la tabla `users`.
- **Decisión Adoptada**: En todos los controladores de conocimiento se normalizó la obtención del usuario como `user.userId || user.id` para satisfacer las restricciones de clave foránea `REFERENCES users(id)`.

### DEC-04: Citas Formales y Rastreo de Procedencia en Cada Fragmento
- **Contexto**: Las respuestas socráticas de los agentes deben poder citar formalmente la procedencia del conocimiento para generar confianza en padres y profesores.
- **Decisión Adoptada**: Cada fragmento recibe una etiqueta única estandarizada en formato `[CODIGO-FUENTE#C{index}]` (ej. `[EKB-DOC-CLASE-01#C1]`), la cual se persiste en la columna `citation_tag` y se indexa en FTS5.

---

## 2. Riesgos Residuales y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación Implementada |
| :--- | :---: | :---: | :--- |
| Fragmentación de documentos con fórmulas matemáticas complejas o tablas. | Media | Bajo | Se admiten documentos en Markdown estructurado (`DOCUMENT_MD`), preservando bloques de código y delimitadores de encabezados como puntos naturales de corte. |
| Inyección de prompt en documentos subidos por usuarios con rol TEACHER. | Baja | Medio | Validación previa de longitud, sanitización de caracteres de control y regla editorial de que ningún recurso subido se aprueba automáticamente sin revisión de un Coordinador o Administrador. |
| Coincidencias de búsqueda parcial o variaciones morfológicas. | Media | Bajo | El servicio normaliza la consulta en tokens FTS5 con comodines prefijados (`"termino"*`), permitiendo coincidencia de raíces léxicas en español. |

