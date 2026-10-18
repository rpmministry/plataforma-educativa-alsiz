import { AvrilCurriculumLote } from './lote1-len';

export const AVRIL_LOTE_04_SOC: AvrilCurriculumLote = {
  loteId: 'LOTE-AVRIL-04-SOC',
  loteNumber: 4,
  subjectCode: 'SOC-801',
  subjectName: 'Estudios Sociales',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unidad 1: Raíces Históricas del Ecuador: Del Poblamiento al Periodo Formativo',
  unitNumber: 1,
  classesCount: 2,
  classes: [
    {
      id: 'class-soc-avril-01',
      subjectId: 'soc-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-08',
      dayOfWeek: 'Martes',
      scheduleTime: '10:00 - 10:45 (45 min)',
      unit: 'Unidad 1: Raíces Históricas del Ecuador: Del Poblamiento al Periodo Formativo',
      theme: 'El poblamiento de América y los cazadores-recolectores del Ecuador precerámico (El Inga, Chobshi, Las Vegas)',
      objective: 'Analizar las teorías científicas sobre el poblamiento del continente americano y examinar la forma de vida, tecnología lítica y adaptación ecológica de las primeras bandas recolectoras en el actual territorio ecuatoriano.',
      learningPurpose: 'Desarrollar una conciencia histórica crítica fundamentada en la evidencia arqueológica, reconociendo el ingenio humano ancestral frente a las inclemencias climáticas del pleistoceno tardío.',
      competencyDcd: 'CS.4.1.1 — Reconocer el estudio de la Historia como conocimiento esencial para entender nuestro pasado y nuestra identidad y para comprender cómo influyen en el mundo en que vivimos.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Ciencias Sociales EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Bienvenida a tu cátedra de Estudios Sociales, querida Avril! Te saluda la Dra. Valentina Chronos. La historia no es un catálogo empolvado de fechas muertas y nombres de batallas; es el espejo viviente donde descubrimos quiénes somos. Hace más de 12.000 años, pequeños grupos de seres humanos cruzaron estepas heladas siguiendo manadas de mastodontes y ciervos gigantes. Cuando esos pioneros llegaron a los valles andinos y a las costas del Pacífico ecuatoriano, no encontraron ciudades ni carreteras, sino una selva virgen y páramos desafiantes. Con piedra de obsidiana, hueso y madera tallaron su supervivencia. ¡Hoy descubriremos las huellas de los primeros habitantes de nuestra tierra!',
      reading: 'El misterio de los amantes de Sumpa en la península de Santa Elena: En el sitio arqueológico de Las Vegas, en la costa ecuatoriana, los arqueólogos dirigidos por la Dra. Karen Stothert desenterraron más de 190 esqueletos humanos que datan de hace 10.000 a 6.000 años antes del presente. Uno de los hallazgos más conmovedores del mundo prehistórico fue el entierro de "Los Amantes de Sumpa": un hombre de aproximadamente 25 años y una mujer de unos 20 años, sepultados juntos en un abrazo eterno, cubiertos con piedras grandes de caliza y colocados con infinita ternura fúnebre. Este vestigio demostró que aquellos antiguos habitantes no solo eran hábiles cazadores y recolectores de conchas y frutos, sino que poseían un complejo universo espiritual, rituales funerarios profundos y lazos afectivos inquebrantables.',
      pedagogicalExplanation: 'El estudio del poblamiento americano confronta la teoría clásica del estrecho de Bering (Alex Hrdlicka: migración asiática por el puente terrestre de Beringia durante la última glaciación) con teorías complementarias de navegación costera del Pacífico (Ruta de las Algas) y migraciones transoceánicas desde Melanesia/Polinesia (Paul Rivet). En el Ecuador, el período Precerámico o Paleoindio (12.000 a.C. - 3.900 a.C.) está representado por tres yacimientos fundamentales: 1) El Inga (Pichincha, faldas del Ilaló): campamento taller donde se descubrieron puntas de proyectil "cola de pescado" talladas en obsidiana volcánica y basalto. 2) Cueva Negra de Chobshi (Azuay): refugio rocoso de cazadores de cérvidos y conejos con instrumentos de sílex y hueso. 3) Las Vegas (Santa Elena): cazadores-recolectores marinos que desarrollaron las primeras evidencias de protocultivo de calabazas y zapallos.',
      vocabulary: [
        { term: 'Paleoindio / Precerámico', definition: 'Etapa histórica más antigua de la ocupación humana en América, caracterizada por bandas nómadas de cazadores-recolectores que no producían alfarería.', childFriendlyExample: 'El período precerámico es cuando los seres humanos utilizaban recipientes de calabaza o corteza antes de inventar las ollas de barro cocido.' },
        { term: 'Tecnología lítica', definition: 'Conjunto de técnicas ancestrales para transformar la piedra (mediante percusión y presión) en herramientas de corte, raspado y caza.', childFriendlyExample: 'Tallar una punta de flecha en obsidiana negra afilada es un ejemplo supremo de tecnología lítica.' },
        { term: 'Nómada estacional', definition: 'Modo de vida en el cual los grupos humanos se desplazan periódicamente siguiendo las rutas de migración de animales y la maduración de frutos silvestres.', childFriendlyExample: 'Las bandas de El Inga subían al páramo en época de venados y bajaban al valle en época de frutas.' }
      ],
      contextualizedExample: 'La obsidiana utilizada en El Inga provenía de los flujos de lava del volcán Mullumica en la cordillera Oriental, lo que demuestra que hace 10.000 años ya existían rutas de intercambio y expediciones especializadas a más de 4.000 metros de altitud.',
      socraticQuestions: [
        '¿Por qué el hallazgo de "Los Amantes de Sumpa" refuta la vieja idea decimonónica de que los pueblos prehistóricos eran "salvajes sin sentimientos ni cultura"?',
        '¿Qué propiedades físicas hacían de la obsidiana volcánica un material superior al hueso o la madera para la confección de cuchillos y puntas de flecha?',
        'Si el clima de la Tierra cambió drásticamente al finalizar la última Era de Hielo hace 11.000 años, ¿cómo obligó eso a los humanos a transformar sus estrategias de caza y recolección?'
      ],
      practicalActivity: {
        title: 'Cartografía arqueológica y línea de tiempo del Ecuador Precerámico',
        instructions: [
          'En un mapa mudo del Ecuador a escala, ubica con precisión geográfica los tres sitios arqueológicos primordiales: El Inga (Pichincha), Chobshi (Azuay) y Las Vegas (Santa Elena).',
          'Dibuja un icono representativo al lado de cada sitio: punta cola de pescado en El Inga, cueva con fogata en Chobshi, y conchas marinas con calabaza en Las Vegas.',
          'Traza las posibles rutas migratorias andinas y marítimas.',
          'Construye una línea de tiempo horizontal señalando el año estimado de ocupación y los artefactos hallados en cada yacimiento.'
        ],
        materials: ['Mapa físico del Ecuador impreso o dibujado', 'Regla milimetrada', 'Lápices de colores y rotulador microfino']
      },
      applicationActivity: {
        title: 'El diario de campo de un arqueólogo en Las Vegas',
        task: 'Redacta una crónica de simulación histórica en primera persona (1 página): Eres una joven arqueóloga que excava en la península de Santa Elena en 1970 y descubre un artefacto precerámico inesperado (una azuela de caracol marino o un grano de polen fósil de calabaza). Describe el hallazgo, cómo utilizas el método estratigráfico para fecharlo y qué conclusiones extraes sobre la dieta y vida cotidiana de aquel pueblo.',
        deliverable: 'Crónica arqueológica ilustrada en el portafolio de Ciencias Sociales con vocabulario técnico preciso.'
      },
      formativeEvaluation: {
        description: 'Comprensión de las rutas de poblamiento, caracterización de los yacimientos precerámicos del Ecuador y valoración de la evidencia arqueológica.',
        expectedEvidence: 'Avril explica las teorías migratorias con respaldo geográfico y contrasta las adaptaciones ecológicas de la Sierra (El Inga/Chobshi) frente a la Costa (Las Vegas).'
      },
      evaluationRubric: {
        criterion: 'Análisis de los procesos de poblamiento y cazadores precerámicos en el Ecuador (CS.4.1.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Enumera nombres de sitios sin ubicarlos geográficamente ni comprender el significado del período precerámico.' },
          { level: 'En desarrollo', descriptor: 'Describe las características de los yacimientos pero le cuesta vincular el cambio climático con la transición tecnológica.' },
          { level: 'Consolidado', descriptor: 'Analiza críticamente las teorías migratorias, ubica cartográficamente los yacimientos ecuatorianos con precisión y argumenta la complejidad social temprana a partir de evidencias materiales.' }
        ]
      },
      expectedFeedback: 'Extraordinaria recreación histórica y análisis arqueológico, Avril. Has articulado las evidencias líticas de El Inga con la sensibilidad humana de Las Vegas de forma conmovedora. Demuestras una comprensión histórica viva y rigurosa.',
      difficultyAdaptation: 'Proveer un mapa interactivo con pines de colores preubicados y fichas de asociación de artefactos (punta lítica, concha, arpón).',
      advancedExtension: 'Avril investiga la polémica científica de Monte Verde (Chile) y cómo sus dataciones de más de 14.500 años obligaron a revisar el paradigma "Clovis First" en toda la academia internacional.',
      resources: [
        {
          id: 'class-soc-avril-01-res-1',
          type: 'simulator',
          title: 'Instituto Nacional de Patrimonio Cultural (INPC) — Atlas Arqueológico del Ecuador',
          url: 'https://www.patrimoniocultural.gob.ec/',
          description: 'Portal oficial del INPC con catálogos de piezas líticas, mapas de yacimientos precerámicos y fotografías de excavaciones.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-soc-avril-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Poblamiento Americano y Precerámico Ecuatoriano',
          url: '/api/v1/academic/classes/class-soc-avril-01/guide.pdf',
          description: 'Ficha de trabajo con mapas mudos, infografías de puntas de obsidiana y desafíos socráticos de cronología histórica.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-soc-avril-01-act-1',
          title: 'El Abrazo de Sumpa',
          description: 'Analiza el entierro ceremonial de Las Vegas y reflexiona sobre la dimensión espiritual de los primeros habitantes.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-soc-avril-01-act-2',
          title: 'Cartografía de los Sitios Precerámicos',
          description: 'Traza en el mapa del Ecuador los yacimientos de El Inga, Chobshi y Las Vegas con sus respectivos vestigios.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-soc-avril-01-act-3',
          title: 'Diario de Campo Arqueológico',
          description: 'Redacta la crónica simulada del descubrimiento de un vestigio prehistórico aplicando el método estratigráfico.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Investiga con tu familia qué montañas, volcanes o ríos cercanos a tu localidad fueron habitados por pueblos ancestrales y anota un dato interesante en tu cuaderno.',
      reflectionPrompt: '¿Qué significa saber que bajo el suelo donde caminamos hoy laten más de diez milenios de historias humanas?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_soc_avril_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-soc-avril-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-04-SOC', subjectCode: 'SOC-801', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-soc-avril-02',
      subjectId: 'soc-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-11',
      dayOfWeek: 'Viernes',
      scheduleTime: '10:00 - 10:45 (45 min)',
      unit: 'Unidad 1: Raíces Históricas del Ecuador: Del Poblamiento al Periodo Formativo',
      theme: 'La revolución agrícola y la cultura Valdivia: Primeras sociedades aldeanas, domesticación de plantas y alfarería',
      objective: 'Explicar la transición del nomadismo al sedentarismo agrícola en el Período Formativo Temprano, caracterizando la innovación alfarera, el rol protagónico de la mujer y la cosmovisión de la Cultura Valdivia (4000 a.C. - 1500 a.C.).',
      learningPurpose: 'Comprender que la domesticación de semillas y la invención de la cerámica transformaron radicalmente la estructura social, dando origen a las primeras aldeas complejas y a un arte simbólico de trascendencia mundial.',
      competencyDcd: 'CS.4.1.2 — Describir el surgimiento de la agricultura en América y su impacto en la complejización de las sociedades humanas, reconociendo la cultura Valdivia y el rol femenino en la alfarería y la organización social.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Ciencias Sociales EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Feliz viernes de investigación histórica, Avril! Te saluda nuevamente la Dra. Valentina Chronos. Imagina un invento tan revolucionario que cambió para siempre el destino de la humanidad, más trascendental incluso que la invención de la rueda o de la imprenta. Ese invento fue la AGRICULTURA: la paciencia y el conocimiento botánico para sembrar una semilla en la tierra fértil, regarla y esperar su fruto. Con la agricultura nació el hogar permanente, el almacenamiento de alimentos y la necesidad de fabricar recipientes herméticos de barro cocido. En la costa de lo que hoy es Santa Elena y Manabí floreció hace 6.000 años la CULTURA VALDIVIA, una de las civilizaciones alfareras más antiguas de todo el continente americano. ¡Acompáñame a explorar su fascinante aldea de Real Alto!',
      reading: 'Las Venus de Valdivia y el enigma de Real Alto: En 1956, el célebre arqueólogo guayaquileño Emilio Estrada Ycaza descubrió restos cerámicos de una antigüedad pasmosa en la costa ecuatoriana. En el sitio de Real Alto, los arqueólogos revelaron una aldea planificada en forma de herradura, con más de 100 viviendas comunales alrededor de una plaza central ceremonial. Pero el hallazgo que cautivó al mundo fueron las "Venus de Valdivia": estatuillas de arcilla cocida que representan figuras femeninas con peinados monumentales, vientres grávidos y posturas de autoridad y fertilidad. Al principio se tallaban en piedra blanda, pero luego las mujeres alfareras dominaron la técnica del modelado en arcilla y la cocción en hornos abiertos, decorándolas con engobe rojo pulido. Aquellas estatuillas no eran juguetes; eran amuletos sagrados vinculados a la fertilidad de la tierra (la Pachamama), al ciclo menstrual, a la lluvia y a una estructura social matrilineal donde la mujer era el eje de la vida comunitaria.',
      pedagogicalExplanation: 'El Período Formativo ecuatoriano (4.000 a.C. - 500 a.C.) marca la superación del modo de vida nómada gracias a tres pilares interdependientes: 1) La domesticación del maíz (Zea mays), frijol, yuca, algodón y zapallo, que permitió generar excedentes alimentarios y sostener poblaciones sedentarias densas. 2) La invención de la alfarería cerámica: vasijas para cocinar granos duros, ollas de almacenamiento impermeables y cuencos rituales decorados con incisiones y pintura iridiscente. 3) La complejización sociopolítica: división del trabajo entre agricultores, alfareros, tejedores y chamanes, y surgimiento de centros ceremoniales ceremoniales como Real Alto, donde se administraba el intercambio de la codiciada concha sagrada Spondylus princeps ("el alimento de los dioses").',
      vocabulary: [
        { term: 'Período Formativo', definition: 'Etapa histórica caracterizada por el surgimiento de aldeas sedentarias permanentes, agricultura intensiva y producción de cerámica alfarera.', childFriendlyExample: 'Durante el formativo, la cultura Valdivia inventó las primeras ollas de barro cocido del Ecuador.' },
        { term: 'Matrilineal', definition: 'Sistema de organización social y de parentesco en el cual la herencia de bienes, tierras y linaje se transmite a través de la línea materna.', childFriendlyExample: 'En una sociedad matrilineal, la casa y los campos pertenecen a las madres e hijas.' },
        { term: 'Spondylus princeps', definition: 'Molusco bivalvo de color rojo espinoso originario de las aguas cálidas del Pacífico ecuatoriano, utilizado como moneda sagrada e indicador astronómico del fenómeno de El Niño.', childFriendlyExample: 'La concha Spondylus era el tesoro más codiciado de los Andes, equivalente al oro o las esmeraldas.' }
      ],
      contextualizedExample: 'Las investigaciones en Real Alto demostraron que la plaza central de Valdivia estaba orientada astronómicamente hacia los solsticios, permitiendo a los agricultores ancestrales anticipar las épocas de lluvia y siembra con extraordinaria precisión calendárica.',
      socraticQuestions: [
        '¿Por qué la domesticación de plantas condujo inevitablemente a la invención de la cerámica? ¿Qué relación hay entre comer maíz cocido y tener recipientes de barro refractario al fuego?',
        'Si la gran mayoría de las estatuillas de Valdivia representan a mujeres en diversas etapas de su ciclo biológico (juventud, embarazo, maternidad y vejez sabia), ¿qué nos revela esto sobre el estatus y el poder social de la mujer en aquella civilización?',
        '¿Cómo crees que el almacenamiento de excedentes agrícolas cambió las relaciones de poder en una aldea comparado con una banda nómada donde no se acumulaba comida?'
      ],
      practicalActivity: {
        title: 'Análisis estético e iconográfico de una Venus de Valdivia',
        instructions: [
          'Observa con atención la lámina técnica de una Venus de Valdivia del Museo Nacional del Ecuador (MuNa).',
          'Examina tres rasgos anatómicos y estilísticos: a) El tratamiento escultórico del cabello (peinado escalonado o casco trenzado); b) Los ojos incisos tipo "grano de café"; c) La ausencia o esquematización de brazos y pies.',
          'Dibuja en tu cuaderno de arte e historia un boceto a escala de la estatuilla indicando con flechas los detalles iconográficos.',
          'Formula dos hipótesis sobre el uso ritual que los chamanes de Valdivia daban a estas piezas (¿curación, rito de fertilidad agrícola, paso a la pubertad?).'
        ],
        materials: ['Cuaderno de dibujo', 'Lápiz HB y 2B', 'Regla', 'Lámina de arqueología del MuNa']
      },
      applicationActivity: {
        title: 'Maqueta conceptual o infografía de la aldea de Real Alto',
        task: 'Diseña una infografía arquitectónica de la aldea de Real Alto: representa la plaza central, el montículo ceremonial de los osarios, las viviendas elípticas de caña y bahareque, las parcelas de cultivo de maíz y los talleres alfareros. Explica en tres cuadros explicativos cómo se organizaba la vida comunitaria y la cooperación agrícola entre las familias.',
        deliverable: 'Infografía en cartulina o formato digital con rotulación clara y leyenda de funciones sociopolíticas.'
      },
      formativeEvaluation: {
        description: 'Capacidad para explicar la revolución neolítica/formativa en América, identificar la cultura Valdivia y valorar el rol de la mujer en las sociedades tempranas.',
        expectedEvidence: 'Avril argumenta con claridad el impacto del cultivo del maíz y la cerámica en el sedentarismo y explica la iconografía femenina de Valdivia sin caer en anacronismos.'
      },
      evaluationRubric: {
        criterion: 'Comprensión de la agricultura y la Cultura Valdivia en el Período Formativo (CS.4.1.2)',
        indicators: [
          { level: 'Inicial', descriptor: 'Reconoce que Valdivia hacía vasijas pero desconoce su antigüedad y no vincula la agricultura con la vida aldeana.' },
          { level: 'En desarrollo', descriptor: 'Describe las estatuillas femeninas pero le cuesta explicar la importancia económica de los excedentes agrícolas o la organización matrilineal.' },
          { level: 'Consolidado', descriptor: 'Explica con rigor histórico la transición formativa, analiza la iconografía de las Venus en relación con la fertilidad y la estructura social, y dimensiona la relevancia de Real Alto como hito civilizatorio americano.' }
        ]
      },
      expectedFeedback: 'Un trabajo de análisis cultural digno de una historiadora profesional, Avril. Tu comprensión de la concha Spondylus, el culto a la fertilidad y la organización aldeana de Real Alto revela un profundo respeto por nuestras raíces ancestrales ecuatorianas.',
      difficultyAdaptation: 'Proporcionar una plantilla con el contorno de la aldea y fichas ilustradas para ubicar las zonas residenciales, agrícolas y ceremoniales.',
      advancedExtension: 'Avril investiga la hipótesis de contacto transpacífico formulada por Emilio Estrada (influencia de la cultura Jōmon de Japón) y analiza por qué la arqueología moderna descartó esa teoría al hallar antecedentes cerámicos locales en San Pedro y Las Vegas.',
      resources: [
        {
          id: 'class-soc-avril-02-res-1',
          type: 'simulator',
          title: 'Museo Nacional del Ecuador (MuNa) — Sala del Período Formativo y Valdivia',
          url: 'https://muna.culturaypatrimonio.gob.ec/',
          description: 'Recorrido virtual y catálogo de piezas cerámicas, morteros zoomorfos y estatuillas de Valdivia, Machalilla y Chorrera.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-soc-avril-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Revolución Agrícola y Cultura Valdivia',
          url: '/api/v1/academic/classes/class-soc-avril-02/guide.pdf',
          description: 'Ficha de trabajo con planos de Real Alto, análisis iconográfico de las Venus y ejercicios de interpretación formativa.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-soc-avril-02-act-1',
          title: 'El Descubrimiento de Emilio Estrada',
          description: 'Lee el relato arqueológico del hallazgo de Valdivia y reflexiona sobre el valor de la curiosidad científica.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-soc-avril-02-act-2',
          title: 'Análisis Iconográfico de la Venus',
          description: 'Dibuja y documenta los rasgos estilísticos de las estatuillas cerámicas de Valdivia y su simbolismo.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-soc-avril-02-act-3',
          title: 'Infografía de la Aldea de Real Alto',
          description: 'Diseña el plano funcional de la aldea comunitaria explicando la división social del trabajo agrícola.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Siembra una semilla de frijol o maíz en un frasco con algodón húmedo en casa y anota los primeros brotes para experimentar la paciencia de los primeros agricultores.',
      reflectionPrompt: '¿Qué sabiduría ancestral sobre el cuidado del suelo y las semillas podemos aprender hoy de las mujeres de Valdivia?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_soc_avril_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-soc-avril-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-04-SOC', subjectCode: 'SOC-801', unitNumber: 1, sessionNumber: 2 }
    }
  ]
};

