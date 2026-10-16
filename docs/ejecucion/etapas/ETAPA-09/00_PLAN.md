# Plan de Trabajo — ETAPA 09
## Aula Interactiva e Integración Evaluada de OpenMAIC

- **Etapa**: ETAPA-09
- **Fecha de Inicio**: 2026-10-16
- **Rama Git**: `etapa-09-aula-interactiva-openmaic`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Repositorio Remoto**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Responsable**: Líder Técnico — Plataforma Educativa ALSIZ para Ekballo Church
- **Estado**: EN EJECUCIÓN

---

### 1. Objetivos de la Etapa

1. **Evaluación Técnica Rigurosa de OpenMAIC (`THU-MAIC/OpenMAIC`)**:
   - Analizar a fondo la versión actual (v1.2.0), licencia de software, dependencias, modelo de ejecución, compatibilidad con el stack de ALSIZ, riesgos de seguridad y costos por consumo de tokens y servicios externos.
   - Determinar con fundamento empírico si procede: A) integración directa (descartada en análisis preliminar), B) adaptador/piloto aislado con sandbox, C) enlace externo controlado, o D) no integración.
2. **Implementación de un Piloto Aislado y Seguro**:
   - Implementar un adaptador de aula interactiva multivariable bajo una **bandera de funcionalidad estricta** (`FEATURE_OPENMAIC_PILOT` / `isPilotEnabled`).
   - El piloto debe operar de manera 100% aislada: jamás sustituirá el aula principal (`DailyClassView`), ni forzará a estudiantes reales a participar sin consentimiento.
3. **Aislamiento Criptográfico y Cero Exposición de Datos Sensibles (Anti-PII)**:
   - Crear un mecanismo de puente de sesión que genere tokens efímeros sintéticos (TTL corto de 15 minutos).
   - Prohibir terminantemente el cruce de JWTs principales, contraseñas, nombres reales o expedientes académicos hacia el entorno piloto.
4. **Experiencia Piloto de Aprendizaje con Datos Sintéticos**:
   - Diseñar y probar un flujo de clase interactiva para una materia seleccionada (Física BGU / Óptica y Ley de Snell) con agentes colaborativos (Profesor IA + Compañero Estudiante IA + Simulador interactivo HTML5).
5. **Métricas de Rendimiento, Telemetría y Botón de Salida Inmediata**:
   - Medir latencia, consumo estimado de tokens, accesibilidad y estabilidad.
   - Proveer un botón de salida directa ("Volver al Aula Tradicional") que cierre la sesión piloto de forma instantánea.
6. **Mecanismo de Desactivación Inmediata (Kill-Switch)**:
   - Asegurar que la desactivación del piloto mediante configuración o API revierta la experiencia a la versión estable de forma transparente y sin errores 500.
7. **Suite de Pruebas Automatizadas y Documentación Completa**:
   - Desarrollar `scripts/test-etapa-09.ts` con criterios de aceptación verificables.
   - Elaborar el expediente documental completo en `docs/ejecucion/etapas/ETAPA-09/` (`00_PLAN.md` a `06_CIERRE.md`).

---

### 2. Alcance Detallado y Exclusiones

#### Lo que SÍ forma parte de la Etapa 09:
- Migración de base de datos `010_interactive_pilot.sql` para configuración de banderas, sesiones sintéticas y telemetría de evaluación.
- Módulo backend de configuración y puente de sesiones: `server/pilot/pilotConfig.ts`, `server/pilot/pilotService.ts` y enrutador `server/routes/pilotRoutes.ts` montado en `/api/v1/pilot`.
- Control de bandera de funcionalidad con activación por rol (`ADMIN`, `ACADEMIC_COORDINATOR` y estudiantes sintéticos de prueba).
- Componente de interfaz de aula interactiva aislada en frontend: `src/components/classes/InteractivePilotSandbox.tsx`, integrado condicionalmente en `DailyClassView.tsx` tras el feature flag.
- Panel administrativo en `AdminShell.tsx` para supervisar métricas del piloto y conmutar el interruptor general (*Kill-Switch*).
- Suite de pruebas `test:etapa09` con 100% de criterios aprobados.

#### Lo que NO forma parte de la Etapa 09 (Exclusiones):
- Modificación del código fuente del monorepo externo de OpenMAIC (se evalúa y adapta, no se reescribe su infraestructura Next.js/pnpm).
- Migración de datos o clases de estudiantes reales al piloto interactivo.
- Reemplazo del aula socrática estándar de ALSIZ.
- Integración de servicios externos de pago obligatorio (e.g. Tavily API de pago o servicios de voz con tarificación en USD) sin autorización expresa.
- Implementación de la Etapa 10.

---

### 3. Matriz de Riesgos Previos y Mitigaciones

| Riesgo Técnico Identificado | Severidad | Mitigación Planificada |
|---|:---:|---|
| **Incompatibilidad de Stack**: OpenMAIC requiere Next.js 16 + pnpm workspaces + PostgreSQL, mientras ALSIZ es Vite 6 + Express + SQLite. | CRÍTICA | No incrustar el monorepo de OpenMAIC en el árbol de dependencias de ALSIZ; usar un Adaptador/Sandbox aislado e independiente. |
| **Ambigüedad de Licencias**: El repositorio es MIT pero sitios comerciales señalan AGPL-3.0. | ALTA | El adaptador es código propio limpio desarrollado bajo arquitectura desacoplada; no se incorpora código ajeno bajo copyleft. |
| **Fuga de Datos Sensibles**: Exposición de tokens de usuario o datos del menor al simulador. | CRÍTICA | Tokens efímeros sintéticos (`pilot-token-xxxx`) sin identidad real. Solo se transmiten alias sintéticos y el tema académico. |
| **Explosión de Consumo de Tokens**: Flujos multiagente masivos pueden multiplicar el gasto por 10x. | ALTA | Límites estrictos de turnos conversacionales (máximo 6 turnos) y límite de tiempo por sesión (15 min). |
| **Riesgo de Afectación al Aula Principal**: Falla en el componente interactivo que bloquee la clase tradicional. | ALTA | Encapsulamiento en componente condicional con `ErrorBoundary`, sandbox de iframe y botón de salida inmediata. |

---

### 4. Criterios de Aceptación

1. **Criterio 1: Evaluación Técnica y de Licencias Documentada**: Informe exhaustivo de compatibilidad técnica, licencias y costos en `04_RIESGOS_Y_DECISIONES.md`.
2. **Criterio 2: Flag de Funcionalidad Activo y Desactivable**: El piloto solo es visible cuando `isPilotEnabled = true`, y se desactiva instantáneamente mediante interruptor administrativo o variable de entorno.
3. **Criterio 3: Aislamiento y Anti-PII Estricto**: Cero tokens reales, contraseñas, correos o datos personales transmitidos a la sesión piloto.
4. **Criterio 4: Experiencia Multiagente Interactiva Funcional**: Simulación pedagógica en Física/Óptica con rol de profesor socrático, compañero estudiante virtual y lienzo interactivo.
5. **Criterio 5: Botón de Salida Inmediata y Resiliencia**: El estudiante puede salir del piloto en cualquier momento retornando al aula principal sin pérdida de estado.
6. **Criterio 6: Telemetría Operativa Registrada**: Almacenamiento de latencia, turnos, calificación y código de salida en SQLite.
7. **Criterio 7: No Regresión**: Pruebas de etapas 05, 06, 07 y 08 aprobadas al 100%, con compilación y linting en cero errores.

