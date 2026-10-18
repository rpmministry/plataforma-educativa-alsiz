import { CurriculumLote } from './lote1-len';

export const LOTE_03_CNI: CurriculumLote = {
  loteId: 'LOTE-GAEL-03-CNI',
  loteNumber: 3,
  subjectCode: 'CNI-401',
  subjectName: 'Ciencias Naturales',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unidad 1: Exploradores de la Vida: Seres Vivos y Ecosistemas del Ecuador',
  unitNumber: 1,
  classesCount: 4,
  classes: [
    {
      id: 'class-sci-gael-01',
      subjectId: 'sci-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-07',
      dayOfWeek: 'Lunes',
      scheduleTime: '10:45 - 11:30 (45 min)',
      unit: 'Unidad 1: Exploradores de la Vida: Seres Vivos y Ecosistemas del Ecuador',
      theme: 'Los secretos de los seres vivos: Ciclo vital, respiración y necesidades fundamentales',
      objective: 'Identificar las características comunes y necesidades vitales de los seres vivos frente a la materia inerte.',
      learningPurpose: 'Descubrir que plantas, animales y seres humanos compartimos el milagro de la vida y necesitamos agua, luz, aire y cuidado para crecer sanos.',
      competencyDcd: 'CN.2.1.1 — Observar las etapas del ciclo vital del ser humano y registrar gráficamente los cambios de acuerdo a la edad y a las necesidades vitales (alimento, agua, aire).',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Hola, explorador de la selva Gael! Bienvenido a tu laboratorio de Ciencias Naturales con la Dra. Maya Selva. Hoy nos pondremos nuestra lupa de científicos para responder una gran pregunta: ¿qué hace que un colibrí o un árbol estén vivos, mientras que una piedra del volcán Cotopaxi o una moneda no lo están? ¡Vamos a descubrir las 4 huellas de la vida!',
      reading: 'El misterio de la semilla dormida: En un rincón de la huerta, Mateo encontró una semilla redonda y oscura junto a una pequeña canica de vidrio azul. Las dos eran redondas, duras y no se movían. Mateo pensó: "¡Son hermanas gemelas!". Pero su abuela científica le dijo: "Dales agua, tierra fértil y los rayos dorados del sol durante una semana". Pasaron siete días: la canica de vidrio seguía exactamente igual, fría y solitaria. Pero de la semilla brotó una diminuta raíz verde que empujó la tierra buscando el sol. ¡La semilla estaba viva, respiraba en secreto y comenzó su maravilloso ciclo vital!',
      pedagogicalExplanation: 'Todos los seres vivos del planeta Tierra cumplen cuatro etapas mágicas llamadas ciclo vital: nacen, crecen, se reproducen (tienen hijitos o frutos) y mueren. Además, para estar vivos necesitan cuatro regalos de la naturaleza: agua limpia, aire puro con oxígeno, alimento nutritivo y la luz y calor del sol. La materia inerte (como las rocas, el plástico o los juguetes) no respira, no come y no crece.',
      vocabulary: [
        { term: 'Ser vivo', definition: 'Cualquier organismo que cumple el ciclo de la vida (nace, crece, se reproduce y muere) y necesita energía.', childFriendlyExample: 'Un perro, un árbol de guayaba y Gael son seres vivos.' },
        { term: 'Materia inerte', definition: 'Objetos que no tienen vida, no crecen y no necesitan alimentarse.', childFriendlyExample: 'Una roca volcánica y un carro de juguete son materia inerte.' },
        { term: 'Ciclo vital', definition: 'El camino del tiempo que recorre todo ser vivo desde que nace hasta que cumple su ciclo en la tierra.', childFriendlyExample: 'La mariposa que primero fue oruga vive un ciclo vital asombroso.' }
      ],
      contextualizedExample: 'En las Islas Galápagos, la tortuga gigante es un ser vivo que come hierbas y bebe agua fresca en los cráteres, mientras que la lava negra donde camina es materia inerte.',
      socraticQuestions: [
        '¿En qué se parece un árbol de manzanas a ti? ¿Qué cosas necesitan los dos para seguir creciendo fuertes?',
        'Si un robot puede caminar y hablar con luces de colores, ¿está vivo? ¿Por qué sí o por qué no?',
        '¿Qué pasaría con los animales de un bosque si el agua del río se seca por completo?'
      ],
      practicalActivity: {
        title: 'El germinador de frejol transparente',
        instructions: [
          'Toma un vaso de vidrio o plástico transparente y coloca dentro una bolita de algodón húmedo (sin empapar).',
          'Introduce una semilla de frejol o lenteja entre el algodón y la pared del vaso para que puedas verla.',
          'Coloca el vaso cerca de una ventana donde reciba luz natural.',
          'Dibuja en tu bitácora el Día 1: tamaño de la semilla y humedad del algodón.'
        ],
        materials: ['Vaso transparente', 'Algodón', 'Semilla de frejol o lenteja', 'Agua fresca']
      },
      applicationActivity: {
        title: 'La tabla comparativa del explorador',
        task: 'Divide una hoja en dos columnas: "Ser Vivo" y "Materia Inerte". Dibuja 3 seres vivos de tu casa o parque y 3 objetos inertes, indicando al lado qué necesita el ser vivo para no morir.',
        deliverable: 'Ficha con dibujos a color y las 4 necesidades vitales anotadas (agua, aire, alimento, sol).'
      },
      formativeEvaluation: {
        description: 'Diferenciación conceptual entre ser vivo y materia inerte basada en evidencias observables y ciclo vital.',
        expectedEvidence: 'Gael explica con claridad por qué el robot no es un ser vivo y qué necesita la semilla para germinar.'
      },
      evaluationRubric: {
        criterion: 'Identificación de características de los seres vivos y sus necesidades (CN.2.1.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Nombra animales pero clasifica objetos con movimiento mecánico (como autos) como seres vivos.' },
          { level: 'En desarrollo', descriptor: 'Reconoce que los seres vivos necesitan agua y comida, pero omite las plantas o el ciclo vital.' },
          { level: 'Consolidado', descriptor: 'Distingue con total precisión entre materia viva e inerte, describe las 4 etapas del ciclo vital y sustenta sus respuestas con experimentos sencillos.' }
        ]
      },
      expectedFeedback: '¡Fantástica deducción científica, Gael! Tu germinador será una ventana mágica para ver nacer la vida día tras día. ¡Maya Selva está muy orgullosa de tu curiosidad!',
      difficultyAdaptation: 'Utilizar una tarjeta con dos iconos grandes (corazón latiendo = ser vivo; bloque de piedra = materia inerte) para clasificar objetos reales de la habitación.',
      advancedExtension: 'Gael investiga cuánto tiempo puede vivir una tortuga gigante de Galápagos (¡más de 150 años!) y cómo su caparazón crece junto con ella.',
      resources: [
        {
          id: 'class-sci-gael-01-res-1',
          type: 'simulator',
          title: 'NASA Climate Kids: Los Signos Vitales de la Tierra',
          url: 'https://climatekids.nasa.gov/',
          description: 'Recurso oficial abierto de la NASA para niños que explica los requisitos para la vida y los ecosistemas.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-sci-gael-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Bitácora del Germinador',
          url: '/api/v1/academic/classes/class-sci-gael-01/guide.pdf',
          description: 'Ficha de registro de 7 días para observar y dibujar el crecimiento de la raíz y el tallo.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-sci-gael-01-act-1',
          title: 'El Misterio de la Semilla y la Canica',
          description: 'Descubre las razones por las cuales solo una de las dos cobró vida tras recibir agua y luz.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-sci-gael-01-act-2',
          title: 'Montaje del Germinador de Frejol',
          description: 'Prepara el vaso con algodón y semilla siguiendo los 4 pasos del método científico.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-sci-gael-01-act-3',
          title: 'Mural de los 4 Elementos de Vida',
          description: 'Dibuja en tu cuaderno las 4 necesidades indispensables que compartimos con los animales.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Revisa tu germinador en la tarde y ponle unas gotas de agua con tu dedo si el algodón se siente seco.',
      reflectionPrompt: 'Si cuidaras una plantita en tu ventana, ¿qué sientes al ver brotar su primera hojita verde?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_sci_gael_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-sci-gael-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-03-CNI', subjectCode: 'CNI-401', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-sci-gael-02',
      subjectId: 'sci-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-08',
      dayOfWeek: 'Martes',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Exploradores de la Vida: Seres Vivos y Ecosistemas del Ecuador',
      theme: 'Fábricas verdes: Las partes de las plantas y el viaje del polen',
      objective: 'Reconocer la estructura de las plantas (raíz, tallo, hojas, flor, fruto) y su función en la producción de oxígeno y alimento.',
      learningPurpose: 'Comprender que las plantas son las guardianas de la atmósfera y alimentan a casi todos los seres vivos del planeta.',
      competencyDcd: 'CN.2.1.8 — Observar y describir las partes de la planta, explicar sus funciones y clasificarlas por su estrato y utilidad.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Buenos días, botánico Gael! ¿Sabías que los árboles y las flores tienen una cocina mágica en sus hojas que funciona con luz de sol? Mientras nosotros necesitamos ollas y fuego para cocinar, las plantas inventaron hace millones de años la FOTOSÍNTESIS: toman agua de la tierra y luz del cielo para preparar su propio néctar y regalarnos aire limpio para respirar. ¡Hoy exploraremos cada una de sus partes!',
      reading: 'El banquete del girasol gigante: En un valle soleado de los Andes, un girasol llamado Solín extendía sus raíces profundas en la tierra húmeda para beber agua mineral fresca. Su tallo verde y fuerte se mantenía recto contra el viento andino. En sus grandes hojas verdes, Solín atrapaba la luz del mediodía y liberaba burbujas invisibles de oxígeno limpio para que los niños del pueblo pudieran respirar con alegría. Al atardecer, una abeja trabajadora llamada Zumbita aterrizó en sus pétalos dorados, probó el dulce néctar de su corazón y se llevó polvito de polen en sus patitas para sembrar nuevas flores en la colina vecina.',
      pedagogicalExplanation: 'Una planta completa tiene 5 órganos esenciales: 1) Raíz: ancla la planta al suelo y absorbe agua y sales minerales. 2) Tallo: sostiene las hojas y transporta la savia como una cañería viva. 3) Hojas: son los pulmones y la cocina de la planta donde ocurre la fotosíntesis. 4) Flor: es el órgano reproductor que atrae abejas y mariposas con sus colores y perfumes. 5) Fruto y semilla: guardan y protegen a la nueva plantita que nacerá.',
      vocabulary: [
        { term: 'Raíz', definition: 'Parte subterránea de la planta que bebe agua y la sostiene firme al suelo.', childFriendlyExample: 'La zanahoria que comemos en la ensalada es una raíz deliciosa.' },
        { term: 'Fotosíntesis', definition: 'El proceso por el cual las hojas de las plantas usan la luz del sol para fabricar su alimento.', childFriendlyExample: 'Gracias a la fotosíntesis, los bosques llenan de oxígeno puro a nuestro planeta.' },
        { term: 'Polinización', definition: 'El viaje del polen de una flor a otra gracias a insectos o al viento para formar semillas y frutos.', childFriendlyExample: 'Las abejas son las reinas de la polinización.' }
      ],
      contextualizedExample: 'En la Amazonía ecuatoriana, las orquídeas crecen sobre los árboles gigantes y usan sus flores exóticas para llamar a colibríes que ayudan a polinizarlas.',
      socraticQuestions: [
        '¿Qué pasaría si arrancamos las raíces de una planta? ¿Por qué no puede sobrevivir solo con sus hojas?',
        '¿Por qué las abejas son tan importantes para los agricultores que cultivan frutas en el Ecuador?',
        'Si las plantas nos dan oxígeno limpio, ¿por qué es tan importante sembrar árboles en nuestras ciudades?'
      ],
      practicalActivity: {
        title: 'Anatomía de una flor y sus hojas con lupa',
        instructions: [
          'Con la ayuda de un adulto, recolecta una hoja y una flor caída del suelo de un jardín o parque.',
          'Usa una lupa para observar las venitas delgadas de la hoja (los canales por donde viaja el agua).',
          'Toca suavemente el centro de la flor y mira si queda polvito amarillo en la yema de tu dedo (¡es el polen!).',
          'Pega la hoja en tu libreta y rotula sus partes con flechas: pecíolo, limbo y nervaduras.'
        ],
        materials: ['Hoja y flor caídas', 'Lupa de explorador', 'Cinta adhesiva o goma', 'Libreta']
      },
      applicationActivity: {
        title: 'El árbol ilustrado de las 5 partes',
        task: 'Dibuja en tu libreta un árbol o planta completa. Escribe el nombre de cada una de sus 5 partes (raíz, tallo, hojas, flor, fruto) y escribe al lado qué trabajo especial hace cada una.',
        deliverable: 'Póster a color de la planta con flechas y descripciones funcionales.'
      },
      formativeEvaluation: {
        description: 'Identificación de las partes de la planta y descripción oral del proceso de polinización y fotosíntesis.',
        expectedEvidence: 'Gael señala correctamente los 5 órganos de la planta y explica qué función cumple la raíz y la hoja.'
      },
      evaluationRubric: {
        criterion: 'Descripción de las partes de la planta y su función ecológica (CN.2.1.8)',
        indicators: [
          { level: 'Inicial', descriptor: 'Reconoce hojas y flores pero no identifica la función de la raíz o el tallo.' },
          { level: 'En desarrollo', descriptor: 'Rotula las partes de la planta pero le cuesta explicar qué es la fotosíntesis o la polinización.' },
          { level: 'Consolidado', descriptor: 'Explica con soltura la función vital de cada órgano vegetal y comprende el valor ecológico de la polinización para la vida humana.' }
        ]
      },
      expectedFeedback: '¡Extraordinario trabajo botánico, Gael! Tu dibujo de las 5 partes de la planta parece el cuaderno de un gran naturalista como Humboldt. ¡Supiste ver la belleza en cada detalle vegetal!',
      difficultyAdaptation: 'Armar un rompecabezas de cartulina con las 5 piezas de una planta para que Gael las una desde la raíz hasta el fruto antes de dibujar.',
      advancedExtension: 'Gael investiga qué verduras de la cocina corresponden a cada parte de la planta (ejemplo: lechuga = hoja, apio = tallo, zanahoria = raíz, tomate = fruto, brócoli = flor).',
      resources: [
        {
          id: 'class-sci-gael-02-res-1',
          type: 'simulator',
          title: 'PhET Colorado: Fotosíntesis y Luz Solar',
          url: 'https://phet.colorado.edu/sims/html/molecules-and-light/latest/molecules-and-light_es.html',
          description: 'Simulación visual de moléculas y luz solar para entender cómo la energía solar interactúa con la materia viva.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-sci-gael-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Fábricas Verdes y Polen',
          url: '/api/v1/academic/classes/class-sci-gael-02/guide.pdf',
          description: 'Ficha ilustrada con diagramas de hojas, estomas y flores para rotular en 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-sci-gael-02-act-1',
          title: 'El Banquete del Girasol',
          description: 'Analiza la relación entre el girasol Solín y la abeja Zumbita en el ecosistema.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-sci-gael-02-act-2',
          title: 'Laboratorio de la Lupa Botánica',
          description: 'Observa la nervadura de la hoja y el polen de la flor con tu lupa.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-sci-gael-02-act-3',
          title: 'Póster de la Planta Viva',
          description: 'Dibuja y rotula las 5 partes de la planta con sus superpoderes ecológicos.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Busca en el refrigerador una fruta (como una manzana o mandarina), ábrela con ayuda de mamá y cuenta cuántas semillas protectoras tiene dentro.',
      reflectionPrompt: 'Si los árboles hablaran, ¿qué mensaje de gratitud crees que nos darían por regarlos?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_sci_gael_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-sci-gael-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-03-CNI', subjectCode: 'CNI-401', unitNumber: 1, sessionNumber: 2 }
    },
    {
      id: 'class-sci-gael-03',
      subjectId: 'sci-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-10',
      dayOfWeek: 'Jueves',
      scheduleTime: '08:45 - 09:30 (45 min)',
      unit: 'Unidad 1: Exploradores de la Vida: Seres Vivos y Ecosistemas del Ecuador',
      theme: 'El reino animal del Ecuador: Vertebrados con columna y los pequeños invertebrados',
      objective: 'Clasificar animales del entorno en vertebrados (mamíferos, aves, reptiles, anfibios, peces) e invertebrados por la presencia o ausencia de esqueleto interno.',
      learningPurpose: 'Aprender cómo el esqueleto interno permite a los animales saltar, volar y correr con agilidad en las 4 regiones naturales del Ecuador.',
      competencyDcd: 'CN.2.1.4 — Observar y describir las características de los animales vertebrados y agruparlos de acuerdo a sus características corporales.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Atención, zoólogo Gael! Toca suavemente tu espalda en el centro: ¿sientes esa fila de huesitos duros que van desde tu cuello hasta tu cintura? ¡Esa es tu columna vertebral! Es como la torre central de un castillo que sostiene todo tu cuerpo. Los animales que tienen huesos y columna se llaman VERTEBRADOS. Pero hay millones de animalitos fascinantes que no tienen ningún hueso por dentro, ¡y se llaman INVERTEBRADOS! Hoy descubriremos sus secretos.',
      reading: 'La convención de los animales ecuatorianos: En el Parque Nacional Yasuní se reunieron los animales más asombrosos del mundo. El cóndor andino abrió sus alas de 3 metros y dijo: "Tengo huesos huecos y livianos para volar sobre los volcanes nevados" (Ave). El jaguar amazónico rugió con orgullo mostrando sus músculos elásticos sostenidos por un esqueleto fuerte (Mamífero). La iguana marina de Galápagos nadó entre las olas aguantando la respiración con sus escamas impermeables (Reptil). La ranita de cristal del Chocó cantó alegremente con su piel húmeda y brillante (Anfibio). Y el tiburón ballena se deslizó majestuoso en el mar (Pez cartilaginoso). Al lado de ellos, una mariposa morpho azul brillante y una hormiga arriera dijeron con alegría: "¡Nosotras no necesitamos huesos por dentro, nuestro caparazón exterior nos protege y somos súper fuertes!".',
      pedagogicalExplanation: 'Los animales se dividen en dos grandes familias: 1) Vertebrados: tienen esqueleto interno con columna vertebral. Hay 5 grupos: Mamíferos (toman leche materna, como el oso o el delfín), Aves (tienen plumas y alas, como el colibrí), Reptiles (tienen escamas secas y se arrastran, como la tortuga), Anfibios (nacen en agua y de adultos viven en tierra con piel húmeda, como la rana), y Peces (viven en el agua y respiran por branquias). 2) Invertebrados: no tienen columna vertebral (insectos, arañas, caracoles, medusas, pulpos).',
      vocabulary: [
        { term: 'Columna vertebral', definition: 'Fila articulada de huesos que sostiene el cuerpo de los animales vertebrados.', childFriendlyExample: 'Tu columna te permite agacharte y saltar sin romperte.' },
        { term: 'Vertebrado', definition: 'Animal que tiene esqueleto interno de huesos o cartílago.', childFriendlyExample: 'El león, el águila y el pez espada son vertebrados.' },
        { term: 'Invertebrado', definition: 'Animal que carece de columna vertebral y esqueleto óseo interno.', childFriendlyExample: 'La abeja, la lombriz y el caracol son invertebrados.' }
      ],
      contextualizedExample: 'En el zoológico de Guayllabamba en Quito, Gael puede ver al oso de anteojos (vertebrado mamífero) y también a las mariposas del mariposario (invertebrados insectos).',
      socraticQuestions: [
        '¿Qué pasaría con nuestro cuerpo si de repente no tuviéramos ningún hueso? ¿Cómo caminaríamos?',
        '¿Por qué una lombriz de tierra puede doblarse y estirarse por completo mientras que un conejo no puede hacer eso?',
        '¿En qué grupo de los vertebrados pondrías a un murciélago: en las aves porque vuela o en los mamíferos porque sus crías toman leche?'
      ],
      practicalActivity: {
        title: 'El detective del esqueleto: Tacto y clasificación',
        instructions: [
          'Toca suavemente tu codo, tus costillas y tus rodillas: siente la dureza del esqueleto interno.',
          'Imagina que eres un invertebrado (un pulpo): mueve tus brazos como gelatina suave sin huesos.',
          'Ahora imagina que eres un vertebrado ágil (un puma): da pasos firmes sintiendo tus patas y columna.',
          'Anota en tu cuaderno 3 diferencias de movimiento entre tener esqueleto y no tenerlo.'
        ],
        materials: ['Tu propio cuerpo en movimiento', 'Libreta de campo', 'Lápiz']
      },
      applicationActivity: {
        title: 'La rueda de los 5 grupos de vertebrados',
        task: 'Dibuja un círculo dividido en 5 partes iguales en una hoja: Mamíferos, Aves, Reptiles, Anfibios y Peces. Dibuja un animal representativo del Ecuador en cada porción (ejemplo: Cóndor en Aves, Jaguar en Mamíferos).',
        deliverable: 'Rueda gráfica a color con los 5 animales emblemáticos del Ecuador.'
      },
      formativeEvaluation: {
        description: 'Clasificación zoológica en vertebrados e invertebrados, y categorización de los 5 grupos de vertebrados.',
        expectedEvidence: 'Gael ubica correctamente al jaguar en mamíferos, al colibrí en aves y reconoce que la mariposa es un invertebrado.'
      },
      evaluationRubric: {
        criterion: 'Clasificación de animales según su estructura corporal (CN.2.1.4)',
        indicators: [
          { level: 'Inicial', descriptor: 'Confunde insectos con animales vertebrados pequeños y no reconoce la columna.' },
          { level: 'En desarrollo', descriptor: 'Distingue vertebrados de invertebrados pero confunde reptiles con anfibios.' },
          { level: 'Consolidado', descriptor: 'Clasifica con precisión los 5 grupos de vertebrados ecuatorianos y fundamenta sus características anatómicas y reproductivas.' }
        ]
      },
      expectedFeedback: '¡Magistral clasificación zoológica, Gael! Resolviste el acertijo del murciélago como todo un biólogo profesional. ¡Tu rueda de los 5 vertebrados del Ecuador quedó digna de un museo!',
      difficultyAdaptation: 'Utilizar figuras plásticas de animales para que Gael las separe en dos cajas: "Caja con huesos duros" y "Caja sin huesos".',
      advancedExtension: 'Gael investiga sobre la "ranita de cristal" de los bosques nublados del Ecuador, cuya piel transparente en el vientre permite ver cómo late su corazón.',
      resources: [
        {
          id: 'class-sci-gael-03-res-1',
          type: 'simulator',
          title: 'BioWeb Ecuador: Fauna de Vertebrados',
          url: 'https://bioweb.bio/',
          description: 'Portal oficial científico de la PUCE con fichas multimedia de mamíferos, aves, reptiles y anfibios del Ecuador.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-sci-gael-03-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Vertebrados e Invertebrados',
          url: '/api/v1/academic/classes/class-sci-gael-03/guide.pdf',
          description: 'Ficha de trabajo con siluetas anatómicas y desafíos de clasificación zoológica para 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-sci-gael-03-act-1',
          title: 'La Asamblea del Yasuní',
          description: 'Identifica la característica corporal especial que mencionó cada animal en la convención.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-sci-gael-03-act-2',
          title: 'Laboratorio de Movimiento Esquelético',
          description: 'Experimenta la diferencia física entre moverte como un invertebrado y como un vertebrado.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-sci-gael-03-act-3',
          title: 'Rueda de la Biodiversidad Ecuatoriana',
          description: 'Construye y colorea la rueda con los 5 grupos de vertebrados del país.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Observa a un perro o gato de tu barrio y anota 2 características que demuestran que es un mamífero vertebrado.',
      reflectionPrompt: '¿Qué sientes al saber que el Ecuador es uno de los países con mayor variedad de animales del mundo entero?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_sci_gael_03.pdf',
      guideUrl: '/api/v1/academic/classes/class-sci-gael-03/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-03-CNI', subjectCode: 'CNI-401', unitNumber: 1, sessionNumber: 3 }
    },
    {
      id: 'class-sci-gael-04',
      subjectId: 'sci-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-14',
      dayOfWeek: 'Lunes',
      scheduleTime: '10:45 - 11:30 (45 min)',
      unit: 'Unidad 1: Exploradores de la Vida: Seres Vivos y Ecosistemas del Ecuador',
      theme: 'Guardianes del ecosistema: Hábitats del Ecuador y la cadena alimenticia',
      objective: 'Describir los hábitats naturales del Ecuador y representar cadenas alimenticias sencillas entre productores, consumidores y descomponedores.',
      learningPurpose: 'Entender que en un ecosistema todos dependen de todos: si cuidamos el agua y las plantas, protegemos al colibrí, al oso y a nosotros mismos.',
      competencyDcd: 'CN.2.1.10 — Indagar y describir las características de los hábitats locales, clasificarlos según sus factores bióticos y abióticos e identificar las amenazas.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Bienvenido a la expedición final de la Unidad 1, explorador Gael! Imagina que la naturaleza es una inmensa orquesta musical donde cada ser vivo toca un instrumento diferente: si se detiene el violín de las abejas, o si se rompe el tambor de los ríos limpios, toda la música se desordena. Hoy aprenderemos qué es un HÁBITAT y cómo la energía del sol viaja a través de la maravillosa CADENA ALIMENTICIA.',
      reading: 'El círculo dorado del páramo andino: En las alturas del volcán Antisana, la paja del páramo (Productor) atrapa la luz del sol y el agua pura de la niebla. Un conejo silvestre (Consumidor primario) mastica la paja verde con apetito. Más tarde, un zorro de páramo veloz (Consumidor secundario) busca al conejo para alimentarse. Y en lo más alto del cielo azul, el majestuoso cóndor andino (Consumidor terciario y carroñero) limpia los restos del campo. Cuando el cóndor cumple su ciclo de vida, los diminutos hongos y bacterias del suelo (Descomponedores) transforman todo en abono rico para que nueva paja vuelva a crecer. ¡Es el círculo perfecto de la vida donde nada se desperdicia!',
      pedagogicalExplanation: 'Un hábitat es el hogar natural de un ser vivo, donde encuentra comida, agua, refugio y clima adecuado. En la cadena alimenticia la energía viaja en fila india: 1) Productores: las plantas que fabrican su alimento con el sol. 2) Consumidores herbívoros: comen plantas. 3) Consumidores carnívoros: comen otros animales. 4) Descomponedores: los recicladores del bosque que limpian el suelo y devuelven nutrientes a la tierra.',
      vocabulary: [
        { term: 'Hábitat', definition: 'El lugar físico natural con las condiciones ideales para que una especie viva y se reproduzca.', childFriendlyExample: 'El páramo frío es el hábitat del cóndor andino.' },
        { term: 'Productor', definition: 'Ser vivo que fabrica su propio alimento mediante fotosíntesis (las plantas).', childFriendlyExample: 'La hierba y los arbustos son productores.' },
        { term: 'Cadena alimenticia', definition: 'El camino que sigue la energía de un ser vivo a otro a través de la alimentación.', childFriendlyExample: 'Hierba -> Conejo -> Zorro -> Cóndor es una cadena alimenticia.' }
      ],
      contextualizedExample: 'En el manglar de la Costa ecuatoriana, las hojas del mangle caen al agua, los cangrejos rojos se alimentan de ellas y los pelícanos pescan en los canales.',
      socraticQuestions: [
        '¿Por qué las plantas se llaman "productoras" y los animales se llaman "consumidores"?',
        '¿Qué pasaría en el páramo si no existieran los descomponedores (los hongos y bacterias del suelo)?',
        'Si una fábrica tira basura y petróleo en un río de la Amazonía, ¿a quiénes afecta de la cadena alimenticia?'
      ],
      practicalActivity: {
        title: 'El collar de la cadena trófica con eslabones de papel',
        instructions: [
          'Corta 4 tiras de papel de colores diferentes.',
          'En la tira 1 (amarilla) dibuja el Sol y la hierba (Productor).',
          'En la tira 2 (verde) dibuja un saltamontes (Consumidor 1).',
          'En la tira 3 (azul) dibuja una ranita (Consumidor 2).',
          'En la tira 4 (marrón) dibuja un halcón (Consumidor 3).',
          'Une las tiras formando aros entrelazados como una cadena física: ¡mira cómo si rompes un aro, la cadena entera se cae!'
        ],
        materials: ['Papel de colores o tiras de cartulina', 'Tijeras de punta redonda', 'Goma', 'Marcadores']
      },
      applicationActivity: {
        title: 'El diorama o mapa ecológico de un hábitat ecuatoriano',
        task: 'Elige uno de los 4 hábitats del Ecuador (Manglar de la Costa, Páramo de la Sierra, Selva Amazónica o Islas Galápagos). Dibuja su paisaje con 1 productor, 2 consumidores y 1 descomponedor, uniendo sus relaciones con flechas rojas de energía.',
        deliverable: 'Mapa ilustrado a color del hábitat con la cadena trófica rotulada.'
      },
      formativeEvaluation: {
        description: 'Comprensión integral de las relaciones tróficas y conciencia ecológica de interdependencia en los hábitats.',
        expectedEvidence: 'Gael explica con sus palabras por qué al contaminar el agua se rompe la cadena alimenticia y daña a todos los seres del ecosistema.'
      },
      evaluationRubric: {
        criterion: 'Explicación de cadenas tróficas y conservación de hábitats (CN.2.1.10)',
        indicators: [
          { level: 'Inicial', descriptor: 'Dibuja animales comiendo pero no distingue entre productores y consumidores.' },
          { level: 'En desarrollo', descriptor: 'Ordena la cadena de 3 eslabones pero le cuesta explicar el rol de los descomponedores.' },
          { level: 'Consolidado', descriptor: 'Modela cadenas alimenticias completas, explica el flujo de energía solar y propone acciones concretas para proteger los hábitats del Ecuador.' }
        ]
      },
      expectedFeedback: '¡Misión cumplida con honores en Ciencias Naturales, Guardián Gael! Supiste ver la conexión mágica que une al sol con cada planta y animal. Tienes un corazón noble de protector de la naturaleza.',
      difficultyAdaptation: 'Utilizar flechas magnéticas o recortadas con la palabra "da energía a" para colocar físicamente entre dibujos de animales.',
      advancedExtension: 'Gael investiga sobre las "redes tróficas", descubriendo que en la naturaleza los animales no comen una sola cosa, sino que forman una telaraña de interconexiones.',
      resources: [
        {
          id: 'class-sci-gael-04-res-1',
          type: 'simulator',
          title: 'PhET Colorado: Ecosistemas y Selección Natural',
          url: 'https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_es.html',
          description: 'Simulador PhET oficial donde los estudiantes exploran cómo los conejos interactúan con los lobos y el alimento en distintos climas.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-sci-gael-04-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — El Círculo Dorado del Páramo',
          url: '/api/v1/academic/classes/class-sci-gael-04/guide.pdf',
          description: 'Plantilla imprimible de eslabones y mapas de hábitats del Ecuador para 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-sci-gael-04-act-1',
          title: 'El Círculo del Antisana',
          description: 'Rastrea el viaje de la energía desde el sol hasta los descomponedores en el páramo.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-sci-gael-04-act-2',
          title: 'Cadena de Eslabones de Papel',
          description: 'Construye tu cadena trófica física y comprueba qué pasa si se rompe un eslabón.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-sci-gael-04-act-3',
          title: 'Mapa Ecológico del Hábitat',
          description: 'Diseña el póster de tu región ecuatoriana con productores, consumidores y recicladores.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Explica a tus papás por qué los hongos no son plantas aunque crezcan en el suelo, y cómo ayudan a limpiar los bosques.',
      reflectionPrompt: '¿Qué pequeña acción diaria puedes hacer en tu casa para cuidar los hábitats de los animales de nuestro país?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_sci_gael_04.pdf',
      guideUrl: '/api/v1/academic/classes/class-sci-gael-04/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-03-CNI', subjectCode: 'CNI-401', unitNumber: 1, sessionNumber: 4 }
    }
  ]
};

