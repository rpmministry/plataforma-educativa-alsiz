# Riesgos y Decisiones Técnicas — ETAPA 05: Backend, Base de Datos, Identidad y Seguridad

## 1. Decisiones Técnicas Fundamentales (ADR)

### Decisión 1: Motor Relacional `node:sqlite` Nativo en Node 24 (Sin Dependencias C++)
- **Contexto**: Se requería un motor relacional embebido para desarrollo local y serverless sin incurrir en fallos de compilación nativa en Windows (`node-gyp`, Python o Visual Studio C++ Build Tools).
- **Decisión**: Utilizar el módulo nativo oficial de Node.js 24 `node:sqlite` (`DatabaseSync`).
- **Alternativas Descartadas**:
  - `better-sqlite3`: Descartado por requerir compilación nativa C++ en la máquina de desarrollo de Windows, lo que añade fricción de mantenimiento.
  - `prisma` / `typeorm`: Descartados por sobrecarga de dependencias (generación de binarios pesados de ~40 MB) para una fase de base técnica.
- **Beneficios**: Rendimiento nativo de alto nivel, soporte para transacciones atómicas, modo WAL (`journal_mode = WAL`) y cero dependencias externas.

### Decisión 2: Hashing Criptográfico con `node:crypto` (`scryptSync`) y Sal Aleatoria
- **Contexto**: El repositorio heredado almacenaba contraseñas y códigos PIN en texto plano en `mockData.ts` y `localStorage`.
- **Decisión**: Implementar `scryptSync` nativo con sal aleatoria de 16 bytes y comparación en tiempo constante (`crypto.timingSafeEqual`).
- **Alternativas Descartadas**:
  - `bcrypt`: Descartado por requerir binarios nativos adicionales.
  - Almacenar PINs en texto claro para el acceso en iPad: Descartado por violar los Arts. 21 y 22 de la LOPDP sobre tutela reforzada de menores.
- **Beneficios**: Cumplimiento de estándares NIST y OWASP, resistencia contra ataques de fuerza bruta y ataques por temporización (Timing Attacks).

### Decisión 3: Verificación de Autorización Anti-IDOR en Middleware de Servidor
- **Contexto**: Un atacante o estudiante curioso podría alterar el parámetro `:studentId` en la URL o peticiones HTTP para consultar notas o tareas de otros alumnos.
- **Decisión**: Implementar el middleware `requireStudentAccess` que cruza el `req.user.studentId` o consulta la tabla `student_representatives` en base de datos.
- **Beneficios**: Aislamiento estricto de núcleos familiares en el servidor; los errores no revelan si el expediente existe o no antes de validar la autorización.

### Decisión 4: Respaldo Transaccional en Caliente mediante `VACUUM INTO`
- **Contexto**: Se requería una técnica de respaldo en caliente de la base de datos sin detener el servidor ni provocar bloqueos en operaciones concurrentes.
- **Decisión**: Usar la instrucción nativa de SQLite `VACUUM INTO '<backup_path>'`, precedida por un checkpoint pasivo de WAL (`PRAGMA wal_checkpoint(PASSIVE)`).
- **Beneficios**: Copia atómica, desfragmentada e íntegra del archivo de base de datos en milisegundos.

---

## 2. Riesgos Residuales y Plan de Mitigación

| Riesgo Residual | Impacto | Probabilidad | Estrategia de Mitigación |
|---|:---:|:---:|---|
| Despliegue en entornos Serverless efímeros de solo lectura (ej. Vercel básico) | Medio | Media | En entornos serverless con sistema de archivos efímero, la base de datos SQLite opera en modo memoria para desarrollo o se conecta a Turso / Cloudflare D1 / PostgreSQL según lo previsto en ADR-001. El código de la API está desacoplado mediante sentencias SQL estándar. |
| Acumulación de sesiones expiradas en la tabla `sessions` | Bajo | Media | Se implementó la función `cleanupExpiredSessions()` que purga registros caducados; se programará como tarea periódica en la etapa de orquestación. |
| Sobrecarga de eventos en `audit_events` a gran escala | Bajo | Baja | La tabla cuenta con índices compuestos en `(user_id, created_at)` y `(event_type)`; en etapas posteriores se implementará archivado frío a JSON comprimido tras 1 año lectivo. |
