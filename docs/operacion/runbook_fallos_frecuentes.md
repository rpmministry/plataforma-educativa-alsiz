# Runbook de Diagnóstico y Fallos Frecuentes
## Plataforma Educativa ALSIZ para Ekballo Church

- **Documento**: `docs/operacion/runbook_fallos_frecuentes.md`
- **Versión**: 1.0.0
- **Fecha**: 2026-10-16
- **Audiencia**: Ingenieros de Soporte, Desarrolladores y Administradores de Sistemas

---

### 1. Índice Rápido de Síntomas

1. [Fallo 1: Error `EADDRINUSE: address already in use :::3000`](#fallo-1-error-eaddrinuse-address-already-in-use-3000)
2. [Fallo 2: Error `SQLITE_BUSY: database is locked`](#fallo-2-error-sqlite_busy-database-is-locked)
3. [Fallo 3: Discrepancia en checksums de migraciones de base de datos](#fallo-3-discrepancia-en-checksums-de-migraciones-de-base-de-datos)
4. [Fallo 4: Error HTTP 429 o 402 en proveedores de IA (Cuota o Crédito agotado)](#fallo-4-error-http-429-o-402-en-proveedores-de-ia-cuota-o-crédito-agotado)
5. [Fallo 5: Fallo de Síntesis de Voz (Google TTS Neuronal2) o silencio en el aula](#fallo-5-fallo-de-síntesis-de-voz-google-tts-neuronal2-o-silencio-en-el-aula)
6. [Fallo 6: La sesión se cierra de inmediato en iPad / Safari / iOS](#fallo-6-la-sesión-se-cierra-de-inmediato-en-ipad--safari--ios)
7. [Fallo 7: `FUNCTION_INVOCATION_FAILED` en Vercel Serverless](#fallo-7-function_invocation_failed-en-vercel-serverless)
8. [Fallo 8: La página carga en blanco tras un despliegue de frontend](#fallo-8-la-página-carga-en-blanco-tras-un-despliegue-de-frontend)

---

### 2. Guías de Diagnóstico y Resolución

---

#### Fallo 1: Error `EADDRINUSE: address already in use :::3000`

- **Síntoma**: Al iniciar `npm run dev` o `node dist/server.cjs`, la consola muestra `Error: listen EADDRINUSE: address already in use :::3000`.
- **Causa Raíz**: Hay una instancia previa del servidor Express o de Vite ejecutándose en segundo plano ocupando el puerto 3000.
- **Procedimiento de Solución**:
  - En **Linux / macOS**:
    ```bash
    # Identificar el proceso y terminarlo
    lsof -i :3000
    kill -9 $(lsof -t -i :3000)
    ```
  - En **Windows (PowerShell)**:
    ```powershell
    Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object OwningProcess
    Stop-Process -Id <PID> -Force
    ```
  - Como alternativa, inicie el servidor en otro puerto:
    ```bash
    PORT=3001 npm run dev
    ```

---

#### Fallo 2: Error `SQLITE_BUSY: database is locked`

- **Síntoma**: Operaciones de escritura (ej. registrar nota o guardar progreso) fallan con error de bloqueo de base de datos.
- **Causa Raíz**: Múltiples procesos intentando escribir en el archivo SQLite sin que se haya configurado el modo WAL o transacciones de larga duración bloqueando el archivo.
- **Procedimiento de Solución**:
  1. Verificar que el servidor corra en una sola instancia de proceso (`instances: 1` en PM2). SQLite embebido no soporta clustering de múltiples procesos concurrentes escribiendo en el mismo archivo sin un broker.
  2. Verificar que WAL esté activo ejecutando:
     ```bash
     npx tsx -e "const { DatabaseSync } = require('node:sqlite'); const db = new DatabaseSync('data/alsiz.db'); console.log(db.prepare('PRAGMA journal_mode').get()); db.close();"
     ```
     *Debe retornar*: `{ journal_mode: 'wal' }`.
  3. Si existen archivos `-wal` y `-shm` huérfanos tras un cierre abrupto, forzar un checkpoint:
     ```bash
     npx tsx -e "const { DatabaseSync } = require('node:sqlite'); const db = new DatabaseSync('data/alsiz.db'); db.exec('PRAGMA wal_checkpoint(TRUNCATE);'); db.close();"
     ```

---

#### Fallo 3: Discrepancia en checksums de migraciones de base de datos

- **Síntoma**: El log del servidor muestra: `[Migrator] ADVERTENCIA: La migración 00X_...sql tiene un checksum distinto al registrado en BD`.
- **Causa Raíz**: Un archivo `.sql` ya aplicado fue editado posteriormente en el repositorio, violando la inmutabilidad de migraciones.
- **Procedimiento de Solución**:
  - **REGLA**: NUNCA modifique un archivo de migración ya aplicado en producción.
  - Cree siempre una nueva migración con el siguiente número secuencial (ej. `013_fix_column_name.sql`) para aplicar el cambio incremental.
  - Para verificar las migraciones aplicadas vs los archivos locales, ejecute:
    ```bash
    npm run health
    ```

---

#### Fallo 4: Error HTTP 429 o 402 en proveedores de IA (Cuota o Crédito agotado)

- **Síntoma**: Los estudiantes perciben una ligera demora al consultar al profesor IA, y el log registra `[AI Hierarchy] DeepSeek respondió 402/429`.
- **Causa Raíz**: Saldo agotado en la cuenta de DeepSeek o saturación temporal de cuota por minuto.
- **Comportamiento Esperado**: El sistema activa automáticamente el *circuit-breaker* y conmuta a Google Gemini 2.0 Flash o al catálogo gratuito de OpenRouter. El alumno **no recibe un error**, pero la latencia puede aumentar 1 a 2 segundos.
- **Procedimiento de Solución**:
  1. Recargar saldo en el panel de DeepSeek (`https://platform.deepseek.com/`).
  2. Si el problema persiste temporalmente, desactive la capa primaria comentando `DEEPSEEK_API_KEY` en `.env.production` y recargue:
     ```bash
     pm2 reload alsiz-ekballo-platform
     ```

---

#### Fallo 5: Fallo de Síntesis de Voz (Google TTS Neuronal2) o silencio en el aula

- **Síntoma**: El texto del profesor IA se muestra en pantalla pero no se reproduce el audio narrado.
- **Causa Raíz**:
  - Clave de Google TTS no configurada (`GOOGLE_TTS_API_KEY`).
  - La clave tiene restricciones de dominio o API en Google Cloud Console que impiden la llamada desde la IP del servidor.
  - Navegador bloqueó la reproducción automática (*autoplay policy*).
- **Procedimiento de Solución**:
  1. Compruebe la salud del servicio de IA:
     ```bash
     curl -s http://localhost:3000/api/health | grep ttsConfigured
     ```
  2. Si `ttsConfigured` es `false`, configure la variable `GOOGLE_TTS_API_KEY` con una clave autorizada para la API *Cloud Text-to-Speech*.
  3. En el cliente, recuerde que los navegadores modernos requieren que el usuario haga al menos un clic o interacción con la pantalla antes de permitir la reproducción de audio.

---

#### Fallo 6: La sesión se cierra de inmediato en iPad / Safari / iOS

- **Síntoma**: El usuario introduce sus credenciales correctamente, ve el mensaje de éxito pero al recargar o cambiar de pestaña vuelve a la pantalla de acceso.
- **Causa Raíz**:
  - Conexión vía HTTP (sin SSL) con la cookie configurada como `Secure: true`. Safari rechaza almacenar cookies seguras sobre canales no cifrados.
  - Dominio cruzado (*Cross-Origin*) bloqueado por la política ITP (*Intelligent Tracking Prevention*) de Apple.
- **Procedimiento de Solución**:
  1. Despliegue siempre con terminación HTTPS válida (Certificado Let's Encrypt o Cloudflare).
  2. En entornos locales o de desarrollo sin HTTPS, verifique que `NODE_ENV=development` esté activo, lo que configura automáticamente `secure: false` y `SameSite: 'lax'`.

---

#### Fallo 7: `FUNCTION_INVOCATION_FAILED` en Vercel Serverless

- **Síntoma**: Al acceder a cualquier endpoint `/api/*` en Vercel, la respuesta es HTTP 500 con error de invocación de función.
- **Causa Raíz**: Intentar compilar TypeScript dinámicamente en el runtime de Node de Vercel o `body-parser` releyendo un stream que `@vercel/node` ya consumió.
- **Procedimiento de Solución**:
  - El proyecto resuelve esto arquitectónicamente mediante `api-entry.js` (CommonJS puro) que carga el bundle precompilado `api-server.js` generado durante `npm run build`.
  - Verifique que `package.json` en su script `build` contenga la compilación de `api-server.js`:
    ```bash
    esbuild server.ts --bundle --platform=node --format=cjs --packages=external --outfile=api-server.js
    ```
  - Verifique que `vercel.json` enrute `/api/(.*)` hacia `/api-entry.js`.

---

#### Fallo 8: La página carga en blanco tras un despliegue de frontend

- **Síntoma**: El navegador muestra una pantalla blanca; la consola de desarrollador reporta errores de tipo `TypeError: Failed to fetch dynamically imported module`.
- **Causa Raíz**: Los hashes de los bundles de Vite cambiaron en el servidor, pero el navegador del usuario tiene en caché el `index.html` antiguo que apunta a chunks obsoletos.
- **Procedimiento de Solución**:
  1. El servidor ya deshabilita ETag y fuerza encabezados de no-caché para archivos HTML (`Cache-Control: no-cache, no-store, must-revalidate`).
  2. Si un usuario experimenta esto, indíquele hacer recarga forzada (`Ctrl + Shift + R` en PC o `Cmd + Shift + R` en Mac).
  3. Asegúrese de que el reverse proxy Nginx no esté aplicando caché estático al archivo `index.html`.

