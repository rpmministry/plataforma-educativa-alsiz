import { CurriculumLote } from './lote1-len';

export const LOTE_08_ART: CurriculumLote = {
  loteId: 'LOTE-GAEL-08-ART',
  loteNumber: 8,
  subjectCode: 'ART-401',
  subjectName: 'Educación Cultural y Artística (ECA)',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unidad 1: Pequeños Creadores: El Arte del Reciclaje y la Magia del Color',
  unitNumber: 1,
  classesCount: 1,
  classes: [
    {
      id: 'class-art-gael-01',
      subjectId: 'art-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-08',
      dayOfWeek: 'Martes',
      scheduleTime: '11:30 - 12:00 (30 min)',
      unit: 'Unidad 1: Pequeños Creadores: El Arte del Reciclaje y la Magia del Color',
      theme: 'El arte del Upcycling: De cartón y botellas a esculturas del futuro',
      objective: 'Transformar materiales reciclables y de desecho en una escultura o títere expresivo aplicando teoría del color y equilibrio visual.',
      learningPurpose: 'Desarrollar la mirada artística y ecológica para descubrir la belleza oculta y el potencial creador en lo que otros consideran simple basura.',
      competencyDcd: 'ECA.2.1.1 — Experimentar con las posibilidades del color y del gesto espontáneo al plasmar visualmente historias y objetos con materiales reciclables.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Educación Cultural y Artística EGB Elemental (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Hola, gran artista Gael! Te da la bienvenida tu taller de Arte con la Tía Pincelita. ¿Sabías que los verdaderos magos del arte no necesitan comprar cosas caras en tiendas lujosas? Un verdadero artista mira un tubo de cartón de papel higiénico, una tapa de botella plástica o una cajita de cereal vacía y ve... ¡el cuerpo de un dragón andino, las turbinas de un cohete espacial o la cabeza de un robot guardián! Ese superpoder se llama UPCYCLING: convertir desechos en obras de arte valiosas y hermosas.',
      reading: 'El nacimiento de Chatarrín el Escultor: En un taller luminoso frente al río Guayas, una niña llamada Sofía y su amigo Gael encontraron una caja llena de objetos que iban a ir al basurero: tubos de cartón, tapitas de colores, lana sobrante y botones viejos. En lugar de botarlos, se sentaron en el suelo y comenzaron a jugar. El tubo de cartón se convirtió en el torso fuerte de un personaje, dos tapitas rojas fueron sus ojos brillantes, unos sorbetes de papel formaron sus brazos articulados y una cáscara de nuez sirvió como un elegante sombrero. Pintaron su cuerpo con témperas brillantes mezclando amarillo y azul para obtener un verde esmeralda deslumbrante. Cuando terminaron, bautizaron a su creación como "Chatarrín", el guardián ecológico del río. ¡Habían creado una escultura única en el mundo!',
      pedagogicalExplanation: 'El "Upcycling" (o suprarreciclaje) en el arte consiste en tomar materiales que ya cumplieron su función original y reinventarlos con creatividad para darles un valor estético mucho mayor. Al pintar sobre materiales reciclados, exploramos la teoría del color: los colores primarios (rojo, amarillo y azul) se combinan para crear los secundarios (verde, naranja y morado), logrando contrastes visuales alegres y armoniosos.',
      vocabulary: [
        { term: 'Upcycling (Suprarreciclaje)', definition: 'Transformar materiales reciclables o desechados en objetos artísticos o utilitarios de mayor valor y belleza.', childFriendlyExample: 'Hacer un robot con cajas vacías de medicina es hacer upcycling.' },
        { term: 'Escultura', definition: 'Obra de arte tridimensional que tiene alto, ancho y profundidad, y que se puede tocar por todos lados.', childFriendlyExample: 'Una estatua de plastilina o un muñeco de cartón es una escultura 3D.' },
        { term: 'Colores secundarios', definition: 'Colores que nacen de mezclar dos primarios (amarillo + azul = verde; rojo + amarillo = naranja; azul + rojo = morado).', childFriendlyExample: 'El verde de las hojas es un color secundario fascinante.' }
      ],
      contextualizedExample: 'En las fiestas de fin de año en Ecuador, los artesanos de la calle 6 de Marzo en Guayaquil usan papel periódico reciclado y engrudo para construir los monigotes gigantes más asombrosos del continente.',
      socraticQuestions: [
        '¿Cuál es la diferencia entre simplemente botar un tubo de cartón a la basura y convertirlo en un títere con ojos y capa?',
        '¿Por qué crees que a la naturaleza le alegra tanto cuando los seres humanos hacemos arte con materiales reutilizados?',
        'Si mezclas témpera azul con témpera amarilla en tu paleta, ¿qué color mágico aparece ante tus ojos?'
      ],
      practicalActivity: {
        title: 'Taller de creación del personaje Upcycling 3D',
        instructions: [
          'Reúne en tu mesa: 1 tubo de cartón (de papel higiénico o toallas de cocina), 2 tapitas de plástico y retazos de papel de colores.',
          'Pinta el tubo con tu color secundario favorito (mezcla tú mismo los colores primarios en tu paleta).',
          'Pega las dos tapitas como ojos o ruedas con goma o cinta adhesiva.',
          'Usa tiras de papel o lana para crearle cabello, antenas o una capa de superhéroe.',
          'Dale un nombre propio a tu escultura y colócala de pie en tu escritorio de trabajo.'
        ],
        materials: ['Tubo de cartón', '2 tapitas plásticas', 'Témperas y pincel', 'Goma y tijeras infantiles', 'Retazos de papel o tela']
      },
      applicationActivity: {
        title: 'La ficha técnica de la obra de arte',
        task: 'Crea una etiqueta de museo para tu escultura con los siguientes datos: 1) Título de la obra, 2) Nombre del artista: Gael Andrade, 3) Materiales reciclados utilizados, 4) Mensaje ecológico que tu escultura transmite al mundo.',
        deliverable: 'Escultura física terminada y etiqueta de exposición de museo pegada a su base.'
      },
      formativeEvaluation: {
        description: 'Creatividad plástica, experimentación cromática con mezclas de color y aplicación de técnicas de reciclaje artístico.',
        expectedEvidence: 'Gael muestra su escultura terminada, explica la mezcla de colores que realizó y defiende con orgullo su mensaje de cuidado ambiental.'
      },
      evaluationRubric: {
        criterion: 'Experimentación plástica y transformación de materiales reciclables (ECA.2.1.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Pinta el material sin transformarlo en una figura tridimensional definida.' },
          { level: 'En desarrollo', descriptor: 'Ensambla piezas con apoyo pero le cuesta aplicar la mezcla de colores secundarios con armonía.' },
          { level: 'Consolidado', descriptor: 'Crea una escultura 3D expresiva con materiales reciclados, experimenta con mezclas cromáticas originales y elabora su ficha técnica con voz artística propia.' }
        ]
      },
      expectedFeedback: '¡Sensacional obra maestra, maestro Gael! Tu escultura tiene una personalidad desbordante y los colores que mezclaste tienen una fuerza visual increíble. ¡Tía Pincelita inauguraría una sala entera con tu talento en la galería!',
      difficultyAdaptation: 'Utilizar marcadores gruesos en lugar de témperas si se desea evitar derrames de pintura, usando pegatinas o plastilina para unir las piezas.',
      advancedExtension: 'Gael crea un pequeño escenario de teatro de cartón con una caja de zapatos para que su escultura sea el protagonista de una obra teatral de títeres.',
      resources: [
        {
          id: 'class-art-gael-01-res-1',
          type: 'simulator',
          title: 'Quick, Draw! with Google & Tate Kids Art Lab',
          url: 'https://quickdraw.withgoogle.com/',
          description: 'Experimento interactivo de inteligencia artificial y dibujo rápido de Google, combinado con el laboratorio de arte infantil Tate Kids.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-art-gael-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — El Arte del Upcycling',
          url: '/api/v1/academic/classes/class-art-gael-01/guide.pdf',
          description: 'Ficha de trabajo con círculo cromático infantil y plantilla de etiqueta de museo para 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-art-gael-01-act-1',
          title: 'El Secreto de Chatarrín',
          description: 'Reflexiona sobre cómo la imaginación humana transforma los desechos en tesoros estéticos.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-art-gael-01-act-2',
          title: 'Taller de Escultura 3D Reciclada',
          description: 'Construye y pinta tu personaje tridimensional con tubos, tapitas y témperas.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-art-gael-01-act-3',
          title: 'Etiqueta Oficial de Exposición de Museo',
          description: 'Redacta la ficha de autor de la obra con su título, técnica y mensaje ecológico.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Coloca tu escultura en la sala de tu casa y pregunta a tus familiares qué animal o ser fantástico ven en ella.',
      reflectionPrompt: '¿Qué sientes cuando miras un objeto que la gente iba a tirar y logras convertirlo en algo hermoso?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_art_gael_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-art-gael-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-08-ART', subjectCode: 'ART-401', unitNumber: 1, sessionNumber: 1 }
    }
  ]
};

