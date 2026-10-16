# Evidencia 02 — Comparativa de Arquitecturas y Benchmarks Técnicos

Evaluación comparativa entre la arquitectura heredada de Wisdom School y la arquitectura destino modular ALSIZ.

---

## 1. Matriz Comparativa de Capacidades Técnicas

| Dimensión Técnica | Wisdom School (Línea Base Heredada) | ALSIZ (Arquitectura Destino Etapa 03) | Ganancia / Justificación Técnica |
| :--- | :--- | :--- | :--- |
| **Persistencia de Datos** | `localStorage` volátil (límite 5 MB, borrado al limpiar historial). | Relacional (PostgreSQL / SQLite) + Sincronización Local PWA. | Cero riesgo de pérdida de historial; soporte multi-dispositivo y supervisión de padres. |
| **Seguridad de Autenticación** | Bypass en frontend (`cleanId === found.id`). Sesión en texto plano. | Argon2id / Bcrypt + Tokens JWT en Cookies `HttpOnly` con CSRF. | Eliminación de accesos no autorizados; cumplimiento formal de la LOPDP ecuatoriana. |
| **Protección de Llaves IA** | Variables `VITE_GEMINI_API_KEY` leídas en cliente con fallback. | Orquestación centralizada 100% en backend; cero llaves en bundle JS. | Protección de presupuesto y confidencialidad; prevención de abusos de cuota por terceros. |
| **Tolerancia a Fallos de IA** | Proveedor único; si falla Gemini, la aplicación queda inoperativa. | Cascada con Circuit Breaker: DeepSeek V3 -> Gemini 2.0 Flash -> OpenRouter. | Disponibilidad 99.8%; latencia de conmutación inferior a 4 segundos. |
| **Fidelidad Doctrinal** | Prompts generales; riesgo de inventar doctrinas ajenas a la iglesia. | Motor RAG con chunking jerárquico, citas obligatorias `[S#]` y rechazo temprano. | Fidelidad doctrinal absoluta sobre las 7 clases canónicas en PDF de Ekballo Church. |
| **Privacidad de Menores** | Fotos reales de estudiantes servidas estáticamente en `/public/students/`. | Avatares vectoriales ilustrados + Almacenamiento S3/R2 con Presigned URLs. | Protección reforzada a la imagen e identidad de menores bajo el Art. 22 de la LOPDP. |
| **Modelo de Matrícula** | Rígido: un alumno solo puede pertenecer a un grado escolar. | Extensible (N:M): un alumno cursa simultáneamente escuela y discipulado eclesial. | Un solo usuario y expediente para múltiples programas formativos sin duplicación. |
| **Trabajo Desconectado** | Dependencia de red para interactuar con el asistente. | Generador de Guías Didácticas Imprimibles en PDF a 3 niveles cognitivos. | Resiliencia ante cortes de energía o internet en zonas rurales y misioneras de Ecuador. |

