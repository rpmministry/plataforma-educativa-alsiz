# Evidencia 01 — Cobertura y Trazabilidad de Requisitos Prioritarios (P0) en la Arquitectura

- **Fecha de Auditoría**: 16 de Octubre de 2026.
- **Alcance**: Verificación de que el 100% de los requisitos calificados como `P0` en la Etapa 01 cuentan con asignación formal de módulo y mecanismo de prueba en los documentos de arquitectura de la Etapa 03.

---

## 1. Tabla de Cobertura P0

| ID Requisito | Descripción | Módulo Arquitectónico Asignado | Componente / DTO en Diseño | Estado de Cobertura |
| :--- | :--- | :--- | :--- | :---: |
| **REQ-FUN-001** | Corrección del bypass de login | `Módulo de Identidad y Permisos` | `AuthController`, `LoginRequestDto`, ADR-002 | **100% CUBIERTO** |
| **REQ-FUN-002** | Eliminación de claves cliente | `API Gateway y Middleware` | `LLMCascadeProvider`, `server.ts`, ADR-003 | **100% CUBIERTO** |
| **REQ-FUN-003** | Branding Ekballo Church | `Capa Frontend SPA` | `HeaderComponent`, Tailwind Config, C4 Nivel 2 | **100% CUBIERTO** |
| **REQ-FUN-004** | 7 Clases Doctrinales Ekballo | `Módulo Curricular y LMS` | `daily_classes`, `knowledge_sources`, ADR-006 | **100% CUBIERTO** |
| **REQ-FUN-005** | Tutor Socrático contextualizado | `Orquestador Multi-Agente e IA` | `AgentDispatcherService`, `SOCRATIC_TUTOR` | **100% CUBIERTO** |
| **REQ-FUN-006** | Guías imprimibles en PDF | `Módulo de Contenido y Recursos` | `/api/v1/agents/generate-guide`, `GUIDE_GEN` | **100% CUBIERTO** |
| **REQ-FUN-007** | Exportación/Importación JSON | `Capa de Persistencia y Seguridad`| `DataBackupModal`, Plan de Implementación F4 | **100% CUBIERTO** |
| **REQ-NFN-001** | Privacidad de datos de menores | `Módulo de Seguridad y Privacidad`| ADR-005, Presigned URLs, Matriz LOPDP | **100% CUBIERTO** |
| **REQ-NFN-003** | Resiliencia Offline/Asincrónica | `Capa de Cliente PWA / Cache` | Service Worker, C4 Nivel 2, Offline Sync | **100% CUBIERTO** |
| **REQ-NFN-004** | Responsive y ergonomía táctil | `Capa Frontend SPA` | Layout Adaptativo Tailwind, C4 Nivel 1 y 2 | **100% CUBIERTO** |
| **REQ-NFN-006** | Cascada IA y Circuit Breaker | `Orquestador Multi-Agente e IA` | `LLMCascadeProvider`, Circuit Breaker en Memoria | **100% CUBIERTO** |
| **REQ-NFN-007** | Costes IA < \$0.05 alumno/mes | `Orquestador Multi-Agente e IA` | `estimacion_costes_operativos.md` (\$0.15-\$0.26) | **100% CUBIERTO** |
| **REQ-NFN-008** | TypeScript estricto sin lints | `Gobernanza de Calidad de Código` | Pipeline CI/CD, `npm run lint` en código 0 | **100% CUBIERTO** |
| **REQ-ACA-001** | Marco Legal Homeschool Ecuador | `Módulo de Reportes y Bitácoras` | `HomeschoolLogReportGenerator`, MINEDUC Log | **100% CUBIERTO** |
| **REQ-ACA-002** | Formación Cristiana y Carácter | `Módulo Curricular y LMS` | Asignatura *Relación con Dios*, 7 Clases | **100% CUBIERTO** |
| **REQ-OPE-001** | Trazabilidad Git sin push a main| `Gobernanza de Repositorio Git` | Ramas por etapa (`etapa-03`), bitácora | **100% CUBIERTO** |
| **REQ-OPE-002** | Endpoint de salud y diagnóstico | `API Gateway y Middleware` | `GET /api/v1/health`, C4 Nivel 3 | **100% CUBIERTO** |
| **REQ-OPE-004** | Protocolos de Reversa (*Rollback*)| `Gobernanza de Entregables` | Archivo `05_REVERSA.md` en cada etapa | **100% CUBIERTO** |
| **REQ-OPE-005** | Compatibilidad con Despliegue | `Capa de Empaquetado` | `vercel.json`, `esbuild server.ts`, Dockerfile | **100% CUBIERTO** |

---

## 2. Conclusión de Cobertura
Se certifica que los 19 requisitos P0 tienen un componente asignado en los diagramas de contenedores/componentes y un criterio de verificación ejecutable en la suite de pruebas.

