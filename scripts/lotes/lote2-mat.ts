import { CurriculumLote } from './lote1-len';

export const LOTE_02_MAT: CurriculumLote = {
  loteId: 'LOTE-GAEL-02-MAT',
  loteNumber: 2,
  subjectCode: 'MAT-401',
  subjectName: 'Matemáticas',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unidad 1: Sentido Numérico, Operaciones CPA y Geometría Visual',
  unitNumber: 1,
  classesCount: 5,
  classes: [
    {
      id: 'class-mat-gael-01',
      subjectId: 'mat-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-07',
      dayOfWeek: 'Lunes',
      scheduleTime: '10:00 - 10:45 (45 min)',
      unit: 'Unidad 1: Sentido Numérico, Operaciones CPA y Geometría Visual',
      theme: 'El misterio de los números: Contar agrupando en decenas y centenas',
      objective: 'Comprender el sistema decimal agrupando objetos concretos en decenas y centenas.',
      learningPurpose: 'Descubrir que agrupar de 10 en 10 nos ahorra tiempo y nos ayuda a no perder la cuenta cuando hay muchos elementos.',
      competencyDcd: 'M.2.1.14 — Reconocer el valor posicional de números naturales basándose en la composición y descomposición mediante material concreto (Base 10 / Lego).',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Hola, súper calculador Gael! Si tuvieras 100 monedas de chocolate sueltas en el piso y quisieras contarlas antes de que se derritan, ¿las contarías de una en una o harías paquetitos? ¡Los matemáticos inventaron el truco de las decenas para contar a la velocidad de un rayo!',
      reading: 'La fábrica de cajas mágicas: En el taller del profesor Lucas hay miles de bloques de colores. Lucas le enseña a Gael que 10 bloquecitos sueltos (unidades) se pueden unir para formar una torre firme llamada DECENA. Y si juntas 10 torres de decenas, formas una placa cuadrada llamada CENTENA. ¡Así, con solo mirar las placas y las torres, sabes cuántos bloques hay sin contarlos uno por uno!',
      pedagogicalExplanation: 'El Método Singapur nos enseña a través de tres pasos (CPA): 1) Concreto: tocamos bloques de Lego o frijoles. 2) Pictórico: dibujamos torres y cuadrados en la libreta. 3) Abstracto: escribimos el número con cifras (ejemplo: 135 = 1 centena, 3 decenas y 5 unidades).',
      vocabulary: [
        { term: 'Unidad', definition: 'El elemento más pequeño que se cuenta de uno en uno (del 1 al 9).', childFriendlyExample: 'Una ficha de Lego sola es una unidad.' },
        { term: 'Decena', definition: 'Un grupo de 10 unidades juntas.', childFriendlyExample: 'Una torre de 10 fichas de Lego es una decena.' },
        { term: 'Centena', definition: 'Un grupo de 10 decenas (100 unidades).', childFriendlyExample: 'Una placa de 100 fichas es una centena.' }
      ],
      contextualizedExample: 'Si Gael tiene 24 cochecitos de juguete, tiene 2 cajas de 10 (2 decenas) y 4 cochecitos sueltos (4 unidades). En número se escribe 24.',
      socraticQuestions: [
        '¿Por qué crees que los seres humanos decidimos agrupar de 10 en 10 y no de 7 en 7? (Pista: mira tus manos).',
        'Si tienes 3 decenas de manzanas y te regalan 5 unidades más, ¿cuántas manzanas tienes en total?',
        '¿Qué pesa más: 1 centena de plumas o 10 decenas de plumas?'
      ],
      practicalActivity: {
        title: 'Construcción Base 10 con bloques Lego',
        instructions: [
          'Arma 3 torres de 10 fichas de Lego cada una.',
          'Deja 7 fichas sueltas al lado.',
          'Representa en tu pizarra mágica el número total: ¿cuántas decenas hay? ¿cuántas unidades? Escribe el número en grande.'
        ],
        materials: ['Bloques de Lego o regletas', 'Pizarra o libreta', 'Marcador']
      },
      applicationActivity: {
        title: 'El banco de la tienda de juguetes',
        task: 'Dibuja en tu libreta tres productos de una tienda con sus precios en centenas, decenas y unidades usando dibujos de placas y torres.',
        deliverable: 'Ficha con 3 dibujos de juguetes y su descomposición aditiva.'
      },
      formativeEvaluation: {
        description: 'Descomposición aditiva y manipulación de material concreto Base 10.',
        expectedEvidence: 'Gael manipula las fichas, explica que 10 unidades hacen 1 decena y escribe el número 37 sin dudar.'
      },
      evaluationRubric: {
        criterion: 'Comprensión del valor posicional en base 10 (M.2.1.14)',
        indicators: [
          { level: 'Inicial', descriptor: 'Cuenta los objetos de 1 en 1 y necesita ayuda para formar grupos de 10.' },
          { level: 'En desarrollo', descriptor: 'Forma decenas con material concreto pero se confunde al escribir el valor posicional.' },
          { level: 'Consolidado', descriptor: 'Agrupa con agilidad en decenas y centenas, y traduce con fluidez de lo concreto a lo numérico.' }
        ]
      },
      expectedFeedback: '¡Impresionante agilidad mental, Gael! Descubriste que contar en decenas es como tener un superpoder para ordenar juguetes y números.',
      difficultyAdaptation: 'Utilizar una huevera de 10 espacios y granos de maíz para verificar físicamente que al llenarse la huevera se convierte en una decena.',
      advancedExtension: 'Gael investiga qué número se forma con 10 centenas juntas (¡el mil, la Unidad de Mil!) y dibuja un gran cubo de 1.000.',
      resources: [
        {
          id: 'class-mat-gael-01-res-1',
          type: 'simulator',
          title: 'GeoGebra: Bloques de Base 10 Interactivos',
          url: 'https://www.geogebra.org/m/XU9z5m9X',
          description: 'Simulador manipulativo virtual para componer y descomponer centenas, decenas y unidades.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-mat-gael-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Agrupando en Base 10',
          url: '/api/v1/academic/classes/class-mat-gael-01/guide.pdf',
          description: 'Ficha de trabajo con desafíos visuales del Método Singapur para 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-mat-gael-01-act-1',
          title: 'El Reto de las Cajas',
          description: 'Descubre cuántos bloques hay en el taller observando las placas y torres.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-mat-gael-01-act-2',
          title: 'Laboratorio Lego Base 10',
          description: 'Arma tus torres de decenas y descompón los números 37 y 52.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-mat-gael-01-act-3',
          title: 'Tienda de Precios Descompuestos',
          description: 'Dibuja los 3 juguetes con sus precios en placas y torres.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Pregunta a tus papás cuántos años tienen y descompón sus edades en decenas y unidades.',
      reflectionPrompt: '¿Qué cosas en tu casa vienen agrupadas en paquetes de 10 o de 12?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_mat_gael_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-mat-gael-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-02-MAT', subjectCode: 'MAT-401', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-mat-gael-02',
      subjectId: 'mat-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-08',
      dayOfWeek: 'Martes',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Sentido Numérico, Operaciones CPA y Geometría Visual',
      theme: 'La recta numérica y el valor posicional: ¿Cuánto vale cada dígito?',
      objective: 'Ubicar números naturales en la semirrecta numérica y comparar cantidades usando relaciones de orden.',
      learningPurpose: 'Comprender que la posición de un número determina su valor real (no es lo mismo tener el 5 en las unidades que en las centenas).',
      competencyDcd: 'M.2.1.12 — Representar, escribir y leer números naturales en la semirrecta numérica y establecer relaciones de secuencia y orden (<, >, =).',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Hola, explorador de números! ¿Alguna vez has jugado a dar pasos gigantes y pasos de hormiga? La semirrecta numérica es como un camino mágico donde los números viven en fila india, perfectamente ordenados desde el más pequeño hasta el más grande. Hoy aprenderemos a saltar como ranitas sabias sobre la recta.',
      reading: 'La carrera de los animales andinos: En el páramo, la llama Kusi, el conejo Tambo y el venado de cola blanca compiten en una carrera amistosa. Kusi dio saltos de 10 en 10 y llegó al punto 50. Tambo dio saltos de 5 en 5 y llegó al 35. El venado dio un salto largo hasta el 80. Cuando miraron la recta marcada en la tierra, supieron al instante quién iba más adelante sin necesidad de discutir, porque en la recta los números crecen siempre hacia la derecha.',
      pedagogicalExplanation: 'La semirrecta numérica empieza en el 0 y va hacia adelante con una flecha que indica que nunca termina. El valor posicional significa que el número 5 vale 5 si está en las unidades ($5$), pero vale 50 si se muda a las decenas ($50$), y vale 500 si se muda a las centenas ($500$).',
      vocabulary: [
        { term: 'Semirrecta numérica', definition: 'Una línea recta graduada que empieza en cero y sirve para ordenar números.', childFriendlyExample: 'Tu regla escolar es una semirrecta numérica en centímetros.' },
        { term: 'Mayor que (>) y Menor que (<)', definition: 'Símbolos matemáticos que comparan dos cantidades.', childFriendlyExample: 'El cocodrilo comilón siempre abre la boca grande hacia el número mayor: 80 > 35.' }
      ],
      contextualizedExample: 'Si tienes $25 y tu hermana tiene $52, los dos números usan el 2 y el 5, ¡pero 52 es mucho mayor porque tiene 5 decenas!',
      socraticQuestions: [
        '¿Por qué el número 52 es más grande que el 25 si tienen exactamente los mismos dígitos?',
        'Si estás en el número 40 de la recta y das 3 saltos de 10 hacia la derecha, ¿en qué número aterrizas?',
        '¿Hacia qué lado de la recta saltarías si quisieras restar o quitar números?'
      ],
      practicalActivity: {
        title: 'La recta numérica en el suelo de la sala',
        instructions: [
          'Pega una tira de cinta adhesiva de papel en el suelo con marcas del 0 al 100 de 10 en 10.',
          'Párate en el número 20.',
          'Da un salto hacia adelante sumando 30 (aterrizas en 50).',
          'Da un paso hacia atrás restando 10 (aterrizas en 40).'
        ],
        materials: ['Cinta adhesiva de enmascarar', 'Marcador para piso', 'Tus pies activos']
      },
      applicationActivity: {
        title: 'El torneo del cocodrilo glotón',
        task: 'En tu libreta dibuja la cara del cocodrilo con la boca abierta (< o >) comparando 5 pares de números de dos y tres cifras (ej: 145 y 154).',
        deliverable: 'Página de ejercicios resuelta con justificación oral del valor posicional.'
      },
      formativeEvaluation: {
        description: 'Lectura, ubicación y comparación en la semirrecta numérica.',
        expectedEvidence: 'Gael ubica números en la recta y explica por qué 154 > 145 fijándose en la decena.'
      },
      evaluationRubric: {
        criterion: 'Ubicación en la recta numérica y comparación de orden (M.2.1.12)',
        indicators: [
          { level: 'Inicial', descriptor: 'Ubica números menores a 20 pero confunde el sentido de los símbolos mayor y menor.' },
          { level: 'En desarrollo', descriptor: 'Compara números de dos cifras y usa la recta con apoyo del tutor.' },
          { level: 'Consolidado', descriptor: 'Ubica con exactitud cantidades en la recta y fundamenta sus comparaciones en el valor de las cifras.' }
        ]
      },
      expectedFeedback: '¡Fantástica puntería en la recta, Gael! Entendiste muy bien que la posición del dígito cambia todo su valor. ¡Ese cocodrilo comilón no se equivocó nunca!',
      difficultyAdaptation: 'Dibujar ojos y dientes en el símbolo > para que recuerde que es la boca de un cocodrilo que siempre come donde hay más comida.',
      advancedExtension: 'Gael crea una recta de 100 en 100 hasta el 1.000 y ubica números intermedios como 350 o 720.',
      resources: [
        {
          id: 'class-mat-gael-02-res-1',
          type: 'simulator',
          title: 'Mathigon: Recta Numérica Interactiva',
          url: 'https://mathigon.org/',
          description: 'Lienzo interactivo para simular saltos de ranita y comparar cantidades en la recta.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-mat-gael-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Saltando en la Semirrecta',
          url: '/api/v1/academic/classes/class-mat-gael-02/guide.pdf',
          description: 'Ficha imprimible con rectas graduadas y desafíos de comparación numérica.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-mat-gael-02-act-1',
          title: 'La Carrera del Páramo',
          description: 'Ordena de menor a mayor las posiciones de los 3 animales en la recta.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-mat-gael-02-act-2',
          title: 'Saltos Físicos en la Recta',
          description: 'Camina y salta sobre la recta numérica del suelo resolviendo retos.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-mat-gael-02-act-3',
          title: 'El Cocodrilo Glotón',
          description: 'Completa los 5 desafíos de comparación con los símbolos < y >.',
          type: 'quiz',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Mide con una regla de 30 cm la longitud de tu libro favorito y anota entre qué números quedó.',
      reflectionPrompt: '¿Para qué le sirve a un conductor ver los números de kilómetros en la carretera?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_mat_gael_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-mat-gael-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-02-MAT', subjectCode: 'MAT-401', unitNumber: 1, sessionNumber: 2 }
    },
    {
      id: 'class-mat-gael-03',
      subjectId: 'mat-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-09',
      dayOfWeek: 'Miércoles',
      scheduleTime: '10:45 - 11:30 (45 min)',
      unit: 'Unidad 1: Sentido Numérico, Operaciones CPA y Geometría Visual',
      theme: 'Figuras planas en el mundo real: Lados, vértices y patrones geométricos',
      objective: 'Identificar y caracterizar cuadrados, rectángulos, triángulos y círculos según el número de lados y vértices.',
      learningPurpose: 'Descubrir que todas las construcciones del mundo (casas, puentes, ventanas) están hechas combinando figuras geométricas básicas.',
      competencyDcd: 'M.2.2.1 — Reconocer y diferenciar cuadrados, rectángulos, triángulos y círculos a partir del análisis de sus lados y vértices.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Hola, arquitecto Gael! Si miras a tu alrededor, verás que la puerta es un rectángulo, la rueda de la bicicleta es un círculo y la rebanada de pizza parece un triángulo. Las figuras geométricas son los ladrillos con los que Dios y los seres humanos han diseñado el espacio. ¡Hoy aprenderemos a identificarlas por sus esquinas y sus lados!',
      reading: 'La ciudad de las formas: En un reino geométrico vivían cuatro amigos: Cuadrado (que presumía de tener 4 lados exactamente iguales), Rectángulo (que tenía 4 lados, dos largos y dos cortos), Triángulo (un explorador veloz con 3 lados y 3 esquinas puntiagudas) y Círculo (que no tenía ninguna esquina porque era una curva suave y perfecta que podía rodar sin parar). Juntos construyeron un castillo: el rectángulo fue la puerta, los cuadrados las ventanas, los triángulos los techos protectores y los círculos las ruedas del puente levadizo.',
      pedagogicalExplanation: 'Las figuras planas tienen dos partes clave: 1) Lados: las líneas rectas que forman el contorno. 2) Vértices: las esquinas donde se unen dos lados (como las esquinas de una mesa). El círculo no tiene lados rectos ni vértices.',
      vocabulary: [
        { term: 'Lado', definition: 'Cada una de las líneas rectas que limitan una figura plana.', childFriendlyExample: 'Un cuadrado tiene 4 lados iguales.' },
        { term: 'Vértice', definition: 'El punto o esquina donde se unen dos lados.', childFriendlyExample: 'Un triángulo tiene 3 vértices puntiagudos.' },
        { term: 'Patrón geométrico', definition: 'Una secuencia ordenada de figuras que se repite siguiendo una regla.', childFriendlyExample: 'Círculo, cuadrado, círculo, cuadrado... es un patrón.' }
      ],
      contextualizedExample: 'Las señales de tránsito: la señal de PARE es un octágono, la de peligro es un triángulo y la de información es un rectángulo azul.',
      socraticQuestions: [
        '¿Por qué las ruedas de los carros son círculos y no cuadrados? ¿Qué pasaría si fueran triángulos?',
        'Si un cuadrado tiene 4 lados iguales, ¿en qué se parece y en qué se diferencia de un rectángulo?',
        '¿Cuántos triángulos necesitas juntar para formar un cuadrado?'
      ],
      practicalActivity: {
        title: 'Geometría con palillos y plastilina',
        instructions: [
          'Toma palillos de dientes (lados) y bolitas de plastilina (vértices).',
          'Construye un triángulo uniendo 3 palillos con 3 bolitas.',
          'Construye un cuadrado uniendo 4 palillos con 4 bolitas.',
          'Cuenta los lados y vértices con tu dedo mientras los tocas.'
        ],
        materials: ['Palillos de dientes o sorbetes', 'Plastilina de colores']
      },
      applicationActivity: {
        title: 'El robot geométrico',
        task: 'En una hoja de papel crea el dibujo de un robot usando únicamente triángulos, círculos, cuadrados y rectángulos. Al lado haz una tabla indicando cuántas figuras de cada una usaste.',
        deliverable: 'Dibujo del robot y tabla de conteo de figuras geométricas.'
      },
      formativeEvaluation: {
        description: 'Clasificación de figuras geométricas y conteo de lados y vértices con material manipulativo.',
        expectedEvidence: 'Gael explica con seguridad que el cuadrado tiene 4 lados iguales y 4 vértices, y que el triángulo tiene 3.'
      },
      evaluationRubric: {
        criterion: 'Identificación de propiedades de figuras geométricas planas (M.2.2.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Nombra las figuras pero confunde lados con esquinas o vértices.' },
          { level: 'En desarrollo', descriptor: 'Identifica lados y vértices en cuadrados y triángulos pero le cuesta diferenciar el rectángulo.' },
          { level: 'Consolidado', descriptor: 'Distingue con precisión lados y vértices de las 4 figuras y construye patrones geométricos con creatividad.' }
        ]
      },
      expectedFeedback: '¡Extraordinario robot geométrico, Gael! Construiste las figuras con mucha precisión con los palillos y la plastilina. ¡Tienes visión de ingeniero!',
      difficultyAdaptation: 'Usar figuras de cartón ya recortadas para que Gael trace su contorno con el dedo antes de contarlas.',
      advancedExtension: 'Gael explora figuras de 5 y 6 lados (pentágonos y hexágonos) observando cómo las abejas construyen los panales en la naturaleza.',
      resources: [
        {
          id: 'class-mat-gael-03-res-1',
          type: 'simulator',
          title: 'Toy Theater: Geoboard Virtual (Geoplano)',
          url: 'https://toytheater.com/geoboard/',
          description: 'Geoplano virtual con bandas elásticas para construir figuras geométricas interactivas.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-mat-gael-03-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Cazadores de Formas',
          url: '/api/v1/academic/classes/class-mat-gael-03/guide.pdf',
          description: 'Ficha práctica de identificación de lados, vértices y patrones geométricos para 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-mat-gael-03-act-1',
          title: 'La Ciudad de las Formas',
          description: 'Identifica qué figura fue la puerta, la ventana y el techo del castillo.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-mat-gael-03-act-2',
          title: 'Construcción con Palillos y Plastilina',
          description: 'Arma tus figuras planas en 2D y cuenta sus lados y vértices.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-mat-gael-03-act-3',
          title: 'Robot Geométrico',
          description: 'Dibuja tu robot y completa la tabla de conteo de figuras.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Encuentra en tu habitación 2 objetos con forma de círculo y 2 con forma de rectángulo y dibújalos.',
      reflectionPrompt: '¿Qué figura geométrica crees que es la más fuerte para sostener un techo pesado?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_mat_gael_03.pdf',
      guideUrl: '/api/v1/academic/classes/class-mat-gael-03/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-02-MAT', subjectCode: 'MAT-401', unitNumber: 1, sessionNumber: 3 }
    },
    {
      id: 'class-mat-gael-04',
      subjectId: 'mat-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-10',
      dayOfWeek: 'Jueves',
      scheduleTime: '08:00 - 08:45 (45 min)',
      unit: 'Unidad 1: Sentido Numérico, Operaciones CPA y Geometría Visual',
      theme: 'La suma como unión y reagrupación: El puente de las decenas',
      objective: 'Resolver adiciones con reagrupación utilizando el método Singapur y regletas visuales.',
      learningPurpose: 'Entender qué pasa realmente cuando "llevamos 1": no es magia, es transformar 10 unidades sueltas en una nueva decena completa.',
      competencyDcd: 'M.2.1.19 — Relacionar la noción de adición con la de agregar objetos a un conjunto y aplicar el algoritmo de la suma con reagrupación.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Hola, campeón de los números! ¿Alguna vez has visto que cuando juntas 10 monedas de un centavo las puedes cambiar en la tienda por una moneda brillante de 10 centavos? En la suma pasa lo mismo: cuando en la columna de las unidades se juntan 10 o más fichas, no caben todas en su casita, ¡así que forman una decena y cruzan el puente hacia la columna vecina!',
      reading: 'El puente de la fiesta de cumpleaños: En el bosque andino, los conejitos preparan una ensalada de zanahorias. La familia de Kusi trajo 28 zanahorias y la familia de Tambo trajo 15 zanahorias. Juntaron las unidades: $8 + 5 = 13$. ¡Pero en la canasta de las unidades solo caben números del 0 al 9! Entonces tomaron 10 zanahorias, las ataron con una cuerda dorada formando una nueva decena y la pasaron a la canasta de las decenas. Ahora tienen 2 decenas + 1 decena nueva + 1 decena que ya estaba = 4 decenas, y quedaron 3 zanahorias sueltas. ¡En total hay 43 zanahorias deliciosas!',
      pedagogicalExplanation: 'Sumar con reagrupación (llevar) es muy sencillo si recuerdas la regla de oro: las unidades solo viven solas hasta el 9. En cuanto se forma un grupo de 10, se empaqueta como 1 decena y se suma con las demás decenas.',
      vocabulary: [
        { term: 'Adición', definition: 'La operación matemática que consiste en juntar o agregar dos o más cantidades.', childFriendlyExample: 'Juntar tus canicas con las de tu amigo es hacer una adición.' },
        { term: 'Reagrupación', definition: 'Cambiar 10 unidades por 1 decena (o 10 decenas por 1 centena).', childFriendlyExample: 'Cuando 8 + 5 da 13, dejamos el 3 y pasamos el 1 a las decenas.' }
      ],
      contextualizedExample: 'Si tienes 27 piezas de Lego y tu papá te presta 16 piezas más, sumas $7 + 6 = 13$ (dejas 3 y pasas 1 decena); luego $2 + 1 + 1 = 4$ decenas. ¡Tienes 43 piezas para armar tu nave!',
      socraticQuestions: [
        '¿Por qué crees que no podemos escribir el número 13 completo en la casilla de las unidades?',
        'Si tienes 19 caramelos y te dan 1 caramelo más, ¿qué pasa con tus unidades?',
        '¿Cómo comprobarías con bloques de Lego que 28 + 15 es exactamente 43?'
      ],
      practicalActivity: {
        title: 'El puente de las fichas de colores',
        instructions: [
          'Dibuja dos casitas en una hoja: la casa de las Unidades (derecha) y la casa de las Decenas (izquierda).',
          'Coloca 28 frejoles (2 decenas de 10 y 8 sueltos).',
          'Agrega 15 frejoles (1 decena de 10 y 5 sueltos).',
          'Junta los sueltos: como son 13, mete 10 en una bolsita plástica (nueva decena) y pásala a la casa de las decenas.',
          'Cuenta el resultado final.'
        ],
        materials: ['Frejoles o botones', 'Bolsitas o ligas', 'Hoja con las casitas de valor posicional']
      },
      applicationActivity: {
        title: 'El restaurante de la selva',
        task: 'Resuelve 3 problemas de sumas con reagrupación sobre animales que recolectan frutas en la selva, escribiendo la decena que sube al techo con color rojo.',
        deliverable: 'Ficha resuelta con el procedimiento visual de reagrupación claramente marcado.'
      },
      formativeEvaluation: {
        description: 'Resolución de adiciones con reagrupación explicando el pase de la decena.',
        expectedEvidence: 'Gael explica con sus palabras qué significa el "1" que se lleva a la columna de decenas.'
      },
      evaluationRubric: {
        criterion: 'Aplicación del algoritmo de adición con reagrupación CPA (M.2.1.19)',
        indicators: [
          { level: 'Inicial', descriptor: 'Suma sin reagrupar pero escribe dos dígitos en la columna de unidades.' },
          { level: 'En desarrollo', descriptor: 'Aplica el algoritmo mecánico de llevar pero le cuesta explicar por qué lo hace con material.' },
          { level: 'Consolidado', descriptor: 'Resuelve adiciones con reagrupación con soltura y demuestra el canje de 10 unidades por 1 decena con material concreto.' }
        ]
      },
      expectedFeedback: '¡Qué gran maestro de la suma eres, Gael! Tu explicación de por qué las 10 zanahorias se atan con una cuerda fue perfecta. ¡El puente de las decenas funcionó sin atascos!',
      difficultyAdaptation: 'Utilizar una cajita con tapa llamada "el banco" donde Gael entrega 10 monedas de 1 para que el tutor le devuelva 1 moneda de 10.',
      advancedExtension: 'Gael resuelve una suma de tres cifras con reagrupación en las centenas (ejemplo: $180 + 150 = 330$).',
      resources: [
        {
          id: 'class-mat-gael-04-res-1',
          type: 'simulator',
          title: 'Didax: Regletas Virtuales para Suma con Reagrupación',
          url: 'https://www.didax.com/',
          description: 'Regletas Cuisenaire virtuales para visualizar la composición y el canje en la adición.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-mat-gael-04-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — El Puente de las Decenas',
          url: '/api/v1/academic/classes/class-mat-gael-04/guide.pdf',
          description: 'Ejercicios guiados con casitas de valor posicional y colores para 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-mat-gael-04-act-1',
          title: 'La Fiesta de las Zanahorias',
          description: 'Cuenta y agrupa las zanahorias de la lectura para descubrir el total.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-mat-gael-04-act-2',
          title: 'Taller de las Bolsitas y Frejoles',
          description: 'Realiza el canje físico de 10 unidades por 1 decena en tu mesa.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-mat-gael-04-act-3',
          title: 'El Restaurante de la Selva',
          description: 'Resuelve los 3 problemas anotando la decena viajera con rojo.',
          type: 'quiz',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Suma el precio de dos compras pequeñas que hagan en casa usando tu casita de decenas.',
      reflectionPrompt: '¿En qué se parece ayudar en equipo a sumar números con reagrupación?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_mat_gael_04.pdf',
      guideUrl: '/api/v1/academic/classes/class-mat-gael-04/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-02-MAT', subjectCode: 'MAT-401', unitNumber: 1, sessionNumber: 4 }
    },
    {
      id: 'class-mat-gael-05',
      subjectId: 'mat-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-11',
      dayOfWeek: 'Viernes',
      scheduleTime: '08:00 - 08:45 (45 min)',
      unit: 'Unidad 1: Sentido Numérico, Operaciones CPA y Geometría Visual',
      theme: 'La multiplicación como saltos repetidos: El camino de la rana',
      objective: 'Comprender la multiplicación como una adición de sumandos iguales a través de matrices visuales y saltos en la recta.',
      learningPurpose: 'Descubrir que multiplicar no es memorizar tablas aburridas, sino un súper atajo para sumar muchas veces el mismo número en un segundo.',
      competencyDcd: 'M.2.1.19 — Relacionar la noción de multiplicación como una adición abreviada de sumandos iguales y representarla en arreglos rectangulares.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Llegó el viernes de súper matemáticas, Gael! Imagina que una ranita salta sobre nenúfares y en cada salto avanza 3 metros. Si da 4 saltos, ¿cuánto avanzó? Podrías sumar: $3 + 3 + 3 + 3$. Pero, ¿sabías que hay una máquina matemática más veloz llamada "signo por" (×)? Decimos: 4 veces 3 es igual a 12 (4 × 3 = 12). ¡Multiplicar es el atajo más genial del universo!',
      reading: 'La plantación de maíz de Don Quinde: En un huerto de Imbabura, Don Quinde sembró choclos en filas muy ordenadas. Hizo 3 filas y en cada fila sembró 5 plantitas de maíz. Quinde quería saber cuántos choclos tendría en total. En lugar de contarlos de uno en uno, miró el rectángulo: 3 filas con 5 choclos cada una. Dijo con una sonrisa: "3 veces 5 es 5 + 5 + 5 = 15". Su hijo colibrí le dijo: "¡Papá, eso es 3 × 5 = 15!". Los dos aplaudieron felices porque la multiplicación les ahorró media hora de conteo.',
      pedagogicalExplanation: 'La multiplicación es una suma rápida de grupos iguales. Para que haya multiplicación, todos los grupos deben tener exactamente la misma cantidad. El primer número te dice cuántos grupos hay; el segundo te dice cuántos elementos tiene cada grupo.',
      vocabulary: [
        { term: 'Multiplicación', definition: 'Operación que consiste en sumar un número tantas veces como indica otro.', childFriendlyExample: '3 x 4 significa 3 veces el 4 (4 + 4 + 4).' },
        { term: 'Factores', definition: 'Los números que se multiplican entre sí.', childFriendlyExample: 'En 3 x 5 = 15, el 3 y el 5 son los factores.' },
        { term: 'Arreglo rectangular', definition: 'Organizar objetos en filas y columnas iguales.', childFriendlyExample: 'Una barra de chocolate con 3 filas de 4 cuadritos es un arreglo rectangular.' }
      ],
      contextualizedExample: 'Si compras 4 paquetes de cromos y cada paquete trae 5 cromos, no cuentas 1, 2, 3... dices: 4 × 5 = 20 cromos.',
      socraticQuestions: [
        '¿Podrías multiplicar si un paquete tiene 3 galletas y otro paquete tiene 5 galletas? ¿Por qué no?',
        '¿Qué prefieres: que te regalen 2 + 2 + 2 dólares o 3 × 2 dólares? ¿Es lo mismo?',
        'Si una caja de huevos tiene 2 filas de 6 huevos, ¿cuántos huevos hay en total usando la multiplicación?'
      ],
      practicalActivity: {
        title: 'La cuadrícula de chocolate con fichas Lego',
        instructions: [
          'Arma un rectángulo con fichas de Lego que tenga 3 filas y 4 columnas.',
          'Escribe la suma repetida: 4 + 4 + 4 = 12.',
          'Escribe al lado la multiplicación: 3 × 4 = 12.',
          'Gira el rectángulo de Lego para que tenga 4 filas y 3 columnas: ¿cuánto da 4 × 3? ¡Magia: da 12 igual!'
        ],
        materials: ['Placa de Lego y fichas', 'Libreta de dibujo', 'Lápiz']
      },
      applicationActivity: {
        title: 'El huerto rectangular de Gael',
        task: 'Dibuja en tu libreta un huerto con zanahorias organizadas en 4 filas de 3 zanahorias cada una. Escribe la suma de grupos y la multiplicación correspondiente.',
        deliverable: 'Dibujo del huerto con la fórmula 4 × 3 = 12 y 3 × 4 = 12.'
      },
      formativeEvaluation: {
        description: 'Comprensión conceptual de la multiplicación como adición repetida y propiedad conmutativa visual.',
        expectedEvidence: 'Gael explica por qué 3 × 4 y 4 × 3 dan el mismo resultado rotando su placa de Lego.'
      },
      evaluationRubric: {
        criterion: 'Representación visual y comprensión de la multiplicación (M.2.1.19)',
        indicators: [
          { level: 'Inicial', descriptor: 'Cuenta elementos de uno en uno y no asocia la multiplicación con grupos iguales.' },
          { level: 'En desarrollo', descriptor: 'Expresa la suma repetida pero necesita apoyo para escribir la expresión con el signo x.' },
          { level: 'Consolidado', descriptor: 'Modela arreglos rectangulares con facilidad, explica la multiplicación como suma abreviada y comprende la conmutatividad visualmente.' }
        ]
      },
      expectedFeedback: '¡Brillante cierre del lote de Matemáticas, Gael! Descubriste el secreto mejor guardado de los matemáticos: ¡multiplicar es sumar a la velocidad de la luz!',
      difficultyAdaptation: 'Dar saltos físicos sobre una alfombra contando en voz alta de 2 en 2 o de 5 en 5 antes de escribir la operación.',
      advancedExtension: 'Gael calcula mentalmente cuántos días hay en 3 semanas sabiendo que cada semana tiene 7 días (3 × 7 = 21).',
      resources: [
        {
          id: 'class-mat-gael-05-res-1',
          type: 'simulator',
          title: 'PhET Colorado: Multiplicación Aritmética Visual',
          url: 'https://phet.colorado.edu/sims/html/make-a-ten/latest/make-a-ten_es.html',
          description: 'Simulador PhET oficial de la Universidad de Colorado para modelar arreglos y grupos de multiplicación.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-mat-gael-05-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — El Salto de la Multiplicación',
          url: '/api/v1/academic/classes/class-mat-gael-05/guide.pdf',
          description: 'Ficha de trabajo con arreglos rectangulares y laberintos de multiplicación para 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-mat-gael-05-act-1',
          title: 'El Choclo de Don Quinde',
          description: 'Calcula cuántos choclos hay en 3 filas de 5 sin contar de uno en uno.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-mat-gael-05-act-2',
          title: 'Matriz Lego de Chocolate',
          description: 'Construye tu rectángulo de 3x4 y rótalo para verificar la propiedad conmutativa.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-mat-gael-05-act-3',
          title: 'Diseño del Huerto',
          description: 'Dibuja el huerto de zanahorias y escribe la suma y la multiplicación.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Cuenta cuántas ventanas tiene la fachada de tu casa organizándolas en filas y columnas multiplicadas.',
      reflectionPrompt: '¿En qué trabajos de la vida real crees que la gente usa la multiplicación todos los días?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_mat_gael_05.pdf',
      guideUrl: '/api/v1/academic/classes/class-mat-gael-05/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-02-MAT', subjectCode: 'MAT-401', unitNumber: 1, sessionNumber: 5 }
    }
  ]
};

