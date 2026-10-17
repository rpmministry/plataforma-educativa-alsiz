# REGISTRO DE DECISIONES TÉCNICAS Y GESTIÓN DE RIESGOS — ETAPA 01
## Plataforma Educativa ALSIZ para Ekballo Church
**Fecha:** 2026-10-16  
**Rama:** `continuacion-produccion-etapa-01`  

---

## 1. DECISIONES TÉCNICAS FUNDAMENTALES

1. **Cero Claves de Proveedores en el Frontend (P0)**:
   - *Decisión*: Eliminar completamente cualquier referencia a claves de IA en el cliente (`VITE_GEMINI_API_KEY`, etc.). Todas las peticiones se dirigen a los endpoints internos del servidor.
   - *Razón*: El navegador y las herramientas de desarrollo permiten inspeccionar cualquier clave presente en bundles compilados o en el tráfico de red directo hacia proveedores de IA.
2. **Capa Agnóstica de Acceso a Datos (DAL)**:
   - *Decisión*: Crear `server/db/dal.ts` con la interfaz `IDatabaseAdapter` y adaptadores concretos para Turso libSQL y SQLite local.
   - *Razón*: Permite desplegar en Vercel contra Turso Cloud Starter sin casarse con su API propietaria, facilitando una futura migración a PostgreSQL o contenedores locales.
3. **Manejo Honesto de Contingencia en IA**:
   - *Decisión*: Cuando los proveedores de servidor o la conexión fallen, el sistema informa con honestidad pedagógica que el tutor se encuentra fuera de línea y sugiere consultar las guías descargadas.
   - *Razón*: Está estrictamente prohibido engañar a estudiantes o representantes simulando que una respuesta generada con expresiones regulares locales proviene de un modelo de lenguaje real.
4. **Catálogo Estricto en ProviderManager**:
   - *Decisión*: Remover OpenCode de la lista de proveedores activos y del endpoint `/api/health`.
   - *Razón*: OpenCode Zen bloquea su API fuera de su entorno nativo y no cuenta con integración operativa real. Anunciarlo crearía falsas expectativas diagnósticas.
5. **Rechazo de Arranque en Producción ante Secretos Débiles**:
   - *Decisión*: Implementar `validateProductionSessionSecret` en `server.ts`.
   - *Razón*: Previene que despliegues en producción utilicen claves de ejemplo (`alsiz_default_privacy_pepper_2026`) o secretos triviales susceptibles de ataques de fuerza bruta.
6. **Aislamiento de Semillas y Bootstrap Seguro**:
   - *Decisión*: Saltear `003_seed_dev_data.sql` si `NODE_ENV === 'production'` o `skipDevSeeds === true`, y proveer `scripts/bootstrap-admin.ts`.
   - *Razón*: En producción no deben existir cuentas predeterminadas (`admin@alsiz.local`) con contraseñas conocidas (`DevAdmin2026!`).

---

## 2. GESTIÓN Y MITIGACIÓN DE RIESGOS

| Riesgo Identificado | Severidad | Probabilidad | Estrategia de Mitigación Implementada |
| :--- | :---: | :---: | :--- |
| Exposición accidental de claves en GitHub | Crítica | Baja | Archivos `.env` y `.env.local` rigurosamente ignorados en `.gitignore`; variables documentadas con descripciones vacías en `.env.example`; escáner de bundles integrado en `scripts/test-scan-dist-secrets.ts`. |
| Desconexión temporal de Turso Cloud | Alta | Baja | DAL encapsulado con manejo de errores y soporte para SQLite local en entornos desconectados; transacciones atómicas libSQL. |
| Caída o límite de tasa de la API de IA | Media | Media | Cascada en `ProviderManager`: Gemini -> DeepSeek -> OpenRouter -> Simulador socrático de contingencia con cero error 500. |
| Fuga de datos de menores en logs de error | Alta | Baja | `sanitizeAuditDetails` redacta contraseñas y tokens; direcciones IP anonimizadas mediante HMAC-SHA256 con salt de entorno. |
