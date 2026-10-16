# Manual Breve de Configuración Académica — Plataforma ALSIZ / Ekballo Church

## 1. Introducción y Propósito
Este manual describe el procedimiento estándar para la administración pedagógica, configuración de la malla curricular, matriculación de estudiantes, creación de contenidos formativos y emisión de calificaciones oficiales en la **Plataforma Educativa ALSIZ**.

El sistema opera bajo los lineamientos del **Ministerio de Educación del Ecuador (MINEDUC)** y el marco formativo cristiano de **Ekballo Church**, asegurando la trazabilidad de destrezas con criterio de desempeño y la protección de datos personales de menores.

---

## 2. Jerarquía y Estructura Académica

La arquitectura académica se organiza de forma relacional y jerárquica:

```
[ Periodo Académico (ej. 2026-2027) ]
        │
[ Programa Formativo (ej. Educación en Casa K-12) ]
        │
   [ Nivel / Grado (ej. 8.º EGB Superior) ]
        │
   [ Asignatura (ej. Física y Mecánica Clásica) ]
        ├── [ Competencias Curriculares (Destrezas MINEDUC) ]
        └── [ Unidades Trimestrales (1, 2 y 3) ]
                 └── [ Lecciones Diarias Socráticas ]
                          ├── [ Objetivos de Aprendizaje ]
                          ├── [ Recursos Educativos (ES / EN) ]
                          └── [ Instrumentos de Evaluación con Rúbrica ]
```

---

## 3. Guía Paso a Paso para Administradores

### 3.1 Creación de Programas Formativos
1. Ingrese a la plataforma con credenciales de **Administrador**.
2. En el menú lateral, seleccione **Gestión Curricular** -> **Programas**.
3. Haga clic en **Nuevo Programa Formativo** y complete:
   - **Código Institucional**: Código corto en mayúsculas (ej. `BGU-CIENCIAS`, `EKB-DISCIPLESHIP`).
   - **Nombre Oficial**: Nombre formal del programa (ej. *"Bachillerato General Unificado en Ciencias"*).
   - **Modalidad**: Seleccione `K12_HOMESCHOOL`, `DISCIPLESHIP`, `CONTINUING_ED` o `SUMMER_CAMP`.
   - **Descripción**: Resumen pedagógico del enfoque.
4. Presione **Guardar y Publicar**.

### 3.2 Configuración de Periodos y Calendario
1. Navegue a **Calendario Académico** -> **Ciclos Lectivos**.
2. Defina el periodo lectivo anual (ej. `2026-2027` con fechas de inicio `2026-09-01` y fin `2027-06-30`).
3. Registre los hitos clave del calendario:
   - `TRIMESTER_START`: Inicio de cada trimestre.
   - `EXAM_PERIOD`: Semanas de evaluaciones quimestrales o trimestrales.
   - `SUBMISSION_DEADLINE`: Fechas límite para entrega de proyectos integradores.
   - `HOLIDAY`: Vacaciones y feriados oficiales.

### 3.3 Matriculación Normalizada de Estudiantes
El sistema utiliza una doble vinculación relacional que previene la duplicación de cuentas de estudiantes:
1. **Matrícula en el Programa (`student_program_enrollments`)**:
   - Asocia al estudiante con el programa y el grado escolar específico en un ciclo lectivo.
2. **Asignación a Materias (`student_subject_enrollments`)**:
   - Inscribe al alumno en cada asignatura individual con su docente responsable asignado.
   - Permite mallas flexibles: un estudiante puede cursar una materia de nivelación sin alterar su grado principal.

---

## 4. Guía Paso a Paso para Docentes y Mentores

### 4.1 Organización de Unidades y Lecciones Socráticas
1. Acceda a la materia asignada desde el panel docente.
2. Cree una **Unidad Curricular Trimestral**:
   - Asigne el número de unidad (1, 2 o 3) y el trimestre oficial.
   - Defina el **Eje de Aprendizaje** temático (ej. *"Cinemática y Principios de la Creación"*).
3. Agregue **Lecciones Diarias (Clases)**:
   - Ingrese el número secuencial de clase.
   - Redacte la **Pregunta Socrática Detonante**: Pregunta orientada a despertar el pensamiento crítico y la reflexión profunda.
   - Defina la **Actividad Práctica / Taller**: Experimento, ejercicio o dinámica que aplicará el alumno.
   - Inserte el **Contenido Estructurado**: Texto explicativo en formato Markdown.

### 4.2 Recursos Didácticos Multilingües
Al agregar materiales de soporte (videos, lecturas, simulaciones):
- Especifique el idioma del recurso (`es` para Español, `en` para Inglés).
- **Política de Fallback**: Si un estudiante consulta materiales en inglés pero un recurso solo está disponible en español, el sistema desplegará el recurso original en español con una notificación transparente.

### 4.3 Diseño de Evaluaciones Formativas con Rúbrica
1. En la lección diaria o unidad, haga clic en **Nueva Actividad Evaluativa**.
2. Vincule la actividad con la **Competencia / Destreza Oficial** (código MINEDUC).
3. Establezca el puntaje máximo (escala estándar: **10.00**).
4. Configure la **Rúbrica Analítica Cuantitativa**:
   - Defina los criterios (ej. *Precisión Conceptual: 3.0 pts*, *Procedimiento y Cálculos: 4.0 pts*, *Argumentación Socrática: 3.0 pts*).
   - Indique la fecha límite de entrega (`due_date`).

### 4.4 Calificación, Retroalimentación e Historial de Cambios
1. Cuando un estudiante realiza una entrega, el estado cambia a `SUBMITTED`.
2. El docente evalúa ingresando a la entrega:
   - Asigna los puntos correspondientes a cada criterio de la rúbrica.
   - Redacta la **Retroalimentación Cualitativa Formativa**.
   - Presiona **Guardar Calificación**.
3. **Re-evaluaciones y Modificaciones**:
   - Si el estudiante presenta correcciones formativas, el docente puede actualizar la calificación.
   - El sistema **obliga a registrar un motivo pedagógico** del cambio (ej. *"Re-evaluación formativa tras entrega de correcciones socráticas"*).
   - Cada cambio queda registrado en el libro inmutable de auditoría (`submission_grade_history`).

---

## 5. Seguimiento Competencial y Boletines Oficiales

### 5.1 Regla de Dominio Demostrado vs. Actividad Completada
El sistema aplica una regla técnica estricta:
- **Actividad Completada (`COMPLETED_NO_MASTERY`)**: El alumno entregó la tarea o ejercicio, pero su calificación es inferior al mínimo aprobatorio ministerial (**7.00 / 10.00**).
- **Dominio Demostrado (`DEMONSTRATED_MASTERY`)**: El estudiante obtuvo una calificación o promedio igual o superior a **7.00 / 10.00**.

> [!IMPORTANT]
> Ningún estudiante recibirá la insignia de competencia dominada por el solo hecho de entregar un trabajo. El sistema exige evidencia cuantitativa calificada para validar el dominio de la destreza.

### 5.2 Emisión de Boletines Oficiales (MINEDUC Art. 32)
1. Tanto los administradores, docentes como los representantes legales autorizados pueden generar el boletín oficial desde el portal.
2. El reporte consolida:
   - Datos institucionales de Ekballo Church y ALSIZ.
   - Datos del estudiante y código opaco.
   - Cuadro de calificaciones cuantitativas por asignatura.
   - Matriz de destrezas con criterio de desempeño alcanzadas.
   - Código de verificación criptográfico y validez jurídica.
3. El boletín cuenta con vista optimizada para impresión física o guardado en PDF (`Ctrl + P`).

