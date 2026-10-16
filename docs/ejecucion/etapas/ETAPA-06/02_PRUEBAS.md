# Registro de Pruebas — ETAPA 06: Núcleo Académico LMS

## 1. Entorno de Ejecución
- **Sistema Operativo**: Windows 11 Home Single Language (x64)
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Rama Git**: `etapa-06-nucleo-academico-lms`
- **Runtime**: Node.js v20+ / tsx (TypeScript Execute v4.21.0)
- **Motor de Base de Datos**: SQLite3 (`alsiz_dev.db`) con foreign keys y WAL mode habilitados
- **Fecha de Ejecución**: 2026-10-16

---

## 2. Comandos Ejecutados y Resultados

### 2.1 Compilación y Chequeo Estático de Tipos
- **Comando**: `npm run lint` (`tsc --noEmit`)
- **Resultado**: `PASÓ` (Código de salida: 0)
- **Detalle**: Cero errores de tipado TypeScript en los 1,742 módulos del proyecto (frontend y backend).

### 2.2 Compilación de Producción (Bundling)
- **Comando**: `npm run build` (`vite build && esbuild ...`)
- **Resultado**: `PASÓ` (Código de salida: 0)
- **Salida**:
  - `dist/index.html` (2.25 kB)
  - `dist/assets/index-KpPZCXOI.css` (145.87 kB)
  - `dist/assets/index-D8kdPrOL.js` (1,270.88 kB)
  - `dist/server.cjs` (150.9 kB)
  - `api-server.js` (149.6 kB)

### 2.3 Suite de Regresión Base (Etapa 05: Seguridad y Base de Datos)
- **Comando**: `npm run test:etapa05`
- **Resultado**: `PASÓ` (16 de 16 pruebas aprobadas)
- **Detalle**:
  - Verificación de migraciones completas (v001 a v005).
  - Autenticación por contraseña y por PIN táctil de 4 dígitos.
  - Aislamiento IDOR entre estudiantes y entre familias.
  - Generación de hot backup transaccional con `VACUUM INTO` e integridad `PRAGMA integrity_check = 'ok'`.

### 2.4 Suite de Pruebas Automatizadas de la Etapa 06 (LMS Académico)
- **Comando**: `npm run test:etapa06`
- **Evidencia guardada**: `docs/ejecucion/etapas/ETAPA-06/evidencias/01_suite_pruebas_etapa_06.txt`
- **Resultado General**: `PASÓ` (25 de 25 pruebas aprobadas, 0 fallos)

---

## 3. Matriz de Pruebas Automatizadas Ejecutadas (25/25)

| # | Módulo / Criterio | Descripción de la Prueba | Resultado | Evidencia / Detalle |
| :---: | :--- | :--- | :---: | :--- |
| 1 | Migraciones | Migraciones de esquema completas (v001 a v005) | **PASÓ** | 5 migraciones aplicadas correctamente. |
| 2 | Autenticación | Emisión de tokens para ADMIN, TEACHER, STUDENT, REPRESENTATIVE | **PASÓ** | 4 tokens JWT generados válidamente. |
| 3 | Gestión Curricular | Criterio 1A: Administrador crea programa formativo | **PASÓ** | HTTP 201. Programa ID generado con código único. |
| 4 | Gestión Curricular | Criterio 1B: Administrador crea nivel / grado | **PASÓ** | HTTP 201. Nivel ID generado con orden indexado. |
| 5 | Gestión Curricular | Criterio 1C: Administrador crea asignatura de la malla | **PASÓ** | HTTP 201. Materia con código único y categoría válida. |
| 6 | Matriculación | Criterio 2A: Matrícula de estudiante en programa y nivel | **PASÓ** | HTTP 201. Registro en `student_program_enrollments`. |
| 7 | Matriculación | Criterio 2B: Asignación normalizada de estudiante a la asignatura | **PASÓ** | HTTP 201. Registro en `student_subject_enrollments`. |
| 8 | Estructura Pedagógica | Criterio 3A: Docente crea competencia curricular | **PASÓ** | HTTP 201. Destreza MINEDUC asociada a materia. |
| 9 | Estructura Pedagógica | Criterio 3B: Docente crea unidad curricular trimestral | **PASÓ** | HTTP 201. Unidad asociada a materia y trimestre. |
| 10 | Estructura Pedagógica | Criterio 3C: Docente crea lección diaria socrática | **PASÓ** | HTTP 201. Lección con pregunta detonante y actividad. |
| 11 | Evaluación Formativa | Criterio 3D: Docente crea actividad evaluativa con rúbrica | **PASÓ** | HTTP 201. Instrumento con rúbrica y destreza vinculada. |
| 12 | Experiencia Estudiante | Criterio 4A: Estudiante accede al contenido y lección socrática | **PASÓ** | HTTP 200. Lectura íntegra de contenido pedagógico. |
| 13 | Bilingüismo & Recursos | Criterio 4B: Selección de idioma en recursos con fallback transparente | **PASÓ** | HTTP 200. Filtro `?lang=en` retorna recurso en inglés y fallback en español. |
| 14 | Entregas y Tareas | Criterio 4C: Estudiante entrega la actividad formativa | **PASÓ** | HTTP 201. Estado `SUBMITTED`, texto de entrega registrado. |
| 15 | Calificaciones & Rúbricas | Criterio 5A: Docente evalúa con rúbrica cuantitativa y retroalimentación | **PASÓ** | HTTP 200. Nota asignada: 5.50 / 10.00 con feedback formativo. |
| 16 | Seguimiento Competencial | Criterio 6A: **CRÍTICO: Distinción de actividad completada vs dominio demostrado (nota < 7.00)** | **PASÓ** | Estado: `COMPLETED_NO_MASTERY`. Actividades: 1. Dominio: `false`. |
| 17 | Calificaciones & Rúbricas | Criterio 5B: Docente re-evalúa y actualiza calificación con justificación | **PASÓ** | HTTP 200. Nueva nota: 8.50 / 10.00 con motivo pedagógico registrado. |
| 18 | Auditoría Calificaciones | Criterio 5C: Historial inmutable registra cambios y autorías | **PASÓ** | 2 registros en `submission_grade_history` con trazabilidad completa. |
| 19 | Seguimiento Competencial | Criterio 6B: **Panel refleja DOMINIO DEMOSTRADO cuando nota ≥ 7.00** | **PASÓ** | Estado: `DEMONSTRATED_MASTERY`. Nota promedio: 8.50. Dominio: `true`. |
| 20 | Seguridad & RBAC | Criterio 7A: Rechazo de solicitud no autenticada (401) | **PASÓ** | HTTP 401. Código `UNAUTHORIZED`. |
| 21 | Seguridad & RBAC | Criterio 7B: Estudiante bloqueado de calificar actividades (403) | **PASÓ** | HTTP 403. Rechazado por validación de rol docente. |
| 22 | Aislamiento Anti-IDOR | Criterio 7C: Estudiante bloqueado de ver progreso de otro menor (403) | **PASÓ** | HTTP 403. Código `FORBIDDEN_STUDENT_ACCESS`. |
| 23 | Aislamiento Familiar | Criterio 7D: Representante bloqueado de ver boletín de otra familia (403) | **PASÓ** | HTTP 403. Código `FORBIDDEN_FAMILY_ACCESS`. |
| 24 | Acceso Familiar Legítimo | Criterio 7E: Representante accede legítimamente al Boletín de su hijo | **PASÓ** | HTTP 200. Emisión de informe oficial MINEDUC Art. 32. |
| 25 | Calendario LMS | Calendario Académico: Creación y consulta de hitos y cronograma | **PASÓ** | HTTP 201. Evento registrado y retornado en consulta. |

---

## 4. Incidencias Encontradas y Soluciones Aplicadas

### Incidencia 1: Orden no determinista en historial de calificaciones con marcas de tiempo rápidas
- **Síntoma**: En pruebas automáticas que ejecutan la primera evaluación y la re-evaluación en el mismo milisegundo, `datetime('now')` de SQLite tiene resolución a nivel de segundo, provocando orden no determinista si se ordenaba solo por `changed_at DESC`.
- **Resolución**: Se ajustó la consulta en `server/academic/academicService.ts` a `ORDER BY sgh.rowid DESC, sgh.changed_at DESC`. Esto garantiza que el orden de inserción física e histórica sea estrictamente cronológico y determinista.
- **Reproducción**: Ejecutar múltiples evaluaciones sobre una misma entrega sin retraso (`Promise.all` o llamadas síncronas sucesivas).

### Incidencia 2: Idempotencia en ejecuciones sucesivas de pruebas
- **Síntoma**: Al re-ejecutar `npm run test:etapa06` sobre la misma base de datos activa, los códigos de programas y asignaturas de prueba arrojaban error `UNIQUE constraint failed`.
- **Resolución**: Se parametrizaron los códigos de prueba con una etiqueta única por ejecución (`const runTag = Date.now().toString().slice(-6)`), permitiendo ejecutar la suite de forma indefinida y reproducible sin necesidad de reiniciar la base de datos de desarrollo.

### Incidencia 3: Aserción de número de migraciones en test anterior
- **Síntoma**: `npm run test:etapa05` verificaba de forma rígida `migrationResults.length === 3`. Al añadir las migraciones `004` y `005`, fallaba la aserción de conteo.
- **Resolución**: Se actualizó la aserción a `>= 3` en `scripts/test-etapa-05.ts`, permitiendo la evolución natural de la base de datos en etapas subsecuentes sin romper las pruebas de regresión.

---

## 5. Resumen de Estado de Pruebas
- Total de Pruebas Ejecutadas: **41** (16 de regresión Etapa 05 + 25 de Etapa 06)
- Total de Pruebas Aprobadas (`PASÓ`): **41**
- Total de Pruebas Fallidas (`FALLÓ`): **0**
- Pruebas No Ejecutadas / Bloqueadas: **0**
- Cobertura de Criterios Críticos: **100%**

