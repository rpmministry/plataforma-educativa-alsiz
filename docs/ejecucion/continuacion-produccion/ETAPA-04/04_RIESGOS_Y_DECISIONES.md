# Registro de Riesgos y Decisiones Técnicas — Etapa 04: Preparar y Ejecutar la Migración Controlada de Gael y Avril

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-04`  
**Estado:** `CONSOLIDADO`

---

## 1. Registro de Decisiones de Arquitectura (ADR)

### ADR-01: Prohibición Estricta de Claves Planas de MockData
- **Contexto**: El prototipo de la Etapa 11 usaba `student.password || student.id`, importando contraseñas triviales (`avril`, `gael`) y PINs obvios (`AVR-2026`, `GAE-2026`).
- **Decisión**: Eliminar totalmente la importación de contraseñas de mockData. Las credenciales iniciales se generan de forma criptográfica usando `scryptSync` con sal independiente de 16 bytes y clave derivada de 64 bytes. Las cuentas se inicializan con contraseñas seguras y flags de actualización en primer inicio.
- **Consecuencia**: Se previene que claves de prueba queden expuestas o sean adivinables por terceros en entornos reales.

### ADR-02: Creación Explícita del Representante y Vínculos Familiares
- **Contexto**: La Etapa 11 omitía al representante legal en la migración, dejando a los estudiantes huérfanos de tutela y bloqueando los flujos de consulta de calificaciones de los padres.
- **Decisión**: Incorporar a Mauricio Andrade Luna (`CONTACT_INFO`) como usuario con rol `REPRESENTATIVE` en `users`, crear su perfil en `representatives` y poblar `student_representatives` para Gael y Avril con `relationship_type = 'FATHER'` y `is_primary_contact = 1`.
- **Consecuencia**: El modelo de datos relacional refleja fielmente la estructura familiar y permite el control parental desde el primer acceso.

### ADR-03: Puerta de Aprobación Productiva de Cuatro Factores
- **Contexto**: El flag `--production` en la Etapa 11 contenía un bloqueo estático no configurable (`process.exit(1)` incondicional).
- **Decisión**: Sustituir el bloqueo por un mecanismo de verificación estricto de 4 factores:
  1. Token de aprobación humana (`--approval-token` matching `PRODUCTION_MIGRATION_APPROVAL_TOKEN`).
  2. Archivo de respaldo validado (`--backup-path` existente, no vacío y con cálculo de hash SHA-256).
  3. Confirmación de base de datos de destino (`--confirm-target-db` coincidente con `getDatabasePath()`).
  4. Hash del commit de código (`--commit-hash` coincidente con `git rev-parse HEAD`).
- **Consecuencia**: Imposibilidad matemática y operativa de ejecutar la migración productiva por error o sin las debidas salvaguardas validadas.

### ADR-04: Estrategia para el Progreso en LocalStorage del Navegador
- **Contexto**: El historial de lecciones marcadas como completadas en el iPad o navegador de los estudiantes reside exclusivamente en el `localStorage` de su dispositivo físico, no en el repositorio de Git.
- **Decisión**: No intentar falsificar ni asumir el progreso local desde Git. Crear una herramienta de extracción en cliente (`src/utils/localStorageMigrationExporter.ts`) y un importador con esquema Zod en backend (`server/migration/localProgressImporter.ts`), proporcionando instrucciones claras al administrador para solicitar el archivo si la familia desea preservar el historial previo.
- **Consecuencia**: Los datos de progreso permanecen fidedignos y auditables sin generar incoherencias en base de datos.

### ADR-05: Desambiguación Determinista de Colisiones Legadas (-dup2)
- **Contexto**: En los archivos heredados de Wisdom School, 3 lecciones compartían el mismo identificador (`class-mat-avril-02`, `class-mat-gael-02`, `class-sci-gael-01`), provocando colisión de clave primaria.
- **Decisión**: Aplicar el sufijo determinista `-dup2` a las colisiones detectadas durante la inserción en `daily_classes`.
- **Consecuencia**: Se preserva el 100% de las lecciones (43 clases en lugar de 40), sin pérdida de recursos ni actividades.

---

## 2. Matriz de Riesgos y Mitigación

| ID | Riesgo Identificado | Impacto | Probabilidad | Estrategia de Mitigación Implementada |
| :---: | :--- | :---: | :---: | :--- |
| **R-01** | Ejecución accidental sobre la base de producción (`data/alsiz.db`). | Crítico | Baja | Bloqueo estricto de 4 factores en CLI. El script aborta inmediatamente si falta el token, el respaldo, la ruta confirmada o el commit. |
| **R-02** | Exposición de datos personales o credenciales en reportes o Git. | Alto | Baja | Sanitización exhaustiva. Reportes anonimizados. Hashes `scrypt` con sal aleatoria. Cero contraseñas ni PINs en logs ni en Git. |
| **R-03** | Inconsistencia curricular o asignación errónea de grados. | Alto | Muy Baja | Validación automática en suite: Avril vinculada a `lvl-sup-8` (8.° Superior) y Gael a `lvl-elem-4` (4.° Elemental). Cero margen de error. |
| **R-04** | Generación de registros huérfanos en cascadas relacionales. | Alto | Muy Baja | `PRAGMA foreign_keys = ON;`, `PRAGMA foreign_key_check` sin errores, y aserciones explícitas de 0 huérfanos en pruebas automatizadas. |
| **R-05** | Pérdida de progreso previo guardado en el navegador del estudiante. | Medio | Media | Implementación del exportador/importador `alsiz_device_progress_export.json` con protocolo asistido para el administrador. |
| **R-06** | Fallo de idempotencia al re-ejecutar migraciones en producción. | Medio | Muy Baja | Cláusulas `ON CONFLICT` en todas las sentencias de inserción relacional. Idempotencia certificada en staging (0 duplicados). |

