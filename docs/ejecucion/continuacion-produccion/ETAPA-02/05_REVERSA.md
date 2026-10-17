# Procedimiento de Reversión (Rollback) — Etapa 02: Persistencia Real y Arquitectura Temporal de Despliegue
**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `feature/arquitectura-vercel-turso`  

---

## 1. Alcance de la Reversión

Este documento establece el protocolo detallado y ordenado para revertir parcial o totalmente las configuraciones y cambios de código introducidos en la **Etapa 02** (tanto para la arquitectura Vercel + Turso Cloud como para la opción Render + SQLite en disco persistente).

---

## 2. Escenarios y Procedimientos de Reversión

### Escenario A: Reversión Rápida de Infraestructura (Switch de Turso Cloud a Render / SQLite)
Gracias al diseño agnóstico desacoplado del DAL (`IDatabaseAdapter`), **no es necesario cambiar código** para alternar entre proveedores:

1. **Para desconectar Turso Cloud y volver a Render/VPS con proxy:**
   - En el panel de Vercel (**Settings -> Environment Variables**):
     - Eliminar o vaciar `TURSO_DATABASE_URL` y `TURSO_AUTH_TOKEN`.
     - Configurar `BACKEND_URL=https://tu-backend.onrender.com`.
   - Vercel cambiará automáticamente el comportamiento de `api-entry.js` para operar en modo Proxy Reverso.
2. **Para forzar el uso de SQLite local en un servidor o contenedor:**
   - En el archivo `.env` del servidor:
     ```env
     USE_LOCAL_SQLITE=true
     DATABASE_PATH=/data/alsiz.db
     ```
   - Reiniciar el proceso Node (`pm2 restart alsiz-backend` o `docker compose restart`).

---

### Escenario B: Restauración de Base de Datos desde Respaldo Inmutable
Antes de la sincronización con Turso, se generó un respaldo físico verificado:
`backups/alsiz_pre_turso_migracion_20261017.db` (1.14 MB).

Si se detectara alguna discrepancia en la base de datos:
1. **Restaurar base de datos local SQLite:**
   ```powershell
   Copy-Item backups/alsiz_pre_turso_migracion_20261017.db data/alsiz.db -Force
   ```
2. **Verificar integridad del archivo restaurado:**
   ```powershell
   npm run health
   ```
3. **Re-sincronizar Turso Cloud desde el respaldo local (si fuera requerido):**
   ```powershell
   # Desde Turso CLI (si está instalado):
   turso db shell alsiz-db < data/alsiz.db
   ```

---

### Escenario C: Reversión Completa en Git (Descartar Rama de Trabajo)
Si el comité técnico de la iglesia decide descartar las adaptaciones de Turso y volver al commit base:

1. **Verificar estado del árbol de trabajo:**
   ```powershell
   git status
   ```
2. **Cambiar a la rama base aprobada:**
   ```powershell
   git checkout continuacion-produccion-etapa-02
   ```
   *(Opcional: eliminar la rama de trabajo local)*:
   ```powershell
   git branch -D feature/arquitectura-vercel-turso
   ```
3. **Restaurar dependencias si fuera necesario:**
   ```powershell
   npm ci
   ```

---

### Escenario D: Reversión Operativa en Vercel Dashboard
Si un despliegue en Vercel presenta fallos en tiempo de ejecución:
1. Acceder al dashboard de [Vercel](https://vercel.com).
2. Seleccionar el proyecto `plataforma-educativa-alsiz`.
3. Navegar a la pestaña **Deployments**.
4. Ubicar el despliegue anterior estable y hacer clic en los tres puntos (`...`) -> **Instant Rollback**.
5. Vercel redirigirá el tráfico inmediatamente a la versión previa en menos de 5 segundos.

---

## 3. Criterios de Éxito de la Reversión

La reversión se considerará concluida con éxito cuando:
1. `git status` reporte el árbol limpio sin cambios descontrolados.
2. `npm run health` reporte `database.connected: true` con integridad `ok`.
3. `npm run test:security-p0` y `npm run test:etapa02` pasen al 100%.
4. No exista pérdida de sesiones de estudiantes ni corrupción de tablas académicas.
