# Registro de Cambios Técnicos — ETAPA 14: Despliegue y Operación
## Plataforma Educativa ALSIZ para Ekballo Church

- **Etapa**: ETAPA-14
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-14-despliegue-y-operacion`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Líder Técnico**: AI Lead Architect & Senior Engineer (Pair Programming Antigravity)

---

### 1. Resumen de Modificaciones

En la **Etapa 14**, se estructuró e implementó la suite completa de gobernanza operativa, despliegue reproducible, automatización de copias de seguridad en caliente, recuperación ante desastres verificada y diagnósticos de salud operativa del sistema sin realizar operaciones destructivas ni publicar a producción sin autorización.

---

### 2. Archivos Creados

| Ruta del Archivo | Razón Técnica y Propósito | Impacto en el Sistema |
|---|---|---|
| `scripts/backup-db.ts` | Utilidad CLI para ejecución de Hot Backups en caliente mediante `VACUUM INTO` con checkpoint WAL previo y hash SHA-256. | Permite respaldos atómicos sin detener la aplicación ni bloquear lecturas/escrituras. |
| `scripts/restore-db.ts` | Utilidad CLI para restauración de copias de seguridad con cierre explícito de conexiones y validación física obligatoria (`PRAGMA integrity_check`). | Habilita recuperación ante desastres en menos de 50 ms. |
| `scripts/health-check.ts` | Utilidad CLI para diagnóstico integral del entorno, persistencia SQLite, tablas, compilados y carpetas operativas. | Inspección de salud operativa previa y posterior al despliegue. |
| `scripts/test-etapa-14.ts` | Suite de pruebas automatizada de aseguramiento de despliegue y gobernanza operativa (12 pruebas críticas). | Verificación continua de calidad, aislamiento y consistencia. |
| `docs/operacion/guia_instalacion_despliegue.md` | Manual técnico de instalación, requisitos y despliegue en VPS Linux, Docker y serverless con Nginx. | Documentación reproducible para cualquier ingeniero autorizado. |
| `docs/operacion/guia_configuracion_entornos.md` | Especificación de variables de entorno para Dev, Staging y Prod con ejemplos sintéticos seguros. | Previene fugas de credenciales y define políticas de cookies y secretos. |
| `docs/operacion/manual_administrativo.md` | Manual de uso de la consola administrativa unificada, roles RBAC, RAG y cursos no formales. | Guía para secretaría, directores y administradores. |
| `docs/operacion/manual_actualizacion_curricular.md` | Procedimiento de incorporación y actualización de destrezas MINEDUC, MCER y 7 clases de Ekballo Church. | Guía para coordinadores pedagógicos y diseñadores instruccionales. |
| `docs/operacion/guia_gestion_profesores_ia.md` | Catálogo de agentes docentes, parámetros socráticos, salvaguardas éticas y rúbrica de supervisión. | Control de calidad pedagógica y doctrinal de los modelos de IA. |
| `docs/operacion/procedimiento_respaldo_restauracion.md` | Políticas de retención, cronograma de backups, automatización con cron y prueba real de restauración. | Garantía de continuidad operativa y salvaguarda de datos. |
| `docs/operacion/procedimiento_respuesta_incidentes.md` | Matriz de severidad (Sev-1 a Sev-4), protocolo de brechas LOPDP y conmutación por falla de IA. | Gestión formal de contingencias y crisis. |
| `docs/operacion/runbook_fallos_frecuentes.md` | Catálogo de 8 fallos conocidos con diagnósticos de causa raíz y comandos de solución rápida. | Soporte técnico de primer y segundo nivel. |
| `docs/operacion/registro_versiones_cambios.md` | Registro institucional histórico de cambios (Changelog) desde v0.0.1 hasta v1.0.0. | Trazabilidad histórica completa del proyecto. |
| `docs/ejecucion/etapas/ETAPA-14/evidencias/*` | Registro físico de salidas reproducibles de pruebas (test suite, health check, backup/restore real, build). | Evidencia auditable sin secretos ni datos personales. |

---

### 3. Archivos Modificados

| Ruta del Archivo | Modificación Realizada | Justificación |
|---|---|---|
| `package.json` | Incorporación de scripts operacionales: `"db:backup"`, `"db:restore"`, `"health"` y `"test:etapa14"`. | Facilita la ejecución estandarizada de comandos de mantenimiento y verificación de calidad. |
| `scripts/health-check.ts` | Corrección del nombre de tabla de `academic_programs` a `programs` para reflejar el esquema real de la migración 004. | Exactitud diagnóstica en el chequeo de entidades. |

---

### 4. Dependencias y Migraciones

- **Nuevas Dependencias Externas**: Ninguna (0). Se reutilizan estrictamente las bibliotecas nativas (`node:sqlite`, `node:crypto`, `node:fs`, `node:path`) y las dependencias ya existentes en el proyecto.
- **Nuevas Migraciones de Base de Datos**: Ninguna requerida. El esquema relacional completado en la Etapa 12 (12 migraciones) satisface íntegramente la operación del sistema.
- **Compatibilidad con Versiones Previas**: Totalmente retrocompatible. Cero roturas en interfaces de usuario ni contratos de API existentes.

