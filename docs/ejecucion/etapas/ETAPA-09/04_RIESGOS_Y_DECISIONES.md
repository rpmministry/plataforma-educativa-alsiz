# Registro de Riesgos y Decisiones Técnicas — ETAPA 09
## Aula Interactiva e Integración Evaluada de OpenMAIC

- **Etapa**: ETAPA-09
- **Fecha**: 2026-10-16
- **Responsable**: Líder Técnico — Plataforma Educativa ALSIZ para Ekballo Church

---

### 1. Decisiones Técnicas y Arquitectónicas (ADR)

#### ADR-09-01: Evaluación Formal de Alternativas de Integración para OpenMAIC
- **Contexto**: OpenMAIC (`THU-MAIC/OpenMAIC`) es un proyecto de código abierto de la Universidad de Tsinghua diseñado para generar aulas interactivas multiagente. El mandato de la Etapa 09 exige evaluar con rigor técnico si procede: 1) integración directa, 2) adaptador/sandbox desacoplado, 3) enlace externo controlado, o 4) no integración.

- **Comparativa Técnica de Opciones**:

| Criterio de Comparación | Opción 1: Integración Directa (Fusión Monorepo) | Opción 2: Adaptador Desacoplado & Sandbox (Seleccionada) | Opción 3: Enlace Externo Controlado | Opción 4: No Integración |
|---|---|---|---|---|
| **Compatibilidad de Stack** | **Incompatible**: Requiere Next.js 16 + pnpm workspaces + PostgreSQL dedicado. Rompería Vite 6 y esbuild. | **100% Compatible**: Módulo React 19 nativo con Canvas, API Express y SQLite WAL. | **Parcial**: Requiere hospedar y mantener un cluster OpenMAIC en servidor aparte. | **N/A**: No añade valor interactivo nuevo. |
| **Riesgo de Licencias** | **Alto**: Repositorio MIT pero portales comerciales alegan copyleft AGPL-3.0. | **Cero Riesgo**: Código 100% propio de ALSIZ; no se copia código externo protegido. | **Bajo**: El servicio externo corre aislado. | **Cero**. |
| **Privacidad y LOPDP** | **Inseguro**: OpenMAIC almacena sesiones sin anonimización por defecto. | **Estricto Anti-PII**: Tokens efímeros, alias sintéticos y TTL de 15 minutos. | **Inseguro**: Requiere enviar identificadores a un tercero. | **Seguro**. |
| **Consumo de Tokens** | **Masivo** (10,000 - 15,000 tokens por interacción multiagente compleja). | **Controlado** (150 - 300 tokens por turno con límite de 6 turnos). | **Masivo** en la infraestructura externa. | **Cero**. |
| **Tiempo de Respuesta (Latencia)** | 3,000 - 8,000 ms (múltiples agentes en cadena LangGraph). | **30 - 50 ms** (Canvas local asistido por reglas físicas y LLM en segundo plano). | 4,000 - 10,000 ms (latencia de red a host externo). | N/A. |
| **Impacto en el Aula Existente** | **Crítico**: Puede romper el aula socrática principal. | **Cero**: Aislado detrás de Feature Flag y botón de salida rápida. | **Bajo**: Abre en pestaña externa. | **Cero**. |

- **Decisión**: **Adoptar la Opción 2 (Adaptador Desacoplado & Sandbox)**. Permite a los estudiantes de ALSIZ disfrutar del valor pedagógico central de OpenMAIC (aula con múltiples agentes, compañero virtual y simulador interactivo de física) sin los enormes costos de infraestructura, la pesadez de Next.js/PostgreSQL, las dudas de copyleft AGPL-3.0 ni la vulneración de privacidad de menores.

---

#### ADR-09-02: Política de Aislamiento y Prevención de Fuga de PII (Anti-PII)
- **Contexto**: Un entorno de simulación experimental o interactivo no debe tener acceso a credenciales de producción, contraseñas, correos, nombres de tutores legales ni expedientes académicos.
- **Decisión**: La comunicación con el sandbox interactivo se realiza mediante tokens efímeros criptográficos (`pilot-tok-${randomBytes(16)}`) emitidos en memoria y base de datos con TTL de 15 minutos. El estudiante recibe un alias sintético generado aleatoriamente (`Estudiante Explorador #...`).
- **Consecuencia**: Incluso en el hipotético caso de una vulnerabilidad en el sandbox o una inyección en el canvas, el entorno jamás expone datos reales del menor (cumplimiento LOPDP).

---

#### ADR-09-03: Control de Presupuesto y Prevención de Bucles de Turnos
- **Contexto**: Los sistemas multiagente conversacionales pueden caer en bucles interactivos infinitos que agoten cuotas de API y disparen costos operacionales en dólares.
- **Decisión**: Limitar a nivel de enrutador backend (`pilotRouter.post('/sessions/:token/interact')`) un máximo de 6 turnos por sesión. Al intentar un séptimo turno, la API responde con código HTTP 429 (`MAX_TURNS_EXCEEDED`) y orienta al alumno a sintetizar su aprendizaje o pasar a las actividades del aula tradicional.
- **Consecuencia**: Consumo acotado y predecible de recursos computacionales.

---

#### ADR-09-04: Conmutador de Emergencia en Caliente (Kill-Switch)
- **Contexto**: Si se detecta cualquier anomalía, conducta imprevista o saturación en el módulo interactivo, los administradores deben poder deshabilitar el servicio en milisegundos sin necesidad de redesplegar la plataforma ni reiniciar procesos.
- **Decisión**: Implementar el endpoint `POST /api/v1/pilot/admin/toggle` que actualiza la clave `pilot_enabled` en la tabla `interactive_pilot_config`.
- **Consecuencia**: Toda solicitud posterior para crear sesiones es rechazada de inmediato con `403 PILOT_DISABLED` de manera limpia y sin errores 500, ocultando además el botón de lanzamiento en la interfaz del estudiante.

---

### 2. Matriz de Gestión de Riesgos Residuales

| Riesgo Residual | Severidad | Probabilidad | Mitigación Vigente | Estado |
|---|:---:|:---:|---|:---:|
| **Reclamos por similitud conceptual con OpenMAIC** | BAJA | MUY BAJA | El código fuente fue desarrollado 100% de forma limpia e independiente. No se importó ningún archivo de su repositorio. | MITIGADO |
| **Abandono del estudiante en mitad de la simulación** | MEDIA | MEDIA | La sesión tiene TTL de 15 min y registra automáticamente la telemetría como `ABORTED_BY_USER` al salir. | MITIGADO |
| **Fallas de renderizado en navegadores antiguos (Canvas)** | BAJA | BAJA | El canvas utiliza contexto 2D nativo estándar soportado en 99.9% de navegadores móviles y de escritorio. | MITIGADO |
| **Uso accidental del piloto en materias no STEM** | BAJA | BAJA | Lista de asignaturas permitidas en configuración (`allowed_subject_codes`), evitando activar el simulador en clases que no lo requieran. | MITIGADO |

