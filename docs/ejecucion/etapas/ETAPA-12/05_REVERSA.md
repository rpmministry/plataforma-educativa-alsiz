# Plan de Reversión — ETAPA 12
## Cursos Profesionales, Artes, Oficios y Educación Continua No Formal

- **Etapa**: ETAPA-12
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-12-cursos-profesionales-artes-oficios`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)

---

### 1. Estrategia de Reversión

Dado que todo el trabajo de la **ETAPA 12** se desarrolló en su propia rama aislada (`etapa-12-cursos-profesionales-artes-oficios`), la reversión completa o parcial es inmediata y segura.

---

### 2. Procedimiento de Reversión Total (Git)

Si se requiere descartar todos los cambios introducidos en esta etapa:

```powershell
# 1. Regresar a la rama previa validada (main o rama de Etapa 11)
git checkout main

# 2. Eliminar la rama local de la etapa 12
git branch -D etapa-12-cursos-profesionales-artes-oficios
```

---

### 3. Procedimiento de Reversión de Base de Datos

Si se aplicó la migración `012_continuing_education_courses.sql` y se desea desmantelar las tablas de formación continua:

```sql
-- Reversión manual de tablas creadas en la Etapa 12
DROP TABLE IF EXISTS course_certificates;
DROP TABLE IF EXISTS course_evaluation_submissions;
DROP TABLE IF EXISTS course_evaluations;
DROP TABLE IF EXISTS course_lesson_progress;
DROP TABLE IF EXISTS course_enrollments;
DROP TABLE IF EXISTS course_lessons;
DROP TABLE IF EXISTS course_modules;
DROP TABLE IF EXISTS continuing_courses;

-- Eliminar el registro de versión en schema_migrations
DELETE FROM schema_migrations WHERE version = '012';
```

---

### 4. Procedimiento de Reversión Granular por Archivo

Si se desea conservar la rama pero eliminar únicamente los componentes de la Etapa 12:

```powershell
# Eliminar archivos creados
rm "server/db/migrations/012_continuing_education_courses.sql"
rm "server/continuing-ed/continuingEducationService.ts"
rm "server/routes/continuingEducationRoutes.ts"
rm "src/components/admin/AdminContinuingEdTab.tsx"
rm "scripts/test-etapa-12.ts"
rm -r "docs/ejecucion/etapas/ETAPA-12"

# Revertir archivos modificados a su estado en Etapa 11
git checkout server.ts
git checkout src/components/admin/AdminShell.tsx
git checkout package.json
```

