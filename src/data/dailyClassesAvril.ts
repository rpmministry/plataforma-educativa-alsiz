import { DailyClass } from '../types';

/**
 * ==============================================================================
 * CLASES DIARIAS SOCRÁTICAS — AVRIL (8.º EGB SUPERIOR)
 * Año Lectivo 2026 - 2027 | Currículo Oficial MINEDUC y Ekballo Church
 * Consolidado y Validado por Lotes bajo la Etapa 06B
 * ==============================================================================
 * Total Clases: 23 | Asignaturas: 11 | Cobertura Unidad 1: 100%
 * Criterios Verificados:
 * - 0 Enlaces Rickroll
 * - 0 Dominios extintos (wisdom-school.edu)
 * - 100% IDs únicos desambiguados (corregida colisión class-mat-avril-02 a class-mat-avril-03)
 * - 100% Destrezas con Criterio de Desempeño (DCD) oficiales (MINEDUC, CSTA, MCER B1, Ekballo)
 * - 18 Campos pedagógicos completos por clase
 * ==============================================================================
 */

export const AVRIL_DAILY_CLASSES: DailyClass[] = [
  {
    "id": "class-len-avril-01",
    "subjectId": "len-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Pensamiento Crítico y Ensayo Argumentativo: La Fuerza de la Palabra",
    "theme": "El poder de la palabra: De la opinión subjetiva a la tesis argumentada",
    "objective": "Diferenciar entre juicios de valor u opiniones subjetivas y una tesis argumentada respaldada por premisas lógicas y evidencias verificables.",
    "learningPurpose": "Desarrollar una voz intelectual autónoma para defender ideas con rigor lógico y fundamentación científica, superando la simple emotividad o la repetición acrítica.",
    "competencyDcd": "LL.4.1.1 — Indagar y explicar los aportes de la cultura escrita al desarrollo histórico, social y cultural de la humanidad.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Lengua y Literatura EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Bienvenida al seminario socrático de Lengua y Literatura, estimada Avril! Te saluda el Prof. Gabriel Neruda. En el mundo contemporáneo estamos bombardeados por millones de opiniones en redes sociales y medios de comunicación. Muchas personas creen que opinar es sinónimo de saber; sin embargo, en el ámbito académico y ético, una opinión sin premisas ni datos empíricos es apenas un eco en el vacío. Hoy aprenderemos a transformar intuiciones en TESIS defendibles con arquitectura dialéctica.",
    "reading": "Fragmento de análisis: \"El valor de la palabra razonada\". Cuando Sócrates caminaba por el ágora de Atenas, no buscaba vencer a sus interlocutores con retórica ruidosa, sino examinar si sus afirmaciones resistían el peso de la contradicción. Afirmar \"la tecnología aísla a los jóvenes\" es un juicio de valor subjetivo. Pero sostener que \"el diseño algorítmico basado en gratificación instantánea incrementa el aislamiento social al sustituir el diálogo interpersonal por interacciones dopaminérgicas cuantificadas\" constituye una tesis articulada. La primera es un desahogo; la segunda es una invitación al debate científico y filosófico.",
    "pedagogicalExplanation": "Una tesis argumentativa no es un hecho evidente (como \"el agua hierve a 100 °C\") ni una preferencia caprichosa (como \"el color azul es superior al rojo\"). Una tesis es una proposición debatible sobre la cual existen posturas contrarias razonables. Para construirla se requiere: 1) Delimitar con precisión el objeto de estudio. 2) Formular una postura clara (afirmación o negación). 3) Justificar la causalidad mediante una razón rectora (\"porque...\", \"en la medida en que...\").",
    "vocabulary": [
      {
        "term": "Tesis",
        "definition": "Proposición u opinión fundamentada que se defiende con argumentos en un texto académico.",
        "childFriendlyExample": "Tu tesis es la columna vertebral de tu ensayo que sostiene todas las demás afirmaciones."
      },
      {
        "term": "Premisa",
        "definition": "Cada una de las proposiciones anteriores a la conclusión de un razonamiento lógico.",
        "childFriendlyExample": "Si la premisa A es que los árboles absorben CO2 y la B es que talamos bosques, la conclusión lógica es un aumento del CO2."
      },
      {
        "term": "Dialéctica",
        "definition": "Método de razonamiento y confrontación de ideas opuestas para alcanzar una verdad más profunda.",
        "childFriendlyExample": "Contrastar tu hipótesis con la de otro investigador es un ejercicio dialéctico enriquecedor."
      }
    ],
    "contextualizedExample": "En el debate ambiental sobre la protección del Parque Nacional Yasuní en Ecuador, confrontar argumentos económicos a corto plazo frente a argumentos de soberanía biológica y derechos indígenas constituye un ejercicio dialéctico de alto nivel.",
    "socraticQuestions": [
      "¿Por qué una afirmación como \"la lectura tradicional en papel es mejor que la digital\" no califica como tesis si no especifica el ámbito cognitivo o empírico de comparación?",
      "¿En qué se distingue el deseo de tener la razón (arrogancia retórica) de la búsqueda honesta de la verdad (actitud filosófica)?",
      "Si descubrieras que una evidencia sólida refuta tu postura inicial, ¿qué decisión intelectualmente honesta tomarías?"
    ],
    "practicalActivity": {
      "title": "Taller de ingeniería de proposiciones: De opinión a tesis",
      "instructions": [
        "Analiza las siguientes tres afirmaciones subjetivas:",
        "a) \"El cambio climático es el peor problema del mundo\".",
        "b) \"Los videojuegos hacen perder el tiempo a los estudiantes\".",
        "c) \"La inteligencia artificial va a reemplazar a los profesores\".",
        "Reescribe cada una en tu cuaderno de análisis transformándolas en tesis rigurosas de nivel 8.º EGB, delimitando sujeto, verbo de acción, causalidad y campo de aplicación."
      ],
      "materials": [
        "Cuaderno de análisis ensayístico",
        "Pluma estilográfica o bolígrafo",
        "Plantilla de conectores lógicos"
      ]
    },
    "applicationActivity": {
      "title": "Manifiesto inicial del proyecto trimestral",
      "task": "Formula la tesis rectora de tu ensayo para el Proyecto Interdisciplinario 1 (\"Emprendimiento con Propósito / Mi Voz en la Sociedad\"). Justifícala en un párrafo de 6 a 8 líneas articulando dos premisas demostrables.",
      "deliverable": "Párrafo argumentativo formal con delimitación de tesis y premisas en el portafolio digital."
    },
    "formativeEvaluation": {
      "description": "Evaluación formativa del rigor epistemológico en la formulación de tesis y distinción de falacias opinativas.",
      "expectedEvidence": "Avril redacta su tesis demostrando delimitación conceptual y coherencia interna entre causa y consecuencia."
    },
    "evaluationRubric": {
      "criterion": "Formulación de tesis argumentativas y rigor conceptual (LL.4.1.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Plantea opiniones subjetivas o afirmaciones fácticas no debatibles sin justificación causal."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Formula una postura clara pero su justificación presenta ambigüedad en las premisas de apoyo."
        },
        {
          "level": "Consolidado",
          "descriptor": "Diseña una tesis sólida, matizada y dialécticamente defendible, explicitando premisas, alcance y relevancia social con prosa académica impecable."
        }
      ]
    },
    "expectedFeedback": "Extraordinaria agudeza analítica, Avril. Supiste transformar una intuición general en una proposición de notable madurez intelectual. Tu formulación dialéctica sienta las bases de un ensayo de verdadero impacto.",
    "difficultyAdaptation": "Utilizar el esquema visual de Toulmin: \"Pretensión (¿Qué afirmo?) + Evidencia (¿Qué datos tengo?) + Garantía (¿Por qué el dato justifica la afirmación?)\".",
    "advancedExtension": "Avril identifica y redacta dos posibles objeciones que un contraargumentador escéptico formularía contra su tesis.",
    "resources": [
      {
        "id": "class-len-avril-01-res-1",
        "type": "external_link",
        "title": "Biblioteca Virtual Miguel de Cervantes: Teoría del Ensayo",
        "url": "https://www.cervantesvirtual.com/",
        "description": "Portal académico abierto con monografías sobre la estructura del ensayo crítico y la tradición ensayística hispanoamericana.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-len-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — De la Opinión a la Tesis Académica",
        "url": "/api/v1/academic/classes/class-len-avril-01/guide.pdf",
        "description": "Documento metodológico con modelos de argumentación lógica y plantilla analítica para 8.° EGB Superior.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-avril-01-act-1",
        "title": "Deconstrucción Socrática del Texto",
        "description": "Analiza el fragmento de la lectura y explica por qué la retórica sin premisas carece de validez académica.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-len-avril-01-act-2",
        "title": "Ingeniería de Proposiciones",
        "description": "Transforma las tres opiniones informales en tesis estructuradas con justificación causal.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-avril-01-act-3",
        "title": "Redacción de la Tesis Rectora",
        "description": "Elabora y somete a revisión la tesis rectora de tu ensayo trimestral.",
        "type": "writing",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Identifica en el editorial de un periódico nacional (digital o impreso) la tesis central del autor y anota si está explícita o implícita.",
    "reflectionPrompt": "¿En qué medida el rigor en el lenguaje refleja la claridad y honestidad de nuestro pensamiento?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_avril_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-len-avril-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-01-LEN",
      "subjectCode": "LEN-801",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-len-avril-02",
    "subjectId": "len-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Pensamiento Crítico y Ensayo Argumentativo: La Fuerza de la Palabra",
    "theme": "La anatomía del ensayo: Estructura dialéctica, contraargumentación y refutación",
    "objective": "Estructurar un texto argumentativo articulando introducción con gancho, cuerpo con argumentos de autoridad y datos, y sección de contraargumentación.",
    "learningPurpose": "Comprender que la fortaleza de una idea se mide por su capacidad para dialogar con las críticas más inteligentes y refutarlas con elegancia.",
    "competencyDcd": "LL.4.3.1 — Comparar, bajo criterios preestablecidos, las relaciones explícitas entre los contenidos de dos o más textos y contrastar sus fuentes.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Lengua y Literatura EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Continuamos con la construcción ensayística, Avril! Un error frecuente en los redactores principiantes es diseñar monólogos donde solo se aplauden sus propias ideas. Un gran ensayista, por el contrario, invita a su texto al adversario más brillante: expone la objeción contraria con total justicia (sin caricaturizarla) y luego demuestra con serenidad por qué su tesis sigue siendo superior. Esa técnica se denomina REFUTACIÓN y es la cúspide de la elegancia dialéctica.",
    "reading": "Estudio de caso: El debate sobre la educación autónoma. Consideremos dos perspectivas sobre el homeschooling y el autoaprendizaje guiado. Perspectiva A sostiene que la escuela presencial convencional es indispensable para la socialización heterogénea de los adolescentes. Perspectiva B responde que la socialización impuesta en aulas masivas genera dinámicas de conformidad social y acoso, mientras que la educación autodirigida con mentores permite socializar en entornos reales (laboratorios, clubes deportivos, voluntariado) con mayor diversidad intergeneracional. El ensayista maduro no ignora la Perspectiva A: la reconoce como válida pero introduce evidencias para demostrar que la Perspectiva B amplía las capacidades socioafectivas del joven.",
    "pedagogicalExplanation": "La estructura dialéctica de un ensayo riguroso comprende: 1) Introducción: contextualización, planteamiento del problema y tesis explícita. 2) Argumentación positiva: dos o tres argumentos sólidos sustentados en datos empíricos, razonamiento deductivo o citas de autoridad. 3) Contraargumentación y Refutación: presentación de la objeción más fuerte del oponente y su desmontaje lógico. 4) Conclusión: síntesis de lo demostrado y proyección reflexiva hacia el futuro.",
    "vocabulary": [
      {
        "term": "Contraargumento",
        "definition": "Objeción o razón que se opone directamente a la tesis propuesta.",
        "childFriendlyExample": "Si tú argumentas que la energía solar es la mejor opción, el contraargumento señala el desafío del almacenamiento nocturno."
      },
      {
        "term": "Refutación",
        "definition": "Demostración lógica de la invalidez, debilidad o insuficiencia de un contraargumento.",
        "childFriendlyExample": "Refutas la objeción de la energía solar demostrando los avances en baterías de grafeno."
      },
      {
        "term": "Argumento de autoridad",
        "definition": "Razonamiento sustentado en el testimonio o investigación de un experto reconocido en la materia.",
        "childFriendlyExample": "Citar un informe de la OMS o un teorema de Euler es emplear un argumento de autoridad."
      }
    ],
    "contextualizedExample": "En la historia del pensamiento ecuatoriano, Juan Montalvo en sus \"Siete Tratados\" utilizó la contraargumentación sistemática para desmontar las justificaciones del autoritarismo político en el siglo XIX.",
    "socraticQuestions": [
      "¿Por qué debilitar o ridiculizar el argumento del oponente (falacia del hombre de paja) en lugar de abordarlo con toda su fuerza demuestra debilidad intelectual?",
      "¿Cómo ayuda el conector de concesión \"Si bien es cierto que... no obstante...\" a construir una refutación elegante?",
      "¿Qué diferencia existe entre un argumento sustentado en estadísticas rigurosas y una anécdota personal aislada?"
    ],
    "practicalActivity": {
      "title": "El ring dialéctico: Elaboración de argumentos y contraargumentos",
      "instructions": [
        "Toma la tesis formulada en la sesión anterior.",
        "Escribe en la columna izquierda dos argumentos sólidos (uno de causa-efecto y otro de autoridad/datos).",
        "Escribe en la columna derecha el contraargumento más agudo que un opositor formularía.",
        "Redacta abajo un párrafo de refutación de 5 líneas iniciando con un conector concesivo (\"A pesar de que los críticos sostienen... es menester señalar que...\")."
      ],
      "materials": [
        "Tabla de balance dialéctico en libreta",
        "Pluma y resaltadores de dos colores"
      ]
    },
    "applicationActivity": {
      "title": "Esquema arquitectónico del ensayo",
      "task": "Elabora el mapa conceptual o esquema jerárquico de tu ensayo completo en 4 bloques: 1) Introducción y Tesis, 2) Argumento 1 y Argumento 2, 3) Contraargumento y Refutación, 4) Conclusión.",
      "deliverable": "Esquema jerárquico detallado en formato digital o cuaderno de trabajo."
    },
    "formativeEvaluation": {
      "description": "Capacidad de estructurar un discurso polifónico integrando objeciones reales sin incurrir en falacias lógicas.",
      "expectedEvidence": "Avril articula una contraargumentación seria y redacta una refutación fundamentada en evidencias concretas."
    },
    "evaluationRubric": {
      "criterion": "Estructuración dialéctica y refutación en textos ensayísticos (LL.4.3.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Presenta solo argumentos a favor y evade considerar posturas contrarias."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Menciona objeciones contrarias pero su refutación es endeble o se limita a reiterar la tesis inicial."
        },
        {
          "level": "Consolidado",
          "descriptor": "Integra con maestría contraargumentos de peso y los refuta con rigor lógico y evidencias robustas, elevando la calidad académica del texto."
        }
      ]
    },
    "expectedFeedback": "Brillante desenvolvimiento argumentativo, Avril. La sutileza con la que concediste el punto inicial para luego refutarlo con datos certeros demuestra un dominio retórico muy superior al promedio de tu nivel.",
    "difficultyAdaptation": "Proporcionar una plantilla de oraciones con conectores concesivos y adversativos (\"Ciertamente...\", \"Sin embargo...\", \"Las investigaciones demuestran que...\").",
    "advancedExtension": "Avril investiga el concepto de \"Principio de Caridad Hermenéutica\" formulado por Donald Davidson y explica por qué exige interpretar la postura contraria en su versión más fuerte posible.",
    "resources": [
      {
        "id": "class-len-avril-02-res-1",
        "type": "external_link",
        "title": "Dialnet: Artículos Abiertos de Lingüística y Retórica Ensayística",
        "url": "https://dialnet.unirioja.es/",
        "description": "Hemeroteca científica multidisciplinar en español con ensayos metodológicos sobre retórica y dialéctica argumentativa.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-len-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Estructura Dialéctica y Refutación",
        "url": "/api/v1/academic/classes/class-len-avril-02/guide.pdf",
        "description": "Manual de conectores discursivos, matrices de contraargumentación y modelos de refutación para 8.° EGB.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-avril-02-act-1",
        "title": "Análisis del Debate Educativo",
        "description": "Identifica la tesis, el argumento central y la objeción en el texto de estudio de caso.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-len-avril-02-act-2",
        "title": "Construcción de la Matriz Dialéctica",
        "description": "Completa la tabla comparando tus dos argumentos con la objeción contraria más sólida.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-avril-02-act-3",
        "title": "Esquema Jerárquico del Ensayo",
        "description": "Diseña la estructura completa de 4 bloques que guiará la redacción final de tu ensayo.",
        "type": "writing",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Busca una entrevista televisiva o podcast de debate e identifica si el expositor respondió a la pregunta con refutación o con evasiva.",
    "reflectionPrompt": "¿Por qué escuchar con genuino respeto las razones de quien opina distinto es indispensable para una sociedad libre?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_avril_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-len-avril-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-01-LEN",
      "subjectCode": "LEN-801",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-len-avril-03",
    "subjectId": "len-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Pensamiento Crítico y Ensayo Argumentativo: La Fuerza de la Palabra",
    "theme": "Cazadores de falacias: Identificación de sesgos y razonamientos engañosos en los medios",
    "objective": "Reconocer y desmontar falacias lógicas formales e informales comunes (ad hominem, hombre de paja, falsa dicotomía, apelación a la popularidad) en discursos públicos y textos persuasivos.",
    "learningPurpose": "Desarrollar un filtro crítico impenetrable para no ser manipulada por propaganda, noticias falsas o discursos emocionales engañosos.",
    "competencyDcd": "LL.4.2.1 — Utilizar recursos de la comunicación oral en contextos de intercambio social, construcción de acuerdos y resolución de problemas.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Lengua y Literatura EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Atenta, detective de la verdad Avril! Hoy nos adentraremos en el laboratorio de las trampas del pensamiento: las FALACIAS. Una falacia es un argumento que parece válido y convincente a primera vista, pero que contiene un error de razonamiento que anula su conclusión. En los discursos electorales, en la publicidad engañosa y en las polémicas cotidianas abundan las falacias diseñadas deliberadamente para manipular emociones. Hoy aprenderemos a desactivarlas como verdaderas científicas del lenguaje.",
    "reading": "Inventario de trampas lógicas: 1) Falacia Ad Hominem (ataque a la persona): en lugar de refutar la idea, se descalifica a quien la dice (\"No le creas a ese científico sobre el cambio climático porque es antipático y joven\"). 2) Falacia del Hombre de Paja: se exagera o deforma la postura del adversario (\"Los que apoyan el reciclaje quieren que volvamos a vivir en cavernas sin tecnología\"). 3) Falsa Dicotomía: se reducen las opciones a dos extremos falsos (\"O apoyas este proyecto de ley sin cambiarle una coma o estás en contra del progreso del país\"). 4) Falacia Ad Populum (apelación a la masa): asumir que algo es verdad porque la mayoría lo cree (\"Todos compran esta bebida azucarada, por lo tanto debe ser sana\").",
    "pedagogicalExplanation": "La lógica nos enseña que la verdad de una conclusión no depende del prestigio, de la popularidad ni del tono agresivo de quien la pronuncia, sino de la validez formal del razonamiento y de la veracidad fáctica de sus premisas. Desmontar una falacia requiere: 1) Nombrar el tipo de falacia. 2) Señalar el salto ilegítimo entre la premisa y la conclusión. 3) Exigir el dato o premisa faltante.",
    "vocabulary": [
      {
        "term": "Falacia",
        "definition": "Argumento inválido o engañoso con apariencia de razonamiento correcto.",
        "childFriendlyExample": "Decir que los gatos negros dan mala suerte es una falacia de causa falsa."
      },
      {
        "term": "Sesgo cognitivo",
        "definition": "Inclinación sistemática e involuntaria de la mente que distorsiona el juicio o la percepción de la realidad.",
        "childFriendlyExample": "El sesgo de confirmación nos hace buscar solo las noticias que nos dan la razón."
      },
      {
        "term": "Validez lógica",
        "definition": "Propiedad de un argumento en el que la conclusión se deriva necesariamente de sus premisas.",
        "childFriendlyExample": "Si las premisas son verdaderas y la estructura es válida, la conclusión es ineludible."
      }
    ],
    "contextualizedExample": "En la publicidad comercial en Ecuador, cuando se anuncia un producto afirmando que \"9 de cada 10 ecuatorianos lo prefieren\" sin citar la muestra estadística representativa, se recurre a la falacia ad populum.",
    "socraticQuestions": [
      "¿Por qué descalificar la edad o el aspecto físico de un orador en un debate es una admisión tácita de que no se tienen argumentos racionales para refutar su tesis?",
      "¿Cómo podemos detectar en nuestro propio pensamiento cuando estamos utilizando una falacia para defendernos en una discusión?",
      "¿Qué relación existe entre la verdad y la popularidad: puede una idea ser completamente falsa aunque millones de personas la repitan?"
    ],
    "practicalActivity": {
      "title": "El quirófano de falacias: Disección de casos reales",
      "instructions": [
        "Lee los 4 fragmentos de declaraciones periodísticas y publicitarias proporcionados en la guía de trabajo.",
        "Identifica qué falacia específica contiene cada fragmento.",
        "Escribe en dos líneas la refutación analítica precisa que desmonte el engaño lógico sin atacar al emisor."
      ],
      "materials": [
        "Guía de ejercicios con fragmentos periodísticos",
        "Lápiz y marcador verde de verificación"
      ]
    },
    "applicationActivity": {
      "title": "Guía de autoevaluación para el propio ensayo",
      "task": "Revisa minuciosamente los argumentos redactados para tu ensayo trimestral. Aplica el \"Test Anti-Falacias\": verifica que ninguna premisa sea un ataque personal, una generalización apresurada o una falsa dicotomía.",
      "deliverable": "Checklist anti-falacias completada y firmada con notas de corrección sobre el propio borrador."
    },
    "formativeEvaluation": {
      "description": "Capacidad de identificar errores de razonamiento en discursos orales y escritos y de autodepurar los propios textos.",
      "expectedEvidence": "Avril clasifica correctamente las 4 falacias y argumenta con claridad por qué la conclusión no se sostiene."
    },
    "evaluationRubric": {
      "criterion": "Detección de falacias y aplicación de lógica crítica (LL.4.2.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Confunde un argumento falso con una opinión que no comparte y no identifica la estructura de la falacia."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Reconoce falacias evidentes como el ataque personal pero le cuesta identificar la falsa dicotomía o la apelación a la masa."
        },
        {
          "level": "Consolidado",
          "descriptor": "Desmonta con precisión quirúrgica falacias complejas, explica el salto lógico inválido y blinda su propio discurso contra errores argumentativos."
        }
      ]
    },
    "expectedFeedback": "Extraordinario entrenamiento analítico, Avril. Has afinado tu criterio crítico de manera admirable. Desmontar falacias con tanta serenidad y precisión te convierte en una ciudadana consciente y difícil de engañar.",
    "difficultyAdaptation": "Utilizar tarjetas ilustradas donde cada falacia está personificada por un personaje cómico (ej: \"Señor Hombre de Paja\", \"General Dicotomía\").",
    "advancedExtension": "Avril investiga la falacia de \"Post hoc ergo propter hoc\" (correlación no implica causalidad) y formula un ejemplo aplicado a la medicina o la economía.",
    "resources": [
      {
        "id": "class-len-avril-03-res-1",
        "type": "external_link",
        "title": "Proyecto Gutenberg: Obras Clásicas de Lógica y Retórica",
        "url": "https://www.gutenberg.org/",
        "description": "Biblioteca digital abierta con tratados de dialéctica, filosofía y razonamiento crítico de dominio público.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-len-avril-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Cazadores de Falacias y Trampas Lógicas",
        "url": "/api/v1/academic/classes/class-len-avril-03/guide.pdf",
        "description": "Catálogo clasificado de 12 falacias formales e informales con ejercicios de disección crítica para 8.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-avril-03-act-1",
        "title": "Disección del Catálogo de Falacias",
        "description": "Analiza los 4 tipos de falacias estudiadas y formula un contraejemplo cotidiano de cada una.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-len-avril-03-act-2",
        "title": "Quirófano de Casos Reales",
        "description": "Desmonta los 4 fragmentos periodísticos identificando el salto ilegítimo de razonamiento.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-avril-03-act-3",
        "title": "Test Anti-Falacias del Borrador",
        "description": "Audita y depura los argumentos de tu propio ensayo garantizando su validez formal.",
        "type": "writing",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Identifica en un anuncio publicitario de televisión o internet una falacia (ej: ad verecundiam o ad populum) y explica cómo manipula al consumidor.",
    "reflectionPrompt": "¿Qué responsabilidad ética tenemos al hablar para no engañar a los demás con argumentos falaces?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_avril_03.pdf",
    "guideUrl": "/api/v1/academic/classes/class-len-avril-03/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-01-LEN",
      "subjectCode": "LEN-801",
      "unitNumber": 1,
      "sessionNumber": 3
    }
  },
  {
    "id": "class-len-avril-04",
    "subjectId": "len-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Pensamiento Crítico y Ensayo Argumentativo: La Fuerza de la Palabra",
    "theme": "Taller de redacción argumentativa: Voz crítica, conectores lógicos y estilo ensayístico",
    "objective": "Redactar un ensayo argumentativo breve (500-600 palabras) integrando introducción con tesis, cuerpo con argumentos respaldados en citas APA, refutación y conclusión con proyección social.",
    "learningPurpose": "Consolidar las habilidades de las sesiones 1 a 3 para producir un texto académico formal que comunique ideas con elegancia estética y contundencia lógica.",
    "competencyDcd": "LL.4.4.1 — Escribir ensayos argumentativos con un manejo de su estructura básica, utilizando citas y referencias bibliográficas para sustentar las ideas con honestidad académica.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Lengua y Literatura EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡El gran día de la creación ensayística ha llegado, Avril! Durante las tres sesiones previas aprendiste a diferenciar opiniones de tesis, diseñaste una estructura dialéctica con refutación y blindaste tu pensamiento contra falacias. Hoy encenderemos la pluma del escritor: redactarás el primer borrador completo de tu ensayo argumentativo. Recuerda las palabras de Alfonso Reyes: \"El ensayo es el centauro de los géneros: mitad ciencia por su rigor lógico, mitad poesía por la belleza de su lenguaje\". ¡A escribir con pasión y precisión!",
    "reading": "Manifiesto del joven ensayista: Escribir un ensayo no es transcribir lo que otros dijeron, sino asumir la responsabilidad de tu propia perspectiva. Cada párrafo debe cumplir una función específica en la sinfonía del texto. La introducción atrapa al lector con una paradoja o interrogante que culmina en tu tesis. Los párrafos del cuerpo desarrollan tus argumentos mediante la regla de las 3 C: Coherencia conceptual, Cohesión discursiva (usando conectores precisos como \"por consiguiente\", \"en contraste\", \"asimismo\") y Claridad expositiva. Las citas de autores van entre comillas con su fuente, demostrando respeto por la honestidad intelectual y la propiedad académica.",
    "pedagogicalExplanation": "La redacción académica en 8.º EGB exige: 1) Registro lingüístico formal: evitar coloquialismos o frases vagas (\"es algo bueno\"). 2) Variedad sintáctica: combinar oraciones simples y complejas subordinadas. 3) Citación de fuentes: atribuir las ideas a sus autores originales mediante normas estandarizadas sencillas (Autor, año). 4) Cierre con impacto: la conclusión no repite mecánicamente la tesis, sino que abre una reflexión de largo alcance ético.",
    "vocabulary": [
      {
        "term": "Cohesión textual",
        "definition": "La propiedad que permite que las oraciones y párrafos se conecten de manera fluida y lógica mediante nexos y conectores.",
        "childFriendlyExample": "Los conectores discursivos son los puentes que unen tus ideas sin tropiezos."
      },
      {
        "term": "Registro formal",
        "definition": "El uso del lenguaje adecuado para situaciones académicas, profesionales o institucionales.",
        "childFriendlyExample": "En un ensayo escribimos \"incrementó notablemente\" en vez de \"subió full\"."
      },
      {
        "term": "Honestidad académica",
        "definition": "El principio ético de dar crédito a las fuentes originales y evitar el plagio.",
        "childFriendlyExample": "Citar al autor entre comillas honra su trabajo y fortalece tu propio argumento."
      }
    ],
    "contextualizedExample": "Cuando ensayistas ecuatorianas contemporáneas escriben sobre la conservación de la biodiversidad o la equidad educativa, combinan datos del INEC y del Ministerio del Ambiente con una narrativa envolvente.",
    "socraticQuestions": [
      "¿Por qué el plagio o copiar sin citar destruye la credibilidad de un investigador incluso cuando sus ideas parezcan brillantes?",
      "¿Cómo logras que un ensayo sea formal y riguroso sin volverse aburrido o incomprensible?",
      "Si un lector llega a la última línea de tu ensayo, ¿qué emoción o pensamiento transformador te gustaría que se lleve en la mente?"
    ],
    "practicalActivity": {
      "title": "El laboratorio de redacción en tres tiempos",
      "instructions": [
        "Tiempo 1 (Introducción - 20 min): Redacta el párrafo de apertura con un gancho provocativo, la contextualización del problema y tu tesis rectora destacada.",
        "Tiempo 2 (Cuerpo argumentativo y refutación - 40 min): Desarrolla dos párrafos de argumentos fundamentados y un párrafo de contraargumentación con refutación.",
        "Tiempo 3 (Conclusión y pulido de estilo - 30 min): Escribe el párrafo de cierre y aplica una revisión estilística sustituyendo palabras comodín (cosa, algo, hacer) por verbos y sustantivos precisos."
      ],
      "materials": [
        "Procesador de textos o libreta de redacción",
        "Guía de estilo ensayístico ALSIZ",
        "Diccionario de sinónimos"
      ]
    },
    "applicationActivity": {
      "title": "Publicación del ensayo en el portafolio trimestral",
      "task": "Completa la versión preliminar de tu ensayo de 500 palabras, asigna un título creativo y sugerente, e intégralo en el portafolio digital de la plataforma ALSIZ para la valoración formativa interdisciplinaria.",
      "deliverable": "Ensayo argumentativo completo de 4 o 5 párrafos con título propio y aparato crítico en el portafolio."
    },
    "formativeEvaluation": {
      "description": "Evaluación formativa integradora de la competencia escrita: coherencia, cohesión, fundamentación lógica y honestidad académica.",
      "expectedEvidence": "Avril entrega su ensayo estructurado con tesis explícita, argumentos fundamentados, refutación elegante y vocabulario formal adecuado."
    },
    "evaluationRubric": {
      "criterion": "Producción de ensayos argumentativos formales con citas y refutación (LL.4.4.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Redacta párrafos desarticulados con predominio de opinión informal y sin estructura ensayística identificable."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Respeta la estructura básica de introducción, desarrollo y conclusión, pero carece de refutación o presenta errores de cohesión."
        },
        {
          "level": "Consolidado",
          "descriptor": "Produce un ensayo brillante, dialécticamente impecable, con prosa elegante, cohesión perfecta, citas académicas pertinentes y una conclusión de hondo calado reflexivo."
        }
      ]
    },
    "expectedFeedback": "Una obra de madurez excepcional, Avril. Tu ensayo no solo demuestra rigor lógico y solidez conceptual, sino una voz estilística auténtica, sensible y poderosa. Has culminado el primer lote de Lengua y Literatura con la distinción de una verdadera ensayista.",
    "difficultyAdaptation": "Permitir una estructura guiada párrafo a párrafo: Párrafo 1 (Tesis), Párrafo 2 (Argumento 1 + dato), Párrafo 3 (Contraargumento + Refutación), Párrafo 4 (Cierre).",
    "advancedExtension": "Avril prepara una versión sintetizada de su ensayo en formato de \"Discurso TED\" de 2 minutos para presentarlo oralmente en el aula socrática.",
    "resources": [
      {
        "id": "class-len-avril-04-res-1",
        "type": "external_link",
        "title": "Google Académico / Google Books: Búsqueda de Fuentes Primarias",
        "url": "https://scholar.google.es/",
        "description": "Motor de búsqueda abierto de literatura científica, artículos revisados por pares y libros académicos para fundamentación de citas.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-len-avril-04-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Redacción Ensayística y Normas de Citación",
        "url": "/api/v1/academic/classes/class-len-avril-04/guide.pdf",
        "description": "Manual de estilo editorial con rúbrica analítica y pautas de honestidad académica para 8.° EGB.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-avril-04-act-1",
        "title": "Manifiesto del Ensayista",
        "description": "Reflexiona sobre la regla de las 3 C y la importancia de la honestidad intelectual.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-len-avril-04-act-2",
        "title": "Taller de Redacción en Tres Tiempos",
        "description": "Redacta los 4 párrafos del ensayo aplicando variedad sintáctica y conectores precisos.",
        "type": "writing",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-avril-04-act-3",
        "title": "Entrega y Pulido del Borrador Final",
        "description": "Somete el ensayo al portafolio digital con título creativo y formato editorial formal.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Lee tu ensayo en voz alta frente a tus padres o mentor y pregúntales qué argumento les resultó más persuasivo.",
    "reflectionPrompt": "¿Qué poder sientes que tiene tu voz cuando escribes con argumentos verdaderos y fundamentados?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_avril_04.pdf",
    "guideUrl": "/api/v1/academic/classes/class-len-avril-04/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-01-LEN",
      "subjectCode": "LEN-801",
      "unitNumber": 1,
      "sessionNumber": 4
    }
  },
  {
    "id": "class-mat-avril-01",
    "subjectId": "mat-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Modelado Algebraico: Ecuaciones de Primer Grado y Álgebra Visual",
    "theme": "El lenguaje del álgebra: Variables, expresiones y el principio de la balanza en equilibrio",
    "objective": "Traducir enunciados verbales al lenguaje algebraico y resolver ecuaciones lineales de primer grado de la forma ax + b = c utilizando el modelo de balanza y propiedades de la igualdad.",
    "learningPurpose": "Comprender que el álgebra no es un conjunto de trucos mecánicos de memorización, sino un lenguaje poderoso y universal para descubrir incógnitas ocultas y modelar patrones del cosmos.",
    "competencyDcd": "M.4.1.8 — Expresar enunciados simples en lenguaje algebraico (variables, coeficientes, términos independientes) y resolver ecuaciones de primer grado con una incógnita en ℚ.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Matemática EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Bienvenida a tu cátedra de Matemáticas, apreciada Avril! Te saluda la Dra. Sophia Euler. La mayoría de las personas se asusta cuando ve letras mezcladas con números. Sin embargo, el gran matemático persa Al-Juarismi descubrió hace más de mil años que una incógnita \"x\" es simplemente una cajita misteriosa cuyo valor podemos deducir aplicando una ley universal: la JUSTICIA DE LA BALANZA. Una ecuación es una balanza en perfecto equilibrio. Todo lo que hagas en el platillo izquierdo (sumar, restar, multiplicar o dividir), debes hacerlo exactamente igual en el platillo derecho. ¡Hoy dominaremos este principio fundamental!",
    "reading": "El enigma del sarcófago de Alejandría: Cuenta la leyenda que en la biblioteca de Alejandría, la matemática Hipatia desafió a sus discípulos con este acertijo: \"Un mercader tiene un saco de monedas de plata. Si duplica el contenido de su saco y añade 15 monedas que le regaló el emperador, obtiene exactamente la misma cantidad que si un colega le entrega 75 monedas completas. ¿Cuántas monedas tenía el mercader al principio?\". Los comerciantes intentaban adivinar número por número. Hipatia sonrió, tomó una vara y trazó en la arena una sola línea: $2x + 15 = 75$. Restó 15 a ambos lados: $2x = 60$. Dividió entre 2 a ambos lados: $x = 30$. En tres segundos, el enigma quedó resuelto con precisión geométrica. ¡El álgebra había vencido a la adivinanza!",
    "pedagogicalExplanation": "Una ecuación lineal es una igualdad matemática entre dos expresiones que contiene una o más variables. Resolverla significa \"despejar la incógnita\": dejar a la variable $x$ completamente aislada y positiva en uno de los miembros de la igualdad. Para lograrlo, aplicamos las propiedades uniformes de la igualdad: si sumamos, restamos, multiplicamos o dividimos por el mismo número en ambos miembros, la igualdad se conserva intacta.",
    "vocabulary": [
      {
        "term": "Variable o Incógnita",
        "definition": "Símbolo (comúnmente una letra como x, y, z) que representa una cantidad desconocida.",
        "childFriendlyExample": "En la ecuación 3x = 18, la x es la incógnita cuyo valor exacto es 6."
      },
      {
        "term": "Coeficiente",
        "definition": "El factor numérico que multiplica a una variable.",
        "childFriendlyExample": "En el término 5x, el número 5 es el coeficiente."
      },
      {
        "term": "Propiedad uniforme de la igualdad",
        "definition": "Regla matemática que establece que si se aplica la misma operación en ambos miembros de una igualdad, esta se mantiene.",
        "childFriendlyExample": "Restar 4 a ambos lados de x + 4 = 10 nos da directamente x = 6."
      }
    ],
    "contextualizedExample": "Si un artesano de Otavalo gasta $20 en lana para confeccionar 4 bufandas idénticas y las vende obteniendo una ganancia total de $60, la ecuación que modela el precio de venta \"p\" de cada bufanda es $4p - 20 = 60$. Despejando: $4p = 80 \\implies p = \\$20$.",
    "socraticQuestions": [
      "¿Por qué decimos comúnmente \"lo que está sumando pasa al otro lado restando\"? ¿Qué operación matemática real está ocurriendo debajo de ese truco mnemotécnico?",
      "Si tienes la ecuación $3x + 12 = 30$, ¿qué operación conviene realizar primero para despejar la x con mayor elegancia y menor riesgo de error aritmético?",
      "¿Cómo puedes comprobar al 100% que tu solución matemática es correcta sin necesidad de preguntarle a un profesor?"
    ],
    "practicalActivity": {
      "title": "El laboratorio de la balanza virtual en GeoGebra",
      "instructions": [
        "Abre el simulador interactivo de balanza algebraica en GeoGebra.",
        "Coloca en el platillo izquierdo: 3 bloques de incógnita [x] y 5 pesas de 1 kg.",
        "Coloca en el platillo derecho: 26 pesas de 1 kg.",
        "Aplica la operación \"-5 pesas\" en ambos platillos simultáneamente: observa cómo la balanza permanece nivelada ($3x = 21$).",
        "Aplica la operación \"÷ 3\" repartiendo en grupos iguales: comprueba que cada bloque [x] pesa exactamente 7 kg.",
        "Escribe en tu cuaderno el procedimiento algebraico formal paso a paso."
      ],
      "materials": [
        "Computadora o tablet con GeoGebra",
        "Cuaderno cuadriculado",
        "Lápiz y regla"
      ]
    },
    "applicationActivity": {
      "title": "Modelado del presupuesto del stand escolar",
      "task": "Plantea y resuelve la ecuación del siguiente problema: Un equipo de estudiantes de 8.º EGB tiene un capital inicial de $45 y compra 6 paquetes de materiales de diseño para su proyecto. Si al final les quedan $9 en caja, ¿cuánto costó cada paquete de materiales? Comprueba tu resultado sustituyendo el valor hallado en la ecuación original.",
      "deliverable": "Resolución analítica en cuaderno con planteamiento verbal, ecuación ($6x + 9 = 45$), despeje paso a paso y comprobación formal."
    },
    "formativeEvaluation": {
      "description": "Comprensión conceptual del equilibrio algebraico y destreza en el algoritmo de despeje lineal con comprobación.",
      "expectedEvidence": "Avril explica el significado de las operaciones uniformes a ambos lados del igual y verifica su solución por sustitución numérica."
    },
    "evaluationRubric": {
      "criterion": "Traducción algebraica y resolución de ecuaciones de primer grado (M.4.1.8)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Intenta resolver por ensayo y error o comete fallas sistemáticas en los signos al trasponer términos."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Resuelve ecuaciones básicas aplicando el algoritmo pero le cuesta justificar el principio de la balanza o comprobar el resultado."
        },
        {
          "level": "Consolidado",
          "descriptor": "Traduce enunciados verbales complejos al álgebra con fluidez, despeja incógnitas con rigor formal justificando cada paso por propiedades de la igualdad y verifica autónomamente sus soluciones."
        }
      ]
    },
    "expectedFeedback": "Impecable rigor matemático, Avril. Tu comprensión de la balanza uniforme demuestra que entiendes la raíz profunda del álgebra y no solo un mecanismo ciego. Has resuelto el problema con la elegancia de una verdadera matemática.",
    "difficultyAdaptation": "Utilizar fichas algebraicas de colores (Algebra Tiles): fichas rectangulares verdes para x y fichas cuadradas amarillas para unidades positivas y rojas para negativas.",
    "advancedExtension": "Avril resuelve una ecuación con variables en ambos miembros: $5x - 7 = 2x + 14$, explicando la estrategia para agrupar las variables en el miembro donde el coeficiente sea positivo.",
    "resources": [
      {
        "id": "class-mat-avril-01-res-1",
        "type": "simulator",
        "title": "GeoGebra: Balanza de Ecuaciones Lineales Interactiva",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "description": "Simulador dinámico oficial de GeoGebra para experimentar visualmente con el equilibrio y las operaciones simultáneas en ambos miembros.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-mat-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Modelado Algebraico y Principio de Balanza",
        "url": "/api/v1/academic/classes/class-mat-avril-01/guide.pdf",
        "description": "Ficha de trabajo con desafíos socráticos, problemas de traducción verbal a simbólica y rúbrica para 8.° EGB.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-avril-01-act-1",
        "title": "El Acertijo de Hipatia",
        "description": "Analiza el problema de las monedas de plata y explica por qué la traducción algebraica es más eficiente que el tanteo.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-mat-avril-01-act-2",
        "title": "Laboratorio de la Balanza GeoGebra",
        "description": "Modela la ecuación 3x + 5 = 26 en la balanza virtual y registra el procedimiento formal en tu cuaderno.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-avril-01-act-3",
        "title": "Problema del Stand Escolar con Comprobación",
        "description": "Plantea, despeja y comprueba la ecuación del costo de los paquetes de materiales.",
        "type": "analysis",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Formula un acertijo algebraico cotidiano sobre las edades de tu familia o tus compras y escribe su ecuación correspondiente.",
    "reflectionPrompt": "¿En qué sentido el álgebra nos enseña a buscar el equilibrio y la justicia en la resolución de problemas?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_avril_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-mat-avril-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-02-MAT",
      "subjectCode": "MAT-801",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-mat-avril-02",
    "subjectId": "mat-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Modelado Algebraico: Ecuaciones de Primer Grado y Álgebra Visual",
    "theme": "Ecuaciones complejas en ℚ: Paréntesis, propiedad distributiva y coeficientes fraccionarios",
    "objective": "Resolver ecuaciones de primer grado en el conjunto de los números racionales (ℚ) que involucren signos de agrupación y coeficientes fraccionarios mediante el cálculo del mínimo común múltiplo (m.c.m.).",
    "learningPurpose": "Desarrollar precisión de cirujano matemático para manipular expresiones con fracciones y signos negativos sin cometer errores algebraicos.",
    "competencyDcd": "M.4.1.9 — Aplicar las propiedades algebraicas (distributiva, conmutativa, asociativa) para simplificar expresiones y resolver ecuaciones lineales en ℚ.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Matemática EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Hola de nuevo, Avril! Hoy daremos un salto cualitativo hacia ecuaciones más sofisticadas: aquellas donde aparecen paréntesis protectores y coeficientes fraccionarios. Muchos estudiantes tropiezan cuando ven una fracción en una ecuación; sin embargo, los matemáticos tenemos un truco maestro llamado \"eliminación de denominadores\": si multiplicamos la ecuación entera por el mínimo común múltiplo de todos los denominadores, ¡las fracciones desaparecen como por arte de magia y nos queda una ecuación entera limpísima! Vamos a dominar esta técnica.",
    "reading": "El algoritmo de la simplificación elegante: Consideremos la ecuación: $\\frac{2x - 1}{3} - \\frac{x + 2}{4} = 1$. Un novato intentaría sumar las fracciones sacando un denominador común algebraico pesado. Un maestro calcula el m.c.m. de los denominadores 3 y 4, que es 12. Multiplica cada término de ambos miembros por 12: $12 \\cdot \\left(\\frac{2x - 1}{3}\\right) - 12 \\cdot \\left(\\frac{x + 2}{4}\\right) = 12 \\cdot 1$. Al simplificar: $4(2x - 1) - 3(x + 2) = 12$. Aplicando la propiedad distributiva con sumo cuidado en el signo menos: $8x - 4 - 3x - 6 = 12$. Reduciendo términos semejantes: $5x - 10 = 12 \\implies 5x = 22 \\implies x = \\frac{22}{5}$. ¡Un procedimiento fluido, ordenado y sin tropiezos!",
    "pedagogicalExplanation": "La clave para resolver ecuaciones complejas en ℚ es el orden secuencial estricto: 1) Calcular el m.c.m. de todos los denominadores numéricos. 2) Multiplicar cada término por el m.c.m. para convertir la ecuación en entera. 3) Aplicar la propiedad distributiva $a(b + c) = ab + ac$, teniendo especial alerta cuando hay un signo negativo delante de un paréntesis: $-(x + 2) = -x - 2$. 4) Reducir términos semejantes en cada miembro. 5) Despejar la incógnita y simplificar la fracción resultante a su forma irreducible.",
    "vocabulary": [
      {
        "term": "Mínimo Común Múltiplo (m.c.m.)",
        "definition": "El número positivo más pequeño que es múltiplo de dos o más denominadores.",
        "childFriendlyExample": "El m.c.m. de 3 y 4 es 12, porque 12 es el primer número que está en las tablas del 3 y del 4."
      },
      {
        "term": "Propiedad distributiva",
        "definition": "Regla que establece que multiplicar un número por una suma es igual a multiplicarlo por cada sumando por separado.",
        "childFriendlyExample": "3(x + 4) = 3x + 12."
      },
      {
        "term": "Fracción irreducible",
        "definition": "Fracción cuyos numerador y denominador no tienen divisores comunes mayores que 1.",
        "childFriendlyExample": "22/5 es irreducible porque 22 y 5 son coprimos."
      }
    ],
    "contextualizedExample": "En el cálculo de mezclas agrícolas en una plantación de café en Loja, determinar la proporción exacta de fertilizante orgánico disuelto en agua requiere resolver ecuaciones con coeficientes racionales.",
    "socraticQuestions": [
      "¿Por qué al multiplicar por el m.c.m. ambos miembros de la ecuación estamos seguros de que la solución final no se altera?",
      "¿Cuál es el error conceptual más frecuente que cometen los estudiantes con el signo menos en expresiones como $-(2x - 5)$?",
      "Si el resultado final es una fracción impropia como $22/5$, ¿es necesario pasarla a decimal o es preferible conservarla como número racional exacto? ¿Por qué?"
    ],
    "practicalActivity": {
      "title": "Taller de despeje metódico en 4 pasos",
      "instructions": [
        "Resuelve en tu cuaderno cuadriculado las siguientes dos ecuaciones con coeficientes en ℚ:",
        "1) $3(2x - 4) = 4(x + 3) - 2$.",
        "2) $\\frac{x - 1}{2} + \\frac{2x + 3}{5} = 3$.",
        "Aplica la técnica del m.c.m., resalta los signos de distribución con color rojo y realiza la comprobación numérica de la segunda ecuación."
      ],
      "materials": [
        "Cuaderno de matemáticas",
        "Plumas de colores (rojo para signos, azul para coeficientes)",
        "Calculadora para verificación final"
      ]
    },
    "applicationActivity": {
      "title": "Modelado del reparto de herencia ecológica",
      "task": "Un municipio del Azuay destina una reserva natural de bosques nativos: la mitad del terreno se declara parque botánico intangible, un tercio se destina a senderos ecológicos comunitarios y las 12 hectáreas restantes se reservan para viveros de reforestación. ¿Cuál es la superficie total \"T\" de la reserva? Modela la ecuación $\\frac{T}{2} + \\frac{T}{3} + 12 = T$ y calcula el valor de T en hectáreas.",
      "deliverable": "Resolución completa del problema de reforestación con justificación verbal y comprobación aritmética."
    },
    "formativeEvaluation": {
      "description": "Manejo de signos algebraicos en productos distributivos y cálculo correcto del m.c.m. en ecuaciones racionales.",
      "expectedEvidence": "Avril resuelve la ecuación de la reserva ecológica obteniendo T = 72 hectáreas con procedimiento impecable."
    },
    "evaluationRubric": {
      "criterion": "Resolución de ecuaciones lineales complejas en ℚ (M.4.1.9)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Comete errores al aplicar la ley de signos en la distributiva o calcula incorrectamente el m.c.m."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Elimina denominadores pero incurre en deslices al trasponer términos negativos o al simplificar."
        },
        {
          "level": "Consolidado",
          "descriptor": "Domina con absoluta fluidez la propiedad distributiva con signos negativos, el método del m.c.m. y el modelado contextualizado de problemas en ℚ."
        }
      ]
    },
    "expectedFeedback": "Extraordinaria precisión operativa, Avril. Obtuviste las 72 hectáreas de la reserva natural con un orden y pulcritud matemática dignos de admiración. Los signos algebraicos están bajo tu total dominio.",
    "difficultyAdaptation": "Subrayar con color amarillo cada signo negativo antes de un paréntesis para activar una alerta visual previa a la distribución.",
    "advancedExtension": "Avril investiga ecuaciones lineales con parámetros literales: resolver $ax + b = cx + d$ para la variable $x$, asumiendo que $a \\neq c$.",
    "resources": [
      {
        "id": "class-mat-avril-02-res-1",
        "type": "simulator",
        "title": "Mathigon Polypad: Baldosas Algebraicas y Ecuaciones",
        "url": "https://mathigon.org/polypad",
        "description": "Lienzo interactivo avanzado de Polypad para modelar áreas algebraicas, propiedad distributiva y simplificación de términos semejantes.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-mat-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Ecuaciones con Paréntesis y Fracciones en ℚ",
        "url": "/api/v1/academic/classes/class-mat-avril-02/guide.pdf",
        "description": "Ejercicios graduados con plantilla paso a paso y problemas contextualizados para 8.° EGB.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-avril-02-act-1",
        "title": "Disección del Algoritmo del m.c.m.",
        "description": "Explica en un párrafo por qué multiplicar por 12 elimina los denominadores 3 y 4 simultáneamente.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-mat-avril-02-act-2",
        "title": "Taller de Despeje en 4 Pasos",
        "description": "Resuelve las dos ecuaciones con paréntesis y fracciones demostrando el control de signos.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-avril-02-act-3",
        "title": "Problema de la Reserva Ecológica",
        "description": "Modela y calcula la superficie total de las 72 hectáreas con su comprobación matemática.",
        "type": "analysis",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Resuelve la ecuación $\\frac{2x - 3}{4} - \\frac{x + 1}{6} = 2$ y comprueba tu solución sustituyendo en la expresión original.",
    "reflectionPrompt": "¿En qué se parece resolver una ecuación compleja a armar una estrategia paso a paso en ajedrez?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_avril_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-mat-avril-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-02-MAT",
      "subjectCode": "MAT-801",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-mat-avril-03",
    "subjectId": "mat-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Modelado Algebraico: Ecuaciones de Primer Grado y Álgebra Visual",
    "theme": "Modelado matemático en acción: Problemas geométricos, mezclas y finanzas de proyectos",
    "objective": "Formular modelos algebraicos basados en ecuaciones de primer grado para resolver problemas complejos de optimización geométrica (perímetros, áreas) y finanzas iniciales de proyectos.",
    "learningPurpose": "Comprender que las matemáticas son la herramienta fundamental de los científicos, arquitectos y emprendedores para tomar decisiones inteligentes con base en datos.",
    "competencyDcd": "M.4.1.10 — Resolver y plantear problemas de aplicación con ecuaciones de primer grado en ℚ (geometría, mezclas, finanzas de proyectos) juzgando la validez de las soluciones obtenidas.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Matemática EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Cierre estelar de nuestro lote de Matemáticas, Avril! Hasta ahora hemos aprendido la gramática del álgebra (las reglas y las ecuaciones). Pero, ¿para qué sirve todo esto en la vida real? Un ingeniero no se despierta por la mañana con una ecuación ya escrita en la pared: el ingeniero observa un puente, mide un río, calcula los costos de construcción y es ÉL quien crea la ecuación. Hoy nos convertiremos en modeladoras matemáticas profesionales para resolver dilemas de diseño geométrico y viabilidad de proyectos.",
    "reading": "El desafío del invernadero hidropónico: Un grupo de jóvenes emprendedores en Pichincha desea construir un invernadero rectangular para cultivar frutillas ecológicas. Por limitaciones del terreno, el largo del invernadero debe medir exactamente 8 metros más que el triple de su ancho ($L = 3a + 8$). El presupuesto para la cerca perimetral alcanza para comprar exactamente 96 metros lineales de malla térmica. ¿Cuáles deben ser las dimensiones exactas (ancho y largo) del invernadero para aprovechar al máximo los 96 metros de perímetro sin pasarse ni un centímetro del presupuesto?",
    "pedagogicalExplanation": "El método de modelado matemático de George Pólya comprende 4 fases rigurosas: 1) Comprender el problema: identificar la incógnita principal y las relaciones dadas. Si el ancho es $a$, el largo es $3a + 8$. 2) Concebir un plan: recordar la fórmula geométrica del perímetro de un rectángulo: $P = 2L + 2a$. 3) Ejecutar el plan: sustituir y resolver: $2(3a + 8) + 2a = 96 \\implies 6a + 16 + 2a = 96 \\implies 8a = 80 \\implies a = 10$ metros. Por lo tanto, el largo es $L = 3(10) + 8 = 38$ metros. 4) Examinar la solución obtenida: verificar $2(38) + 2(10) = 76 + 20 = 96$ m. Las dimensiones son física y financieramente óptimas.",
    "vocabulary": [
      {
        "term": "Modelado matemático",
        "definition": "El proceso de traducir un problema de la realidad física, biológica o económica a un lenguaje formal de ecuaciones.",
        "childFriendlyExample": "Escribir la ecuación del perímetro para diseñar el invernadero es hacer modelado matemático."
      },
      {
        "term": "Perímetro",
        "definition": "La suma de las longitudes de todos los lados que delimitan una figura geométrica plana.",
        "childFriendlyExample": "La cerca que rodea un terreno representa su perímetro."
      },
      {
        "term": "Juicio de validez de la solución",
        "definition": "Comprobar si el número obtenido tiene sentido físico en el contexto del problema real (no puede haber longitudes negativas ni personas fraccionadas).",
        "childFriendlyExample": "Si la longitud diera -5 metros, la solución matemática carecería de sentido físico."
      }
    ],
    "contextualizedExample": "En el diseño de cajas de embalaje para exportación de flores ecuatorianas (rosas de exportación en Cayambe), los ingenieros calculan las dimensiones exactas para optimizar el espacio en los contenedores aéreos mediante ecuaciones lineales de volumen y perímetro.",
    "socraticQuestions": [
      "¿Por qué una solución matemática perfectamente calculada (por ejemplo, $a = -10$) carecería por completo de validez en un problema de ingeniería física?",
      "Si el presupuesto de la cerca se redujera a la mitad (48 metros de perímetro), ¿el ancho también se reduciría exactamente a la mitad? ¿Por qué sí o por qué no?",
      "¿En qué se distingue un calculador pasivo de un verdadero modelador matemático?"
    ],
    "practicalActivity": {
      "title": "Taller de modelado geométrico y financiero",
      "instructions": [
        "Dibuja el plano a escala del invernadero en tu libreta con sus cotas de dimensiones: ancho = 10 m, largo = 38 m.",
        "Calcula el área total de cultivo del invernadero: $A = \\text{largo} \\times \\text{ancho} = 38 \\times 10 = 380\\text{ m}^2$.",
        "Si cada metro cuadrado produce 4 kg de frutillas por cosecha a un precio de $2.50 el kg, formula una ecuación para calcular el ingreso total proyectado de la cosecha."
      ],
      "materials": [
        "Libreta cuadriculada",
        "Regla milimetrada",
        "Calculadora"
      ]
    },
    "applicationActivity": {
      "title": "Plan financiero para el Proyecto 1: Emprendimiento con Propósito",
      "task": "Formula una ecuación lineal que represente el punto de equilibrio financiero de tu proyecto trimestral: Costos Fijos ($F$) + Costos Variables unitarios ($v \\cdot q$) = Ingreso Total ($p \\cdot q$). Elige valores realistas y despeja la cantidad de productos \"q\" que necesitas vender para que tu emprendimiento no tenga pérdidas.",
      "deliverable": "Ficha de modelado financiero con la ecuación del punto de equilibrio resuelta y analizada en 5 líneas."
    },
    "formativeEvaluation": {
      "description": "Capacidad de traducir problemas verbales multidimensionales al álgebra, evaluar la coherencia física de los resultados y vincular las matemáticas con el emprendimiento.",
      "expectedEvidence": "Avril presenta el plano geométrico del invernadero verificado y formula la ecuación de equilibrio de su proyecto trimestral con solidez."
    },
    "evaluationRubric": {
      "criterion": "Modelado matemático y juicio crítico de soluciones en ℚ (M.4.1.10)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Plantea relaciones aisladas pero no logra ensamblar la ecuación general del problema."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Resuelve la ecuación geométrica correctamente pero omite juzgar la validez física o le cuesta formular el modelo financiero."
        },
        {
          "level": "Consolidado",
          "descriptor": "Aplica el método de Pólya con destreza admirable, modela problemas geométricos y financieros complejos, evalúa críticamente la validez de los resultados y explica el impacto de las variables con elocuencia científica."
        }
      ]
    },
    "expectedFeedback": "Extraordinaria maestría en modelado, Avril. Has demostrado que las matemáticas no son abstracciones inertes, sino una brújula insustituible para construir proyectos tangibles en el mundo real. Tu diseño del invernadero y tu punto de equilibrio financiero son dignos de un estudiante de bachillerato de élite.",
    "difficultyAdaptation": "Dibujar primero el rectángulo en papel y etiquetar cada uno de los 4 lados con su expresión algebraica ($3a + 8$, $a$, $3a + 8$, $a$) antes de sumar.",
    "advancedExtension": "Avril investiga qué relación entre el largo y el ancho de un rectángulo permite maximizar el área encerrada para un perímetro fijo (¡descubriendo que cuando el largo es igual al ancho, es decir un cuadrado, el área es máxima!).",
    "resources": [
      {
        "id": "class-mat-avril-03-res-1",
        "type": "simulator",
        "title": "PhET Colorado: Explorador de Igualdades y Ecuaciones",
        "url": "https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer_es.html",
        "description": "Simulador oficial de la Universidad de Colorado para modelar variables, igualdades complejas y balances algebraicos en tiempo real.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-mat-avril-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Modelado Matemático de Problemas Reales",
        "url": "/api/v1/academic/classes/class-mat-avril-03/guide.pdf",
        "description": "Compendio de problemas de optimización geométrica, mezclas y modelos de punto de equilibrio para 8.° EGB.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-avril-03-act-1",
        "title": "Análisis del Invernadero Hidropónico",
        "description": "Aplica las 4 fases de Pólya para deducir y comprobar las dimensiones de 38 m y 10 m.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-mat-avril-03-act-2",
        "title": "Plano Geométrico y Cálculo de Rendimiento",
        "description": "Dibuja el plano a escala y calcula el ingreso proyectado de la cosecha de frutillas.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-avril-03-act-3",
        "title": "Ecuación de Punto de Equilibrio Financiero",
        "description": "Modela la ecuación de costos e ingresos de tu proyecto de emprendimiento trimestral.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Calcula el perímetro y el área de una habitación de tu casa y formula una ecuación que exprese el largo en función del ancho.",
    "reflectionPrompt": "¿Cómo cambia tu visión de la vida cuando descubres que puedes prever y diseñar el futuro usando ecuaciones matemáticas?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_avril_03.pdf",
    "guideUrl": "/api/v1/academic/classes/class-mat-avril-03/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-02-MAT",
      "subjectCode": "MAT-801",
      "unitNumber": 1,
      "sessionNumber": 3
    }
  },
  {
    "id": "class-sci-avril-01",
    "subjectId": "sci-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Estructura Celular: El Microcosmos de la Vida",
    "theme": "Célula procariota y eucariota: La arquitectura invisible de los seres vivos",
    "objective": "Diferenciar entre células procariotas y eucariotas (animal y vegetal) mediante la identificación de su ultraestructura, organelos especializados y niveles de compartimentalización biológica.",
    "learningPurpose": "Comprender que la vida opera como una metrópoli microscópica hiperorganizada, donde cada organelo cumple funciones fisiológicas coordinadas esenciales para el metabolismo y la homeostasis.",
    "competencyDcd": "CN.4.1.1 — Indagar y explicar las propiedades de los seres vivos e inferir su importancia para el mantenimiento de la vida en la Tierra, diferenciando la organización celular procariota y eucariota.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Ciencias Naturales EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Bienvenida al laboratorio de Ciencias Naturales, apreciada Avril! Te saluda el Dr. Leonardo Darwin. Cuando observas un árbol de guayacán, un colibrí estrellita de la cordillera o incluso las bacterias benéficas de un yogur artesanal, estás ante sistemas biológicos de sublime sofisticación. Hace 350 años, Robert Hooke miró un pedazo de corcho bajo un tosco microscopio y vio celdillas a las que bautizó \"células\". Hoy sabemos que cada célula no es un saco informe de líquido, sino una ciudad industrial amurallada con centrales de energía, fábricas de proteínas y una biblioteca genética central. ¡Acompáñame a descifrar su código arquitectónico!",
    "reading": "De la charca de Leeuwenhoek a la teoría endosimbiótica: Anton van Leeuwenhoek, un comerciante de telas holandés sin formación académica formal pero con una insaciable curiosidad y una habilidad prodigiosa para pulir lentes de vidrio, tomó una gota de agua estancada y descubrió asombrado lo que llamó \"animálculos\" veloces y vivos. Siglos después, la genial bióloga Lynn Margulis propuso la fascinante Teoría de la Endosimbiosis Seriada: hace más de 1.500 millones de años, una célula grande engulló a una bacteria aeróbica especializada. En vez de digerirla, formaron un pacto de beneficio mutuo perpetuo. Esa bacteria cautiva se convirtió en la mitocondria, la central eléctrica que hoy te permite respirar, pensar y correr. La cooperación, y no solo la competencia, es uno de los motores supremos de la evolución biológica.",
    "pedagogicalExplanation": "La distinción fundamental en la biología celular radica entre células procariotas (como las bacterias y arqueas, cuyo ADN flota libremente en una región nucleoide sin membrana nuclear) y células eucariotas (animales, vegetales, hongos y protozoarios, que poseen un núcleo delimitado por una doble membrana lipídica y organelos membranosos especializados como mitocondrias, retículo endoplasmático, aparato de Golgi y cloroplastos). Dentro de las eucariotas, las células vegetales se diferencian por poseer una pared celular rígida de celulosa, una gran vacuola central hidrostática y cloroplastos con clorofila capaces de convertir fotones solares en glucosa mediante fotosíntesis.",
    "vocabulary": [
      {
        "term": "Procariota",
        "definition": "Célula primitiva carente de núcleo definido y organelos membranosos; su material genético es una molécula circular dispersa en el citoplasma.",
        "childFriendlyExample": "La bacteria Escherichia coli que habita en nuestro intestino es un organismo procariota."
      },
      {
        "term": "Eucariota",
        "definition": "Célula evolucionada con núcleo verdadero delimitado por membrana carioteca y organelos citoplasmáticos especializados.",
        "childFriendlyExample": "Tus neuronas, miocitos y las células de una hoja de orquídea son eucariotas."
      },
      {
        "term": "Endosimbiosis",
        "definition": "Asociación ecológica estrecha y a largo plazo en la cual un organismo vive dentro de otro, resultando en coevolución y beneficio mutuo.",
        "childFriendlyExample": "Las mitocondrias dentro de nuestras células son descendientes de bacterias endosimbiontes."
      }
    ],
    "contextualizedExample": "En la biorreserva marina del archipiélago de Galápagos, los corales viven en simbiosis mutualista obligada con microalgas dinoflageladas eucariotas (zooxantelas) que habitan dentro de sus células y les proveen nutrientes fotosintéticos a cambio de nitrógeno y fósforo.",
    "socraticQuestions": [
      "Si una mitocondria tiene su propio ADN circular y sus propios ribosomas idénticos a los de las bacterias, ¿qué evidencia científica aporta esto a favor de la teoría de Lynn Margulis?",
      "¿Por qué las células animales no tienen pared celular rígida de celulosa como las plantas? ¿Qué ventajas mecánicas y motrices otorga esta flexibilidad biológica a los animales?",
      "Si el núcleo celular es el \"cerebro\" o la \"biblioteca\", ¿qué ocurriría si la membrana nuclear perdiera su permeabilidad selectiva frente a agentes mutagénicos citoplasmáticos?"
    ],
    "practicalActivity": {
      "title": "Microscopía virtual interactiva y atlas comparativo celular",
      "instructions": [
        "Ingresa al simulador de microscopio virtual de la Universidad de Colorado / PhET.",
        "Coloca en la platina virtual la muestra A (frotis bacteriano) y la muestra B (células de epidermis de cebolla Allium cepa).",
        "Ajusta el tornillo micrométrico a 40x y 100x de aumento con inmersión de luz.",
        "Identifica y anota en tu cuaderno de laboratorio: presencia o ausencia de núcleo delimitado, morfología de la pared celular y presencia de cloroplastos o vacuolas.",
        "Elabora un cuadro de doble entrada contrastando 4 diferencias estructurales clave entre Procariota, Eucariota Animal y Eucariota Vegetal."
      ],
      "materials": [
        "Computadora o tablet con navegador web",
        "Cuaderno de ciencias cuadriculado",
        "Colores y regla técnica"
      ]
    },
    "applicationActivity": {
      "title": "Diagnóstico citológico de un organismo extremófilo andino",
      "task": "Imagina que una expedición del Instituto Antártico Ecuatoriano o del cráter del volcán Cotopaxi descubre un microorganismo unicelular en aguas termales a 80 °C. Tras el análisis bioquímico, se descubre que tiene pared celular pero carece de membrana nuclear y organelos con membrana. Redacta un informe científico escolar determinando: ¿Es procariota o eucariota? ¿Qué adaptaciones proteicas le permiten no desnaturalizarse a alta temperatura?",
      "deliverable": "Informe científico breve (1 página) con clasificación taxonómica celular fundamentada y dibujo esquemático rotulado."
    },
    "formativeEvaluation": {
      "description": "Capacidad para discriminar modelos celulares, justificar la función de los organelos e interpretar la teoría endosimbiótica.",
      "expectedEvidence": "Avril explica con precisión la diferencia de compartimentalización entre procariotas y eucariotas y asocia cada organelo a su función fisiológica sin confundir reinos."
    },
    "evaluationRubric": {
      "criterion": "Diferenciación estructural y funcional de células procariotas y eucariotas (CN.4.1.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Reconoce que existen células pero confunde las partes básicas y asume que todas las células tienen núcleo visible."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Distingue célula vegetal de animal pero presenta imprecisiones al explicar el modelo procariota o el origen mitocondrial."
        },
        {
          "level": "Consolidado",
          "descriptor": "Explica con rigor biológico la compartimentalización celular, fundamenta la teoría endosimbiótica y clasifica muestras citológicas con precisión terminológica."
        }
      ]
    },
    "expectedFeedback": "Extraordinario nivel de observación y razonamiento científico, Avril. Has integrado la historia de Leeuwenhoek con la teoría de Margulis de manera magistral. Tu comprensión de la compartimentalización celular demuestra un pensamiento biológico maduro y riguroso.",
    "difficultyAdaptation": "Utilizar diagramas interactivos recortables donde Avril ubica físicamente las organelas dentro de una célula tridimensional en cartulina.",
    "advancedExtension": "Avril investiga la función de los peroxisomas en la degradación de especies reactivas de oxígeno ($H_2O_2$) y cómo la enzima catalasa protege a la célula del estrés oxidativo.",
    "resources": [
      {
        "id": "class-sci-avril-01-res-1",
        "type": "simulator",
        "title": "PhET Interactive Simulations — Anatomía Celular y Escala Microscópica",
        "url": "https://phet.colorado.edu/es/simulations/filter?subjects=biology",
        "description": "Simulador interactivo validado de la Universidad de Colorado Boulder para explorar células a diferentes aumentos ópticos.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-sci-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Citología Comparada y Teoría Endosimbiótica",
        "url": "/api/v1/academic/classes/class-sci-avril-01/guide.pdf",
        "description": "Ficha de laboratorio con microfotografías reales, cuestionario socrático y matriz de cotejo de organelos.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-sci-avril-01-act-1",
        "title": "La Pregunta de Leeuwenhoek",
        "description": "Analiza el descubrimiento de los animálculos y reflexiona sobre el rol de la tecnología óptica en el avance de la ciencia.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-sci-avril-01-act-2",
        "title": "Laboratorio de Microscopía Virtual",
        "description": "Examina muestras celulares virtuales y documenta los organelos identificados en el cuaderno.",
        "type": "practice",
        "points": 20,
        "completed": false
      },
      {
        "id": "class-sci-avril-01-act-3",
        "title": "Informe del Extremófilo Andino",
        "description": "Redacta el informe de diagnóstico citológico del espécimen bacteriano con hipótesis evolutiva.",
        "type": "project",
        "points": 20,
        "completed": false
      }
    ],
    "homeworkTask": "Observa una fruta madura en casa bajo una lupa o linterna y escribe una breve hipótesis sobre cómo los hongos unicelulares (levaduras) interactúan con los azúcares de la superficie.",
    "reflectionPrompt": "¿Cómo cambia tu visión de tu propio cuerpo al saber que estás formada por más de 30 billones de células vivas trabajando en perfecta sinfonía?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_sci_avril_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-sci-avril-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-03-CNI",
      "subjectCode": "CNI-801",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-sci-avril-02",
    "subjectId": "sci-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Estructura Celular: El Microcosmos de la Vida",
    "theme": "Bioquímica celular y biomoléculas: Glúcidos, lípidos, proteínas y la molécula de la herencia (ADN)",
    "objective": "Identificar las cuatro familias de biomoléculas orgánicas (carbohidratos, lípidos, proteínas y ácidos nucleicos), relacionando sus monómeros constituyentes con sus funciones energéticas, estructurales y genéticas.",
    "learningPurpose": "Descubrir que la química del carbono es la base molecular de todos los seres vivos, entendiendo cómo la alimentación equilibrada suministra los ladrillos moleculares para la renovación celular.",
    "competencyDcd": "CN.4.1.2 — Describir los tipos y características de las células, el ciclo celular, los mecanismos de reproducción celular y la composición química de los seres vivos.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Ciencias Naturales EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Buenos días, Avril! Bienvenidos a la segunda sesión de Ciencias Naturales con el Dr. Leonardo Darwin. ¿Te has preguntado de qué estamos hechos exactamente en el plano molecular? Si redujéramos a un ser humano a sus componentes químicos elementales, el 96% de su masa corporal está constituido por solo cuatro átomos: Carbono, Hidrógeno, Oxígeno y Nitrógeno (el célebre acrónimo CHON). Sin embargo, el carbono es el rey indiscutible de la biología gracias a su capacidad mágica de formar cuatro enlaces covalentes estables, construyendo cadenas, anillos y macromoléculas colosales. ¡Hoy exploraremos la cocina molecular de la vida!",
    "reading": "La doble hélice y la hecatombe de Rosalind Franklin: En la primavera de 1953, en el Laboratorio Cavendish de la Universidad de Cambridge, James Watson y Francis Crick publicaron un artículo de apenas una página en la revista Nature describiendo la estructura de la molécula más enigmática del cosmos: el ácido desoxirribonucleico (ADN). Pero el cimiento empírico fundamental provino de la Fotografía 51, una imagen de difracción de rayos X de nitidez insuperable obtenida por la biofísica británica Rosalind Franklin. Aquella fotografía reveló con elegancia matemática que el ADN es una doble hélice antiparalela, con un esqueleto exterior de fosfato y desoxirribosa, y peldaños interiores de cuatro bases nitrogenadas complementarias: Adenina con Timina, y Citosina con Guanina. En esa danza de cuatro letras ($A, T, C, G$) está escrito el libro de instrucciones para construir cada proteína de tu organismo.",
    "pedagogicalExplanation": "La materia viva se organiza a partir de cuatro macromoléculas orgánicas esenciales: 1) Glúcidos o carbohidratos (monómero: monosacáridos como la glucosa; función: combustible celular inmediato y reserva en glucógeno o almidón). 2) Lípidos (ácidos grasos y glicerol; función: reserva energética de alta densidad a largo plazo, aislamiento térmico y formación de la bicapa fosfolipídica de las membranas). 3) Proteínas (monómero: aminoácidos unidos por enlaces peptídicos; función: catálisis enzimática, transporte de oxígeno por hemoglobina, defensa inmunológica y soporte muscular). 4) Ácidos nucleicos (monómero: nucleótidos; función: almacenamiento y transmisión de la información genética hereditaria en ADN y ARN).",
    "vocabulary": [
      {
        "term": "Monómero",
        "definition": "Molécula simple de bajo peso molecular que puede unirse a otras idénticas o similares para formar un polímero.",
        "childFriendlyExample": "La glucosa es el monómero que al encadenarse por cientos forma el almidón de una papa."
      },
      {
        "term": "Enzima",
        "definition": "Proteína biocatalizadora especializada que acelera millones de veces la velocidad de las reacciones químicas celulares sin consumirse.",
        "childFriendlyExample": "La amilasa salival descompone los carbohidratos del pan mientras masticas."
      },
      {
        "term": "Nucleótido",
        "definition": "Unidad fundamental de los ácidos nucleicos, formada por un grupo fosfato, un azúcar pentosa y una base nitrogenada.",
        "childFriendlyExample": "Un nucleótido es como una letra tipográfica con la que se escribe el ADN."
      }
    ],
    "contextualizedExample": "El chocho (Lupinus mutabilis), leguminosa ancestral cultivada en la Sierra ecuatoriana, es considerado un superalimento andino debido a que contiene más del 50% de proteína vegetal completa y ácidos grasos insaturados de altísima calidad biológica.",
    "socraticQuestions": [
      "¿Por qué los osos andinos de anteojos y las aves migratorias acumulan lípidos (grasas) antes del invierno o viajes largos, en lugar de acumular exclusivamente carbohidratos?",
      "Si todas las proteínas están formadas por solo 20 aminoácidos diferentes en la naturaleza, ¿cómo es posible que existan cientos de miles de proteínas con funciones tan disímiles como la insulina, la queratina o el colágeno?",
      "¿Qué sucedería en la síntesis celular si en la dieta de un ser humano hubiera deficiencia severa de aminoácidos esenciales?"
    ],
    "practicalActivity": {
      "title": "Exploración molecular tridimensional en MolView / Biocatálogo",
      "instructions": [
        "Abre la plataforma de visualización química MolView (molview.org).",
        "Busca e interactúa con el modelo 3D de la molécula de Glucosa ($C_6H_{12}O_6$): cuenta los carbonos de su anillo piranósico.",
        "Carga la molécula de la Glicina ($C_2H_5NO_2$), el aminoácido más simple: identifica su grupo amino ($-NH_2$) y su grupo carboxilo ($-COOH$).",
        "Examina el fragmento helicoidal del ADN: observa cómo los puentes de hidrógeno unen las bases nitrogenadas centrales.",
        "Dibuja en tu libreta científica los tres esquemas moleculares identificando los enlaces de carbono con colores distintivos."
      ],
      "materials": [
        "Computadora o tablet",
        "Navegador web con WebGL activo",
        "Cuaderno de dibujo científico",
        "Lápices de colores"
      ]
    },
    "applicationActivity": {
      "title": "Auditoría nutricional de un almuerzo tradicional ecuatoriano",
      "task": "Analiza un plato tradicional ecuatoriano (por ejemplo: locro de papa con queso y aguacate, o encocado de pescado con arroz y plátano maduro). Descompón cada ingrediente en su biomolécula predominante (glúcidos simples/complejos, proteínas completas, lípidos saturados/insaturados). Justifica si provee los precursores moleculares necesarios para un estudiante de 12 años en etapa de crecimiento acelerado.",
      "deliverable": "Ficha técnica nutricional y bioquímica (tabla ilustrada con porcentajes estimados y justificación fisiológica)."
    },
    "formativeEvaluation": {
      "description": "Comprensión de las familias de biomoléculas, identificación de monómeros y valoración de la relación entre nutrición y bioquímica celular.",
      "expectedEvidence": "Avril clasifica correctamente glúcidos, lípidos, proteínas y ácidos nucleicos y justifica la importancia del carbono y los aminoácidos en la estructura viva."
    },
    "evaluationRubric": {
      "criterion": "Identificación y función de biomoléculas orgánicas en la célula (CN.4.1.2)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Memoriza los nombres de las biomoléculas pero confunde monómeros y funciones biológicas básicas."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Relaciona nutrientes con energía pero presenta dificultades para explicar la estructura de aminoácidos o la complementariedad del ADN."
        },
        {
          "level": "Consolidado",
          "descriptor": "Explica con precisión la versatilidad del carbono, distingue monómeros y polímeros, fundamenta la estructura de la doble hélice y evalúa dietas desde la bioquímica celular."
        }
      ]
    },
    "expectedFeedback": "Brillante trabajo de análisis bioquímico, Avril. Has articulado el rol del carbono y la estructura del ADN con una profundidad asombrosa. Reconocer a Rosalind Franklin y analizar la nutrición andina demuestra tu pensamiento holístico y ético.",
    "difficultyAdaptation": "Utilizar el juego de modelado con plastilina o clips de colores para encadenar monómeros formando polímeros visibles.",
    "advancedExtension": "Avril investiga la desnaturalización proteica por cambios de pH o temperatura, analizando por qué el jugo de limón \"cocina\" químicamente las proteínas del pescado en el ceviche.",
    "resources": [
      {
        "id": "class-sci-avril-02-res-1",
        "type": "simulator",
        "title": "MolView — Modelado Molecular 3D y Estructura Química",
        "url": "https://molview.org/",
        "description": "Herramienta OER abierta para visualizar y rotar macromoléculas orgánicas (glucosa, aminoácidos, nucleótidos) en 3D interactivo.",
        "duration": "25 min",
        "order": 1
      },
      {
        "id": "class-sci-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Bioquímica Celular y Código de la Vida",
        "url": "/api/v1/academic/classes/class-sci-avril-02/guide.pdf",
        "description": "Ficha de trabajo con estructuras químicas de Fisher, problemas de emparejamiento de bases nitrogenadas y auditoría nutricional.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-sci-avril-02-act-1",
        "title": "Rosalind Franklin y la Fotografía 51",
        "description": "Lee sobre el descubrimiento del ADN y reflexiona sobre el reconocimiento histórico a las científicas mujeres.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-sci-avril-02-act-2",
        "title": "Exploración Tridimensional en MolView",
        "description": "Modela glucosa y glicina en 3D y analiza la disposición espacial de los átomos de carbono.",
        "type": "practice",
        "points": 20,
        "completed": false
      },
      {
        "id": "class-sci-avril-02-act-3",
        "title": "Auditoría Nutricional Bioquímica",
        "description": "Elabora la ficha técnica del plato tradicional ecuatoriano descomponiendo sus macronutrientes esenciales.",
        "type": "project",
        "points": 20,
        "completed": false
      }
    ],
    "homeworkTask": "Revisa dos etiquetas de alimentos envasados de tu alacena e identifica el contenido en gramos de carbohidratos totales, azúcares simples, proteínas y grasas monoinsaturadas.",
    "reflectionPrompt": "¿Cómo influye la calidad de las moléculas que ingieres cada día en la calidad de tus pensamientos y tu energía vital?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_sci_avril_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-sci-avril-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-03-CNI",
      "subjectCode": "CNI-801",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-soc-avril-01",
    "subjectId": "soc-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Raíces Históricas del Ecuador: Del Poblamiento al Periodo Formativo",
    "theme": "El poblamiento de América y los cazadores-recolectores del Ecuador precerámico (El Inga, Chobshi, Las Vegas)",
    "objective": "Analizar las teorías científicas sobre el poblamiento del continente americano y examinar la forma de vida, tecnología lítica y adaptación ecológica de las primeras bandas recolectoras en el actual territorio ecuatoriano.",
    "learningPurpose": "Desarrollar una conciencia histórica crítica fundamentada en la evidencia arqueológica, reconociendo el ingenio humano ancestral frente a las inclemencias climáticas del pleistoceno tardío.",
    "competencyDcd": "CS.4.1.1 — Reconocer el estudio de la Historia como conocimiento esencial para entender nuestro pasado y nuestra identidad y para comprender cómo influyen en el mundo en que vivimos.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Ciencias Sociales EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Bienvenida a tu cátedra de Estudios Sociales, querida Avril! Te saluda la Dra. Valentina Chronos. La historia no es un catálogo empolvado de fechas muertas y nombres de batallas; es el espejo viviente donde descubrimos quiénes somos. Hace más de 12.000 años, pequeños grupos de seres humanos cruzaron estepas heladas siguiendo manadas de mastodontes y ciervos gigantes. Cuando esos pioneros llegaron a los valles andinos y a las costas del Pacífico ecuatoriano, no encontraron ciudades ni carreteras, sino una selva virgen y páramos desafiantes. Con piedra de obsidiana, hueso y madera tallaron su supervivencia. ¡Hoy descubriremos las huellas de los primeros habitantes de nuestra tierra!",
    "reading": "El misterio de los amantes de Sumpa en la península de Santa Elena: En el sitio arqueológico de Las Vegas, en la costa ecuatoriana, los arqueólogos dirigidos por la Dra. Karen Stothert desenterraron más de 190 esqueletos humanos que datan de hace 10.000 a 6.000 años antes del presente. Uno de los hallazgos más conmovedores del mundo prehistórico fue el entierro de \"Los Amantes de Sumpa\": un hombre de aproximadamente 25 años y una mujer de unos 20 años, sepultados juntos en un abrazo eterno, cubiertos con piedras grandes de caliza y colocados con infinita ternura fúnebre. Este vestigio demostró que aquellos antiguos habitantes no solo eran hábiles cazadores y recolectores de conchas y frutos, sino que poseían un complejo universo espiritual, rituales funerarios profundos y lazos afectivos inquebrantables.",
    "pedagogicalExplanation": "El estudio del poblamiento americano confronta la teoría clásica del estrecho de Bering (Alex Hrdlicka: migración asiática por el puente terrestre de Beringia durante la última glaciación) con teorías complementarias de navegación costera del Pacífico (Ruta de las Algas) y migraciones transoceánicas desde Melanesia/Polinesia (Paul Rivet). En el Ecuador, el período Precerámico o Paleoindio (12.000 a.C. - 3.900 a.C.) está representado por tres yacimientos fundamentales: 1) El Inga (Pichincha, faldas del Ilaló): campamento taller donde se descubrieron puntas de proyectil \"cola de pescado\" talladas en obsidiana volcánica y basalto. 2) Cueva Negra de Chobshi (Azuay): refugio rocoso de cazadores de cérvidos y conejos con instrumentos de sílex y hueso. 3) Las Vegas (Santa Elena): cazadores-recolectores marinos que desarrollaron las primeras evidencias de protocultivo de calabazas y zapallos.",
    "vocabulary": [
      {
        "term": "Paleoindio / Precerámico",
        "definition": "Etapa histórica más antigua de la ocupación humana en América, caracterizada por bandas nómadas de cazadores-recolectores que no producían alfarería.",
        "childFriendlyExample": "El período precerámico es cuando los seres humanos utilizaban recipientes de calabaza o corteza antes de inventar las ollas de barro cocido."
      },
      {
        "term": "Tecnología lítica",
        "definition": "Conjunto de técnicas ancestrales para transformar la piedra (mediante percusión y presión) en herramientas de corte, raspado y caza.",
        "childFriendlyExample": "Tallar una punta de flecha en obsidiana negra afilada es un ejemplo supremo de tecnología lítica."
      },
      {
        "term": "Nómada estacional",
        "definition": "Modo de vida en el cual los grupos humanos se desplazan periódicamente siguiendo las rutas de migración de animales y la maduración de frutos silvestres.",
        "childFriendlyExample": "Las bandas de El Inga subían al páramo en época de venados y bajaban al valle en época de frutas."
      }
    ],
    "contextualizedExample": "La obsidiana utilizada en El Inga provenía de los flujos de lava del volcán Mullumica en la cordillera Oriental, lo que demuestra que hace 10.000 años ya existían rutas de intercambio y expediciones especializadas a más de 4.000 metros de altitud.",
    "socraticQuestions": [
      "¿Por qué el hallazgo de \"Los Amantes de Sumpa\" refuta la vieja idea decimonónica de que los pueblos prehistóricos eran \"salvajes sin sentimientos ni cultura\"?",
      "¿Qué propiedades físicas hacían de la obsidiana volcánica un material superior al hueso o la madera para la confección de cuchillos y puntas de flecha?",
      "Si el clima de la Tierra cambió drásticamente al finalizar la última Era de Hielo hace 11.000 años, ¿cómo obligó eso a los humanos a transformar sus estrategias de caza y recolección?"
    ],
    "practicalActivity": {
      "title": "Cartografía arqueológica y línea de tiempo del Ecuador Precerámico",
      "instructions": [
        "En un mapa mudo del Ecuador a escala, ubica con precisión geográfica los tres sitios arqueológicos primordiales: El Inga (Pichincha), Chobshi (Azuay) y Las Vegas (Santa Elena).",
        "Dibuja un icono representativo al lado de cada sitio: punta cola de pescado en El Inga, cueva con fogata en Chobshi, y conchas marinas con calabaza en Las Vegas.",
        "Traza las posibles rutas migratorias andinas y marítimas.",
        "Construye una línea de tiempo horizontal señalando el año estimado de ocupación y los artefactos hallados en cada yacimiento."
      ],
      "materials": [
        "Mapa físico del Ecuador impreso o dibujado",
        "Regla milimetrada",
        "Lápices de colores y rotulador microfino"
      ]
    },
    "applicationActivity": {
      "title": "El diario de campo de un arqueólogo en Las Vegas",
      "task": "Redacta una crónica de simulación histórica en primera persona (1 página): Eres una joven arqueóloga que excava en la península de Santa Elena en 1970 y descubre un artefacto precerámico inesperado (una azuela de caracol marino o un grano de polen fósil de calabaza). Describe el hallazgo, cómo utilizas el método estratigráfico para fecharlo y qué conclusiones extraes sobre la dieta y vida cotidiana de aquel pueblo.",
      "deliverable": "Crónica arqueológica ilustrada en el portafolio de Ciencias Sociales con vocabulario técnico preciso."
    },
    "formativeEvaluation": {
      "description": "Comprensión de las rutas de poblamiento, caracterización de los yacimientos precerámicos del Ecuador y valoración de la evidencia arqueológica.",
      "expectedEvidence": "Avril explica las teorías migratorias con respaldo geográfico y contrasta las adaptaciones ecológicas de la Sierra (El Inga/Chobshi) frente a la Costa (Las Vegas)."
    },
    "evaluationRubric": {
      "criterion": "Análisis de los procesos de poblamiento y cazadores precerámicos en el Ecuador (CS.4.1.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Enumera nombres de sitios sin ubicarlos geográficamente ni comprender el significado del período precerámico."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Describe las características de los yacimientos pero le cuesta vincular el cambio climático con la transición tecnológica."
        },
        {
          "level": "Consolidado",
          "descriptor": "Analiza críticamente las teorías migratorias, ubica cartográficamente los yacimientos ecuatorianos con precisión y argumenta la complejidad social temprana a partir de evidencias materiales."
        }
      ]
    },
    "expectedFeedback": "Extraordinaria recreación histórica y análisis arqueológico, Avril. Has articulado las evidencias líticas de El Inga con la sensibilidad humana de Las Vegas de forma conmovedora. Demuestras una comprensión histórica viva y rigurosa.",
    "difficultyAdaptation": "Proveer un mapa interactivo con pines de colores preubicados y fichas de asociación de artefactos (punta lítica, concha, arpón).",
    "advancedExtension": "Avril investiga la polémica científica de Monte Verde (Chile) y cómo sus dataciones de más de 14.500 años obligaron a revisar el paradigma \"Clovis First\" en toda la academia internacional.",
    "resources": [
      {
        "id": "class-soc-avril-01-res-1",
        "type": "simulator",
        "title": "Instituto Nacional de Patrimonio Cultural (INPC) — Atlas Arqueológico del Ecuador",
        "url": "https://www.patrimoniocultural.gob.ec/",
        "description": "Portal oficial del INPC con catálogos de piezas líticas, mapas de yacimientos precerámicos y fotografías de excavaciones.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-soc-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Poblamiento Americano y Precerámico Ecuatoriano",
        "url": "/api/v1/academic/classes/class-soc-avril-01/guide.pdf",
        "description": "Ficha de trabajo con mapas mudos, infografías de puntas de obsidiana y desafíos socráticos de cronología histórica.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soc-avril-01-act-1",
        "title": "El Abrazo de Sumpa",
        "description": "Analiza el entierro ceremonial de Las Vegas y reflexiona sobre la dimensión espiritual de los primeros habitantes.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-soc-avril-01-act-2",
        "title": "Cartografía de los Sitios Precerámicos",
        "description": "Traza en el mapa del Ecuador los yacimientos de El Inga, Chobshi y Las Vegas con sus respectivos vestigios.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soc-avril-01-act-3",
        "title": "Diario de Campo Arqueológico",
        "description": "Redacta la crónica simulada del descubrimiento de un vestigio prehistórico aplicando el método estratigráfico.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Investiga con tu familia qué montañas, volcanes o ríos cercanos a tu localidad fueron habitados por pueblos ancestrales y anota un dato interesante en tu cuaderno.",
    "reflectionPrompt": "¿Qué significa saber que bajo el suelo donde caminamos hoy laten más de diez milenios de historias humanas?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soc_avril_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-soc-avril-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-04-SOC",
      "subjectCode": "SOC-801",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-soc-avril-02",
    "subjectId": "soc-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Raíces Históricas del Ecuador: Del Poblamiento al Periodo Formativo",
    "theme": "La revolución agrícola y la cultura Valdivia: Primeras sociedades aldeanas, domesticación de plantas y alfarería",
    "objective": "Explicar la transición del nomadismo al sedentarismo agrícola en el Período Formativo Temprano, caracterizando la innovación alfarera, el rol protagónico de la mujer y la cosmovisión de la Cultura Valdivia (4000 a.C. - 1500 a.C.).",
    "learningPurpose": "Comprender que la domesticación de semillas y la invención de la cerámica transformaron radicalmente la estructura social, dando origen a las primeras aldeas complejas y a un arte simbólico de trascendencia mundial.",
    "competencyDcd": "CS.4.1.2 — Describir el surgimiento de la agricultura en América y su impacto en la complejización de las sociedades humanas, reconociendo la cultura Valdivia y el rol femenino en la alfarería y la organización social.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Ciencias Sociales EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Feliz viernes de investigación histórica, Avril! Te saluda nuevamente la Dra. Valentina Chronos. Imagina un invento tan revolucionario que cambió para siempre el destino de la humanidad, más trascendental incluso que la invención de la rueda o de la imprenta. Ese invento fue la AGRICULTURA: la paciencia y el conocimiento botánico para sembrar una semilla en la tierra fértil, regarla y esperar su fruto. Con la agricultura nació el hogar permanente, el almacenamiento de alimentos y la necesidad de fabricar recipientes herméticos de barro cocido. En la costa de lo que hoy es Santa Elena y Manabí floreció hace 6.000 años la CULTURA VALDIVIA, una de las civilizaciones alfareras más antiguas de todo el continente americano. ¡Acompáñame a explorar su fascinante aldea de Real Alto!",
    "reading": "Las Venus de Valdivia y el enigma de Real Alto: En 1956, el célebre arqueólogo guayaquileño Emilio Estrada Ycaza descubrió restos cerámicos de una antigüedad pasmosa en la costa ecuatoriana. En el sitio de Real Alto, los arqueólogos revelaron una aldea planificada en forma de herradura, con más de 100 viviendas comunales alrededor de una plaza central ceremonial. Pero el hallazgo que cautivó al mundo fueron las \"Venus de Valdivia\": estatuillas de arcilla cocida que representan figuras femeninas con peinados monumentales, vientres grávidos y posturas de autoridad y fertilidad. Al principio se tallaban en piedra blanda, pero luego las mujeres alfareras dominaron la técnica del modelado en arcilla y la cocción en hornos abiertos, decorándolas con engobe rojo pulido. Aquellas estatuillas no eran juguetes; eran amuletos sagrados vinculados a la fertilidad de la tierra (la Pachamama), al ciclo menstrual, a la lluvia y a una estructura social matrilineal donde la mujer era el eje de la vida comunitaria.",
    "pedagogicalExplanation": "El Período Formativo ecuatoriano (4.000 a.C. - 500 a.C.) marca la superación del modo de vida nómada gracias a tres pilares interdependientes: 1) La domesticación del maíz (Zea mays), frijol, yuca, algodón y zapallo, que permitió generar excedentes alimentarios y sostener poblaciones sedentarias densas. 2) La invención de la alfarería cerámica: vasijas para cocinar granos duros, ollas de almacenamiento impermeables y cuencos rituales decorados con incisiones y pintura iridiscente. 3) La complejización sociopolítica: división del trabajo entre agricultores, alfareros, tejedores y chamanes, y surgimiento de centros ceremoniales ceremoniales como Real Alto, donde se administraba el intercambio de la codiciada concha sagrada Spondylus princeps (\"el alimento de los dioses\").",
    "vocabulary": [
      {
        "term": "Período Formativo",
        "definition": "Etapa histórica caracterizada por el surgimiento de aldeas sedentarias permanentes, agricultura intensiva y producción de cerámica alfarera.",
        "childFriendlyExample": "Durante el formativo, la cultura Valdivia inventó las primeras ollas de barro cocido del Ecuador."
      },
      {
        "term": "Matrilineal",
        "definition": "Sistema de organización social y de parentesco en el cual la herencia de bienes, tierras y linaje se transmite a través de la línea materna.",
        "childFriendlyExample": "En una sociedad matrilineal, la casa y los campos pertenecen a las madres e hijas."
      },
      {
        "term": "Spondylus princeps",
        "definition": "Molusco bivalvo de color rojo espinoso originario de las aguas cálidas del Pacífico ecuatoriano, utilizado como moneda sagrada e indicador astronómico del fenómeno de El Niño.",
        "childFriendlyExample": "La concha Spondylus era el tesoro más codiciado de los Andes, equivalente al oro o las esmeraldas."
      }
    ],
    "contextualizedExample": "Las investigaciones en Real Alto demostraron que la plaza central de Valdivia estaba orientada astronómicamente hacia los solsticios, permitiendo a los agricultores ancestrales anticipar las épocas de lluvia y siembra con extraordinaria precisión calendárica.",
    "socraticQuestions": [
      "¿Por qué la domesticación de plantas condujo inevitablemente a la invención de la cerámica? ¿Qué relación hay entre comer maíz cocido y tener recipientes de barro refractario al fuego?",
      "Si la gran mayoría de las estatuillas de Valdivia representan a mujeres en diversas etapas de su ciclo biológico (juventud, embarazo, maternidad y vejez sabia), ¿qué nos revela esto sobre el estatus y el poder social de la mujer en aquella civilización?",
      "¿Cómo crees que el almacenamiento de excedentes agrícolas cambió las relaciones de poder en una aldea comparado con una banda nómada donde no se acumulaba comida?"
    ],
    "practicalActivity": {
      "title": "Análisis estético e iconográfico de una Venus de Valdivia",
      "instructions": [
        "Observa con atención la lámina técnica de una Venus de Valdivia del Museo Nacional del Ecuador (MuNa).",
        "Examina tres rasgos anatómicos y estilísticos: a) El tratamiento escultórico del cabello (peinado escalonado o casco trenzado); b) Los ojos incisos tipo \"grano de café\"; c) La ausencia o esquematización de brazos y pies.",
        "Dibuja en tu cuaderno de arte e historia un boceto a escala de la estatuilla indicando con flechas los detalles iconográficos.",
        "Formula dos hipótesis sobre el uso ritual que los chamanes de Valdivia daban a estas piezas (¿curación, rito de fertilidad agrícola, paso a la pubertad?)."
      ],
      "materials": [
        "Cuaderno de dibujo",
        "Lápiz HB y 2B",
        "Regla",
        "Lámina de arqueología del MuNa"
      ]
    },
    "applicationActivity": {
      "title": "Maqueta conceptual o infografía de la aldea de Real Alto",
      "task": "Diseña una infografía arquitectónica de la aldea de Real Alto: representa la plaza central, el montículo ceremonial de los osarios, las viviendas elípticas de caña y bahareque, las parcelas de cultivo de maíz y los talleres alfareros. Explica en tres cuadros explicativos cómo se organizaba la vida comunitaria y la cooperación agrícola entre las familias.",
      "deliverable": "Infografía en cartulina o formato digital con rotulación clara y leyenda de funciones sociopolíticas."
    },
    "formativeEvaluation": {
      "description": "Capacidad para explicar la revolución neolítica/formativa en América, identificar la cultura Valdivia y valorar el rol de la mujer en las sociedades tempranas.",
      "expectedEvidence": "Avril argumenta con claridad el impacto del cultivo del maíz y la cerámica en el sedentarismo y explica la iconografía femenina de Valdivia sin caer en anacronismos."
    },
    "evaluationRubric": {
      "criterion": "Comprensión de la agricultura y la Cultura Valdivia en el Período Formativo (CS.4.1.2)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Reconoce que Valdivia hacía vasijas pero desconoce su antigüedad y no vincula la agricultura con la vida aldeana."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Describe las estatuillas femeninas pero le cuesta explicar la importancia económica de los excedentes agrícolas o la organización matrilineal."
        },
        {
          "level": "Consolidado",
          "descriptor": "Explica con rigor histórico la transición formativa, analiza la iconografía de las Venus en relación con la fertilidad y la estructura social, y dimensiona la relevancia de Real Alto como hito civilizatorio americano."
        }
      ]
    },
    "expectedFeedback": "Un trabajo de análisis cultural digno de una historiadora profesional, Avril. Tu comprensión de la concha Spondylus, el culto a la fertilidad y la organización aldeana de Real Alto revela un profundo respeto por nuestras raíces ancestrales ecuatorianas.",
    "difficultyAdaptation": "Proporcionar una plantilla con el contorno de la aldea y fichas ilustradas para ubicar las zonas residenciales, agrícolas y ceremoniales.",
    "advancedExtension": "Avril investiga la hipótesis de contacto transpacífico formulada por Emilio Estrada (influencia de la cultura Jōmon de Japón) y analiza por qué la arqueología moderna descartó esa teoría al hallar antecedentes cerámicos locales en San Pedro y Las Vegas.",
    "resources": [
      {
        "id": "class-soc-avril-02-res-1",
        "type": "simulator",
        "title": "Museo Nacional del Ecuador (MuNa) — Sala del Período Formativo y Valdivia",
        "url": "https://muna.culturaypatrimonio.gob.ec/",
        "description": "Recorrido virtual y catálogo de piezas cerámicas, morteros zoomorfos y estatuillas de Valdivia, Machalilla y Chorrera.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-soc-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Revolución Agrícola y Cultura Valdivia",
        "url": "/api/v1/academic/classes/class-soc-avril-02/guide.pdf",
        "description": "Ficha de trabajo con planos de Real Alto, análisis iconográfico de las Venus y ejercicios de interpretación formativa.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soc-avril-02-act-1",
        "title": "El Descubrimiento de Emilio Estrada",
        "description": "Lee el relato arqueológico del hallazgo de Valdivia y reflexiona sobre el valor de la curiosidad científica.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-soc-avril-02-act-2",
        "title": "Análisis Iconográfico de la Venus",
        "description": "Dibuja y documenta los rasgos estilísticos de las estatuillas cerámicas de Valdivia y su simbolismo.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soc-avril-02-act-3",
        "title": "Infografía de la Aldea de Real Alto",
        "description": "Diseña el plano funcional de la aldea comunitaria explicando la división social del trabajo agrícola.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Siembra una semilla de frijol o maíz en un frasco con algodón húmedo en casa y anota los primeros brotes para experimentar la paciencia de los primeros agricultores.",
    "reflectionPrompt": "¿Qué sabiduría ancestral sobre el cuidado del suelo y las semillas podemos aprender hoy de las mujeres de Valdivia?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soc_avril_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-soc-avril-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-04-SOC",
      "subjectCode": "SOC-801",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-ing-avril-01",
    "subjectId": "ing-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unit 1: Critical Thinking & Global Discourse (CEFR B1)",
    "theme": "Stating Opinions & Defending Arguments in Academic Discourse",
    "objective": "Articulate personal viewpoints and defend hypotheses on ethical and environmental topics using formal B1 discourse formulas (e.g., \"From my perspective\", \"The evidence indicates that\", \"In contrast to\").",
    "learningPurpose": "Elevate conversational English from simple descriptive sentences to structured, persuasive reasoning suitable for international academic dialogues and debates.",
    "competencyDcd": "EFL.4.2.1 — Understand phrases and expressions related to areas of most immediate priority and participate in short social exchanges or debates with spontaneous articulation (CEFR B1).",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Lengua Extranjera Inglés EGB Superior / Marco Común Europeo de Referencia (MCER B1)",
    "introduction": "Welcome to your Advanced English Seminar, dear Avril! I am Professor Sarah Mitchell. Speaking English at an intermediate B1 level does not mean simply knowing how to order food or introduce your family; it means having the linguistic power to express your intellect, question assumptions, and defend ideas that matter to our world. In today’s globalized reality, young thinkers like you lead debates on climate conservation, artificial intelligence ethics, and social equity in the international lingua franca. Today, we leave behind informal phrases like \"I like it because it is good\" and step into the arena of formal academic argumentation. Let’s train your rhetorical muscles!",
    "reading": "The Great Galapagos Conservation Dilemma: Consider this real-world scenario from the Galapagos Islands. On one hand, ecotourism brings millions of dollars to Ecuador, providing livelihoods for local families and funding scientific research. On the other hand, the carbon footprint of transcontinental flights and the risk of introducing invasive alien species pose severe threats to fragile endemic wildlife, such as the marine iguana and the giant tortoise. When international scientists debate this issue, they do not shout or use emotional rhetoric; they state: \"While tourism generates substantial economic resources, uncontrolled visitor expansion fundamentally jeopardizes ecological equilibrium.\" Notice the grammatical balance: an introductory concession clause (\"While...\") followed by a strong, evidence-backed assertion. That is the architecture of mature English discourse.",
    "pedagogicalExplanation": "To articulate arguments at the CEFR B1 level, students master a three-step rhetorical framework: 1) Position Statement (The Claim): Introduce your stance with formal hedges and stance markers (\"In my view...\", \"It seems evident that...\", \"I maintain that...\"). 2) Supporting Evidence (The Premise): Provide empirical rationale or contextual data using transitional phrases (\"According to recent data...\", \"For instance...\", \"This is corroborated by...\"). 3) Counter-Argument Qualification (Rebuttal): Acknowledge opposing viewpoints before reaffirming your thesis (\"Although opponents argue that X, evidence demonstrates that Y because Z\").",
    "vocabulary": [
      {
        "term": "Claim",
        "definition": "An assertion or proposition that states the primary point of an argument which can be questioned or debated.",
        "childFriendlyExample": "Her claim was that solar energy is more sustainable than fossil fuels in high-altitude Andean towns."
      },
      {
        "term": "Counter-argument",
        "definition": "An argument or viewpoint put forward to oppose, qualify, or refute an earlier argument.",
        "childFriendlyExample": "He addressed the counter-argument that electric vehicles are expensive by pointing out long-term fuel savings."
      },
      {
        "term": "Stance marker",
        "definition": "A phrase used by a speaker or writer to signal their personal attitude, confidence, or position toward an idea.",
        "childFriendlyExample": "Phrases like \"Undoubtedly\" and \"From my perspective\" are powerful stance markers."
      }
    ],
    "contextualizedExample": "Debating whether Ecuador should ban single-use plastics in the Andean highlands: \"While plastic packaging is inexpensive for small merchants, its non-biodegradable nature causes irreversible pollution in highland páramo watersheds; therefore, adopting biodegradable banana-fiber alternatives is an ecological imperative.\"",
    "socraticQuestions": [
      "Why does beginning a sentence with \"While it is true that...\" make your overall argument stronger than simply ignoring the opposing view?",
      "How does substituting \"I think\" with \"The available evidence indicates that\" change how an international audience perceives your intellectual credibility?",
      "If a debater makes a personal attack (ad hominem) in an academic discussion, which English phrase could you use to politely redirect the debate back to the facts?"
    ],
    "practicalActivity": {
      "title": "The Socratic Debate Arena: Galapagos Tourism Ethics",
      "instructions": [
        "Listen to the BBC Learning English B1 audio track on environmental dilemmas.",
        "Choose one stance on the Galapagos dilemma: A) Pro-Tourism Regulation, or B) Pro-Community Economic Development.",
        "Draft a formal argument speech of exactly 5 sentences following the 3-step framework (Claim, Evidence, Counter-argument rebuttal).",
        "Record a 60-second voice memo in English articulating your speech with clear pronunciation, correct intonation, and confident pacing.",
        "Self-evaluate your recording using the ALSIZ CEFR B1 pronunciation and fluency checklist."
      ],
      "materials": [
        "Audio player / smartphone microphone",
        "English notebook",
        "CEFR B1 Argumentation cheat-sheet"
      ]
    },
    "applicationActivity": {
      "title": "B1 Opinion Editorial: Sustainable Fashion in Ecuador",
      "task": "Write an opinion paragraph (80-100 words) in English addressing the problem of \"Fast Fashion vs. Traditional Artisanal Textiles in Otavalo\". Include at least two stance markers, one concession clause starting with \"Although\" or \"While\", and one conclusion marker (\"Consequently\" or \"Therefore\").",
      "deliverable": "Typed or neatly handwritten paragraph in the English Writing Portfolio with peer-review rubrics attached."
    },
    "formativeEvaluation": {
      "description": "Assessment of oral and written argumentation fluency, accurate use of B1 stance markers and ability to formulate balanced rebuttals.",
      "expectedEvidence": "Avril constructs clear compound and complex sentences in English expressing a defendable stance with appropriate transitional discourse markers."
    },
    "evaluationRubric": {
      "criterion": "Oral and written academic argumentation at CEFR B1 level (EFL.4.2.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Uses isolated words and elementary phrases (A1/A2); struggles to link sentences logically or relies heavily on Spanish translation."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Expresses opinions using basic connectors (because, but, so); attempts formal phrases but shows occasional pauses or grammatical inaccuracies."
        },
        {
          "level": "Consolidado",
          "descriptor": "Fluently articulates complex arguments using varied B1 discourse markers (furthermore, in contrast, evidence suggests); demonstrates clear pronunciation and coherent paragraph architecture."
        }
      ]
    },
    "expectedFeedback": "Outstanding linguistic maturity, Avril! Your speech on Galapagos was persuasive, well-structured, and delivered with natural inflection. Moving beyond \"I think\" to \"The evidence indicates\" demonstrates genuine B1+ academic proficiency.",
    "difficultyAdaptation": "Provide a sentence-frame organizer with color-coded slots for Claim, Reason, and Rebuttal to guide speech drafting.",
    "advancedExtension": "Avril drafts a formal 150-word letter in English to an international conservation NGO proposing a youth ambassadors program for Ecuadorian cloud forests.",
    "resources": [
      {
        "id": "class-ing-avril-01-res-1",
        "type": "simulator",
        "title": "BBC Learning English — 6 Minute English: Environmental Dilemmas & Debate",
        "url": "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
        "description": "Official British public broadcaster educational podcast featuring authentic dialogues, vocabulary glossaries, and debate structures.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-ing-avril-01-res-2",
        "type": "pdf",
        "title": "ALSIZ English Guide — Academic Argumentation & Stance Formulas (B1)",
        "url": "/api/v1/academic/classes/class-ing-avril-01/guide.pdf",
        "description": "Pedagogical handbook with phrase banks, rhetorical organizers, and pronunciation exercises for Ecuadorian students.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-ing-avril-01-act-1",
        "title": "The Galapagos Dilemma Analysis",
        "description": "Read the case study and identify the concession clause and main claim in the text.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-ing-avril-01-act-2",
        "title": "Socratic Debate Voice Recording",
        "description": "Record a 60-second speech in English following the 3-step academic argumentation model.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-ing-avril-01-act-3",
        "title": "B1 Opinion Editorial Writing",
        "description": "Draft the 100-word persuasive paragraph on sustainable textiles applying target connectors.",
        "type": "writing",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Listen to a 5-minute English podcast or news report and transcribe three sentences that express an opinion or provide supporting evidence.",
    "reflectionPrompt": "How does mastering English enable you to share the cultural and biological treasures of Ecuador with the entire planet?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_ing_avril_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-ing-avril-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-05-ING",
      "subjectCode": "ING-801",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-ing-avril-02",
    "subjectId": "ing-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "08:45 - 09:30 (45 min)",
    "unit": "Unit 1: Critical Thinking & Global Discourse (CEFR B1)",
    "theme": "Discourse Markers & Cause-Effect Relationships in Persuasive Speaking and Writing",
    "objective": "Synthesize complex ideas by employing varied discourse markers of cause, effect, and concession (consequently, as a result, on the other hand, nevertheless) in a coherent persuasive essay paragraph.",
    "learningPurpose": "Transform isolated ideas into a flowing river of reasoned thought, ensuring that readers and listeners can follow your logical chain effortlessly.",
    "competencyDcd": "EFL.4.3.1 — Write straightforward connected texts on a range of familiar subjects within one’s field of interest, by linking a series of shorter discrete elements into a linear sequence (CEFR B1).",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Lengua Extranjera Inglés EGB Superior / Marco Común Europeo de Referencia (MCER B1)",
    "introduction": "Good morning, Avril! Welcome to our Friday English workshop with Professor Sarah Mitchell. Have you ever read an essay that felt like a bumpy gravel road, jumping from one disjointed sentence to another? What turns a rough road into a smooth highway of thought is the strategic use of DISCOURSE MARKERS. In English linguistics, discourse markers are the road signs of prose: they warn the reader when a curve is coming (\"However...\"), show when two roads merge (\"Furthermore...\"), and indicate the final destination (\"Consequently...\"). Today, we will master the logic of cause, effect, and contrast to give your English writing elegance, authority, and seamless cohesion.",
    "reading": "The Chemistry of Words: Connectors as Molecular Bonds: In physical chemistry, individual atoms cannot create a living cell unless they are bonded by stable covalent interactions. Similarly, in written English, brilliant ideas remain fragmented notes unless they are bonded by logical connectors. Examine how a professional editorial links thoughts: \"Urban vertical farming reduces agricultural water consumption by up to ninety percent. Furthermore, it eliminates the need for long-distance refrigerated transportation. Consequently, cities that adopt vertical greenhouses dramatically diminish their overall carbon emissions, even though initial capital expenditures remain relatively high.\" Notice how the ideas flow seamlessly from innovation to efficiency, then to ecological consequence, and finally to an economic qualification. The text feels alive, deliberate, and undeniably persuasive.",
    "pedagogicalExplanation": "Discourse markers at CEFR B1 are classified into specific semantic families: 1) Addition and Reinforcement: moreover, furthermore, in addition to, besides. 2) Cause and Reason: owing to, due to the fact that, since, given that. 3) Effect and Consequence: consequently, as a result, therefore, thus. 4) Contrast and Concession: whereas, on the contrary, nevertheless, despite the fact that. Effective writers never repeat the same connector twice in a single paragraph; they select words that reflect the exact degree of logical relationship they intend to communicate.",
    "vocabulary": [
      {
        "term": "Discourse marker",
        "definition": "A word or phrase whose function is to organize written or spoken discourse into a coherent, logically linked structure.",
        "childFriendlyExample": "The word \"Nevertheless\" is a discourse marker signaling that an unexpected result follows."
      },
      {
        "term": "Concession",
        "definition": "Acknowledging a valid point made by the opposing side to demonstrate fairness and thoroughness.",
        "childFriendlyExample": "Saying \"Although it was raining, the team completed the marathon\" contains a concession."
      },
      {
        "term": "Cohesion",
        "definition": "The grammatical and lexical linking within a text that holds it together and gives it meaning.",
        "childFriendlyExample": "Cohesion is the invisible glue that makes your essay feel like a single unified piece."
      }
    ],
    "contextualizedExample": "Analyzing renewable energy in the Ecuadorian Andes: \"The Andean mountain range possesses extraordinary wind power potential; nevertheless, constructing high-altitude wind turbines presents complex logistical challenges. As a result, hybrid wind-solar systems are currently being prioritized by environmental engineers.\"",
    "socraticQuestions": [
      "What is the subtle difference in tone and meaning between \"but\" and \"nevertheless\" in a formal written paragraph?",
      "If you write \"The crops failed because of severe drought; therefore, food prices rose\", which connector indicates cause and which indicates consequence?",
      "Why does overusing simple words like \"and... and... and...\" make writing sound childlike, and how do words like \"furthermore\" and \"in addition\" transform that tone?"
    ],
    "practicalActivity": {
      "title": "The Cohesion Architecture Workshop: British Council OER",
      "instructions": [
        "Access the British Council LearnEnglish Teens portal on Linking Words and Paragraph Cohesion.",
        "Read the 6 unlinked sentences describing clean energy in Latin America.",
        "Reorder and synthesize them into a single, beautifully articulated 80-word paragraph.",
        "Incorporate exactly one addition marker, one contrast marker, and one result marker without repeating any connector.",
        "Highlight each discourse marker in green and underline the cause-and-effect relationship in blue."
      ],
      "materials": [
        "Computer or tablet",
        "LearnEnglish Teens grammar practice sheet",
        "English notebook and colored highlighters"
      ]
    },
    "applicationActivity": {
      "title": "Persuasive Mini-Essay: Youth Mental Well-being & Screen Time",
      "task": "Compose a 100-120 word mini-essay arguing for a healthy balance between digital devices and physical outdoor recreation for teenagers. Your paragraph must contain: an introductory topic sentence, three supporting arguments linked by varied B1 discourse markers (e.g., \"Owing to...\", \"On the one hand... On the other hand...\", \"As a consequence...\"), and a concluding synthesis statement.",
      "deliverable": "Neatly typed or written mini-essay submitted to the ALSIZ Student Portal with self-assessment checklist completed."
    },
    "formativeEvaluation": {
      "description": "Evaluation of syntactic precision, lexical variety in connectors and logical progression of arguments in English.",
      "expectedEvidence": "Avril writes a cohesive paragraph using at least three distinct categories of discourse markers without grammatical errors in punctuation or sentence fragments."
    },
    "evaluationRubric": {
      "criterion": "Written paragraph cohesion and discourse markers at CEFR B1 level (EFL.4.3.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Struggles to connect sentences; relies exclusively on \"and\", \"but\", and \"because\" with frequent punctuation errors."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Uses B1 connectors (however, therefore) but occasionally places them incorrectly or creates comma splices."
        },
        {
          "level": "Consolidado",
          "descriptor": "Skillfully crafts cohesive paragraphs using varied markers of cause, contrast, and consequence with proper punctuation (semicolons, commas) and clear rhetorical intent."
        }
      ]
    },
    "expectedFeedback": "Magnificent writing craftsmanship, Avril! Your paragraph demonstrates a sophisticated command of transitional phrases. The rhythm of your sentences is natural, and your logical deductions are compelling. Keep expanding your academic vocabulary!",
    "difficultyAdaptation": "Provide a connector substitution chart showing basic connectors alongside their formal B1 equivalents (e.g., but -> however; so -> therefore).",
    "advancedExtension": "Avril analyzes a real excerpt from a United Nations environmental declaration, underlining all concession markers and explaining how they build diplomatic consensus.",
    "resources": [
      {
        "id": "class-ing-avril-02-res-1",
        "type": "simulator",
        "title": "British Council LearnEnglish Teens — Linking Words & Paragraph Cohesion",
        "url": "https://learnenglishteens.britishcouncil.org/skills/writing/b1-writing",
        "description": "Official British Council educational resource for B1 intermediate learners with interactive exercises on discursive cohesion.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-ing-avril-02-res-2",
        "type": "pdf",
        "title": "ALSIZ English Guide — Cohesion Markers & Cause-Effect Syntax (B1)",
        "url": "/api/v1/academic/classes/class-ing-avril-02/guide.pdf",
        "description": "Worksheet featuring connector transformation drills, punctuation rules for conjunctive adverbs, and essay templates.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-ing-avril-02-act-1",
        "title": "Discourse Marker Diagnostics",
        "description": "Analyze sample sentences and categorize connectors into addition, contrast, cause, or result.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-ing-avril-02-act-2",
        "title": "Cohesion Architecture Practice",
        "description": "Rewrite fragmented sentences into a cohesive paragraph using targeted B1 transition words.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-ing-avril-02-act-3",
        "title": "Persuasive Mini-Essay on Screen Time",
        "description": "Write the 120-word essay applying the cause-effect discourse framework with accurate punctuation.",
        "type": "writing",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Find an English article from an online magazine (like National Geographic Kids or Science News Explores) and find 4 different discourse markers used by the author.",
    "reflectionPrompt": "How does learning to connect your thoughts with clarity in English give you confidence when speaking in front of people from diverse cultures?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_ing_avril_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-ing-avril-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-05-ING",
      "subjectCode": "ING-801",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-adm-avril-01",
    "subjectId": "adm-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Emprendimiento y Modelos de Negocio: De la Idea a la Propuesta de Valor",
    "theme": "De la idea al problema real: Metodología Lean Startup y propuesta de valor",
    "objective": "Identificar necesidades desatendidas y dolores reales en la comunidad mediante observación empírica, formulando una propuesta de valor diferencial bajo el ciclo \"Construir-Medir-Aprender\" de Lean Startup.",
    "learningPurpose": "Desarrollar una mentalidad emprendedora basada en la empatía y la experimentación científica, comprendiendo que los negocios exitosos no nacen de ocurrencias caprichosas, sino de resolver problemas genuinos de las personas.",
    "competencyDcd": "ADM.8.1 — Identificar problemas y necesidades desatendidas en la comunidad mediante observación empírica y formular propuestas de solución con enfoque Lean Startup.",
    "officialSource": "Currículo Complementario ALSIZ — Marco de Competencias para el Emprendimiento Siglo XXI / Canvas Strategyzer",
    "introduction": "¡Bienvenida a tu academia de Administración y Emprendimiento, estimada Avril! Te saluda la MBA Carla Fonseca. El error más común y costoso que cometen miles de emprendedores en el mundo es enamorarse ciegamente de una idea antes de verificar si a alguien realmente le importa. Gastan meses de trabajo y ahorros construyendo un producto que nadie necesita. En el siglo XXI, el emprendimiento no es una lotería; es una disciplina científica. El pionero Eric Ries demostró que un emprendedor debe actuar como un científico de laboratorio: formula una hipótesis sobre un dolor humano, construye un experimento mínimo viable, mide los datos reales del mercado y aprende rápido. ¡Hoy aprenderemos a descubrir dolores reales y transformarlos en propuestas de valor irresistibles!",
    "reading": "El mito del invento perfecto y la lección del café andino: Dos jóvenes universitarios en Quito decidieron emprender en el rubro del café de especialidad. El primero gastó miles de dólares en importar una máquina italiana de diseño futurista, diseñar un logotipo dorado y alquilar un local costoso en una avenida principal, sin haber hablado jamás con un cliente de la zona. A los tres meses quebró porque la gente en esa calle solo buscaba desayunos rápidos para llevar. El segundo joven, en cambio, aplicó Lean Startup: preparó 20 termos de café de altura de Loja en su cocina, bajó a la estación de transporte con una mesita plegable y conversó directamente con los transeúntes. Descubrió que los oficinistas estaban frustrados porque el café de las cafeterías tardaba diez minutos en servirse y quemaba la lengua. Diseñó un café a temperatura perfecta entregado en 30 segundos en vaso biodegradable. El segundo joven no vendía café; vendía \"puntualidad y calidez para no llegar tarde a la oficina\". Esa era su verdadera propuesta de valor.",
    "pedagogicalExplanation": "La metodología Lean Startup se fundamenta en reducir el desperdicio de tiempo y capital mediante el bucle de retroalimentación constante: Crear (un Producto Mínimo Viable o PMV) -> Medir (las respuestas de usuarios reales mediante métricas tangibles) -> Aprender (decidiendo si perseverar o pivotar hacia una mejor dirección). Para formular una Propuesta de Valor sólida, utilizamos el Mapa de Valor de Strategyzer: 1) Perfil del Cliente: observamos sus Tareas del Cliente (qué intenta lograr), sus Dolores (frustraciones, obstáculos, riesgos) y sus Alegrías (beneficios deseados). 2) Mapa de Valor: diseñamos nuestros Productos y Servicios, nuestros Aliviadores de Dolores y nuestros Creadores de Alegrías. El \"encaje producto-mercado\" ocurre cuando los aliviadores y creadores encajan perfectamente con los dolores del cliente.",
    "vocabulary": [
      {
        "term": "Lean Startup",
        "definition": "Metodología empresarial moderna orientada a acortar los ciclos de desarrollo de productos mediante experimentación basada en hipótesis y retroalimentación validada.",
        "childFriendlyExample": "Es hacer experimentos pequeños y baratos antes de arriesgar todo el dinero en una idea grande."
      },
      {
        "term": "Propuesta de Valor",
        "definition": "El conjunto único de beneficios y soluciones que una empresa promete entregar a sus clientes para resolver su problema de manera superior a las alternativas.",
        "childFriendlyExample": "La propuesta de valor no es el zapato que vendes, sino la comodidad y elegancia que siente quien lo calza."
      },
      {
        "term": "Pivotar",
        "definition": "Cambiar estratégicamente de rumbo o modelo de negocio manteniendo la visión general, tras descubrir que una hipótesis inicial no funciona.",
        "childFriendlyExample": "Si descubres que a la gente no le gusta tu app de cocina pero adora tus recetas en video, pivotas a ser un canal de video."
      }
    ],
    "contextualizedExample": "En la parroquia de Cumbayá, una estudiante de 13 años notó que los dueños de mascotas no tenían tiempo para bañar a sus perros los fines de semana debido a las largas filas en las veterinarias. Su propuesta de valor no fue abrir otra veterinaria, sino un servicio móvil a domicilio con furgoneta equipada, ahorrando dos horas de tiempo a las familias.",
    "socraticQuestions": [
      "¿Por qué decimos que los clientes no compran productos, sino que \"contratan\" productos para resolver un problema en sus vidas cotidianas?",
      "Si un emprendedor gasta todos sus ahorros en publicidad antes de validar si su producto funciona, ¿qué principio de Lean Startup está violando gravemente?",
      "¿Cómo puedes comprobar si una persona realmente tiene interés en tu idea sin pedirle dinero por adelantado?"
    ],
    "practicalActivity": {
      "title": "Taller de Detección de Dolores: El Mapa de Empatía Escolar",
      "instructions": [
        "Elige un ámbito de tu vida cotidiana: A) La organización de útiles y tareas de los estudiantes de secundaria; o B) El consumo de snacks saludables en recreos escolares.",
        "Dibuja el lienzo del Perfil del Cliente de Strategyzer en tu cuaderno: divide la página en tres zonas (Trabajos del cliente, Dolores/Frustraciones, Alegrías esperadas).",
        "Entrevista a un familiar o compañero con tres preguntas socráticas abiertas sobre sus mayores dificultades en ese ámbito.",
        "Anota al menos 3 dolores específicos (ejemplo: \"las frutas se magullan en la mochila\", \"se me olvida entregar las tareas\").",
        "Formula una declaración de propuesta de valor de una sola oración siguiendo la fórmula: \"Ayudamos a [cliente objetivo] a lograr [alegría] aliviando [dolor] mediante [solución innovadora]\"."
      ],
      "materials": [
        "Cuaderno de proyectos",
        "Plantilla Strategyzer Value Proposition Canvas",
        "Bolígrafos de colores"
      ]
    },
    "applicationActivity": {
      "title": "Diseño del Experimento Mínimo Viable (PMV de Papel)",
      "task": "Diseña el boceto de un Producto Mínimo Viable (en formato papel, flyer informativo o prototipo digital) para tu propuesta de valor. Define qué métrica medible usarás para saber si el experimento tuvo éxito (por ejemplo: \"Si 5 de cada 8 personas entrevistadas dicen que usarían este servicio, la hipótesis queda validada\").",
      "deliverable": "Ficha de experimento Lean Startup (1 página) con descripción de la hipótesis, prototipo en boceto y métrica de validación."
    },
    "formativeEvaluation": {
      "description": "Capacidad para identificar problemas reales de mercado, aplicar el lienzo de propuesta de valor y diseñar experimentos de validación Lean.",
      "expectedEvidence": "Avril distingue con precisión entre una idea y una propuesta de valor validada, enfocándose en resolver dolores de usuarios con empatía."
    },
    "evaluationRubric": {
      "criterion": "Formulación de propuestas de valor y aplicación de Lean Startup (ADM.8.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Propone productos genéricos sin justificar qué problema resuelven ni identificar dolores específicos de clientes."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Identifica dolores de clientes pero su propuesta de valor es ambigua o no plantea métricas de validación claras."
        },
        {
          "level": "Consolidado",
          "descriptor": "Aplica el lienzo de Strategyzer con maestría, formula hipótesis comprobables, diseña un PMV coherente y establece métricas objetivas de aprendizaje validado."
        }
      ]
    },
    "expectedFeedback": "Visión estratégica y empatía excepcionales, Avril. Has captado a la perfección que los grandes negocios nacen de escuchar el corazón de las personas y resolver sus problemas reales con humildad y datos. ¡Ese es el verdadero espíritu emprendedor!",
    "difficultyAdaptation": "Proveer tarjetas con problemas cotidianos ya identificados para que Avril seleccione uno y se concentre únicamente en diseñar el aliviador de dolores.",
    "advancedExtension": "Avril investiga el concepto de \"Customer Discovery\" desarrollado por Steve Blank y formula un guión de 5 preguntas de entrevista no sesgadas que no induzcan la respuesta del usuario.",
    "resources": [
      {
        "id": "class-adm-avril-01-res-1",
        "type": "simulator",
        "title": "Strategyzer — The Value Proposition Canvas Interactive Tutorial",
        "url": "https://www.strategyzer.com/library/the-value-proposition-canvas",
        "description": "Recurso educativo oficial de Alexander Osterwalder y Strategyzer para dominar el mapeo de dolores y alegrías de clientes.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-adm-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Lean Startup y Propuesta de Valor para Jóvenes",
        "url": "/api/v1/academic/classes/class-adm-avril-01/guide.pdf",
        "description": "Manual de trabajo con plantillas de entrevistas a clientes, cuadros de experimentos mínimos y rúbricas de evaluación de proyectos.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-adm-avril-01-act-1",
        "title": "La Lección del Café Andino",
        "description": "Analiza el caso de estudio de los dos emprendedores y explica por qué el segundo tuvo éxito.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-adm-avril-01-act-2",
        "title": "Taller de Mapeo de Empatía",
        "description": "Completa el lienzo de Strategyzer identificando tareas, dolores y alegrías de tu segmento de clientes.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-adm-avril-01-act-3",
        "title": "Diseño del PMV de Papel",
        "description": "Elabora la ficha técnica del experimento mínimo viable con su hipótesis y métrica de éxito.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Observa durante una salida a una tienda o panadería local un problema de atención o servicio y piensa qué solución sencilla mejoraría la experiencia del cliente.",
    "reflectionPrompt": "¿Cómo puede el emprendimiento convertirse en una poderosa herramienta para servir al prójimo y mejorar la comunidad?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_adm_avril_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-adm-avril-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-06-ADM",
      "subjectCode": "ADM-801",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-adm-avril-02",
    "subjectId": "adm-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Emprendimiento y Modelos de Negocio: De la Idea a la Propuesta de Valor",
    "theme": "El lienzo Business Model Canvas: Segmentos de clientes y canales de distribución",
    "objective": "Estructurar un modelo de negocio integral mapeando los bloques estratégicos del Business Model Canvas (Osterwalder), profundizando en la segmentación psicográfica y los canales de comunicación y entrega de valor.",
    "learningPurpose": "Comprender que un producto grandioso fracasa si no cuenta con un modelo de negocio coherente que conecte la propuesta de valor con las personas adecuadas a través de los canales correctos.",
    "competencyDcd": "ADM.8.2 — Mapear los bloques estratégicos del modelo Canvas enfocándose en la propuesta de valor, los arquetipos de cliente y los canales de distribución.",
    "officialSource": "Currículo Complementario ALSIZ — Marco de Competencias para el Emprendimiento Siglo XXI / Canvas Strategyzer",
    "introduction": "¡Hola de nuevo, Avril! Continuamos con la MBA Carla Fonseca en nuestro laboratorio de emprendimiento. Antiguamente, los planes de negocio eran libros pesados de 80 páginas que nadie leía y que quedaban obsoletos antes de imprimirse. En la actualidad, el mundo entero utiliza una sola hoja mágica dividida en 9 cajas interconectadas: el BUSINESS MODEL CANVAS creado por Alexander Osterwalder. Este lienzo permite ver la fotografía panorámica completa de una empresa en un solo vistazo. Hoy nos sumergiremos en el lado derecho del lienzo: la conexión vital entre tu propuesta de valor, el corazón de tu cliente y los puentes (canales) que los unen.",
    "reading": "El caso del chocolate ecuatoriano Pacari y sus canales de impacto global: A inicios de los años 2000, Ecuador exportaba miles de toneladas de cacao en grano fino de aroma a precios fijados por bolsas internacionales en Nueva York o Londres, mientras que los agricultores locales recibían una fracción mínima del valor. Santiago Peralta y Carla Barboto decidieron desafiar ese paradigma fundando Pacari. En lugar de vender cacao crudo a intermediarios, crearon un modelo Canvas revolucionario: Propuesta de valor: Chocolate fino orgánico biodinámico \"árbol a la barra\" que preserva la identidad territorial andina. Segmento de clientes: Consumidores globales gourmet conscientes de la ética ecológica y el comercio justo. Canales: Tiendas especializadas en más de 40 países, ferias gastronómicas internacionales y alianzas con aerolíneas de primer nivel. Al controlar sus canales y su propuesta de valor, transformaron a Ecuador en un referente mundial de chocolate de alta gama y multiplicaron el ingreso de más de 3.500 familias cacaoteras.",
    "pedagogicalExplanation": "El Business Model Canvas organiza la lógica empresarial en cuatro áreas fundamentales: 1) Oferta (Propuesta de Valor central). 2) Clientes (Segmentos de Clientes, Canales de distribución y Relaciones con Clientes). 3) Infraestructura (Actividades Clave, Recursos Clave y Socios Clave). 4) Finanzas (Estructura de Costes y Fuentes de Ingresos). En esta sesión profundizamos en la Segmentación (¿Quién es exactamente nuestro usuario ideal? Edad, hábitos, motivaciones y estilo de vida) y los Canales (las cinco fases del canal: Conciencia/Notoriedad, Evaluación, Compra, Entrega y Postventa).",
    "vocabulary": [
      {
        "term": "Business Model Canvas",
        "definition": "Plantilla de gestión estratégica que permite visualizar, diseñar y modelar un negocio en 9 bloques interconectados en una sola página.",
        "childFriendlyExample": "Es el plano de un arquitecto pero diseñado para construir una empresa exitosa."
      },
      {
        "term": "Segmento de Clientes",
        "definition": "El grupo específico de personas o entidades al que una empresa dirige sus productos o servicios y para quienes crea valor.",
        "childFriendlyExample": "No le vendes a \"todo el mundo\", sino a jóvenes deportistas que entrenan ciclismo de montaña en páramo."
      },
      {
        "term": "Canal de Distribución",
        "definition": "La vía, medio o infraestructura mediante la cual una empresa comunica su propuesta de valor y entrega su producto al cliente final.",
        "childFriendlyExample": "Una tienda física en el centro comercial, una página web con envíos a domicilio o una app móvil."
      }
    ],
    "contextualizedExample": "Un proyecto de apicultura sostenible en Loja vende miel pura de abeja silvestre. Su segmento no son los supermercados masivos, sino restaurantes de alta cocina y familias interesadas en medicina natural que compran directamente a través de una cuenta de Instagram y reciben el producto en frascos de vidrio retornables.",
    "socraticQuestions": [
      "¿Por qué decir \"mi producto es para todas las personas de entre 5 y 80 años\" es la receta más rápida para fracasar en el marketing moderno?",
      "¿Cuáles son las ventajas y desventajas de vender directamente al consumidor (D2C) por internet frente a vender a través de intermediarios en tiendas físicas?",
      "Si un cliente compra tu producto pero el canal de entrega tarda dos semanas y llega roto, ¿de qué sirvió haber tenido la mejor propuesta de valor en el laboratorio?"
    ],
    "practicalActivity": {
      "title": "Llenado del Lienzo Canvas: El Lado Derecho de la Creación de Valor",
      "instructions": [
        "Dibuja en una hoja doble de tu cuaderno el esquema del Business Model Canvas con sus 9 casillas.",
        "Coloca en el centro la Propuesta de Valor desarrollada en la sesión anterior.",
        "En la casilla \"Segmento de Clientes\", describe al cliente ideal (Buyer Persona): dale un nombre ficticio, edad, 2 pasatiempos y su mayor necesidad insatisfecha.",
        "En la casilla \"Canales\", define las 3 etapas clave: ¿Cómo se enterará de que existes? ¿Cómo te pagará? ¿Cómo recibirá la entrega?",
        "En la casilla \"Relación con Clientes\", define el estilo de comunicación (¿personalizado, automatizado, comunitario?)."
      ],
      "materials": [
        "Hoja de papel bond A3 o cuaderno apaisado",
        "Notas adhesivas (post-its) de colores",
        "Rotuladores"
      ]
    },
    "applicationActivity": {
      "title": "Auditoría de Canales de una Microempresa Local",
      "task": "Elige un negocio familiar o una tienda de tu vecindario. Evalúa sus canales actuales en una escala de 1 a 5 estrellas: ¿Tienen presencia digital? ¿Su entrega es rápida? Escribe tres recomendaciones prácticas de canales digitales gratuitos o de bajo costo (como catálogo de WhatsApp Business o Google Maps) que podrían duplicar su visibilidad.",
      "deliverable": "Informe de auditoría de canales (media página) con recomendaciones concretas y diagrama de flujo de entrega."
    },
    "formativeEvaluation": {
      "description": "Comprensión de los 9 bloques del Canvas, precisión en la caracterización de segmentos de clientes y diseño estratégico de canales.",
      "expectedEvidence": "Avril estructura el lado derecho del lienzo Canvas con coherencia interna entre valor, perfil de usuario y canales de contacto."
    },
    "evaluationRubric": {
      "criterion": "Mapeo del modelo Business Model Canvas y canales de distribución (ADM.8.2)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Confunde los bloques del Canvas o define clientes de forma excesivamente amplia y abstracta."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Completa los bloques pero los canales seleccionados no corresponden con las características de su segmento objetivo."
        },
        {
          "level": "Consolidado",
          "descriptor": "Mapea los bloques con profunda coherencia estratégica, define arquetipos de cliente con precisión psicográfica y optimiza los canales en todas sus fases de entrega."
        }
      ]
    },
    "expectedFeedback": "Excelente visión comercial y estratégica, Avril. Tu segmentación de clientes es detallada y realista, y los canales que planteas demuestran un conocimiento intuitivo del comportamiento del consumidor moderno.",
    "difficultyAdaptation": "Proveer un lienzo con preguntas orientadoras en cada bloque (\"¿Quién te paga?\", \"¿Por dónde te conocen?\") para guiar la estructuración.",
    "advancedExtension": "Avril analiza el modelo de \"Plataforma Multifacética\" (Multisided Platform) de empresas como Airbnb o Uber, explicando cómo crean valor para dos segmentos de clientes complementarios simultáneamente.",
    "resources": [
      {
        "id": "class-adm-avril-02-res-1",
        "type": "simulator",
        "title": "Canvanizer — Business Model Canvas Generator Open Platform",
        "url": "https://canvanizer.com/",
        "description": "Herramienta colaborativa abierta para diseñar lienzos Canvas de negocios en línea con notas adhesivas digitales.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-adm-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Business Model Canvas y Segmentación Estratégica",
        "url": "/api/v1/academic/classes/class-adm-avril-02/guide.pdf",
        "description": "Plantilla de 9 bloques en alta resolución con casos de estudio ecuatorianos (Pacari, República del Cacao) y rúbrica.",
        "duration": "15 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-adm-avril-02-act-1",
        "title": "El Caso Pacari",
        "description": "Lee la historia de la chocolatería andina y explica por qué controlar los canales cambió su destino.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-adm-avril-02-act-2",
        "title": "Mapeo del Lienzo Canvas",
        "description": "Dibuja y completa el lado derecho del Business Model Canvas con notas adhesivas de colores.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-adm-avril-02-act-3",
        "title": "Auditoría de Canales Locales",
        "description": "Elabora el informe de recomendaciones de canales para una microempresa del entorno cercano.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Pregunta a una persona cercana cómo prefiere comprar hoy en día: si visitando una tienda física o pidiendo por internet, y anota qué factor determina su decisión (precio, confianza o rapidez).",
    "reflectionPrompt": "¿Cómo puede una empresa usar sus canales no solo para vender, sino para educar y generar un impacto positivo en la sociedad?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_adm_avril_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-adm-avril-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-06-ADM",
      "subjectCode": "ADM-801",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-adm-avril-03",
    "subjectId": "adm-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Emprendimiento y Modelos de Negocio: De la Idea a la Propuesta de Valor",
    "theme": "Estructura de costos, flujo de caja y punto de equilibrio para microproyectos",
    "objective": "Calcular costos fijos, costos variables unitarios, margen de contribución y punto de equilibrio financiero para un microemprendimiento escolar mediante el uso de fórmulas algebraicas y hojas de cálculo.",
    "learningPurpose": "Entender que la salud financiera de cualquier proyecto depende de la disciplina contable y la precisión matemática, evitando la bancarrota mediante la gestión rigurosa del flujo de efectivo.",
    "competencyDcd": "ADM.8.3 — Calcular costos fijos, variables, margen de contribución y punto de equilibrio financiero para un producto o servicio viable.",
    "officialSource": "Currículo Complementario ALSIZ — Marco de Competencias para el Emprendimiento Siglo XXI / Educación Financiera",
    "introduction": "¡Feliz viernes de finanzas aplicadas, Avril! Te saluda la MBA Carla Fonseca. En el mundo de los negocios existe una frase lapidaria: \"Las ventas son vanidad, las ganancias son cordura, pero el flujo de caja es la realidad\". Un proyecto puede tener una idea maravillosa, un diseño hermoso e incluso muchas ventas; pero si gasta más de lo que ingresa, se extinguirá como una vela sin oxígeno. La matemática es la mejor aliada del emprendedor. Hoy aprenderemos a calcular con exactitud matemática cuánto nos cuesta producir una unidad, cuál es nuestro margen de ganancia real y cuántas unidades exactas necesitamos vender para no perder un solo centavo: ¡el PUNTO DE EQUILIBRIO!",
    "reading": "La fábula del repostero que no sabía restar: En un pintoresco pueblo andino, un repostero aficionado horneaba unos deliciosos pasteles de naranja y miel. Los vendía a $10 cada uno y todos los sábados la fila de vecinos daba la vuelta a la manzana. Al final del mes, tras vender 100 pasteles, tenía $1.000 en el bolsillo y se sentía un magnate. Sin embargo, cuando llegó el momento de pagar la harina, los huevos ecológicos, el empaque biodegradable, la factura de gas del horno y el arriendo del taller, las cuentas sumaron $1.150. ¡Estaba perdiendo $1,50 por cada pastel que vendía con tanta alegría! Su problema fue no haber calculado sus costos variables ni sus costos fijos. No tenía un negocio; tenía un pasatiempo muy caro que le costaba dinero propio. Cuando recalculó sus costos y fijó el precio justo en $14, su negocio se volvió próspero y sostenible en el tiempo.",
    "pedagogicalExplanation": "En la gestión de finanzas de proyectos se distinguen dos tipos de costos: 1) Costos Fijos ($CF$): gastos que se deben pagar obligatoriamente sin importar si vendes cero o mil unidades (arriendo, servicios básicos fijos, suscripciones de software). 2) Costos Variables ($CV$): gastos que aumentan directamente con cada unidad producida (materia prima, empaque, comisión de entrega). El Costo Variable Unitario ($CVU$) es el costo de un solo producto. El Margen de Contribución Unitario ($MCU$) es el precio de venta ($P$) menos el $CVU$ ($MCU = P - CVU$). El Punto de Equilibrio en Unidades ($PE$) es el número mínimo de productos que se deben vender para cubrir exactamente todos los costos fijos y variables: $PE = \\frac{CF}{P - CVU}$. En el punto de equilibrio la ganancia neta es cero.",
    "vocabulary": [
      {
        "term": "Costo Fijo",
        "definition": "Gasto invariable que una empresa debe solventar independientemente de su volumen de producción o ventas.",
        "childFriendlyExample": "El pago mensual del internet de $30 se paga igual vendas 5 o 50 productos."
      },
      {
        "term": "Costo Variable",
        "definition": "Costo que fluctúa en proporción directa al volumen de bienes producidos o servicios prestados.",
        "childFriendlyExample": "Si haces 10 pulseras necesitas $5 en hilo; si haces 20 pulseras necesitas $10 en hilo."
      },
      {
        "term": "Punto de Equilibrio",
        "definition": "Nivel de actividad económica donde los ingresos totales igualan con exactitud a los costos totales, sin pérdidas ni ganancias.",
        "childFriendlyExample": "Si tu punto de equilibrio es 15 unidades, a partir de la unidad 16 empiezas a ganar dinero neto."
      }
    ],
    "contextualizedExample": "Un proyecto escolar de mermelada artesanal de mora silvestre tiene costos fijos de $40 al mes (gas y etiquetas impresas). El costo variable por frasco (moras, azúcar y frasco de vidrio) es de $1,50. Si deciden vender cada frasco a $3,50, el margen de contribución es $3,50 - 1,50 = $2,00. El punto de equilibrio es: $PE = 40 / 2 = 20$ frascos al mes.",
    "socraticQuestions": [
      "¿Por qué un negocio que tiene muchas ventas diarias puede quebrar en pocos meses si no monitorea su flujo de caja real?",
      "Si aumentas el precio de venta de tu producto pero no cambias tus costos, ¿qué le ocurre al punto de equilibrio: necesitas vender más unidades o menos unidades para no perder dinero?",
      "¿Por qué es fundamental que un emprendedor incluya un valor correspondiente a su propio tiempo y trabajo dentro de los costos del proyecto?"
    ],
    "practicalActivity": {
      "title": "Laboratorio Financiero: La Calculadora del Punto de Equilibrio en Hoja de Cálculo",
      "instructions": [
        "Abre una hoja de cálculo (Google Sheets, Excel o en tu cuaderno cuadriculado).",
        "Crea una tabla con las siguientes tres columnas: Concepto de Gasto, Tipo (Fijo o Variable), Valor en Dólares.",
        "Introduce los datos de un microproyecto de libretas artesanales ecológicas:",
        "  - Costos Fijos: Pegamento y herramientas ($15 al mes), Publicidad web ($10 al mes). Total CF = $25.",
        "  - Costos Variables Unitarios: Hojas de papel reciclado ($1,20), Cartón de pasta ($0,80), Cinta encuadernación ($0,50). Total CVU = $2,50.",
        "  - Precio de Venta propuesto ($P$): $5,00 por libreta.",
        "Aplica la fórmula matemática en la celda correspondiente: `= 25 / (5.00 - 2.50)` para obtener el punto de equilibrio exacto.",
        "Elabora una gráfica sencilla de Ingresos Totales vs. Costos Totales identificando el cruce del punto de equilibrio."
      ],
      "materials": [
        "Computadora con hoja de cálculo o cuaderno cuadriculado",
        "Calculadora básica",
        "Regla y colores"
      ]
    },
    "applicationActivity": {
      "title": "Plan Financiero de Presupuesto para el Proyecto Interdisciplinario ALSIZ",
      "task": "Elabora la estructura de costos y el cálculo del punto de equilibrio de tu propio microproyecto del trimestre. Detalla al menos 3 costos fijos y 3 costos variables con precios de mercado reales en Ecuador. Determina el precio de venta sugerido y cuántas unidades debes comercializar para cubrir la inversión inicial.",
      "deliverable": "Hoja de presupuesto formalizada con desglose de costos, margen de contribución y punto de equilibrio certificado."
    },
    "formativeEvaluation": {
      "description": "Destreza en la clasificación de costos fijos y variables, dominio de la fórmula del punto de equilibrio y rigor en el cálculo financiero.",
      "expectedEvidence": "Avril calcula el punto de equilibrio sin errores aritméticos, interpreta el significado del margen de contribución y diseña una estructura de costos viable."
    },
    "evaluationRubric": {
      "criterion": "Cálculo de costos y punto de equilibrio en proyectos emprendedores (ADM.8.3)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Confunde costos fijos con variables y comete errores en la fórmula matemática del punto de equilibrio."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Calcula el punto de equilibrio pero omite costos ocultos (como empaque o tiempo) o le cuesta interpretar la gráfica de resultados."
        },
        {
          "level": "Consolidado",
          "descriptor": "Calcula con precisión matemática todos los costos, domina el margen de contribución, interpreta el punto de equilibrio y formula estrategias financieras de optimización de gastos."
        }
      ]
    },
    "expectedFeedback": "Impresionante solidez cuantitativa y financiera, Avril. Has resuelto el modelo de equilibrio con precisión matemática y madurez contable. Saber calcular tus costos te da el poder de emprender con sabiduría, seguridad y visión a largo plazo.",
    "difficultyAdaptation": "Utilizar una plantilla prediseñada con las celdas de fórmula bloqueadas para que Avril se enfoque en clasificar correctamente los costos.",
    "advancedExtension": "Avril investiga qué es el \"análisis de sensibilidad\": recalcula el punto de equilibrio si la materia prima sube un 20% por inflación y propone dos medidas para no trasladar todo el costo al cliente.",
    "resources": [
      {
        "id": "class-adm-avril-03-res-1",
        "type": "simulator",
        "title": "Simulador Financiero Abierto — Calculadora Interactiva de Punto de Equilibrio",
        "url": "https://www.calculatorsoup.com/calculators/financial/break-even-point-calculator.php",
        "description": "Simulador financiero en línea para experimentar en tiempo real con variaciones de costos fijos, variables y precio de venta.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-adm-avril-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Finanzas de Proyectos y Punto de Equilibrio",
        "url": "/api/v1/academic/classes/class-adm-avril-03/guide.pdf",
        "description": "Manual práctico de finanzas personales y emprendedoras para 8.° EGB con ejercicios resueltos y plantillas de flujo de caja.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-adm-avril-03-act-1",
        "title": "La Fábula del Repostero",
        "description": "Analiza el error financiero del repostero y reflexiona sobre la importancia de costear la producción.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-adm-avril-03-act-2",
        "title": "Cálculo del Punto de Equilibrio",
        "description": "Resuelve el problema de las libretas ecológicas aplicando la fórmula formal en la hoja de cálculo.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-adm-avril-03-act-3",
        "title": "Presupuesto del Microproyecto Escolar",
        "description": "Elabora el plan de costos y punto de equilibrio de tu propio proyecto para el trimestre.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Revisa con un adulto en casa un recibo de servicios básicos (luz o agua) e identifica qué rubros son costos fijos del servicio y cuáles varían por el consumo en kilovatios o metros cúbicos.",
    "reflectionPrompt": "¿Cómo te ayuda la mayordomía financiera responsable a ser generosa con los demás y a construir proyectos que beneficien a tu comunidad?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_adm_avril_03.pdf",
    "guideUrl": "/api/v1/academic/classes/class-adm-avril-03/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-06-ADM",
      "subjectCode": "ADM-801",
      "unitNumber": 1,
      "sessionNumber": 3
    }
  },
  {
    "id": "class-pol-avril-01",
    "subjectId": "pol-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: El Estado Republicano y la División de Poderes: Arquitectura Constitucional",
    "theme": "El Estado de Derecho y la división republicana de poderes (Montesquieu y la Constitución del Ecuador)",
    "objective": "Analizar los fundamentos teóricos del Estado constitucional de derechos y examinar la doctrina de la separación y control mutuo de poderes (checks and balances) establecida en la Constitución de la República del Ecuador.",
    "learningPurpose": "Comprender que la concentración excesiva del poder en una sola persona o grupo engendra inevitablemente la tiranía y la vulneración de libertades, reconociendo en la institucionalidad republicana la garantía suprema de la dignidad humana.",
    "competencyDcd": "POL.8.1 — Analizar el principio de separación y equilibrio de poderes (Ejecutivo, Legislativo, Judicial, Electoral y Transparencia) como salvaguarda frente al autoritarismo.",
    "officialSource": "Currículo Complementario ALSIZ — Formación Ciudadana y Democracia Republicana / Constitución del Ecuador (2008)",
    "introduction": "¡Bienvenida al parlamento de Ciencias Políticas, apreciada Avril! Te saluda el Lic. Rodrigo Mendoza. A lo largo de los siglos, la humanidad sufrió bajo monarcas absolutistas que proclamaban \"El Estado soy yo\" y cuya voluntad caprichosa bastaba para encarcelar inocentes o despojar a los campesinos de sus tierras. En el siglo XVIII, el filósofo francés Barón de Montesquieu enunció una verdad universal: \"Todo hombre que tiene poder tiende a abusar de él; va hasta donde encuentra límites. Para que no se pueda abusar del poder, es preciso que el poder frene al poder\". Con esta idea nació la REPÚBLICA: un sistema donde no gobiernan los caprichos de los reyes, sino la majestad de la LEY. ¡Hoy exploraremos cómo los cinco poderes del Estado ecuatoriano deben vigilarse y equilibrarse mutuamente para salvaguardar la libertad de todos los ciudadanos!",
    "reading": "El Juicio del Roble y la balanza de Montesquieu: En su obra cumbre \"El espíritu de las leyes\" (1748), Montesquieu advirtió con escalofriante lucidez: \"Cuando en la misma persona o en el mismo cuerpo de magistrados la potestad legislativa se reúne con la potestad ejecutiva, no hay libertad, porque puede temerse que el mismo monarca o el mismo senado haga leyes tiránicas para ejecutarlas tiránicamente. Tampoco hay libertad si la potestad de juzgar no está separada de la potestad legislativa y de la ejecutiva\". La historia ha corroborado esta advertencia una y otra vez: cuando los jueces pierden su independencia y se convierten en sirvientes del presidente de turno, la justicia se transforma en persecución política. En una república sana, cada poder del Estado es como una pata de una mesa firme: si una pata intenta crecer desmesuradamente o doblegar a las demás, toda la mesa se desequilibra y la libertad ciudadana se hace pedazos contra el suelo.",
    "pedagogicalExplanation": "La Constitución ecuatoriana de 2008 establece un modelo republicano original estructurado en cinco funciones o poderes del Estado: 1) Función Ejecutiva (Presidente y ministerios: administra el Estado y ejecuta políticas públicas). 2) Función Legislativa (Asamblea Nacional: debate, redacta leyes y fiscaliza a las demás autoridades). 3) Función Judicial y Justicia Indígena (Corte Nacional, jueces y tribunales: administra justicia imparcialmente con base en la ley). 4) Función Electoral (Consejo Nacional Electoral y Tribunal Contencioso Electoral: garantiza elecciones limpias y transparencia del sufragio). 5) Función de Transparencia y Control Social (Consejo de Participación Ciudadana, Contraloría, Defensoría del Pueblo y Superintendencias: audita la gestión pública y lucha contra la corrupción). El principio anglosajón de \"frenos y contrapesos\" (checks and balances) exige que ninguna de estas funciones pueda avasallar a las otras.",
    "vocabulary": [
      {
        "term": "Estado de Derecho",
        "definition": "Principio de gobierno según el cual todas las personas, instituciones y entidades públicas y privadas, incluido el propio Estado, están sometidas a leyes que se promulgan públicamente y se hacen cumplir por igual.",
        "childFriendlyExample": "Significa que ni el presidente de la república está por encima de la ley; si comete un delito, un juez puede juzgarlo."
      },
      {
        "term": "Frenos y Contrapesos (Checks and Balances)",
        "definition": "Mecanismo constitucional que permite a cada rama del gobierno limitar y fiscalizar los poderes de las otras ramas para evitar la tiranía.",
        "childFriendlyExample": "El presidente propone una ley, pero la Asamblea puede rechazarla, y la Corte Constitucional puede anularla si viola los derechos."
      },
      {
        "term": "Tiranía / Autocracia",
        "definition": "Régimen de gobierno en el cual el poder político supremo está concentrado en una sola persona o partido sin contrapesos constitucionales ni libertades civiles.",
        "childFriendlyExample": "Un gobierno donde el líder cambia las leyes a su gusto y encarcela a los periodistas que lo critican."
      }
    ],
    "contextualizedExample": "Cuando la Corte Constitucional del Ecuador declara que un decreto presidencial es inconstitucional porque vulnera el derecho al agua o a la consulta previa de las comunidades indígenas, está operando el principio republicano de contrapeso frente al poder ejecutivo.",
    "socraticQuestions": [
      "¿Por qué crees que a un gobernante autoritario le incomoda profundamente que los jueces y tribunales sean completamente independientes de su despacho?",
      "Si la mayoría de la población vota por una ley que elimine la libertad de expresión de una minoría, ¿por qué la Constitución debe proteger a esa minoría frente a la tiranía de la mayoría?",
      "¿Cuál es la diferencia sustancial entre vivir bajo el mandato de una persona (monarquía absoluta) y vivir bajo el mandato de una Constitución votada por el pueblo?"
    ],
    "practicalActivity": {
      "title": "El Juego del Juicio Constitucional: Simulación de Frenos y Contrapesos",
      "instructions": [
        "Lee el siguiente caso hipotético de dilema republicano:",
        "  \"El Presidente de la República emite un Decreto de Emergencia que ordena confiscar todas las imprentas de periódicos privados para imprimir únicamente comunicados oficiales del gobierno, argumentando razones de seguridad nacional\".",
        "En tu cuaderno de Ciencias Políticas, analiza el caso asumiendo tres roles institucionales consecutivos:",
        "  1) Rol de Asambleísta Nacional: ¿Qué juicio político o llamado a comparecencia puedes activar?",
        "  2) Rol de Jueza Constitucional: ¿Qué artículo sobre derechos fundamentales y libertad de expresión aplicarías para suspender el decreto?",
        "  3) Rol de Ciudadana en el Consejo de Transparencia: ¿Qué medida de vigilancia ciudadana propondrías?",
        "Sintetiza tus respuestas en una tabla comparativa demostrando cómo el sistema de contrapesos frena el abuso."
      ],
      "materials": [
        "Texto de la Constitución del Ecuador (digital o impreso)",
        "Cuaderno de Ciencias Políticas",
        "Lápiz y regla"
      ]
    },
    "applicationActivity": {
      "title": "Organigrama Constitucional Ilustrado de las 5 Funciones del Estado",
      "task": "Dibuja un diagrama arquitectónico de las cinco funciones del Estado ecuatoriano. Señala para cada función: su titular máximo, su propósito central y una flecha bidireccional indicando cómo fiscaliza a otra función (por ejemplo: la Asamblea fiscaliza al Ejecutivo; la Corte Constitucional controla a la Asamblea).",
      "deliverable": "Diagrama infográfico en cartulina o formato digital con simbología clara y justificación de contrapesos."
    },
    "formativeEvaluation": {
      "description": "Comprensión del concepto de Estado de Derecho, distinción de las 5 funciones estatales del Ecuador y valoración de la independencia judicial.",
      "expectedEvidence": "Avril explica con precisión por qué la concentración del poder atenta contra la libertad y describe los mecanismos de contrapeso constitucional entre funciones."
    },
    "evaluationRubric": {
      "criterion": "Análisis del Estado de Derecho y división de poderes (POL.8.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Confunde los poderes del Estado y asume que el presidente tiene autoridad absoluta sobre jueces y asambleístas."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Identifica las funciones del Estado pero le cuesta explicar cómo funciona el mecanismo de control mutuo (frenos y contrapesos)."
        },
        {
          "level": "Consolidado",
          "descriptor": "Analiza con madurez filosófica el pensamiento de Montesquieu, describe las 5 funciones del Estado ecuatoriano y fundamenta la supremacía constitucional con ejemplos jurídicos concretos."
        }
      ]
    },
    "expectedFeedback": "Criterio cívico e institucional impecable, Avril. Has articulado el pensamiento de Montesquieu con la realidad constitucional ecuatoriana con una lucidez admirable. Comprender los frenos y contrapesos es el mayor escudo de una ciudadana libre frente a la arbitrariedad.",
    "difficultyAdaptation": "Utilizar tarjetas ilustradas de cada una de las 5 funciones con preguntas guía para emparejar la función con su respectivo contrapeso.",
    "advancedExtension": "Avril investiga la figura del \"Presidencialismo Reforzado\" en América Latina y redacta un ensayo breve sobre cómo evitar que la figura presidencial eclipse a las demás funciones democráticas.",
    "resources": [
      {
        "id": "class-pol-avril-01-res-1",
        "type": "simulator",
        "title": "Asamblea Nacional del Ecuador — Portal Educativo y Constitución Interactiva",
        "url": "https://www.asambleanacional.gob.ec/",
        "description": "Portal legislativo oficial con acceso al texto íntegro de la Constitución de la República y guías cívicas para jóvenes.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-pol-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — División de Poderes y Estado de Derecho",
        "url": "/api/v1/academic/classes/class-pol-avril-01/guide.pdf",
        "description": "Ficha de trabajo con casos de estudio constitucional, dilemas de frenos y contrapesos y rúbrica socrática.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-pol-avril-01-act-1",
        "title": "La Advertencia de Montesquieu",
        "description": "Lee el fragmento de \"El espíritu de las leyes\" y reflexiona sobre el peligro del poder sin límites.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-pol-avril-01-act-2",
        "title": "Simulación de Frenos y Contrapesos",
        "description": "Resuelve el dilema del decreto presidencial asumiendo los roles de legisladora, jueza y ciudadana.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-pol-avril-01-act-3",
        "title": "Organigrama de las 5 Funciones del Estado",
        "description": "Diseña la infografía arquitectónica de los poderes del Estado y sus mecanismos mutuos de fiscalización.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Conversa con tus padres o familiares sobre qué noticia reciente del país involucró a la Asamblea Nacional o a la Corte Constitucional y anota de qué trataba.",
    "reflectionPrompt": "¿Cómo puedes tú, desde tu vida diaria escolar, practicar el respeto a las reglas justas y defender a quien sufre una injusticia?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_pol_avril_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-pol-avril-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-07-POL",
      "subjectCode": "POL-801",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-pol-avril-02",
    "subjectId": "pol-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "12:15 - 13:00 (45 min)",
    "unit": "Unidad 1: El Estado Republicano y la División de Poderes: Arquitectura Constitucional",
    "theme": "Ciudadanía activa, deliberación pública y mecanismos de participación ciudadana",
    "objective": "Examinar los mecanismos de democracia directa y deliberativa consagrados en el marco jurídico ecuatoriano (cabildo popular, silla vacía, consulta popular y veedurías ciudadanas), evaluando su efectividad para fiscalizar la gestión pública y construir el bien común.",
    "learningPurpose": "Comprender que la democracia no se reduce a votar cada cuatro años en una urna, sino que exige una participación cívica continua, informada y valiente en la toma de decisiones comunitarias.",
    "competencyDcd": "POL.8.2 — Examinar los mecanismos de participación ciudadana (cabildo popular, silla vacía, consulta previa, rendición de cuentas) y el rol de la sociedad civil en la fiscalización del bien común.",
    "officialSource": "Currículo Complementario ALSIZ — Formación Ciudadana y Democracia Republicana / Ley Orgánica de Participación Ciudadana",
    "introduction": "¡Feliz viernes de debate cívico, Avril! Te saluda el Lic. Rodrigo Mendoza. Muchas personas confunden erróneamente la palabra \"democracia\" con una simple fiesta electoral donde se deposita un papel doblado en una urna de cartón cada cuatro años, para luego desentenderse por completo de lo que hacen los gobernantes. Esa es una democracia pasiva y conformista. En Atenas clásica y en las comunidades andinas ancestrales mediante el \"minga\" y la asamblea comunitaria, la democracia siempre fue DELIBERATIVA: los ciudadanos se reúnen cara a cara en la plaza pública, exponen argumentos racionales, escuchan con respeto las posturas contrarias y fiscalizan cómo se gasta hasta el último centavo de los recursos públicos. Hoy conoceremos las herramientas legales que tienes como ciudadana para hacer escuchar tu voz con fuerza y legitimidad.",
    "reading": "La Silla Vacía en el Municipio: Una conquista cívica ecuatoriana: En la Constitución de 2008 y en el Código Orgánico de Organización Territorial (COOTAD), el Ecuador consagró una de las figuras más innovadoras del derecho municipal del mundo: la \"Silla Vacía\". Este mecanismo establece que en todas las sesiones de los Concejos Municipales y Consejos Provinciales, debe dejarse una silla vacía física en la mesa de deliberación de las autoridades. Cualquier ciudadana, líder barrial o representante de una organización comunitaria que se haya acreditado previamente puede sentarse en esa silla con voz y voto cuando se debata un tema que afecte directamente a su barrio o sector (por ejemplo: la construcción de un parque infantil, la recolección de basura o la protección de una quebrada). La Silla Vacía es la prueba palpable de que la soberanía no le pertenece a los políticos electos, sino que radica de manera inalienable en el pueblo soberano.",
    "pedagogicalExplanation": "La teoría democrática distingue tres modalidades de ejercicio del poder ciudadano: 1) Democracia Representativa: elección de dignatarios mediante el sufragio universal, secreto y obligatorio. 2) Democracia Directa: pronunciamiento directo del pueblo sobre leyes o decisiones trascendentales a través de referéndums, consultas populares y plebiscitos. 3) Democracia Comunitaria y Deliberativa: participación constante de la sociedad civil en la formulación, ejecución y control de políticas públicas mediante instrumentos legales como: Cabildos Populares (asambleas abiertas barriales), Silla Vacía (voto ciudadano en concejos locales), Veedurías Ciudadanas (comisiones cívicas independientes que auditan obras públicas para evitar sobreprecios y corrupción) y Rendición de Cuentas obligatoria de las autoridades.",
    "vocabulary": [
      {
        "term": "Silla Vacía",
        "definition": "Mecanismo constitucional en Ecuador que permite a ciudadanos acreditados ocupar un puesto con voz y voto en las sesiones de los gobiernos locales cuando se discutan temas de interés colectivo.",
        "childFriendlyExample": "Una vecina del barrio se sienta en la mesa de los concejales y vota a favor de crear una ciclovía escolar."
      },
      {
        "term": "Veeduría Ciudadana",
        "definition": "Modalidad de control social mediante la cual grupos organizados de ciudadanos vigilan, fiscalizan y auditan la ejecución de proyectos, contratos y servicios públicos.",
        "childFriendlyExample": "Un grupo de madres y padres de familia que revisa que la construcción de la nueva escuela se haga con cemento de calidad y a tiempo."
      },
      {
        "term": "Deliberación Pública",
        "definition": "Proceso de discusión informada, racional y argumentada entre ciudadanos con puntos de vista diversos para alcanzar consensos orientados al bien común.",
        "childFriendlyExample": "Debatir en una asamblea barrial la mejor manera de iluminar el parque sin insultos y con datos objetivos."
      }
    ],
    "contextualizedExample": "En la parroquia rural de Nayón, los vecinos organizaron una veeduría ciudadana comunitaria para vigilar los trabajos de alcantarillado y pavimentación de la vía principal, logrando que la constructora corrigiera grietas prematuras sin costo adicional para los fondos públicos.",
    "socraticQuestions": [
      "¿Por qué una democracia donde los ciudadanos solo votan pero nunca fiscalizan las obras ni asisten a cabildos está en grave riesgo de degenerar en corrupción endémica?",
      "Si en una asamblea escolar o barrial una persona grita más fuerte que las demás pero no presenta datos ni argumentos lógicos, ¿cómo debe actuar una presidenta de asamblea para garantizar una deliberación justa?",
      "¿Qué responsabilidades y deberes éticos asume un ciudadano cuando decide sentarse en la \"Silla Vacía\" de un municipio a votar sobre el presupuesto de toda la ciudad?"
    ],
    "practicalActivity": {
      "title": "Simulación del Cabildo Barrial Juvenil: El Parque de la Biodiversidad",
      "instructions": [
        "Contexto de la simulación: El Municipio de tu cantón tiene un presupuesto de $50.000 para un terreno baldío. Existen dos propuestas comunitarias enfrentadas:",
        "  - Propuesta A: Pavimentar una cancha de cemento y parqueaderos para 30 vehículos.",
        "  - Propuesta B: Crear un bosque urbano agroecológico con árboles nativos, huerto comunitario y biblioteca al aire libre.",
        "Asume el rol de representante de los jóvenes en la \"Silla Vacía\" del concejo cantonal.",
        "Redacta un discurso de deliberación pública de 3 minutos (1 página de cuaderno) estructurado en tres partes:",
        "  1) Saludo protocolar y acreditación de representación cívica.",
        "  2) Argumentación técnica y ecológica comparando los impactos de ambas propuestas a 10 años plazo.",
        "  3) Voto fundamentado con propuesta de veeduría ciudadana para vigilar la compra de las plantas nativas."
      ],
      "materials": [
        "Cuaderno de proyectos cívicos",
        "Guía de argumentación ciudadana ALSIZ",
        "Bolígrafo"
      ]
    },
    "applicationActivity": {
      "title": "Diseño del Acta de Conformación de una Veeduría Ciudadana Escolar",
      "task": "Redacta un Acta de Conformación formal de una Veeduría Juvenil para tu entorno educativo (por ejemplo: para vigilar la calidad y variedad nutricional del refrigerio escolar, o para asegurar el buen mantenimiento de los equipos informáticos de la plataforma). Define: objeto de la veeduría, 3 integrantes con sus roles, cronograma de inspección y formato del informe final para los directivos.",
      "deliverable": "Acta de veeduría cívica redactada formalmente con firmas simbólicas y sellos de veedora independiente."
    },
    "formativeEvaluation": {
      "description": "Capacidad para discriminar formas de democracia, justificar la importancia de la deliberación cívica y estructurar mecanismos de control social ciudadano.",
      "expectedEvidence": "Avril argumenta con solidez la función de la Silla Vacía y las veedurías ciudadanas, demostrando un compromiso activo con el bien común y la transparencia."
    },
    "evaluationRubric": {
      "criterion": "Comprensión y aplicación de mecanismos de participación ciudadana (POL.8.2)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Reduce la ciudadanía al acto de votar y desconoce los mecanismos de democracia deliberativa en el Ecuador."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Reconoce la Silla Vacía o el cabildo pero le cuesta diseñar una veeduría concreta con indicadores de fiscalización verificables."
        },
        {
          "level": "Consolidado",
          "descriptor": "Domina los fundamentos de la democracia deliberativa, redacta discursos cívicos persuasivos y estructura veedurías ciudadanas con rigor jurídico y sentido del bien común."
        }
      ]
    },
    "expectedFeedback": "Extraordinaria vocación cívica y elocuencia democrática, Avril. Tu discurso para la Silla Vacía demostró cómo la juventud puede transformar su entorno con argumentos sólidos y apego a la legalidad republicana. ¡Ese es el liderazgo que nuestro país necesita!",
    "difficultyAdaptation": "Proporcionar una plantilla estructurada para el discurso con párrafos guiados (\"Yo propongo... Porque los datos demuestran...\").",
    "advancedExtension": "Avril investiga el origen de las consultas populares de iniciativa popular normativa en Suiza y las contrasta con los requisitos de recolección de firmas del Consejo Nacional Electoral (CNE) en Ecuador.",
    "resources": [
      {
        "id": "class-pol-avril-02-res-1",
        "type": "simulator",
        "title": "Consejo de Participación Ciudadana y Control Social (CPCCS) — Portal de Veedurías",
        "url": "https://www.cpccs.gob.ec/",
        "description": "Portal oficial del CPCCS con normativas sobre rendición de cuentas, registro de veedurías ciudadanas y guías de transparencia.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-pol-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Participación Ciudadana, Silla Vacía y Control Social",
        "url": "/api/v1/academic/classes/class-pol-avril-02/guide.pdf",
        "description": "Ficha práctica con modelos de actas de veeduría, guiones de cabildo abierto y casos reales de control social exitoso en Ecuador.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-pol-avril-02-act-1",
        "title": "La Conquista de la Silla Vacía",
        "description": "Lee sobre el mecanismo municipal de la Silla Vacía y reflexiona sobre la soberanía popular directa.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-pol-avril-02-act-2",
        "title": "Simulación del Cabildo Barrial",
        "description": "Redacta y pronuncia el discurso de deliberación en la Silla Vacía defendiendo el parque agroecológico.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-pol-avril-02-act-3",
        "title": "Acta de Conformación de Veeduría",
        "description": "Elabora el acta formal de veeduría ciudadana escolar con cronograma y objetivos de auditoría.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Averigua en tu municipio o junta parroquial cómo se anuncia el orden del día de las sesiones de concejo y qué requisitos solicitan para el uso de la Silla Vacía.",
    "reflectionPrompt": "¿Por qué la indiferencia ciudadana frente a la gestión pública es la mejor aliada de los gobernantes corruptos?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_pol_avril_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-pol-avril-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-07-POL",
      "subjectCode": "POL-801",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-soft-avril-01",
    "subjectId": "soft-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Pensamiento Computacional: Algoritmia y Lógica Estructurada",
    "theme": "Descomposición de problemas y diseño de algoritmos con diagramas de flujo y pseudocódigo",
    "objective": "Descomponer un problema computacional complejo en subproblemas manejables, diseñando algoritmos deterministas mediante la simbología estandarizada de diagramas de flujo (ANSI/ISO) y pseudocódigo estructurado.",
    "learningPurpose": "Desarrollar el rigor mental del pensamiento algorítmico, comprendiendo que antes de escribir una sola línea de código en un lenguaje de programación formal, un ingeniero debe estructurar la lógica pura con claridad meridiana.",
    "competencyDcd": "CSTA.2-AP-10 — Use flowcharts and/or pseudocode to address complex problems as algorithms, decomposing them into sequential steps and decision branches.",
    "officialSource": "Currículo Complementario ALSIZ — Estándares Internacionales CSTA Computer Science Teachers Association (Grades 6-8)",
    "introduction": "¡Bienvenida a la sala de máquinas del pensamiento computacional, estimada Avril! Te saluda el Ing. Alan Turing. La gente común suele creer que la informática consiste en saber pulsar botones en una pantalla o memorizar sintaxis extraña de programación. Nada más alejado de la verdad. La programación es la ciencia exacta del PENSAMIENTO ESTRUCTURADO. Una computadora es una máquina formidablemente rápida pero absolutamente literal y carente de sentido común; si le das una instrucción ambigua o desordenada, fallará catastróficamente. Por eso, en 1936 inventé el concepto teórico de la máquina universal: un sistema que ejecuta secuencias finitas de pasos lógicos inequívocos. A esa secuencia la llamamos ALGORITMO. ¡Hoy aprenderás a diseñar la arquitectura lógica de un algoritmo antes de tocar el teclado!",
    "reading": "El enigma de la tostada con mantequilla y la máquina de Turing: En una célebre lección introductoria del Instituto Tecnológico de Massachusetts (MIT), un profesor de ciencias de la computación pidió a sus estudiantes que escribieran un algoritmo infalible para \"preparar una rebanada de pan tostado con mantequilla\". El primer estudiante escribió: \"Toma el pan, ponle mantequilla y tuéstalo\". El profesor tomó una barra entera de pan con funda plástica, le arrojó un bloque entero de mantequilla con papel aluminio encima y lo metió a la tostadora, provocando una humareda. Los estudiantes se rieron, pero comprendieron la profunda lección: el cerebro humano asume cientos de pasos implícitos (\"abrir la funda\", \"sacar una sola rebanada\", \"remover el papel de la mantequilla\", \"usar un cuchillo para esparcir\"). Las computadoras no asumen absolutamente nada. Cada paso debe ser explícito, finito, determinista y ordenado en secuencia estricta. Esa precisión quirúrgica es lo que separa a un usuario pasivo de una verdadera creadora de software.",
    "pedagogicalExplanation": "El diseño algorítmico se basa en cuatro pilares del pensamiento computacional: 1) Descomposición: dividir un problema colosal en módulos independientes pequeños. 2) Reconocimiento de patrones: identificar similitudes o secuencias repetitivas. 3) Abstracción: filtrar los detalles irrelevantes y concentrarse exclusivamente en los datos esenciales. 4) Algoritmos: formular instrucciones paso a paso. Para comunicar algoritmos internacionalmente se utilizan dos herramientas canónicas: los Diagramas de Flujo (representación gráfica estandarizada: óvalo para inicio/fin, paralelogramo para entrada/salida de datos, rectángulo para proceso/operación matemática, y rombo para decisiones condicionales Sí/No) y el Pseudocódigo (lenguaje intermedio legible para humanos pero con estructuras de control formales como SI-ENTONCES-SINO y MIENTRAS).",
    "vocabulary": [
      {
        "term": "Algoritmo",
        "definition": "Conjunto ordenado y finito de operaciones e instrucciones lógicas que permite hallar la solución a un problema determinado de forma determinista.",
        "childFriendlyExample": "Una receta de cocina paso a paso que siempre produce el mismo pastel perfecto si no te saltas ningún paso."
      },
      {
        "term": "Pseudocódigo",
        "definition": "Forma de expresar los distintos pasos que va a realizar un programa de la forma más parecida a un lenguaje de programación real, pero en idioma natural.",
        "childFriendlyExample": "Escribir \"SI edad >= 18 ENTONCES Imprimir(\"Mayor\") SINO Imprimir(\"Menor\")\"."
      },
      {
        "term": "Bifurcación Condicional",
        "definition": "Estructura de control en un algoritmo que evalúa una condición booleana (Verdadero o Falso) y desvía el flujo de ejecución hacia uno de dos caminos posibles.",
        "childFriendlyExample": "El rombo de decisión: \"¿El semáforo está en verde? Sí: cruzar la calle; No: esperar en la vereda\"."
      }
    ],
    "contextualizedExample": "Un sistema automatizado de riego por goteo en un invernadero de rosas en Cayambe: El sensor mide la humedad del suelo ($H$). Algoritmo: INICIO -> Leer H -> ¿H < 30%? -> Sí: Activar electroválvula de agua durante 5 minutos -> No: Mantener electroválvula cerrada -> Esperar 15 minutos -> Volver a medir -> FIN.",
    "socraticQuestions": [
      "¿Por qué decimos que un algoritmo debe ser siempre \"finito\"? ¿Qué peligro informático ocurre si una serie de pasos nunca llega a una instrucción de FIN?",
      "¿En qué se parece un diagrama de flujo con rombos de decisión al árbol de razonamiento que utiliza una médica para diagnosticar una enfermedad a partir de síntomas?",
      "Si un programa entrega un resultado numérico incorrecto pero la computadora no muestra ningún mensaje de error, ¿dónde estuvo la falla: en el hardware de la máquina o en la lógica del algoritmo creado por el humano?"
    ],
    "practicalActivity": {
      "title": "Laboratorio de Algoritmia Visual: Diagrama de Flujo del Clasificador de Residuos",
      "instructions": [
        "Abre la herramienta de diagramación abierta Flowgorithm o utiliza tu cuaderno técnico.",
        "Diseña el diagrama de flujo para un \"Tacho de Basura Inteligente para 8.° EGB\":",
        "  1) Símbolo de INICIO (óvalo).",
        "  2) ENTRADA DE DATOS (paralelogramo): Leer variable \"tipoMaterial\" (\"plastico\", \"organico\", \"papel\", \"otro\").",
        "  3) PRIMERA DECISIÓN (rombo): ¿tipoMaterial == \"organico\"? Sí -> Abrir compuerta verde compost; No -> Pasar a siguiente condición.",
        "  4) SEGUNDA DECISIÓN (rombo): ¿tipoMaterial == \"plastico\"? Sí -> Abrir compuerta azul reciclaje; No -> Depositar en compuerta gris desechos generales.",
        "  5) PROCESO (rectángulo): Incrementar contador de residuos clasificados.",
        "  6) SALIDA (paralelogramo): Mostrar mensaje \"¡Gracias por cuidar el planeta!\".",
        "  7) FIN (óvalo).",
        "Realiza la prueba de escritorio (traza) con tres casos de prueba diferentes para verificar que no existan callejones sin salida."
      ],
      "materials": [
        "Computadora con Flowgorithm o cuaderno cuadriculado",
        "Regla de plantillas geométricas (óvalos, rombos)",
        "Bolígrafos de colores"
      ]
    },
    "applicationActivity": {
      "title": "Traducción de Diagrama de Flujo a Pseudocódigo Estructurado",
      "task": "Traduce formalmente el algoritmo del clasificador de residuos a pseudocódigo estructurado en tu cuaderno de software. Utiliza indentación (sangría) impecable de 4 espacios y las palabras clave en mayúsculas: ALGORITMO, INICIO, LEER, SI, ENTONCES, SINO, FIN_SI, ESCRIBIR, FIN_ALGORITMO.",
      "deliverable": "Código de pseudocódigo limpio con prueba de escritorio tabulada en 3 columnas (Variable de entrada, Rama ejecutada, Salida generada)."
    },
    "formativeEvaluation": {
      "description": "Capacidad para descomponer problemas, utilizar la simbología estándar de diagramas de flujo y redactar pseudocódigo sin ambigüedades.",
      "expectedEvidence": "Avril dibuja diagramas de flujo sintácticamente correctos, resuelve bifurcaciones lógicas y traduce el flujo visual a pseudocódigo indentado."
    },
    "evaluationRubric": {
      "criterion": "Diseño de algoritmos, diagramas de flujo y pseudocódigo (CSTA.2-AP-10)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Dibuja esquemas desordenados sin usar la simbología estándar y olvida condiciones de cierre generando bucles infinitos."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Aplica la simbología de diagramas de flujo pero le cuesta formular condiciones booleanas compuestas o indentar el pseudocódigo."
        },
        {
          "level": "Consolidado",
          "descriptor": "Descompone problemas complejos con elegancia, utiliza la norma ANSI/ISO de diagramación con precisión, ejecuta pruebas de escritorio rigurosas y escribe pseudocódigo modular impecable."
        }
      ]
    },
    "expectedFeedback": "Extraordinaria precisión algorítmica, Avril. Has estructurado las ramas de decisión con la claridad mental de una ingeniera de sistemas. Tu prueba de escritorio demostró que entiendes cómo piensa una máquina antes de programarla.",
    "difficultyAdaptation": "Proporcionar bloques recortables con las figuras geométricas del diagrama para que Avril arme el flujo físicamente sobre la mesa.",
    "advancedExtension": "Avril investiga el concepto de \"bucle mientras que\" (While Loop) y añade al diagrama un ciclo repetitivo que permita procesar residuos de forma continua hasta que el usuario ingrese la palabra \"SALIR\".",
    "resources": [
      {
        "id": "class-soft-avril-01-res-1",
        "type": "simulator",
        "title": "Flowgorithm — Interactive Flowchart Programming Simulator",
        "url": "http://www.flowgorithm.org/",
        "description": "Software educativo libre para diseñar y ejecutar diagramas de flujo interactivos con animación de variables en tiempo real.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-soft-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Pensamiento Computacional y Algoritmia Estructurada",
        "url": "/api/v1/academic/classes/class-soft-avril-01/guide.pdf",
        "description": "Manual de simbología ANSI, convenciones de pseudocódigo, ejercicios de pruebas de escritorio y rúbricas CSTA.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soft-avril-01-act-1",
        "title": "El Algoritmo del Pan Tostado",
        "description": "Lee el experimento del MIT y analiza por qué la precisión en las instrucciones es vital para las computadoras.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-soft-avril-01-act-2",
        "title": "Diagramación del Tacho Inteligente",
        "description": "Dibuja el diagrama de flujo formal con rombos de decisión y entradas/salidas estandarizadas.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soft-avril-01-act-3",
        "title": "Traducción a Pseudocódigo Estructurado",
        "description": "Escribe el pseudocódigo indentado con su respectiva prueba de escritorio de tres casos de prueba.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Elige una rutina matutina en casa (como cepillarse los dientes o preparar la mochila) y escribe un algoritmo de 6 pasos estrictos sin dar nada por sobreentendido.",
    "reflectionPrompt": "¿Cómo te ayuda aprender a descomponer problemas informáticos a resolver dificultades y desafíos grandes en tu vida personal?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soft_avril_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-soft-avril-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-08-SOFT",
      "subjectCode": "SOFT-801",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-soft-avril-02",
    "subjectId": "soft-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "11:30 - 12:15 (45 min)",
    "unit": "Unidad 1: Pensamiento Computacional: Algoritmia y Lógica Estructurada",
    "theme": "Variables, estructuras condicionales y colecciones de datos (Arreglos/Listas)",
    "objective": "Implementar programas estructurados utilizando tipado de variables (números, cadenas, booleanos), operadores lógicos relacionales y estructuras de datos lineales (listas o arreglos indexados) para gestionar colecciones de datos dinámicas.",
    "learningPurpose": "Comprender cómo las computadoras almacenan y procesan volúmenes de información en la memoria RAM, transitando de variables aisladas a listas ordenadas capaces de almacenar bases de datos elementales.",
    "competencyDcd": "CSTA.2-AP-12 — Design and iteratively develop programs that combine control structures, including nested loops and compound conditionals, utilizing collections of data to organize and manipulate information.",
    "officialSource": "Currículo Complementario ALSIZ — Estándares Internacionales CSTA Computer Science Teachers Association (Grades 6-8)",
    "introduction": "¡Feliz viernes de código y programación, Avril! Te saluda el Ing. Alan Turing. En la sesión anterior aprendiste a pensar en algoritmos; hoy aprenderemos cómo esos algoritmos manipulan la MATERIA PRIMA del universo digital: los DATOS. Imagina que la memoria de una computadora es un gigantesco casillero postal con miles de compartimentos numerados. Si guardas un solo número en un casillero, tienes una VARIABLE. Pero si necesitas guardar la lista de calificaciones de un aula entera, los nombres de 100 especies de aves de la Amazonía ecuatoriana o las canciones de tu lista de reproducción favorita, no vas a crear 100 variables individuales (`cancion1`, `cancion2`...). ¡Eso sería caótico e ineficiente! Para eso los científicos de la computación creamos las COLECCIONES o LISTAS (Arreglos). ¡Hoy dominarás el poder de las variables tipadas y los arreglos indexados!",
    "reading": "De las tarjetas perforadas a los arrays de Ada Lovelace: En el siglo XIX, una aristócrata y matemática visionaria llamada Ada Lovelace colaboró con Charles Babbage en el diseño de la \"Máquina Analítica\", el primer diseño conceptual de una computadora mecánica del mundo. Ada no solo comprendió cómo funcionaban los engranajes de latón, sino que escribió el primer algoritmo destinado a ser procesado por una máquina: el cálculo de los números de Bernoulli. En sus notas históricas de 1843, Ada previó que la máquina no solo procesaría números aritméticos simples, sino que podría manipular símbolos abstractos, notas musicales y colecciones de información organizada. Describió cómo una serie de tarjetas perforadas podía almacenar una tabla o lista de datos secuenciales a los que se podía acceder mediante un índice numérico. Ada Lovelace se convirtió así en la primera programadora de la historia, demostrando que la poesía y la ciencia exacta pueden fusionarse en el arte sublime del software.",
    "pedagogicalExplanation": "En programación, una VARIABLE es un espacio reservado en la memoria con un identificador único y un tipo de dato específico: 1) Entero (`int`: ej. 12); 2) Decimal/Flotante (`float`: ej. 9.75); 3) Cadena de texto (`string`: ej. \"Avril\"); 4) Booleano (`boolean`: `true` o `false`). Una LISTA o ARREGLO (Array) es una estructura de datos que almacena múltiples elementos del mismo tipo o variados bajo un solo nombre identificador, organizados por un ÍNDICE numérico basado en cero (Zero-based indexing): el primer elemento está en la posición `[0]`, el segundo en `[1]`, etc. Las operaciones fundamentales sobre una lista son: acceso por índice (`lista[0]`), inserción de elementos (`append`), modificación (`lista[1] = nuevoValor`) y recorrido sistemático mediante un bucle iterativo (`para cada elemento en lista`).",
    "vocabulary": [
      {
        "term": "Arreglo / Lista (Array)",
        "definition": "Estructura de datos homogénea que almacena una secuencia ordenada de elementos accesibles mediante un índice numérico.",
        "childFriendlyExample": "Una cajita de pastillas con divisiones marcadas del lunes al domingo es como un arreglo de 7 posiciones."
      },
      {
        "term": "Índice basado en cero (Zero-indexed)",
        "definition": "Convención informática estándar donde el primer elemento de una secuencia se ubica en la posición ordinal 0 y no en la 1.",
        "childFriendlyExample": "En la lista [\"Manzana\", \"Pera\"], \"Manzana\" está en el índice 0 y \"Pera\" en el índice 1."
      },
      {
        "term": "Booleano",
        "definition": "Tipo de dato algebraico binario que solo puede adoptar uno de dos valores posibles: Verdadero (True) o Falso (False).",
        "childFriendlyExample": "La variable \"tareaEntregada = True\" indica que la tarea fue completada."
      }
    ],
    "contextualizedExample": "Un catálogo digital de flora nativa del volcán Ilaló en Python/TypeScript: `especies = [\"Polylepis\", \"Chilca\", \"Pumaqui\", \"Chuquiragua\"]`. Si queremos imprimir la flor emblemática del páramo andino, llamamos a `especies[3]`, cuyo valor exacto es \"Chuquiragua\".",
    "socraticQuestions": [
      "¿Por qué casi todos los lenguajes de programación modernos (Python, TypeScript, C++, Java) empiezan a contar los elementos de una lista desde el índice cero [0] en lugar de empezar en el uno [1]?",
      "Si tienes una lista con 5 elementos llamada `alumnos`, ¿qué ocurre si intentas consultar `alumnos[5]`? ¿Por qué se produce un temido error de \"Index Out of Bounds\" (Índice fuera de límites)?",
      "¿Cuál es la diferencia conceptual entre el valor que contiene una variable y el nombre o etiqueta de la variable?"
    ],
    "practicalActivity": {
      "title": "Taller de Laboratorio en Replit / Python: Gestor de Inventario de Semillas Andinas",
      "instructions": [
        "Abre el entorno interactivo de Python en Replit o en tu cuaderno de programación.",
        "Escribe y analiza el siguiente script estructurado:",
        "  1) Declara una lista con 4 semillas ancestrales: `semillas = [\"Quinua\", \"Amaranto\", \"Chocho\", \"Maíz Morocho\"]`.",
        "  2) Imprime el primer elemento usando su índice cero: `print(\"Primera semilla:\", semillas[0])`.",
        "  3) Agrega una nueva semilla a la lista mediante el método append: `semillas.append(\"Cebada\")`.",
        "  4) Modifica el segundo elemento: `semillas[1] = \"Kiwicha Real\"`.",
        "  5) Escribe un bucle `for` para recorrer la lista e imprimir cada semilla numerada:",
        "     `for i, semilla in enumerate(semillas):`",
        "     `    print(f\"Lote #{i+1}: {semilla}\")`",
        "Verifica la salida en la consola y documenta los cambios de estado en la memoria."
      ],
      "materials": [
        "Computadora o tablet con navegador web",
        "Plataforma Replit / Python Web",
        "Cuaderno de programación"
      ]
    },
    "applicationActivity": {
      "title": "Mini-Programa: Validador de Calificaciones y Cálculo de Promedio",
      "task": "Diseña en pseudocódigo o código Python un programa que declare una lista de 4 notas numéricas de Avril en el trimestre: `notas = [9.5, 8.8, 10.0, 9.2]`. El programa debe sumar las 4 notas utilizando un bucle acumulador, calcular el promedio dividiendo para el tamaño de la lista (`len(notas)`), y evaluar mediante una condicional SI el promedio es mayor o igual a 9.0 para imprimir un mensaje de \"¡Rendimiento Académico Sobresaliente!\".",
      "deliverable": "Código fuente documentado con comentarios explicativos y captura de pantalla o transcripción de la ejecución exitosa."
    },
    "formativeEvaluation": {
      "description": "Comprensión de los tipos de datos primitivos, manejo de listas indexadas y control de flujos iterativos.",
      "expectedEvidence": "Avril implementa listas sin errores de índice, comprende la indexación en base cero y combina condicionales y bucles para manipular datos estructurados."
    },
    "evaluationRubric": {
      "criterion": "Manejo de variables, condicionales y colecciones de datos en programación (CSTA.2-AP-12)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Confunde tipos de datos y comete errores sistemáticos de índice fuera de rango al acceder a listas."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Declara listas y accede a elementos por índice pero le cuesta integrar bucles o calcular acumuladores."
        },
        {
          "level": "Consolidado",
          "descriptor": "Domina los tipos de datos primitivos, manipula listas con fluidez (indexación, adición, modificación), recorre colecciones con bucles y documenta su código con comentarios profesionales."
        }
      ]
    },
    "expectedFeedback": "Extraordinaria maestría en programación, Avril. Has heredado el espíritu analítico y visionario de Ada Lovelace. Tu comprensión de las listas y la indexación en base cero demuestra que estás lista para crear aplicaciones y proyectos de software de gran impacto.",
    "difficultyAdaptation": "Utilizar una tabla física cuadriculada con fichas numeradas del 0 al 4 donde Avril coloca tarjetas con palabras para simular la memoria del computador.",
    "advancedExtension": "Avril investiga qué es un \"Diccionario\" o \"Objeto Clave-Valor\" en Python/TypeScript (`{\"nombre\": \"Quinua\", \"proteina\": \"14g\"}`) y diseña una lista de diccionarios para modelar una pequeña base de datos botánica.",
    "resources": [
      {
        "id": "class-soft-avril-02-res-1",
        "type": "simulator",
        "title": "Replit — Python & TypeScript Interactive Coding Environment",
        "url": "https://replit.com/",
        "description": "Entorno de desarrollo integrado en la nube para escribir, ejecutar y depurar código Python y JavaScript de forma segura.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-soft-avril-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Estructuras de Datos y Arreglos para Secundaria",
        "url": "/api/v1/academic/classes/class-soft-avril-02/guide.pdf",
        "description": "Manual de referencia rápida de sintaxis, diagramas de memoria RAM, retos de listas y rúbrica de código limpio.",
        "duration": "25 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soft-avril-02-act-1",
        "title": "El Legado de Ada Lovelace",
        "description": "Lee sobre la primera programadora de la historia y reflexiona sobre el poder de los algoritmos para transformar la sociedad.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-soft-avril-02-act-2",
        "title": "Laboratorio de Arreglos en Python",
        "description": "Ejecuta el script de inventario de semillas andinas y experimenta con métodos de listas e índices.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soft-avril-02-act-3",
        "title": "Programa Validador de Calificaciones",
        "description": "Escribe el código del acumulador y cálculo de promedio con condicional de felicitación.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Escribe en tu cuaderno una lista de tus 5 libros o canciones preferidas como si fuera un arreglo de código: `misFavoritos = [...]`, y anota cuál está en el índice 0 y cuál en el 4.",
    "reflectionPrompt": "¿Cómo puedes utilizar la programación y la tecnología no solo para jugar o consumir, sino para construir soluciones que ayuden a los demás?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soft_avril_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-soft-avril-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-08-SOFT",
      "subjectCode": "SOFT-801",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-rel-avril-01",
    "subjectId": "rel-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Mayordomía, Vocación y Carácter: La Ética de la Verdad y el Servicio",
    "theme": "Fe y Razón: La mayordomía de la mente, la integridad y el propósito de vida",
    "objective": "Examinar la armonía profunda entre la fe cristiana y la búsqueda científica y racional de la verdad, analizando la parábola de los talentos como un principio ético de mayordomía intelectual y servicio altruista.",
    "learningPurpose": "Comprender que la fe no es una renuncia al pensamiento crítico ni un dogmatismo ciego, sino el fundamento moral y amoroso que orienta el conocimiento hacia la justicia, la belleza y la protección de la creación.",
    "competencyDcd": "EKB.8.1 — Reflexionar sobre la armonía entre la fe y la razón, comprendiendo los dones y talentos como una responsabilidad ética de servicio al prójimo.",
    "officialSource": "Currículo Institucional ALSIZ — Filosofía Cristiana, Carácter y Mayordomía Bíblica (Alianza Ekballo)",
    "introduction": "¡Paz y bien, querida Avril! Te saluda con afecto el Pastor David. A menudo escucharás en el mundo moderno la falsa idea de que la fe y la ciencia son enemigas irreconciliables, como si para creer en Dios hubiera que apagar el cerebro, o como si para ser una brillante científica o matemática hubiera que vaciar el alma de trascendencia y amor. ¡Qué inmenso error! Los más grandes pioneros de la ciencia moderna —como Johannes Kepler, Isaac Newton, Blaise Pascal o Gregor Mendel— investigaron las leyes del cosmos precisamente porque creían que el universo fue creado con un orden sublime por una Mente sabia. Para nosotros en ALSIZ, tu inteligencia, tu capacidad de dudar y tu sed de verdad son dones sagrados. ¡Hoy reflexionaremos sobre la mayordomía de tu mente!",
    "reading": "Kepler y el asombro del Creador en las órbitas celestes: En el siglo XVII, el astrónomo Johannes Kepler pasó décadas de agotador cálculo matemático descifrando el movimiento errante de los planetas. Cuando finalmente descubrió que los planetas no se mueven en círculos perfectos sino en elipses alrededor del Sol, cayó de rodillas en su observatorio y exclamó emocionado: \"¡Dios mío, estoy pensando tus pensamientos después de Ti!\". Kepler no sentía que la geometría destruyera su fe; al contrario, sentía que cada fórmula matemática era un himno de alabanza a la belleza y coherencia de la creación. Paralelamente, en el Evangelio de Mateo (25:14-30), Jesús relata la célebre Parábola de los Talentos: un señor encomienda recursos valiosos a sus siervos antes de partir. Quienes multiplicaron sus talentos mediante el trabajo diligente y creativo fueron elogiados, mientras que quien enterró su talento por miedo y pereza fue reprendido. Tus talentos académicos —tu voz, tu raciocinio lógico, tu empatía— son semillas que Dios ha depositado en tus manos no para inflar el egoísmo, sino para iluminar el mundo mediante el servicio.",
    "pedagogicalExplanation": "La cosmovisión cristiana bíblica postula que la verdad es una unidad indivisible: toda verdad científica, histórica o matemática legítima proviene de Dios, porque Él es el autor de la realidad (\"La verdad os hará libres\", Juan 8:32). La mayordomía bíblica (del griego oikonomia: administración responsable de un hogar) enseña que no somos dueños absolutos de nuestra vida ni de nuestros dones, sino administradores o custodios temporales. Esto implica tres compromisos éticos fundamentales: 1) Excelencia académica: desarrollar al máximo el potencial intelectual como un acto de gratitud y adoración. 2) Integridad moral: amar la verdad y rechazar el engaño, la trampa o la mentira en la investigación y en la vida cotidiana. 3) Vocación de servicio (Agape): poner los conocimientos adquiridos al servicio de los más vulnerables, cuidando la naturaleza y buscando el bienestar de la comunidad.",
    "vocabulary": [
      {
        "term": "Mayordomía (Oikonomia)",
        "definition": "La responsabilidad ética y espiritual de administrar con diligencia, justicia y cuidado los recursos, talentos y la naturaleza encomendados por Dios.",
        "childFriendlyExample": "Cuidar tus libros, usar bien tu tiempo de estudio y proteger el agua de tu casa es practicar la mayordomía."
      },
      {
        "term": "Integridad",
        "definition": "Cualidad ética de una persona que actúa conforme a la verdad y a los principios morales tanto en público como cuando nadie la está mirando.",
        "childFriendlyExample": "Hacer tus tareas con honestidad sin copiar ni hacer trampa en los exámenes es actuar con integridad."
      },
      {
        "term": "Vocación",
        "definition": "Llamado interior profundo que orienta los dones y pasiones individuales hacia una misión de vida con sentido trascendente y utilidad social.",
        "childFriendlyExample": "Sentir en tu corazón el deseo de estudiar biología para curar enfermedades o restaurar bosques andinos."
      }
    ],
    "contextualizedExample": "Monseñor Leonidas Proaño en la provincia de Chimborazo dedicó toda su vida y su formación teológica a defender la dignidad, la educación y los derechos de los pueblos indígenas del Ecuador, fundando las Escuelas Radiofónicas Populares para enseñar a leer y escribir en kichwa y castellano.",
    "socraticQuestions": [
      "¿Por qué el miedo paralizó al siervo que enterró su talento en la parábola de Jesús, y cómo el miedo al fracaso puede impedir que desarrollemos nuestros talentos hoy en día?",
      "Si una persona adquiere un conocimiento científico formidable pero carece de amor y empatía por los demás, ¿qué tipo de consecuencias negativas puede provocar en la sociedad?",
      "¿Cómo puedes discernir si estás utilizando tus talentos para alimentar el orgullo personal o para servir con generosidad a quienes te rodean?"
    ],
    "practicalActivity": {
      "title": "El Árbol de la Mayordomía Personal: Dones, Habilidades y Misión",
      "instructions": [
        "Dibuja en tu cuaderno devocional un árbol frondoso de raíces profundas.",
        "En las RAÍCES, escribe 3 principios o valores éticos innegociables que recibes de Dios y tu familia (ejemplo: Verdad, Honestidad, Amor al prójimo).",
        "En el TRONCO, escribe tus talentos e intereses académicos actuales (ejemplo: amor por la lectura, destreza matemática, curiosidad científica, capacidad de escuchar).",
        "En las RAMAS Y FRUTOS, escribe al menos 3 formas concretas en que esos talentos pueden convertirse en bendición práctica para otras personas durante este año escolar (ejemplo: ayudar a explicar un tema a un compañero, liderar un proyecto ecológico de reciclaje, consolar a quien esté triste).",
        "Escribe al pie del árbol un versículo o máxima socrática que inspire tu jornada académica."
      ],
      "materials": [
        "Cuaderno de reflexión ética / devocional",
        "Lápices de colores y rotulador fino"
      ]
    },
    "applicationActivity": {
      "title": "Manifiesto de Integridad y Propósito de Avril",
      "task": "Redacta tu Manifiesto Personal de Inicio de Año (1 página): Formula una declaración de propósito respondiendo: ¿Para qué quiero aprender? ¿Cómo me comprometo a actuar con integridad cuando enfrente desafíos difíciles? ¿De qué manera pondré mi educación al servicio de mi familia, mi país y mi Creador?",
      "deliverable": "Manifiesto caligrafiado e ilustrado con firma de compromiso moral para ser incorporado al portafolio de formación integral."
    },
    "formativeEvaluation": {
      "description": "Capacidad para reflexionar sobre la relación entre fe, razón y ética, identificando los propios talentos con humildad y sentido de servicio.",
      "expectedEvidence": "Avril argumenta la complementariedad entre pensamiento crítico y valores espirituales, y formula metas de servicio basadas en la mayordomía bíblica."
    },
    "evaluationRubric": {
      "criterion": "Reflexión ética sobre fe, razón y mayordomía de los talentos (EKB.8.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Percibe la religión como una serie de normas externas sin vincularla con su vida intelectual ni con el servicio práctico."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Reconoce sus talentos pero le cuesta articularlos con la responsabilidad ética hacia los demás o con la integridad académica."
        },
        {
          "level": "Consolidado",
          "descriptor": "Integra con madurez fe y razón, comprende la mayordomía como principio de vida, elabora un manifiesto de propósitos altruistas y fundamenta sus valores con coherencia ética."
        }
      ]
    },
    "expectedFeedback": "Una reflexión conmovedora y llena de madurez espiritual, querida Avril. Has plasmado en tu árbol de mayordomía el corazón mismo de lo que significa educarse para servir. Tu mente brillante iluminada por un corazón noble es el mejor testimonio de amor a Dios y al prójimo.",
    "difficultyAdaptation": "Proporcionar una plantilla del árbol con preguntas guía impresas en cada sección para orientar la introspección personal.",
    "advancedExtension": "Avril investiga la vida del médico y misionero Albert Schweitzer (Premio Nobel de la Paz) y cómo su principio de \"Reverencia por la Vida\" articuló teología, música clásica y medicina tropical en África.",
    "resources": [
      {
        "id": "class-rel-avril-01-res-1",
        "type": "simulator",
        "title": "Portal de Filosofía y Ciencia Cristiana — Fe, Razón y Mayordomía",
        "url": "https://biologos.org/",
        "description": "Fundación educativa internacional fundada por el genetista Francis Collins para promover la armonía entre la ciencia rigurosa y la fe cristiana.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-rel-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Mayordomía Bíblica, Fe y Pensamiento Crítico",
        "url": "/api/v1/academic/classes/class-rel-avril-01/guide.pdf",
        "description": "Ficha devocional y filosófica con textos bíblicos comentados (Proverbios, Mateo), dilemas éticos y rúbrica de carácter.",
        "duration": "15 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-rel-avril-01-act-1",
        "title": "La Oración de Kepler",
        "description": "Lee el testimonio del astrónomo Johannes Kepler y reflexiona sobre la belleza del orden en la creación.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-rel-avril-01-act-2",
        "title": "El Árbol de la Mayordomía Personal",
        "description": "Dibuja y completa el árbol conectando tus raíces éticas, tronco de talentos y frutos de servicio al prójimo.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-rel-avril-01-act-3",
        "title": "Manifiesto de Integridad y Propósito",
        "description": "Redacta y firma tu compromiso de mayordomía intelectual para el ciclo académico 2026-2027.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Comparte con tu familia durante la cena tu árbol de talentos y pregúntales qué fruto de servicio conjunto les gustaría cosechar este año.",
    "reflectionPrompt": "¿Qué significa en tu vida diaria la frase: \"Al que mucho se le da, mucho se le exigirá\"?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_rel_avril_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-rel-avril-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-09-REL",
      "subjectCode": "REL-801",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-art-avril-01",
    "subjectId": "art-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Geometría Visual y Composición: Perspectiva y la Proporción Áurea",
    "theme": "La perspectiva cónica con punto de fuga y la divina proporción en las artes plásticas",
    "objective": "Analizar los principios geométricos de la perspectiva lineal renacentista (línea de horizonte, punto de fuga y líneas de fuga) y la proporción áurea, aplicándolos en una composición plástica bidimensional con ilusión de profundidad espacial.",
    "learningPurpose": "Comprender que el arte no está reñido con la ciencia exacta, sino que los grandes maestros renacentistas revolucionaron la pintura al integrar la óptica y la geometría euclidiana para representar el espacio tridimensional.",
    "competencyDcd": "ECA.4.1.1 — Analizar pinturas y producciones artísticas de diversas épocas aplicando conceptos de perspectiva lineal, ritmo y equilibrio compositivo.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Educación Cultural y Artística EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Bienvenida al taller de luz y geometría, estimada Avril! Te saluda la Maestra Clara Monet. Si miras una pintura de la Edad Media, notarás que los personajes parecen flotar unos encima de otros en un plano plano y aplastado: los reyes son gigantescos y los campesinos diminutos, sin ninguna sensación de profundidad espacial. Pero en la Florencia del siglo XV, el arquitecto Filippo Brunelleschi y el polímata Leonardo da Vinci se hicieron una pregunta fascinante: \"¿Cómo viaja la luz desde los objetos hasta la retina humana?\". Descubrieron que las líneas paralelas en el mundo tridimensional parecen converger en un punto infinito en el horizonte. Con ese hallazgo matemático nació la PERSPECTIVA LINEAL y la PROPORCIÓN ÁUREA, transformando un lienzo plano de dos dimensiones en una ventana abierta a la realidad. ¡Hoy nos convertiremos en arquitectas de la profundidad visual!",
    "reading": "El experimento de Brunelleschi frente al Baptisterio de Florencia: En 1415, parado frente a las puertas de bronce del Baptisterio de San Juan, Filippo Brunelleschi tomó un panel de madera con una pintura exacta del edificio y le hizo un pequeño orificio en el centro. Le pidió a un transeúnte que mirara por el agujero desde la parte posterior del panel mientras sostenía un espejo frente a la pintura. Al mover el espejo, el observador no podía distinguir entre el reflejo del cuadro pintado y el edificio real de mármol que estaba enfrente. Brunelleschi había descubierto la ley matemática de la perspectiva cónica central: al trazar una Línea de Horizonte a la altura de los ojos del espectador y situar un Punto de Fuga al que convergen todas las líneas ortogonales, el cerebro humano interpreta automáticamente la ilusión de lejanía y volumen. Paralelamente, el fraile Luca Pacioli publicó \"La Divina Proporción\", ilustrado por Da Vinci, demostrando que la relación matemática $\\Phi \\approx 1.618$ (el número áureo) se encuentra en la espiral de los girasoles, en la concha del nautilus y en las obras maestras más armoniosas de la historia.",
    "pedagogicalExplanation": "La perspectiva cónica frontal se fundamenta en tres elementos geométricos estructurantes: 1) Línea de Horizonte ($LH$): línea imaginaria horizontal que representa el nivel exacto de los ojos del observador. 2) Punto de Fuga ($PF$): punto único situado sobre la $LH$ donde todas las líneas paralelas que se alejan del espectador convergen visualmente. 3) Líneas de Fuga: rectas auxiliares diagonales que conectan las esquinas de los objetos con el $PF$. La Proporción Áurea o Sección Dorada divide un segmento en dos partes de modo que la relación entre la totalidad y la parte mayor sea idéntica a la relación entre la parte mayor y la menor ($\\frac{A+B}{A} = \\frac{A}{B} \\approx 1.618$), creando una armonía visual innata que el ojo humano percibe como naturalmente bella y equilibrada.",
    "vocabulary": [
      {
        "term": "Punto de Fuga",
        "definition": "Punto sobre la línea de horizonte donde convergen las líneas paralelas oblicuas proyectadas para crear la ilusión óptica de profundidad tridimensional.",
        "childFriendlyExample": "Si miras los rieles rectos de un tren en el campo, el punto a lo lejos donde parecen juntarse es el punto de fuga."
      },
      {
        "term": "Línea de Horizonte",
        "definition": "Línea horizontal imaginaria a la altura de la mirada del espectador que separa el cielo de la tierra en una composición pictórica.",
        "childFriendlyExample": "Donde el mar se encuentra con el cielo al atardecer es la línea de horizonte."
      },
      {
        "term": "Proporción Áurea (Phi)",
        "definition": "Constante matemática irracional (~1.618) que describe una proporción geométrica armónica omnipresente en la naturaleza y en el arte clásico.",
        "childFriendlyExample": "La espiral dorada de una caracola marina o el espiral de una galaxia siguen la proporción áurea."
      }
    ],
    "contextualizedExample": "En la arquitectura de la Iglesia de la Compañía de Jesús en Quito, los maestros de la Escuela Quiteña utilizaron la perspectiva cónica y la proporción áurea en sus retablos barrocos dorados para generar la sensación óptica de que las bóvedas se elevan infinitamente hacia el cielo.",
    "socraticQuestions": [
      "¿Por qué las pinturas medievales anteriores al Renacimiento carecían de punto de fuga, y qué representaba el tamaño de los personajes en esa época (tamaño físico vs. jerarquía religiosa)?",
      "Si te agachas hasta el suelo o te subes a la cima de una torre, ¿qué le ocurre a la línea de horizonte de tu dibujo: sube, baja o permanece inalterada?",
      "¿Por qué crees que el cerebro humano encuentra más agradable a la vista una fotografía o cuadro compuesto según la regla de los tercios o la proporción áurea que uno donde todo está cortado simétricamente por la mitad?"
    ],
    "practicalActivity": {
      "title": "Taller Geométrico de Perspectiva: El Corredor Renacentista en 1 Punto de Fuga",
      "instructions": [
        "En una lámina de dibujo técnico, traza con regla una Línea de Horizonte ($LH$) horizontal en la mitad exacta del papel.",
        "Marca un Punto de Fuga ($PF$) nítido en el centro de la $LH$.",
        "Traza 4 líneas de fuga diagonales desde el $PF$ hacia las cuatro esquinas de la lámina (formando techo, piso y paredes de un pasillo o biblioteca).",
        "Dibuja un piso ajedrezado: traza líneas radiales desde el $PF$ y corta con líneas horizontales cuya distancia se reduzca progresivamente a medida que se acercan al horizonte.",
        "Dibuja dos puertas o cuadros en las paredes laterales: uno en primer plano y otro cerca del horizonte, cuidando que sus alturas sigan las líneas de fuga.",
        "Aplica técnica de claroscuro (sombreado con lápiz 2B o carboncillo) para intensificar el volumen y la luz proyectada."
      ],
      "materials": [
        "Lámina de dibujo formato A4",
        "Regla de 30 cm y escuadra",
        "Lápiz HB (líneas guía) y 2B (sombras)",
        "Borrador de precisión"
      ]
    },
    "applicationActivity": {
      "title": "Análisis Compositivo de \"La Escuela de Atenas\" de Rafael Sanzio",
      "task": "Observa la reproducción digital en alta resolución de \"La Escuela de Atenas\" de Rafael. En una fotografía o copia impresa del cuadro, traza con rotulador rojo las líneas de fuga de la bóveda arquitectónica y ubica con precisión milimétrica el punto de fuga principal (descubrirás que coincide con el pecho de Platón y Aristóteles). Redacta un párrafo explicando cómo el pintor utilizó la geometría para convertir a los dos filósofos en el centro gravitatorio visual y conceptual de la obra.",
      "deliverable": "Lámina analítica con trazado geométrico sobrepuesto y ficha de apreciación estética (1 página)."
    },
    "formativeEvaluation": {
      "description": "Comprensión de los elementos de la perspectiva cónica, precisión técnica en el trazado con instrumentos geométricos y apreciación estética renacentista.",
      "expectedEvidence": "Avril construye una perspectiva de un punto de fuga geométricamente consistente, graduando la escala de los objetos en función de la distancia al horizonte."
    },
    "evaluationRubric": {
      "criterion": "Aplicación de perspectiva lineal y proporción compositiva (ECA.4.1.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Dibuja sin línea de horizonte ni punto de fuga definido, manteniendo objetos fuera de escala sin ilusión de profundidad."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Traza la línea de horizonte y el punto de fuga pero las líneas diagonales no convergen con exactitud o la escala horizontal es irregular."
        },
        {
          "level": "Consolidado",
          "descriptor": "Ejecuta una perspectiva cónica impecable con regla y escuadra, gradúa la escala espacial con rigor matemático, aplica claroscuro y fundamenta el uso simbólico del punto de fuga."
        }
      ]
    },
    "expectedFeedback": "Una obra de asombrosa precisión y sensibilidad plástica, Avril. Has unido la geometría de Brunelleschi con la elegancia compositiva de Da Vinci. Tu dibujo no solo tiene profundidad visual, sino una armonía que cautiva la mirada.",
    "difficultyAdaptation": "Proporcionar una plantilla con la línea de horizonte y el punto de fuga premarcados y líneas guía punteadas para orientar las primeras diagonales.",
    "advancedExtension": "Avril investiga la \"perspectiva oblicua de dos puntos de fuga\" ($PF_1$ y $PF_2$) y dibuja un edificio o cubo visto desde una de sus esquinas angulares.",
    "resources": [
      {
        "id": "class-art-avril-01-res-1",
        "type": "simulator",
        "title": "Google Arts & Culture — Galería de los Uffizi y Perspectiva Renacentista",
        "url": "https://artsandculture.google.com/partner/uffizi-gallery",
        "description": "Recorrido interactivo en ultra alta resolución por las obras maestras de Florencia con herramientas de zoom para examinar líneas de fuga.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-art-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Geometría Visual, Perspectiva y Proporción Áurea",
        "url": "/api/v1/academic/classes/class-art-avril-01/guide.pdf",
        "description": "Manual de dibujo artístico con plantillas de cuadrículas perspectrónicas, el espiral de Fibonacci y ejercicios de claroscuro.",
        "duration": "15 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-art-avril-01-act-1",
        "title": "El Espejo de Brunelleschi",
        "description": "Lee el experimento renacentista y analiza la relación entre la ciencia óptica y la pintura.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-art-avril-01-act-2",
        "title": "Taller del Pasillo Renacentista",
        "description": "Dibuja la lámina en perspectiva cónica central aplicando instrumentos de precisión geométrica.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-art-avril-01-act-3",
        "title": "Análisis de \"La Escuela de Atenas\"",
        "description": "Traza las líneas de fuga de la obra de Rafael e interpreta la posición central de Platón y Aristóteles.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Toma una fotografía con un teléfono o cámara desde el pasillo de tu casa o una calle recta y traza sobre ella con una app o sobre papel dónde se ubica el punto de fuga.",
    "reflectionPrompt": "¿Cómo cambia tu manera de observar el mundo a tu alrededor cuando entiendes las leyes invisibles de la luz y el espacio?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_art_avril_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-art-avril-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-10-ART",
      "subjectCode": "ART-801",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-efi-avril-01",
    "subjectId": "efi-avril",
    "studentId": "avril",
    "gradeLevel": "8.º EGB Superior (Avril - 12 años)",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Fisiología del Movimiento y Salud Postural en la Era Digital",
    "theme": "Frecuencia cardíaca diana, biomecánica postural y prevención del sedentarismo",
    "objective": "Monitorear la respuesta fisiológica cardiovascular antes, durante y después del ejercicio aeróbico (frecuencia cardíaca en reposo y zona diana), aplicando rutinas de biomecánica postural y pausas activas para compensar el sedentarismo tecnológico.",
    "learningPurpose": "Comprender que el cuerpo humano está evolutivamente diseñado para el movimiento continuo y que cuidar la columna vertebral y la capacidad cardiorrespiratoria es indispensable para mantener la agudeza mental y la longevidad.",
    "competencyDcd": "EF.4.1.1 — Participar en diferentes prácticas corporales reconociendo el esfuerzo físico, la frecuencia cardíaca y adoptando posturas ergonómicas para cuidar la salud integral.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Educación Física EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡En marcha con energía, querida Avril! Te saluda tu entrenador Mateo. En nuestra era contemporánea, pasamos horas frente a pantallas de computadoras, tablets y libros. Si no somos conscientes de nuestra postura, el cuello se proyecta hacia adelante (el llamado síndrome de \"Text Neck\" o cuello de texto), los hombros se encorvan hacia adentro y la circulación sanguínea se vuelve perezosa. La Organización Mundial de la Salud (OMS) advierte que el sedentarismo es uno de los mayores factores de riesgo para la salud del siglo XXI. Sin embargo, tu corazón es una bomba muscular incansable que late más de 100.000 veces al día. Hoy aprenderemos a tomarle el pulso a tu salud: calcularemos tu Frecuencia Cardíaca Diana, ejecutaremos ejercicios de movilidad articular y diseñaremos una estación ergonómica perfecta.",
    "reading": "La máquina cardiovascular humana y la fórmula de Karvonen: En reposo, el corazón de un joven de 12 años late entre 70 y 90 pulsaciones por minuto (ppm), bombeando aproximadamente 5 litros de sangre rica en oxígeno y nutrientes a cada rincón del cuerpo, incluyendo el cerebro. Cuando inicias una caminata rápida, saltas la cuerda o subes una cuesta andina, las células musculares demandan más trifosfato de adenosina (ATP) y oxígeno. El sistema nervioso simpático responde acelerando los latidos. Para saber si estás entrenando de manera segura y eficiente sin sobreexigirte ni quedarte en un esfuerzo inútil, la medicina deportiva utiliza la Frecuencia Cardíaca Máxima estimada ($FCM = 220 - \\text{edad}$) y la \"Zona de Entrenamiento Diana\" (entre el 60% y el 80% de tu capacidad máxima). En esa zona dorada, tu miocardio se fortalece, los pulmones expanden su capacidad vital y el cerebro libera endorfinas y dopamina, los neurotransmisores del bienestar, la memoria y el aprendizaje alegre.",
    "pedagogicalExplanation": "La sesión articula dos dimensiones fisiológicas: 1) Monitoreo cardiovascular: localización del pulso radial (en la base del pulgar de la muñeca) o carotídeo (en el cuello, al lado de la tráquea). Se cuentan los latidos durante 15 segundos y se multiplica por 4 para obtener las pulsaciones por minuto ($ppm$). Para Avril (12 años), su $FCM$ teórica es $220 - 12 = 208$ ppm. Su zona de entrenamiento aeróbico saludable se ubica entre $125$ y $165$ ppm. 2) Ergonomía y Biomecánica: alineación de la columna vertebral (curvatura lordótica y cifótica natural). Regla ergonómica 90-90-90: caderas a 90°, rodillas a 90° con pies apoyados en el suelo, y codos a 90° con la mirada a la altura del tercio superior de la pantalla para evitar la hiperflexión cervical.",
    "vocabulary": [
      {
        "term": "Frecuencia Cardíaca en Reposo (FCR)",
        "definition": "Número de contracciones o latidos del corazón por minuto cuando una persona se encuentra en un estado de tranquilidad física y mental absoluta.",
        "childFriendlyExample": "Al despertar por la mañana antes de levantarte de la cama, tu pulso suele marcar entre 65 y 75 ppm."
      },
      {
        "term": "Zona de Frecuencia Cardíaca Diana",
        "definition": "Rango óptimo de pulsaciones por minuto en el cual el corazón y los pulmones se entrenan y fortalecen de manera segura y eficiente sin riesgo cardiovascular.",
        "childFriendlyExample": "Entrenar a 140 ppm mientras saltas la cuerda te mantiene en tu zona diana perfecta."
      },
      {
        "term": "Ergonomía Postural",
        "definition": "Disciplina que diseña y adapta los espacios de trabajo, estudio y posturas corporales para optimizar la salud física y prevenir lesiones osteomusculares.",
        "childFriendlyExample": "Ajustar la altura de tu silla para que tu espalda esté recta y tus pies apoyados en el suelo es ergonomía."
      }
    ],
    "contextualizedExample": "Los atletas ecuatorianos de élite, como los marchistas andinos de Cuenca (Jefferson Pérez, Glenda Morejón), entrenan controlando rigurosamente su frecuencia cardíaca diana en la altitud de los 2.500 metros sobre el nivel del mar para maximizar su consumo de oxígeno ($VO_2$ máx).",
    "socraticQuestions": [
      "¿Por qué el corazón de una persona deportista suele latir más lento en reposo (por ejemplo 55 ppm) que el de una persona sedentaria (85 ppm)? ¿Qué adaptación muscular ha ocurrido en su corazón?",
      "Si inclinas la cabeza hacia adelante 45 grados para mirar el teléfono celular, ¿cuántos kilos adicionales de presión recibe la columna cervical en comparación con una postura recta?",
      "¿Por qué realizar una \"pausa activa\" de estiramiento y respiración profunda cada 45 minutos de estudio mejora la concentración en materias difíciles como matemáticas o lectura analítica?"
    ],
    "practicalActivity": {
      "title": "Circuito Fisiológico: Curva de Frecuencia Cardíaca y Prueba de Ruffier",
      "instructions": [
        "En un espacio despejado y ventilado, prepara un cronómetro y tu libreta de educación física.",
        "Paso 1: Siéntate en calma durante 2 minutos. Mide y registra tu pulso en reposo ($P_0$) en 15 segundos y multiplica por 4.",
        "Paso 2: Realiza una rutina de calentamiento articular de cuello, hombros y caderas durante 3 minutos.",
        "Paso 3: Ejecuta 30 sentadillas rítmicas profundas o 2 minutos de salto de cuerda constante manteniendo espalda recta.",
        "Paso 4: Inmediatamente al terminar, toma tu pulso de esfuerzo máximo ($P_1$) y anótalo.",
        "Paso 5: Descansa sentado exactamente 1 minuto cronometrado y toma tu pulso de recuperación ($P_2$).",
        "Paso 6: Grafica los tres puntos en un plano cartesiano (Reposo, Esfuerzo, Recuperación) y analiza la velocidad con que tu corazón recupera la calma."
      ],
      "materials": [
        "Cronómetro (reloj o celular)",
        "Cuerda de saltar o espacio libre",
        "Cuaderno de registro fisiológico"
      ]
    },
    "applicationActivity": {
      "title": "Diseño del Protocolo Ergonómico y Ficha de Pausas Activas ALSIZ",
      "task": "Audita tu espacio de estudio digital actual en casa: mide la altura de la silla, el apoyo de los pies, la distancia a la pantalla (debe ser de 50 a 60 cm) y la iluminación. Diseña una infografía ilustrada de 4 ejercicios de estiramiento (\"Pausas Activas de 3 minutos\"): estiramiento de trapecios y cervicales, apertura pectoral contra pared, extensión de muñecas para mecanografía y flexión de isquiotibiales.",
      "deliverable": "Ficha técnica de ergonomía y rutina de pausas activas lista para pegar junto a tu escritorio de trabajo."
    },
    "formativeEvaluation": {
      "description": "Destreza en la toma autónoma del pulso cardíaco, cálculo de zonas diana y adopción consciente de pautas ergonómicas durante el estudio.",
      "expectedEvidence": "Avril localiza el pulso radial sin titubeos, calcula su zona diana con precisión aritmética e implementa la rutina de pausas activas con técnica postural impecable."
    },
    "evaluationRubric": {
      "criterion": "Monitoreo cardiovascular, esfuerzo físico y ergonomía postural (EF.4.1.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "No logra localizar el pulso cardíaco y mantiene posturas encorvadas o de riesgo durante el ejercicio y el estudio."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Toma el pulso pero comete errores en la multiplicación o conoce la zona diana pero olvida aplicar las pausas posturales."
        },
        {
          "level": "Consolidado",
          "descriptor": "Monitorea con precisión científica su frecuencia cardíaca en reposo y esfuerzo, interpreta su velocidad de recuperación, ejecuta posturas ergonómicas impecables y promueve la salud integral en su rutina."
        }
      ]
    },
    "expectedFeedback": "Energía, técnica y conciencia corporal sobresalientes, Avril. Has conectado la fisiología médica con tu rutina diaria de estudio de forma ejemplar. Cuidar tu templo físico con disciplina y movimiento es la clave para que tu mente brillante brille con toda su plenitud.",
    "difficultyAdaptation": "Guiar la localización táctil del pulso colocando los dedos índice y medio del estudiante sobre el tendón flexor radial hasta percibir la onda pulsátil.",
    "advancedExtension": "Avril calcula su Índice de Ruffier-Dickson con la fórmula médica: $I = \\frac{(P_0 + P_1 + P_2) - 200}{10}$ y clasifica su nivel de aptitud física cardiovascular de acuerdo con la tabla biomédica estándar.",
    "resources": [
      {
        "id": "class-efi-avril-01-res-1",
        "type": "simulator",
        "title": "Organización Mundial de la Salud (OMS) — Directrices sobre Actividad Física y Sedentarismo",
        "url": "https://www.who.int/es/news-room/fact-sheets/detail/physical-activity",
        "description": "Documento técnico oficial de la OMS con recomendaciones de salud cardiovascular, metabólica y postural para jóvenes de 12 a 17 años.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-efi-avril-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Fisiología del Ejercicio, Pulso y Ergonomía Digital",
        "url": "/api/v1/academic/classes/class-efi-avril-01/guide.pdf",
        "description": "Manual de entrenamiento cardiorrespiratorio, tablas de frecuencia diana por edad, cartilla de pausas activas y test de Ruffier.",
        "duration": "15 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-efi-avril-01-act-1",
        "title": "La Máquina Cardiovascular",
        "description": "Lee el texto fisiológico sobre el gasto cardíaco y reflexiona sobre el valor evolutivo del movimiento.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-efi-avril-01-act-2",
        "title": "Circuito y Curva del Pulso Cardíaco",
        "description": "Ejecuta el protocolo de medición en reposo, esfuerzo y recuperación graficando los resultados.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-efi-avril-01-act-3",
        "title": "Ficha de Ergonomía y Pausas Activas",
        "description": "Diseña la infografía con la auditoría de tu puesto de estudio y los 4 estiramientos compensatorios.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Enseña la rutina de las 4 pausas activas de estiramiento a un familiar que trabaje muchas horas sentado y háganla juntos durante 5 minutos.",
    "reflectionPrompt": "¿Cómo te sientes física y emocionalmente cuando dedicas al menos 30 minutos al día a moverte y oxigenar tu cuerpo?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_efi_avril_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-efi-avril-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-AVRIL-11-EFI",
      "subjectCode": "EFI-801",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  }
];
