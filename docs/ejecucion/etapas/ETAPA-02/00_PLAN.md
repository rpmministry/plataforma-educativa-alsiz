# ETAPA-02 — Plan de Currículo, Bilingüismo y Viabilidad Jurídica

## 1. Alcance y Contexto de la Etapa
- **Objetivo General**: Definir el marco curricular institucional de referencia y documentar exhaustivamente las condiciones jurídicas y regulatorias que afectan a la oferta educativa de la **Plataforma Educativa ALSIZ para Ekballo Church**, asegurando el estricto cumplimiento del derecho ecuatoriano, la protección de datos personales de menores y evitando promesas de reconocimiento oficial no verificadas.
- **Rama Local**: `etapa-02-curriculo-bilinguismo-y-legal`.
- **Directorio de Trabajo**: `C:\Users\Alsiz\Documents\plataforma educativa ALSIZ`.
- **Repositorio Remoto Esperado**: `https://github.com/rpmministry/plataforma-educativa-alsiz` (origen en `main`).
- **Línea Base Previa**: Informe de Cierre de la `ETAPA-01` aprobado con 32 requisitos priorizados formalizados.

---

## 2. Objetivos Específicos
1. **Investigación Curricular Oficial de Ecuador**:
   - Consultar el Currículo Nacional vigente del Ministerio de Educación de Ecuador (competencias comunicacionales, matemáticas, digitales y socioemocionales; perfil de salida del bachiller; destrezas por subnivel).
   - Validar la articulación curricular de los casos base: Gael (4.º EGB Elemental) y Avril (8.º EGB Superior).
2. **Auditoría de Alliance Academy International (Alliance K12)**:
   - Investigar en vivo el sitio oficial `https://alliance.k12.ec/`.
   - Extraer aranceles, modalidad de estudio, estándares de aprendizaje (Virginia SOL), cursos AP, perfil docente y diferenciar estrictamente información pública vs. necesidad de consulta directa.
3. **Comparación con Marcos Internacionales y MCER (CEFR)**:
   - Comparar el currículo ecuatoriano con estándares internacionales (Virginia SOL, NGSS, CCSS) e identificar brechas reales sin asumir falsas equivalencias nominales.
   - Definir la progresión de niveles de inglés por tramos de edad con base en el MCER (Pre-A1 a B2), garantizando pertinencia evolutiva.
4. **Construcción del Mapa y Catálogo Curricular**:
   - Elaborar `docs/curriculum/mapa_curricular_preliminar.md` integrando asignaturas troncales, complementarias, formación cristiana institucional (7 clases doctrinales de Ekballo Church) y ampliación internacional.
   - Detallar la matriz completa: Nivel, Grado, Asignatura, Competencias, Objetivos, Unidades, Evidencias y Fuentes.
   - Diseñar las actividades y evidencias evaluables duales (en español e inglés) con rúbricas analíticas estandarizadas.
5. **Revisión Jurídica y Regulatoria en Ecuador**:
   - Analizar la normativa ecuatoriana (Constitución, LOEI, Acuerdos MINEDUC-MINEDUC-2023-00069-A y MINEDUC-MINEDUC-2025-00024-A, Memorando SASRE-2024-00610-M para homologación internacional).
   - Analizar las obligaciones de la Ley Orgánica de Protección de Datos Personales (LOPDP), en especial los Arts. 21 y 22 (datos de niños y adolescentes, consentimiento expreso, no discriminación algorítmica).
   - Delimitar rigurosamente las 5 figuras operativas: plataforma de software, tutoría complementaria, cursos eclesiales, alianzas B2B2C y colegio formal particular.
   - Contrastar críticamente las afirmaciones de `DOCUMENTOS EKBALLO/Investigación Educativa para Ekballo Church.docx`.
   - Incorporar cláusula deontológica expresa de no asesoría legal formal.

---

## 3. Exclusiones Taxativas
- **Cero Modificaciones en Código de Producto**: No alterar ningún archivo en `src/`, `server.ts`, dependencias ni archivos de configuración de despliegue.
- **Sin Promesas de Legalidad Directa**: No declarar que la plataforma otorga por sí sola títulos de bachiller ecuatorianos.
- **Sin Operaciones de Red Mutantes**: No ejecutar `push`, `pull`, `rebase` ni alterar remotos en Git.

---

## 4. Entregables Comprometidos
1. `docs/curriculum/mapa_curricular_preliminar.md`
2. `docs/curriculum/catalogo_asignaturas_niveles_grados.md`
3. `docs/curriculum/matriz_correspondencia_brechas.md`
4. `docs/curriculum/marco_bilinguismo_mcer.md`
5. `docs/curriculum/informe_juridico_viabilidad_ecuador.md`
6. Evidencias de auditoría en `docs/ejecucion/etapas/ETAPA-02/evidencias/`
7. Sistema documental de etapa `docs/ejecucion/etapas/ETAPA-02/00_PLAN.md` a `06_CIERRE.md`
8. Actualización de `docs/ejecucion/README.md` y `docs/ejecucion/bitacora.md`.

---

## 5. Criterios de Aceptación de la Etapa
- [x] Consulta de fuentes oficiales del Ministerio de Educación de Ecuador y estándares internacionales.
- [x] Auditoría en vivo de `alliance.k12.ec` con distinción entre datos públicos y requerimientos de consulta directa.
- [x] Progresión de inglés estructurada bajo el MCER y adaptada por edades (Pre-A1 a B2).
- [x] Matriz curricular integrada que relaciona nivel, grado, materia, competencias, objetivos, unidades, evidencias y fuentes.
- [x] Identificación explícita de brechas (especialmente en Estudios Sociales y Ciencias Naturales) sin falsas equivalencias.
- [x] Objetivos de bilingüismo dual con actividades y rúbricas en español e inglés.
- [x] Dictamen jurídico con análisis exhaustivo del Acuerdo Ministerial 2023-00069-A, reformas 2025, LOPDP y distinción de 5 figuras operativas.
- [x] Contraste riguroso de afirmaciones vigentes, a corregir y no corroboradas de la investigación institucional de Ekballo Church.
- [x] Cláusula de no asesoría legal definitiva y reserva de materias para abogado especialista.
- [x] Cero alteraciones de código de producto (`git diff` limpio en archivos rastreados).

