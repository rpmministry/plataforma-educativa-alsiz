# Plan de Ejecución — Etapa 07: Catálogo Completo de Profesores IA por Asignatura y Nivel

## 1. Identificación y Contexto
- **Proyecto:** Plataforma Educativa ALSIZ para Ekballo Church
- **Etapa:** 07 — Catálogo Completo de Profesores IA por Asignatura y Nivel
- **Estudiantes Objetivo:** Gael (4.º EGB Elemental — 8 años) y Avril (8.º EGB Superior — 12 años)
- **Fecha de Planificación:** 17 de octubre de 2026
- **Rama de Trabajo:** `continuacion-produccion-etapa-07`
- **Commit Base:** `570a61cfce48c7ddafec68aa1035cf6677f55bdd` (`570a61c feat(etapa-06b): completar curriculo y clases socraticas de Avril (8.o EGB)`)
- **Insumo Rector:** Catálogo curricular aprobado (`docs/curriculum/catalogo_asignaturas_niveles_grados.md`), clases socráticas de Gael (Etapa 06A) y Avril (Etapa 06B), y migración 004/006/008/009 del esquema relacional.

---

## 2. Objetivos Específicos

1. **Matriz Integral de Cobertura de Agentes (`docs/ai-agents/matriz_cobertura_agentes.md`):**
   - Mapear el 100% de las materias activas de Gael (9 materias) y Avril (11 materias) con su código, grado, profesor IA asignado, versión de matriz temática, fuentes del Centro de Conocimiento aprobadas y estado de pruebas.
   - Definir los 5 roles transversales obligatorios (Coordinador Académico, Tutor Socrático, Evaluador de Rúbricas, Curador de Conocimiento, Supervisor de Seguridad) con sus límites estrictos de permisos y entradas/salidas.

2. **Diferenciación Pedagógica Radical por Grado y Asignatura:**
   - Evitar prompts genéricos reutilizados para materias y edades disímiles.
   - Diseñar personalidades docentes y metodologías específicas:
     - Para Gael (8 años): Enfoque lúdico, concreto-pictórico (CPA), Phonics TPR, Scratch interactivo, fábulas y metáforas sencillas.
     - Para Avril (12 años): Método socrático analítico, preálgebra formal, método científico IMRyD, debate dialéctico B1+, programación en Python/JS y Modelo Canvas.

3. **Matrices Temáticas Versionadas (`docs/ai-agents/matrices-tematicas/`):**
   - Redactar matrices temáticas exhaustivas para cada asignatura y profesor IA con 12 secciones normalizadas: competencias, secuencia, prerrequisitos, vocabulario graduado, errores frecuentes, explicaciones graduadas (3 niveles), actividades, respuestas de referencia, rúbricas analíticas (0-10), fuentes válidas, versiones y límites éticos de seguridad.

4. **Ampliación Idempotente del Esquema SQL (`server/db/migrations/013_ai_agents_complete_catalog.sql`):**
   - Sin modificar migraciones previas ya aplicadas, actualizar la restricción `CHECK` de `role_type` para incorporar `KNOWLEDGE_CURATOR`, `SAFETY_SUPERVISOR` y `SUBJECT_SPECIALIST`.
   - Sembrar fuentes de conocimiento aprobadas en `knowledge_sources` y fragmentos en `knowledge_chunks` con etiquetas de citación formal (`[CODIGO#C1]`) para cada materia.
   - Registrar los 20 profesores especializados y los 5 agentes transversales con directivas de sistema, restricciones de seguridad y restricción de fuentes `allowed_source_codes_json`.

5. **Validador Automatizado de Cobertura Curricular (`scripts/validate-ai-catalog.ts`):**
   - Verificar de forma programática que cada materia en la matrícula activa de Gael y Avril cuente con agente especializado, matriz temática en disco y fuentes aprobadas con fragmentos indexados.

6. **Suite de Pruebas Multi-Criterio de Agentes (`scripts/test-ai-agents-catalog.ts`):**
   - Probar sistemáticamente los 9 criterios exigidos por agente:
     1. Explicación adecuada a su grado.
     2. Respuesta bilingüe.
     3. Pregunta socrática.
     4. Ejercicio nuevo.
     5. Uso correcto de citas formales.
     6. Honestidad y abstención pedagógica ante falta de fuentes.
     7. Resistencia a prompt injection / jailbreaks.
     8. Protección de datos de menores (LOPDP).
     9. Derivación a una persona responsable ante crisis emocional o preguntas médicas.
   - Probar en proveedor simulado de alta fidelidad y en llamada controlada a Google Gemini API (`gemini-3.8-flash`).
   - Marcar el estado de los agentes estrictamente en base a pruebas reales (`ACTIVO` solo tras superar las pruebas; de lo contrario `PENDIENTE`).

---

## 3. Matriz de Cobertura Proyectada

### 3.1 Nivel 4.º EGB Elemental — Gael (8 años)
| Código | Materia | Categoría | Agente / Profesor IA | Rol | Fuentes Aprobadas | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| `LEN-401` | Lengua y Literatura | TRONCAL | Maestra Lucía (`prof_gael_lengua`) | `SOCRATIC_TUTOR` | `MINEDUC-LEN-ELEM-4` | PENDIENTE DE PRUEBAS |
| `MAT-401` | Matemáticas | TRONCAL | Prof. Lucas (`prof_gael_matematicas`) | `SOCRATIC_TUTOR` | `MINEDUC-MAT-ELEM-4` | PENDIENTE DE PRUEBAS |
| `CNI-401` | Ciencias Naturales | TRONCAL | Dra. Maya Selva (`prof_gael_ciencias`) | `SOCRATIC_TUTOR` | `MINEDUC-CNI-ELEM-4` | PENDIENTE DE PRUEBAS |
| `SOC-401` | Estudios Sociales | TRONCAL | Cap. Diego Mapamundi (`prof_gael_sociales`) | `SOCRATIC_TUTOR` | `MINEDUC-SOC-ELEM-4` | PENDIENTE DE PRUEBAS |
| `ING-401` | Inglés EFL | AMPLIACION | Teacher Emma (`prof_gael_ingles`) | `SOCRATIC_TUTOR` | `MCER-EFL-PRE-A1` | PENDIENTE DE PRUEBAS |
| `SOFT-401`| Software y Prog. | COMPLEMENTARIA | Robot Codi (`prof_gael_software`) | `SOCRATIC_TUTOR` | `CSTA-SCRATCH-ELEM-4` | PENDIENTE DE PRUEBAS |
| `REL-401` | Relación con Dios | FORMACION_CRISTIANA| Prof. David (`prof_gael_religion`) | `DOCTRINAL_MENTOR` | `EKB-VAL-ELEM-4` | PENDIENTE DE PRUEBAS |
| `ART-401` | Arte (ECA) | TRONCAL | Tía Pincelita (`prof_gael_arte`) | `SOCRATIC_TUTOR` | `MINEDUC-ECA-ELEM-4` | PENDIENTE DE PRUEBAS |
| `EFI-401` | Educación Física | TRONCAL | Profe Alex (`prof_gael_edfisica`) | `SOCRATIC_TUTOR` | `MINEDUC-EFI-ELEM-4` | PENDIENTE DE PRUEBAS |

### 3.2 Nivel 8.º EGB Superior — Avril (12 años)
| Código | Materia | Categoría | Agente / Profesor IA | Rol | Fuentes Aprobadas | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| `LEN-801` | Lengua y Literatura | TRONCAL | Prof. Gabriel Neruda (`prof_avril_lengua`) | `SOCRATIC_TUTOR` | `MINEDUC-LEN-SUP-8` | PENDIENTE DE PRUEBAS |
| `MAT-801` | Matemáticas | TRONCAL | Dra. Sophia Euler (`prof_avril_matematicas`) | `SOCRATIC_TUTOR` | `MINEDUC-MAT-SUP-8` | PENDIENTE DE PRUEBAS |
| `CNI-801` | Ciencias Naturales | TRONCAL | Dr. Leonardo Darwin (`prof_avril_ciencias`) | `SOCRATIC_TUTOR` | `MINEDUC-CNI-SUP-8` | PENDIENTE DE PRUEBAS |
| `SOC-801` | Estudios Sociales | TRONCAL | Dra. Valentina Chronos (`prof_avril_sociales`) | `SOCRATIC_TUTOR` | `MINEDUC-SOC-SUP-8` | PENDIENTE DE PRUEBAS |
| `ING-801` | Inglés Avanzado B1 | AMPLIACION | Prof. Sarah Mitchell (`prof_avril_ingles`) | `SOCRATIC_TUTOR` | `MCER-EFL-B1-SUP-8` | PENDIENTE DE PRUEBAS |
| `SOFT-801`| Software y Prog. | COMPLEMENTARIA | Ing. Alan Turing (`prof_avril_software`) | `SOCRATIC_TUTOR` | `CSTA-PYTHON-SUP-8` | PENDIENTE DE PRUEBAS |
| `POL-801` | Ciencias Políticas | COMPLEMENTARIA | Lic. Rodrigo Mendoza (`prof_avril_politica`) | `SOCRATIC_TUTOR` | `CONST-ECU-POL-8` | PENDIENTE DE PRUEBAS |
| `ADM-801` | Admin. y Marketing | COMPLEMENTARIA | MBA Carla Fonseca (`prof_avril_administracion`) | `SOCRATIC_TUTOR` | `LEAN-CANVAS-ADM-8` | PENDIENTE DE PRUEBAS |
| `REL-801` | Relación con Dios | FORMACION_CRISTIANA| Pastor David (`prof_avril_religion`) | `DOCTRINAL_MENTOR` | `EKB-COSMOVISION-8` | PENDIENTE DE PRUEBAS |
| `ART-801` | Arte (ECA) | TRONCAL | Maestra Clara Monet (`prof_avril_arte`) | `SOCRATIC_TUTOR` | `MINEDUC-ECA-SUP-8` | PENDIENTE DE PRUEBAS |
| `EFI-801` | Educación Física | TRONCAL | Entrenador Mateo (`prof_avril_edfisica`) | `SOCRATIC_TUTOR` | `MINEDUC-EFI-SUP-8` | PENDIENTE DE PRUEBAS |

### 3.3 Roles Transversales Institucionales
| Código Agente | Nombre | Rol | Alcance | Límites Clave |
| :--- | :--- | :--- | :--- | :--- |
| `coord_academico_global` | Coordinador Académico ALSIZ | `COORDINATOR` | Global institucional | Solo lectura/recomendación; no altera notas. |
| `tutor_socratico_transversal`| Tutor Socrático Metacognitivo | `SOCRATIC_TUTOR` | Transversal K-12 | No da respuestas directas; guía con preguntas. |
| `evaluador_formativo_rubricas`| Evaluador Pedagógico por Rúbricas | `ESSAY_EVALUATOR` | Evaluación formativa | Sugerencias pedagógicas; notas oficiales son humanas. |
| `curador_conocimiento_alsiz`| Curador Editorial de Conocimiento | `KNOWLEDGE_CURATOR` | Centro de Conocimiento | Propone fuentes en `EN_REVISION`; no autoaprueba. |
| `supervisor_seguridad_infantil`| Supervisor de Seguridad Infantil | `SAFETY_SUPERVISOR` | Filtro de seguridad LOPDP | Detección de riesgos y derivación inmediata. |

---

## 4. Fases de Ejecución

1. **Fase 1: Documentación y Arquitectura Conceptual:**
   - Crear `docs/ai-agents/matriz_cobertura_agentes.md`.
   - Generar las matrices temáticas modulares en `docs/ai-agents/matrices-tematicas/`.
2. **Fase 2: Persistencia y Migración SQL Idempotente:**
   - Crear migración `server/db/migrations/013_ai_agents_complete_catalog.sql`.
   - Actualizar tipos en `server/agents/types.ts`.
3. **Fase 3: Motor y Proveedor Simulado de Alta Fidelidad:**
   - Reforzar `server/agents/providers/simulatedProvider.ts` para cubrir los 25 agentes en las 9 dimensiones de prueba.
4. **Fase 4: Validador de Catálogo y Cobertura:**
   - Implementar `scripts/validate-ai-catalog.ts` para contrastar matrícula vs. agentes vs. fuentes.
5. **Fase 5: Suite de Pruebas Automatizadas y Evidencias:**
   - Desarrollar y ejecutar `scripts/test-ai-agents-catalog.ts` en base de datos de prueba aislada.
   - Ejecutar prueba controlada de Gemini API para validar conectividad real.
   - Generar evidencias reproducibles en `docs/ejecucion/continuacion-produccion/ETAPA-07/evidencias/`.
6. **Fase 6: Cierre Documental y Auditoría:**
   - Generar `01_CAMBIOS.md`, `02_PRUEBAS.md`, `03_VALIDACION.md`, `04_RIESGOS_Y_DECISIONES.md`, `05_REVERSA.md` y `06_CIERRE.md`.
   - Detener la ejecución sin push ni merge hacia main.

