# Bitácora de Cambios — Etapa 07: Catálogo Completo de Profesores IA por Asignatura y Nivel

**Rama:** `continuacion-produccion-etapa-07`  
**Commit Inicial:** `570a61cfce48c7ddafec68aa1035cf6677f55bdd`  
**Fecha de Implementación:** 17 de octubre de 2026  
**Entorno de Trabajo:** Local aislado (sin escrituras en producción ni cuentas reales)

---

## 1. Resumen Ejecutivo del Cambio

En esta etapa se transitó desde una arquitectura experimental de 3 agentes piloto (`009_ai_agents_seed.sql`) hacia un catálogo curricular 100% especializado y formalizado para los dos estudiantes matriculados en Ekballo Church:
- **Gael Andrade Sánchez (4.º EGB Elemental):** 9 asignaturas cubiertas con 9 profesores de IA especializados (método Singapur CPA, fonética Pre-A1, algoritmos Scratch, indagación botánica, mayordomía).
- **Avril Andrade Sánchez (8.º EGB Superior):** 11 asignaturas cubiertas con 11 profesores de IA especializados (ensayo argumentativo APA 7, álgebra/números racionales $\mathbb{Q}$, debates CLIL B1, Python 3/ética de IA, apologética, Lean Canvas, biomecánica).
- **Soporte Transversal Institucional:** 5 agentes de gobernanza pedagógica y ética (`COORDINATOR`, `SOCRATIC_TUTOR`, `ESSAY_EVALUATOR`, `KNOWLEDGE_CURATOR`, `SAFETY_SUPERVISOR`).
- **Gobernanza de Calificaciones y Materiales:** Prohibición absoluta de mutabilidad autónoma de notas oficiales (`final_grade`, `submission_grade_history`); los materiales generados por IA inician obligatoriamente en estado `DRAFT_REVIEW` requiriendo firma humana.

---

## 2. Inventario de Archivos Modificados y Creados

### 2.1 Archivos Creados

1. [`docs/ai-agents/matriz_cobertura_agentes.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matriz_cobertura_agentes.md)
   - Matriz integral de correspondencia 1:1 entre materias, niveles, códigos de asignatura, profesores IA asignados, versión de matriz, fuentes aprobadas y estado de pruebas (`ACTIVO (Certificado en 9 Dimensiones)`).
   - Diagrama Mermaid de arquitectura transversal y límites estrictos de permisos.

2. [`docs/ai-agents/matrices-tematicas/README.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/README.md)
   - Índice maestro de las 20 matrices temáticas estructuradas y versionadas.

3. **20 Matrices Temáticas Curriculares (Estructura Pedagógica de 11 Secciones Obligatorias):**
   - [`docs/ai-agents/matrices-tematicas/MT-LEN-401.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-LEN-401.md) (Lengua 4.º EGB — Maestra Lucía)
   - [`docs/ai-agents/matrices-tematicas/MT-MAT-401.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-MAT-401.md) (Matemáticas 4.º EGB — Prof. Lucas)
   - [`docs/ai-agents/matrices-tematicas/MT-CNI-401.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-CNI-401.md) (Ciencias Naturales 4.º EGB — Dra. Maya Selva)
   - [`docs/ai-agents/matrices-tematicas/MT-SOC-401.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-SOC-401.md) (Estudios Sociales 4.º EGB — Cap. Diego Mapamundi)
   - [`docs/ai-agents/matrices-tematicas/MT-ING-401.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-ING-401.md) (Inglés 4.º EGB — Teacher Emma)
   - [`docs/ai-agents/matrices-tematicas/MT-SOFT-401.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-SOFT-401.md) (Software 4.º EGB — Robot Codi)
   - [`docs/ai-agents/matrices-tematicas/MT-REL-401.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-REL-401.md) (Relación con Dios 4.º EGB — Prof. David)
   - [`docs/ai-agents/matrices-tematicas/MT-ART-401.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-ART-401.md) (Arte 4.º EGB — Tía Pincelita)
   - [`docs/ai-agents/matrices-tematicas/MT-EFI-401.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-EFI-401.md) (Educación Física 4.º EGB — Profe Alex)
   - [`docs/ai-agents/matrices-tematicas/MT-LEN-801.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-LEN-801.md) (Lengua 8.º EGB — Prof. Gabriel Neruda)
   - [`docs/ai-agents/matrices-tematicas/MT-MAT-801.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-MAT-801.md) (Matemáticas 8.º EGB — Dra. Sophia Euler)
   - [`docs/ai-agents/matrices-tematicas/MT-CNI-801.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-CNI-801.md) (Ciencias Naturales 8.º EGB — Dr. Leonardo Darwin)
   - [`docs/ai-agents/matrices-tematicas/MT-SOC-801.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-SOC-801.md) (Estudios Sociales 8.º EGB — Dra. Valentina Chronos)
   - [`docs/ai-agents/matrices-tematicas/MT-ING-801.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-ING-801.md) (Inglés 8.º EGB — Prof. Sarah Mitchell)
   - [`docs/ai-agents/matrices-tematicas/MT-SOFT-801.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-SOFT-801.md) (Software 8.º EGB — Ing. Alan Turing)
   - [`docs/ai-agents/matrices-tematicas/MT-POL-801.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-POL-801.md) (Ciencias Políticas 8.º EGB — Lic. Rodrigo Mendoza)
   - [`docs/ai-agents/matrices-tematicas/MT-ADM-801.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-ADM-801.md) (Administración y Mkt 8.º EGB — MBA Carla Fonseca)
   - [`docs/ai-agents/matrices-tematicas/MT-REL-801.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-REL-801.md) (Relación con Dios 8.º EGB — Pastor David)
   - [`docs/ai-agents/matrices-tematicas/MT-ART-801.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-ART-801.md) (Arte 8.º EGB — Maestra Clara Monet)
   - [`docs/ai-agents/matrices-tematicas/MT-EFI-801.md`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ai-agents/matrices-tematicas/MT-EFI-801.md) (Educación Física 8.º EGB — Entrenador Mateo)

4. [`server/db/migrations/013_ai_agents_complete_catalog.sql`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/server/db/migrations/013_ai_agents_complete_catalog.sql)
   - Migración idempotente que amplía la restricción `CHECK` de `role_type` en `ai_agents` para soportar `KNOWLEDGE_CURATOR`, `SAFETY_SUPERVISOR` y `SUBJECT_SPECIALIST`.
   - Inserción segura (`INSERT OR IGNORE`) de las 20 asignaturas canónicas.
   - Inserción de 20 fuentes del Centro de Conocimiento en estado `APROBADO` con sus respectivos checksums SHA-256.
   - Inserción de 20 fragmentos de conocimiento (`knowledge_chunks`) con etiquetas formales de citación `[TAG#C1]`.
   - Registro de los 20 profesores especializados y 5 agentes transversales con políticas de seguridad y límites de fuentes JSON.

5. [`scripts/validate-ai-catalog.ts`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/scripts/validate-ai-catalog.ts)
   - Script validador estricto que audita correspondencia entre matrículas, agentes, matrices en disco y fuentes aprobadas.

6. [`scripts/test-ai-agents-catalog.ts`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/scripts/test-ai-agents-catalog.ts)
   - Suite automatizada de pruebas locales y estáticas en 5 fases (19 pruebas, 100% de éxito).

7. [`scripts/test-gemini-controlled.ts`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/scripts/test-gemini-controlled.ts)
   - Prueba controlada de una sola llamada a Google Gemini API (`gemini-3.8-flash`) con `thinkingConfig: { thinkingBudget: 0 }`.

8. [`docs/ejecucion/continuacion-produccion/ETAPA-07/evidencias/01_pruebas_catalogo_profesores_ia.txt`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ejecucion/continuacion-produccion/ETAPA-07/evidencias/01_pruebas_catalogo_profesores_ia.txt)
   - Log completo de resultados de las 19 pruebas ejecutadas y aprobadas.

---

### 2.2 Archivos Modificados

1. [`server/agents/types.ts`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/server/agents/types.ts)
   - Se amplió el tipo `AgentRoleType` agregando `'KNOWLEDGE_CURATOR' | 'SAFETY_SUPERVISOR' | 'SUBJECT_SPECIALIST'`.

2. [`server/agents/agentService.ts`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/server/agents/agentService.ts)
   - Se incorporó la función `getAgentForSubject(subjectIdOrCode: string, levelId?: string)` para resolver de forma jerárquica y determinista el profesor IA asignado a una asignatura y nivel.

3. [`server/agents/providers/simulatedProvider.ts`](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/server/agents/providers/simulatedProvider.ts)
   - Se enriqueció el simulador pedagógico de alta fidelidad para dar soporte reproducible a las 9 dimensiones de prueba:
     - Explicación graduada por subnivel escolar.
     - Detección y respuesta bilingüe con andamiaje.
     - Preguntas socráticas orientadas.
     - Generación de ejercicios nuevos no memorísticos.
     - Formateo de etiquetas de citación RAG `[TAG#C1]`.
     - Abstención honesta explícita ante preguntas sin fuentes.
     - Resistencia y neutralización de intentos de jailbreak (`ignore all previous instructions`, `unrestricted hacker`).
     - Protección de privacidad infantil según LOPDP.
     - Protocolo centinela de derivación inmediata ante consultas médicas o angustia psicológica.

