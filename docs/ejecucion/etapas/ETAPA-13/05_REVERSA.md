# Plan de Reversa y Contingencia — ETAPA 13
## Procedimiento de Reversión Segura y Rollback

- **Etapa**: ETAPA-13
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-13-auditoria-integral-y-aceptacion`
- **Repositorio**: `https://github.com/rpmministry/plataforma-educativa-alsiz`
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Responsable**: Líder Técnico AI (Pair Programming Antigravity)

---

### 1. Alcance de la Reversa

La **ETAPA 13** es una fase de auditoría integral y estabilización. No introduce tablas de base de datos destructivas en producción ni altera esquemas fuera de la adición de la columna `enrolled_count` en la migración 012 y la suite de pruebas `test-etapa-13.ts`.

Por tanto, una reversión completa implica descartar la rama de trabajo `etapa-13-auditoria-integral-y-aceptacion` y regresar a la rama validada previa (`etapa-12-cursos-profesionales-artes-oficios`).

---

### 2. Procedimiento de Reversión Paso a Paso

#### Paso 1: Verificación del Estado de Trabajo
Verificar que no existan modificaciones no guardadas o procesos en segundo plano bloqueando archivos:
```bash
git status --short --branch
```

#### Paso 2: Retorno a la Rama Previa Validada
Cambiar a la rama de la Etapa 12:
```bash
git checkout etapa-12-cursos-profesionales-artes-oficios
```

#### Paso 3: Eliminación de la Rama Local de Etapa 13 (Si se requiere descarte absoluto)
```bash
git branch -D etapa-13-auditoria-integral-y-aceptacion
```

#### Paso 4: Limpieza de Archivos Temporales de Prueba
Asegurarse de que no queden bases de datos SQLite temporales en `data/`:
```bash
Remove-Item -Path "data/test_alsiz_*.db" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "data/test_alsiz_*.db-wal" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "data/test_alsiz_*.db-shm" -Force -ErrorAction SilentlyContinue
```

#### Paso 5: Restauración de Base de Datos en Producción (En caso de contingencia)
Si se requiriese restaurar la base operativa a partir de un respaldo verificado:
```bash
# Ejemplo de restauración utilizando el servicio de Hot Backup
npx tsx -e "import { restoreFromBackup } from './server/services/backupService'; restoreFromBackup('data/backups/backup_alsiz_YYYYMMDD_HHMMSS.db');"
```

---

### 3. Criterios de Éxito de la Reversión

1. Repositorio git limpio en la rama `etapa-12-cursos-profesionales-artes-oficios`.
2. Servidor y cliente ejecutan normalmente mediante `npm run dev`.
3. Base de datos `data/alsiz.db` operativa y consistente.

