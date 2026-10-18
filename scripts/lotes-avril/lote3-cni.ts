import { AvrilCurriculumLote } from './lote1-len';

export const AVRIL_LOTE_03_CNI: AvrilCurriculumLote = {
  loteId: 'LOTE-AVRIL-03-CNI',
  loteNumber: 3,
  subjectCode: 'CNI-801',
  subjectName: 'Ciencias Naturales',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unidad 1: Estructura Celular: El Microcosmos de la Vida',
  unitNumber: 1,
  classesCount: 2,
  classes: [
    {
      id: 'class-sci-avril-01',
      subjectId: 'sci-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-07',
      dayOfWeek: 'Lunes',
      scheduleTime: '10:00 - 10:45 (45 min)',
      unit: 'Unidad 1: Estructura Celular: El Microcosmos de la Vida',
      theme: 'Célula procariota y eucariota: La arquitectura invisible de los seres vivos',
      objective: 'Diferenciar entre células procariotas y eucariotas (animal y vegetal) mediante la identificación de su ultraestructura, organelos especializados y niveles de compartimentalización biológica.',
      learningPurpose: 'Comprender que la vida opera como una metrópoli microscópica hiperorganizada, donde cada organelo cumple funciones fisiológicas coordinadas esenciales para el metabolismo y la homeostasis.',
      competencyDcd: 'CN.4.1.1 — Indagar y explicar las propiedades de los seres vivos e inferir su importancia para el mantenimiento de la vida en la Tierra, diferenciando la organización celular procariota y eucariota.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Ciencias Naturales EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Bienvenida al laboratorio de Ciencias Naturales, apreciada Avril! Te saluda el Dr. Leonardo Darwin. Cuando observas un árbol de guayacán, un colibrí estrellita de la cordillera o incluso las bacterias benéficas de un yogur artesanal, estás ante sistemas biológicos de sublime sofisticación. Hace 350 años, Robert Hooke miró un pedazo de corcho bajo un tosco microscopio y vio celdillas a las que bautizó "células". Hoy sabemos que cada célula no es un saco informe de líquido, sino una ciudad industrial amurallada con centrales de energía, fábricas de proteínas y una biblioteca genética central. ¡Acompáñame a descifrar su código arquitectónico!',
      reading: 'De la charca de Leeuwenhoek a la teoría endosimbiótica: Anton van Leeuwenhoek, un comerciante de telas holandés sin formación académica formal pero con una insaciable curiosidad y una habilidad prodigiosa para pulir lentes de vidrio, tomó una gota de agua estancada y descubrió asombrado lo que llamó "animálculos" veloces y vivos. Siglos después, la genial bióloga Lynn Margulis propuso la fascinante Teoría de la Endosimbiosis Seriada: hace más de 1.500 millones de años, una célula grande engulló a una bacteria aeróbica especializada. En vez de digerirla, formaron un pacto de beneficio mutuo perpetuo. Esa bacteria cautiva se convirtió en la mitocondria, la central eléctrica que hoy te permite respirar, pensar y correr. La cooperación, y no solo la competencia, es uno de los motores supremos de la evolución biológica.',
      pedagogicalExplanation: 'La distinción fundamental en la biología celular radica entre células procariotas (como las bacterias y arqueas, cuyo ADN flota libremente en una región nucleoide sin membrana nuclear) y células eucariotas (animales, vegetales, hongos y protozoarios, que poseen un núcleo delimitado por una doble membrana lipídica y organelos membranosos especializados como mitocondrias, retículo endoplasmático, aparato de Golgi y cloroplastos). Dentro de las eucariotas, las células vegetales se diferencian por poseer una pared celular rígida de celulosa, una gran vacuola central hidrostática y cloroplastos con clorofila capaces de convertir fotones solares en glucosa mediante fotosíntesis.',
      vocabulary: [
        { term: 'Procariota', definition: 'Célula primitiva carente de núcleo definido y organelos membranosos; su material genético es una molécula circular dispersa en el citoplasma.', childFriendlyExample: 'La bacteria Escherichia coli que habita en nuestro intestino es un organismo procariota.' },
        { term: 'Eucariota', definition: 'Célula evolucionada con núcleo verdadero delimitado por membrana carioteca y organelos citoplasmáticos especializados.', childFriendlyExample: 'Tus neuronas, miocitos y las células de una hoja de orquídea son eucariotas.' },
        { term: 'Endosimbiosis', definition: 'Asociación ecológica estrecha y a largo plazo en la cual un organismo vive dentro de otro, resultando en coevolución y beneficio mutuo.', childFriendlyExample: 'Las mitocondrias dentro de nuestras células son descendientes de bacterias endosimbiontes.' }
      ],
      contextualizedExample: 'En la biorreserva marina del archipiélago de Galápagos, los corales viven en simbiosis mutualista obligada con microalgas dinoflageladas eucariotas (zooxantelas) que habitan dentro de sus células y les proveen nutrientes fotosintéticos a cambio de nitrógeno y fósforo.',
      socraticQuestions: [
        'Si una mitocondria tiene su propio ADN circular y sus propios ribosomas idénticos a los de las bacterias, ¿qué evidencia científica aporta esto a favor de la teoría de Lynn Margulis?',
        '¿Por qué las células animales no tienen pared celular rígida de celulosa como las plantas? ¿Qué ventajas mecánicas y motrices otorga esta flexibilidad biológica a los animales?',
        'Si el núcleo celular es el "cerebro" o la "biblioteca", ¿qué ocurriría si la membrana nuclear perdiera su permeabilidad selectiva frente a agentes mutagénicos citoplasmáticos?'
      ],
      practicalActivity: {
        title: 'Microscopía virtual interactiva y atlas comparativo celular',
        instructions: [
          'Ingresa al simulador de microscopio virtual de la Universidad de Colorado / PhET.',
          'Coloca en la platina virtual la muestra A (frotis bacteriano) y la muestra B (células de epidermis de cebolla Allium cepa).',
          'Ajusta el tornillo micrométrico a 40x y 100x de aumento con inmersión de luz.',
          'Identifica y anota en tu cuaderno de laboratorio: presencia o ausencia de núcleo delimitado, morfología de la pared celular y presencia de cloroplastos o vacuolas.',
          'Elabora un cuadro de doble entrada contrastando 4 diferencias estructurales clave entre Procariota, Eucariota Animal y Eucariota Vegetal.'
        ],
        materials: ['Computadora o tablet con navegador web', 'Cuaderno de ciencias cuadriculado', 'Colores y regla técnica']
      },
      applicationActivity: {
        title: 'Diagnóstico citológico de un organismo extremófilo andino',
        task: 'Imagina que una expedición del Instituto Antártico Ecuatoriano o del cráter del volcán Cotopaxi descubre un microorganismo unicelular en aguas termales a 80 °C. Tras el análisis bioquímico, se descubre que tiene pared celular pero carece de membrana nuclear y organelos con membrana. Redacta un informe científico escolar determinando: ¿Es procariota o eucariota? ¿Qué adaptaciones proteicas le permiten no desnaturalizarse a alta temperatura?',
        deliverable: 'Informe científico breve (1 página) con clasificación taxonómica celular fundamentada y dibujo esquemático rotulado.'
      },
      formativeEvaluation: {
        description: 'Capacidad para discriminar modelos celulares, justificar la función de los organelos e interpretar la teoría endosimbiótica.',
        expectedEvidence: 'Avril explica con precisión la diferencia de compartimentalización entre procariotas y eucariotas y asocia cada organelo a su función fisiológica sin confundir reinos.'
      },
      evaluationRubric: {
        criterion: 'Diferenciación estructural y funcional de células procariotas y eucariotas (CN.4.1.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Reconoce que existen células pero confunde las partes básicas y asume que todas las células tienen núcleo visible.' },
          { level: 'En desarrollo', descriptor: 'Distingue célula vegetal de animal pero presenta imprecisiones al explicar el modelo procariota o el origen mitocondrial.' },
          { level: 'Consolidado', descriptor: 'Explica con rigor biológico la compartimentalización celular, fundamenta la teoría endosimbiótica y clasifica muestras citológicas con precisión terminológica.' }
        ]
      },
      expectedFeedback: 'Extraordinario nivel de observación y razonamiento científico, Avril. Has integrado la historia de Leeuwenhoek con la teoría de Margulis de manera magistral. Tu comprensión de la compartimentalización celular demuestra un pensamiento biológico maduro y riguroso.',
      difficultyAdaptation: 'Utilizar diagramas interactivos recortables donde Avril ubica físicamente las organelas dentro de una célula tridimensional en cartulina.',
      advancedExtension: 'Avril investiga la función de los peroxisomas en la degradación de especies reactivas de oxígeno ($H_2O_2$) y cómo la enzima catalasa protege a la célula del estrés oxidativo.',
      resources: [
        {
          id: 'class-sci-avril-01-res-1',
          type: 'simulator',
          title: 'PhET Interactive Simulations — Anatomía Celular y Escala Microscópica',
          url: 'https://phet.colorado.edu/es/simulations/filter?subjects=biology',
          description: 'Simulador interactivo validado de la Universidad de Colorado Boulder para explorar células a diferentes aumentos ópticos.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-sci-avril-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Citología Comparada y Teoría Endosimbiótica',
          url: '/api/v1/academic/classes/class-sci-avril-01/guide.pdf',
          description: 'Ficha de laboratorio con microfotografías reales, cuestionario socrático y matriz de cotejo de organelos.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-sci-avril-01-act-1',
          title: 'La Pregunta de Leeuwenhoek',
          description: 'Analiza el descubrimiento de los animálculos y reflexiona sobre el rol de la tecnología óptica en el avance de la ciencia.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-sci-avril-01-act-2',
          title: 'Laboratorio de Microscopía Virtual',
          description: 'Examina muestras celulares virtuales y documenta los organelos identificados en el cuaderno.',
          type: 'practice',
          points: 20,
          completed: false
        },
        {
          id: 'class-sci-avril-01-act-3',
          title: 'Informe del Extremófilo Andino',
          description: 'Redacta el informe de diagnóstico citológico del espécimen bacteriano con hipótesis evolutiva.',
          type: 'project',
          points: 20,
          completed: false
        }
      ],
      homeworkTask: 'Observa una fruta madura en casa bajo una lupa o linterna y escribe una breve hipótesis sobre cómo los hongos unicelulares (levaduras) interactúan con los azúcares de la superficie.',
      reflectionPrompt: '¿Cómo cambia tu visión de tu propio cuerpo al saber que estás formada por más de 30 billones de células vivas trabajando en perfecta sinfonía?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_sci_avril_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-sci-avril-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-03-CNI', subjectCode: 'CNI-801', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-sci-avril-02',
      subjectId: 'sci-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-10',
      dayOfWeek: 'Jueves',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Estructura Celular: El Microcosmos de la Vida',
      theme: 'Bioquímica celular y biomoléculas: Glúcidos, lípidos, proteínas y la molécula de la herencia (ADN)',
      objective: 'Identificar las cuatro familias de biomoléculas orgánicas (carbohidratos, lípidos, proteínas y ácidos nucleicos), relacionando sus monómeros constituyentes con sus funciones energéticas, estructurales y genéticas.',
      learningPurpose: 'Descubrir que la química del carbono es la base molecular de todos los seres vivos, entendiendo cómo la alimentación equilibrada suministra los ladrillos moleculares para la renovación celular.',
      competencyDcd: 'CN.4.1.2 — Describir los tipos y características de las células, el ciclo celular, los mecanismos de reproducción celular y la composición química de los seres vivos.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Ciencias Naturales EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Buenos días, Avril! Bienvenidos a la segunda sesión de Ciencias Naturales con el Dr. Leonardo Darwin. ¿Te has preguntado de qué estamos hechos exactamente en el plano molecular? Si redujéramos a un ser humano a sus componentes químicos elementales, el 96% de su masa corporal está constituido por solo cuatro átomos: Carbono, Hidrógeno, Oxígeno y Nitrógeno (el célebre acrónimo CHON). Sin embargo, el carbono es el rey indiscutible de la biología gracias a su capacidad mágica de formar cuatro enlaces covalentes estables, construyendo cadenas, anillos y macromoléculas colosales. ¡Hoy exploraremos la cocina molecular de la vida!',
      reading: 'La doble hélice y la hecatombe de Rosalind Franklin: En la primavera de 1953, en el Laboratorio Cavendish de la Universidad de Cambridge, James Watson y Francis Crick publicaron un artículo de apenas una página en la revista Nature describiendo la estructura de la molécula más enigmática del cosmos: el ácido desoxirribonucleico (ADN). Pero el cimiento empírico fundamental provino de la Fotografía 51, una imagen de difracción de rayos X de nitidez insuperable obtenida por la biofísica británica Rosalind Franklin. Aquella fotografía reveló con elegancia matemática que el ADN es una doble hélice antiparalela, con un esqueleto exterior de fosfato y desoxirribosa, y peldaños interiores de cuatro bases nitrogenadas complementarias: Adenina con Timina, y Citosina con Guanina. En esa danza de cuatro letras ($A, T, C, G$) está escrito el libro de instrucciones para construir cada proteína de tu organismo.',
      pedagogicalExplanation: 'La materia viva se organiza a partir de cuatro macromoléculas orgánicas esenciales: 1) Glúcidos o carbohidratos (monómero: monosacáridos como la glucosa; función: combustible celular inmediato y reserva en glucógeno o almidón). 2) Lípidos (ácidos grasos y glicerol; función: reserva energética de alta densidad a largo plazo, aislamiento térmico y formación de la bicapa fosfolipídica de las membranas). 3) Proteínas (monómero: aminoácidos unidos por enlaces peptídicos; función: catálisis enzimática, transporte de oxígeno por hemoglobina, defensa inmunológica y soporte muscular). 4) Ácidos nucleicos (monómero: nucleótidos; función: almacenamiento y transmisión de la información genética hereditaria en ADN y ARN).',
      vocabulary: [
        { term: 'Monómero', definition: 'Molécula simple de bajo peso molecular que puede unirse a otras idénticas o similares para formar un polímero.', childFriendlyExample: 'La glucosa es el monómero que al encadenarse por cientos forma el almidón de una papa.' },
        { term: 'Enzima', definition: 'Proteína biocatalizadora especializada que acelera millones de veces la velocidad de las reacciones químicas celulares sin consumirse.', childFriendlyExample: 'La amilasa salival descompone los carbohidratos del pan mientras masticas.' },
        { term: 'Nucleótido', definition: 'Unidad fundamental de los ácidos nucleicos, formada por un grupo fosfato, un azúcar pentosa y una base nitrogenada.', childFriendlyExample: 'Un nucleótido es como una letra tipográfica con la que se escribe el ADN.' }
      ],
      contextualizedExample: 'El chocho (Lupinus mutabilis), leguminosa ancestral cultivada en la Sierra ecuatoriana, es considerado un superalimento andino debido a que contiene más del 50% de proteína vegetal completa y ácidos grasos insaturados de altísima calidad biológica.',
      socraticQuestions: [
        '¿Por qué los osos andinos de anteojos y las aves migratorias acumulan lípidos (grasas) antes del invierno o viajes largos, en lugar de acumular exclusivamente carbohidratos?',
        'Si todas las proteínas están formadas por solo 20 aminoácidos diferentes en la naturaleza, ¿cómo es posible que existan cientos de miles de proteínas con funciones tan disímiles como la insulina, la queratina o el colágeno?',
        '¿Qué sucedería en la síntesis celular si en la dieta de un ser humano hubiera deficiencia severa de aminoácidos esenciales?'
      ],
      practicalActivity: {
        title: 'Exploración molecular tridimensional en MolView / Biocatálogo',
        instructions: [
          'Abre la plataforma de visualización química MolView (molview.org).',
          'Busca e interactúa con el modelo 3D de la molécula de Glucosa ($C_6H_{12}O_6$): cuenta los carbonos de su anillo piranósico.',
          'Carga la molécula de la Glicina ($C_2H_5NO_2$), el aminoácido más simple: identifica su grupo amino ($-NH_2$) y su grupo carboxilo ($-COOH$).',
          'Examina el fragmento helicoidal del ADN: observa cómo los puentes de hidrógeno unen las bases nitrogenadas centrales.',
          'Dibuja en tu libreta científica los tres esquemas moleculares identificando los enlaces de carbono con colores distintivos.'
        ],
        materials: ['Computadora o tablet', 'Navegador web con WebGL activo', 'Cuaderno de dibujo científico', 'Lápices de colores']
      },
      applicationActivity: {
        title: 'Auditoría nutricional de un almuerzo tradicional ecuatoriano',
        task: 'Analiza un plato tradicional ecuatoriano (por ejemplo: locro de papa con queso y aguacate, o encocado de pescado con arroz y plátano maduro). Descompón cada ingrediente en su biomolécula predominante (glúcidos simples/complejos, proteínas completas, lípidos saturados/insaturados). Justifica si provee los precursores moleculares necesarios para un estudiante de 12 años en etapa de crecimiento acelerado.',
        deliverable: 'Ficha técnica nutricional y bioquímica (tabla ilustrada con porcentajes estimados y justificación fisiológica).'
      },
      formativeEvaluation: {
        description: 'Comprensión de las familias de biomoléculas, identificación de monómeros y valoración de la relación entre nutrición y bioquímica celular.',
        expectedEvidence: 'Avril clasifica correctamente glúcidos, lípidos, proteínas y ácidos nucleicos y justifica la importancia del carbono y los aminoácidos en la estructura viva.'
      },
      evaluationRubric: {
        criterion: 'Identificación y función de biomoléculas orgánicas en la célula (CN.4.1.2)',
        indicators: [
          { level: 'Inicial', descriptor: 'Memoriza los nombres de las biomoléculas pero confunde monómeros y funciones biológicas básicas.' },
          { level: 'En desarrollo', descriptor: 'Relaciona nutrientes con energía pero presenta dificultades para explicar la estructura de aminoácidos o la complementariedad del ADN.' },
          { level: 'Consolidado', descriptor: 'Explica con precisión la versatilidad del carbono, distingue monómeros y polímeros, fundamenta la estructura de la doble hélice y evalúa dietas desde la bioquímica celular.' }
        ]
      },
      expectedFeedback: 'Brillante trabajo de análisis bioquímico, Avril. Has articulado el rol del carbono y la estructura del ADN con una profundidad asombrosa. Reconocer a Rosalind Franklin y analizar la nutrición andina demuestra tu pensamiento holístico y ético.',
      difficultyAdaptation: 'Utilizar el juego de modelado con plastilina o clips de colores para encadenar monómeros formando polímeros visibles.',
      advancedExtension: 'Avril investiga la desnaturalización proteica por cambios de pH o temperatura, analizando por qué el jugo de limón "cocina" químicamente las proteínas del pescado en el ceviche.',
      resources: [
        {
          id: 'class-sci-avril-02-res-1',
          type: 'simulator',
          title: 'MolView — Modelado Molecular 3D y Estructura Química',
          url: 'https://molview.org/',
          description: 'Herramienta OER abierta para visualizar y rotar macromoléculas orgánicas (glucosa, aminoácidos, nucleótidos) en 3D interactivo.',
          duration: '25 min',
          order: 1
        },
        {
          id: 'class-sci-avril-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Bioquímica Celular y Código de la Vida',
          url: '/api/v1/academic/classes/class-sci-avril-02/guide.pdf',
          description: 'Ficha de trabajo con estructuras químicas de Fisher, problemas de emparejamiento de bases nitrogenadas y auditoría nutricional.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-sci-avril-02-act-1',
          title: 'Rosalind Franklin y la Fotografía 51',
          description: 'Lee sobre el descubrimiento del ADN y reflexiona sobre el reconocimiento histórico a las científicas mujeres.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-sci-avril-02-act-2',
          title: 'Exploración Tridimensional en MolView',
          description: 'Modela glucosa y glicina en 3D y analiza la disposición espacial de los átomos de carbono.',
          type: 'practice',
          points: 20,
          completed: false
        },
        {
          id: 'class-sci-avril-02-act-3',
          title: 'Auditoría Nutricional Bioquímica',
          description: 'Elabora la ficha técnica del plato tradicional ecuatoriano descomponiendo sus macronutrientes esenciales.',
          type: 'project',
          points: 20,
          completed: false
        }
      ],
      homeworkTask: 'Revisa dos etiquetas de alimentos envasados de tu alacena e identifica el contenido en gramos de carbohidratos totales, azúcares simples, proteínas y grasas monoinsaturadas.',
      reflectionPrompt: '¿Cómo influye la calidad de las moléculas que ingieres cada día en la calidad de tus pensamientos y tu energía vital?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_sci_avril_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-sci-avril-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-03-CNI', subjectCode: 'CNI-801', unitNumber: 1, sessionNumber: 2 }
    }
  ]
};

