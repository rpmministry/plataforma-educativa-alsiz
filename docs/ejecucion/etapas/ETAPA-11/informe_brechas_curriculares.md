# Informe Técnico de Brechas Curriculares y Recomendaciones
## Mallas Legadas de 8.° EGB Superior y 4.° EGB Elemental frente a la Norma MINEDUC y el Modelo Ekballo Church

- **Fecha**: 2026-10-16
- **Contexto**: Migración Controlada de Expedientes y Materiales (Etapa 11)
- **Marco Normativo de Referencia**:
  - Currículo Nacional de Ecuador (MINEDUC-2023-00069-A y reformas 2025 MINEDUC-2025-00024-A).
  - Marco Común Europeo de Referencia para las Lenguas (MCER / Bilingüismo Aditivo).
  - 7 Módulos Doctrinales Fundacionales de Ekballo Church.

---

### 1. Diagnóstico Cuantitativo del Acervo Legado

El inventario exhaustivo ejecutado en la Etapa 11 arrojó los siguientes datos consolidados del repositorio legado:

| Métrica Académica | Estudiante A (8.° EGB Superior) | Estudiante G (4.° EGB Elemental) | Total Acervo Legado | Requisito Anual MINEDUC (200 Días) | Brecha de Cobertura |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Asignaturas Activas** | 11 materias | 9 materias | 20 materias | 10 a 11 por subnivel | **Cumple (100%)** |
| **Unidades Curriculares** | 33 unidades (3/trimestre) | 9 unidades (1/trimestre) | 42 unidades | 3 unidades trimestrales/materia | **Parcial en 4.° EGB** |
| **Lecciones Diarias Socráticas** | 23 lecciones | 20 lecciones | 43 lecciones | 200 días lectivos por nivel | **Brecha de 357 lecciones** |
| **Recursos Didácticos Catalogados** | 46 recursos | 40 recursos | 86 recursos | Mínimo 2 recursos por clase | **Equilibrado en las 43 clases** |
| **Actividades Formativas** | 69 actividades | 60 actividades | 129 actividades | 3 actividades por clase | **Equilibrado en las 43 clases** |
| **Simuladores Virtuales (STEM)** | 5 (PhET + GeoGebra) | 7 (PhET + GeoGebra) | 12 laboratorios | Mínimo 1 por unidad STEM | **Excelente calidad (Reutilizar)** |

---

### 2. Hallazgos Críticos y Brechas Identificadas

#### Brecha 1: Cobertura Temporal del Calendario Escolar (43 clases vs 200 días)
- **Diagnóstico**: Las 43 lecciones socráticas existentes cubren aproximadamente las primeras 4 a 5 semanas del año lectivo (Septiembre a Octubre 2026).
- **Impacto**: Si no se generan nuevas clases antes de finalizar el primer mes, el estudiante se quedará sin guías socráticas estructuradas para el resto del trimestre.
- **Recomendación**: Utilizar el generador de guías didácticas asistido por IA (`server/agents/humanSupervisionService.ts` implementado en la Etapa 08) con supervisión docente obligatoria para elaborar los bloques de clases para las semanas 5 a 40.

#### Brecha 2: Dependencia de Dominio Obsoleto de Wisdom School en 43 Guías PDF
- **Diagnóstico**: Existen 43 recursos tipo PDF cuya URL apunta a `https://wisdom-school.edu/guides/Guia_Didactica_class_...pdf`. Dicho dominio es ajeno y discontinuado.
- **Impacto**: El estudiante experimentará enlaces rotos (error 404 o timeout) al hacer clic en "Descargar Guía Didáctica".
- **Recomendación**: Realizar un re-alojamiento o generación dinámica en servidor para que las guías PDF se descarguen directamente desde la API de ALSIZ (`/api/v1/academic/classes/:classId/guide.pdf`) o se vinculen al Centro de Conocimiento institucional (Etapa 07).

#### Brecha 3: Placeholders de Video (25 ocurrencias de Rickroll `dQw4w9WgXcQ`)
- **Diagnóstico**: El 29% de los recursos audiovisuales corresponden a un enlace genérico de prueba utilizado por los desarrolladores previos como marcador de posición.
- **Impacto**: Desprestigio pedagógico y distracción del menor al reproducir contenido no educativo.
- **Recomendación**: Curar 25 videos pedagógicos de fuentes validadas (Khan Academy en Español, Eduteca, MINEDUC, Ekballo Media) y actualizar las URLs mediante el endpoint administrativo de recursos implementado en la Etapa 10.

#### Brecha 4: Desbalance en Unidades de 4.° EGB Elemental
- **Diagnóstico**: Mientras que 8.° EGB Superior cuenta con 3 unidades por materia (33 en total, cubriendo los 3 trimestres), 4.° EGB Elemental cuenta únicamente con 1 unidad por materia (9 en total), correspondiente al Trimestre 1.
- **Impacto**: Faltan las definiciones macrocurriculares de los trimestres 2 y 3 para el nivel elemental.
- **Recomendación**: Diseñar las 18 unidades restantes de 4.° EGB (Trimestres 2 y 3) manteniendo el enfoque lúdico y el método Singapur (CPA: Concreto-Pictórico-Abstracto).

#### Brecha 5: Integración Doctrinal de Ekballo Church en *Relación con Dios*
- **Diagnóstico**: La materia *Relación con Dios* cuenta actualmente con 1 lección introductoria en cada nivel, sin conectar formalmente con los 7 módulos doctrinales fundacionales de Ekballo Church sistematizados en la Etapa 02 y depositados en el Centro de Conocimiento en la Etapa 07.
- **Recomendación**: Sincronizar el plan de *Relación con Dios* con el catálogo canónico de las 7 Clases Doctrinales (Historia y Visión, Salvación, Carácter, Guerra Espiritual, Oración, Mayordomía y Liderazgo de Servicio).

---

### 3. Matriz de Recomendaciones y Plan de Enriquecimiento

| Prioridad | Acción Pedagógica / Técnica Recomendada | Responsable | Etapa Sugerida |
| :---: | :--- | :--- | :---: |
| **P0** | Reemplazar los 25 enlaces de video placeholder por videos educativos verificados en YouTube. | Coordinación Académica | Etapa 12 |
| **P0** | Implementar generador de PDF nativo en backend para sustituir las 43 URLs obsoletas de Wisdom School. | Equipo de Desarrollo | Etapa 12 |
| **P1** | Integrar los 7 módulos doctrinales de Ekballo Church en la asignatura *Relación con Dios*. | Mentor Espiritual / David | Etapa 12 |
| **P1** | Completar la malla de unidades para los Trimestres 2 y 3 de 4.° EGB Elemental (18 unidades). | Coordinación Pedagógica | Etapa 12 |
| **P2** | Desplegar el sistema de generación asistida de clases (semanas 6 a 40) con supervisión docente obligatoria. | Docente Titular + Agente IA | Etapas 12-13 |
| **P2** | Incorporar cápsulas bilingües duales (Español / Inglés) en los laboratorios PhET y GeoGebra. | Especialista de Idiomas | Etapa 13 |

