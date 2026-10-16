# Bitácora de Ejecución Técnica — Plataforma Educativa ALSIZ para Ekballo Church

Registro cronológico de etapas ejecutadas bajo los estándares de liderazgo técnico, trazabilidad y control de cambios.

---

### Entrada: 2026-10-16 — ETAPA-00: Inicialización del Marco de Ejecución, Auditoría Técnica de Línea Base y Diagnóstico de Entorno

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-00-inicializacion-y-linea-base`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad`.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Verificación exhaustiva de comandos git: `rev-parse`, `status`, `branch`, `remote -v`, `log -1`.
  - Verificación del árbol de trabajo: preservación íntegra de archivos no rastreados existentes (`DOCUMENTOS EKBALLO/` y `WISDOM-SCHOOL-SHOWCASE.md`).
  - Creación del sistema de documentación de ejecución estructurada en `docs/ejecucion/`.
  - Ejecución de pruebas de línea base:
    - Type-check / Lint (`npm run lint` -> `tsc --noEmit`): **PASÓ** (código de salida 0).
    - Build de producción (`npm run build` -> Vite + esbuild dev-server + esbuild server): **PASÓ** (código de salida 0).
  - Identificación del inventario de insumos institucionales de Ekballo Church (branding, PDFs de clases 1 a 7, estudio de mercado).
  - Documentación de los riesgos arquitectónicos heredados de Wisdom School (gestión de llaves en cliente, residuos de Next.js, endpoints de backend).
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Esperar instrucciones específicas y alcance formal del responsable técnico antes de iniciar `ETAPA-01`.

---

### Entrada: 2026-10-16 — ETAPA-01: Auditoría de Repositorios de Referencia y Requisitos del Producto

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-01-auditoria-repositorios-y-requisitos`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad`.
- **Resumen de la intervención**:
  - Auditoría exhaustiva de 11 repositorios y ecosistemas de referencia (`OpenMAIC`, `Academia IA Educativa`, `EduAgent`, `Education Agent Skills`, `EduGPT`, etc.).
  - Análisis técnico de `OpenMAIC`: clasificado como `piloto aislado / adaptar`, descartando integración directa por incompatibilidad de stack (Next.js 16 + PostgreSQL 16 server-first vs. Vite/Express).
  - Elaboración del pliego formal de 32 requisitos categorizados (Funcionales, No Funcionales, Académicos y Operativos) trazados con prioridades `P0`, `P1` y `P2`.
  - Mapa de capacidades existentes en Wisdom School vs. capacidades deseadas para Ekballo Church.
  - Identificación de decisiones clave que requieren validación humana (enfoque de RAG vs. inyección directa, persistencia, marca).
  - Estructuración del backlog de fases técnicas sin tareas duplicadas.
  - Comprobación de integridad: cero modificaciones en código de producto (`git diff` limpio).
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Esperar validación formal del responsable técnico antes de iniciar la `ETAPA-02`.

---

### Entrada: 2026-10-16 — ETAPA-02: Currículo, Bilingüismo y Viabilidad Jurídica en Ecuador

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-02-curriculo-bilinguismo-y-legal`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad`.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Investigación profunda del Currículo Nacional de Ecuador (competencias comunicacionales, matemáticas, digitales y socioemocionales) y códigos oficiales de destrezas para EGB Elemental y Superior.
  - Auditoría técnica en vivo del sitio oficial de Alliance Academy International (`https://alliance.k12.ec/`), documentando su modalidad presencial exclusiva (\$1,053/mes de pensión, estándares Virginia SOL, cursos AP) y distinguiendo datos públicos verificados de requerimientos de consulta directa.
  - Construcción del marco de bilingüismo aditivo estructurado por el MCER (Pre-A1 a B2), garantizando pertinencia evolutiva por edades y definiendo actividades y rúbricas evaluables duales en español e inglés.
  - Publicación del `mapa_curricular_preliminar.md` integrando asignaturas troncales (60%), complementarias del Siglo XXI (15%), ampliación internacional (15%) y los 7 módulos doctrinales fundacionales de Ekballo Church en la asignatura troncal transversal *Relación con Dios* (10%).
  - Elaboración del catálogo exhaustivo de asignaturas por subniveles (Elemental, Media, Superior y BGU) con cargas horarias y enfoques metodológicos socráticos.
  - Análisis de correspondencia y brechas curriculares frente a estándares norteamericanos (Virginia SOL, NGSS, CCSS), descartando equivalencias nominales falsas en Ciencias Sociales y contextualización biogeográfica ecuatoriana en Ciencias Naturales.
  - Dictamen técnico-jurídico sobre la normativa ecuatoriana (Constitución Art. 29, LOEI Art. 50, Acuerdo Ministerial MINEDUC-2023-00069-A Arts. 31 a 37, reformas 2025 MINEDUC-2025-00024-A, LOPDP Arts. 21 y 22, y Memorando SASRE-2024-00610-M para homologación de títulos en el exterior).
  - Delimitación operativa de las 5 figuras legales, recomendando la figura de **Servicio Educativo Complementario No Formal de Tutoría y Acompañamiento Familiar (Art. 32 Acuerdo 2023-00069-A)**.
  - Contraste riguroso de 899 párrafos del documento institucional de investigación de Ekballo Church.
  - Integridad verificada: cero cambios en código de producto (`git diff` limpio en archivos rastreados) y builds limpios (`tsc --noEmit` y `npm run build` en código 0).
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Presentar el informe de cierre al responsable técnico y esperar autorización antes de iniciar la `ETAPA-03`.

---

### Entrada: 2026-10-16 — ETAPA-03: Arquitectura Modular y Plan Técnico

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-03-arquitectura-y-plan-tecnico`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad`.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Definición de la arquitectura destino híbrida: SPA React 19 + TypeScript + Vite 6 + Tailwind CSS 4 preservada, con backend modular en Node.js/Express 4 para orquestación segura y persistencia relacional.
  - Generación de diagramas de arquitectura C4 en tres niveles (Contexto, Contenedores y Componentes de backend).
  - Diseño del modelo de datos entidad-relación y diccionario de 17 entidades con soporte nativo para matrícula multi-programa sin duplicación de expedientes personales.
  - Especificación formal de contratos de API RESTful (`/api/v1`) con DTOs en TypeScript, validación Zod, manejo estandarizado de errores y autenticación por cookies `HttpOnly`.
  - Elaboración de la matriz RBAC para 5 roles, política de minimización de datos para menores (Art. 22 LOPDP) y libro mayor de auditoría inmutable.
  - Especificación del sistema multi-agente (Tutor Socrático, Evaluador Formativo, Generador de Guías Didácticas) y motor RAG con citas obligatorias `[S#]` y cascada LLM con circuit-breaker (DeepSeek V3 -> Gemini 2.0 Flash -> OpenRouter).
  - Hoja de ruta de implementación en 5 fases por dependencias con matriz de contingencia y reversión.
  - Estimación de costes operativos en 4 escenarios de escala (10, 50, 200 y 500 alumnos) demostrando un coste de \$0.15 a \$0.26 USD mensuales por alumno en IA e infraestructura.
  - Cobertura y trazabilidad del 100% de los 19 requerimientos P0 hacia componentes de arquitectura.
  - Registro de 6 Architecture Decision Records (ADR-001 a ADR-006).
  - Integridad verificada: cero cambios en código funcional rastreado (`git diff` limpio) y builds limpios (`tsc --noEmit` y `npm run build` en código 0).
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Presentar el informe de cierre al responsable técnico y esperar autorización antes de iniciar la `ETAPA-04`.

---

### Entrada: 2026-10-16 — ETAPA-04: Sistema de Diseño, Identidad Ekballo Church y Estructura Frontend

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-04-sistema-diseno-y-frontend`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad`.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Auditoría exhaustiva del frontend preexistente en React 19 / TypeScript 5.8: preservación total de los microcurrículos por nivel, los reproductores de lecciones diarias (Masterclass de 5 pasos socráticos, laboratorios PhET, talleres y evidencias), el devocional diario y la ergonomía táctil en iPad/tableta.
  - Adopción integral de la identidad oficial de **Ekballo Church**:
    - Incorporación de activos oficiales del paquete de logos (`DOCUMENTOS EKBALLO/EKBALLO_logo_pack/`) a `public/` (vector SVG, monograma "E", favicons, webmanifest y apple touch icon).
    - Actualización de `index.html` con tema `#0A0D11`, metadatos y título institucional de la *Plataforma Educativa ALSIZ — Ekballo Church*.
    - Rediseño de `SchoolLogo.tsx` implementando el monograma "E" en gradiente dorado institucional y el wordmark completo.
    - Sustitución de referencias residuales de Wisdom School en `Navbar.tsx`, `LandingView.tsx` y encabezados por la marca ALSIZ • Ekballo.
  - Implementación del sistema centralizado de tokens de diseño (`src/styles/tokens.ts`) y documentación integral en `docs/diseno/sistema_de_diseno.md`.
  - Ampliación del modelo de roles y navegación (`NavigationTab` y `UserRole` en `src/types/index.ts` y `SchoolContext.tsx`) soportando: Estudiante, Representante, Docente y Administrador.
  - Creación y articulación de las 8 pantallas prioritarias:
    1. `home`: Inicio institucional con misión dual (Homeschooling K-12 + Discipulado Ekballo).
    2. `access`: Portal unificado de selección de rol y acceso pedagógico (`AccessView.tsx`).
    3. `space`: Panel del estudiante (`StudentDashboard.tsx`) con distintivo de datos de desarrollo.
    4. `subjects`: Malla anual de asignaturas (`SubjectsView.tsx`) con botones diferenciados de acción.
    5. `subject-detail`: Detalle de curso y sílabo curricular (`CourseDetailView.tsx`).
    6. `classes`: Aula interactiva diaria (`DailyClassView.tsx`).
    7. `parent`: Portal parental y bitácora de homeschooling (`ParentDashboard.tsx`) con registro de 800h/200 días y LOPDP.
    8. `admin`: Shell administrativo y gobierno de TI (`AdminShell.tsx`) con métricas, nómina, diagnóstico `/api/v1/health` y auditoría inmutable.
  - Creación de componentes reutilizables de retroalimentación de estado (`src/components/common/StateFeedback.tsx`): `LoadingState`, `EmptyState`, `ErrorState`, `AccessDeniedState`, `SuccessState` y `DevelopmentBadge`.
  - Cumplimiento de la directriz de "Cero Botones Inertes" mediante `src/components/common/FeatureNoticeModal.tsx` con modal informativo de etapas y hojas de ruta.
  - Validación de accesibilidad (WCAG 2.1 AA, contraste, teclado `Escape`), responsividad (móvil, tableta/iPad y escritorio) y compilación estricta:
    - `npm run lint` (`tsc --noEmit`): **PASÓ (código 0)**.
    - `npm run build` (`vite build` + `esbuild` de servidores): **PASÓ (código 0)**.
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Presentar el informe de cierre al responsable técnico y esperar validación humana antes de proceder con la `ETAPA-05` (Base de Datos y Persistencia).

---

### Entrada: 2026-10-16 — ETAPA-05: Backend, Base de Datos, Identidad y Seguridad

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-05-backend-bd-y-seguridad`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad` + cambios validados de ETAPA-04.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Auditoría exhaustiva de mecanismos existentes de autenticación heredados de Wisdom School: identificación de contraseñas y PINs en texto claro en `mockData.ts`/`localStorage` y ausencia de sesiones de servidor seguras.
  - Implementación del motor relacional persistente nativo de Node.js 24 (`node:sqlite` / `DatabaseSync`) configurado con modo WAL (`journal_mode = WAL`), claves foráneas estrictas y sincronización normal.
  - Implementación del sistema de migraciones incrementales versionadas con control de firmas SHA-256 e idempotencia (`server/db/migrator.ts`):
    - `001_initial_schema.sql`: 16 tablas maestras (`users`, `students`, `representatives`, `student_representatives`, `sessions`, `programs`, `levels`, `student_program_enrollments`, `subjects`, `competencies`, `curriculum_units`, `daily_classes`, `evaluations`, `student_submissions`, `audit_events`, `password_resets`).
    - `002_security_indexes.sql`: Índices para búsqueda de credenciales, sesiones y pertenencia familiar.
    - `003_seed_dev_data.sql`: Datos semilla sintéticos anonimizados para 6 roles del sistema. **Cumplimiento de restricción: Cero datos reales de Gael ni Avril.**
  - Implementación de utilidades criptográficas estándar (`server/auth/crypto.ts`):
    - Hashing seguro de contraseñas y PINs táctiles con `scryptSync` y sal aleatoria única de 16 bytes.
    - Comparación en tiempo constante (`timingSafeEqual`) contra ataques de canal lateral por temporización.
    - Hash unidireccional HMAC-SHA256 para anonimización de direcciones IP (`ip_hash`).
    - Tokens de sesión opacos con 256 bits de entropía criptográfica.
  - Creación de servicio de sesiones de servidor (`server/auth/sessionService.ts`) con caducidad de 72 horas y almacenamiento hasheado en BD.
  - Middlewares de seguridad perimetral y RBAC (`server/middleware/`):
    - `authMiddleware.ts`: Autenticación por cookie `HttpOnly; SameSite=Lax` (`alsiz_session`) o cabecera `Authorization: Bearer <token>`.
    - `requireRole`: Control de privilegios para roles `ADMIN`, `ACADEMIC_COORDINATOR`, `TEACHER`, `REPRESENTATIVE`, `STUDENT` y `SERVICE_AGENT`.
    - `requireStudentAccess`: **Prevención estricta Anti-IDOR / Anti-BOLA en servidor**. Rechazo 403 si un alumno intenta consultar otro alumno o si un representante intenta acceder a un menor fuera de su núcleo familiar.
    - `rateLimiter.ts`: Limitación de tasa en memoria (10 intentos/minuto) contra ataques de fuerza bruta.
    - `errorHandler.ts`: Manejador de errores seguro sin exposición de trazas de pila ni credenciales al cliente.
    - `auditMiddleware.ts`: Libro mayor de auditoría inmutable (LOPDP Art. 21 y 22) con sanitización recursiva de secretos.
  - Construcción de enrutadores modulares de la API RESTful v1 (`/api/v1/auth`, `/api/v1/students`, `/api/v1/representatives`, `/api/v1/admin`) con validación Zod.
  - Implementación de servicio de respaldo y restauración en caliente (`server/backup/backupService.ts`) mediante `VACUUM INTO` transaccional y verificación con `PRAGMA integrity_check`.
  - Creación de suite automatizada de pruebas de integración (`scripts/test-etapa-05.ts` y script npm `npm run test:etapa05`).
  - Resultados de pruebas reales:
    - `npm run lint` (`tsc --noEmit`): **PASÓ (código 0)**.
    - `npm run build` (Vite + esbuild): **PASÓ (código 0)**.
    - `npm run db:migrate`: **PASÓ (código 0, 3 migraciones aplicadas e idempotentes)**.
    - `npm run test:etapa05`: **PASÓ (16 de 16 pruebas críticas aprobadas)**.
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Presentar el informe de cierre al responsable técnico y esperar autorización antes de iniciar la `ETAPA-06` (Núcleo Académico LMS).

---

### Entrada: 2026-10-16 — ETAPA-06: Núcleo Académico LMS

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-06-nucleo-academico-lms`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad` + cambios validados de ETAPA-04 y ETAPA-05.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Implementación del modelo y flujo académico integral conforme a la matriz curricular aprobada (MINEDUC, Formación Cristiana Ekballo, STEM y Bilingüismo).
  - Creación de migraciones de base de datos relacional:
    - `004_lms_academic_core.sql`: Nuevas tablas `academic_periods`, `academic_calendar_events`, `student_subject_enrollments`, `lesson_objectives`, `learning_resources`, `submission_grade_history` y `student_competency_mastery`, más columnas de destreza y rúbrica en `evaluations`.
    - `005_lms_seed_data.sql`: Datos semilla sintéticos de periodos 2026-2027, eventos, matrículas por asignatura, destrezas MINEDUC, unidades, clases socráticas y recursos bilingües.
  - Implementación del servicio de dominio `server/academic/academicService.ts` y enrutador RESTful `server/routes/academicRoutes.ts` montado bajo `/api/v1/academic` con protección `requireAuth`, `requireRole` y `requireStudentAccess`.
  - Soporte de matriculación normalizada de estudiantes a programas y asignaturas específicas sin duplicación de cuentas.
  - Soporte de bilingüismo con degradación transparente: parámetro `?lang=en` con fallback automático a español cuando no existe traducción, alertando al usuario en frontend sin romper la interfaz.
  - Implementación del libro mayor inmutable de calificaciones y retroalimentación (`submission_grade_history`) con justificación pedagógica obligatoria de reajustes.
  - Motor de seguimiento competencial con discriminación técnica obligatoria:
    - Actividad completada con nota < 7.00/10.00: se cataloga como `COMPLETED_NO_MASTERY` y no concede dominio.
    - Dominio demostrado: se restringe estrictamente a un promedio o nota evaluativa de logro igual o superior a 7.00/10.00 (`DEMONSTRATED_MASTERY`).
  - Generador de boletines oficiales de calificaciones (MINEDUC Art. 32) descargables y con vista imprimible para representantes legales vinculados.
  - Integración en frontend:
    - `AdminShell.tsx`: Consulta dinámica de `/api/v1/academic/programs` y diálogo modal para alta de programas formativos.
    - `CourseDetailView.tsx`: Selector interactivo de idioma (`Español` / `English`), aviso de fallback y desglose de objetivos.
    - `StudentDashboard.tsx`: Widget de progreso competencial separando actividades entregadas de destrezas dominadas.
    - `ParentDashboard.tsx`: Modal para visualización e impresión del Boletín Oficial del ciclo lectivo.
  - Ejecución de pruebas automatizadas y compilaciones:
    - `npm run lint` (`tsc --noEmit`): **PASÓ (código 0, 0 errores en 1,742 módulos)**.
    - `npm run build` (Vite + esbuild): **PASÓ (código 0)**.
    - `npm run test:etapa05` (Regresión de seguridad y BD): **PASÓ (16 de 16 pruebas aprobadas)**.
    - `npm run test:etapa06` (Suite LMS integral): **PASÓ (25 de 25 pruebas aprobadas, 0 fallos)**.
  - Protección estricta de datos personales de menores: uso exclusivo de datos sintéticos en pruebas y semillas.
  - Elaboración del expediente documental completo en `docs/ejecucion/etapas/ETAPA-06/` (`00_PLAN.md` a `06_CIERRE.md`), manual breve de configuración académica en `docs/manuales/manual_configuracion_academica.md` y actualización del diccionario de datos en `docs/arquitectura/modelo_datos_y_diccionario.md`.
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Presentar el informe de cierre al responsable técnico y esperar validación humana antes de proceder con la `ETAPA-07` (Agentes pedagógicos, RAG y tutoría).

---

### Entrada: 2026-10-16 — ETAPA-07: Centro de Conocimiento y Matrices Temáticas

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-07-centro-de-conocimiento`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad` + cambios validados de ETAPA-04, 05 y 06.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Implementación del Centro de Conocimiento y Matrices Temáticas institucional de Ekballo Church.
  - Nuevas migraciones de base de datos relacional y de búsqueda textual:
    - `006_knowledge_base_core.sql`: Tablas `knowledge_sources`, `knowledge_chunks`, tabla virtual `knowledge_chunks_fts` (SQLite FTS5 con BM25 nativo), triggers de sincronización automática (`trg_kc_ai`, `trg_kc_ad`, `trg_kc_au`), `knowledge_source_history` y `knowledge_source_conflicts`.
    - `007_knowledge_seed_data.sql`: Datos canónicos semilla de doctrina Ekballo y física general MINEDUC.
  - Implementación del servicio de dominio `server/knowledge/knowledgeService.ts`:
    - Deduplicación criptográfica (SHA-256) y validación de tipos y tamaños.
    - Fragmentación semántica inteligente en chunks de 200 a 500 palabras con etiquetas de citación formal (`[CODIGO#C#]`).
    - Motor de búsqueda e indexación FTS5 BM25 con filtrado facetado por materia, competencia y familia de agentes (ADR-005, sin bases de datos vectoriales externas ni costos mensuales en dólares).
    - Ciclo de vida editorial con estados estrictos (`PENDIENTE`, `EN_REVISION`, `APROBADO`, `RECHAZADO`, `DESACTIVADO`). Regla editorial: ningún recurso nuevo se aprueba automáticamente al cargarse.
    - **Retirada efectiva y aislamiento en RAG**: la consulta de retrieval filtra estrictamente `ks.status = 'APROBADO'`, garantizando que recursos retirados devuelvan cero fragmentos inmediatamente.
    - Trazabilidad y auditoría inmutable de todas las acciones y notas editoriales.
    - Sistema de registro y escalamiento de conflictos pedagógicos y doctrinales.
  - Creación del enrutador RESTful `server/routes/knowledgeRoutes.ts` montado en `/api/v1/knowledge` con protección `requireAuth` y control de roles `requireRole`.
  - Integración en frontend (`AdminShell.tsx`): pestaña `knowledge` con estadísticas operativas, simulador interactivo de retrieval RAG, tabla de recursos con acciones de aprobación/retirada y modal de carga.
  - Pruebas automatizadas y de regresión:
    - `npm run lint` (`tsc --noEmit`): **PASÓ (código 0, 0 errores de tipado)**.
    - `npm run build` (Vite + esbuild): **PASÓ (código 0)**.
    - `npm run test:etapa05` (Regresión de seguridad y LOPDP): **PASÓ (16 de 16 pruebas aprobadas)**.
    - `npm run test:etapa06` (Regresión de LMS y competencias): **PASÓ (25 de 25 pruebas aprobadas)**.
    - `npm run test:etapa07` (Suite de centro de conocimiento): **PASÓ (16 de 16 pruebas aprobadas, 0 fallos)**.
  - Documentación completa en `docs/ejecucion/etapas/ETAPA-07/` (`00_PLAN.md` a `06_CIERRE.md`) y actualización del diccionario de datos en `docs/arquitectura/modelo_datos_y_diccionario.md`.
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Presentar el informe de cierre al responsable técnico y esperar validación humana antes de proceder con la `ETAPA-08` (Orquestación de agentes socráticos, chats en vivo y llamadas a LLM).

---

### Entrada: 2026-10-16 — ETAPA-08: Profesores IA Especializados y Coordinación Multiagente

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-08-profesores-ia-y-multiagente`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad` + cambios validados de ETAPA-04, 05, 06 y 07.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Implementación integral del sistema de **Profesores IA Especializados y Orquestación Multiagente**.
  - Nuevas migraciones de base de datos relacional:
    - `008_ai_agents_orchestration.sql`: Tablas `ai_agents`, `ai_conversations`, `ai_messages`, `ai_telemetry_logs` y `ai_generated_materials`.
    - `009_ai_agents_seed.sql`: Semilla de 3 agentes piloto:
      1. `prof_ciencias_socratico` (Profesor Kepler - Matemáticas y Física BGU/8vo EGB).
      2. `mentor_ekballo_doctrinal` (Pastor David - Discipulado cristiano, carácter y mayordomía).
      3. `evaluador_formativo_rubricas` (Evaluador Pedagógico ALSIZ - Rúbricas analíticas y dominio demostrado).
  - Capa de Proveedores LLM Desacoplados (`server/agents/providers/`):
    - Interfaz abstracta `ILLMProvider` con soporte polimórfico.
    - `GeminiProvider`: Integración oficial con `@google/genai` (`gemini-3.8-flash`).
    - `DeepSeekProvider`: Cliente de contingencia con la API OpenAI-compatible de DeepSeek (`deepseek-chat`).
    - `SimulatedProvider`: Motor determinista socrático local offline con normalización de diacríticos, RAG grounding, citaciones automáticas `[CODE#C#]`, andamiaje socrático, abstención honesta y filtros de seguridad infantil.
    - `ProviderManager`: Orquestador en cascada resiliente (`Gemini` -> `DeepSeek` -> `SimulatedProvider`). Conmutación automática comprobada ante saturación o caída de APIs externas (error 503 gestionado sin interrumpir al usuario).
  - Servicios de Dominio Backend (`server/agents/`):
    - `agentService.ts`: Gestión de agentes, inicio de diálogos, recuperación RAG mediante SQLite FTS5 BM25 conectado al Centro de Conocimiento, registro de telemetría y protección estricta Anti-IDOR (403 Forbidden).
    - `coordinationService.ts`: Coordinación multiagente explícita (Tutor delega a Evaluador para calificar trabajos con rúbricas analíticas).
    - `humanSupervisionService.ts`: Flujo *Human-in-the-Loop* donde los materiales didácticos generados por IA inician en `DRAFT_REVIEW` y requieren aprobación docente antes de su publicación.
  - Enrutador RESTful `server/routes/agentRoutes.ts` montado en `/api/v1/agents` con autenticación JWT y control de roles RBAC.
  - Integración en frontend (`AdminShell.tsx`): pestaña `agents` con monitoreo de telemetría operativa en tiempo real, catálogo de profesores IA activos y bandeja de supervisión humana de materiales generados.
  - Pruebas automatizadas y de regresión:
    - `npm run lint` (`tsc --noEmit`): **PASÓ (código 0, 0 errores en toda la base de código)**.
    - `npm run build` (Vite + esbuild): **PASÓ (código 0, 1,742 módulos)**.
    - `npm run test:etapa05` (Regresión seguridad y LOPDP): **PASÓ (16 de 16 pruebas aprobadas)**.
    - `npm run test:etapa06` (Regresión LMS académico y competencias): **PASÓ (25 de 25 pruebas aprobadas)**.
    - `npm run test:etapa07` (Regresión centro de conocimiento RAG): **PASÓ (16 de 16 pruebas aprobadas)**.
    - `npm run test:etapa08` (Suite de agentes y multiagente): **PASÓ (17 de 17 pruebas aprobadas, 0 fallos)**.
  - Protección de privacidad infantil: Cero PII en logs y telemetría, y uso exclusivo de identidades sintéticas.
  - Expediente documental completo en `docs/ejecucion/etapas/ETAPA-08/` (`00_PLAN.md` a `06_CIERRE.md`).
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Presentar el informe de cierre al responsable técnico y esperar validación humana antes de proceder con la `ETAPA-09` (Aula interactiva e integración evaluada de OpenMAIC).

---

### Entrada: 2026-10-16 — ETAPA-09: Aula Interactiva e Integración Evaluada de OpenMAIC

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-09-aula-interactiva-openmaic`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad` + cambios validados de ETAPA-04, 05, 06, 07 y 08.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Evaluación técnica, jurídica y económica profunda del repositorio de referencia `THU-MAIC/OpenMAIC` (v1.2.0, Tsinghua University):
    - Conflicto de licenciamiento: Repositorio GitHub con MIT pero sitios promocionales reclamando AGPL-3.0; riesgo inaceptable de contaminación copyleft.
    - Incompatibilidad de stack: OpenMAIC requiere Next.js 16 (App Router), pnpm monorepo, FastAPI, PostgreSQL y LangGraph, incompatible con la SPA React 19 + Express + SQLite WAL de ALSIZ.
    - Costes prohibitivos de inferencia: 5,000 a 15,000 tokens por turno frente a ~350-600 tokens en la arquitectura nativa ALSIZ.
  - Registro de Decisión Arquitectónica (ADR-09-01): Adopción de la **Opción D: Adaptador desacoplado, sandbox visual y emulación socrática multiagente nativa**. Se descartaron el merge monorepo directo, microservicio independiente dockerizado y wrapper iframe por riesgo de soporte, coste y latencia.
  - Migración relacional `server/db/migrations/010_interactive_pilot.sql`:
    - Tablas `interactive_pilot_config` (Kill-Switch y parámetros de experimentación), `interactive_pilot_sessions` (tokens efímeros y estado de sesión) y `interactive_pilot_telemetry` (métricas de interacción agregadas sin PII).
  - Protección de privacidad infantil estricta (LOPDP Art. 21 y 22):
    - Generación de tokens efímeros criptográficos (`pilot_tok_...`) con TTL de 15 minutos mediante `randomBytes(24)`.
    - Generador de alias sintéticos automáticos (`Estudiante Explorador #1234`), garantizando anonimización total y desvinculación absoluta de identificadores personales reales de menores.
  - Mecanismo de contingencia Kill-Switch:
    - Interruptor administrativo de emergencia (`POST /api/v1/pilot/admin/toggle`) que desactiva el piloto de inmediato a nivel backend y frontend sin necesidad de redeploy ni reinicio de servicios.
  - Preservación y salida rápida al aula tradicional:
    - Enlace y botón "Volver al Aula Tradicional" accesible en todo momento que destruye la sesión efímera y regresa a la vista socrática convencional sin pérdida de estado.
  - Motor socrático y visual interactivo (`src/components/classes/InteractivePilotSandbox.tsx` y `server/pilot/pilotMultiAgentEngine.ts`):
    - Trazado de rayos ópticos en tiempo real sobre HTML5 Canvas (Leyes de Snell y Reflexión Total Interna) con deslizadores de índice de refracción ($n_1, n_2$) y ángulo incidente ($\theta_1$).
    - Diálogos socráticos sincronizados entre el Profesor Kepler y la Estudiante Guía Sofía.
    - Límite estricto de seguridad de costes: 6 turnos máximos por sesión (`429 MAX_TURNS_EXCEEDED`).
  - Pruebas automatizadas y de regresión:
    - `npm run lint` (`tsc --noEmit`): **PASÓ (código 0, 0 errores en 1,743 módulos)**.
    - `npm run build` (Vite + esbuild): **PASÓ (código 0, compilación en 12.6s)**.
    - `npm run test:etapa05` (Regresión seguridad y LOPDP): **PASÓ (16 de 16 pruebas aprobadas)**.
    - `npm run test:etapa06` (Regresión LMS académico y competencias): **PASÓ (25 de 25 pruebas aprobadas)**.
    - `npm run test:etapa07` (Regresión centro de conocimiento RAG): **PASÓ (16 de 16 pruebas aprobadas)**.
    - `npm run test:etapa08` (Regresión agentes IA socráticos y multiagente): **PASÓ (17 de 17 pruebas aprobadas)**.
    - `npm run test:etapa09` (Suite de aula interactiva y piloto OpenMAIC): **PASÓ (14 de 14 pruebas aprobadas, 100% éxito)**.
  - Expediente documental completo en `docs/ejecucion/etapas/ETAPA-09/` (`00_PLAN.md` a `06_CIERRE.md`), evidencia de pruebas y actualización del diccionario de datos en `docs/arquitectura/modelo_datos_y_diccionario.md`.
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Presentar el informe de cierre al responsable técnico y esperar validación humana antes de proceder con la `ETAPA-10`.

---

### Entrada: 2026-10-16 — ETAPA-10: Centro Administrativo Unificado

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-10-centro-administrativo-unificado`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad` + etapas 04 a 09 consolidadas.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Implementación del Centro Administrativo Unificado con gobernanza RBAC, auditoría LOPDP e informes MINEDUC:
    - Migración relacional `server/db/migrations/011_unified_admin.sql`: creación de la tabla `institution_settings` con parámetros institucionales por defecto y creación de índices de optimización para auditoría y ajustes.
    - Dashboard general con métricas en tiempo real (`GET /api/v1/admin/dashboard-summary`): conteo dinámico de usuarios por rol, programas, asignaturas, matrículas, fragmentos RAG, agentes IA y bandeja de tareas pendientes (action items) sin invención.
    - Gestión de usuarios y tutela familiar (`GET /api/v1/admin/users`, `PATCH /users/:userId/role`, `PATCH /users/:userId/status`, `GET /representatives`, `POST /representatives/link-student`): filtros por rol y búsqueda, cambio de rol con salvaguarda del último administrador activo, y vinculación legal N:M tutores-estudiantes.
    - Gestión curricular en caliente (`PUT /api/v1/academic/subjects/:subjectId`): creación y modificación de asignaturas por administradores y coordinadores con protección RBAC estricta (rechazo 403 a estudiantes).
    - Centro de conocimiento editorial (`PUT /api/v1/knowledge/sources/:id`, `GET /history`): actualización de fuentes con recálculo SHA-256, re-segmentación FTS5 y consulta de la trazabilidad completa.
    - Supervisión de agentes IA y piloto: telemetría operacional y conmutador de emergencia Kill-Switch sin errores 500.
    - Telemetría de errores y fallbacks (`GET /api/v1/admin/telemetry/errors`): consolidación de sesiones abortadas, fallos de proveedores y rechazos de acceso.
    - Informes curriculares y MINEDUC (`GET /api/v1/admin/reports/academic-summary`): promedios por materia y distribución de dominio competencial (`DEMONSTRATED_MASTERY`, `COMPLETED_NO_MASTERY`, `IN_PROGRESS`).
    - Configuración institucional (`GET /api/v1/admin/settings`, `PUT /settings`): parámetros globales protegidos por rol `ADMIN`.
    - Libro mayor inmutable LOPDP (`GET /api/v1/admin/audit-logs`): consulta con filtros por evento y recurso, con anonimización de IPs (SHA-256) y exclusión total de contraseñas.
    - Interfaz gráfica unificada (`AdminShell`, `AdminOverviewTab`, `AdminUsersTab`, `AdminAcademicTab`, `AdminKnowledgeModals`, `AdminReportsTab`, `AdminSettingsTab`): responsive en tablet/iPad y escritorio con paleta institucional Ekballo.
  - Verificación y pruebas:
    - `npm run test:etapa10`: **15 de 15 pruebas APROBADAS (100% de éxito)**.
    - Regresión `test:etapa05`: **16/16 PASÓ**.
    - Regresión `test:etapa06`: **25/25 PASÓ**.
    - Regresión `test:etapa07`: **16/16 PASÓ**.
    - Regresión `test:etapa08`: **17/17 PASÓ**.
    - Regresión `test:etapa09`: **14/14 PASÓ**.
    - `npm run lint` (`tsc --noEmit`): **0 errores en 1,749 módulos**.
    - `npm run build`: **Producción compilada exitosamente (0 errores, 9.04s)**.
  - Documentación completa en `docs/ejecucion/etapas/ETAPA-10/` (`00_PLAN.md` a `06_CIERRE.md`), evidencia física en `evidencias/01_suite_pruebas_etapa_10.txt` y actualización del diccionario de datos en `docs/arquitectura/modelo_datos_y_diccionario.md`.
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Presentar el informe de cierre al responsable técnico y esperar validación humana.

---

### Entrada: 2026-10-16 — ETAPA-11: Migración Controlada de Expedientes y Materiales (Gael y Avril)

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-11-migracion-controlada-gael-avril`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad` + etapas 04 a 10 consolidadas.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Ejecución de la **Migración Controlada de Expedientes y Materiales Didácticos** con cautela especial para datos de menores (LOPDP Art. 21 y 22):
    - Inventario exhaustivo y riguroso de fuentes legadas (estáticas y `localStorage`): 2 estudiantes (Estudiante A: 8.° EGB Superior; Estudiante G: 4.° EGB Elemental), 20 asignaturas, 42 unidades curriculares, 43 clases socráticas diarias, 86 recursos didácticos, 129 actividades formativas y 50 franjas de horario.
    - Elaboración de la tabla de correspondencia estructural entre el modelo previo de Wisdom School y el esquema relacional normalizado de ALSIZ (`users`, `students`, `programs`, `levels`, `subjects`, `curriculum_units`, `daily_classes`, `lesson_objectives`, `learning_resources`, `evaluations`, `student_subject_enrollments`).
    - Detección y resolución de colisiones críticas en datos legados originales: 3 lecciones compartían identificadores duplicados (`class-mat-avril-02`, `class-mat-gael-02`, `class-sci-gael-01`) que causaban pérdida silenciosa de lecciones. Se implementó un algoritmo de desambiguación determinista (`-dup2`) que preservó el 100% de las 43 lecciones, 86 recursos y 129 actividades.
    - Auditoría y clasificación formal de los 86 recursos didácticos: 12 a `reutilizar` (simuladores PhET Colorado y GeoGebra), 74 a `actualizar` (43 PDFs vinculados a dominio extinto `wisdom-school.edu` y 25 placeholders de YouTube, más Scratch y QuickDraw reclasificados a `INTERACTIVE_LAB`), 0 duplicados y 0 descartes ciegos.
    - Seguridad y privacidad de menores: hashing criptográfico estricto de contraseñas y códigos PIN con `scryptSync` y sal de 16 bytes. Prohibición absoluta de credenciales en claro y anonimización de nombres en registros públicos.
    - Honestidad técnica: fechas de nacimiento aproximadas por edad sin inventar días ni meses arbitrarios; cero notas ni entregas inventadas (progreso inicial en 0% conforme a diseño).
    - Motor de migración modular (`server/migration/legacyMigrationEngine.ts`) con soporte de simulación Dry-Run en memoria y CLI interactivo (`scripts/migrate-students.ts`).
    - Idempotencia comprobada: re-ejecución sucesiva produce exactamente los mismos conteos (0 duplicados).
    - Respaldo y reversión verificables: `createHotBackup()` con SHA-256 verificado, `restoreFromBackup()` con `PRAGMA integrity_check: ok`, y `rollbackMigration()` quirúrgico que elimina los 395 registros migrados sin alterar los estudiantes sintéticos previos.
    - Salvaguarda estricta de producción: `data/alsiz.db` auditado y verificado con 0 registros migrados. Se detuvo el proceso antes de tocar producción según directiva expresa.
    - Elaboración del informe de brechas curriculares (`informe_brechas_curriculares.md`): diagnóstico de las 43 clases frente a los 200 días lectivos obligatorios del MINEDUC y plan de enriquecimiento pedagógico.
  - Verificación y pruebas:
    - `npm run test:etapa11`: **16 de 16 pruebas APROBADAS (100% de éxito)**.
    - Regresión `test:etapa05` a `test:etapa10`: **100% PASÓ (103 de 103 pruebas)**.
    - `npm run lint` (`tsc --noEmit`): **0 errores en 1,749 módulos**.
    - `npm run build`: **Producción compilada exitosamente (0 errores, 11.64s)**.
  - Documentación completa en `docs/ejecucion/etapas/ETAPA-11/` (`00_PLAN.md` a `06_CIERRE.md`), informe de brechas, evidencias físicas en `evidencias/01_suite_pruebas_etapa_11.txt` y `02_auditoria_recursos_y_brechas.txt`.
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Presentar el informe de cierre al responsable técnico y esperar validación humana antes de proceder con cualquier migración productiva o inicio de la Etapa 12.

---

### Entrada: 2026-10-16 — ETAPA-12: Cursos Profesionales, Artes, Oficios y Educación Continua No Formal

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-12-cursos-profesionales-artes-oficios`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad` + etapas 04 a 11 consolidadas.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Implementación integral del subsistema de **Formación No Escolar, Artes, Oficios, Habilidades Profesionales y Educación Continua**:
    - Creación de la migración relacional versionada `server/db/migrations/012_continuing_education_courses.sql` (8 tablas: `continuing_courses`, `course_modules`, `course_lessons`, `course_enrollments`, `course_lesson_progress`, `course_evaluations`, `course_evaluation_submissions`, `course_certificates` con índices y 4 cursos semilla canónicos: electricidad práctica, Python con IA, composición visual y homilética ministerial).
    - Creación del servicio de dominio `server/continuing-ed/continuingEducationService.ts`: catálogo estructurado con filtrado multicriterio (categoría, modalidad, nivel, costo, texto), estructuración modular Curso -> Módulos -> Lecciones (`VIDEO`, `READING`, `PRACTICE`, `WORKSHOP`, `INTERACTIVE_LAB`), inscripciones con salvaguarda estricta de cupo máximo (`max_capacity`), cálculo dinámico y en tiempo real de avance (`progress_percent`), evaluaciones sumativas/proyectos prácticos con retroalimentación y calificación docente, y reportes analíticos de finalización.
    - Emisión de certificados criptográficos no formales: generación de código único (`CERT-OFIC-2026-XXXX`), huella SHA-256 inmutable verificable e inclusión obligatoria del descargo legal normativo conforme al **Art. 32 del Acuerdo Ministerial MINEDUC-2023-00069-A** (documento no conducente a título de bachillerato, educación superior ni habilitación profesional regulada).
    - Verificador público universal accesible sin autenticación en `/api/v1/continuing-ed/certificates/verify/:codeOrHash` para consulta mediante código o hash SHA-256.
    - Creación del enrutador RESTful modular `server/routes/continuingEducationRoutes.ts` con protección RBAC y montaje en `server.ts` bajo `/api/v1/continuing-ed`.
    - Integración de interfaz de usuario en la consola administrativa: componente `src/components/admin/AdminContinuingEdTab.tsx` incorporado en `AdminShell.tsx` bajo la pestaña *Artes & Oficios*, con explorador de cursos, modal de creación y verificador interactivo de constancias.
    - Aislamiento arquitectónico y pedagógico total: comprobado en pruebas que los cursos y constancias no formales no contaminan las tablas de materias escolares (`subjects`), matrículas formales K-12 (`student_subject_enrollments`) ni los programas educativos formales.
  - Verificación y pruebas:
    - `npm run test:etapa12`: **12 de 12 pruebas APROBADAS (100% de éxito)**.
    - Regresión `test:etapa11`: **16 de 16 pruebas PASÓ**.
    - `npm run lint` (`tsc --noEmit`): **0 errores de compilación**.
    - `npm run build`: **Producción compilada exitosamente (0 errores, 36.70s)**.
  - Documentación completa en `docs/ejecucion/etapas/ETAPA-12/` (`00_PLAN.md` a `06_CIERRE.md`).
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Presentar el informe de cierre al responsable técnico y esperar validación humana. NO iniciar la Etapa 13.

---

### Entrada: 2026-10-16 — ETAPA-13: Auditoría Integral y Pruebas de Aceptación End-to-End

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-13-auditoria-integral-y-aceptacion`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad` + etapas 04 a 12 consolidadas.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Ejecución de la auditoría integral y aceptación end-to-end de todos los subsistemas construidos de la Etapa 00 a la Etapa 12.
  - Implementación de la suite de pruebas multidisciplinar `scripts/test-etapa-13.ts` (`npm run test:etapa13`) verificando 10 dimensiones críticas:
    1. Gobernanza documental: las 13 etapas previas cuentan con sus 7 archivos normativos obligatorios y bitácora actualizada.
    2. Identidad y roles: usuarios de prueba (Admin, Docente, Alumno, Tutor), relaciones familiares y hashing `scrypt`.
    3. Malla curricular LMS: programa K-12, asignaturas troncales, unidades y lecciones diarias con estructura bíblico-pedagógica.
    4. Aislamiento estricto inter-familiar (Anti-IDOR): verificación matemática de cero visibilidad cruzada de expedientes de menores entre tutores distintos.
    5. Centro de Conocimiento RAG: fuentes canónicas aprobadas y exclusión inmediata y absoluta de fuentes desactivadas/revocadas.
    6. Orquestador de Agentes IA: resiliencia ante cortes o ausencia de API keys externas mediante degradación elegante a `SIMULATED_LOCAL` sin error 500.
    7. Formación No Formal (Etapa 12): respeto de cupos máximos, recálculo de avance, emisión de certificados con firma SHA-256, verificador público y descargo legal Art. 32 MINEDUC.
    8. Privacidad LOPDP: 100% de direcciones IP anonimizadas mediante HMAC/SHA-256 (64 hex) y ausencia de contraseñas o secretos en `audit_logs`.
    9. Respaldo en caliente (Hot Backup): verificación de integridad SQLite (`PRAGMA integrity_check = 'ok'`) y hash SHA-256 del archivo de respaldo.
    10. Salvaguarda de producción: base de datos `data/alsiz.db` verificada en modo sólo lectura y libre de contaminación por suites de prueba.
  - Ejecución de la totalidad del banco de pruebas histórico:
    - `npm run lint` (`tsc --noEmit`): **0 errores**.
    - `npm run build`: **Producción compilada exitosamente (0 errores, 14.58s)**.
    - Suites históricas: `test:etapa05` (16/16), `test:etapa06` (25/25), `test:etapa07` (16/16), `test:etapa08` (17/17), `test:etapa09` (14/14), `test:etapa10` (15/15), `test:etapa11` (16/16), `test:etapa12` (12/12) y `test:etapa13` (10/10). Total: **141/141 pruebas APROBADAS (100%)**.
  - Documentación completa en `docs/ejecucion/etapas/ETAPA-13/` (`00_PLAN.md` a `06_CIERRE.md`) y evidencias físicas en `evidencias/01_suite_pruebas_etapa_13.txt`.
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Próximo paso**: Presentar el informe de cierre al responsable técnico y esperar validación humana. NO iniciar la Etapa 14.

---

### Entrada: 2026-10-16 — ETAPA-14: Despliegue y Operación

- **Responsable**: Líder Técnico AI (Pair Programming Antigravity).
- **Rama local**: `etapa-14-despliegue-y-operacion`.
- **Commit base**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad` + etapas 04 a 13 consolidadas.
- **Directorio de trabajo verificado**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio remoto verificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git`.
- **Resumen de la intervención**:
  - Implementación de la infraestructura de gobernanza y automatización operativa para el pase a producción (v1.0.0):
    - `scripts/backup-db.ts`: Utilidad CLI para Hot Backups atómicos mediante `VACUUM INTO` con consolidación previa de WAL y cálculo de hash SHA-256 (`npm run db:backup`).
    - `scripts/restore-db.ts`: Utilidad CLI para restauración transaccional con cierre explícito de descriptores y verificación física de integridad SQLite (`PRAGMA integrity_check`) (`npm run db:restore`).
    - `scripts/health-check.ts`: Diagnóstico integral de entorno, variables, persistencia, 12 migraciones aplicadas, recuento de tablas y artefactos de producción (`npm run health`).
    - `scripts/test-etapa-14.ts`: Suite automatizada de aseguramiento de despliegue con 12 pruebas críticas (`npm run test:etapa14`).
  - Redacción y publicación de la suite documental operativa completa en `docs/operacion/`:
    1. `guia_instalacion_despliegue.md`: Requisitos de sistema, procedimientos reproducibles en VPS Linux/Docker/Serverless y proxy Nginx con SSL.
    2. `guia_configuracion_entornos.md`: Especificación de variables para Dev, Staging y Prod con datos sintéticos seguros y directrices criptográficas.
    3. `manual_administrativo.md`: Modelo RBAC, administración escolar, Centro de Conocimiento RAG y constancias de oficios.
    4. `manual_actualizacion_curricular.md`: Proceso de incorporación y adaptación de destrezas MINEDUC, MCER y 7 clases de Ekballo Church.
    5. `guia_gestion_profesores_ia.md`: Filosofía pedagógica socrática, parámetros de inferencia, salvaguardas éticas y rúbrica de supervisión.
    6. `procedimiento_respaldo_restauracion.md`: Políticas de retención, cronograma de backups y prueba real de restauración.
    7. `procedimiento_respuesta_incidentes.md`: Matriz de severidad (Sev-1 a Sev-4), protocolos de contención LOPDP y conmutación por falla de IA.
    8. `runbook_fallos_frecuentes.md`: Catálogo de 8 fallos conocidos con diagnósticos de causa raíz y comandos de solución rápida.
    9. `registro_versiones_cambios.md`: Registro institucional histórico de cambios (Changelog) desde v0.0.1 hasta v1.0.0.
  - Verificación y pruebas:
    - `npm run lint` (`tsc --noEmit`): **0 errores de compilación**.
    - `npm run build`: **Producción compilada exitosamente (0 errores, 18.66s)** para frontend Vite y bundles de servidor Express.
    - `npm run db:backup` y `restore-db.ts`: Prueba física real de respaldo (1,016 KB) y restauración en sandbox ejecutada en 30 ms con `PRAGMA integrity_check = OK`.
    - Suite de etapa: `test:etapa14` **12/12 pruebas PASÓ (100%)**.
    - Regresión completa de suites históricas (`test:etapa05` a `test:etapa13`): **141/141 pruebas PASÓ**.
    - **Total Consolidado: 153/153 pruebas automatizadas aprobadas con éxito total**.
  - Documentación completa en `docs/ejecucion/etapas/ETAPA-14/` (`00_PLAN.md` a `06_CIERRE.md`) y evidencias físicas en `evidencias/01_suite_pruebas_etapa_14.txt`, `02_diagnostico_health.txt`, `03_backup_restore_real.txt` y `04_build_produccion.txt`.
- **Estado final**: `APROBADA: lista para revisión humana`.
- **Declaración de Estado**: Sistema en estado **PREPARADO PARA DESPLIEGUE / STAGING VALIDADO**. No se realizaron operaciones remotas (`git push`) ni publicaciones en producción en vivo a la espera de la autorización humana expresa.
