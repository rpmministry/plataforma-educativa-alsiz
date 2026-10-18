import { AvrilCurriculumLote } from './lote1-len';

export const AVRIL_LOTE_11_EFI: AvrilCurriculumLote = {
  loteId: 'LOTE-AVRIL-11-EFI',
  loteNumber: 11,
  subjectCode: 'EFI-801',
  subjectName: 'Educación Física',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unidad 1: Fisiología del Movimiento y Salud Postural en la Era Digital',
  unitNumber: 1,
  classesCount: 1,
  classes: [
    {
      id: 'class-efi-avril-01',
      subjectId: 'efi-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-09',
      dayOfWeek: 'Miércoles',
      scheduleTime: '11:30 - 12:00 (30 min)',
      unit: 'Unidad 1: Fisiología del Movimiento y Salud Postural en la Era Digital',
      theme: 'Frecuencia cardíaca diana, biomecánica postural y prevención del sedentarismo',
      objective: 'Monitorear la respuesta fisiológica cardiovascular antes, durante y después del ejercicio aeróbico (frecuencia cardíaca en reposo y zona diana), aplicando rutinas de biomecánica postural y pausas activas para compensar el sedentarismo tecnológico.',
      learningPurpose: 'Comprender que el cuerpo humano está evolutivamente diseñado para el movimiento continuo y que cuidar la columna vertebral y la capacidad cardiorrespiratoria es indispensable para mantener la agudeza mental y la longevidad.',
      competencyDcd: 'EF.4.1.1 — Participar en diferentes prácticas corporales reconociendo el esfuerzo físico, la frecuencia cardíaca y adoptando posturas ergonómicas para cuidar la salud integral.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Educación Física EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡En marcha con energía, querida Avril! Te saluda tu entrenador Mateo. En nuestra era contemporánea, pasamos horas frente a pantallas de computadoras, tablets y libros. Si no somos conscientes de nuestra postura, el cuello se proyecta hacia adelante (el llamado síndrome de "Text Neck" o cuello de texto), los hombros se encorvan hacia adentro y la circulación sanguínea se vuelve perezosa. La Organización Mundial de la Salud (OMS) advierte que el sedentarismo es uno de los mayores factores de riesgo para la salud del siglo XXI. Sin embargo, tu corazón es una bomba muscular incansable que late más de 100.000 veces al día. Hoy aprenderemos a tomarle el pulso a tu salud: calcularemos tu Frecuencia Cardíaca Diana, ejecutaremos ejercicios de movilidad articular y diseñaremos una estación ergonómica perfecta.',
      reading: 'La máquina cardiovascular humana y la fórmula de Karvonen: En reposo, el corazón de un joven de 12 años late entre 70 y 90 pulsaciones por minuto (ppm), bombeando aproximadamente 5 litros de sangre rica en oxígeno y nutrientes a cada rincón del cuerpo, incluyendo el cerebro. Cuando inicias una caminata rápida, saltas la cuerda o subes una cuesta andina, las células musculares demandan más trifosfato de adenosina (ATP) y oxígeno. El sistema nervioso simpático responde acelerando los latidos. Para saber si estás entrenando de manera segura y eficiente sin sobreexigirte ni quedarte en un esfuerzo inútil, la medicina deportiva utiliza la Frecuencia Cardíaca Máxima estimada ($FCM = 220 - \\text{edad}$) y la "Zona de Entrenamiento Diana" (entre el 60% y el 80% de tu capacidad máxima). En esa zona dorada, tu miocardio se fortalece, los pulmones expanden su capacidad vital y el cerebro libera endorfinas y dopamina, los neurotransmisores del bienestar, la memoria y el aprendizaje alegre.',
      pedagogicalExplanation: 'La sesión articula dos dimensiones fisiológicas: 1) Monitoreo cardiovascular: localización del pulso radial (en la base del pulgar de la muñeca) o carotídeo (en el cuello, al lado de la tráquea). Se cuentan los latidos durante 15 segundos y se multiplica por 4 para obtener las pulsaciones por minuto ($ppm$). Para Avril (12 años), su $FCM$ teórica es $220 - 12 = 208$ ppm. Su zona de entrenamiento aeróbico saludable se ubica entre $125$ y $165$ ppm. 2) Ergonomía y Biomecánica: alineación de la columna vertebral (curvatura lordótica y cifótica natural). Regla ergonómica 90-90-90: caderas a 90°, rodillas a 90° con pies apoyados en el suelo, y codos a 90° con la mirada a la altura del tercio superior de la pantalla para evitar la hiperflexión cervical.',
      vocabulary: [
        { term: 'Frecuencia Cardíaca en Reposo (FCR)', definition: 'Número de contracciones o latidos del corazón por minuto cuando una persona se encuentra en un estado de tranquilidad física y mental absoluta.', childFriendlyExample: 'Al despertar por la mañana antes de levantarte de la cama, tu pulso suele marcar entre 65 y 75 ppm.' },
        { term: 'Zona de Frecuencia Cardíaca Diana', definition: 'Rango óptimo de pulsaciones por minuto en el cual el corazón y los pulmones se entrenan y fortalecen de manera segura y eficiente sin riesgo cardiovascular.', childFriendlyExample: 'Entrenar a 140 ppm mientras saltas la cuerda te mantiene en tu zona diana perfecta.' },
        { term: 'Ergonomía Postural', definition: 'Disciplina que diseña y adapta los espacios de trabajo, estudio y posturas corporales para optimizar la salud física y prevenir lesiones osteomusculares.', childFriendlyExample: 'Ajustar la altura de tu silla para que tu espalda esté recta y tus pies apoyados en el suelo es ergonomía.' }
      ],
      contextualizedExample: 'Los atletas ecuatorianos de élite, como los marchistas andinos de Cuenca (Jefferson Pérez, Glenda Morejón), entrenan controlando rigurosamente su frecuencia cardíaca diana en la altitud de los 2.500 metros sobre el nivel del mar para maximizar su consumo de oxígeno ($VO_2$ máx).',
      socraticQuestions: [
        '¿Por qué el corazón de una persona deportista suele latir más lento en reposo (por ejemplo 55 ppm) que el de una persona sedentaria (85 ppm)? ¿Qué adaptación muscular ha ocurrido en su corazón?',
        'Si inclinas la cabeza hacia adelante 45 grados para mirar el teléfono celular, ¿cuántos kilos adicionales de presión recibe la columna cervical en comparación con una postura recta?',
        '¿Por qué realizar una "pausa activa" de estiramiento y respiración profunda cada 45 minutos de estudio mejora la concentración en materias difíciles como matemáticas o lectura analítica?'
      ],
      practicalActivity: {
        title: 'Circuito Fisiológico: Curva de Frecuencia Cardíaca y Prueba de Ruffier',
        instructions: [
          'En un espacio despejado y ventilado, prepara un cronómetro y tu libreta de educación física.',
          'Paso 1: Siéntate en calma durante 2 minutos. Mide y registra tu pulso en reposo ($P_0$) en 15 segundos y multiplica por 4.',
          'Paso 2: Realiza una rutina de calentamiento articular de cuello, hombros y caderas durante 3 minutos.',
          'Paso 3: Ejecuta 30 sentadillas rítmicas profundas o 2 minutos de salto de cuerda constante manteniendo espalda recta.',
          'Paso 4: Inmediatamente al terminar, toma tu pulso de esfuerzo máximo ($P_1$) y anótalo.',
          'Paso 5: Descansa sentado exactamente 1 minuto cronometrado y toma tu pulso de recuperación ($P_2$).',
          'Paso 6: Grafica los tres puntos en un plano cartesiano (Reposo, Esfuerzo, Recuperación) y analiza la velocidad con que tu corazón recupera la calma.'
        ],
        materials: ['Cronómetro (reloj o celular)', 'Cuerda de saltar o espacio libre', 'Cuaderno de registro fisiológico']
      },
      applicationActivity: {
        title: 'Diseño del Protocolo Ergonómico y Ficha de Pausas Activas ALSIZ',
        task: 'Audita tu espacio de estudio digital actual en casa: mide la altura de la silla, el apoyo de los pies, la distancia a la pantalla (debe ser de 50 a 60 cm) y la iluminación. Diseña una infografía ilustrada de 4 ejercicios de estiramiento ("Pausas Activas de 3 minutos"): estiramiento de trapecios y cervicales, apertura pectoral contra pared, extensión de muñecas para mecanografía y flexión de isquiotibiales.',
        deliverable: 'Ficha técnica de ergonomía y rutina de pausas activas lista para pegar junto a tu escritorio de trabajo.'
      },
      formativeEvaluation: {
        description: 'Destreza en la toma autónoma del pulso cardíaco, cálculo de zonas diana y adopción consciente de pautas ergonómicas durante el estudio.',
        expectedEvidence: 'Avril localiza el pulso radial sin titubeos, calcula su zona diana con precisión aritmética e implementa la rutina de pausas activas con técnica postural impecable.'
      },
      evaluationRubric: {
        criterion: 'Monitoreo cardiovascular, esfuerzo físico y ergonomía postural (EF.4.1.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'No logra localizar el pulso cardíaco y mantiene posturas encorvadas o de riesgo durante el ejercicio y el estudio.' },
          { level: 'En desarrollo', descriptor: 'Toma el pulso pero comete errores en la multiplicación o conoce la zona diana pero olvida aplicar las pausas posturales.' },
          { level: 'Consolidado', descriptor: 'Monitorea con precisión científica su frecuencia cardíaca en reposo y esfuerzo, interpreta su velocidad de recuperación, ejecuta posturas ergonómicas impecables y promueve la salud integral en su rutina.' }
        ]
      },
      expectedFeedback: 'Energía, técnica y conciencia corporal sobresalientes, Avril. Has conectado la fisiología médica con tu rutina diaria de estudio de forma ejemplar. Cuidar tu templo físico con disciplina y movimiento es la clave para que tu mente brillante brille con toda su plenitud.',
      difficultyAdaptation: 'Guiar la localización táctil del pulso colocando los dedos índice y medio del estudiante sobre el tendón flexor radial hasta percibir la onda pulsátil.',
      advancedExtension: 'Avril calcula su Índice de Ruffier-Dickson con la fórmula médica: $I = \\frac{(P_0 + P_1 + P_2) - 200}{10}$ y clasifica su nivel de aptitud física cardiovascular de acuerdo con la tabla biomédica estándar.',
      resources: [
        {
          id: 'class-efi-avril-01-res-1',
          type: 'simulator',
          title: 'Organización Mundial de la Salud (OMS) — Directrices sobre Actividad Física y Sedentarismo',
          url: 'https://www.who.int/es/news-room/fact-sheets/detail/physical-activity',
          description: 'Documento técnico oficial de la OMS con recomendaciones de salud cardiovascular, metabólica y postural para jóvenes de 12 a 17 años.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-efi-avril-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Fisiología del Ejercicio, Pulso y Ergonomía Digital',
          url: '/api/v1/academic/classes/class-efi-avril-01/guide.pdf',
          description: 'Manual de entrenamiento cardiorrespiratorio, tablas de frecuencia diana por edad, cartilla de pausas activas y test de Ruffier.',
          duration: '15 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-efi-avril-01-act-1',
          title: 'La Máquina Cardiovascular',
          description: 'Lee el texto fisiológico sobre el gasto cardíaco y reflexiona sobre el valor evolutivo del movimiento.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-efi-avril-01-act-2',
          title: 'Circuito y Curva del Pulso Cardíaco',
          description: 'Ejecuta el protocolo de medición en reposo, esfuerzo y recuperación graficando los resultados.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-efi-avril-01-act-3',
          title: 'Ficha de Ergonomía y Pausas Activas',
          description: 'Diseña la infografía con la auditoría de tu puesto de estudio y los 4 estiramientos compensatorios.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Enseña la rutina de las 4 pausas activas de estiramiento a un familiar que trabaje muchas horas sentado y háganla juntos durante 5 minutos.',
      reflectionPrompt: '¿Cómo te sientes física y emocionalmente cuando dedicas al menos 30 minutos al día a moverte y oxigenar tu cuerpo?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_efi_avril_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-efi-avril-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-11-EFI', subjectCode: 'EFI-801', unitNumber: 1, sessionNumber: 1 }
    }
  ]
};

