# Plan y Procedimiento de Reversión (Rollback) — Etapa 11

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-11`  
**Commit de Partida:** `c63a11c`  

---

## 1. Alcance de la Reversibilidad

La **Etapa 11** no ejecutó mutaciones destructivas en el esquema de base de datos (`schema_migrations` permanece en v013). Los cambios se concentraron en saneamiento de textos institucionales, eliminación de backdoors en rutas SPA, adición del script de aceptación y documentación formal.

Sin embargo, ante cualquier contingencia operativa antes o durante el arranque lectivo, se establecen 4 procedimientos de reversión estandarizados.

---

## 2. Procedimientos de Reversión Quirúrgica

### 2.1 Reversión de Cambios de Código y Frontend (Git Rollback)
Si se requiere volver exactamente al estado previo de la línea base antes de la Etapa 11:

```powershell
# 1. Verificar estado actual
git status --short

# 2. Deshacer modificaciones no confirmadas si aplica
git checkout continuacion-produccion-etapa-10

# 3. Recompilar bundles de producción
npm run build

# 4. Verificar ausencia de errores
npm run lint
```

---

### 2.2 Reversión y Restauración de Base de Datos Persistente
Si ocurre una anomalía o corrupción en `data/alsiz.db`:

```powershell
# 1. Detener el proceso del servidor backend
Get-Process -Name "node" | Stop-Process -Force

# 2. Restaurar la base de datos a partir del respaldo validado de la Etapa 04
npm run db:restore -- --backup backups/alsiz_backup_2026-10-17T15-04-10-913Z.db

# 3. Comprobar integridad física del archivo restaurado
npx tsx -e "
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('data/alsiz.db');
const check = db.prepare('PRAGMA integrity_check;').get();
console.log('Integrity check:', check);
"

# 4. Reanudar el servidor
npm run start
```

---

### 2.3 Procedimiento de Suspensión Preventiva de Acceso a Estudiantes
Si por cualquier motivo de seguridad o reajuste pedagógico se requiere suspender temporalmente el inicio de clases sin borrar expedientes ni progreso:

```powershell
# Ejecutar comando SQL de suspensión preventiva en tiempo real:
npx tsx -e "
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('data/alsiz.db');
db.prepare(\"UPDATE users SET status = 'SUSPENDED', updated_at = datetime('now') WHERE id IN ('usr-real-avril', 'usr-real-gael')\").run();
console.log('Acceso de estudiantes suspendido preventivamente (HTTP 403 AUTH_ACCOUNT_INACTIVE).');
"
```

Para rehabilitar el acceso:
```powershell
npx tsx -e "
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('data/alsiz.db');
db.prepare(\"UPDATE users SET status = 'ACTIVE', updated_at = datetime('now') WHERE id IN ('usr-real-avril', 'usr-real-gael')\").run();
console.log('Acceso de estudiantes restaurado a ACTIVE.');
"
```

---

### 2.4 Forzado de Modo de Contingencia IA Local (Offline Socrático)
Si las cuotas de Gemini o DeepSeek fallan o las conexiones externas sufren cortes:

1. Abrir `.env.local` (o variables en Render).
2. Configurar:
   ```env
   AI_PROVIDER_PRIORITY="SIMULATED_LOCAL"
   ```
3. Reiniciar el servicio. Los estudiantes continuarán recibiendo orientación pedagógica socrática basada en las 20 matrices temáticas locales, reportando `isFallback: true` sin interrupción de clases.

