# ADR-002: Autenticación Segura con Cookies HttpOnly y Eliminación del Bypass de Acceso

- **Estado**: Aprobado
- **Fecha**: 2026-10-16
- **Autores**: Antigravity / Liderazgo Técnico ALSIZ
- **Contexto**:
  En el código heredado de Wisdom School (`src/context/SchoolContext.tsx#L382`), se detectó una vulnerabilidad crítica: la sentencia `cleanId === found.id.toLowerCase()` permite a cualquier persona acceder a un perfil de estudiante escribiendo únicamente el ID de usuario sin proporcionar contraseña ni PIN. Asimismo, el sistema guardaba el estado de sesión en texto plano en `localStorage`.
- **Alternativas Evaluadas**:
  1. *Conservar el bypass como "modo demo"*: Inadmisible para un entorno de producción que almacena datos de menores bajo la LOPDP ecuatoriana.
  2. *Tokens JWT almacenados en `localStorage`*: Vulnerable a ataques de robo de sesión mediante Cross-Site Scripting (XSS).
  3. *Tokens JWT en Cookies `HttpOnly` + Protección CSRF + Hash Criptográfico (Elegida)*: Estándar de la industria que previene la lectura del token desde scripts de JavaScript en el navegador.
- **Decisión**:
  1. Eliminar inmediatamente el bypass de autenticación; exigir contraseña o PIN hash verificado en servidor.
  2. Implementar tokens de sesión JWT gestionados mediante **Cookies `HttpOnly`** con atributos `SameSite=Lax` y `Secure`.
  3. Soportar un flujo de "PIN Rápido de 4 Dígitos" exclusivamente para estudiantes en dispositivos táctiles previamente autorizados por el representante.
- **Consecuencias**:
  - *Positivas*: Blindaje total contra accesos no autorizados y robo de sesiones; pleno cumplimiento de las directrices de seguridad de la LOPDP.
  - *Negativas*: Requiere manejo de CORS estricto con `credentials: 'include'` en las peticiones del frontend.

