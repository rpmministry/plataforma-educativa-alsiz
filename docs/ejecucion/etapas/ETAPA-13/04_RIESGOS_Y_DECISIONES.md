# Registro de Riesgos, Decisiones y Defectos — ETAPA 13
## Auditoría Integral y Pruebas de Aceptación End-to-End

- **Etapa**: ETAPA-13
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-13-auditoria-integral-y-aceptacion`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)

---

### 1. Clasificación y Resolución de Defectos Identificados

Durante la ejecución de las suites de prueba preparatorias para la auditoría integral, se detectaron los siguientes hallazgos y defectos técnicos, clasificados según su severidad:

#### Defecto 1 (Severidad: MEDIA) — Omitida columna `enrolled_count` en Migración 012
- **Descripción**: La tabla `continuing_courses` carecía de la columna `enrolled_count`, provocando un fallo en consultas de conteo de cupos en la suite de pruebas de la Etapa 12.
- **Acción Tomada**: Se actualizó el archivo de migración `012_continuing_education_courses.sql` para incluir `enrolled_count INTEGER NOT NULL DEFAULT 0`.
- **Estado**: **RESUELTO** (re-testeado y verificado en `test:etapa12` y `test:etapa13`).

#### Defecto 2 (Severidad: BAJA) — Bloqueo de archivo en Windows al eliminar DB temporal (`scripts/test-etapa-12.ts`)
- **Descripción**: La llamada a `fs.unlinkSync` sobre la base de datos temporal fallaba ocasionalmente con error `EBUSY` debido a descriptores abiertos.
- **Acción Tomada**: Se reorganizó el bloque `finally` para invocar explícitamente `closeDatabase()` antes de intentar la eliminación física del archivo.
- **Estado**: **RESUELTO**.

#### Resumen de Defectos:
- **CRÍTICA**: 0
- **ALTA**: 0
- **MEDIA**: 1 (Resuelto)
- **BAJA**: 1 (Resuelto)

---

### 2. Decisiones Técnicas y Arquitectónicas Clave

1. **Aislamiento Total de la Base de Producción (`data/alsiz.db`)**:
   - Se estableció como directriz inviolable que ninguna suite de pruebas automatizadas interactúe directamente con `data/alsiz.db`. Cada script inicializa una base temporal con prefijo `data/test_alsiz_*.db` y aplica las migraciones desde cero, garantizando cero riesgo de corrupción de datos reales.
2. **Determinismo en Umbrales de Semilla de Conocimiento**:
   - Se constató que las migraciones base (`007_knowledge_seed_data.sql`) contienen exactamente 2 fuentes canónicas aprobadas y 3 fragmentos (chunks) curriculares. La prueba `test:etapa13` se alineó rigurosamente con esta base real para evitar falsos positivos o asunciones infundadas.
3. **Mantenimiento del Modo Simulado Local de IA**:
   - Para no forzar costos de API ni requerir claves comerciales obligatorias durante el desarrollo y pruebas de aceptación, el proveedor `SIMULATED_LOCAL` se mantiene como fallback de primera línea plenamente funcional y probado.

---

### 3. Riesgos Residuales y Medidas de Mitigación para Producción

| Riesgo Identificado | Severidad Potencial | Medida de Mitigación Implementada / Recomendada |
|---|---|---|
| Caída de conectividad a internet en comunidades rurales | Media | Cache-Control agresivo de assets Vite, almacenamiento local offline en `localStorage` y tutor socrático con respuestas simuladas locales pre-empaquetadas. |
| Agotamiento de cuotas de proveedores externos de IA | Baja | Fallback automático y transparente a proveedores secundarios y finalmente al modelo simulado local sin lanzar errores 500 al estudiante. |
| Fuga inadvertida de datos en bitácoras de auditoría | Alta | Anonimización irreversible obligatoria mediante hash HMAC/SHA-256 de todas las direcciones IP y sanitización de cargas útiles previo a inserción en `audit_logs`. |
| Desincronización de esquemas en bases de datos existentes | Media | Motor de migraciones determinístico con verificación de versiones en `schema_migrations`. |

