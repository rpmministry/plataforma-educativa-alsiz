# Plan de Reversión (Rollback) — Etapa 09: Procedimiento de Creación y Colocación de Claves API

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-09 (Continuación a Producción)  
**Rama:** `continuacion-produccion-etapa-09`  
**Commit Base:** `858fb4053a95b9c6b6a2d578b22ad93d97410a6f`  
**Fecha:** 17 de octubre de 2026  

---

## 1. Alcance de la Reversión

La Etapa 09 comprende exclusivamente la adición de documentación operativa (`docs/operacion/guia_configuracion_apis_piloto.md`), scripts de verificación (`scripts/test-etapa-09-apis-guide.ts`) y la carpeta de control de ejecución (`docs/ejecucion/continuacion-produccion/ETAPA-09/`). No se modificó ningún archivo de código fuente central ni esquemas de base de datos.

---

## 2. Procedimiento de Reversión Paso a Paso

Si se requiere revertir completamente esta etapa para regresar al estado exacto de la culminación de la Etapa 08:

### Paso 1: Limpieza de Archivos Nuevos
En la terminal de PowerShell en la raíz del proyecto:
```powershell
# Eliminar guía operativa y script validador
Remove-Item -Path "docs/operacion/guia_configuracion_apis_piloto.md" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "scripts/test-etapa-09-apis-guide.ts" -Force -ErrorAction SilentlyContinue

# Eliminar carpeta de control de la etapa 09
Remove-Item -Path "docs/ejecucion/continuacion-produccion/ETAPA-09" -Recurse -Force -ErrorAction SilentlyContinue
```

### Paso 2: Retornar a la Rama de la Etapa 08
```powershell
git checkout continuacion-produccion-etapa-08
git branch -D continuacion-produccion-etapa-09
```

### Paso 3: Verificación de Estado Limpio
```powershell
git status --short
git log -1 --oneline
```
*Salida esperada:*
- Estado de git completamente limpio.
- Último commit: `858fb40 feat(etapa-08): unificacion de proveedores ia con cascada transparente y cero fuga de secretos`.

---

## 3. Criterio de Verificación Post-Reversión

Tras la reversión, el sistema continúa funcionando exactamente bajo el estado aprobado de la Etapa 08:
- Backend intacto con orquestación unificada en `ProviderManager`.
- Ausencia de cambios en esquemas SQLite o endpoints.

