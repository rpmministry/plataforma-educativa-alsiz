# Registro de Pruebas — Etapa 02: Persistencia Real y Arquitectura Temporal de Despliegue
**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha de Ejecución:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-02`  

---

## 1. Clasificación Metodológica de Pruebas

Siguiendo las directrices del proyecto, las pruebas se clasifican estrictamente según su entorno y naturaleza. No se marca como ejecutada ninguna prueba sin ejecución verificada y evidencia reproducible.

- **PRUEBA LOCAL:** Pruebas automatizadas y simulaciones ejecutadas en el entorno de desarrollo local.
- **REVISIÓN ESTÁTICA:** Análisis de tipos TypeScript, verificación de sintaxis, escaneo de artefactos y auditoría de configuraciones.
- **PRUEBA DE STAGING:** Validaciones en entorno preproductivo (Pendiente de aprovisionamiento de infraestructura por el administrador).
- **PRUEBA DE PRODUCCIÓN:** Validaciones finales en producción (No ejecutadas; prohibidas en esta etapa).

---

## 2. Resultados de Pruebas Locales (PRUEBA LOCAL)

### 2.1 Suite de Arquitectura y Persistencia (`test:etapa02`)
- **Comando:** `npm run test:etapa02`
- **Script:** `scripts/test-etapa-02.ts`
- **Resultado:** 10 / 10 PASADAS (100% de éxito)
- **Evidencia:** `docs/ejecucion/continuacion-produccion/ETAPA-02/evidencias/01_test_etapa_02.txt`

| Identificador | Caso de Prueba | Tipo | Resultado | Detalle Verificado |
| :--- | :--- | :--- | :--- | :--- |
| **E2-TEST-01** | Normalización de ruta en `DATABASE_PATH` | PRUEBA LOCAL | ✅ PASÓ | Rutas relativas se resuelven contra la raíz del proyecto; rutas absolutas de volumen montado (`/data/alsiz.db`, `C:\...`) se preservan intactas sin prefijos erróneos. |
| **E2-TEST-02** | Detección de conectividad activa de BD | PRUEBA LOCAL | ✅ PASÓ | `isDatabaseConnected()` ejecuta `PRAGMA quick_check(1)` y valida que el archivo SQLite responde síncronamente con `'ok'`. |
| **E2-TEST-03** | Inspección no destructiva de migraciones | PRUEBA LOCAL | ✅ PASÓ | `checkMigrationsStatus()` compara las 12 migraciones en disco contra `_migrations` sin alterar el estado y valida checksums normalizados con estado `SYNCED`. |
| **E2-TEST-04** | Contrato de salud `/api/health` enriquecido | PRUEBA LOCAL | ✅ PASÓ | Responde `status: 200`, `apiVersion: '1.0.0'`, `uptime`, `database.connected: true`, estado de migraciones, proveedores activos como booleanos y cero datos sensibles. |
| **E2-TEST-05** | Proxy reverso local (`api-entry.js`) | PRUEBA LOCAL | ✅ PASÓ | Servidor Express de ensayo recibe peticiones proxyficadas correctamente con método HTTP, ruta `/api/test`, cabeceras y cookies del cliente. |
| **E2-TEST-06** | Preservación de cookies `Set-Cookie` en proxy | PRUEBA LOCAL | ✅ PASÓ | La respuesta del proxy incluye la cabecera `Set-Cookie` enviada por el backend con directivas `HttpOnly`, `Path=/`, `SameSite=Lax`. |
| **E2-TEST-07** | Contingencia estructurada 503 en Vercel | PRUEBA LOCAL | ✅ PASÓ | Cuando `BACKEND_URL` no está definida, `api-entry.js` responde inmediatamente HTTP 503 con código `persistent_backend_not_configured` y acción `PENDIENTE_DEL_ADMINISTRADOR`, sin crear bases de datos en Vercel. |
| **E2-TEST-08** | Unificación de gestor de paquetes | PRUEBA LOCAL | ✅ PASÓ | Verificación de ausencia de `bun.lock`, presencia de `package-lock.json` y configuración de motores Node 22 LTS y npm 10+. |
| **E2-TEST-09** | Validación sintáctica de manifiestos | PRUEBA LOCAL | ✅ PASÓ | `ecosystem.config.cjs` (instances: 1), `render.yaml` (disk /data 10GB, preDeployCommand), `Dockerfile` (Node 22, VOLUME /data) y `vercel.json` (proxy rewrite). |
| **E2-TEST-10** | Segregación de variables en `.env.example` | PRUEBA LOCAL | ✅ PASÓ | Separación estricta entre Sección A (Vercel) y Sección B (Backend Persistente). Cero claves de IA ni secretos de sesión con prefijo `VITE_`. |

### 2.2 Diagnóstico de Salud Integral CLI (`health`)
- **Comando:** `npm run health`
- **Script:** `scripts/health-check.ts`
- **Resultado:** APROBADO (HEALTHY)
- **Evidencia:** `docs/ejecucion/continuacion-produccion/ETAPA-02/evidencias/02_health_check.txt`
- **Detalle:**
  - Base de datos en `data/alsiz.db` verificada (1088 KB).
  - Integridad física `PRAGMA integrity_check`: `ok`.
  - Migraciones sincronizadas: 12/12 aplicadas (última: `v012`).
  - Entidades operativas confirmadas (usuarios: 7, cursos de educación continua: 4, etc.).

### 2.3 Suite de Regresión de Etapas Previas
- **Resultado:** 10 / 10 PASADAS en Etapa 01 (`test:security-p0`).
- **Pruebas de Regresión:**
  - `test:etapa05` a `test:etapa14`: Ejecutadas y aprobadas satisfactoriamente.

---

## 3. Resultados de Revisión Estática (REVISIÓN ESTÁTICA)

### 3.1 Verificación de Tipos TypeScript
- **Comando:** `npm run lint` (`tsc --noEmit`)
- **Resultado:** 0 errores de tipado en todo el proyecto.
- **Evidencia:** `docs/ejecucion/continuacion-produccion/ETAPA-02/evidencias/04_lint_and_build.txt`

### 3.2 Compilación de Artefactos de Frontend y Backend
- **Comando:** `npm run build` (`vite build && esbuild server.ts ...`)
- **Resultado:** Éxito. Generación limpia de `dist/index.html`, bundles estáticos y `dist/server.cjs`.
- **Evidencia:** `docs/ejecucion/continuacion-produccion/ETAPA-02/evidencias/04_lint_and_build.txt`

### 3.3 Escaneo de Fugas de Secretos en Bundles
- **Comando:** `npm run test:security-scan`
- **Script:** `scripts/test-scan-dist-secrets.ts`
- **Resultado:** 44 archivos analizados en `dist/`. Cero secretos detectados.
- **Evidencia:** `docs/ejecucion/continuacion-produccion/ETAPA-02/evidencias/03_security_p0_and_scan.txt`

---

## 4. Estado de Pruebas de Staging y Producción

### 4.1 PRUEBA DE STAGING
- **Estado:** ⏸️ PENDIENTE DEL ADMINISTRADOR
- **Justificación:** Requiere que el administrador cree el servicio Web en Render (o VPS equivalente), monte el disco persistente de 10 GB en `/data`, configure las variables de entorno de staging y provea la URL del backend a Vercel en la variable `BACKEND_URL`.

### 4.2 PRUEBA DE PRODUCCIÓN
- **Estado:** ⛔ NO EJECUTADA (FUERA DE ALCANCE)
- **Justificación:** Cumpliendo con la directriz de seguridad, no se ejecuta ningún despliegue a producción ni migración de datos reales sin autorización humana explícita.

