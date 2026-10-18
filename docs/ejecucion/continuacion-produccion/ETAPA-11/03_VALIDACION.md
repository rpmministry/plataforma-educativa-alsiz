# Matriz de Validación y Conformidad — Etapa 11: Preparación del Inicio de Clases y Pase Controlado a Producción

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-11`  
**Estado:** **APROBADA PARA REVISIÓN HUMANA**  
**Semáforo:** **AMARILLO (Apertura Condicionada a Aprobación Humana)**  

---

## 1. Matriz Integral de Cumplimiento por Requisito

### 1.1 Identidad y Datos

| # | Requisito del Prompt 11 | Estado | Evidencia Reproducible | Justificación Técnica |
| :-: | :--- | :---: | :--- | :--- |
| **ID-1** | Las cuentas de Gael y Avril existen en la base persistente del backend y el login por la interfaz utiliza esas cuentas. | ✅ CONFORME | [`evidencias/05_real_accounts_prod_verification.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/05_real_accounts_prod_verification.txt) | Cuentas `usr-real-avril`, `usr-real-gael` activas en `data/alsiz.db`. El login en `SchoolContext.tsx` invoca `/api/v1/auth/login` y `/pin-login` sin fallback silencioso. |
| **ID-2** | Los representantes están correctamente vinculados y los permisos cruzados son rechazados. | ✅ CONFORME | [`evidencias/01_acceptance_suite_output.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/01_acceptance_suite_output.txt) (E11-ID-02) | Mauricio Andrade Luna vinculado en `student_representatives` a ambos hijos con custodia primaria. Intentos de acceso cruzado denegados con HTTP 403 (`FORBIDDEN_FAMILY_ACCESS`). |
| **ID-3** | Sus grados, asignaturas, calendario y recursos corresponden al inventario aprobado. | ✅ CONFORME | [`evidencias/01_acceptance_suite_output.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/01_acceptance_suite_output.txt) (E11-ID-01, E11-CURR-01) | Avril matriculada en 8.° EGB Superior (11 materias); Gael en 4.° EGB Elemental (9 materias). Calendario 2026-2027 en 3 trimestres. |
| **ID-4** | El progreso que se tenía que preservar está migrado con informe de equivalencia, y los campos sin evidencia siguen marcados como pendientes. | ✅ CONFORME | [`ETAPA-04/06_CIERRE.md`](file:///docs/ejecucion/continuacion-produccion/ETAPA-04/06_CIERRE.md) | 0 notas ficticias (0 entregas en BD). Cédula, dirección y consentimiento LOPDP formal marcados como `PENDIENTE_VERIFICACION`. |

---

### 1.2 Malla Curricular

| # | Requisito del Prompt 11 | Estado | Evidencia Reproducible | Justificación Técnica |
| :-: | :--- | :---: | :--- | :--- |
| **CUR-1** | Cada asignatura activa tiene un profesor IA asignado. | ✅ CONFORME | [`evidencias/04_ai_catalog_validation.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/04_ai_catalog_validation.txt) | 20 materias activas mapeadas a 20 profesores virtuales especializados en la tabla `ai_agents` de SQLite. |
| **CUR-2** | Cada sesión prevista en la matriz anual tiene clase, objetivo, actividad, evaluación y recursos válidos adecuados a la edad. | 🟡 CONFORME EN UNIDAD 1 (Liberación Progresiva) | [`ETAPA-06A/evidencias/01_pruebas_lotes_gael.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-06A/evidencias/01_pruebas_lotes_gael.txt)<br>[`ETAPA-06B/evidencias/01_pruebas_lotes_avril.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-06B/evidencias/01_pruebas_lotes_avril.txt) | Las 48 clases de Unidad 1 (25 Gael + 23 Avril) cuentan con los 18 campos pedagógicos completos. Las semanas 2 a 40 se liberan por trimestre antes de su inicio. |
| **CUR-3** | No hay lecciones repetidas por IDs, clases huérfanas, enlaces placeholder o evaluaciones inaccesibles. | ✅ CONFORME | [`evidencias/01_acceptance_suite_output.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/01_acceptance_suite_output.txt) (E11-CURR-02, E11-CURR-03) | 48 IDs únicos en Unidad 1. 0 enlaces Rickroll (`dQw4w9WgXcQ`), 0 dominios extintos (`wisdom-school.edu`). |
| **CUR-4** | Los materiales bilingües no simulan una traducción que no existe. | ✅ CONFORME | [`scripts/lotes-avril/lote5-ing.ts`](file:///scripts/lotes-avril/lote5-ing.ts)<br>[`scripts/lotes/lote5-ing.ts`](file:///scripts/lotes/lote5-ing.ts) | Clases de inglés (`ING-401` e `ING-801`) redactadas originalmente en inglés para su nivel (Pre-A1 fonético y B1 CLIL), sin traducción automática. |
| **CUR-5** | Los recursos abiertos tienen licencia/uso apropiado comprobado. | ✅ CONFORME | [`evidencias/01_acceptance_suite_output.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/01_acceptance_suite_output.txt) (E11-CURR-04) | Uso de simuladores PhET Colorado (CC-BY 4.0), GeoGebra (CC-BY-NC-SA), Scratch MIT (CC-BY-SA 2.0) y British Council Kids. |

---

### 1.3 IA y Conocimiento

| # | Requisito del Prompt 11 | Estado | Evidencia Reproducible | Justificación Técnica |
| :-: | :--- | :---: | :--- | :--- |
| **IA-1** | Se ha probado al menos un proveedor real desde la interfaz pública. | ✅ CONFORME | [`ETAPA-08/evidencias/02_live_providers_test.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-08/evidencias/02_live_providers_test.txt)<br>[`ETAPA-10/evidencias/01_staging_acceptance_suite.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-10/evidencias/01_staging_acceptance_suite.txt) | DeepSeek API (`deepseek-flash`) probado en vivo (latencia 1025-1990ms). Google Gemini API (`gemini-3.8-flash`) probado con conmutación limpia. |
| **IA-2** | Cada agente asignado tiene matriz versionada, fuentes aprobadas y pruebas pedagógicas. | ✅ CONFORME | [`evidencias/04_ai_catalog_validation.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/04_ai_catalog_validation.txt) | 20 matrices temáticas en `docs/ai-agents/matrices-tematicas/` con las 11 secciones pedagógicas obligatorias. 22 fuentes en estado `APROBADO`. |
| **IA-3** | Las respuestas del agente citan los recursos realmente recuperados cuando corresponda. | ✅ CONFORME | [`server/routes/agentRoutes.ts`](file:///server/routes/agentRoutes.ts#L210-L240) | Etiquetas formales `[TAG#C1]` emitidas únicamente si están presentes de forma literal en la respuesta del LLM. |
| **IA-4** | El usuario ve una notificación clara si una respuesta procede del fallback simulado. | ✅ CONFORME | [`server/agents/providers/providerManager.ts`](file:///server/agents/providers/providerManager.ts#L220-L226) | En degradación elegante, el orquestador reporta `isFallback: true` y `providerName: 'SIMULATED_LOCAL'`. |
| **IA-5** | Los secretos no están en el bundle ni en repositorios. | ✅ CONFORME | [`evidencias/03_dist_secrets_scan.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/03_dist_secrets_scan.txt)<br>[`evidencias/02_security_p0_suite.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/02_security_p0_suite.txt) | Escaneo de 44 bundles en `dist/`: 0 claves detectadas. `.env` y `.env.local` excluidos en `.gitignore`. Cero secretos en Git. |

---

### 1.4 Operación y Seguridad

| # | Requisito del Prompt 11 | Estado | Evidencia Reproducible | Justificación Técnica |
| :-: | :--- | :---: | :--- | :--- |
| **OPS-1** | Base persistente, migraciones, respaldo y restauración comprobados. | ✅ CONFORME | [`evidencias/01_acceptance_suite_output.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/01_acceptance_suite_output.txt) (E11-OPS-01, E11-OPS-02) | SQLite WAL persistente con 13 migraciones en `schema_migrations`. Hot backup con `VACUUM INTO`, validación SHA-256 e integridad restaurada ok. |
| **OPS-2** | No quedan cuentas de demo con credenciales conocidas en producción. | ✅ CONFORME | [`server/db/migrator.ts`](file:///server/db/migrator.ts#L92-L105)<br>[`evidencias/02_security_p0_suite.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/02_security_p0_suite.txt) (P0-TEST-06) | En `NODE_ENV=production`, `migrator.ts` salta estrictamente `003_seed_dev_data.sql`. En la nube la base inicia en blanco con cero cuentas demo. |
| **OPS-3** | Las sesiones y cookies siguen las reglas de seguridad acordadas. | ✅ CONFORME | [`server/routes/authRoutes.ts`](file:///server/routes/authRoutes.ts#L38-L47) | Cookie `alsiz_session` con `HttpOnly; SameSite=Lax; Max-Age=259200` (72h) y `Secure` en HTTPS. |
| **OPS-4** | Las variables de entorno están presentes en el entorno correcto y las pruebas de salud no exponen datos. | ✅ CONFORME | [`evidencias/02_security_p0_suite.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/02_security_p0_suite.txt) (P0-TEST-10) | `/api/health` y `/api/v1/agents/health` exponen únicamente estado booleano y nombres de modelos, sin tokens ni secretos. |
| **OPS-5** | La URL de Vercel y el backend responden correctamente; el endpoint de salud público no revela secretos. | 🟡 CONFORME EN STAGING / CONDICIONADO EN NUBE | [`ETAPA-10/06_CIERRE.md`](file:///docs/ejecucion/continuacion-produccion/ETAPA-10/06_CIERRE.md) | Vercel SPA carga portada. El backend responde en proxy. En la nube, Vercel requiere provisión final de `BACKEND_URL` apuntando a Render/VPS. |
| **OPS-6** | Se documentan responsable operativo, procedimiento de incidencia, límites de consumo de IA y procedimiento de suspensión de acceso. | ✅ CONFORME | [`ACTA_PASE_PRODUCCION.md`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/ACTA_PASE_PRODUCCION.md) | Responsable: Mauricio Andrade Luna. Límite: 15 req/min, 100 req/día por alumno. Suspensión en `/api/v1/auth/login` (`AUTH_ACCOUNT_INACTIVE`). |

---

### 1.5 Autorización y Alcance

| # | Requisito del Prompt 11 | Estado | Evidencia Reproducible | Justificación Técnica |
| :-: | :--- | :---: | :--- | :--- |
| **LEG-1** | Se distingue en los textos institucionales el servicio de apoyo/tutoría educativa de cualquier modalidad formal que requiera autorización o reconocimiento oficial. No publicites título oficial ni acreditación no verificada. | ✅ CONFORME | [`src/components/layout/Footer.tsx`](file:///src/components/layout/Footer.tsx#L48-L60)<br>[`src/components/dashboard/StudentDashboard.tsx`](file:///src/components/dashboard/StudentDashboard.tsx#L354) | Descargo visible en Footer: plataforma de apoyo y homeschooling; no otorga títulos estatales directos ni código AMIE. "Acreditación" cambiada a "Portafolio Formativo". |
| **LEG-2** | Antes de activar cuentas reales, informa al responsable de los riesgos residuales y solicita su aprobación expresa. | ✅ CONFORME | [`04_RIESGOS_Y_DECISIONES.md`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/04_RIESGOS_Y_DECISIONES.md) | Riesgos residuales documentados (cronograma progresivo de semanas 2-40, provisión de `BACKEND_URL` en Vercel, entrega segura de PIN). |
| **LEG-3** | No realices push, merge, cambio de rama de producción ni deploy productivo sin autorización explícita del responsable. | ✅ CONFORME | [`evidencias/00_git_baseline.txt`](file:///docs/ejecucion/continuacion-produccion/ETAPA-11/evidencias/00_git_baseline.txt) | Cero `git push`, cero `git merge`, trabajo aislado en la rama `continuacion-produccion-etapa-11`. Detención obligatoria respetada. |

---

## 2. Dictamen Consolidado de la Matriz

- **Requisitos Totales Auditados:** 23
- **Conformidad Plena (Verde):** 21
- **Conformidad Condicionada / Liberación Progresiva (Amarillo):** 2 (Semanas 2 a 40 por trimestre y provisión de `BACKEND_URL` en nube por el administrador)
- **Bloqueos Críticos (Rojo):** 0
- **Semáforo Operativo para Apertura a Estudiantes:** **`AMARILLO — APERTURA CONDICIONADA A AUTORIZACIÓN HUMANA`**

