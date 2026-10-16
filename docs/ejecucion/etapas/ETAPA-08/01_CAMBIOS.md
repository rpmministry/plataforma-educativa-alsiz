# Registro Detallado de Cambios — ETAPA 08
## Profesores IA Especializados y Coordinación Multiagente

- **Etapa**: ETAPA-08
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-08-profesores-ia-y-multiagente`
- **Responsable**: Líder Técnico — Plataforma Educativa ALSIZ para Ekballo Church
- **Estado**: APROBADA (Lista para revisión humana)

---

### 1. Resumen Ejecutivo de la Etapa

La **ETAPA-08** implementa la arquitectura completa de **Profesores IA Especializados y Orquestación Multiagente**, dotando a la Plataforma ALSIZ de tutores virtuales pedagógicos alineados con el currículo ecuatoriano (MINEDUC) y los principios bíblicos y formativos de Ekballo Church.

La solución garantiza:
1. **Desacoplamiento total de proveedores**: Interfaz `ILLMProvider` con soporte en cascada para Gemini 3.8 Flash, DeepSeek API (modelo compatible OpenAI) y un proveedor de simulación local offline de alta fidelidad (`SIMULATED_LOCAL`), asegurando que jamás se bloquee la experiencia del usuario ni se generen caídas 500 ante cortes de internet o agotamiento de cuotas.
2. **Fundamentación RAG estricta**: Conexión nativa con el Centro de Conocimiento (ETAPA-07), exigiendo etiquetas de citación verificables `[CODE#C#]` en cada respuesta basada en fuentes oficiales.
3. **Abstención honesta comprobada**: Si una consulta no cuenta con evidencia documental autorizada, el tutor declara con honestidad pedagógica su falta de evidencia en lugar de alucinar o inventar hechos.
4. **Seguridad infantil y protección al menor**: Detección y rechazo inmediato de solicitudes de diagnóstico médico o psicológico con derivación directa al tutor familiar/representante legal.
5. **Ciberseguridad y defensa contra Prompt Injection**: Neutralización de ataques de inyección ("ignore previous instructions", "jailbreak", etc.), manteniendo invariable el rol pedagógico.
6. **Aislamiento de datos de estudiantes (Anti-IDOR)**: Verificación estricta en base de datos para impedir que cualquier alumno acceda a historiales o mensajes de otros estudiantes (HTTP 403 Forbidden).
7. **Coordinación multiagente explícita**: Delegación formal de tareas entre el Tutor Socrático y el Evaluador Pedagógico de Rúbricas para calificar entregas según escalas cuantitativas y cualitativas de dominio.
8. **Supervisión Humana (Human-in-the-Loop)**: Los recursos didácticos generados por IA inician obligatoriamente en `DRAFT_REVIEW` y requieren la aprobación formal de un docente o administrador antes de ser publicados.
9. **Telemetría operativa sin PII**: Registro inmutable de latencia, tokens y llamadas sin almacenar datos sensibles del estudiante.

---

### 2. Archivos Creados y Modificados

#### 2.1 Base de Datos y Migraciones
- `server/db/migrations/008_ai_agents_orchestration.sql`: Creación de 5 tablas relacionales:
  - `ai_agents`: Catálogo de profesores IA, roles, estilos y fuentes permitidas.
  - `ai_conversations`: Sesiones de diálogo vinculadas al estudiante y a la materia.
  - `ai_messages`: Mensajes individuales (estudiante, agente, sistema) con etiquetas RAG y metadatos JSON.
  - `ai_telemetry_logs`: Registro operacional anonimizado de tokens, latencias, proveedor y flags de seguridad.
  - `ai_generated_materials`: Flujo de supervisión humana (Human-in-the-Loop) con estados `DRAFT_REVIEW`, `APPROVED_PUBLISHED` y `REJECTED`.
- `server/db/migrations/009_ai_agents_seed.sql`: Semilla de los 3 agentes piloto:
  1. `prof_ciencias_socratico` (Profesor Kepler - Matemáticas y Física BGU/8vo EGB).
  2. `mentor_ekballo_doctrinal` (Pastor David - Discipulado, carácter cristiano y mayordomía).
  3. `evaluador_formativo_rubricas` (Evaluador Pedagógico ALSIZ - Rúbricas analíticas y dominio demostrado).

#### 2.2 Capa de Proveedores y Servicios Backend
- `server/agents/types.ts`: Tipado estricto en TypeScript para proveedores, solicitudes LLM, respuestas, telemetría y fragmentos RAG.
- `server/agents/providers/simulatedProvider.ts`: Motor socrático local offline con normalización de diacríticos, citación RAG, abstención honesta, andamiaje pedagógico y salvaguardas de seguridad infantil.
- `server/agents/providers/geminiProvider.ts`: Integración oficial con el SDK `@google/genai` (modelo `gemini-3.8-flash`) con inyección contextual y extracción de etiquetas.
- `server/agents/providers/deepseekProvider.ts`: Cliente de contingencia con la API OpenAI-compatible de DeepSeek (`deepseek-chat`) con timeout de 12 segundos.
- `server/agents/providers/providerManager.ts`: Orquestador en cascada resiliente (`Gemini` -> `DeepSeek` -> `SimulatedProvider`).
- `server/agents/agentService.ts`: Lógica de negocio para gestión de agentes, creación de conversaciones, control Anti-IDOR, recuperación FTS5 BM25 del Centro de Conocimiento y registro de telemetría.
- `server/agents/coordinationService.ts`: Coordinador multiagente para evaluación pedagógica estructurada.
- `server/agents/humanSupervisionService.ts`: Servicio para el ciclo de vida de materiales generados por IA (generación en borrador, aprobación, rechazo).
- `server/routes/agentRoutes.ts`: Endpoints RESTful para agentes, conversaciones, mensajería, evaluación multiagente, supervisión de materiales y telemetría de coordinación.
- `server.ts`: Registro del enrutador `/api/v1/agents` con autenticación JWT y RBAC.

#### 2.3 Frontend y Consola Administrativa
- `src/components/admin/AdminShell.tsx`: Nueva pestaña interactiva de **Profesores IA y Multiagente**:
  - Métricas de telemetría operativa en tiempo real (total de interacciones, latencia media, tokens consumidos, alertas de seguridad).
  - Tarjetas de catálogo de agentes piloto (Kepler, Pastor David, Evaluador) con fuentes permitidas, estilo socrático y estado activo/versión.
  - Bandeja de supervisión docente *Human-in-the-Loop* para auditar y publicar o rechazar materiales educativos generados por IA.
- `package.json`: Script automatizado `"test:etapa08": "tsx scripts/test-etapa-08.ts"`.

#### 2.4 Pruebas Automatizadas
- `scripts/test-etapa-08.ts`: Suite de pruebas automatizadas con 17 criterios de aceptación rigurosos (100% aprobados).

---

### 3. Verificación de Integridad
- Cero advertencias ni errores en TypeScript (`npm run lint` / `tsc --noEmit` -> Código 0).
- Compilación de producción con Vite (`npm run build` -> Código 0).
- 100% de pruebas de regresión de etapas anteriores aprobadas:
  - Etapa 05 (Seguridad, Auth, LOPDP): 16/16 PASÓ.
  - Etapa 06 (LMS Académico, Rúbricas): 25/25 PASÓ.
  - Etapa 07 (Centro de Conocimiento, RAG FTS5): 16/16 PASÓ.
  - Etapa 08 (Profesores IA, Multiagente): 17/17 PASÓ.

