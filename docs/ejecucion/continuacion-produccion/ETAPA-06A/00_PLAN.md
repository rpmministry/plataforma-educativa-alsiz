# Plan de Ejecución — Etapa 06A
## Completar el Currículo y las Clases Socráticas de Gael (4.º EGB Elemental)

**Fecha:** 17 de octubre de 2026  
**Rama:** `continuacion-produccion-etapa-06a`  
**Responsable:** Antigravity AI / Asistente de Producción  
**Estado:** EJECUTADO / PENDIENTE DE REVISIÓN HUMANA  

---

### 1. Contexto y Objetivos
A partir de la auditoría y matriz curricular aprobada en la **Etapa 05** (`docs/curriculum/estado_completitud_2026_2027.md` y `docs/curriculum/matriz_seguimiento_curriculo_2026_2027.csv`), se determinó la existencia de 20 clases diarias legadas para Gael que presentaban anomalías críticas:
- 11 enlaces tipo "Rickroll" (`dQw4w9WgXcQ`).
- 20 enlaces a un dominio extinto inaccesible (`wisdom-school.edu`).
- Claves primarias e IDs duplicados (`class-sci-gael-01`, `class-mat-gael-02`).
- Ausencia de códigos oficiales de Destrezas con Criterio de Desempeño (DCD) del Ministerio de Educación de Ecuador.
- Estructura incompleta frente a los estándares de la plataforma socrática.

El objetivo central de la **Etapa 06A** es corregir, enriquecer y consolidar el currículo de la **Unidad 1 de Gael (4.º EGB Elemental)** mediante la ejecución estructurada por lotes pequeños (máximo 5 clases por lote), cubriendo las 9 asignaturas correspondientes a su nivel y edad (8 años), con aislamiento total respecto a los contenidos de Avril (8.º EGB Superior).

---

### 2. Taxonomía de las 9 Asignaturas de Gael
El plan académico de Gael comprende 9 asignaturas con identidad docente y pedagógica propia:
1. **LEN-401 — Lengua y Literatura** (Troncal MINEDUC): Maestra Lucía.
2. **MAT-401 — Matemáticas** (Troncal MINEDUC, Método CPA Singapur): Prof. Lucas.
3. **CNI-401 — Ciencias Naturales** (Troncal MINEDUC): Dra. Maya Selva.
4. **SOC-401 — Estudios Sociales** (Troncal MINEDUC): Cap. Diego Mapamundi.
5. **ING-401 — Inglés EFL Pre-A1** (Troncal MINEDUC): Teacher Emma.
6. **SOFT-401 — Software y Programación** (Complementaria Siglo XXI / STEM CSTA): Robot Codi.
7. **REL-401 — Relación con Dios** (Formación Cristiana Ekballo Church): Prof. David.
8. **ART-401 — Educación Cultural y Artística / ECA** (Troncal MINEDUC): Tía Pincelita.
9. **EFI-401 — Educación Física** (Troncal MINEDUC): Profe Alex.

---

### 3. Requisitos Obligatorios por Clase (18 Campos Pedagógicos)
Cada lección diaria debe contener sin excepción los siguientes 18 campos pedagógicos estructurados:
1. **ID único:** Clave primaria secuencial sin colisiones (`class-*-gael-0*`).
2. **Grado y Asignatura:** Grado formativo (`4.º EGB Elemental (Gael - 8 años)`), `subjectId` y `studentId`.
3. **Trimestre / Unidad:** Ubicación curricular explícita en la Unidad 1.
4. **Fecha y horario:** Fecha calendario real (iniciando el 7 de septiembre de 2026), día de la semana y bloque horario.
5. **Propósito de aprendizaje:** Meta didáctica formativa que responde a la pregunta "¿para qué aprendo esto?".
6. **Destreza DCD y Fuente oficial:** Código oficial MINEDUC (e.g., `LL.2.1.1`, `M.2.1.14`, `CN.2.1.1`, etc.) o marco formativo autónomo/CSTA, citando la fuente primaria.
7. **Explicación didáctica ajustada:** Introducción motivadora, lectura contextualizada y explicación pedagógica socrática comprensible para un niño de 8 años.
8. **Vocabulario:** Mínimo dos términos clave definidos con ejemplos de la vida infantil.
9. **Ejemplo contextualizado:** Situación cercana y real en el contexto del Ecuador o la vida cotidiana del estudiante.
10. **Preguntas socráticas graduadas:** Secuencia de preguntas reflexivas (comprensión, relación y transferencia).
11. **Actividad práctica:** Reto manipulativo o experimental con título, instrucciones paso a paso y lista de materiales sencillos.
12. **Actividad de aplicación:** Creación tangible o evidencia personal con entregable definido.
13. **Evaluación formativa:** Descripción cualitativa de la evidencia observable de aprendizaje.
14. **Rúbrica de evaluación:** Criterio y 3 descriptores de nivel observable (*Inicial*, *En desarrollo*, *Consolidado*).
15. **Retroalimentación esperada:** Mensaje socrático cálido, motivador y específico por parte del profesor IA.
16. **Recursos seguros y legales:** Enlaces educativos abiertos (OERs) reales y verificados (PhET, GeoGebra, Mathigon, StoryWeaver, Scratch MIT, etc.) y guías didácticas internas (`/api/v1/academic/classes/:id/guide.pdf`). Cero placeholders, cero Rickrolls y cero dominios extintos.
17. **Adaptación para dificultades:** Estrategia multisensorial o andamiaje para cuando el estudiante presente dudas o lentitud en el ritmo.
18. **Extensión para avance rápido:** Reto de profundización o indagación para cuando el estudiante domine rápidamente el contenido.

---

### 4. Estructura de Lotes Planificada (25 Clases en Total)
- **Lote 1 (LEN-401):** 5 clases (`class-len-gael-01` a `05`) — Narrativa, secuencia temporal, sustantivos, adjetivos y creación de personajes en Book Creator.
- **Lote 2 (MAT-401):** 5 clases (`class-mat-gael-01` a `05`) — Valor posicional Base 10, semirrecta numérica, figuras geométricas planas, suma con reagrupación y multiplicación como matrices.
- **Lote 3 (CNI-401):** 4 clases (`class-sci-gael-01` a `04`) — Seres vivos y materia inerte, órganos vegetales y fotosíntesis, vertebrados e invertebrados, hábitats y cadena alimenticia.
- **Lote 4 (SOC-401):** 3 clases (`class-soc-gael-01` a `03`) — Familia y convivencia armónica, servidores comunitarios y servicios básicos, división territorial (cantón, provincia, 4 regiones).
- **Lote 5 (ING-401):** 3 clases (`class-ing-gael-01` a `03`) — Phonics & palabras CVC, safari de animales y colores, partes del cuerpo y comandos TPR (Simon Says).
- **Lote 6 (SOFT-401):** 2 clases (`class-soft-gael-01` a `02`) — Algoritmos desenchufados y depuración, animación por bloques interactiva en Scratch MIT.
- **Lote 7 (REL-401):** 1 clase (`class-rel-gael-01`) — Dios Creador, mayordomía ambiental y gratitud cotidiana.
- **Lote 8 (ART-401):** 1 clase (`class-art-gael-01`) — Arte del Upcycling, escultura 3D con materiales reciclados y teoría del color.
- **Lote 9 (EFI-401):** 1 clase (`class-efi-gael-01`) — Circuito psicomotriz de 4 estaciones, equilibrio y decálogo del juego limpio.

---

### 5. Criterios de Aceptación y No Regresión
- Cobertura del 100% de las 25 clases requeridas para la Unidad 1 de Gael.
- 0 errores tipográficos o de sintaxis en `src/types/index.ts` y compilación completa limpia con `npx tsc --noEmit`.
- Unicidad absoluta de IDs de clases (25/25) e IDs de recursos (50/50).
- 0 alteraciones en los archivos de Avril (`dailyClassesAvril.ts`, `avrilCurriculumDataPart*.ts`).
- Generación y persistencia de evidencias reproducibles en `docs/ejecucion/continuacion-produccion/ETAPA-06A/evidencias/`.

