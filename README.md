# Plataforma Educativa ALSIZ para Ekballo Church
### Sistema Integral de Gestión del Aprendizaje (LMS), Tutoría Socrática con IA y Educación Continua

[![Estado del Proyecto](https://img.shields.io/badge/Estado-Producci%C3%B3n%20Preparada%20(v1.0.0)-success?style=for-the-badge&logo=shield)](https://github.com/rpmministry/plataforma-educativa-alsiz)
[![Licencia](https://img.shields.io/badge/Licencia-Privada%20Institucional-blue?style=for-the-badge)](https://github.com/rpmministry/plataforma-educativa-alsiz)
[![Node.js](https://img.shields.io/badge/Node.js-v22%20LTS-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-WAL%20Transaccional-003B57?style=for-the-badge&logo=sqlite)](https://www.sqlite.org/)

---

## 1. Visión General del Proyecto

La **Plataforma Educativa ALSIZ** es un ecosistema educativo digital concebido e implementado para **Ekballo Church**, orientado al acompañamiento integral de familias en modalidad de educación en casa (*Homeschool*), tutoría socrática escolar y formación profesional no formal en artes y oficios.

El sistema fusiona el rigor curricular del **Ministerio de Educación del Ecuador (MINEDUC)** y el marco bilingüe del **MCER (Marco Común Europeo de Referencia)** con una cosmovisión bíblica fundamentada en los **7 módulos doctrinales fundacionales de Ekballo Church**. La interacción pedagógica está potenciada por un claustro de profesores de Inteligencia Artificial que aplican un método socrático estricto para fomentar el pensamiento crítico, la autonomía y los valores cristianos.

---

## 2. Arquitectura Tecnológica del Sistema

La solución adopta una **arquitectura desacoplada, híbrida y de alto rendimiento**:

```
+-----------------------------------------------------------------------------------+
|                           CLIENTE WEB (SPA)                                       |
|  React 19 + TypeScript 5.8 + Vite 6 + Tailwind CSS 4 + Lucide Icons + Motion      |
|  - Portal del Estudiante (Aula Interactiva, Retos Diarios, Pistas Socráticas)     |
|  - Portal de Familias (Seguimiento Académico, Asistencia, Aislamiento Anti-IDOR)  |
|  - Consola Administrativa Unificada (Gestión Escolar, RAG, IA, Auditoría LOPDP)   |
|  - Catálogo y Verificador Público de Certificados de Oficios (Artes & Oficios)    |
+-----------------------------------------------------------------------------------+
                                         |
                       (API RESTful / Cookies HttpOnly)
                                         v
+-----------------------------------------------------------------------------------+
|                        BACKEND MODULAR (Node.js / Express 4)                      |
|  - Enrutamiento modular (/api/v1/auth, /academic, /knowledge, /agents, /pilot)    |
|  - Middleware de Seguridad (Autenticación scrypt, Sesiones HttpOnly, RBAC)        |
|  - Middleware de Privacidad LOPDP (Anonimización HMAC-SHA256, Sin PII en Logs)    |
|  - Orquestador de IA en Cascada (DeepSeek V3 -> Gemini 2.0 -> OpenRouter -> Local)|
|  - Motor de RAG con Citas Estructuradas [S#] (Centro de Conocimiento Institucional)|
|  - Servicio de Síntesis de Voz Neuronal (Google Cloud Text-to-Speech Neuronal2)   |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                   PERSISTENCIA RELACIONAL (SQLite3 Nativo WAL)                    |
|  - Motor: node:sqlite (Node.js 22 LTS) con PRAGMA foreign_keys = ON               |
|  - Modo Transaccional: Write-Ahead Logging (WAL) + synchronous = NORMAL           |
|  - Migrador Secuencial Versionado con Checksums SHA-256 (12 migraciones)          |
|  - Hot Backup Atómico en Caliente: VACUUM INTO con validación integrity_check     |
+-----------------------------------------------------------------------------------+
```

---

## 3. Características y Módulos Principales

### 3.1. Núcleo Académico Escolar (K-12 Homeschool)
- Estructuración curricular por niveles: **Educación General Básica (EGB Elemental, Media, Superior)** y **Bachillerato General Unificado (BGU)**.
- Alineación formal con las Destrezas con Criterios de Desempeño (DCD) del Currículo Nacional de Ecuador y estándares internacionales complementarios (Virginia SOL / NGSS).
- Marco de Bilingüismo Aditivo progresivo (Pre-A1 a B2) con actividades duales en español e inglés.
- Transversalización de las **7 Clases Doctrinales Fundacionales de Ekballo Church** en la asignatura troncal *Relación con Dios*.

### 3.2. Claustro de Profesores IA Socráticos
- **Dra. Sofía**: Ciencias Naturales, Biología y Creación.
- **Profe Sarah**: Inglés comunicativo e inmersión bilingüe (MCER).
- **Profe Valentina**: Matemáticas, Geometría y Pensamiento Lógico.
- **Profe Carla**: Historia, Ciencias Sociales y Providencia.
- **Maestra Lucía**: Lengua, Literatura y Redacción Creativa.
- **Pastor Mateo / Hno. David**: Relación con Dios y Formación Bíblica.
- **Método Socrático Puro**: Los agentes nunca entregan respuestas automáticas; guían mediante preguntas reflexivas, analogías y pistas graduales.
- **Resiliencia Total**: Cascada con conmutación automática ante fallos externos (*circuit-breaker*) y degradación transparente al simulador local sin interrupciones para el alumno.

### 3.3. Centro de Conocimiento Institucional (RAG)
- Ingestión, indexación y segmentación de documentos oficiales y bíblicos.
- Citas obligatorias `[S#]` en las respuestas de los profesores IA para garantizar fundamentación doctrinal y académica verificable.
- Exclusión instantánea de fuentes desactivadas o revocadas.

### 3.4. Formación No Formal: Artes, Oficios y Educación Continua
- Catálogo de cursos prácticos para la comunidad: Electricidad Residencial, Python con IA, Composición Visual y Homilética Ministerial.
- Control estricto de aforo y cupos máximos (`max_capacity`).
- Emisión de constancias de aprobación con **código único** y **firma digital SHA-256**.
- Inclusión obligatoria del descargo legal normativo conforme al **Art. 32 del Acuerdo Ministerial MINEDUC-2023-00069-A** (Servicio Educativo Complementario No Formal).
- **Verificador público universal** sin autenticación en `/api/v1/continuing-ed/certificates/verify/:codeOrHash`.

### 3.5. Portal de Familias y Privacidad LOPDP
- Aislamiento estricto de expedientes (**Anti-IDOR**): ningún tutor puede visualizar a estudiantes ajenos a su núcleo familiar.
- Cumplimiento de la **Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP)**:
  - Anonimización irreversible de direcciones IP mediante HMAC/SHA-256.
  - Cero contraseñas, PINs o datos personales sensibles en logs o respuestas públicas.
  - Almacenamiento seguro de credenciales con algoritmo criptográfico `scrypt`.

---

## 4. Requisitos del Sistema e Instalación

### 4.1. Requisitos Previos
- **Node.js**: v22.12.0 LTS o superior (requerido por `node:sqlite`).
- **npm**: v10.x o superior.
- **Memoria RAM**: Mínimo 1 GB (Recomendado: 2 GB a 4 GB para producción).
- **Almacenamiento**: Mínimo 2 GB libres en disco SSD.

### 4.2. Instalación Paso a Paso
```bash
# 1. Clonar el repositorio
git clone https://github.com/rpmministry/plataforma-educativa-alsiz.git
cd plataforma-educativa-alsiz

# 2. Instalar dependencias exactas
npm ci

# 3. Configurar variables de entorno
cp .env.example .env
# Configurar secretos y llaves en .env (ver Guía de Configuración)

# 4. Ejecutar migraciones de base de datos
npm run db:migrate

# 5. Compilar la aplicación para producción
npm run build

# 6. Ejecutar diagnóstico de salud
npm run health
```

---

## 5. Scripts y Comandos Operacionales

| Comando | Acción y Propósito |
|---|---|
| `npm run dev` | Inicia el entorno de desarrollo local interactivo con Vite HMR y Express. |
| `npm run build` | Compila la SPA de React y genera los bundles de producción del servidor. |
| `npm start` | Inicia el servidor de producción compilado en `dist/server.cjs`. |
| `npm run lint` | Ejecuta verificación de tipos estricta con TypeScript (`tsc --noEmit`). |
| `npm run health` | Diagnóstico en vivo de base de datos, 12 migraciones, tablas y salud operativa. |
| `npm run db:migrate` | Ejecuta de forma transaccional las migraciones SQL pendientes. |
| `npm run db:backup` | Genera un respaldo en caliente (Hot Backup) atómico con hash SHA-256. |
| `npm run db:restore` | Restaura una copia de seguridad con verificación obligatoria de integridad. |
| `npm run test:etapa14` | Ejecuta la suite de aseguramiento de calidad y despliegue (12 pruebas). |

---

## 6. Variables de Entorno

Copie `.env.example` para su configuración local. **Nunca comprometa claves reales en Git**.

```dotenv
# Entorno y Servidor
NODE_ENV=development
PORT=3000
DATABASE_PATH=./data/alsiz.db
APP_URL=http://localhost:3000

# Seguridad de Sesión (Mínimo 32 caracteres criptográficos)
SESSION_SECRET=alsiz_ekballo_session_secret_change_in_production_2026_min32bytes
SESSION_TTL_HOURS=72

# Proveedores de Inteligencia Artificial (Opcionales - Cuentan con Fallback Local)
DEEPSEEK_API_KEY=
DEEPSEEK_MODEL=deepseek-chat
GEMINI_API_KEY=
OPENROUTER_API_KEY=
OPENCODE_API_KEY=
GOOGLE_TTS_API_KEY=
```

*Para especificaciones de Staging y Producción, consulte [`docs/operacion/guia_configuracion_entornos.md`](docs/operacion/guia_configuracion_entornos.md).*

---

## 7. Estructura del Repositorio

```
plataforma-educativa-alsiz/
├── docs/                             # Biblioteca de documentación y gobernanza
│   ├── arquitectura/                 # Diagramas C4, modelo de datos, contratos API, ADRs
│   ├── curriculum/                   # Malla curricular, informe jurídico MINEDUC, bilingüismo
│   ├── diseno/                       # Sistema de diseño e identidad Ekballo Church
│   ├── ejecucion/                    # Bitácora histórica y expedientes de las etapas 00 a 14
│   │   ├── bitacora.md               # Registro cronológico detallado de intervenciones
│   │   ├── README.md                 # Índice general del sistema de etapas
│   │   └── etapas/ETAPA-00/ a 14/    # Planes, cambios, pruebas, validación y cierres
│   └── operacion/                    # Manuales operativos de producción (v1.0.0)
│       ├── guia_instalacion_despliegue.md
│       ├── guia_configuracion_entornos.md
│       ├── manual_administrativo.md
│       ├── manual_actualizacion_curricular.md
│       ├── guia_gestion_profesores_ia.md
│       ├── procedimiento_respaldo_restauracion.md
│       ├── procedimiento_respuesta_incidentes.md
│       ├── runbook_fallos_frecuentes.md
│       └── registro_versiones_cambios.md
├── public/                           # Activos estáticos, branding Ekballo y avatares
├── scripts/                          # Herramientas CLI y suites de pruebas automatizadas
│   ├── backup-db.ts                  # Generador de Hot Backups
│   ├── restore-db.ts                 # Restaurador y validador de integridad
│   ├── health-check.ts               # Diagnóstico de salud operativa
│   └── test-etapa-05.ts a 14.ts      # Banco de 153 pruebas automatizadas
├── server/                           # Backend modular en Node.js/Express
│   ├── agents/                       # Orquestador multi-proveedor y simulador local
│   ├── auth/                         # Criptografía scrypt, sesiones y tokens
│   ├── backup/                       # Servicio de copias de seguridad (VACUUM INTO)
│   ├── continuing-ed/                # Servicio de cursos de oficios y certificados
│   ├── db/                           # Conexión SQLite WAL y 12 migraciones versionadas
│   ├── knowledge/                    # Motor de RAG institucional y búsqueda FTS
│   ├── middleware/                   # RBAC, auditoría LOPDP, rate-limit y errores
│   ├── pilot/                        # Aula interactiva socrática multiagente
│   └── routes/                       # Enrutadores RESTful de la API v1
├── src/                              # Frontend React 19 (SPA)
│   ├── components/                   # Vistas de estudiante, familias, admin y componentes
│   ├── context/                      # Estado global de la aplicación (SchoolContext)
│   ├── services/                     # Clientes de API y utilidades de renderizado
│   └── types/                        # Definiciones de tipo TypeScript
├── dev-server.ts                     # Servidor de desarrollo integrado con Vite
├── server.ts                         # Servidor principal de Express y API
└── package.json                      # Definición de dependencias y scripts operacionales
```

---

## 8. Aseguramiento de Calidad y Cobertura de Pruebas

El sistema cuenta con un banco integral de **153 casos de prueba automatizados** ejecutados con **100% de éxito**:

- `test:etapa05` (Núcleo LMS, Auth & RBAC): 16/16 PASÓ
- `test:etapa06` (Centro de Conocimiento RAG): 25/25 PASÓ
- `test:etapa07` (Profesores IA & Fallback): 16/16 PASÓ
- `test:etapa08` (Aula Interactiva & Piloto): 17/17 PASÓ
- `test:etapa09` (Portal de Familias Anti-IDOR): 14/14 PASÓ
- `test:etapa10` (Privacidad LOPDP & Telemetría): 15/15 PASÓ
- `test:etapa11` (Consola Administrativa Unificada): 16/16 PASÓ
- `test:etapa12` (Artes, Oficios & Certificados): 12/12 PASÓ
- `test:etapa13` (Auditoría Integral End-to-End): 10/10 PASÓ
- `test:etapa14` (Aseguramiento de Despliegue): 12/12 PASÓ

---

## 9. Marco Normativo y Legal (Ecuador)

La operación de la plataforma está fundamentada en el marco legal de la República del Ecuador:
- **Constitución de la República del Ecuador (Art. 29)**: Garantiza la libertad de enseñanza y el derecho de las familias a elegir la educación para sus hijos.
- **Ley Orgánica de Educación Intercultural (LOEI - Art. 50)**: Reconocimiento de modalidades de aprendizaje no convencionales y educación en casa.
- **Acuerdo Ministerial MINEDUC-2023-00069-A (Art. 32)**: Delimitación de cursos de educación continua y oficios como *Servicio Educativo Complementario No Formal*, no conducente a título de bachillerato ni educación superior.
- **Ley Orgánica de Protección de Datos Personales (LOPDP - Arts. 21 y 22)**: Protección reforzada de datos personales de niñas, niños y adolescentes mediante anonimización criptográfica.

---

## 10. Despliegue en Producción

Para consultar los procedimientos detallados de puesta en producción con Nginx, PM2, Docker y políticas de contingencia:
- Consulte la [Guía de Instalación y Despliegue](docs/operacion/guia_instalacion_despliegue.md).
- Consulte el [Runbook de Fallos Frecuentes](docs/operacion/runbook_fallos_frecuentes.md).
- Consulte el [Procedimiento de Respaldo y Restauración](docs/operacion/procedimiento_respaldo_restauracion.md).

---

© 2026 **Ekballo Church**. Todos los derechos reservados.
Plataforma Educativa ALSIZ — Formando el carácter, la sabiduría y la vocación de las futuras generaciones.
