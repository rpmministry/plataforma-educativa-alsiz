# Procedimiento de Reversión (Rollback Plan) — Etapa 08

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-08 (Continuación a Producción)  
**Fecha:** 17 de octubre de 2026  
**Responsable Técnico:** Antigravity (Google DeepMind Team)  

---

## 1. Alcance de la Reversión

Este procedimiento describe los pasos exactos y seguros para revertir los cambios introducidos en la Etapa 08 en caso de presentarse una incompatibilidad imprevista en el entorno del servidor o un comportamiento anómalo en la orquestación de proveedores de IA.

El estado del repositorio previo a esta etapa se encuentra fijado en el commit:
`ae0a63c2ad37711a93b984a104e6157f765ea56e` (`feat(etapa-07): catalogo completo de profesores ia por asignatura y nivel`).

---

## 2. Procedimiento de Reversión en Desarrollo / Staging

Dado que todo el trabajo de la Etapa 08 se realizó en la rama aislada `continuacion-produccion-etapa-08`, la reversión no afecta a la rama `main` ni a etapas previas:

### Paso 1: Detener los servicios en ejecución
Si el servidor de desarrollo o pruebas está corriendo, detenerlo:
```powershell
# Detener procesos node activos en el puerto 3000
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Paso 2: Descartar los cambios no confirmados de la rama (si fuera necesario)
Para volver al commit inicial de la etapa conservando la rama:
```powershell
git checkout continuacion-produccion-etapa-08
git reset --hard ae0a63c2ad37711a93b984a104e6157f765ea56e
```

### Paso 3: Recompilar la aplicación al estado anterior
```powershell
npm run build
```

### Paso 4: Limpieza de archivos temporales de prueba
Eliminar los scripts específicos creados para la Etapa 08 si se opta por un descarte total:
- `scripts/test-ai-providers-config.ts`
- `scripts/test-ai-providers-live.ts`
- `scripts/test-etapa-08-unified.ts`

---

## 3. Procedimiento de Reversión en Producción (Hotfix Operativo)

Si el sistema estuviese desplegado en producción y un proveedor externo experimentara fallos o bloqueos de cuota:

### Opción Rápida (Sin Despliegue de Código):
Modificar la variable de entorno `AI_PROVIDER_PRIORITY` en el panel de control del servidor:
1. Para saltarse temporalmente un proveedor con cuota agotada (ej. Gemini):
   ```env
   AI_PROVIDER_PRIORITY=DEEPSEEK,OPENROUTER,SIMULATED_LOCAL
   ```
2. Para forzar inmediatamente el modo de contingencia pedagógica socrática offline sin llamadas a APIs externas:
   ```env
   AI_PROVIDER_PRIORITY=SIMULATED_LOCAL
   ```
3. Reiniciar el servicio Node.js. El gestor comenzará a operar instantáneamente bajo la nueva prioridad sin requerir nuevo build.

---

## 4. Validación Post-Reversión

Tras cualquier procedimiento de reversión, verificar la estabilidad del sistema ejecutando:
```powershell
npx tsx scripts/test-security-p0.ts
```
Confirmando que las 10 pruebas de seguridad P0 continúen aprobadas al 100%.

