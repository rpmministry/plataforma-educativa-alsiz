# Procedimiento de Rollback y Plan de Reversa — ETAPA 08
## Profesores IA Especializados y Coordinación Multiagente

- **Etapa**: ETAPA-08
- **Fecha**: 2026-10-16
- **Rama Git**: `etapa-08-profesores-ia-y-multiagente`
- **Rama Base**: `etapa-07-centro-de-conocimiento`

---

### 1. Criterios para Activar la Reversa
La reversa técnica de la Etapa 08 solo debe activarse si ocurre alguna de las siguientes condiciones críticas:
1. Ruptura de la integridad referencial en la base de datos que afecte el funcionamiento de los módulos académicos previos (LMS o Centro de Conocimiento).
2. Filtración de datos de estudiantes en las conversaciones con los agentes (violación IDOR confirmada en producción).
3. Incapacidad total de iniciar el servidor Express o la aplicación frontend debido a conflictos con las dependencias de los agentes.

---

### 2. Procedimiento de Reversa en Base de Datos (SQLite)

Las tablas añadidas en la Etapa 08 están completamente aisladas mediante claves foráneas y prefijo `ai_`. En caso de necesitar revertir el esquema a la versión de la Etapa 07 (v007), ejecutar:

```sql
-- Reversión de Esquema v008 y v009
DROP TABLE IF EXISTS ai_generated_materials;
DROP TABLE IF EXISTS ai_telemetry_logs;
DROP TABLE IF EXISTS ai_messages;
DROP TABLE IF EXISTS ai_conversations;
DROP TABLE IF EXISTS ai_agents;

-- Eliminar registro de migraciones 008 y 009 del libro de auditoría
DELETE FROM schema_migrations WHERE version IN ('008', '009');
```

O restaurar el respaldo transaccional generado al cierre de la Etapa 07:
```powershell
Copy-Item "data/backups/alsiz_etapa07_final.db" "data/alsiz.db" -Force
```

---

### 3. Procedimiento de Reversa en Git

Para retornar el código fuente al estado exacto de la Etapa 07:

```bash
# 1. Descartar cambios locales no comprometidos si los hubiera
git checkout etapa-07-centro-de-conocimiento

# 2. Eliminar la rama local de la etapa 08
git branch -D etapa-08-profesores-ia-y-multiagente

# 3. Reinstalar dependencias y reconstruir
npm run lint
npm run build
```

---

### 4. Verificación Post-Reversa
Tras ejecutar el procedimiento de reversa, validar que el sistema se encuentre plenamente operativo en el estado de la Etapa 07 ejecutando:

```bash
npm run test:etapa05
npm run test:etapa06
npm run test:etapa07
```
Todas las 16 pruebas de la Etapa 07 y 25 pruebas de la Etapa 06 deben aprobar sin excepciones.

