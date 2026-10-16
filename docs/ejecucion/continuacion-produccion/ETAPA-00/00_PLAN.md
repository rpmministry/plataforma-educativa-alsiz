# Plan de Trabajo — ETAPA 00: Auditoría Reproducible Post-Etapas 00–14
## Plataforma Educativa ALSIZ para Ekballo Church

- **Etapa**: ETAPA-00 (Auditoría Técnica de Continuación a Producción)
- **Fecha**: 2026-10-16
- **Auditor**: Líder Técnico AI (Pair Programming Antigravity)
- **Objetivo**: Diagnosticar con máxima rigurosidad técnica el estado real del repositorio local tras la culminación declarada de las Etapas 00 a 14, contrastando la documentación histórica con el código real, reproduciendo pruebas y levantando el inventario exhaustivo sin alterar código de producción.

---

### 1. Alcance y Reglas de Diagnóstico
1. **Garantía de Cero Mutación de Producción**:
   - Esta etapa es estrictamente de diagnóstico y auditoría forense.
   - Queda terminantemente prohibido refactorizar código, arreglar defectos o modificar la lógica de producción.
2. **Aislamiento de Entorno**:
   - Creación y trabajo sobre la rama `continuacion-produccion-etapa-00`.
   - Cero operaciones destructivas (`git reset --hard`, `git clean -fd`, borrado de archivos no creados en la sesión).
   - Verificación de bases de datos antes de cualquier ejecución: las pruebas deben correr contra bases de datos SQLite temporales en `data/test_*.db` o en memoria.
3. **Privacidad y Salvaguarda de Credenciales (LOPDP y NIST)**:
   - Prohibido imprimir o divulgar claves API, contraseñas, PINs o hashes en reportes, commits o conversaciones.
   - Cero exposición de datos de estudiantes reales en logs o reportes.
4. **Verificación Sistemática de las 10 Dimensiones de Auditoría**:
   - Protocolo común de Git (HEAD vs origin/main).
   - Inspección de conexión UI <-> `/api/v1` en 12 áreas funcionales.
   - Clasificación taxonómica de capacidades.
   - Censo e inventario de agentes IA (migraciones vs interfaz).
   - Inventario de clases de Avril y Gael (lecciones, recursos, enlaces repetidos, huecos temporales).
   - Ejecutabilidad de migraciones en despliegue previsto y análisis de semillas.
   - Reproducción aislada de suites 05 a 14, `npm run lint` y `npm run build`.
   - Distinción entre proveedor simulado y llamadas reales a LLMs.
   - Análisis de CI en GitHub y divergencias entre lockfiles (`package-lock.json` vs `bun.lock`).
   - Reconciliación matemática de conteos de pruebas (153 vs 163).

---

### 2. Metodología de Ejecución
1. **Fase 1: Protocolo de Git y Línea Base**:
   - Ejecutar `Get-Location`, `git rev-parse`, `git status`, `git branch`, `git log`.
   - Crear rama aislada `continuacion-produccion-etapa-00`.
2. **Fase 2: Inspección Estática de Código y Conectividad Frontend-Backend**:
   - Grep de rutas `/api/v1` en `src/`.
   - Análisis de `SchoolContext.tsx`, `StudentLoginModal.tsx`, `AccessView.tsx`, `DailyClassView.tsx`, `ProgressView.tsx`, `ParentDashboard.tsx` y `AdminShell.tsx`.
3. **Fase 3: Auditoría de Agentes IA y Datos Curriculares**:
   - Análisis de migraciones 008 y 009 de `ai_agents`.
   - Script de inventario y cruce estático de clases de Avril y Gael (`dailyClassesAvril.ts` y `dailyClassesGael.ts`).
4. **Fase 4: Reproducción de Pruebas y Compilación**:
   - Ejecución de `npm run lint` (`tsc --noEmit`).
   - Ejecución de `npm run build`.
   - Ejecución secuencial de `test:etapa05` a `test:etapa14` registrando salidas y verificando persistencia aislada.
5. **Fase 5: Documentación y Matriz de Realidad Funcional**:
   - Generación de `MATRIZ_REALIDAD_FUNCIONAL.md`.
   - Registro de evidencias en `evidencias/`.
   - Generación de documentos normativos de la etapa (00 a 06).
   - Definición de backlog priorizado P0 / P1 / P2 para las siguientes etapas.

