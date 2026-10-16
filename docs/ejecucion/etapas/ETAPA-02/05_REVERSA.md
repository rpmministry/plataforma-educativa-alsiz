# ETAPA-02 — Plan de Reversa y Contingencia

## 1. Alcance de la Reversibilidad
La **Etapa 02** ha generado exclusivamente documentación curricular, comparativa de marcos pedagógicos, directrices de bilingüismo, dictámenes jurídico-regulatorios y evidencias documentales en Markdown. No se han aplicado migraciones de base de datos ni modificaciones al código fuente funcional en `src/`.

---

## 2. Procedimiento de Reversa Inmediata

Si el responsable técnico o el líder institucional de Ekballo Church decide descartar o replantear los documentos generados en esta etapa:

### Paso 1: Eliminar los documentos curriculares creados
```powershell
Remove-Item -Recurse -Force "docs/curriculum"
```

### Paso 2: Eliminar la carpeta de la etapa en ejecución
```powershell
Remove-Item -Recurse -Force "docs/ejecucion/etapas/ETAPA-02"
```

### Paso 3: Retornar a la rama anterior o descartar la rama de etapa
```powershell
git checkout etapa-01-auditoria-repositorios-y-requisitos
git branch -D etapa-02-curriculo-bilinguismo-y-legal
```

---

## 3. Impacto de la Reversa
- **Integridad del Software**: Nulo. El código en TypeScript, Vite, Tailwind CSS y Node.js permanece exactamente en el commit base `fdaa63a`.
- **Preservación de Insumos**: Los archivos no rastreados `DOCUMENTOS EKBALLO/` y `WISDOM-SCHOOL-SHOWCASE.md` permanecen intactos e inalterados.

