# Plan de Ejecución — ETAPA 14: Despliegue y Operación
## Plataforma Educativa ALSIZ para Ekballo Church

- **Etapa**: ETAPA-14
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-14-despliegue-y-operacion`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Líder Técnico**: AI Lead Architect & Senior Engineer (Pair Programming Antigravity)

---

### 1. Objetivos de la Etapa

1. **Gobernanza y Preparación de Despliegue**:
   - Identificar y estructurar con rigor los entornos destino autorizados (Desarrollo local, Staging/Ensayo y Producción) considerando las particularidades del stack híbrido (SPA Vite + Node.js/Express con SQLite WAL).
   - Documentar la totalidad de las variables de entorno de configuración utilizando valores sintéticos y directrices de seguridad para prevenir cualquier fuga de secretos.
   - Definir el protocolo estricto de migraciones de base de datos en producción, comprobaciones pre-despliegue y condiciones de parada de emergencia (*abort criteria*).

2. **Respaldo, Continuidad y Resiliencia**:
   - Definir políticas de copias de seguridad en caliente (*Hot Backup* vía `VACUUM INTO`), frecuencia de ejecución, retención histórica y asignación de responsabilidades.
   - Implementar y ejecutar una prueba real y verificable de restauración en un sandbox aislado, validando la integridad física (`PRAGMA integrity_check = 'ok'`) y la equivalencia de datos mediante hashes SHA-256.
   - Diseñar y proveer herramientas CLI automatizadas (`npm run db:backup`, `npm run db:restore`).

3. **Observabilidad, Monitoreo y Prevención de Fugas**:
   - Configurar mecanismos de registro seguro (logging) con ofuscación obligatoria de credenciales, tokens y datos personales sensibles (cumplimiento LOPDP).
   - Establecer umbrales de alerta operativa para: errores de servidor (5xx), indisponibilidad, cuotas/consumo de proveedores de IA y fallas de ingestión RAG.

4. **Documentación Operativa Integral**:
   - Redactar los 9 manuales y guías operativas exigidas por la gobernanza del proyecto en `docs/operacion/`:
     1. Guía de instalación y despliegue.
     2. Guía de configuración de entornos.
     3. Manual administrativo del sistema.
     4. Manual de actualización curricular y matrices temáticas.
     5. Guía de gestión y evaluación de profesores IA.
     6. Procedimiento formal de respaldo y restauración.
     7. Procedimiento de respuesta a incidentes.
     8. Runbook de diagnóstico y fallos frecuentes.
     9. Registro de versiones y control de cambios (Changelog institucional).

5. **Verificación y Cumplimiento Normativo**:
   - Validar la reproducibilidad del proceso de construcción (`npm run build`) y tipado estricto (`npm run lint`).
   - Diseñar y ejecutar la suite automatizada `scripts/test-etapa-14.ts` y validar regresión total frente a las suites previas (Etapas 05 a 13).
   - Respetar las salvaguardas operativas: **cero publicación a producción, cero cambios remotos en Vercel/dominios y cero `git push` sin autorización humana previa**.

---

### 2. Alcance y Límites

#### Dentro del Alcance:
- Estructuración de perfiles de configuración para Desarrollo, Staging y Producción.
- Creación de utilidades operativas para respaldo, restauración y healthcheck CLI.
- Suite de pruebas de aseguramiento de calidad de despliegue (`test:etapa14`).
- Simulación y verificación real de restauración en entorno de prueba automatizado.
- Elaboración completa y exhaustiva de la documentación técnica y operativa en `docs/operacion/`.
- Registro histórico en bitácora y actualización del índice general.

#### Fuera del Alcance (Exclusiones Expresas):
- Publicación real en servidores de producción o push a ramas remotas (requiere autorización humana explícita).
- Modificación de variables de producción o dominios en la consola remota de Vercel.
- Carga de secretos reales o credenciales productivas en repositorios o archivos de texto.
- Migración de datos personales reales no autorizados.

---

### 3. Dependencias e Insumos

- **Node.js**: v22.x LTS con soporte nativo para `node:sqlite` (SQLite 3 embebido).
- **Herramientas de Build**: `vite` v6.2.3, `esbuild` v0.25.0, `typescript` v5.8.2.
- **Base de Datos**: `server/db/database.ts`, `server/db/migrator.ts`, 12 migraciones SQL versionadas.
- **Servicio de Respaldo**: `server/backup/backupService.ts`.
- **Línea Base Validada**: Etapa 13 aprobada con 141 pruebas exitosas y 0 defectos abiertos.

---

### 4. Riesgos Previos y Mitigaciones

| Riesgo | Impacto | Probabilidad | Mitigación |
|---|---|---|---|
| **R-14.1: Persistencia efímera en Vercel Serverless** | Alto | Alta | Vercel opera funciones stateless con `/tmp` efímero. Para producción permanente con SQLite se documenta arquitectura con persistencia (VPS/Docker/Render/Fly.io) o integración de driver SQLite distribuido (Turso/Litestream). |
| **R-14.2: Fuga accidental de credenciales o secretos en logs** | Crítico | Baja | Implementación de filtros y pruebas automáticas que inspeccionan los logs y descartan tokens, API keys y contraseñas. |
| **R-14.3: Corrupción en base de datos durante respaldo** | Crítico | Baja | Uso obligatorio de `PRAGMA wal_checkpoint(PASSIVE)` y comando transaccional atómico `VACUUM INTO` con verificación de hash SHA-256. |
| **R-14.4: Despliegue prematuro o desincronización de migraciones** | Alto | Baja | El migrador valida checksums SHA-256 en orden secuencial estricto y aborta la transacción (`ROLLBACK`) ante cualquier discrepancia. |

---

### 5. Criterios de Aceptación de la Etapa

1. [ ] El procedimiento de despliegue y empaquetado es 100% reproducible en un entorno limpio sin dependencias fantasma.
2. [ ] Todas las variables de entorno están documentadas con valores sintéticos y explicaciones claras sin divulgar secretos.
3. [ ] Existe un procedimiento automatizado de respaldo y una restauración probada con éxito en prueba aislada con verificación de integridad `PRAGMA integrity_check = 'ok'`.
4. [ ] Existe una estrategia de reversión validada y documentada paso a paso.
5. [ ] Los 9 documentos operativos obligatorios están creados, detallados y alineados con la realidad del código.
6. [ ] La suite de pruebas de la etapa `test:etapa14` y la regresión completa pasan con 100% de éxito.
7. [ ] Se declara con exactitud el estado final: **Preparado para despliegue / Staging validado**, sin anunciar disponibilidad productiva sin validación humana.

