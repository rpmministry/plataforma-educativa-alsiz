# Registro de Pruebas — ETAPA 11
## Migración Controlada de Expedientes y Materiales (Estudiante A y Estudiante G)

- **Etapa**: ETAPA-11
- **Fecha**: 2026-10-16
- **Entorno**: Windows 11 Pro, Node.js v24.19.0, SQLite (WAL Mode, `node:sqlite`), TypeScript 5.8.2 (`tsx` v4.21.0).

---

### 1. Pruebas de Línea Base y Regresión Previa

Antes de introducir modificaciones funcionales y al finalizar la etapa, se ejecutaron las suites automatizadas de regresión previas:

| Comando Ejecutado | Entorno / Tipo | Resultado Real | Observaciones |
| :--- | :--- | :--- | :--- |
| `npm run lint` (`tsc --noEmit`) | Estático | **PASÓ** (código 0) | 0 errores de tipado en 1,749 módulos analizados. |
| `npm run build` | Producción | **PASÓ** (código 0) | Compilación exitosa en 11.64s. Servidores y bundle limpios. |
| `npm run test:etapa05` | Automatizada | **PASÓ** (16/16) | Seguridad, RBAC, LOPDP y aislamiento de sesiones íntegros. |
| `npm run test:etapa06` | Automatizada | **PASÓ** (25/25) | Núcleo LMS, notas, competencias y boletines oficiales íntegros. |
| `npm run test:etapa07` | Automatizada | **PASÓ** (16/16) | Centro de conocimiento, FTS5 BM25 y ciclo de vida editorial. |
| `npm run test:etapa08` | Automatizada | **PASÓ** (17/17) | Orquestación multiagente, cascada LLM y supervisión humana. |
| `npm run test:etapa09` | Automatizada | **PASÓ** (14/14) | Aula interactiva, sandbox óptico y Kill-Switch de emergencia. |
| `npm run test:etapa10` | Automatizada | **PASÓ** (15/15) | Centro administrativo unificado y auditoría inmutable. |

---

### 2. Suite Automatizada Específica de la Etapa 11 (`npm run test:etapa11`)

Comando ejecutado:
```powershell
npm run test:etapa11
```

Resultado detallado de las 16 pruebas críticas:

| # | Prueba / Criterio Verificado | Categoría | Estado | Evidencia y Detalles Registrados |
| :---: | :--- | :--- | :---: | :--- |
| 1 | Respaldo en caliente y restauración comprobada | Respaldo & Recuperación | **PASÓ** | `createHotBackup()` generó archivo de 667,648 bytes (SHA-256 verificado), restaurado en DB de prueba con `PRAGMA integrity_check: ok`. |
| 2 | Inventario completo de registros legados | Inventario & Mapeo | **PASÓ** | 2 estudiantes, 20 asignaturas (11 Superior, 9 Elemental), 42 unidades, 43 clases diarias, 86 recursos, 129 actividades. |
| 3 | Clasificación formal de recursos pedagógicos | Auditoría Curricular | **PASÓ** | 12 recursos a `reutilizar` (PhET Colorado, GeoGebra), 74 a `actualizar` (PDFs y video placeholders), 0 descartados ciegamente. |
| 4 | Identificación de IDs colisionados en código legado | Auditoría Curricular | **PASÓ** | Detección exacta de `class-mat-avril-02`, `class-mat-gael-02` y `class-sci-gael-01` en los archivos originales. |
| 5 | Simulación Dry-Run sin alteración de base de datos | Ensayo & Seguridad | **PASÓ** | Proyección exacta de 43 clases, 86 recursos y 129 evaluaciones sin escribir en disco (conteo en BD antes: 0, después: 0). |
| 6 | Migración en staging inserta expedientes y desambigua | Ejecución Controlada | **PASÓ** | 2 usuarios, 2 estudiantes, 20 asignaturas, 43 clases y 3 colisiones resueltas con sufijo `-dup2`. |
| 7 | Contraseñas y PINs protegidos con `scryptSync` (NIST) | Seguridad & Privacidad | **PASÓ** | Todos los hashes inician con `scrypt$` y sal de 16 bytes. Cero texto claro en base de datos. |
| 8 | Honestidad ética: Cero notas ni expedientes ficticios | Integridad Académica | **PASÓ** | 0 entregas ficticias, 0 calificaciones inventadas. Progreso inicia en 0% (`NOT_STARTED`). |
| 9 | Mapeo y categorización curricular ALSIZ / Ekballo | Trazabilidad Curricular | **PASÓ** | 12 asignaturas `TRONCAL_MINEDUC`, 2 `FORMACION_CRISTIANA`, 2 `AMPLIACION_INTERNACIONAL`, 4 `COMPLEMENTARIA`. |
| 10 | Integridad relacional (Cero claves rotas o huérfanas) | Integridad Referencial | **PASÓ** | 10 de 10 chequeos de integridad foránea superados. Cero registros huérfanos. |
| 11 | Idempotencia rigurosa ante corridas sucesivas | Idempotencia | **PASÓ** | Re-ejecución inmediata de la migración produjo exactamente los mismos registros (2 alumnos, 20 materias, 43 clases). Cero duplicados. |
| 12 | Auditoría inmutable de la migración (LOPDP) | Auditoría & LOPDP | **PASÓ** | Registro en `audit_events` con IP hasheada (HMAC-SHA256) y exclusión total de secretos y credenciales. |
| 13 | Salvaguarda de base de datos de producción | Control de Producción | **PASÓ** | Verificación directa en `data/alsiz.db`: 0 usuarios migrados. Cero escrituras en producción. |
| 14 | Reversión quirúrgica comprobada (Rollback) | Reversión & Resiliencia | **PASÓ** | 395 registros revertidos. 0 estudiantes migrados restantes. Estudiantes sintéticos previos intactos (2). |
| 15 | Disponibilidad de asignaturas en el nivel adecuado | Compatibilidad LMS | **PASÓ** | 13 materias en 8.° EGB Superior (incluyendo semilla), 9 materias en 4.° EGB Elemental. |
| 16 | Identificación técnica de brechas curriculares | Informe Curricular | **PASÓ** | Brechas registradas: 43 de 200 clases cubiertas, 68 recursos dependientes de re-alojamiento o curaduría. |

---

### 3. Errores Encontrados, Reproducción y Resolución

#### Incidente A: Pérdida silenciosa de clases por colisión de identificadores legados
- **Síntoma**: En la primera prueba en staging, el verificador reportó 40 clases en lugar de las 43 esperadas.
- **Causa Raíz**: En los archivos originales `dailyClassesAvril.ts` y `dailyClassesGael.ts`, se reutilizó tres veces el mismo ID (`class-mat-avril-02`, `class-mat-gael-02`, `class-sci-gael-01`) para clases distintas con diferentes fechas y contenidos. Al tener la base de datos `PRIMARY KEY (id)`, el segundo registro sobreescribía al primero.
- **Resolución**: Se implementó en `LegacyMigrationEngine` un registro en memoria de IDs procesados (`seenClassDbIds`, `seenResDbIds`, `seenEvalDbIds`) que detecta la colisión y genera una clave única sufijada con `-dup2`, preservando el 100% de las lecciones sin alterar el contenido pedagógico.

#### Incidente B: Error de conexión cerrada tras verificación de restauración
- **Síntoma**: La suite de pruebas arrojó `Error: database is not open` tras ejecutar `restoreFromBackup`.
- **Causa Raíz**: `restoreFromBackup` ejecuta `closeDatabase()` para liberar los locks de SQLite. La variable local `db` mantenía la referencia a la instancia anterior cerrada.
- **Resolución**: Se reasignó `db = initDatabase(testDbPath)` tras la llamada de restauración, asegurando que las pruebas subsecuentes operen sobre la conexión activa.

