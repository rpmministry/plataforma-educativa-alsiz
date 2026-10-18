import { CurriculumLote } from './lote1-len';

export const LOTE_06_SOFT: CurriculumLote = {
  loteId: 'LOTE-GAEL-06-SOFT',
  loteNumber: 6,
  subjectCode: 'SOFT-401',
  subjectName: 'Software y Programación',
  category: 'COMPLEMENTARIA_SIGLO_XXI',
  unitTitle: 'Unidad 1: Pequeños Creadores: Algoritmos Desenchufados y Aventuras en Scratch',
  unitNumber: 1,
  classesCount: 2,
  classes: [
    {
      id: 'class-soft-gael-01',
      subjectId: 'soft-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-10',
      dayOfWeek: 'Jueves',
      scheduleTime: '10:45 - 11:30 (45 min)',
      unit: 'Unidad 1: Pequeños Creadores: Algoritmos Desenchufados y Aventuras en Scratch',
      theme: '¿Qué es un algoritmo? Pensamiento computacional y laberintos desenchufados',
      objective: 'Comprender el concepto de algoritmo como una secuencia ordenada de pasos lógicos para resolver un problema o alcanzar una meta.',
      learningPurpose: 'Aprender que las computadoras y robots no son adivinos: solo hacen exactamente lo que los humanos les ordenamos paso a paso con claridad y precisión.',
      competencyDcd: 'CSTA.1A-AP-08 — Model daily processes by creating and following algorithms (sets of step-by-step instructions) to complete tasks.',
      officialSource: 'CSTA K-12 Computer Science Standards (Level 1A: Grades 3-4) / Marco STEM ALSIZ',
      introduction: '¡Bip-bop, súper programador Gael! Soy tu amigo el Robot Codi. Mucha gente cree que las computadoras tienen un cerebro mágico que piensa solo, ¡pero es mentira! Los robots somos como cocineros muy obedientes pero muy despistados: si en la receta no dices "abre el huevo antes de tirarlo a la sartén", ¡el robot tirará el huevo con cáscara y todo! Esa lista de órdenes ordenadas paso a paso se llama ALGORITMO. Hoy aprenderemos a pensar como programadores sin necesidad de pantallas.',
      reading: 'La misión del sándwich de mermelada: En el laboratorio de Codi, Gael quiso programar a un robot para preparar un delicioso sándwich. La primera orden de Gael fue: "Pon mermelada en el pan". El robot tomó el frasco cerrado de mermelada y lo puso encima de la funda plástica de pan. ¡Plop! Gael se rio a carcajadas. "¡Espera, Codi! Olvidé los pasos previos". Gael tomó lápiz y papel y escribió un algoritmo perfecto: 1) Abrir la funda de pan. 2) Sacar dos rebanadas y ponerlas en el plato. 3) Destapar el frasco de mermelada. 4) Tomar el cuchillo de mantequilla. 5) Untar la mermelada sobre una rebanada. 6) Tapar con la otra rebanada. El robot siguió cada paso y... ¡ñam! ¡El sándwich quedó perfecto! A corregir los pasos cuando algo sale mal los ingenieros lo llaman DEPURAR (o quitar bugs).',
      pedagogicalExplanation: 'Un algoritmo es una secuencia de instrucciones finitas, claras y ordenadas que resuelven un problema o logran un objetivo. Si cambias el orden de los pasos, el resultado se arruina: no puedes ponerte los zapatos antes de las medias. El pensamiento computacional nos enseña a: 1) Descomponer un problema grande en pasos chiquitos. 2) Seguir la secuencia lógica. 3) Detectar errores (depuración).',
      vocabulary: [
        { term: 'Algoritmo', definition: 'Conjunto ordenado de instrucciones paso a paso para realizar una tarea.', childFriendlyExample: 'Una receta de cocina o las instrucciones para armar un Lego son algoritmos.' },
        { term: 'Programa', definition: 'Un algoritmo escrito en un lenguaje que una computadora puede comprender y ejecutar.', childFriendlyExample: 'El juego de Mario Bros es un programa con millones de algoritmos.' },
        { term: 'Depuración (Debug)', definition: 'Encontrar un error en las instrucciones y corregirlo para que todo funcione bien.', childFriendlyExample: 'Cuando corriges un paso equivocado en el laberinto, estás depurando.' }
      ],
      contextualizedExample: 'Cuando Gael se cepilla los dientes: 1) toma el cepillo, 2) pone pasta, 3) cepilla arriba y abajo por 2 minutos, 4) enjuaga con agua limpia. ¡Ese es su algoritmo de higiene dental!',
      socraticQuestions: [
        '¿Qué pasaría si en un semáforo el algoritmo de luces cambiara de rojo a verde sin pasar por el amarillo de precaución?',
        '¿Por qué las computadoras necesitan que las instrucciones sean súper exactas y no toleran confusiones?',
        'Si un robot se queda atascado caminando contra una pared, ¿de quién es la culpa: del robot o del programador que escribió el algoritmo?'
      ],
      practicalActivity: {
        title: 'El juego del robot ciego en la sala (Algoritmo desenchufado)',
        instructions: [
          'Elige un punto de partida (la puerta de la habitación) y una meta (un cojín con un juguete).',
          'Coloca dos obstáculos suaves en el camino (por ejemplo, dos sillas o cajas).',
          'Gael asume el rol de "Programador" y escribe en una tarjeta de papel los comandos con flechas: [Avanzar 2 pasos], [Girar 90° a la derecha], [Avanzar 3 pasos], [Recoger el tesoro].',
          'El tutor o un familiar cierra los ojos y actúa como "Robot Codi", obedeciendo ciegamente las órdenes exactas escritas por Gael.',
          'Si el robot choca con una silla, Gael debe hacer "Debug" (corregir la tarjeta con las flechas) y volver a ejecutar.'
        ],
        materials: ['Tarjetas de cartulina o papel', 'Marcador para dibujar flechas de comandos', 'Un cojín como tesoro']
      },
      applicationActivity: {
        title: 'El laberinto en cuadrícula del explorador',
        task: 'Dibuja una cuadrícula de 5x5 cuadros en tu libreta. En la casilla (1,1) dibuja a un astronauta y en la (5,5) dibuja una nave espacial. Coloca 3 asteroides como obstáculos. Escribe abajo la secuencia de flechas (↑, ↓, →, ←) del algoritmo que lleva al astronauta sano y salvo a su nave.',
        deliverable: 'Cuadrícula con el laberinto dibujado y la tira de código de flechas escrita al pie.'
      },
      formativeEvaluation: {
        description: 'Comprensión de la secuencia algorítmica y capacidad de depuración de errores lógicos.',
        expectedEvidence: 'Gael explica paso a paso por qué el orden de las instrucciones es crucial y corrige cualquier paso desordenado en su cuadrícula.'
      },
      evaluationRubric: {
        criterion: 'Diseño y seguimiento de algoritmos paso a paso desenchufados (CSTA.1A-AP-08)',
        indicators: [
          { level: 'Inicial', descriptor: 'Da órdenes generales pero no las descompone en pasos precisos ni detecta inconsistencias.' },
          { level: 'En desarrollo', descriptor: 'Escribe la secuencia de pasos con flechas pero requiere apoyo para corregir cuando hay un choque con obstáculo.' },
          { level: 'Consolidado', descriptor: 'Crea algoritmos precisos y eficientes, guía con éxito al robot ciego y depura errores con agilidad y razonamiento lógico impecable.' }
        ]
      },
      expectedFeedback: '¡Bip-bop-hurra, ingeniero Gael! Tu algoritmo del robot ciego fue tan preciso que no choqué ni una sola vez con los obstáculos. Tienes una mente brillante para la programación de naves espaciales. ¡Robot Codi te saluda con chispas de alegría!',
      difficultyAdaptation: 'Utilizar una cuadrícula más pequeña de 3x3 en el suelo usando baldosas para que Gael camine físicamente sobre los cuadros antes de escribir las flechas.',
      advancedExtension: 'Gael introduce el concepto de "Bucle o Repetición": en lugar de escribir [→] [→] [→] [→], escribe una tarjeta que diga [Repetir 4 veces: Avanzar →].',
      resources: [
        {
          id: 'class-soft-gael-01-res-1',
          type: 'simulator',
          title: 'Code.org: Pensamiento Computacional Desenchufado',
          url: 'https://code.org/curriculum/unplugged',
          description: 'Recurso oficial abierto de Code.org con actividades lúdicas sin pantalla sobre algoritmos y depuración.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-soft-gael-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Misión Robot Ciego',
          url: '/api/v1/academic/classes/class-soft-gael-01/guide.pdf',
          description: 'Ficha imprimible con tarjetas de comandos (Avanzar, Girar) y cuadrículas de laberinto para 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-soft-gael-01-act-1',
          title: 'La Misión del Sándwich',
          description: 'Analiza la receta fallida de Codi y descubre por qué los pasos previos son indispensables.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-soft-gael-01-act-2',
          title: 'Laboratorio del Robot Ciego',
          description: 'Guía al robot humano mediante comandos de flechas esquivando obstáculos en la sala.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-soft-gael-01-act-3',
          title: 'Laberinto Cuadriculado 5x5',
          description: 'Diseña el laberinto espacial y escribe la secuencia de flechas del algoritmo final.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Escribe en 4 pasos el algoritmo para atarse los cordones de los zapatos o para tender tu cama.',
      reflectionPrompt: '¿Qué sientes al saber que tú puedes ser el inventor que le enseña a las máquinas cómo ayudar a las personas?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_soft_gael_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-soft-gael-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-06-SOFT', subjectCode: 'SOFT-401', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-soft-gael-02',
      subjectId: 'soft-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-11',
      dayOfWeek: 'Viernes',
      scheduleTime: '11:30 - 12:00 (30 min)',
      unit: 'Unidad 1: Pequeños Creadores: Algoritmos Desenchufados y Aventuras en Scratch',
      theme: '¡Hola Scratch! Mi primer gato animado y la bandera verde',
      objective: 'Crear un programa interactivo básico en Scratch uniendo bloques de eventos ("Al presionar bandera verde"), movimiento ("Mover 10 pasos") y apariencia ("Decir ¡Hola!").',
      learningPurpose: 'Dar el salto de los algoritmos de papel a la programación visual real en la computadora, animando personajes interactivos que responden a nuestras órdenes.',
      competencyDcd: 'CSTA.1A-AP-10 — Develop programs with sequences and simple loops, to express ideas or address a problem.',
      officialSource: 'CSTA K-12 Computer Science Standards / Scratch MIT',
      introduction: '¡Llegó la hora de la magia digital, Gael! Ya sabes qué es un algoritmo. Ahora imagínate un lienzo donde los bloques de código encajan exactamente como fichas de Lego: si pones un bloque amarillo de EVENTO ("Al presionar bandera verde") y le enganchas un bloque azul de MOVIMIENTO ("Mover 10 pasos"), ¡tu personaje cobra vida en la pantalla en un milisegundo! Hoy entraremos a Scratch del MIT y haremos que el simpático gato Scratch hable, camine y salude al Ecuador.',
      reading: 'El nacimiento de un animador digital: En el laboratorio de computación del MIT (Massachusetts Institute of Technology), unos profesores geniales pensaron: "¿Por qué los niños solo tienen que jugar los videojuegos de otros si ellos tienen tanta imaginación para inventar los suyos?". Así crearon Scratch, un mundo donde no tienes que escribir letras difíciles en inglés ni memorizar códigos raros: solo arrastras bloques de colores que encajan con un chasquido sonoro. Cuando Gael presionó la bandera verde por primera vez y vio a su personaje avanzar por el escenario y decir: "¡Hola Gael, listo para la aventura!", supo que nunca más volvería a ver una computadora de la misma manera: ¡ahora él era el creador de la historia!',
      pedagogicalExplanation: 'En Scratch la pantalla se divide en tres zonas: 1) El Escenario (a la derecha): donde se mueven los personajes u objetos (sprites). 2) La Paleta de Bloques (a la izquierda): clasificada por colores: Eventos (amarillo), Movimiento (azul), Apariencia (morado), Sonido (rosa). 3) El Área de Programación (al centro): donde arrastramos los bloques y los conectamos verticalmente. El bloque "Al presionar Bandera Verde" es el interruptor de encendido de cualquier programa.',
      vocabulary: [
        { term: 'Scratch', definition: 'Plataforma educativa y lenguaje de programación visual por bloques desarrollado por el MIT para niños.', childFriendlyExample: 'En Scratch creamos videojuegos y cuentos interactivos uniendo bloques.' },
        { term: 'Objeto o Sprite', definition: 'El personaje o elemento gráfico que programamos dentro del escenario de Scratch.', childFriendlyExample: 'El gato amarillo es el primer sprite que aprendemos a mover.' },
        { term: 'Evento (Bandera Verde)', definition: 'La acción disparadora que hace que comience a ejecutarse una lista de bloques.', childFriendlyExample: 'Hacer clic en la bandera verde en Scratch es como decir: "¡3, 2, 1... acción!".' }
      ],
      contextualizedExample: 'Gael puede programar un sprite de colibrí que al presionar la bandera verde vuele hacia la copa de un árbol andino y emita un alegre trino digital.',
      socraticQuestions: [
        '¿Por qué crees que en Scratch los bloques tienen formas que solo encajan hacia abajo como fichas de Lego?',
        '¿Qué pasaría si intentas programar a tu personaje pero te olvidas de poner el bloque amarillo de la bandera verde?',
        'Si le dices al gato "Mover 10 pasos" y luego "Mover -10 pasos", ¿dónde terminará el gato?'
      ],
      practicalActivity: {
        title: 'El primer proyecto interactivo en Scratch MIT Web',
        instructions: [
          'Abre en el navegador la plataforma oficial: scratch.mit.edu/projects/editor/.',
          'Ve a la categoría "Eventos" (amarillo) y arrastra al centro el bloque: [al presionar bandera verde].',
          'Ve a la categoría "Movimiento" (azul) y engancha abajo: [mover 50 pasos].',
          'Ve a la categoría "Apariencia" (morado) y engancha: [decir ¡Hola Ecuador! por 2 segundos].',
          'Haz clic en la Bandera Verde arriba del escenario y observa la magia: ¡tu gato camina y habla!'
        ],
        materials: ['Computadora o tablet con navegador web', 'Scratch Editor en línea', 'Guía didáctica']
      },
      applicationActivity: {
        title: 'La tarjeta de presentación interactiva de Gael',
        task: 'En tu proyecto de Scratch, cambia el fondo del escenario eligiendo una montaña o parque ("Blue Sky"). Añade un segundo bloque de apariencia para que el gato diga tu nombre: "¡Mi programador estrella es Gael!". Guarda tu proyecto con el título "Hola_Gael_V1".',
        deliverable: 'Proyecto funcional en Scratch guardado en el computador o enlace del proyecto compartido.'
      },
      formativeEvaluation: {
        description: 'Construcción autónoma de una secuencia básica de bloques en Scratch y comprensión del flujo de eventos.',
        expectedEvidence: 'Gael ejecuta su programa con la bandera verde, explica con orgullo qué hace cada bloque y modifica los números de pasos para ver qué ocurre.'
      },
      evaluationRubric: {
        criterion: 'Construcción de secuencias interactivas en Scratch (CSTA.1A-AP-10)',
        indicators: [
          { level: 'Inicial', descriptor: 'Explora la pantalla pero necesita guía para arrastrar y enganchar los bloques en orden.' },
          { level: 'En desarrollo', descriptor: 'Une el evento con el movimiento pero olvida configurar el texto o cambiar el escenario.' },
          { level: 'Consolidado', descriptor: 'Programa autónomamente secuencias de eventos, movimiento y apariencia, personaliza diálogos y fondos con gran creatividad e iniciativa.' }
        ]
      },
      expectedFeedback: '¡Bip-bop-hurra, nuevo maestro de Scratch Gael! Has creado tu primer programa digital interactivo en la plataforma del MIT. Ver a tu personaje moverse y hablar con tu código es un momento histórico. ¡El cielo es el límite para tus futuros videojuegos!',
      difficultyAdaptation: 'Tener abierta la plantilla base con el bloque de la bandera verde ya colocado para que Gael solo arrastre el bloque morado de diálogo.',
      advancedExtension: 'Gael añade un bloque de "Sonido" (tocar sonido miau hasta que termine) y un bloque de bucle "por siempre" para que el personaje rebote si toca el borde del escenario.',
      resources: [
        {
          id: 'class-soft-gael-02-res-1',
          type: 'simulator',
          title: 'Scratch MIT: Editor Oficial en Línea',
          url: 'https://scratch.mit.edu/projects/editor/',
          description: 'Entorno de programación visual oficial del Lifelong Kindergarten Group del MIT Media Lab.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-soft-gael-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Primeros Pasos con el Gato Scratch',
          url: '/api/v1/academic/classes/class-soft-gael-02/guide.pdf',
          description: 'Ficha paso a paso con capturas de bloques y retos de animación para 4.° EGB.',
          duration: '15 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-soft-gael-02-act-1',
          title: 'Exploración de la Interfaz de Scratch',
          description: 'Identifica las 3 zonas clave de Scratch: Escenario, Bloques de colores y Área de código.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-soft-gael-02-act-2',
          title: 'El Primer Programa: Bandera, Paso y Saludo',
          description: 'Conecta la secuencia de tres bloques y presiona la bandera verde en el editor.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-soft-gael-02-act-3',
          title: 'Tarjeta Interactiva con Fondo Personalizado',
          description: 'Añade el fondo de montaña y personaliza el diálogo con el nombre de autor de Gael.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Muéstrale a tu familia en la pantalla cómo el gato se mueve y habla cada vez que tú presionas la bandera verde.',
      reflectionPrompt: 'Si pudieras crear un videojuego completo en Scratch, ¿de qué trataría la aventura de tu héroe?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_soft_gael_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-soft-gael-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-06-SOFT', subjectCode: 'SOFT-401', unitNumber: 1, sessionNumber: 2 }
    }
  ]
};

