# ETAPA-03 — Registro de Cambios y Documentos de Arquitectura Producidos

## 1. Resumen de Intervención
Durante la **Etapa 03: Arquitectura y plan técnico**, se generó la totalidad de la documentación de diseño estructural, contratos de interfaz, modelo de datos y decisiones arquitectónicas para la **Plataforma Educativa ALSIZ para Ekballo Church**. En apego estricto a las restricciones del prompt, **NO se ha modificado ningún archivo de código de producto en `src/`, `server.ts` ni `package.json`**.

---

## 2. Inventario de Documentos de Arquitectura Creados

| Ruta del Archivo | Propósito y Contenido Principal |
| :--- | :--- |
| `docs/arquitectura/diagrama_arquitectura_c4.md` | Diagramas C4 en tres niveles (Contexto, Contenedores y Componentes de backend), flujo asíncrono y justificación técnica de migraciones. |
| `docs/arquitectura/modelo_datos_y_diccionario.md` | Modelo Entidad-Relación exhaustivo, diagrama ERD y diccionario detallado de 17 entidades con cardinalidad, restricciones, índices y reglas de aislamiento multi-tenant. |
| `docs/arquitectura/contratos_api_e_interfaces.md` | Especificación de contratos RESTful (`/api/v1`), DTOs TypeScript, manejo de errores, esquemas Zod y autenticación por cookies HttpOnly. |
| `docs/arquitectura/matriz_roles_permisos_seguridad.md` | Matriz RBAC para 5 roles, política de minimización de datos para menores (Art. 22 LOPDP), retención de datos y libro mayor de auditoría inmutable. |
| `docs/arquitectura/arquitectura_rag_y_agentes.md` | Diseño del sistema multi-agente (Tutor Socrático, Evaluador, Generador de Guías), pipeline de chunking semántico, citas obligatorias `[S#]` y cascada LLM con circuit-breaker. |
| `docs/arquitectura/plan_implementacion_y_migraciones.md` | Secuencia de transición en 5 fases por dependencias, estrategia de pruebas y matriz de contingencia/reversión. |
| `docs/arquitectura/estimacion_costes_operativos.md` | Modelo financiero en 4 escenarios de escala (10, 50, 200 y 500 alumnos) con costes de \$0.15 a \$0.26 USD/mes por alumno en IA e infraestructura. |
| `docs/arquitectura/trazabilidad_requisitos_p0.md` | Matriz de correspondencia del 100% de los requisitos P0 hacia sus módulos arquitectónicos responsables y criterios de verificación. |

---

## 3. Inventario de Architecture Decision Records (ADRs)

| Código ADR | Título del Registro de Decisión Arquitectónica |
| :--- | :--- |
| `ADR-001` | [Adopción de Arquitectura Híbrida SPA React + Backend Modular en Node.js/Express](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/arquitectura/adr/ADR-001_arquitectura_hibrida_spa_backend_modular.md) |
| `ADR-002` | [Autenticación Segura con Cookies HttpOnly y Eliminación del Bypass de Acceso](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/arquitectura/adr/ADR-002_autenticacion_segura_httponly_elimina_bypass.md) |
| `ADR-003` | [Orquestación Multi-Proveedor de IA en Servidor con Cascada y Circuit Breaker](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/arquitectura/adr/ADR-003_orquestacion_ia_cascada_servidor.md) |
| `ADR-004` | [Ingesta de Conocimiento Doctrinal y Pipeline RAG con Citas Verificables Obligatorias](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/arquitectura/adr/ADR-004_pipeline_rag_citas_obligatorias_doctrinal.md) |
| `ADR-005` | [Cumplimiento LOPDP: Minimización de Datos de Menores y Eliminación de Activos Estáticos Públicos](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/arquitectura/adr/ADR-005_privacidad_lopdp_menores_activos_protegidos.md) |
| `ADR-006` | [Modelo de Datos Extensible: Matrícula Multi-Programa por Estudiante sin Duplicación de Expediente](file:///c:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/arquitectura/adr/ADR-006_modelo_datos_multi_programa_estudiante.md) |

---

## 4. Inventario de Evidencias Producidas

| Ruta del Archivo | Propósito y Contenido Principal |
| :--- | :--- |
| `docs/ejecucion/etapas/ETAPA-03/evidencias/01_p0_requirements_coverage.md` | Verificación de trazabilidad del 100% de los 19 requerimientos P0 hacia componentes de arquitectura. |
| `docs/ejecucion/etapas/ETAPA-03/evidencias/02_architecture_benchmarks.md` | Matriz comparativa entre la línea base heredada de Wisdom School y la arquitectura destino modular ALSIZ. |

