# Matriz de Trazabilidad y Asignación de Requisitos Prioritarios (P0) — ALSIZ

## 1. Declaración de Cumplimiento de Criterios de Aceptación

Para asegurar que ningún requerimiento crítico quede huérfano de diseño técnico, la siguiente matriz vincula cada uno de los **19 requisitos prioritarios P0 aprobados en la Etapa 01** con:
1. El **Módulo Arquitectónico Responsable**.
2. El **Componente o Entidad Técnica** asignada.
3. La **Estrategia de Verificación y Criterio de Prueba** comprobable.

---

## 2. Matriz de Trazabilidad P0

| ID Requisito | Descripción del Requisito P0 | Módulo Arquitectónico Responsable | Componente / Entidad Técnica | Estrategia de Verificación y Prueba |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-FUN-001** | Corrección del bypass de autenticación en login. | `Módulo de Identidad y Permisos` | `AuthController` / `SchoolContext.tsx` | Prueba negativa: Envío de login sin contraseña o PIN -> Respuesta HTTP `401 Unauthorized`. |
| **REQ-FUN-002** | Eliminación de claves `VITE_*` del cliente; canalización 100% por backend. | `API Gateway & Middleware de Seguridad` | `server.ts` / `aiService.ts` | Búsqueda binaria (`grep`) en artefactos generados en `dist/`: 0 ocurrencias de strings de claves API. |
| **REQ-FUN-003** | Incorporación del branding institucional de Ekballo Church. | `Capa Frontend (SPA)` | `HeaderComponent` / `index.html` / Tailwind config | Inspección visual en navegador: presencia del logo Ekballo (claro/oscuro), monograma y favicons oficiales. |
| **REQ-FUN-004** | Estructuración del curso de Discipulado Ekballo (7 Clases Doctrinales). | `Módulo Curricular y LMS` | `src/data/ekballoCurriculumData.ts` / Entidad `daily_classes` | Prueba de renderizado: las 7 clases se cargan con sus 4 fases didácticas (Contenido, Lectura, Lab, Taller). |
| **REQ-FUN-005** | Tutor socrático contextualizado en doctrina Ekballo y fe cristiana. | `Orquestador Multi-Agente e IA` | `AgentDispatcherService` (`SOCRATIC_TUTOR`) | Prueba socrática: El tutor no responde con afirmaciones categóricas ajenas a la fe cristiana; guía con preguntas inductivas. |
| **REQ-FUN-006** | Generación de guías didácticas impresas en PDF para las clases de Ekballo. | `Módulo de Contenido y Recursos` | `GuideGeneratorController` | Generación y previsualización de impresión CSS `@media print` con los 3 niveles cognitivos requeridos. |
| **REQ-FUN-007** | Exportación e importación manual de progreso en JSON. | `Capa de Persistencia y Seguridad` | `DataBackupModal` / Servicio de serialización | Prueba de ciclo completo: Exportar progreso a `.json` -> Borrar almacenamiento -> Importar `.json` -> Estado restaurado al 100%. |
| **REQ-NFN-001** | Privacidad de datos de menores y protección de expedientes (LOPDP Art. 22). | `Módulo de Seguridad y Privacidad` | Almacenamiento seguro / Eliminación de `/public/students/` | Acceso directo por URL a `/students/foto.jpg` -> Retorna HTTP `404` o `403`; acceso solo vía presigned URL. |
| **REQ-NFN-003** | Conectividad limitada (Modo Offline / Asincrónico). | `Capa de Cliente PWA / Cache` | `ServiceWorker` / PWA Cache Storage | Desconexión intencional de red -> La aplicación permite seguir leyendo clases descargadas y resolver talleres. |
| **REQ-NFN-004** | Responsive y ergonomía táctil en iPads y dispositivos móviles. | `Capa Frontend (SPA)` | Layout Adaptativo Tailwind CSS 4 | Prueba en simulador iOS / Android: navegación fluida por gestos táctiles y barra de navegación responsive. |
| **REQ-NFN-006** | Disponibilidad con cascada de proveedores IA y circuit breaker. | `Orquestador Multi-Agente e IA` | `LLMCascadeProvider` (DeepSeek -> Gemini -> OpenRouter) | Desconexión simulada de DeepSeek -> Conmutación automática a Gemini 2.0 Flash en menos de 4 segundos. |
| **REQ-NFN-007** | Costes operativos acotados (<$0.05 USD por estudiante/mes en IA). | `Orquestador Multi-Agente e IA` | Módulo de telemetría y estimación de tokens | Cálculo de costes: modelo de consumo confirma costes de \$0.15 a \$0.26 USD totales mensuales por alumno. |
| **REQ-NFN-008** | Mantenibilidad con tipado estricto en TypeScript sin advertencias. | `Gobernanza de Calidad de Código` | Pipeline CI/CD / Scripts de validación | Ejecución de `npm run lint` (`tsc --noEmit`) con código de salida 0 y cero advertencias críticas. |
| **REQ-ACA-001** | Adaptación al régimen de Educación en Casa (Acuerdo MINEDUC-2023-00069-A). | `Módulo de Reportes y Acompañamiento` | `HomeschoolLogReportGenerator` | Generación de la bitácora oficial con destrezas y horas para las 4 evaluaciones estatales de subnivel. |
| **REQ-ACA-002** | Formación cristiana con cosmovisión bíblica institucional. | `Módulo Curricular y LMS` | Asignatura transversal *Relación con Dios* | Cobertura curricular de los 7 módulos doctrinales fundacionales de Ekballo Church. |
| **REQ-OPE-001** | Trazabilidad Git (prohibición de cambios directos en `main` y ramas por etapa). | `Gobernanza de Repositorio Git` | Git hooks / Políticas de ramas | Verificación de ramas: `etapa-01`, `etapa-02`, `etapa-03` aisladas sin commits desordenados en `main`. |
| **REQ-OPE-002** | Endpoint de observabilidad y diagnóstico de salud (`GET /api/health`). | `API Gateway & Middleware de Seguridad` | `HealthCheckController` en `server.ts` | Petición `GET /api/health` -> Retorna estado `UP` de proveedores IA sin exponer secretos ni tokens. |
| **REQ-OPE-004** | Protocolos verificables de respaldo y reversa (*rollback*). | `Gobernanza de Entregables` | Archivos `05_REVERSA.md` en cada etapa | Ejecución de los pasos de reversa documentados restaura el árbol de trabajo al estado inicial sin pérdidas. |
| **REQ-OPE-005** | Despliegue continuo y compatibilidad serverless (Vercel / Docker). | `Capa de Empaquetado e Infraestructura`| `vercel.json` / `dev-server.ts` / `server.ts` | Ejecución de `npm run build` genera artefactos en `dist/` compatibles con despliegue en la nube. |

