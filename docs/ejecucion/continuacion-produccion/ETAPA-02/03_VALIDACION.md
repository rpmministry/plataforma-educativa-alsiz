# Matriz de Aceptación y Validación — Etapa 02: Persistencia Real y Arquitectura Temporal de Despliegue
**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha de Validación:** 17 de Octubre de 2026  
**Rama:** `feature/arquitectura-vercel-turso`  

---

## 1. Criterio de Aceptación Global

> "El diseño de despliegue garantiza persistencia entre invocaciones y reinicios del backend; el proxy `/api/*` se prueba localmente con el backend de ensayo; las instrucciones distinguen con claridad los pasos automáticos y los que requieren la intervención del administrador. La arquitectura Vercel + Turso con plan gratuito inicial ($0 USD/mes) se evalúa y prepara sin perder capacidades existentes ni alterar datos de estudiantes."

**Evaluación Global:** **CUMPLIDO SATISFACTORIAMENTE (100% DE REQUISITOS VERIFICADOS)**.

---

## 2. Matriz de Validación Detallada

| # | Requisito Evaluado | Estado | Evidencia y Mecanismo de Verificación |
| :- | :--- | :--- | :--- |
| **1** | **Evaluación de Costos e Infraestructura Turso vs Render** | ✅ CUMPLIDO | Documentada la inviabilidad de disco gratuito en Render ($9.50+/mo) y la viabilidad del plan gratuito de Turso Cloud ($0/mo, 9GB, 1B lecturas/mo) en el artefacto de evaluación y en ADR-002-B. |
| **2** | **Respaldo Físico Inmutable Previo a Migración** | ✅ CUMPLIDO | Respaldo verificado en `backups/alsiz_pre_turso_migracion_20261017.db` (1.14 MB). Cero alteración de datos de estudiantes. |
| **3** | **Capa de Acceso a Datos Agnóstica (DAL `IDatabaseAdapter`)** | ✅ CUMPLIDO | `server/db/dal.ts` implementa `IDatabaseAdapter` con soporte transparente para `LibsqlAdapter` y `SqliteLocalAdapter`, con pruebas aisladas en memoria/disco local. |
| **4** | **Migración de Controladores y Servicios a Consultas Asíncronas** | ✅ CUMPLIDO | Los 7 módulos críticos (autenticación familiar, estudiantes, administración, académico con 31 métodos, sesiones del piloto y agentes) migrados a `async/await` sin regresiones. |
| **5** | **Punto de Entrada Dual en Vercel (`api-entry.js`)** | ✅ CUMPLIDO | Ejecuta Express directamente en Vercel Serverless cuando `TURSO_DATABASE_URL` está presente; actúa como proxy reverso cuando se configura `BACKEND_URL`; emite 503 si ninguna existe. Verificado en `E2-TEST-05`, `E2-TEST-07`. |
| **6** | **Pruebas en Vivo contra Turso Cloud (`test:turso`)** | ✅ CUMPLIDO | 9 de 9 pruebas pasadas en vivo (`TURSO-01` a `TURSO-09`): conectividad, 52 tablas, 12 migraciones, login, PIN login, Anti-IDOR, Resend y logout. Verificado en `evidencias/06_test_turso_live.txt`. |
| **7** | **Preservación de Seguridad, Sesiones y Cookies** | ✅ CUMPLIDO | Cookies `HttpOnly`, `SameSite=Lax`, `Secure` preservadas en proxy y serverless. 10/10 pruebas pasadas en `test:security-p0`. Cero secretos en frontend (`test:security-scan`). |
| **8** | **Migraciones Controladas de Release/Operación** | ✅ CUMPLIDO | `server/db/migrator.ts` desacoplado de peticiones web. Implementadas `runMigrationsAsync()` y `checkMigrationsStatusAsync()` con validación determinista de checksums. |
| **9** | **Unificación de Gestor de Paquetes en `npm`** | ✅ CUMPLIDO | `bun.lock` eliminado con verificación de dependencias intactas. Motores Node `>=22.12.0` y npm `>=10.0.0` requeridos en `package.json`. Verificado en `E2-TEST-08`. |
| **10** | **Documentación Paso a Paso con Delimitación de Tareas Administrativas** | ✅ CUMPLIDO | `docs/operacion/guia_instalacion_despliegue.md` y `.env.example` documentan el aprovisionamiento de Vercel + Turso y de Render, marcando explícitamente `[PENDIENTE DEL ADMINISTRADOR]`. |

---

## 3. Matriz de Trazabilidad entre Requisitos y Evidencias

```
[Infraestructura y Costos]  ---> evaluacion_arquitectura_turso_vs_render.md, ADR-002-B
[Respaldo Físico]           ---> backups/alsiz_pre_turso_migracion_20261017.db
[Turso Cloud en Vivo]       ---> TURSO-01 a TURSO-09 ---> evidencias/06_test_turso_live.txt
[Arquitectura Persistencia] ---> E2-TEST-01 a E2-TEST-10 ---> evidencias/01_test_etapa_02.txt
[Salud y Diagnóstico CLI]   ---> npm run health ---> evidencias/02_health_check.txt
[Seguridad P0 y Secretos]   ---> test:security-p0, test:security-scan ---> evidencias/07_test_security_p0.txt, 08_test_scan_dist_secrets.txt
[Regresión Funcional]       ---> test:etapa05 a test:etapa14 (100% pasadas)
[Calidad de Tipos y Build]  ---> npm run lint (0 errores), npm run build (éxito en 11.97s)
```
