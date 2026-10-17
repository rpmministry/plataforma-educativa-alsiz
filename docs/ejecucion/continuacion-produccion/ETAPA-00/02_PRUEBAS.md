# Registro de Pruebas Reproducidas — ETAPA 00
## Plataforma Educativa ALSIZ para Ekballo Church

- **Etapa**: ETAPA-00 (Auditoría Técnica Post-Etapas 00–14)
- **Fecha**: 2026-10-16
- **Entorno**: Windows 11 / Node.js v24.19.0 / npm 11.17.0 / SQLite3 (`node:sqlite`)
- **Tipo de Pruebas**: **PRUEBA LOCAL** (en sandbox SQLite temporal) y **REVISIÓN ESTÁTICA**

---

### 1. Resumen de Ejecución y Reproducción

| Prueba / Suite | Tipo de Prueba | Comando Ejecutado | Resultados | Estado |
|---|---|---|---|---|
| **Verificación de Tipos TypeScript** | REVISIÓN ESTÁTICA | `npm run lint` (`tsc --noEmit`) | 0 errores en ~12 segundos | **PASÓ** |
| **Compilación y Bundling** | PRUEBA LOCAL | `npm run build` | Vite (1750 módulos transformados), esbuild `server.cjs` (300.6 KB) y `api-server.js` (299.5 KB) | **PASÓ** |
| **Suite Etapa 05** (Auth & RBAC) | PRUEBA LOCAL | `npm run test:etapa05` | 16 casos ejecutados, 16 pasaron, 0 fallaron | **PASÓ** |
| **Suite Etapa 06** (LMS Core) | PRUEBA LOCAL | `npm run test:etapa06` | 25 casos ejecutados, 25 pasaron, 0 fallaron | **PASÓ** |
| **Suite Etapa 07** (Knowledge RAG) | PRUEBA LOCAL | `npm run test:etapa07` | 16 casos ejecutados, 16 pasaron, 0 fallaron | **PASÓ** |
| **Suite Etapa 08** (AI Multiagente) | PRUEBA LOCAL | `npm run test:etapa08` | 17 casos ejecutados, 17 pasaron, 0 fallaron | **PASÓ** |
| **Suite Etapa 09** (Aula Interactiva) | PRUEBA LOCAL | `npm run test:etapa09` | 14 casos ejecutados, 14 pasaron, 0 fallaron | **PASÓ** |
| **Suite Etapa 10** (Privacidad & Padres)| PRUEBA LOCAL | `npm run test:etapa10` | 15 casos ejecutados, 15 pasaron, 0 fallaron | **PASÓ** |
| **Suite Etapa 11** (Migración Currículo) | PRUEBA LOCAL | `npm run test:etapa11` | 16 casos ejecutados, 16 pasaron, 0 fallaron | **PASÓ** |
| **Suite Etapa 12** (Cursos y Oficios) | PRUEBA LOCAL | `npm run test:etapa12` | 12 casos ejecutados, 12 pasaron, 0 fallaron | **PASÓ** |
| **Suite Etapa 13** (Auditoría Integral) | PRUEBA LOCAL | `npm run test:etapa13` | 10 casos ejecutados, 10 pasaron, 0 fallaron | **PASÓ** |
| **Suite Etapa 14** (Despliegue & Ops) | PRUEBA LOCAL | `npm run test:etapa14` | 12 casos ejecutados, 12 pasaron, 0 fallaron | **PASÓ** |
| **Inventario de Clases** | REVISIÓN ESTÁTICA | Script `audit_inventory.ts` | 43 lecciones, 129 actividades, 86 recursos analizados | **PASÓ** |
| **Existencia de CI GitHub** | REVISIÓN ESTÁTICA | `Test-Path .\.github` | Carpeta inexistente en raíz (Falso) | **FALLÓ (NO EXISTE)** |
| **Consistencia Lockfile Bun** | REVISIÓN ESTÁTICA | Grep `zod`/`nodemailer` en `bun.lock` | Dependencias ausentes en `bun.lock` | **FALLÓ (DESFASADO)** |

---

### 2. Conciliación Matemática de Conteos de Prueba (Item 10)
En los informes de la ETAPA 14 existía una aparente discrepancia de cifras:
- En `ETAPA-14/06_CIERRE.md` se reportaban **153 pruebas automatizadas**.
- En `ETAPA-14/02_PRUEBAS.md` se reportaban **163 verificaciones totales**.

#### Reproducción exacta de la sumatoria:
1. **Pruebas Automatizadas en Suites (`test-etapa-*.ts`)**:
   - `test:etapa05`: 16 pruebas
   - `test:etapa06`: 25 pruebas
   - `test:etapa07`: 16 pruebas
   - `test:etapa08`: 17 pruebas
   - `test:etapa09`: 14 pruebas
   - `test:etapa10`: 15 pruebas
   - `test:etapa11`: 16 pruebas
   - `test:etapa12`: 12 pruebas
   - `test:etapa13`: 10 pruebas
   - **Subtotal Etapas 05 a 13**: **141 pruebas**
   - `test:etapa14`: 12 pruebas
   - **Total de pruebas en scripts de assertion**: **153 pruebas automatizadas (100% éxito)**.
2. **Verificaciones Operacionales y de Infraestructura Adicionales**:
   - 1 suite de comprobación de tipado (`npm run lint`).
   - 4 bloques diagnósticos de salud del sistema (`npm run health`).
   - 1 proceso de Hot Backup real con hash SHA-256 (`npm run db:backup`).
   - 1 proceso de restauración en base sandbox con `PRAGMA integrity_check` (`npm run db:restore`).
   - 3 bundles generados por la compilación de producción (`dist/index.html`, `dist/server.cjs`, `api-server.js`).
   - **Subtotal de verificaciones operacionales**: **10 verificaciones**.
3. **Total consolidado**:
   $$153 \text{ pruebas automatizadas} + 10 \text{ verificaciones operacionales} = 163 \text{ verificaciones totales}$$

**Dictamen**: Ambos números son verídicos, consistentes y matemáticamente reproducibles al 100%.

---

### 3. Diferenciación de Proveedor Simulado vs Proveedores Reales (Item 8)
- Todas las suites ejecutadas (`test:etapa07`, `test:etapa08`, `test:etapa09`, `test:etapa13`) se ejecutaron utilizando la degradación elegante hacia el proveedor simulado local:
  - Clase: `SimulatedProvider` (`server/agents/providers/simulatedProvider.ts`).
  - Resultado: Resuelve respuestas socráticas deterministas sin consumir cuotas de Gemini, DeepSeek u OpenRouter.
- No se ejecutó `scripts/benchmark-ai-free.ps1` para no consumir cuotas reales de manera inadvertida, en estricto cumplimiento de la regla 8.

---

### 4. Evidencias Físicas Generadas
Los registros de salida crudos han sido preservados en:
- `docs/ejecucion/continuacion-produccion/ETAPA-00/evidencias/git_status.txt`
- `docs/ejecucion/continuacion-produccion/ETAPA-00/evidencias/npm_lint_build.txt`
- `docs/ejecucion/continuacion-produccion/ETAPA-00/evidencias/test_results.txt`
- `docs/ejecucion/continuacion-produccion/ETAPA-00/evidencias/inventory_analysis.txt`

