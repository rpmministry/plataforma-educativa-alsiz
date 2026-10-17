# Registro de Riesgos y Decisiones — Etapa 06B: Completar el Currículo y Clases de Avril (8.º EGB Superior)

## 1. Registro de Decisiones de Arquitectura y Diseño

### Decisión 1: Modularización en 11 archivos de lote (`scripts/lotes-avril/loteX-*.ts`)
- **Contexto:** Generar 23 clases completas con 18 campos pedagógicos en un solo archivo produce un documento de más de 3.500 líneas, propenso a errores de edición y difícil de auditar.
- **Decisión:** Segmentar la Unidad 1 en 11 archivos por materia, unificándolos a través de `scripts/lotes-avril/index.ts` y compilándolos con `scripts/build-avril-curriculum.ts`.
- **Impacto:** Mantenibilidad óptima, trazabilidad aislada por docente socrático y validación granular por asignatura.

### Decisión 2: Desambiguación de la colisión de ID en `class-mat-avril-02`
- **Contexto:** En el archivo legado `src/data/dailyClassesAvril.ts`, la clase de matemáticas del miércoles y la del viernes compartían el mismo identificador: `class-mat-avril-02`.
- **Decisión:** Mantener `class-mat-avril-02` para la sesión del miércoles (Ecuaciones con m.c.m. y propiedad distributiva) y renombrar a `class-mat-avril-03` la sesión del viernes (Modelado geométrico y financiero).
- **Impacto:** Unicidad estricta de claves primarias sin romper referencias relacionales ni el progreso del estudiante.

### Decisión 3: Normalización de `class-len-avril-lunes-01`
- **Contexto:** La primera clase de Lengua contenía la palabra "lunes" en el ID (`class-len-avril-lunes-01`), mientras que las demás usaban numeración ordinal (`class-len-avril-01`, `02`, `03`).
- **Decisión:** Renombrar la primera clase a `class-len-avril-01`, y secuenciar las tres siguientes como `02`, `03` y `04`.
- **Impacto:** Coherencia estilística y compatibilidad con los selectores del frontend.

### Decisión 4: Reemplazo sistemático del dominio ficticio `wisdom-school.edu`
- **Contexto:** Las 23 clases legadas tenían enlaces a `https://wisdom-school.edu/guides/Guia_Didactica_*.pdf`, un dominio muerto o inexistente.
- **Decisión:** Enrutar todas las guías a endpoints internos de la API de la plataforma: `/api/v1/academic/classes/:id/guide.pdf`.
- **Impacto:** Se erradica la dependencia externa, garantizando que el sistema sirva las guías desde el backend local o almacenamiento seguro.

---

## 2. Matriz de Gestión de Riesgos

| Riesgo Identificado | Severidad | Probabilidad | Mitigación Implementada |
| :--- | :---: | :---: | :--- |
| **Sobrecarga cognitiva por lenguaje infantilizado** | Media | Baja | Se fijó el nivel pedagógico en 12 años (8.º EGB Superior), incorporando epistemología, dialéctica, historia crítica, bioquímica, economía Lean y algoritmia formal. |
| **Colisiones de ID con el currículo de Gael** | Alta | Baja | Todos los identificadores de Avril utilizan el prefijo y sufijo `-avril-` (`class-mat-avril-01`, etc.), asegurando aislamiento total respecto a Gael (`-gael-`). |
| **Incompatibilidad con `isolatedModules` en TypeScript** | Baja | Media | Se utilizó `export type { AvrilCurriculumLote }` en `index.ts` para cumplir con las directivas estrictas de TypeScript sin emitir advertencias. |
| **Inconsistencias en el calendario anual** | Media | Baja | Las 23 fechas y horarios se alinearon estrictamente con la semana del 7 al 11 de septiembre de 2026 y los horarios oficiales de Avril en `mockData.ts`. |

