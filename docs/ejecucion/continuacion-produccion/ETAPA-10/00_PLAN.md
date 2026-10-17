# Plan de Trabajo — Etapa 10: Despliegue de Staging y Pruebas de Aceptación desde URL Pública

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-10 (Continuación a Producción)  
**Rama de Trabajo:** `continuacion-produccion-etapa-10`  
**Commit Inicial:** `70ad6d3` (`chore(etapa-09): normalizar saltos de linea finales`)  
**Fecha:** 17 de octubre de 2026  
**Responsable Técnico:** Antigravity (Google DeepMind Team)  

---

## 1. Verificación Inicial de Entorno y Control de Versiones

### 1.1 Comprobación de Comandos Git
- **Get-Location:** `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **git rev-parse --show-toplevel:** `C:/Users/Alsiz/Documents/plataforma educativa ALSIZ`
- **git branch --show-current:** `continuacion-produccion-etapa-10`
- **git remote -v:**
  - `origin https://github.com/rpmministry/plataforma-educativa-alsiz.git (fetch)`
  - `origin https://github.com/rpmministry/plataforma-educativa-alsiz.git (push)`
- **git log -1 --oneline:** `70ad6d3 chore(etapa-09): normalizar saltos de linea finales`
- **git status --short:** Limpio al crear la rama de trabajo `continuacion-produccion-etapa-10`.

### 1.2 Comparativa con `origin/main`
- **HEAD Local:** `70ad6d3` (Rama `continuacion-produccion-etapa-10` basada en `continuacion-produccion-etapa-09`)
- **`origin/main` Remoto:** `1a7964c` (`feat(infra): adopcion de arquitectura serverless vercel y turso cloud a costo inicial cero`)
- **Diferencia Técnica:** La rama local contiene el historial completo y lineal de las etapas de continuación a producción (`etapa-00` a `etapa-09` culminadas):
  - `70ad6d3` / `2425b75`: Etapa 09 — Guía reproducible de creación, colocación y rotación de claves API.
  - `858fb40`: Etapa 08 — Unificación de proveedores IA con cascada transparente y cero fuga de secretos.
  - `ae0a63c`: Etapa 07 — Catálogo completo de profesores IA por asignatura y nivel.
  - `570a61c`: Etapa 06b — Currículo y clases socráticas de Avril (8.º EGB).
  - `03c0c59`: Etapa 06a — Currículo y validación de Gael (4.º EGB).
  - `5dda53e`: Etapa 05 — Auditoría de completitud curricular y calendario.
  - `1bc8469` / `f7bb28f`: Etapa 04 — Migración controlada de Gael y Avril con datos sintéticos.
  - `85b7af7`: Etapa 03 — Autenticación y persistencia de cuentas.

---

## 2. Declaración de Políticas de Seguridad P0 y LOPDP

1. **Cero Exposición de Secretos (P0):** NUNCA colocar claves API, contraseñas, PINs ni secretos de sesión en el código fuente, Git ni en el bundle del navegador.
2. **Protección Estricta de Menores (LOPDP):** PROHIBIDO el uso de cuentas reales de Gael y Avril durante esta etapa. Todos los ensayos de staging se realizan exclusivamente con cuentas sintéticas (`admin_staging_synth`, `rep_synth_t10`, `alumno_synth_t10`, `alumno_synth_b`).
3. **Aislamiento de Cuentas Demo en Entornos Públicos:** La base de datos limpia de staging omite estrictamente la migración `003_seed_dev_data.sql` y las semillas `005`, `007`, `009`. Cero cuentas predeterminadas de administrador con contraseñas conocidas públicamente.
4. **Veracidad y No Simulación Oculta:** No declarar un servicio creado si solo se entregan instrucciones. Si falta la URL pública del backend en la nube, registrar formalmente el bloqueo y no inventar un destino de proxy/rewrite ficticio.
5. **No Destructividad:** No ejecutar migraciones en bases de datos productivas.

---

## 3. Alcance Específico de la Etapa 10

El objetivo central de la Etapa 10 es preparar y verificar el despliegue del piloto de staging con cuentas sintéticas, evaluando los 10 requerimientos del Prompt 10:

1. **Comprobación de Entorno Limpio y Lockfile Único:**
   - Validar que el único lockfile presente sea `package-lock.json`.
   - Ejecutar `npm run lint` (`tsc --noEmit`), `npm run build` y suites de seguridad.
2. **Especificación del Servicio Node Persistente:**
   - Documentar y auditar la configuración de `render.yaml` y `Dockerfile`: Node >= 22.12.0, comando de build (`npm ci && npm run build`), comando de release (`npm run db:migrate`), comando de inicio (`npm run start`), disco montado (`/data`), `DATABASE_PATH=/data/alsiz.db`, y verificación de salud (`/api/health`).
3. **Aislamiento de Base de Datos Limpia de Staging:**
   - Ejecutar migraciones v001 a v013 en modo producción, comprobando omisión de semillas dev (9 migraciones estructurales aplicadas, 0 usuarios predeterminados).
4. **Despliegue y Configuración de Proxy en Vercel:**
   - Configuración de `api-entry.js` y `vercel.json` para proxy reverso hacia el backend persistente.
   - **Registro formal del bloqueo:** Ante la ausencia de la URL pública del backend provista por el operador, se documenta el bloqueo sin inventar rewrite falso.
5. **Flujo E2E Completo con Cuentas Sintéticas:**
   - Cargar portada (`/` y `/api/health`).
   - Autenticación de Administrador Sintético (creado vía `bootstrap`).
   - Creación de Representante y Estudiante Sintético vía `POST /api/v1/admin/students`.
   - Inicio de sesión del estudiante sintético.
   - Carga de asignaturas asignadas (`GET /api/v1/students/:id/subjects`).
   - Consulta de clase diaria socrática (`GET /api/v1/academic/lessons/:id`).
   - Envío de entrega de actividad (`POST /api/v1/academic/evaluations/:id/submissions`).
   - Calificación y registro de progreso en base persistente.
   - Apertura de diálogo socrático con el Tutor IA (`POST /api/v1/agents/conversations`) e interacción pedagógica.
6. **Persistencia Cruzada en Base Relacional:**
   - Cierre de sesión y recarga.
   - Inicio de sesión desde una segunda sesión limpia.
   - Comprobación de que la calificación (9.5/10) y los mensajes de chat provienen directamente de SQLite WAL y no sólo de `localStorage`.
7. **Aislamiento Estricto Anti-IDOR (Menores y Tutores):**
   - Verificar que el Estudiante A es rechazado con HTTP 403 (`FORBIDDEN_STUDENT_ACCESS`) al intentar acceder al expediente, notas o conversaciones del Estudiante B.
   - Verificar que el Representante A es rechazado con HTTP 403 (`FORBIDDEN_FAMILY_ACCESS`) al intentar acceder a estudiantes no vinculados.
8. **Simulación de Caída de Proveedor IA:**
   - Forzar contingencia de cuota en el proveedor primario (Gemini 429).
   - Validar que el sistema conmuta automáticamente a DeepSeek/OpenRouter sin error 500 y con telemetría sanitizada.
9. **Respaldo en Caliente, Reinicio y Restauración:**
   - Ejecutar `createHotBackup` (`VACUUM INTO`).
   - Restaurar copia con `restoreFromBackup` y certificar `PRAGMA integrity_check = ok`.
   - Validar que los estudiantes sintéticos y su progreso persisten íntegros tras la restauración.
10. **Matriz de Cierre y Dictamen de Bloqueo Controlado:**
    - Generar suite automatizada reproducible: `scripts/test-etapa-10-acceptance.ts`.
    - Documentar el checklist exacto para el operador humano.
