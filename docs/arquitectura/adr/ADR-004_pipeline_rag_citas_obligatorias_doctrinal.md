# ADR-004: Ingesta de Conocimiento Doctrinal y Pipeline RAG con Citas Verificables Obligatorias

- **Estado**: Aprobado
- **Fecha**: 2026-10-16
- **Autores**: Antigravity / Liderazgo Técnico ALSIZ
- **Contexto**:
  La plataforma ALSIZ forma a estudiantes en la cosmovisión bíblica y los principios de fe de Ekballo Church. La presencia de alucinaciones teológicas, doctrinas contradictorias o inventos en un tutor de IA para niños y jóvenes representaría un riesgo inaceptable para el liderazgo de la iglesia.
- **Alternativas Evaluadas**:
  1. *Fine-Tuning de un Modelo Abierto*: Entrenar un modelo local con los textos de la iglesia. Muy costoso, requiere GPUs dedicadas y no elimina las alucinaciones por completo.
  2. *Inyección en Memoria Completa (Prompt Stuffing)*: Colocar todo el texto de las 7 clases en cada prompt. Ineficiente en tokens y saturación de la ventana de contexto.
  3. *Pipeline RAG con Chunking Jerárquico y Citas Obligatorias (Elegida)*: Indexar los documentos canónicos en fragmentos con metadatos exactos de clase, párrafo y versículo; exigir que toda respuesta cite su fuente `[S#]` y rechazar respuestas si no hay evidencia suficiente.
- **Decisión**:
  1. Diseñar el motor RAG utilizando embeddings de alta fidelidad (`text-embedding-004`) y almacenamiento vectorial relacional (`pgvector`).
  2. Implementar un filtro de umbral de similitud estricto (`similitud >= 0.72`) que descarte preguntas ajenas al corpus oficial de Ekballo.
  3. Configurar guardrails en el orquestador que verifiquen mediante regex la presencia de etiquetas de cita `[S1-C#-P#]` en las respuestas doctrinales.
- **Consecuencias**:
  - *Positivas*: Certeza doctrinal absoluta; respuestas verificables contra los PDFs canónicos; protección contra desviaciones ideológicas o teológicas no autorizadas.
  - *Negativas*: Preguntas de los alumnos que escapen de las 7 clases doctrinales recibirán un rechazo amable que redirige al pastor o tutor humano.

