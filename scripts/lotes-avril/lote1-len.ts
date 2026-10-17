import { DailyClass } from '../../src/types';

export interface AvrilCurriculumLote {
  loteId: string;
  loteNumber: number;
  subjectCode: string;
  subjectName: string;
  category: 'TRONCAL_MINEDUC' | 'FORMACION_CRISTIANA' | 'COMPLEMENTARIA_SIGLO_XXI';
  unitTitle: string;
  unitNumber: number;
  classesCount: number;
  classes: DailyClass[];
}

export const AVRIL_LOTE_01_LEN: AvrilCurriculumLote = {
  loteId: 'LOTE-AVRIL-01-LEN',
  loteNumber: 1,
  subjectCode: 'LEN-801',
  subjectName: 'Lengua y Literatura',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unidad 1: Pensamiento Crítico y Ensayo Argumentativo: La Fuerza de la Palabra',
  unitNumber: 1,
  classesCount: 4,
  classes: [
    {
      id: 'class-len-avril-01',
      subjectId: 'len-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-07',
      dayOfWeek: 'Lunes',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Pensamiento Crítico y Ensayo Argumentativo: La Fuerza de la Palabra',
      theme: 'El poder de la palabra: De la opinión subjetiva a la tesis argumentada',
      objective: 'Diferenciar entre juicios de valor u opiniones subjetivas y una tesis argumentada respaldada por premisas lógicas y evidencias verificables.',
      learningPurpose: 'Desarrollar una voz intelectual autónoma para defender ideas con rigor lógico y fundamentación científica, superando la simple emotividad o la repetición acrítica.',
      competencyDcd: 'LL.4.1.1 — Indagar y explicar los aportes de la cultura escrita al desarrollo histórico, social y cultural de la humanidad.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Lengua y Literatura EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Bienvenida al seminario socrático de Lengua y Literatura, estimada Avril! Te saluda el Prof. Gabriel Neruda. En el mundo contemporáneo estamos bombardeados por millones de opiniones en redes sociales y medios de comunicación. Muchas personas creen que opinar es sinónimo de saber; sin embargo, en el ámbito académico y ético, una opinión sin premisas ni datos empíricos es apenas un eco en el vacío. Hoy aprenderemos a transformar intuiciones en TESIS defendibles con arquitectura dialéctica.',
      reading: 'Fragmento de análisis: "El valor de la palabra razonada". Cuando Sócrates caminaba por el ágora de Atenas, no buscaba vencer a sus interlocutores con retórica ruidosa, sino examinar si sus afirmaciones resistían el peso de la contradicción. Afirmar "la tecnología aísla a los jóvenes" es un juicio de valor subjetivo. Pero sostener que "el diseño algorítmico basado en gratificación instantánea incrementa el aislamiento social al sustituir el diálogo interpersonal por interacciones dopaminérgicas cuantificadas" constituye una tesis articulada. La primera es un desahogo; la segunda es una invitación al debate científico y filosófico.',
      pedagogicalExplanation: 'Una tesis argumentativa no es un hecho evidente (como "el agua hierve a 100 °C") ni una preferencia caprichosa (como "el color azul es superior al rojo"). Una tesis es una proposición debatible sobre la cual existen posturas contrarias razonables. Para construirla se requiere: 1) Delimitar con precisión el objeto de estudio. 2) Formular una postura clara (afirmación o negación). 3) Justificar la causalidad mediante una razón rectora ("porque...", "en la medida en que...").',
      vocabulary: [
        { term: 'Tesis', definition: 'Proposición u opinión fundamentada que se defiende con argumentos en un texto académico.', childFriendlyExample: 'Tu tesis es la columna vertebral de tu ensayo que sostiene todas las demás afirmaciones.' },
        { term: 'Premisa', definition: 'Cada una de las proposiciones anteriores a la conclusión de un razonamiento lógico.', childFriendlyExample: 'Si la premisa A es que los árboles absorben CO2 y la B es que talamos bosques, la conclusión lógica es un aumento del CO2.' },
        { term: 'Dialéctica', definition: 'Método de razonamiento y confrontación de ideas opuestas para alcanzar una verdad más profunda.', childFriendlyExample: 'Contrastar tu hipótesis con la de otro investigador es un ejercicio dialéctico enriquecedor.' }
      ],
      contextualizedExample: 'En el debate ambiental sobre la protección del Parque Nacional Yasuní en Ecuador, confrontar argumentos económicos a corto plazo frente a argumentos de soberanía biológica y derechos indígenas constituye un ejercicio dialéctico de alto nivel.',
      socraticQuestions: [
        '¿Por qué una afirmación como "la lectura tradicional en papel es mejor que la digital" no califica como tesis si no especifica el ámbito cognitivo o empírico de comparación?',
        '¿En qué se distingue el deseo de tener la razón (arrogancia retórica) de la búsqueda honesta de la verdad (actitud filosófica)?',
        'Si descubrieras que una evidencia sólida refuta tu postura inicial, ¿qué decisión intelectualmente honesta tomarías?'
      ],
      practicalActivity: {
        title: 'Taller de ingeniería de proposiciones: De opinión a tesis',
        instructions: [
          'Analiza las siguientes tres afirmaciones subjetivas:',
          'a) "El cambio climático es el peor problema del mundo".',
          'b) "Los videojuegos hacen perder el tiempo a los estudiantes".',
          'c) "La inteligencia artificial va a reemplazar a los profesores".',
          'Reescribe cada una en tu cuaderno de análisis transformándolas en tesis rigurosas de nivel 8.º EGB, delimitando sujeto, verbo de acción, causalidad y campo de aplicación.'
        ],
        materials: ['Cuaderno de análisis ensayístico', 'Pluma estilográfica o bolígrafo', 'Plantilla de conectores lógicos']
      },
      applicationActivity: {
        title: 'Manifiesto inicial del proyecto trimestral',
        task: 'Formula la tesis rectora de tu ensayo para el Proyecto Interdisciplinario 1 ("Emprendimiento con Propósito / Mi Voz en la Sociedad"). Justifícala en un párrafo de 6 a 8 líneas articulando dos premisas demostrables.',
        deliverable: 'Párrafo argumentativo formal con delimitación de tesis y premisas en el portafolio digital.'
      },
      formativeEvaluation: {
        description: 'Evaluación formativa del rigor epistemológico en la formulación de tesis y distinción de falacias opinativas.',
        expectedEvidence: 'Avril redacta su tesis demostrando delimitación conceptual y coherencia interna entre causa y consecuencia.'
      },
      evaluationRubric: {
        criterion: 'Formulación de tesis argumentativas y rigor conceptual (LL.4.1.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Plantea opiniones subjetivas o afirmaciones fácticas no debatibles sin justificación causal.' },
          { level: 'En desarrollo', descriptor: 'Formula una postura clara pero su justificación presenta ambigüedad en las premisas de apoyo.' },
          { level: 'Consolidado', descriptor: 'Diseña una tesis sólida, matizada y dialécticamente defendible, explicitando premisas, alcance y relevancia social con prosa académica impecable.' }
        ]
      },
      expectedFeedback: 'Extraordinaria agudeza analítica, Avril. Supiste transformar una intuición general en una proposición de notable madurez intelectual. Tu formulación dialéctica sienta las bases de un ensayo de verdadero impacto.',
      difficultyAdaptation: 'Utilizar el esquema visual de Toulmin: "Pretensión (¿Qué afirmo?) + Evidencia (¿Qué datos tengo?) + Garantía (¿Por qué el dato justifica la afirmación?)".',
      advancedExtension: 'Avril identifica y redacta dos posibles objeciones que un contraargumentador escéptico formularía contra su tesis.',
      resources: [
        {
          id: 'class-len-avril-01-res-1',
          type: 'external_link',
          title: 'Biblioteca Virtual Miguel de Cervantes: Teoría del Ensayo',
          url: 'https://www.cervantesvirtual.com/',
          description: 'Portal académico abierto con monografías sobre la estructura del ensayo crítico y la tradición ensayística hispanoamericana.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-len-avril-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — De la Opinión a la Tesis Académica',
          url: '/api/v1/academic/classes/class-len-avril-01/guide.pdf',
          description: 'Documento metodológico con modelos de argumentación lógica y plantilla analítica para 8.° EGB Superior.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-len-avril-01-act-1',
          title: 'Deconstrucción Socrática del Texto',
          description: 'Analiza el fragmento de la lectura y explica por qué la retórica sin premisas carece de validez académica.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-len-avril-01-act-2',
          title: 'Ingeniería de Proposiciones',
          description: 'Transforma las tres opiniones informales en tesis estructuradas con justificación causal.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-len-avril-01-act-3',
          title: 'Redacción de la Tesis Rectora',
          description: 'Elabora y somete a revisión la tesis rectora de tu ensayo trimestral.',
          type: 'writing',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Identifica en el editorial de un periódico nacional (digital o impreso) la tesis central del autor y anota si está explícita o implícita.',
      reflectionPrompt: '¿En qué medida el rigor en el lenguaje refleja la claridad y honestidad de nuestro pensamiento?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_len_avril_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-len-avril-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-01-LEN', subjectCode: 'LEN-801', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-len-avril-02',
      subjectId: 'len-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-08',
      dayOfWeek: 'Martes',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Pensamiento Crítico y Ensayo Argumentativo: La Fuerza de la Palabra',
      theme: 'La anatomía del ensayo: Estructura dialéctica, contraargumentación y refutación',
      objective: 'Estructurar un texto argumentativo articulando introducción con gancho, cuerpo con argumentos de autoridad y datos, y sección de contraargumentación.',
      learningPurpose: 'Comprender que la fortaleza de una idea se mide por su capacidad para dialogar con las críticas más inteligentes y refutarlas con elegancia.',
      competencyDcd: 'LL.4.3.1 — Comparar, bajo criterios preestablecidos, las relaciones explícitas entre los contenidos de dos o más textos y contrastar sus fuentes.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Lengua y Literatura EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Continuamos con la construcción ensayística, Avril! Un error frecuente en los redactores principiantes es diseñar monólogos donde solo se aplauden sus propias ideas. Un gran ensayista, por el contrario, invita a su texto al adversario más brillante: expone la objeción contraria con total justicia (sin caricaturizarla) y luego demuestra con serenidad por qué su tesis sigue siendo superior. Esa técnica se denomina REFUTACIÓN y es la cúspide de la elegancia dialéctica.',
      reading: 'Estudio de caso: El debate sobre la educación autónoma. Consideremos dos perspectivas sobre el homeschooling y el autoaprendizaje guiado. Perspectiva A sostiene que la escuela presencial convencional es indispensable para la socialización heterogénea de los adolescentes. Perspectiva B responde que la socialización impuesta en aulas masivas genera dinámicas de conformidad social y acoso, mientras que la educación autodirigida con mentores permite socializar en entornos reales (laboratorios, clubes deportivos, voluntariado) con mayor diversidad intergeneracional. El ensayista maduro no ignora la Perspectiva A: la reconoce como válida pero introduce evidencias para demostrar que la Perspectiva B amplía las capacidades socioafectivas del joven.',
      pedagogicalExplanation: 'La estructura dialéctica de un ensayo riguroso comprende: 1) Introducción: contextualización, planteamiento del problema y tesis explícita. 2) Argumentación positiva: dos o tres argumentos sólidos sustentados en datos empíricos, razonamiento deductivo o citas de autoridad. 3) Contraargumentación y Refutación: presentación de la objeción más fuerte del oponente y su desmontaje lógico. 4) Conclusión: síntesis de lo demostrado y proyección reflexiva hacia el futuro.',
      vocabulary: [
        { term: 'Contraargumento', definition: 'Objeción o razón que se opone directamente a la tesis propuesta.', childFriendlyExample: 'Si tú argumentas que la energía solar es la mejor opción, el contraargumento señala el desafío del almacenamiento nocturno.' },
        { term: 'Refutación', definition: 'Demostración lógica de la invalidez, debilidad o insuficiencia de un contraargumento.', childFriendlyExample: 'Refutas la objeción de la energía solar demostrando los avances en baterías de grafeno.' },
        { term: 'Argumento de autoridad', definition: 'Razonamiento sustentado en el testimonio o investigación de un experto reconocido en la materia.', childFriendlyExample: 'Citar un informe de la OMS o un teorema de Euler es emplear un argumento de autoridad.' }
      ],
      contextualizedExample: 'En la historia del pensamiento ecuatoriano, Juan Montalvo en sus "Siete Tratados" utilizó la contraargumentación sistemática para desmontar las justificaciones del autoritarismo político en el siglo XIX.',
      socraticQuestions: [
        '¿Por qué debilitar o ridiculizar el argumento del oponente (falacia del hombre de paja) en lugar de abordarlo con toda su fuerza demuestra debilidad intelectual?',
        '¿Cómo ayuda el conector de concesión "Si bien es cierto que... no obstante..." a construir una refutación elegante?',
        '¿Qué diferencia existe entre un argumento sustentado en estadísticas rigurosas y una anécdota personal aislada?'
      ],
      practicalActivity: {
        title: 'El ring dialéctico: Elaboración de argumentos y contraargumentos',
        instructions: [
          'Toma la tesis formulada en la sesión anterior.',
          'Escribe en la columna izquierda dos argumentos sólidos (uno de causa-efecto y otro de autoridad/datos).',
          'Escribe en la columna derecha el contraargumento más agudo que un opositor formularía.',
          'Redacta abajo un párrafo de refutación de 5 líneas iniciando con un conector concesivo ("A pesar de que los críticos sostienen... es menester señalar que...").'
        ],
        materials: ['Tabla de balance dialéctico en libreta', 'Pluma y resaltadores de dos colores']
      },
      applicationActivity: {
        title: 'Esquema arquitectónico del ensayo',
        task: 'Elabora el mapa conceptual o esquema jerárquico de tu ensayo completo en 4 bloques: 1) Introducción y Tesis, 2) Argumento 1 y Argumento 2, 3) Contraargumento y Refutación, 4) Conclusión.',
        deliverable: 'Esquema jerárquico detallado en formato digital o cuaderno de trabajo.'
      },
      formativeEvaluation: {
        description: 'Capacidad de estructurar un discurso polifónico integrando objeciones reales sin incurrir en falacias lógicas.',
        expectedEvidence: 'Avril articula una contraargumentación seria y redacta una refutación fundamentada en evidencias concretas.'
      },
      evaluationRubric: {
        criterion: 'Estructuración dialéctica y refutación en textos ensayísticos (LL.4.3.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Presenta solo argumentos a favor y evade considerar posturas contrarias.' },
          { level: 'En desarrollo', descriptor: 'Menciona objeciones contrarias pero su refutación es endeble o se limita a reiterar la tesis inicial.' },
          { level: 'Consolidado', descriptor: 'Integra con maestría contraargumentos de peso y los refuta con rigor lógico y evidencias robustas, elevando la calidad académica del texto.' }
        ]
      },
      expectedFeedback: 'Brillante desenvolvimiento argumentativo, Avril. La sutileza con la que concediste el punto inicial para luego refutarlo con datos certeros demuestra un dominio retórico muy superior al promedio de tu nivel.',
      difficultyAdaptation: 'Proporcionar una plantilla de oraciones con conectores concesivos y adversativos ("Ciertamente...", "Sin embargo...", "Las investigaciones demuestran que...").',
      advancedExtension: 'Avril investiga el concepto de "Principio de Caridad Hermenéutica" formulado por Donald Davidson y explica por qué exige interpretar la postura contraria en su versión más fuerte posible.',
      resources: [
        {
          id: 'class-len-avril-02-res-1',
          type: 'external_link',
          title: 'Dialnet: Artículos Abiertos de Lingüística y Retórica Ensayística',
          url: 'https://dialnet.unirioja.es/',
          description: 'Hemeroteca científica multidisciplinar en español con ensayos metodológicos sobre retórica y dialéctica argumentativa.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-len-avril-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Estructura Dialéctica y Refutación',
          url: '/api/v1/academic/classes/class-len-avril-02/guide.pdf',
          description: 'Manual de conectores discursivos, matrices de contraargumentación y modelos de refutación para 8.° EGB.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-len-avril-02-act-1',
          title: 'Análisis del Debate Educativo',
          description: 'Identifica la tesis, el argumento central y la objeción en el texto de estudio de caso.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-len-avril-02-act-2',
          title: 'Construcción de la Matriz Dialéctica',
          description: 'Completa la tabla comparando tus dos argumentos con la objeción contraria más sólida.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-len-avril-02-act-3',
          title: 'Esquema Jerárquico del Ensayo',
          description: 'Diseña la estructura completa de 4 bloques que guiará la redacción final de tu ensayo.',
          type: 'writing',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Busca una entrevista televisiva o podcast de debate e identifica si el expositor respondió a la pregunta con refutación o con evasiva.',
      reflectionPrompt: '¿Por qué escuchar con genuino respeto las razones de quien opina distinto es indispensable para una sociedad libre?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_len_avril_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-len-avril-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-01-LEN', subjectCode: 'LEN-801', unitNumber: 1, sessionNumber: 2 }
    },
    {
      id: 'class-len-avril-03',
      subjectId: 'len-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-09',
      dayOfWeek: 'Miércoles',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Pensamiento Crítico y Ensayo Argumentativo: La Fuerza de la Palabra',
      theme: 'Cazadores de falacias: Identificación de sesgos y razonamientos engañosos en los medios',
      objective: 'Reconocer y desmontar falacias lógicas formales e informales comunes (ad hominem, hombre de paja, falsa dicotomía, apelación a la popularidad) en discursos públicos y textos persuasivos.',
      learningPurpose: 'Desarrollar un filtro crítico impenetrable para no ser manipulada por propaganda, noticias falsas o discursos emocionales engañosos.',
      competencyDcd: 'LL.4.2.1 — Utilizar recursos de la comunicación oral en contextos de intercambio social, construcción de acuerdos y resolución de problemas.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Lengua y Literatura EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Atenta, detective de la verdad Avril! Hoy nos adentraremos en el laboratorio de las trampas del pensamiento: las FALACIAS. Una falacia es un argumento que parece válido y convincente a primera vista, pero que contiene un error de razonamiento que anula su conclusión. En los discursos electorales, en la publicidad engañosa y en las polémicas cotidianas abundan las falacias diseñadas deliberadamente para manipular emociones. Hoy aprenderemos a desactivarlas como verdaderas científicas del lenguaje.',
      reading: 'Inventario de trampas lógicas: 1) Falacia Ad Hominem (ataque a la persona): en lugar de refutar la idea, se descalifica a quien la dice ("No le creas a ese científico sobre el cambio climático porque es antipático y joven"). 2) Falacia del Hombre de Paja: se exagera o deforma la postura del adversario ("Los que apoyan el reciclaje quieren que volvamos a vivir en cavernas sin tecnología"). 3) Falsa Dicotomía: se reducen las opciones a dos extremos falsos ("O apoyas este proyecto de ley sin cambiarle una coma o estás en contra del progreso del país"). 4) Falacia Ad Populum (apelación a la masa): asumir que algo es verdad porque la mayoría lo cree ("Todos compran esta bebida azucarada, por lo tanto debe ser sana").',
      pedagogicalExplanation: 'La lógica nos enseña que la verdad de una conclusión no depende del prestigio, de la popularidad ni del tono agresivo de quien la pronuncia, sino de la validez formal del razonamiento y de la veracidad fáctica de sus premisas. Desmontar una falacia requiere: 1) Nombrar el tipo de falacia. 2) Señalar el salto ilegítimo entre la premisa y la conclusión. 3) Exigir el dato o premisa faltante.',
      vocabulary: [
        { term: 'Falacia', definition: 'Argumento inválido o engañoso con apariencia de razonamiento correcto.', childFriendlyExample: 'Decir que los gatos negros dan mala suerte es una falacia de causa falsa.' },
        { term: 'Sesgo cognitivo', definition: 'Inclinación sistemática e involuntaria de la mente que distorsiona el juicio o la percepción de la realidad.', childFriendlyExample: 'El sesgo de confirmación nos hace buscar solo las noticias que nos dan la razón.' },
        { term: 'Validez lógica', definition: 'Propiedad de un argumento en el que la conclusión se deriva necesariamente de sus premisas.', childFriendlyExample: 'Si las premisas son verdaderas y la estructura es válida, la conclusión es ineludible.' }
      ],
      contextualizedExample: 'En la publicidad comercial en Ecuador, cuando se anuncia un producto afirmando que "9 de cada 10 ecuatorianos lo prefieren" sin citar la muestra estadística representativa, se recurre a la falacia ad populum.',
      socraticQuestions: [
        '¿Por qué descalificar la edad o el aspecto físico de un orador en un debate es una admisión tácita de que no se tienen argumentos racionales para refutar su tesis?',
        '¿Cómo podemos detectar en nuestro propio pensamiento cuando estamos utilizando una falacia para defendernos en una discusión?',
        '¿Qué relación existe entre la verdad y la popularidad: puede una idea ser completamente falsa aunque millones de personas la repitan?'
      ],
      practicalActivity: {
        title: 'El quirófano de falacias: Disección de casos reales',
        instructions: [
          'Lee los 4 fragmentos de declaraciones periodísticas y publicitarias proporcionados en la guía de trabajo.',
          'Identifica qué falacia específica contiene cada fragmento.',
          'Escribe en dos líneas la refutación analítica precisa que desmonte el engaño lógico sin atacar al emisor.'
        ],
        materials: ['Guía de ejercicios con fragmentos periodísticos', 'Lápiz y marcador verde de verificación']
      },
      applicationActivity: {
        title: 'Guía de autoevaluación para el propio ensayo',
        task: 'Revisa minuciosamente los argumentos redactados para tu ensayo trimestral. Aplica el "Test Anti-Falacias": verifica que ninguna premisa sea un ataque personal, una generalización apresurada o una falsa dicotomía.',
        deliverable: 'Checklist anti-falacias completada y firmada con notas de corrección sobre el propio borrador.'
      },
      formativeEvaluation: {
        description: 'Capacidad de identificar errores de razonamiento en discursos orales y escritos y de autodepurar los propios textos.',
        expectedEvidence: 'Avril clasifica correctamente las 4 falacias y argumenta con claridad por qué la conclusión no se sostiene.'
      },
      evaluationRubric: {
        criterion: 'Detección de falacias y aplicación de lógica crítica (LL.4.2.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Confunde un argumento falso con una opinión que no comparte y no identifica la estructura de la falacia.' },
          { level: 'En desarrollo', descriptor: 'Reconoce falacias evidentes como el ataque personal pero le cuesta identificar la falsa dicotomía o la apelación a la masa.' },
          { level: 'Consolidado', descriptor: 'Desmonta con precisión quirúrgica falacias complejas, explica el salto lógico inválido y blinda su propio discurso contra errores argumentativos.' }
        ]
      },
      expectedFeedback: 'Extraordinario entrenamiento analítico, Avril. Has afinado tu criterio crítico de manera admirable. Desmontar falacias con tanta serenidad y precisión te convierte en una ciudadana consciente y difícil de engañar.',
      difficultyAdaptation: 'Utilizar tarjetas ilustradas donde cada falacia está personificada por un personaje cómico (ej: "Señor Hombre de Paja", "General Dicotomía").',
      advancedExtension: 'Avril investiga la falacia de "Post hoc ergo propter hoc" (correlación no implica causalidad) y formula un ejemplo aplicado a la medicina o la economía.',
      resources: [
        {
          id: 'class-len-avril-03-res-1',
          type: 'external_link',
          title: 'Proyecto Gutenberg: Obras Clásicas de Lógica y Retórica',
          url: 'https://www.gutenberg.org/',
          description: 'Biblioteca digital abierta con tratados de dialéctica, filosofía y razonamiento crítico de dominio público.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-len-avril-03-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Cazadores de Falacias y Trampas Lógicas',
          url: '/api/v1/academic/classes/class-len-avril-03/guide.pdf',
          description: 'Catálogo clasificado de 12 falacias formales e informales con ejercicios de disección crítica para 8.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-len-avril-03-act-1',
          title: 'Disección del Catálogo de Falacias',
          description: 'Analiza los 4 tipos de falacias estudiadas y formula un contraejemplo cotidiano de cada una.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-len-avril-03-act-2',
          title: 'Quirófano de Casos Reales',
          description: 'Desmonta los 4 fragmentos periodísticos identificando el salto ilegítimo de razonamiento.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-len-avril-03-act-3',
          title: 'Test Anti-Falacias del Borrador',
          description: 'Audita y depura los argumentos de tu propio ensayo garantizando su validez formal.',
          type: 'writing',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Identifica en un anuncio publicitario de televisión o internet una falacia (ej: ad verecundiam o ad populum) y explica cómo manipula al consumidor.',
      reflectionPrompt: '¿Qué responsabilidad ética tenemos al hablar para no engañar a los demás con argumentos falaces?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_len_avril_03.pdf',
      guideUrl: '/api/v1/academic/classes/class-len-avril-03/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-01-LEN', subjectCode: 'LEN-801', unitNumber: 1, sessionNumber: 3 }
    },
    {
      id: 'class-len-avril-04',
      subjectId: 'len-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-10',
      dayOfWeek: 'Jueves',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Pensamiento Crítico y Ensayo Argumentativo: La Fuerza de la Palabra',
      theme: 'Taller de redacción argumentativa: Voz crítica, conectores lógicos y estilo ensayístico',
      objective: 'Redactar un ensayo argumentativo breve (500-600 palabras) integrando introducción con tesis, cuerpo con argumentos respaldados en citas APA, refutación y conclusión con proyección social.',
      learningPurpose: 'Consolidar las habilidades de las sesiones 1 a 3 para producir un texto académico formal que comunique ideas con elegancia estética y contundencia lógica.',
      competencyDcd: 'LL.4.4.1 — Escribir ensayos argumentativos con un manejo de su estructura básica, utilizando citas y referencias bibliográficas para sustentar las ideas con honestidad académica.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Lengua y Literatura EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡El gran día de la creación ensayística ha llegado, Avril! Durante las tres sesiones previas aprendiste a diferenciar opiniones de tesis, diseñaste una estructura dialéctica con refutación y blindaste tu pensamiento contra falacias. Hoy encenderemos la pluma del escritor: redactarás el primer borrador completo de tu ensayo argumentativo. Recuerda las palabras de Alfonso Reyes: "El ensayo es el centauro de los géneros: mitad ciencia por su rigor lógico, mitad poesía por la belleza de su lenguaje". ¡A escribir con pasión y precisión!',
      reading: 'Manifiesto del joven ensayista: Escribir un ensayo no es transcribir lo que otros dijeron, sino asumir la responsabilidad de tu propia perspectiva. Cada párrafo debe cumplir una función específica en la sinfonía del texto. La introducción atrapa al lector con una paradoja o interrogante que culmina en tu tesis. Los párrafos del cuerpo desarrollan tus argumentos mediante la regla de las 3 C: Coherencia conceptual, Cohesión discursiva (usando conectores precisos como "por consiguiente", "en contraste", "asimismo") y Claridad expositiva. Las citas de autores van entre comillas con su fuente, demostrando respeto por la honestidad intelectual y la propiedad académica.',
      pedagogicalExplanation: 'La redacción académica en 8.º EGB exige: 1) Registro lingüístico formal: evitar coloquialismos o frases vagas ("es algo bueno"). 2) Variedad sintáctica: combinar oraciones simples y complejas subordinadas. 3) Citación de fuentes: atribuir las ideas a sus autores originales mediante normas estandarizadas sencillas (Autor, año). 4) Cierre con impacto: la conclusión no repite mecánicamente la tesis, sino que abre una reflexión de largo alcance ético.',
      vocabulary: [
        { term: 'Cohesión textual', definition: 'La propiedad que permite que las oraciones y párrafos se conecten de manera fluida y lógica mediante nexos y conectores.', childFriendlyExample: 'Los conectores discursivos son los puentes que unen tus ideas sin tropiezos.' },
        { term: 'Registro formal', definition: 'El uso del lenguaje adecuado para situaciones académicas, profesionales o institucionales.', childFriendlyExample: 'En un ensayo escribimos "incrementó notablemente" en vez de "subió full".' },
        { term: 'Honestidad académica', definition: 'El principio ético de dar crédito a las fuentes originales y evitar el plagio.', childFriendlyExample: 'Citar al autor entre comillas honra su trabajo y fortalece tu propio argumento.' }
      ],
      contextualizedExample: 'Cuando ensayistas ecuatorianas contemporáneas escriben sobre la conservación de la biodiversidad o la equidad educativa, combinan datos del INEC y del Ministerio del Ambiente con una narrativa envolvente.',
      socraticQuestions: [
        '¿Por qué el plagio o copiar sin citar destruye la credibilidad de un investigador incluso cuando sus ideas parezcan brillantes?',
        '¿Cómo logras que un ensayo sea formal y riguroso sin volverse aburrido o incomprensible?',
        'Si un lector llega a la última línea de tu ensayo, ¿qué emoción o pensamiento transformador te gustaría que se lleve en la mente?'
      ],
      practicalActivity: {
        title: 'El laboratorio de redacción en tres tiempos',
        instructions: [
          'Tiempo 1 (Introducción - 20 min): Redacta el párrafo de apertura con un gancho provocativo, la contextualización del problema y tu tesis rectora destacada.',
          'Tiempo 2 (Cuerpo argumentativo y refutación - 40 min): Desarrolla dos párrafos de argumentos fundamentados y un párrafo de contraargumentación con refutación.',
          'Tiempo 3 (Conclusión y pulido de estilo - 30 min): Escribe el párrafo de cierre y aplica una revisión estilística sustituyendo palabras comodín (cosa, algo, hacer) por verbos y sustantivos precisos.'
        ],
        materials: ['Procesador de textos o libreta de redacción', 'Guía de estilo ensayístico ALSIZ', 'Diccionario de sinónimos']
      },
      applicationActivity: {
        title: 'Publicación del ensayo en el portafolio trimestral',
        task: 'Completa la versión preliminar de tu ensayo de 500 palabras, asigna un título creativo y sugerente, e intégralo en el portafolio digital de la plataforma ALSIZ para la valoración formativa interdisciplinaria.',
        deliverable: 'Ensayo argumentativo completo de 4 o 5 párrafos con título propio y aparato crítico en el portafolio.'
      },
      formativeEvaluation: {
        description: 'Evaluación formativa integradora de la competencia escrita: coherencia, cohesión, fundamentación lógica y honestidad académica.',
        expectedEvidence: 'Avril entrega su ensayo estructurado con tesis explícita, argumentos fundamentados, refutación elegante y vocabulario formal adecuado.'
      },
      evaluationRubric: {
        criterion: 'Producción de ensayos argumentativos formales con citas y refutación (LL.4.4.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Redacta párrafos desarticulados con predominio de opinión informal y sin estructura ensayística identificable.' },
          { level: 'En desarrollo', descriptor: 'Respeta la estructura básica de introducción, desarrollo y conclusión, pero carece de refutación o presenta errores de cohesión.' },
          { level: 'Consolidado', descriptor: 'Produce un ensayo brillante, dialécticamente impecable, con prosa elegante, cohesión perfecta, citas académicas pertinentes y una conclusión de hondo calado reflexivo.' }
        ]
      },
      expectedFeedback: 'Una obra de madurez excepcional, Avril. Tu ensayo no solo demuestra rigor lógico y solidez conceptual, sino una voz estilística auténtica, sensible y poderosa. Has culminado el primer lote de Lengua y Literatura con la distinción de una verdadera ensayista.',
      difficultyAdaptation: 'Permitir una estructura guiada párrafo a párrafo: Párrafo 1 (Tesis), Párrafo 2 (Argumento 1 + dato), Párrafo 3 (Contraargumento + Refutación), Párrafo 4 (Cierre).',
      advancedExtension: 'Avril prepara una versión sintetizada de su ensayo en formato de "Discurso TED" de 2 minutos para presentarlo oralmente en el aula socrática.',
      resources: [
        {
          id: 'class-len-avril-04-res-1',
          type: 'external_link',
          title: 'Google Académico / Google Books: Búsqueda de Fuentes Primarias',
          url: 'https://scholar.google.es/',
          description: 'Motor de búsqueda abierto de literatura científica, artículos revisados por pares y libros académicos para fundamentación de citas.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-len-avril-04-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Redacción Ensayística y Normas de Citación',
          url: '/api/v1/academic/classes/class-len-avril-04/guide.pdf',
          description: 'Manual de estilo editorial con rúbrica analítica y pautas de honestidad académica para 8.° EGB.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-len-avril-04-act-1',
          title: 'Manifiesto del Ensayista',
          description: 'Reflexiona sobre la regla de las 3 C y la importancia de la honestidad intelectual.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-len-avril-04-act-2',
          title: 'Taller de Redacción en Tres Tiempos',
          description: 'Redacta los 4 párrafos del ensayo aplicando variedad sintáctica y conectores precisos.',
          type: 'writing',
          points: 15,
          completed: false
        },
        {
          id: 'class-len-avril-04-act-3',
          title: 'Entrega y Pulido del Borrador Final',
          description: 'Somete el ensayo al portafolio digital con título creativo y formato editorial formal.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Lee tu ensayo en voz alta frente a tus padres o mentor y pregúntales qué argumento les resultó más persuasivo.',
      reflectionPrompt: '¿Qué poder sientes que tiene tu voz cuando escribes con argumentos verdaderos y fundamentados?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_len_avril_04.pdf',
      guideUrl: '/api/v1/academic/classes/class-len-avril-04/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-01-LEN', subjectCode: 'LEN-801', unitNumber: 1, sessionNumber: 4 }
    }
  ]
};

