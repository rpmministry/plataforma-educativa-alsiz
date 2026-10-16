# ETAPA-00 — Riesgos Priorizados, Decisiones Técnicas y Cotejo de Documentos

## 1. Tabla de Riesgos Críticos Priorizados

| ID | Área | Descripción y Mecanismo | Evidencia (Archivo / Línea) | Nivel de Riesgo | Recomendación Técnica |
|---|---|---|---|---|---|
| **RC-01** | Autenticación | **Bypass de credenciales en inicio de sesión**: La condición `if` incluye `cleanId === found.id.toLowerCase()`. Si el usuario ingresa el ID del estudiante (ej. "avril"), la validación evalúa como verdadera sin importar qué contraseña o PIN se escriba (incluso vacía). | [`src/context/SchoolContext.tsx#L382`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/src/context/SchoolContext.tsx#L382) | **CRÍTICO** | Eliminar la condición de coincidencia de ID simple; exigir obligatoriamente `password` o `pinCode` válido. |
| **RC-02** | Privacidad de Menores | **Datos personales y expedientes en repositorio y estáticos**: Existen nombres, correos de menores y planes escolares en PDF versionados en Git. Además, la subida de avatares guarda imágenes directamente en `public/students/<id>.png`, servidas públicamente sin autenticación. | [`public/students/`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/public/students/)<br>[`server.ts#L97,L101-125`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/server.ts#L97)<br>[`src/data/mockData.ts#L28-35`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/src/data/mockData.ts#L28-L35) | **ALTO** | Anonimizar datos de prueba, desvincular fotos reales del repo público y proteger la ruta `/students` con autenticación. |
| **RC-03** | Secretos / API Keys | **Llamadas directas de cliente con variables `VITE_*`**: Aunque el flujo primario usa el backend (`/api/ai/*`), el código mantiene una Fase B de fallback que lee `import.meta.env.VITE_GEMINI_API_KEY` y `VITE_OPENROUTER_API_KEY` directamente en el navegador, inyectándolas en el bundle si se definen en `.env`. | [`src/services/aiService.ts#L509-L510`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/src/services/aiService.ts#L509-L510)<br>[`src/services/aiService.ts#L585`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/src/services/aiService.ts#L585) | **ALTO** | Eliminar las llamadas cliente directas a proveedores externos; todas las solicitudes deben pasar por el proxy seguro de `server.ts`. |
| **RC-04** | Integridad de Datos | **Persistencia volátil en `localStorage` y "Destructor de Memoria"**: Todo el avance, tareas y rutas viven exclusivamente en el navegador del cliente. Además, existe un bloque de código que ejecuta `localStorage.clear()` si `app_reset_version` cambia. Si el alumno limpia cookies o usa navegación privada, pierde todo el año lectivo. | [`src/data/mockData.ts#L15-L23`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/src/data/mockData.ts#L15-L23)<br>[`src/context/SchoolContext.tsx#L327-L347`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/src/context/SchoolContext.tsx#L327-L347) | **ALTO** | Implementar persistencia estructurada en base de datos o almacenamiento backend antes de producción. |
| **RM-01** | Componentes Huérfanos | **Módulo `WorksView` desconectado**: El portafolio de evidencias y revisión de tareas con IA (`WorksView.tsx`) no está importado ni incluido en el tipo `NavigationTab` ni en las barras de navegación. | [`src/components/works/WorksView.tsx`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/src/components/works/WorksView.tsx)<br>[`src/types/index.ts#L366-L372`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/src/types/index.ts#L366-L372) | **MEDIO** | Decidir si se integrará a la plataforma de Ekballo Church o se retirará formalmente. |
| **RM-02** | Residuos de Arquitectura | **Archivos residuales de Next.js y doble lockfile**: Coexisten `next-env.d.ts`, carpetas en `src/app/` y lockfiles simultáneos de `bun.lock` y `package-lock.json`. | [`next-env.d.ts`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/next-env.d.ts)<br>[`src/app/`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/src/app/) | **BAJO** | Limpieza higiénica en etapa de mantenimiento. |

---

## 2. Tabla de Cotejo: Documentación Previa vs. Código Real

| Documento | Afirmación / Descripción | Código Real Observado | Estado / Calificación | Justificación |
|---|---|---|---|---|
| `ANALISIS-PROYECTO.md` | "El README describe un `vercel.json` que NO existe" | `vercel.json` existe en la raíz del proyecto y contiene configuración activa de builds y routes. | **REFUTADA** | El archivo fue creado/reincorporado en el repositorio (13 líneas, version 2). |
| `ANALISIS-PROYECTO.md` | "Endpoints de IA en server.ts (/api/profesor, /api/ai/teacher-chat, etc.): NADIE las llama desde src/ (código muerto)" | `src/services/aiService.ts` llama activamente a `/api/ai/guide-content`, `/api/ai/reexplain`, `/api/ai/teacher-chat` mediante `tryServerTeacherHierarchy`. | **OBSOLETA** | Commits recientes (`594ee0b`, `347f098`) conectaron el frontend con los endpoints del servidor. |
| `ANALISIS-PROYECTO.md` | "Bypass de autenticación en login" | En `SchoolContext.tsx:382`, la condición `cleanId === found.id.toLowerCase()` permite entrar con cualquier clave. | **CONFIRMADA** | La vulnerabilidad está plenamente presente en el código activo. |
| `ANALISIS-PROYECTO.md` | "WorksView.tsx huérfano (importado por nadie)" | No existe ningún `import` de `WorksView` en todo `src/`, y `NavigationTab` no contiene `'works'`. | **CONFIRMADA** | El componente existe pero no tiene ruta ni llamador en la interfaz. |
| `ANALISIS-PROYECTO.md` | "Destructor de memoria fantasma: localStorage.clear()" | `src/data/mockData.ts:15-23` ejecuta `localStorage.clear()` si no coincide `app_reset_version`. | **CONFIRMADA** | Presente y activo en el arranque. |
| `resumen_proyecto.txt` | "Replanificación de inicio a Lunes 07 de Septiembre 2026 y +4 días" | `src/utils/schoolCalendar.ts` y `mockData.ts` ya tienen configurado el 07-Sept-2026 como fecha base de inicio. | **CONFIRMADA** | Los cambios del resumen fueron aplicados previamente en el fork. |
| `wisdom-school-context.md` | "Arquitectura y dump integral del proyecto" | Útil como referencia histórica pero desactualizado respecto a los últimos commits táctiles y endpoints de servidor. | **OBSOLETA** | Requiere cotejo permanente con el código real antes de asumir su vigencia. |

---

## 3. Elementos que Deben Preservarse Estrictamente

1. **Insumos Institucionales de Ekballo Church (`DOCUMENTOS EKBALLO/`)**:
   - `Clase 1 Historia de Ekballo Church.pdf`
   - `Clase 2 Doctrina Ekballo Church.pdf`
   - `Clase 3 Mi Nueva Identidad.pdf`
   - `Clase 4 Nuestra Cultura.pdf`
   - `Clase 5 Lo Que Esperamos De Cada Miembro.pdf`
   - `Clase 6 El Espíritu Santo Y Sus Dones .pdf`
   - `Clase 7 Nuestro Corazón.pdf`
   - `Investigación Educativa para Ekballo Church.docx`
   - Pack de logotipos, monogramas y favicons en `EKBALLO_logo_pack/` (PNG y SVG).
2. **Currículo y Datos Académicos Base**:
   - Microcurrículo completo en `src/data/avrilCurriculumDataPart*.ts` y `src/data/gaelCurriculumData*.ts`.
   - Clases diarias en `src/data/dailyClassesAvril.ts` y `src/data/dailyClassesGael.ts`.
   - Contenido pedagógico y rúbricas en `src/data/pedagogicalContent.ts`.
3. **Mejoras Ergonómicas y de Estabilidad Recientes**:
   - Adaptaciones para iPad y tablets horizontales (`fdaa63a`, `fda962a`, `ed7a4b7`).
   - Sistema de guías didácticas impresas v4.0 conectadas al chat contextual (`594ee0b`, `347f098`).
   - Generación de PDF determinista en cliente (`src/utils/guideGenerator.ts`).
