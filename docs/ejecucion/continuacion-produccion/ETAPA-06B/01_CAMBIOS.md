# Registro de Cambios — Etapa 06B: Completar el Currículo y Clases de Avril (8.º EGB Superior)

## 1. Resumen Ejecutivo
Se implementó la arquitectura curricular completa y modular para **Avril (8.º EGB Superior — 12 años)** correspondiente a la Unidad 1 del ciclo lectivo 2026-2027. La generación se ejecutó estrictamente por **lotes pequeños y verificables** (máximo 4 clases por lote), abarcando las 11 asignaturas oficiales y complementarias distribuidas en 23 sesiones pedagógicas socráticas.

---

## 2. Inventario de Archivos Creados y Modificados

### Archivos Creados:
1. `scripts/lotes-avril/lote1-len.ts`: Lote 1 — Lengua y Literatura (`LEN-801`, 4 clases). Docente: Prof. Gabriel Neruda.
2. `scripts/lotes-avril/lote2-mat.ts`: Lote 2 — Matemáticas (`MAT-801`, 3 clases). Docente: Dra. Sophia Euler.
3. `scripts/lotes-avril/lote3-cni.ts`: Lote 3 — Ciencias Naturales (`CNI-801`, 2 clases). Docente: Dr. Leonardo Darwin.
4. `scripts/lotes-avril/lote4-soc.ts`: Lote 4 — Estudios Sociales (`SOC-801`, 2 clases). Docente: Dra. Valentina Chronos.
5. `scripts/lotes-avril/lote5-ing.ts`: Lote 5 — Inglés MCER B1 (`ING-801`, 2 clases). Docente: Prof. Sarah Mitchell.
6. `scripts/lotes-avril/lote6-adm.ts`: Lote 6 — Administración y Marketing (`ADM-801`, 3 clases). Docente: MBA Carla Fonseca.
7. `scripts/lotes-avril/lote7-pol.ts`: Lote 7 — Ciencias Políticas (`POL-801`, 2 clases). Docente: Lic. Rodrigo Mendoza.
8. `scripts/lotes-avril/lote8-soft.ts`: Lote 8 — Software y Programación (`SOFT-801`, 2 clases). Docente: Ing. Alan Turing.
9. `scripts/lotes-avril/lote9-rel.ts`: Lote 9 — Relación con Dios (`REL-801`, 1 clase). Docente: Pastor David.
10. `scripts/lotes-avril/lote10-art.ts`: Lote 10 — Arte ECA (`ART-801`, 1 clase). Docente: Maestra Clara Monet.
11. `scripts/lotes-avril/lote11-efi.ts`: Lote 11 — Educación Física (`EFI-801`, 1 clase). Docente: Entrenador Mateo.
12. `scripts/lotes-avril/index.ts`: Punto de consolidación de los 11 lotes y exportación de `AVRIL_LOTES` y `CONSOLIDATED_AVRIL_CLASSES`.
13. `scripts/build-avril-curriculum.ts`: Compilador, validador de 20 reglas de negocio y generador de la fuente de verdad.
14. `docs/ejecucion/continuacion-produccion/ETAPA-06B/00_PLAN.md`: Plan de trabajo de la etapa.
15. `docs/ejecucion/continuacion-produccion/ETAPA-06B/01_CAMBIOS.md`: Este documento de cambios.
16. `docs/ejecucion/continuacion-produccion/ETAPA-06B/evidencias/01_pruebas_lotes_avril.txt`: Log reproducible del compilador con 0 errores.

### Archivos Modificados:
1. `src/data/dailyClassesAvril.ts`:
   - Sustitución completa de las 23 clases legadas deficientes por las 23 clases socráticas rigurosamente estructuradas (263.902 bytes).
   - Erradicación de los 15 enlaces Rickroll (`dQw4w9WgXcQ`).
   - Erradicación de los 23 enlaces a dominios extintos (`wisdom-school.edu`).
   - Corrección de la colisión de ID en `class-mat-avril-02` (desambiguada a `class-mat-avril-03` para el viernes).
   - Normalización de `class-len-avril-lunes-01` a `class-len-avril-01`.

---

## 3. Detalle de Correcciones y Purga de Anomalías

| Anomalía Legada | Causa Raíz | Solución Aplicada en Etapa 06B | Estado |
| :--- | :--- | :--- | :---: |
| **15 Enlaces Rickroll** | Placeholders de video `dQw4w9WgXcQ` copiados en la plantilla inicial | Sustituidos por simuladores OER reales (GeoGebra, PhET, MolView, Strategyzer, Flowgorithm, Replit, BioLogos) | RESUELTO (0 detectados) |
| **23 Dominios Extintos** | Enlaces a `https://wisdom-school.edu/guides/...` que no existen | Sustituidos por rutas internas de guías pedagógicas ALSIZ `/api/v1/academic/classes/:id/guide.pdf` | RESUELTO (0 detectados) |
| **Colisión de ID en MAT-801** | `class-mat-avril-02` asignada simultáneamente a miércoles y viernes | Miércoles se mantiene como `class-mat-avril-02` y viernes se desambigua a `class-mat-avril-03` | RESUELTO (100% únicos) |
| **ID no estándar en LEN-801** | `class-len-avril-lunes-01` rompía la secuencia numérica | Renombrada a `class-len-avril-01`, dejando la secuencia limpia del 01 al 04 | RESUELTO |
| **Ausencia de Destrezas DCD** | Clases legadas carecían de destrezas oficiales y fuentes primarias | Incorporadas DCDs oficiales de MINEDUC EGB Superior, CSTA 2, MCER B1 y Ekballo | RESUELTO |
| **Falta de Rigor Socrático** | Clases reducidas a textos de relleno sin rúbricas ni preguntas profundas | 18 campos pedagógicos completos por clase con dialéctica, rúbricas de 3 niveles y ejemplos contextualizados | RESUELTO |

