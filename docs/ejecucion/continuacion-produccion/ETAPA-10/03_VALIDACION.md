# Matriz de Aceptación y Validación — Etapa 10: Despliegue de Staging y Pruebas de Aceptación

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-10 (Continuación a Producción)  
**Fecha:** 17 de octubre de 2026  
**Responsable Técnico:** Antigravity (Google DeepMind Team)  

---

## 1. Matriz de Cumplimiento de Requisitos del Prompt 10

| Requisito del Prompt 10 | Estado Técnico | Evidencia Reproducible | Análisis de Cumplimiento |
|---|---|---|---|
| **1. Repo, rama autorizada, lockfile único, npm ci, lint, build y suites en entorno limpio** | **CUMPLIDO** | `evidencias/04_tsc_lint.txt`<br>`evidencias/05_build_artifacts.txt`<br>`evidencias/01_staging_acceptance_suite.txt` | Rama `continuacion-produccion-etapa-10`. Lockfile único `package-lock.json`. Compilación limpia de TypeScript y empaquetado de frontend/backend con cero errores. |
| **2. Documentación y especificación del servicio Node persistente (versión, build, start, disco, DATABASE_PATH, migraciones, salud)** | **CUMPLIDO** | `render.yaml`<br>`Dockerfile`<br>`package.json` | Servicio Node >= 22.12.0 especificado en `render.yaml`. Build: `npm ci && npm run build`, Release: `npm run db:migrate`, Start: `npm run start`, Disco: 10 GB montado en `/data`, `DATABASE_PATH=/data/alsiz.db`, Health: `/api/health`. No se declara creado sin provisión real. |
| **3. Variables backend en panel (no en Git), base limpia con migraciones v013 y cero cuentas demo de admin** | **CUMPLIDO** | `evidencias/02_security_p0_suite.txt`<br>`evidencias/01_staging_acceptance_suite.txt` | En modo producción se omiten estrictamente las semillas dev (`003`, `005`, `007`, `009`). 9 migraciones estructurales v013 aplicadas. 0 cuentas demo predeterminadas en BD limpia. |
| **4. Despliegue de frontend en Vercel, proxy `/api/*` y registro honesto de bloqueo si falta URL del backend** | **BLOQUEADO CONFORME A REGLA** | `api-entry.js`<br>`evidencias/01_staging_acceptance_suite.txt` (CRIT-10) | `api-entry.js` y `vercel.json` implementan el proxy transparente hacia `BACKEND_URL`. Al no disponer de la URL pública del backend en esta fase, **se registró formalmente el bloqueo** sin inventar destinos de rewrite ficticios. |
| **5. Flujo E2E desde URL pública (portada, admin sintético, estudiante sintético, materias, clase, entrega, progreso, tutor IA)** | **VALIDADO LOCALMENTE / BLOQUEADO EN REMOTO** | `evidencias/01_staging_acceptance_suite.txt` (CRIT-05) | Flujo E2E probado de punta a punta con éxito en servidor staging local idéntico. La ejecución desde URL remota pública queda bloqueada a la espera de provisión humana. |
| **6. Persistencia cruzada de datos (guardar progreso, logout, segunda sesión, verificación desde BD no localStorage)** | **CUMPLIDO** | `evidencias/01_staging_acceptance_suite.txt` (CRIT-06) | Calificación (9.5/10) y mensajes del chat socrático fueron recuperados directamente de la base de datos relacional SQLite WAL mediante una segunda sesión limpia. |
| **7. Aislamiento Anti-IDOR y Privacidad LOPDP (expedientes, chats y tareas ajenas bloqueadas HTTP 403)** | **CUMPLIDO** | `evidencias/01_staging_acceptance_suite.txt` (CRIT-07) | Acceso de Estudiante A a expedientes o conversaciones de Estudiante B rechazado con HTTP 403 (`FORBIDDEN_STUDENT_ACCESS`). Representantes aislados estrictamente por vínculo familiar. |
| **8. Simulación de caída de proveedor IA, conmutación automática, log sanitizado y límites** | **CUMPLIDO** | `evidencias/01_staging_acceptance_suite.txt` (CRIT-08) | Demostración real de resiliencia: Google Gemini agotó cuota (HTTP 429), `ProviderManager` conmutó transparentemente a DeepSeek API en 1591ms, devolviendo 325 caracteres útiles sin error 500. |
| **9. Respaldo en caliente (Hot Backup), reinicio y restauración con `PRAGMA integrity_check`** | **CUMPLIDO** | `evidencias/01_staging_acceptance_suite.txt` (CRIT-09) | `createHotBackup` ejecutó `VACUUM INTO` generando archivo atómico. `restoreFromBackup` restauró la base y certificó integridad SQLite con resultado `ok`. Datos persistieron íntegros. |
| **10. Registro de URL pública, commit desplegado, fecha, logs sanitizados y cero acceso a niños** | **CUMPLIDO EN PRE-VUELO / BLOQUEADO EN REMOTO** | `evidencias/` | Se auditaron todos los logs (sin PII ni credenciales reales). Gael y Avril no tuvieron acceso ni intervención en esta etapa. El commit desplegado localmente es `70ad6d3`. |

---

## 2. Conclusión de Validación

El pre-vuelo técnico de staging se encuentra **100% aprobado** en el entorno reproducible local. La suite determinista [`scripts/test-etapa-10-acceptance.ts`](file:///scripts/test-etapa-10-acceptance.ts) valida de manera fidedigna todos los componentes arquitectónicos y contratos de seguridad.

Sin embargo, en estricta observancia del principio de honestidad técnica y de la instrucción explícita del Prompt 10 (**"Si falta la URL pública del backend, registra el bloqueo y espera; no inventes un destino de rewrite"** y **"No declares un servicio creado si solo entregaste instrucciones"**), la etapa se dictamina como **BLOQUEADA PARA DESPLIEGUE REMOTO PÚBLICO**, a la espera de que el administrador humano configure las instancias en los paneles de Render y Vercel.
