# Wisdom Academy
### Una educación rigurosa, con tecnología al servicio del aprendizaje.
**Lema:** *Aprender con profundidad. Avanzar con propósito.*

[![Estado del Proyecto](https://img.shields.io/badge/Estado-Producci%C3%B3n%20Preparada%20(v1.0.0)-success?style=for-the-badge&logo=shield)](https://github.com/rpmministry/plataforma-educativa-alsiz)
[![Licencia](https://img.shields.io/badge/Licencia-Privada%20Institucional-blue?style=for-the-badge)](https://github.com/rpmministry/plataforma-educativa-alsiz)
[![Node.js](https://img.shields.io/badge/Node.js-v22%20LTS-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-WAL%20Transaccional-003B57?style=for-the-badge&logo=sqlite)](https://www.sqlite.org/)
[![Turso](https://img.shields.io/badge/Turso-libSQL%20Cloud-00E599?style=for-the-badge&logo=sqlite)](https://turso.tech/)

---

## 1. Presentación institucional y propuesta de valor

**Wisdom Academy** es un entorno educativo digital diseñado para organizar experiencias académicas, acompañar el proceso de aprendizaje y facilitar el desarrollo del pensamiento crítico, la autonomía y el dominio progresivo de los conocimientos.

La plataforma ofrece una experiencia educativa moderna, sobria, elegante y centrada en el estudiante, donde la tecnología sirve como puente para una interacción pedagógica rigurosa y constructiva. Su arquitectura integra un microcurrículo organizado día a día, un claustro de profesores de Inteligencia Artificial guiados por el método socrático, recursos educativos abiertos de alta calidad y un sistema de evaluación formativa basado en evidencias y proyectos.

---

## 2. Público y finalidad educativa

Wisdom Academy está diseñada para:
- **Estudiantes de Educación General Básica (EGB) y Bachillerato (K-12):** Que cursan su formación en modalidades de educación en casa (*homeschooling*), programas flexibles o aprendizaje personalizado guiado.
- **Familias y Representantes Legales:** Que requieren un seguimiento cercano, transparente y seguro del avance académico, horas de dedicación pedagógica y evidencias de aprendizaje de sus hijos.
- **Docentes y Tutores Académicos:** Que supervisan el progreso, revisan entregas, orientan las dudas complejas y ajustan las rutas de aprendizaje.
- **Comunidad y Jóvenes en Formación Continua:** Que participan en cursos complementarios de artes, oficios y competencias tecnológicas.

---

## 3. Funcionalidades existentes

### 3.1. Núcleo Académico y Microcurrículo Adaptativo
- **Estructura por Trimestres y 200 Días Lectivos:** Malla curricular alineada a estándares educativos oficiales dividida en 3 trimestres, con proyectos interdisciplinarios integradores.
- **Planificación de Clases Socráticas Diarias:** 48 clases completas de Unidad 1 (25 para 4.° EGB y 23 para 8.° EGB) estructuradas en 4 fases pedagógicas:
  1. **Masterclass:** Micro-lecciones conceptuales con retos interactivos de asimilación.
  2. **Laboratorio:** Refuerzo audiovisual y simuladores interactivos abiertos (PhET Colorado bajo licencia CC-BY, GeoGebra y Scratch MIT).
  3. **Taller:** Actividades prácticas de aplicación y libreta de apuntes.
  4. **Evidencias:** Generación y descarga de diarios de clase combinados para registro en portafolio de evidencias.
- **Generador de Diarios y Guías Didácticas:** Compilador automatizado que compone las materias del día en un documento unificado listo para imprimir o guardar como PDF.

### 3.2. Claustro de Profesores Virtuales Socráticos
- **20 Asignaturas con Docente IA Especializado:** Profesores virtuales entrenados para cada materia (Ciencias Naturales, Matemáticas, Lengua y Literatura, Estudios Sociales, Inglés, etc.).
- **Método Socrático Puro:** Los tutores no entregan respuestas directas ni resuelven tareas automáticamente; formulan preguntas reflexivas, ofrecen pistas graduales y alientan al alumno a llegar a sus propias conclusiones.
- **Síntesis de Voz Asistida (TTS):** Integración con Google Cloud Text-to-Speech para lectura guiada y accesibilidad auditiva.
- **Resiliencia Multi-Proveedor:** Orquestador inteligente `ProviderManager` que gestiona en cascada:
  1. Google Gemini API (`@google/genai`)
  2. DeepSeek API (`deepseek-chat`)
  3. OpenRouter API
  4. Simulador Local Socrático en memoria (`SIMULATED_LOCAL`) como contingencia ante caídas de red o falta de saldo, garantizando cero errores 500 en clase.

### 3.3. Centro de Conocimiento Institucional (RAG)
- **Indexación y Fragmentación Semántica:** 22 fuentes curriculares aprobadas y 23 fragmentos indexados en SQLite RAG.
- **Citas Verificables:** Respuestas de los tutores fundamentadas con identificadores de fuente formal `[TAG#C1]`.
- **20 Matrices Temáticas Curriculares:** Versionadas en formato Markdown en `docs/ai-agents/matrices-tematicas/`.

### 3.4. Consola Administrativa Unificada
- **Gestión Escolar:** Administración de programas académicos, asignaturas, unidades y cronogramas.
- **Directorio de Usuarios y Roles:** Control de acceso basado en roles (RBAC: Estudiante, Representante, Docente, Administrador).
- **Supervisión de IA y Auditoría:** Tablero de disponibilidad de modelos, telemetría y registros de actividad sin exposición de datos confidenciales.

### 3.5. Formación Continua: Artes y Oficios
- Catálogo de cursos prácticos (Programación, Habilidades Manuales, Competencias Digitales).
- Control de aforo y cupos máximos por taller.
- Verificador público universal de constancias con firma criptográfica SHA-256.

---

## 4. Perfiles y experiencias de usuario

1. **Estudiante:**
   - Panel de estudio diario (*Mi Espacio*), horario escolar semanal interactivo, aula de clase con micro-lecciones, chat socrático continuo y libreta de evidencias.
2. **Representante / Familia:**
   - Visualización de materias, avance por proyectos, bitácora de dedicación semanal y consulta del boletín de calificaciones oficial.
3. **Docente / Tutor:**
   - Seguimiento del progreso de micro-lecciones, historial de preguntas a los tutores IA y validación de evidencias presentadas.
4. **Administrador:**
   - Gestión integral del sistema en `AdminShell`, monitoreo del motor de base de datos, diagnóstico de salud de proveedores de IA y herramientas de respaldo.

---

## 5. Arquitectura técnica del sistema

La plataforma cuenta con una arquitectura moderna, desacoplada y preparada tanto para ejecución local persistente como para despliegue en la nube:

```
+-----------------------------------------------------------------------------------+
|                        FRONTEND WEB — CLIENTE (SPA)                               |
|  React 19 • TypeScript 5.8 • Vite 6 • Tailwind CSS v4 • Lucide Icons • Motion     |
|  - Identidad visual oficial Wisdom Academy (paleta neutra con acentos Luz #E0A82E)|
|  - Tipografías oficiales: Poppins (Títulos), Figtree (Lectura), Lora (Citas)       |
|  - Ergonomía táctil para tabletas y diseño responsive para móviles y escritorio   |
+-----------------------------------------------------------------------------------+
                                         │
                       (API RESTful / Cookies HttpOnly Seguras)
                                         ▼
+-----------------------------------------------------------------------------------+
|                        BACKEND MODULAR — SERVIDOR API                             |
|  Node.js (>=22.12.0) • Express 4 • TypeScript • esbuild                           |
|  - Enrutamiento modular en /api/v1 (auth, students, representatives, admin, etc.) |
|  - Middleware de Seguridad (scryptSync con sal, cookies Lax/HttpOnly, RBAC)       |
|  - ProviderManager IA (Gemini, DeepSeek, OpenRouter, Simulador Local)             |
|  - Centro de Conocimiento RAG sobre SQLite FTS                                    |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|                        CAPA DE PERSISTENCIA RELACIONAL                            |
|  - Modo A (Local/VPS/Docker): node:sqlite nativo con WAL y PRAGMA foreign_keys    |
|  - Modo B (Cloud/Serverless): Turso Cloud / libSQL (via @libsql/client)           |
|  - 13 Migraciones versionadas con control de esquema (schema_migrations)          |
|  - Hot Backup atómico en caliente: VACUUM INTO con validación integrity_check     |
+-----------------------------------------------------------------------------------+
```

---

## 6. Tecnologías y dependencias principales

- **Frontend:**
  - `react` / `react-dom`: `^19.0.1`
  - `vite`: `^6.2.3`
  - `tailwindcss` / `@tailwindcss/vite`: `^4.1.14`
  - `lucide-react`: `^0.546.0`
  - `motion`: `^12.23.24`
- **Backend y Persistencia:**
  - `express`: `^4.21.2`
  - `node:sqlite`: Integrado nativamente en Node.js 22 LTS
  - `@libsql/client`: `^0.18.0` (Turso Cloud)
  - `zod`: `^4.6.7`
  - `esbuild`: `^0.25.0`
  - `tsx`: `^4.21.0`
- **Servicios Externos e IA:**
  - `@google/genai`: `^2.4.0` (Gemini API)
  - `resend`: `^6.34.1` / `nodemailer`: `^9.1.0`

---

## 7. Requisitos de instalación y puesta en marcha

### 7.1. Requisitos Previos
- **Node.js:** Versión `>= 22.12.0 LTS` (indispensable para el módulo nativo `node:sqlite`).
- **npm:** Versión `>= 10.0.0`.
- **Sistema Operativo:** Compatible con Windows, Linux y macOS.

### 7.2. Puesta en marcha paso a paso

```bash
# 1. Instalar dependencias exactas
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local

# 3. Aplicar migraciones a la base de datos
npm run db:migrate

# 4. Iniciar el servidor en modo desarrollo
npm run dev

# 5. Para compilar y ejecutar en modo producción
npm run build
npm start
```

La aplicación quedará disponible en `http://localhost:3000`.

---

## 8. Variables de entorno

Cree un archivo `.env.local` en la raíz del proyecto. Las variables sensibles nunca deben incluirse en el control de versiones:

```dotenv
# Configuración del servidor y entorno
NODE_ENV=development
PORT=3000
DATABASE_PATH=./data/alsiz.db
APP_URL=http://localhost:3000

# Seguridad de sesiones (Obligatoria: mínimo 32 caracteres criptográficos)
SESSION_SECRET=clave_secreta_robusta_para_produccion_de_al_menos_32_caracteres_hex

# Proveedores de Inteligencia Artificial (Opcionales con fallback automático a simulador)
GEMINI_API_KEY=
DEEPSEEK_API_KEY=
DEEPSEEK_MODEL=deepseek-chat
OPENROUTER_API_KEY=
GOOGLE_TTS_API_KEY=

# Base de datos Turso Cloud (Opcional si se utiliza el motor local SQLite)
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

---

## 9. Comandos del proyecto

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo Vite con Express en puerto 3000. |
| `npm run build` | Compila la SPA frontend a `dist/` y empaqueta el servidor con esbuild a `dist/server.cjs` y `api-server.js`. |
| `npm start` | Inicia el servidor de producción compilado (`node dist/server.cjs`). |
| `npm run lint` | Comprueba tipos en todo el proyecto mediante TypeScript (`tsc --noEmit`). |
| `npm run health` | Diagnóstico de persistencia, integridad de SQLite, migraciones y artefactos. |
| `npm run db:migrate` | Ejecuta de forma segura las migraciones SQL pendientes. |
| `npm run db:backup` | Genera una copia de seguridad atómica en caliente (`VACUUM INTO`). |
| `npm run db:restore` | Restaura y verifica la integridad física de una copia de seguridad. |
| `npm run test:security-p0` | Suite de 10 pruebas de seguridad (sanitización de claves, scrypt, secretos). |
| `npm run test:etapa11-acceptance` | Suite de aceptación y pre-vuelo de inicio de clases (19 pruebas integrales). |
| `npm run test:turso` | Validación de conexión y flujo de autenticación contra Turso libSQL Cloud. |

---

## 10. Pruebas y mecanismos de validación

El proyecto cuenta con un sistema riguroso de pruebas que garantiza la estabilidad técnica antes de cada pase:
- **Verificación de tipos:** `tsc --noEmit` sin supresiones artificiales (0 errores).
- **Sanitización de código de producción:** Escaneo automatizado de bundles en `dist/` para certificar cero filtración de secretos, API keys o variables de entorno del servidor.
- **Aislamiento en producción:** Las migraciones de semillas de prueba (`003_seed_dev_data.sql`, `005_lms_seed_data.sql`, etc.) se omiten automáticamente en entornos de producción mediante control estricto en `migrator.ts`.
- **Integridad referencial:** Verificación continua de claves foráneas y ausencia de registros huérfanos.

---

## 11. Seguridad, privacidad y tratamiento de datos

- **Criptografía de Contraseñas y PINs:** Almacenamiento mediante `scryptSync` con sal criptográfica aleatoria de 16 bytes y parámetros de coste computacional seguro.
- **Gestión de Sesiones:** Cookie `alsiz_session` configurada con directivas `HttpOnly`, `SameSite=Lax`, `Path=/`, `Max-Age=72h` y flag `Secure` automático en conexiones HTTPS.
- **Protección contra IDOR:** Los controladores de estudiantes y representantes validan que el usuario autenticado posea autorización explícita de parentesco o rol directivo sobre el expediente solicitado.
- **Anonimización de Telemetría (LOPDP):** Las direcciones IP en los registros de auditoría son procesadas con función hash HMAC-SHA256 para evitar el almacenamiento de identificadores directos de menores de edad.

---

## 12. Procedimientos de despliegue

### 12.1. Despliegue en Vercel
- El frontend se compila como paquete estático en `dist/`.
- La función serverless `api-entry.js` actúa como reverse proxy hacia el backend persistente configurado en la variable `BACKEND_URL`, protegiendo la base de datos de la naturaleza efímera de los entornos serverless.
- Cuando se configura Turso Cloud (`TURSO_DATABASE_URL`), el backend puede operar de manera agnóstica sin requerir volumen de disco físico montado.

### 12.2. Despliegue en Servidor Dedicado / VPS / Contenedor
- Se compila el proyecto con `npm run build`.
- Se ejecutan las migraciones con `npm run db:migrate`.
- Se inicia el proceso con gestor PM2 o Docker mediante `node dist/server.cjs`, manteniendo el volumen persistente en la ruta configurada en `DATABASE_PATH`.

---

## 13. Limitaciones actuales y tareas planificadas

1. **Liberación progresiva curricular:** La Unidad 1 (Semanas 1 a 4) cuenta con 48 clases socráticas completas desarrolladas. Las unidades correspondientes a los trimestres 2 y 3 se encuentran estructuradas a nivel de asignaturas y objetivos, programadas para su liberación progresiva conforme al avance del calendario escolar.
2. **Exportación formal de bitácora:** Las funciones de descarga de sílabo oficial con firma digital institucional y exportación de bitácora ministerial se encuentran maquetadas y orientadas a fases de integración con servicios externos de firma.

---

## 14. Descargo institucional y titularidad

**Naturaleza del Servicio Educativo:**  
Wisdom Academy es un entorno digital de apoyo pedagógico, tutoría socrática inteligente y formación académica para familias en educación en casa (*Homeschooling*). Este servicio complementario no constituye por sí mismo un establecimiento educativo escolarizado presencial con código AMIE ni emite títulos oficiales de bachiller de forma directa. La convalidación y registro de estudios ante el Ministerio de Educación corresponde a los representantes legales conforme a la normativa vigente.

© 2026 **Wisdom Academy**. Todos los derechos reservados.

**Naturaleza del Servicio Educativo:**  
Wisdom Academy es un entorno digital de apoyo pedagógico, tutoría socrática inteligente y formación académica para familias en educación en casa (*Homeschooling*). Este servicio complementario no constituye por sí mismo un establecimiento educativo escolarizado presencial con código AMIE ni emite títulos oficiales de bachiller de forma directa. La convalidación y registro de estudios ante el Ministerio de Educación corresponde a los representantes legales conforme a la normativa vigente.

© 2026 **Wisdom Academy**. Todos los derechos reservados.

