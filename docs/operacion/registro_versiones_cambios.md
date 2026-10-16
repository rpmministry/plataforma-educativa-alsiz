# Registro de Versiones y Control de Cambios (Changelog)
## Plataforma Educativa ALSIZ para Ekballo Church

- **Documento**: `docs/operacion/registro_versiones_cambios.md`
- **Estándar**: Semantic Versioning (SemVer 2.0.0)
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`

---

### [1.0.0] — 2026-10-16 (Etapa 14: Despliegue y Operación)

#### Resumen General
Versión candidata a producción integral y paquetizada de la **Plataforma Educativa ALSIZ para Ekballo Church**. Integra la totalidad de la suite de gobernanza operativa, herramientas de automatización de copias de seguridad en caliente, recuperación ante desastres verificada, runbooks de soporte y diagnósticos de salud operativa.

#### Añadido
- **Herramientas de Operación y Continuidad**:
  - `scripts/backup-db.ts`: Utilidad CLI para generación de copias de seguridad en caliente vía `VACUUM INTO` con consolidación previa de WAL y firma criptográfica SHA-256 (`npm run db:backup`).
  - `scripts/restore-db.ts`: Utilidad CLI para restauración segura y atómica con validación física obligatoria de integridad SQLite (`npm run db:restore`).
  - `scripts/health-check.ts`: Diagnóstico integral de entorno, migraciones, persistencia, artefactos y tablas (`npm run health`).
  - `scripts/test-etapa-14.ts`: Suite de pruebas automatizada de aseguramiento de despliegue (`npm run test:etapa14`).
- **Gobernanza y Documentación Operativa (`docs/operacion/`)**:
  - `guia_instalacion_despliegue.md`: Procedimientos reproducibles para VPS Linux, contenedores Docker y serverless.
  - `guia_configuracion_entornos.md`: Especificación exhaustiva de variables de entorno para Desarrollo, Staging y Producción sin divulgación de secretos.
  - `manual_administrativo.md`: Gobernanza de roles RBAC, gestión escolar, RAG y certificados no formales.
  - `manual_actualizacion_curricular.md`: Proceso de incorporación y modificación de destrezas MINEDUC, MCER y módulos doctrinales.
  - `guia_gestion_profesores_ia.md`: Filosofía socrática, parámetros de inferencia, salvaguardas éticas y rúbrica de supervisión pedagógica.
  - `procedimiento_respaldo_restauracion.md`: Políticas de retención, cronograma de backups y prueba real de restauración.
  - `procedimiento_respuesta_incidentes.md`: Matriz de severidad (Sev-1 a Sev-4), protocolos de contención LOPDP y fallover de IA.
  - `runbook_fallos_frecuentes.md`: Catálogo de 8 fallos conocidos con causas raíz y comandos de solución inmediata.
  - `registro_versiones_cambios.md`: Trazabilidad histórica completa de las 15 etapas técnicas.

---

### [0.13.0] — 2026-10-16 (Etapa 13: Auditoría Integral y Aceptación End-to-End)
- **Suite de Pruebas Unificada**: Implementación de `scripts/test-etapa-13.ts` con 10 dimensiones de auditoría crítica.
- **Aseguramiento de Calidad Total**: 141 casos de prueba automatizados ejecutados con 100% de éxito en etapas 05 a 13.
- **Auditoría de Privacidad LOPDP**: Verificación de anonimización HMAC/SHA-256 en direcciones IP y cero visibilidad cruzada de menores (Anti-IDOR).
- **Correcciones Menores**: Sincronización de columna `enrolled_count` en migración 012 y cierre explícito de descriptores de BD en Windows.

---

### [0.12.0] — 2026-10-16 (Etapa 12: Artes, Oficios y Educación Continua No Formal)
- **Migración 012**: Creación de 8 tablas relacionales para cursos de oficios, módulos, lecciones prácticas, evaluaciones sumativas y certificados.
- **Catálogo de Cursos Semilla**: Cursos prácticos en Electricidad Residencial Básica, Python con IA, Composición Visual y Homilética Ministerial.
- **Certificaciones Criptográficas**: Generación de códigos únicos, huella SHA-256 inmutable y descargo normativo expreso conforme al Art. 32 del Acuerdo MINEDUC-2023-00069-A.
- **Verificador Público Universal**: Endpoint `/api/v1/continuing-ed/certificates/verify/:codeOrHash` accesible sin autenticación previa.
- **Consola Administrativa**: Pestaña *Artes & Oficios* en `AdminShell.tsx`.

---

### [0.11.0] — 2026-10-16 (Etapa 11: Migración Controlada de Expedientes Gael y Avril)
- **Motor de Migración Sintética**: `server/migration/legacyMigrationEngine.ts` para importación limpia de datos académicos históricos de Wisdom School.
- **Normalización de Asignaturas**: Asignación de Gael a EGB Elemental y Avril a EGB Superior/Bachillerato.
- **Preservación Estricta**: Base de producción `data/alsiz.db` protegida contra modificaciones accidentales de datos de prueba.

---

### [0.10.0] — 2026-10-16 (Etapa 10: Centro Administrativo Unificado y Auditoría LOPDP)
- **Migración 011**: Tablas para configuración de agentes IA, telemetría y bitácora inmutable de auditoría.
- **Privacidad por Diseño**: Implementación de `server/middleware/auditMiddleware.ts` con hashing de IPs y ofuscación de datos sensibles.
- **Módulo de Respaldo**: Servicio inicial de Hot Backup (`server/backup/backupService.ts`) mediante `VACUUM INTO`.

---

### [0.9.0] — 2026-10-16 (Etapa 09: Aula Interactiva y Adaptación OpenMAIC)
- **Migración 010**: Tablas de sesiones interactivas, estados de agentes y mensajes de aula.
- **Motor Multiagente Socrático**: `server/pilot/pilotMultiAgentEngine.ts` con coordinación entre profesor titular, tutor de apoyo y moderador.
- **Sandbox Interactivo**: Componente `InteractivePilotSandbox.tsx` para experimentación pedagógica en vivo.

---

### [0.8.0] — 2026-10-16 (Etapa 08: Profesores IA y Coordinación Multiagente)
- **Migraciones 008 y 009**: Estructura de agentes de IA, parámetros de personalidad y perfiles docentes iniciales.
- **Orquestador en Cascada**: `server/agents/agentService.ts` implementando DeepSeek V3 -> Gemini 2.0 Flash -> OpenRouter -> Simulador Local.

---

### [0.7.0] — 2026-10-16 (Etapa 07: Centro de Conocimiento y Matrices Temáticas)
- **Migraciones 006 y 007**: Tablas para fuentes de conocimiento (`knowledge_sources`), fragmentos (`knowledge_chunks`) e índices de búsqueda FTS.
- **Citas Obligatorias**: Inyección de contexto con referencias estructuradas `[S#]` para sustento doctrinal y académico verificado.

---

### [0.6.0] — 2026-10-16 (Etapa 06: Núcleo Académico LMS)
- **Migraciones 004 y 005**: Modelado de periodos académicos, trimestres, calendarios, matrículas normalizadas y destrezas curriculares.
- **Servicios Académicos**: Enrutador `/api/v1/academic` para gestión de asignaturas y avance de estudiantes.

---

### [0.5.0] — 2026-10-16 (Etapa 05: Backend, Base de Datos Relacional y Seguridad)
- **Migraciones 001, 002 y 003**: Esquema inicial de usuarios, estudiantes, representantes legales, sesiones y roles RBAC.
- **Criptografía Segura**: Autenticación mediante `scrypt`, tokens de sesión en cookies `HttpOnly` y eliminación definitiva del bypass de login de Wisdom School.

---

### [0.4.0] — 2026-10-16 (Etapa 04: Sistema de Diseño e Identidad Ekballo Church)
- **Identidad Institucional**: Integración de paleta oficial (Azul Marino Profundo `#0A192F`, Dorado Reino `#D4AF37`, Blanco Puro), logotipos oficiales y tipografías en Tailwind CSS 4.
- **Componentes Visuales**: Adaptación de `Navbar`, `Sidebar`, `SchoolLogo` y vistas principales.

---

### [0.3.0] — 2026-10-16 (Etapa 03: Arquitectura Modular y Plan Técnico)
- **Documentación de Arquitectura**: Diagramas C4, modelo de datos relacional de 17 entidades, contratos de API RESTful y 6 Architecture Decision Records (ADRs).

---

### [0.2.0] — 2026-10-16 (Etapa 02: Currículo, Bilingüismo y Viabilidad Jurídica)
- **Marco Normativo Ecuador**: Dictamen técnico-jurídico sobre LOEI y Acuerdo Ministerial MINEDUC-2023-00069-A (Servicio Complementario No Formal).
- **Estructura Bilingüe**: Integración del marco MCER y los 7 módulos doctrinales de Ekballo Church.

---

### [0.1.0] — 2026-10-16 (Etapa 01: Auditoría de Repositorios y Requisitos)
- **Auditoría Técnica**: Análisis de 11 repositorios de referencia (incluyendo OpenMAIC y EduAgent) y catálogo de 32 requisitos clasificados (P0, P1, P2).

---

### [0.0.1] — 2026-10-16 (Etapa 00: Inicialización y Diagnóstico de Línea Base)
- **Diagnóstico Técnico**: Evaluación de la base heredada Wisdom School y establecimiento del marco de gobernanza documental en `docs/ejecucion/`.

