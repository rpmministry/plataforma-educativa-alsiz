# Etapa 04 — Procedimiento Seguro de Reversión
**Sistema de diseño y estructura frontend**
*Rama:* `etapa-04-sistema-diseno-y-frontend` • *Fecha:* 2026-10-16

---

## 1. Principios de Reversión
Este procedimiento permite descartar o revertir los cambios de la **Etapa 04** de manera granular o total sin afectar el trabajo previo aprobado en las etapas 00, 01, 02 y 03 ni los archivos institucionales del usuario (`DOCUMENTOS EKBALLO/`).

---

## 2. Opción A: Reversión Completa de la Rama (Retorno a Etapa 03)

Si se desea descartar la totalidad de la etapa y regresar exactamente al estado final validado de la Etapa 03:

1. **Asegurar que no haya commits no deseados en `main`**:
   Verificar que la rama activa sea `etapa-04-sistema-diseno-y-frontend`.
2. **Cambiar a la rama base validada**:
   ```powershell
   cd "C:\Users\Alsiz\Documents\plataforma educativa ALSIZ"
   git checkout etapa-03-arquitectura-y-plan-tecnico
   ```
3. **Eliminar la rama local de la Etapa 04**:
   ```powershell
   git branch -D etapa-04-sistema-diseno-y-frontend
   ```

---

## 3. Opción B: Reversión Granular por Módulos

Si se desea revertir únicamente un componente específico manteniendo el resto del trabajo:

### Revertir exclusivamente un componente modificado (ej. `Navbar.tsx` o `index.html`):
```powershell
cd "C:\Users\Alsiz\Documents\plataforma educativa ALSIZ"
git checkout HEAD -- src/components/layout/Navbar.tsx index.html
```

### Eliminar componentes nuevos creados en la Etapa 04:
```powershell
Remove-Item -Force "src/styles/tokens.ts"
Remove-Item -Force "src/components/common/StateFeedback.tsx"
Remove-Item -Force "src/components/common/FeatureNoticeModal.tsx"
Remove-Item -Force "src/components/auth/AccessView.tsx"
Remove-Item -Force "src/components/subjects/CourseDetailView.tsx"
Remove-Item -Force "src/components/parent/ParentDashboard.tsx"
Remove-Item -Force "src/components/admin/AdminShell.tsx"
Remove-Item -Force "docs/diseno/sistema_de_diseno.md"
```

---

## 4. Comprobación Posterior a la Reversión
Tras cualquier procedimiento de reversión, verificar la estabilidad del entorno:
```powershell
npm run lint
npm run build
```
Ambos comandos deben finalizar con código de salida `0`.

