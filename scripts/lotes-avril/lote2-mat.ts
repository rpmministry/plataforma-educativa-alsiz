import { AvrilCurriculumLote } from './lote1-len';

export const AVRIL_LOTE_02_MAT: AvrilCurriculumLote = {
  loteId: 'LOTE-AVRIL-02-MAT',
  loteNumber: 2,
  subjectCode: 'MAT-801',
  subjectName: 'Matemáticas',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unidad 1: Modelado Algebraico: Ecuaciones de Primer Grado y Álgebra Visual',
  unitNumber: 1,
  classesCount: 3,
  classes: [
    {
      id: 'class-mat-avril-01',
      subjectId: 'mat-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-07',
      dayOfWeek: 'Lunes',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Modelado Algebraico: Ecuaciones de Primer Grado y Álgebra Visual',
      theme: 'El lenguaje del álgebra: Variables, expresiones y el principio de la balanza en equilibrio',
      objective: 'Traducir enunciados verbales al lenguaje algebraico y resolver ecuaciones lineales de primer grado de la forma ax + b = c utilizando el modelo de balanza y propiedades de la igualdad.',
      learningPurpose: 'Comprender que el álgebra no es un conjunto de trucos mecánicos de memorización, sino un lenguaje poderoso y universal para descubrir incógnitas ocultas y modelar patrones del cosmos.',
      competencyDcd: 'M.4.1.8 — Expresar enunciados simples en lenguaje algebraico (variables, coeficientes, términos independientes) y resolver ecuaciones de primer grado con una incógnita en ℚ.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Matemática EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Bienvenida a tu cátedra de Matemáticas, apreciada Avril! Te saluda la Dra. Sophia Euler. La mayoría de las personas se asusta cuando ve letras mezcladas con números. Sin embargo, el gran matemático persa Al-Juarismi descubrió hace más de mil años que una incógnita "x" es simplemente una cajita misteriosa cuyo valor podemos deducir aplicando una ley universal: la JUSTICIA DE LA BALANZA. Una ecuación es una balanza en perfecto equilibrio. Todo lo que hagas en el platillo izquierdo (sumar, restar, multiplicar o dividir), debes hacerlo exactamente igual en el platillo derecho. ¡Hoy dominaremos este principio fundamental!',
      reading: 'El enigma del sarcófago de Alejandría: Cuenta la leyenda que en la biblioteca de Alejandría, la matemática Hipatia desafió a sus discípulos con este acertijo: "Un mercader tiene un saco de monedas de plata. Si duplica el contenido de su saco y añade 15 monedas que le regaló el emperador, obtiene exactamente la misma cantidad que si un colega le entrega 75 monedas completas. ¿Cuántas monedas tenía el mercader al principio?". Los comerciantes intentaban adivinar número por número. Hipatia sonrió, tomó una vara y trazó en la arena una sola línea: $2x + 15 = 75$. Restó 15 a ambos lados: $2x = 60$. Dividió entre 2 a ambos lados: $x = 30$. En tres segundos, el enigma quedó resuelto con precisión geométrica. ¡El álgebra había vencido a la adivinanza!',
      pedagogicalExplanation: 'Una ecuación lineal es una igualdad matemática entre dos expresiones que contiene una o más variables. Resolverla significa "despejar la incógnita": dejar a la variable $x$ completamente aislada y positiva en uno de los miembros de la igualdad. Para lograrlo, aplicamos las propiedades uniformes de la igualdad: si sumamos, restamos, multiplicamos o dividimos por el mismo número en ambos miembros, la igualdad se conserva intacta.',
      vocabulary: [
        { term: 'Variable o Incógnita', definition: 'Símbolo (comúnmente una letra como x, y, z) que representa una cantidad desconocida.', childFriendlyExample: 'En la ecuación 3x = 18, la x es la incógnita cuyo valor exacto es 6.' },
        { term: 'Coeficiente', definition: 'El factor numérico que multiplica a una variable.', childFriendlyExample: 'En el término 5x, el número 5 es el coeficiente.' },
        { term: 'Propiedad uniforme de la igualdad', definition: 'Regla matemática que establece que si se aplica la misma operación en ambos miembros de una igualdad, esta se mantiene.', childFriendlyExample: 'Restar 4 a ambos lados de x + 4 = 10 nos da directamente x = 6.' }
      ],
      contextualizedExample: 'Si un artesano de Otavalo gasta $20 en lana para confeccionar 4 bufandas idénticas y las vende obteniendo una ganancia total de $60, la ecuación que modela el precio de venta "p" de cada bufanda es $4p - 20 = 60$. Despejando: $4p = 80 \\implies p = \\$20$.',
      socraticQuestions: [
        '¿Por qué decimos comúnmente "lo que está sumando pasa al otro lado restando"? ¿Qué operación matemática real está ocurriendo debajo de ese truco mnemotécnico?',
        'Si tienes la ecuación $3x + 12 = 30$, ¿qué operación conviene realizar primero para despejar la x con mayor elegancia y menor riesgo de error aritmético?',
        '¿Cómo puedes comprobar al 100% que tu solución matemática es correcta sin necesidad de preguntarle a un profesor?'
      ],
      practicalActivity: {
        title: 'El laboratorio de la balanza virtual en GeoGebra',
        instructions: [
          'Abre el simulador interactivo de balanza algebraica en GeoGebra.',
          'Coloca en el platillo izquierdo: 3 bloques de incógnita [x] y 5 pesas de 1 kg.',
          'Coloca en el platillo derecho: 26 pesas de 1 kg.',
          'Aplica la operación "-5 pesas" en ambos platillos simultáneamente: observa cómo la balanza permanece nivelada ($3x = 21$).',
          'Aplica la operación "÷ 3" repartiendo en grupos iguales: comprueba que cada bloque [x] pesa exactamente 7 kg.',
          'Escribe en tu cuaderno el procedimiento algebraico formal paso a paso.'
        ],
        materials: ['Computadora o tablet con GeoGebra', 'Cuaderno cuadriculado', 'Lápiz y regla']
      },
      applicationActivity: {
        title: 'Modelado del presupuesto del stand escolar',
        task: 'Plantea y resuelve la ecuación del siguiente problema: Un equipo de estudiantes de 8.º EGB tiene un capital inicial de $45 y compra 6 paquetes de materiales de diseño para su proyecto. Si al final les quedan $9 en caja, ¿cuánto costó cada paquete de materiales? Comprueba tu resultado sustituyendo el valor hallado en la ecuación original.',
        deliverable: 'Resolución analítica en cuaderno con planteamiento verbal, ecuación ($6x + 9 = 45$), despeje paso a paso y comprobación formal.'
      },
      formativeEvaluation: {
        description: 'Comprensión conceptual del equilibrio algebraico y destreza en el algoritmo de despeje lineal con comprobación.',
        expectedEvidence: 'Avril explica el significado de las operaciones uniformes a ambos lados del igual y verifica su solución por sustitución numérica.'
      },
      evaluationRubric: {
        criterion: 'Traducción algebraica y resolución de ecuaciones de primer grado (M.4.1.8)',
        indicators: [
          { level: 'Inicial', descriptor: 'Intenta resolver por ensayo y error o comete fallas sistemáticas en los signos al trasponer términos.' },
          { level: 'En desarrollo', descriptor: 'Resuelve ecuaciones básicas aplicando el algoritmo pero le cuesta justificar el principio de la balanza o comprobar el resultado.' },
          { level: 'Consolidado', descriptor: 'Traduce enunciados verbales complejos al álgebra con fluidez, despeja incógnitas con rigor formal justificando cada paso por propiedades de la igualdad y verifica autónomamente sus soluciones.' }
        ]
      },
      expectedFeedback: 'Impecable rigor matemático, Avril. Tu comprensión de la balanza uniforme demuestra que entiendes la raíz profunda del álgebra y no solo un mecanismo ciego. Has resuelto el problema con la elegancia de una verdadera matemática.',
      difficultyAdaptation: 'Utilizar fichas algebraicas de colores (Algebra Tiles): fichas rectangulares verdes para x y fichas cuadradas amarillas para unidades positivas y rojas para negativas.',
      advancedExtension: 'Avril resuelve una ecuación con variables en ambos miembros: $5x - 7 = 2x + 14$, explicando la estrategia para agrupar las variables en el miembro donde el coeficiente sea positivo.',
      resources: [
        {
          id: 'class-mat-avril-01-res-1',
          type: 'simulator',
          title: 'GeoGebra: Balanza de Ecuaciones Lineales Interactiva',
          url: 'https://www.geogebra.org/m/XU9z5m9X',
          description: 'Simulador dinámico oficial de GeoGebra para experimentar visualmente con el equilibrio y las operaciones simultáneas en ambos miembros.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-mat-avril-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Modelado Algebraico y Principio de Balanza',
          url: '/api/v1/academic/classes/class-mat-avril-01/guide.pdf',
          description: 'Ficha de trabajo con desafíos socráticos, problemas de traducción verbal a simbólica y rúbrica para 8.° EGB.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-mat-avril-01-act-1',
          title: 'El Acertijo de Hipatia',
          description: 'Analiza el problema de las monedas de plata y explica por qué la traducción algebraica es más eficiente que el tanteo.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-mat-avril-01-act-2',
          title: 'Laboratorio de la Balanza GeoGebra',
          description: 'Modela la ecuación 3x + 5 = 26 en la balanza virtual y registra el procedimiento formal en tu cuaderno.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-mat-avril-01-act-3',
          title: 'Problema del Stand Escolar con Comprobación',
          description: 'Plantea, despeja y comprueba la ecuación del costo de los paquetes de materiales.',
          type: 'analysis',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Formula un acertijo algebraico cotidiano sobre las edades de tu familia o tus compras y escribe su ecuación correspondiente.',
      reflectionPrompt: '¿En qué sentido el álgebra nos enseña a buscar el equilibrio y la justicia en la resolución de problemas?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_mat_avril_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-mat-avril-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-02-MAT', subjectCode: 'MAT-801', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-mat-avril-02',
      subjectId: 'mat-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-09',
      dayOfWeek: 'Miércoles',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Modelado Algebraico: Ecuaciones de Primer Grado y Álgebra Visual',
      theme: 'Ecuaciones complejas en ℚ: Paréntesis, propiedad distributiva y coeficientes fraccionarios',
      objective: 'Resolver ecuaciones de primer grado en el conjunto de los números racionales (ℚ) que involucren signos de agrupación y coeficientes fraccionarios mediante el cálculo del mínimo común múltiplo (m.c.m.).',
      learningPurpose: 'Desarrollar precisión de cirujano matemático para manipular expresiones con fracciones y signos negativos sin cometer errores algebraicos.',
      competencyDcd: 'M.4.1.9 — Aplicar las propiedades algebraicas (distributiva, conmutativa, asociativa) para simplificar expresiones y resolver ecuaciones lineales en ℚ.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Matemática EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Hola de nuevo, Avril! Hoy daremos un salto cualitativo hacia ecuaciones más sofisticadas: aquellas donde aparecen paréntesis protectores y coeficientes fraccionarios. Muchos estudiantes tropiezan cuando ven una fracción en una ecuación; sin embargo, los matemáticos tenemos un truco maestro llamado "eliminación de denominadores": si multiplicamos la ecuación entera por el mínimo común múltiplo de todos los denominadores, ¡las fracciones desaparecen como por arte de magia y nos queda una ecuación entera limpísima! Vamos a dominar esta técnica.',
      reading: 'El algoritmo de la simplificación elegante: Consideremos la ecuación: $\\frac{2x - 1}{3} - \\frac{x + 2}{4} = 1$. Un novato intentaría sumar las fracciones sacando un denominador común algebraico pesado. Un maestro calcula el m.c.m. de los denominadores 3 y 4, que es 12. Multiplica cada término de ambos miembros por 12: $12 \\cdot \\left(\\frac{2x - 1}{3}\\right) - 12 \\cdot \\left(\\frac{x + 2}{4}\\right) = 12 \\cdot 1$. Al simplificar: $4(2x - 1) - 3(x + 2) = 12$. Aplicando la propiedad distributiva con sumo cuidado en el signo menos: $8x - 4 - 3x - 6 = 12$. Reduciendo términos semejantes: $5x - 10 = 12 \\implies 5x = 22 \\implies x = \\frac{22}{5}$. ¡Un procedimiento fluido, ordenado y sin tropiezos!',
      pedagogicalExplanation: 'La clave para resolver ecuaciones complejas en ℚ es el orden secuencial estricto: 1) Calcular el m.c.m. de todos los denominadores numéricos. 2) Multiplicar cada término por el m.c.m. para convertir la ecuación en entera. 3) Aplicar la propiedad distributiva $a(b + c) = ab + ac$, teniendo especial alerta cuando hay un signo negativo delante de un paréntesis: $-(x + 2) = -x - 2$. 4) Reducir términos semejantes en cada miembro. 5) Despejar la incógnita y simplificar la fracción resultante a su forma irreducible.',
      vocabulary: [
        { term: 'Mínimo Común Múltiplo (m.c.m.)', definition: 'El número positivo más pequeño que es múltiplo de dos o más denominadores.', childFriendlyExample: 'El m.c.m. de 3 y 4 es 12, porque 12 es el primer número que está en las tablas del 3 y del 4.' },
        { term: 'Propiedad distributiva', definition: 'Regla que establece que multiplicar un número por una suma es igual a multiplicarlo por cada sumando por separado.', childFriendlyExample: '3(x + 4) = 3x + 12.' },
        { term: 'Fracción irreducible', definition: 'Fracción cuyos numerador y denominador no tienen divisores comunes mayores que 1.', childFriendlyExample: '22/5 es irreducible porque 22 y 5 son coprimos.' }
      ],
      contextualizedExample: 'En el cálculo de mezclas agrícolas en una plantación de café en Loja, determinar la proporción exacta de fertilizante orgánico disuelto en agua requiere resolver ecuaciones con coeficientes racionales.',
      socraticQuestions: [
        '¿Por qué al multiplicar por el m.c.m. ambos miembros de la ecuación estamos seguros de que la solución final no se altera?',
        '¿Cuál es el error conceptual más frecuente que cometen los estudiantes con el signo menos en expresiones como $-(2x - 5)$?',
        'Si el resultado final es una fracción impropia como $22/5$, ¿es necesario pasarla a decimal o es preferible conservarla como número racional exacto? ¿Por qué?'
      ],
      practicalActivity: {
        title: 'Taller de despeje metódico en 4 pasos',
        instructions: [
          'Resuelve en tu cuaderno cuadriculado las siguientes dos ecuaciones con coeficientes en ℚ:',
          '1) $3(2x - 4) = 4(x + 3) - 2$.',
          '2) $\\frac{x - 1}{2} + \\frac{2x + 3}{5} = 3$.',
          'Aplica la técnica del m.c.m., resalta los signos de distribución con color rojo y realiza la comprobación numérica de la segunda ecuación.'
        ],
        materials: ['Cuaderno de matemáticas', 'Plumas de colores (rojo para signos, azul para coeficientes)', 'Calculadora para verificación final']
      },
      applicationActivity: {
        title: 'Modelado del reparto de herencia ecológica',
        task: 'Un municipio del Azuay destina una reserva natural de bosques nativos: la mitad del terreno se declara parque botánico intangible, un tercio se destina a senderos ecológicos comunitarios y las 12 hectáreas restantes se reservan para viveros de reforestación. ¿Cuál es la superficie total "T" de la reserva? Modela la ecuación $\\frac{T}{2} + \\frac{T}{3} + 12 = T$ y calcula el valor de T en hectáreas.',
        deliverable: 'Resolución completa del problema de reforestación con justificación verbal y comprobación aritmética.'
      },
      formativeEvaluation: {
        description: 'Manejo de signos algebraicos en productos distributivos y cálculo correcto del m.c.m. en ecuaciones racionales.',
        expectedEvidence: 'Avril resuelve la ecuación de la reserva ecológica obteniendo T = 72 hectáreas con procedimiento impecable.'
      },
      evaluationRubric: {
        criterion: 'Resolución de ecuaciones lineales complejas en ℚ (M.4.1.9)',
        indicators: [
          { level: 'Inicial', descriptor: 'Comete errores al aplicar la ley de signos en la distributiva o calcula incorrectamente el m.c.m.' },
          { level: 'En desarrollo', descriptor: 'Elimina denominadores pero incurre en deslices al trasponer términos negativos o al simplificar.' },
          { level: 'Consolidado', descriptor: 'Domina con absoluta fluidez la propiedad distributiva con signos negativos, el método del m.c.m. y el modelado contextualizado de problemas en ℚ.' }
        ]
      },
      expectedFeedback: 'Extraordinaria precisión operativa, Avril. Obtuviste las 72 hectáreas de la reserva natural con un orden y pulcritud matemática dignos de admiración. Los signos algebraicos están bajo tu total dominio.',
      difficultyAdaptation: 'Subrayar con color amarillo cada signo negativo antes de un paréntesis para activar una alerta visual previa a la distribución.',
      advancedExtension: 'Avril investiga ecuaciones lineales con parámetros literales: resolver $ax + b = cx + d$ para la variable $x$, asumiendo que $a \\neq c$.',
      resources: [
        {
          id: 'class-mat-avril-02-res-1',
          type: 'simulator',
          title: 'Mathigon Polypad: Baldosas Algebraicas y Ecuaciones',
          url: 'https://mathigon.org/polypad',
          description: 'Lienzo interactivo avanzado de Polypad para modelar áreas algebraicas, propiedad distributiva y simplificación de términos semejantes.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-mat-avril-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Ecuaciones con Paréntesis y Fracciones en ℚ',
          url: '/api/v1/academic/classes/class-mat-avril-02/guide.pdf',
          description: 'Ejercicios graduados con plantilla paso a paso y problemas contextualizados para 8.° EGB.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-mat-avril-02-act-1',
          title: 'Disección del Algoritmo del m.c.m.',
          description: 'Explica en un párrafo por qué multiplicar por 12 elimina los denominadores 3 y 4 simultáneamente.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-mat-avril-02-act-2',
          title: 'Taller de Despeje en 4 Pasos',
          description: 'Resuelve las dos ecuaciones con paréntesis y fracciones demostrando el control de signos.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-mat-avril-02-act-3',
          title: 'Problema de la Reserva Ecológica',
          description: 'Modela y calcula la superficie total de las 72 hectáreas con su comprobación matemática.',
          type: 'analysis',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Resuelve la ecuación $\\frac{2x - 3}{4} - \\frac{x + 1}{6} = 2$ y comprueba tu solución sustituyendo en la expresión original.',
      reflectionPrompt: '¿En qué se parece resolver una ecuación compleja a armar una estrategia paso a paso en ajedrez?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_mat_avril_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-mat-avril-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-02-MAT', subjectCode: 'MAT-801', unitNumber: 1, sessionNumber: 2 }
    },
    {
      id: 'class-mat-avril-03',
      subjectId: 'mat-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-11',
      dayOfWeek: 'Viernes',
      scheduleTime: '08:00 - 09:30 (90 min)',
      unit: 'Unidad 1: Modelado Algebraico: Ecuaciones de Primer Grado y Álgebra Visual',
      theme: 'Modelado matemático en acción: Problemas geométricos, mezclas y finanzas de proyectos',
      objective: 'Formular modelos algebraicos basados en ecuaciones de primer grado para resolver problemas complejos de optimización geométrica (perímetros, áreas) y finanzas iniciales de proyectos.',
      learningPurpose: 'Comprender que las matemáticas son la herramienta fundamental de los científicos, arquitectos y emprendedores para tomar decisiones inteligentes con base en datos.',
      competencyDcd: 'M.4.1.10 — Resolver y plantear problemas de aplicación con ecuaciones de primer grado en ℚ (geometría, mezclas, finanzas de proyectos) juzgando la validez de las soluciones obtenidas.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Matemática EGB Superior (Acuerdo MINEDUC-2023-00069-A / Reformas 2025)',
      introduction: '¡Cierre estelar de nuestro lote de Matemáticas, Avril! Hasta ahora hemos aprendido la gramática del álgebra (las reglas y las ecuaciones). Pero, ¿para qué sirve todo esto en la vida real? Un ingeniero no se despierta por la mañana con una ecuación ya escrita en la pared: el ingeniero observa un puente, mide un río, calcula los costos de construcción y es ÉL quien crea la ecuación. Hoy nos convertiremos en modeladoras matemáticas profesionales para resolver dilemas de diseño geométrico y viabilidad de proyectos.',
      reading: 'El desafío del invernadero hidropónico: Un grupo de jóvenes emprendedores en Pichincha desea construir un invernadero rectangular para cultivar frutillas ecológicas. Por limitaciones del terreno, el largo del invernadero debe medir exactamente 8 metros más que el triple de su ancho ($L = 3a + 8$). El presupuesto para la cerca perimetral alcanza para comprar exactamente 96 metros lineales de malla térmica. ¿Cuáles deben ser las dimensiones exactas (ancho y largo) del invernadero para aprovechar al máximo los 96 metros de perímetro sin pasarse ni un centímetro del presupuesto?',
      pedagogicalExplanation: 'El método de modelado matemático de George Pólya comprende 4 fases rigurosas: 1) Comprender el problema: identificar la incógnita principal y las relaciones dadas. Si el ancho es $a$, el largo es $3a + 8$. 2) Concebir un plan: recordar la fórmula geométrica del perímetro de un rectángulo: $P = 2L + 2a$. 3) Ejecutar el plan: sustituir y resolver: $2(3a + 8) + 2a = 96 \\implies 6a + 16 + 2a = 96 \\implies 8a = 80 \\implies a = 10$ metros. Por lo tanto, el largo es $L = 3(10) + 8 = 38$ metros. 4) Examinar la solución obtenida: verificar $2(38) + 2(10) = 76 + 20 = 96$ m. Las dimensiones son física y financieramente óptimas.',
      vocabulary: [
        { term: 'Modelado matemático', definition: 'El proceso de traducir un problema de la realidad física, biológica o económica a un lenguaje formal de ecuaciones.', childFriendlyExample: 'Escribir la ecuación del perímetro para diseñar el invernadero es hacer modelado matemático.' },
        { term: 'Perímetro', definition: 'La suma de las longitudes de todos los lados que delimitan una figura geométrica plana.', childFriendlyExample: 'La cerca que rodea un terreno representa su perímetro.' },
        { term: 'Juicio de validez de la solución', definition: 'Comprobar si el número obtenido tiene sentido físico en el contexto del problema real (no puede haber longitudes negativas ni personas fraccionadas).', childFriendlyExample: 'Si la longitud diera -5 metros, la solución matemática carecería de sentido físico.' }
      ],
      contextualizedExample: 'En el diseño de cajas de embalaje para exportación de flores ecuatorianas (rosas de exportación en Cayambe), los ingenieros calculan las dimensiones exactas para optimizar el espacio en los contenedores aéreos mediante ecuaciones lineales de volumen y perímetro.',
      socraticQuestions: [
        '¿Por qué una solución matemática perfectamente calculada (por ejemplo, $a = -10$) carecería por completo de validez en un problema de ingeniería física?',
        'Si el presupuesto de la cerca se redujera a la mitad (48 metros de perímetro), ¿el ancho también se reduciría exactamente a la mitad? ¿Por qué sí o por qué no?',
        '¿En qué se distingue un calculador pasivo de un verdadero modelador matemático?'
      ],
      practicalActivity: {
        title: 'Taller de modelado geométrico y financiero',
        instructions: [
          'Dibuja el plano a escala del invernadero en tu libreta con sus cotas de dimensiones: ancho = 10 m, largo = 38 m.',
          'Calcula el área total de cultivo del invernadero: $A = \\text{largo} \\times \\text{ancho} = 38 \\times 10 = 380\\text{ m}^2$.',
          'Si cada metro cuadrado produce 4 kg de frutillas por cosecha a un precio de $2.50 el kg, formula una ecuación para calcular el ingreso total proyectado de la cosecha.'
        ],
        materials: ['Libreta cuadriculada', 'Regla milimetrada', 'Calculadora']
      },
      applicationActivity: {
        title: 'Plan financiero para el Proyecto 1: Emprendimiento con Propósito',
        task: 'Formula una ecuación lineal que represente el punto de equilibrio financiero de tu proyecto trimestral: Costos Fijos ($F$) + Costos Variables unitarios ($v \\cdot q$) = Ingreso Total ($p \\cdot q$). Elige valores realistas y despeja la cantidad de productos "q" que necesitas vender para que tu emprendimiento no tenga pérdidas.',
        deliverable: 'Ficha de modelado financiero con la ecuación del punto de equilibrio resuelta y analizada en 5 líneas.'
      },
      formativeEvaluation: {
        description: 'Capacidad de traducir problemas verbales multidimensionales al álgebra, evaluar la coherencia física de los resultados y vincular las matemáticas con el emprendimiento.',
        expectedEvidence: 'Avril presenta el plano geométrico del invernadero verificado y formula la ecuación de equilibrio de su proyecto trimestral con solidez.'
      },
      evaluationRubric: {
        criterion: 'Modelado matemático y juicio crítico de soluciones en ℚ (M.4.1.10)',
        indicators: [
          { level: 'Inicial', descriptor: 'Plantea relaciones aisladas pero no logra ensamblar la ecuación general del problema.' },
          { level: 'En desarrollo', descriptor: 'Resuelve la ecuación geométrica correctamente pero omite juzgar la validez física o le cuesta formular el modelo financiero.' },
          { level: 'Consolidado', descriptor: 'Aplica el método de Pólya con destreza admirable, modela problemas geométricos y financieros complejos, evalúa críticamente la validez de los resultados y explica el impacto de las variables con elocuencia científica.' }
        ]
      },
      expectedFeedback: 'Extraordinaria maestría en modelado, Avril. Has demostrado que las matemáticas no son abstracciones inertes, sino una brújula insustituible para construir proyectos tangibles en el mundo real. Tu diseño del invernadero y tu punto de equilibrio financiero son dignos de un estudiante de bachillerato de élite.',
      difficultyAdaptation: 'Dibujar primero el rectángulo en papel y etiquetar cada uno de los 4 lados con su expresión algebraica ($3a + 8$, $a$, $3a + 8$, $a$) antes de sumar.',
      advancedExtension: 'Avril investiga qué relación entre el largo y el ancho de un rectángulo permite maximizar el área encerrada para un perímetro fijo (¡descubriendo que cuando el largo es igual al ancho, es decir un cuadrado, el área es máxima!).',
      resources: [
        {
          id: 'class-mat-avril-03-res-1',
          type: 'simulator',
          title: 'PhET Colorado: Explorador de Igualdades y Ecuaciones',
          url: 'https://phet.colorado.edu/sims/html/equality-explorer/latest/equality-explorer_es.html',
          description: 'Simulador oficial de la Universidad de Colorado para modelar variables, igualdades complejas y balances algebraicos en tiempo real.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-mat-avril-03-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Modelado Matemático de Problemas Reales',
          url: '/api/v1/academic/classes/class-mat-avril-03/guide.pdf',
          description: 'Compendio de problemas de optimización geométrica, mezclas y modelos de punto de equilibrio para 8.° EGB.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-mat-avril-03-act-1',
          title: 'Análisis del Invernadero Hidropónico',
          description: 'Aplica las 4 fases de Pólya para deducir y comprobar las dimensiones de 38 m y 10 m.',
          type: 'analysis',
          points: 10,
          completed: false
        },
        {
          id: 'class-mat-avril-03-act-2',
          title: 'Plano Geométrico y Cálculo de Rendimiento',
          description: 'Dibuja el plano a escala y calcula el ingreso proyectado de la cosecha de frutillas.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-mat-avril-03-act-3',
          title: 'Ecuación de Punto de Equilibrio Financiero',
          description: 'Modela la ecuación de costos e ingresos de tu proyecto de emprendimiento trimestral.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Calcula el perímetro y el área de una habitación de tu casa y formula una ecuación que exprese el largo en función del ancho.',
      reflectionPrompt: '¿Cómo cambia tu visión de la vida cuando descubres que puedes prever y diseñar el futuro usando ecuaciones matemáticas?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_mat_avril_03.pdf',
      guideUrl: '/api/v1/academic/classes/class-mat-avril-03/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-02-MAT', subjectCode: 'MAT-801', unitNumber: 1, sessionNumber: 3 }
    }
  ]
};

