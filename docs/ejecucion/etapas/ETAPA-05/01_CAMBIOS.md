# Registro de Cambios — ETAPA 05: Backend, Base de Datos, Identidad y Seguridad

## 1. Resumen de la Intervención Técnica
En esta etapa se implementó la capa de persistencia relacional con motor nativo `node:sqlite` (Node 24) en modo WAL con claves foráneas estrictas, el sistema de migraciones incrementales versionadas con control de integridad SHA-256, utilidades criptográficas con hashing `scrypt` (eliminando almacenamiento de contraseñas y PINs en texto claro), sesiones de servidor con tokens criptográficos de 256 bits, middlewares de control de acceso por roles (RBAC) y aislamiento estricto de estudiantes y familias (prevención anti-IDOR/BOLA), libro mayor inmutable de auditoría LOPDP y mecanismos de respaldo y recuperación en caliente (`VACUUM INTO`).

---

## 2. Dependencias Añadidas
- **`zod`** (`^3.24.2`):
  - **Licencia**: MIT.
  - **Justificación**: Validación estricta en tiempo de ejecución de esquemas de entrada para contratos de API RESTful (`/api/v1`), garantizando que datos malformados o vectores de inyección sean rechazados en la frontera HTTP antes de alcanzar la base de datos.
  - **Impacto de seguridad**: 0 vulnerabilidades conocidas (0 CVEs), sin dependencias transitivas añadidas.

---

## 3. Archivos Creados

| Ruta del Archivo | Módulo / Capa | Razón Técnica del Cambio | Impacto en el Sistema |
|---|---|---|---|
| `server/db/database.ts` | Persistencia / BD | Inicializador del singleton SQLite mediante `node:sqlite` (`DatabaseSync`), configuración de pragmas de rendimiento (`journal_mode = WAL`, `foreign_keys = ON`, `synchronous = NORMAL`). | Proporciona acceso transaccional y referencialmente íntegro sin dependencias nativas C++ propensas a fallos en Windows. |
| `server/db/migrator.ts` | Migraciones | Ejecutor de migraciones atómicas con tabla de control `schema_migrations`, cálculo de firmas SHA-256 e idempotencia. | Permite desplegar y evolucionar el esquema relacional de forma auditable y reproducible desde la línea base. |
| `server/db/migrations/001_initial_schema.sql` | Esquema DDL | Creación de 16 tablas relacionales alineadas al modelo de datos de la Etapa 03 (`users`, `students`, `representatives`, `student_representatives`, `sessions`, `programs`, `levels`, `enrollments`, `subjects`, `competencies`, `units`, `classes`, `evaluations`, `submissions`, `audit_events`, `password_resets`). | Sustituye el almacenamiento volátil en memoria por entidades normalizadas y auditables. |
| `server/db/migrations/002_security_indexes.sql` | Índices de Rendimiento | Creación de índices sobre claves foráneas, columnas de búsqueda de usuarios/sesiones y relaciones de pertenencia familiar. | Optimiza tiempos de consulta y acelera la verificación de pertenencia familiar en middlewares anti-IDOR. |
| `server/db/migrations/003_seed_dev_data.sql` | Datos Semilla | Carga de usuarios y familias sintéticas estrictamente anonimizadas (`admin_alsiz`, `coord_academica`, `prof_mentoria`, Familia Santos, Familia Mendoza). **Cumple restricción: Cero datos reales de Gael ni Avril.** | Permite verificar autenticación, roles y pruebas de aislamiento familiar sin comprometer PII real. |
| `server/auth/crypto.ts` | Criptografía / Seguridad | Funciones de hashing `scrypt` con sal aleatoria criptográfica, comparación en tiempo constante (`timingSafeEqual`), hash HMAC-SHA256 para anonimización de IPs y generación de tokens de 256 bits. | Erradica el almacenamiento de credenciales en texto plano; protege contra ataques de temporización e inyección. |
| `server/auth/types.ts` | Tipos TypeScript | Interfaces de usuarios, perfiles, sesiones de servidor y roles de mínimo privilegio. | Tipado estricto en la capa de identidad. |
| `server/auth/sessionService.ts` | Gestión de Sesiones | Creación, validación, caducidad y purga de sesiones de servidor almacenadas como hashes en la tabla `sessions`. | Prohíbe la suplantación de identidad; emite tokens de 72 horas revocables inmediatamente al cerrar sesión. |
| `server/middleware/auditMiddleware.ts` | Auditoría LOPDP | Función `recordAuditEvent` y sanitización recursiva de detalles JSON (redacción automática de contraseñas, PINs y tokens). Hash unidireccional de IP. | Cumplimiento estricto de los Arts. 21 y 22 de la LOPDP para trazabilidad de acceso a expedientes de menores. |
| `server/middleware/authMiddleware.ts` | RBAC & Anti-IDOR | Middlewares `authenticate`, `requireAuth`, `requireRole` y `requireStudentAccess` que validan cookies/Bearer tokens y verifican pertenencia familiar en base de datos. | Bloquea a nivel de servidor cualquier intento de un alumno o padre de acceder a datos de otra familia (`403 Forbidden`). |
| `server/middleware/rateLimiter.ts` | Seguridad Perimetral | Limitador de tasa en memoria (10 intentos/min en auth, 60 req/min en API general) con cabecera `Retry-After`. | Mitiga ataques de fuerza bruta y enumeración de cuentas. |
| `server/middleware/errorHandler.ts` | Errores Seguros | Captura centralizada de excepciones y errores de validación Zod, formateando respuestas HTTP sin filtrar trazas de pila ni datos sensibles. | Cero fuga de información técnica o de infraestructura hacia clientes externos. |
| `server/routes/authRoutes.ts` | API / Autenticación | Endpoints `/api/v1/auth/login`, `/api/v1/auth/pin-login`, `/api/v1/auth/logout`, `/api/v1/auth/me`, `/api/v1/auth/recover-access`. | Permite login seguro por contraseña o por PIN táctil en iPad, gestionando cookies `HttpOnly`. |
| `server/routes/studentRoutes.ts` | API / Estudiantes | Endpoints `/api/v1/students/:studentId` (perfil), `/subjects` (malla activa), `/submissions` (entregas) y actualización de lema/tema. | Acceso controlado a recursos del estudiante con verificación anti-IDOR. |
| `server/routes/representativeRoutes.ts` | API / Representantes | Endpoints `/api/v1/representatives/my-family` y `/consent` (firma formal LOPDP). | Gestión familiar exclusiva para tutores legales. |
| `server/routes/adminRoutes.ts` | API / Administración | Endpoints `/api/v1/admin/users`, `/audit-logs` y `/health-check`. | Monitoreo y supervisión institucional restringida a rol `ADMIN`. |
| `server/backup/backupService.ts` | Respaldo y Restauración | Copias de seguridad atómicas en caliente con `VACUUM INTO` y restauración verificada con `PRAGMA integrity_check`. | Garantiza continuidad operativa y recuperación ante desastres sin detener el servicio. |
| `scripts/test-etapa-05.ts` | Pruebas Automatizadas | Suite completa de 16 pruebas automatizadas de integración, seguridad, RBAC, IDOR, auditoría y respaldo. | Evidencia reproducible de cumplimiento de criterios de aceptación. |

---

## 4. Archivos Modificados

| Ruta del Archivo | Razón Técnica del Cambio | Impacto en el Sistema |
|---|---|---|
| `.gitignore` | Exclusión de `*.db`, `*.db-wal`, `*.db-shm`, `data/` y `backups/`. | Previene la inclusión involuntaria de bases de datos locales o archivos de respaldo en el repositorio Git. |
| `.env.example` | Documentación de variables `DATABASE_PATH`, `SESSION_SECRET`, `SESSION_TTL_HOURS`, `NODE_ENV`, `PORT`. | Guía estandarizada para despliegue y configuración sin secretos en código. |
| `package.json` | Incorporación de dependencia `zod` y scripts `"db:migrate": "tsx server/db/migrator.ts"` y `"test:etapa05": "tsx scripts/test-etapa-05.ts"`. | Automatización de tareas de desarrollo y verificación de base de datos. |
| `server.ts` | Ejecución de migraciones en arranque, montaje de middleware de autenticación y enrutadores modulares `/api/v1/*`, y actualización de `/api/v1/health`. | El servidor Express ahora expone la API RESTful v1 respaldada por base de datos SQLite y auditoría. |

---

## 5. Verificación de Seguridad y Secretos
- **Cero secretos en código**: Ni contraseñas, ni tokens, ni API keys expuestos en el código fuente.
- **Cero credenciales en texto plano**: Hashes criptográficos `scrypt` con sal única aleatoria por usuario.
- **Cero exposición en logs**: El middleware de auditoría sanitiza recursivamente llaves prohibidas (`password`, `pinCode`, `token`, etc.) y anonimiza direcciones IP con HMAC-SHA256 (`ip_hash`).

