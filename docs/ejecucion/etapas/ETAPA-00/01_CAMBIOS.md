# ETAPA-00 — Registro de Cambios y Exploración

## 1. Resumen de Intervención
En estricto cumplimiento de las restricciones de la **Etapa 00: Auditoría del fork local, estado de Git y recuperación**, **NO se ha modificado, reescrito ni eliminado ninguna línea de código de producto ni de configuración funcional** (`src/`, `server.ts`, `dev-server.ts`, `package.json`, `vite.config.ts`, etc.).

La única intervención en el sistema de archivos corresponde a la creación del marco formal de auditoría y trazabilidad en `docs/ejecucion/`.

---

## 2. Archivos Creados
| Ruta Relativa | Tipo | Justificación / Contenido |
|---|---|---|
| `docs/ejecucion/README.md` | Documentación | Índice general y manual del sistema de ejecución técnica. |
| `docs/ejecucion/bitacora.md` | Documentación | Registro cronológico con entrada fechada de la Etapa 00. |
| `docs/ejecucion/etapas/ETAPA-00/00_PLAN.md` | Documentación | Plan, alcance, exclusiones y criterios de aceptación. |
| `docs/ejecucion/etapas/ETAPA-00/01_CAMBIOS.md` | Documentación | Registro de intervención y mapa de archivos analizados (este archivo). |
| `docs/ejecucion/etapas/ETAPA-00/02_PRUEBAS.md` | Documentación | Registro de comandos Git y pruebas de compilación ejecutadas. |
| `docs/ejecucion/etapas/ETAPA-00/03_VALIDACION.md` | Documentación | Matriz de cumplimiento frente a los criterios del prompt específico. |
| `docs/ejecucion/etapas/ETAPA-00/04_RIESGOS_Y_DECISIONES.md` | Documentación | Análisis priorizado de riesgos de seguridad, arquitectura y preservación. |
| `docs/ejecucion/etapas/ETAPA-00/05_REVERSA.md` | Documentación | Protocolo exacto de rollback sin alterar datos ajenos. |
| `docs/ejecucion/etapas/ETAPA-00/06_CIERRE.md` | Documentación | Informe ejecutivo de auditoría y recomendaciones para la Etapa 01. |
| `docs/ejecucion/etapas/ETAPA-00/evidencias/00_git_baseline.txt` | Evidencia | Salida de comandos Git iniciales (`rev-parse`, `status`, etc.). |
| `docs/ejecucion/etapas/ETAPA-00/evidencias/01_npm_run_lint.txt` | Evidencia | Salida de la verificación de tipos TypeScript (`tsc --noEmit`). |
| `docs/ejecucion/etapas/ETAPA-00/evidencias/02_npm_run_build.txt` | Evidencia | Salida del empaquetado de producción (Vite + esbuild). |
| `docs/ejecucion/etapas/ETAPA-00/evidencias/03_git_diff_stat.txt` | Evidencia | Salida de `git diff --stat` confirmando 0 modificaciones en archivos rastreados. |
| `docs/ejecucion/etapas/ETAPA-00/evidencias/04_security_audit_findings.txt` | Evidencia | Registro de vulnerabilidades identificadas sin imprimir secretos. |

---

## 3. Archivos del Producto Auditados (Modificaciones: 0)
Se inspeccionaron directamente en disco los siguientes componentes centrales:
- **Configuración y Build**: `package.json`, `package-lock.json`, `bun.lock`, `vite.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `vercel.json`, `api-entry.js`.
- **Servidor y Endpoints**: `server.ts`, `dev-server.ts`.
- **Frontend y Estado**: `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/context/SchoolContext.tsx`, `src/types/index.ts`.
- **Servicios de IA y Audio**: `src/services/aiService.ts`, `src/services/ttsService.ts`.
- **Datos Académicos y Curriculares**: `src/data/mockData.ts`, `src/data/pedagogicalContent.ts`, `src/data/dailyClassesAvril.ts`, `src/data/dailyClassesGael.ts`, `src/data/avrilCurriculumDataPart*.ts`, `src/data/gaelCurriculumData*.ts`.
- **Componentes de Interfaz**: `src/components/dashboard/StudentDashboard.tsx`, `src/components/classes/DailyClassView.tsx`, `src/components/classes/AITeacherDrawer.tsx`, `src/components/works/WorksView.tsx` (huérfano).
- **Insumos Institucionales Ekballo**: `DOCUMENTOS EKBALLO/` (7 PDFs de doctrina, pack de logos SVG/PNG, estudio de mercado en DOCX).
- **Documentos Históricos de Referencia**: `ANALISIS-PROYECTO.md`, `resumen_proyecto.txt`, `wisdom-school-context.md`, `WISDOM-SCHOOL-SHOWCASE.md`.
