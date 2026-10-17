# Registro de Riesgos y Decisiones — Etapa 09: Procedimiento de Creación y Colocación de Claves API

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-09 (Continuación a Producción)  
**Rama:** `continuacion-produccion-etapa-09`  
**Fecha:** 17 de octubre de 2026  

---

## 1. Decisiones Arquitectónicas y Operativas

### Decisión 1: Guía Autónoma Sin Revelación de Secretos al Asistente
- **Contexto:** En el modelo de pair programming con asistentes de IA, existe el riesgo latente de que el usuario pegue claves reales en el chat para "probarlas".
- **Decisión:** Diseñar la guía como un manual totalmente auto-conclusivo para el administrador humano, acompañado de scripts de comprobación (`scripts/test-ai-providers-config.ts` y `/api/ai/health`) que reportan exclusivamente valores booleanos (`CONFIGURADA` / `NO_CONFIGURADA`) y diagnósticos sanitizados.
- **Impacto:** Cero exposición de claves privadas en el historial del agente, logs de contexto o transcripciones.

### Decisión 2: Honestidad Absoluta respecto a OpenCode
- **Contexto:** En fases previas de prototipado existían menciones a OpenCode en benchmarks aislados.
- **Decisión:** Documentar inequívocamente en la guía que OpenCode **NO está integrado en tiempo de ejecución** en el gestor de proveedores (`ProviderManager`), instruyendo al administrador a no crear cuentas ni cargar saldos innecesarios.
- **Impacto:** Protección contra gastos accidentales y mantenimiento de un catálogo 100% veraz.

### Decisión 3: Estricto Aislamiento de Secretos entre Vercel y Backend Persistente
- **Contexto:** En la Arquitectura Recomendada (Opción A), Vercel actúa únicamente como CDN estático y proxy reverso hacia el backend persistente (Render/VPS).
- **Decisión:** Prohibir expresamente la configuración de claves de IA (`GEMINI_API_KEY`, `DEEPSEEK_API_KEY`) y secretos de base de datos en Vercel cuando se opera bajo la Opción A. Vercel solo debe conocer `BACKEND_URL`.
- **Impacto:** Reduce la superficie de ataque y previene la dispersión innecesaria de credenciales en múltiples proveedores de nube.

### Decisión 4: Obligatoriedad de Re-despliegue (*Redeployment*) en Vercel
- **Contexto:** Administradores poco habituados a entornos serverless asumen que cambiar una variable en el panel web tiene efecto inmediato en producción.
- **Decisión:** Enfatizar la regla técnica de Vercel según la cual las funciones y el build estático se construyen de forma inmutable; todo cambio de variables exige un "Redeploy".
- **Impacto:** Evita frustraciones operativas y fallos de configuración no aplicados en caliente.

---

## 2. Matriz de Riesgos Identificados y Mitigaciones

| Riesgo | Severidad | Probabilidad | Mitigación Implementada en la Guía |
|---|:---:|:---:|---|
| **R1: Exposición accidental de claves en el bundle cliente (VITE_)** | **Crítica** | Media | Banner de alerta P0 y regla explícita: NUNCA usar prefijo `VITE_` en claves de IA o secretos de servidor. |
| **R2: Confusión entre OAuth Client ID y API Key de Gemini** | **Alta** | Media | Sección dedicada explicando que el Client ID es público para login, mientras que la API Key es privada de backend para peticiones a la API. |
| **R3: Cargos desmedidos por uso no autorizado de claves** | **Alta** | Baja | Instrucción de aplicar restricciones de API (`Generative Language API`) en Google Cloud Console y límite diario de 100 req/estudiante en `ProviderManager`. |
| **R4: Desconexión de clases por agotamiento de cuota diaria en Gemini Free** | **Media** | Media | Documentación de la cascada automática a DeepSeek (`deepseek-chat`) y degradación final transparente a `SIMULATED_LOCAL` sin error 500. |
| **R5: Violación de privacidad LOPDP en pruebas de correo electrónico** | **Crítica** | Baja | Prohibición estricta de usar direcciones reales de estudiantes para pruebas de envío de PIN o reset; uso exclusivo de cuentas sintéticas de prueba. |
