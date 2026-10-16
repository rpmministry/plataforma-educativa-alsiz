# Registro de Pruebas — ETAPA 07: Centro de Conocimiento y Matrices Temáticas

## 1. Entorno de Ejecución
- **Sistema Operativo**: Windows 11 Home (10.0.26100)
- **Node.js**: v22.14.0 (con módulo nativo `node:sqlite` y extensión FTS5 habilitada)
- **Base de Datos de Pruebas**: Base de datos SQLite aislada y efímera (`data/test_alsiz_etapa07.db`)
- **Directorio**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Fecha**: 2026-10-16

---

## 2. Comandos Ejecutados

### A. Suite de Pruebas Automatizadas de la Etapa 07
```bash
npm run test:etapa07
```
**Resultado**: `PASÓ` (Exit code: 0)
- Total de pruebas: 16
- Aprobadas: 16 (100%)
- Fallidas: 0

### B. Pruebas de Regresión Etapa 05 (Seguridad, Identidad, LOPDP y Aislamiento IDOR)
```bash
npm run test:etapa05
```
**Resultado**: `PASÓ` (Exit code: 0)
- Total de pruebas: 16
- Aprobadas: 16 (100%)
- Fallidas: 0

### C. Pruebas de Regresión Etapa 06 (Núcleo Académico LMS, Calificaciones y Competencias)
```bash
npm run test:etapa06
```
**Resultado**: `PASÓ` (Exit code: 0)
- Total de pruebas: 25
- Aprobadas: 25 (100%)
- Fallidas: 0

### D. Verificación Estática de Tipos (TypeScript / Lint)
```bash
npm run lint
```
**Resultado**: `PASÓ` (Exit code: 0, cero errores de tipado en todo el repositorio).

### E. Compilación y Empaquetado de Producción
```bash
npm run build
```
**Resultado**: `PASÓ` (Exit code: 0, compilación completa de Vite y empaquetado de servidor Node con esbuild).

---

## 3. Detalle de Casos de Prueba Ejecutados en `test-etapa-07.ts`

| # | Prueba / Criterio | Categoría | Código Esperado | Código Obtenido | Resultado |
| :---: | :--- | :--- | :---: | :---: | :---: |
| 1 | Migraciones de esquema completas (v001 a v007) | Migraciones | 7 aplicadas | 7 aplicadas | **PASÓ** |
| 2 | Autenticación inicial de los 4 roles de prueba | Autenticación | 4 tokens | 4 tokens | **PASÓ** |
| 3 | Carga de documento de prueba en estado PENDIENTE | Gestión de Fuentes | 201 Created | 201 Created | **PASÓ** |
| 4 | Detección y rechazo de duplicados por SHA-256 | Seguridad & Deduplicación | 409 Conflict | 409 Conflict | **PASÓ** |
| 5 | Segmentación en fragmentos con etiquetas de citación | Extracción & Chunking | 200 OK | 200 OK | **PASÓ** |
| 6 | Docente bloqueado de auto-aprobar fuentes (RBAC 403) | Seguridad & RBAC | 403 Forbidden | 403 Forbidden | **PASÓ** |
| 7 | Estudiante bloqueado de administrar centro de conocimiento | Seguridad & RBAC | 403 Forbidden | 403 Forbidden | **PASÓ** |
| 8 | Aprobación editorial por Administrador con justificación | Control Editorial | 200 OK | 200 OK | **PASÓ** |
| 9 | Búsqueda y recuperación temática en SQLite FTS5 (BM25) | Indexación & Retrieval | 200 OK | 200 OK | **PASÓ** |
| 10 | Publicación de nueva versión y trazabilidad de árbol | Versionado | 201 Created | 201 Created | **PASÓ** |
| 11 | Retirada / desactivación efectiva de fuente en BD | Retirada Efectiva | 200 OK | 200 OK | **PASÓ** |
| 12 | **CRÍTICO: Fuente retirada NO se recupera en motor RAG** | **Retirada Efectiva** | **0 fragmentos** | **0 fragmentos** | **PASÓ** |
| 13 | Validación de entrada: rechazo de contenido insuficiente | Validación | 400 Bad Request | 400 Bad Request | **PASÓ** |
| 14 | Registro y escalamiento de conflicto editorial | Control Editorial | 201 Created | 201 Created | **PASÓ** |
| 15 | Resolución formal de conflicto editorial por Admin | Control Editorial | 200 OK | 200 OK | **PASÓ** |
| 16 | Métricas y resumen estadístico del centro de conocimiento | Telemetría | 200 OK | 200 OK | **PASÓ** |

---

## 4. Evidencias Almacenadas
- Salida completa y textual disponible en: `docs/ejecucion/etapas/ETAPA-07/evidencias/01_suite_pruebas_etapa_07.txt`

