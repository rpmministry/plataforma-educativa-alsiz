# Plan de Ejecución — ETAPA 07: Centro de Conocimiento y Matrices Temáticas

## 1. Identificación de la Etapa
- **Código de Etapa**: `ETAPA-07`
- **Nombre**: Centro de Conocimiento y Matrices Temáticas
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)
- **Rama Git de Trabajo**: `etapa-07-centro-de-conocimiento`
- **Directorio de Trabajo Autorizado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Repositorio Remoto Autorizado**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Fecha de Inicio**: 2026-10-16

---

## 2. Objetivos
Implementar el centro de conocimiento y gobernanza documental que alimenta a los profesores y asistentes de IA de la **Plataforma Educativa ALSIZ para Ekballo Church**, garantizando trazabilidad editorial, indexación eficiente sin bases de datos externas caras, y desindexación / retirada efectiva de recursos obsoletos o revocados:

1. **Catálogo de Fuentes Estructurado (`knowledge_sources`)**:
   - Registro de recursos con metadatos completos: materia (`subject_id`), grado (`level_id`), competencias (`competency_id`), idioma (`language`), familia de agentes destino (`target_agent_family`), nivel de confianza (`trust_level`), autoría/editorial y tipo de licencia conocida.
2. **Formatos y Tipos Aprobados**:
   - Soporte para documentos estructurados (Markdown, texto plano, PDF/DOCX simulados o de prueba), URLs externas de referencia académica, y referencias a contenido audiovisual con transcripción textual.
3. **Deduplicación y Validación de Seguridad**:
   - Detección de duplicados mediante suma de comprobación criptográfica SHA-256 (`checksum_sha256`) o URI normalizada.
   - Validación de tamaño máximo, tipo de contenido y sanitización contra inyecciones de prompt (*prompt injection prevention*).
4. **Ciclo de Vida y Estados Editoriales**:
   - Flujo de estados: `PENDIENTE`, `EN_REVISION`, `APROBADO`, `RECHAZADO`, `DESACTIVADO`, `ERROR`.
   - Regla editorial estricta: **Ningún recurso nuevo se aprueba automáticamente por haber sido cargado**; requiere revisión humana calificada.
5. **Segmentación (Chunking) e Indexación Aprobada**:
   - Algoritmo de fragmentación semántica en fragmentos (*chunks*) de 200 a 500 palabras con etiqueta de citación trazable (`[DOC-CODE#C1]`).
   - Motor de búsqueda e indexación basado en SQLite FTS5 (*Full-Text Search*) con ranking BM25 y filtrado facetado por materia, competencia y familia de agentes (ADR-005, sin sobrecostes de infraestructura).
6. **Retirada Efectiva y Gestión de Cachés**:
   - Cuando una fuente pasa a `DESACTIVADO` o `RECHAZADO`, el pipeline de consulta (*retrieval*) para profesores IA **la excluye inmediatamente**.
   - Los fragmentos de fuentes retiradas nunca se inyectan en prompts de agentes pedagógicos.
7. **Control Editorial, Procedencia y Conflictos**:
   - Distinción explícita de procedencia: `OFICIAL_MINEDUC`, `DOCTRINAL_EKBALLO`, `EDITORIAL_EXTERNA`, `RECURSO_ABIERTO`.
   - Registro de discrepancias o conflictos conceptuales/doctrinales entre fuentes (`knowledge_source_conflicts`) con flujo de escalamiento para resolución humana.
8. **Versionado y Sustitución de Fuentes**:
   - Versionado formal (`version_number`, `parent_source_id`).
   - Al publicar una nueva versión aprobada, la versión previa queda marcada como sustituida / archivada.
9. **Control de Acceso (RBAC) y Auditoría Inmutable**:
   - Carga: `TEACHER`, `ACADEMIC_COORDINATOR`, `ADMIN`.
   - Aprobación / Rechazo / Desactivación: Restringido a `ACADEMIC_COORDINATOR` y `ADMIN`.
   - Alumnos y representantes: Bloqueados de alterar el centro de conocimiento (403 Forbidden).
   - Auditoría detallada: usuario, acción, justificación pedagógica y marca de tiempo.
10. **Interfaz de Gestión Administrativa**:
    - Vista en el panel administrativo (`AdminShell.tsx`) con listado de fuentes, filtros por estado/procedencia, modal de subida de fuentes, visualizador de fragmentos e historial de auditoría.

---

## 3. Exclusiones Explícitas de la Etapa
- **Orquestación de Diálogos Multiturno y Llamadas a LLM**: La orquestación completa de agentes de tutoría socrática en vivo corresponde a la **ETAPA 08**. En esta etapa nos enfocamos estrictamente en la base de conocimiento, catálogo, extracción, segmentación, indexación y retrieval.
- **Bases de Datos Vectoriales Externas**: No se agregarán servicios externos pesados como Pinecone, Qdrant o Weaviate, respetando la directriz ADR-005 (FTS5 + BM25 nativo y esquema preparado para embeddings locales/Google).
- **Extracción de Contenidos Protegidos sin Licencia**: Se registran metadatos y enlaces sin redistribución no autorizada.

---

## 4. Dependencias Previas
- Migraciones `001_initial_schema.sql` a `005_lms_seed_data.sql` aplicadas.
- Infraestructura de autenticación, JWT y RBAC de la Etapa 05.
- Malla curricular y materias creadas en la Etapa 06 (`subjects`, `levels`, `competencies`).

---

## 5. Criterios de Aceptación

| # | Criterio de Aceptación |
| :---: | :--- |
| **CA-01** | Cargar un documento de prueba autorizado registrando todos sus metadatos (autoría, licencia, idioma, materia, familia de agentes). |
| **CA-02** | Detección y rechazo de duplicados idénticos por checksum SHA-256. |
| **CA-03** | Extracción y segmentación de texto en fragmentos con etiquetas de citación (`citation_tag`). |
| **CA-04** | Indexación en SQLite FTS5 y recuperación exitosa de fragmentos relevantes mediante consulta de búsqueda temática. |
| **CA-05** | Publicación de una nueva versión de una fuente y verificación del árbol de versiones. |
| **CA-06** | **CRÍTICO: Demostrar que una fuente desactivada o rechazada deja de ser recuperada en el retrieval de los agentes de IA.** |
| **CA-07** | Control de permisos RBAC: Carga permitida a docentes, aprobación restringida a coordinadores/administradores, bloqueo total a estudiantes. |
| **CA-08** | Manejo de archivo inválido, tipo no soportado o tamaño excesivo con código de error apropiado. |
| **CA-09** | Registro de conflictos pedagógicos/doctrinales entre fuentes con escalamiento a revisión humana. |
| **CA-10** | Trazabilidad inmutable de todas las acciones en el historial editorial. |

