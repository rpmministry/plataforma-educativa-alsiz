# Registro de Pruebas y Validación — Etapa 10: Despliegue de Staging y Pruebas de Aceptación

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-10 (Continuación a Producción)  
**Fecha de Evaluación:** 17 de octubre de 2026  
**Responsable Técnico:** Antigravity (Google DeepMind Team)  

---

## 1. Clasificación Rigurosa de Pruebas (Regla 8)

Conforme a las directrices mandatorias del proyecto ALSIZ, todas las pruebas se catalogan estrictamente en cuatro categorías:
1. **REVISIÓN ESTÁTICA:** Análisis de tipos TypeScript, verificación de lockfiles, escaneo de bundles y auditoría de archivos de configuración.
2. **PRUEBA LOCAL (Pre-Vuelo de Staging):** Ejecución automatizada en un servidor local controlado idéntico a staging, con base de datos SQLite WAL limpia, omitting seed dev data y evaluando los 10 criterios de aceptación.
3. **PRUEBA DE STAGING (Entorno Remoto Público en la Nube):** Pruebas contra la URL pública de staging (`https://...`). **Estado: BLOQUEADA** a la espera de la URL pública del backend persistente que debe aprovisionar el administrador humano en Render.
4. **PRUEBA DE PRODUCCIÓN:** **NO EJECUTADA / NO APLICABLE** (estrictamente prohibida en esta etapa).

---

## 2. Resultados de Revisiones Estáticas

| ID | Tipo de Prueba | Comando / Herramienta | Resultado | Evidencia |
|---|---|---|---|---|
| **EST-01** | REVISIÓN ESTÁTICA | `npm run lint` (`tsc --noEmit`) | ✅ APROBADA (0 errores de compilación) | `evidencias/04_tsc_lint.txt` |
| **EST-02** | REVISIÓN ESTÁTICA | Auditoría de Lockfile único (`package-lock.json`) | ✅ APROBADA (Sin `yarn.lock` ni `pnpm-lock.yaml`) | `evidencias/01_staging_acceptance_suite.txt` |
| **EST-03** | REVISIÓN ESTÁTICA | `npm run test:security-scan` (44 archivos en `dist/`) | ✅ APROBADA (0 claves ni llamadas directas) | `evidencias/03_security_scan_dist.txt` |
| **EST-04** | REVISIÓN ESTÁTICA | `npm run build` (Vite SPA + bundles Node) | ✅ APROBADA (Compilación en 11.65s) | `evidencias/05_build_artifacts.txt` |
| **EST-05** | REVISIÓN ESTÁTICA | Inspección de `render.yaml` y `api-entry.js` | ✅ APROBADA (Disco /data, release migrate, proxy seguro) | Código fuente inspeccionado |

---

## 3. Resultados de Pruebas Locales de Staging (Suite Determinista)

Ejecución de la suite `npm run test:etapa10-acceptance` (`scripts/test-etapa-10-acceptance.ts`):

| Criterio | Nombre del Criterio | Tipo | Resultado | Detalle de Ejecución y Métricas |
|---|---|---|---|---|
| **ETAPA-10-CRIT-01** | Entorno limpio y lockfile único | PRUEBA LOCAL | ✅ PASÓ | `package-lock.json` presente. Entorno libre de colisiones. |
| **ETAPA-10-CRIT-02** | Especificación del servicio Node persistente | PRUEBA LOCAL | ✅ PASÓ | Blueprint Render verificado: disco montado `/data`, comando de release (`npm run db:migrate`), salud `/api/health`. |
| **ETAPA-10-CRIT-03** | Base de staging limpia con 9 migraciones estructurales v013 | PRUEBA LOCAL | ✅ PASÓ | 9 migraciones estructurales aplicadas. 4 migraciones semilla omitidas en producción. 0 usuarios predeterminados en BD limpia. |
| **ETAPA-10-CRIT-04** | Bootstrap de Administrador Sintético | PRUEBA LOCAL | ✅ PASÓ | Administrador creado con credenciales NIST SP 800-63B y hashing scrypt. Login exitoso vía `POST /api/v1/auth/login` (HTTP 200). |
| **ETAPA-10-CRIT-05** | Flujo integral E2E con cuentas sintéticas | PRUEBA LOCAL | ✅ PASÓ | Portada OK. Alumno sintético creado (`STU-MVCOCTGR-903`). Asignaturas cargadas. Lección consultada. Entrega enviada (`sub-e3d5b23803db`). Calificación asignada (9.5/10). Tutor IA socrático (`agt-gael-mat-01`) respondió con fundamento pedagógico. |
| **ETAPA-10-CRIT-06** | Persistencia cruzada en base relacional (no sólo `localStorage`) | PRUEBA LOCAL | ✅ PASÓ | Cierre de sesión y apertura de segunda sesión limpia. Se verificó directamente de la base SQLite WAL la calificación de 9.5/10 y los 2 mensajes de la conversación socrática. |
| **ETAPA-10-CRIT-07** | Aislamiento estricto Anti-IDOR (Estudiantes y Familias) | PRUEBA LOCAL | ✅ PASÓ | Estudiante A intentó acceder a notas de Estudiante B: **HTTP 403 (`FORBIDDEN_STUDENT_ACCESS`)**. Estudiante A intentó acceder al chat de Estudiante B: **HTTP 403 (`FORBIDDEN_STUDENT_ACCESS`)**. |
| **ETAPA-10-CRIT-08** | Simulación de caída de proveedor IA y cascada transparente | PRUEBA LOCAL | ✅ PASÓ | Se produjo contingencia de cuota en Google Gemini (HTTP 429). `ProviderManager` conmutó automáticamente a DeepSeek API en 1591ms, devolviendo 325 caracteres útiles con **cero error 500**. |
| **ETAPA-10-CRIT-09** | Respaldo en caliente (Hot Backup), reinicio y restauración | PRUEBA LOCAL | ✅ PASÓ | Respaldo generado mediante `VACUUM INTO` (872 KB, checksum verificado). Restauración ejecutada y validada con `PRAGMA integrity_check = ok`. Alumno y calificación intactos tras restauración. |
| **ETAPA-10-CRIT-10** | Detección y registro de bloqueo para despliegue público remoto | PRUEBA LOCAL | ✅ PASÓ | Se detectó la ausencia de la variable `BACKEND_URL`. Conforme a la regla mandatoria ("Si falta la URL pública del backend, registra el bloqueo y espera; no inventes un destino de rewrite"), el sistema registró formalmente el bloqueo sin inventar rewrites ficticios. |

---

## 4. Estado de Pruebas de Staging Remotas (URL Pública)

| Requerimiento Remoto | Estado Actual | Causa Raíz / Justificación | Acción Requerida del Operador Humano |
|---|---|---|---|
| Despliegue en Render del backend persistente | **BLOQUEADA** | Falta aprovisionar el servicio en el panel de Render con volumen de 10 GB montado en `/data`. | Seguir el checklist operativo y vincular el Blueprint `render.yaml`. |
| Despliegue en Vercel del frontend | **BLOQUEADA** | Falta configurar la variable `BACKEND_URL` en el panel de Vercel apuntando a la URL generada por Render. | Ingresar en Vercel Project Settings y definir `BACKEND_URL=https://<nombre-backend>.onrender.com`. |
| Pruebas E2E desde dominio público HTTPS | **BLOQUEADA** | Requiere que ambos servicios remotos se encuentren operativos en la nube. | Ejecutar `STAGING_URL=https://... npm run test:etapa10-acceptance` una vez desplegado. |

---

## 5. Resumen Cuantitativo de Pruebas

- **Total de criterios evaluados en pre-vuelo local:** 10 / 10 (100% Aprobados).
- **Pruebas de seguridad P0 ejecutadas:** 10 / 10 (100% Aprobadas).
- **Archivos escaneados en bundle dist/:** 44 (0 secretos detectados).
- **Pruebas remotas en la nube:** 0 ejecutadas / 3 bloqueadas formalmente (Cero falsas afirmaciones de éxito remoto).

