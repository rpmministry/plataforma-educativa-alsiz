# Registro de Riesgos y Decisiones — ETAPA 00
## Plataforma Educativa ALSIZ para Ekballo Church

- **Etapa**: ETAPA-00 (Auditoría Técnica Post-Etapas 00–14)
- **Fecha**: 2026-10-16
- **Auditor**: Líder Técnico AI (Pair Programming Antigravity)

---

### 1. Matriz de Riesgos Críticos Detectados

| ID | Riesgo Técnico / Operativo | Severidad | Impacto | Mitigación Propuesta (Siguiente Etapa) |
|---|---|---|---|---|
| **R-01** | **Desconexión entre UI del Estudiante y `/api/v1`** | **CRÍTICA (P0)** | Los estudiantes (Gael/Avril) operan sobre `localStorage` y `mockData.ts`. Las contraseñas, notas y tareas no se validan ni persisten en SQLite. | Reemplazar la persistencia local de `SchoolContext` por llamadas REST a `/api/v1/auth`, `/api/v1/students` y `/api/v1/academic`. |
| **R-02** | **Incompatibilidad de Persistencia SQLite en Vercel Serverless** | **CRÍTICA (P0)** | `vercel.json` enruta `/api/(.*)` a lambdas de Vercel. En Vercel el filesystem es de solo lectura (`/var/task`), lo que causa `EROFS` al escribir en `data/alsiz.db`, y los lambdas no comparten estado. | Definir la infraestructura de producción real: o bien desplegar en VPS Linux persistente (Docker / Node 22), o migrar el backend a base remota (Turso / LibSQL / PostgreSQL). |
| **R-03** | **Semillas de Desarrollo con Credenciales Hardcodeadas** | **ALTA (P0)** | `003_seed_dev_data.sql` se ejecuta automáticamente en `runMigrations()`, insertando administradores y coordinadores con contraseñas conocidas (`DevAdmin2026!`, etc.). Si se corre contra una base pública, queda abierta a intrusiones. | Separar las migraciones de esquema (DDL) de las semillas (DML), impidiendo que las semillas se apliquen en `NODE_ENV=production`. |
| **R-04** | **Desactualización Crítica de `bun.lock`** | **ALTA (P1)** | `bun.lock` no contiene `zod` ni `nodemailer`. Si el despliegue o un desarrollador usa `bun install`, el backend falla de inmediato al arrancar. | Regenerar `bun.lock` o eliminarlo formalmente si la plataforma se estandariza exclusivamente sobre `npm` / `package-lock.json`. |
| **R-05** | **Ausencia de Integración Continua (CI/CD)** | **MEDIA (P1)** | No existe `.github/workflows/`. Un commit con errores de tipo o que rompa las 153 pruebas puede subirse a GitHub sin ser detectado. | Crear el workflow `.github/workflows/ci.yml` ejecutando `npm run lint`, `npm run build` y la suite de pruebas. |
| **R-06** | **Brecha Curricular Masiva (39 Semanas Vacías)** | **ALTA (P1)** | `dailyClassesAvril.ts` y `dailyClassesGael.ts` solo tienen contenidos para la semana 1 (del 7 al 11 de septiembre de 2026). A partir del día 14 de septiembre el calendario queda sin lecciones diarias. | Diseñar un cronograma de ingesta curricular trimestral para alimentar las semanas 2 a 40 de 8.° y 4.° EGB. |
| **R-07** | **Recursos Didácticos Dummy y Enlaces de Broma (Rickroll)** | **MEDIA (P2)** | 43 recursos son enlaces ficticios a `wisdom-school.edu`. 25 lecciones tienen como recurso el video musical de Rick Astley (`dQw4w9WgXcQ`). Esto deteriora la seriedad pedagógica en un entorno real. | Reemplazar los 25 videos de Rick Astley por videos educativos reales y generar o descargar los 43 PDFs didácticos. |
| **R-08** | **Discrepancia en Catálogo de Profesores IA (3 en BD vs 18 en UI)** | **MEDIA (P1)** | La base de datos solo conoce a 3 agentes en `ai_agents` (Kepler, David, Evaluador), mientras que el frontend muestra 18 profesores. | Extender la tabla `ai_agents` para registrar las 18 identidades docentes con sus correspondientes prompts socráticos y áreas. |

---

### 2. Decisiones Técnicas Tomadas Durante la Auditoría

1. **Decisión 1: No Tocar Código de Producción en Esta Etapa**:
   - *Fundamento*: El prompt prohíbe explícitamente realizar modificaciones oportunistas en la etapa de diagnóstico. Todos los hallazgos se registraron con exactitud en la matriz funcional para ser abordados metódicamente en las etapas subsecuentes.
2. **Decisión 2: Utilizar Bases de Datos Efímeras para Reproducir Pruebas**:
   - *Fundamento*: Para no alterar ni contaminar la base `data/alsiz.db`, se comprobó que los scripts de prueba apuntaran a rutas aisladas (`data/test_*.db`) con destrucción o limpieza al finalizar.
3. **Decisión 3: Conciliar Documentalmente los Conteos de Prueba sin Reescribir Históricos**:
   - *Fundamento*: La diferencia entre 153 y 163 pruebas no era un error de conteo sino una diferencia de alcance metodológico (tests de runners vs verificaciones operacionales totales). Se documentó en `02_PRUEBAS.md` sin alterar los informes cerrados de la Etapa 14.
4. **Decisión 4: No Ejecutar Benchmarks de LLMs con Claves Reales**:
   - *Fundamento*: Para salvaguardar cuotas y evitar gastos o agotamiento de tokens sin un plan de pruebas acotado, se auditó estáticamente el script `benchmark-ai-free.ps1` y se comprobó la resiliencia del fallback simulado.

