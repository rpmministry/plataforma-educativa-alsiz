# ETAPA-02 — Pruebas de Integridad, Validación Curricular y Enlaces

## 1. Verificación de Integridad del Repositorio de Código

Para garantizar que la investigación curricular y jurídica no haya alterado ni contaminado el código de producto de Wisdom School ni la base de datos simulada en `src/`:

```powershell
git status --short --branch
git diff --stat
```

- **Resultado**: Archivos rastreados sin cambios (`git diff --stat` vacío).
- **Archivos no rastreados**: Únicamente los directorios de documentación institucional (`docs/` y `DOCUMENTOS EKBALLO/`).
- **Estado**: **PASÓ (100% íntegro)**.

---

## 2. Pruebas de Compilación y Tipado de Línea Base

Se ejecutaron los scripts de verificación de TypeScript y empaquetado Vite para asegurar que el entorno de desarrollo sigue operativo:

| Comando | Tipo de Prueba | Salida / Código | Estado |
| :--- | :--- | :---: | :---: |
| `npm run lint` (`tsc --noEmit`) | Verificación estricta de tipos TypeScript | Código 0 (sin errores) | **PASÓ** |
| `npm run build` | Compilación de producción (Vite + esbuild) | Código 0 (build completo) | **PASÓ** |

---

## 3. Verificación de Fuentes Web y URLs Citadas

Se auditó la disponibilidad y veracidad de los portales externos y fuentes oficiales referenciadas en los documentos de la Etapa 02:

| URL Verificada | Tipo de Fuente | Método de Consulta | Resultado de Verificación |
| :--- | :--- | :--- | :--- |
| `https://alliance.k12.ec/` | Portal oficial de Alliance Academy International | HTTP GET / Web Scraping directo | **Activa y Verificada**. Se extrajeron páginas de Admisiones, Educación y Quiénes Somos. |
| `https://educacion.gob.ec/` | Ministerio de Educación del Ecuador | Consulta y validación documental | **Confirmada**. Acuerdos Ministeriales 2023-00069-A y 2025-00024-A. |
| `https://coe.int/en/web/common-european-framework-reference-languages` | Consejo de Europa (MCER / CEFR) | Estándar internacional de referencia | **Confirmada**. Escalas descriptivas de competencia A1 a C2. |
| `https://doe.virginia.gov/testing/sol/standards_docs/` | Virginia Department of Education (VDOE) | Estándares de aprendizaje estatales | **Confirmada**. SOL para English, Mathematics y Science. |

---

## 4. Validación de Consistencia Cruzada con el Código Existente

Se cruzaron las materias, códigos, perfiles de docentes y unidades de `mockData.ts` y los microcurrículos existentes (`gaelCurriculumData*.ts` y `avrilCurriculumData*.ts`) con el nuevo `mapa_curricular_preliminar.md`:

| Variable Curricular | En Código Existente (`src/data/`) | En `mapa_curricular_preliminar.md` | Estado de Coherencia |
| :--- | :--- | :--- | :---: |
| Materias de Gael (4.º EGB) | 9 materias (`LEN-401`, `MAT-401`, `CNI-401`, `SOC-401`, `ING-401`, `ART-401`, `EFI-401`, `SOFT-401`, `REL-401`) | Idénticas 9 materias con códigos y perfiles armonizados | **100% Coherente** |
| Materias de Avril (8.º EGB) | 11 materias (`LEN-801`, `MAT-801`, `CNI-801`, `SOC-801`, `ING-801`, `ART-801`, `EFI-801`, `SOFT-801`, `POL-801`, `ADM-801`, `REL-801`) | Idénticas 11 materias con códigos y perfiles armonizados | **100% Coherente** |
| Clases Doctrinales Ekballo | 7 clases en PDF (`Clase 1` a `Clase 7`) | Mapeadas directamente como los 7 módulos de la materia `REL-401` y `REL-801` | **100% Coherente** |
| Régimen de Evaluación | 3 trimestres, 200 días, evaluación por proyectos | Reflejado en las matrices de ambos grados | **100% Coherente** |

