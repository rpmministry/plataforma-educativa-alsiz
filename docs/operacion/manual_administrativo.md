# Manual Administrativo del Sistema
## Plataforma Educativa ALSIZ para Ekballo Church

- **Documento**: `docs/operacion/manual_administrativo.md`
- **Versión**: 1.0.0
- **Fecha**: 2026-10-16
- **Audiencia**: Administradores del Sistema, Directores Académicos y Personal de Secretaría

---

### 1. Introducción y Acceso Administrativo

El **Panel Administrativo Unificado de ALSIZ** proporciona una consola centralizada de gobernanza para la gestión de usuarios, matrícula de estudiantes, supervisión de agentes pedagógicos con IA, auditoría de privacidad conforme a la LOPDP y administración de cursos de educación continua y oficios.

#### 1.1. Acceso a la Consola
- **URL**: `/` -> Navegar al selector de rol "Administrador" o acceder con cuenta con rol `ADMIN`.
- **Autenticación**: Mediante correo institucional y contraseña (hasheada con algoritmo criptográfico `scrypt`).
- **Seguridad de Sesión**: La sesión se gestiona con cookies seguras `HttpOnly`. Tras 72 horas de inactividad (o 24 horas en producción según configuración), la sesión expira automáticamente.

---

### 2. Modelo de Roles y Permisos (RBAC)

La plataforma implementa un control de acceso basado en roles con separación estricta de privilegios:

```
+---------------------------------------------------------------------------------+
|                                 ADMIN (Superusuario)                           |
|       - Acceso total a base de datos, auditorías, agentes IA y configuración    |
+---------------------------------------------------------------------------------+
          |                                   |
          v                                   v
+-----------------------+           +-----------------------+
|   TEACHER (Docente)   |           |    PARENT (Tutor)     |
| - Gestión académica   |           | - Portal de padres    |
| - Calificaciones      |           | - Aislamiento Anti-   |
| - Feedback socrático  |           |   IDOR estricto       |
+-----------------------+           +-----------------------+
          |                                   |
          +-----------------+-----------------+
                            |
                            v
                  +-------------------+
                  | STUDENT (Alumno)  |
                  | - Aula interactiva|
                  | - Tutor socrático |
                  | - Cursos no form. |
                  +-------------------+
```

1. **`ADMIN` (Administrador General)**:
   - Configuración global del sistema.
   - Creación, modificación y desactivación de usuarios de cualquier rol.
   - Acceso sin restricciones a bitácoras de auditoría LOPDP y telemetría de IA.
   - Gestión de fuentes del Centro de Conocimiento (RAG) y configuración de agentes.
   - Gestión y emisión de certificaciones en Educación Continua, Artes y Oficios.

2. **`TEACHER` (Docente / Tutor Humano)**:
   - Creación y edición de unidades, lecciones y materiales académicos.
   - Calificación de evaluaciones sumativas y revisión de entregas prácticas.
   - Supervisión de intervenciones de los profesores IA en sus asignaturas.

3. **`PARENT` (Representante / Tutor Familiar)**:
   - Visualización exclusiva del progreso, calificaciones y asistencia de sus representados directos.
   - *Protección Anti-IDOR*: El sistema rechaza cualquier intento de consultar expedientes o estudiantes que no pertenezcan a su núcleo familiar.

4. **`STUDENT` (Estudiante)**:
   - Acceso al aula diaria interactiva, lecciones, retos formativos y diálogo con profesores IA.
   - Inscripción y avance en cursos de educación continua y oficios autorizados.

---

### 3. Pestañas del Centro Administrativo Unificado

El panel administrativo (`AdminShell.tsx`) está organizado en 7 módulos funcionales:

#### 3.1. Visión General (*Overview*)
- Métricas en tiempo real: número total de estudiantes activos, docentes registrados, fuentes de conocimiento aprobadas y constancias emitidas.
- Estado de los servicios de IA (indicador en vivo de disponibilidad de DeepSeek, Gemini y OpenRouter).
- Accesos rápidos a tareas recurrentes.

#### 3.2. Gestión de Estudiantes y Familias (*Students & Families*)
- **Registro de Estudiantes**: Alta de nuevos alumnos, asignación de fecha de nacimiento, subnivel educativo (Elemental, Media, Superior, Bachillerato) y vinculación con su representante legal.
- **Asignación de Matrícula**:
  - Matrícula en el Programa Escolar Formal Ekballo (K-12).
  - Inscripción normalizada en asignaturas troncales y complementarias.
- **Expediente Académico**: Consulta de historial de calificaciones, asistencia acumulada y observaciones pedagógicas.

#### 3.3. Centro de Conocimiento (*Knowledge Base*)
- Administración de documentos canónicos institucionales y doctrinales de Ekballo Church.
- Ingestión de documentos (PDF, TXT, Markdown): segmentación en fragmentos (*chunks*), generación de citas estructuradas `[S#]` y almacenamiento vectorial/FTS.
- **Control de Estado de Fuentes**:
  - `ACTIVE`: El motor RAG consulta e inyecta la fuente en las respuestas de los profesores IA.
  - `INACTIVE` / `REVOKED`: La fuente queda excluida de inmediato y de forma absoluta de cualquier consulta de IA para evitar respuestas desactualizadas o doctrinas no aprobadas.

#### 3.4. Profesores y Agentes IA (*AI Teachers*)
- Monitoreo de los agentes socráticos especializados:
  - *Dra. Sofía* (Ciencias y Biología)
  - *Profe Sarah* (Inglés comunicativo)
  - *Profe Valentina* (Matemáticas y Lógica)
  - *Profe Carla* (Historia y Ciencias Sociales)
  - *Maestra Lucía* (Lengua y Literatura)
  - *Pastor Mateo / Hermano David* (Relación con Dios y Formación Doctrinal)
- Ajuste de prompts de sistema, nivel de calidez pedagógica, rigurosidad socrática y límites éticos.

#### 3.5. Formación No Formal: Artes, Oficios y Educación Continua (*Continuing Ed*)
- Módulo especializado desarrollado en la Etapa 12 para cursos abiertos a la comunidad:
  - Creación de cursos con categoría (`ARTES_OFICIOS`, `TECNOLOGIA_PRACTICA`, `MINISTERIO_LIDERAZGO`, `HABILIDADES_VIDA`).
  - Configuración de cupo máximo (`max_capacity`) para evitar saturación de talleres.
  - Creación de módulos y lecciones multimedia (`VIDEO`, `READING`, `PRACTICE`, `WORKSHOP`).
  - Revisión y calificación de proyectos prácticos de los participantes.
  - Generación de constancias con firma criptográfica SHA-256 y descargo legal normativo (Art. 32 MINEDUC-2023-00069-A).

#### 3.6. Auditoría y Privacidad LOPDP (*Audit Logs*)
- Registro cronológico inmutable de todas las acciones administrativas y académicas relevantes.
- Cumplimiento de la Ley Orgánica de Protección de Datos Personales del Ecuador:
  - Anonimización automática irreversible de direcciones IP mediante HMAC/SHA-256.
  - Ausencia absoluta de contraseñas, PINs o datos biométricos en los registros.
  - Filtrado por fecha, usuario, tipo de acción y gravedad.

#### 3.7. Operaciones y Mantenimiento (*System Ops*)
- Visualización del tamaño de base de datos y migraciones aplicadas.
- Disparador de copias de seguridad en caliente (*Hot Backup*).
- Descarga de respaldos cifrados para almacenamiento seguro fuera del sitio (*offsite*).

---

### 4. Procedimientos Administrativos Frecuentes

#### 4.1. Creación y Matrícula Segura de Cuentas Estudiantiles en Base de Datos (API y Consola)

A partir de la Etapa 03, la plataforma eliminó el auto-registro no verificado en cliente y centralizó la autoridad de cuentas en la base de datos relacional (`POST /api/v1/admin/students` y `POST /api/v1/representatives/students`). El flujo formal de creación garantiza la integridad de 5 tablas relacionales y el cumplimiento de la Ley Orgánica de Protección de Datos Personales (LOPDP):

1. **Canales Autorizados**:
   - **Administración General (`ADMIN`)**: Accede a **Estudiantes y Familias** -> **Nuevo Estudiante en BD**. Requiere indicar representante legal y consentimiento formal.
   - **Portal de Familia (`REPRESENTATIVE`)**: Un representante legal autenticado puede matricular a un menor a su cargo mediante el endpoint protegido `/api/v1/representatives/students`, previa firma digital del consentimiento LOPDP.
2. **Campos Requeridos para el Registro**:
   - Datos del Estudiante: Nombres, Apellidos, Fecha de Nacimiento, Grado/Nivel (`levelId`, ej. 8vo EGB Superior), Código de Estudiante institucional único (`studentCode`, ej. `ALZ-2026-MATEO`).
   - Vinculación Familiar: Identificador de usuario del representante (`representativeUserId`) y Parentesco (`relationship`: `PADRE`, `MADRE`, `TUTOR_LEGAL`).
   - Consentimiento LOPDP: Declaración afirmativa del representante legal autorizando el tratamiento académico de datos del menor.
3. **Escritura Atómica en Base de Datos**:
   El backend ejecuta una transacción atómica que crea simultáneamente:
   - Registro en `users` (rol `STUDENT`, estado `ACTIVE`).
   - Registro en `students` con matrícula institucional y fecha de nacimiento.
   - Vínculo de custodia en `student_representatives` con flag de consentimiento verificado.
   - Matrícula general en `student_program_enrollments` para el ciclo lectivo activo.
   - Asignación de asignaturas obligatorias en `student_subject_enrollments`.
4. **Generación Segura y Entrega Privada de Credenciales Iniciales**:
   - Si no se suministra un PIN inicial, el sistema genera automáticamente un PIN numérico seguro de 6 dígitos mediante `crypto.randomInt()`.
   - El PIN se procesa de inmediato con el algoritmo de derivación de claves `scrypt` (salt aleatorio criptográfico) antes de ser persistido.
   - **Regla de Cero Exposición**: La contraseña o PIN en texto claro **NUNCA** se almacena en base de datos, **NUNCA** se escribe en bitácoras de auditoría y **NUNCA** se envía a servicios de telemetría.
   - Las credenciales iniciales se muestran una sola vez en el diálogo administrativo para que el funcionario las comunique a la familia por un canal privado y seguro (presencial, sobre cerrado o canal cifrado punto a punto).

#### 4.2. Suspensión y Reactivación Inmediata de Cuentas

Para salvaguardar la seguridad institucional o en casos de baja temporal:
1. Acceda a la ficha del usuario en **Estudiantes y Familias** o **Usuarios**.
2. Seleccione **Cambiar Estado** y elija `SUSPENDED` o `ACTIVE`.
3. Ingrese obligatoriamente la justificación administrativa (ej. *"Solicitud de retiro temporal por cambio de residencia"*).
4. **Efecto de Seguridad Inmediato**:
   - El backend registra el evento en `audit_events` (`USER_SUSPENDED`).
   - Se ejecuta `invalidateAllUserSessions(userId)` revocando instantáneamente todos los tokens y sesiones de base de datos activas.
   - Cualquier intento de consulta posterior con la cookie existente es rechazado de inmediato con `401 Unauthorized`.
   - Cualquier intento de nuevo inicio de sesión es bloqueado con código `403 Forbidden` (`AUTH_ACCOUNT_INACTIVE`), evitando fallbacks ficticios.

#### 4.3. Restablecimiento Seguro de Credenciales (PIN o Contraseña)

Cuando un estudiante o representante olvida sus credenciales de acceso:
1. En la consola administrativa, localice al usuario y presione **Restablecer Credenciales**.
2. Seleccione el tipo de restablecimiento: `PIN` (para alumnos K-12), `PASSWORD` (para docentes/representantes/administradores) o `BOTH`.
3. El sistema:
   - Genera una nueva credencial temporal criptográficamente robusta.
   - Hashea el nuevo secreto con `scrypt` y actualiza la tabla `users`.
   - Revoca de inmediato todas las sesiones activas del usuario para forzar re-autenticación.
   - Registra el evento `USER_CREDENTIALS_RESET` en auditoría (sin exponer el secreto).
4. Entregue la credencial temporal a la persona autorizada. En su primer ingreso, el sistema le solicitará cambiar la credencial temporal por una definitiva.

#### 4.4. Inhabilitación de una Fuente de Conocimiento Doctrinal
Si un documento doctrinal o pedagógico requiere revisión o actualización:
1. Diríjase a **Centro de Conocimiento**.
2. Localice la fuente por título o código.
3. Cambie el interruptor de estado de `ACTIVE` a `INACTIVE`.
4. El cambio tiene efecto instantáneo: ningún profesor IA volverá a citar fragmentos de esa fuente.

#### 4.5. Emisión Manual de Certificado de Oficios
1. En la pestaña **Artes & Oficios**, acceda a la lista de inscritos del curso respectivo.
2. Compruebe que el estudiante ha completado el 100% de las lecciones obligatorias y aprobado la evaluación práctica con nota mínima de 7.0/10.0.
3. Haga clic en **Emitir Constancia**. El sistema generará el código único (ej. `CERT-OFIC-2026-XXXX`) y la huella SHA-256 verificable públicamente.

