# Plan de Ejecución — ETAPA 05: Backend, Base de Datos, Identidad y Seguridad

## 1. Identificación y Contexto
- **Proyecto**: Plataforma Educativa ALSIZ para Ekballo Church.
- **Directorio de trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto**: `https://github.com/rpmministry/plataforma-educativa-alsiz` (rama remota: `main`).
- **Rama de ejecución local**: `etapa-05-backend-bd-y-seguridad`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad` + cambios validados de ETAPA-04.
- **Fecha de inicio**: 2026-10-16.
- **Líder Técnico Responsable**: Antigravity AI Pair Programmer.

---

## 2. Alcance y Objetivos de la Etapa

El objetivo maestro de la **ETAPA 05** es fortalecer la base técnica necesaria para operar la plataforma, migrando el esquema volátil y en memoria heredado de Wisdom School hacia una arquitectura de backend relacional persistente, con identidad protegida y controles de acceso estrictos en servidor (no solo en interfaz), salvaguardando los datos de menores y familias según la LOPDP ecuatoriana (Art. 21 y 22) y el marco de gobernanza aprobado en la Etapa 03.

### Objetivos Específicos:
1. **Auditoría de Autenticación y Autorización**:
   - Diagnosticar el estado actual del manejo de credenciales heredado (texto claro en mockData/localStorage, omisión de sesiones seguras en Express).
   - Diseñar la ruta de co-existencia y evolución sin romper el modo demo ni la experiencia táctil en iPad de los estudiantes.
2. **Motor Relacional y Migraciones Incrementales Versionadas**:
   - Implementar el motor de base de datos relacional basado en `node:sqlite` (nativo en Node 24, cero dependencias C++, ACID-compliant, soporte WAL para concurrencia, portátil y testeable).
   - Implementar el motor de migraciones con tabla de control `schema_migrations`, registro de versiones, firmas de integridad SHA-256 y capacidad de ejecución idempotente y reversión.
   - Definir las migraciones de esquema inicial: `001_initial_schema.sql` (15 tablas maestras del modelo ERD de Etapa 03), `002_security_indexes.sql` y `003_seed_dev_data.sql` (con datos sintéticos/demo estrictamente anonimizados).
3. **Identidad, Hashing Criptográfico y Sesiones Seguras**:
   - Prohibir terminantemente contraseñas y PINs en texto claro. Implementar hashing criptográfico con `node:crypto` (`scryptSync` con sal aleatoria de 16 bytes).
   - Implementar sesiones de servidor (`sessions` table) con tokens opacos criptográficos de 256 bits (`crypto.randomBytes(32)`), cookies `HttpOnly; SameSite=Lax` y soporte de cabecera `Authorization: Bearer <token>`.
   - Implementar soporte de PIN táctil de 4 dígitos para estudiantes pequeños con hash independiente y expiración segura.
4. **Control de Acceso Basado en Roles (RBAC) y Prevención IDOR/BOLA**:
   - Controles de servidor para 6 roles: `ADMIN`, `ACADEMIC_COORDINATOR`, `TEACHER`, `REPRESENTATIVE`, `STUDENT` y `SERVICE_AGENT`.
   - Middleware de protección contra manipulación de identificadores (IDOR / Broken Object Level Authorization):
     - Un estudiante **solo puede consultar y modificar sus propios datos**.
     - Un representante **solo puede acceder a los expedientes de sus hijos biológicos o tutelados** formalmente vinculados en `student_representatives`.
     - Intento de acceso cruzado entre familias es rechazado con `403 Forbidden` (`FORBIDDEN_STUDENT_ACCESS`).
5. **Validación de Entradas, Errores Seguros y Límites de Solicitudes**:
   - Validación rigurosa de contratos DTO mediante esquemas de validación Zod.
   - Manejador centralizado de errores (`errorHandler`) que garantice que ningún error 500 o fallo de base de datos filtre credenciales, rutas internas o trazas de pila al cliente.
   - Middleware de límite de tasa (*Rate Limiting*) en endpoints de autenticación contra ataques de fuerza bruta.
6. **Gestión de Secretos y Configuración**:
   - Carga segura de variables de entorno mediante `dotenv`.
   - Archivo `.env.example` completo y documentado.
   - Actualización de `.gitignore` para excluir `*.db`, `data/`, `backups/` y archivos `.env*`.
7. **Libro Mayor de Auditoría Inmutable (LOPDP Art. 21 y 22)**:
   - Registro automático en `audit_events` para eventos sensibles (`AUTH_SUCCESS`, `AUTH_FAILURE`, `STUDENT_DATA_VIEW`, `STUDENT_DATA_ACCESS_DENIED`, `SUBMISSION_CREATED`, `SUBMISSION_EVALUATED`, `CONSENT_SIGNED`).
   - Anonimización de IP mediante hash unidireccional SHA-256 (`ip_hash`).
   - Sanitización de payloads para que nunca se registren contraseñas, PINs ni tokens en la auditoría.
8. **Estrategia de Respaldo y Restauración**:
   - Procedimiento documentado y script automatizado para copia caliente de SQLite (`VACUUM INTO`) y exportación portable de expediente familiar en formato JSON anonimizado.

---

## 3. Exclusiones de la Etapa
- **NO importar aún los datos reales de Gael ni Avril**: Se emplean datos de desarrollo puramente sintéticos (`STU-DEMO-01`, `STU-DEMO-02`) identificados explícitamente.
- **NO desplegar en producción**: Esta etapa se limita al entorno local y pruebas unitarias/de integración automatizadas.
- **NO implementar el pipeline RAG semántico ni agentes LLM complejos** (reservado para Etapa 06).
- **NO eliminar ni refactorizar componentes visuales de frontend no relacionados** con la conexión de autenticación.

---

## 4. Dependencias y Precondiciones
1. **Node.js**: Entorno verificado v24.19.0 con soporte nativo de `node:sqlite` y `node:crypto`.
2. **Línea base previa**: ETAPA 04 aprobada con compilación limpia (`tsc --noEmit` y `npm run build` en código 0).
3. **Modelos y Contratos**: Diseños aprobados en `docs/arquitectura/modelo_datos_y_diccionario.md` y `docs/arquitectura/contratos_api_e_interfaces.md`.

---

## 5. Riesgos Previos y Mitigaciones
| Riesgo Previo | Nivel | Mitigación Técnica |
|---|:---:|---|
| Conflicto de compatibilidad entre Node 24 `node:sqlite` y esbuild/Vite al empaquetar para producción | Alto | Configurar `external: ['node:sqlite', 'node:crypto']` en los scripts de bundle de esbuild para que sean tratados como módulos externos del runtime de Node.js. |
| Exposición de contraseñas por consultas GET o logs de servidor | Crítico | DTOs de salida excluyen explícitamente `password_hash` y `pin_code_hash`. Sanitización estricta en el logger de auditoría. |
| Pérdida de acceso en frontend al desacoplar el mock de usuarios | Medio | Proveer adaptador de co-existencia: si el servidor no responde o está en modo offline/demo, se mantiene el fallback controlado marcando el estado de desarrollo. |
| Inyección SQL o manipulación de parámetros en SQLite | Crítico | Uso estricto de sentencias preparadas (*prepared statements*) parametrizadas (`db.prepare('... WHERE id = ?')`). Cero concatenación de cadenas SQL. |

---

## 6. Criterios de Aceptación de la Etapa
1. **Criterio 1: Migraciones Versionadas y Reproducibles**:
   - El sistema de migraciones aplica desde cero el esquema `001`, `002` y `003` en una base de datos limpia sin errores, registrando checksums e historial.
2. **Criterio 2: Autenticación Segura y Hashing Criptográfico**:
   - `POST /api/v1/auth/login` valida credenciales contra hashes `scrypt` y emite sesión válida.
   - `POST /api/v1/auth/pin-login` valida PIN de 4 dígitos para estudiantes y emite sesión con rol `STUDENT`.
   - Cero contraseñas o PINs en texto claro en la base de datos o en respuestas HTTP.
3. **Criterio 3: Autorización de Servidor y Rechazo de Accesos Indebidos**:
   - Peticiones no autenticadas a recursos protegidos devuelven `401 Unauthorized`.
   - Peticiones con rol insuficiente devuelven `403 Forbidden`.
4. **Criterio 4: Prevención Estricta de IDOR / BOLA (Aislamiento Familiar)**:
   - Estudiante A no puede leer ni modificar el perfil ni las tareas del Estudiante B (`403 Forbidden`).
   - Representante A no puede consultar información de estudiantes que no pertenezcan a su núcleo familiar registrado (`403 Forbidden`).
5. **Criterio 5: Libro Mayor de Auditoría Operativo**:
   - Cada intento de autenticación y acceso a datos de estudiantes genera un registro inmutable en `audit_events` con IP hasheada y detalles anonimizados.
6. **Criterio 6: Respaldo y Restauración Documentados y Probados**:
   - Se ejecuta exitosamente una prueba de respaldo y restauración en un directorio temporal de pruebas.
7. **Criterio 7: Integridad de Compilación**:
   - `npm run lint` (`tsc --noEmit`) y `npm run build` completan con código de salida 0.

