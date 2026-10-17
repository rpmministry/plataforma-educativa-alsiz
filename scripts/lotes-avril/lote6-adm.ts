import { AvrilCurriculumLote } from './lote1-len';

export const AVRIL_LOTE_06_ADM: AvrilCurriculumLote = {
  loteId: 'LOTE-AVRIL-06-ADM',
  loteNumber: 6,
  subjectCode: 'ADM-801',
  subjectName: 'Administración y Marketing',
  category: 'COMPLEMENTARIA_SIGLO_XXI',
  unitTitle: 'Unidad 1: Emprendimiento y Modelos de Negocio: De la Idea a la Propuesta de Valor',
  unitNumber: 1,
  classesCount: 3,
  classes: [
    {
      id: 'class-adm-avril-01',
      subjectId: 'adm-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-08',
      dayOfWeek: 'Martes',
      scheduleTime: '10:45 - 11:30 (45 min)',
      unit: 'Unidad 1: Emprendimiento y Modelos de Negocio: De la Idea a la Propuesta de Valor',
      theme: 'De la idea al problema real: Metodología Lean Startup y propuesta de valor',
      objective: 'Identificar necesidades desatendidas y dolores reales en la comunidad mediante observación empírica, formulando una propuesta de valor diferencial bajo el ciclo "Construir-Medir-Aprender" de Lean Startup.',
      learningPurpose: 'Desarrollar una mentalidad emprendedora basada en la empatía y la experimentación científica, comprendiendo que los negocios exitosos no nacen de ocurrencias caprichosas, sino de resolver problemas genuinos de las personas.',
      competencyDcd: 'ADM.8.1 — Identificar problemas y necesidades desatendidas en la comunidad mediante observación empírica y formular propuestas de solución con enfoque Lean Startup.',
      officialSource: 'Currículo Complementario ALSIZ — Marco de Competencias para el Emprendimiento Siglo XXI / Canvas Strategyzer',
      introduction: '¡Bienvenida a tu academia de Administración y Emprendimiento, estimada Avril! Te saluda la MBA Carla Fonseca. El error más común y costoso que cometen miles de emprendedores en el mundo es enamorarse ciegamente de una idea antes de verificar si a alguien realmente le importa. Gastan meses de trabajo y ahorros construyendo un producto que nadie necesita. En el siglo XXI, el emprendimiento no es una lotería; es una disciplina científica. El pionero Eric Ries demostró que un emprendedor debe actuar como un científico de laboratorio: formula una hipótesis sobre un dolor humano, construye un experimento mínimo viable, mide los datos reales del mercado y aprende rápido. ¡Hoy aprenderemos a descubrir dolores reales y transformarlos en propuestas de valor irresistibles!',
      reading: 'El mito del invento perfecto y la lección del café andino: Dos jóvenes universitarios en Quito decidieron emprender en el rubro del café de especialidad. El primero gastó miles de dólares en importar una máquina italiana de diseño futurista, diseñar un logotipo dorado y alquilar un local costoso en una avenida principal, sin haber hablado jamás con un cliente de la zona. A los tres meses quebró porque la gente en esa calle solo buscaba desayunos rápidos para llevar. El segundo joven, en cambio, aplicó Lean Startup: preparó 20 termos de café de altura de Loja en su cocina, bajó a la estación de transporte con una mesita plegable y conversó directamente con los transeúntes. Descubrió que los oficinistas estaban frustrados porque el café de las cafeterías tardaba diez minutos en servirse y quemaba la lengua. Diseñó un café a temperatura perfecta entregado en 30 segundos en vaso biodegradable. El segundo joven no vendía café; vendía "puntualidad y calidez para no llegar tarde a la oficina". Esa era su verdadera propuesta de valor.',
      pedagogicalExplanation: 'La metodología Lean Startup se fundamenta en reducir el desperdicio de tiempo y capital mediante el bucle de retroalimentación constante: Crear (un Producto Mínimo Viable o PMV) -> Medir (las respuestas de usuarios reales mediante métricas tangibles) -> Aprender (decidiendo si perseverar o pivotar hacia una mejor dirección). Para formular una Propuesta de Valor sólida, utilizamos el Mapa de Valor de Strategyzer: 1) Perfil del Cliente: observamos sus Tareas del Cliente (qué intenta lograr), sus Dolores (frustraciones, obstáculos, riesgos) y sus Alegrías (beneficios deseados). 2) Mapa de Valor: diseñamos nuestros Productos y Servicios, nuestros Aliviadores de Dolores y nuestros Creadores de Alegrías. El "encaje producto-mercado" ocurre cuando los aliviadores y creadores encajan perfectamente con los dolores del cliente.',
      vocabulary: [
        { term: 'Lean Startup', definition: 'Metodología empresarial moderna orientada a acortar los ciclos de desarrollo de productos mediante experimentación basada en hipótesis y retroalimentación validada.', childFriendlyExample: 'Es hacer experimentos pequeños y baratos antes de arriesgar todo el dinero en una idea grande.' },
        { term: 'Propuesta de Valor', definition: 'El conjunto único de beneficios y soluciones que una empresa promete entregar a sus clientes para resolver su problema de manera superior a las alternativas.', childFriendlyExample: 'La propuesta de valor no es el zapato que vendes, sino la comodidad y elegancia que siente quien lo calza.' },
        { term: 'Pivotar', definition: 'Cambiar estratégicamente de rumbo o modelo de negocio manteniendo la visión general, tras descubrir que una hipótesis inicial no funciona.', childFriendlyExample: 'Si descubres que a la gente no le gusta tu app de cocina pero adora tus recetas en video, pivotas a ser un canal de video.' }
      ],
      contextualizedExample: 'En la parroquia de Cumbayá, una estudiante de 13 años notó que los dueños de mascotas no tenían tiempo para bañar a sus perros los fines de semana debido a las largas filas en las veterinarias. Su propuesta de valor no fue abrir otra veterinaria, sino un servicio móvil a domicilio con furgoneta equipada, ahorrando dos horas de tiempo a las familias.',
      socraticQuestions: [
        '¿Por qué decimos que los clientes no compran productos, sino que "contratan" productos para resolver un problema en sus vidas cotidianas?',
        'Si un emprendedor gasta todos sus ahorros en publicidad antes de validar si su producto funciona, ¿qué principio de Lean Startup está violando gravemente?',
        '¿Cómo puedes comprobar si una persona realmente tiene interés en tu idea sin pedirle dinero por adelantado?'
      ],
      practicalActivity: {
        title: 'Taller de Detección de Dolores: El Mapa de Empatía Escolar',
        instructions: [
          'Elige un ámbito de tu vida cotidiana: A) La organización de útiles y tareas de los estudiantes de secundaria; o B) El consumo de snacks saludables en recreos escolares.',
          'Dibuja el lienzo del Perfil del Cliente de Strategyzer en tu cuaderno: divide la página en tres zonas (Trabajos del cliente, Dolores/Frustraciones, Alegrías esperadas).',
          'Entrevista a un familiar o compañero con tres preguntas socráticas abiertas sobre sus mayores dificultades en ese ámbito.',
          'Anota al menos 3 dolores específicos (ejemplo: "las frutas se magullan en la mochila", "se me olvida entregar las tareas").',
          'Formula una declaración de propuesta de valor de una sola oración siguiendo la fórmula: "Ayudamos a [cliente objetivo] a lograr [alegría] aliviando [dolor] mediante [solución innovadora]".'
        ],
        materials: ['Cuaderno de proyectos', 'Plantilla Strategyzer Value Proposition Canvas', 'Bolígrafos de colores']
      },
      applicationActivity: {
        title: 'Diseño del Experimento Mínimo Viable (PMV de Papel)',
        task: 'Diseña el boceto de un Producto Mínimo Viable (en formato papel, flyer informativo o prototipo digital) para tu propuesta de valor. Define qué métrica medible usarás para saber si el experimento tuvo éxito (por ejemplo: "Si 5 de cada 8 personas entrevistadas dicen que usarían este servicio, la hipótesis queda validada").',
        deliverable: 'Ficha de experimento Lean Startup (1 página) con descripción de la hipótesis, prototipo en boceto y métrica de validación.'
      },
      formativeEvaluation: {
        description: 'Capacidad para identificar problemas reales de mercado, aplicar el lienzo de propuesta de valor y diseñar experimentos de validación Lean.',
        expectedEvidence: 'Avril distingue con precisión entre una idea y una propuesta de valor validada, enfocándose en resolver dolores de usuarios con empatía.'
      },
      evaluationRubric: {
        criterion: 'Formulación de propuestas de valor y aplicación de Lean Startup (ADM.8.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Propone productos genéricos sin justificar qué problema resuelven ni identificar dolores específicos de clientes.' },
          { level: 'En desarrollo', descriptor: 'Identifica dolores de clientes pero su propuesta de valor es ambigua o no plantea métricas de validación claras.' },
          { level: 'Consolidado', descriptor: 'Aplica el lienzo de Strategyzer con maestría, formula hipótesis comprobables, diseña un PMV coherente y establece métricas objetivas de aprendizaje validado.' }
        ]
      },
      expectedFeedback: 'Visión estratégica y empatía excepcionales, Avril. Has captado a la perfección que los grandes negocios nacen de escuchar el corazón de las personas y resolver sus problemas reales con humildad y datos. ¡Ese es el verdadero espíritu emprendedor!',
      difficultyAdaptation: 'Proveer tarjetas con problemas cotidianos ya identificados para que Avril seleccione uno y se concentre únicamente en diseñar el aliviador de dolores.',
      advancedExtension: 'Avril investiga el concepto de "Customer Discovery" desarrollado por Steve Blank y formula un guión de 5 preguntas de entrevista no sesgadas que no induzcan la respuesta del usuario.',
      resources: [
        {
          id: 'class-adm-avril-01-res-1',
          type: 'simulator',
          title: 'Strategyzer — The Value Proposition Canvas Interactive Tutorial',
          url: 'https://www.strategyzer.com/library/the-value-proposition-canvas',
          description: 'Recurso educativo oficial de Alexander Osterwalder y Strategyzer para dominar el mapeo de dolores y alegrías de clientes.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-adm-avril-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Lean Startup y Propuesta de Valor para Jóvenes',
          url: '/api/v1/academic/classes/class-adm-avril-01/guide.pdf',
          description: 'Manual de trabajo con plantillas de entrevistas a clientes, cuadros de experimentos mínimos y rúbricas de evaluación de proyectos.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-adm-avril-01-act-1',
          title: 'La Lección del Café Andino',
          description: 'Analiza el caso de estudio de los dos emprendedores y explica por qué el segundo tuvo éxito.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-adm-avril-01-act-2',
          title: 'Taller de Mapeo de Empatía',
          description: 'Completa el lienzo de Strategyzer identificando tareas, dolores y alegrías de tu segmento de clientes.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-adm-avril-01-act-3',
          title: 'Diseño del PMV de Papel',
          description: 'Elabora la ficha técnica del experimento mínimo viable con su hipótesis y métrica de éxito.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Observa durante una salida a una tienda o panadería local un problema de atención o servicio y piensa qué solución sencilla mejoraría la experiencia del cliente.',
      reflectionPrompt: '¿Cómo puede el emprendimiento convertirse en una poderosa herramienta para servir al prójimo y mejorar la comunidad?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_adm_avril_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-adm-avril-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-06-ADM', subjectCode: 'ADM-801', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-adm-avril-02',
      subjectId: 'adm-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-10',
      dayOfWeek: 'Jueves',
      scheduleTime: '11:30 - 12:00 (30 min)',
      unit: 'Unidad 1: Emprendimiento y Modelos de Negocio: De la Idea a la Propuesta de Valor',
      theme: 'El lienzo Business Model Canvas: Segmentos de clientes y canales de distribución',
      objective: 'Estructurar un modelo de negocio integral mapeando los bloques estratégicos del Business Model Canvas (Osterwalder), profundizando en la segmentación psicográfica y los canales de comunicación y entrega de valor.',
      learningPurpose: 'Comprender que un producto grandioso fracasa si no cuenta con un modelo de negocio coherente que conecte la propuesta de valor con las personas adecuadas a través de los canales correctos.',
      competencyDcd: 'ADM.8.2 — Mapear los bloques estratégicos del modelo Canvas enfocándose en la propuesta de valor, los arquetipos de cliente y los canales de distribución.',
      officialSource: 'Currículo Complementario ALSIZ — Marco de Competencias para el Emprendimiento Siglo XXI / Canvas Strategyzer',
      introduction: '¡Hola de nuevo, Avril! Continuamos con la MBA Carla Fonseca en nuestro laboratorio de emprendimiento. Antiguamente, los planes de negocio eran libros pesados de 80 páginas que nadie leía y que quedaban obsoletos antes de imprimirse. En la actualidad, el mundo entero utiliza una sola hoja mágica dividida en 9 cajas interconectadas: el BUSINESS MODEL CANVAS creado por Alexander Osterwalder. Este lienzo permite ver la fotografía panorámica completa de una empresa en un solo vistazo. Hoy nos sumergiremos en el lado derecho del lienzo: la conexión vital entre tu propuesta de valor, el corazón de tu cliente y los puentes (canales) que los unen.',
      reading: 'El caso del chocolate ecuatoriano Pacari y sus canales de impacto global: A inicios de los años 2000, Ecuador exportaba miles de toneladas de cacao en grano fino de aroma a precios fijados por bolsas internacionales en Nueva York o Londres, mientras que los agricultores locales recibían una fracción mínima del valor. Santiago Peralta y Carla Barboto decidieron desafiar ese paradigma fundando Pacari. En lugar de vender cacao crudo a intermediarios, crearon un modelo Canvas revolucionario: Propuesta de valor: Chocolate fino orgánico biodinámico "árbol a la barra" que preserva la identidad territorial andina. Segmento de clientes: Consumidores globales gourmet conscientes de la ética ecológica y el comercio justo. Canales: Tiendas especializadas en más de 40 países, ferias gastronómicas internacionales y alianzas con aerolíneas de primer nivel. Al controlar sus canales y su propuesta de valor, transformaron a Ecuador en un referente mundial de chocolate de alta gama y multiplicaron el ingreso de más de 3.500 familias cacaoteras.',
      pedagogicalExplanation: 'El Business Model Canvas organiza la lógica empresarial en cuatro áreas fundamentales: 1) Oferta (Propuesta de Valor central). 2) Clientes (Segmentos de Clientes, Canales de distribución y Relaciones con Clientes). 3) Infraestructura (Actividades Clave, Recursos Clave y Socios Clave). 4) Finanzas (Estructura de Costes y Fuentes de Ingresos). En esta sesión profundizamos en la Segmentación (¿Quién es exactamente nuestro usuario ideal? Edad, hábitos, motivaciones y estilo de vida) y los Canales (las cinco fases del canal: Conciencia/Notoriedad, Evaluación, Compra, Entrega y Postventa).',
      vocabulary: [
        { term: 'Business Model Canvas', definition: 'Plantilla de gestión estratégica que permite visualizar, diseñar y modelar un negocio en 9 bloques interconectados en una sola página.', childFriendlyExample: 'Es el plano de un arquitecto pero diseñado para construir una empresa exitosa.' },
        { term: 'Segmento de Clientes', definition: 'El grupo específico de personas o entidades al que una empresa dirige sus productos o servicios y para quienes crea valor.', childFriendlyExample: 'No le vendes a "todo el mundo", sino a jóvenes deportistas que entrenan ciclismo de montaña en páramo.' },
        { term: 'Canal de Distribución', definition: 'La vía, medio o infraestructura mediante la cual una empresa comunica su propuesta de valor y entrega su producto al cliente final.', childFriendlyExample: 'Una tienda física en el centro comercial, una página web con envíos a domicilio o una app móvil.' }
      ],
      contextualizedExample: 'Un proyecto de apicultura sostenible en Loja vende miel pura de abeja silvestre. Su segmento no son los supermercados masivos, sino restaurantes de alta cocina y familias interesadas en medicina natural que compran directamente a través de una cuenta de Instagram y reciben el producto en frascos de vidrio retornables.',
      socraticQuestions: [
        '¿Por qué decir "mi producto es para todas las personas de entre 5 y 80 años" es la receta más rápida para fracasar en el marketing moderno?',
        '¿Cuáles son las ventajas y desventajas de vender directamente al consumidor (D2C) por internet frente a vender a través de intermediarios en tiendas físicas?',
        'Si un cliente compra tu producto pero el canal de entrega tarda dos semanas y llega roto, ¿de qué sirvió haber tenido la mejor propuesta de valor en el laboratorio?'
      ],
      practicalActivity: {
        title: 'Llenado del Lienzo Canvas: El Lado Derecho de la Creación de Valor',
        instructions: [
          'Dibuja en una hoja doble de tu cuaderno el esquema del Business Model Canvas con sus 9 casillas.',
          'Coloca en el centro la Propuesta de Valor desarrollada en la sesión anterior.',
          'En la casilla "Segmento de Clientes", describe al cliente ideal (Buyer Persona): dale un nombre ficticio, edad, 2 pasatiempos y su mayor necesidad insatisfecha.',
          'En la casilla "Canales", define las 3 etapas clave: ¿Cómo se enterará de que existes? ¿Cómo te pagará? ¿Cómo recibirá la entrega?',
          'En la casilla "Relación con Clientes", define el estilo de comunicación (¿personalizado, automatizado, comunitario?).'
        ],
        materials: ['Hoja de papel bond A3 o cuaderno apaisado', 'Notas adhesivas (post-its) de colores', 'Rotuladores']
      },
      applicationActivity: {
        title: 'Auditoría de Canales de una Microempresa Local',
        task: 'Elige un negocio familiar o una tienda de tu vecindario. Evalúa sus canales actuales en una escala de 1 a 5 estrellas: ¿Tienen presencia digital? ¿Su entrega es rápida? Escribe tres recomendaciones prácticas de canales digitales gratuitos o de bajo costo (como catálogo de WhatsApp Business o Google Maps) que podrían duplicar su visibilidad.',
        deliverable: 'Informe de auditoría de canales (media página) con recomendaciones concretas y diagrama de flujo de entrega.'
      },
      formativeEvaluation: {
        description: 'Comprensión de los 9 bloques del Canvas, precisión en la caracterización de segmentos de clientes y diseño estratégico de canales.',
        expectedEvidence: 'Avril estructura el lado derecho del lienzo Canvas con coherencia interna entre valor, perfil de usuario y canales de contacto.'
      },
      evaluationRubric: {
        criterion: 'Mapeo del modelo Business Model Canvas y canales de distribución (ADM.8.2)',
        indicators: [
          { level: 'Inicial', descriptor: 'Confunde los bloques del Canvas o define clientes de forma excesivamente amplia y abstracta.' },
          { level: 'En desarrollo', descriptor: 'Completa los bloques pero los canales seleccionados no corresponden con las características de su segmento objetivo.' },
          { level: 'Consolidado', descriptor: 'Mapea los bloques con profunda coherencia estratégica, define arquetipos de cliente con precisión psicográfica y optimiza los canales en todas sus fases de entrega.' }
        ]
      },
      expectedFeedback: 'Excelente visión comercial y estratégica, Avril. Tu segmentación de clientes es detallada y realista, y los canales que planteas demuestran un conocimiento intuitivo del comportamiento del consumidor moderno.',
      difficultyAdaptation: 'Proveer un lienzo con preguntas orientadoras en cada bloque ("¿Quién te paga?", "¿Por dónde te conocen?") para guiar la estructuración.',
      advancedExtension: 'Avril analiza el modelo de "Plataforma Multifacética" (Multisided Platform) de empresas como Airbnb o Uber, explicando cómo crean valor para dos segmentos de clientes complementarios simultáneamente.',
      resources: [
        {
          id: 'class-adm-avril-02-res-1',
          type: 'simulator',
          title: 'Canvanizer — Business Model Canvas Generator Open Platform',
          url: 'https://canvanizer.com/',
          description: 'Herramienta colaborativa abierta para diseñar lienzos Canvas de negocios en línea con notas adhesivas digitales.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-adm-avril-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Business Model Canvas y Segmentación Estratégica',
          url: '/api/v1/academic/classes/class-adm-avril-02/guide.pdf',
          description: 'Plantilla de 9 bloques en alta resolución con casos de estudio ecuatorianos (Pacari, República del Cacao) y rúbrica.',
          duration: '15 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-adm-avril-02-act-1',
          title: 'El Caso Pacari',
          description: 'Lee la historia de la chocolatería andina y explica por qué controlar los canales cambió su destino.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-adm-avril-02-act-2',
          title: 'Mapeo del Lienzo Canvas',
          description: 'Dibuja y completa el lado derecho del Business Model Canvas con notas adhesivas de colores.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-adm-avril-02-act-3',
          title: 'Auditoría de Canales Locales',
          description: 'Elabora el informe de recomendaciones de canales para una microempresa del entorno cercano.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Pregunta a una persona cercana cómo prefiere comprar hoy en día: si visitando una tienda física o pidiendo por internet, y anota qué factor determina su decisión (precio, confianza o rapidez).',
      reflectionPrompt: '¿Cómo puede una empresa usar sus canales no solo para vender, sino para educar y generar un impacto positivo en la sociedad?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_adm_avril_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-adm-avril-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-06-ADM', subjectCode: 'ADM-801', unitNumber: 1, sessionNumber: 2 }
    },
    {
      id: 'class-adm-avril-03',
      subjectId: 'adm-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-11',
      dayOfWeek: 'Viernes',
      scheduleTime: '10:45 - 11:30 (45 min)',
      unit: 'Unidad 1: Emprendimiento y Modelos de Negocio: De la Idea a la Propuesta de Valor',
      theme: 'Estructura de costos, flujo de caja y punto de equilibrio para microproyectos',
      objective: 'Calcular costos fijos, costos variables unitarios, margen de contribución y punto de equilibrio financiero para un microemprendimiento escolar mediante el uso de fórmulas algebraicas y hojas de cálculo.',
      learningPurpose: 'Entender que la salud financiera de cualquier proyecto depende de la disciplina contable y la precisión matemática, evitando la bancarrota mediante la gestión rigurosa del flujo de efectivo.',
      competencyDcd: 'ADM.8.3 — Calcular costos fijos, variables, margen de contribución y punto de equilibrio financiero para un producto o servicio viable.',
      officialSource: 'Currículo Complementario ALSIZ — Marco de Competencias para el Emprendimiento Siglo XXI / Educación Financiera',
      introduction: '¡Feliz viernes de finanzas aplicadas, Avril! Te saluda la MBA Carla Fonseca. En el mundo de los negocios existe una frase lapidaria: "Las ventas son vanidad, las ganancias son cordura, pero el flujo de caja es la realidad". Un proyecto puede tener una idea maravillosa, un diseño hermoso e incluso muchas ventas; pero si gasta más de lo que ingresa, se extinguirá como una vela sin oxígeno. La matemática es la mejor aliada del emprendedor. Hoy aprenderemos a calcular con exactitud matemática cuánto nos cuesta producir una unidad, cuál es nuestro margen de ganancia real y cuántas unidades exactas necesitamos vender para no perder un solo centavo: ¡el PUNTO DE EQUILIBRIO!',
      reading: 'La fábula del repostero que no sabía restar: En un pintoresco pueblo andino, un repostero aficionado horneaba unos deliciosos pasteles de naranja y miel. Los vendía a $10 cada uno y todos los sábados la fila de vecinos daba la vuelta a la manzana. Al final del mes, tras vender 100 pasteles, tenía $1.000 en el bolsillo y se sentía un magnate. Sin embargo, cuando llegó el momento de pagar la harina, los huevos ecológicos, el empaque biodegradable, la factura de gas del horno y el arriendo del taller, las cuentas sumaron $1.150. ¡Estaba perdiendo $1,50 por cada pastel que vendía con tanta alegría! Su problema fue no haber calculado sus costos variables ni sus costos fijos. No tenía un negocio; tenía un pasatiempo muy caro que le costaba dinero propio. Cuando recalculó sus costos y fijó el precio justo en $14, su negocio se volvió próspero y sostenible en el tiempo.',
      pedagogicalExplanation: 'En la gestión de finanzas de proyectos se distinguen dos tipos de costos: 1) Costos Fijos ($CF$): gastos que se deben pagar obligatoriamente sin importar si vendes cero o mil unidades (arriendo, servicios básicos fijos, suscripciones de software). 2) Costos Variables ($CV$): gastos que aumentan directamente con cada unidad producida (materia prima, empaque, comisión de entrega). El Costo Variable Unitario ($CVU$) es el costo de un solo producto. El Margen de Contribución Unitario ($MCU$) es el precio de venta ($P$) menos el $CVU$ ($MCU = P - CVU$). El Punto de Equilibrio en Unidades ($PE$) es el número mínimo de productos que se deben vender para cubrir exactamente todos los costos fijos y variables: $PE = \\frac{CF}{P - CVU}$. En el punto de equilibrio la ganancia neta es cero.',
      vocabulary: [
        { term: 'Costo Fijo', definition: 'Gasto invariable que una empresa debe solventar independientemente de su volumen de producción o ventas.', childFriendlyExample: 'El pago mensual del internet de $30 se paga igual vendas 5 o 50 productos.' },
        { term: 'Costo Variable', definition: 'Costo que fluctúa en proporción directa al volumen de bienes producidos o servicios prestados.', childFriendlyExample: 'Si haces 10 pulseras necesitas $5 en hilo; si haces 20 pulseras necesitas $10 en hilo.' },
        { term: 'Punto de Equilibrio', definition: 'Nivel de actividad económica donde los ingresos totales igualan con exactitud a los costos totales, sin pérdidas ni ganancias.', childFriendlyExample: 'Si tu punto de equilibrio es 15 unidades, a partir de la unidad 16 empiezas a ganar dinero neto.' }
      ],
      contextualizedExample: 'Un proyecto escolar de mermelada artesanal de mora silvestre tiene costos fijos de $40 al mes (gas y etiquetas impresas). El costo variable por frasco (moras, azúcar y frasco de vidrio) es de $1,50. Si deciden vender cada frasco a $3,50, el margen de contribución es $3,50 - 1,50 = $2,00. El punto de equilibrio es: $PE = 40 / 2 = 20$ frascos al mes.',
      socraticQuestions: [
        '¿Por qué un negocio que tiene muchas ventas diarias puede quebrar en pocos meses si no monitorea su flujo de caja real?',
        'Si aumentas el precio de venta de tu producto pero no cambias tus costos, ¿qué le ocurre al punto de equilibrio: necesitas vender más unidades o menos unidades para no perder dinero?',
        '¿Por qué es fundamental que un emprendedor incluya un valor correspondiente a su propio tiempo y trabajo dentro de los costos del proyecto?'
      ],
      practicalActivity: {
        title: 'Laboratorio Financiero: La Calculadora del Punto de Equilibrio en Hoja de Cálculo',
        instructions: [
          'Abre una hoja de cálculo (Google Sheets, Excel o en tu cuaderno cuadriculado).',
          'Crea una tabla con las siguientes tres columnas: Concepto de Gasto, Tipo (Fijo o Variable), Valor en Dólares.',
          'Introduce los datos de un microproyecto de libretas artesanales ecológicas:',
          '  - Costos Fijos: Pegamento y herramientas ($15 al mes), Publicidad web ($10 al mes). Total CF = $25.',
          '  - Costos Variables Unitarios: Hojas de papel reciclado ($1,20), Cartón de pasta ($0,80), Cinta encuadernación ($0,50). Total CVU = $2,50.',
          '  - Precio de Venta propuesto ($P$): $5,00 por libreta.',
          'Aplica la fórmula matemática en la celda correspondiente: `= 25 / (5.00 - 2.50)` para obtener el punto de equilibrio exacto.',
          'Elabora una gráfica sencilla de Ingresos Totales vs. Costos Totales identificando el cruce del punto de equilibrio.'
        ],
        materials: ['Computadora con hoja de cálculo o cuaderno cuadriculado', 'Calculadora básica', 'Regla y colores']
      },
      applicationActivity: {
        title: 'Plan Financiero de Presupuesto para el Proyecto Interdisciplinario ALSIZ',
        task: 'Elabora la estructura de costos y el cálculo del punto de equilibrio de tu propio microproyecto del trimestre. Detalla al menos 3 costos fijos y 3 costos variables con precios de mercado reales en Ecuador. Determina el precio de venta sugerido y cuántas unidades debes comercializar para cubrir la inversión inicial.',
        deliverable: 'Hoja de presupuesto formalizada con desglose de costos, margen de contribución y punto de equilibrio certificado.'
      },
      formativeEvaluation: {
        description: 'Destreza en la clasificación de costos fijos y variables, dominio de la fórmula del punto de equilibrio y rigor en el cálculo financiero.',
        expectedEvidence: 'Avril calcula el punto de equilibrio sin errores aritméticos, interpreta el significado del margen de contribución y diseña una estructura de costos viable.'
      },
      evaluationRubric: {
        criterion: 'Cálculo de costos y punto de equilibrio en proyectos emprendedores (ADM.8.3)',
        indicators: [
          { level: 'Inicial', descriptor: 'Confunde costos fijos con variables y comete errores en la fórmula matemática del punto de equilibrio.' },
          { level: 'En desarrollo', descriptor: 'Calcula el punto de equilibrio pero omite costos ocultos (como empaque o tiempo) o le cuesta interpretar la gráfica de resultados.' },
          { level: 'Consolidado', descriptor: 'Calcula con precisión matemática todos los costos, domina el margen de contribución, interpreta el punto de equilibrio y formula estrategias financieras de optimización de gastos.' }
        ]
      },
      expectedFeedback: 'Impresionante solidez cuantitativa y financiera, Avril. Has resuelto el modelo de equilibrio con precisión matemática y madurez contable. Saber calcular tus costos te da el poder de emprender con sabiduría, seguridad y visión a largo plazo.',
      difficultyAdaptation: 'Utilizar una plantilla prediseñada con las celdas de fórmula bloqueadas para que Avril se enfoque en clasificar correctamente los costos.',
      advancedExtension: 'Avril investiga qué es el "análisis de sensibilidad": recalcula el punto de equilibrio si la materia prima sube un 20% por inflación y propone dos medidas para no trasladar todo el costo al cliente.',
      resources: [
        {
          id: 'class-adm-avril-03-res-1',
          type: 'simulator',
          title: 'Simulador Financiero Abierto — Calculadora Interactiva de Punto de Equilibrio',
          url: 'https://www.calculatorsoup.com/calculators/financial/break-even-point-calculator.php',
          description: 'Simulador financiero en línea para experimentar en tiempo real con variaciones de costos fijos, variables y precio de venta.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-adm-avril-03-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Finanzas de Proyectos y Punto de Equilibrio',
          url: '/api/v1/academic/classes/class-adm-avril-03/guide.pdf',
          description: 'Manual práctico de finanzas personales y emprendedoras para 8.° EGB con ejercicios resueltos y plantillas de flujo de caja.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-adm-avril-03-act-1',
          title: 'La Fábula del Repostero',
          description: 'Analiza el error financiero del repostero y reflexiona sobre la importancia de costear la producción.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-adm-avril-03-act-2',
          title: 'Cálculo del Punto de Equilibrio',
          description: 'Resuelve el problema de las libretas ecológicas aplicando la fórmula formal en la hoja de cálculo.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-adm-avril-03-act-3',
          title: 'Presupuesto del Microproyecto Escolar',
          description: 'Elabora el plan de costos y punto de equilibrio de tu propio proyecto para el trimestre.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Revisa con un adulto en casa un recibo de servicios básicos (luz o agua) e identifica qué rubros son costos fijos del servicio y cuáles varían por el consumo en kilovatios o metros cúbicos.',
      reflectionPrompt: '¿Cómo te ayuda la mayordomía financiera responsable a ser generosa con los demás y a construir proyectos que beneficien a tu comunidad?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_adm_avril_03.pdf',
      guideUrl: '/api/v1/academic/classes/class-adm-avril-03/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-06-ADM', subjectCode: 'ADM-801', unitNumber: 1, sessionNumber: 3 }
    }
  ]
};

