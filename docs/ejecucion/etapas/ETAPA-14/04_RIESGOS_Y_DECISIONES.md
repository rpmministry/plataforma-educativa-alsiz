# Riesgos Residuales y Decisiones Técnicas — ETAPA 14
## Plataforma Educativa ALSIZ para Ekballo Church

- **Etapa**: ETAPA-14: Despliegue y Operación
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-14-despliegue-y-operacion`

---

### 1. Decisiones Técnicas Adoptadas

#### Decisión 1: Implementación de Hot Backup mediante `VACUUM INTO` Transaccional
- **Contexto**: SQLite opera con archivos en disco y diario transaccional WAL. Realizar una copia de archivos convencional (`cp alsiz.db ...`) mientras el servidor está en ejecución puede capturar un estado inconsistente de páginas divididas (*torn pages*) o ignorar transacciones en el archivo `-wal`.
- **Decisión**: Utilizar la instrucción SQL nativa `VACUUM INTO` precedida de `PRAGMA wal_checkpoint(PASSIVE);`.
- **Razón y Beneficios**:
  - Operación atómica y consistente a nivel de motor de base de datos.
  - No bloquea lectores ni detiene el servicio web.
  - Desfragmenta y compacta la base de datos resultante, optimizando espacio y tiempo de transferencia.
- **Alternativas Descartadas**:
  - *Copia de archivos cruda en caliente*: Descartada por riesgo crítico de corrupción física.
  - *Volcado lógico a texto SQL (`.dump`)*: Descartada por ser significativamente más lenta y requerir reconstrucción completa durante la restauración.

#### Decisión 2: Delimitación de Infraestructura Productiva: VPS / Docker vs Vercel Serverless
- **Contexto**: El repositorio original de Wisdom School contenía configuraciones para Vercel (`vercel.json`). Sin embargo, en la Etapa 05 se consolidó un backend relacional modular en Express con SQLite embebido. En las funciones serverless de Vercel (@vercel/node), el sistema de archivos es estrictamente de solo lectura salvo la carpeta temporal `/tmp`, cuyos datos se destruyen al reciclar la instancia de la función lambda.
- **Decisión**: Declarar y documentar formalmente en la Guía de Despliegue que el entorno de producción recomendado para ALSIZ es un **Servidor VPS Linux (Ubuntu 24.04 LTS con PM2 o Docker)** que garantice persistencia permanente en disco SSD para `/data/` y `/backups/`. Si se usa Vercel, debe utilizarse exclusivamente para alojar el frontend estático, redirigiendo la API hacia el servidor backend persistente.
- **Alternativas Descartadas**:
  - *Migrar de emergencia a una base de datos PostgreSQL remota*: Descartada por violar la regla de alcance de la Etapa 14 (no realizar refactorizaciones generales no autorizadas).
  - *Ignorar la limitación de Vercel y desplegar SQLite en `/tmp`*: Descartada por constituir riesgo inaceptable de pérdida de datos de estudiantes.

#### Decisión 3: Observabilidad y Diagnóstico sin Dependencias Externas Pesadas
- **Contexto**: Se requería proveer diagnósticos de salud (`health`), alertas y comprobaciones sin incurrir en costes de licenciamiento SaaS (Datadog, New Relic) ni inflar el tamaño de dependencias en `node_modules`.
- **Decisión**: Implementar `scripts/health-check.ts` y enriquecer el middleware de auditoría utilizando únicamente módulos nativos de Node.js (`node:sqlite`, `node:crypto`, `node:fs`).
- **Beneficios**: Despliegue ultraligero, cero costes de suscripción para Ekballo Church y total independencia tecnológica.

---

### 2. Alternativas Técnicas Descartadas

| Alternativa Evaluada | Razón de Descarte |
|---|---|
| **Orquestación con Kubernetes / Helm** | Sobredimensionada e innecesariamente compleja para la escala actual de Ekballo Church (familias y estudiantes en homeschool); incrementaría costos de administración y mantenimiento sin justificación técnica. |
| **Push directo a rama main o deploy automático a Vercel** | Estrictamente prohibido por la regla de alcance 5: "No publiques, despliegues, hagas push ni ejecutes operaciones destructivas sin autorización expresa". |
| **Scripts en lenguaje Bash dependientes de Linux exclusivo** | Descartado en favor de scripts TypeScript multiplataforma ejecutables vía `tsx` (`npm run db:backup`), compatibles tanto en Windows (entorno de desarrollo local) como en servidores Linux de producción. |

---

### 3. Matriz de Riesgos Residuales

| Riesgo Residual | Severidad | Probabilidad | Estrategia de Mitigación Permanente |
|---|---|---|---|
| **R-14.1: Despliegue accidental en Vercel con pérdida de datos tras reinicio de contenedor** | Alta | Baja | La Guía de Instalación y Despliegue (`docs/operacion/guia_instalacion_despliegue.md`) y el Runbook advierten de forma prominente esta condición, especificando el uso de VPS Linux con volumen montado. |
| **R-14.2: Olvido de rotación de claves en producción** | Media | Media | El manual de configuración de entornos (`docs/operacion/guia_configuracion_entornos.md`) exige el uso de claves generadas criptográficamente (`openssl rand -hex 32`) y establece un procedimiento de cambio de secreto. |
| **R-14.3: Agotamiento de cuota de proveedores de IA externos** | Media | Media | Mitigado por diseño mediante la cascada inteligente con fallback automático a `SIMULATED_LOCAL` sin error 500 para el estudiante. |
| **R-14.4: Llenado de disco por acumulación histórica de respaldos** | Baja | Baja | La política de retención documentada en `docs/operacion/procedimiento_respaldo_restauracion.md` establece rotación de backups (7 días para diarios, 4 semanas para semanales). |

