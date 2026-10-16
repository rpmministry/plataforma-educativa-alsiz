# ETAPA-00 — Plan de Auditoría del Fork Local, Estado de Git y Recuperación

## 1. Alcance y Objetivos
- **Objetivo General**: Auditar exclusivamente la copia de trabajo creada por el usuario en `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ` y su correspondencia con `rpmministry/plataforma-educativa-alsiz`, identificar qué debe preservarse y producir una línea base auditable, sin reescribir ni reparar el código de producto.
- **Alcance Específico**:
  1. Confirmar el proyecto exacto, directorio y comandos Git en modo solo-lectura (`rev-parse`, `status`, `branch`, `remote -v`, `log -1`, `diff --stat`, `diff --cached --stat`).
  2. Diferenciar el entorno local del fork remoto (`origin`) y del repositorio original de referencia (Wisdom School).
  3. Auditar el estado funcional real (estructura, dependencias en `package.json`, lockfiles, scripts, configs de Vite y Tailwind, `server.ts`, `dev-server.ts`, `vercel.json`).
  4. Cotejar los documentos de contexto existentes (`ANALISIS-PROYECTO.md`, `resumen_proyecto.txt`, `wisdom-school-context.md`) etiquetando afirmaciones como *confirmada*, *refutada*, *obsoleta* o *pendiente*.
  5. Realizar verificación prioritaria de seguridad (variables `VITE_*`, bypass de autenticación, exposición de archivos de menores en `public/`, persistencia en `localStorage`).
  6. Establecer la línea base de pruebas no destructivas (`npm run lint`, `npm run build`).
  7. Elaborar inventario de datos académicos, lista de elementos que deben preservarse y plan de recuperación / propuesta para la Etapa 01.

## 2. Exclusiones
- No modificar código de producto ni datos académicos.
- No eliminar perfiles, materiales, archivos curriculares ni carpetas de usuario (`DOCUMENTOS EKBALLO/`).
- No ejecutar migraciones ni alterar esquemas.
- No cambiar ramas remotas ni configuración de producción.
- No hacer `commit`, `push`, `pull`, `reset`, `clean`, `stash`, `checkout` destructivo ni `rebase`.

## 3. Dependencias
- Entorno de ejecución: Node.js v24.19.0 y npm 11.17.0 sobre Windows 11.
- Repositorio Git local en `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- Dependencias locales en `node_modules`.

## 4. Riesgos Previos y Mitigaciones
- **Riesgo 1: Filtración accidental de secretos o datos de menores**: Mitigado no imprimiendo tokens, API keys, correos completos ni contraseñas en reportes o bitácoras.
- **Riesgo 2: Alteración de archivos de insumos del usuario (`DOCUMENTOS EKBALLO/`)**: Mitigado garantizando tratamiento de sólo lectura y preservación íntegra.
- **Riesgo 3: Operaciones remotas destructivas o no autorizadas**: Mitigado omitiendo `git fetch` o cualquier comando de red hacia GitHub sin autorización expresa.

## 5. Criterios de Aceptación
- [x] Carpeta local correcta y raíz Git confirmadas sin excepciones.
- [x] Remotos conocidos y registrados sin modificación.
- [x] Estado previo del árbol y cambios del usuario debidamente inventariados.
- [x] Riesgos críticos respaldados con evidencia o catalogados como hipótesis pendientes.
- [x] Documentos previos (`ANALISIS-PROYECTO.md`, `resumen_proyecto.txt`, `wisdom-school-context.md`) cotejados con el código real.
- [x] Ausencia total de cambios funcionales de producto y operaciones remotas.
- [x] Todos los archivos obligatorios de la Etapa 00 completos y verificables.
