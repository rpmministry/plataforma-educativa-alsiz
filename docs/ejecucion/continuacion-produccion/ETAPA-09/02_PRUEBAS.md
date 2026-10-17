# Matriz y Ejecución de Pruebas — Etapa 09: Procedimiento de Creación y Colocación de Claves API

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-09 (Continuación a Producción)  
**Rama:** `continuacion-produccion-etapa-09`  
**Fecha:** 17 de octubre de 2026  

---

## 1. Clasificación Rigurosa de Pruebas

Conforme a las directrices del proyecto, todas las pruebas se catalogan estrictamente según su entorno de ejecución:

```
[ REVISIÓN ESTÁTICA ] -> Análisis de código, tipado estático y escaneo de fugas de secretos sin ejecución de servicios.
[ PRUEBA LOCAL ]      -> Ejecución de suites automatizadas y scripts diagnósticos en el entorno de desarrollo local.
[ PRUEBA DE STAGING ]  -> Procedimientos y ensayos controlados con datos sintéticos en entornos de pre-producción.
[ PRUEBA DE PRODUCCIÓN] -> Procedimientos de verificación y smoke tests finales tras el despliegue del administrador.
```

---

## 2. Registro de Pruebas Ejecutadas

### 2.1. Revisiones Estáticas

| ID | Prueba | Descripción | Resultado | Evidencia |
|:---:|---|---|:---:|---|
| **EST-01** | Compilación estática TypeScript (`npx tsc --noEmit`) | Verifica que no existan errores de tipado, imports rotos ni variables inexistentes. | **APROBADA (0 errores)** | `evidencias/04_tsc_check.txt` |
| **EST-02** | Escaneo de secretos en la guía de operaciones | Búsqueda regex de patrones de claves (`AIza...`, `sk-...`, `re_...`) en `guia_configuracion_apis_piloto.md`. | **APROBADA (0 fugas)** | `evidencias/01_guide_verification.txt` (C08) |
| **EST-03** | Verificación estática de enlaces y documentación oficial | Comprueba que los URLs de Google AI Studio, DeepSeek y OpenRouter sean válidos y apunten a los portales oficiales. | **APROBADA** | `evidencias/01_guide_verification.txt` (C02, C03, C04) |

### 2.2. Pruebas Locales (Ejecutadas y Validadas en esta Sesión)

| ID | Prueba | Comando / Script | Resultado | Evidencia |
|:---:|---|---|:---:|---|
| **LOC-01** | Suite integral de la guía de APIs | `npx tsx scripts/test-etapa-09-apis-guide.ts` | **APROBADA (9/9 criterios)** | `evidencias/01_guide_verification.txt` |
| **LOC-02** | Auditoría booleana de presencia de variables | `npx tsx scripts/test-ai-providers-config.ts` | **APROBADA (Cero secretos en stdout)** | `evidencias/02_ai_config_audit.txt` |
| **LOC-03** | Suite de seguridad P0 del repositorio | `npx tsx scripts/test-security-p0.ts` | **APROBADA (10/10 pruebas)** | `evidencias/03_security_p0_suite.txt` |
| **LOC-04** | Catálogo honesto en runtime | Verificación de que `isProviderAvailable('OPENCODE')` sea `false` y `SIMULATED_LOCAL` esté disponible. | **APROBADA** | `evidencias/01_guide_verification.txt` (C09) |

### 2.3. Pruebas de Staging (Procedimiento Diseñado para el Administrador)

| ID | Prueba | Procedimiento Operativo | Estado |
|:---:|---|---|:---:|
| **STG-01** | Entrega de correo y PIN con cuenta sintética | Configurar `RESEND_API_KEY` o `EMAIL_USER`/`EMAIL_PASS` en el panel de staging y solicitar PIN táctil hacia `admin-pruebas@ekballochurch.org` (NUNCA cuentas de alumnos). | **DOCUMENTADO Y LISTO PARA EJECUCIÓN HUMANA** |
| **STG-02** | Verificación de cascada Gemini → DeepSeek | Configurar `AI_PROVIDER_PRIORITY=DEEPSEEK,GEMINI` o simular cuota agotada de Gemini para comprobar que el backend conmuta a DeepSeek sin interrupciones. | **DOCUMENTADO Y LISTO PARA EJECUCIÓN HUMANA** |

### 2.4. Pruebas de Producción (Smoke Tests Post-Despliegue)

| ID | Prueba | Endpoint / Procedimiento | Estado |
|:---:|---|---|:---:|
| **PRD-01** | Diagnóstico de salud general | `GET /api/health` — Verificar `status: "ok"`, `database.connected: true` y lista de proveedores disponibles sin exposición de claves. | **DOCUMENTADO Y LISTO PARA EJECUCIÓN HUMANA** |
| **PRD-02** | Diagnóstico de salud de IA | `GET /api/ai/health` — Verificar que `activeProvider` sea `GOOGLE_GEMINI` (o el primario configurado) y cuota establecida en `100 req/día`. | **DOCUMENTADO Y LISTO PARA EJECUCIÓN HUMANA** |

---

## 3. Resumen Cuantitativo de Pruebas

- **Total de pruebas automatizadas ejecutadas en esta etapa:** 22 verificaciones individuales (9 en suite de guía + 3 en auditoría config + 10 en suite P0).
- **Pruebas aprobadas:** 22 / 22 (100%).
- **Pruebas fallidas o dudosas:** 0.
- **Pruebas no ejecutadas marcadas falsamente como ejecutadas:** 0 (las pruebas de staging y producción están explícitamente delimitadas como guías reproducibles para el administrador humano).

