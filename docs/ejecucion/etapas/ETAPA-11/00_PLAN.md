# Plan de Ejecución — ETAPA 11
## Migración Controlada de Expedientes y Materiales (Estudiante A y Estudiante G)

- **Etapa**: ETAPA-11
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-11-migracion-controlada-gael-avril`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)

---

### 1. Contexto y Objetivos

La **ETAPA 11** tiene como objetivo primordial integrar los expedientes académicos, materias, calendario, unidades y materiales didácticos legados existentes en el nuevo modelo relacional persistente de la **Plataforma Educativa ALSIZ para Ekballo Church**, garantizando la máxima cautela con datos de menores (LOPDP Art. 21 y 22), trazabilidad pedagógica, cero pérdidas de información, idempotencia estricta y preservación íntegra de la base de datos de producción hasta obtener autorización humana expresa.

#### Objetivos Primarios:
1. **Inventario Riguroso y Anonimizado**: Identificar y categorizar todos los registros existentes de ambos estudiantes (Estudiante A: 8.° EGB Superior; Estudiante G: 4.° EGB Elemental) distinguiendo expediente, material didáctico, preferencias configurables e información obsoleta.
2. **Tabla de Correspondencia (Mapeo)**: Vincular las estructuras heterogéneas legadas en archivos TypeScript/`localStorage` al esquema relacional de 16 tablas maestras de ALSIZ (`users`, `students`, `programs`, `levels`, `subjects`, `curriculum_units`, `daily_classes`, `learning_resources`, `evaluations`, etc.).
3. **Auditoría y Clasificación de Materiales**: Catalogar el 100% de los 86 recursos pedagógicos existentes según los 5 estados exigidos (`reutilizar`, `actualizar`, `duplicado`, `pendiente de validación`, `no migrar`) con justificación técnica y pedagógica documentada.
4. **Protección de Datos de Menores (Cero Credenciales en Claro)**: Sustituir contraseñas y PINs en texto claro por hashes derivados con `scryptSync` y sal criptográfica aleatoria de 16 bytes (NIST / OWASP). Cero exposición de datos personales identificables (PII) en bitácora, commits o repositorios públicos.
5. **Honestidad en Datos Académicos**: Prohibición explícita de inventar edades, fechas arbitrarias, calificaciones o competencias inexistentes. Asignar estado inicial de progreso en 0% (`NOT_STARTED`) conforme a los datos de diseño.
6. **Desambiguación de Colisiones Legadas**: Detectar y resolver quirúrgicamente colisiones de identificadores duplicados preexistentes en los archivos originales de Wisdom School (`class-mat-avril-02`, `class-mat-gael-02`, `class-sci-gael-01`) sin perder ni sobreescribir ninguna de las 43 lecciones.
7. **Motor de Migración Idempotente y Reversible**: Implementar el motor `LegacyMigrationEngine` capaz de ejecutarse múltiples veces consecutivas sin duplicar registros y con capacidad de reversión limpia (`rollbackMigration`) sin alterar datos sintéticos preexistentes.
8. **Ejecución en Ensayo (Dry-Run y Staging)**: Ejecutar inicialmente en simulación pura en memoria y en una base de datos aislada de ensayo (`data/test_alsiz_staging_etapa11.db`).
9. **Salvaguarda Estricta de Producción**: Mantener la base de datos de producción `data/alsiz.db` intacta hasta contar con aprobación expresa del responsable técnico.
10. **Informe de Brechas Curriculares**: Generar el reporte de diferencias entre los materiales heredados y la malla completa oficial de 200 días lectivos requerida por el MINEDUC.

---

### 2. Exclusiones y Restricciones Operativas

- **PROHIBIDO tocar la base de datos de producción (`data/alsiz.db`)**: Cualquier inserción en producción sin autorización expresa previa viola las directivas de seguridad.
- **PROHIBIDO registrar PII o contraseñas en claro**: No se admiten credenciales en texto plano ni correos reales en commits o reportes.
- **PROHIBIDO inventar notas o avances**: Los estudiantes inician el ciclo escolar 2026-2027 en 0% de avance y sin calificaciones memorísticas.
- **PROHIBIDO iniciar la Etapa 12**: Finalizar la etapa en estado de espera para validación humana.

---

### 3. Criterios de Aceptación

- [x] **C1**: Respaldo y reversión verificables (`createHotBackup`, `restoreFromBackup` y `rollbackMigration`).
- [x] **C2**: Correspondencia de datos exhaustivamente documentada entre el modelo previo y el esquema relacional destino.
- [x] **C3**: El ensayo en staging no pierde registros ni crea duplicados injustificados (43 clases, 86 recursos, 129 evaluaciones).
- [x] **C4**: Los materiales existentes de alto valor (PhET, GeoGebra, Scratch, QuickDraw) se conservan y quedan formalmente trazables.
- [x] **C5**: Las diferencias, colisiones de IDs y datos incompletos están registrados y justificados, no rellenados por suposición.
- [x] **C6**: No se ejecuta migración productiva sin aprobación explícita (bloqueo por directiva de seguridad).

