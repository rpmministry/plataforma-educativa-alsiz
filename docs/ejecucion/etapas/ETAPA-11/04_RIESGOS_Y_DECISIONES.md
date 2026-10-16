# Riesgos y Decisiones Técnicas — ETAPA 11
## Migración Controlada de Expedientes y Materiales (Estudiante A y Estudiante G)

- **Etapa**: ETAPA-11
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-11-migracion-controlada-gael-avril`

---

### 1. Decisiones Técnicas Registradas (ADR)

#### ADR-11-01: Desambiguación Quirúrgica de Identificadores Duplicados Legados
- **Contexto**: En los archivos originales de Wisdom School, se reutilizó de forma errónea el mismo ID para 3 lecciones distintas (`class-mat-avril-02`, `class-mat-gael-02`, `class-sci-gael-01`), lo que en un esquema relacional con clave primaria causaba la pérdida silenciosa de 3 lecciones completas, 6 recursos y 9 actividades por sobreescritura.
- **Alternativas Evaluadas**:
  1. *Descartar la segunda lección*: Inaceptable pedagógicamente, se perdían lecciones de fechas y contenidos distintos.
  2. *Modificar a mano los archivos TypeScript legados*: Riesgoso, rompe la trazabilidad histórica de los archivos de origen.
  3. *Desambiguación automática en el motor de migración (Seleccionada)*: El motor detecta colisiones de IDs y les asigna un sufijo determinista `-dup2` en su clave primaria destino, conservando el 100% de las clases sin mutar los archivos de entrada.
- **Decisión**: Se adoptó la Alternativa 3. Se garantiza cero pérdida de lecciones y total reproducibilidad.

#### ADR-11-02: Tratamiento Ético y Criptográfico de Credenciales y Menores
- **Contexto**: Los datos originales contenían contraseñas y PINs en texto plano (`avril`, `gael`, `AVR-2026`, `GAE-2026`). Adicionalmente, se carece de partidas de nacimiento formales, constando únicamente las edades (12 y 8 años).
- **Decisión**:
  1. Hashear de inmediato todas las contraseñas y códigos PIN con `scryptSync` y sal criptográfica de 16 bytes. Queda prohibido persistir o emitir credenciales en texto plano.
  2. Asignar fecha de nacimiento con año base deducido (`2014-01-01` y `2018-01-01`) documentando con total honestidad la aproximación técnica para evitar inventar días o meses ficticios.
  3. Cero notas previas inventadas: las tablas de entregas inician vacías y el progreso de los estudiantes se establece en 0% conforme a la concepción del año lectivo 2026-2027.

#### ADR-11-03: Salvaguarda y Aislamiento de la Base de Datos de Producción
- **Contexto**: El manual exige taxativamente: *"Detén el proceso antes de tocar datos de producción y presenta la evidencia para aprobación."*
- **Decisión**: La migración se diseñó para operar en memoria (`:memory:`) para el modo dry-run y en una base de datos aislada (`data/test_alsiz_staging_etapa11.db`) para el ensayo con persistencia. Se añadió un bloqueo de software que impide la ejecución sobre `data/alsiz.db` (`--production`) hasta que el responsable técnico emita su visto bueno.

---

### 2. Matriz de Riesgos Residuales

| Riesgo Identificado | Severidad | Probabilidad | Mitigación Implementada | Estado |
| :--- | :---: | :---: | :--- | :---: |
| **R1: Dependencia de URLs remotas en 43 guías PDF** | Media | Alta | Se clasificaron como `actualizar` para que en la Etapa 12 se alojen en el Centro de Conocimiento local de ALSIZ. | Mitigado / Trazable |
| **R2: Enlaces a videos simulados (Rickroll)** | Baja | Alta | Se inventariaron las 25 ocurrencias como `actualizar`. No se bloquea el aula; se recomienda asignar videos institucionales. | Identificado |
| **R3: Brecha en cantidad de clases frente a los 200 días MINEDUC** | Media | Alta | El acervo legado cuenta con 43 clases. Se generó el informe de brechas para alimentar el generador de guías en fases posteriores. | Documentado |
| **R4: Intento de re-migración accidental en producción** | Alta | Baja | Idempotencia nativa mediante `ON CONFLICT DO UPDATE` y bloqueo explícito del flag de producción. | Controlado |

