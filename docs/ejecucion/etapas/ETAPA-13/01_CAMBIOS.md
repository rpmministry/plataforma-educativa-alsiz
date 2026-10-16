# Registro de Cambios y Hallazgos — ETAPA 13
## Auditoría Integral y Pruebas de Aceptación End-to-End

- **Etapa**: ETAPA-13
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-13-auditoria-integral-y-aceptacion`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)

---

### 1. Resumen de Intervenciones y Modificaciones de Código

Durante la ejecución de la **ETAPA 13**, se implementó una suite integral de pruebas automatizadas y se corrigieron discrepancias menores encontradas en las suites de verificación previas para garantizar una compilación y ejecución 100% determinísticas y limpias.

#### 1.1 Nueva Suite de Auditoría Integral (`scripts/test-etapa-13.ts`)
Se desarrolló el script `scripts/test-etapa-13.ts` que implementa 10 baterías de pruebas estructurales y funcionales sobre una base de datos SQLite aislada (`data/test_alsiz_etapa13.db`), auditando:
1. **Gobernanza Documental**: Presencia de los 7 archivos normativos en cada etapa de la 00 a la 12 y estado de `bitacora.md`.
2. **Identidad & Tutela Familiar**: Cuentas iniciales, roles RBAC, vinculación `student_representatives` y hashing `scrypt`.
3. **Malla Curricular K-12**: Integridad de programas, asignaturas troncales, unidades y lecciones devocionales/MINEDUC.
4. **Aislamiento Anti-IDOR**: Consultas cruzadas de representantes legales garantizando cero visibilidad de pupilos ajenos.
5. **Centro de Conocimiento RAG**: Verificación de fuentes canónicas aprobadas y exclusión inmediata de fuentes revocadas/desactivadas.
6. **Resiliencia Multiproveedor IA**: Invocación al orquestador `ProviderManager` comprobando la degradación a `SIMULATED_LOCAL` sin excepciones no controladas.
7. **Educación Continua No Formal**: Inscripción con cupos máximos, emisión y validación de certificados con hash SHA-256 y descargo legal Art. 32 MINEDUC.
8. **Privacidad LOPDP**: Hash unidireccional de direcciones IP en `audit_logs` (longitud 64 hex) y ausencia de campos confidenciales.
9. **Respaldo en Caliente**: Ejecución de `createHotBackup` con la API de backup en línea de SQLite y verificación `PRAGMA integrity_check = 'ok'`.
10. **Aislamiento de Producción**: Verificación de que `data/alsiz.db` no ha sufrido modificaciones ni contaminaciones por las pruebas.

#### 1.2 Registro de Script en `package.json`
Se incorporó el comando `"test:etapa13"` en `package.json`:
```json
"scripts": {
  ...
  "test:etapa12": "tsx scripts/test-etapa-12.ts",
  "test:etapa13": "tsx scripts/test-etapa-13.ts"
}
```

#### 1.3 Corrección en Migración 012 (`server/db/migrations/012_continuing_education_courses.sql`)
- **Problema detectado**: La columna `enrolled_count` era requerida por consultas de cálculo de cupo en la API de educación continua, pero estaba omitida en la definición original de la tabla `continuing_courses`.
- **Solución aplicada**: Se añadió `enrolled_count INTEGER NOT NULL DEFAULT 0` a la tabla `continuing_courses` en la migración 012.

#### 1.4 Corrección de Cierre de Descriptores en `scripts/test-etapa-12.ts`
- **Problema detectado**: En entornos Windows, el intento de eliminar la base de datos de prueba (`fs.unlinkSync`) antes de invocar `closeDatabase()` producía un error de bloqueo de archivo (`EBUSY: resource busy or locked`).
- **Solución aplicada**: Se aseguró la invocación de `closeDatabase()` previo a la desvinculación física de los archivos temporales.

---

### 2. Archivos Afectados

| Archivo | Tipo de Cambio | Justificación Técnica |
|---|---|---|
| `scripts/test-etapa-13.ts` | Creación | Suite de auditoría integral y aceptación multidisciplinar |
| `package.json` | Modificación | Registro del script ejecutable `test:etapa13` |
| `server/db/migrations/012_continuing_education_courses.sql` | Modificación | Adición de columna `enrolled_count` para integridad de cupos |
| `scripts/test-etapa-12.ts` | Modificación | Cierre explícito de conexión SQLite antes de limpieza de archivos |
| `docs/ejecucion/etapas/ETAPA-13/*` | Creación | Documentación obligatoria normativa (00 al 06) y evidencias |

---

### 3. Verificación de Dependencias y Licencias

No se añadieron nuevas dependencias externas a `package.json`. Las herramientas empleadas (`better-sqlite3`, `tsx`, `typescript`, `vite`, `esbuild`) son las previamente homologadas, de código abierto bajo licencias MIT/Apache 2.0 y sin costos recurrentes asociados.

