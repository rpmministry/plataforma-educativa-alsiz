# Plan de Ejecución — Etapa 06B: Completar el Currículo y Clases de Avril (8.º EGB Superior)

## 1. Identificación y Contexto
- **Proyecto:** Plataforma Educativa ALSIZ
- **Etapa:** 06B — Completar el currículo y las clases de Avril (8.º EGB Superior)
- **Estudiante Objetivo:** Avril (8.º EGB Superior — 12 años)
- **Fecha de Planificación:** 17 de octubre de 2026
- **Rama de Trabajo:** `continuacion-produccion-etapa-06b`
- **Insumo Rector:** Matriz curricular aprobada en Etapa 05 (`docs/curriculum/estado_completitud_2026_2027.md` y CSV de seguimiento)
- **Restricción Clave:** Trabajar **únicamente** en el currículo de Avril sin alterar materiales de Gael ni de otros niveles educativos.

---

## 2. Objetivos Específicos
1. **Auditoría y purga del catálogo legado:**
   - Erradicar los 15 enlaces Rickroll (`dQw4w9WgXcQ`) y los 23 enlaces al dominio extinto `wisdom-school.edu` detectados en `src/data/dailyClassesAvril.ts`.
   - Resolver la colisión de ID en `class-mat-avril-02` (duplicada en miércoles y viernes en el repositorio legado), desambiguando a `class-mat-avril-03` para el viernes.
   - Normalizar nomenclaturas divergentes como `class-len-avril-lunes-01` a `class-len-avril-01`.
2. **Generación curricular por lotes pequeños (máximo 4 sesiones por lote):**
   - Dividir la Unidad 1 de Avril (23 sesiones) en 11 lotes modulares por asignatura:
     - Lote 1: `LEN-801` (4 clases) — Lengua y Literatura (Prof. Gabriel Neruda)
     - Lote 2: `MAT-801` (3 clases) — Matemáticas (Dra. Sophia Euler)
     - Lote 3: `CNI-801` (2 clases) — Ciencias Naturales (Dr. Leonardo Darwin)
     - Lote 4: `SOC-801` (2 clases) — Estudios Sociales (Dra. Valentina Chronos)
     - Lote 5: `ING-801` (2 clases) — Inglés B1 MCER (Prof. Sarah Mitchell)
     - Lote 6: `ADM-801` (3 clases) — Administración y Marketing (MBA Carla Fonseca)
     - Lote 7: `POL-801` (2 clases) — Ciencias Políticas y Ciudadanía (Lic. Rodrigo Mendoza)
     - Lote 8: `SOFT-801` (2 clases) — Software y Programación (Ing. Alan Turing)
     - Lote 9: `REL-801` (1 clase) — Relación con Dios (Pastor David)
     - Lote 10: `ART-801` (1 clase) — Arte ECA (Maestra Clara Monet)
     - Lote 11: `EFI-801` (1 clase) — Educación Física (Entrenador Mateo)
3. **Estandarización de los 18 campos pedagógicos obligatorios por clase:**
   - ID único, grado y materia, trimestre/unidad, posición temporal, propósito, destreza oficial (DCD MINEDUC / CSTA / MCER B1 / Ekballo), fuente primaria, explicación didáctica para 12 años, vocabulario, ejemplo contextualizado, preguntas socráticas, actividad práctica, actividad de aplicación, evaluación formativa, rúbrica observable (3 niveles), retroalimentación esperada, recursos OER verificados (0 Rickrolls, 0 dominios muertos), adaptación para dificultades y extensión avanzada.
4. **Validación automatizada y consolidación única:**
   - Crear compilador `scripts/build-avril-curriculum.ts` que valide el 100% de los criterios y genere la fuente de verdad en `src/data/dailyClassesAvril.ts`.
   - Verificar tipado TypeScript sin errores (`tsc --noEmit`).

---

## 3. Matriz de Asignaturas y Lotes de Avril (Unidad 1)

| Lote | Código | Asignatura | Categoría | Docente Socrático | Clases | Fechas / Horarios |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **01** | `LEN-801` | Lengua y Literatura | TRONCAL_MINEDUC | Prof. Gabriel Neruda | 4 | Lun 10:45, Mar 08:00, Mié 08:00, Jue 10:45 |
| **02** | `MAT-801` | Matemáticas | TRONCAL_MINEDUC | Dra. Sophia Euler | 3 | Lun 08:00, Mié 10:45, Vie 08:00 |
| **03** | `CNI-801` | Ciencias Naturales | TRONCAL_MINEDUC | Dr. Leonardo Darwin | 2 | Lun 10:00, Jue 08:00 |
| **04** | `SOC-801` | Estudios Sociales | TRONCAL_MINEDUC | Dra. Valentina Chronos | 2 | Mar 10:00, Vie 10:00 |
| **05** | `ING-801` | Inglés (MCER B1) | TRONCAL_MINEDUC | Prof. Sarah Mitchell | 2 | Jue 10:45, Vie 08:45 |
| **06** | `ADM-801` | Administración y Mkt. | COMPLEMENTARIA | MBA Carla Fonseca | 3 | Mar 10:45, Jue 11:30, Vie 10:45 |
| **07** | `POL-801` | Ciencias Políticas | COMPLEMENTARIA | Lic. Rodrigo Mendoza | 2 | Jue 10:00, Vie 12:15 |
| **08** | `SOFT-801`| Software y Prog. | COMPLEMENTARIA | Ing. Alan Turing | 2 | Mié 10:00, Vie 11:30 |
| **09** | `REL-801` | Relación con Dios | FORMACION_CRISTIANA| Pastor David | 1 | Lun 11:30 |
| **10** | `ART-801` | Arte (ECA) | TRONCAL_MINEDUC | Maestra Clara Monet | 1 | Mar 11:30 |
| **11** | `EFI-801` | Educación Física | TRONCAL_MINEDUC | Entrenador Mateo | 1 | Mié 11:30 |

**Total Sesiones:** 23 clases planificadas y distribuidas en la semana del 7 al 11 de septiembre de 2026.

---

## 4. Criterios de Aceptación
1. 100% de las 23 clases estructuradas y validadas con 0 errores.
2. 0 enlaces a videos placeholder / Rickroll (`dQw4w9WgXcQ`).
3. 0 enlaces a dominios extintos (`wisdom-school.edu`).
4. 46 recursos OER institucionales válidos (2 por clase).
5. 0 colisiones de ID (IDs únicos en clases, recursos y actividades).
6. Compilación TypeScript limpia sin regresiones (`npm run lint` / `tsc --noEmit`).
7. Trazabilidad completa con logs reproducibles en `docs/ejecucion/continuacion-produccion/ETAPA-06B/evidencias/`.

