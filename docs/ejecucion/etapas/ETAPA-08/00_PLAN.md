# Plan de Ejecución — ETAPA 08: Profesores IA Especializados y Coordinación Multiagente

## 1. Identificación de la Etapa
- **Código de Etapa**: `ETAPA-08`
- **Nombre**: Profesores IA Especializados y Coordinación Multiagente
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)
- **Rama Git de Trabajo**: `etapa-08-profesores-ia-y-multiagente`
- **Directorio de Trabajo Autorizado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Repositorio Remoto Autorizado**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Fecha de Inicio**: 2026-10-16

---

## 2. Objetivos y Alcance
Implementar un conjunto piloto representativo de agentes educativos socráticos basado en las matrices curriculares y doctrinales aprobadas de **Ekballo Church**, con recuperación fundamentada (*Grounding/RAG*), límites estrictos de seguridad infantil, aislamiento de datos, coordinación explícita y supervisión humana:

1. **Diseño Desacoplado de Proveedores LLM (`LLMProvider`)**:
   - Abstracción unificada e intercambiable de proveedores (`GeminiProvider`, `DeepSeekProvider`, `SimulatedFallbackProvider`).
   - Gestión resiliente de llamadas con tiempo de espera (*timeout*), reintentos exponenciales, *circuit-breaker* y degradación elegante a simulación offline cuando no haya conectividad o clave API.
   - Detección segura de credenciales de entorno (`GEMINI_API_KEY`, `DEEPSEEK_API_KEY`) sin exponer secretos en respuestas ni logs.
2. **Conjunto Piloto de Agentes Educativos Especializados**:
   - **Agente 1: Profesor Socrático de Matemáticas y Física (`prof_ciencias_socratico`)**:
     - *Materia*: Matemáticas / Ciencias Exactas (`subj-mat-801`).
     - *Nivel*: 8.º EGB Superior (`lvl-sup-8`) y Bachillerato BGU.
     - *Estilo*: Mayéutico-socrático; no entrega respuestas hechas, guía mediante preguntas orientadas a la deducción paso a paso y descompone conceptos complejos.
     - *Fuentes autorizadas*: Catálogo curricular oficial MINEDUC (`MINEDUC-FIS-BGU-01`).
   - **Agente 2: Mentor Formativo y Doctrinal Ekballo (`mentor_ekballo_doctrinal`)**:
     - *Materia*: Relación con Dios y Carácter Cristiano (`subj-rel-801`).
     - *Nivel*: Homeschooling y Discipulado Institucional.
     - *Estilo*: Mentor pastoral y reflexivo; conecta la ciencia, la naturaleza y la vida diaria con principios de cosmovisión bíblica y carácter cristiano.
     - *Fuentes autorizadas*: Guías doctrinales canónicas de Ekballo Church (`EKB-DOC-CLASE-01`).
   - **Agente 3: Evaluador Formativo y de Rúbricas (`evaluador_formativo_rubricas`)**:
     - *Rol*: Analiza las respuestas y razonamientos del estudiante contra rúbricas de destreza (`rubric_scores_json`), destacando aciertos y áreas de crecimiento constructivo sin descalificaciones ni humillaciones.
3. **Recuperación Fundamentada con Citas Trazables (RAG)**:
   - Integración nativa con el Centro de Conocimiento (Etapa 07) mediante consulta SQLite FTS5 con ranking BM25 (`KnowledgeService.searchKnowledge`).
   - Obligatoriedad de citación: Toda respuesta fundamentada debe incluir la etiqueta canónica del fragmento (ej. `[EKB-DOC-CLASE-01#C1]`, `[MINEDUC-FIS-BGU-01#C2]`).
   - **Abstención Honesta ante Falta de Evidencia**: Si el alumno formula una pregunta no respaldada en los materiales aprobados o fuera de contexto, el agente reconoce explícitamente: *"No dispongo de evidencia suficiente en los materiales autorizados para responder a esta pregunta con certeza pedagógica."*
4. **Seguridad Infantil, Conducta Pedagógica y Protección LOPDP**:
   - Adecuación del lenguaje y profundidad conceptual a la edad del menor (12-14 años en Superior, 15-17 en BGU).
   - Prohibición categórica de emitir diagnósticos médicos, psiquiátricos o psicológicos.
   - Derivación inmediata de angustia o situaciones sensibles al Representante Legal (`REPRESENTATIVE`) vinculado familiarmente.
   - Protección contra inyecciones de *prompt* (*Jailbreak / Prompt Injection Defense*): Las instrucciones dentro de fragmentos recuperados o mensajes maliciosos no pueden alterar las directivas de seguridad del sistema.
   - No solicitud de datos personales innecesarios (teléfonos, domicilios, contraseñas).
5. **Aislamiento Estricto y Permisos (Anti-IDOR)**:
   - Los agentes solo acceden a la conversación y perfil del estudiante autenticado.
   - Bloqueo total de acceso a historiales de otros alumnos, expedientes ajenos, claves o funciones administrativas (403 Forbidden).
6. **Coordinación Multiagente Justificada y Telemetría**:
   - Coordinación explícita Tutor -> Evaluador cuando el alumno solicita autoevaluación o revisión de ejercicio.
   - Telemetría de rendimiento (latencia en milisegundos, estimación de tokens y modelo utilizado) registrada en `ai_telemetry_logs` sin guardar PII ni contenidos sensibles indefinidamente.
7. **Supervisión Humana en Bucle (*Human-in-the-Loop*)**:
   - Todo material didáctico, reto o evaluación generado por agentes de IA inicia en estado `DRAFT_REVIEW` y requiere aprobación expresa de un docente o administrador antes de ser publicado como recurso oficial.
8. **Banco de Pruebas y Evaluación Benchmarking**:
   - Suite automatizada con casos de prueba:
     - Preguntas con respuesta exacta en fuentes (verificación de citación).
     - Preguntas sin respuesta en fuentes (verificación de abstención).
     - Preguntas con error conceptual del alumno (verificación de guía socrática sin humillación).
     - Pruebas bilingües (Español e Inglés).
     - Pruebas de seguridad infantil (negativa de diagnóstico médico y derivación familiar).
     - Pruebas de resistencia a inyecciones de prompt.
     - Pruebas de tolerancia a fallos y degradación elegante.

---

## 3. Exclusiones Explícitas de la Etapa
- **Voz y Streaming WebSocket en Vivo (Live API / WebRTC)**: La interacción por voz bidireccional y streaming de baja latencia corresponde a etapas de optimización multimedia posteriores. En esta etapa se implementa la orquestación HTTP REST con respuestas estructuradas completas.
- **Activación Masiva de Todas las Materias**: Se activa estrictamente el conjunto piloto representativo (Ciencias Exactas, Discipulado y Evaluador).

---

## 4. Dependencias Previas
- Base de datos relacional y migraciones v001 a v007 aplicadas.
- Sistema de autenticación JWT, RBAC y control de acceso familiar (Etapa 05).
- Malla curricular, asignaturas y competencias pedagógicas (Etapa 06).
- Centro de Conocimiento, fragmentación FTS5 y BM25 (Etapa 07).

---

## 5. Criterios de Aceptación

| # | Criterio de Aceptación |
| :---: | :--- |
| **CA-01** | Catálogo de agentes piloto representativos con perfiles, materias, estilos pedagógicos, versiones y fuentes permitidas. |
| **CA-02** | Abstracción de proveedores LLM con soporte de Gemini 3.8 Flash / 3.5 Flash-Lite, DeepSeek y fallback resiliente simulado. |
| **CA-03** | Respuestas fundamentadas en fuentes del Centro de Conocimiento que incluyen etiquetas de citación formal (`[DOC#C#]`). |
| **CA-04** | **CRÍTICO: Abstención pedagógica honesta cuando la pregunta no tiene evidencia suficiente en las fuentes aprobadas.** |
| **CA-05** | Respuestas pedagógicas socráticas adaptadas a la edad que guían al razonamiento sin humillar ni entregar respuestas inmediatas. |
| **CA-06** | Conducta segura: Rechazo tajante de diagnósticos médicos/psicológicos y derivación formal al representante legal. |
| **CA-07** | Resistencia a inyecciones de prompt (*Prompt Injection Defense*) sin alteración de las reglas del sistema. |
| **CA-08** | Soporte bilingüe verificado (Español e Inglés). |
| **CA-09** | Aislamiento estricto de datos del estudiante: un alumno no puede leer ni enviar mensajes en conversaciones de otro menor (Anti-IDOR 403). |
| **CA-10** | Coordinación multiagente: Tutor socrático delega evaluación formativa a Evaluador de Rúbricas. |
| **CA-11** | Tolerancia a fallos: caídas o retrasos de proveedores externos activan fallback sin bloquear la interfaz. |
| **CA-12** | Registro de telemetría operativa (latencia, tokens, proveedor) sin filtración de PII ni contraseñas. |
| **CA-13** | Supervisión humana: materiales didácticos generados por IA requieren revisión docente antes de publicación. |

