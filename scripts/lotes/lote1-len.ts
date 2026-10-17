import { DailyClass } from '../../src/types';

export interface CurriculumLote {
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

export const LOTE_01_LEN: CurriculumLote = {
  loteId: 'LOTE-GAEL-01-LEN',
  loteNumber: 1,
  subjectCode: 'LEN-401',
  subjectName: 'Lengua y Literatura',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unidad 1: Mi Entorno Natural y Digital (Cuento Ilustrado)',
  unitNumber: 1,
  classesCount: 5,
  classes: [
    {
      id: 'class-len-gael-01',
      subjectId: 'len-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-07',
      dayOfWeek: 'Lunes',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Mi Entorno Natural y Digital (Cuento Ilustrado)',
      theme: 'El poder de las historias: ¿Por qué los seres humanos contamos cuentos?',
      objective: 'Comprender la intención comunicativa de los relatos orales y escritos como medio para transmitir emociones y conocimientos.',
      learningPurpose: 'Descubrir que las historias nos permiten viajar en el tiempo, guardar recuerdos familiares y resolver problemas de forma imaginativa.',
      competencyDcd: 'LL.2.1.1 — Distinguir la intención comunicativa (persuadir, expresar emociones, informar, requerir) que tienen diversos textos de uso cotidiano.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Hola, súper Gael! Bienvenido a tu primera aventura en Lengua y Literatura. Imagina un mundo donde nadie supiera contar historias: no tendríamos cuentos antes de dormir ni sabríamos las leyendas de nuestros abuelos. Hoy descubriremos por qué las historias son el invento más mágico de la humanidad.',
      reading: 'Cuento breve: "El Colibrí que guardó el fuego". En los bosques andinos de los Andes ecuatorianos, un pequeño colibrí llamado Quinde vio que los animales tenían frío en la noche. No tenía garras fuertes como el oso de anteojos ni la fuerza del puma, pero tenía alas veloces y un corazón valiente. Voló hasta la cima del volcán donde una pequeña brasa de luz ardía entre las piedras. Con su piquito fino tomó una chispita dorada y la llevó a la cueva de los animales. Desde ese día, los animales no solo tuvieron calor, sino que aprendieron a sentarse alrededor de la luz a contar historias de gratitud y valentía.',
      pedagogicalExplanation: 'Contar historias es como armar un rompecabezas con palabras. Cuando una persona cuenta lo que le pasó o inventa un personaje, está comunicando un mensaje importante: cuidar la naturaleza, ser valiente o ayudar a los amigos. Las historias tienen tres partes principales: un inicio tranquilo, un momento donde surge un problema emocionante y un final donde todo se resuelve.',
      vocabulary: [
        { term: 'Intención comunicativa', definition: 'El propósito o la razón por la que decimos o escribimos algo.', childFriendlyExample: 'Cuando le dices a mamá "tengo hambre", tu intención es pedir comida.' },
        { term: 'Relato', definition: 'Una narración breve sobre algo que sucedió de verdad o en la imaginación.', childFriendlyExample: 'El cuento de Quinde el colibrí es un relato hermoso.' },
        { term: 'Endémico', definition: 'Un animal o planta que solo vive en un lugar especial del planeta.', childFriendlyExample: 'El colibrí estrella de los Andes es un animal endémico del Ecuador.' }
      ],
      contextualizedExample: 'Cuando Gael le cuenta a sus papás cómo armó una nave espacial con fichas de Lego y qué misión secreta tiene en Marte, ¡está creando un relato con intención comunicativa!',
      socraticQuestions: [
        '¿Qué habría pasado si el colibrí Quinde hubiera pensado que era demasiado pequeño para ayudar?',
        '¿Por qué crees que los seres humanos nos sentimos tan felices cuando escuchamos un cuento antes de dormir?',
        'Si tú pudieras contarle una historia a un niño que vive en el polo norte sobre el Ecuador, ¿qué lugar mágico le describirías primero?'
      ],
      practicalActivity: {
        title: 'El baúl de los objetos narradores',
        instructions: [
          'Busca en tu habitación o sala tres objetos diferentes (ejemplo: un juguete, una hoja de árbol y una cuchara).',
          'Colócalos en orden sobre tu mesa de trabajo.',
          'Crea en voz alta una historia corta de 1 minuto donde esos tres objetos sean amigos y vivan una pequeña aventura juntos.'
        ],
        materials: ['3 objetos cotidianos', 'Tu imaginación activa', 'Grabadora de voz o libreta de notas']
      },
      applicationActivity: {
        title: 'Diseño del pasaporte del cuentacuentos',
        task: 'Dibuja en tu cuaderno de explorador la portada de tu propio libro de cuentos ilustrados. Escribe tu nombre como autor oficial e inventa el título de la historia que crearás durante este primer trimestre.',
        deliverable: 'Dibujo a color en el cuaderno con el título y la firma de Gael como autor.'
      },
      formativeEvaluation: {
        description: 'Evaluación cualitativa mediante diálogo socrático sobre la función comunicativa de los relatos y la secuenciación oral de ideas.',
        expectedEvidence: 'Gael explica con sus propias palabras por qué Quinde ayudó a los animales y narra su micro-historia oral con inicio y desenlace.'
      },
      evaluationRubric: {
        criterion: 'Comprensión de la intención comunicativa y expresión narrativa infantil (LL.2.1.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Nombra personajes del cuento pero requiere apoyo para explicar por qué las historias son importantes.' },
          { level: 'En desarrollo', descriptor: 'Identifica la enseñanza del colibrí y relata una historia sencilla uniendo dos ideas con sentido.' },
          { level: 'Consolidado', descriptor: 'Explica con entusiasmo la importancia de contar historias, responde preguntas socráticas con razonamiento propio y crea una narración original coherente.' }
        ]
      },
      expectedFeedback: '¡Fantástico trabajo, Gael! Supiste ver que la valentía no depende del tamaño sino del corazón, igual que Quinde. Tu historia con los tres objetos tuvo mucha chispa. ¡Eres un narrador nato!',
      difficultyAdaptation: 'Si a Gael le cuesta ordenar la historia, se le proporcionan tarjetas visuales dibujadas con tres momentos (Inicio, Desafío, Solución) para que las ordene primero con las manos.',
      advancedExtension: 'Gael puede agregar un villano a la historia del colibrí (ejemplo: un viento helado que quería apagar la fogata) y explicar cómo Quinde y sus amigos dialogaron para convencer al viento de unirse al calor.',
      resources: [
        {
          id: 'class-len-gael-01-res-1',
          type: 'external_link',
          title: 'StoryWeaver: Cuentos Abiertos para Niños',
          url: 'https://storyweaver.org.in/',
          description: 'Plataforma educativa abierta de lectura infantil con cuentos ilustrados de biodiversidad y valores comunitarios.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-len-gael-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — El Poder de las Historias',
          url: '/api/v1/academic/classes/class-len-gael-01/guide.pdf',
          description: 'Ficha de trabajo imprimible con plantilla de dibujo y tarjetas de secuenciación narrativa para 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-len-gael-01-act-1',
          title: 'Exploración Socrática del Cuento',
          description: 'Escucha el relato de Quinde y responde la pregunta: ¿Por qué la historia es un tesoro para la comunidad?',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-len-gael-01-act-2',
          title: 'Taller de los Tres Objetos',
          description: 'Crea una narración oral espontánea de 1 minuto uniendo tres objetos cotidianos.',
          type: 'speaking',
          points: 15,
          completed: false
        },
        {
          id: 'class-len-gael-01-act-3',
          title: 'Portada del Pasaporte de Autor',
          description: 'Dibuja y titula la portada de tu futuro libro de cuentos ilustrados en Book Creator.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Comparte con tu papá o mamá la historia de Quinde y pregúntales cuál era su cuento favorito cuando tenían 8 años.',
      reflectionPrompt: 'Si fueras un colibrí, ¿qué mensaje de paz o alegría llevarías volando a tu vecindario?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_len_gael_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-len-gael-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-01-LEN', subjectCode: 'LEN-401', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-len-gael-02',
      subjectId: 'len-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-09',
      dayOfWeek: 'Miércoles',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Mi Entorno Natural y Digital (Cuento Ilustrado)',
      theme: 'La estructura secreta de un cuento: Principio, Problema y Solución',
      objective: 'Identificar la secuencia lógica temporal (inicio, nudo y desenlace) en textos narrativos cortos.',
      learningPurpose: 'Aprender a organizar nuestras ideas en orden para que las personas comprendan exactamente lo que queremos contar sin confundirse.',
      competencyDcd: 'LL.2.3.1 — Construir los significados de un texto a partir del establecimiento de relaciones de secuencia temporal y problema-solución.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Hola de nuevo, constructor Gael! Ayer aprendimos que las historias son mágicas. Pero, ¿sabías que un cuento es como una casa bien construida? Si pones el techo en el suelo y las paredes en el aire, ¡la casa se cae! Hoy descubriremos los tres pisos de todo gran relato: el Principio, el Nudo y el Desenlace.',
      reading: 'Lectura: "El robot que no sabía sonreír". En una pequeña ciudad del valle de Cumbayá vivía Tuercas, un simpático robot hecho de piezas de reloj. (INICIO: Todo estaba tranquilo). Un día, los niños del parque estaban tristes porque su perrito se había perdido, y Tuercas quería animarlos pero no sabía cómo sonreír porque sus cables estaban duros. (NUDO: Aparece un problema que desafía al protagonista). Tuercas no se rindió: subió al árbol más alto, usó sus luces amarillas para alumbrar el bosque y encontró al perrito jugando entre las flores. Los niños abrazaron a Tuercas con tanto cariño que su pantalla se iluminó con dos ojitos brillantes y una hermosa sonrisa luminosa. (DESENLACE: El problema se resuelve con amor y ayuda mutua).',
      pedagogicalExplanation: 'Todo cuento tiene tres momentos mágicos: 1) El Inicio: nos presenta quién es el protagonista y dónde vive. 2) El Nudo: algo cambia de repente y ocurre un desafío o problema que parece difícil. 3) El Desenlace: el protagonista y sus amigos usan su ingenio o bondad para encontrar una solución feliz.',
      vocabulary: [
        { term: 'Secuencia temporal', definition: 'El orden en el que pasan las cosas en el tiempo (primero, luego, después y al final).', childFriendlyExample: 'Primero te pones las medias y luego los zapatos; esa es una secuencia temporal correcta.' },
        { term: 'Nudo o conflicto', definition: 'El problema o desafío que los personajes deben resolver en el cuento.', childFriendlyExample: 'Cuando el perrito se pierde, se arma el nudo de la historia de Tuercas.' },
        { term: 'Desenlace', definition: 'El momento final en que el problema se soluciona.', childFriendlyExample: 'Cuando Tuercas encuentra al perrito y sonríe, llegamos al desenlace.' }
      ],
      contextualizedExample: 'Cuando juegas a construir un castillo de arena y viene una ola que moja una torre (nudo), pero tú cavas un canal para salvar el castillo (desenlace), ¡viviste una historia en 3 pasos!',
      socraticQuestions: [
        '¿Qué pasaría si te contara primero el final del cuento de Tuercas antes de decirte quién era él?',
        '¿Por qué crees que los cuentos necesitan tener un problema o nudo? ¿Sería divertido un cuento donde nunca pasa nada?',
        '¿Qué habilidad especial usó Tuercas para resolver el problema de los niños?'
      ],
      practicalActivity: {
        title: 'El semáforo de las tres partes',
        instructions: [
          'Dibuja un semáforo grande en tu hoja: círculo verde arriba, amarillo en medio y azul abajo.',
          'En el círculo verde (Inicio), escribe en una frase cómo empieza el día de un dinosaurio explorador.',
          'En el círculo amarillo (Nudo), escribe qué problema tuvo el dinosaurio (ejemplo: se le cayó su mapa en un río).',
          'En el círculo azul (Desenlace), escribe cómo logró cruzar el río y encontrar su camino.'
        ],
        materials: ['Hoja de papel bond', 'Colores verde, amarillo y azul', 'Lápiz']
      },
      applicationActivity: {
        title: 'Historietas en tres viñetas',
        task: 'Divide una hoja en tres cuadros (viñetas). Dibuja el Inicio, el Nudo y el Desenlace de la aventura del robot Tuercas o de un personaje creado por ti.',
        deliverable: 'Tira cómica de 3 viñetas con dibujos y globos de diálogo sencillos.'
      },
      formativeEvaluation: {
        description: 'Identificación de la estructura narrativa y ordenamiento cronológico de eventos mediante preguntas guiadas.',
        expectedEvidence: 'Gael señala con precisión cuál es el inicio, cuál es el problema y cómo termina la historieta de 3 viñetas.'
      },
      evaluationRubric: {
        criterion: 'Reconocimiento y producción de secuencia temporal narrativa (LL.2.3.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Dibuja escenas sueltas pero le cuesta indicar cuál va primero o cómo se resolvió el problema.' },
          { level: 'En desarrollo', descriptor: 'Separa el inicio del final, reconociendo el problema principal con guía del tutor.' },
          { level: 'Consolidado', descriptor: 'Organiza autónomamente las 3 partes del relato con coherencia cronológica y causa-efecto.' }
        ]
      },
      expectedFeedback: '¡Extraordinario, Gael! Tu semáforo de la historia quedó impecable. Lograste que el nudo fuera muy emocionante y el desenlace tuvo una solución muy ingeniosa.',
      difficultyAdaptation: 'Usar tres bloques de Lego de distintos colores (rojo, amarillo, azul) para asociar cada bloque con una parte de la narración antes de escribir.',
      advancedExtension: 'Proponer dos desenlaces diferentes para el mismo cuento: uno donde Tuercas usa sus luces y otro donde pide ayuda a los pájaros del parque.',
      resources: [
        {
          id: 'class-len-gael-02-res-1',
          type: 'external_link',
          title: 'Mundo Primaria: Cuentos Infantiles con Moraleja',
          url: 'https://www.mundoprimaria.com/cuentos-infantiles-cortos',
          description: 'Biblioteca infantil abierta con relatos estructurados en inicio, nudo y desenlace.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-len-gael-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — El Semáforo del Cuento',
          url: '/api/v1/academic/classes/class-len-gael-02/guide.pdf',
          description: 'Plantilla gráfica de 3 viñetas para crear historietas secuenciales en 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-len-gael-02-act-1',
          title: 'Identificar los Tres Momentos',
          description: 'Lee el cuento de Tuercas y subraya de verde el inicio, de amarillo el nudo y de azul el desenlace.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-len-gael-02-act-2',
          title: 'Semáforo Narrativo',
          description: 'Completa la ficha del semáforo con la aventura del dinosaurio explorador.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-len-gael-02-act-3',
          title: 'Historieta en 3 Viñetas',
          description: 'Crea tu historieta ilustrada en tres momentos con título propio.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Elige un libro de tu casa y explícale a tus padres cuál es el problema que tiene el protagonista en ese libro.',
      reflectionPrompt: '¿Qué haces tú cuando tienes un problema o nudo en tu día? ¿Quién te ayuda a llegar al desenlace feliz?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_len_gael_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-len-gael-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-01-LEN', subjectCode: 'LEN-401', unitNumber: 1, sessionNumber: 2 }
    },
    {
      id: 'class-len-gael-03',
      subjectId: 'len-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-10',
      dayOfWeek: 'Jueves',
      scheduleTime: '11:30 - 12:00 (30 min)',
      unit: 'Unidad 1: Mi Entorno Natural y Digital (Cuento Ilustrado)',
      theme: 'Cazadores de palabras: Los Sustantivos que dan nombre al universo',
      objective: 'Reconocer y clasificar sustantivos propios y comunes en situaciones comunicativas reales.',
      learningPurpose: 'Entender que cada cosa, animal, persona y lugar tiene un nombre especial que nos permite nombrarlo y valorarlo.',
      competencyDcd: 'LL.2.4.1 — Desarrollar progresivamente autonomía en el uso de sustantivos comunes y propios para enriquecer relatos escritos.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Atención, explorador Gael! Hoy nos pondremos los lentes mágicos de los "cazadores de palabras". ¿Te has fijado en que todo lo que tocas, ves o imaginas tiene un nombre? La mesa, el perro, las montañas... pero también las personas tienen nombres únicos como Gael o Ecuador. Esas palabras que nombran el mundo se llaman SUSTANTIVOS.',
      reading: 'El safari de los nombres: En las Islas Galápagos vive una tortuga gigante llamada Don Jorge. Don Jorge camina despacio sobre la arena volcánica junto a su amiga piquero de patas azules, a quien le gusta volar sobre el océano Pacífico. Si miras bien, "tortuga", "arena" y "océano" son nombres de cosas y animales que hay muchos en el mundo (sustantivos comunes). Pero "Don Jorge", "Galápagos" y "Ecuador" son nombres propios de un ser o lugar único, ¡y por eso siempre se visten con mayúscula elegante al empezar!',
      pedagogicalExplanation: 'Los sustantivos son las etiquetas del mundo. Hay dos familias principales: 1) Sustantivos comunes: nombran a cualquier persona, animal o cosa (niño, perro, volcán, pelota). 2) Sustantivos propios: nombran a un ser o lugar específico para diferenciarlo de los demás, y siempre se escriben con mayúscula inicial (Gael, Quito, Pichincha, Dios).',
      vocabulary: [
        { term: 'Sustantivo común', definition: 'Palabra que nombra a cualquier ser, objeto o lugar de una misma especie.', childFriendlyExample: '"río", "ciudad", "gato" son sustantivos comunes.' },
        { term: 'Sustantivo propio', definition: 'Nombre particular que identifica a una persona, mascota o lugar único.', childFriendlyExample: '"Gael", "Guayas", "Amazonas" son sustantivos propios.' },
        { term: 'Mayúscula', definition: 'Letra más grande y distinguida que se usa al inicio de nombres propios y oraciones.', childFriendlyExample: 'La letra "G" en Gael es una mayúscula.' }
      ],
      contextualizedExample: 'Tú eres un "niño" (sustantivo común), pero tu nombre único es "Gael" (sustantivo propio). Tu país es un "país" (común), pero se llama "Ecuador" (propio).',
      socraticQuestions: [
        '¿Por qué sería muy confuso si todos los perros del mundo se llamaran simplemente "perro"?',
        'Si descubres un nuevo planeta en el telescopio, ¿qué nombre propio le pondrías y por qué?',
        '¿Qué pasa con la primera letra de un sustantivo propio si se te olvida poner la mayúscula?'
      ],
      practicalActivity: {
        title: 'Cacería de sustantivos en casa',
        instructions: [
          'Divide una hoja en dos columnas: "Sustantivos Comunes" y "Sustantivos Propios".',
          'En 2 minutos, busca en tu casa 5 objetos o animales y anótalos en la columna de Comunes.',
          'Luego, escribe al lado el nombre propio de 5 personas o lugares que tú quieras mucho con su mayúscula destacada en color rojo.'
        ],
        materials: ['Hoja de notas', 'Lápiz', 'Color rojo para mayúsculas']
      },
      applicationActivity: {
        title: 'El mapa de nombres de mi cuento',
        task: 'Elige el protagonista y el lugar de tu futuro cuento. Escribe su sustantivo común (ej: oso) y su sustantivo propio (ej: Melquiades). Haz lo mismo con el bosque o montaña donde vivirá.',
        deliverable: 'Ficha de personajes con 3 sustantivos comunes y sus 3 nombres propios con mayúscula.'
      },
      formativeEvaluation: {
        description: 'Diferenciación práctica entre sustantivo común y propio con uso correcto de mayúsculas.',
        expectedEvidence: 'Gael clasifica correctamente las palabras de su ficha y resalta la mayúscula en todos los sustantivos propios.'
      },
      evaluationRubric: {
        criterion: 'Aplicación de sustantivos y uso de mayúsculas en textos propios (LL.2.4.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Reconoce que las palabras son nombres pero olvida colocar la mayúscula en nombres propios.' },
          { level: 'En desarrollo', descriptor: 'Distingue entre personas y objetos, aplicando mayúsculas en su propio nombre con apoyo.' },
          { level: 'Consolidado', descriptor: 'Clasifica sustantivos comunes y propios con total soltura y aplica la regla ortográfica de la mayúscula en todos sus escritos.' }
        ]
      },
      expectedFeedback: '¡Excelente cacería, Gael! Identificaste los sustantivos propios a la perfección y no se te escapó ninguna mayúscula roja. ¡Tus personajes ya tienen nombres memorables!',
      difficultyAdaptation: 'Jugar al juego "Simón dice sustantivos": Simón dice que toques un sustantivo común (mesa); Simón dice que digas tu sustantivo propio (Gael).',
      advancedExtension: 'Gael investiga el nombre de 3 volcanes del Ecuador (Cotopaxi, Chimborazo, Tungurahua) y explica por qué son sustantivos propios aunque todos sean volcanes.',
      resources: [
        {
          id: 'class-len-gael-03-res-1',
          type: 'external_link',
          title: 'Árbol ABC: Juegos de Sustantivos y Gramática',
          url: 'https://arbolabc.com/',
          description: 'Juegos interactivos lúdicos en español para clasificar sustantivos comunes y propios.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-len-gael-03-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Cazadores de Sustantivos',
          url: '/api/v1/academic/classes/class-len-gael-03/guide.pdf',
          description: 'Ficha de trabajo con lupa de detective para encontrar sustantivos en un relato de Galápagos.',
          duration: '15 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-len-gael-03-act-1',
          title: 'Detectives del Safari',
          description: 'Encuentra en la lectura de Galápagos 3 sustantivos comunes y 3 propios.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-len-gael-03-act-2',
          title: 'Tabla de Dos Columnas',
          description: 'Clasifica los 10 sustantivos cazados en casa usando mayúsculas rojas.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-len-gael-03-act-3',
          title: 'Ficha de Nombres del Cuento',
          description: 'Crea los nombres comunes y propios de los personajes de tu libro.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Busca en tu cocina 3 alimentos con nombre común (ej: fruta) y escribe qué marca o variedad propia tienen.',
      reflectionPrompt: '¿Cómo te sentirías si nadie te llamara por tu nombre propio? ¿Por qué los nombres nos hacen especiales?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_len_gael_03.pdf',
      guideUrl: '/api/v1/academic/classes/class-len-gael-03/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-01-LEN', subjectCode: 'LEN-401', unitNumber: 1, sessionNumber: 3 }
    },
    {
      id: 'class-len-gael-04',
      subjectId: 'len-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-14',
      dayOfWeek: 'Lunes',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Mi Entorno Natural y Digital (Cuento Ilustrado)',
      theme: 'Pintar con palabras: Los Adjetivos Calificativos que dan vida a los personajes',
      objective: 'Utilizar adjetivos calificativos para describir cualidades físicas y de carácter en producciones escritas.',
      learningPurpose: 'Aprender que las palabras pueden ser como pinceles de colores que ayudan a los lectores a imaginar exactamente cómo son las cosas.',
      competencyDcd: 'LL.2.4.1 — Enriquecer relatos escritos con el uso pertinente de adjetivos calificativos que describan personajes y escenarios.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Hola, pintor de historias! Imagina que te digo: "Ayer vi un perro". Seguro te preguntas: ¿era grande o chiquito? ¿feroz o juguetón? ¿blanco o manchado? Cuando usamos palabras como "enorme", "suave", "veloz" o "cariñoso", estamos usando ADJETIVOS. ¡Los adjetivos son la pintura que llena de vida a los sustantivos!',
      reading: 'El oso de anteojos y su frazada: En los páramos fríos de los Andes vive Ucumari, un oso de anteojos peludo, curioso y comelón. Tiene una nariz húmeda, unas garras fuertes pero gentiles y una mancha blanca alrededor de sus ojos que parece unos lentes elegantes. A Ucumari le encanta comer bayas dulces y dormir sobre la hierba húmeda. Cuando la niebla espesa baja por la montaña, Ucumari se abriga con su pelaje espeso y sueña con árboles altos y cielos despejados.',
      pedagogicalExplanation: 'Los adjetivos calificativos son palabras que responden a la pregunta: ¿Cómo es? o ¿Cómo está el sustantivo? Por ejemplo: ¿Cómo es el oso? Es peludo, curioso y comelón. Los adjetivos nos dicen tamaño (gigante, enano), color (dorado, azul), textura (áspero, suave) y forma de ser (alegre, valiente).',
      vocabulary: [
        { term: 'Adjetivo calificativo', definition: 'Palabra que dice una cualidad o característica del sustantivo.', childFriendlyExample: '"dulce", "rápido", "brillante" son adjetivos.' },
        { term: 'Cualidad', definition: 'Una característica especial que describe cómo es algo o alguien.', childFriendlyExample: 'La bondad y la curiosidad son hermosas cualidades de Gael.' },
        { term: 'Concordancia', definition: 'Que el adjetivo combine bien en género (femenino/masculino) y número (uno/varios) con el sustantivo.', childFriendlyExample: 'Decimos "oso peludo" y no "oso peluda".' }
      ],
      contextualizedExample: 'Si dices "manzana roja y crujiente", "roja" y "crujiente" son los adjetivos que te hacen saborear la manzana antes de morderla.',
      socraticQuestions: [
        '¿Cómo cambiaría la historia si dijéramos que el oso Ucumari es "miedoso y perezoso" en vez de "curioso y valiente"?',
        '¿Cuál es la diferencia entre describir cómo es algo por fuera (su cuerpo) y cómo es por dentro (sus emociones)?',
        '¿Qué tres adjetivos usarías para describir tu lugar favorito del mundo?'
      ],
      practicalActivity: {
        title: 'El sombrero de las cualidades misteriosas',
        instructions: [
          'Dibuja un animal fantástico inventado por ti en tu libreta.',
          'A su alrededor dibuja 4 flechas.',
          'En cada flecha escribe un adjetivo diferente: uno de tamaño, uno de color, uno de textura al tacto y uno de su carácter.',
          'Presenta tu animal fantástico diciendo: "Este es un... animal..." usando tus 4 adjetivos con orgullo.'
        ],
        materials: ['Libreta de explorador', 'Lápices de colores', 'Regla']
      },
      applicationActivity: {
        title: 'Retrato descriptivo del coprotagonista',
        task: 'Escribe un párrafo de 4 oraciones describiendo al mejor amigo del protagonista de tu cuento, usando al menos 4 adjetivos calificativos destacados con color amarillo.',
        deliverable: 'Párrafo descriptivo en el cuaderno con los adjetivos subrayados en amarillo.'
      },
      formativeEvaluation: {
        description: 'Identificación y aplicación creativa de adjetivos calificativos con concordancia de género y número.',
        expectedEvidence: 'Gael utiliza 4 adjetivos pertinentes que enriquecen visualmente la descripción de su personaje.'
      },
      evaluationRubric: {
        criterion: 'Uso de adjetivos calificativos para enriquecer textos descriptivos (LL.2.4.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Usa adjetivos básicos de color pero le cuesta describir cualidades de personalidad o tamaño.' },
          { level: 'En desarrollo', descriptor: 'Describe el aspecto físico de su personaje usando 3 adjetivos con buena concordancia.' },
          { level: 'Consolidado', descriptor: 'Combina adjetivos sensoriales (tacto, vista) y de carácter para crear un retrato vivaz y expresivo.' }
        ]
      },
      expectedFeedback: '¡Qué gran ojo descriptivo tienes, Gael! Al leer tus adjetivos pude casi tocar el pelaje suave y ver el brillo dorado de tu personaje. ¡Estás listo para escribir tu libro!',
      difficultyAdaptation: 'Proporcionar una "paleta de adjetivos" con dibujos de texturas (algodón = suave, lija = áspera, sol = brillante) para elegir palabras táctiles.',
      advancedExtension: 'Gael inventa comparaciones poéticas sencillas usando adjetivos: "tan veloz como un rayo", "tan suave como una nube andina".',
      resources: [
        {
          id: 'class-len-gael-04-res-1',
          type: 'external_link',
          title: 'Smile and Learn: Los Adjetivos para Niños',
          url: 'https://smileandlearn.com/',
          description: 'Video interactivo y actividades lúdicas sobre concordancia y descripción con adjetivos.',
          duration: '12 min',
          order: 1
        },
        {
          id: 'class-len-gael-04-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Pintar con Adjetivos',
          url: '/api/v1/academic/classes/class-len-gael-04/guide.pdf',
          description: 'Ficha imprimible con siluetas de animales para rellenar con adjetivos sensoriales.',
          duration: '18 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-len-gael-04-act-1',
          title: 'Descubrir Adjetivos en el Páramo',
          description: 'Subraya en el texto de Ucumari los 5 adjetivos que dicen cómo es el oso y su entorno.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-len-gael-04-act-2',
          title: 'El Animal Fantástico',
          description: 'Dibuja y anota las 4 flechas con adjetivos de tamaño, color, textura y emoción.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-len-gael-04-act-3',
          title: 'Retrato del Coprotagonista',
          description: 'Redacta el párrafo de 4 oraciones destacando los adjetivos en amarillo.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Describe a tu mascota o a un juguete favorito usando tres adjetivos positivos sin repetir ninguno.',
      reflectionPrompt: '¿Qué adjetivos te gustaría que las personas usen cuando piensen en ti como amigo?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_len_gael_04.pdf',
      guideUrl: '/api/v1/academic/classes/class-len-gael-04/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-01-LEN', subjectCode: 'LEN-401', unitNumber: 1, sessionNumber: 4 }
    },
    {
      id: 'class-len-gael-05',
      subjectId: 'len-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-16',
      dayOfWeek: 'Miércoles',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Mi Entorno Natural y Digital (Cuento Ilustrado)',
      theme: 'El héroe de mi historia: Creación y caracterización del protagonista',
      objective: 'Integrar estructura narrativa, sustantivos y adjetivos en la creación del perfil del protagonista del cuento ilustrado.',
      learningPurpose: 'Consolidar las habilidades de las sesiones 1 a 4 para dar nacimiento al personaje principal de nuestro proyecto trimestral en Book Creator.',
      competencyDcd: 'LL.2.5.1 — Recrear textos literarios leídos o escuchados y producir relatos propios expresando emociones y puntos de vista personales.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Día de fiesta, escritor Gael! Hemos aprendido por qué contamos historias, cómo se dividen en inicio, nudo y desenlace, y cómo los sustantivos y adjetivos dan vida a todo. Hoy nos convertiremos en creadores oficiales: diseñaremos al protagonista de tu libro digital. ¿Tendrá plumas, alas, ruedas o garras mágicas? ¡La decisión es 100% tuya!',
      reading: 'Manifiesto de los Creadores de Cuentos: En la literatura infantil no hay límites para soñar. Los grandes autores nos enseñan que los héroes no son perfectos: a veces tienen miedo a la oscuridad, a veces tropiezan, pero siempre se levantan con una sonrisa para ayudar a quien lo necesita. Tu protagonista vivirá en el Ecuador que tú elijas: puede ser una tortuga marina de Galápagos que sueña con tocar las estrellas, un cóndor de los Andes que inventa canciones con el viento, o un pequeño jaguar amazónico que rescata orquídeas perdidas.',
      pedagogicalExplanation: 'Crear un personaje completo requiere responder 4 preguntas esenciales: 1) ¿Quién es y cómo se llama? (Sustantivos propios y comunes). 2) ¿Cómo es por fuera y por dentro? (Adjetivos calificativos). 3) ¿Cuál es su gran sueño o deseo? (Motivación del héroe). 4) ¿Qué pequeño miedo o debilidad tiene? (Lo que lo hace simpático y humano).',
      vocabulary: [
        { term: 'Protagonista', definition: 'El personaje principal de una historia, alrededor del cual suceden los acontecimientos.', childFriendlyExample: 'Quinde era el protagonista de nuestro primer cuento.' },
        { term: 'Caracterización', definition: 'El conjunto de detalles que muestran cómo es un personaje física y emocionalmente.', childFriendlyExample: 'Dibujar sus ojos curiosos y su capa verde es parte de su caracterización.' },
        { term: 'Motivación', definition: 'La razón poderosa que impulsa al personaje a emprender su aventura.', childFriendlyExample: 'La motivación del colibrí era salvar a sus amigos del frío.' }
      ],
      contextualizedExample: 'Cuando creas a "Kusi", una llama alegre de los páramos de Cotopaxi que quiere construir un telescopio con hielo, tienes un protagonista inolvidable.',
      socraticQuestions: [
        '¿Qué hace que un personaje se gane el cariño de los lectores: que sea perfecto en todo o que aprenda de sus errores?',
        'Si tu protagonista se enfrenta a un desafío muy difícil, ¿a quién le pediría un buen consejo?',
        '¿Qué valor especial (solidaridad, paciencia, valentía) pondrás en el corazón de tu personaje?'
      ],
      practicalActivity: {
        title: 'La tarjeta de identidad del protagonista',
        instructions: [
          'Dibuja un marco decorado en una hoja blanca como si fuera la cédula de explorador de tu personaje.',
          'Dibuja a tu héroe en el centro con todos sus detalles.',
          'Completa su ficha: Nombre propio, Especie/Sustantivo común, 3 Adjetivos clave, Su gran sueño y Su superpoder bondadoso.'
        ],
        materials: ['Hoja bond', 'Marcadores y lápices de colores', 'Ficha de datos']
      },
      applicationActivity: {
        title: 'Grabación del pitch oral del personaje',
        task: 'Ponte de pie frente a tu tutor o graba un audio de 1 minuto presentándote como el autor del libro y describiendo a tu protagonista con voz expresiva.',
        deliverable: 'Presentación oral entusiasta del personaje y entrega de la tarjeta de identidad ilustrada.'
      },
      formativeEvaluation: {
        description: 'Evaluación formativa integradora de la primera semana de Lengua: coherencia discursiva, uso de vocabulario y originalidad narrativa.',
        expectedEvidence: 'Gael presenta la ficha de su protagonista articulando con claridad quién es, cómo es y cuál será su desafío en el cuento.'
      },
      evaluationRubric: {
        criterion: 'Producción de personajes y expresión creativa oral y escrita (LL.2.5.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Dibuja al personaje pero necesita apoyo para definir su nombre propio o sus cualidades distintivas.' },
          { level: 'En desarrollo', descriptor: 'Presenta al protagonista con nombre y adjetivos claros, pero su motivación es aún difusa.' },
          { level: 'Consolidado', descriptor: 'Integra con maestría nombre propio, adjetivos sensoriales, motivación y valores éticos en una presentación oral y gráfica brillante.' }
        ]
      },
      expectedFeedback: '¡Brillante cierre del primer lote, maestro Gael! Tu personaje tiene alma, ternura y un propósito inspirador. Tienes en tus manos el inicio de un libro ilustrado sensacional.',
      difficultyAdaptation: 'Completar una plantilla con espacios en blanco tipo oración guiada: "Mi personaje se llama ______, es un ______ muy ______ que sueña con ______".',
      advancedExtension: 'Escribir las tres primeras líneas de la página 1 de su libro en Book Creator presentando al protagonista en su hogar.',
      resources: [
        {
          id: 'class-len-gael-05-res-1',
          type: 'external_link',
          title: 'Book Creator: Herramienta de Creación de Libros Digitales',
          url: 'https://bookcreator.com/',
          description: 'Plataforma oficial educativa para que los niños maqueten e ilustren sus propios libros interactivos.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-len-gael-05-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Ficha de Identidad del Héroe',
          url: '/api/v1/academic/classes/class-len-gael-05/guide.pdf',
          description: 'Plantilla de pasaporte de personajes para el proyecto trimestral de 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-len-gael-05-act-1',
          title: 'Manifiesto de Creación',
          description: 'Reflexiona sobre qué mensaje positivo transmitirá tu personaje a otros niños del mundo.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-len-gael-05-act-2',
          title: 'Cédula de Identidad de Autor',
          description: 'Diseña la tarjeta gráfica con dibujo, nombre propio y adjetivos del protagonista.',
          type: 'project',
          points: 15,
          completed: false
        },
        {
          id: 'class-len-gael-05-act-3',
          title: 'Presentación Oral en Vivo',
          description: 'Presenta en 1 minuto a tu héroe ante tu tutor socrático con elocuencia.',
          type: 'speaking',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Muéstrale la ficha de tu personaje a un familiar y pregúntale qué aventura le gustaría que viva en el capítulo 2.',
      reflectionPrompt: 'Si tu personaje pudiera darte un consejo a ti en este momento, ¿qué crees que te diría?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_len_gael_05.pdf',
      guideUrl: '/api/v1/academic/classes/class-len-gael-05/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-01-LEN', subjectCode: 'LEN-401', unitNumber: 1, sessionNumber: 5 }
    }
  ]
};

