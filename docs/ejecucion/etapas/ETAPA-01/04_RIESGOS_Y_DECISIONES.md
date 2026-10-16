# ETAPA-01 — Informe de Licencias, Riesgos de Integración y Decisiones Técnicas

## 1. Informe de Licencias y Viabilidad Legal

| Repositorio / Recurso | Licencia Declarada | Permisividad / Compatibilidad | Restricciones y Riesgos Legales | Veredicto de Adopción |
|---|---|---|---|---|
| `TobbenTT/colegio` | `null` (Sin licencia) | **Incompatible** | Todo derecho reservado por defecto. Prohibida copia, modificación o redistribución de código. | `Descartar` |
| `Zethearc/edu_ai` | MIT License | **Permisiva** | Requiere mantener aviso de copyright. Código libre de uso comercial y privado. | `Referencia` |
| `tonalliGarcia/IAEducation` | `null` (Sin licencia) | **Incompatible** | Todo derecho reservado. Sin valor técnico. | `Descartar` |
| `juansebag31-blip/academia-ia-educativa` | `null` (Sin licencia) | **Incompatible para código directo** | No tiene archivo LICENSE en GitHub. No se debe copiar su código fuente. Sin embargo, su patrón arquitectónico (RAG con citas `[S#]`, chunking de módulos y pgvector) es un estándar de la industria plenamente replicable de forma limpia. | `Adaptar / Referencia` (Replicar arquitectura limpiamente) |
| `THU-MAIC/OpenMAIC` | MIT License | **Permisiva** | Código abierto comercial y académico. Requiere atribución de copyright (Tsinghua University). | `Piloto Aislado / Adaptar` |
| `StudentTraineeCenter/edu-agent` | MIT License | **Permisiva** | Uso libre comercial y privado con atribución. | `Reutilizar habilidades / Adaptar` |
| `hqanhh/EduGPT` | MIT License | **Permisiva** | Uso libre con atribución. Proyecto inactivo. | `Referencia` |
| `DHRUVvkdv/teaching-assistant` | `null` (Sin licencia) | **Incompatible** | Sin licencia de código abierto. Solo utilizable como referencia conceptual. | `Referencia` |
| `A-R007/Multi-Agent-Study-Assistant` | `null` (Sin licencia) | **Incompatible** | Sin licencia de código abierto. | `Referencia` |
| `GarethManning/education-agent-skills` | Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0) | **Permisiva con Copyleft en Adaptaciones** | Permite compartir y adaptar las habilidades siempre que se otorgue atribución adecuada y las adaptaciones directas de los archivos de skill se licencien bajo los mismos términos. Las llamadas o consumo externo por software no contagian la app. | `Reutilizar habilidades` |
| Topic `virtual-classroom` (`netless-io/flat`) | MIT License | **Permisiva** | Requiere contratos y llaves comerciales de Agora SDK para WebRTC en producción. | `Referencia` |

---

## 2. Análisis Especial de Viabilidad: THU-MAIC/OpenMAIC

### ¿Puede integrarse directamente OpenMAIC en ALSIZ?
**Dictamen Técnico**: **NO DE FORMA DIRECTA.** La integración directa en el código base actual de ALSIZ debe **descartarse** y considerarse únicamente como **Piloto Aislado o Adaptación de Patrones**.

### Justificación Técnica Basada en Evidencia:
1. **Disparidad Radical de Stack y Build**:
   - ALSIZ es una Single Page Application (SPA) construida sobre **React 19 + Vite 6 + TypeScript 5.8** con un backend Express monolítico y ligero (`dev-server.ts` / `server.ts`).
   - OpenMAIC (v1.2.0) es un monorepo complejo construido sobre **Next.js 16 (App Router) + pnpm 10 workspaces + LangGraph 1.1 + Node.js >= 22.19**. Intentar fusionar ambos códigos destruiría la arquitectura ligera y generaría incompatibilidades severas en Vite y esbuild.
2. **Requisitos de Infraestructura Incompatibles con Serverless / Vercel Ligero**:
   - A partir de la versión v1.2.0, OpenMAIC es formalmente *server-first*: exige un proceso de servidor de larga duración (*long-running process*) y una base de datos **PostgreSQL 16 dedicada** para manejar grafos de LangGraph que sobrevivan desconexiones.
   - Las funciones serverless de Vercel (donde ALSIZ proyecta operar con `vercel.json`) tienen timeouts estrictos (10 a 60 segundos) que causan fallas críticas en los ciclos de generación multi-agente de OpenMAIC.
3. **Sobrecarga de Costos y Consumo de Tokens**:
   - OpenMAIC orquesta múltiples agentes concurrentes (profesor, alumnos virtuales que discuten entre sí, generador de escenas y dibujante de pizarra), lo que multiplica por 5x a 10x el consumo de tokens en comparación con el modelo socrático 1-a-1 de ALSIZ.
4. **Recomendación Estratégica**:
   - **No tocar el monorepo de OpenMAIC**.
   - En su lugar, **adaptar su concepto de Escenas Interactivas HTML autónomas**: permitir que el profesor IA de ALSIZ devuelva fragmentos interactivos autocontenidos en HTML/JS embebidos en el aula virtual, o desplegar OpenMAIC como un microservicio satelital opcional en un VPS para proyectos específicos.

---

## 3. Identificación de Dependencias Pagadas, Servicios Externos y Costos

1. **Modelos de Lenguaje (LLMs)**:
   - *DeepSeek API*: Costo por token muy bajo (~$0.14 - $0.28 por millón de tokens). Ideal para producción estable.
   - *Google Gemini*: Capa gratuita disponible para desarrollo (`gemini-2.5-flash` / `gemini-1.5-flash`). En escala institucional requiere proyecto GCP y facturación por cuota.
   - *OpenRouter*: Agregador con modelos `:free` de respaldo, pero con límites de tasa variables y disponibilidad fluctuante.
2. **Síntesis de Voz (Text-to-Speech)**:
   - *Google Cloud Text-to-Speech (Neural2)*: Pago por caracteres (primeros 1 millón de caracteres gratuitos al mes).
   - *Web Speech API (Navegador)*: 100% gratuita y sin consumo de red, pero la calidad varía drásticamente según el sistema operativo del estudiante (iOS Safari vs. Windows vs. Android).
3. **Almacenamiento y Persistencia**:
   - La persistencia actual en `localStorage` no tiene costo, pero introduce riesgo severo de pérdida de datos.
   - Para producción institucional se requerirá una base de datos gestionada (e.g. Supabase / PostgreSQL en Supabase free-tier o Cloud SQL en GCP).

---

## 4. Decisiones que Requieren Aprobación Humana del Responsable

| Decisión Pendiente | Opciones Técnicas Disponibles | Impacto y Recomendación del Líder Técnico |
|---|---|---|
| **D-01: Corrección Inmediata de Seguridad (Bypass de Login y Claves en Cliente)** | A) Corregir en la Etapa 02 como primera tarea prioritaria.<br>B) Postergar para una etapa de seguridad dedicada. | **Se recomienda Opción A**: Es peligroso construir nuevas funcionalidades sobre una autenticación vulnerable (`SchoolContext.tsx:382`) y con claves potencialmente expuestas en el bundle. |
| **D-02: Enfoque de la Persistencia Backend** | A) Mantener `localStorage` en Fase 1 (MVP) y añadir base de datos en Fase 2.<br>B) Adoptar Supabase/PostgreSQL desde la Fase 1 para el curso de Discipulado. | **Se recomienda Opción A para no romper la simplicidad actual del fork**, pero implementando un exportador JSON de respaldo local para prevenir pérdida de datos. |
| **D-03: Estrategia de IA para el Curso de Discipulado (7 Clases Ekballo)** | A) RAG Estricto con citas sobre los 7 PDFs doctrinales (inspirado en *Academia IA*).<br>B) Inyección de contexto directo en prompt del profesor IA (modelo Wisdom School ampliado). | **Se recomienda Opción B para Fase 1**: Al ser solo 7 clases de ~15 páginas cada una, inyectar el texto exacto de la clase en el prompt del profesor socrático es inmediato, determinista, no requiere base vectorial y elimina alucinaciones. En Fase 2 pasar a RAG semántico. |
| **D-04: Transición de Marca e Identidad** | A) Reemplazo total de Wisdom School por Plataforma Educativa ALSIZ / Ekballo Church.<br>B) Modo dual o multi-escuela (conservar perfiles de Wisdom School como demostración y añadir Ekballo como institución principal). | **Requiere decisión del responsable**: La Opción B preserva todo el microcurrículo existente de Avril y Gael intacto mientras se despliega la formación de Ekballo. |
| **D-05: Autorización de `git fetch origin`** | A) Autorizar conexión de red para consultar el remoto de GitHub.<br>B) Mantener trabajo exclusivamente sin operaciones remotas de red. | Permite certificar si hay commits remotos no descargados en el fork. |

