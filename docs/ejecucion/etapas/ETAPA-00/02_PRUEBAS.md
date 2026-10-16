# ETAPA-00 — Registro Exhaustivo de Pruebas y Comandos

## 1. Entorno de Pruebas
- **Ruta de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`
- **Shell**: PowerShell (Windows NT 10.0.26100.0)
- **Node.js**: v24.19.0
- **npm**: 11.17.0
- **Git**: 2.x
- **Rama Actual**: `etapa-00-inicializacion-y-linea-base`
- **HEAD Local**: `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad`

---

## 2. Comandos Git de Diagnóstico Ejecutados (Modo Solo Lectura)

| Comando | Propósito | Resultado Real | Código de Salida | Evidencia |
|---|---|---|---|---|
| `git rev-parse --show-toplevel` | Verificar raíz Git del proyecto | `C:/Users/Alsiz/Documents/plataforma educativa ALSIZ` | 0 (`PASÓ`) | [`evidencias/00_git_baseline.txt`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ejecucion/etapas/ETAPA-00/evidencias/00_git_baseline.txt) |
| `git branch --show-current` | Verificar rama activa | `etapa-00-inicializacion-y-linea-base` (creada desde `main`) | 0 (`PASÓ`) | [`evidencias/00_git_baseline.txt`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ejecucion/etapas/ETAPA-00/evidencias/00_git_baseline.txt) |
| `git status --short --branch` | Inspeccionar árbol y rastreo | `## etapa-00-inicializacion-y-linea-base`<br>`?? "DOCUMENTOS EKBALLO/"`<br>`?? WISDOM-SCHOOL-SHOWCASE.md`<br>`?? docs/` | 0 (`PASÓ`) | [`evidencias/00_git_baseline.txt`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ejecucion/etapas/ETAPA-00/evidencias/00_git_baseline.txt) |
| `git remote -v` | Identificar remotos y URLs | `origin https://github.com/rpmministry/plataforma-educativa-alsiz.git (fetch & push)`<br>(No existe `upstream`) | 0 (`PASÓ`) | [`evidencias/00_git_baseline.txt`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ejecucion/etapas/ETAPA-00/evidencias/00_git_baseline.txt) |
| `git log -1 --oneline` | Inspeccionar último commit | `fdaa63a fix(login): mostrar el banner verde tras iniciar sesion en iPad` | 0 (`PASÓ`) | [`evidencias/00_git_baseline.txt`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ejecucion/etapas/ETAPA-00/evidencias/00_git_baseline.txt) |
| `git diff --stat` | Comprobar cambios no preparados en archivos rastreados | Salida vacía (0 modificaciones en archivos rastreados) | 0 (`PASÓ`) | [`evidencias/03_git_diff_stat.txt`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ejecucion/etapas/ETAPA-00/evidencias/03_git_diff_stat.txt) |
| `git diff --cached --stat` | Comprobar cambios preparados (staged) | Salida vacía (0 cambios preparados) | 0 (`PASÓ`) | [`evidencias/03_git_diff_stat.txt`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ejecucion/etapas/ETAPA-00/evidencias/03_git_diff_stat.txt) |
| `git rev-parse main origin/main` | Comparar HEAD local de main con ref cacheado de origin/main | Ambos coinciden exactamente en `fdaa63a724fcbff211edca69e9828a4dfd79181a` | 0 (`PASÓ`) | [`evidencias/03_git_diff_stat.txt`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ejecucion/etapas/ETAPA-00/evidencias/03_git_diff_stat.txt) |

---

## 3. Pruebas de Compilación y Calidad de Código Ejecutadas

### Prueba PB-01: Verificación Estática de Tipos (TypeScript / Lint)
- **Comando Ejecutado**: `npm run lint` (`tsc --noEmit`)
- **Resultado Esperado**: Cero errores de tipado o discrepancias sintácticas.
- **Resultado Real**: `PASÓ` (código de salida 0). Cero advertencias ni errores emitidos por TypeScript 5.8.2.
- **Evidencia**: [`evidencias/01_npm_run_lint.txt`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ejecucion/etapas/ETAPA-00/evidencias/01_npm_run_lint.txt).

### Prueba PB-02: Compilación de Producción (Build)
- **Comando Ejecutado**: `npm run build` (`vite build && esbuild dev-server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --outfile=api-server.js`)
- **Resultado Esperado**: Generación correcta de artefactos estáticos cliente en `dist/` y servidor empaquetado en `dist/server.cjs` y `api-server.js`.
- **Resultado Real**: `PASÓ` (código de salida 0).
  - 1736 módulos transformados por Vite en 35.18 segundos.
  - Artefactos generados: `dist/index.html` (2.09 kB), `dist/assets/index-*.css` (135.14 kB), `dist/assets/index-*.js` (1.19 MB), `dist/server.cjs` (58.5 kB), `api-server.js` (57.3 kB).
  - Advertencia menor detectada: Un chunk excede 500 kB (bundle principal de 1.19 MB). Se recomienda división con imports dinámicos en etapas posteriores.
- **Evidencia**: [`evidencias/02_npm_run_build.txt`](file:///C:/Users/Alsiz/Documents/plataforma%20educativa%20ALSIZ/docs/ejecucion/etapas/ETAPA-00/evidencias/02_npm_run_build.txt).

---

## 4. Consulta de Red Remota Propuesta (No Ejecutada)
- **Operación**: `git fetch origin --dry-run` o `git fetch origin`
- **Motivo**: Para comprobar si el fork remoto en GitHub (`https://github.com/rpmministry/plataforma-educativa-alsiz.git`) ha recibido commits nuevos después del último fetch local.
- **Estado**: `BLOQUEADO / NO EJECUTADO`. En estricto cumplimiento de la regla 2.2 del prompt específico (*"Si para verificarlo se requiere una operación de red como git fetch, no la ejecutes automáticamente: documenta el comando propuesto y pide autorización"*), se deja documentado para que el usuario autorice su ejecución.
