# Procedimiento de Reversión y Contingencia — Etapa 10: Despliegue de Staging

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-10 (Continuación a Producción)  
**Fecha:** 17 de octubre de 2026  
**Responsable Técnico:** Antigravity (Google DeepMind Team)  

---

## 1. Alcance de la Reversión

Este procedimiento describe los pasos reproducibles para retornar el repositorio y el entorno de base de datos al estado previo al inicio de la Etapa 10 (commit `70ad6d3`), en caso de detectarse anomalías o si se requiere descartar los cambios locales.

---

## 2. Procedimiento de Reversión en Git

### 2.1 Reversión de la Rama Local
Para volver al estado exacto de la Etapa 09 aprobada:

```powershell
# 1. Verificar estado actual
git status

# 2. Retornar a la rama de la Etapa 09
git checkout continuacion-produccion-etapa-09

# 3. (Opcional) Si se desea eliminar la rama de la etapa 10:
git branch -D continuacion-produccion-etapa-10

# 4. Verificar commit de cabecera
git log -1 --oneline
# Debe mostrar: 70ad6d3 chore(etapa-09): normalizar saltos de linea finales
```

### 2.2 Reversión de Archivos Modificados Específicos
Si solo se requiere revertir los archivos agregados en esta etapa:
```powershell
git checkout HEAD -- package.json
Remove-Item -Path "scripts\test-etapa-10-acceptance.ts" -Force
Remove-Item -Recurse -Force -Path "docs\ejecucion\continuacion-produccion\ETAPA-10"
```

---

## 3. Reversión y Restauración de Base de Datos

En caso de que se hubiera modificado una base de datos de pruebas o de staging, el procedimiento para restaurar a partir del último respaldo en caliente generado es:

```powershell
# 1. Listar respaldos disponibles en la carpeta de backups
Get-ChildItem -Path "backups" -Filter "*.db" | Sort-Object LastWriteTime -Descending

# 2. Ejecutar script de restauración verificada con PRAGMA integrity_check
npx tsx scripts/restore-db.ts "backups/<nombre_del_archivo_backup>.db" "data/alsiz.db"

# 3. Comprobar la integridad de la base restaurada
npx tsx scripts/health-check.ts
```

---

## 4. Reversión en Plataformas de Despliegue (Render / Vercel)

Si se desplegó una versión defectuosa en Render o Vercel:

1. **En Render (Backend):**
   - Acceder al panel de Render -> Servicio `alsiz-backend-api` -> Pestaña **Events / Deploys**.
   - Seleccionar el deploy anterior exitoso y hacer clic en **Rollback to this deploy**.
   - El volumen montado `/data` preserva los datos sin alteración de archivos.

2. **En Vercel (Frontend):**
   - Acceder al panel de Vercel -> Proyecto `plataforma-educativa-alsiz` -> Pestaña **Deployments**.
   - Localizar el deployment previo y presionar **Promote to Production** o asignar el alias de staging.

---

## 5. Verificación Post-Reversión

Tras la ejecución de cualquiera de los pasos anteriores, ejecutar:
```powershell
npm run lint
npm run test:security-p0
```
Ambos comandos deben finalizar con código de salida 0.

