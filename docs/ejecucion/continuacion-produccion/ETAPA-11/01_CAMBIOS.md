# Bitácora de Cambios Técnicos — Etapa 11: Preparación del Inicio de Clases y Pase Controlado a Producción

**Plataforma Educativa ALSIZ — Ekballo Church**  
**Fecha:** 17 de Octubre de 2026  
**Rama:** `continuacion-produccion-etapa-11`  

---

## 1. Resumen Ejecutivo de Modificaciones

Durante la **Etapa 11**, se ejecutaron modificaciones de saneamiento institucional, seguridad de autenticación, suite automatizada de aceptación y descargos legales sobre el alcance educativo:

```
src/
├── app/
│   ├── avril/page.tsx               <- Eliminación de escritura insegura de sesión en localStorage
│   └── gael/page.tsx                <- Eliminación de escritura insegura de sesión en localStorage
├── components/
│   ├── auth/
│   │   ├── AccessRestrictedModal.tsx <- Denominación institucional "Plataforma Educativa ALSIZ"
│   │   └── StudentLoginModal.tsx     <- Placeholder actualizado a "estudiante@alsiz.local"
│   ├── common/
│   │   └── ErrorBoundary.tsx         <- Actualización de título a "Plataforma Educativa ALSIZ • Ekballo Church"
│   ├── dashboard/
│   │   └── StudentDashboard.tsx      <- Reemplazo de "Acreditación" por "Portafolio Formativo"
│   ├── landing/
│   │   └── LandingView.tsx           <- Actualización descriptiva de profesores virtuales ALSIZ
│   └── layout/
│       └── Footer.tsx                <- Denominación ALSIZ • EKBALLO CHURCH y Descargo Legal Institucional
package.json                          <- Registro del script "test:etapa11-acceptance"
scripts/
└── test-etapa-11-acceptance.ts       <- Nueva suite determinista de 19 verificaciones integrales
docs/ejecucion/continuacion-produccion/ETAPA-11/
├── 00_PLAN.md                        <- Plan de trabajo
├── 01_CAMBIOS.md                     <- Esta bitácora de cambios
├── 02_PRUEBAS.md                     <- Reporte de pruebas diferenciadas por entorno
├── 03_VALIDACION.md                  <- Matriz de cumplimiento frente a requisitos
├── 04_RIESGOS_Y_DECISIONES.md        <- Registro de decisiones arquitectónicas (ADRs)
├── 05_REVERSA.md                     <- Plan de reversión quirúrgica
├── 06_CIERRE.md                      <- Informe de cierre y semáforo
├── ACTA_PASE_PRODUCCION.md           <- Acta formal para suscripción del Responsable
└── evidencias/                       <- Capturas y salidas reproducibles de pruebas
```

---

## 2. Detalle de Cambios por Archivo

### 2.1 Saneamiento Institucional y Descargo Legal
- **`src/components/layout/Footer.tsx`**:
  - Se sustituyó la denominación legada `WISDOM SCHOOL` por `ALSIZ • EKBALLO CHURCH`.
  - Se cambió "Plataforma Pedagógica & Colegio Virtual" por "Plataforma de Apoyo Pedagógico & Tutoría Socrática".
  - Se incorporó un bloque destacado de descargo legal que aclara inequívocamente:
    > *"La Plataforma Educativa ALSIZ es un entorno digital de apoyo pedagógico, tutoría socrática inteligente y discipulado cristiano para familias en educación en casa (Homeschooling). Este servicio complementario no constituye por sí mismo un establecimiento educativo escolarizado presencial con código AMIE ni emite títulos oficiales de bachiller de forma directa. La convalidación y registro de estudios ante el Ministerio de Educación de Ecuador corresponde a los representantes legales conforme a la normativa vigente de educación en casa."*
  - Se actualizó el aviso de derechos reservados a: `Copyright © 2026 Plataforma Educativa ALSIZ • Ekballo Church / RPM Ministry`.

- **`src/components/common/ErrorBoundary.tsx`**:
  - Se corrigió el encabezado de error de fallback de `Wisdom Homeschool Ecuador` a `Plataforma Educativa ALSIZ • Ekballo Church`.

- **`src/components/auth/AccessRestrictedModal.tsx`**:
  - Se actualizó el mensaje de advertencia del Auth Guard: sustitución de `Wisdom School` por `Plataforma Educativa ALSIZ` y mención de planes de homeschooling.

- **`src/components/auth/StudentLoginModal.tsx`**:
  - Se actualizó el placeholder del campo de correo electrónico de `estudiante@wisdomschool.edu` a `estudiante@alsiz.local`.

- **`src/components/dashboard/StudentDashboard.tsx`**:
  - En la barra de progreso de dominio real (línea 354), se sustituyó el texto `"Progreso hacia Perfil de Egreso y Acreditación"` por `"Progreso hacia Perfil de Egreso y Portafolio Formativo"`, suprimiendo cualquier promesa de acreditación estatal directa.

- **`src/components/landing/LandingView.tsx`**:
  - Se reemplazó la frase *"Los profesores virtuales de Wisdom School..."* por *"Los profesores virtuales de la Plataforma Educativa ALSIZ..."*.

---

### 2.2 Blindaje de Seguridad en Rutas de Estudiante
- **`src/app/avril/page.tsx` & `src/app/gael/page.tsx`**:
  - **Problema detectado:** Al navegar directamente a estas rutas, el código ejecutaba `localStorage.setItem('wisdom_auth_v2026', 'avril')` o `'gael'`, permitiendo que un usuario ingresara a las pantallas de estudiante sin autenticación por credencial.
  - **Remediación:** Se eliminó la inyección de `wisdom_auth_v2026`. Se preservó únicamente la selección de vista visual en `wisdom_current_v2026`, forzando a que cualquier navegación a pestañas protegidas exija sesión autenticada válida a través del modal de login institucional.

---

### 2.3 Suite Determinista de Aceptación
- **`scripts/test-etapa-11-acceptance.ts`**:
  - Se construyó una suite de pruebas automatizada e independiente que evalúa deterministamente 19 criterios organizados en 5 categorías:
    1. **Identidad:** Cuentas reales activas, tutela legal paterno-filial, integridad de claves foráneas, hashes scrypt, datos sin inventar.
    2. **Currículo:** Cobertura de 20 materias con agentes IA, 48 clases de Unidad 1 sin colisiones, 0 Rickrolls, 0 dominios muertos, OER con licencias válidas.
    3. **IA y Conocimiento:** 20 matrices temáticas con 11 secciones, 20 fuentes aprobadas en RAG, ProviderManager con fallback socrático, 0 secretos en frontend bundle.
    4. **Operación y Seguridad:** 13 migraciones en base de datos, hot backup y restauración probada, omisión de semillas en producción, directivas de cookies HttpOnly y SameSite=Lax.
    5. **Alcance y Legalidad:** Descargo institucional visible, control de liberación progresiva de clases posteriores, salvaguarda de aprobación humana.
- **`package.json`**:
  - Se añadió `"test:etapa11-acceptance": "tsx scripts/test-etapa-11-acceptance.ts"`.

