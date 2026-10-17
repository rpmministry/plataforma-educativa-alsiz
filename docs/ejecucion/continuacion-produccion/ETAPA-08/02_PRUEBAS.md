# Registro de Pruebas — Etapa 08: Configuración Verificable de APIs de IA y Prueba Real de Proveedores

**Programa:** Plataforma Educativa ALSIZ para Ekballo Church  
**Etapa:** ETAPA-08 (Continuación a Producción)  
**Fecha:** 17 de octubre de 2026  
**Responsable Técnico:** Antigravity (Google DeepMind Team)  

---

## 1. Clasificación Rigurosa de Pruebas Ejecutadas

Conforme a las directrices de calidad y seguridad, se diferencian estrictamente los cuatro entornos de prueba:

- **REVISIÓN ESTÁTICA:** Análisis de tipos TypeScript y escaneo estático de bundles de frontend en búsqueda de fugas de secretos o URLs directas.
- **PRUEBA LOCAL DETERMINISTA:** Ejecución de suites en memoria y validaciones lógicas unitarias sin dependencia de conectividad externa ni consumo de cuotas.
- **PRUEBA DE STAGING:** Simulación de entorno de despliegue con base de datos en memoria aplicando migraciones en modo producción.
- **PRUEBA REAL EXTERNA:** Invocación en vivo hacia APIs externas reales (Google Gemini, DeepSeek) con peticiones no sensibles, midiendo latencia y verificando la cascada.

---

## 2. Matriz de Pruebas y Resultados

| # | Dimensión Evaluada | Tipo de Prueba | Comando / Script Ejecutado | Resultado | Evidencia Asociada |
|---|---|---|---|---|---|
| 1 | Compilación TypeScript | REVISIÓN ESTÁTICA | `npx tsc --noEmit` | **0 errores** (Exit code 0) | `evidencias/06_tsc_check.txt` |
| 2 | Compilación de Bundles | REVISIÓN ESTÁTICA | `npm run build` | **Exitoso** (Vite + esbuild en 8.70s) | Log de terminal |
| 3 | Escaneo de Secretos en Frontend | REVISIÓN ESTÁTICA | `npx tsx scripts/test-scan-dist-secrets.ts` | **44 archivos analizados, 0 secretos** | `evidencias/05_dist_scan.txt` |
| 4 | Auditoría Segura de Configuración | PRUEBA LOCAL | `npx tsx scripts/test-ai-providers-config.ts` | **5 variables auditadas, 0 secretos expuestos** | `evidencias/01_audit_config.txt` |
| 5 | Suite de Seguridad P0 | PRUEBA DE STAGING | `npx tsx scripts/test-security-p0.ts` | **10 / 10 pruebas pasadas** | `evidencias/04_security_p0_suite.txt` |
| 6 | Suite Determinista Etapa 08 | PRUEBA LOCAL | `npx tsx scripts/test-etapa-08-unified.ts` | **9 / 9 criterios aprobados** | `evidencias/03_unified_suite.txt` |
| 7 | Conexión Real Google Gemini | PRUEBA REAL EXTERNA | `npx tsx scripts/test-ai-providers-live.ts` | **Conexión real establecida** (`gemini-3.8-flash` 3675ms / Manejo 429 correcto) | `evidencias/02_live_providers_test.txt` |
| 8 | Conexión Real DeepSeek API | PRUEBA REAL EXTERNA | `npx tsx scripts/test-ai-providers-live.ts` | **Conexión real exitosa** (`deepseek-flash` 1025ms / cascada 2605ms) | `evidencias/02_live_providers_test.txt` |
| 9 | Cascada Automática y Tolerancia | PRUEBA REAL EXTERNA | `npx tsx scripts/test-ai-providers-live.ts` | **Cascada probada en vivo** (Gemini agotado -> DeepSeek responde) | `evidencias/02_live_providers_test.txt` |
| 10 | Fundamentación RAG Estricta | PRUEBA REAL EXTERNA | `npx tsx scripts/test-ai-providers-live.ts` | **Cita validada en texto** (`[EKB-DOC-CIENCIAS#C1]` citado, no usado omitido) | `evidencias/02_live_providers_test.txt` |

---

## 3. Resumen de Evidencias de Conexión Real

### Prueba en Vivo de DeepSeek API
```
1. Probando Proveedor GOOGLE_GEMINI...
   Modelo Configurado: gemini-3.8-flash
   [GeminiProvider] Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests
   [ProviderManager] Falló GEMINI (intento 2/2): GEMINI_QUOTA_ERROR (429)

2. Probando Proveedor DEEPSEEK_API...
   Modelo Configurado: deepseek-chat
   Resultado: SUCCESS
   Modelo Activo: deepseek-flash
   Latencia: 1025ms
   Salida Sanitizada: "CONECTADO"

4. Probando Cascada de Proveedores en Pregunta Didáctica Real...
   Pregunta: "¿Qué es una planta y cómo se alimenta?"
   Proveedor Utilizado: DEEPSEEK_API
   Modelo Utilizado: deepseek-flash
   Es Fallback Simulado: NO (proveedor real externo)
   Latencia: 2605ms
   Salida Sanitizada: "Una planta es un ser vivo que crece en la tierra, fabrica su propio alimento con"
```

### Prueba de Fundamentación de Citas RAG
```
5. Probando Validación de Respuestas Fundamentadas (Citas RAG estrictas)...
   Fragmentos entregados al prompt: 2 (EKB-DOC-CIENCIAS#C1, EKB-DOC-NO-USADO#C9)
   Citas reportadas por el proveedor: [EKB-DOC-CIENCIAS#C1]
   Respuesta generada: "Excelente pregunta. Antes de responder, te invito a pensar: cuando miras una hoja verde..."
   Fundamentación estricta verificada: ✅ SÍ
```

---

## 4. Conclusión de las Pruebas

Todas las pruebas se ejecutaron conforme a los criterios fijados en el Prompt 08. Se ha verificado que al menos un proveedor real externo opera con éxito desde el enrutador de profesores IA, la cascada opera de manera resiliente, las credenciales no sufren fugas en ningún componente del sistema y el fallback local se informa con total honestidad.

