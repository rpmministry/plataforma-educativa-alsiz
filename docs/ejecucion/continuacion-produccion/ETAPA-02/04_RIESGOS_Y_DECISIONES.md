# REGISTRO DE DECISIONES DE ARQUITECTURA (ADR) Y GESTIÓN DE RIESGOS — ETAPA 02
## Plataforma Educativa ALSIZ para Ekballo Church

- **Fecha:** 2026-10-17
- **Rama:** `continuacion-produccion-etapa-02`
- **Estado:** DECIDIDO Y APROBADO

---

## 1. REGISTRO DE DECISIÓN DE ARQUITECTURA: ADR-002

### Título:
**Estrategia de Persistencia y Arquitectura de Despliegue Temporal para la Plataforma ALSIZ**

### Contexto del Problema:
La Plataforma Educativa ALSIZ utiliza actualmente SQLite3 embebido mediante la API nativa de Node.js `node:sqlite` (`DatabaseSync`), configurado con modo Write-Ahead Logging (`WAL`), claves foráneas activadas y consultas síncronas (`.prepare().all()`, `.prepare().get()`, `.prepare().run()`) en más de 20 controladores, servicios y scripts de migración.

Al desplegarse en plataformas serverless puras como Vercel Functions:
1. El sistema de archivos de la función serverless es de solo lectura, salvo `/tmp`.
2. El directorio `/tmp` es estrictamente efímero: cualquier escritura a una base de datos SQLite se pierde cuando la instancia serverless entra en suspensión o se recicla (en cuestión de minutos o segundos).
3. Cada nueva invocación concurrente se ejecuta en un contenedor independiente, lo que generaría múltiples copias desincronizadas de la base de datos en `/tmp`, provocando inconsistencia de datos, pérdida de sesiones, registros de auditoría incompletos y pérdida de progreso de los estudiantes.

Se requiere una arquitectura de despliegue estable para el piloto de producción que garantice persistencia real de datos y cero pérdida de información, manteniendo al mismo tiempo la experiencia de usuario en la URL pública del proyecto.

---

### Opciones Evaluadas:

#### Opción A: Frontend Estático en Vercel + Backend Express en Servicio Node Persistente con Disco Montado (SQLite WAL)
- **Descripción:**
  - **Frontend:** La SPA de React compilada con Vite se despliega en Vercel como sitio puramente estático servido desde su CDN global.
  - **Backend:** La API Express se despliega como un servicio Node.js 22 LTS persistente (en Render, Fly.io, Railway o un VPS Linux con PM2/Docker) con un volumen de disco persistente montado (e.g. `/data/alsiz.db`).
  - **Conexión / Enrutamiento:** Vercel enruta todas las peticiones a `/api/*` hacia el backend persistente mediante un proxy reverso transparente (`api-entry.js` o directiva `rewrites` en `vercel.json`).
  - **Base de Datos:** SQLite permanece en el disco persistente del backend con WAL habilitado y proceso único (`instances: 1`).

- **Ventajas:**
  1. **Cero Refactorización de Consultas:** Conserva íntegramente las consultas síncronas (`node:sqlite` `DatabaseSync`) existentes en todo el backend sin riesgo de regresión funcional.
  2. **Persistencia Garantizada y Rendimiento:** SQLite en disco local SSD ofrece latencias sub-milisegundo (< 1 ms por consulta) sin latencia adicional de ida y vuelta de red (RTT).
  3. **Aislamiento de Seguridad:** El backend persistente mantiene en su entorno seguro las claves de IA (`GEMINI_API_KEY`, `DEEPSEEK_API_KEY`, etc.), `SESSION_SECRET` y los correos; el frontend estático en Vercel nunca tiene acceso a estos secretos.
  4. **Experiencia de Usuario Transparente:** La URL pública de Vercel (e.g. `https://alsiz.vercel.app` o dominio personalizado) sigue siendo la puerta de entrada única; los estudiantes y tutores nunca notan la separación de capas.
  5. **Manejo Sencillo de Cookies:** Dado que el navegador envía peticiones a `/api/*` en el mismo origen de Vercel, las cookies `HttpOnly`, `SameSite=Lax` y `Secure` se envían como cookies de primer origen (*first-party*), eliminando bloqueos de navegadores y problemas de CORS.
  6. **Costos Iniciales Mínimos:** Servicios como Render ofrecen planes con disco persistente por ~$7 USD/mes o Fly.io por ~$3-$5 USD/mes, perfectamente compatibles con el presupuesto de la congregación.

- **Desventajas / Restricciones:**
  1. **Escalado Horizontal Limitado de Escritura:** SQLite con WAL permite múltiples lectores pero un solo proceso escritor a la vez; el backend debe ejecutarse estrictamente con una sola réplica (`instances: 1`). (Nota: para el volumen de 100-500 usuarios del piloto de Ekballo Church, una sola instancia maneja holgadamente miles de peticiones por minuto).
  2. **Configuración de Dos Proveedores:** Requiere configurar el proyecto en Vercel (frontend) y en el servicio persistente (backend), administrando la variable `BACKEND_URL`.

---

#### Opción B: Toda la Aplicación en Vercel + Base de Datos Externa Persistente (Turso libSQL / PostgreSQL)
- **Descripción:**
  - **Frontend y Backend:** Toda la aplicación se aloja en Vercel (Frontend estático + Vercel Serverless Functions para `/api/*`).
  - **Base de Datos:** Se prescinde de SQLite local y se migra a un servicio de base de datos remoto persistente sobre HTTP/TCP (Turso Cloud libSQL, Supabase Postgres, Neon, etc.).
  - **Refactorización:** Se reemplaza `DatabaseSync` de `node:sqlite` por clientes asíncronos (`@libsql/client`, Prisma, Drizzle o `pg`), convirtiendo todos los métodos sincrónicos existentes en funciones asíncronas (`async/await`).

- **Ventajas:**
  1. **Proveedor Único:** Todo el despliegue se gestiona desde el panel de control de Vercel.
  2. **Escalabilidad Serverless:** Las funciones de Vercel pueden escalar automáticamente con la demanda.
  3. **Base de Datos Desacoplada:** El almacenamiento se gestiona en la nube independientemente del ciclo de vida del servidor.

- **Desventajas / Riesgos Críticos:**
  1. **Alto Riesgo de Regresión por Refactorización Masiva:** Requeriría transformar cientos de llamadas a métodos síncronos en más de 20 archivos de rutas, servicios académicos, agentes IA y scripts a llamadas `async/await`. Un solo `await` omitido rompería transacciones y generaría estados inconsistentes.
  2. **Latencia de Red en Cada Transacción:** Consultas complejas que ejecutan múltiples `prepare().all()` dentro de un bucle incurrirían en decenas de RTT de red hacia la nube de Turso o Postgres, degradando significativamente los tiempos de respuesta.
  3. **Problemas de Cold Start:** Las funciones serverless de Vercel experimentan arranques en frío (cold starts) de 1 a 3 segundos, afectando la fluidez del tutor socrático y las evaluaciones.
  4. **Costos y Dependencia de Terceros:** Añade dependencia directa de cuotas de lectura/escritura de un proveedor de base de datos en la nube.

---

### Decisión Adoptada:
Se **APRUEBA Y SELECCIONA LA OPCIÓN A** como la arquitectura oficial de despliegue para la fase actual y el piloto de producción de la Plataforma Educativa ALSIZ.

**Estrategia de Implementación:**
1. Vercel alojará la SPA de React compilada (`dist/`).
2. El archivo `api-entry.js` se configura como un proxy reverso hacia la variable de entorno `BACKEND_URL` configurada en Vercel, o mediante directivas `rewrites` de Vercel.
3. El backend Express se ejecutará como un servicio persistente Node.js 22 LTS con volumen de disco montado (`/data`).
4. La base de datos operará en `/data/alsiz.db` con `PRAGMA journal_mode = WAL;` y un único proceso activo (`instances: 1`).
5. Las migraciones se aplicarán como paso controlado de pre-despliegue (`npm run db:migrate`) y se verificarán por checksum en los health checks.
6. La capa DAL (`server/db/dal.ts`) desarrollada en la Etapa 01 se mantendrá como abstracción preparada, permitiendo que en el futuro, si el crecimiento del colegio lo exige, se pueda migrar gradualmente a la Opción B sin traumas.

---

## 2. MATRIZ DE RIESGOS Y MEDIDAS DE MITIGACIÓN (ETAPA 02)

| ID | Riesgo Identificado | Nivel | Impacto Potencial | Medida de Mitigación Implementada |
| :--- | :--- | :---: | :--- | :--- |
| **R-01** | **Escritura efímera en Vercel Serverless** | **CRÍTICO** | Si `/api/*` se procesa en Vercel con SQLite local, los datos de alumnos y notas se borran en minutos. | **Opción A:** Reemplazo de la lógica serverless en `api-entry.js` por un proxy reverso estricto. Si no hay `BACKEND_URL`, retorna 503 impidiendo la creación de bases efímeras. |
| **R-02** | **Concurrencia de escritores en SQLite WAL** | **ALTO** | Múltiples procesos Node compitiendo por escribir en SQLite provocan `SQLITE_BUSY` o bloqueos. | Configuración estricta de proceso único (`instances: 1`, `exec_mode: 'fork'`) en PM2, Render, Docker y Fly.io. |
| **R-03** | **Pérdida de Cookies de Sesión a través del Proxy** | **ALTO** | Si el proxy no reenvía `Set-Cookie` o el navegador rechaza la cookie por atributos erróneos, los usuarios no pueden mantener la sesión iniciada. | Estandarización de `Set-Cookie` con `Path=/`, `HttpOnly`, `SameSite=Lax` y `Secure` condicional. Soporte multi-cookie con `getSetCookie()` en el proxy y `app.set('trust proxy', 1)` en Express. |
| **R-04** | **Conflicto de Gestores por `bun.lock` Desactualizado** | **MEDIO** | Vercel o pipelines de build detectan `bun.lock` e intentan `bun install`, omitiendo dependencias críticas (`@libsql/client`, `resend`, `nodemailer`, `zod`). | Eliminación formal de `bun.lock` tras constatar cero dependencia operativa, estandarizando el proyecto en `npm` y `package-lock.json`. |
| **R-05** | **Ejecución no controlada de migraciones en tiempo de petición** | **MEDIO** | Si las migraciones se corren al recibir peticiones concurrentes, pueden generarse bloqueos de base de datos o fallos 500. | Desacoplamiento total: las migraciones se ejecutan una única vez en el release command (`npm run db:migrate`). El servidor solo valida checksums de forma no destructiva al iniciar y en `/api/health`. |
| **R-06** | **Fuga de Secretos en Health Check o Frontend** | **ALTO** | Exponer variables de entorno, cadenas de conexión o datos de usuarios en `/api/health` o en el bundle estático. | `/api/health` solo expone booleanos de disponibilidad y conteos de migración, sin credenciales ni rutas internas. Verificación mediante `npm run test:security-scan`. |

---

## 3. CRITERIOS DE REVALUACIÓN FUTURA (DISPARADORES PARA OPCIÓN B)
Se reevaluará migrar a la Opción B únicamente si:
1. El volumen de alumnos concurrentes supera la capacidad de una máquina de 2-4 núcleos ejecutando SQLite (> 2,000 peticiones simultáneas por segundo).
2. Se requiera alta disponibilidad geográfica multi-región con replicación activa-activa en varios continentes.
3. El equipo de administración de Ekballo Church solicite expresamente centralizar toda la facturación e infraestructura exclusivamente en Vercel.

