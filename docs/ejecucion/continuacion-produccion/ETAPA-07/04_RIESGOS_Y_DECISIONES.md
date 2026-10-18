# Registro de Decisiones y Gestión de Riesgos — Etapa 07: Catálogo Completo de Profesores IA por Asignatura y Nivel

**Fecha:** 17 de octubre de 2026  
**Rama:** `continuacion-produccion-etapa-07`

---

## 1. Decisiones de Arquitectura y Diseño Técnico (ADR)

### ADR-01: Ampliación Idempotente del Esquema SQL mediante Recreación de `ai_agents`
- **Contexto:** La tabla `ai_agents` (creada en la migración `008_ai_agents_orchestration.sql`) contenía una restricción `CHECK` rígida: `role_type IN ('SOCRATIC_TUTOR', 'DOCTRINAL_MENTOR', 'ESSAY_EVALUATOR', 'LESSON_PLANNER', 'COORDINATOR')`. Para incorporar los roles transversales obligatorios (`KNOWLEDGE_CURATOR` y `SAFETY_SUPERVISOR`) y `SUBJECT_SPECIALIST`, se requería modificar la restricción.
- **Alternativas Evaluadas:**
  1. *Editar retroactivamente `008_ai_agents_orchestration.sql`:* **Rechazado tajantemente** por violar la directriz de inmutabilidad de migraciones aplicadas.
  2. *Crear una nueva migración `013_ai_agents_complete_catalog.sql` aplicando el patrón de recreación de 12 pasos de SQLite (`ai_agents_new` -> copia de datos -> sustitución atómica):* **Seleccionado**.
- **Consecuencias:** Se mantiene la compatibilidad histórica, la integridad de los checksums y se habilita la extensibilidad de roles institucionales sin degradación.

### ADR-02: Alineación de Fuentes de Formación Cristiana con Restricción de `knowledge_sources`
- **Contexto:** En `006_knowledge_base_core.sql`, el campo `target_agent_family` de la tabla `knowledge_sources` posee la restricción `CHECK(target_agent_family IN ('SOCRATIC_TUTOR', 'ESSAY_EVALUATOR', 'LESSON_PLANNER', 'GENERAL_KNOWLEDGE'))`.
- **Decisión:** En la migración 013, las fuentes `src-rel-elem-4` y `src-rel-sup-8` se vincularon con `target_agent_family = 'SOCRATIC_TUTOR'`, garantizando compatibilidad referencial sin requerir una alteración de tabla en `knowledge_sources`.

### ADR-03: Configuración de Tokens de Razonamiento (Thinking Budget) en Gemini 3.8 Flash
- **Contexto:** El modelo vigente `gemini-3.8-flash` integra capacidad de pensamiento extendido (*extended thinking*). Al solicitar cuotas reducidas de tokens (`maxOutputTokens < 150`), el presupuesto de tokens es consumido predominantemente por el proceso interno de razonamiento, truncando la respuesta candidata hacia el usuario.
- **Decisión:** Para llamadas socráticas de baja latencia se configuró explícitamente `thinkingConfig: { thinkingBudget: 0 }` y un margen seguro de `maxOutputTokens: 500-600`. Esto garantiza respuestas inmediatas (<3.5 s), directas y pedagógicamente completas dentro del Free Tier de Google AI Studio.

### ADR-04: Principio Inviolable de Supervisión Humana (Human-in-the-Loop)
- **Contexto:** Los modelos de IA pueden generar alucinaciones o desvíos formativos si operan de forma no supervisada.
- **Decisión:**
  - Los materiales pedagógicos generados por IA se inicializan incondicionalmente en estado `DRAFT_REVIEW` vía [`HumanSupervisionService`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/server/agents/humanSupervisionService.ts).
  - Ningún agente posee privilegios ni endpoints para mutar campos de calificación oficial (`final_grade` o `submission_grade_history`).

---

## 2. Matriz de Riesgos y Medidas de Mitigación

| Riesgo Técnico / Operativo | Probabilidad | Impacto | Estrategia de Mitigación Implementada |
| :--- | :---: | :---: | :--- |
| **R1: Fuga de Datos Personales (LOPDP) en Diálogos de Menores** | Media | Extremo | El proveedor simulado y los prompts del sistema incorporan un filtro centinela activo que rechaza terminantemente la solicitud de contraseñas, PINs, teléfonos o direcciones, alertando de la directriz LOPDP. |
| **R2: Desalineación Curricular / Alucinación RAG** | Alta | Alto | Cada agente tiene restringidas sus fuentes mediante `allowed_source_codes_json`. Si no existe fragmento RAG verificado en el contexto de consulta, el agente ejecuta una *abstención honesta explícita* sin inventar respuestas. |
| **R3: Ataques de Evasión (Jailbreak / Prompt Injection)** | Media | Alto | Se implementaron analizadores de patrones en [`simulatedProvider.ts`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/server/agents/providers/simulatedProvider.ts) para detectar y neutralizar instrucciones como `ignore all previous instructions`, `unrestricted hacker`, y variantes en español. |
| **R4: Agotamiento de Cuota o Fallo de Red en Proveedor LLM** | Baja | Medio | La arquitectura desacopla el motor mediante `ProviderManager`, permitiendo alternar automáticamente entre `SIMULATED` (fallback local instantáneo sin costo) y `GOOGLE_GEMINI` (modelo `gemini-3.8-flash`). |
| **R5: Alteración Accidental de Datos en Producción** | Nula | Extremo | Todas las pruebas y validaciones se ejecutaron en la base de datos efímera aislada `data/test_alsiz_etapa07.db`, protegiendo la integridad de `data/alsiz.db`. |

