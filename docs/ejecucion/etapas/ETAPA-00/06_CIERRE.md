# ETAPA-00 — Informe de Cierre de Etapa: Auditoría del Fork Local, Estado de Git y Recuperación

## 1. Resumen Ejecutivo
Se ejecutó la **Etapa 00: Auditoría del fork local, estado de Git y recuperación** de la **Plataforma Educativa ALSIZ para Ekballo Church** en estricto apego al manual de liderazgo técnico.

Se constató que el directorio de trabajo local en `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ` es un fork del proyecto original Wisdom School, vinculado formalmente al repositorio remoto `https://github.com/rpmministry/plataforma-educativa-alsiz.git`. El estado de los archivos rastreados en Git está 100% limpio (0 diferencias en `git diff`), y los insumos institucionales de Ekballo Church (`DOCUMENTOS EKBALLO/` y `WISDOM-SCHOOL-SHOWCASE.md`) se encuentran intactos.

La plataforma compila en producción sin errores (`vite build` + `esbuild` -> salida código 0) y supera la verificación estática de tipos (`tsc --noEmit` -> salida código 0). Se estructuró el sistema de gobernanza en `docs/ejecucion/` con evidencias reproducibles y sin exponer secretos.

---

## 2. Identificación del Entorno y Estado de Git

- **Ruta de Trabajo Confirmada**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Comprobación de Raíz Git (`rev-parse`)**: `C:/Users/Alsiz/Documents/plataforma educativa ALSIZ`
- **Rama Local Activa**: `etapa-00-inicializacion-y-linea-base` (bifurcada limpiamente desde `main`)
- **HEAD Local**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad`
- **Remoto Oficial Identificado**: `origin` -> `https://github.com/rpmministry/plataforma-educativa-alsiz.git` (fetch y push). No existe remoto `upstream` configurado.
- **Estado del Árbol de Trabajo**:
  - `git diff --stat`: Salida vacía (cero modificaciones no guardadas).
  - `git diff --cached --stat`: Salida vacía (cero cambios en staging).
  - Elementos no rastreados identificados y preservados: `DOCUMENTOS EKBALLO/` y `WISDOM-SCHOOL-SHOWCASE.md`.
- **Comparación Local vs. Remoto**:
  - En la referencia localmente cacheada, `main` y `origin/main` apuntan al mismo commit (`fdaa63a`).
  - Para verificar si existen commits posteriores en el repositorio de GitHub, se requiere `git fetch origin`. En apego a la regla 2.2, **no se ejecutó automáticamente** y se solicita autorización expresa.

---

## 3. Mapa de Arquitectura y Flujos Reales

```
                         ARQUITECTURA EFECTIVA EN DISCO
                         
  ┌────────────────────────────────────────────────────────────────────────┐
  │                           NAVEGADOR / CLIENTE                          │
  │                                                                        │
  │  React 19 + TypeScript + Vite 6 + Tailwind CSS 4                        │
  │  • main.tsx -> App.tsx (ErrorBoundary -> SchoolProvider -> Vistas)     │
  │  • Navegación basada en estado: activeTab ('home'|'space'|'classes'...) │
  │  • Persistencia: localStorage (claves wisdom_*_v2026)                  │
  │  • aiService.ts / ttsService.ts                                        │
  └──────────────────┬─────────────────────────────────┬───────────────────┘
                     │ Llamadas HTTP                   │ Fallback contingente
                     │ (/api/ai/*, /api/students/*)    │ (Llamadas directas con
                     ▼                                 │ VITE_* - RIESGO)
  ┌────────────────────────────────────────────────┐   │
  │              BACKEND (server.ts)               │   ▼
  │                                                │ ┌─────────────────────┐
  │  Express 4 Monolítico (Local: dev-server.ts    │ │ API Pública Gemini  │
  │  o Vercel serverless vía api-entry.js)         │ │ / OpenRouter        │
  │  • Carga variables de .env / .env.local        │ └─────────────────────┘
  │  • GET  /api/health (estado de proveedores)    │
  │  • POST /api/ai/guide-content (guías v4)       │
  │  • POST /api/ai/teacher-chat (tutoría)         │
  │  • POST /api/ai/reexplain (pedagogía)          │
  │  • POST /api/students/upload-avatar            │
  │  • GET  /students/* (archivos públicos)        │
  └──────────────────┬─────────────────────────────┘
                     │ Orquestación con claves privadas
                     ▼
  ┌────────────────────────────────────────────────┐
  │           SERVICIOS IA EXTERNOS                │
  │  DeepSeek API -> OpenRouter -> Google Gemini   │
  └────────────────────────────────────────────────┘
```

---

## 4. Matriz de Funcionalidades del Sistema

| Funcionalidad | Estado de Implementación | Conexión con Interfaz | Evidencia en Código |
|---|---|---|---|
| **Landing & Presentación** | `OPERATIVA Y PROBADA` | Conectada (`LandingView.tsx`) | Selector de estudiante, vista previa de tutor IA. |
| **Inicio de Sesión y Perfiles** | `ROTA / VULNERABLE` | Conectada (`StudentLoginModal.tsx`) | Bypass en `SchoolContext.tsx:382` permite acceso con solo ingresar el nombre de usuario. |
| **Dashboard del Estudiante** | `OPERATIVA Y PROBADA` | Conectada (`StudentDashboard.tsx`) | Saludo temático, devocional del día, selector de día escolar. |
| **Aula Virtual / Clases Diarias** | `OPERATIVA Y PROBADA` | Conectada (`DailyClassView.tsx`) | 4 fases: Contenido, Laboratorio (simuladores PhET/videos), Taller, Evidencia. |
| **Tutor IA Socrático** | `OPERATIVA Y PROBADA` | Conectada (`AITeacherDrawer.tsx`) | Conectado a `/api/ai/teacher-chat` con cascada en servidor. |
| **Guías Didácticas Imprimibles** | `OPERATIVA Y PROBADA` | Conectada (`guideGenerator.ts`) | Generación en cliente en HTML/PDF con explicación y preguntas de 3 niveles. |
| **Registro de Actividades** | `EXISTE SIN PRUEBA AUTOMATIZADA`| Conectada (`ActivitiesView.tsx`) | Persiste checkboxes en `localStorage`. |
| **Portafolio / Revisión de Trabajos (`WorksView`)** | `NO CONECTADA (HUÉRFANA)` | **Desconectada** | No existe en `NavigationTab` ni en el menú de la aplicación. |
| **Audio / Google TTS** | `INCOMPLETA` | Parcialmente conectada (`ttsService.ts`) | Requiere credenciales de Google TTS; usa Web Speech API como fallback. |
| **Envío de PIN por Correo** | `EXISTE SIN PRUEBA EN VIVO` | Conectada (`server.ts:144`) | Requiere configuración de servidor SMTP (`EMAIL_USER`, `EMAIL_PASS`). |

---

## 5. Inventario de Datos Académicos y Materiales

### Datos de Alumnos Base (Wisdom School)
- **Avril (8.º EGB Superior)**:
  - 11 Asignaturas con microcurrículo estructurado (`src/data/avrilCurriculumDataPart1.ts` a `Part4.ts`).
  - 23 Clases diarias programadas (`src/data/dailyClassesAvril.ts`).
  - Plan Escolar en PDF: `public/Plan Escolar 2026-2027 - Avril (8vo de Básica).pdf`.
- **Gael (4.º EGB Elemental)**:
  - 8 Asignaturas con microcurrículo estructurado (`src/data/gaelCurriculumData.ts` a `Part4.ts`).
  - 20 Clases diarias programadas (`src/data/dailyClassesGael.ts`).
  - Plan Escolar en PDF: `public/Plan Escolar 2026-2027 - Gael (4to de Básica).pdf`.

### Materiales Institucionales de Ekballo Church (`DOCUMENTOS EKBALLO/`)
- **Curso de Discipulado / Formación Ministerial (7 Clases en PDF)**:
  - `Clase 1 Historia de Ekballo Church.pdf`
  - `Clase 2 Doctrina Ekballo Church.pdf`
  - `Clase 3 Mi Nueva Identidad.pdf`
  - `Clase 4 Nuestra Cultura.pdf`
  - `Clase 5 Lo Que Esperamos De Cada Miembro.pdf`
  - `Clase 6 El Espíritu Santo Y Sus Dones .pdf`
  - `Clase 7 Nuestro Corazón.pdf`
- **Branding Completo (`EKBALLO_logo_pack`)**:
  - Logotipos para fondo claro y oscuro (SVG y PNG de alta resolución).
  - Favicons, manifest web y snippets HTML para `<head>`.
  - Banners para redes sociales y monogramas.
- **Investigación y Viabilidad**:
  - `Investigación Educativa para Ekballo Church.docx` (Estudio integral de viabilidad y marco normativo ecuatoriano según Acuerdo Ministerial 2023-00069-A).

---

## 6. Lista de Elementos que Deben Preservarse Estrictamente

1. Carpeta de insumos `DOCUMENTOS EKBALLO/` y archivo `WISDOM-SCHOOL-SHOWCASE.md`.
2. Todo el árbol curricular existente en `src/data/` (microcurrículo, clases diarias y contenidos pedagógicos).
3. Mejoras recientes de responsividad táctil y modo horizontal para iPad (`fdaa63a`, `fda962a`, `ed7a4b7`).
4. Generador de guías didácticas imprimibles v4.0 (`src/utils/guideGenerator.ts` y almacén de guías).
5. Rama `main` en Git, manteniéndola protegida e inalterada.

---

## 7. Plan de Recuperación y Propuesta para la Etapa 01

### Plan de Recuperación de Estabilidad (Prerrequisitos Técnicos)
1. **Corregir el bypass de autenticación**: Modificar `src/context/SchoolContext.tsx:382` para que la contraseña o el PIN sean estrictamente obligatorios.
2. **Eliminar el riesgo de filtración de claves**: Desacoplar las variables `VITE_GEMINI_API_KEY` y `VITE_OPENROUTER_API_KEY` de `src/services/aiService.ts`, canalizando todas las solicitudes a través de `server.ts`.
3. **Desactivar el destructor de memoria**: Retirar el bloque `localStorage.clear()` en `mockData.ts:15-23` para evitar pérdida involuntaria de datos.

### Propuesta de Alcance para la ETAPA-01
Para transformar formalmente la plataforma hacia **Ekballo Church**, se propone estructurar la **Etapa 01** en dos vertientes a elección del responsable:
- **Opción 1: Identidad Visual y Branding de Ekballo Church**:
  - Reemplazar isotipos, favicons y logotipos por los assets de `DOCUMENTOS EKBALLO/EKBALLO_logo_pack/`.
  - Actualizar el título, meta tags y manifiesto web (`index.html`, `metadata.json`).
  - Adaptar la paleta de colores corporativos de Ekballo Church en Tailwind CSS.
- **Opción 2: Integración Curricular del Curso de Discipulado Ekballo**:
  - Estructurar las 7 clases doctrinales de Ekballo Church en el modelo de datos de la plataforma (`DailyClass` / `Subject`).
  - Configurar las lecturas, objetivos, preguntas socráticas y actividades de cada una de las 7 clases.

---

## 8. Resultado Final de la Etapa 00
**Estado**: `APROBADA: lista para revisión humana`

Se han cumplido todos los criterios de auditoría de línea base sin modificar código de producto ni realizar operaciones destructivas. Quedamos a la espera de la validación expresa del responsable para proceder con la etapa siguiente.
