# Procedimiento de Reversión (Rollback) — Etapa 02: Persistencia Real y Arquitectura Temporal de Despliegue
**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-02`  

---

## 1. Alcance de la Reversión

Este procedimiento define los pasos ordenados para revertir los cambios de arquitectura y persistencia introducidos en la **Etapa 02** en caso de fallos críticos, inconsistencias no recuperables o rechazo en la revisión técnica humana.

---

## 2. Escenarios y Procedimientos de Reversión

### Escenario A: Reversión Completa a Nivel de Control de Versiones (Git)
Si se decide descartar por completo las modificaciones de la Etapa 02 y retornar al estado base de la Etapa 01:

1. **Verificar estado de trabajo actual:**
   ```powershell
   git status
   ```
2. **Volver a la rama de Etapa 01 o descartar la rama de Etapa 02:**
   ```powershell
   git checkout continuacion-produccion-etapa-01
   ```
   *(Opcional si se requiere eliminar la rama local sin push previo)*:
   ```powershell
   git branch -D continuacion-produccion-etapa-02
   ```
3. **Restaurar dependencias originales (si se requiere recuperar bun.lock):**
   ```powershell
   git checkout origin/main -- bun.lock
   npm install
   ```

---

### Escenario B: Reversión Operativa de Despliegue en Vercel
Si el proxy de Vercel (`api-entry.js`) presenta problemas o latencia con el backend persistente:

1. **Restaurar `api-entry.js` original:**
   ```powershell
   git checkout c35d468 -- api-entry.js
   ```
2. **Verificar `vercel.json`:**
   Asegurar que las rutas apunten a los manejadores serverless previos o al archivo `api-server.js`.
3. **Despliegue de rollback en Vercel:**
   - Desde el panel de Vercel: ir a **Deployments**, seleccionar el despliegue inmediatamente anterior y hacer clic en **Instant Rollback**.

---

### Escenario C: Reversión Operativa del Backend Persistente (Render / VPS)
Si el servicio backend persistente falla al iniciar o la base de datos presenta problemas:

1. **Detener el servicio backend:**
   - **Render:** Suspender el Web Service desde el dashboard.
   - **PM2 / VPS:**
     ```bash
     pm2 stop alsiz-backend
     ```
   - **Docker:**
     ```bash
     docker compose down
     ```
2. **Restaurar la base de datos SQLite desde el último respaldo verificado:**
   - Ubicar el último respaldo en `backups/`:
     ```powershell
     ls backups/
     ```
   - Copiar el respaldo sobre la ruta activa `DATABASE_PATH`:
     ```bash
     cp backups/alsiz_pre_etapa02_backup.db /data/alsiz.db
     ```
   - Validar integridad del archivo restaurado:
     ```bash
     sqlite3 /data/alsiz.db "PRAGMA integrity_check;"
     ```
3. **Reiniciar servicio backend:**
   ```bash
   pm2 start ecosystem.config.cjs
   ```
4. **Comprobar salud:**
   ```bash
   curl -s http://localhost:3001/api/health
   ```

---

## 3. Criterios de Éxito de la Reversión

La reversión se considerará exitosa cuando:
1. `git status` no contenga cambios huérfanos o archivos en conflicto.
2. `npm run test:security-p0` y `npm run health` se ejecuten sin errores.
3. El frontend sirva la interfaz de usuario sin errores 500 y las sesiones sigan funcionando con el estado de persistencia previo.
4. No exista pérdida de datos ni corrupción en el archivo SQLite.

