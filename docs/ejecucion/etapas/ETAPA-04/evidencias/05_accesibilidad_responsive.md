# Etapa 04 — Accesibilidad, Responsividad y Prevención de Botones Inertes
**Plataforma Educativa ALSIZ para Ekballo Church**

---

## 1. Accesibilidad (a11y) y Semántica HTML

- **Jerarquía Semántica**: Se utilizan elementos nativos (`<header>`, `<main>`, `<aside>`, `<nav>`, `<section>`, `<h1>`-`<h4>`, `<button>`).
- **Navegación por Teclado**:
  - Todos los botones interactivos poseen `type="button"` o `type="submit"` explícito.
  - Indicadores visuales de foco activos (`ring-2 ring-amber-400`).
  - Modales accesibles con cierre mediante tecla `Escape` y `role="dialog" aria-modal="true"`.
- **Lectores de Pantalla y ARIA**:
  - `role="status"` y `aria-live="polite"` en `LoadingState` y `SuccessState`.
  - `role="alert"` en `ErrorState` y `AccessDeniedState`.
  - `aria-label` en iconos y botones sin texto visible.
- **Contraste de Color (WCAG 2.1 AA)**:
  - Fondo `#0A0D11` con texto blanco `#FFFFFF` supera ratio 14:1.
  - Fondo `#121820` con acento dorado `#F59E0B` supera ratio 7:1 en encabezados.

---

## 2. Adaptabilidad Responsiva (Mobile, Tablet, Desktop)

1. **Móvil (`<640px`)**:
   - Barra de navegación inferior fija (`MobileBottomNav`) con áreas de toque superiores a 44x44px.
   - Apilamiento vertical de tarjetas y tablas con desplazamiento horizontal contenido (`overflow-x-auto`).
2. **Tableta / iPad (`640px - 1024px`)**:
   - Detección táctil mediante `useTouchTablet`.
   - El chat socrático y las herramientas de la lección se apilan debajo del contenido principal para evitar columnas comprimidas ilegibles.
   - Navegación por deslizamiento horizontal (`touch-scroll-x`).
3. **Escritorio (`>=1024px`)**:
   - Barra lateral completa (`Sidebar`) con separación visual entre el espacio de estudio del estudiante y la gestión ministerial.
   - Distribución en rejilla de 3 y 4 columnas en dashboards y catálogos de materias.

---

## 3. Protocolo de "Cero Botones Inertes"

Para cumplir con la directriz estricta del manual:
> *"No dejes botones con apariencia de acción sin comportamiento: implementa respuesta visual comprensible o modal indicativo de 'Función en desarrollo — Planificada para la Etapa XX'"*.

Se implementó el componente `FeatureNoticeModal` en:
- Descarga de Sílabos y Bitácoras oficiales en PDF (planificada para Etapa 07).
- Compartir planes por enlace seguro y firmas digitales (planificada para Etapa 05/06).
- Creación de nuevos programas y exportación de auditoría legal (planificada para Etapa 05).
- Re-indexación de la base de conocimiento vectorial RAG (planificada para Etapa 06).

