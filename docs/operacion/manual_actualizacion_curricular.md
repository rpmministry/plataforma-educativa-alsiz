# Manual de Actualización Curricular y Matrices Temáticas
## Plataforma Educativa ALSIZ para Ekballo Church

- **Documento**: `docs/operacion/manual_actualizacion_curricular.md`
- **Versión**: 1.0.0
- **Fecha**: 2026-10-16
- **Audiencia**: Coordinadores Curriculares, Diseñadores Instruccionales y Docentes

---

### 1. Marco Curricular Institucional de ALSIZ

El currículo de ALSIZ para Ekballo Church está estructurado sobre cuatro pilares formativos integrados armónicamente:

1. **Currículo Nacional de Ecuador (MINEDUC)** (60% de carga horaria):
   - Desarrollo de competencias comunicacionales, matemáticas, digitales y socioemocionales.
   - Alineación estricta con las Destrezas con Criterios de Desempeño (DCD) para Educación General Básica (Elemental, Media, Superior) y Bachillerato General Unificado (BGU).
2. **Ampliación Internacional y Rigor Científico** (15% de carga horaria):
   - Integración de estándares norteamericanos complementarios (Virginia SOL, NGSS para Ciencias, Common Core para Matemáticas).
3. **Bilingüismo Aditivo Estructurado por el MCER** (15% de carga horaria):
   - Progresión desde Pre-A1 (Elemental) hasta B2 (Bachillerato) mediante inmersión contextualizada sin desplazamiento del idioma materno.
4. **Formación Doctrinal y Relación con Dios** (10% de carga horaria):
   - Transversalización de los principios bíblicos y las 7 clases doctrinales fundacionales de Ekballo Church.

---

### 2. Estructura Jerárquica de Datos Curriculares

En el modelo de datos relacional de ALSIZ, el currículo se modela de forma jerárquica:

```
  PROGRAMA ACADÉMICO (programs)
       |
       +--> ASIGNATURA (subjects)
               |
               +--> UNIDAD TEMÁTICA (academic_units)
                       |
                       +--> LECCIÓN DIARIA (daily_classes / lessons)
                               |
                               +--> OBJETIVOS Y DESTREZAS (curriculum_competencies)
                               +--> RECURSOS BILINGÜES (multimedia / reading)
                               +--> EVALUACIONES / RÚBRICAS (rubrics)
```

#### Entidades Principales:
- **`programs`**: Define la oferta educativa (ej. `EKBALLO_K12_EC` para Educación Escolar, `EKBALLO_OFICIOS` para Formación No Formal).
- **`subjects`**: Materias específicas vinculadas a un programa y subnivel (código, nombre, área, carga horaria semanal, orden pedagógico).
- **`academic_units`**: Bloques temáticos trimestrales organizados pedagógicamente.
- **`daily_classes`**: Sesiones diarias de aprendizaje con guion socrático, teoría base, preguntas reflexivas y retos prácticos.

---

### 3. Procedimiento para Incorporar o Modificar Contenidos

#### 3.1. Creación de una Nueva Asignatura Escolar
Para añadir una asignatura formal al catálogo institucional:
1. Definir el código normalizado de la asignatura (ej. `CN-EGB-EL-01` para Ciencias Naturales Elemental).
2. Determinar el subnivel educativo (`ELEMENTAL`, `MEDIA`, `SUPERIOR`, `BGU`).
3. Registrar en la base de datos mediante la API administrativa o una migración controlada:
   ```sql
   INSERT INTO subjects (id, code, name, grade_level, area, hours_per_week, is_core, is_bilingual)
   VALUES (
     'subj-ciencias-elem-01',
     'CN-EGB-EL-01',
     'Ciencias Naturales y Creación',
     'ELEMENTAL',
     'CIENCIAS_NATURALES',
     4,
     1,
     0
   );
   ```

#### 3.2. Incorporación de Unidades y Lecciones Diarias
Cada lección diaria debe diseñarse siguiendo el **Patrón Socrático Ekballo**:
1. **Tema y Fundamento Bíblico/Conceptual**: Breve contexto inicial que despierta curiosidad.
2. **Teoría Base (Theory)**: Exposición concisa, adaptada a la edad del estudiante, sin sobrecarga cognitiva.
3. **Pregunta de Indagación Socrática**: En lugar de preguntas de opción múltiple repetitivas, formular interrogantes que guíen al estudiante a deducir el principio.
4. **Reto Práctico o Laboratorio**: Actividad aplicable en el hogar o entorno inmediato.
5. **Componente Bilingüe (Dual Language)**: Glosario de términos clave en inglés con pronunciación fonética y contexto de uso.

#### 3.3. Transversalización Doctrinal de las 7 Clases de Ekballo Church
Los 7 módulos doctrinales institucionales deben distribuirse coherentemente a lo largo del año lectivo:
- **Clase 1**: El Carácter de Dios y la Creación (integrado con Ciencias Naturales y Filosofía).
- **Clase 2**: La Caída y la Redención en Jesucristo (integrado con Historia y Ética).
- **Clase 3**: La Persona y Obra del Espíritu Santo (integrado con Desarrollo Personal y Espiritual).
- **Clase 4**: La Autoridad de las Escrituras y Fe Viva (integrado con Lenguaje y Hermenéutica).
- **Clase 5**: La Iglesia, Cuerpo de Cristo y Comunidad (integrado con Ciencias Sociales y Convivencia).
- **Clase 6**: Mayordomía Cristiana y Vocación (integrado con Matemáticas, Emprendimiento y Finanzas).
- **Clase 7**: La Gran Comisión y Mandato Misionero Ekballo (integrado con Liderazgo y Proyectos Comunitarios).

---

### 4. Directrices de Correspondencia y Destrezas MINEDUC

Al formular los objetivos de una lección o unidad, debe incluirse el código oficial de la destreza correspondiente del currículo ecuatoriano:

- **Ciencias Naturales Elemental**: `CN.2.1.1` (Observar las etapas del ciclo vital del ser humano y registrar gráficamente los cambios).
- **Matemáticas Elemental**: `M.2.1.12` (Representar, escribir y leer los números naturales del 0 al 9999 en forma concreta, gráfica y simbólica).
- **Lengua y Literatura**: `LL.2.3.5` (Desarrollar estrategias cognitivas como lectura de paratextos, establecimiento del propósito de lectura, relectura, relectura selectiva y parafraseo).
- **Ciencias Sociales**: `CS.2.1.4` (Reconocer la importancia de la escuela a partir de la investigación de sus orígenes fundacionales).

---

### 5. Ciclo de Revisión y Versionado Curricular

1. **Propuesta Docente**: El docente o diseñador instruccional redacta el módulo en borrador.
2. **Revisión Doctrinal y Pedagógica**: El Comité Pastoral y la Coordinación Académica revisan la pertinencia bíblica y la coherencia con el MINEDUC.
3. **Aprobación e Ingestión**: Se aprueba el contenido y se registra en el Centro de Conocimiento para alimentar el RAG de los profesores IA.
4. **Versionado**: Cualquier cambio estructural en una materia se documenta en el Registro de Versiones institucional.

