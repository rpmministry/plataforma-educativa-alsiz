# Procedimiento Seguro de Reversión — ETAPA 05: Backend, Base de Datos, Identidad y Seguridad

## 1. Alcance de la Reversión
Este procedimiento detalla los pasos exactos y seguros para revertir los cambios introducidos en la **ETAPA 05**, restaurando el estado previo de la aplicación (ETAPA 04) sin afectar el historial de Git, ramas ajenas ni archivos no relacionados.

---

## 2. Reversión Rápida mediante Control de Versiones Git

Dado que la etapa se ejecutó de forma aislada en la rama `etapa-05-backend-bd-y-seguridad`:

```bash
# 1. Regresar a la rama previa validada (Etapa 04)
git checkout etapa-04-sistema-diseno-y-frontend

# 2. Si se desea descartar la rama de la Etapa 05 localmente
git branch -D etapa-05-backend-bd-y-seguridad
```

---

## 3. Reversión Manual Módulo por Módulo (Sin perder trabajo previo)

Si se desea revertir únicamente la capa de persistencia y base de datos manteniendo la rama actual:

### Paso 1: Eliminar archivos de backend y scripts introducidos
```powershell
# En PowerShell (Windows)
Remove-Item -Recurse -Force "server\db"
Remove-Item -Recurse -Force "server\auth"
Remove-Item -Recurse -Force "server\middleware"
Remove-Item -Recurse -Force "server\routes"
Remove-Item -Recurse -Force "server\backup"
Remove-Item -Force "scripts\test-etapa-05.ts"
```

### Paso 2: Limpiar archivos generados de base de datos
```powershell
Remove-Item -Recurse -Force "data"
Remove-Item -Recurse -Force "backups"
```

### Paso 3: Revertir modificaciones en archivos del proyecto
```bash
git checkout HEAD -- server.ts package.json package-lock.json .gitignore .env.example
```

### Paso 4: Desinstalar dependencia añadida
```bash
npm uninstall zod
```

### Paso 5: Verificar que la compilación vuelva al estado base
```bash
npm run lint
npm run build
```

---

## 4. Garantía de No Afectación a Datos Preexistentes
- La base de datos SQLite opera en la carpeta `data/` (excluida del control de versiones).
- No se modificaron ni destruyeron archivos de microcurrículos, devocionales ni componentes de frontend de las etapas previas.
