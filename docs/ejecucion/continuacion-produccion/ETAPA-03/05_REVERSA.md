# Procedimiento de Reversión y Contingencia — Etapa 03: Conectar Interfaz, Autenticación y Creación de Cuentas en Base de Datos

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-03`  
**Commit Inicial de Referencia:** `1a7964c`

---

## 1. Alcance y Naturaleza de los Cambios

Durante la Etapa 03 **no se aplicaron nuevas migraciones DDL** sobre el esquema de base de datos; la implementación reutilizó íntegramente las tablas relacionales existentes (`users`, `students`, `student_representatives`, `student_program_enrollments`, `student_subject_enrollments`, `sessions`, `audit_events`) desplegadas y validadas en las Etapas 01 y 02.

Los cambios se concentraron en:
1. Rutas de backend (`server/routes/authRoutes.ts`, `adminRoutes.ts`, `representativeRoutes.ts`).
2. Adaptadores de infraestructura (`server/db/dal.ts`, `server/auth/crypto.ts`).
3. Interfaz de usuario React (`src/services/apiClient.ts`, `src/context/SchoolContext.tsx`, componentes de login y registro).
4. Actualización del manual administrativo (`docs/operacion/manual_administrativo.md`).

---

## 2. Procedimiento de Reversión Paso a Paso

Si por alguna razón fuera necesario revertir la plataforma al estado previo exacto a la Etapa 03:

### Paso 1: Verificación de Estado y Creación de Respaldo de Seguridad
Antes de cualquier operación en Git, verificar que no existan datos productivos afectados y crear una copia de seguridad del árbol de trabajo:
```powershell
Get-Location
git status
# Crear una rama de rescate que preserve el trabajo realizado en Etapa 03
git branch respaldo-etapa-03-emergencia
```

### Paso 2: Reversión del Árbol de Trabajo al Commit Base
Para restaurar los archivos al estado del commit base `1a7964c` (final de Etapa 02):
```powershell
# Descartar cambios modificados en el área de trabajo
git checkout 1a7964c -- package.json
git checkout 1a7964c -- server/auth/crypto.ts
git checkout 1a7964c -- server/db/dal.ts
git checkout 1a7964c -- server/routes/adminRoutes.ts
git checkout 1a7964c -- server/routes/authRoutes.ts
git checkout 1a7964c -- server/routes/representativeRoutes.ts
git checkout 1a7964c -- src/components/auth/AccessView.tsx
git checkout 1a7964c -- src/components/auth/AccountSettingsModal.tsx
git checkout 1a7964c -- src/components/auth/StudentLoginModal.tsx
git checkout 1a7964c -- src/components/landing/LandingView.tsx
git checkout 1a7964c -- src/components/landing/NewStudentModal.tsx
git checkout 1a7964c -- src/components/layout/Navbar.tsx
git checkout 1a7964c -- src/context/SchoolContext.tsx
git checkout 1a7964c -- src/services/apiClient.ts
git checkout 1a7964c -- docs/operacion/manual_administrativo.md

# Eliminar scripts y archivos nuevos de la etapa si se requiere limpieza total
# (No tocar archivos no relacionados)
Remove-Item -Path "scripts/test-etapa-03.ts" -Force -ErrorAction SilentlyContinue
```

### Paso 3: Limpieza de Caché y Reinstalación de Dependencias
```powershell
npm run lint
npm run build
```

### Paso 4: Verificación Post-Reversión
Ejecutar las suites de validación base para constatar que el sistema regresa al comportamiento de la Etapa 02 sin daños colaterales:
```powershell
npm run test:security-p0
npm run test:etapa02
```

---

## 3. Plan de Contingencia en Caso de Desconexión de Base de Datos

Si en producción la base de datos Turso / SQLite entrara en estado de inactividad o fallara la red:
1. El cliente API (`apiClient.ts`) detecta el fallo HTTP 502/503 o excepción de red y emite el código estructurado `NETWORK_OFFLINE` / `SERVICE_UNAVAILABLE`.
2. La interfaz de usuario muestra de inmediato el banner de advertencia institucional solicitando reintento o contacto con soporte.
3. Se garantiza que el sistema **no volverá a iniciar una sesión ficticia en memoria**, preservando la integridad de los datos de los estudiantes y el cumplimiento de la LOPDP.

