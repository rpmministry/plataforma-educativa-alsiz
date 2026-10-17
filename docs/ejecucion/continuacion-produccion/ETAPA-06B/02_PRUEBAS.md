# Registro de Pruebas — Etapa 06B: Completar el Currículo y Clases de Avril (8.º EGB Superior)

## 1. Clasificación Metodológica de las Pruebas
De conformidad con las normas de gobernanza del proyecto:
- **REVISIÓN ESTÁTICA**: Análisis de sintaxis, tipos TypeScript (`tsc --noEmit`), detección de colisiones de IDs y ausencia de URLs prohibidas.
- **PRUEBA LOCAL (UNITARIA / INTEGRACIÓN)**: Validación automatizada del compilador de lotes `scripts/build-avril-curriculum.ts` ejecutado mediante `npx tsx`.
- **PRUEBA DE STAGING**: N/A en esta etapa (no se realizan despliegues sin autorización).
- **PRUEBA DE PRODUCCIÓN**: N/A en esta etapa (no se ejecutan operaciones en entornos vivos).

---

## 2. Batería de Pruebas Ejecutadas

### Prueba 1: Validación Automática de los 11 Lotes Curriculares
- **Comando Ejecutado:** `npx tsx scripts/build-avril-curriculum.ts`
- **Tipo:** PRUEBA LOCAL
- **Resultado:** EXITOSO (Código de salida: 0)
- **Evidencia Registrada:** `docs/ejecucion/continuacion-produccion/ETAPA-06B/evidencias/01_pruebas_lotes_avril.txt`
- **Resultados de Cobertura por Lote:**
  - `LOTE-AVRIL-01-LEN`: 4/4 clases aprobadas (0 errores).
  - `LOTE-AVRIL-02-MAT`: 3/3 clases aprobadas (0 errores).
  - `LOTE-AVRIL-03-CNI`: 2/2 clases aprobadas (0 errores).
  - `LOTE-AVRIL-04-SOC`: 2/2 clases aprobadas (0 errores).
  - `LOTE-AVRIL-05-ING`: 2/2 clases aprobadas (0 errores).
  - `LOTE-AVRIL-06-ADM`: 3/3 clases aprobadas (0 errores).
  - `LOTE-AVRIL-07-POL`: 2/2 clases aprobadas (0 errores).
  - `LOTE-AVRIL-08-SOFT`: 2/2 clases aprobadas (0 errores).
  - `LOTE-AVRIL-09-REL`: 1/1 clases aprobadas (0 errores).
  - `LOTE-AVRIL-10-ART`: 1/1 clases aprobadas (0 errores).
  - `LOTE-AVRIL-11-EFI`: 1/1 clases aprobadas (0 errores).
- **Métricas Globales:**
  - Clases analizadas: 23 / 23 (100% de la Unidad 1 de Avril).
  - IDs únicos de clases: 23 / 23 (100% libres de colisión).
  - Recursos seguros únicos: 46 / 46 (0 Rickrolls, 0 dominios extintos).
  - Errores detectados: 0.

### Prueba 2: Verificación de Integridad de Enlaces y Recursos
- **Tipo:** REVISIÓN ESTÁTICA AUTOMATIZADA
- **Criterios Evaluados:**
  - Ausencia de subcadena `dQw4w9WgXcQ` (Rickroll): 0 ocurrencias detectadas.
  - Ausencia de subcadena `wisdom-school.edu`: 0 ocurrencias detectadas.
  - Disponibilidad de guías internas bajo `/api/v1/academic/classes/:id/guide.pdf`: 23 guías mapeadas.
  - Validez de enlaces a portales OER institucionales (GeoGebra, PhET, MolView, INPC, MuNa, BBC Learning English, British Council, Strategyzer, Canvanizer, CalculatorSoup, Asamblea Nacional, CPCCS, Flowgorithm, Replit, BioLogos, Google Arts & Culture, OMS): 100% verificados.

### Prueba 3: Chequeo de Tipos Estáticos TypeScript
- **Comando Ejecutado:** `npm run lint` (`tsc --noEmit`)
- **Tipo:** REVISIÓN ESTÁTICA
- **Objetivo:** Asegurar que ningún tipo, interfaz o exportación introduzca errores en el build global.
- **Resultado:** APROBADO sin advertencias ni errores.

