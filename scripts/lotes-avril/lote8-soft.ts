import { AvrilCurriculumLote } from './lote1-len';

export const AVRIL_LOTE_08_SOFT: AvrilCurriculumLote = {
  loteId: 'LOTE-AVRIL-08-SOFT',
  loteNumber: 8,
  subjectCode: 'SOFT-801',
  subjectName: 'Software y Programación',
  category: 'COMPLEMENTARIA_SIGLO_XXI',
  unitTitle: 'Unidad 1: Pensamiento Computacional: Algoritmia y Lógica Estructurada',
  unitNumber: 1,
  classesCount: 2,
  classes: [
    {
      id: 'class-soft-avril-01',
      subjectId: 'soft-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-09',
      dayOfWeek: 'Miércoles',
      scheduleTime: '10:00 - 10:45 (45 min)',
      unit: 'Unidad 1: Pensamiento Computacional: Algoritmia y Lógica Estructurada',
      theme: 'Descomposición de problemas y diseño de algoritmos con diagramas de flujo y pseudocódigo',
      objective: 'Descomponer un problema computacional complejo en subproblemas manejables, diseñando algoritmos deterministas mediante la simbología estandarizada de diagramas de flujo (ANSI/ISO) y pseudocódigo estructurado.',
      learningPurpose: 'Desarrollar el rigor mental del pensamiento algorítmico, comprendiendo que antes de escribir una sola línea de código en un lenguaje de programación formal, un ingeniero debe estructurar la lógica pura con claridad meridiana.',
      competencyDcd: 'CSTA.2-AP-10 — Use flowcharts and/or pseudocode to address complex problems as algorithms, decomposing them into sequential steps and decision branches.',
      officialSource: 'Currículo Complementario ALSIZ — Estándares Internacionales CSTA Computer Science Teachers Association (Grades 6-8)',
      introduction: '¡Bienvenida a la sala de máquinas del pensamiento computacional, estimada Avril! Te saluda el Ing. Alan Turing. La gente común suele creer que la informática consiste en saber pulsar botones en una pantalla o memorizar sintaxis extraña de programación. Nada más alejado de la verdad. La programación es la ciencia exacta del PENSAMIENTO ESTRUCTURADO. Una computadora es una máquina formidablemente rápida pero absolutamente literal y carente de sentido común; si le das una instrucción ambigua o desordenada, fallará catastróficamente. Por eso, en 1936 inventé el concepto teórico de la máquina universal: un sistema que ejecuta secuencias finitas de pasos lógicos inequívocos. A esa secuencia la llamamos ALGORITMO. ¡Hoy aprenderás a diseñar la arquitectura lógica de un algoritmo antes de tocar el teclado!',
      reading: 'El enigma de la tostada con mantequilla y la máquina de Turing: En una célebre lección introductoria del Instituto Tecnológico de Massachusetts (MIT), un profesor de ciencias de la computación pidió a sus estudiantes que escribieran un algoritmo infalible para "preparar una rebanada de pan tostado con mantequilla". El primer estudiante escribió: "Toma el pan, ponle mantequilla y tuéstalo". El profesor tomó una barra entera de pan con funda plástica, le arrojó un bloque entero de mantequilla con papel aluminio encima y lo metió a la tostadora, provocando una humareda. Los estudiantes se rieron, pero comprendieron la profunda lección: el cerebro humano asume cientos de pasos implícitos ("abrir la funda", "sacar una sola rebanada", "remover el papel de la mantequilla", "usar un cuchillo para esparcir"). Las computadoras no asumen absolutamente nada. Cada paso debe ser explícito, finito, determinista y ordenado en secuencia estricta. Esa precisión quirúrgica es lo que separa a un usuario pasivo de una verdadera creadora de software.',
      pedagogicalExplanation: 'El diseño algorítmico se basa en cuatro pilares del pensamiento computacional: 1) Descomposición: dividir un problema colosal en módulos independientes pequeños. 2) Reconocimiento de patrones: identificar similitudes o secuencias repetitivas. 3) Abstracción: filtrar los detalles irrelevantes y concentrarse exclusivamente en los datos esenciales. 4) Algoritmos: formular instrucciones paso a paso. Para comunicar algoritmos internacionalmente se utilizan dos herramientas canónicas: los Diagramas de Flujo (representación gráfica estandarizada: óvalo para inicio/fin, paralelogramo para entrada/salida de datos, rectángulo para proceso/operación matemática, y rombo para decisiones condicionales Sí/No) y el Pseudocódigo (lenguaje intermedio legible para humanos pero con estructuras de control formales como SI-ENTONCES-SINO y MIENTRAS).',
      vocabulary: [
        { term: 'Algoritmo', definition: 'Conjunto ordenado y finito de operaciones e instrucciones lógicas que permite hallar la solución a un problema determinado de forma determinista.', childFriendlyExample: 'Una receta de cocina paso a paso que siempre produce el mismo pastel perfecto si no te saltas ningún paso.' },
        { term: 'Pseudocódigo', definition: 'Forma de expresar los distintos pasos que va a realizar un programa de la forma más parecida a un lenguaje de programación real, pero en idioma natural.', childFriendlyExample: 'Escribir "SI edad >= 18 ENTONCES Imprimir(\"Mayor\") SINO Imprimir(\"Menor\")".' },
        { term: 'Bifurcación Condicional', definition: 'Estructura de control en un algoritmo que evalúa una condición booleana (Verdadero o Falso) y desvía el flujo de ejecución hacia uno de dos caminos posibles.', childFriendlyExample: 'El rombo de decisión: "¿El semáforo está en verde? Sí: cruzar la calle; No: esperar en la vereda".' }
      ],
      contextualizedExample: 'Un sistema automatizado de riego por goteo en un invernadero de rosas en Cayambe: El sensor mide la humedad del suelo ($H$). Algoritmo: INICIO -> Leer H -> ¿H < 30%? -> Sí: Activar electroválvula de agua durante 5 minutos -> No: Mantener electroválvula cerrada -> Esperar 15 minutos -> Volver a medir -> FIN.',
      socraticQuestions: [
        '¿Por qué decimos que un algoritmo debe ser siempre "finito"? ¿Qué peligro informático ocurre si una serie de pasos nunca llega a una instrucción de FIN?',
        '¿En qué se parece un diagrama de flujo con rombos de decisión al árbol de razonamiento que utiliza una médica para diagnosticar una enfermedad a partir de síntomas?',
        'Si un programa entrega un resultado numérico incorrecto pero la computadora no muestra ningún mensaje de error, ¿dónde estuvo la falla: en el hardware de la máquina o en la lógica del algoritmo creado por el humano?'
      ],
      practicalActivity: {
        title: 'Laboratorio de Algoritmia Visual: Diagrama de Flujo del Clasificador de Residuos',
        instructions: [
          'Abre la herramienta de diagramación abierta Flowgorithm o utiliza tu cuaderno técnico.',
          'Diseña el diagrama de flujo para un "Tacho de Basura Inteligente para 8.° EGB":',
          '  1) Símbolo de INICIO (óvalo).',
          '  2) ENTRADA DE DATOS (paralelogramo): Leer variable "tipoMaterial" ("plastico", "organico", "papel", "otro").',
          '  3) PRIMERA DECISIÓN (rombo): ¿tipoMaterial == "organico"? Sí -> Abrir compuerta verde compost; No -> Pasar a siguiente condición.',
          '  4) SEGUNDA DECISIÓN (rombo): ¿tipoMaterial == "plastico"? Sí -> Abrir compuerta azul reciclaje; No -> Depositar en compuerta gris desechos generales.',
          '  5) PROCESO (rectángulo): Incrementar contador de residuos clasificados.',
          '  6) SALIDA (paralelogramo): Mostrar mensaje "¡Gracias por cuidar el planeta!".',
          '  7) FIN (óvalo).',
          'Realiza la prueba de escritorio (traza) con tres casos de prueba diferentes para verificar que no existan callejones sin salida.'
        ],
        materials: ['Computadora con Flowgorithm o cuaderno cuadriculado', 'Regla de plantillas geométricas (óvalos, rombos)', 'Bolígrafos de colores']
      },
      applicationActivity: {
        title: 'Traducción de Diagrama de Flujo a Pseudocódigo Estructurado',
        task: 'Traduce formalmente el algoritmo del clasificador de residuos a pseudocódigo estructurado en tu cuaderno de software. Utiliza indentación (sangría) impecable de 4 espacios y las palabras clave en mayúsculas: ALGORITMO, INICIO, LEER, SI, ENTONCES, SINO, FIN_SI, ESCRIBIR, FIN_ALGORITMO.',
        deliverable: 'Código de pseudocódigo limpio con prueba de escritorio tabulada en 3 columnas (Variable de entrada, Rama ejecutada, Salida generada).'
      },
      formativeEvaluation: {
        description: 'Capacidad para descomponer problemas, utilizar la simbología estándar de diagramas de flujo y redactar pseudocódigo sin ambigüedades.',
        expectedEvidence: 'Avril dibuja diagramas de flujo sintácticamente correctos, resuelve bifurcaciones lógicas y traduce el flujo visual a pseudocódigo indentado.'
      },
      evaluationRubric: {
        criterion: 'Diseño de algoritmos, diagramas de flujo y pseudocódigo (CSTA.2-AP-10)',
        indicators: [
          { level: 'Inicial', descriptor: 'Dibuja esquemas desordenados sin usar la simbología estándar y olvida condiciones de cierre generando bucles infinitos.' },
          { level: 'En desarrollo', descriptor: 'Aplica la simbología de diagramas de flujo pero le cuesta formular condiciones booleanas compuestas o indentar el pseudocódigo.' },
          { level: 'Consolidado', descriptor: 'Descompone problemas complejos con elegancia, utiliza la norma ANSI/ISO de diagramación con precisión, ejecuta pruebas de escritorio rigurosas y escribe pseudocódigo modular impecable.' }
        ]
      },
      expectedFeedback: 'Extraordinaria precisión algorítmica, Avril. Has estructurado las ramas de decisión con la claridad mental de una ingeniera de sistemas. Tu prueba de escritorio demostró que entiendes cómo piensa una máquina antes de programarla.',
      difficultyAdaptation: 'Proporcionar bloques recortables con las figuras geométricas del diagrama para que Avril arme el flujo físicamente sobre la mesa.',
      advancedExtension: 'Avril investiga el concepto de "bucle mientras que" (While Loop) y añade al diagrama un ciclo repetitivo que permita procesar residuos de forma continua hasta que el usuario ingrese la palabra "SALIR".',
      resources: [
        {
          id: 'class-soft-avril-01-res-1',
          type: 'simulator',
          title: 'Flowgorithm — Interactive Flowchart Programming Simulator',
          url: 'http://www.flowgorithm.org/',
          description: 'Software educativo libre para diseñar y ejecutar diagramas de flujo interactivos con animación de variables en tiempo real.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-soft-avril-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Pensamiento Computacional y Algoritmia Estructurada',
          url: '/api/v1/academic/classes/class-soft-avril-01/guide.pdf',
          description: 'Manual de simbología ANSI, convenciones de pseudocódigo, ejercicios de pruebas de escritorio y rúbricas CSTA.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-soft-avril-01-act-1',
          title: 'El Algoritmo del Pan Tostado',
          description: 'Lee el experimento del MIT y analiza por qué la precisión en las instrucciones es vital para las computadoras.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-soft-avril-01-act-2',
          title: 'Diagramación del Tacho Inteligente',
          description: 'Dibuja el diagrama de flujo formal con rombos de decisión y entradas/salidas estandarizadas.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-soft-avril-01-act-3',
          title: 'Traducción a Pseudocódigo Estructurado',
          description: 'Escribe el pseudocódigo indentado con su respectiva prueba de escritorio de tres casos de prueba.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Elige una rutina matutina en casa (como cepillarse los dientes o preparar la mochila) y escribe un algoritmo de 6 pasos estrictos sin dar nada por sobreentendido.',
      reflectionPrompt: '¿Cómo te ayuda aprender a descomponer problemas informáticos a resolver dificultades y desafíos grandes en tu vida personal?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_soft_avril_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-soft-avril-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-08-SOFT', subjectCode: 'SOFT-801', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-soft-avril-02',
      subjectId: 'soft-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-11',
      dayOfWeek: 'Viernes',
      scheduleTime: '11:30 - 12:15 (45 min)',
      unit: 'Unidad 1: Pensamiento Computacional: Algoritmia y Lógica Estructurada',
      theme: 'Variables, estructuras condicionales y colecciones de datos (Arreglos/Listas)',
      objective: 'Implementar programas estructurados utilizando tipado de variables (números, cadenas, booleanos), operadores lógicos relacionales y estructuras de datos lineales (listas o arreglos indexados) para gestionar colecciones de datos dinámicas.',
      learningPurpose: 'Comprender cómo las computadoras almacenan y procesan volúmenes de información en la memoria RAM, transitando de variables aisladas a listas ordenadas capaces de almacenar bases de datos elementales.',
      competencyDcd: 'CSTA.2-AP-12 — Design and iteratively develop programs that combine control structures, including nested loops and compound conditionals, utilizing collections of data to organize and manipulate information.',
      officialSource: 'Currículo Complementario ALSIZ — Estándares Internacionales CSTA Computer Science Teachers Association (Grades 6-8)',
      introduction: '¡Feliz viernes de código y programación, Avril! Te saluda el Ing. Alan Turing. En la sesión anterior aprendiste a pensar en algoritmos; hoy aprenderemos cómo esos algoritmos manipulan la MATERIA PRIMA del universo digital: los DATOS. Imagina que la memoria de una computadora es un gigantesco casillero postal con miles de compartimentos numerados. Si guardas un solo número en un casillero, tienes una VARIABLE. Pero si necesitas guardar la lista de calificaciones de un aula entera, los nombres de 100 especies de aves de la Amazonía ecuatoriana o las canciones de tu lista de reproducción favorita, no vas a crear 100 variables individuales (`cancion1`, `cancion2`...). ¡Eso sería caótico e ineficiente! Para eso los científicos de la computación creamos las COLECCIONES o LISTAS (Arreglos). ¡Hoy dominarás el poder de las variables tipadas y los arreglos indexados!',
      reading: 'De las tarjetas perforadas a los arrays de Ada Lovelace: En el siglo XIX, una aristócrata y matemática visionaria llamada Ada Lovelace colaboró con Charles Babbage en el diseño de la "Máquina Analítica", el primer diseño conceptual de una computadora mecánica del mundo. Ada no solo comprendió cómo funcionaban los engranajes de latón, sino que escribió el primer algoritmo destinado a ser procesado por una máquina: el cálculo de los números de Bernoulli. En sus notas históricas de 1843, Ada previó que la máquina no solo procesaría números aritméticos simples, sino que podría manipular símbolos abstractos, notas musicales y colecciones de información organizada. Describió cómo una serie de tarjetas perforadas podía almacenar una tabla o lista de datos secuenciales a los que se podía acceder mediante un índice numérico. Ada Lovelace se convirtió así en la primera programadora de la historia, demostrando que la poesía y la ciencia exacta pueden fusionarse en el arte sublime del software.',
      pedagogicalExplanation: 'En programación, una VARIABLE es un espacio reservado en la memoria con un identificador único y un tipo de dato específico: 1) Entero (`int`: ej. 12); 2) Decimal/Flotante (`float`: ej. 9.75); 3) Cadena de texto (`string`: ej. "Avril"); 4) Booleano (`boolean`: `true` o `false`). Una LISTA o ARREGLO (Array) es una estructura de datos que almacena múltiples elementos del mismo tipo o variados bajo un solo nombre identificador, organizados por un ÍNDICE numérico basado en cero (Zero-based indexing): el primer elemento está en la posición `[0]`, el segundo en `[1]`, etc. Las operaciones fundamentales sobre una lista son: acceso por índice (`lista[0]`), inserción de elementos (`append`), modificación (`lista[1] = nuevoValor`) y recorrido sistemático mediante un bucle iterativo (`para cada elemento en lista`).',
      vocabulary: [
        { term: 'Arreglo / Lista (Array)', definition: 'Estructura de datos homogénea que almacena una secuencia ordenada de elementos accesibles mediante un índice numérico.', childFriendlyExample: 'Una cajita de pastillas con divisiones marcadas del lunes al domingo es como un arreglo de 7 posiciones.' },
        { term: 'Índice basado en cero (Zero-indexed)', definition: 'Convención informática estándar donde el primer elemento de una secuencia se ubica en la posición ordinal 0 y no en la 1.', childFriendlyExample: 'En la lista ["Manzana", "Pera"], "Manzana" está en el índice 0 y "Pera" en el índice 1.' },
        { term: 'Booleano', definition: 'Tipo de dato algebraico binario que solo puede adoptar uno de dos valores posibles: Verdadero (True) o Falso (False).', childFriendlyExample: 'La variable "tareaEntregada = True" indica que la tarea fue completada.' }
      ],
      contextualizedExample: 'Un catálogo digital de flora nativa del volcán Ilaló en Python/TypeScript: `especies = ["Polylepis", "Chilca", "Pumaqui", "Chuquiragua"]`. Si queremos imprimir la flor emblemática del páramo andino, llamamos a `especies[3]`, cuyo valor exacto es "Chuquiragua".',
      socraticQuestions: [
        '¿Por qué casi todos los lenguajes de programación modernos (Python, TypeScript, C++, Java) empiezan a contar los elementos de una lista desde el índice cero [0] en lugar de empezar en el uno [1]?',
        'Si tienes una lista con 5 elementos llamada `alumnos`, ¿qué ocurre si intentas consultar `alumnos[5]`? ¿Por qué se produce un temido error de "Index Out of Bounds" (Índice fuera de límites)?',
        '¿Cuál es la diferencia conceptual entre el valor que contiene una variable y el nombre o etiqueta de la variable?'
      ],
      practicalActivity: {
        title: 'Taller de Laboratorio en Replit / Python: Gestor de Inventario de Semillas Andinas',
        instructions: [
          'Abre el entorno interactivo de Python en Replit o en tu cuaderno de programación.',
          'Escribe y analiza el siguiente script estructurado:',
          '  1) Declara una lista con 4 semillas ancestrales: `semillas = ["Quinua", "Amaranto", "Chocho", "Maíz Morocho"]`.',
          '  2) Imprime el primer elemento usando su índice cero: `print("Primera semilla:", semillas[0])`.',
          '  3) Agrega una nueva semilla a la lista mediante el método append: `semillas.append("Cebada")`.',
          '  4) Modifica el segundo elemento: `semillas[1] = "Kiwicha Real"`.',
          '  5) Escribe un bucle `for` para recorrer la lista e imprimir cada semilla numerada:',
          '     `for i, semilla in enumerate(semillas):`',
          '     `    print(f"Lote #{i+1}: {semilla}")`',
          'Verifica la salida en la consola y documenta los cambios de estado en la memoria.'
        ],
        materials: ['Computadora o tablet con navegador web', 'Plataforma Replit / Python Web', 'Cuaderno de programación']
      },
      applicationActivity: {
        title: 'Mini-Programa: Validador de Calificaciones y Cálculo de Promedio',
        task: 'Diseña en pseudocódigo o código Python un programa que declare una lista de 4 notas numéricas de Avril en el trimestre: `notas = [9.5, 8.8, 10.0, 9.2]`. El programa debe sumar las 4 notas utilizando un bucle acumulador, calcular el promedio dividiendo para el tamaño de la lista (`len(notas)`), y evaluar mediante una condicional SI el promedio es mayor o igual a 9.0 para imprimir un mensaje de "¡Rendimiento Académico Sobresaliente!".',
        deliverable: 'Código fuente documentado con comentarios explicativos y captura de pantalla o transcripción de la ejecución exitosa.'
      },
      formativeEvaluation: {
        description: 'Comprensión de los tipos de datos primitivos, manejo de listas indexadas y control de flujos iterativos.',
        expectedEvidence: 'Avril implementa listas sin errores de índice, comprende la indexación en base cero y combina condicionales y bucles para manipular datos estructurados.'
      },
      evaluationRubric: {
        criterion: 'Manejo de variables, condicionales y colecciones de datos en programación (CSTA.2-AP-12)',
        indicators: [
          { level: 'Inicial', descriptor: 'Confunde tipos de datos y comete errores sistemáticos de índice fuera de rango al acceder a listas.' },
          { level: 'En desarrollo', descriptor: 'Declara listas y accede a elementos por índice pero le cuesta integrar bucles o calcular acumuladores.' },
          { level: 'Consolidado', descriptor: 'Domina los tipos de datos primitivos, manipula listas con fluidez (indexación, adición, modificación), recorre colecciones con bucles y documenta su código con comentarios profesionales.' }
        ]
      },
      expectedFeedback: 'Extraordinaria maestría en programación, Avril. Has heredado el espíritu analítico y visionario de Ada Lovelace. Tu comprensión de las listas y la indexación en base cero demuestra que estás lista para crear aplicaciones y proyectos de software de gran impacto.',
      difficultyAdaptation: 'Utilizar una tabla física cuadriculada con fichas numeradas del 0 al 4 donde Avril coloca tarjetas con palabras para simular la memoria del computador.',
      advancedExtension: 'Avril investiga qué es un "Diccionario" o "Objeto Clave-Valor" en Python/TypeScript (`{"nombre": "Quinua", "proteina": "14g"}`) y diseña una lista de diccionarios para modelar una pequeña base de datos botánica.',
      resources: [
        {
          id: 'class-soft-avril-02-res-1',
          type: 'simulator',
          title: 'Replit — Python & TypeScript Interactive Coding Environment',
          url: 'https://replit.com/',
          description: 'Entorno de desarrollo integrado en la nube para escribir, ejecutar y depurar código Python y JavaScript de forma segura.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-soft-avril-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Estructuras de Datos y Arreglos para Secundaria',
          url: '/api/v1/academic/classes/class-soft-avril-02/guide.pdf',
          description: 'Manual de referencia rápida de sintaxis, diagramas de memoria RAM, retos de listas y rúbrica de código limpio.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-soft-avril-02-act-1',
          title: 'El Legado de Ada Lovelace',
          description: 'Lee sobre la primera programadora de la historia y reflexiona sobre el poder de los algoritmos para transformar la sociedad.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-soft-avril-02-act-2',
          title: 'Laboratorio de Arreglos en Python',
          description: 'Ejecuta el script de inventario de semillas andinas y experimenta con métodos de listas e índices.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-soft-avril-02-act-3',
          title: 'Programa Validador de Calificaciones',
          description: 'Escribe el código del acumulador y cálculo de promedio con condicional de felicitación.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Escribe en tu cuaderno una lista de tus 5 libros o canciones preferidas como si fuera un arreglo de código: `misFavoritos = [...]`, y anota cuál está en el índice 0 y cuál en el 4.',
      reflectionPrompt: '¿Cómo puedes utilizar la programación y la tecnología no solo para jugar o consumir, sino para construir soluciones que ayuden a los demás?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_soft_avril_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-soft-avril-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-08-SOFT', subjectCode: 'SOFT-801', unitNumber: 1, sessionNumber: 2 }
    }
  ]
};

