# Registro de Decisiones de Arquitectura (ADRs) y Gestión de Riesgos — Etapa 11

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-11`  

---

## 1. Registro de Decisiones Arquitectónicas (ADRs)

### ADR-11-01: Puerta de Control Humana de Cuatro Factores para la Apertura a Estudiantes
- **Contexto:** Las cuentas de Gael y Avril existen en la base persistente con claves robustas y tutela validada. Sin embargo, aperturar el acceso antes de que el administrador configure el servicio en la nube y entregue las credenciales personalmente a los niños expondría el servicio a desajustes operativos.
- **Decisión:** Mantener el estado en **AMARILLO (Apertura Condicionada)**. No entregar credenciales ni desplegar sin la firma expresa del Acta de Pase a Producción por Mauricio Andrade Luna.
- **Consecuencias Positivas:** Protección de menores (LOPDP), cero acceso no autorizado, control estricto del inicio lectivo.

---

### ADR-11-02: Descargo Institucional Expreso de Apoyo Pedagógico y Homeschooling
- **Contexto:** La normativa ecuatoriana (LOEI y Acuerdo MINEDUC-2023-00069-A) regula la educación en casa como responsabilidad de los representantes legales. La plataforma es un entorno de apoyo pedagógico, tutoría y discipulado cristiano, no una institución escolarizada presencial que emita títulos estatales directos ni código AMIE.
- **Decisión:** Incorporar en `Footer.tsx` y en los textos institucionales un descargo legal visible que explicite la naturaleza de apoyo y homeschooling del servicio, y reemplazar cualquier reclamo ambiguo de "Acreditación" por "Portafolio Formativo".
- **Consecuencias Positivas:** Blindaje legal frente a requerimientos regulatorios del MINEDUC; total honestidad institucional hacia los padres de familia.

---

### ADR-11-03: Erradicación de Puertas Traseras de Autenticación en Rutas SPA
- **Contexto:** Se detectó que las páginas `src/app/avril/page.tsx` y `src/app/gael/page.tsx` ejecutaban `localStorage.setItem('wisdom_auth_v2026', ...)` al montarse, omitiendo la pantalla de autenticación si un usuario ingresaba a esas URLs.
- **Decisión:** Eliminar inmediatamente la asignación de tokens o banderas de autenticación en esas rutas. Solo el servicio `loginStudent` en `SchoolContext.tsx` mediante credenciales validadas en el backend puede emitir una sesión válida.
- **Consecuencias Positivas:** Aislamiento total de perfiles y cumplimiento estricto de las directivas de seguridad P0.

---

### ADR-11-04: Estrategia de Entrega Curricular Progresiva por Trimestre
- **Contexto:** La auditoría curricular demostró que la Unidad 1 está 100% redactada (48 clases socráticas completas para 20 materias), pero las semanas 2 a 40 para los 200 días lectivos no están escritas en código.
- **Decisión:** Autorizar el arranque del ciclo escolar exclusivamente con la Unidad 1 (Semana 1 y diagnósticos iniciales). Establecer el compromiso de redactar y validar los lotes curriculares de las Unidades 2 y 3 con al menos 3 semanas de anticipación al inicio del Trimestre 2 (26 de noviembre de 2026).
- **Consecuencias Positivas:** Se evita la generación masiva de clases sintéticas de baja calidad; se garantiza rigor pedagógico y revisión humana por etapas.

---

## 2. Matriz de Riesgos Residuales

| Riesgo Identificado | Severidad | Probabilidad | Impacto | Estrategia de Mitigación Implementada | Responsable |
| :--- | :---: | :---: | :--- | :--- | :--- |
| **R-01: Provisión tardía del backend persistente en la nube** | Media | Media | La SPA en Vercel funcionaría en modo demo/desconectado si `BACKEND_URL` no está configurada. | Procedimiento claro documentado en el Acta para conectar el servicio Node en Render con disco montado. | Mauricio Andrade Luna (Admin) |
| **R-02: Agotamiento de cuota en Google Gemini Free Tier** | Baja | Alta | Conmutación forzada a proveedores secundarios. | Orquestador `ProviderManager` con fallback automático a DeepSeek API en 1990ms y degradación elegante a `SIMULATED_LOCAL` sin error 500. | Antigravity / ProviderManager |
| **R-03: Pérdida u olvido de credenciales por los estudiantes** | Baja | Media | Imposibilidad temporal de iniciar sesión en iPad/computador. | Endpoint `/api/v1/auth/pin-login` para acceso táctil simplificado de Gael (PIN de 6 dígitos) y herramienta administrativa de restablecimiento de contraseña en consola. | Mauricio Andrade Luna (Tutor) |
| **R-04: Desactualización curricular antes del Trimestre 2** | Media | Baja | Retraso en las clases diarias a partir del 26 de noviembre de 2026. | Alarma en calendario lectivo programada para el 01 de noviembre de 2026 para compilar los lotes de la Unidad 2 con el script `build-*-curriculum.ts`. | Coordinación Pedagógica ALSIZ |
| **R-05: Corrupción imprevista de la base de datos local** | Alta | Muy Baja | Inaccesibilidad a historiales de tareas y auditoría. | Servicio de Hot Backup `VACUUM INTO` con checksum SHA-256 probado; respaldos almacenados en `backups/` con restauración en menos de 2 minutos. | Administrador Técnico |

