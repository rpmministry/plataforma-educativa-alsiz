# PROCEDIMIENTO DE ROLLBACK Y REVERSIÓN — ETAPA 01
## Plataforma Educativa ALSIZ para Ekballo Church
**Fecha:** 2026-10-16  
**Rama:** `continuacion-produccion-etapa-01`  

---

## 1. CONDICIONES PARA ACTIVAR LA REVERSIÓN
- Fallo no recuperable en la conexión con Turso Cloud que impida la autenticación de usuarios.
- Detección de incompatibilidades en el frontend al comunicarse con los endpoints `/api/v1`.
- Necesidad de revertir a la rama estable previa para auditorías adicionales.

---

## 2. PROCEDIMIENTO PASO A PASO DE REVERSIÓN LOCAL

### Paso 1: Salvar evidencias y registros
Si se produjeron errores en pruebas, exportar los logs relevantes antes de reiniciar el entorno de trabajo:
```powershell
Get-Content dist/server.cjs.map -TotalCount 50
```

### Paso 2: Volver al commit de auditoría (Etapa 00)
El commit inicial validado al comenzar la etapa fue `1810075` (o el commit base de la auditoría `31441c0`):
```powershell
# Cambiar a la rama de auditoría o restablecer la rama de trabajo al commit base
git checkout auditoria-post-etapa-14
```

### Paso 3: Reversión en Turso Cloud (si aplica)
Dado que las pruebas de la Etapa 01 se ejecutaron con limpieza transaccional (`DELETE FROM students WHERE id LIKE 'STU-TEST-%'`), no existen datos contaminantes en Turso Cloud. Si se requiere un restablecimiento completo de la base de datos de pruebas en Turso:
```powershell
# Reejecutar migración limpia o eliminar tablas de prueba
npx tsx scripts/test-turso-migrations.ts
```

### Paso 4: Recompilación limpia
```powershell
npm run clean
npm run build
```
