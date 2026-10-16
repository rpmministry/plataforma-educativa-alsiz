# Etapa 04 — Riesgos Residuales, Decisiones Técnicas y Alternativas Descartadas
**Sistema de diseño y estructura frontend**
*Rama:* `etapa-04-sistema-diseno-y-frontend` • *Fecha:* 2026-10-16

---

## 1. Decisiones Técnicas Clave

| # | Decisión Técnica | Justificación |
|---|---|---|
| **D1** | **Monograma SVG Vectorial Nativo en lugar de PNG** | Se implementó el vector SVG de la letra "E" en gradiente dorado dentro de `SchoolLogo.tsx` en vez de cargar una imagen de mapa de bits. Esto elimina parpadeos de carga (FOUC), reduce el peso del bundle y asegura escalabilidad nítida en pantallas Retina y 4K. |
| **D2** | **Navegación Unificada en una Sola SPA (React State / NavigationTab)** | Se mantuvo el patrón de navegación basado en pestañas gestionadas por `SchoolContext.tsx` y sincronizadas con scroll/historial, en lugar de introducir react-router de forma prematura. Esto evita romper los flujos de login y la compatibilidad táctil con iPad. |
| **D3** | **Ampliación de `UserRole` sin Forzar RBAC en Cliente** | Se definieron formalmente los 4 roles del sistema (`student`, `representative`, `teacher`, `admin`), permitiendo su conmutación transparente en la vista `AccessView.tsx`. La autorización criptográfica mediante JWT/Cookies HttpOnly se delega a la Etapa 05 (backend) conforme al ADR-002. |
| **D4** | **Componente Reutilizable `FeatureNoticeModal`** | En lugar de deshabilitar botones o dejar eventos vacíos (`onClick={() => {}}`), se creó un diálogo informativo accesible que notifica al usuario la etapa exacta en la que se entregará la persistencia o servicio correspondiente. |

---

## 2. Alternativas Descartadas

| Alternativa Descartada | Razón del Descarte |
|---|---|
| **Reescribir la aplicación en Next.js App Router** | Incompatible con el stack local en ejecución y descartado expresamente en ADR-001 y Etapa 01 por complejidad innecesaria y riesgo de regresión en las lecciones interactivas. |
| **Usar una librería externa pesada de componentes (ej. MUI o Chakra UI)** | Aumentaría drásticamente el tamaño del bundle cliente y entraría en conflicto con Tailwind CSS v4. Se prefirió codificar componentes Tailwind modulares y ligeros. |
| **Simular persistencia en backend falso con MSW** | Crearía una falsa ilusión de almacenamiento en servidor. Se prefirió mantener almacenamiento en memoria con resiliencia en LocalStorage claramente rotulado con `DevelopmentBadge`. |

---

## 3. Riesgos Residuales y Mitigaciones para la Etapa 05

| Riesgo Residual | Impacto | Mitigación Planificada para Etapa 05 |
|---|---|---|
| La sesión de usuario y las notas aún dependen de memoria / LocalStorage | Medio | En la Etapa 05 se implementará el esquema relacional (SQLite / PostgreSQL) y endpoints REST de persistencia. |
| Descarga de sílabos y bitácoras en PDF requiere consolidar el generador de reportes | Bajo | El diseño de `CourseDetailView` y `ParentDashboard` ya cuenta con los contratos y botones listos para conectarse al backend de PDF en Etapa 07. |

