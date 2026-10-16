# ETAPA-02 — Gestión de Riesgos, Supuestos y Decisiones Requeridas

## 1. Registro de Riesgos Curriculares y Jurídicos

| ID Riesgo | Descripción del Riesgo | Impacto | Probabilidad | Estrategia de Mitigación Implementada / Propuesta |
| :--- | :--- | :---: | :---: | :--- |
| **RSK-CUR-01** | **Sobrecarga Cognitiva por Bilingüismo Temprano**: Intentar enseñar gramática abstracta en inglés en 4.º EGB que interfiera con la lectoescritura en español. | ALTO | MEDIA | Se fijó el estándar en **Pre-A1/A1.1** enfocado en fonética lúdica (*Phonics*), canciones y *Total Physical Response (TPR)*, postergando la producción escrita formal en inglés para EGB Media y Superior. |
| **RSK-CUR-02** | **Desconexión con Evaluaciones Oficiales de Subnivel**: Que el estudiante domine materias optativas pero repruebe las evaluaciones estatales de MINEDUC en Ciencias Sociales o Lengua. | CRÍTICO | MEDIA | El 60% de la carga horaria se blindó con las destrezas con criterio de desempeño obligatorias de MINEDUC y se incorporó un simulador de exámenes de subnivel como hito formativo. |
| **RSK-LEG-01** | **Contingencia por Publicidad Engañosa o Clausura Administrativa**: Que la plataforma se publicite como "colegio virtual" sin contar con Código AMIE ni resolución de funcionamiento del MINEDUC. | CRÍTICO | ALTA | Se delimitó formalmente la personería como **Servicio Educativo Complementario No Formal de Tutoría y Acompañamiento Familiar (Art. 32 Acuerdo 2023-00069-A)**. Se prohíbe el uso de la palabra "Colegio" o prometer títulos directos en la publicidad. |
| **RSK-LEG-02** | **Sanciones por Vulneración de la LOPDP en Datos de Menores**: Exposición de fotos de niños, notas o perfiles sin consentimiento expreso y en rutas web no autenticadas. | CRÍTICO | ALTA | Se tipificó como requisito de máxima prioridad corregir la exposición pública de `/students/` y requerir formularios físicos/digitales de consentimiento previo informado de los padres. |
| **RSK-OPE-01** | **Falsa Suposición de Alianza con Alliance Academy International**: Asumir que AAI puede operar como escuela sombrilla virtual accesible. | MEDIO | ALTA | La auditoría en vivo demostró que AAI es un colegio presencial de \$1,053 mensuales. Se corrigió la premisa y se orienta la alianza sombrilla hacia instituciones acreditadas a distancia (vía SASRE-2024-00610-M). |

---

## 2. Decisiones Clave que Requieren Validación Humana

Para las siguientes etapas de diseño técnico y desarrollo de software, se solicita la resolución formal de las siguientes decisiones:

1. **Decisión D-01: Modelo Contractual de los Padres de Familia**
   - *Opción A (Recomendada)*: Contrato de servicios de tutoría y acompañamiento pedagógico no formal bajo el Art. 32 del Acuerdo 2023-00069-A, donde los padres declaran que ellos asumen la responsabilidad legal de la educación en casa ante el Estado ecuatoriano.
   - *Opción B*: Contrato de licencia de software educativo puro (SaaS).
2. **Decisión D-02: Mecanismo de Acreditación Final de Bachillerato**
   - *Opción A (Ruta Nacional Gratuita)*: Preparar a los estudiantes para rendir las 4 evaluaciones oficiales de subnivel del MINEDUC sin costo de matrícula en el exterior.
   - *Opción B (Ruta Sombrilla Internacional)*: Establecer un convenio con una escuela sombrilla acreditada en EE. UU. (ej. West River Academy u homóloga) con costo adicional de matrícula y apostilla de La Haya para homologación bajo Memorando SASRE-2024-00610-M.
   - *Opción C (Híbrida Recomendada)*: Ofrecer la ruta nacional por defecto y dejar la ruta sombrilla internacional como un servicio complementario electivo para familias en movilidad o con planes universitarios en el exterior.
3. **Decisión D-03: Remoción Definitiva de Datos Personales Reales en el Código**
   - *Opción A (Recomendada por LOPDP)*: Sustituir en la siguiente etapa de base de datos todos los correos electrónicos reales (`andradesanchezavril@gmail.com`, `gaelandradesanchez@gmail.com`) y fotografías personales de menores por avatares ilustrados y datos sintéticos de prueba.

