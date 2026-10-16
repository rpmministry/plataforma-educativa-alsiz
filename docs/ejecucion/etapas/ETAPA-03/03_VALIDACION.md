# ETAPA-03 — Matriz de Validación de Criterios de Aceptación

Matriz de conformidad que valida el cumplimiento estricto de cada uno de los requerimientos y restricciones establecidas para la **Etapa 03**:

| Requerimiento del Prompt Específico | Entregable / Evidencia Asociada | Estado | Justificación y Sustento Técnico |
| :--- | :--- | :---: | :--- |
| **1. Arquitectura destino conservando tecnologías existentes** | `docs/arquitectura/diagrama_arquitectura_c4.md`<br/>`docs/arquitectura/adr/ADR-001_...` | **CUMPLIDO** | Se preserva React 19, TypeScript, Vite, Tailwind y Express; se justifican técnicamente las migraciones de persistencia y orquestación. |
| **2. Diseño de módulos principales** | `docs/arquitectura/diagrama_arquitectura_c4.md` (Sección 3 y 4)<br/>`docs/arquitectura/modelo_datos_y_diccionario.md` | **CUMPLIDO** | Se diseñaron formalmente los 11 módulos requeridos (identidad, familia, currículo, LMS, recursos, evaluación, seguimiento, cursos, agentes, RAG, auditoría). |
| **3. Diagramas de arquitectura (C4 Nivel 1, 2 y 3)** | `docs/arquitectura/diagrama_arquitectura_c4.md` | **CUMPLIDO** | Diagramas completos que identifican Frontend, Backend, Base de Datos, Almacenamiento S3/R2, Procesamiento Asíncrono, Indexación Semántica y Proveedores Externos. |
| **4. Modelo Entidad-Relación y Diccionario** | `docs/arquitectura/modelo_datos_y_diccionario.md`<br/>`docs/arquitectura/adr/ADR-006_...` | **CUMPLIDO** | Diagrama ERD y diccionario de 17 entidades con cardinalidad, tipos, PK/FK, índices y soporte para matrícula multi-programa sin duplicación de expedientes. |
| **5. Contratos de API e interfaces entre módulos** | `docs/arquitectura/contratos_api_e_interfaces.md` | **CUMPLIDO** | Especificación formal de endpoints `/api/v1`, DTOs TypeScript, autorización requerida, validación Zod y catálogo de errores HTTP estándar. |
| **6. Especificación de arquitectura RAG y Agentes IA** | `docs/arquitectura/arquitectura_rag_y_agentes.md`<br/>`docs/arquitectura/adr/ADR-003_...` / `ADR-004_...` | **CUMPLIDO** | Diseño de 4 agentes especializados, pipeline de chunking semántico, citas obligatorias `[S#]` y cascada LLM con circuit-breaker sin implantar código. |
| **7. Política de roles, minimización, retención y auditoría**| `docs/arquitectura/matriz_roles_permisos_seguridad.md`<br/>`docs/arquitectura/adr/ADR-002_...` / `ADR-005_...` | **CUMPLIDO** | Matriz RBAC para 5 roles, política LOPDP Art. 22 para datos de menores, plazos de retención y libro mayor de auditoría inmutable. |
| **8. Plan de migraciones incrementales y reversión** | `docs/arquitectura/plan_implementacion_y_migraciones.md` | **CUMPLIDO** | Hoja de ruta en 5 fases secuenciadas por dependencias estrictas, con pruebas asociadas y procedimientos de rollback. |
| **9. Estimación de costes operativos (4 escenarios)** | `docs/arquitectura/estimacion_costes_operativos.md` | **CUMPLIDO** | Proyecciones para 10, 50, 200 y 500 alumnos con supuestos explícitos (\$0.15 a \$0.26 USD/alumno/mes en IA) y aviso de no cotización. |
| **10. Registros de Decisión Arquitectónica (ADR)** | `docs/arquitectura/adr/` (ADR-001 a ADR-006) | **CUMPLIDO** | 6 registros formales con contexto, alternativas evaluadas, decisión tomada, consecuencias y fecha. |
| **11. Cobertura completa de requisitos P0** | `docs/arquitectura/trazabilidad_requisitos_p0.md`<br/>`docs/ejecucion/etapas/ETAPA-03/evidencias/01_p0_...` | **CUMPLIDO** | Los 19 requisitos P0 tienen un módulo asignado y un criterio de verificación comprobable. |
| **12. Restricción: No modificar código funcional ni DB real** | `docs/ejecucion/etapas/ETAPA-03/02_PRUEBAS.md` | **CUMPLIDO** | Cero modificaciones en `src/`, `server.ts` y esquemas de base de datos (`git diff` limpio). |

