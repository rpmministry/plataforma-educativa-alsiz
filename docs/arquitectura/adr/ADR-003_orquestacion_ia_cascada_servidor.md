# ADR-003: Orquestación Multi-Proveedor de IA en Servidor con Cascada y Circuit Breaker

- **Estado**: Aprobado
- **Fecha**: 2026-10-16
- **Autores**: Antigravity / Liderazgo Técnico ALSIZ
- **Contexto**:
  El código base en `src/services/aiService.ts` intenta realizar llamadas a la API de Google Gemini directamente desde el cliente web mediante variables `VITE_GEMINI_API_KEY`. Esto expone claves privadas en el bundle JS compilado, no permite controlar límites de gasto por alumno y carece de tolerancia a fallos ante caídas del proveedor o cuotas agotadas.
- **Alternativas Evaluadas**:
  1. *Proveedor Único en Servidor*: Depender exclusivamente de una API (ej. Gemini o OpenAI). Alto riesgo de interrupción de clases si el proveedor sufre cortes de servicio o impone límites de tasa.
  2. *SDKs de IA directos en el Navegador con WebLLM*: Procesamiento local en el cliente. Descarga pesada de modelos (>2 GB), incompatible con tablets escolares de gama media/baja en Ecuador.
  3. *Capa de Orquestación en Servidor con Cascada y Circuit Breaker (Elegida)*: Servidor centralizado que gestiona las claves en variables de entorno seguras (`.env`) y conmuta de manera transparente entre proveedores.
- **Decisión**:
  Implementar el servicio `LLMCascadeProvider` en el backend con una cascada de 3 niveles:
  - *Nivel 1 (Primario)*: **DeepSeek V3** (`deepseek-chat`) para razonamiento socrático y bajo coste (\$0.14/1M tokens).
  - *Nivel 2 (Secundario)*: **Google Gemini 2.0 Flash** para multimodalidad (visión) y respaldo rápido (\$0.10/1M tokens).
  - *Nivel 3 (Terciario)*: **OpenRouter API** como salvaguarda de contingencia.
  Incorporar un *Circuit Breaker* en memoria con descarte por timeout de 4.0 segundos y suspensión temporal tras 3 fallos consecutivos.
- **Consecuencias**:
  - *Positivas*: Disponibilidad superior al 99.8%; coste por estudiante acotado (< \$0.25 USD/mes); cero exposición de claves en el navegador.
  - *Negativas*: El backend debe manejar formatos de payload heterogéneos entre proveedores (normalizados mediante un adaptador unificado).

