# Etapa 04 — Plan de Ejecución
**Sistema de diseño y estructura frontend**
*Rama:* `etapa-04-sistema-diseno-y-frontend` • *Estado:* Completado • *Fecha:* 2026-10-16

---

## 1. Alcance
- Auditar y transformar la interfaz de usuario existente en `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ` adoptando la identidad oficial de **Ekballo Church (ALSIZ)**.
- Diseñar y codificar el sistema central de tokens de diseño (`src/styles/tokens.ts` y `docs/diseno/sistema_de_diseno.md`).
- Implementar la arquitectura de navegación SPA para 4 roles: Estudiante, Representante / Familia, Docente y Administrador.
- Construir y enrutar las 8 pantallas prioritarias del producto: `home`, `access`, `space`, `subjects`, `subject-detail`, `classes`, `parent` y `admin`.
- Proporcionar componentes de retroalimentación de estado (`LoadingState`, `EmptyState`, `ErrorState`, `AccessDeniedState`, `SuccessState` y `DevelopmentBadge`).
- Erradicar botones inertes mediante `FeatureNoticeModal` para acciones programadas en etapas posteriores.
- Garantizar accesibilidad (WCAG 2.1 AA), responsividad (móvil, tableta/iPad y escritorio) y compilación estricta de TypeScript y Vite.

---

## 2. Objetivos
1. Consolidar una experiencia visual sobria, moderna e institucional basada en los vectores oficiales de Ekballo Church (`#0A0D11`, dorado `#E59000` / `#F59E0B`, plata `#BCBEBE`).
2. Preservar la totalidad de microcurrículos estructurados, devocionales y lecciones interactivas para Avril y Gael.
3. Asegurar que ningún dato de desarrollo se presente como información de producción mediante el uso de etiquetas explícitas.
4. Mantener cero errores de tipado en TypeScript (`tsc --noEmit`) y compilar limpiamente los artefactos de producción (`npm run build`).

---

## 3. Exclusiones
- No se conecta aún la persistencia a base de datos relacional (SQLite / PostgreSQL), la cual corresponde a la **Etapa 05**.
- No se integra el pipeline de embeddings ni la indexación semántica RAG en servidor, correspondiente a la **Etapa 06**.
- No se emiten certificaciones oficiales con validez legal ni firmas electrónicas biométricas definitivas, previstas para la **Etapa 07**.

---

## 4. Dependencias
- Aprobación formal de las etapas previas: `ETAPA-00` (Auditoría), `ETAPA-01` (Requisitos), `ETAPA-02` (Currículo y Legal) y `ETAPA-03` (Arquitectura C4 y ADRs).
- Paquete oficial de logotipos ubicado en `DOCUMENTOS EKBALLO/EKBALLO_logo_pack/`.
- Stack tecnológico: React 19, TypeScript 5.8, Vite 6, Tailwind CSS 4, Lucide React.

---

## 5. Riesgos Previos y Mitigaciones
| Riesgo Previo | Nivel | Mitigación Implementada |
|---|---|---|
| Colisión o pérdida de microcurrículos estructurados de Wisdom School | Alto | Auditoría previa y preservación de `mockData.ts`, `microcurriculumSchedule.ts` y componentes de clase. |
| Incompatibilidad de botones sin backend ("botones muertos") | Medio | Implementación mandatoria de `FeatureNoticeModal` con información de la hoja de ruta. |
| Problemas de contraste en temas oscuros | Medio | Validación con WCAG 2.1 AA asegurando ratios superiores a 7:1 en encabezados. |
| Distorsión del layout en pantallas táctiles de iPad | Medio | Preservación de hooks `useTouchTablet` y apilamiento ergonómico del tutor IA bajo la lección. |

---

## 6. Criterios de Aceptación
1. `index.html` y `SchoolLogo.tsx` reflejan fielmente la identidad oficial de Ekballo Church.
2. `tokens.ts` centraliza colores, tipografías, espaciados, radios, sombras, estados y breakpoints.
3. Las 8 pantallas prioritarias son completamente navegables y funcionales.
4. Todo botón con acción programada para etapas futuras muestra una respuesta comprensible.
5. Los datos de prueba muestran el distintivo visible `DevelopmentBadge`.
6. `npm run lint` y `npm run build` pasan con código de salida 0.
