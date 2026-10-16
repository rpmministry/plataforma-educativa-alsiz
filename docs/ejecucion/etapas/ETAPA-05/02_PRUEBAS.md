# Registro de Pruebas — ETAPA 05: Backend, Base de Datos, Identidad y Seguridad

## 1. Entorno de Ejecución
- **Sistema Operativo**: Windows 11 Pro (64-bit).
- **Node.js**: `v24.19.0` (Motor nativo `node:sqlite` y `node:crypto`).
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Rama Git**: `etapa-05-backend-bd-y-seguridad`.
- **Modo de Base de Datos**: SQLite 3 embebido con Write-Ahead Logging (`WAL`) y claves foráneas activadas.

---

## 2. Comandos Ejecutados y Resultados Reales

### 2.1 Verificación de Tipos Estáticos y Linting
- **Comando**:
  ```bash
  npm run lint
  ```
- **Equivalente**: `tsc --noEmit`
- **Resultado Real**:
  ```
  > react-example@0.0.0 lint
  > tsc --noEmit
  ```
- **Código de Salida**: `0` (Cero errores de compilación TypeScript en todo el proyecto).
- **Estado**: `PASÓ`.

### 2.2 Compilación y Empaquetado para Producción
- **Comando**:
  ```bash
  npm run build
  ```
- **Resultado Real**:
  - Vite v6.4.3: 1,742 módulos transformados.
  - Generación de bundle de servidor con esbuild:
    - `dist/server.cjs` (98.9 kB, sourcemap 183.2 kB) generado en 42 ms.
    - `api-server.js` (97.7 kB) generado en 31 ms.
- **Código de Salida**: `0`.
- **Estado**: `PASÓ`.

### 2.3 Ejecución de Migraciones Incrementales
- **Comando**:
  ```bash
  npm run db:migrate
  ```
- **Resultado Real**:
  ```
  [Migrator] Ejecutando migraciones de base de datos...
  [Migrator] Migración 001_initial_schema.sql (v001) aplicada exitosamente.
  [Migrator] Migración 002_security_indexes.sql (v002) aplicada exitosamente.
  [Migrator] Migración 003_seed_dev_data.sql (v003) aplicada exitosamente.
  [Migrator] Resumen de ejecución:
   - [APPLIED] v001 (001_initial_schema.sql)
   - [APPLIED] v002 (002_security_indexes.sql)
   - [APPLIED] v003 (003_seed_dev_data.sql)
  ```
- **Prueba de Idempotencia**: En la segunda ejecución, todas las migraciones reportan `[SKIPPED]`, verificando consistencia y firmas SHA-256.
- **Código de Salida**: `0`.
- **Estado**: `PASÓ`.

### 2.4 Suite Integral de Pruebas Automatizadas de Seguridad y RBAC
- **Comando**:
  ```bash
  npm run test:etapa05
  ```
- **Equivalente**: `tsx scripts/test-etapa-05.ts`
- **Resultado Real Detallado (16 de 16 Pruebas Aprobadas)**:

| # | Categoría | Nombre de la Prueba | Resultado Real | Estado |
|:---:|---|---|---|:---:|
| 1 | Migraciones | Migraciones de esquema e índices desde cero | 3 migraciones aplicadas correctamente (`001_schema`, `002_indexes`, `003_seed`). | `PASÓ` |
| 2 | Autenticación | Login exitoso con usuario y contraseña (ADMIN) | HTTP 200. Token emitido, rol ADMIN validado. Cookie HttpOnly configurada. | `PASÓ` |
| 3 | Autenticación | Login táctil de estudiante por PIN (4 dígitos) | HTTP 200. Alumno `STU-SYNTH-01` autenticado mediante PIN `1234`. Rol STUDENT. | `PASÓ` |
| 4 | Autenticación | Login exitoso de Representante Legal | HTTP 200. Usuario `padre_santos` autenticado con rol REPRESENTATIVE vinculado a `rep-01`. | `PASÓ` |
| 5 | Autenticación | Rechazo de credenciales incorrectas | HTTP 401. Rechazo inmediato con código `AUTH_INVALID_CREDENTIALS`. | `PASÓ` |
| 6 | Autenticación | Rechazo de PIN táctil incorrecto | HTTP 401. Rechazo con código `AUTH_INVALID_PIN`. | `PASÓ` |
| 7 | Seguridad & RBAC | Rechazo de solicitud no autenticada a expediente de menor | HTTP 401. Petición GET anónima a `/api/v1/students/:id` rechazada con `UNAUTHORIZED`. | `PASÓ` |
| 8 | Aislamiento IDOR | Estudiante consulta legítimamente su propio expediente | HTTP 200. Alumno accede a sus datos personales y matrículas activas. | `PASÓ` |
| 9 | Aislamiento IDOR | **CRÍTICO: Estudiante no puede acceder al expediente de otro alumno (Anti-IDOR)** | **HTTP 403**. Petición de Alumno 1 hacia expediente de Alumno 2 rechazada con `FORBIDDEN_STUDENT_ACCESS`. | `PASÓ` |
| 10 | Aislamiento Familiar | Representante accede a los datos de su hijo autorizado | HTTP 200. Padre Santos accede a expediente de su hijo Mateo (`STU-SYNTH-01`). | `PASÓ` |
| 11 | Aislamiento Familiar | **CRÍTICO: Representante no puede acceder a menores de otra familia (Anti-IDOR)** | **HTTP 403**. Padre Santos intenta acceder a Lucía Mendoza (`STU-SYNTH-02`) y recibe `FORBIDDEN_FAMILY_ACCESS`. | `PASÓ` |
| 12 | Seguridad & RBAC | Estudiante bloqueado de consultar rutas administrativas (RBAC) | HTTP 403. Alumno intenta listar usuarios en `/api/v1/admin/users` y recibe `FORBIDDEN_ROLE`. | `PASÓ` |
| 13 | Privacidad & LOPDP | Nómina administrativa sin exposición de hashes de contraseñas | HTTP 200. 7 usuarios obtenidos. Las columnas `password_hash` y `pin_code_hash` son omitidas del DTO. | `PASÓ` |
| 14 | Auditoría LOPDP | Libro mayor inmutable registra rechazos IDOR y anonimiza IPs | HTTP 200. Se verifica registro de `STUDENT_DATA_ACCESS_DENIED`. Todas las IPs almacenadas con hash SHA-256 de 64 caracteres. | `PASÓ` |
| 15 | Respaldo | Generación de Hot Backup transaccional (`VACUUM INTO`) | Respaldo creado exitosamente (archivo `.db` de 315 kB) con checksum SHA-256 generado. | `PASÓ` |
| 16 | Recuperación | Restauración de respaldo y verificación de integridad | Base restaurada en archivo temporal; `PRAGMA integrity_check` devuelve `'ok'`. | `PASÓ` |

- **Código de Salida**: `0`.
- **Estado General**: `APROBADA`.

---

## 3. Instrucciones de Reproducción de las Pruebas

Para reproducir la totalidad de las pruebas en cualquier estación de trabajo:

```bash
# 1. Asegurar dependencias
npm install

# 2. Verificar compilación estricta TypeScript
npm run lint

# 3. Compilar empaquetado de producción
npm run build

# 4. Ejecutar la suite integral de pruebas de la Etapa 05
npm run test:etapa05
```

