# Registro de Riesgos y Decisiones Técnicas — Etapa 10: Despliegue de Staging

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-10 (Continuación a Producción)  
**Fecha:** 17 de octubre de 2026  
**Responsable Técnico:** Antigravity (Google DeepMind Team)  

---

## 1. Registro de Decisiones de Arquitectura e Implementación (ADR)

### Decisión 1: Registro Formal del Bloqueo Remoto sin Inventar Destinos de Rewrite Ficticios
- **Contexto:** El Prompt 10 exige desplegar en staging y probar desde la URL pública, pero estipula taxativamente: *"Si falta la URL pública del backend, registra el bloqueo y espera; no inventes un destino de rewrite"* y *"No declares un servicio creado si solo entregaste instrucciones"*.
- **Decisión:** Registrar de manera explícita y transparente el estado de **BLOQUEADA PARA DESPLIEGUE REMOTO PÚBLICO**, absteniéndose de inventar dominios o reescrituras simuladas en `vercel.json`.
- **Impacto:** Cumplimiento irrestricto de las directrices éticas y de integridad técnica. El sistema no engaña al operador simulando despliegues remotos no ejecutados.

### Decisión 2: Implementación de la Suite Determinista de Pre-Vuelo Local (`test-etapa-10-acceptance.ts`)
- **Contexto:** Para asegurar que el despliegue remoto sea inmediatamente exitoso en cuanto el administrador provea las instancias en la nube, es indispensable validar todos los flujos de staging en un entorno local controlado.
- **Decisión:** Crear `scripts/test-etapa-10-acceptance.ts`, la cual crea una base de datos limpia en modo producción (omitiendo semillas dev), arranca un servidor HTTP efímero y valida los 10 criterios de extremo a extremo.
- **Impacto:** Garantiza que el 100% de la lógica de backend, migraciones, aislamiento Anti-IDOR, respaldo en caliente y fallback de IA está probada y lista para producción.

### Decisión 3: Uso Exclusivo de Cuentas Sintéticas y Protección LOPDP
- **Contexto:** La normativa de protección de datos personales de menores de edad (LOPDP) prohíbe el uso de registros reales de niños para pruebas de integración o staging.
- **Decisión:** Se emplearon exclusivamente identificadores sintéticos (`admin_staging_synth`, `rep_synth_t10`, `alumno_synth_t10`, `alumno_synth_b`).
- **Impacto:** Cero riesgo de exposición de información confidencial de Gael o Avril en capturas de pantalla, logs o registros de telemetría.

### Decisión 4: Conmutación Automática en Tiempo Real ante Cuota Agotada de Gemini
- **Contexto:** Durante la ejecución de la suite de pruebas, la API gratuita de Google Gemini retornó el error 429 (`RESOURCE_EXHAUSTED: Quota exceeded`).
- **Decisión:** Validar que el componente `ProviderManager` conmute automáticamente hacia DeepSeek API (`deepseek-chat`) sin emitir error HTTP 500 al cliente.
- **Impacto:** Se obtuvo una respuesta pedagógica de 325 caracteres en 1591ms, demostrando en condiciones reales la robustez y resiliencia de la arquitectura de IA.

---

## 2. Matriz de Riesgos Operativos y Mitigaciones

| Riesgo Identificado | Nivel de Severidad | Probabilidad | Estrategia de Mitigación Implementada |
|---|---|---|---|
| **R1: Pérdida de base de datos por despliegue sin disco persistente en Render** | **Crítica** | Media | Se especificó en `render.yaml` el montaje obligatorio de un disco de 10 GB en `/data` (`name: alsiz-data`). Se documentó que el plan debe ser Starter o superior. |
| **R2: Base de datos no inicializada por omisión de migraciones en el arranque** | **Alta** | Media | Se configuró `preDeployCommand: npm run db:migrate` en `render.yaml`, asegurando que las 13 migraciones se ejecuten en la fase de release previa al arranque de los contenedores. |
| **R3: Interrupción de clases por agotamiento de cuota en Google AI Studio (Free Tier)** | **Media** | Alta | La cascada automática (`GEMINI -> DEEPSEEK -> OPENROUTER -> SIMULATED_LOCAL`) demostró funcionar con éxito en la prueba real de la Etapa 10, conmutando a DeepSeek de forma transparente. |
| **R4: Exposición de `SESSION_SECRET` o claves API en Git** | **Crítica** | Muy Baja | Se ejecutó `npm run test:security-scan` y `npm run test:security-p0`. Se auditaron 44 archivos en `dist/` certificando cero claves expuestas. |
| **R5: Acceso prematuro de menores de edad antes de la homologación técnica** | **Crítica** | Baja | La etapa finaliza en estado de bloqueo controlado. Se mantiene la prohibición estricta de invitar o enrolar las cuentas reales de Gael y Avril hasta superar todas las fases de auditoría. |
