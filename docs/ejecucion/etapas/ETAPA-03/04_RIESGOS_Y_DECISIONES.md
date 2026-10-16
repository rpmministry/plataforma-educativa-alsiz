# ETAPA-03 — Gestión de Riesgos Arquitectónicos y Decisiones Pendientes

## 1. Registro de Riesgos Técnicos y Arquitectónicos

| ID Riesgo | Descripción del Riesgo | Impacto | Probabilidad | Estrategia de Mitigación Diseñada |
| :--- | :--- | :---: | :---: | :--- |
| **RSK-ARQ-01** | **Dependencia de Conectividad para IA en Zonas Rurales de Ecuador**: Familias misioneras sin acceso continuo a internet no pueden usar el tutor socrático en vivo. | ALTO | ALTA | Se diseñó el **Generador de Guías Didácticas Imprimibles en PDF** y el modo PWA Offline, permitiendo estudiar con material físico o descargado y sincronizar al reconectar. |
| **RSK-ARQ-02** | **Agotamiento de Cuota o Fallo de Proveedor LLM en Horas Pico**: Caída de la API de DeepSeek durante la jornada escolar matutina. | ALTO | MEDIA | Se implementó en diseño el **Circuit Breaker con Cascada Multi-Proveedor** (DeepSeek -> Gemini 2.0 Flash -> OpenRouter) con descarte por timeout de 4.0 segundos. |
| **RSK-ARQ-03** | **Sobrecosto Imprevisto por Consultas Abusivas de Alumnos**: Estudiantes generando miles de peticiones al asistente. | MEDIO | MEDIA | Middleware de **Rate Limiting** configurado a un máximo de 20 peticiones/minuto y límite mensual de 120.000 tokens por alumno en backend. |
| **RSK-ARQ-04** | **Complejidad de Migración de Datos desde `localStorage`**: Pérdida de progreso escolar existente de Avril o Gael al pasar a base de datos relacional. | CRÍTICO | BAJA | El componente de migración mantiene copia de seguridad local automática antes de la primera sincronización y dispone de exportación manual a JSON. |

---

## 2. Decisiones Arquitectónicas que Requieren Confirmación Humana

Las siguientes decisiones estructurales se dejan formalmente planteadas con sus opciones e impactos para resolución de la dirección del proyecto:

1. **Decisión D-ARQ-01: Elección del Motor de Base de Datos para Persistencia en Producción**
   - *Opción A (Recomendada)*: **PostgreSQL en la Nube (Supabase o Neon Serverless)**. Provee extensiones nativas `pgvector` para el RAG, backups automáticos y escalabilidad sin gestionar servidores físicos. Plan gratuito generoso que cubre hasta 50 alumnos sin costo.
   - *Opción B*: **SQLite Embebido con LiteFS / Turso**. Muy ligero, cero configuración externa, pero con mayores limitaciones para consultas analíticas complejas o dashboards multi-tenant de gran volumen.
   - *Consecuencia de aplazar*: La Fase 1 (Seguridad y Branding) y Fase 2 (Currículo) no dependen de la base de datos externa; la decisión puede tomarse antes de iniciar la Fase 4.

2. **Decisión D-ARQ-02: Modalidad de Autenticación de Estudiantes Infantiles en iPads**
   - *Opción A (Recomendada)*: **PIN Táctil de 4 Dígitos pre-autorizado por el padre** para alumnos de EGB Elemental (Gael). Excelente ergonomía táctil en tablets.
   - *Opción B*: **Usuario y Contraseña Alfanumérica Completa para todos**. Mayor fricción para niños pequeños de 8 años, aumentando la probabilidad de requerir soporte familiar constante.

3. **Decisión D-ARQ-03: Servicio de Almacenamiento de Archivos y Evidencias**
   - *Opción A (Recomendada)*: **Cloudflare R2**. 10 GB gratuitos al mes y cero costos por transferencia de salida (*zero egress fees*), reduciendo la factura a prácticamente \$0.00 en los primeros 2 años.
   - *Opción B*: **Amazon Web Services (AWS S3)**. Estándar corporativo global, pero con cobros por egress y mayor complejidad en la configuración de políticas IAM.

