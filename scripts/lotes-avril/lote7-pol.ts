import { AvrilCurriculumLote } from './lote1-len';

export const AVRIL_LOTE_07_POL: AvrilCurriculumLote = {
  loteId: 'LOTE-AVRIL-07-POL',
  loteNumber: 7,
  subjectCode: 'POL-801',
  subjectName: 'Ciencias Políticas',
  category: 'COMPLEMENTARIA_SIGLO_XXI',
  unitTitle: 'Unidad 1: El Estado Republicano y la División de Poderes: Arquitectura Constitucional',
  unitNumber: 1,
  classesCount: 2,
  classes: [
    {
      id: 'class-pol-avril-01',
      subjectId: 'pol-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-10',
      dayOfWeek: 'Jueves',
      scheduleTime: '10:00 - 10:45 (45 min)',
      unit: 'Unidad 1: El Estado Republicano y la División de Poderes: Arquitectura Constitucional',
      theme: 'El Estado de Derecho y la división republicana de poderes (Montesquieu y la Constitución del Ecuador)',
      objective: 'Analizar los fundamentos teóricos del Estado constitucional de derechos y examinar la doctrina de la separación y control mutuo de poderes (checks and balances) establecida en la Constitución de la República del Ecuador.',
      learningPurpose: 'Comprender que la concentración excesiva del poder en una sola persona o grupo engendra inevitablemente la tiranía y la vulneración de libertades, reconociendo en la institucionalidad republicana la garantía suprema de la dignidad humana.',
      competencyDcd: 'POL.8.1 — Analizar el principio de separación y equilibrio de poderes (Ejecutivo, Legislativo, Judicial, Electoral y Transparencia) como salvaguarda frente al autoritarismo.',
      officialSource: 'Currículo Complementario ALSIZ — Formación Ciudadana y Democracia Republicana / Constitución del Ecuador (2008)',
      introduction: '¡Bienvenida al parlamento de Ciencias Políticas, apreciada Avril! Te saluda el Lic. Rodrigo Mendoza. A lo largo de los siglos, la humanidad sufrió bajo monarcas absolutistas que proclamaban "El Estado soy yo" y cuya voluntad caprichosa bastaba para encarcelar inocentes o despojar a los campesinos de sus tierras. En el siglo XVIII, el filósofo francés Barón de Montesquieu enunció una verdad universal: "Todo hombre que tiene poder tiende a abusar de él; va hasta donde encuentra límites. Para que no se pueda abusar del poder, es preciso que el poder frene al poder". Con esta idea nació la REPÚBLICA: un sistema donde no gobiernan los caprichos de los reyes, sino la majestad de la LEY. ¡Hoy exploraremos cómo los cinco poderes del Estado ecuatoriano deben vigilarse y equilibrarse mutuamente para salvaguardar la libertad de todos los ciudadanos!',
      reading: 'El Juicio del Roble y la balanza de Montesquieu: En su obra cumbre "El espíritu de las leyes" (1748), Montesquieu advirtió con escalofriante lucidez: "Cuando en la misma persona o en el mismo cuerpo de magistrados la potestad legislativa se reúne con la potestad ejecutiva, no hay libertad, porque puede temerse que el mismo monarca o el mismo senado haga leyes tiránicas para ejecutarlas tiránicamente. Tampoco hay libertad si la potestad de juzgar no está separada de la potestad legislativa y de la ejecutiva". La historia ha corroborado esta advertencia una y otra vez: cuando los jueces pierden su independencia y se convierten en sirvientes del presidente de turno, la justicia se transforma en persecución política. En una república sana, cada poder del Estado es como una pata de una mesa firme: si una pata intenta crecer desmesuradamente o doblegar a las demás, toda la mesa se desequilibra y la libertad ciudadana se hace pedazos contra el suelo.',
      pedagogicalExplanation: 'La Constitución ecuatoriana de 2008 establece un modelo republicano original estructurado en cinco funciones o poderes del Estado: 1) Función Ejecutiva (Presidente y ministerios: administra el Estado y ejecuta políticas públicas). 2) Función Legislativa (Asamblea Nacional: debate, redacta leyes y fiscaliza a las demás autoridades). 3) Función Judicial y Justicia Indígena (Corte Nacional, jueces y tribunales: administra justicia imparcialmente con base en la ley). 4) Función Electoral (Consejo Nacional Electoral y Tribunal Contencioso Electoral: garantiza elecciones limpias y transparencia del sufragio). 5) Función de Transparencia y Control Social (Consejo de Participación Ciudadana, Contraloría, Defensoría del Pueblo y Superintendencias: audita la gestión pública y lucha contra la corrupción). El principio anglosajón de "frenos y contrapesos" (checks and balances) exige que ninguna de estas funciones pueda avasallar a las otras.',
      vocabulary: [
        { term: 'Estado de Derecho', definition: 'Principio de gobierno según el cual todas las personas, instituciones y entidades públicas y privadas, incluido el propio Estado, están sometidas a leyes que se promulgan públicamente y se hacen cumplir por igual.', childFriendlyExample: 'Significa que ni el presidente de la república está por encima de la ley; si comete un delito, un juez puede juzgarlo.' },
        { term: 'Frenos y Contrapesos (Checks and Balances)', definition: 'Mecanismo constitucional que permite a cada rama del gobierno limitar y fiscalizar los poderes de las otras ramas para evitar la tiranía.', childFriendlyExample: 'El presidente propone una ley, pero la Asamblea puede rechazarla, y la Corte Constitucional puede anularla si viola los derechos.' },
        { term: 'Tiranía / Autocracia', definition: 'Régimen de gobierno en el cual el poder político supremo está concentrado en una sola persona o partido sin contrapesos constitucionales ni libertades civiles.', childFriendlyExample: 'Un gobierno donde el líder cambia las leyes a su gusto y encarcela a los periodistas que lo critican.' }
      ],
      contextualizedExample: 'Cuando la Corte Constitucional del Ecuador declara que un decreto presidencial es inconstitucional porque vulnera el derecho al agua o a la consulta previa de las comunidades indígenas, está operando el principio republicano de contrapeso frente al poder ejecutivo.',
      socraticQuestions: [
        '¿Por qué crees que a un gobernante autoritario le incomoda profundamente que los jueces y tribunales sean completamente independientes de su despacho?',
        'Si la mayoría de la población vota por una ley que elimine la libertad de expresión de una minoría, ¿por qué la Constitución debe proteger a esa minoría frente a la tiranía de la mayoría?',
        '¿Cuál es la diferencia sustancial entre vivir bajo el mandato de una persona (monarquía absoluta) y vivir bajo el mandato de una Constitución votada por el pueblo?'
      ],
      practicalActivity: {
        title: 'El Juego del Juicio Constitucional: Simulación de Frenos y Contrapesos',
        instructions: [
          'Lee el siguiente caso hipotético de dilema republicano:',
          '  "El Presidente de la República emite un Decreto de Emergencia que ordena confiscar todas las imprentas de periódicos privados para imprimir únicamente comunicados oficiales del gobierno, argumentando razones de seguridad nacional".',
          'En tu cuaderno de Ciencias Políticas, analiza el caso asumiendo tres roles institucionales consecutivos:',
          '  1) Rol de Asambleísta Nacional: ¿Qué juicio político o llamado a comparecencia puedes activar?',
          '  2) Rol de Jueza Constitucional: ¿Qué artículo sobre derechos fundamentales y libertad de expresión aplicarías para suspender el decreto?',
          '  3) Rol de Ciudadana en el Consejo de Transparencia: ¿Qué medida de vigilancia ciudadana propondrías?',
          'Sintetiza tus respuestas en una tabla comparativa demostrando cómo el sistema de contrapesos frena el abuso.'
        ],
        materials: ['Texto de la Constitución del Ecuador (digital o impreso)', 'Cuaderno de Ciencias Políticas', 'Lápiz y regla']
      },
      applicationActivity: {
        title: 'Organigrama Constitucional Ilustrado de las 5 Funciones del Estado',
        task: 'Dibuja un diagrama arquitectónico de las cinco funciones del Estado ecuatoriano. Señala para cada función: su titular máximo, su propósito central y una flecha bidireccional indicando cómo fiscaliza a otra función (por ejemplo: la Asamblea fiscaliza al Ejecutivo; la Corte Constitucional controla a la Asamblea).',
        deliverable: 'Diagrama infográfico en cartulina o formato digital con simbología clara y justificación de contrapesos.'
      },
      formativeEvaluation: {
        description: 'Comprensión del concepto de Estado de Derecho, distinción de las 5 funciones estatales del Ecuador y valoración de la independencia judicial.',
        expectedEvidence: 'Avril explica con precisión por qué la concentración del poder atenta contra la libertad y describe los mecanismos de contrapeso constitucional entre funciones.'
      },
      evaluationRubric: {
        criterion: 'Análisis del Estado de Derecho y división de poderes (POL.8.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Confunde los poderes del Estado y asume que el presidente tiene autoridad absoluta sobre jueces y asambleístas.' },
          { level: 'En desarrollo', descriptor: 'Identifica las funciones del Estado pero le cuesta explicar cómo funciona el mecanismo de control mutuo (frenos y contrapesos).' },
          { level: 'Consolidado', descriptor: 'Analiza con madurez filosófica el pensamiento de Montesquieu, describe las 5 funciones del Estado ecuatoriano y fundamenta la supremacía constitucional con ejemplos jurídicos concretos.' }
        ]
      },
      expectedFeedback: 'Criterio cívico e institucional impecable, Avril. Has articulado el pensamiento de Montesquieu con la realidad constitucional ecuatoriana con una lucidez admirable. Comprender los frenos y contrapesos es el mayor escudo de una ciudadana libre frente a la arbitrariedad.',
      difficultyAdaptation: 'Utilizar tarjetas ilustradas de cada una de las 5 funciones con preguntas guía para emparejar la función con su respectivo contrapeso.',
      advancedExtension: 'Avril investiga la figura del "Presidencialismo Reforzado" en América Latina y redacta un ensayo breve sobre cómo evitar que la figura presidencial eclipse a las demás funciones democráticas.',
      resources: [
        {
          id: 'class-pol-avril-01-res-1',
          type: 'simulator',
          title: 'Asamblea Nacional del Ecuador — Portal Educativo y Constitución Interactiva',
          url: 'https://www.asambleanacional.gob.ec/',
          description: 'Portal legislativo oficial con acceso al texto íntegro de la Constitución de la República y guías cívicas para jóvenes.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-pol-avril-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — División de Poderes y Estado de Derecho',
          url: '/api/v1/academic/classes/class-pol-avril-01/guide.pdf',
          description: 'Ficha de trabajo con casos de estudio constitucional, dilemas de frenos y contrapesos y rúbrica socrática.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-pol-avril-01-act-1',
          title: 'La Advertencia de Montesquieu',
          description: 'Lee el fragmento de "El espíritu de las leyes" y reflexiona sobre el peligro del poder sin límites.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-pol-avril-01-act-2',
          title: 'Simulación de Frenos y Contrapesos',
          description: 'Resuelve el dilema del decreto presidencial asumiendo los roles de legisladora, jueza y ciudadana.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-pol-avril-01-act-3',
          title: 'Organigrama de las 5 Funciones del Estado',
          description: 'Diseña la infografía arquitectónica de los poderes del Estado y sus mecanismos mutuos de fiscalización.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Conversa con tus padres o familiares sobre qué noticia reciente del país involucró a la Asamblea Nacional o a la Corte Constitucional y anota de qué trataba.',
      reflectionPrompt: '¿Cómo puedes tú, desde tu vida diaria escolar, practicar el respeto a las reglas justas y defender a quien sufre una injusticia?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_pol_avril_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-pol-avril-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-07-POL', subjectCode: 'POL-801', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-pol-avril-02',
      subjectId: 'pol-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-11',
      dayOfWeek: 'Viernes',
      scheduleTime: '12:15 - 13:00 (45 min)',
      unit: 'Unidad 1: El Estado Republicano y la División de Poderes: Arquitectura Constitucional',
      theme: 'Ciudadanía activa, deliberación pública y mecanismos de participación ciudadana',
      objective: 'Examinar los mecanismos de democracia directa y deliberativa consagrados en el marco jurídico ecuatoriano (cabildo popular, silla vacía, consulta popular y veedurías ciudadanas), evaluando su efectividad para fiscalizar la gestión pública y construir el bien común.',
      learningPurpose: 'Comprender que la democracia no se reduce a votar cada cuatro años en una urna, sino que exige una participación cívica continua, informada y valiente en la toma de decisiones comunitarias.',
      competencyDcd: 'POL.8.2 — Examinar los mecanismos de participación ciudadana (cabildo popular, silla vacía, consulta previa, rendición de cuentas) y el rol de la sociedad civil en la fiscalización del bien común.',
      officialSource: 'Currículo Complementario ALSIZ — Formación Ciudadana y Democracia Republicana / Ley Orgánica de Participación Ciudadana',
      introduction: '¡Feliz viernes de debate cívico, Avril! Te saluda el Lic. Rodrigo Mendoza. Muchas personas confunden erróneamente la palabra "democracia" con una simple fiesta electoral donde se deposita un papel doblado en una urna de cartón cada cuatro años, para luego desentenderse por completo de lo que hacen los gobernantes. Esa es una democracia pasiva y conformista. En Atenas clásica y en las comunidades andinas ancestrales mediante el "minga" y la asamblea comunitaria, la democracia siempre fue DELIBERATIVA: los ciudadanos se reúnen cara a cara en la plaza pública, exponen argumentos racionales, escuchan con respeto las posturas contrarias y fiscalizan cómo se gasta hasta el último centavo de los recursos públicos. Hoy conoceremos las herramientas legales que tienes como ciudadana para hacer escuchar tu voz con fuerza y legitimidad.',
      reading: 'La Silla Vacía en el Municipio: Una conquista cívica ecuatoriana: En la Constitución de 2008 y en el Código Orgánico de Organización Territorial (COOTAD), el Ecuador consagró una de las figuras más innovadoras del derecho municipal del mundo: la "Silla Vacía". Este mecanismo establece que en todas las sesiones de los Concejos Municipales y Consejos Provinciales, debe dejarse una silla vacía física en la mesa de deliberación de las autoridades. Cualquier ciudadana, líder barrial o representante de una organización comunitaria que se haya acreditado previamente puede sentarse en esa silla con voz y voto cuando se debata un tema que afecte directamente a su barrio o sector (por ejemplo: la construcción de un parque infantil, la recolección de basura o la protección de una quebrada). La Silla Vacía es la prueba palpable de que la soberanía no le pertenece a los políticos electos, sino que radica de manera inalienable en el pueblo soberano.',
      pedagogicalExplanation: 'La teoría democrática distingue tres modalidades de ejercicio del poder ciudadano: 1) Democracia Representativa: elección de dignatarios mediante el sufragio universal, secreto y obligatorio. 2) Democracia Directa: pronunciamiento directo del pueblo sobre leyes o decisiones trascendentales a través de referéndums, consultas populares y plebiscitos. 3) Democracia Comunitaria y Deliberativa: participación constante de la sociedad civil en la formulación, ejecución y control de políticas públicas mediante instrumentos legales como: Cabildos Populares (asambleas abiertas barriales), Silla Vacía (voto ciudadano en concejos locales), Veedurías Ciudadanas (comisiones cívicas independientes que auditan obras públicas para evitar sobreprecios y corrupción) y Rendición de Cuentas obligatoria de las autoridades.',
      vocabulary: [
        { term: 'Silla Vacía', definition: 'Mecanismo constitucional en Ecuador que permite a ciudadanos acreditados ocupar un puesto con voz y voto en las sesiones de los gobiernos locales cuando se discutan temas de interés colectivo.', childFriendlyExample: 'Una vecina del barrio se sienta en la mesa de los concejales y vota a favor de crear una ciclovía escolar.' },
        { term: 'Veeduría Ciudadana', definition: 'Modalidad de control social mediante la cual grupos organizados de ciudadanos vigilan, fiscalizan y auditan la ejecución de proyectos, contratos y servicios públicos.', childFriendlyExample: 'Un grupo de madres y padres de familia que revisa que la construcción de la nueva escuela se haga con cemento de calidad y a tiempo.' },
        { term: 'Deliberación Pública', definition: 'Proceso de discusión informada, racional y argumentada entre ciudadanos con puntos de vista diversos para alcanzar consensos orientados al bien común.', childFriendlyExample: 'Debatir en una asamblea barrial la mejor manera de iluminar el parque sin insultos y con datos objetivos.' }
      ],
      contextualizedExample: 'En la parroquia rural de Nayón, los vecinos organizaron una veeduría ciudadana comunitaria para vigilar los trabajos de alcantarillado y pavimentación de la vía principal, logrando que la constructora corrigiera grietas prematuras sin costo adicional para los fondos públicos.',
      socraticQuestions: [
        '¿Por qué una democracia donde los ciudadanos solo votan pero nunca fiscalizan las obras ni asisten a cabildos está en grave riesgo de degenerar en corrupción endémica?',
        'Si en una asamblea escolar o barrial una persona grita más fuerte que las demás pero no presenta datos ni argumentos lógicos, ¿cómo debe actuar una presidenta de asamblea para garantizar una deliberación justa?',
        '¿Qué responsabilidades y deberes éticos asume un ciudadano cuando decide sentarse en la "Silla Vacía" de un municipio a votar sobre el presupuesto de toda la ciudad?'
      ],
      practicalActivity: {
        title: 'Simulación del Cabildo Barrial Juvenil: El Parque de la Biodiversidad',
        instructions: [
          'Contexto de la simulación: El Municipio de tu cantón tiene un presupuesto de $50.000 para un terreno baldío. Existen dos propuestas comunitarias enfrentadas:',
          '  - Propuesta A: Pavimentar una cancha de cemento y parqueaderos para 30 vehículos.',
          '  - Propuesta B: Crear un bosque urbano agroecológico con árboles nativos, huerto comunitario y biblioteca al aire libre.',
          'Asume el rol de representante de los jóvenes en la "Silla Vacía" del concejo cantonal.',
          'Redacta un discurso de deliberación pública de 3 minutos (1 página de cuaderno) estructurado en tres partes:',
          '  1) Saludo protocolar y acreditación de representación cívica.',
          '  2) Argumentación técnica y ecológica comparando los impactos de ambas propuestas a 10 años plazo.',
          '  3) Voto fundamentado con propuesta de veeduría ciudadana para vigilar la compra de las plantas nativas.'
        ],
        materials: ['Cuaderno de proyectos cívicos', 'Guía de argumentación ciudadana ALSIZ', 'Bolígrafo']
      },
      applicationActivity: {
        title: 'Diseño del Acta de Conformación de una Veeduría Ciudadana Escolar',
        task: 'Redacta un Acta de Conformación formal de una Veeduría Juvenil para tu entorno educativo (por ejemplo: para vigilar la calidad y variedad nutricional del refrigerio escolar, o para asegurar el buen mantenimiento de los equipos informáticos de la plataforma). Define: objeto de la veeduría, 3 integrantes con sus roles, cronograma de inspección y formato del informe final para los directivos.',
        deliverable: 'Acta de veeduría cívica redactada formalmente con firmas simbólicas y sellos de veedora independiente.'
      },
      formativeEvaluation: {
        description: 'Capacidad para discriminar formas de democracia, justificar la importancia de la deliberación cívica y estructurar mecanismos de control social ciudadano.',
        expectedEvidence: 'Avril argumenta con solidez la función de la Silla Vacía y las veedurías ciudadanas, demostrando un compromiso activo con el bien común y la transparencia.'
      },
      evaluationRubric: {
        criterion: 'Comprensión y aplicación de mecanismos de participación ciudadana (POL.8.2)',
        indicators: [
          { level: 'Inicial', descriptor: 'Reduce la ciudadanía al acto de votar y desconoce los mecanismos de democracia deliberativa en el Ecuador.' },
          { level: 'En desarrollo', descriptor: 'Reconoce la Silla Vacía o el cabildo pero le cuesta diseñar una veeduría concreta con indicadores de fiscalización verificables.' },
          { level: 'Consolidado', descriptor: 'Domina los fundamentos de la democracia deliberativa, redacta discursos cívicos persuasivos y estructura veedurías ciudadanas con rigor jurídico y sentido del bien común.' }
        ]
      },
      expectedFeedback: 'Extraordinaria vocación cívica y elocuencia democrática, Avril. Tu discurso para la Silla Vacía demostró cómo la juventud puede transformar su entorno con argumentos sólidos y apego a la legalidad republicana. ¡Ese es el liderazgo que nuestro país necesita!',
      difficultyAdaptation: 'Proporcionar una plantilla estructurada para el discurso con párrafos guiados ("Yo propongo... Porque los datos demuestran...").',
      advancedExtension: 'Avril investiga el origen de las consultas populares de iniciativa popular normativa en Suiza y las contrasta con los requisitos de recolección de firmas del Consejo Nacional Electoral (CNE) en Ecuador.',
      resources: [
        {
          id: 'class-pol-avril-02-res-1',
          type: 'simulator',
          title: 'Consejo de Participación Ciudadana y Control Social (CPCCS) — Portal de Veedurías',
          url: 'https://www.cpccs.gob.ec/',
          description: 'Portal oficial del CPCCS con normativas sobre rendición de cuentas, registro de veedurías ciudadanas y guías de transparencia.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-pol-avril-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Participación Ciudadana, Silla Vacía y Control Social',
          url: '/api/v1/academic/classes/class-pol-avril-02/guide.pdf',
          description: 'Ficha práctica con modelos de actas de veeduría, guiones de cabildo abierto y casos reales de control social exitoso en Ecuador.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-pol-avril-02-act-1',
          title: 'La Conquista de la Silla Vacía',
          description: 'Lee sobre el mecanismo municipal de la Silla Vacía y reflexiona sobre la soberanía popular directa.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-pol-avril-02-act-2',
          title: 'Simulación del Cabildo Barrial',
          description: 'Redacta y pronuncia el discurso de deliberación en la Silla Vacía defendiendo el parque agroecológico.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-pol-avril-02-act-3',
          title: 'Acta de Conformación de Veeduría',
          description: 'Elabora el acta formal de veeduría ciudadana escolar con cronograma y objetivos de auditoría.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Averigua en tu municipio o junta parroquial cómo se anuncia el orden del día de las sesiones de concejo y qué requisitos solicitan para el uso de la Silla Vacía.',
      reflectionPrompt: '¿Por qué la indiferencia ciudadana frente a la gestión pública es la mejor aliada de los gobernantes corruptos?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_pol_avril_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-pol-avril-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-07-POL', subjectCode: 'POL-801', unitNumber: 1, sessionNumber: 2 }
    }
  ]
};

