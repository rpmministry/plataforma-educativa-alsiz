import { AvrilCurriculumLote } from './lote1-len';

export const AVRIL_LOTE_10_ART: AvrilCurriculumLote = {
  loteId: 'LOTE-AVRIL-10-ART',
  loteNumber: 10,
  subjectCode: 'ART-801',
  subjectName: 'Arte (ECA)',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unidad 1: Geometría Visual y Composición: Perspectiva y la Proporción Áurea',
  unitNumber: 1,
  classesCount: 1,
  classes: [
    {
      id: 'class-art-avril-01',
      subjectId: 'art-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-08',
      dayOfWeek: 'Martes',
      scheduleTime: '11:30 - 12:00 (30 min)',
      unit: 'Unidad 1: Geometría Visual y Composición: Perspectiva y la Proporción Áurea',
      theme: 'La perspectiva cónica con punto de fuga y la divina proporción en las artes plásticas',
      objective: 'Analizar los principios geométricos de la perspectiva lineal renacentista (línea de horizonte, punto de fuga y líneas de fuga) y la proporción áurea, aplicándolos en una composición plástica bidimensional con ilusión de profundidad espacial.',
      learningPurpose: 'Comprender que el arte no está reñido con la ciencia exacta, sino que los grandes maestros renacentistas revolucionaron la pintura al integrar la óptica y la geometría euclidiana para representar el espacio tridimensional.',
      competencyDcd: 'ECA.4.1.1 — Analizar pinturas y producciones artísticas de diversas épocas aplicando conceptos de perspectiva lineal, ritmo y equilibrio compositivo.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Educación Cultural y Artística EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Bienvenida al taller de luz y geometría, estimada Avril! Te saluda la Maestra Clara Monet. Si miras una pintura de la Edad Media, notarás que los personajes parecen flotar unos encima de otros en un plano plano y aplastado: los reyes son gigantescos y los campesinos diminutos, sin ninguna sensación de profundidad espacial. Pero en la Florencia del siglo XV, el arquitecto Filippo Brunelleschi y el polímata Leonardo da Vinci se hicieron una pregunta fascinante: "¿Cómo viaja la luz desde los objetos hasta la retina humana?". Descubrieron que las líneas paralelas en el mundo tridimensional parecen converger en un punto infinito en el horizonte. Con ese hallazgo matemático nació la PERSPECTIVA LINEAL y la PROPORCIÓN ÁUREA, transformando un lienzo plano de dos dimensiones en una ventana abierta a la realidad. ¡Hoy nos convertiremos en arquitectas de la profundidad visual!',
      reading: 'El experimento de Brunelleschi frente al Baptisterio de Florencia: En 1415, parado frente a las puertas de bronce del Baptisterio de San Juan, Filippo Brunelleschi tomó un panel de madera con una pintura exacta del edificio y le hizo un pequeño orificio en el centro. Le pidió a un transeúnte que mirara por el agujero desde la parte posterior del panel mientras sostenía un espejo frente a la pintura. Al mover el espejo, el observador no podía distinguir entre el reflejo del cuadro pintado y el edificio real de mármol que estaba enfrente. Brunelleschi había descubierto la ley matemática de la perspectiva cónica central: al trazar una Línea de Horizonte a la altura de los ojos del espectador y situar un Punto de Fuga al que convergen todas las líneas ortogonales, el cerebro humano interpreta automáticamente la ilusión de lejanía y volumen. Paralelamente, el fraile Luca Pacioli publicó "La Divina Proporción", ilustrado por Da Vinci, demostrando que la relación matemática $\\Phi \\approx 1.618$ (el número áureo) se encuentra en la espiral de los girasoles, en la concha del nautilus y en las obras maestras más armoniosas de la historia.',
      pedagogicalExplanation: 'La perspectiva cónica frontal se fundamenta en tres elementos geométricos estructurantes: 1) Línea de Horizonte ($LH$): línea imaginaria horizontal que representa el nivel exacto de los ojos del observador. 2) Punto de Fuga ($PF$): punto único situado sobre la $LH$ donde todas las líneas paralelas que se alejan del espectador convergen visualmente. 3) Líneas de Fuga: rectas auxiliares diagonales que conectan las esquinas de los objetos con el $PF$. La Proporción Áurea o Sección Dorada divide un segmento en dos partes de modo que la relación entre la totalidad y la parte mayor sea idéntica a la relación entre la parte mayor y la menor ($\\frac{A+B}{A} = \\frac{A}{B} \\approx 1.618$), creando una armonía visual innata que el ojo humano percibe como naturalmente bella y equilibrada.',
      vocabulary: [
        { term: 'Punto de Fuga', definition: 'Punto sobre la línea de horizonte donde convergen las líneas paralelas oblicuas proyectadas para crear la ilusión óptica de profundidad tridimensional.', childFriendlyExample: 'Si miras los rieles rectos de un tren en el campo, el punto a lo lejos donde parecen juntarse es el punto de fuga.' },
        { term: 'Línea de Horizonte', definition: 'Línea horizontal imaginaria a la altura de la mirada del espectador que separa el cielo de la tierra en una composición pictórica.', childFriendlyExample: 'Donde el mar se encuentra con el cielo al atardecer es la línea de horizonte.' },
        { term: 'Proporción Áurea (Phi)', definition: 'Constante matemática irracional (~1.618) que describe una proporción geométrica armónica omnipresente en la naturaleza y en el arte clásico.', childFriendlyExample: 'La espiral dorada de una caracola marina o el espiral de una galaxia siguen la proporción áurea.' }
      ],
      contextualizedExample: 'En la arquitectura de la Iglesia de la Compañía de Jesús en Quito, los maestros de la Escuela Quiteña utilizaron la perspectiva cónica y la proporción áurea en sus retablos barrocos dorados para generar la sensación óptica de que las bóvedas se elevan infinitamente hacia el cielo.',
      socraticQuestions: [
        '¿Por qué las pinturas medievales anteriores al Renacimiento carecían de punto de fuga, y qué representaba el tamaño de los personajes en esa época (tamaño físico vs. jerarquía religiosa)?',
        'Si te agachas hasta el suelo o te subes a la cima de una torre, ¿qué le ocurre a la línea de horizonte de tu dibujo: sube, baja o permanece inalterada?',
        '¿Por qué crees que el cerebro humano encuentra más agradable a la vista una fotografía o cuadro compuesto según la regla de los tercios o la proporción áurea que uno donde todo está cortado simétricamente por la mitad?'
      ],
      practicalActivity: {
        title: 'Taller Geométrico de Perspectiva: El Corredor Renacentista en 1 Punto de Fuga',
        instructions: [
          'En una lámina de dibujo técnico, traza con regla una Línea de Horizonte ($LH$) horizontal en la mitad exacta del papel.',
          'Marca un Punto de Fuga ($PF$) nítido en el centro de la $LH$.',
          'Traza 4 líneas de fuga diagonales desde el $PF$ hacia las cuatro esquinas de la lámina (formando techo, piso y paredes de un pasillo o biblioteca).',
          'Dibuja un piso ajedrezado: traza líneas radiales desde el $PF$ y corta con líneas horizontales cuya distancia se reduzca progresivamente a medida que se acercan al horizonte.',
          'Dibuja dos puertas o cuadros en las paredes laterales: uno en primer plano y otro cerca del horizonte, cuidando que sus alturas sigan las líneas de fuga.',
          'Aplica técnica de claroscuro (sombreado con lápiz 2B o carboncillo) para intensificar el volumen y la luz proyectada.'
        ],
        materials: ['Lámina de dibujo formato A4', 'Regla de 30 cm y escuadra', 'Lápiz HB (líneas guía) y 2B (sombras)', 'Borrador de precisión']
      },
      applicationActivity: {
        title: 'Análisis Compositivo de "La Escuela de Atenas" de Rafael Sanzio',
        task: 'Observa la reproducción digital en alta resolución de "La Escuela de Atenas" de Rafael. En una fotografía o copia impresa del cuadro, traza con rotulador rojo las líneas de fuga de la bóveda arquitectónica y ubica con precisión milimétrica el punto de fuga principal (descubrirás que coincide con el pecho de Platón y Aristóteles). Redacta un párrafo explicando cómo el pintor utilizó la geometría para convertir a los dos filósofos en el centro gravitatorio visual y conceptual de la obra.',
        deliverable: 'Lámina analítica con trazado geométrico sobrepuesto y ficha de apreciación estética (1 página).'
      },
      formativeEvaluation: {
        description: 'Comprensión de los elementos de la perspectiva cónica, precisión técnica en el trazado con instrumentos geométricos y apreciación estética renacentista.',
        expectedEvidence: 'Avril construye una perspectiva de un punto de fuga geométricamente consistente, graduando la escala de los objetos en función de la distancia al horizonte.'
      },
      evaluationRubric: {
        criterion: 'Aplicación de perspectiva lineal y proporción compositiva (ECA.4.1.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Dibuja sin línea de horizonte ni punto de fuga definido, manteniendo objetos fuera de escala sin ilusión de profundidad.' },
          { level: 'En desarrollo', descriptor: 'Traza la línea de horizonte y el punto de fuga pero las líneas diagonales no convergen con exactitud o la escala horizontal es irregular.' },
          { level: 'Consolidado', descriptor: 'Ejecuta una perspectiva cónica impecable con regla y escuadra, gradúa la escala espacial con rigor matemático, aplica claroscuro y fundamenta el uso simbólico del punto de fuga.' }
        ]
      },
      expectedFeedback: 'Una obra de asombrosa precisión y sensibilidad plástica, Avril. Has unido la geometría de Brunelleschi con la elegancia compositiva de Da Vinci. Tu dibujo no solo tiene profundidad visual, sino una armonía que cautiva la mirada.',
      difficultyAdaptation: 'Proporcionar una plantilla con la línea de horizonte y el punto de fuga premarcados y líneas guía punteadas para orientar las primeras diagonales.',
      advancedExtension: 'Avril investiga la "perspectiva oblicua de dos puntos de fuga" ($PF_1$ y $PF_2$) y dibuja un edificio o cubo visto desde una de sus esquinas angulares.',
      resources: [
        {
          id: 'class-art-avril-01-res-1',
          type: 'simulator',
          title: 'Google Arts & Culture — Galería de los Uffizi y Perspectiva Renacentista',
          url: 'https://artsandculture.google.com/partner/uffizi-gallery',
          description: 'Recorrido interactivo en ultra alta resolución por las obras maestras de Florencia con herramientas de zoom para examinar líneas de fuga.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-art-avril-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Geometría Visual, Perspectiva y Proporción Áurea',
          url: '/api/v1/academic/classes/class-art-avril-01/guide.pdf',
          description: 'Manual de dibujo artístico con plantillas de cuadrículas perspectrónicas, el espiral de Fibonacci y ejercicios de claroscuro.',
          duration: '15 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-art-avril-01-act-1',
          title: 'El Espejo de Brunelleschi',
          description: 'Lee el experimento renacentista y analiza la relación entre la ciencia óptica y la pintura.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-art-avril-01-act-2',
          title: 'Taller del Pasillo Renacentista',
          description: 'Dibuja la lámina en perspectiva cónica central aplicando instrumentos de precisión geométrica.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-art-avril-01-act-3',
          title: 'Análisis de "La Escuela de Atenas"',
          description: 'Traza las líneas de fuga de la obra de Rafael e interpreta la posición central de Platón y Aristóteles.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Toma una fotografía con un teléfono o cámara desde el pasillo de tu casa o una calle recta y traza sobre ella con una app o sobre papel dónde se ubica el punto de fuga.',
      reflectionPrompt: '¿Cómo cambia tu manera de observar el mundo a tu alrededor cuando entiendes las leyes invisibles de la luz y el espacio?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_art_avril_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-art-avril-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-10-ART', subjectCode: 'ART-801', unitNumber: 1, sessionNumber: 1 }
    }
  ]
};

