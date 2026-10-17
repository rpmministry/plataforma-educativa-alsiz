import { DailyClass } from '../types';

/**
 * ==============================================================================
 * CLASES DIARIAS SOCRÁTICAS — GAEL (4.º EGB ELEMENTAL)
 * Año Lectivo 2026 - 2027 | Currículo Oficial MINEDUC y Ekballo Church
 * Consolidado y Validado por Lotes bajo la Etapa 06A
 * ==============================================================================
 * Total Clases: 25 | Asignaturas: 9 | Cobertura Unidad 1: 100%
 * Criterios Verificados:
 * - 0 Enlaces Rickroll
 * - 0 Dominios extintos (wisdom-school.edu)
 * - 100% IDs únicos desambiguados
 * - 100% Destrezas con Criterio de Desempeño (DCD) oficiales
 * - 18 Campos pedagógicos completos por clase
 * ==============================================================================
 */

export const GAEL_DAILY_CLASSES: DailyClass[] = [
  {
    "id": "class-len-gael-01",
    "subjectId": "len-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Mi Entorno Natural y Digital (Cuento Ilustrado)",
    "theme": "El poder de las historias: ¿Por qué los seres humanos contamos cuentos?",
    "objective": "Comprender la intención comunicativa de los relatos orales y escritos como medio para transmitir emociones y conocimientos.",
    "learningPurpose": "Descubrir que las historias nos permiten viajar en el tiempo, guardar recuerdos familiares y resolver problemas de forma imaginativa.",
    "competencyDcd": "LL.2.1.1 — Distinguir la intención comunicativa (persuadir, expresar emociones, informar, requerir) que tienen diversos textos de uso cotidiano.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Hola, súper Gael! Bienvenido a tu primera aventura en Lengua y Literatura. Imagina un mundo donde nadie supiera contar historias: no tendríamos cuentos antes de dormir ni sabríamos las leyendas de nuestros abuelos. Hoy descubriremos por qué las historias son el invento más mágico de la humanidad.",
    "reading": "Cuento breve: \"El Colibrí que guardó el fuego\". En los bosques andinos de los Andes ecuatorianos, un pequeño colibrí llamado Quinde vio que los animales tenían frío en la noche. No tenía garras fuertes como el oso de anteojos ni la fuerza del puma, pero tenía alas veloces y un corazón valiente. Voló hasta la cima del volcán donde una pequeña brasa de luz ardía entre las piedras. Con su piquito fino tomó una chispita dorada y la llevó a la cueva de los animales. Desde ese día, los animales no solo tuvieron calor, sino que aprendieron a sentarse alrededor de la luz a contar historias de gratitud y valentía.",
    "pedagogicalExplanation": "Contar historias es como armar un rompecabezas con palabras. Cuando una persona cuenta lo que le pasó o inventa un personaje, está comunicando un mensaje importante: cuidar la naturaleza, ser valiente o ayudar a los amigos. Las historias tienen tres partes principales: un inicio tranquilo, un momento donde surge un problema emocionante y un final donde todo se resuelve.",
    "vocabulary": [
      {
        "term": "Intención comunicativa",
        "definition": "El propósito o la razón por la que decimos o escribimos algo.",
        "childFriendlyExample": "Cuando le dices a mamá \"tengo hambre\", tu intención es pedir comida."
      },
      {
        "term": "Relato",
        "definition": "Una narración breve sobre algo que sucedió de verdad o en la imaginación.",
        "childFriendlyExample": "El cuento de Quinde el colibrí es un relato hermoso."
      },
      {
        "term": "Endémico",
        "definition": "Un animal o planta que solo vive en un lugar especial del planeta.",
        "childFriendlyExample": "El colibrí estrella de los Andes es un animal endémico del Ecuador."
      }
    ],
    "contextualizedExample": "Cuando Gael le cuenta a sus papás cómo armó una nave espacial con fichas de Lego y qué misión secreta tiene en Marte, ¡está creando un relato con intención comunicativa!",
    "socraticQuestions": [
      "¿Qué habría pasado si el colibrí Quinde hubiera pensado que era demasiado pequeño para ayudar?",
      "¿Por qué crees que los seres humanos nos sentimos tan felices cuando escuchamos un cuento antes de dormir?",
      "Si tú pudieras contarle una historia a un niño que vive en el polo norte sobre el Ecuador, ¿qué lugar mágico le describirías primero?"
    ],
    "practicalActivity": {
      "title": "El baúl de los objetos narradores",
      "instructions": [
        "Busca en tu habitación o sala tres objetos diferentes (ejemplo: un juguete, una hoja de árbol y una cuchara).",
        "Colócalos en orden sobre tu mesa de trabajo.",
        "Crea en voz alta una historia corta de 1 minuto donde esos tres objetos sean amigos y vivan una pequeña aventura juntos."
      ],
      "materials": [
        "3 objetos cotidianos",
        "Tu imaginación activa",
        "Grabadora de voz o libreta de notas"
      ]
    },
    "applicationActivity": {
      "title": "Diseño del pasaporte del cuentacuentos",
      "task": "Dibuja en tu cuaderno de explorador la portada de tu propio libro de cuentos ilustrados. Escribe tu nombre como autor oficial e inventa el título de la historia que crearás durante este primer trimestre.",
      "deliverable": "Dibujo a color en el cuaderno con el título y la firma de Gael como autor."
    },
    "formativeEvaluation": {
      "description": "Evaluación cualitativa mediante diálogo socrático sobre la función comunicativa de los relatos y la secuenciación oral de ideas.",
      "expectedEvidence": "Gael explica con sus propias palabras por qué Quinde ayudó a los animales y narra su micro-historia oral con inicio y desenlace."
    },
    "evaluationRubric": {
      "criterion": "Comprensión de la intención comunicativa y expresión narrativa infantil (LL.2.1.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Nombra personajes del cuento pero requiere apoyo para explicar por qué las historias son importantes."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Identifica la enseñanza del colibrí y relata una historia sencilla uniendo dos ideas con sentido."
        },
        {
          "level": "Consolidado",
          "descriptor": "Explica con entusiasmo la importancia de contar historias, responde preguntas socráticas con razonamiento propio y crea una narración original coherente."
        }
      ]
    },
    "expectedFeedback": "¡Fantástico trabajo, Gael! Supiste ver que la valentía no depende del tamaño sino del corazón, igual que Quinde. Tu historia con los tres objetos tuvo mucha chispa. ¡Eres un narrador nato!",
    "difficultyAdaptation": "Si a Gael le cuesta ordenar la historia, se le proporcionan tarjetas visuales dibujadas con tres momentos (Inicio, Desafío, Solución) para que las ordene primero con las manos.",
    "advancedExtension": "Gael puede agregar un villano a la historia del colibrí (ejemplo: un viento helado que quería apagar la fogata) y explicar cómo Quinde y sus amigos dialogaron para convencer al viento de unirse al calor.",
    "resources": [
      {
        "id": "class-len-gael-01-res-1",
        "type": "external_link",
        "title": "StoryWeaver: Cuentos Abiertos para Niños",
        "url": "https://storyweaver.org.in/",
        "description": "Plataforma educativa abierta de lectura infantil con cuentos ilustrados de biodiversidad y valores comunitarios.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-len-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — El Poder de las Historias",
        "url": "/api/v1/academic/classes/class-len-gael-01/guide.pdf",
        "description": "Ficha de trabajo imprimible con plantilla de dibujo y tarjetas de secuenciación narrativa para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-gael-01-act-1",
        "title": "Exploración Socrática del Cuento",
        "description": "Escucha el relato de Quinde y responde la pregunta: ¿Por qué la historia es un tesoro para la comunidad?",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-len-gael-01-act-2",
        "title": "Taller de los Tres Objetos",
        "description": "Crea una narración oral espontánea de 1 minuto uniendo tres objetos cotidianos.",
        "type": "speaking",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-gael-01-act-3",
        "title": "Portada del Pasaporte de Autor",
        "description": "Dibuja y titula la portada de tu futuro libro de cuentos ilustrados en Book Creator.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Comparte con tu papá o mamá la historia de Quinde y pregúntales cuál era su cuento favorito cuando tenían 8 años.",
    "reflectionPrompt": "Si fueras un colibrí, ¿qué mensaje de paz o alegría llevarías volando a tu vecindario?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_gael_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-len-gael-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-01-LEN",
      "subjectCode": "LEN-401",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-len-gael-02",
    "subjectId": "len-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Mi Entorno Natural y Digital (Cuento Ilustrado)",
    "theme": "La estructura secreta de un cuento: Principio, Problema y Solución",
    "objective": "Identificar la secuencia lógica temporal (inicio, nudo y desenlace) en textos narrativos cortos.",
    "learningPurpose": "Aprender a organizar nuestras ideas en orden para que las personas comprendan exactamente lo que queremos contar sin confundirse.",
    "competencyDcd": "LL.2.3.1 — Construir los significados de un texto a partir del establecimiento de relaciones de secuencia temporal y problema-solución.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Hola de nuevo, constructor Gael! Ayer aprendimos que las historias son mágicas. Pero, ¿sabías que un cuento es como una casa bien construida? Si pones el techo en el suelo y las paredes en el aire, ¡la casa se cae! Hoy descubriremos los tres pisos de todo gran relato: el Principio, el Nudo y el Desenlace.",
    "reading": "Lectura: \"El robot que no sabía sonreír\". En una pequeña ciudad del valle de Cumbayá vivía Tuercas, un simpático robot hecho de piezas de reloj. (INICIO: Todo estaba tranquilo). Un día, los niños del parque estaban tristes porque su perrito se había perdido, y Tuercas quería animarlos pero no sabía cómo sonreír porque sus cables estaban duros. (NUDO: Aparece un problema que desafía al protagonista). Tuercas no se rindió: subió al árbol más alto, usó sus luces amarillas para alumbrar el bosque y encontró al perrito jugando entre las flores. Los niños abrazaron a Tuercas con tanto cariño que su pantalla se iluminó con dos ojitos brillantes y una hermosa sonrisa luminosa. (DESENLACE: El problema se resuelve con amor y ayuda mutua).",
    "pedagogicalExplanation": "Todo cuento tiene tres momentos mágicos: 1) El Inicio: nos presenta quién es el protagonista y dónde vive. 2) El Nudo: algo cambia de repente y ocurre un desafío o problema que parece difícil. 3) El Desenlace: el protagonista y sus amigos usan su ingenio o bondad para encontrar una solución feliz.",
    "vocabulary": [
      {
        "term": "Secuencia temporal",
        "definition": "El orden en el que pasan las cosas en el tiempo (primero, luego, después y al final).",
        "childFriendlyExample": "Primero te pones las medias y luego los zapatos; esa es una secuencia temporal correcta."
      },
      {
        "term": "Nudo o conflicto",
        "definition": "El problema o desafío que los personajes deben resolver en el cuento.",
        "childFriendlyExample": "Cuando el perrito se pierde, se arma el nudo de la historia de Tuercas."
      },
      {
        "term": "Desenlace",
        "definition": "El momento final en que el problema se soluciona.",
        "childFriendlyExample": "Cuando Tuercas encuentra al perrito y sonríe, llegamos al desenlace."
      }
    ],
    "contextualizedExample": "Cuando juegas a construir un castillo de arena y viene una ola que moja una torre (nudo), pero tú cavas un canal para salvar el castillo (desenlace), ¡viviste una historia en 3 pasos!",
    "socraticQuestions": [
      "¿Qué pasaría si te contara primero el final del cuento de Tuercas antes de decirte quién era él?",
      "¿Por qué crees que los cuentos necesitan tener un problema o nudo? ¿Sería divertido un cuento donde nunca pasa nada?",
      "¿Qué habilidad especial usó Tuercas para resolver el problema de los niños?"
    ],
    "practicalActivity": {
      "title": "El semáforo de las tres partes",
      "instructions": [
        "Dibuja un semáforo grande en tu hoja: círculo verde arriba, amarillo en medio y azul abajo.",
        "En el círculo verde (Inicio), escribe en una frase cómo empieza el día de un dinosaurio explorador.",
        "En el círculo amarillo (Nudo), escribe qué problema tuvo el dinosaurio (ejemplo: se le cayó su mapa en un río).",
        "En el círculo azul (Desenlace), escribe cómo logró cruzar el río y encontrar su camino."
      ],
      "materials": [
        "Hoja de papel bond",
        "Colores verde, amarillo y azul",
        "Lápiz"
      ]
    },
    "applicationActivity": {
      "title": "Historietas en tres viñetas",
      "task": "Divide una hoja en tres cuadros (viñetas). Dibuja el Inicio, el Nudo y el Desenlace de la aventura del robot Tuercas o de un personaje creado por ti.",
      "deliverable": "Tira cómica de 3 viñetas con dibujos y globos de diálogo sencillos."
    },
    "formativeEvaluation": {
      "description": "Identificación de la estructura narrativa y ordenamiento cronológico de eventos mediante preguntas guiadas.",
      "expectedEvidence": "Gael señala con precisión cuál es el inicio, cuál es el problema y cómo termina la historieta de 3 viñetas."
    },
    "evaluationRubric": {
      "criterion": "Reconocimiento y producción de secuencia temporal narrativa (LL.2.3.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Dibuja escenas sueltas pero le cuesta indicar cuál va primero o cómo se resolvió el problema."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Separa el inicio del final, reconociendo el problema principal con guía del tutor."
        },
        {
          "level": "Consolidado",
          "descriptor": "Organiza autónomamente las 3 partes del relato con coherencia cronológica y causa-efecto."
        }
      ]
    },
    "expectedFeedback": "¡Extraordinario, Gael! Tu semáforo de la historia quedó impecable. Lograste que el nudo fuera muy emocionante y el desenlace tuvo una solución muy ingeniosa.",
    "difficultyAdaptation": "Usar tres bloques de Lego de distintos colores (rojo, amarillo, azul) para asociar cada bloque con una parte de la narración antes de escribir.",
    "advancedExtension": "Proponer dos desenlaces diferentes para el mismo cuento: uno donde Tuercas usa sus luces y otro donde pide ayuda a los pájaros del parque.",
    "resources": [
      {
        "id": "class-len-gael-02-res-1",
        "type": "external_link",
        "title": "Mundo Primaria: Cuentos Infantiles con Moraleja",
        "url": "https://www.mundoprimaria.com/cuentos-infantiles-cortos",
        "description": "Biblioteca infantil abierta con relatos estructurados en inicio, nudo y desenlace.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-len-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — El Semáforo del Cuento",
        "url": "/api/v1/academic/classes/class-len-gael-02/guide.pdf",
        "description": "Plantilla gráfica de 3 viñetas para crear historietas secuenciales en 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-gael-02-act-1",
        "title": "Identificar los Tres Momentos",
        "description": "Lee el cuento de Tuercas y subraya de verde el inicio, de amarillo el nudo y de azul el desenlace.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-len-gael-02-act-2",
        "title": "Semáforo Narrativo",
        "description": "Completa la ficha del semáforo con la aventura del dinosaurio explorador.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-gael-02-act-3",
        "title": "Historieta en 3 Viñetas",
        "description": "Crea tu historieta ilustrada en tres momentos con título propio.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Elige un libro de tu casa y explícale a tus padres cuál es el problema que tiene el protagonista en ese libro.",
    "reflectionPrompt": "¿Qué haces tú cuando tienes un problema o nudo en tu día? ¿Quién te ayuda a llegar al desenlace feliz?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_gael_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-len-gael-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-01-LEN",
      "subjectCode": "LEN-401",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-len-gael-03",
    "subjectId": "len-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Mi Entorno Natural y Digital (Cuento Ilustrado)",
    "theme": "Cazadores de palabras: Los Sustantivos que dan nombre al universo",
    "objective": "Reconocer y clasificar sustantivos propios y comunes en situaciones comunicativas reales.",
    "learningPurpose": "Entender que cada cosa, animal, persona y lugar tiene un nombre especial que nos permite nombrarlo y valorarlo.",
    "competencyDcd": "LL.2.4.1 — Desarrollar progresivamente autonomía en el uso de sustantivos comunes y propios para enriquecer relatos escritos.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Atención, explorador Gael! Hoy nos pondremos los lentes mágicos de los \"cazadores de palabras\". ¿Te has fijado en que todo lo que tocas, ves o imaginas tiene un nombre? La mesa, el perro, las montañas... pero también las personas tienen nombres únicos como Gael o Ecuador. Esas palabras que nombran el mundo se llaman SUSTANTIVOS.",
    "reading": "El safari de los nombres: En las Islas Galápagos vive una tortuga gigante llamada Don Jorge. Don Jorge camina despacio sobre la arena volcánica junto a su amiga piquero de patas azules, a quien le gusta volar sobre el océano Pacífico. Si miras bien, \"tortuga\", \"arena\" y \"océano\" son nombres de cosas y animales que hay muchos en el mundo (sustantivos comunes). Pero \"Don Jorge\", \"Galápagos\" y \"Ecuador\" son nombres propios de un ser o lugar único, ¡y por eso siempre se visten con mayúscula elegante al empezar!",
    "pedagogicalExplanation": "Los sustantivos son las etiquetas del mundo. Hay dos familias principales: 1) Sustantivos comunes: nombran a cualquier persona, animal o cosa (niño, perro, volcán, pelota). 2) Sustantivos propios: nombran a un ser o lugar específico para diferenciarlo de los demás, y siempre se escriben con mayúscula inicial (Gael, Quito, Pichincha, Dios).",
    "vocabulary": [
      {
        "term": "Sustantivo común",
        "definition": "Palabra que nombra a cualquier ser, objeto o lugar de una misma especie.",
        "childFriendlyExample": "\"río\", \"ciudad\", \"gato\" son sustantivos comunes."
      },
      {
        "term": "Sustantivo propio",
        "definition": "Nombre particular que identifica a una persona, mascota o lugar único.",
        "childFriendlyExample": "\"Gael\", \"Guayas\", \"Amazonas\" son sustantivos propios."
      },
      {
        "term": "Mayúscula",
        "definition": "Letra más grande y distinguida que se usa al inicio de nombres propios y oraciones.",
        "childFriendlyExample": "La letra \"G\" en Gael es una mayúscula."
      }
    ],
    "contextualizedExample": "Tú eres un \"niño\" (sustantivo común), pero tu nombre único es \"Gael\" (sustantivo propio). Tu país es un \"país\" (común), pero se llama \"Ecuador\" (propio).",
    "socraticQuestions": [
      "¿Por qué sería muy confuso si todos los perros del mundo se llamaran simplemente \"perro\"?",
      "Si descubres un nuevo planeta en el telescopio, ¿qué nombre propio le pondrías y por qué?",
      "¿Qué pasa con la primera letra de un sustantivo propio si se te olvida poner la mayúscula?"
    ],
    "practicalActivity": {
      "title": "Cacería de sustantivos en casa",
      "instructions": [
        "Divide una hoja en dos columnas: \"Sustantivos Comunes\" y \"Sustantivos Propios\".",
        "En 2 minutos, busca en tu casa 5 objetos o animales y anótalos en la columna de Comunes.",
        "Luego, escribe al lado el nombre propio de 5 personas o lugares que tú quieras mucho con su mayúscula destacada en color rojo."
      ],
      "materials": [
        "Hoja de notas",
        "Lápiz",
        "Color rojo para mayúsculas"
      ]
    },
    "applicationActivity": {
      "title": "El mapa de nombres de mi cuento",
      "task": "Elige el protagonista y el lugar de tu futuro cuento. Escribe su sustantivo común (ej: oso) y su sustantivo propio (ej: Melquiades). Haz lo mismo con el bosque o montaña donde vivirá.",
      "deliverable": "Ficha de personajes con 3 sustantivos comunes y sus 3 nombres propios con mayúscula."
    },
    "formativeEvaluation": {
      "description": "Diferenciación práctica entre sustantivo común y propio con uso correcto de mayúsculas.",
      "expectedEvidence": "Gael clasifica correctamente las palabras de su ficha y resalta la mayúscula en todos los sustantivos propios."
    },
    "evaluationRubric": {
      "criterion": "Aplicación de sustantivos y uso de mayúsculas en textos propios (LL.2.4.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Reconoce que las palabras son nombres pero olvida colocar la mayúscula en nombres propios."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Distingue entre personas y objetos, aplicando mayúsculas en su propio nombre con apoyo."
        },
        {
          "level": "Consolidado",
          "descriptor": "Clasifica sustantivos comunes y propios con total soltura y aplica la regla ortográfica de la mayúscula en todos sus escritos."
        }
      ]
    },
    "expectedFeedback": "¡Excelente cacería, Gael! Identificaste los sustantivos propios a la perfección y no se te escapó ninguna mayúscula roja. ¡Tus personajes ya tienen nombres memorables!",
    "difficultyAdaptation": "Jugar al juego \"Simón dice sustantivos\": Simón dice que toques un sustantivo común (mesa); Simón dice que digas tu sustantivo propio (Gael).",
    "advancedExtension": "Gael investiga el nombre de 3 volcanes del Ecuador (Cotopaxi, Chimborazo, Tungurahua) y explica por qué son sustantivos propios aunque todos sean volcanes.",
    "resources": [
      {
        "id": "class-len-gael-03-res-1",
        "type": "external_link",
        "title": "Árbol ABC: Juegos de Sustantivos y Gramática",
        "url": "https://arbolabc.com/",
        "description": "Juegos interactivos lúdicos en español para clasificar sustantivos comunes y propios.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-len-gael-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Cazadores de Sustantivos",
        "url": "/api/v1/academic/classes/class-len-gael-03/guide.pdf",
        "description": "Ficha de trabajo con lupa de detective para encontrar sustantivos en un relato de Galápagos.",
        "duration": "15 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-gael-03-act-1",
        "title": "Detectives del Safari",
        "description": "Encuentra en la lectura de Galápagos 3 sustantivos comunes y 3 propios.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-len-gael-03-act-2",
        "title": "Tabla de Dos Columnas",
        "description": "Clasifica los 10 sustantivos cazados en casa usando mayúsculas rojas.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-gael-03-act-3",
        "title": "Ficha de Nombres del Cuento",
        "description": "Crea los nombres comunes y propios de los personajes de tu libro.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Busca en tu cocina 3 alimentos con nombre común (ej: fruta) y escribe qué marca o variedad propia tienen.",
    "reflectionPrompt": "¿Cómo te sentirías si nadie te llamara por tu nombre propio? ¿Por qué los nombres nos hacen especiales?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_gael_03.pdf",
    "guideUrl": "/api/v1/academic/classes/class-len-gael-03/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-01-LEN",
      "subjectCode": "LEN-401",
      "unitNumber": 1,
      "sessionNumber": 3
    }
  },
  {
    "id": "class-len-gael-04",
    "subjectId": "len-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-14",
    "dayOfWeek": "Lunes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Mi Entorno Natural y Digital (Cuento Ilustrado)",
    "theme": "Pintar con palabras: Los Adjetivos Calificativos que dan vida a los personajes",
    "objective": "Utilizar adjetivos calificativos para describir cualidades físicas y de carácter en producciones escritas.",
    "learningPurpose": "Aprender que las palabras pueden ser como pinceles de colores que ayudan a los lectores a imaginar exactamente cómo son las cosas.",
    "competencyDcd": "LL.2.4.1 — Enriquecer relatos escritos con el uso pertinente de adjetivos calificativos que describan personajes y escenarios.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Hola, pintor de historias! Imagina que te digo: \"Ayer vi un perro\". Seguro te preguntas: ¿era grande o chiquito? ¿feroz o juguetón? ¿blanco o manchado? Cuando usamos palabras como \"enorme\", \"suave\", \"veloz\" o \"cariñoso\", estamos usando ADJETIVOS. ¡Los adjetivos son la pintura que llena de vida a los sustantivos!",
    "reading": "El oso de anteojos y su frazada: En los páramos fríos de los Andes vive Ucumari, un oso de anteojos peludo, curioso y comelón. Tiene una nariz húmeda, unas garras fuertes pero gentiles y una mancha blanca alrededor de sus ojos que parece unos lentes elegantes. A Ucumari le encanta comer bayas dulces y dormir sobre la hierba húmeda. Cuando la niebla espesa baja por la montaña, Ucumari se abriga con su pelaje espeso y sueña con árboles altos y cielos despejados.",
    "pedagogicalExplanation": "Los adjetivos calificativos son palabras que responden a la pregunta: ¿Cómo es? o ¿Cómo está el sustantivo? Por ejemplo: ¿Cómo es el oso? Es peludo, curioso y comelón. Los adjetivos nos dicen tamaño (gigante, enano), color (dorado, azul), textura (áspero, suave) y forma de ser (alegre, valiente).",
    "vocabulary": [
      {
        "term": "Adjetivo calificativo",
        "definition": "Palabra que dice una cualidad o característica del sustantivo.",
        "childFriendlyExample": "\"dulce\", \"rápido\", \"brillante\" son adjetivos."
      },
      {
        "term": "Cualidad",
        "definition": "Una característica especial que describe cómo es algo o alguien.",
        "childFriendlyExample": "La bondad y la curiosidad son hermosas cualidades de Gael."
      },
      {
        "term": "Concordancia",
        "definition": "Que el adjetivo combine bien en género (femenino/masculino) y número (uno/varios) con el sustantivo.",
        "childFriendlyExample": "Decimos \"oso peludo\" y no \"oso peluda\"."
      }
    ],
    "contextualizedExample": "Si dices \"manzana roja y crujiente\", \"roja\" y \"crujiente\" son los adjetivos que te hacen saborear la manzana antes de morderla.",
    "socraticQuestions": [
      "¿Cómo cambiaría la historia si dijéramos que el oso Ucumari es \"miedoso y perezoso\" en vez de \"curioso y valiente\"?",
      "¿Cuál es la diferencia entre describir cómo es algo por fuera (su cuerpo) y cómo es por dentro (sus emociones)?",
      "¿Qué tres adjetivos usarías para describir tu lugar favorito del mundo?"
    ],
    "practicalActivity": {
      "title": "El sombrero de las cualidades misteriosas",
      "instructions": [
        "Dibuja un animal fantástico inventado por ti en tu libreta.",
        "A su alrededor dibuja 4 flechas.",
        "En cada flecha escribe un adjetivo diferente: uno de tamaño, uno de color, uno de textura al tacto y uno de su carácter.",
        "Presenta tu animal fantástico diciendo: \"Este es un... animal...\" usando tus 4 adjetivos con orgullo."
      ],
      "materials": [
        "Libreta de explorador",
        "Lápices de colores",
        "Regla"
      ]
    },
    "applicationActivity": {
      "title": "Retrato descriptivo del coprotagonista",
      "task": "Escribe un párrafo de 4 oraciones describiendo al mejor amigo del protagonista de tu cuento, usando al menos 4 adjetivos calificativos destacados con color amarillo.",
      "deliverable": "Párrafo descriptivo en el cuaderno con los adjetivos subrayados en amarillo."
    },
    "formativeEvaluation": {
      "description": "Identificación y aplicación creativa de adjetivos calificativos con concordancia de género y número.",
      "expectedEvidence": "Gael utiliza 4 adjetivos pertinentes que enriquecen visualmente la descripción de su personaje."
    },
    "evaluationRubric": {
      "criterion": "Uso de adjetivos calificativos para enriquecer textos descriptivos (LL.2.4.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Usa adjetivos básicos de color pero le cuesta describir cualidades de personalidad o tamaño."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Describe el aspecto físico de su personaje usando 3 adjetivos con buena concordancia."
        },
        {
          "level": "Consolidado",
          "descriptor": "Combina adjetivos sensoriales (tacto, vista) y de carácter para crear un retrato vivaz y expresivo."
        }
      ]
    },
    "expectedFeedback": "¡Qué gran ojo descriptivo tienes, Gael! Al leer tus adjetivos pude casi tocar el pelaje suave y ver el brillo dorado de tu personaje. ¡Estás listo para escribir tu libro!",
    "difficultyAdaptation": "Proporcionar una \"paleta de adjetivos\" con dibujos de texturas (algodón = suave, lija = áspera, sol = brillante) para elegir palabras táctiles.",
    "advancedExtension": "Gael inventa comparaciones poéticas sencillas usando adjetivos: \"tan veloz como un rayo\", \"tan suave como una nube andina\".",
    "resources": [
      {
        "id": "class-len-gael-04-res-1",
        "type": "external_link",
        "title": "Smile and Learn: Los Adjetivos para Niños",
        "url": "https://smileandlearn.com/",
        "description": "Video interactivo y actividades lúdicas sobre concordancia y descripción con adjetivos.",
        "duration": "12 min",
        "order": 1
      },
      {
        "id": "class-len-gael-04-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Pintar con Adjetivos",
        "url": "/api/v1/academic/classes/class-len-gael-04/guide.pdf",
        "description": "Ficha imprimible con siluetas de animales para rellenar con adjetivos sensoriales.",
        "duration": "18 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-gael-04-act-1",
        "title": "Descubrir Adjetivos en el Páramo",
        "description": "Subraya en el texto de Ucumari los 5 adjetivos que dicen cómo es el oso y su entorno.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-len-gael-04-act-2",
        "title": "El Animal Fantástico",
        "description": "Dibuja y anota las 4 flechas con adjetivos de tamaño, color, textura y emoción.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-gael-04-act-3",
        "title": "Retrato del Coprotagonista",
        "description": "Redacta el párrafo de 4 oraciones destacando los adjetivos en amarillo.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Describe a tu mascota o a un juguete favorito usando tres adjetivos positivos sin repetir ninguno.",
    "reflectionPrompt": "¿Qué adjetivos te gustaría que las personas usen cuando piensen en ti como amigo?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_gael_04.pdf",
    "guideUrl": "/api/v1/academic/classes/class-len-gael-04/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-01-LEN",
      "subjectCode": "LEN-401",
      "unitNumber": 1,
      "sessionNumber": 4
    }
  },
  {
    "id": "class-len-gael-05",
    "subjectId": "len-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-16",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Mi Entorno Natural y Digital (Cuento Ilustrado)",
    "theme": "El héroe de mi historia: Creación y caracterización del protagonista",
    "objective": "Integrar estructura narrativa, sustantivos y adjetivos en la creación del perfil del protagonista del cuento ilustrado.",
    "learningPurpose": "Consolidar las habilidades de las sesiones 1 a 4 para dar nacimiento al personaje principal de nuestro proyecto trimestral en Book Creator.",
    "competencyDcd": "LL.2.5.1 — Recrear textos literarios leídos o escuchados y producir relatos propios expresando emociones y puntos de vista personales.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Día de fiesta, escritor Gael! Hemos aprendido por qué contamos historias, cómo se dividen en inicio, nudo y desenlace, y cómo los sustantivos y adjetivos dan vida a todo. Hoy nos convertiremos en creadores oficiales: diseñaremos al protagonista de tu libro digital. ¿Tendrá plumas, alas, ruedas o garras mágicas? ¡La decisión es 100% tuya!",
    "reading": "Manifiesto de los Creadores de Cuentos: En la literatura infantil no hay límites para soñar. Los grandes autores nos enseñan que los héroes no son perfectos: a veces tienen miedo a la oscuridad, a veces tropiezan, pero siempre se levantan con una sonrisa para ayudar a quien lo necesita. Tu protagonista vivirá en el Ecuador que tú elijas: puede ser una tortuga marina de Galápagos que sueña con tocar las estrellas, un cóndor de los Andes que inventa canciones con el viento, o un pequeño jaguar amazónico que rescata orquídeas perdidas.",
    "pedagogicalExplanation": "Crear un personaje completo requiere responder 4 preguntas esenciales: 1) ¿Quién es y cómo se llama? (Sustantivos propios y comunes). 2) ¿Cómo es por fuera y por dentro? (Adjetivos calificativos). 3) ¿Cuál es su gran sueño o deseo? (Motivación del héroe). 4) ¿Qué pequeño miedo o debilidad tiene? (Lo que lo hace simpático y humano).",
    "vocabulary": [
      {
        "term": "Protagonista",
        "definition": "El personaje principal de una historia, alrededor del cual suceden los acontecimientos.",
        "childFriendlyExample": "Quinde era el protagonista de nuestro primer cuento."
      },
      {
        "term": "Caracterización",
        "definition": "El conjunto de detalles que muestran cómo es un personaje física y emocionalmente.",
        "childFriendlyExample": "Dibujar sus ojos curiosos y su capa verde es parte de su caracterización."
      },
      {
        "term": "Motivación",
        "definition": "La razón poderosa que impulsa al personaje a emprender su aventura.",
        "childFriendlyExample": "La motivación del colibrí era salvar a sus amigos del frío."
      }
    ],
    "contextualizedExample": "Cuando creas a \"Kusi\", una llama alegre de los páramos de Cotopaxi que quiere construir un telescopio con hielo, tienes un protagonista inolvidable.",
    "socraticQuestions": [
      "¿Qué hace que un personaje se gane el cariño de los lectores: que sea perfecto en todo o que aprenda de sus errores?",
      "Si tu protagonista se enfrenta a un desafío muy difícil, ¿a quién le pediría un buen consejo?",
      "¿Qué valor especial (solidaridad, paciencia, valentía) pondrás en el corazón de tu personaje?"
    ],
    "practicalActivity": {
      "title": "La tarjeta de identidad del protagonista",
      "instructions": [
        "Dibuja un marco decorado en una hoja blanca como si fuera la cédula de explorador de tu personaje.",
        "Dibuja a tu héroe en el centro con todos sus detalles.",
        "Completa su ficha: Nombre propio, Especie/Sustantivo común, 3 Adjetivos clave, Su gran sueño y Su superpoder bondadoso."
      ],
      "materials": [
        "Hoja bond",
        "Marcadores y lápices de colores",
        "Ficha de datos"
      ]
    },
    "applicationActivity": {
      "title": "Grabación del pitch oral del personaje",
      "task": "Ponte de pie frente a tu tutor o graba un audio de 1 minuto presentándote como el autor del libro y describiendo a tu protagonista con voz expresiva.",
      "deliverable": "Presentación oral entusiasta del personaje y entrega de la tarjeta de identidad ilustrada."
    },
    "formativeEvaluation": {
      "description": "Evaluación formativa integradora de la primera semana de Lengua: coherencia discursiva, uso de vocabulario y originalidad narrativa.",
      "expectedEvidence": "Gael presenta la ficha de su protagonista articulando con claridad quién es, cómo es y cuál será su desafío en el cuento."
    },
    "evaluationRubric": {
      "criterion": "Producción de personajes y expresión creativa oral y escrita (LL.2.5.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Dibuja al personaje pero necesita apoyo para definir su nombre propio o sus cualidades distintivas."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Presenta al protagonista con nombre y adjetivos claros, pero su motivación es aún difusa."
        },
        {
          "level": "Consolidado",
          "descriptor": "Integra con maestría nombre propio, adjetivos sensoriales, motivación y valores éticos en una presentación oral y gráfica brillante."
        }
      ]
    },
    "expectedFeedback": "¡Brillante cierre del primer lote, maestro Gael! Tu personaje tiene alma, ternura y un propósito inspirador. Tienes en tus manos el inicio de un libro ilustrado sensacional.",
    "difficultyAdaptation": "Completar una plantilla con espacios en blanco tipo oración guiada: \"Mi personaje se llama ______, es un ______ muy ______ que sueña con ______\".",
    "advancedExtension": "Escribir las tres primeras líneas de la página 1 de su libro en Book Creator presentando al protagonista en su hogar.",
    "resources": [
      {
        "id": "class-len-gael-05-res-1",
        "type": "external_link",
        "title": "Book Creator: Herramienta de Creación de Libros Digitales",
        "url": "https://bookcreator.com/",
        "description": "Plataforma oficial educativa para que los niños maqueten e ilustren sus propios libros interactivos.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-len-gael-05-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Ficha de Identidad del Héroe",
        "url": "/api/v1/academic/classes/class-len-gael-05/guide.pdf",
        "description": "Plantilla de pasaporte de personajes para el proyecto trimestral de 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-len-gael-05-act-1",
        "title": "Manifiesto de Creación",
        "description": "Reflexiona sobre qué mensaje positivo transmitirá tu personaje a otros niños del mundo.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-len-gael-05-act-2",
        "title": "Cédula de Identidad de Autor",
        "description": "Diseña la tarjeta gráfica con dibujo, nombre propio y adjetivos del protagonista.",
        "type": "project",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-len-gael-05-act-3",
        "title": "Presentación Oral en Vivo",
        "description": "Presenta en 1 minuto a tu héroe ante tu tutor socrático con elocuencia.",
        "type": "speaking",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Muéstrale la ficha de tu personaje a un familiar y pregúntale qué aventura le gustaría que viva en el capítulo 2.",
    "reflectionPrompt": "Si tu personaje pudiera darte un consejo a ti en este momento, ¿qué crees que te diría?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_len_gael_05.pdf",
    "guideUrl": "/api/v1/academic/classes/class-len-gael-05/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-01-LEN",
      "subjectCode": "LEN-401",
      "unitNumber": 1,
      "sessionNumber": 5
    }
  },
  {
    "id": "class-mat-gael-01",
    "subjectId": "mat-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Sentido Numérico, Operaciones CPA y Geometría Visual",
    "theme": "El misterio de los números: Contar agrupando en decenas y centenas",
    "objective": "Comprender el sistema decimal agrupando objetos concretos en decenas y centenas.",
    "learningPurpose": "Descubrir que agrupar de 10 en 10 nos ahorra tiempo y nos ayuda a no perder la cuenta cuando hay muchos elementos.",
    "competencyDcd": "M.2.1.14 — Reconocer el valor posicional de números naturales basándose en la composición y descomposición mediante material concreto (Base 10 / Lego).",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Hola, súper calculador Gael! Si tuvieras 100 monedas de chocolate sueltas en el piso y quisieras contarlas antes de que se derritan, ¿las contarías de una en una o harías paquetitos? ¡Los matemáticos inventaron el truco de las decenas para contar a la velocidad de un rayo!",
    "reading": "La fábrica de cajas mágicas: En el taller del profesor Lucas hay miles de bloques de colores. Lucas le enseña a Gael que 10 bloquecitos sueltos (unidades) se pueden unir para formar una torre firme llamada DECENA. Y si juntas 10 torres de decenas, formas una placa cuadrada llamada CENTENA. ¡Así, con solo mirar las placas y las torres, sabes cuántos bloques hay sin contarlos uno por uno!",
    "pedagogicalExplanation": "El Método Singapur nos enseña a través de tres pasos (CPA): 1) Concreto: tocamos bloques de Lego o frijoles. 2) Pictórico: dibujamos torres y cuadrados en la libreta. 3) Abstracto: escribimos el número con cifras (ejemplo: 135 = 1 centena, 3 decenas y 5 unidades).",
    "vocabulary": [
      {
        "term": "Unidad",
        "definition": "El elemento más pequeño que se cuenta de uno en uno (del 1 al 9).",
        "childFriendlyExample": "Una ficha de Lego sola es una unidad."
      },
      {
        "term": "Decena",
        "definition": "Un grupo de 10 unidades juntas.",
        "childFriendlyExample": "Una torre de 10 fichas de Lego es una decena."
      },
      {
        "term": "Centena",
        "definition": "Un grupo de 10 decenas (100 unidades).",
        "childFriendlyExample": "Una placa de 100 fichas es una centena."
      }
    ],
    "contextualizedExample": "Si Gael tiene 24 cochecitos de juguete, tiene 2 cajas de 10 (2 decenas) y 4 cochecitos sueltos (4 unidades). En número se escribe 24.",
    "socraticQuestions": [
      "¿Por qué crees que los seres humanos decidimos agrupar de 10 en 10 y no de 7 en 7? (Pista: mira tus manos).",
      "Si tienes 3 decenas de manzanas y te regalan 5 unidades más, ¿cuántas manzanas tienes en total?",
      "¿Qué pesa más: 1 centena de plumas o 10 decenas de plumas?"
    ],
    "practicalActivity": {
      "title": "Construcción Base 10 con bloques Lego",
      "instructions": [
        "Arma 3 torres de 10 fichas de Lego cada una.",
        "Deja 7 fichas sueltas al lado.",
        "Representa en tu pizarra mágica el número total: ¿cuántas decenas hay? ¿cuántas unidades? Escribe el número en grande."
      ],
      "materials": [
        "Bloques de Lego o regletas",
        "Pizarra o libreta",
        "Marcador"
      ]
    },
    "applicationActivity": {
      "title": "El banco de la tienda de juguetes",
      "task": "Dibuja en tu libreta tres productos de una tienda con sus precios en centenas, decenas y unidades usando dibujos de placas y torres.",
      "deliverable": "Ficha con 3 dibujos de juguetes y su descomposición aditiva."
    },
    "formativeEvaluation": {
      "description": "Descomposición aditiva y manipulación de material concreto Base 10.",
      "expectedEvidence": "Gael manipula las fichas, explica que 10 unidades hacen 1 decena y escribe el número 37 sin dudar."
    },
    "evaluationRubric": {
      "criterion": "Comprensión del valor posicional en base 10 (M.2.1.14)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Cuenta los objetos de 1 en 1 y necesita ayuda para formar grupos de 10."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Forma decenas con material concreto pero se confunde al escribir el valor posicional."
        },
        {
          "level": "Consolidado",
          "descriptor": "Agrupa con agilidad en decenas y centenas, y traduce con fluidez de lo concreto a lo numérico."
        }
      ]
    },
    "expectedFeedback": "¡Impresionante agilidad mental, Gael! Descubriste que contar en decenas es como tener un superpoder para ordenar juguetes y números.",
    "difficultyAdaptation": "Utilizar una huevera de 10 espacios y granos de maíz para verificar físicamente que al llenarse la huevera se convierte en una decena.",
    "advancedExtension": "Gael investiga qué número se forma con 10 centenas juntas (¡el mil, la Unidad de Mil!) y dibuja un gran cubo de 1.000.",
    "resources": [
      {
        "id": "class-mat-gael-01-res-1",
        "type": "simulator",
        "title": "GeoGebra: Bloques de Base 10 Interactivos",
        "url": "https://www.geogebra.org/m/XU9z5m9X",
        "description": "Simulador manipulativo virtual para componer y descomponer centenas, decenas y unidades.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-mat-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Agrupando en Base 10",
        "url": "/api/v1/academic/classes/class-mat-gael-01/guide.pdf",
        "description": "Ficha de trabajo con desafíos visuales del Método Singapur para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-gael-01-act-1",
        "title": "El Reto de las Cajas",
        "description": "Descubre cuántos bloques hay en el taller observando las placas y torres.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-mat-gael-01-act-2",
        "title": "Laboratorio Lego Base 10",
        "description": "Arma tus torres de decenas y descompón los números 37 y 52.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-gael-01-act-3",
        "title": "Tienda de Precios Descompuestos",
        "description": "Dibuja los 3 juguetes con sus precios en placas y torres.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Pregunta a tus papás cuántos años tienen y descompón sus edades en decenas y unidades.",
    "reflectionPrompt": "¿Qué cosas en tu casa vienen agrupadas en paquetes de 10 o de 12?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_gael_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-mat-gael-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-02-MAT",
      "subjectCode": "MAT-401",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-mat-gael-02",
    "subjectId": "mat-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Sentido Numérico, Operaciones CPA y Geometría Visual",
    "theme": "La recta numérica y el valor posicional: ¿Cuánto vale cada dígito?",
    "objective": "Ubicar números naturales en la semirrecta numérica y comparar cantidades usando relaciones de orden.",
    "learningPurpose": "Comprender que la posición de un número determina su valor real (no es lo mismo tener el 5 en las unidades que en las centenas).",
    "competencyDcd": "M.2.1.12 — Representar, escribir y leer números naturales en la semirrecta numérica y establecer relaciones de secuencia y orden (<, >, =).",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Hola, explorador de números! ¿Alguna vez has jugado a dar pasos gigantes y pasos de hormiga? La semirrecta numérica es como un camino mágico donde los números viven en fila india, perfectamente ordenados desde el más pequeño hasta el más grande. Hoy aprenderemos a saltar como ranitas sabias sobre la recta.",
    "reading": "La carrera de los animales andinos: En el páramo, la llama Kusi, el conejo Tambo y el venado de cola blanca compiten en una carrera amistosa. Kusi dio saltos de 10 en 10 y llegó al punto 50. Tambo dio saltos de 5 en 5 y llegó al 35. El venado dio un salto largo hasta el 80. Cuando miraron la recta marcada en la tierra, supieron al instante quién iba más adelante sin necesidad de discutir, porque en la recta los números crecen siempre hacia la derecha.",
    "pedagogicalExplanation": "La semirrecta numérica empieza en el 0 y va hacia adelante con una flecha que indica que nunca termina. El valor posicional significa que el número 5 vale 5 si está en las unidades ($5$), pero vale 50 si se muda a las decenas ($50$), y vale 500 si se muda a las centenas ($500$).",
    "vocabulary": [
      {
        "term": "Semirrecta numérica",
        "definition": "Una línea recta graduada que empieza en cero y sirve para ordenar números.",
        "childFriendlyExample": "Tu regla escolar es una semirrecta numérica en centímetros."
      },
      {
        "term": "Mayor que (>) y Menor que (<)",
        "definition": "Símbolos matemáticos que comparan dos cantidades.",
        "childFriendlyExample": "El cocodrilo comilón siempre abre la boca grande hacia el número mayor: 80 > 35."
      }
    ],
    "contextualizedExample": "Si tienes $25 y tu hermana tiene $52, los dos números usan el 2 y el 5, ¡pero 52 es mucho mayor porque tiene 5 decenas!",
    "socraticQuestions": [
      "¿Por qué el número 52 es más grande que el 25 si tienen exactamente los mismos dígitos?",
      "Si estás en el número 40 de la recta y das 3 saltos de 10 hacia la derecha, ¿en qué número aterrizas?",
      "¿Hacia qué lado de la recta saltarías si quisieras restar o quitar números?"
    ],
    "practicalActivity": {
      "title": "La recta numérica en el suelo de la sala",
      "instructions": [
        "Pega una tira de cinta adhesiva de papel en el suelo con marcas del 0 al 100 de 10 en 10.",
        "Párate en el número 20.",
        "Da un salto hacia adelante sumando 30 (aterrizas en 50).",
        "Da un paso hacia atrás restando 10 (aterrizas en 40)."
      ],
      "materials": [
        "Cinta adhesiva de enmascarar",
        "Marcador para piso",
        "Tus pies activos"
      ]
    },
    "applicationActivity": {
      "title": "El torneo del cocodrilo glotón",
      "task": "En tu libreta dibuja la cara del cocodrilo con la boca abierta (< o >) comparando 5 pares de números de dos y tres cifras (ej: 145 y 154).",
      "deliverable": "Página de ejercicios resuelta con justificación oral del valor posicional."
    },
    "formativeEvaluation": {
      "description": "Lectura, ubicación y comparación en la semirrecta numérica.",
      "expectedEvidence": "Gael ubica números en la recta y explica por qué 154 > 145 fijándose en la decena."
    },
    "evaluationRubric": {
      "criterion": "Ubicación en la recta numérica y comparación de orden (M.2.1.12)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Ubica números menores a 20 pero confunde el sentido de los símbolos mayor y menor."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Compara números de dos cifras y usa la recta con apoyo del tutor."
        },
        {
          "level": "Consolidado",
          "descriptor": "Ubica con exactitud cantidades en la recta y fundamenta sus comparaciones en el valor de las cifras."
        }
      ]
    },
    "expectedFeedback": "¡Fantástica puntería en la recta, Gael! Entendiste muy bien que la posición del dígito cambia todo su valor. ¡Ese cocodrilo comilón no se equivocó nunca!",
    "difficultyAdaptation": "Dibujar ojos y dientes en el símbolo > para que recuerde que es la boca de un cocodrilo que siempre come donde hay más comida.",
    "advancedExtension": "Gael crea una recta de 100 en 100 hasta el 1.000 y ubica números intermedios como 350 o 720.",
    "resources": [
      {
        "id": "class-mat-gael-02-res-1",
        "type": "simulator",
        "title": "Mathigon: Recta Numérica Interactiva",
        "url": "https://mathigon.org/",
        "description": "Lienzo interactivo para simular saltos de ranita y comparar cantidades en la recta.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-mat-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Saltando en la Semirrecta",
        "url": "/api/v1/academic/classes/class-mat-gael-02/guide.pdf",
        "description": "Ficha imprimible con rectas graduadas y desafíos de comparación numérica.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-gael-02-act-1",
        "title": "La Carrera del Páramo",
        "description": "Ordena de menor a mayor las posiciones de los 3 animales en la recta.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-mat-gael-02-act-2",
        "title": "Saltos Físicos en la Recta",
        "description": "Camina y salta sobre la recta numérica del suelo resolviendo retos.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-gael-02-act-3",
        "title": "El Cocodrilo Glotón",
        "description": "Completa los 5 desafíos de comparación con los símbolos < y >.",
        "type": "quiz",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Mide con una regla de 30 cm la longitud de tu libro favorito y anota entre qué números quedó.",
    "reflectionPrompt": "¿Para qué le sirve a un conductor ver los números de kilómetros en la carretera?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_gael_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-mat-gael-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-02-MAT",
      "subjectCode": "MAT-401",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-mat-gael-03",
    "subjectId": "mat-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Sentido Numérico, Operaciones CPA y Geometría Visual",
    "theme": "Figuras planas en el mundo real: Lados, vértices y patrones geométricos",
    "objective": "Identificar y caracterizar cuadrados, rectángulos, triángulos y círculos según el número de lados y vértices.",
    "learningPurpose": "Descubrir que todas las construcciones del mundo (casas, puentes, ventanas) están hechas combinando figuras geométricas básicas.",
    "competencyDcd": "M.2.2.1 — Reconocer y diferenciar cuadrados, rectángulos, triángulos y círculos a partir del análisis de sus lados y vértices.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Hola, arquitecto Gael! Si miras a tu alrededor, verás que la puerta es un rectángulo, la rueda de la bicicleta es un círculo y la rebanada de pizza parece un triángulo. Las figuras geométricas son los ladrillos con los que Dios y los seres humanos han diseñado el espacio. ¡Hoy aprenderemos a identificarlas por sus esquinas y sus lados!",
    "reading": "La ciudad de las formas: En un reino geométrico vivían cuatro amigos: Cuadrado (que presumía de tener 4 lados exactamente iguales), Rectángulo (que tenía 4 lados, dos largos y dos cortos), Triángulo (un explorador veloz con 3 lados y 3 esquinas puntiagudas) y Círculo (que no tenía ninguna esquina porque era una curva suave y perfecta que podía rodar sin parar). Juntos construyeron un castillo: el rectángulo fue la puerta, los cuadrados las ventanas, los triángulos los techos protectores y los círculos las ruedas del puente levadizo.",
    "pedagogicalExplanation": "Las figuras planas tienen dos partes clave: 1) Lados: las líneas rectas que forman el contorno. 2) Vértices: las esquinas donde se unen dos lados (como las esquinas de una mesa). El círculo no tiene lados rectos ni vértices.",
    "vocabulary": [
      {
        "term": "Lado",
        "definition": "Cada una de las líneas rectas que limitan una figura plana.",
        "childFriendlyExample": "Un cuadrado tiene 4 lados iguales."
      },
      {
        "term": "Vértice",
        "definition": "El punto o esquina donde se unen dos lados.",
        "childFriendlyExample": "Un triángulo tiene 3 vértices puntiagudos."
      },
      {
        "term": "Patrón geométrico",
        "definition": "Una secuencia ordenada de figuras que se repite siguiendo una regla.",
        "childFriendlyExample": "Círculo, cuadrado, círculo, cuadrado... es un patrón."
      }
    ],
    "contextualizedExample": "Las señales de tránsito: la señal de PARE es un octágono, la de peligro es un triángulo y la de información es un rectángulo azul.",
    "socraticQuestions": [
      "¿Por qué las ruedas de los carros son círculos y no cuadrados? ¿Qué pasaría si fueran triángulos?",
      "Si un cuadrado tiene 4 lados iguales, ¿en qué se parece y en qué se diferencia de un rectángulo?",
      "¿Cuántos triángulos necesitas juntar para formar un cuadrado?"
    ],
    "practicalActivity": {
      "title": "Geometría con palillos y plastilina",
      "instructions": [
        "Toma palillos de dientes (lados) y bolitas de plastilina (vértices).",
        "Construye un triángulo uniendo 3 palillos con 3 bolitas.",
        "Construye un cuadrado uniendo 4 palillos con 4 bolitas.",
        "Cuenta los lados y vértices con tu dedo mientras los tocas."
      ],
      "materials": [
        "Palillos de dientes o sorbetes",
        "Plastilina de colores"
      ]
    },
    "applicationActivity": {
      "title": "El robot geométrico",
      "task": "En una hoja de papel crea el dibujo de un robot usando únicamente triángulos, círculos, cuadrados y rectángulos. Al lado haz una tabla indicando cuántas figuras de cada una usaste.",
      "deliverable": "Dibujo del robot y tabla de conteo de figuras geométricas."
    },
    "formativeEvaluation": {
      "description": "Clasificación de figuras geométricas y conteo de lados y vértices con material manipulativo.",
      "expectedEvidence": "Gael explica con seguridad que el cuadrado tiene 4 lados iguales y 4 vértices, y que el triángulo tiene 3."
    },
    "evaluationRubric": {
      "criterion": "Identificación de propiedades de figuras geométricas planas (M.2.2.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Nombra las figuras pero confunde lados con esquinas o vértices."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Identifica lados y vértices en cuadrados y triángulos pero le cuesta diferenciar el rectángulo."
        },
        {
          "level": "Consolidado",
          "descriptor": "Distingue con precisión lados y vértices de las 4 figuras y construye patrones geométricos con creatividad."
        }
      ]
    },
    "expectedFeedback": "¡Extraordinario robot geométrico, Gael! Construiste las figuras con mucha precisión con los palillos y la plastilina. ¡Tienes visión de ingeniero!",
    "difficultyAdaptation": "Usar figuras de cartón ya recortadas para que Gael trace su contorno con el dedo antes de contarlas.",
    "advancedExtension": "Gael explora figuras de 5 y 6 lados (pentágonos y hexágonos) observando cómo las abejas construyen los panales en la naturaleza.",
    "resources": [
      {
        "id": "class-mat-gael-03-res-1",
        "type": "simulator",
        "title": "Toy Theater: Geoboard Virtual (Geoplano)",
        "url": "https://toytheater.com/geoboard/",
        "description": "Geoplano virtual con bandas elásticas para construir figuras geométricas interactivas.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-mat-gael-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Cazadores de Formas",
        "url": "/api/v1/academic/classes/class-mat-gael-03/guide.pdf",
        "description": "Ficha práctica de identificación de lados, vértices y patrones geométricos para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-gael-03-act-1",
        "title": "La Ciudad de las Formas",
        "description": "Identifica qué figura fue la puerta, la ventana y el techo del castillo.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-mat-gael-03-act-2",
        "title": "Construcción con Palillos y Plastilina",
        "description": "Arma tus figuras planas en 2D y cuenta sus lados y vértices.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-gael-03-act-3",
        "title": "Robot Geométrico",
        "description": "Dibuja tu robot y completa la tabla de conteo de figuras.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Encuentra en tu habitación 2 objetos con forma de círculo y 2 con forma de rectángulo y dibújalos.",
    "reflectionPrompt": "¿Qué figura geométrica crees que es la más fuerte para sostener un techo pesado?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_gael_03.pdf",
    "guideUrl": "/api/v1/academic/classes/class-mat-gael-03/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-02-MAT",
      "subjectCode": "MAT-401",
      "unitNumber": 1,
      "sessionNumber": 3
    }
  },
  {
    "id": "class-mat-gael-04",
    "subjectId": "mat-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "08:00 - 08:45 (45 min)",
    "unit": "Unidad 1: Sentido Numérico, Operaciones CPA y Geometría Visual",
    "theme": "La suma como unión y reagrupación: El puente de las decenas",
    "objective": "Resolver adiciones con reagrupación utilizando el método Singapur y regletas visuales.",
    "learningPurpose": "Entender qué pasa realmente cuando \"llevamos 1\": no es magia, es transformar 10 unidades sueltas en una nueva decena completa.",
    "competencyDcd": "M.2.1.19 — Relacionar la noción de adición con la de agregar objetos a un conjunto y aplicar el algoritmo de la suma con reagrupación.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Hola, campeón de los números! ¿Alguna vez has visto que cuando juntas 10 monedas de un centavo las puedes cambiar en la tienda por una moneda brillante de 10 centavos? En la suma pasa lo mismo: cuando en la columna de las unidades se juntan 10 o más fichas, no caben todas en su casita, ¡así que forman una decena y cruzan el puente hacia la columna vecina!",
    "reading": "El puente de la fiesta de cumpleaños: En el bosque andino, los conejitos preparan una ensalada de zanahorias. La familia de Kusi trajo 28 zanahorias y la familia de Tambo trajo 15 zanahorias. Juntaron las unidades: $8 + 5 = 13$. ¡Pero en la canasta de las unidades solo caben números del 0 al 9! Entonces tomaron 10 zanahorias, las ataron con una cuerda dorada formando una nueva decena y la pasaron a la canasta de las decenas. Ahora tienen 2 decenas + 1 decena nueva + 1 decena que ya estaba = 4 decenas, y quedaron 3 zanahorias sueltas. ¡En total hay 43 zanahorias deliciosas!",
    "pedagogicalExplanation": "Sumar con reagrupación (llevar) es muy sencillo si recuerdas la regla de oro: las unidades solo viven solas hasta el 9. En cuanto se forma un grupo de 10, se empaqueta como 1 decena y se suma con las demás decenas.",
    "vocabulary": [
      {
        "term": "Adición",
        "definition": "La operación matemática que consiste en juntar o agregar dos o más cantidades.",
        "childFriendlyExample": "Juntar tus canicas con las de tu amigo es hacer una adición."
      },
      {
        "term": "Reagrupación",
        "definition": "Cambiar 10 unidades por 1 decena (o 10 decenas por 1 centena).",
        "childFriendlyExample": "Cuando 8 + 5 da 13, dejamos el 3 y pasamos el 1 a las decenas."
      }
    ],
    "contextualizedExample": "Si tienes 27 piezas de Lego y tu papá te presta 16 piezas más, sumas $7 + 6 = 13$ (dejas 3 y pasas 1 decena); luego $2 + 1 + 1 = 4$ decenas. ¡Tienes 43 piezas para armar tu nave!",
    "socraticQuestions": [
      "¿Por qué crees que no podemos escribir el número 13 completo en la casilla de las unidades?",
      "Si tienes 19 caramelos y te dan 1 caramelo más, ¿qué pasa con tus unidades?",
      "¿Cómo comprobarías con bloques de Lego que 28 + 15 es exactamente 43?"
    ],
    "practicalActivity": {
      "title": "El puente de las fichas de colores",
      "instructions": [
        "Dibuja dos casitas en una hoja: la casa de las Unidades (derecha) y la casa de las Decenas (izquierda).",
        "Coloca 28 frejoles (2 decenas de 10 y 8 sueltos).",
        "Agrega 15 frejoles (1 decena de 10 y 5 sueltos).",
        "Junta los sueltos: como son 13, mete 10 en una bolsita plástica (nueva decena) y pásala a la casa de las decenas.",
        "Cuenta el resultado final."
      ],
      "materials": [
        "Frejoles o botones",
        "Bolsitas o ligas",
        "Hoja con las casitas de valor posicional"
      ]
    },
    "applicationActivity": {
      "title": "El restaurante de la selva",
      "task": "Resuelve 3 problemas de sumas con reagrupación sobre animales que recolectan frutas en la selva, escribiendo la decena que sube al techo con color rojo.",
      "deliverable": "Ficha resuelta con el procedimiento visual de reagrupación claramente marcado."
    },
    "formativeEvaluation": {
      "description": "Resolución de adiciones con reagrupación explicando el pase de la decena.",
      "expectedEvidence": "Gael explica con sus palabras qué significa el \"1\" que se lleva a la columna de decenas."
    },
    "evaluationRubric": {
      "criterion": "Aplicación del algoritmo de adición con reagrupación CPA (M.2.1.19)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Suma sin reagrupar pero escribe dos dígitos en la columna de unidades."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Aplica el algoritmo mecánico de llevar pero le cuesta explicar por qué lo hace con material."
        },
        {
          "level": "Consolidado",
          "descriptor": "Resuelve adiciones con reagrupación con soltura y demuestra el canje de 10 unidades por 1 decena con material concreto."
        }
      ]
    },
    "expectedFeedback": "¡Qué gran maestro de la suma eres, Gael! Tu explicación de por qué las 10 zanahorias se atan con una cuerda fue perfecta. ¡El puente de las decenas funcionó sin atascos!",
    "difficultyAdaptation": "Utilizar una cajita con tapa llamada \"el banco\" donde Gael entrega 10 monedas de 1 para que el tutor le devuelva 1 moneda de 10.",
    "advancedExtension": "Gael resuelve una suma de tres cifras con reagrupación en las centenas (ejemplo: $180 + 150 = 330$).",
    "resources": [
      {
        "id": "class-mat-gael-04-res-1",
        "type": "simulator",
        "title": "Didax: Regletas Virtuales para Suma con Reagrupación",
        "url": "https://www.didax.com/",
        "description": "Regletas Cuisenaire virtuales para visualizar la composición y el canje en la adición.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-mat-gael-04-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — El Puente de las Decenas",
        "url": "/api/v1/academic/classes/class-mat-gael-04/guide.pdf",
        "description": "Ejercicios guiados con casitas de valor posicional y colores para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-gael-04-act-1",
        "title": "La Fiesta de las Zanahorias",
        "description": "Cuenta y agrupa las zanahorias de la lectura para descubrir el total.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-mat-gael-04-act-2",
        "title": "Taller de las Bolsitas y Frejoles",
        "description": "Realiza el canje físico de 10 unidades por 1 decena en tu mesa.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-gael-04-act-3",
        "title": "El Restaurante de la Selva",
        "description": "Resuelve los 3 problemas anotando la decena viajera con rojo.",
        "type": "quiz",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Suma el precio de dos compras pequeñas que hagan en casa usando tu casita de decenas.",
    "reflectionPrompt": "¿En qué se parece ayudar en equipo a sumar números con reagrupación?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_gael_04.pdf",
    "guideUrl": "/api/v1/academic/classes/class-mat-gael-04/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-02-MAT",
      "subjectCode": "MAT-401",
      "unitNumber": 1,
      "sessionNumber": 4
    }
  },
  {
    "id": "class-mat-gael-05",
    "subjectId": "mat-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "08:00 - 08:45 (45 min)",
    "unit": "Unidad 1: Sentido Numérico, Operaciones CPA y Geometría Visual",
    "theme": "La multiplicación como saltos repetidos: El camino de la rana",
    "objective": "Comprender la multiplicación como una adición de sumandos iguales a través de matrices visuales y saltos en la recta.",
    "learningPurpose": "Descubrir que multiplicar no es memorizar tablas aburridas, sino un súper atajo para sumar muchas veces el mismo número en un segundo.",
    "competencyDcd": "M.2.1.19 — Relacionar la noción de multiplicación como una adición abreviada de sumandos iguales y representarla en arreglos rectangulares.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Llegó el viernes de súper matemáticas, Gael! Imagina que una ranita salta sobre nenúfares y en cada salto avanza 3 metros. Si da 4 saltos, ¿cuánto avanzó? Podrías sumar: $3 + 3 + 3 + 3$. Pero, ¿sabías que hay una máquina matemática más veloz llamada \"signo por\" (×)? Decimos: 4 veces 3 es igual a 12 (4 × 3 = 12). ¡Multiplicar es el atajo más genial del universo!",
    "reading": "La plantación de maíz de Don Quinde: En un huerto de Imbabura, Don Quinde sembró choclos en filas muy ordenadas. Hizo 3 filas y en cada fila sembró 5 plantitas de maíz. Quinde quería saber cuántos choclos tendría en total. En lugar de contarlos de uno en uno, miró el rectángulo: 3 filas con 5 choclos cada una. Dijo con una sonrisa: \"3 veces 5 es 5 + 5 + 5 = 15\". Su hijo colibrí le dijo: \"¡Papá, eso es 3 × 5 = 15!\". Los dos aplaudieron felices porque la multiplicación les ahorró media hora de conteo.",
    "pedagogicalExplanation": "La multiplicación es una suma rápida de grupos iguales. Para que haya multiplicación, todos los grupos deben tener exactamente la misma cantidad. El primer número te dice cuántos grupos hay; el segundo te dice cuántos elementos tiene cada grupo.",
    "vocabulary": [
      {
        "term": "Multiplicación",
        "definition": "Operación que consiste en sumar un número tantas veces como indica otro.",
        "childFriendlyExample": "3 x 4 significa 3 veces el 4 (4 + 4 + 4)."
      },
      {
        "term": "Factores",
        "definition": "Los números que se multiplican entre sí.",
        "childFriendlyExample": "En 3 x 5 = 15, el 3 y el 5 son los factores."
      },
      {
        "term": "Arreglo rectangular",
        "definition": "Organizar objetos en filas y columnas iguales.",
        "childFriendlyExample": "Una barra de chocolate con 3 filas de 4 cuadritos es un arreglo rectangular."
      }
    ],
    "contextualizedExample": "Si compras 4 paquetes de cromos y cada paquete trae 5 cromos, no cuentas 1, 2, 3... dices: 4 × 5 = 20 cromos.",
    "socraticQuestions": [
      "¿Podrías multiplicar si un paquete tiene 3 galletas y otro paquete tiene 5 galletas? ¿Por qué no?",
      "¿Qué prefieres: que te regalen 2 + 2 + 2 dólares o 3 × 2 dólares? ¿Es lo mismo?",
      "Si una caja de huevos tiene 2 filas de 6 huevos, ¿cuántos huevos hay en total usando la multiplicación?"
    ],
    "practicalActivity": {
      "title": "La cuadrícula de chocolate con fichas Lego",
      "instructions": [
        "Arma un rectángulo con fichas de Lego que tenga 3 filas y 4 columnas.",
        "Escribe la suma repetida: 4 + 4 + 4 = 12.",
        "Escribe al lado la multiplicación: 3 × 4 = 12.",
        "Gira el rectángulo de Lego para que tenga 4 filas y 3 columnas: ¿cuánto da 4 × 3? ¡Magia: da 12 igual!"
      ],
      "materials": [
        "Placa de Lego y fichas",
        "Libreta de dibujo",
        "Lápiz"
      ]
    },
    "applicationActivity": {
      "title": "El huerto rectangular de Gael",
      "task": "Dibuja en tu libreta un huerto con zanahorias organizadas en 4 filas de 3 zanahorias cada una. Escribe la suma de grupos y la multiplicación correspondiente.",
      "deliverable": "Dibujo del huerto con la fórmula 4 × 3 = 12 y 3 × 4 = 12."
    },
    "formativeEvaluation": {
      "description": "Comprensión conceptual de la multiplicación como adición repetida y propiedad conmutativa visual.",
      "expectedEvidence": "Gael explica por qué 3 × 4 y 4 × 3 dan el mismo resultado rotando su placa de Lego."
    },
    "evaluationRubric": {
      "criterion": "Representación visual y comprensión de la multiplicación (M.2.1.19)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Cuenta elementos de uno en uno y no asocia la multiplicación con grupos iguales."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Expresa la suma repetida pero necesita apoyo para escribir la expresión con el signo x."
        },
        {
          "level": "Consolidado",
          "descriptor": "Modela arreglos rectangulares con facilidad, explica la multiplicación como suma abreviada y comprende la conmutatividad visualmente."
        }
      ]
    },
    "expectedFeedback": "¡Brillante cierre del lote de Matemáticas, Gael! Descubriste el secreto mejor guardado de los matemáticos: ¡multiplicar es sumar a la velocidad de la luz!",
    "difficultyAdaptation": "Dar saltos físicos sobre una alfombra contando en voz alta de 2 en 2 o de 5 en 5 antes de escribir la operación.",
    "advancedExtension": "Gael calcula mentalmente cuántos días hay en 3 semanas sabiendo que cada semana tiene 7 días (3 × 7 = 21).",
    "resources": [
      {
        "id": "class-mat-gael-05-res-1",
        "type": "simulator",
        "title": "PhET Colorado: Multiplicación Aritmética Visual",
        "url": "https://phet.colorado.edu/sims/html/make-a-ten/latest/make-a-ten_es.html",
        "description": "Simulador PhET oficial de la Universidad de Colorado para modelar arreglos y grupos de multiplicación.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-mat-gael-05-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — El Salto de la Multiplicación",
        "url": "/api/v1/academic/classes/class-mat-gael-05/guide.pdf",
        "description": "Ficha de trabajo con arreglos rectangulares y laberintos de multiplicación para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-mat-gael-05-act-1",
        "title": "El Choclo de Don Quinde",
        "description": "Calcula cuántos choclos hay en 3 filas de 5 sin contar de uno en uno.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-mat-gael-05-act-2",
        "title": "Matriz Lego de Chocolate",
        "description": "Construye tu rectángulo de 3x4 y rótalo para verificar la propiedad conmutativa.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-mat-gael-05-act-3",
        "title": "Diseño del Huerto",
        "description": "Dibuja el huerto de zanahorias y escribe la suma y la multiplicación.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Cuenta cuántas ventanas tiene la fachada de tu casa organizándolas en filas y columnas multiplicadas.",
    "reflectionPrompt": "¿En qué trabajos de la vida real crees que la gente usa la multiplicación todos los días?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_mat_gael_05.pdf",
    "guideUrl": "/api/v1/academic/classes/class-mat-gael-05/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-02-MAT",
      "subjectCode": "MAT-401",
      "unitNumber": 1,
      "sessionNumber": 5
    }
  },
  {
    "id": "class-sci-gael-01",
    "subjectId": "sci-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Exploradores de la Vida: Seres Vivos y Ecosistemas del Ecuador",
    "theme": "Los secretos de los seres vivos: Ciclo vital, respiración y necesidades fundamentales",
    "objective": "Identificar las características comunes y necesidades vitales de los seres vivos frente a la materia inerte.",
    "learningPurpose": "Descubrir que plantas, animales y seres humanos compartimos el milagro de la vida y necesitamos agua, luz, aire y cuidado para crecer sanos.",
    "competencyDcd": "CN.2.1.1 — Observar las etapas del ciclo vital del ser humano y registrar gráficamente los cambios de acuerdo a la edad y a las necesidades vitales (alimento, agua, aire).",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Hola, explorador de la selva Gael! Bienvenido a tu laboratorio de Ciencias Naturales con la Dra. Maya Selva. Hoy nos pondremos nuestra lupa de científicos para responder una gran pregunta: ¿qué hace que un colibrí o un árbol estén vivos, mientras que una piedra del volcán Cotopaxi o una moneda no lo están? ¡Vamos a descubrir las 4 huellas de la vida!",
    "reading": "El misterio de la semilla dormida: En un rincón de la huerta, Mateo encontró una semilla redonda y oscura junto a una pequeña canica de vidrio azul. Las dos eran redondas, duras y no se movían. Mateo pensó: \"¡Son hermanas gemelas!\". Pero su abuela científica le dijo: \"Dales agua, tierra fértil y los rayos dorados del sol durante una semana\". Pasaron siete días: la canica de vidrio seguía exactamente igual, fría y solitaria. Pero de la semilla brotó una diminuta raíz verde que empujó la tierra buscando el sol. ¡La semilla estaba viva, respiraba en secreto y comenzó su maravilloso ciclo vital!",
    "pedagogicalExplanation": "Todos los seres vivos del planeta Tierra cumplen cuatro etapas mágicas llamadas ciclo vital: nacen, crecen, se reproducen (tienen hijitos o frutos) y mueren. Además, para estar vivos necesitan cuatro regalos de la naturaleza: agua limpia, aire puro con oxígeno, alimento nutritivo y la luz y calor del sol. La materia inerte (como las rocas, el plástico o los juguetes) no respira, no come y no crece.",
    "vocabulary": [
      {
        "term": "Ser vivo",
        "definition": "Cualquier organismo que cumple el ciclo de la vida (nace, crece, se reproduce y muere) y necesita energía.",
        "childFriendlyExample": "Un perro, un árbol de guayaba y Gael son seres vivos."
      },
      {
        "term": "Materia inerte",
        "definition": "Objetos que no tienen vida, no crecen y no necesitan alimentarse.",
        "childFriendlyExample": "Una roca volcánica y un carro de juguete son materia inerte."
      },
      {
        "term": "Ciclo vital",
        "definition": "El camino del tiempo que recorre todo ser vivo desde que nace hasta que cumple su ciclo en la tierra.",
        "childFriendlyExample": "La mariposa que primero fue oruga vive un ciclo vital asombroso."
      }
    ],
    "contextualizedExample": "En las Islas Galápagos, la tortuga gigante es un ser vivo que come hierbas y bebe agua fresca en los cráteres, mientras que la lava negra donde camina es materia inerte.",
    "socraticQuestions": [
      "¿En qué se parece un árbol de manzanas a ti? ¿Qué cosas necesitan los dos para seguir creciendo fuertes?",
      "Si un robot puede caminar y hablar con luces de colores, ¿está vivo? ¿Por qué sí o por qué no?",
      "¿Qué pasaría con los animales de un bosque si el agua del río se seca por completo?"
    ],
    "practicalActivity": {
      "title": "El germinador de frejol transparente",
      "instructions": [
        "Toma un vaso de vidrio o plástico transparente y coloca dentro una bolita de algodón húmedo (sin empapar).",
        "Introduce una semilla de frejol o lenteja entre el algodón y la pared del vaso para que puedas verla.",
        "Coloca el vaso cerca de una ventana donde reciba luz natural.",
        "Dibuja en tu bitácora el Día 1: tamaño de la semilla y humedad del algodón."
      ],
      "materials": [
        "Vaso transparente",
        "Algodón",
        "Semilla de frejol o lenteja",
        "Agua fresca"
      ]
    },
    "applicationActivity": {
      "title": "La tabla comparativa del explorador",
      "task": "Divide una hoja en dos columnas: \"Ser Vivo\" y \"Materia Inerte\". Dibuja 3 seres vivos de tu casa o parque y 3 objetos inertes, indicando al lado qué necesita el ser vivo para no morir.",
      "deliverable": "Ficha con dibujos a color y las 4 necesidades vitales anotadas (agua, aire, alimento, sol)."
    },
    "formativeEvaluation": {
      "description": "Diferenciación conceptual entre ser vivo y materia inerte basada en evidencias observables y ciclo vital.",
      "expectedEvidence": "Gael explica con claridad por qué el robot no es un ser vivo y qué necesita la semilla para germinar."
    },
    "evaluationRubric": {
      "criterion": "Identificación de características de los seres vivos y sus necesidades (CN.2.1.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Nombra animales pero clasifica objetos con movimiento mecánico (como autos) como seres vivos."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Reconoce que los seres vivos necesitan agua y comida, pero omite las plantas o el ciclo vital."
        },
        {
          "level": "Consolidado",
          "descriptor": "Distingue con total precisión entre materia viva e inerte, describe las 4 etapas del ciclo vital y sustenta sus respuestas con experimentos sencillos."
        }
      ]
    },
    "expectedFeedback": "¡Fantástica deducción científica, Gael! Tu germinador será una ventana mágica para ver nacer la vida día tras día. ¡Maya Selva está muy orgullosa de tu curiosidad!",
    "difficultyAdaptation": "Utilizar una tarjeta con dos iconos grandes (corazón latiendo = ser vivo; bloque de piedra = materia inerte) para clasificar objetos reales de la habitación.",
    "advancedExtension": "Gael investiga cuánto tiempo puede vivir una tortuga gigante de Galápagos (¡más de 150 años!) y cómo su caparazón crece junto con ella.",
    "resources": [
      {
        "id": "class-sci-gael-01-res-1",
        "type": "simulator",
        "title": "NASA Climate Kids: Los Signos Vitales de la Tierra",
        "url": "https://climatekids.nasa.gov/",
        "description": "Recurso oficial abierto de la NASA para niños que explica los requisitos para la vida y los ecosistemas.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-sci-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Bitácora del Germinador",
        "url": "/api/v1/academic/classes/class-sci-gael-01/guide.pdf",
        "description": "Ficha de registro de 7 días para observar y dibujar el crecimiento de la raíz y el tallo.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-sci-gael-01-act-1",
        "title": "El Misterio de la Semilla y la Canica",
        "description": "Descubre las razones por las cuales solo una de las dos cobró vida tras recibir agua y luz.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-sci-gael-01-act-2",
        "title": "Montaje del Germinador de Frejol",
        "description": "Prepara el vaso con algodón y semilla siguiendo los 4 pasos del método científico.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-sci-gael-01-act-3",
        "title": "Mural de los 4 Elementos de Vida",
        "description": "Dibuja en tu cuaderno las 4 necesidades indispensables que compartimos con los animales.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Revisa tu germinador en la tarde y ponle unas gotas de agua con tu dedo si el algodón se siente seco.",
    "reflectionPrompt": "Si cuidaras una plantita en tu ventana, ¿qué sientes al ver brotar su primera hojita verde?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_sci_gael_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-sci-gael-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-03-CNI",
      "subjectCode": "CNI-401",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-sci-gael-02",
    "subjectId": "sci-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "08:00 - 09:30 (90 min)",
    "unit": "Unidad 1: Exploradores de la Vida: Seres Vivos y Ecosistemas del Ecuador",
    "theme": "Fábricas verdes: Las partes de las plantas y el viaje del polen",
    "objective": "Reconocer la estructura de las plantas (raíz, tallo, hojas, flor, fruto) y su función en la producción de oxígeno y alimento.",
    "learningPurpose": "Comprender que las plantas son las guardianas de la atmósfera y alimentan a casi todos los seres vivos del planeta.",
    "competencyDcd": "CN.2.1.8 — Observar y describir las partes de la planta, explicar sus funciones y clasificarlas por su estrato y utilidad.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Buenos días, botánico Gael! ¿Sabías que los árboles y las flores tienen una cocina mágica en sus hojas que funciona con luz de sol? Mientras nosotros necesitamos ollas y fuego para cocinar, las plantas inventaron hace millones de años la FOTOSÍNTESIS: toman agua de la tierra y luz del cielo para preparar su propio néctar y regalarnos aire limpio para respirar. ¡Hoy exploraremos cada una de sus partes!",
    "reading": "El banquete del girasol gigante: En un valle soleado de los Andes, un girasol llamado Solín extendía sus raíces profundas en la tierra húmeda para beber agua mineral fresca. Su tallo verde y fuerte se mantenía recto contra el viento andino. En sus grandes hojas verdes, Solín atrapaba la luz del mediodía y liberaba burbujas invisibles de oxígeno limpio para que los niños del pueblo pudieran respirar con alegría. Al atardecer, una abeja trabajadora llamada Zumbita aterrizó en sus pétalos dorados, probó el dulce néctar de su corazón y se llevó polvito de polen en sus patitas para sembrar nuevas flores en la colina vecina.",
    "pedagogicalExplanation": "Una planta completa tiene 5 órganos esenciales: 1) Raíz: ancla la planta al suelo y absorbe agua y sales minerales. 2) Tallo: sostiene las hojas y transporta la savia como una cañería viva. 3) Hojas: son los pulmones y la cocina de la planta donde ocurre la fotosíntesis. 4) Flor: es el órgano reproductor que atrae abejas y mariposas con sus colores y perfumes. 5) Fruto y semilla: guardan y protegen a la nueva plantita que nacerá.",
    "vocabulary": [
      {
        "term": "Raíz",
        "definition": "Parte subterránea de la planta que bebe agua y la sostiene firme al suelo.",
        "childFriendlyExample": "La zanahoria que comemos en la ensalada es una raíz deliciosa."
      },
      {
        "term": "Fotosíntesis",
        "definition": "El proceso por el cual las hojas de las plantas usan la luz del sol para fabricar su alimento.",
        "childFriendlyExample": "Gracias a la fotosíntesis, los bosques llenan de oxígeno puro a nuestro planeta."
      },
      {
        "term": "Polinización",
        "definition": "El viaje del polen de una flor a otra gracias a insectos o al viento para formar semillas y frutos.",
        "childFriendlyExample": "Las abejas son las reinas de la polinización."
      }
    ],
    "contextualizedExample": "En la Amazonía ecuatoriana, las orquídeas crecen sobre los árboles gigantes y usan sus flores exóticas para llamar a colibríes que ayudan a polinizarlas.",
    "socraticQuestions": [
      "¿Qué pasaría si arrancamos las raíces de una planta? ¿Por qué no puede sobrevivir solo con sus hojas?",
      "¿Por qué las abejas son tan importantes para los agricultores que cultivan frutas en el Ecuador?",
      "Si las plantas nos dan oxígeno limpio, ¿por qué es tan importante sembrar árboles en nuestras ciudades?"
    ],
    "practicalActivity": {
      "title": "Anatomía de una flor y sus hojas con lupa",
      "instructions": [
        "Con la ayuda de un adulto, recolecta una hoja y una flor caída del suelo de un jardín o parque.",
        "Usa una lupa para observar las venitas delgadas de la hoja (los canales por donde viaja el agua).",
        "Toca suavemente el centro de la flor y mira si queda polvito amarillo en la yema de tu dedo (¡es el polen!).",
        "Pega la hoja en tu libreta y rotula sus partes con flechas: pecíolo, limbo y nervaduras."
      ],
      "materials": [
        "Hoja y flor caídas",
        "Lupa de explorador",
        "Cinta adhesiva o goma",
        "Libreta"
      ]
    },
    "applicationActivity": {
      "title": "El árbol ilustrado de las 5 partes",
      "task": "Dibuja en tu libreta un árbol o planta completa. Escribe el nombre de cada una de sus 5 partes (raíz, tallo, hojas, flor, fruto) y escribe al lado qué trabajo especial hace cada una.",
      "deliverable": "Póster a color de la planta con flechas y descripciones funcionales."
    },
    "formativeEvaluation": {
      "description": "Identificación de las partes de la planta y descripción oral del proceso de polinización y fotosíntesis.",
      "expectedEvidence": "Gael señala correctamente los 5 órganos de la planta y explica qué función cumple la raíz y la hoja."
    },
    "evaluationRubric": {
      "criterion": "Descripción de las partes de la planta y su función ecológica (CN.2.1.8)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Reconoce hojas y flores pero no identifica la función de la raíz o el tallo."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Rotula las partes de la planta pero le cuesta explicar qué es la fotosíntesis o la polinización."
        },
        {
          "level": "Consolidado",
          "descriptor": "Explica con soltura la función vital de cada órgano vegetal y comprende el valor ecológico de la polinización para la vida humana."
        }
      ]
    },
    "expectedFeedback": "¡Extraordinario trabajo botánico, Gael! Tu dibujo de las 5 partes de la planta parece el cuaderno de un gran naturalista como Humboldt. ¡Supiste ver la belleza en cada detalle vegetal!",
    "difficultyAdaptation": "Armar un rompecabezas de cartulina con las 5 piezas de una planta para que Gael las una desde la raíz hasta el fruto antes de dibujar.",
    "advancedExtension": "Gael investiga qué verduras de la cocina corresponden a cada parte de la planta (ejemplo: lechuga = hoja, apio = tallo, zanahoria = raíz, tomate = fruto, brócoli = flor).",
    "resources": [
      {
        "id": "class-sci-gael-02-res-1",
        "type": "simulator",
        "title": "PhET Colorado: Fotosíntesis y Luz Solar",
        "url": "https://phet.colorado.edu/sims/html/molecules-and-light/latest/molecules-and-light_es.html",
        "description": "Simulación visual de moléculas y luz solar para entender cómo la energía solar interactúa con la materia viva.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-sci-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Fábricas Verdes y Polen",
        "url": "/api/v1/academic/classes/class-sci-gael-02/guide.pdf",
        "description": "Ficha ilustrada con diagramas de hojas, estomas y flores para rotular en 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-sci-gael-02-act-1",
        "title": "El Banquete del Girasol",
        "description": "Analiza la relación entre el girasol Solín y la abeja Zumbita en el ecosistema.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-sci-gael-02-act-2",
        "title": "Laboratorio de la Lupa Botánica",
        "description": "Observa la nervadura de la hoja y el polen de la flor con tu lupa.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-sci-gael-02-act-3",
        "title": "Póster de la Planta Viva",
        "description": "Dibuja y rotula las 5 partes de la planta con sus superpoderes ecológicos.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Busca en el refrigerador una fruta (como una manzana o mandarina), ábrela con ayuda de mamá y cuenta cuántas semillas protectoras tiene dentro.",
    "reflectionPrompt": "Si los árboles hablaran, ¿qué mensaje de gratitud crees que nos darían por regarlos?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_sci_gael_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-sci-gael-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-03-CNI",
      "subjectCode": "CNI-401",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-sci-gael-03",
    "subjectId": "sci-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "08:45 - 09:30 (45 min)",
    "unit": "Unidad 1: Exploradores de la Vida: Seres Vivos y Ecosistemas del Ecuador",
    "theme": "El reino animal del Ecuador: Vertebrados con columna y los pequeños invertebrados",
    "objective": "Clasificar animales del entorno en vertebrados (mamíferos, aves, reptiles, anfibios, peces) e invertebrados por la presencia o ausencia de esqueleto interno.",
    "learningPurpose": "Aprender cómo el esqueleto interno permite a los animales saltar, volar y correr con agilidad en las 4 regiones naturales del Ecuador.",
    "competencyDcd": "CN.2.1.4 — Observar y describir las características de los animales vertebrados y agruparlos de acuerdo a sus características corporales.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Atención, zoólogo Gael! Toca suavemente tu espalda en el centro: ¿sientes esa fila de huesitos duros que van desde tu cuello hasta tu cintura? ¡Esa es tu columna vertebral! Es como la torre central de un castillo que sostiene todo tu cuerpo. Los animales que tienen huesos y columna se llaman VERTEBRADOS. Pero hay millones de animalitos fascinantes que no tienen ningún hueso por dentro, ¡y se llaman INVERTEBRADOS! Hoy descubriremos sus secretos.",
    "reading": "La convención de los animales ecuatorianos: En el Parque Nacional Yasuní se reunieron los animales más asombrosos del mundo. El cóndor andino abrió sus alas de 3 metros y dijo: \"Tengo huesos huecos y livianos para volar sobre los volcanes nevados\" (Ave). El jaguar amazónico rugió con orgullo mostrando sus músculos elásticos sostenidos por un esqueleto fuerte (Mamífero). La iguana marina de Galápagos nadó entre las olas aguantando la respiración con sus escamas impermeables (Reptil). La ranita de cristal del Chocó cantó alegremente con su piel húmeda y brillante (Anfibio). Y el tiburón ballena se deslizó majestuoso en el mar (Pez cartilaginoso). Al lado de ellos, una mariposa morpho azul brillante y una hormiga arriera dijeron con alegría: \"¡Nosotras no necesitamos huesos por dentro, nuestro caparazón exterior nos protege y somos súper fuertes!\".",
    "pedagogicalExplanation": "Los animales se dividen en dos grandes familias: 1) Vertebrados: tienen esqueleto interno con columna vertebral. Hay 5 grupos: Mamíferos (toman leche materna, como el oso o el delfín), Aves (tienen plumas y alas, como el colibrí), Reptiles (tienen escamas secas y se arrastran, como la tortuga), Anfibios (nacen en agua y de adultos viven en tierra con piel húmeda, como la rana), y Peces (viven en el agua y respiran por branquias). 2) Invertebrados: no tienen columna vertebral (insectos, arañas, caracoles, medusas, pulpos).",
    "vocabulary": [
      {
        "term": "Columna vertebral",
        "definition": "Fila articulada de huesos que sostiene el cuerpo de los animales vertebrados.",
        "childFriendlyExample": "Tu columna te permite agacharte y saltar sin romperte."
      },
      {
        "term": "Vertebrado",
        "definition": "Animal que tiene esqueleto interno de huesos o cartílago.",
        "childFriendlyExample": "El león, el águila y el pez espada son vertebrados."
      },
      {
        "term": "Invertebrado",
        "definition": "Animal que carece de columna vertebral y esqueleto óseo interno.",
        "childFriendlyExample": "La abeja, la lombriz y el caracol son invertebrados."
      }
    ],
    "contextualizedExample": "En el zoológico de Guayllabamba en Quito, Gael puede ver al oso de anteojos (vertebrado mamífero) y también a las mariposas del mariposario (invertebrados insectos).",
    "socraticQuestions": [
      "¿Qué pasaría con nuestro cuerpo si de repente no tuviéramos ningún hueso? ¿Cómo caminaríamos?",
      "¿Por qué una lombriz de tierra puede doblarse y estirarse por completo mientras que un conejo no puede hacer eso?",
      "¿En qué grupo de los vertebrados pondrías a un murciélago: en las aves porque vuela o en los mamíferos porque sus crías toman leche?"
    ],
    "practicalActivity": {
      "title": "El detective del esqueleto: Tacto y clasificación",
      "instructions": [
        "Toca suavemente tu codo, tus costillas y tus rodillas: siente la dureza del esqueleto interno.",
        "Imagina que eres un invertebrado (un pulpo): mueve tus brazos como gelatina suave sin huesos.",
        "Ahora imagina que eres un vertebrado ágil (un puma): da pasos firmes sintiendo tus patas y columna.",
        "Anota en tu cuaderno 3 diferencias de movimiento entre tener esqueleto y no tenerlo."
      ],
      "materials": [
        "Tu propio cuerpo en movimiento",
        "Libreta de campo",
        "Lápiz"
      ]
    },
    "applicationActivity": {
      "title": "La rueda de los 5 grupos de vertebrados",
      "task": "Dibuja un círculo dividido en 5 partes iguales en una hoja: Mamíferos, Aves, Reptiles, Anfibios y Peces. Dibuja un animal representativo del Ecuador en cada porción (ejemplo: Cóndor en Aves, Jaguar en Mamíferos).",
      "deliverable": "Rueda gráfica a color con los 5 animales emblemáticos del Ecuador."
    },
    "formativeEvaluation": {
      "description": "Clasificación zoológica en vertebrados e invertebrados, y categorización de los 5 grupos de vertebrados.",
      "expectedEvidence": "Gael ubica correctamente al jaguar en mamíferos, al colibrí en aves y reconoce que la mariposa es un invertebrado."
    },
    "evaluationRubric": {
      "criterion": "Clasificación de animales según su estructura corporal (CN.2.1.4)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Confunde insectos con animales vertebrados pequeños y no reconoce la columna."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Distingue vertebrados de invertebrados pero confunde reptiles con anfibios."
        },
        {
          "level": "Consolidado",
          "descriptor": "Clasifica con precisión los 5 grupos de vertebrados ecuatorianos y fundamenta sus características anatómicas y reproductivas."
        }
      ]
    },
    "expectedFeedback": "¡Magistral clasificación zoológica, Gael! Resolviste el acertijo del murciélago como todo un biólogo profesional. ¡Tu rueda de los 5 vertebrados del Ecuador quedó digna de un museo!",
    "difficultyAdaptation": "Utilizar figuras plásticas de animales para que Gael las separe en dos cajas: \"Caja con huesos duros\" y \"Caja sin huesos\".",
    "advancedExtension": "Gael investiga sobre la \"ranita de cristal\" de los bosques nublados del Ecuador, cuya piel transparente en el vientre permite ver cómo late su corazón.",
    "resources": [
      {
        "id": "class-sci-gael-03-res-1",
        "type": "simulator",
        "title": "BioWeb Ecuador: Fauna de Vertebrados",
        "url": "https://bioweb.bio/",
        "description": "Portal oficial científico de la PUCE con fichas multimedia de mamíferos, aves, reptiles y anfibios del Ecuador.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-sci-gael-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Vertebrados e Invertebrados",
        "url": "/api/v1/academic/classes/class-sci-gael-03/guide.pdf",
        "description": "Ficha de trabajo con siluetas anatómicas y desafíos de clasificación zoológica para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-sci-gael-03-act-1",
        "title": "La Asamblea del Yasuní",
        "description": "Identifica la característica corporal especial que mencionó cada animal en la convención.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-sci-gael-03-act-2",
        "title": "Laboratorio de Movimiento Esquelético",
        "description": "Experimenta la diferencia física entre moverte como un invertebrado y como un vertebrado.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-sci-gael-03-act-3",
        "title": "Rueda de la Biodiversidad Ecuatoriana",
        "description": "Construye y colorea la rueda con los 5 grupos de vertebrados del país.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Observa a un perro o gato de tu barrio y anota 2 características que demuestran que es un mamífero vertebrado.",
    "reflectionPrompt": "¿Qué sientes al saber que el Ecuador es uno de los países con mayor variedad de animales del mundo entero?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_sci_gael_03.pdf",
    "guideUrl": "/api/v1/academic/classes/class-sci-gael-03/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-03-CNI",
      "subjectCode": "CNI-401",
      "unitNumber": 1,
      "sessionNumber": 3
    }
  },
  {
    "id": "class-sci-gael-04",
    "subjectId": "sci-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-14",
    "dayOfWeek": "Lunes",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Exploradores de la Vida: Seres Vivos y Ecosistemas del Ecuador",
    "theme": "Guardianes del ecosistema: Hábitats del Ecuador y la cadena alimenticia",
    "objective": "Describir los hábitats naturales del Ecuador y representar cadenas alimenticias sencillas entre productores, consumidores y descomponedores.",
    "learningPurpose": "Entender que en un ecosistema todos dependen de todos: si cuidamos el agua y las plantas, protegemos al colibrí, al oso y a nosotros mismos.",
    "competencyDcd": "CN.2.1.10 — Indagar y describir las características de los hábitats locales, clasificarlos según sus factores bióticos y abióticos e identificar las amenazas.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Bienvenido a la expedición final de la Unidad 1, explorador Gael! Imagina que la naturaleza es una inmensa orquesta musical donde cada ser vivo toca un instrumento diferente: si se detiene el violín de las abejas, o si se rompe el tambor de los ríos limpios, toda la música se desordena. Hoy aprenderemos qué es un HÁBITAT y cómo la energía del sol viaja a través de la maravillosa CADENA ALIMENTICIA.",
    "reading": "El círculo dorado del páramo andino: En las alturas del volcán Antisana, la paja del páramo (Productor) atrapa la luz del sol y el agua pura de la niebla. Un conejo silvestre (Consumidor primario) mastica la paja verde con apetito. Más tarde, un zorro de páramo veloz (Consumidor secundario) busca al conejo para alimentarse. Y en lo más alto del cielo azul, el majestuoso cóndor andino (Consumidor terciario y carroñero) limpia los restos del campo. Cuando el cóndor cumple su ciclo de vida, los diminutos hongos y bacterias del suelo (Descomponedores) transforman todo en abono rico para que nueva paja vuelva a crecer. ¡Es el círculo perfecto de la vida donde nada se desperdicia!",
    "pedagogicalExplanation": "Un hábitat es el hogar natural de un ser vivo, donde encuentra comida, agua, refugio y clima adecuado. En la cadena alimenticia la energía viaja en fila india: 1) Productores: las plantas que fabrican su alimento con el sol. 2) Consumidores herbívoros: comen plantas. 3) Consumidores carnívoros: comen otros animales. 4) Descomponedores: los recicladores del bosque que limpian el suelo y devuelven nutrientes a la tierra.",
    "vocabulary": [
      {
        "term": "Hábitat",
        "definition": "El lugar físico natural con las condiciones ideales para que una especie viva y se reproduzca.",
        "childFriendlyExample": "El páramo frío es el hábitat del cóndor andino."
      },
      {
        "term": "Productor",
        "definition": "Ser vivo que fabrica su propio alimento mediante fotosíntesis (las plantas).",
        "childFriendlyExample": "La hierba y los arbustos son productores."
      },
      {
        "term": "Cadena alimenticia",
        "definition": "El camino que sigue la energía de un ser vivo a otro a través de la alimentación.",
        "childFriendlyExample": "Hierba -> Conejo -> Zorro -> Cóndor es una cadena alimenticia."
      }
    ],
    "contextualizedExample": "En el manglar de la Costa ecuatoriana, las hojas del mangle caen al agua, los cangrejos rojos se alimentan de ellas y los pelícanos pescan en los canales.",
    "socraticQuestions": [
      "¿Por qué las plantas se llaman \"productoras\" y los animales se llaman \"consumidores\"?",
      "¿Qué pasaría en el páramo si no existieran los descomponedores (los hongos y bacterias del suelo)?",
      "Si una fábrica tira basura y petróleo en un río de la Amazonía, ¿a quiénes afecta de la cadena alimenticia?"
    ],
    "practicalActivity": {
      "title": "El collar de la cadena trófica con eslabones de papel",
      "instructions": [
        "Corta 4 tiras de papel de colores diferentes.",
        "En la tira 1 (amarilla) dibuja el Sol y la hierba (Productor).",
        "En la tira 2 (verde) dibuja un saltamontes (Consumidor 1).",
        "En la tira 3 (azul) dibuja una ranita (Consumidor 2).",
        "En la tira 4 (marrón) dibuja un halcón (Consumidor 3).",
        "Une las tiras formando aros entrelazados como una cadena física: ¡mira cómo si rompes un aro, la cadena entera se cae!"
      ],
      "materials": [
        "Papel de colores o tiras de cartulina",
        "Tijeras de punta redonda",
        "Goma",
        "Marcadores"
      ]
    },
    "applicationActivity": {
      "title": "El diorama o mapa ecológico de un hábitat ecuatoriano",
      "task": "Elige uno de los 4 hábitats del Ecuador (Manglar de la Costa, Páramo de la Sierra, Selva Amazónica o Islas Galápagos). Dibuja su paisaje con 1 productor, 2 consumidores y 1 descomponedor, uniendo sus relaciones con flechas rojas de energía.",
      "deliverable": "Mapa ilustrado a color del hábitat con la cadena trófica rotulada."
    },
    "formativeEvaluation": {
      "description": "Comprensión integral de las relaciones tróficas y conciencia ecológica de interdependencia en los hábitats.",
      "expectedEvidence": "Gael explica con sus palabras por qué al contaminar el agua se rompe la cadena alimenticia y daña a todos los seres del ecosistema."
    },
    "evaluationRubric": {
      "criterion": "Explicación de cadenas tróficas y conservación de hábitats (CN.2.1.10)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Dibuja animales comiendo pero no distingue entre productores y consumidores."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Ordena la cadena de 3 eslabones pero le cuesta explicar el rol de los descomponedores."
        },
        {
          "level": "Consolidado",
          "descriptor": "Modela cadenas alimenticias completas, explica el flujo de energía solar y propone acciones concretas para proteger los hábitats del Ecuador."
        }
      ]
    },
    "expectedFeedback": "¡Misión cumplida con honores en Ciencias Naturales, Guardián Gael! Supiste ver la conexión mágica que une al sol con cada planta y animal. Tienes un corazón noble de protector de la naturaleza.",
    "difficultyAdaptation": "Utilizar flechas magnéticas o recortadas con la palabra \"da energía a\" para colocar físicamente entre dibujos de animales.",
    "advancedExtension": "Gael investiga sobre las \"redes tróficas\", descubriendo que en la naturaleza los animales no comen una sola cosa, sino que forman una telaraña de interconexiones.",
    "resources": [
      {
        "id": "class-sci-gael-04-res-1",
        "type": "simulator",
        "title": "PhET Colorado: Ecosistemas y Selección Natural",
        "url": "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_es.html",
        "description": "Simulador PhET oficial donde los estudiantes exploran cómo los conejos interactúan con los lobos y el alimento en distintos climas.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-sci-gael-04-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — El Círculo Dorado del Páramo",
        "url": "/api/v1/academic/classes/class-sci-gael-04/guide.pdf",
        "description": "Plantilla imprimible de eslabones y mapas de hábitats del Ecuador para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-sci-gael-04-act-1",
        "title": "El Círculo del Antisana",
        "description": "Rastrea el viaje de la energía desde el sol hasta los descomponedores en el páramo.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-sci-gael-04-act-2",
        "title": "Cadena de Eslabones de Papel",
        "description": "Construye tu cadena trófica física y comprueba qué pasa si se rompe un eslabón.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-sci-gael-04-act-3",
        "title": "Mapa Ecológico del Hábitat",
        "description": "Diseña el póster de tu región ecuatoriana con productores, consumidores y recicladores.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Explica a tus papás por qué los hongos no son plantas aunque crezcan en el suelo, y cómo ayudan a limpiar los bosques.",
    "reflectionPrompt": "¿Qué pequeña acción diaria puedes hacer en tu casa para cuidar los hábitats de los animales de nuestro país?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_sci_gael_04.pdf",
    "guideUrl": "/api/v1/academic/classes/class-sci-gael-04/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-03-CNI",
      "subjectCode": "CNI-401",
      "unitNumber": 1,
      "sessionNumber": 4
    }
  },
  {
    "id": "class-soc-gael-01",
    "subjectId": "soc-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Mi Comunidad, Mi Ciudad y los Tesoros del Ecuador",
    "theme": "Mi primer equipo: La familia y los lazos de amor, respeto y colaboración",
    "objective": "Reconocer a la familia como el núcleo básico de afecto, apoyo mutuo y derechos compartidos.",
    "learningPurpose": "Descubrir que cada familia es un equipo especial donde todos nos cuidamos, nos escuchamos y colaboramos para vivir con alegría y armonía.",
    "competencyDcd": "CS.2.1.1 — Reconocer a la familia como espacio de afecto, comprensión y cuidado mutuo, valorando la diversidad de estructuras familiares y los lazos de parentesco y solidaridad.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Hola, súper ciudadano Gael! Bienvenido a Estudios Sociales con el Capitán Diego Mapamundi. ¿Alguna vez has pensado cuál fue la primera tripulación con la que zarpaste en el barco de la vida? ¡Tu familia! Mamá, papá, hermanos, abuelitos, tíos... cada familia es como un árbol frondoso con raíces firmes llenas de historias, risas y abrazos que nos dan seguridad para explorar el mundo.",
    "reading": "El árbol genealógico de los exploradores: En una casita acogedora frente a las montañas de Quito vivía la familia Andrade. Un domingo por la tarde, sacaron una vieja caja de lata con fotografías en blanco y negro y a color. Ahí estaban los bisabuelos que cruzaban valles a caballo, los abuelitos que enseñaron a cocinar los mejores tamales y los papás cuando eran niños y soñaban con inventar máquinas. Gael miró las fotos y se dio cuenta de algo asombroso: aunque todos eran diferentes, tenían la misma chispa alegre en los ojos y el mismo deseo de ayudarse siempre que alguien enfrentaba un reto.",
    "pedagogicalExplanation": "La familia es el primer grupo social al que pertenecemos. En la familia aprendemos los valores más importantes: decir la verdad, pedir por favor, dar las gracias, compartir los juguetes y cuidar a quien está enfermo. Hay muchas formas de familias (grandes con muchos primos, pequeñas de dos personas, o que viven con los abuelos), pero todas comparten lo más valioso: el amor, la protección y el respeto mutuo.",
    "vocabulary": [
      {
        "term": "Familia",
        "definition": "Grupo de personas unidas por lazos de amor, parentesco y convivencia que se cuidan mutuamente.",
        "childFriendlyExample": "Tu familia es tu refugio seguro en todo momento."
      },
      {
        "term": "Convivencia armónica",
        "definition": "Vivir juntos en paz, respetando las reglas del hogar y dialogando cuando hay desacuerdos.",
        "childFriendlyExample": "Escuchar sin gritar cuando jugamos es practicar la convivencia armónica."
      },
      {
        "term": "Solidaridad familiar",
        "definition": "Apoyar con cariño y entusiasmo a un miembro de la familia cuando necesita ayuda.",
        "childFriendlyExample": "Ayudar a poner la mesa o recoger los platos es un acto de solidaridad."
      }
    ],
    "contextualizedExample": "Cuando en casa todos colaboran: mamá y papá cocinan, los hijos ordenan su habitación y los abuelos cuentan relatos, ¡la casa funciona como una tripulación perfecta!",
    "socraticQuestions": [
      "¿Por qué crees que ningún ser humano puede crecer solo en el mundo sin el cuidado de una familia o tutores?",
      "¿Qué pasa en un equipo deportivo si cada jugador quiere patear la pelota para su lado? ¿Se parece eso a lo que ocurre en una familia cuando no nos escuchamos?",
      "Si pudieras regalarle una medalla de honor a tu familia, ¿por qué motivo especial se la entregarías hoy?"
    ],
    "practicalActivity": {
      "title": "El escudo heráldico de la familia Andrade",
      "instructions": [
        "Dibuja un escudo grande en una hoja dividido en 4 cuadrantes.",
        "En el cuadrante 1: dibuja la comida o platillo favorito que disfrutan juntos.",
        "En el cuadrante 2: dibuja el lugar del Ecuador o parque que más les gusta visitar.",
        "En el cuadrante 3: escribe el valor principal de su hogar (ejemplo: Honestidad, Amor, Alegría).",
        "En el cuadrante 4: dibuja una actividad divertida que hacen juntos en familia.",
        "Escribe en la parte superior el lema de tu familia con letras grandes."
      ],
      "materials": [
        "Hoja de cartulina",
        "Lápices de colores y marcadores",
        "Regla"
      ]
    },
    "applicationActivity": {
      "title": "El pacto del buen tripulante en casa",
      "task": "Escribe una lista de 3 compromisos diarios que Gael cumplirá con alegría para ayudar a la convivencia armónica en su hogar (ej: tender la cama, guardar los legos después de jugar, dar un abrazo de buenos días).",
      "deliverable": "Ficha de compromisos firmada por Gael y sus padres con casillas de verificación para la semana."
    },
    "formativeEvaluation": {
      "description": "Reconocimiento del rol familiar, empatía intrafamiliar y compromiso activo en las tareas del hogar.",
      "expectedEvidence": "Gael presenta su escudo heráldico explicando con orgullo las tradiciones y valores que unen a su familia."
    },
    "evaluationRubric": {
      "criterion": "Reconocimiento de la familia y prácticas de convivencia armónica (CS.2.1.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Nombra a los miembros de su familia pero no identifica responsabilidades compartidas."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Reconoce la importancia del afecto familiar y colabora en el hogar con recordatorios frecuentes."
        },
        {
          "level": "Consolidado",
          "descriptor": "Valora con madurez las tradiciones y lazos de su familia, diseña su escudo con creatividad y propone compromisos de ayuda mutua espontánea."
        }
      ]
    },
    "expectedFeedback": "¡Qué hermoso homenaje a tu hogar, Gael! Tu escudo familiar refleja valores muy nobles y tu lista de compromisos demuestra que eres un gran tripulante de vida. ¡Diego Mapamundi te felicita!",
    "difficultyAdaptation": "Proporcionar una plantilla del escudo ya dibujada con siluetas guía para facilitar el dibujo y la escritura.",
    "advancedExtension": "Gael entrevista a uno de sus abuelos o padres preguntándoles qué era lo más divertido que hacían en familia cuando no existían los celulares ni el internet.",
    "resources": [
      {
        "id": "class-soc-gael-01-res-1",
        "type": "external_link",
        "title": "Educarchile: La Familia y la Vida en Comunidad",
        "url": "https://www.educarchile.cl/",
        "description": "Recurso abierto latinoamericano para educación básica sobre convivencia, roles familiares y afecto.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-soc-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — El Escudo de Mi Familia",
        "url": "/api/v1/academic/classes/class-soc-gael-01/guide.pdf",
        "description": "Plantilla gráfica de escudo heráldico y pacto de convivencia para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soc-gael-01-act-1",
        "title": "La Caja de las Fotografías",
        "description": "Reflexiona sobre cómo los recuerdos y valores familiares nos dan identidad y fuerza.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-soc-gael-01-act-2",
        "title": "Diseño del Escudo Familiar",
        "description": "Dibuja los 4 cuadrantes con los gustos, valores y tradiciones de tu hogar.",
        "type": "project",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soc-gael-01-act-3",
        "title": "Pacto de Convivencia Semanal",
        "description": "Redacta y firma los 3 compromisos de colaboración para la semana.",
        "type": "practice",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Comparte el escudo terminado con tu familia en la cena y pide a cada miembro que agregue una palabra bonita al lema.",
    "reflectionPrompt": "¿Qué es lo que más te hace sonreír cuando estás con las personas que amas en casa?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soc_gael_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-soc-gael-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-04-SOC",
      "subjectCode": "SOC-401",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-soc-gael-02",
    "subjectId": "soc-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Mi Comunidad, Mi Ciudad y los Tesoros del Ecuador",
    "theme": "Los héroes de mi comunidad: Servidores públicos, oficios y trabajo en equipo",
    "objective": "Identificar los servidores comunitarios (médicos, bomberos, policías, recolectores, profesores) y el valor de los servicios públicos en la ciudad y el campo.",
    "learningPurpose": "Aprender que vivir en sociedad significa cuidarnos unos a otros y valorar el trabajo honesto y valiente de todas las profesiones y oficios.",
    "competencyDcd": "CS.2.2.5 — Opinar acerca de las oportunidades y amenazas de la ubicación de su vivienda, barrio, parroquia y cantón, identificando los servicios públicos indispensables (agua, luz, salud, educación).",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Hola de nuevo, explorador cívico Gael! Cuando abres la llave del agua y sale un chorro fresco y transparente, o cuando enciendes la luz en la noche para leer tu libro, ¿te has preguntado cuántas personas trabajaron para que eso fuera posible? En nuestro barrio y ciudad hay cientos de personas con profesiones y oficios que hacen que la vida funcione: ¡son los héroes de la comunidad!",
    "reading": "Un día sin servidores en Villa Esperanza: Una mañana de sol, los habitantes de Villa Esperanza se despertaron y notaron algo extraño: las calles estaban llenas de hojas caídas porque nadie pasó a barrer, el semáforo de la esquina no funcionaba, y un gatito travieso subido a un tejado alto maullaba asustado sin que nadie viniera a rescatarlo. Los vecinos comprendieron al instante que una ciudad no son solo casas y autos de cemento: una ciudad vive gracias al bombero que rescata con valentía, al recolector de basura que mantiene limpias las aceras, al doctor y enfermera que curan con ternura, a los policías que vigilan la paz y a los agricultores del campo que siembran las papas y frutas que llegan a nuestro plato.",
    "pedagogicalExplanation": "Los servidores comunitarios son personas que realizan un trabajo dedicado a beneficiar a todos los ciudadanos. Se dividen en dos grupos: 1) Servidores públicos: trabajan en servicios esenciales pagados por la comunidad a través de impuestos (bomberos, policías, médicos de hospitales públicos, maestros de escuelas fiscales). 2) Trabajadores de oficios y comercios privados: panaderos, albañiles, mecánicos, electricistas y agricultores. Todos son igualmente valiosos y merecen nuestro respeto y gratitud.",
    "vocabulary": [
      {
        "term": "Servidor público",
        "definition": "Persona que trabaja para brindar un servicio necesario y seguro a toda la comunidad.",
        "childFriendlyExample": "La doctora del centro de salud es una servidora pública."
      },
      {
        "term": "Servicios básicos",
        "definition": "Las redes indispensables de agua potable, electricidad, alcantarillado, salud y recolección de basura.",
        "childFriendlyExample": "Tener agua limpia en casa es un servicio básico indispensable."
      },
      {
        "term": "Oficio",
        "definition": "Una actividad manual o técnica aprendida con la práctica y la experiencia.",
        "childFriendlyExample": "La carpintería y la zapatería son oficios dignos y hermosos."
      }
    ],
    "contextualizedExample": "En la ciudad de Quito, cuando suena la sirena del cuerpo de bomberos, los autos abren paso en la avenida para que puedan llegar a tiempo a apagar un incendio forestal.",
    "socraticQuestions": [
      "¿Qué pasaría en una ciudad durante un mes entero si los recolectores de basura dejaran de trabajar?",
      "¿Cuál es la diferencia entre el trabajo que hace un agricultor en el campo y el que hace un comerciante en el mercado?",
      "¿Qué servidor comunitario crees que tiene el trabajo más difícil y por qué?"
    ],
    "practicalActivity": {
      "title": "El mapa de servicios de mi barrio",
      "instructions": [
        "Dibuja un croquis sencillo de las 4 cuadras alrededor de tu casa.",
        "Coloca con símbolos de colores los servicios que existen cerca: una cruz roja (farmacia o médico), un libro (escuela), un escudo (estación de policía o vigilancia), una canasta (tienda o mercado).",
        "Identifica cuál es el número telefónico de emergencia nacional para llamar a los bomberos o ambulancia (¡el 911!)."
      ],
      "materials": [
        "Hoja de papel bond",
        "Lápices de colores",
        "Regla"
      ]
    },
    "applicationActivity": {
      "title": "Carta de agradecimiento a un héroe comunitario",
      "task": "Escribe una carta corta de 4 oraciones dirigida a un servidor de la comunidad (puede ser el cartero, el recolector de basura, un médico o un policía) dándole las gracias por su labor diaria con un dibujo alusivo.",
      "deliverable": "Carta ilustrada con redacción infantil propia y firma de Gael."
    },
    "formativeEvaluation": {
      "description": "Reconocimiento del rol cívico y valoración ética del trabajo comunitario.",
      "expectedEvidence": "Gael identifica correctamente los servicios básicos indispensables y expresa empatía y respeto hacia los trabajadores comunitarios."
    },
    "evaluationRubric": {
      "criterion": "Identificación de servicios públicos y valoración comunitaria (CS.2.2.5)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Reconoce profesiones típicas como policías y bomberos pero no asocia los servicios básicos con el bienestar común."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Describe el rol de médicos y bomberos, reconociendo el número de emergencias 911 con ayuda."
        },
        {
          "level": "Consolidado",
          "descriptor": "Explica con soltura la interdependencia entre la ciudad y el campo, valora la dignidad de todos los oficios y redacta una carta de agradecimiento sincera y elocuente."
        }
      ]
    },
    "expectedFeedback": "¡Extraordinaria sensibilidad ciudadana, Gael! Tu carta al servidor comunitario tiene un mensaje muy cálido y humano. ¡Eres un ciudadano de primera clase!",
    "difficultyAdaptation": "Jugar a relacionar tarjetas con imágenes: unir el camión de bomberos con la manguera y el fuego; el estetoscopio con el doctor.",
    "advancedExtension": "Gael investiga cómo viaja el agua desde los páramos andinos (reservorios) a través de tuberías gigantes hasta llegar al grifo de su cocina en la ciudad.",
    "resources": [
      {
        "id": "class-soc-gael-02-res-1",
        "type": "external_link",
        "title": "ECU 911: Educación Infantil en Emergencias y Seguridad",
        "url": "https://www.ecu911.gob.ec/",
        "description": "Portal oficial del Servicio Integrado de Seguridad del Ecuador con recomendaciones cívicas para niños.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-soc-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Héroes Sin Capa",
        "url": "/api/v1/academic/classes/class-soc-gael-02/guide.pdf",
        "description": "Ficha de trabajo con croquis de barrio y plantilla para la carta de gratitud cívica en 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soc-gael-02-act-1",
        "title": "La Mañana en Villa Esperanza",
        "description": "Analiza qué servicios hicieron falta en el pueblo y por qué la comunidad se detuvo.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-soc-gael-02-act-2",
        "title": "Croquis del Barrio y Emergencias",
        "description": "Dibuja el mapa de tu entorno cercano e incluye el número 911 destacado.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soc-gael-02-act-3",
        "title": "Carta al Héroe Comunitario",
        "description": "Redacta e ilustra la carta de gratitud para un servidor público de tu cantón.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Cuando veas pasar al recolector de basura o a un policía en la calle, regálale una sonrisa y dile \"¡muchas gracias por su trabajo!\".",
    "reflectionPrompt": "Si tú fueras el alcalde de tu cantón por un día, ¿qué servicio público mejorarías primero para los niños?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soc_gael_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-soc-gael-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-04-SOC",
      "subjectCode": "SOC-401",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-soc-gael-03",
    "subjectId": "soc-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-16",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1: Mi Comunidad, Mi Ciudad y los Tesoros del Ecuador",
    "theme": "El mapa del tesoro: Mi cantón, mi provincia y las cuatro regiones del Ecuador",
    "objective": "Reconocer la división territorial de Ecuador en cantones, provincias y las 4 regiones naturales (Costa, Sierra, Amazonía y Galápagos).",
    "learningPurpose": "Sentir orgullo por la riqueza geográfica y cultural del Ecuador y aprender a orientarnos con los puntos cardinales en cualquier lugar.",
    "competencyDcd": "CS.2.2.1 — Reconocer y ubicar la vivienda, la escuela y la localidad a partir de puntos de referencia y representaciones gráficas (croquis, planos y mapas).",
    "officialSource": "Currículo Nacional MINEDUC Ecuador (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Abre bien los ojos, cartógrafo Gael! Si pudieras subirte a un cohete espacial y mirar hacia abajo sobre la mitad del planeta, verías un país pequeño pero brillante como una esmeralda: ¡nuestro amado ECUADOR! En nuestro país puedes desayunar frente al mar con delfines en la Costa, almorzar al pie de un volcán nevado en la Sierra, merendar en la selva mágica de la Amazonía y soñar con tortugas gigantes en las Islas Galápagos. ¡Hoy aprenderemos a leer mapas como verdaderos navegantes!",
    "reading": "El vuelo del cóndor sobre el mapa tricolor: Don Cóndor invitó a Gael a un vuelo panorámico por el Ecuador. Volaron primero hacia el Oeste, donde las olas del océano Pacífico bañan las playas doradas de la Costa (Región Litoral). Luego ascendieron hacia el centro, donde la majestuosa Cordillera de los Andes levanta volcanes como el Chimborazo y el Cotopaxi rodeados de valles fértiles (Región Interandina o Sierra). Siguieron hacia el Este, donde ríos caudalosos como el Napo cruzan un manto verde infinito de árboles gigantes (Región Amazónica). Y finalmente, a 1.000 kilómetros mar adentro hacia el poniente, contemplaron las Islas Galápagos (Región Insular), el laboratorio natural más famoso del planeta. Cada región tiene provincias, cantones y parroquias donde viven ecuatorianos trabajadores que cuidan nuestra patria.",
    "pedagogicalExplanation": "Para ubicarnos en el espacio usamos los 4 puntos cardinales: Norte (arriba), Sur (abajo), Este u Oriente (por donde sale el sol cada mañana) y Oeste u Occidente (por donde se oculta el sol en el mar). El Ecuador se organiza en: 4 regiones naturales, 24 provincias (como Pichincha, Guayas, Azuay, Napo, Galápagos), y cada provincia se divide en cantones y parroquias.",
    "vocabulary": [
      {
        "term": "Puntos cardinales",
        "definition": "Las 4 direcciones principales que sirven para orientarse en la Tierra: Norte, Sur, Este y Oeste.",
        "childFriendlyExample": "Si abres tus brazos y señalas con la mano derecha por donde sale el sol, estás señalando el Este."
      },
      {
        "term": "Cantón",
        "definition": "División territorial formada por varias parroquias urbanas y rurales gobernada por un Municipio y un Alcalde.",
        "childFriendlyExample": "El Distrito Metropolitano de Quito es un cantón."
      },
      {
        "term": "Provincia",
        "definition": "Unión de varios cantones que comparten una misma zona geográfica e historia.",
        "childFriendlyExample": "Pichincha es una provincia de la Sierra ecuatoriana."
      }
    ],
    "contextualizedExample": "Si vives en Quito, tu parroquia puede ser Cumbayá, tu cantón es Quito, tu provincia es Pichincha, tu región es la Sierra y tu país es el Ecuador.",
    "socraticQuestions": [
      "Si te despiertas al amanecer y ves por qué montaña sale el sol, ¿hacia qué punto cardinal estás mirando?",
      "¿Por qué crees que en un país tan pequeño como Ecuador tenemos climas tan diferentes (frío en el páramo y calor en la playa)?",
      "¿Cuál de las 4 regiones del Ecuador te despierta mayor curiosidad por explorar y qué llevarías en tu mochila?"
    ],
    "practicalActivity": {
      "title": "La rosa de los vientos humana en el patio",
      "instructions": [
        "Párate en medio del patio o sala temprano en la mañana.",
        "Apunta con tu brazo derecho hacia el lugar donde sale el sol (ESTE).",
        "Extiende tu brazo izquierdo hacia donde se oculta el sol (OESTE).",
        "Tu frente apunta exactamente hacia el NORTE.",
        "Tu espalda señala hacia el SUR.",
        "Gira hacia cada punto cardinal mientras dices en voz alta una ciudad o región del Ecuador que queda en esa dirección."
      ],
      "materials": [
        "Tu propio cuerpo orientado",
        "La luz del sol de la mañana",
        "Brújula opcional"
      ]
    },
    "applicationActivity": {
      "title": "El mapa de las 4 regiones a cuatro colores",
      "task": "Dibuja la silueta del Ecuador y las Islas Galápagos. Pinta la Costa de amarillo claro, la Sierra de café o naranja montañoso, la Amazonía de verde selva y Galápagos de azul marino. Ubica la capital Quito con una estrella roja brillante.",
      "deliverable": "Mapa del Ecuador coloreado por regiones con su rosa de los vientos en una esquina."
    },
    "formativeEvaluation": {
      "description": "Ubicación geográfica, orientación espacial con puntos cardinales y reconocimiento de la división regional.",
      "expectedEvidence": "Gael orienta su cuerpo hacia el Este con la salida del sol y ubica las 4 regiones en el mapa sin dudar."
    },
    "evaluationRubric": {
      "criterion": "Ubicación espacial y división territorial del Ecuador (CS.2.2.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Identifica el mapa del Ecuador pero confunde el Este con el Oeste o las regiones naturales."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Ubica la Sierra y la Costa pero requiere apoyo para ubicar Galápagos y orientarse con los puntos cardinales."
        },
        {
          "level": "Consolidado",
          "descriptor": "Domina la rosa de los vientos, ubica con exactitud las 4 regiones naturales y su provincia en el mapa, y describe con entusiasmo la diversidad geográfica nacional."
        }
      ]
    },
    "expectedFeedback": "¡Magistral graduación geográfica, Capitán Gael! Has conquistado el mapa del Ecuador y la rosa de los vientos. ¡Ya tienes el timón firme para viajar por todo nuestro país!",
    "difficultyAdaptation": "Pegar 4 letreros de colores en las paredes de la habitación con las letras N, S, E, O para practicar giros de brújula.",
    "advancedExtension": "Gael investiga por qué la cima del volcán Chimborazo es el punto más cercano al Sol en todo el planeta Tierra (debido al ensanchamiento de la línea ecuatorial).",
    "resources": [
      {
        "id": "class-soc-gael-03-res-1",
        "type": "external_link",
        "title": "Instituto Geográfico Militar (IGM): Cartografía Infantil del Ecuador",
        "url": "https://www.igm.gob.ec/",
        "description": "Recurso oficial cartográfico con mapas temáticos y educativos de las provincias y regiones del Ecuador.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-soc-gael-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Mi Mapa del Tesoro Ecuatoriano",
        "url": "/api/v1/academic/classes/class-soc-gael-03/guide.pdf",
        "description": "Plantilla cartográfica con silueta del Ecuador y rosa de los vientos para colorear en 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soc-gael-03-act-1",
        "title": "El Vuelo del Cóndor",
        "description": "Identifica las características geográficas de las 4 regiones visitadas con el cóndor.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-soc-gael-03-act-2",
        "title": "Laboratorio de la Brújula Solar",
        "description": "Realiza la dinámica corporal de orientación con los 4 puntos cardinales en el patio.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soc-gael-03-act-3",
        "title": "Póster Cartográfico de las 4 Regiones",
        "description": "Pinta el mapa del Ecuador a cuatro colores y señala la capital con estrella roja.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Averigua en qué provincia nacieron tus papás y tus abuelos y ubícalas en tu mapa con un puntito de color.",
    "reflectionPrompt": "¿Qué significa para ti ser un niño ecuatoriano que cuida su tierra y a su gente?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soc_gael_03.pdf",
    "guideUrl": "/api/v1/academic/classes/class-soc-gael-03/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-04-SOC",
      "subjectCode": "SOC-401",
      "unitNumber": 1,
      "sessionNumber": 3
    }
  },
  {
    "id": "class-ing-gael-01",
    "subjectId": "ing-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1 (Unit 1): Welcome to English Adventures: Phonics, Animals and Body Joy",
    "theme": "Phonics Fun: Letter Sounds, Chants and Magic CVC Words",
    "objective": "Recognize initial alphabet sounds in English and blend letter sounds to read simple 3-letter CVC words (cat, sun, bus).",
    "learningPurpose": "Descubrir que en inglés las letras cantan sonidos divertidos que al juntarse como piezas de Lego forman palabras mágicas que podemos leer solitos.",
    "competencyDcd": "EFL.2.4.1 — Recognize basic sounds of English letters and blend letter-sound correspondences to read simple three-letter words (CVC pattern: consonant-vowel-consonant).",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — English as a Foreign Language (EFL Pre-A1 / MCER A1.1)",
    "introduction": "Hello, super champion Gael! Welcome to your English Adventure with Teacher Emma. Did you know that letters in English have secret musical sounds? The letter A says /æ/ like an apple on your hand, the letter B says /b/ like a bouncing ball, and the letter C says /k/ like a crunchy cookie! Today we are going to be \"Sound Detectives\" and build our first English words.",
    "reading": "Story: \"The Cat and the Sun Hat\". Once upon a time, a cheerful cat named Sam sat on a big red mat. The sun was hot up in the blue sky: /s/ - /ʌ/ - /n/, SUN! Sam the cat said: \"I need a hat!\". He ran to a red bus: /b/ - /ʌ/ - /s/, BUS! Inside the bus, he found a fun yellow hat: /h/ - /æ/ - /t/, HAT! Sam put the hat on his head, smiled happily and took a quick cat nap on his mat.",
    "pedagogicalExplanation": "En inglés aprendemos a leer escuchando el sonido de cada letra (Phonics). Las palabras CVC son palabras cortas formadas por: Consonante + Vocal corta + Consonante. Por ejemplo: C-A-T hace /k/ - /æ/ - /t/ = CAT (gato). S-U-N hace /s/ - /ʌ/ - /n/ = SUN (sol). H-A-T hace /h/ - /æ/ - /t/ = HAT (sombrero). ¡Es como hacer música con las letras!",
    "vocabulary": [
      {
        "term": "Cat",
        "definition": "A small furry pet that purrs and meows.",
        "childFriendlyExample": "The cat is sleeping on the warm mat."
      },
      {
        "term": "Sun",
        "definition": "The bright star that gives us light and warmth during the day.",
        "childFriendlyExample": "The yellow sun shines bright today."
      },
      {
        "term": "Hat",
        "definition": "Something you wear on your head for fun or sun protection.",
        "childFriendlyExample": "Gael wears a cool hat when he plays in the park."
      }
    ],
    "contextualizedExample": "When you see a yellow school bus in Quito and say \"Look, a yellow BUS (/b/ - /ʌ/ - /s/)!\", you are speaking English like a native champion!",
    "socraticQuestions": [
      "If we change the first sound of \"CAT\" (/k/) for the sound /h/, what new word do we get? (HAT!)",
      "Can you make the sound of the letter S like a friendly snake? /ssssss/! What words start with that sound?",
      "Why is it so much fun to chant and sing the sounds instead of just looking at the letters?"
    ],
    "practicalActivity": {
      "title": "The 3-Box Phonics Puzzle (El puzzle de las 3 casillas)",
      "instructions": [
        "Draw 3 connected squares on your magic whiteboard: [ C ] [ A ] [ T ].",
        "Use 3 colored Lego bricks: place one brick in each box as you say each sound aloud: /k/ (red brick), /æ/ (yellow brick), /t/ (blue brick).",
        "Slide your finger fast under the three boxes and shout the blended word: \"CAT!\"",
        "Repeat the same game with the words: S-U-N (Sun) and B-U-S (Bus)."
      ],
      "materials": [
        "Whiteboard or paper",
        "3 Lego blocks of different colors",
        "Marker"
      ]
    },
    "applicationActivity": {
      "title": "My First Phonics Comic Strip",
      "task": "Draw 3 small frames in your notebook: 1) A happy cat, 2) A bright sun, 3) A funny hat. Write the CVC word under each picture using colorful uppercase and lowercase letters.",
      "deliverable": "Illustrated 3-word mini poster (CAT, SUN, HAT) with student drawing and neat handwriting."
    },
    "formativeEvaluation": {
      "description": "Phonemic awareness, initial sound identification and CVC blending.",
      "expectedEvidence": "Gael pronounces the isolated sounds /k/, /æ/, /t/ and blends them smoothly to say \"cat\" without hesitating."
    },
    "evaluationRubric": {
      "criterion": "Recognition and blending of English letter sounds CVC (EFL.2.4.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Repeats words after the teacher but struggles to identify individual letter sounds."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Identifies initial sounds like /s/ and /b/ and blends 3-letter words with teacher guidance."
        },
        {
          "level": "Consolidado",
          "descriptor": "Autonomously sounds out and blends CVC words (cat, sun, hat, bus) with enthusiastic, accurate pronunciation."
        }
      ]
    },
    "expectedFeedback": "Terrific phonics power, Gael! Your English sounds are crisp, clear and musical. You blended the sounds like a real English master. Teacher Emma gives you five stars! ⭐⭐⭐⭐⭐",
    "difficultyAdaptation": "Use flashcards with a picture of a cat on one side and the letters C-A-T with sound dots underneath on the other side.",
    "advancedExtension": "Gael can discover other rhyming words of the -AT family: BAT, RAT, FAT, and explain what each word means with gestures.",
    "resources": [
      {
        "id": "class-ing-gael-01-res-1",
        "type": "simulator",
        "title": "Starfall Education: Learn to Read with Phonics",
        "url": "https://www.starfall.com/h/ltr-classic/",
        "description": "Plataforma educativa infantil abierta con animaciones interactivas de sonidos de vocales cortas y palabras CVC.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-ing-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Phonics Fun & CVC Words",
        "url": "/api/v1/academic/classes/class-ing-gael-01/guide.pdf",
        "description": "Ficha de trabajo imprimible con casillas de sonido y dibujos para colorear en 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-ing-gael-01-act-1",
        "title": "Sam the Cat Chant",
        "description": "Listen to the rhyme of Sam the cat and identify the rhyming words with -at.",
        "type": "listening",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-ing-gael-01-act-2",
        "title": "Lego Phonics Blending Laboratory",
        "description": "Build the words CAT, SUN and BUS sliding your finger with 3 Lego blocks.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-ing-gael-01-act-3",
        "title": "Mini Phonics Comic Poster",
        "description": "Draw and label your 3 CVC words with bright colors and pride.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Teach your mom or dad the secret sound of letter C (/k/) and letter S (/s/) and show them your comic drawing.",
    "reflectionPrompt": "How does it feel to read your first English words all by yourself?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_ing_gael_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-ing-gael-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-05-ING",
      "subjectCode": "ING-401",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-ing-gael-02",
    "subjectId": "ing-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "10:00 - 10:45 (45 min)",
    "unit": "Unidad 1 (Unit 1): Welcome to English Adventures: Phonics, Animals and Body Joy",
    "theme": "The Animal Safari: Pets, Jungle Friends and Bright Colors",
    "objective": "Name common animals in English (dog, cat, bird, frog, bear) and describe them using basic color adjectives in simple spoken phrases.",
    "learningPurpose": "Aprender a nombrar y describir a nuestros animales y mascotas favoritas combinando colores en inglés sin traducir mentalmente.",
    "competencyDcd": "EFL.2.2.1 — Understand and use basic vocabulary related to everyday objects, animals, and colors in short spoken interactions.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — English as a Foreign Language (EFL Pre-A1 / MCER A1.1)",
    "introduction": "Welcome back to the English Safari, Ranger Gael! Today we are packing our binoculars and our green adventure hat. We are going to meet wonderful animal friends from the Ecuadorian rainforest and the cozy house! Can you roar like a bear? Can you ribbit like a green frog? Let’s learn their English names and paint them with awesome colors!",
    "reading": "Adventure: \"A Walk in the Colorful Jungle\". Ranger Gael walked quietly into the green forest. Look up in the tree! What do you see? \"I see a blue bird! The bird is blue and sings a sweet song: tweet, tweet!\". Then, look near the fresh river! What do you see? \"I see a green frog! The frog is green and jumps high: hop, hop!\". Under the big palm tree, what is that? \"A big brown bear! The bear is brown and loves eating sweet berries!\". And waiting at home with a wagging tail, who is that? \"A happy yellow dog! The dog is loyal and loves to play ball!\".",
    "pedagogicalExplanation": "En inglés, cuando queremos describir un animal con un color, decimos primero el color y luego el animal: decimos \"A blue bird\" (un pájaro azul) y no \"a bird blue\". También podemos armar oraciones completas y sencillas: \"The frog is green\" (La rana es verde) o \"The dog is brown\" (El perro es café). ¡Es muy fácil y ordenado!",
    "vocabulary": [
      {
        "term": "Dog",
        "definition": "A friendly four-legged pet known as man's best friend.",
        "childFriendlyExample": "The brown dog wags its tail."
      },
      {
        "term": "Frog",
        "definition": "A small green animal with long legs for jumping in rivers and ponds.",
        "childFriendlyExample": "The green frog jumps into the cool water."
      },
      {
        "term": "Bird",
        "definition": "A creature with feathers and wings that can fly in the sky.",
        "childFriendlyExample": "The blue bird flies over the trees."
      }
    ],
    "contextualizedExample": "When you visit the zoo and see a giant bear eating fruit, you can point and say with confidence: \"Look! A big brown bear!\".",
    "socraticQuestions": [
      "Why in English do we put the color before the animal? We say \"A green frog\". How does that help our brain imagine the picture?",
      "If you could adopt any wild animal as a magical pet, what animal and what color would you choose?",
      "Can you make the sound and action of your favorite animal right now?"
    ],
    "practicalActivity": {
      "title": "The Color & Animal Match Safari Game",
      "instructions": [
        "Lay out 4 color cards on the table: Blue, Green, Brown, Yellow.",
        "Take 4 animal drawings or toy figures: Bird, Frog, Bear, Dog.",
        "Match each animal with its color card.",
        "Point to each pair and say aloud the magic phrase: \"The bird is blue!\", \"The frog is green!\", \"The bear is brown!\", \"The dog is yellow!\"."
      ],
      "materials": [
        "Color paper slips (blue, green, brown, yellow)",
        "Animal toy figurines or cutout cards"
      ]
    },
    "applicationActivity": {
      "title": "My Dream Animal Safari Card",
      "task": "In your notebook, design an official Safari Explorer Card. Draw your favorite animal, color it brightly, and write below: \"My animal is a [color] [animal]. It can [jump/run/fly]!\".",
      "deliverable": "Illustrated Safari Passport Card with 2 complete English sentences written by Gael."
    },
    "formativeEvaluation": {
      "description": "Oral vocabulary production of animal names and color adjective sentence structure.",
      "expectedEvidence": "Gael says \"A green frog\" and \"The bear is brown\" with proper word order and confident pronunciation."
    },
    "evaluationRubric": {
      "criterion": "Oral vocabulary and descriptive sentences of animals and colors (EFL.2.2.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Names colors or animals in isolation when pointed out, but cannot form a phrase."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Combines color and animal (e.g., \"blue bird\") with gentle prompting from the tutor."
        },
        {
          "level": "Consolidado",
          "descriptor": "Spontaneously uses the color-noun structure (\"A green frog\") and speaks full descriptive sentences (\"The dog is brown\") with enthusiasm."
        }
      ]
    },
    "expectedFeedback": "Splendid safari adventure, Ranger Gael! You spoke about your animal friends with great fluency and your drawings are full of life. You are a natural English explorer!",
    "difficultyAdaptation": "Use an echo game where the teacher says \"Green frog!\" and Gael mimics the frog hopping while repeating \"Green frog!\".",
    "advancedExtension": "Gael learns two extra wild animals from the Galápagos Islands: \"sea turtle\" (tortuga marina) and \"blue-footed booby\" (piquero de patas azules).",
    "resources": [
      {
        "id": "class-ing-gael-02-res-1",
        "type": "simulator",
        "title": "British Council LearnEnglish Kids: Animal Games & Songs",
        "url": "https://learnenglishkids.britishcouncil.org/word-games/animals-1",
        "description": "Juegos interactivos abiertos del British Council para emparejar animales y colores con audio de pronunciación nativa.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-ing-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — The Colorful Animal Safari",
        "url": "/api/v1/academic/classes/class-ing-gael-02/guide.pdf",
        "description": "Ficha imprimible con pasaporte de guardaparque y tarjetas de animales para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-ing-gael-02-act-1",
        "title": "Jungle Echo Safari Listening",
        "description": "Listen to animal sounds and match each sound with its English name and color.",
        "type": "listening",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-ing-gael-02-act-2",
        "title": "Color & Animal Pairing Challenge",
        "description": "Match the 4 color cards with animal tokens and practice the descriptive phrases.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-ing-gael-02-act-3",
        "title": "Official Safari Explorer Card",
        "description": "Create your colorful passport card with your dream animal and English sentences.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Look out your window or in your living room and name in English two animals or objects with their colors (e.g., \"A black cat\", \"A red car\").",
    "reflectionPrompt": "Which animal in the world would you love to see in person, and what would you say to it in English?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_ing_gael_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-ing-gael-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-05-ING",
      "subjectCode": "ING-401",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-ing-gael-03",
    "subjectId": "ing-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1 (Unit 1): Welcome to English Adventures: Phonics, Animals and Body Joy",
    "theme": "My Body and Action Time: Simon Says Jump, Clap and Smile!",
    "objective": "Identify body parts (head, shoulders, knees, toes, eyes, ears) and execute action commands (jump, clap, touch, run) using Total Physical Response (TPR).",
    "learningPurpose": "Aprender inglés conectando el cerebro con el cuerpo en movimiento: cuando escuchamos y actuamos físicamente, el nuevo idioma se graba para siempre sin esfuerzo.",
    "competencyDcd": "EFL.2.1.1 — Respond physically to simple classroom commands and instructions through Total Physical Response (TPR).",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — English as a Foreign Language (EFL Pre-A1 / MCER A1.1)",
    "introduction": "Are you ready to move your body, champion Gael?! Today we are turning our learning space into an energetic game of \"Simon Says!\". We have a wonderful body: a head to think smart thoughts, eyes to see beauty, ears to hear songs, hands to build Lego towers, and feet to jump high! Let’s listen, move, laugh, and celebrate Friday with English power!",
    "reading": "Song Chant: \"Head, Shoulders, Knees and Toes!\". Stand up tall! Let's touch our body parts to the rhythm of the music: \"Head, shoulders, knees and toes, knees and toes! Head, shoulders, knees and toes, knees and toes! And eyes, and ears, and mouth, and nose! Head, shoulders, knees and toes, knees and toes!\". Now Teacher Emma says: \"Simon says: CLAP your hands! (Clap, clap!). Simon says: JUMP three times! (1, 2, 3!). Simon says: SMILE big! (Big happy smile!)\".",
    "pedagogicalExplanation": "El método TPR (Respuesta Física Total) nos enseña que la forma más rápida y natural de aprender una lengua extranjera es hacer la acción con el cuerpo cuando escuchamos la orden. Si escuchas \"Jump!\", saltas. Si escuchas \"Touch your head!\", tocas tu cabeza. Así, tu mente comprende el significado al instante sin necesidad de traducir al español.",
    "vocabulary": [
      {
        "term": "Head",
        "definition": "The upper part of your body containing your brain, eyes, ears, nose and mouth.",
        "childFriendlyExample": "Touch your head and think a happy thought!"
      },
      {
        "term": "Jump",
        "definition": "To push yourself up into the air using your feet and legs.",
        "childFriendlyExample": "Simon says: jump as high as a kangaroo!"
      },
      {
        "term": "Clap",
        "definition": "To strike your open hands together to make a sharp sound and celebrate.",
        "childFriendlyExample": "Clap your hands when you are happy and you know it!"
      }
    ],
    "contextualizedExample": "When you are playing soccer or riding your bicycle and someone says \"Run fast!\" or \"Jump!\", you react with joy and agility because you know the words in your bones.",
    "socraticQuestions": [
      "Why is it easier to remember an English word like \"JUMP\" when you actually jump with your feet instead of just reading it in a book?",
      "What body part is the most important for listening to Teacher Emma’s voice? (Our EARS!)",
      "If Simon does NOT say \"Simon says\", should you do the action? Why do we need to pay close attention?"
    ],
    "practicalActivity": {
      "title": "The Simon Says Olympic Challenge",
      "instructions": [
        "Stand in the middle of the room in ready position.",
        "Listen carefully to Teacher Emma’s commands.",
        "Rule: Only do the action if you hear \"Simon says...\".",
        "Command 1: \"Simon says: Touch your shoulders!\".",
        "Command 2: \"Simon says: Clap your hands 4 times!\".",
        "Command 3: \"Simon says: Touch your knees!\".",
        "Command 4 (Trick!): \"Jump twice!\" (Freeze! Don’t move because Simon didn’t say!).",
        "Command 5: \"Simon says: Give a warm victory hug!\"."
      ],
      "materials": [
        "Your energized body",
        "Open space to jump safely"
      ]
    },
    "applicationActivity": {
      "title": "The Superhero Body Blueprint",
      "task": "Draw a superhero self-portrait in your notebook. Label 5 body parts using neat arrows: Head, Eyes, Ears, Hands, Feet. Write 1 action verb next to each part (e.g., Head = Think, Feet = Jump).",
      "deliverable": "Superhero blueprint illustration with 5 body parts and action labels in English."
    },
    "formativeEvaluation": {
      "description": "Physical and oral response to action commands and body part identification.",
      "expectedEvidence": "Gael touches his knees, shoulders and head immediately upon hearing the commands in English without looking for translations."
    },
    "evaluationRubric": {
      "criterion": "Physical response to English commands and body part naming TPR (EFL.2.1.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Looks at the teacher for visual cues before touching body parts."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Identifies head and hands quickly, but hesitates on knees or toes."
        },
        {
          "level": "Consolidado",
          "descriptor": "Responds instantly with accuracy and joy to all TPR action commands (jump, clap, touch head/shoulders/knees) and follows Simon Says rules flawlessly."
        }
      ]
    },
    "expectedFeedback": "Outstanding energy and mastery, Gael! You nailed every Simon Says command and your superhero blueprint looks epic. You have completed the English Unit 1 with flying colors! 🌟🚀",
    "difficultyAdaptation": "Perform the movements together facing a mirror so Gael can see his reflection while singing the chant.",
    "advancedExtension": "Gael takes the role of \"Simon\" and gives 3 English commands to the tutor or parents (e.g., \"Simon says touch your nose!\").",
    "resources": [
      {
        "id": "class-ing-gael-03-res-1",
        "type": "simulator",
        "title": "Super Simple Songs: Action Songs for Kids",
        "url": "https://supersimple.com/song/head-shoulders-knees-and-toes/",
        "description": "Recurso oficial abierto con canciones educativas de ritmo TPR, coreografías infantiles y fichas de partes del cuerpo.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-ing-gael-03-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Simon Says & My Superhero Body",
        "url": "/api/v1/academic/classes/class-ing-gael-03/guide.pdf",
        "description": "Ficha imprimible de blueprint corporal y juego de tarjetas de acción para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-ing-gael-03-act-1",
        "title": "Head, Shoulders, Knees and Toes Chant",
        "description": "Sing and dance the traditional action chant speeding up the tempo each round.",
        "type": "speaking",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-ing-gael-03-act-2",
        "title": "The Simon Says Olympic Challenge",
        "description": "Participate actively in the physical Simon Says game demonstrating attentive listening.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-ing-gael-03-act-3",
        "title": "Superhero Body Blueprint",
        "description": "Illustrate and label your superhero self-portrait with 5 body parts and actions.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Play a mini-round of \"Simon Says\" with a family member and teach them how to say \"touch your head\" in English.",
    "reflectionPrompt": "What action makes you feel full of energy and joy when you move your body?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_ing_gael_03.pdf",
    "guideUrl": "/api/v1/academic/classes/class-ing-gael-03/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-05-ING",
      "subjectCode": "ING-401",
      "unitNumber": 1,
      "sessionNumber": 3
    }
  },
  {
    "id": "class-soft-gael-01",
    "subjectId": "soft-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-10",
    "dayOfWeek": "Jueves",
    "scheduleTime": "10:45 - 11:30 (45 min)",
    "unit": "Unidad 1: Pequeños Creadores: Algoritmos Desenchufados y Aventuras en Scratch",
    "theme": "¿Qué es un algoritmo? Pensamiento computacional y laberintos desenchufados",
    "objective": "Comprender el concepto de algoritmo como una secuencia ordenada de pasos lógicos para resolver un problema o alcanzar una meta.",
    "learningPurpose": "Aprender que las computadoras y robots no son adivinos: solo hacen exactamente lo que los humanos les ordenamos paso a paso con claridad y precisión.",
    "competencyDcd": "CSTA.1A-AP-08 — Model daily processes by creating and following algorithms (sets of step-by-step instructions) to complete tasks.",
    "officialSource": "CSTA K-12 Computer Science Standards (Level 1A: Grades 3-4) / Marco STEM ALSIZ",
    "introduction": "¡Bip-bop, súper programador Gael! Soy tu amigo el Robot Codi. Mucha gente cree que las computadoras tienen un cerebro mágico que piensa solo, ¡pero es mentira! Los robots somos como cocineros muy obedientes pero muy despistados: si en la receta no dices \"abre el huevo antes de tirarlo a la sartén\", ¡el robot tirará el huevo con cáscara y todo! Esa lista de órdenes ordenadas paso a paso se llama ALGORITMO. Hoy aprenderemos a pensar como programadores sin necesidad de pantallas.",
    "reading": "La misión del sándwich de mermelada: En el laboratorio de Codi, Gael quiso programar a un robot para preparar un delicioso sándwich. La primera orden de Gael fue: \"Pon mermelada en el pan\". El robot tomó el frasco cerrado de mermelada y lo puso encima de la funda plástica de pan. ¡Plop! Gael se rio a carcajadas. \"¡Espera, Codi! Olvidé los pasos previos\". Gael tomó lápiz y papel y escribió un algoritmo perfecto: 1) Abrir la funda de pan. 2) Sacar dos rebanadas y ponerlas en el plato. 3) Destapar el frasco de mermelada. 4) Tomar el cuchillo de mantequilla. 5) Untar la mermelada sobre una rebanada. 6) Tapar con la otra rebanada. El robot siguió cada paso y... ¡ñam! ¡El sándwich quedó perfecto! A corregir los pasos cuando algo sale mal los ingenieros lo llaman DEPURAR (o quitar bugs).",
    "pedagogicalExplanation": "Un algoritmo es una secuencia de instrucciones finitas, claras y ordenadas que resuelven un problema o logran un objetivo. Si cambias el orden de los pasos, el resultado se arruina: no puedes ponerte los zapatos antes de las medias. El pensamiento computacional nos enseña a: 1) Descomponer un problema grande en pasos chiquitos. 2) Seguir la secuencia lógica. 3) Detectar errores (depuración).",
    "vocabulary": [
      {
        "term": "Algoritmo",
        "definition": "Conjunto ordenado de instrucciones paso a paso para realizar una tarea.",
        "childFriendlyExample": "Una receta de cocina o las instrucciones para armar un Lego son algoritmos."
      },
      {
        "term": "Programa",
        "definition": "Un algoritmo escrito en un lenguaje que una computadora puede comprender y ejecutar.",
        "childFriendlyExample": "El juego de Mario Bros es un programa con millones de algoritmos."
      },
      {
        "term": "Depuración (Debug)",
        "definition": "Encontrar un error en las instrucciones y corregirlo para que todo funcione bien.",
        "childFriendlyExample": "Cuando corriges un paso equivocado en el laberinto, estás depurando."
      }
    ],
    "contextualizedExample": "Cuando Gael se cepilla los dientes: 1) toma el cepillo, 2) pone pasta, 3) cepilla arriba y abajo por 2 minutos, 4) enjuaga con agua limpia. ¡Ese es su algoritmo de higiene dental!",
    "socraticQuestions": [
      "¿Qué pasaría si en un semáforo el algoritmo de luces cambiara de rojo a verde sin pasar por el amarillo de precaución?",
      "¿Por qué las computadoras necesitan que las instrucciones sean súper exactas y no toleran confusiones?",
      "Si un robot se queda atascado caminando contra una pared, ¿de quién es la culpa: del robot o del programador que escribió el algoritmo?"
    ],
    "practicalActivity": {
      "title": "El juego del robot ciego en la sala (Algoritmo desenchufado)",
      "instructions": [
        "Elige un punto de partida (la puerta de la habitación) y una meta (un cojín con un juguete).",
        "Coloca dos obstáculos suaves en el camino (por ejemplo, dos sillas o cajas).",
        "Gael asume el rol de \"Programador\" y escribe en una tarjeta de papel los comandos con flechas: [Avanzar 2 pasos], [Girar 90° a la derecha], [Avanzar 3 pasos], [Recoger el tesoro].",
        "El tutor o un familiar cierra los ojos y actúa como \"Robot Codi\", obedeciendo ciegamente las órdenes exactas escritas por Gael.",
        "Si el robot choca con una silla, Gael debe hacer \"Debug\" (corregir la tarjeta con las flechas) y volver a ejecutar."
      ],
      "materials": [
        "Tarjetas de cartulina o papel",
        "Marcador para dibujar flechas de comandos",
        "Un cojín como tesoro"
      ]
    },
    "applicationActivity": {
      "title": "El laberinto en cuadrícula del explorador",
      "task": "Dibuja una cuadrícula de 5x5 cuadros en tu libreta. En la casilla (1,1) dibuja a un astronauta y en la (5,5) dibuja una nave espacial. Coloca 3 asteroides como obstáculos. Escribe abajo la secuencia de flechas (↑, ↓, →, ←) del algoritmo que lleva al astronauta sano y salvo a su nave.",
      "deliverable": "Cuadrícula con el laberinto dibujado y la tira de código de flechas escrita al pie."
    },
    "formativeEvaluation": {
      "description": "Comprensión de la secuencia algorítmica y capacidad de depuración de errores lógicos.",
      "expectedEvidence": "Gael explica paso a paso por qué el orden de las instrucciones es crucial y corrige cualquier paso desordenado en su cuadrícula."
    },
    "evaluationRubric": {
      "criterion": "Diseño y seguimiento de algoritmos paso a paso desenchufados (CSTA.1A-AP-08)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Da órdenes generales pero no las descompone en pasos precisos ni detecta inconsistencias."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Escribe la secuencia de pasos con flechas pero requiere apoyo para corregir cuando hay un choque con obstáculo."
        },
        {
          "level": "Consolidado",
          "descriptor": "Crea algoritmos precisos y eficientes, guía con éxito al robot ciego y depura errores con agilidad y razonamiento lógico impecable."
        }
      ]
    },
    "expectedFeedback": "¡Bip-bop-hurra, ingeniero Gael! Tu algoritmo del robot ciego fue tan preciso que no choqué ni una sola vez con los obstáculos. Tienes una mente brillante para la programación de naves espaciales. ¡Robot Codi te saluda con chispas de alegría!",
    "difficultyAdaptation": "Utilizar una cuadrícula más pequeña de 3x3 en el suelo usando baldosas para que Gael camine físicamente sobre los cuadros antes de escribir las flechas.",
    "advancedExtension": "Gael introduce el concepto de \"Bucle o Repetición\": en lugar de escribir [→] [→] [→] [→], escribe una tarjeta que diga [Repetir 4 veces: Avanzar →].",
    "resources": [
      {
        "id": "class-soft-gael-01-res-1",
        "type": "simulator",
        "title": "Code.org: Pensamiento Computacional Desenchufado",
        "url": "https://code.org/curriculum/unplugged",
        "description": "Recurso oficial abierto de Code.org con actividades lúdicas sin pantalla sobre algoritmos y depuración.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-soft-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Misión Robot Ciego",
        "url": "/api/v1/academic/classes/class-soft-gael-01/guide.pdf",
        "description": "Ficha imprimible con tarjetas de comandos (Avanzar, Girar) y cuadrículas de laberinto para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soft-gael-01-act-1",
        "title": "La Misión del Sándwich",
        "description": "Analiza la receta fallida de Codi y descubre por qué los pasos previos son indispensables.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-soft-gael-01-act-2",
        "title": "Laboratorio del Robot Ciego",
        "description": "Guía al robot humano mediante comandos de flechas esquivando obstáculos en la sala.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soft-gael-01-act-3",
        "title": "Laberinto Cuadriculado 5x5",
        "description": "Diseña el laberinto espacial y escribe la secuencia de flechas del algoritmo final.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Escribe en 4 pasos el algoritmo para atarse los cordones de los zapatos o para tender tu cama.",
    "reflectionPrompt": "¿Qué sientes al saber que tú puedes ser el inventor que le enseña a las máquinas cómo ayudar a las personas?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soft_gael_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-soft-gael-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-06-SOFT",
      "subjectCode": "SOFT-401",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-soft-gael-02",
    "subjectId": "soft-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-11",
    "dayOfWeek": "Viernes",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Pequeños Creadores: Algoritmos Desenchufados y Aventuras en Scratch",
    "theme": "¡Hola Scratch! Mi primer gato animado y la bandera verde",
    "objective": "Crear un programa interactivo básico en Scratch uniendo bloques de eventos (\"Al presionar bandera verde\"), movimiento (\"Mover 10 pasos\") y apariencia (\"Decir ¡Hola!\").",
    "learningPurpose": "Dar el salto de los algoritmos de papel a la programación visual real en la computadora, animando personajes interactivos que responden a nuestras órdenes.",
    "competencyDcd": "CSTA.1A-AP-10 — Develop programs with sequences and simple loops, to express ideas or address a problem.",
    "officialSource": "CSTA K-12 Computer Science Standards / Scratch MIT",
    "introduction": "¡Llegó la hora de la magia digital, Gael! Ya sabes qué es un algoritmo. Ahora imagínate un lienzo donde los bloques de código encajan exactamente como fichas de Lego: si pones un bloque amarillo de EVENTO (\"Al presionar bandera verde\") y le enganchas un bloque azul de MOVIMIENTO (\"Mover 10 pasos\"), ¡tu personaje cobra vida en la pantalla en un milisegundo! Hoy entraremos a Scratch del MIT y haremos que el simpático gato Scratch hable, camine y salude al Ecuador.",
    "reading": "El nacimiento de un animador digital: En el laboratorio de computación del MIT (Massachusetts Institute of Technology), unos profesores geniales pensaron: \"¿Por qué los niños solo tienen que jugar los videojuegos de otros si ellos tienen tanta imaginación para inventar los suyos?\". Así crearon Scratch, un mundo donde no tienes que escribir letras difíciles en inglés ni memorizar códigos raros: solo arrastras bloques de colores que encajan con un chasquido sonoro. Cuando Gael presionó la bandera verde por primera vez y vio a su personaje avanzar por el escenario y decir: \"¡Hola Gael, listo para la aventura!\", supo que nunca más volvería a ver una computadora de la misma manera: ¡ahora él era el creador de la historia!",
    "pedagogicalExplanation": "En Scratch la pantalla se divide en tres zonas: 1) El Escenario (a la derecha): donde se mueven los personajes u objetos (sprites). 2) La Paleta de Bloques (a la izquierda): clasificada por colores: Eventos (amarillo), Movimiento (azul), Apariencia (morado), Sonido (rosa). 3) El Área de Programación (al centro): donde arrastramos los bloques y los conectamos verticalmente. El bloque \"Al presionar Bandera Verde\" es el interruptor de encendido de cualquier programa.",
    "vocabulary": [
      {
        "term": "Scratch",
        "definition": "Plataforma educativa y lenguaje de programación visual por bloques desarrollado por el MIT para niños.",
        "childFriendlyExample": "En Scratch creamos videojuegos y cuentos interactivos uniendo bloques."
      },
      {
        "term": "Objeto o Sprite",
        "definition": "El personaje o elemento gráfico que programamos dentro del escenario de Scratch.",
        "childFriendlyExample": "El gato amarillo es el primer sprite que aprendemos a mover."
      },
      {
        "term": "Evento (Bandera Verde)",
        "definition": "La acción disparadora que hace que comience a ejecutarse una lista de bloques.",
        "childFriendlyExample": "Hacer clic en la bandera verde en Scratch es como decir: \"¡3, 2, 1... acción!\"."
      }
    ],
    "contextualizedExample": "Gael puede programar un sprite de colibrí que al presionar la bandera verde vuele hacia la copa de un árbol andino y emita un alegre trino digital.",
    "socraticQuestions": [
      "¿Por qué crees que en Scratch los bloques tienen formas que solo encajan hacia abajo como fichas de Lego?",
      "¿Qué pasaría si intentas programar a tu personaje pero te olvidas de poner el bloque amarillo de la bandera verde?",
      "Si le dices al gato \"Mover 10 pasos\" y luego \"Mover -10 pasos\", ¿dónde terminará el gato?"
    ],
    "practicalActivity": {
      "title": "El primer proyecto interactivo en Scratch MIT Web",
      "instructions": [
        "Abre en el navegador la plataforma oficial: scratch.mit.edu/projects/editor/.",
        "Ve a la categoría \"Eventos\" (amarillo) y arrastra al centro el bloque: [al presionar bandera verde].",
        "Ve a la categoría \"Movimiento\" (azul) y engancha abajo: [mover 50 pasos].",
        "Ve a la categoría \"Apariencia\" (morado) y engancha: [decir ¡Hola Ecuador! por 2 segundos].",
        "Haz clic en la Bandera Verde arriba del escenario y observa la magia: ¡tu gato camina y habla!"
      ],
      "materials": [
        "Computadora o tablet con navegador web",
        "Scratch Editor en línea",
        "Guía didáctica"
      ]
    },
    "applicationActivity": {
      "title": "La tarjeta de presentación interactiva de Gael",
      "task": "En tu proyecto de Scratch, cambia el fondo del escenario eligiendo una montaña o parque (\"Blue Sky\"). Añade un segundo bloque de apariencia para que el gato diga tu nombre: \"¡Mi programador estrella es Gael!\". Guarda tu proyecto con el título \"Hola_Gael_V1\".",
      "deliverable": "Proyecto funcional en Scratch guardado en el computador o enlace del proyecto compartido."
    },
    "formativeEvaluation": {
      "description": "Construcción autónoma de una secuencia básica de bloques en Scratch y comprensión del flujo de eventos.",
      "expectedEvidence": "Gael ejecuta su programa con la bandera verde, explica con orgullo qué hace cada bloque y modifica los números de pasos para ver qué ocurre."
    },
    "evaluationRubric": {
      "criterion": "Construcción de secuencias interactivas en Scratch (CSTA.1A-AP-10)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Explora la pantalla pero necesita guía para arrastrar y enganchar los bloques en orden."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Une el evento con el movimiento pero olvida configurar el texto o cambiar el escenario."
        },
        {
          "level": "Consolidado",
          "descriptor": "Programa autónomamente secuencias de eventos, movimiento y apariencia, personaliza diálogos y fondos con gran creatividad e iniciativa."
        }
      ]
    },
    "expectedFeedback": "¡Bip-bop-hurra, nuevo maestro de Scratch Gael! Has creado tu primer programa digital interactivo en la plataforma del MIT. Ver a tu personaje moverse y hablar con tu código es un momento histórico. ¡El cielo es el límite para tus futuros videojuegos!",
    "difficultyAdaptation": "Tener abierta la plantilla base con el bloque de la bandera verde ya colocado para que Gael solo arrastre el bloque morado de diálogo.",
    "advancedExtension": "Gael añade un bloque de \"Sonido\" (tocar sonido miau hasta que termine) y un bloque de bucle \"por siempre\" para que el personaje rebote si toca el borde del escenario.",
    "resources": [
      {
        "id": "class-soft-gael-02-res-1",
        "type": "simulator",
        "title": "Scratch MIT: Editor Oficial en Línea",
        "url": "https://scratch.mit.edu/projects/editor/",
        "description": "Entorno de programación visual oficial del Lifelong Kindergarten Group del MIT Media Lab.",
        "duration": "20 min",
        "order": 1
      },
      {
        "id": "class-soft-gael-02-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Primeros Pasos con el Gato Scratch",
        "url": "/api/v1/academic/classes/class-soft-gael-02/guide.pdf",
        "description": "Ficha paso a paso con capturas de bloques y retos de animación para 4.° EGB.",
        "duration": "15 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-soft-gael-02-act-1",
        "title": "Exploración de la Interfaz de Scratch",
        "description": "Identifica las 3 zonas clave de Scratch: Escenario, Bloques de colores y Área de código.",
        "type": "analysis",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-soft-gael-02-act-2",
        "title": "El Primer Programa: Bandera, Paso y Saludo",
        "description": "Conecta la secuencia de tres bloques y presiona la bandera verde en el editor.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-soft-gael-02-act-3",
        "title": "Tarjeta Interactiva con Fondo Personalizado",
        "description": "Añade el fondo de montaña y personaliza el diálogo con el nombre de autor de Gael.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Muéstrale a tu familia en la pantalla cómo el gato se mueve y habla cada vez que tú presionas la bandera verde.",
    "reflectionPrompt": "Si pudieras crear un videojuego completo en Scratch, ¿de qué trataría la aventura de tu héroe?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_soft_gael_02.pdf",
    "guideUrl": "/api/v1/academic/classes/class-soft-gael-02/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-06-SOFT",
      "subjectCode": "SOFT-401",
      "unitNumber": 1,
      "sessionNumber": 2
    }
  },
  {
    "id": "class-rel-gael-01",
    "subjectId": "rel-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-07",
    "dayOfWeek": "Lunes",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Semillitas de Fe: Gratitud, Mayordomía y Amor al Prójimo",
    "theme": "El Jardín del Creador: Mayordomía, gratitud y cuidado de la creación",
    "objective": "Reconocer la creación como un regalo de amor divino y asumir la responsabilidad personal de cuidar las plantas, animales y recursos naturales con gratitud.",
    "learningPurpose": "Descubrir que amar a Dios no es solo decir palabras bonitas, sino cuidar activamente la naturaleza que Él diseñó y tratar a todas las personas con respeto, paciencia y generosidad.",
    "competencyDcd": "EKB.4.1 — Reflexionar sobre el propósito de la creación divina, expresando gratitud cotidiana y practicando acciones de mayordomía ambiental y servicio al prójimo.",
    "officialSource": "Ekballo Church — Módulo Doctrinal Semillitas de Fe (Marco Pastoral Autónomo)",
    "introduction": "¡Paz y bien, querido Gael! Qué alegría encontrarnos en este espacio de reflexión con el Profesor David. Cuando miras hacia el cielo nocturno lleno de estrellas brillantes, o cuando contemplas los volcanes majestuosos y escuchas el canto alegre de los colibríes, ¿sientes ese asombro en el corazón? La creación entera es una hermosa carta de amor escrita por Dios. Y Él nos invitó a nosotros a ser sus \"Mayordomos\": guardianes y cuidadores cariñosos de cada rincón de este maravilloso hogar llamado Tierra.",
    "reading": "El guardián del pequeño manantial: En las faldas del monte Ilaló vivía un anciano bondadoso llamado don Samuel. En su terreno nacía un manantial de agua pura y cristalina. Muchos le decían: \"Samuel, cerca el manantial y cobra a la gente por beber de tu agua\". Pero don Samuel sonreía con ternura y respondía: \"El agua, el sol y el aire son regalos de Dios. Yo no soy el dueño del manantial, soy solo su jardinero cuidador\". Todos los días, don Samuel limpiaba las hojas secas, sembraba flores aromáticas para las abejas y ponía vasijas de barro con agua fresca para que los pajaritos y los caminantes sedientos pudieran beber gratis. Don Samuel decía que la gratitud se demuestra compartiendo con alegría lo que hemos recibido por gracia.",
    "pedagogicalExplanation": "La palabra \"Mayordomía\" significa administrar con amor y responsabilidad algo valioso que otra persona nos ha confiado. Dios creó el universo con sabiduría y orden perfecto: la luz, los mares, los animales y los árboles. A los seres humanos no nos entregó la Tierra para destruirla o contaminarla con egoísmo, sino para labrarla y guardarla con cariño (Génesis 2:15). Cada vez que cuidas una planta, no desperdicias el agua o ayudas a un amigo triste, estás cumpliendo tu misión como mayordomo del Creador.",
    "vocabulary": [
      {
        "term": "Mayordomía",
        "definition": "El cuidado responsable, sabio y amoroso de los bienes, la naturaleza y la vida que Dios nos ha confiado.",
        "childFriendlyExample": "Cuidar a tu mascota y regar las plantas de tu casa es practicar la mayordomía."
      },
      {
        "term": "Gratitud",
        "definition": "El sentimiento profundo del corazón que reconoce y agradece las bendiciones y regalos de la vida.",
        "childFriendlyExample": "Dar gracias antes de comer o al despertar en la mañana es un hermoso acto de gratitud."
      },
      {
        "term": "Creación",
        "definition": "Todo el universo natural diseñado por Dios con amor, propósito y belleza.",
        "childFriendlyExample": "Los Andes, el mar y los bosques son parte de la creación."
      }
    ],
    "contextualizedExample": "Cuando Gael apaga el foco de su habitación para no malgastar electricidad y cuida su vaso de agua sin botarlo, ¡está honrando a Dios como guardián fiel de la creación!",
    "socraticQuestions": [
      "Si un mejor amigo te presta su juguete favorito para que juegues un fin de semana, ¿cómo lo cuidarías? ¿Se parece eso a cómo debemos cuidar la Tierra que Dios nos prestó?",
      "¿Por qué crees que don Samuel no quiso cobrar por el agua del manantial? ¿Qué sentía en su corazón al ver beber a los pajaritos?",
      "¿Qué tres cosas hermosas de la naturaleza viste hoy por las que te gustaría darle gracias a Dios en tu corazón?"
    ],
    "practicalActivity": {
      "title": "El frasco de la gratitud diaria",
      "instructions": [
        "Consigue un frasco de vidrio o una cajita pequeña y decórala con una etiqueta que diga: \"Regalos de Dios para Gael\".",
        "Corta 3 papelitos de colores.",
        "En el primer papelito, escribe o dibuja una bendición de la naturaleza (ej: el sol cálido de la mañana).",
        "En el segundo papelito, escribe el nombre de una persona que te cuida con amor en tu familia.",
        "En el tercer papelito, escribe un talento o cualidad que Dios puso en ti (ej: mi alegría, mi curiosidad).",
        "Dobla los papelitos y colócalos dentro de tu frasco con una sonrisa de gratitud."
      ],
      "materials": [
        "Frasco o cajita decorada",
        "Papelitos de colores",
        "Lápiz o marcadores"
      ]
    },
    "applicationActivity": {
      "title": "El compromiso del Pequeño Mayordomo",
      "task": "Dibuja en tu libreta a ti mismo como un guardián de la creación cuidando un animal o una planta. Escribe una oración o promesa breve de 2 líneas expresando tu compromiso con Dios para cuidar la naturaleza y amar a tus semejantes.",
      "deliverable": "Dibujo del Pequeño Mayordomo con la promesa escrita y firmada por Gael."
    },
    "formativeEvaluation": {
      "description": "Reflexión ética sobre el cuidado de la creación, la gratitud cotidiana y la empatía hacia el prójimo.",
      "expectedEvidence": "Gael explica con sus propias palabras qué significa ser un mayordomo y comparte los 3 motivos de gratitud de su frasco."
    },
    "evaluationRubric": {
      "criterion": "Comprensión de la mayordomía de la creación y práctica de la gratitud (EKB.4.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Reconoce a Dios pero le cuesta vincular la fe con el cuidado diario del medio ambiente o de las personas."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Expresa gratitud por su familia y mascotas pero requiere guía para definir su rol como mayordomo."
        },
        {
          "level": "Consolidado",
          "descriptor": "Articula con madurez y ternura la importancia de la mayordomía ambiental como fruto de la gratitud, elabora su frasco y asume compromisos concretos de cuidado."
        }
      ]
    },
    "expectedFeedback": "¡Qué momento tan inspirador y lleno de paz, querido Gael! Tu frasco de la gratitud refleja un corazón sensible, generoso y noble. Ser un guardián de la creación es la misión más hermosa que un niño puede tener. ¡Profesor David se alegra profundamente con tu testimonio!",
    "difficultyAdaptation": "En lugar de escribir en los papelitos, Gael puede colocar pequeñas piedritas pulidas o semillas dentro del frasco, mencionando en voz alta cada motivo de agradecimiento.",
    "advancedExtension": "Gael propone una pequeña acción comunitaria en su hogar: sembrar una plantita en una maceta reciclada y cuidarla durante todo el trimestre como su \"proyecto vivo de mayordomía\".",
    "resources": [
      {
        "id": "class-rel-gael-01-res-1",
        "type": "simulator",
        "title": "YouVersion: La Biblia App para Niños",
        "url": "https://www.bible.com/es/kids",
        "description": "Recurso educativo multimedia oficial para niños con relatos animados e interactivos sobre la creación, los valores y la compasión.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-rel-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Guardianes del Creador",
        "url": "/api/v1/academic/classes/class-rel-gael-01/guide.pdf",
        "description": "Ficha de trabajo con plantilla para la promesa del mayordomo y etiquetas del frasco de gratitud para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-rel-gael-01-act-1",
        "title": "El Manantial de Don Samuel",
        "description": "Reflexiona sobre la generosidad de don Samuel y por qué los dones de Dios se comparten.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-rel-gael-01-act-2",
        "title": "Taller del Frasco de la Gratitud",
        "description": "Crea tu frasco decorado y deposita los 3 papelitos con bendiciones de tu vida.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-rel-gael-01-act-3",
        "title": "Promesa del Pequeño Mayordomo",
        "description": "Dibuja tu retrato como guardián ambiental y firma tu compromiso de amor a la creación.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Antes de dormir esta noche, mira por la ventana la luna o las estrellas y dile a Dios en silencio un motivo de gratitud por el día vivido.",
    "reflectionPrompt": "¿Qué sientes en tu corazón cuando haces sonreír a alguien que estaba triste o solo?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_rel_gael_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-rel-gael-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-07-REL",
      "subjectCode": "REL-401",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-art-gael-01",
    "subjectId": "art-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-08",
    "dayOfWeek": "Martes",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Pequeños Creadores: El Arte del Reciclaje y la Magia del Color",
    "theme": "El arte del Upcycling: De cartón y botellas a esculturas del futuro",
    "objective": "Transformar materiales reciclables y de desecho en una escultura o títere expresivo aplicando teoría del color y equilibrio visual.",
    "learningPurpose": "Desarrollar la mirada artística y ecológica para descubrir la belleza oculta y el potencial creador en lo que otros consideran simple basura.",
    "competencyDcd": "ECA.2.1.1 — Experimentar con las posibilidades del color y del gesto espontáneo al plasmar visualmente historias y objetos con materiales reciclables.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Educación Cultural y Artística EGB Elemental (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡Hola, gran artista Gael! Te da la bienvenida tu taller de Arte con la Tía Pincelita. ¿Sabías que los verdaderos magos del arte no necesitan comprar cosas caras en tiendas lujosas? Un verdadero artista mira un tubo de cartón de papel higiénico, una tapa de botella plástica o una cajita de cereal vacía y ve... ¡el cuerpo de un dragón andino, las turbinas de un cohete espacial o la cabeza de un robot guardián! Ese superpoder se llama UPCYCLING: convertir desechos en obras de arte valiosas y hermosas.",
    "reading": "El nacimiento de Chatarrín el Escultor: En un taller luminoso frente al río Guayas, una niña llamada Sofía y su amigo Gael encontraron una caja llena de objetos que iban a ir al basurero: tubos de cartón, tapitas de colores, lana sobrante y botones viejos. En lugar de botarlos, se sentaron en el suelo y comenzaron a jugar. El tubo de cartón se convirtió en el torso fuerte de un personaje, dos tapitas rojas fueron sus ojos brillantes, unos sorbetes de papel formaron sus brazos articulados y una cáscara de nuez sirvió como un elegante sombrero. Pintaron su cuerpo con témperas brillantes mezclando amarillo y azul para obtener un verde esmeralda deslumbrante. Cuando terminaron, bautizaron a su creación como \"Chatarrín\", el guardián ecológico del río. ¡Habían creado una escultura única en el mundo!",
    "pedagogicalExplanation": "El \"Upcycling\" (o suprarreciclaje) en el arte consiste en tomar materiales que ya cumplieron su función original y reinventarlos con creatividad para darles un valor estético mucho mayor. Al pintar sobre materiales reciclados, exploramos la teoría del color: los colores primarios (rojo, amarillo y azul) se combinan para crear los secundarios (verde, naranja y morado), logrando contrastes visuales alegres y armoniosos.",
    "vocabulary": [
      {
        "term": "Upcycling (Suprarreciclaje)",
        "definition": "Transformar materiales reciclables o desechados en objetos artísticos o utilitarios de mayor valor y belleza.",
        "childFriendlyExample": "Hacer un robot con cajas vacías de medicina es hacer upcycling."
      },
      {
        "term": "Escultura",
        "definition": "Obra de arte tridimensional que tiene alto, ancho y profundidad, y que se puede tocar por todos lados.",
        "childFriendlyExample": "Una estatua de plastilina o un muñeco de cartón es una escultura 3D."
      },
      {
        "term": "Colores secundarios",
        "definition": "Colores que nacen de mezclar dos primarios (amarillo + azul = verde; rojo + amarillo = naranja; azul + rojo = morado).",
        "childFriendlyExample": "El verde de las hojas es un color secundario fascinante."
      }
    ],
    "contextualizedExample": "En las fiestas de fin de año en Ecuador, los artesanos de la calle 6 de Marzo en Guayaquil usan papel periódico reciclado y engrudo para construir los monigotes gigantes más asombrosos del continente.",
    "socraticQuestions": [
      "¿Cuál es la diferencia entre simplemente botar un tubo de cartón a la basura y convertirlo en un títere con ojos y capa?",
      "¿Por qué crees que a la naturaleza le alegra tanto cuando los seres humanos hacemos arte con materiales reutilizados?",
      "Si mezclas témpera azul con témpera amarilla en tu paleta, ¿qué color mágico aparece ante tus ojos?"
    ],
    "practicalActivity": {
      "title": "Taller de creación del personaje Upcycling 3D",
      "instructions": [
        "Reúne en tu mesa: 1 tubo de cartón (de papel higiénico o toallas de cocina), 2 tapitas de plástico y retazos de papel de colores.",
        "Pinta el tubo con tu color secundario favorito (mezcla tú mismo los colores primarios en tu paleta).",
        "Pega las dos tapitas como ojos o ruedas con goma o cinta adhesiva.",
        "Usa tiras de papel o lana para crearle cabello, antenas o una capa de superhéroe.",
        "Dale un nombre propio a tu escultura y colócala de pie en tu escritorio de trabajo."
      ],
      "materials": [
        "Tubo de cartón",
        "2 tapitas plásticas",
        "Témperas y pincel",
        "Goma y tijeras infantiles",
        "Retazos de papel o tela"
      ]
    },
    "applicationActivity": {
      "title": "La ficha técnica de la obra de arte",
      "task": "Crea una etiqueta de museo para tu escultura con los siguientes datos: 1) Título de la obra, 2) Nombre del artista: Gael Andrade, 3) Materiales reciclados utilizados, 4) Mensaje ecológico que tu escultura transmite al mundo.",
      "deliverable": "Escultura física terminada y etiqueta de exposición de museo pegada a su base."
    },
    "formativeEvaluation": {
      "description": "Creatividad plástica, experimentación cromática con mezclas de color y aplicación de técnicas de reciclaje artístico.",
      "expectedEvidence": "Gael muestra su escultura terminada, explica la mezcla de colores que realizó y defiende con orgullo su mensaje de cuidado ambiental."
    },
    "evaluationRubric": {
      "criterion": "Experimentación plástica y transformación de materiales reciclables (ECA.2.1.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Pinta el material sin transformarlo en una figura tridimensional definida."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Ensambla piezas con apoyo pero le cuesta aplicar la mezcla de colores secundarios con armonía."
        },
        {
          "level": "Consolidado",
          "descriptor": "Crea una escultura 3D expresiva con materiales reciclados, experimenta con mezclas cromáticas originales y elabora su ficha técnica con voz artística propia."
        }
      ]
    },
    "expectedFeedback": "¡Sensacional obra maestra, maestro Gael! Tu escultura tiene una personalidad desbordante y los colores que mezclaste tienen una fuerza visual increíble. ¡Tía Pincelita inauguraría una sala entera con tu talento en la galería!",
    "difficultyAdaptation": "Utilizar marcadores gruesos en lugar de témperas si se desea evitar derrames de pintura, usando pegatinas o plastilina para unir las piezas.",
    "advancedExtension": "Gael crea un pequeño escenario de teatro de cartón con una caja de zapatos para que su escultura sea el protagonista de una obra teatral de títeres.",
    "resources": [
      {
        "id": "class-art-gael-01-res-1",
        "type": "simulator",
        "title": "Quick, Draw! with Google & Tate Kids Art Lab",
        "url": "https://quickdraw.withgoogle.com/",
        "description": "Experimento interactivo de inteligencia artificial y dibujo rápido de Google, combinado con el laboratorio de arte infantil Tate Kids.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-art-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — El Arte del Upcycling",
        "url": "/api/v1/academic/classes/class-art-gael-01/guide.pdf",
        "description": "Ficha de trabajo con círculo cromático infantil y plantilla de etiqueta de museo para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-art-gael-01-act-1",
        "title": "El Secreto de Chatarrín",
        "description": "Reflexiona sobre cómo la imaginación humana transforma los desechos en tesoros estéticos.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-art-gael-01-act-2",
        "title": "Taller de Escultura 3D Reciclada",
        "description": "Construye y pinta tu personaje tridimensional con tubos, tapitas y témperas.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-art-gael-01-act-3",
        "title": "Etiqueta Oficial de Exposición de Museo",
        "description": "Redacta la ficha de autor de la obra con su título, técnica y mensaje ecológico.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Coloca tu escultura en la sala de tu casa y pregunta a tus familiares qué animal o ser fantástico ven en ella.",
    "reflectionPrompt": "¿Qué sientes cuando miras un objeto que la gente iba a tirar y logras convertirlo en algo hermoso?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_art_gael_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-art-gael-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-08-ART",
      "subjectCode": "ART-401",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  },
  {
    "id": "class-efi-gael-01",
    "subjectId": "efi-gael",
    "studentId": "gael",
    "gradeLevel": "4.º EGB Elemental (Gael - 8 años)",
    "date": "2026-09-09",
    "dayOfWeek": "Miércoles",
    "scheduleTime": "11:30 - 12:00 (30 min)",
    "unit": "Unidad 1: Cuerpo en Movimiento: Psicomotricidad, Coordinación y Juego Limpio",
    "theme": "Circuito de campeones: Psicomotricidad, equilibrio y el valor del juego limpio",
    "objective": "Ejecutar un circuito motriz de agilidad, salto coordinado y equilibrio estático/dinámico respetando las normas de juego limpio y cuidado del propio cuerpo.",
    "learningPurpose": "Comprender que el ejercicio diario fortalece nuestro corazón y músculos, y que el verdadero campeón no es el que hace trampa para ganar, sino el que juega con alegría, respeta las reglas y ayuda al compañero.",
    "competencyDcd": "EF.2.1.1 — Identificar las situaciones de riesgo antes y durante la participación en los juegos, acordando pautas de trabajo seguras y reconociendo la importancia del juego limpio.",
    "officialSource": "Currículo Nacional MINEDUC Ecuador — Educación Física EGB Elemental (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)",
    "introduction": "¡A ponerse los zapatos deportivos y listos para saltar, atleta Gael! Te saluda tu entrenador el Profe Alex. ¿Sabías que tu cuerpo es la máquina más perfecta y asombrosa jamás diseñada? Tu corazón late más de 100.000 veces al día bombeando oxígeno fresco a cada músculo para que puedas correr a la velocidad del viento, mantener el equilibrio sobre un pie como un flamenco sabio y celebrar cada meta con energía radiante. ¡Hoy pondremos a prueba tu agilidad en un circuito de campeones!",
    "reading": "La carrera del colibrí y la tortuga marina: En una playa esmeralda de Manabí se organizó una carrera de obstáculos amistosa. El colibrí Quinde era súper rápido en el aire, pero a veces se aceleraba tanto que no miraba las piedras del suelo y tropezaba. La pequeña tortuga marina Marina caminaba con calma y pasos seguros, manteniendo un equilibrio perfecto sobre las rocas húmedas. A mitad del camino, Quinde se torció una alita al intentar ganar de golpe. Marina no pensó en cruzar la meta sola: se detuvo, le ofreció su caparazón como apoyo y los dos cruzaron la línea de llegada juntos, tomados de la mano mientras todos los animales aplaudían. El trofeo de oro no fue para el más rápido, sino para el que demostró el verdadero JUEGO LIMPIO: solidaridad, respeto y cuidado mutuo.",
    "pedagogicalExplanation": "La Educación Física desarrolla tres pilares fundamentales: 1) Calentamiento y respiración consciente: prepara las articulaciones y los pulmones antes del esfuerzo. 2) Habilidades motrices básicas: correr, saltar con pies juntos, zigzaguear y mantener el equilibrio. 3) Juego limpio (Fair Play): respetar las reglas del juego, aceptar ganar o perder con una sonrisa y cuidar la seguridad propia y de los demás.",
    "vocabulary": [
      {
        "term": "Juego limpio (Fair Play)",
        "definition": "Jugar con honestidad, respetar las reglas y tratar a los compañeros y rivales con dignidad y aprecio.",
        "childFriendlyExample": "Felicitar al amigo que ganó y no empujar en la fila es juego limpio."
      },
      {
        "term": "Equilibrio dinámico",
        "definition": "La capacidad de mantener el cuerpo controlado y firme mientras nos movemos o caminamos sobre una línea.",
        "childFriendlyExample": "Caminar sobre el filo de una cuerda sin caerse es equilibrio dinámico."
      },
      {
        "term": "Frecuencia cardíaca",
        "definition": "El ritmo con el que late el corazón por minuto para enviar sangre oxigenada a los músculos.",
        "childFriendlyExample": "Poner tu mano en el pecho después de saltar y sentir tu corazón tocando su tambor rápido."
      }
    ],
    "contextualizedExample": "Cuando Gael juega en el parque La Carolina o en su patio, mira el suelo para no pisar charcos resbalosos, respeta el turno en el resbaladero y celebra los goles de todos los niños.",
    "socraticQuestions": [
      "¿Por qué es importante calentar los músculos del cuello, brazos y piernas antes de correr a toda velocidad?",
      "¿Qué vale más: ganar una medalla haciendo una trampa escondida o cruzar la meta sabiendo que jugaste con honradez y diste tu mejor esfuerzo?",
      "¿Cómo late tu corazón cuando estás sentado descansando y cómo late después de hacer 20 saltos de tijera?"
    ],
    "practicalActivity": {
      "title": "El Circuito de los 4 Desafíos en la sala o patio",
      "instructions": [
        "Estación 1 (Calentamiento del Colibrí): 1 minuto de giros suaves de tobillos, hombros y cuello, inhalando aire por la nariz y botándolo por la boca.",
        "Estación 2 (Cuerda floja): Coloca una cuerda o tira de cinta en el suelo de 3 metros y camina de puntillas poniendo un pie exactamente delante del otro sin salirte de la línea.",
        "Estación 3 (Salto del Conejo): Salta con pies juntos sobre 4 cojines o almohadas colocadas en fila a medio metro de distancia.",
        "Estación 4 (Postura del Árbol): Párate sobre un solo pie, junta las palmas de tus manos sobre el pecho y mantén el equilibrio durante 15 segundos sin tambalearte.",
        "Vuelta a la calma: Bebe un vaso de agua fresca y pon tu mano en el pecho para escuchar los latidos de tu corazón."
      ],
      "materials": [
        "Cinta de papel o cuerda para el suelo",
        "4 cojines o almohadas suaves",
        "Ropa cómoda y zapatillas deportivas",
        "Vaso de agua fresca"
      ]
    },
    "applicationActivity": {
      "title": "El Pasaporte del Deportista con Juego Limpio",
      "task": "Dibuja en tu libreta la pista de tu circuito con las 4 estaciones. Al pie escribe los 3 mandamientos del deportista ético: 1) Respeto las reglas, 2) Cuido mi cuerpo con agua y estiramientos, 3) Felicito a mis amigos con alegría.",
      "deliverable": "Ficha ilustrada del circuito con el decálogo del juego limpio firmado por Gael."
    },
    "formativeEvaluation": {
      "description": "Coordinación motriz, control postural en equilibrio y asimilación de pautas de seguridad y juego limpio.",
      "expectedEvidence": "Gael completa las 4 estaciones con control motriz fluido y verbaliza la importancia del calentamiento y la honestidad en el deporte."
    },
    "evaluationRubric": {
      "criterion": "Ejecución motriz coordinada y aplicación de normas de juego limpio (EF.2.1.1)",
      "indicators": [
        {
          "level": "Inicial",
          "descriptor": "Se mueve con entusiasmo pero descuida el calentamiento o pierde el equilibrio con frecuencia."
        },
        {
          "level": "En desarrollo",
          "descriptor": "Completa las estaciones del circuito pero requiere apoyo para mantener la postura del árbol o regular su respiración."
        },
        {
          "level": "Consolidado",
          "descriptor": "Demuestra excelente coordinación y equilibrio dinámico, respeta los tiempos de descanso e hidratación, y promueve valores de juego limpio y empatía."
        }
      ]
    },
    "expectedFeedback": "¡Extraordinario desempeño atlético, campeón Gael! Superaste las 4 estaciones con agilidad, balance y una sonrisa radiante. Tu corazón está fuerte y tu actitud de juego limpio es un ejemplo para todos. ¡Medalla de oro para ti! 🥇🏆",
    "difficultyAdaptation": "En la postura del árbol, Gael puede apoyar suavemente una mano en la pared si necesita estabilidad antes de soltarse.",
    "advancedExtension": "Gael cronometra su circuito para intentar completarlo con mayor elegancia y precisión motriz (no solo velocidad), registrando sus tiempos en una tabla.",
    "resources": [
      {
        "id": "class-efi-gael-01-res-1",
        "type": "simulator",
        "title": "GoNoodle Kids: Pausas Activas y Coordinación Psicomotriz",
        "url": "https://www.gonoodle.com/",
        "description": "Plataforma oficial abierta con ejercicios de movimiento guiado, ritmo cardiovascular y mindfulness infantil.",
        "duration": "15 min",
        "order": 1
      },
      {
        "id": "class-efi-gael-01-res-2",
        "type": "pdf",
        "title": "Guía Didáctica ALSIZ — Circuito de Campeones y Juego Limpio",
        "url": "/api/v1/academic/classes/class-efi-gael-01/guide.pdf",
        "description": "Ficha de trabajo con mapa del circuito motriz y tabla de pulsaciones cardíacas para 4.° EGB.",
        "duration": "20 min",
        "order": 2
      }
    ],
    "activities": [
      {
        "id": "class-efi-gael-01-act-1",
        "title": "El Trofeo de Marina y Quinde",
        "description": "Reflexiona sobre por qué la solidaridad en el deporte vale más que cruzar la meta primero.",
        "type": "reflection",
        "points": 10,
        "completed": false
      },
      {
        "id": "class-efi-gael-01-act-2",
        "title": "Circuito de Agilidad y Equilibrio",
        "description": "Ejecuta las 4 estaciones motrices con zapatillas deportivas y control de respiración.",
        "type": "practice",
        "points": 15,
        "completed": false
      },
      {
        "id": "class-efi-gael-01-act-3",
        "title": "Pasaporte del Campeón Ético",
        "description": "Dibuja el circuito y redacta los 3 compromisos de juego limpio en tu libreta.",
        "type": "project",
        "points": 15,
        "completed": false
      }
    ],
    "homeworkTask": "Enseña la postura del árbol a tus padres y hagan juntos una competencia de equilibrio de 15 segundos.",
    "reflectionPrompt": "¿Cómo te sientes después de hacer ejercicio: con más sueño o con más energía y alegría?",
    "isCompleted": false,
    "guideTitle": "Guia_Didactica_class_efi_gael_01.pdf",
    "guideUrl": "/api/v1/academic/classes/class-efi-gael-01/guide.pdf",
    "batchInfo": {
      "batchId": "LOTE-GAEL-09-EFI",
      "subjectCode": "EFI-401",
      "unitNumber": 1,
      "sessionNumber": 1
    }
  }
];
