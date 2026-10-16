# ETAPA-01 — Plan de Auditoría de Repositorios de Referencia y Requisitos del Producto

## 1. Alcance
- **Objetivo General**: Decidir con base en evidencia qué recursos externos y arquitecturas conviene adoptar, y transformar la visión integral de la **Plataforma Educativa ALSIZ para Ekballo Church** en un pliego formal de requisitos priorizados (`P0`, `P1`, `P2`) con criterios de aceptación comprobables, sin integrar código de producto en esta etapa.
- **Repositorios Externos a Auditar**:
  1. `TobbenTT/colegio`
  2. `Zethearc/edu_ai`
  3. `tonalliGarcia/IAEducation`
  4. `juansebag31-blip/academia-ia-educativa`
  5. `THU-MAIC/OpenMAIC`
  6. `StudentTraineeCenter/edu-agent`
  7. `hqanhh/EduGPT`
  8. `DHRUVvkdv/teaching-assistant`
  9. `A-R007/Multi-Agent-Study-Assistant`
  10. `GarethManning/education-agent-skills`
  11. GitHub Topic: `virtual-classroom` (`netless-io/flat`, `classroomio`, `edrys`)
  12. Fork local objetivo (`rpmministry/plataforma-educativa-alsiz`) y código de origen Wisdom School.
- **Insumos Institucionales a Incorporar**:
  - `DOCUMENTOS EKBALLO/Investigación Educativa para Ekballo Church.docx` (Marco regulatorio ecuatoriano MINEDUC-2023-00069-A, segmentación de usuarios y estudio de viabilidad).
  - `DOCUMENTOS EKBALLO/` (Clases 1 a 7 doctrinales y pack de marca).

## 2. Objetivos Específicos
1. Inspeccionar licencia, mantenimiento, stack, arquitectura y dependencias de cada recurso externo.
2. Evaluar críticamente `OpenMAIC` como entorno interactivo y determinar su viabilidad técnica en relación con el stack React/Vite/Express de ALSIZ.
3. Producir la taxonomía completa de requisitos categorizados (Funcionales, No Funcionales, Académicos, Operativos) con trazabilidad `P0`/`P1`/`P2`, dependencias y fases.
4. Mapear las capacidades actuales de Wisdom School frente a las capacidades deseadas para Ekballo Church.
5. Elaborar la lista de decisiones que requieren validación humana del responsable técnico.
6. Construir un backlog sin tareas duplicadas para las etapas posteriores.

## 3. Exclusiones
- No modificar ni una sola línea de código funcional en `src/`, `server.ts` ni configs.
- No clonar ni ejecutar código no probado en el entorno principal de la aplicación.
- No instalar dependencias ni alterar `package.json` o lockfiles.
- No realizar commits ni pushes remotos.

## 4. Dependencias y Precedencia
- Informe de cierre formal de la `ETAPA-00` aprobado y verificado.
- Disponibilidad de red de consulta para APIs públicas de GitHub.
- Conservación íntegra de la carpeta `DOCUMENTOS EKBALLO/`.

## 5. Criterios de Aceptación
- [x] Toda recomendación sobre repositorios externos está fundamentada en licencias, código y arquitectura reales.
- [x] Ningún repositorio se califica como "integrable" únicamente por su README o descripción.
- [x] Evaluación específica y detallada sobre la viabilidad de `OpenMAIC`.
- [x] Requisitos clasificados en Funcionales, No Funcionales, Académicos y Operativos con identificador único, prioridad y criterios verificables.
- [x] Separación clara entre hechos demostrados, inferencias e hipótesis/preguntas abiertas.
- [x] Se mantienen inalterados los archivos de producto y datos académicos.
- [x] Marco documental obligatorio de la Etapa 01 completo en `docs/ejecucion/etapas/ETAPA-01/`.

