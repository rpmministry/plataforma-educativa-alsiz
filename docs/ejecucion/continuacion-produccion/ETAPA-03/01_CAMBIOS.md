# Registro Detallado de Cambios — Etapa 03: Conectar Interfaz, Autenticación y Creación de Cuentas en Base de Datos

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-03`  
**Commit Base:** `1a7964c`  
**Estado:** `COMPLETADO`

---

## 1. Resumen Ejecutivo de la Intervención

En la Etapa 03 se eliminó por completo la discrepancia histórica entre la interfaz de usuario en React y el backend de base de datos relacional (`/api/v1`). La autoridad de autenticación fue transferida íntegramente al servidor mediante cookies seguras `HttpOnly` (`alsiz_session`), erradicando la vulnerabilidad de sesiones autodeclaradas en `localStorage` (`wisdom_auth_v2026`). Adicionalmente, se reemplazó el auto-registro simulado por un flujo administrativo y de tutor legal con escrituras transaccionales en 5 tablas de base de datos, aislamiento estricto Anti-IDOR/Anti-BOLA, validación Zod y auditoría inmutable libre de contraseñas en texto claro.

---

## 2. Catálogo de Archivos Creados y Modificados

### 2.1 Backend y Rutas de Servidor

#### A. `server/routes/authRoutes.ts`
- **Cambio de Contraseña y PIN**:
  - `POST /api/v1/auth/change-password`: Valida contraseña actual mediante `verifyPassword`, genera nuevo hash con `scrypt` y revoca sesiones previas del usuario.
  - `POST /api/v1/auth/change-pin`: Valida PIN actual, deriva hash `scrypt` del nuevo PIN de 4-6 dígitos y actualiza `users.pin_hash`.
- **Autenticación con PIN Institucional**:
  - `POST /api/v1/auth/login-pin` y `POST /api/v1/auth/pin-login`: Rutas unificadas que admiten `{ studentCode, pinCode }` o `{ identifier, pin }`. Localizan al estudiante por `student_code`, `enrollment_number`, `username` o `email`, verifican que el usuario esté en estado `ACTIVE`, validan el hash `scrypt`, crean la sesión en base de datos (`sessions`) y emiten la cookie `alsiz_session` con `HttpOnly`, `SameSite=Lax`.
- **Contrato de Identidad en Sesión Actual**:
  - `GET /api/v1/auth/me`: Retorna un payload enriquecido `{ success: true, data: { user: req.user, ...req.user } }`, garantizando interoperabilidad inmediata tanto para clientes que consumen `res.data.user` como para aquellos que acceden a los atributos en el primer nivel (`res.data.id`, `res.data.role`).
- **Verificación de Google Sign-In en Servidor**:
  - `POST /api/v1/auth/google`: Valida el `credential` (ID Token de Google) directamente contra los servidores de Google (`https://oauth2.googleapis.com/tokeninfo`). En caso exitoso y si el usuario está registrado y activo, establece la cookie de sesión institucional. Si no está configurado el cliente, rechaza con código honesto `503` o `401`, eliminando cualquier bypass o sesión ficticia.
- **Cierre Seguro de Sesión**:
  - `POST /api/v1/auth/logout`: Revoca el registro de sesión en la tabla `sessions` de la base de datos y envía la cabecera `Set-Cookie: alsiz_session=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`.

#### B. `server/routes/adminRoutes.ts`
- **Creación Atómica de Estudiantes en Base de Datos**:
  - `POST /api/v1/admin/students`: Endpoint administrativo protegido (`requireAuth`, `requireRole(['ADMIN'])`).
  - Validación con esquema Zod `createStudentSchema` (nombres, apellidos, grado/nivel, código único de estudiante, ID del representante, parentesco y consentimiento LOPDP).
  - Generación de PIN aleatorio criptográfico si no se envía uno explícito.
  - Almacenamiento seguro con hash `scrypt` en `users.pin_hash`.
  - Inserción relacional atómica en:
    1. `users` (`role='STUDENT'`, `status='ACTIVE'`).
    2. `students` (`student_code`, `enrollment_number`, `birth_date`).
    3. `student_representatives` (`relationship`, `is_primary=1`, `consent_date`).
    4. `student_program_enrollments` (`program_id`, `academic_cycle_id`, `level_id`).
    5. `student_subject_enrollments` (asignaturas vinculadas al nivel cursado).
  - Registro de auditoría `STUDENT_ACCOUNT_CREATED` (cero contraseñas en texto claro).
- **Gestión de Estados de Cuenta con Revocación Instantánea**:
  - `PATCH /api/v1/admin/users/:userId/status`: Permite alternar entre `ACTIVE` y `SUSPENDED` con justificación obligatoria. Al suspender una cuenta, invoca `invalidateAllUserSessions(userId)` expulsando de inmediato cualquier sesión activa en curso.
- **Restablecimiento Administrativo de Credenciales**:
  - `POST /api/v1/admin/users/:userId/reset-credentials`: Permite restablecer `PIN`, `PASSWORD` o ambos. Genera credenciales aleatorias temporales seguras, las hashea con `scrypt`, invalida sesiones activas y registra `USER_CREDENTIALS_RESET` en `audit_events`.

#### C. `server/routes/representativeRoutes.ts`
- **Matrícula Directa por Tutor Legal**:
  - `POST /api/v1/representatives/students`: Permite a un representante legal matriculado dar de alta y matricular a sus menores con verificación formal de consentimiento de datos.
- **Protección Anti-BOLA en Consulta Familiar**:
  - `GET /api/v1/representatives/students/:studentId/academic-summary`: Verifica la relación familiar en `student_representatives`. Si un representante intenta acceder a un estudiante ajeno, rechaza con `403 Forbidden` (`FORBIDDEN_STUDENT_ACCESS`) y registra el evento `CROSS_FAMILY_ACCESS_BLOCKED` en `audit_events`.

#### D. `server/db/dal.ts`
- **Normalización de Parámetros SQLite**:
  - En `SqliteLocalAdapter.run()`, `get()` y `all()`, se normalizaron los parámetros entrantes mapeando cualquier valor `undefined` a `null`. Esto previene el error nativo de `node:sqlite` (`TypeError: Provided value cannot be bound to SQLite parameter`).

#### E. `server/auth/crypto.ts`
- **Validación Robusta de Secretos**:
  - Corrección en `validateProductionSessionSecret()` para priorizar el parámetro explícito recibido en tests o arranques programáticos, manteniendo la restricción de longitud mínima de 32 caracteres y rechazo de cadenas por defecto.

---

### 2.2 Frontend SPA (React + TypeScript)

#### A. `src/services/apiClient.ts`
- Cliente API centralizado y tipado (`apiClient`):
  - Inclusión obligatoria de `credentials: 'include'` en todas las llamadas `fetch` para garantizar el transporte de la cookie segura `alsiz_session`.
  - Detección y manejo resiliente de respuestas no JSON (páginas de error HTML 404/502/503) evitando excepciones en `res.json()`.
  - Jerarquía tipada de errores con la clase `ApiError` (`status`, `errorCode`, `details`).
  - Clientes específicos expuestos: `authApi`, `adminApi`, `representativeApi`, `subjectsApi`.

#### B. `src/context/SchoolContext.tsx`
- **Eliminación de la Autoridad en LocalStorage**:
  - Eliminado el auto-login basado en `localStorage.getItem('wisdom_auth_v2026')`.
  - Agregado estado de verificación `isSessionLoading` al montar el contexto.
  - Comprobación autoritativa en servidor al iniciar la aplicación mediante `authApi.getMe()`.
  - Eliminado el almacenamiento de tokens reutilizables (`TOKEN_KEY`) en el almacenamiento del navegador.
- **Eliminación del Fallback Silencioso**:
  - En `loginStudent`, se erradicó la simulación de éxito con datos en memoria ante fallos del servidor. Los errores son propagados de forma honesta a la interfaz.
- **Nuevas Capacidades de Contexto**:
  - `currentUser`: Perfil institucional tipado del usuario autenticado en sesión (`id`, `username`, `email`, `role`, `status`).
  - `refreshSession()`: Función expuesta para re-validar la sesión actual contra el backend.
  - `createStudentInDatabase()`: Método integrado para invocar la creación transaccional en base de datos desde la interfaz.

#### C. `src/components/auth/StudentLoginModal.tsx`
- Integración directa con `authApi.login()` y `authApi.pinLogin()`.
- Soporte para inicio seguro con Google (`authApi.googleLogin`).
- Mensajes visuales honestos y específicos para cada situación:
  - Error de credenciales (`AUTH_INVALID_CREDENTIALS`).
  - Cuenta suspendida o inactiva (`AUTH_ACCOUNT_INACTIVE`).
  - Servicio no disponible o falla de conexión de red (`NETWORK_OFFLINE`, `SERVICE_UNAVAILABLE`).
  - Google Client ID no configurado (aviso institucional sin accesos simulados).

#### D. `src/components/auth/AccessView.tsx`
- Eliminado el bypass de acceso por simple clic en las tarjetas de perfil.
- Al seleccionar un rol o perfil, si no existe una sesión válida activa en backend (`isAuthenticated === false`), el sistema abre el modal de inicio de sesión correspondiente solicitando credenciales reales.

#### E. `src/components/landing/LandingView.tsx`
- Adaptado el botón de Google Sign-In para consumir la autenticación real del backend.

#### F. `src/components/landing/NewStudentModal.tsx`
- Sustituido el registro local en memoria por la invocación a `createStudentInDatabase()`.
- Integrado aviso institucional de cumplimiento LOPDP: si un visitante anónimo intenta registrar un estudiante, se le informa que la matrícula requiere la supervisión de un Representante Legal acreditado o de la Secretaría institucional.

#### G. `src/components/auth/AccountSettingsModal.tsx`
- Adaptado para ejecutar `changePassword` de manera asíncrona contra la API del backend, reportando errores con precisión.

---

### 2.3 Manuales y Scripts de Prueba

#### A. `docs/operacion/manual_administrativo.md`
- Actualizada la sección 4 con los procedimientos estándar de:
  - Matrícula y creación de estudiantes en base de datos (5 tablas relacionales).
  - Generación, hashing `scrypt` y entrega privada de credenciales iniciales.
  - Suspensión y reactivación con revocación instantánea de sesiones.
  - Restablecimiento seguro de PIN y contraseñas.

#### B. `scripts/test-etapa-03.ts` y `package.json`
- Creada suite de pruebas con 10 casos exhaustivos de integración (`npm run test:etapa03`).

