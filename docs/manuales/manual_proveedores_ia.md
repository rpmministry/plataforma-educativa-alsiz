# Manual de Operación y Gobernanza de Proveedores de IA (ETAPA-08)

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Versión:** 2.0.0 (Producción)  
**Fecha:** 17 de octubre de 2026  
**Nivel de Seguridad:** P0 (Cero Claves en Cliente / Aislamiento Estricto en Servidor)

---

## 1. Arquitectura Unificada de Inteligencia Artificial

Todos los requerimientos de interacción pedagógica inteligente en la plataforma ALSIZ (incluyendo los 20 profesores especializados de Gael y Avril, los 5 agentes transversales y los endpoints de chat y análisis docente) se procesan exclusivamente a través de un único enrutador backend: [`ProviderManager`](file:///server/agents/providers/providerManager.ts).

### Principios Fundamentales
1. **Ejecución 100% en Backend:** Ninguna petición a modelos de lenguaje sale desde el navegador web del alumno o representante. El bundle empaquetado de frontend en `dist/` contiene cero claves y cero endpoints directos a APIs de IA.
2. **Catálogo Honesto:** La plataforma implementa únicamente los proveedores reales activos: Google Gemini, DeepSeek API, OpenRouter API y el Simulador Socrático Local (`SIMULATED_LOCAL`). No se anuncian proveedores no consumidos (como OpenCode).
3. **Degradación Elegante y Atribución Honesta:** Si las cuotas de los proveedores externos se agotan o hay cortes de red, el sistema degrada de forma imperceptible y robusta al simulador socrático de contingencia (`SIMULATED_LOCAL`), marcando explícitamente `isFallback: true` en la respuesta y en la telemetría, sin fingir una conexión que no ocurrió.
4. **Protección Presupuestaria y de Menores (LOPDP):** Se prohíben las llamadas autónomas o disparadas por temporizadores sin acción del estudiante (`isManualUserAction: false`). Se impone un límite estricto de 15 solicitudes por minuto y 100 solicitudes diarias por alumno.
5. **Fundamentación RAG Estricta:** Las etiquetas de citación (`[MINEDUC-...#C1]`) se devuelven en la respuesta únicamente si el texto resultante del modelo las contiene de manera explícita. No se asume que un fragmento entregado en el prompt fue utilizado si el modelo no lo citó.

---

## 2. Configuración de Credenciales

Todas las credenciales deben colocarse en las variables de entorno del servidor (`.env` o `.env.local` en desarrollo, y en el panel del hosting en producción, por ejemplo Render, VPS o Vercel Serverless).

> [!WARNING]
> NUNCA coloque prefijos `VITE_` en variables que almacenen claves API de IA. Cualquier variable con prefijo `VITE_` será inyectada en el código JavaScript compilado y quedará visible públicamente en el navegador.

### Matriz de Variables de Entorno

| Variable | Tipo | Obligatoria | Proveedor / Propósito | Dónde Obtenerla |
|---|---|---|---|---|
| `GEMINI_API_KEY` | Secreto | **SÍ (Primario)** | Google Gemini (`gemini-3.8-flash`) | [Google AI Studio](https://aistudio.google.com/apikey) |
| `GEMINI_MODEL` | Pública | Opcional | Identificador de modelo Gemini (default: `gemini-3.8-flash`) | Configuración del proyecto |
| `DEEPSEEK_API_KEY` | Secreto | **Opcional (Respaldo)** | DeepSeek Platform (`deepseek-chat` / `deepseek-flash`) | [DeepSeek Platform](https://platform.deepseek.com/api_keys) |
| `DEEPSEEK_MODEL` | Pública | Opcional | Identificador de modelo (default: `deepseek-chat`) | Configuración del proyecto |
| `DEEPSEEK_BASE_URL`| Pública | Opcional | Endpoint API (default: `https://api.deepseek.com/v1`) | Configuración del proyecto |
| `OPENROUTER_API_KEY`| Secreto | **Opcional (Respaldo 3)** | OpenRouter Multimodelo gratuito | [OpenRouter Keys](https://openrouter.ai/settings/keys) |
| `OPENROUTER_MODEL` | Pública | Opcional | Modelo gratuito activo (default: `nvidia/nemotron-3.5-lightning:free`) | [OpenRouter Models](https://openrouter.ai/models) |
| `GOOGLE_TTS_API_KEY`| Secreto | Opcional | Voz neuronal sintética para profesores IA | [Google Cloud Console](https://console.cloud.google.com/) |
| `AI_PROVIDER_PRIORITY`| Pública | Opcional | Secuencia de cascada (default: `GEMINI,DEEPSEEK,OPENROUTER`) | Parámetro operativo |
| `AI_TIMEOUT_MS` | Pública | Opcional | Timeout por proveedor en ms (default: `30000`) | Parámetro operativo |
| `AI_MAX_RETRIES` | Pública | Opcional | Máx reintentos seriales (default: `1`) | Parámetro operativo |
| `AI_STUDENT_MAX_REQ_PER_MIN` | Pública | Opcional | Límite por minuto por alumno (default: `15`) | Parámetro de seguridad infantil |
| `AI_STUDENT_MAX_REQ_PER_DAY` | Pública | Opcional | Límite diario por alumno (default: `100`) | Parámetro de seguridad infantil |

---

## 3. Política de Cascada y Reintentos

La cascada de ejecución opera de manera estrictamente secuencial y no genera reintentos en paralelo:

```
[Petición del Estudiante]
          │
          ▼
   ¿Llamada manual? ────(No)───► [400 REJECTED_AUTONOMOUS_CALL]
          │ (Sí)
          ▼
  ¿Dentro de cuota? ────(No)───► [429 RATE_LIMIT_EXCEEDED]
          │ (Sí)
          ▼
┌────────────────────────────────────────┐
│ 1. Proveedor Primario (Google Gemini)  │◄── Máx 1 reintento serial
└──────────────────┬─────────────────────┘
                   │ Fallo / Cuota 429 / Timeout (30s)
                   ▼
┌────────────────────────────────────────┐
│ 2. Proveedor Secundario (DeepSeek API) │◄── Máx 1 reintento serial
└──────────────────┬─────────────────────┘
                   │ Fallo / Cuota / Timeout (30s)
                   ▼
┌────────────────────────────────────────┐
│ 3. Proveedor Terciario (OpenRouter)    │◄── Máx 1 reintento serial
└──────────────────┬─────────────────────┘
                   │ Fallo / Sin claves
                   ▼
┌────────────────────────────────────────┐
│ 4. Fallback Socrático Local            │◄── 100% de disponibilidad garantizada
│    (SIMULATED_LOCAL)                   │    (isFallback: true)
└────────────────────────────────────────┘
```

---

## 4. Endpoints de Salud y Telemetría Segura

Para supervisar el estado de los modelos sin comprometer la seguridad ni revelar datos de los estudiantes, la plataforma expone dos endpoints sanitizados:

### 1. `GET /api/v1/agents/health` y `GET /api/ai/health`
Ambos endpoints responden con el siguiente esquema JSON sanitizado:

```json
{
  "status": "HEALTHY",
  "timestamp": "2026-10-17T16:55:00.000Z",
  "activeProvider": "GOOGLE_GEMINI",
  "activeCascadeOrder": ["GEMINI", "DEEPSEEK", "OPENROUTER"],
  "providers": [
    {
      "name": "GOOGLE_GEMINI",
      "status": "CONFIGURED",
      "model": "gemini-3.8-flash",
      "priority": 1,
      "isPrimary": true,
      "isFallback": false
    },
    {
      "name": "DEEPSEEK_API",
      "status": "CONFIGURED",
      "model": "deepseek-chat",
      "priority": 2,
      "isPrimary": false,
      "isFallback": false
    },
    {
      "name": "OPENROUTER_API",
      "status": "CONFIGURED",
      "model": "nvidia/nemotron-3.5-lightning:free",
      "priority": 3,
      "isPrimary": false,
      "isFallback": false
    },
    {
      "name": "SIMULATED_LOCAL",
      "status": "AVAILABLE",
      "model": "alsiz-socratic-local-v1",
      "priority": 99,
      "isPrimary": false,
      "isFallback": true
    }
  ],
  "quotaPolicy": {
    "maxRequestsPerMinute": 15,
    "maxDailyPerStudent": 100,
    "mode": "ON_DEMAND_STUDENT_ACTIVITY"
  }
}
```

---

## 5. Scripts de Verificación Operativa

El equipo de operaciones dispone de las siguientes herramientas de verificación en la carpeta `scripts/`:

1. **Auditoría de Configuración Segura:**
   ```powershell
   npx tsx scripts/test-ai-providers-config.ts
   ```
   *Reporta si cada clave está `CONFIGURADA` o `NO_CONFIGURADA` sin mostrar jamás los valores ni sus longitudes.*

2. **Prueba de Conexión Real Externa:**
   ```powershell
   npx tsx scripts/test-ai-providers-live.ts
   ```
   *Envía una petición sintética corta y no sensible a cada proveedor configurado, midiendo latencia y validando la cascada y la citación RAG. Si no hay clave, marca honestamente `BLOCKED: falta configurar secreto`.*

3. **Suite Determinista Unificada de Aceptación:**
   ```powershell
   npx tsx scripts/test-etapa-08-unified.ts
   ```
   *Ejecuta la validación completa de los 9 criterios del Prompt 08 de forma reproducible.*

4. **Escaneo de Seguridad de Bundles Compilados:**
   ```powershell
   npx tsx scripts/test-scan-dist-secrets.ts
   ```
   *Escanea todos los archivos generados en `dist/` verificando cero inyecciones de claves y cero URLs directas de IA.*

