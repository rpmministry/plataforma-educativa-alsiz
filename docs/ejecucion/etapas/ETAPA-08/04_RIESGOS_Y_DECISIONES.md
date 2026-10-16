# Registro de Riesgos y Decisiones Técnicas — ETAPA 08
## Profesores IA Especializados y Coordinación Multiagente

- **Etapa**: ETAPA-08
- **Fecha**: 2026-10-16
- **Responsable**: Líder Técnico — Plataforma Educativa ALSIZ para Ekballo Church

---

### 1. Decisiones Técnicas Fundamentales (ADR)

#### ADR-08-01: Arquitectura de Proveedores Desacoplados con Cascada Resiliente
- **Contexto**: Las llamadas a modelos de lenguaje comerciales (Gemini, DeepSeek, OpenAI) están sujetas a fluctuaciones de latencia, agotamiento de cuotas gratuitas, caídas temporales (errores 503 por saturación) y dependencia de conectividad constante a internet. En un entorno escolar, una falla de API externa no puede interrumpir la clase ni congelar la pantalla del estudiante.
- **Decisión**: Implementar una interfaz abstracta `ILLMProvider` gobernada por un `ProviderManager`. El orquestador intenta invocar al proveedor primario configurado (Gemini 3.8 Flash); ante cualquier error HTTP (503, 429, timeout), conmuta inmediatamente al proveedor secundario (DeepSeek API); si este también falla o no está configurado, conmuta al proveedor de simulación socrática local (`SimulatedProvider`).
- **Consecuencia**: El sistema es 100% inmune a caídas externas. Los tests demostraron que al recibir un error 503 de Gemini ("model is currently experiencing high demand"), la llamada se degradó elegantemente a la simulación sin generar excepciones 500 al cliente.

#### ADR-08-02: Orden de Precedencia en la Generación Socrática (Seguridad > Abstención > RAG)
- **Contexto**: Cuando un estudiante realiza una consulta, la base de datos FTS5 puede encontrar coincidencias sintácticas parciales (por ejemplo, palabras comunes como "el", "es", "hoy") incluso en preguntas completamente ajenas al currículo o de riesgo clínico.
- **Decisión**: Establecer un orden estricto de evaluación de intenciones:
  1. *Prompt Injection Defense*: Neutralizar intentos de jailbreak antes de cualquier otra evaluación.
  2. *Seguridad Infantil*: Detección de consultas de salud mental/física con negativa inmediata y derivación familiar.
  3. *Abstención Honesta*: Consultas fuera de currículo se rechazan honestamente antes de evaluar fragmentos RAG ambiguos.
  4. *Andamiaje Socrático*: Los errores conceptuales detectados se abordan con preguntas inductivas.
  5. *Fundamentación RAG*: Solo cuando la consulta es pertinente se inyectan y citan los fragmentos de conocimiento autorizados.
- **Consecuencia**: Se previene que una coincidencia espuria en el índice de búsqueda provoque respuestas incoherentes o salte las salvaguardas éticas y pedagógicas.

#### ADR-08-03: Supervisión Humana Mandatoria para Materiales de Estudio (Human-in-the-Loop)
- **Contexto**: Los agentes IA pueden sugerir retos, guías o evaluaciones complementarias. Si estos materiales se publicaran automáticamente, existiría el riesgo de introducir sesgos, dificultades descalibradas o imprecisiones conceptuales no auditadas.
- **Decisión**: Toda propuesta de material didáctico generada por un agente se almacena en la tabla `ai_generated_materials` con estado inicial obligatorio `DRAFT_REVIEW`. Ningún estudiante puede visualizar el material hasta que un docente o coordinador académico lo revise, edite si es necesario, y lo apruebe formalmente (`APPROVED_PUBLISHED`).
- **Consecuencia**: Cumplimiento ético total con el marco de gobernanza institucional de Ekballo Church y la normativa educativa nacional.

#### ADR-08-04: Telemetría Operacional con Anonimización Estricta (Privacidad LOPDP)
- **Contexto**: Es indispensable medir la latencia, el costo en tokens y la tasa de errores de los agentes, pero la Ley Orgánica de Protección de Datos Personales (LOPDP) de Ecuador prohíbe registrar identificadores personales de niños y adolescentes en bitácoras operacionales o compartirlas con terceros.
- **Decisión**: La tabla `ai_telemetry_logs` no almacena nombres, correos ni datos del perfil del alumno; únicamente registra el identificador de conversación opaco, el código del agente, el proveedor, tokens estimados, latencia en milisegundos y banderas de seguridad (ej. `MEDICAL_PSYCHOLOGICAL_REFUSAL_ESCALATED`).
- **Consecuencia**: Auditoría técnica exhaustiva sin vulnerar la privacidad de los menores de edad.

---

### 2. Matriz de Gestión de Riesgos

| Riesgo Identificado | Severidad | Probabilidad | Mitigación Implementada | Estado |
|---|:---:|:---:|---|:---:|
| **Alucinación de respuestas curriculares** | ALTA | MEDIA | Citación obligatoria `[CODE#C#]` respaldada por el Centro de Conocimiento (ETAPA-07) y abstención honesta ante falta de evidencia. | MITIGADO |
| **Saturación o indisponibilidad de APIs externas** | ALTA | ALTA | Conmutación por cascada a `SIMULATED_LOCAL` con tiempo de respuesta < 20 ms. | MITIGADO |
| **Ataques de Prompt Injection / Jailbreak** | MEDIA | MEDIA | Filtros heurísticos en el pipeline y refuerzo en directivas de sistema para neutralizar escapes de rol. | MITIGADO |
| **Filtración de chats entre alumnos (IDOR)** | CRÍTICA | BAJA | Verificación a nivel de consulta SQL de pertenencia de la conversación al estudiante autenticado (HTTP 403 Forbidden). | MITIGADO |
| **Generación de consejos médicos o psicológicos no autorizados** | CRÍTICA | MEDIA | Negativa absoluta a emitir diagnósticos o tratamientos, acompañada de derivación mandatoria a padres y mentores. | MITIGADO |
| **Sobrecarga de almacenamiento por conversaciones** | BAJA | MEDIA | Índices optimizados en SQLite (`ai_conversations_student_idx`, `ai_messages_conv_idx`) con límite de historial en consultas RAG. | MITIGADO |

