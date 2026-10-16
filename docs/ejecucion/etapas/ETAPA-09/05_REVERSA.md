# Procedimiento de Rollback y Plan de Reversa — ETAPA 09
## Aula Interactiva e Integración Evaluada de OpenMAIC

- **Etapa**: ETAPA-09
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-09-aula-interactiva-openmaic`
- **Rama Base**: `etapa-08-profesores-ia-y-multiagente`

---

### 1. Desactivación Inmediata sin Rollback de Código (Método Rápido)
Si se requiere suspender el piloto de inmediato sin alterar archivos ni bases de datos, el administrador puede accionar el Kill-Switch de dos formas equivalentes:

1. **Vía API / Interfaz Web**:
   En el panel de administración (`AdminShell.tsx`), pulsar el botón rojo **"Desactivar Piloto (Kill-Switch)"**, o ejecutar:
   ```bash
   curl -X POST http://localhost:3000/api/v1/pilot/admin/toggle \
     -H "Authorization: Bearer <TOKEN_ADMIN>" \
     -H "Content-Type: application/json" \
     -d '{"enabled": false}'
   ```
2. **Vía Variable de Entorno**:
   Establecer en `.env.local`:
   ```env
   FEATURE_OPENMAIC_PILOT=false
   ```

Con cualquiera de estos dos métodos, el botón de acceso desaparece de la interfaz de los alumnos y toda llamada al piloto es rechazada de inmediato con `403 PILOT_DISABLED`, manteniendo el aula tradicional operando al 100%.

---

### 2. Reversión Estructural de Base de Datos (SQLite)

Si se necesita eliminar completamente las tablas del piloto interactivo y retornar el esquema a la versión de la Etapa 08 (v009):

```sql
-- Eliminar tablas creadas en la migración 010
DROP TABLE IF EXISTS interactive_pilot_telemetry;
DROP TABLE IF EXISTS interactive_pilot_sessions;
DROP TABLE IF EXISTS interactive_pilot_config;

-- Eliminar registro de migración 010
DELETE FROM schema_migrations WHERE version = '010';
```

---

### 3. Reversión en Git a la Etapa 08

Para retornar el repositorio al estado de la Etapa 08:

```bash
# 1. Cambiar a la rama de la Etapa 08
git checkout etapa-08-profesores-ia-y-multiagente

# 2. Eliminar la rama local de la etapa 09
git branch -D etapa-09-aula-interactiva-openmaic

# 3. Verificar estado
npm run test:etapa08
```

---

### 4. Verificación Post-Reversa
Tras ejecutar la reversa, validar que el sistema funcione correctamente en el estado de la Etapa 08 ejecutando:

```bash
npm run test:etapa05
npm run test:etapa06
npm run test:etapa07
npm run test:etapa08
```
Todas las 17 pruebas de la Etapa 08 deben aprobar con éxito (100%).

