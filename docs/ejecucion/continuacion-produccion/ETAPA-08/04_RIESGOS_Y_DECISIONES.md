# Registro de Riesgos y Decisiones — Etapa 08: Configuración Verificable de APIs de IA y Prueba Real de Proveedores

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-08 (Continuación a Producción)  
**Fecha:** 17 de octubre de 2026  
**Responsable Técnico:** Antigravity (Google DeepMind Team)  

---

## 1. Registro de Decisiones de Arquitectura e Implementación

### Decisión 1: Cascada Jerárquica Secuencial en Lugar de Reintentos Concurrentes
- **Contexto:** En sistemas de IA, a menudo se intenta llamar a múltiples proveedores en paralelo para seleccionar el primero que responda (estrategia "race").
- **Decisión:** Se implementó una cascada estrictamente secuencial con un máximo de 1 reintento serial por proveedor.
- **Razón:** La concurrencia paralela multiplica los costos de token y agota prematuramente las cuotas de los planes gratuitos de Google AI Studio y OpenRouter. La cascada secuencial garantiza uso responsable de los recursos.

### Decisión 2: Supresión del Modo "Extended Thinking" en Gemini 3.8 Flash
- **Contexto:** Las versiones 2.5 / 3.x de Gemini incorporan modos de razonamiento profundo ("thinking") que por defecto pueden tardar más de 60 segundos en responder, lo que provocaba timeouts y una experiencia inaceptable para los estudiantes.
- **Decisión:** Se configuró explícitamente `thinkingConfig: { thinkingBudget: 0 }` en `geminiProvider.ts`.
- **Razón:** Reduce la latencia de respuesta de >60s a ~3.6s, manteniendo la calidad socrática y la interacción fluida.

### Decisión 3: Verificación Estricta y Honestidad de Citación RAG
- **Contexto:** Anteriormente, el código copiaba automáticamente todas las etiquetas de las fuentes recuperadas (`allowed_source_codes_json` o chunks entregados) al arreglo de citas de la respuesta, alucinando que el modelo las había citado.
- **Decisión:** Se modificaron todos los proveedores para que verifiquen si la etiqueta (ej. `[MINEDUC-LEN-ELEM-4#C1]`) está presente en el texto resultante del LLM mediante `text.includes(tag)`. Si el modelo no mencionó la etiqueta en su razonamiento pedagógico, no se añade a `citationTags`.
- **Razón:** Cumple con la exigencia de fundamentación real y evita atribuir al alumno o a la plataforma citas no verificables.

### Decisión 4: Aislamiento Estructural de Migración 013 ante Ambientes de Producción Limpios
- **Contexto:** En producción se omiten los datos semilla de desarrollo (`003_seed_dev_data.sql` y `005_lms_seed_data.sql`), lo que dejaba vacías las tablas `programs` y `levels`. Al intentar insertar las asignaturas canónicas en `013_ai_agents_complete_catalog.sql`, fallaba por restricción de clave foránea.
- **Decisión:** Se incluyó en la migración 013 la inserción idempotente (`INSERT OR IGNORE`) de los programas y niveles canónicos de la malla K-12, y se condicionó `default_teacher_id` mediante subconsulta `(SELECT id FROM users WHERE id = 'usr-teacher-01')`.
- **Razón:** Permite que la base de datos se inicialice limpiamente en producción sin requerir cuentas demo de desarrollo.

---

## 2. Matriz de Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación Implementada |
|---|:---:|:---:|---|
| **Agotamiento de cuota diaria en Google AI Studio (Free Tier: 20 req/día)** | Alta | Medio | Detección inmediata de error HTTP 429 `RESOURCE_EXHAUSTED` y salto instantáneo (0ms) a `DEEPSEEK_API` o `OPENROUTER_API`. |
| **Agotamiento de saldo o caída de red en todos los proveedores externos** | Baja | Alto | Salvaguarda inquebrantable `SIMULATED_LOCAL` que garantiza 100% de operatividad pedagógica socrática offline con atribución transparente (`isFallback: true`). |
| **Abuso o consumo masivo de cuotas por temporizadores autónomos de frontend** | Media | Alto | Validación obligatoria de `isManualUserAction: true`. Toda petición automática o desprovista de acción intencional del usuario es rechazada con HTTP 400. |
| **Consumo desmedido por parte de alumnos menores de edad** | Media | Medio | Limitador de tasa por estudiante en memoria (15 req/min, 100 req/día) con mensaje pedagógico formativo al alcanzar el límite. |
| **Fuga de claves API de IA hacia el navegador del cliente** | Baja | Crítico | Las claves se leen únicamente en el backend (`process.env`). Cero variables `VITE_*` secretas. El script de escaneo de `dist/` analiza los 44 bundles asegurando cero fugas. |
| **Filtración de PII de menores en telemetría o logs** | Baja | Crítico | La tabla `ai_telemetry_logs` y los logs del gestor omiten identificadores personales, nombres y correos de alumnos, registrando únicamente códigos de agente, modelos y latencias. |

