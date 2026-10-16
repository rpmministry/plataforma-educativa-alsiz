# Matriz de Validación — ETAPA 11
## Migración Controlada de Expedientes y Materiales (Estudiante A y Estudiante G)

- **Etapa**: ETAPA-11
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-11-migracion-controlada-gael-avril`

---

### 1. Criterios de Aceptación del Manual y Prompt Específico

| Criterio de Aceptación | Estado | Evidencias y Verificación Técnica |
| :--- | :---: | :--- |
| **CA-01: Respaldo y reversión verificables** | **CUMPLE** | Se comprobó `createHotBackup()` generando archivo `.db` con checksum SHA-256; se comprobó `restoreFromBackup()` con `PRAGMA integrity_check: ok` en ambiente aislado; y se verificó `rollbackMigration()` eliminando 395 registros migrados sin tocar datos sintéticos previos. |
| **CA-02: Correspondencia de datos documentada** | **CUMPLE** | Se formalizó la tabla de correspondencia en `01_CAMBIOS.md`, mapeando `Student` a `users`/`students`, `Subject` a `subjects`, `CurriculumUnit` a `curriculum_units`, `DailyClass` a `daily_classes`, `ClassResource` a `learning_resources` y actividades a `evaluations`. |
| **CA-03: Ensayo en staging no pierde registros ni duplica** | **CUMPLE** | El ensayo en `data/test_alsiz_staging_etapa11.db` insertó y verificó exactamente 2 usuarios, 2 estudiantes, 20 asignaturas, 42 unidades, 43 clases diarias, 86 recursos y 129 evaluaciones. Re-ejecución inmediata confirmó 0 duplicados. |
| **CA-04: Materiales existentes útiles se conservan y quedan trazables** | **CUMPLE** | 12 recursos de alto valor pedagógico (PhET Colorado y GeoGebra) clasificados como `reutilizar`. Scratch y QuickDraw reclasificados de `video` a `INTERACTIVE_LAB`. 100% de los 86 recursos quedaron vinculados a lecciones con justificación registrada. |
| **CA-05: Diferencias y datos incompletos registrados, no rellenados por suposición** | **CUMPLE** | Se registraron las colisiones de 3 lecciones legadas duplicadas; fechas de nacimiento aproximadas por edad sin inventar día/mes; cero notas ficticias en `student_submissions`; cero dominios supuestos. |
| **CA-06: No se ejecuta migración productiva sin aprobación explícita** | **CUMPLE** | Se verificó que `data/alsiz.db` contiene 0 registros migrados. El CLI rechaza flags de producción (`--production`) con bloqueo de seguridad estricto hasta obtener autorización expresa. |
| **CA-07: Condiciones previas cumplidas (Etapas 05 y 06 aprobadas)** | **CUMPLE** | Las etapas 05 y 06 están aprobadas y documentadas en `docs/ejecucion/`. Sus suites de regresión pasaron al 100% (16/16 y 25/25 respectivamente). |
| **CA-08: Confirmación de ubicación de datos originales** | **CUMPLE** | Se confirmó que los datos legados residían exclusivamente en archivos estáticos TypeScript (`src/data/mockData.ts`, `dailyClassesAvril.ts`, `dailyClassesGael.ts`, etc.) y en claves de `localStorage` de cliente (`wisdom_*`), sin base de datos centralizada previa. |
| **CA-09: Protección de datos de menores (LOPDP y NIST)** | **CUMPLE** | Contraseñas y códigos PIN protegidos con `scryptSync` y sal criptográfica de 16 bytes. Cero texto plano en base de datos. Nombres anonimizados como Estudiante A y Estudiante G en informes públicos. |
| **CA-10: Auditoría inmutable de la migración** | **CUMPLE** | Registro generado en `audit_events` con tipo `STUDENT_MIGRATION_CONTROLLED`, IP anonimizada con HMAC-SHA256 y cero exposición de credenciales o secretos. |

---

### 2. Resumen de Estados

- Total de criterios evaluados: **10**
- Criterios con estado **CUMPLE**: **10 (100%)**
- Criterios con estado **NO CUMPLE**: **0**
- Criterios con estado **BLOQUEADO**: **0**
- Criterios con estado **NO APLICA**: **0**

---

### 3. Evidencias Físicas Asociadas

- `docs/ejecucion/etapas/ETAPA-11/evidencias/01_suite_pruebas_etapa_11.txt`: Ejecución completa de las 16 pruebas automatizadas sin fallos.
- `docs/ejecucion/etapas/ETAPA-11/evidencias/02_auditoria_recursos_y_brechas.txt`: Conteo y categorización exhaustiva de los 86 recursos pedagógicos.
- `docs/ejecucion/etapas/ETAPA-11/informe_brechas_curriculares.md`: Análisis formal de brechas frente a los estándares MINEDUC y recomendaciones de enriquecimiento.

