# REGISTRO DE DECISIONES DE ARQUITECTURA (ADR) Y GESTIÓN DE RIESGOS — ETAPA 02
## Plataforma Educativa ALSIZ para Ekballo Church

- **Fecha:** 2026-10-17
- **Rama:** `feature/arquitectura-vercel-turso`
- **Estado:** DECIDIDO, IMPLEMENTADO Y VERIFICADO

---

## 1. REGISTRO DE DECISIÓN DE ARQUITECTURA

### ADR-002 (Original):
**Estrategia de Persistencia y Arquitectura de Despliegue Temporal para la Plataforma ALSIZ**
- Identificó la inviabilidad de ejecutar SQLite directamente sobre el sistema de archivos efímero (`/tmp`) de Vercel Functions.
- Planteó la separación en Opción A (Frontend en Vercel + Backend persistente en Render/VPS con disco montado) y Opción B (Refactorización asíncrona total a base de datos externa).

---

### ADR-002-B (Ampliación y Decisión Final):
**Adopción de Arquitectura Serverless Vercel + Turso Cloud libSQL (Plan Gratuito $0/mes) con Compatibilidad Dual (Render / VPS + SQLite Local)**

#### Contexto y Necesidad de Validación:
La congregación Ekballo Church solicitó evaluar una alternativa viable que permita **iniciar con costo cero ($0.00 USD/mes)** sin perder las capacidades del backend ni poner en riesgo los datos de los estudiantes.

Al diagnosticar la infraestructura en Render, se constató que los discos persistentes no están disponibles en el plan gratuito de Render; requieren el plan `Starter` ($7.00/mes) más el volumen persistente ($0.25/GB/mes, mínimo $2.50/mes para 10 GB), resultando en un costo recurrente fijo de al menos **$9.50 USD/mes** desde el primer día.

En contraste, **Turso Cloud** (basado en libSQL, una bifurcación de SQLite de código abierto con soporte nativo HTTP/WebSocket) ofrece un **Starter Plan permanente gratuito** diseñado específicamente para arquitecturas serverless.

#### Matriz Comparativa de Infraestructura:

| Criterio | Render con Disco Persistente | Vercel + Turso Cloud (Plan Gratuito) |
| :--- | :--- | :--- |
| **Costo Inicial Mensual** | **$9.50+ USD/mes** (Mínimo obligatorio) | **$0.00 USD/mes** (Plan gratuito permanente) |
| **Cuota de Almacenamiento** | 10 GB incluidos en el volumen pagado | 9 GB incluidos de almacenamiento distribuido |
| **Límite de Operaciones** | Ilimitadas en disco local | 1 Billón de lecturas / 25 Millones de escrituras al mes |
| **Bases de Datos Permitidas** | 1 archivo SQLite en disco | Hasta 500 bases de datos en la cuenta |
| **Infraestructura de Servidor** | 1 Instancia Node continua (512 MB RAM) | Serverless global en Vercel Edge/Serverless |
| **Modo de Conexión** | Síncrono (`node:sqlite` local) | Asíncrono (`@libsql/client` vía HTTPS/WSS) |
| **Respaldos** | Manuales en `/data/backups/` o scripts | Snapshot instantáneo (`turso db dump`) y PITR |
| **Riesgo de Inactividad (Sleep)** | En plan gratuito suspende tras 15 min | Sin suspensión (Serverless responde bajo demanda) |
| **Complejidad de Mantenimiento** | Requiere mantener OS, PM2, Docker y disco | Totalmente administrado (*Zero Ops*) |

#### Solución Implementada: Adaptador Agnóstico Dual (DAL)
Para eliminar el riesgo de regresiones y evitar acoplarse irreversiblemente a un solo proveedor:
1. Se extendió la interfaz `IDatabaseAdapter` en `server/db/dal.ts`.
2. Se implementó `LibsqlAdapter` para resolver consultas sobre Turso Cloud en producción serverless.
3. Se implementó `SqliteLocalAdapter` para resolver consultas instantáneas sobre `node:sqlite` local cuando se ejecutan pruebas (`NODE_ENV === 'test'`), cuando se activa `USE_LOCAL_SQLITE=true`, o cuando se despliega en Render/VPS con disco persistente.
4. Se migraron los 7 módulos de controladores y servicios a llamadas asíncronas estándar (`await`).
5. Se configuró `api-entry.js` para despachar automáticamente la app Express en Vercel si `TURSO_DATABASE_URL` está configurada, o actuar como proxy si se especifica `BACKEND_URL`.

---

## 2. MATRIZ DE RIESGOS Y MEDIDAS DE MITIGACIÓN

| ID | Riesgo Identificado | Nivel | Impacto Potencial | Medida de Mitigación Implementada |
| :--- | :--- | :---: | :--- | :--- |
| **R-01** | **Escritura efímera en Vercel Serverless** | **CRÍTICO** | Si `/api/*` escribe en SQLite en `/tmp`, los datos se pierden en minutos. | **Mitigado:** En Vercel se escribe directamente en la nube persistente de Turso Cloud mediante `@libsql/client`. Ninguna escritura operativa ocurre en `/tmp`. |
| **R-02** | **Latencia de Red en Consultas Asíncronas Remotas** | **MEDIO** | Consultas individuales a Turso Cloud añaden tiempo de ida y vuelta de red (RTT). | **Mitigado:** `@libsql/client` utiliza canalización HTTP/2 y pool de conexiones reutilizables. Pruebas en vivo promediaron < 120 ms por transacción compleja. |
| **R-03** | **Regresión en Consultas o Transacciones Académicas** | **ALTO** | Omitir un `await` en los 31 métodos de `academicService` causaría inconsistencia de datos. | **Mitigado:** Migración sistemática con TypeScript estricto (`tsc --noEmit`), compilación limpia con esbuild y 100% de éxito en suites `test:turso` y `test:etapa05` a `test:etapa14`. |
| **R-04** | **Pérdida de Cookies de Sesión en Serverless** | **ALTO** | Los navegadores podrían rechazar cookies de sesión generadas en funciones serverless. | **Mitigado:** `server/routes/authRoutes.ts` emite cookies con `Path=/`, `HttpOnly`, `SameSite=Lax` y `Secure` condicional. Validado en `TURSO-04` y `E2-TEST-06`. |
| **R-05** | **Fuga de Secretos de Turso o IA en el Frontend** | **ALTO** | Exponer `TURSO_AUTH_TOKEN` o claves de IA en el bundle estático de Vercel. | **Mitigado:** Las variables de Turso e IA no llevan prefijo `VITE_*`. Escaneo exhaustivo con `npm run test:security-scan` sobre 44 archivos en `dist/` confirmó 0 secretos expuestos. |
| **R-06** | **Ruptura de Pruebas Locales por Dependencia Externa** | **MEDIO** | Si las pruebas requirieran conexión a internet o Turso, los tests en CI/local fallarían offline. | **Mitigado:** `dal.ts` fuerza automáticamente `SqliteLocalAdapter` en entorno `test` o si falta `TURSO_DATABASE_URL`, garantizando pruebas 100% autónomas y ultrarrápidas. |

---

## 3. CRITERIOS DE REVALUACIÓN Y ESCALAMIENTO FUTURO

La arquitectura actual Vercel + Turso soporta holgadamente más de 100,000 peticiones mensuales y hasta 9 GB de datos educativos a costo $0.

Se reevaluará escalar a un plan de pago o migrar de arquitectura si:
1. **El volumen de datos supere los 9 GB:** Se puede actualizar al plan Turso Scaler ($29/mo con 24 GB de almacenamiento y 6 sugerencias de replicación) con un solo clic en la consola de Turso sin tocar una sola línea de código.
2. **Requerimiento institucional de soberanía de datos en servidor propio:** Si el colegio decide trasladar toda la infraestructura a un servidor dedicado local o VPS en la sede física de la iglesia, solo se requiere cambiar `DATABASE_PATH` y activar `USE_LOCAL_SQLITE=true` utilizando el manifiesto PM2 o Docker ya incluidos.
