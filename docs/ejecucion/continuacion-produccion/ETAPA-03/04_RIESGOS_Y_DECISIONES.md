# Registro de Riesgos y Decisiones de Arquitectura — Etapa 03: Conectar Interfaz, Autenticación y Creación de Cuentas en Base de Datos

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-03`  
**Estado:** `CONSOLIDADO`

---

## 1. Decisiones de Arquitectura y Seguridad (ADR)

### ADR-01: Cookies HttpOnly vs. Tokens en `localStorage`
- **Contexto**: La aplicación heredada almacenaba tokens reutilizables y claves identificadoras de usuario en `localStorage` (`wisdom_auth_v2026`, `alsiz_auth_token`), lo que permitía ataques de XSS (Cross-Site Scripting) y suplantación inmediata de identidad mediante la simple inyección de un script en el navegador.
- **Decisión**: La única credencial autoritativa para el transporte de sesión es la cookie `alsiz_session` con banderas `HttpOnly`, `SameSite=Lax` y `Secure` (en entornos HTTPS). Se eliminó por completo el almacenamiento de tokens de sesión reutilizables en `localStorage`.
- **Impacto**: La sesión resiste la recarga de página de forma transparente, es inmune al robo mediante scripts en el cliente y delega la validación de vigencia al backend en cada petición.

### ADR-02: Normalización de Parámetros en el Adaptador DAL SQLite
- **Contexto**: El motor nativo `node:sqlite` arroja una excepción fatal (`TypeError: Provided value cannot be bound to SQLite parameter`) cuando un parámetro de una sentencia preparada es `undefined` en lugar de `null`.
- **Decisión**: Se implementó una normalización automática en `SqliteLocalAdapter` (`dal.ts`) que mapea cualquier valor `undefined` a `null` antes de invocar `stmt.run()`, `stmt.get()` o `stmt.all()`.
- **Impacto**: Se previenen caídas inesperadas de rutas cuando campos opcionales del esquema Zod (ej. `avatarUrl`, `phone`, `metadata`) no son proporcionados por el cliente.

### ADR-03: Revocación Instantánea de Sesiones en Casos de Suspensión y Reseteo
- **Contexto**: En sistemas web tradicionales, si un administrador suspende a un usuario o restablece su contraseña, las sesiones activas en navegadores de terceros pueden permanecer abiertas hasta que expire el TTL del token.
- **Decisión**: Al invocar `PATCH /api/v1/admin/users/:userId/status` hacia `SUSPENDED` o `POST /api/v1/admin/users/:userId/reset-credentials`, el backend ejecuta `invalidateAllUserSessions(userId)` eliminando físicamente las sesiones de la tabla `sessions`. Adicionalmente, el middleware de validación comprueba `u.status = 'ACTIVE'` en cada consulta a la base de datos.
- **Impacto**: La expulsión de un usuario suspendido o vulnerado es **instantánea e irrevocable**. Cualquier petición concurrente posterior retorna `401 Unauthorized`.

### ADR-04: Transaccionalidad en la Matrícula Escolar (5 Tablas)
- **Contexto**: Un estudiante no es simplemente una fila en `users`. Para que la plataforma opere de forma coherente, requiere identidad institucional, vínculo con el representante legal, matrícula en el ciclo lectivo y asignación a las materias correspondientes.
- **Decisión**: Los endpoints de creación (`adminRoutes.ts` y `representativeRoutes.ts`) realizan una inserción atómica que vincula `users`, `students`, `student_representatives`, `student_program_enrollments` y `student_subject_enrollments` con verificación del consentimiento LOPDP.
- **Impacto**: Se erradica la posibilidad de crear cuentas huérfanas o incompletas que provoquen pantallas en blanco en el panel del alumno.

### ADR-05: Validación Estricta de Google Sign-In en Servidor sin Fallbacks Ficticios
- **Contexto**: La interfaz original contaba con un botón de Google Sign-In que en ocasiones simulaba un login exitoso en entornos de desarrollo cuando las credenciales no estaban configuradas.
- **Decisión**: La verificación del ID Token de Google se delegó a `POST /api/v1/auth/google`, que consulta el endpoint oficial `oauth2.googleapis.com/tokeninfo`. Si la variable `VITE_GOOGLE_CLIENT_ID` no está definida en el entorno, el botón muestra un mensaje claro al usuario indicando que el servicio no está habilitado, sin admitir atajos ni simulaciones.
- **Impacto**: Mayor transparencia institucional y apego estricto a las políticas de seguridad de producción.

---

## 2. Análisis de Riesgos y Medidas de Mitigación

| Riesgo Identificado | Severidad | Probabilidad | Medida de Mitigación Implementada |
| :--- | :---: | :---: | :--- |
| **Acceso cruzado entre estudiantes (IDOR)** | ALTA | BAJA | Verificación de propiedad en cada endpoint de expedientes y calificaciones. Bloqueo 403 y auditoría. |
| **Acceso cruzado entre representantes (BOLA)** | ALTA | BAJA | Validación de custodia en `student_representatives`. Si el menor no está vinculado al tutor, se deniega con 403 (`CROSS_FAMILY_ACCESS_BLOCKED`). |
| **Exposición de contraseñas o PINs en auditoría** | CRÍTICA | BAJA | Algoritmo `scrypt` antes de guardar. Redacción automática de claves sensibles (`pin`, `password`, `secret`) en `auditLogger`. |
| **Desincronización de UI ante fallo de red** | MEDIA | MEDIA | Eliminación del fallback silencioso. La UI expone códigos de error honestos (`NETWORK_OFFLINE`, `SERVICE_UNAVAILABLE`) solicitando reintento. |
| **Pérdida de sesión en recarga de navegador** | MEDIA | BAJA | Implementación de `authApi.getMe()` en el montaje de `SchoolProvider` con soporte a cookies `credentials: 'include'`. |

