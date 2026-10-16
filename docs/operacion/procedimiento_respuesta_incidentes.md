# Procedimiento de Respuesta a Incidentes
## Plataforma Educativa ALSIZ para Ekballo Church

- **Documento**: `docs/operacion/procedimiento_respuesta_incidentes.md`
- **Versión**: 1.0.0
- **Fecha**: 2026-10-16
- **Audiencia**: Comité de Crisis, Oficial de Privacidad (LOPDP), Administradores de Sistemas y Docentes

---

### 1. Clasificación y Matriz de Severidad de Incidentes

Todo evento que comprometa la disponibilidad, integridad, confidencialidad o fidelidad pedagógica de la plataforma se clasifica bajo cuatro niveles de severidad:

| Nivel | Definición | Ejemplos Operativos | Tiempo Máximo de Respuesta (SLA) |
|---|---|---|---|
| **SEV-1 (Crítica)** | Interrupción total del servicio, pérdida o corrupción de datos masiva, compromiso de credenciales de superusuario o filtración de datos de menores. | - Servidor caído inalcanzable.<br>- Intento exitoso de inyección SQL o filtración masiva.<br>- Exposición pública de la base de datos o contraseñas. | **Inmediato (< 30 minutos)** |
| **SEV-2 (Alta)** | Falla en una función esencial que bloquea a múltiples usuarios, o caída simultánea de todos los proveedores de IA externos. | - Falla masiva en el inicio de sesión de tutores o estudiantes.<br>- Caída conjunta de DeepSeek y Gemini sin respuesta.<br>- Error en la emisión o verificación de certificados. | **< 2 horas** |
| **SEV-3 (Media)** | Degradación parcial del rendimiento o falla en componentes no críticos que admiten contingencia. | - Latencia elevada en la generación de respuestas de IA (> 10 s).<br>- Falla en el servicio de síntesis de voz (TTS) de Google.<br>- Inconsistencia menor en estadísticas del panel admin. | **< 8 horas** |
| **SEV-4 (Baja)** | Defectos cosméticos, erratas textuales o inconsistencias menores que no afectan la operación pedagógica. | - Error tipográfico en enunciado de lección.<br>- Desalineación visual en pantallas móviles específicas. | **< 48 horas (siguiente sprint)** |

---

### 2. Flujo del Ciclo de Vida del Incidente

```
  [ DETECCIÓN ] 
        |  (Alerta automática / Reporte de usuario)
        v
  [ CLASIFICACIÓN Y TRIAJE ]
        |  (Asignación de severidad SEV 1-4 y Líder de Incidente)
        v
  [ CONTENCIÓN INMEDIATA ]
        |  (Aislar falla, revocar tokens, activar fallback a SIMULATED_LOCAL)
        v
  [ ERRADICACIÓN Y REMEDIACIÓN ]
        |  (Corrección de código, rollback o restauración de respaldo)
        v
  [ RECUPERACIÓN Y PRUEBAS ]
        |  (Verificación mediante npm run health y pruebas E2E)
        v
  [ POST-MORTEM Y APRENDIZAJE ]
        |  (Informe formal de causa raíz RCA y mejoras de prevención)
```

---

### 3. Protocolos Específicos de Respuesta

#### 3.1. Protocolo ante Brecha de Seguridad o Privacidad de Menores (LOPDP Ecuador)
En estricto cumplimiento con la **Ley Orgánica de Protección de Datos Personales (LOPDP)**:
1. **Contención Inmediata**:
   - Cerrar todas las sesiones activas invalidando el secreto de sesión (`SESSION_SECRET`) en las variables de entorno para forzar deslogueo universal.
   - Bloquear el acceso a la IP o rango involucrado a nivel de firewall (iptables / Nginx).
2. **Evaluación de Daños**:
   - Inspeccionar la tabla de auditoría `audit_logs` para determinar qué registros de estudiantes fueron consultados.
   - Verificar si hubo exfiltración o solo intento frustrado.
3. **Notificación Formal**:
   - Notificar a la Dirección de Ekballo Church en un plazo no mayor a 12 horas.
   - Si se confirmó afectación a datos personales de menores, notificar a los representantes legales afectados y a la Autoridad de Protección de Datos Personales en un plazo máximo de **48 horas**, detallando el incidente y las medidas correctivas adoptadas.

#### 3.2. Protocolo ante Falla Generalizada de Proveedores de IA
Si DeepSeek, Gemini y OpenRouter sufren interrupción simultánea:
1. El sistema conmuta automáticamente al proveedor `SIMULATED_LOCAL` sin interrumpir la sesión del alumno.
2. Si se observa que el backend intenta llamar a una API agotada generando timeouts:
   - Configurar temporalmente en variables de entorno: `DEEPSEEK_API_KEY=` y `GEMINI_API_KEY=` vacías para forzar al sistema a operar en modo simulado local ultrarrápido (0 ms de espera externa).
   - Reiniciar el proceso: `pm2 reload alsiz-ekballo-platform`.

#### 3.3. Protocolo ante Corrupción o Bloqueo de Base de Datos SQLite
Si el sistema reporta `SQLITE_CORRUPT` o `SQLITE_BUSY` continuo:
1. Detener el proceso: `pm2 stop alsiz-ekballo-platform`.
2. Verificar integridad física: `npx tsx -e "const { DatabaseSync } = require('node:sqlite'); const db = new DatabaseSync('data/alsiz.db'); console.log(db.prepare('PRAGMA integrity_check').get()); db.close();"`.
3. Si el resultado es distinto a `ok`, aislar el archivo dañado y ejecutar la restauración inmediata desde el último respaldo validado:
   ```bash
   npm run db:restore -- backups/alsiz_backup_mas_reciente.db
   ```
4. Ejecutar `npm run health` y reanudar el servicio.

---

### 4. Directorio de Contactos de Emergencia (Cadena de Mando)

| Rol | Responsable Institucional | Canal Primario | Canal de Respaldo |
|---|---|---|---|
| **Líder de Incidente / DevOps** | Administrador de Infraestructura ALSIZ | Teléfono / Signal de Emergencia | Correo institucional de alerta |
| **Oficial de Privacidad (LOPDP)**| Asesor Jurídico Ekballo Church | Teléfono directo | Correo de cumplimiento |
| **Coordinador Académico** | Dirección Pastoral / Académica | Mensajería instantánea | Llamada telefónica |
| **Soporte a Familias** | Secretaría Escolar Ekballo | Portal de familias / WhatsApp de soporte | Correo institucional |

---

### 5. Estructura Obligatoria del Informe Post-Mortem (RCA)

Todo incidente clasificado como SEV-1 o SEV-2 debe generar un informe de Causa Raíz dentro de las 72 horas posteriores a la recuperación, documentando:
1. **Resumen Ejecutivo**: Cronología minuto a minuto del evento.
2. **Impacto Real**: Número de alumnos afectados, tiempo de indisponibilidad y transacciones interrumpidas.
3. **Causa Raíz Técnica (5 Porqués)**: Explicación determinista de por qué falló el control.
4. **Lecciones Aprendidas**: Qué funcionó bien y qué falló en la respuesta.
5. **Acciones Preventivas**: Lista de tickets técnicos asignados para evitar la recurrencia.

