import { CurriculumLote } from './lote1-len';

export const LOTE_04_SOC: CurriculumLote = {
  loteId: 'LOTE-GAEL-04-SOC',
  loteNumber: 4,
  subjectCode: 'SOC-401',
  subjectName: 'Estudios Sociales',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unidad 1: Mi Comunidad, Mi Ciudad y los Tesoros del Ecuador',
  unitNumber: 1,
  classesCount: 3,
  classes: [
    {
      id: 'class-soc-gael-01',
      subjectId: 'soc-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-09',
      dayOfWeek: 'Miércoles',
      scheduleTime: '10:00 - 10:45 (45 min)',
      unit: 'Unidad 1: Mi Comunidad, Mi Ciudad y los Tesoros del Ecuador',
      theme: 'Mi primer equipo: La familia y los lazos de amor, respeto y colaboración',
      objective: 'Reconocer a la familia como el núcleo básico de afecto, apoyo mutuo y derechos compartidos.',
      learningPurpose: 'Descubrir que cada familia es un equipo especial donde todos nos cuidamos, nos escuchamos y colaboramos para vivir con alegría y armonía.',
      competencyDcd: 'CS.2.1.1 — Reconocer a la familia como espacio de afecto, comprensión y cuidado mutuo, valorando la diversidad de estructuras familiares y los lazos de parentesco y solidaridad.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Hola, súper ciudadano Gael! Bienvenido a Estudios Sociales con el Capitán Diego Mapamundi. ¿Alguna vez has pensado cuál fue la primera tripulación con la que zarpaste en el barco de la vida? ¡Tu familia! Mamá, papá, hermanos, abuelitos, tíos... cada familia es como un árbol frondoso con raíces firmes llenas de historias, risas y abrazos que nos dan seguridad para explorar el mundo.',
      reading: 'El árbol genealógico de los exploradores: En una casita acogedora frente a las montañas de Quito vivía la familia Andrade. Un domingo por la tarde, sacaron una vieja caja de lata con fotografías en blanco y negro y a color. Ahí estaban los bisabuelos que cruzaban valles a caballo, los abuelitos que enseñaron a cocinar los mejores tamales y los papás cuando eran niños y soñaban con inventar máquinas. Gael miró las fotos y se dio cuenta de algo asombroso: aunque todos eran diferentes, tenían la misma chispa alegre en los ojos y el mismo deseo de ayudarse siempre que alguien enfrentaba un reto.',
      pedagogicalExplanation: 'La familia es el primer grupo social al que pertenecemos. En la familia aprendemos los valores más importantes: decir la verdad, pedir por favor, dar las gracias, compartir los juguetes y cuidar a quien está enfermo. Hay muchas formas de familias (grandes con muchos primos, pequeñas de dos personas, o que viven con los abuelos), pero todas comparten lo más valioso: el amor, la protección y el respeto mutuo.',
      vocabulary: [
        { term: 'Familia', definition: 'Grupo de personas unidas por lazos de amor, parentesco y convivencia que se cuidan mutuamente.', childFriendlyExample: 'Tu familia es tu refugio seguro en todo momento.' },
        { term: 'Convivencia armónica', definition: 'Vivir juntos en paz, respetando las reglas del hogar y dialogando cuando hay desacuerdos.', childFriendlyExample: 'Escuchar sin gritar cuando jugamos es practicar la convivencia armónica.' },
        { term: 'Solidaridad familiar', definition: 'Apoyar con cariño y entusiasmo a un miembro de la familia cuando necesita ayuda.', childFriendlyExample: 'Ayudar a poner la mesa o recoger los platos es un acto de solidaridad.' }
      ],
      contextualizedExample: 'Cuando en casa todos colaboran: mamá y papá cocinan, los hijos ordenan su habitación y los abuelos cuentan relatos, ¡la casa funciona como una tripulación perfecta!',
      socraticQuestions: [
        '¿Por qué crees que ningún ser humano puede crecer solo en el mundo sin el cuidado de una familia o tutores?',
        '¿Qué pasa en un equipo deportivo si cada jugador quiere patear la pelota para su lado? ¿Se parece eso a lo que ocurre en una familia cuando no nos escuchamos?',
        'Si pudieras regalarle una medalla de honor a tu familia, ¿por qué motivo especial se la entregarías hoy?'
      ],
      practicalActivity: {
        title: 'El escudo heráldico de la familia Andrade',
        instructions: [
          'Dibuja un escudo grande en una hoja dividido en 4 cuadrantes.',
          'En el cuadrante 1: dibuja la comida o platillo favorito que disfrutan juntos.',
          'En el cuadrante 2: dibuja el lugar del Ecuador o parque que más les gusta visitar.',
          'En el cuadrante 3: escribe el valor principal de su hogar (ejemplo: Honestidad, Amor, Alegría).',
          'En el cuadrante 4: dibuja una actividad divertida que hacen juntos en familia.',
          'Escribe en la parte superior el lema de tu familia con letras grandes.'
        ],
        materials: ['Hoja de cartulina', 'Lápices de colores y marcadores', 'Regla']
      },
      applicationActivity: {
        title: 'El pacto del buen tripulante en casa',
        task: 'Escribe una lista de 3 compromisos diarios que Gael cumplirá con alegría para ayudar a la convivencia armónica en su hogar (ej: tender la cama, guardar los legos después de jugar, dar un abrazo de buenos días).',
        deliverable: 'Ficha de compromisos firmada por Gael y sus padres con casillas de verificación para la semana.'
      },
      formativeEvaluation: {
        description: 'Reconocimiento del rol familiar, empatía intrafamiliar y compromiso activo en las tareas del hogar.',
        expectedEvidence: 'Gael presenta su escudo heráldico explicando con orgullo las tradiciones y valores que unen a su familia.'
      },
      evaluationRubric: {
        criterion: 'Reconocimiento de la familia y prácticas de convivencia armónica (CS.2.1.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Nombra a los miembros de su familia pero no identifica responsabilidades compartidas.' },
          { level: 'En desarrollo', descriptor: 'Reconoce la importancia del afecto familiar y colabora en el hogar con recordatorios frecuentes.' },
          { level: 'Consolidado', descriptor: 'Valora con madurez las tradiciones y lazos de su familia, diseña su escudo con creatividad y propone compromisos de ayuda mutua espontánea.' }
        ]
      },
      expectedFeedback: '¡Qué hermoso homenaje a tu hogar, Gael! Tu escudo familiar refleja valores muy nobles y tu lista de compromisos demuestra que eres un gran tripulante de vida. ¡Diego Mapamundi te felicita!',
      difficultyAdaptation: 'Proporcionar una plantilla del escudo ya dibujada con siluetas guía para facilitar el dibujo y la escritura.',
      advancedExtension: 'Gael entrevista a uno de sus abuelos o padres preguntándoles qué era lo más divertido que hacían en familia cuando no existían los celulares ni el internet.',
      resources: [
        {
          id: 'class-soc-gael-01-res-1',
          type: 'external_link',
          title: 'Educarchile: La Familia y la Vida en Comunidad',
          url: 'https://www.educarchile.cl/',
          description: 'Recurso abierto latinoamericano para educación básica sobre convivencia, roles familiares y afecto.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-soc-gael-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — El Escudo de Mi Familia',
          url: '/api/v1/academic/classes/class-soc-gael-01/guide.pdf',
          description: 'Plantilla gráfica de escudo heráldico y pacto de convivencia para 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-soc-gael-01-act-1',
          title: 'La Caja de las Fotografías',
          description: 'Reflexiona sobre cómo los recuerdos y valores familiares nos dan identidad y fuerza.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-soc-gael-01-act-2',
          title: 'Diseño del Escudo Familiar',
          description: 'Dibuja los 4 cuadrantes con los gustos, valores y tradiciones de tu hogar.',
          type: 'project',
          points: 15,
          completed: false
        },
        {
          id: 'class-soc-gael-01-act-3',
          title: 'Pacto de Convivencia Semanal',
          description: 'Redacta y firma los 3 compromisos de colaboración para la semana.',
          type: 'practice',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Comparte el escudo terminado con tu familia en la cena y pide a cada miembro que agregue una palabra bonita al lema.',
      reflectionPrompt: '¿Qué es lo que más te hace sonreír cuando estás con las personas que amas en casa?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_soc_gael_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-soc-gael-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-04-SOC', subjectCode: 'SOC-401', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-soc-gael-02',
      subjectId: 'soc-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-11',
      dayOfWeek: 'Viernes',
      scheduleTime: '10:00 - 10:45 (45 min)',
      unit: 'Unidad 1: Mi Comunidad, Mi Ciudad y los Tesoros del Ecuador',
      theme: 'Los héroes de mi comunidad: Servidores públicos, oficios y trabajo en equipo',
      objective: 'Identificar los servidores comunitarios (médicos, bomberos, policías, recolectores, profesores) y el valor de los servicios públicos en la ciudad y el campo.',
      learningPurpose: 'Aprender que vivir en sociedad significa cuidarnos unos a otros y valorar el trabajo honesto y valiente de todas las profesiones y oficios.',
      competencyDcd: 'CS.2.2.5 — Opinar acerca de las oportunidades y amenazas de la ubicación de su vivienda, barrio, parroquia y cantón, identificando los servicios públicos indispensables (agua, luz, salud, educación).',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Hola de nuevo, explorador cívico Gael! Cuando abres la llave del agua y sale un chorro fresco y transparente, o cuando enciendes la luz en la noche para leer tu libro, ¿te has preguntado cuántas personas trabajaron para que eso fuera posible? En nuestro barrio y ciudad hay cientos de personas con profesiones y oficios que hacen que la vida funcione: ¡son los héroes de la comunidad!',
      reading: 'Un día sin servidores en Villa Esperanza: Una mañana de sol, los habitantes de Villa Esperanza se despertaron y notaron algo extraño: las calles estaban llenas de hojas caídas porque nadie pasó a barrer, el semáforo de la esquina no funcionaba, y un gatito travieso subido a un tejado alto maullaba asustado sin que nadie viniera a rescatarlo. Los vecinos comprendieron al instante que una ciudad no son solo casas y autos de cemento: una ciudad vive gracias al bombero que rescata con valentía, al recolector de basura que mantiene limpias las aceras, al doctor y enfermera que curan con ternura, a los policías que vigilan la paz y a los agricultores del campo que siembran las papas y frutas que llegan a nuestro plato.',
      pedagogicalExplanation: 'Los servidores comunitarios son personas que realizan un trabajo dedicado a beneficiar a todos los ciudadanos. Se dividen en dos grupos: 1) Servidores públicos: trabajan en servicios esenciales pagados por la comunidad a través de impuestos (bomberos, policías, médicos de hospitales públicos, maestros de escuelas fiscales). 2) Trabajadores de oficios y comercios privados: panaderos, albañiles, mecánicos, electricistas y agricultores. Todos son igualmente valiosos y merecen nuestro respeto y gratitud.',
      vocabulary: [
        { term: 'Servidor público', definition: 'Persona que trabaja para brindar un servicio necesario y seguro a toda la comunidad.', childFriendlyExample: 'La doctora del centro de salud es una servidora pública.' },
        { term: 'Servicios básicos', definition: 'Las redes indispensables de agua potable, electricidad, alcantarillado, salud y recolección de basura.', childFriendlyExample: 'Tener agua limpia en casa es un servicio básico indispensable.' },
        { term: 'Oficio', definition: 'Una actividad manual o técnica aprendida con la práctica y la experiencia.', childFriendlyExample: 'La carpintería y la zapatería son oficios dignos y hermosos.' }
      ],
      contextualizedExample: 'En la ciudad de Quito, cuando suena la sirena del cuerpo de bomberos, los autos abren paso en la avenida para que puedan llegar a tiempo a apagar un incendio forestal.',
      socraticQuestions: [
        '¿Qué pasaría en una ciudad durante un mes entero si los recolectores de basura dejaran de trabajar?',
        '¿Cuál es la diferencia entre el trabajo que hace un agricultor en el campo y el que hace un comerciante en el mercado?',
        '¿Qué servidor comunitario crees que tiene el trabajo más difícil y por qué?'
      ],
      practicalActivity: {
        title: 'El mapa de servicios de mi barrio',
        instructions: [
          'Dibuja un croquis sencillo de las 4 cuadras alrededor de tu casa.',
          'Coloca con símbolos de colores los servicios que existen cerca: una cruz roja (farmacia o médico), un libro (escuela), un escudo (estación de policía o vigilancia), una canasta (tienda o mercado).',
          'Identifica cuál es el número telefónico de emergencia nacional para llamar a los bomberos o ambulancia (¡el 911!).'
        ],
        materials: ['Hoja de papel bond', 'Lápices de colores', 'Regla']
      },
      applicationActivity: {
        title: 'Carta de agradecimiento a un héroe comunitario',
        task: 'Escribe una carta corta de 4 oraciones dirigida a un servidor de la comunidad (puede ser el cartero, el recolector de basura, un médico o un policía) dándole las gracias por su labor diaria con un dibujo alusivo.',
        deliverable: 'Carta ilustrada con redacción infantil propia y firma de Gael.'
      },
      formativeEvaluation: {
        description: 'Reconocimiento del rol cívico y valoración ética del trabajo comunitario.',
        expectedEvidence: 'Gael identifica correctamente los servicios básicos indispensables y expresa empatía y respeto hacia los trabajadores comunitarios.'
      },
      evaluationRubric: {
        criterion: 'Identificación de servicios públicos y valoración comunitaria (CS.2.2.5)',
        indicators: [
          { level: 'Inicial', descriptor: 'Reconoce profesiones típicas como policías y bomberos pero no asocia los servicios básicos con el bienestar común.' },
          { level: 'En desarrollo', descriptor: 'Describe el rol de médicos y bomberos, reconociendo el número de emergencias 911 con ayuda.' },
          { level: 'Consolidado', descriptor: 'Explica con soltura la interdependencia entre la ciudad y el campo, valora la dignidad de todos los oficios y redacta una carta de agradecimiento sincera y elocuente.' }
        ]
      },
      expectedFeedback: '¡Extraordinaria sensibilidad ciudadana, Gael! Tu carta al servidor comunitario tiene un mensaje muy cálido y humano. ¡Eres un ciudadano de primera clase!',
      difficultyAdaptation: 'Jugar a relacionar tarjetas con imágenes: unir el camión de bomberos con la manguera y el fuego; el estetoscopio con el doctor.',
      advancedExtension: 'Gael investiga cómo viaja el agua desde los páramos andinos (reservorios) a través de tuberías gigantes hasta llegar al grifo de su cocina en la ciudad.',
      resources: [
        {
          id: 'class-soc-gael-02-res-1',
          type: 'external_link',
          title: 'ECU 911: Educación Infantil en Emergencias y Seguridad',
          url: 'https://www.ecu911.gob.ec/',
          description: 'Portal oficial del Servicio Integrado de Seguridad del Ecuador con recomendaciones cívicas para niños.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-soc-gael-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Héroes Sin Capa',
          url: '/api/v1/academic/classes/class-soc-gael-02/guide.pdf',
          description: 'Ficha de trabajo con croquis de barrio y plantilla para la carta de gratitud cívica en 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-soc-gael-02-act-1',
          title: 'La Mañana en Villa Esperanza',
          description: 'Analiza qué servicios hicieron falta en el pueblo y por qué la comunidad se detuvo.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-soc-gael-02-act-2',
          title: 'Croquis del Barrio y Emergencias',
          description: 'Dibuja el mapa de tu entorno cercano e incluye el número 911 destacado.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-soc-gael-02-act-3',
          title: 'Carta al Héroe Comunitario',
          description: 'Redacta e ilustra la carta de gratitud para un servidor público de tu cantón.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Cuando veas pasar al recolector de basura o a un policía en la calle, regálale una sonrisa y dile "¡muchas gracias por su trabajo!".',
      reflectionPrompt: 'Si tú fueras el alcalde de tu cantón por un día, ¿qué servicio público mejorarías primero para los niños?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_soc_gael_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-soc-gael-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-04-SOC', subjectCode: 'SOC-401', unitNumber: 1, sessionNumber: 2 }
    },
    {
      id: 'class-soc-gael-03',
      subjectId: 'soc-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-16',
      dayOfWeek: 'Miércoles',
      scheduleTime: '10:00 - 10:45 (45 min)',
      unit: 'Unidad 1: Mi Comunidad, Mi Ciudad y los Tesoros del Ecuador',
      theme: 'El mapa del tesoro: Mi cantón, mi provincia y las cuatro regiones del Ecuador',
      objective: 'Reconocer la división territorial de Ecuador en cantones, provincias y las 4 regiones naturales (Costa, Sierra, Amazonía y Galápagos).',
      learningPurpose: 'Sentir orgullo por la riqueza geográfica y cultural del Ecuador y aprender a orientarnos con los puntos cardinales en cualquier lugar.',
      competencyDcd: 'CS.2.2.1 — Reconocer y ubicar la vivienda, la escuela y la localidad a partir de puntos de referencia y representaciones gráficas (croquis, planos y mapas).',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Abre bien los ojos, cartógrafo Gael! Si pudieras subirte a un cohete espacial y mirar hacia abajo sobre la mitad del planeta, verías un país pequeño pero brillante como una esmeralda: ¡nuestro amado ECUADOR! En nuestro país puedes desayunar frente al mar con delfines en la Costa, almorzar al pie de un volcán nevado en la Sierra, merendar en la selva mágica de la Amazonía y soñar con tortugas gigantes en las Islas Galápagos. ¡Hoy aprenderemos a leer mapas como verdaderos navegantes!',
      reading: 'El vuelo del cóndor sobre el mapa tricolor: Don Cóndor invitó a Gael a un vuelo panorámico por el Ecuador. Volaron primero hacia el Oeste, donde las olas del océano Pacífico bañan las playas doradas de la Costa (Región Litoral). Luego ascendieron hacia el centro, donde la majestuosa Cordillera de los Andes levanta volcanes como el Chimborazo y el Cotopaxi rodeados de valles fértiles (Región Interandina o Sierra). Siguieron hacia el Este, donde ríos caudalosos como el Napo cruzan un manto verde infinito de árboles gigantes (Región Amazónica). Y finalmente, a 1.000 kilómetros mar adentro hacia el poniente, contemplaron las Islas Galápagos (Región Insular), el laboratorio natural más famoso del planeta. Cada región tiene provincias, cantones y parroquias donde viven ecuatorianos trabajadores que cuidan nuestra patria.',
      pedagogicalExplanation: 'Para ubicarnos en el espacio usamos los 4 puntos cardinales: Norte (arriba), Sur (abajo), Este u Oriente (por donde sale el sol cada mañana) y Oeste u Occidente (por donde se oculta el sol en el mar). El Ecuador se organiza en: 4 regiones naturales, 24 provincias (como Pichincha, Guayas, Azuay, Napo, Galápagos), y cada provincia se divide en cantones y parroquias.',
      vocabulary: [
        { term: 'Puntos cardinales', definition: 'Las 4 direcciones principales que sirven para orientarse en la Tierra: Norte, Sur, Este y Oeste.', childFriendlyExample: 'Si abres tus brazos y señalas con la mano derecha por donde sale el sol, estás señalando el Este.' },
        { term: 'Cantón', definition: 'División territorial formada por varias parroquias urbanas y rurales gobernada por un Municipio y un Alcalde.', childFriendlyExample: 'El Distrito Metropolitano de Quito es un cantón.' },
        { term: 'Provincia', definition: 'Unión de varios cantones que comparten una misma zona geográfica e historia.', childFriendlyExample: 'Pichincha es una provincia de la Sierra ecuatoriana.' }
      ],
      contextualizedExample: 'Si vives en Quito, tu parroquia puede ser Cumbayá, tu cantón es Quito, tu provincia es Pichincha, tu región es la Sierra y tu país es el Ecuador.',
      socraticQuestions: [
        'Si te despiertas al amanecer y ves por qué montaña sale el sol, ¿hacia qué punto cardinal estás mirando?',
        '¿Por qué crees que en un país tan pequeño como Ecuador tenemos climas tan diferentes (frío en el páramo y calor en la playa)?',
        '¿Cuál de las 4 regiones del Ecuador te despierta mayor curiosidad por explorar y qué llevarías en tu mochila?'
      ],
      practicalActivity: {
        title: 'La rosa de los vientos humana en el patio',
        instructions: [
          'Párate en medio del patio o sala temprano en la mañana.',
          'Apunta con tu brazo derecho hacia el lugar donde sale el sol (ESTE).',
          'Extiende tu brazo izquierdo hacia donde se oculta el sol (OESTE).',
          'Tu frente apunta exactamente hacia el NORTE.',
          'Tu espalda señala hacia el SUR.',
          'Gira hacia cada punto cardinal mientras dices en voz alta una ciudad o región del Ecuador que queda en esa dirección.'
        ],
        materials: ['Tu propio cuerpo orientado', 'La luz del sol de la mañana', 'Brújula opcional']
      },
      applicationActivity: {
        title: 'El mapa de las 4 regiones a cuatro colores',
        task: 'Dibuja la silueta del Ecuador y las Islas Galápagos. Pinta la Costa de amarillo claro, la Sierra de café o naranja montañoso, la Amazonía de verde selva y Galápagos de azul marino. Ubica la capital Quito con una estrella roja brillante.',
        deliverable: 'Mapa del Ecuador coloreado por regiones con su rosa de los vientos en una esquina.'
      },
      formativeEvaluation: {
        description: 'Ubicación geográfica, orientación espacial con puntos cardinales y reconocimiento de la división regional.',
        expectedEvidence: 'Gael orienta su cuerpo hacia el Este con la salida del sol y ubica las 4 regiones en el mapa sin dudar.'
      },
      evaluationRubric: {
        criterion: 'Ubicación espacial y división territorial del Ecuador (CS.2.2.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Identifica el mapa del Ecuador pero confunde el Este con el Oeste o las regiones naturales.' },
          { level: 'En desarrollo', descriptor: 'Ubica la Sierra y la Costa pero requiere apoyo para ubicar Galápagos y orientarse con los puntos cardinales.' },
          { level: 'Consolidado', descriptor: 'Domina la rosa de los vientos, ubica con exactitud las 4 regiones naturales y su provincia en el mapa, y describe con entusiasmo la diversidad geográfica nacional.' }
        ]
      },
      expectedFeedback: '¡Magistral graduación geográfica, Capitán Gael! Has conquistado el mapa del Ecuador y la rosa de los vientos. ¡Ya tienes el timón firme para viajar por todo nuestro país!',
      difficultyAdaptation: 'Pegar 4 letreros de colores en las paredes de la habitación con las letras N, S, E, O para practicar giros de brújula.',
      advancedExtension: 'Gael investiga por qué la cima del volcán Chimborazo es el punto más cercano al Sol en todo el planeta Tierra (debido al ensanchamiento de la línea ecuatorial).',
      resources: [
        {
          id: 'class-soc-gael-03-res-1',
          type: 'external_link',
          title: 'Instituto Geográfico Militar (IGM): Cartografía Infantil del Ecuador',
          url: 'https://www.igm.gob.ec/',
          description: 'Recurso oficial cartográfico con mapas temáticos y educativos de las provincias y regiones del Ecuador.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-soc-gael-03-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Mi Mapa del Tesoro Ecuatoriano',
          url: '/api/v1/academic/classes/class-soc-gael-03/guide.pdf',
          description: 'Plantilla cartográfica con silueta del Ecuador y rosa de los vientos para colorear en 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-soc-gael-03-act-1',
          title: 'El Vuelo del Cóndor',
          description: 'Identifica las características geográficas de las 4 regiones visitadas con el cóndor.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-soc-gael-03-act-2',
          title: 'Laboratorio de la Brújula Solar',
          description: 'Realiza la dinámica corporal de orientación con los 4 puntos cardinales en el patio.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-soc-gael-03-act-3',
          title: 'Póster Cartográfico de las 4 Regiones',
          description: 'Pinta el mapa del Ecuador a cuatro colores y señala la capital con estrella roja.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Averigua en qué provincia nacieron tus papás y tus abuelos y ubícalas en tu mapa con un puntito de color.',
      reflectionPrompt: '¿Qué significa para ti ser un niño ecuatoriano que cuida su tierra y a su gente?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_soc_gael_03.pdf',
      guideUrl: '/api/v1/academic/classes/class-soc-gael-03/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-04-SOC', subjectCode: 'SOC-401', unitNumber: 1, sessionNumber: 3 }
    }
  ]
};

