# Registro de Pruebas — ETAPA 12
## Cursos Profesionales, Artes, Oficios y Educación Continua No Formal

- **Etapa**: ETAPA-12
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-12-cursos-profesionales-artes-oficios`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)

---

### 1. Entorno de Ejecución

- **Sistema Operativo**: Windows 11 (PowerShell)
- **Motor de Runtime**: Node.js v22 con `node:sqlite` nativo (WAL mode activado)
- **Base de Datos de Prueba**: `data/test_alsiz_etapa12_suite.db` (aislada de producción `data/alsiz.db`)
- **Transpilador TypeScript**: `tsx` (v4.21.0)
- **Framework Web**: Express (v4.21.2) con Zod y criptografía `crypto` nativa

---

### 2. Comandos Ejecutados y Resultados

#### 2.1 Verificación Base Previa (Estado Inicial)
- **Comando**: `git status --short --branch`
- **Resultado**: Rama `etapa-12-cursos-profesionales-artes-oficios` creada y activa.
- **Comando**: `npm run test:etapa11`
- **Resultado**: 16/16 pruebas aprobadas (Migración controlada y respaldos verificados).

#### 2.2 Suite Automatizada de la Etapa 12
- **Comando**: `npm run test:etapa12`
- **Resultado**: **12 de 12 pruebas PASADAS (100% de éxito)**.
- **Detalle de la salida**:
```text
================================================================
  SUITE DE PRUEBAS AUTOMATIZADAS — ETAPA 12 (ALSIZ / EKBALLO)
  CURSOS PROFESIONALES, ARTES, OFICIOS Y FORMACIÓN CONTINUA
================================================================

[Migrator] Migración 001_initial_schema.sql (v001) aplicada exitosamente.
[Migrator] Migración 002_security_indexes.sql (v002) aplicada exitosamente.
[Migrator] Migración 003_seed_dev_data.sql (v003) aplicada exitosamente.
[Migrator] Migración 004_lms_academic_core.sql (v004) aplicada exitosamente.
[Migrator] Migración 005_lms_seed_data.sql (v005) aplicada exitosamente.
[Migrator] Migración 006_knowledge_base_core.sql (v006) aplicada exitosamente.
[Migrator] Migración 007_knowledge_seed_data.sql (v007) aplicada exitosamente.
[Migrator] Migración 008_ai_agents_orchestration.sql (v008) aplicada exitosamente.
[Migrator] Migración 009_ai_agents_seed.sql (v009) aplicada exitosamente.
[Migrator] Migración 010_interactive_pilot.sql (v010) aplicada exitosamente.
[Migrator] Migración 011_unified_admin.sql (v011) aplicada exitosamente.
[Migrator] Migración 012_continuing_education_courses.sql (v012) aplicada exitosamente.
✅ [Catálogo & Metadatos] Criterio 1: Carga de catálogo y cursos semilla canónicos: 4 cursos encontrados. Categorías verificadas: OFICIOS, TECNOLOGIA, ARTES, FORMACION_MINISTERIAL
✅ [Catálogo & Metadatos] Criterio 2: Filtrado multicriterio de cursos (categoría, texto, modalidad): Filtros de oficios (1), búsqueda por palabra clave (1) y modalidad híbrida (2) comprobados
✅ [Gestión Administrativa] Criterio 3: Creación y actualización de curso con objetivos y prerrequisitos: Curso creado con código OFIC-002, duración 60h, cupo máx: 2
✅ [Contenidos & Estructura] Criterio 4: Estructura jerárquica Curso -> Módulos -> Lecciones: Módulo 'Módulo 1: Fundamentos de Circuitos y Seguridad Eléctrica' con 2 lecciones vinculadas correctamente
✅ [Inscripciones & Cupos] Criterio 5: Inscripción de usuarios y salvaguarda estricta de cupo máximo: 2 participantes inscritos. Tercer intento rechazado exitosamente por límite de cupo
✅ [Progreso & Avance] Criterio 6: Cálculo dinámico y en tiempo real del progreso del estudiante: Avance calculado: 50% tras lección 1, 100% tras lección 2 (2/2 lecciones)
✅ [Evaluaciones & Calificación] Criterio 7: Evaluación práctica, entrega estudiantil y calificación docente: Proyecto práctico evaluado: Nota 9.50 / 10.00 (mínimo aprobatorio: 7.00). Aprobado: true
✅ [Certificados & Marco Legal] Criterio 8: Emisión de certificado no formal con hash SHA-256 y descargo legal: Código: CERT-OFIC-2026-8B7F8D, Hash SHA-256: c81e6ef6185c949c..., Descargo Art. 32 verificado
✅ [Certificados & Marco Legal] Criterio 9: Verificación pública universal de certificados (código y hash SHA-256): Verificación por código: true, por hash: true, código inexistente rechazado: true
✅ [Informes & Analítica] Criterio 10: Informe analítico de desempeño y finalización del curso: Inscritos: 2, Finalizados: 1, Tasa finalización: 50%, Certificados: 1
✅ [Certificados & Marco Legal] Criterio 11: Idempotencia en emisión de certificados ante reintentos: Reintento devolvió el certificado previamente generado sin duplicar registros en base de datos
✅ [Separación Académica] Criterio 12: Aislamiento arquitectónico y separación de malla K-12 EGB: Cero contaminación en tabla 'subjects' (0), cero en 'student_subject_enrollments' (0), cero en 'programs' (0)

================================================================
  RESUMEN DE PRUEBAS AUTOMATIZADAS — ETAPA 12
================================================================
Total Pruebas: 12 | Aprobadas: 12 | Fallidas: 0

✅ TODAS LAS PRUEBAS DE LA ETAPA 12 PASARON SATISFACTORIAMENTE.
```

---

### 3. Matriz de Cobertura de Pruebas

| Código | Prueba / Escenario | Entrada | Resultado Esperado | Resultado Real | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **T1** | Catálogo Inicial | Migración 012 en BD | 4 cursos semilla con categorías diversas | 4 cursos cargados (OFICIOS, TECNOLOGIA, ARTES, MINISTERIAL) | **PASÓ** |
| **T2** | Filtros de Búsqueda | Category='OFICIOS', Search='Python', Modality='HYBRID' | Retornar solo registros coincidentes | Filtros exactos comprobados | **PASÓ** |
| **T3** | Creación y Edición | Admin crea curso OFIC-002 y actualiza descripción | Persistencia en `continuing_courses` con cupo=2 | Creado con ID y descripción actualizada | **PASÓ** |
| **T4** | Estructura Jerárquica | Creación de Módulo 1 y 2 Lecciones (Video y Práctica) | Relación jerárquica con minutos y orden | Curso -> Módulos (1) -> Lecciones (2) | **PASÓ** |
| **T5** | Cupo Máximo | Inscribir 2 usuarios y un 3.° en curso con maxCapacity=2 | Aceptar 2 y rechazar el 3.° con mensaje de cupo | Rechazo controlado por límite de capacidad | **PASÓ** |
| **T6** | Progreso Dinámico | Completar Lección 1 (50%) y Lección 2 (100%) | Recálculo dinámico en `course_enrollments` | 50.00% y 100.00% verificado | **PASÓ** |
| **T7** | Evaluación Práctica | Envío de proyecto y calificación docente (9.50/10) | Registro en `course_evaluation_submissions` con aprobado | Nota 9.50 asignada, aprobado=true | **PASÓ** |
| **T8** | Emisión Certificado | Solicitud de certificado al cumplir 100% y evaluación | Código único, hash SHA-256 y texto Art. 32 | Emitido con firma y descargo obligatorio | **PASÓ** |
| **T9** | Verificación Pública | Consulta por código y hash SHA-256 | Retorna autenticidad, horas (60h) y descargo | Verificación positiva y código falso rechazado | **PASÓ** |
| **T10** | Analítica de Curso | Cálculo de métricas del curso OFIC-002 | 2 inscritos, 1 finalizado, 50% tasa, nota 9.5 | Informe analítico coincide con datos reales | **PASÓ** |
| **T11** | Idempotencia | Reintentar emisión de certificado ya generado | Retorna el mismo certificado sin duplicar | ID y código idénticos, cero duplicación | **PASÓ** |
| **T12** | Aislamiento K-12 | Consultar tablas `subjects` y matrículas formales | Cero registros de cursos no formales en la malla EGB | 0 en materias, 0 en matrículas, 0 en programas | **PASÓ** |

