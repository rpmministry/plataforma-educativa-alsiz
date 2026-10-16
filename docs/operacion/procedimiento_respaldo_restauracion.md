# Procedimiento de Respaldo y Restauración de Base de Datos
## Plataforma Educativa ALSIZ para Ekballo Church

- **Documento**: `docs/operacion/procedimiento_respaldo_restauracion.md`
- **Versión**: 1.0.0
- **Fecha**: 2026-10-16
- **Audiencia**: Administradores de Infraestructura, DevOps y Encargados de Continuidad de Negocio

---

### 1. Política de Copias de Seguridad (Backup Policy)

La base de datos relacional de ALSIZ (`data/alsiz.db`) contiene información crítica institucional: usuarios, expedientes académicos, calificaciones, fuentes doctrinales y constancias de educación continua.

#### 1.1. Principios Técnicos Fundamentales
1. **Respaldo en Caliente Atómico (*Hot Backup*)**: La plataforma utiliza la instrucción nativa de SQLite `VACUUM INTO`, la cual genera una copia completa, desfragmentada y transaccionalmente consistente del archivo de base de datos **sin detener el servidor ni bloquear las transacciones concurrentes de lectura y escritura**.
2. **Consolidación previa del registro Write-Ahead (*WAL Checkpoint*)**: Antes de la copia, el servicio emite `PRAGMA wal_checkpoint(PASSIVE);` para asegurar que las páginas modificadas en memoria o en el archivo `-wal` se integren limpiamente.
3. **Firma Criptográfica Inmutable**: Cada archivo generado calcula su hash `SHA-256` para certificar la integridad del archivo contra corrupción física o adulteraciones.

---

### 2. Cronograma de Frecuencia y Retención

| Tipo de Respaldo | Frecuencia de Ejecución | Horario Programado | Política de Retención | Destino de Almacenamiento |
|---|---|---|---|---|
| **Diario Automático** | Todos los días | 02:00 AM (Hora Ecuador, UTC-5) | Últimos 7 días continuos | Servidor local (`./backups/`) |
| **Semanal Acumulado** | Cada domingo | 03:00 AM (Hora Ecuador, UTC-5) | Últimas 4 semanas | Almacenamiento cifrado fuera del sitio (*Offsite*) |
| **Mensual Consolidado**| Primer día de cada mes | 04:00 AM (Hora Ecuador, UTC-5) | 12 meses (1 año escolar completo) | Bóveda de archivos fríos (S3/GCS/Drive institucional) |
| **Pre-Despliegue** | Manual (Obligatorio) | Inmediatamente antes de actualizar código o aplicar migraciones | Conservación indefinida por versión | `./backups/pre_deploy_vX.db` |

---

### 3. Procedimiento de Ejecución de Respaldos

#### 3.1. Ejecución Manual Vía CLI
Para generar un respaldo inmediato:
```bash
npm run db:backup
```
*Salida esperada*:
```text
====================================================
  ALSIZ Ekballo — Utilidad de Respaldo de Base de Datos
====================================================
[INFO] Base de datos origen: C:\...\data\alsiz.db
[INFO] Generando respaldo en caliente (Hot Backup via VACUUM INTO)...

====================================================
  RESPALDO COMPLETADO EXITOSAMENTE
====================================================
- Archivo generado: ./backups/alsiz_backup_2026-10-16T22-20-18-763Z.db
- Tamaño: 1016.00 KB (1040384 bytes)
- Checksum SHA-256: 6b431be050e9381b35f73f1d5761a533db10920a5bdb18a29d8916d803ac7a02
- Fecha/Hora: 2026-10-16T22:20:18.802Z
- Tiempo de ejecución: 49 ms
====================================================
```

#### 3.2. Automatización mediante Cron Job en Linux
Para programar el respaldo diario automático en un servidor de producción:
```bash
crontab -e
```
Añadir la siguiente línea (ajustando la ruta absoluta del proyecto):
```cron
0 2 * * * cd /var/www/plataforma-educativa-alsiz && /usr/bin/npm run db:backup >> /var/log/alsiz-backup.log 2>&1
```

---

### 4. Procedimiento de Restauración y Recuperación ante Desastres (Disaster Recovery)

> [!WARNING]
> La restauración de una base de datos sobreescribe el estado actual de la plataforma. Este procedimiento solo debe ejecutarse en caso de falla de hardware, corrupción irreparable o como parte de un simulacro de recuperación programado.

#### Paso 1: Notificación y Detención Preventiva del Servicio
Detener el servicio web para liberar cualquier descriptor de archivo activo:
```bash
pm2 stop alsiz-ekballo-platform
# O si corre con systemd:
sudo systemctl stop alsiz-platform.service
```

#### Paso 2: Salvaguardar la Base de Datos Dañada / Actual
Antes de restaurar, cree una copia de seguridad forense de los archivos actuales:
```bash
mkdir -p ./data/incident_quarantine
cp ./data/alsiz.db* ./data/incident_quarantine/
```

#### Paso 3: Identificar y Verificar el Archivo de Respaldo Destino
Compruebe el hash SHA-256 del archivo a restaurar:
```bash
sha256sum backups/alsiz_backup_YYYY-MM-DDTHH-mm-ss.db
```
Verifique que el hash coincida con el registrado en la bitácora de respaldos.

#### Paso 4: Ejecutar la Restauración mediante la Utilidad Oficial
```bash
npm run db:restore -- backups/alsiz_backup_YYYY-MM-DDTHH-mm-ss.db
```
La utilidad ejecutará de forma atómica:
1. Cierre explícito de cualquier instancia de base de datos activa.
2. Limpieza de archivos temporales obsoletos de log transaccional (`.db-wal` y `.db-shm`).
3. Copia segura del archivo de respaldo en el directorio de destino.
4. Verificación de integridad física SQLite ejecutando `PRAGMA integrity_check;`.

*Salida esperada*:
```text
====================================================
  RESTAURACIÓN COMPLETADA Y VERIFICADA
====================================================
- Origen: backups/alsiz_backup_...
- Destino: ./data/alsiz.db
- Integridad SQLite (PRAGMA integrity_check): OK
- Fecha/Hora: 2026-10-16T22:20:53.049Z
====================================================
```

#### Paso 5: Reinicio y Comprobación de Salud Operativa
```bash
# Iniciar nuevamente la aplicación
pm2 start alsiz-ekballo-platform

# Verificar salud del sistema
npm run health
```

---

### 5. Registro de Prueba de Restauración Real

- **Fecha de Validación Técnica**: 2026-10-16.
- **Entorno de Prueba**: Directorio de trabajo local con base de datos real de 1,016 KB y 12 migraciones aplicadas.
- **Archivo de Respaldo Generado**: `alsiz_backup_2026-10-16T22-20-18-763Z.db` (SHA-256: `6b431be050e9381b35f73f1d5761a533db10920a5bdb18a29d8916d803ac7a02`).
- **Destino de Prueba Sandbox**: `data/test_restore.db`.
- **Resultado de Integridad**: `PRAGMA integrity_check: OK`.
- **Tiempo de Restauración**: 30 milisegundos.
- **Estado de la Prueba**: **100% SATISFACTORIO Y VERIFICADO**.

