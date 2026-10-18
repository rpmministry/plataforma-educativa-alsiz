import { CurriculumLote } from './lote1-len';

export const LOTE_05_ING: CurriculumLote = {
  loteId: 'LOTE-GAEL-05-ING',
  loteNumber: 5,
  subjectCode: 'ING-401',
  subjectName: 'Inglés (EFL)',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unidad 1 (Unit 1): Welcome to English Adventures: Phonics, Animals and Body Joy',
  unitNumber: 1,
  classesCount: 3,
  classes: [
    {
      id: 'class-ing-gael-01',
      subjectId: 'ing-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-08',
      dayOfWeek: 'Martes',
      scheduleTime: '10:00 - 10:45 (45 min)',
      unit: 'Unidad 1 (Unit 1): Welcome to English Adventures: Phonics, Animals and Body Joy',
      theme: 'Phonics Fun: Letter Sounds, Chants and Magic CVC Words',
      objective: 'Recognize initial alphabet sounds in English and blend letter sounds to read simple 3-letter CVC words (cat, sun, bus).',
      learningPurpose: 'Descubrir que en inglés las letras cantan sonidos divertidos que al juntarse como piezas de Lego forman palabras mágicas que podemos leer solitos.',
      competencyDcd: 'EFL.2.4.1 — Recognize basic sounds of English letters and blend letter-sound correspondences to read simple three-letter words (CVC pattern: consonant-vowel-consonant).',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — English as a Foreign Language (EFL Pre-A1 / MCER A1.1)',
      introduction: 'Hello, super champion Gael! Welcome to your English Adventure with Teacher Emma. Did you know that letters in English have secret musical sounds? The letter A says /æ/ like an apple on your hand, the letter B says /b/ like a bouncing ball, and the letter C says /k/ like a crunchy cookie! Today we are going to be "Sound Detectives" and build our first English words.',
      reading: 'Story: "The Cat and the Sun Hat". Once upon a time, a cheerful cat named Sam sat on a big red mat. The sun was hot up in the blue sky: /s/ - /ʌ/ - /n/, SUN! Sam the cat said: "I need a hat!". He ran to a red bus: /b/ - /ʌ/ - /s/, BUS! Inside the bus, he found a fun yellow hat: /h/ - /æ/ - /t/, HAT! Sam put the hat on his head, smiled happily and took a quick cat nap on his mat.',
      pedagogicalExplanation: 'En inglés aprendemos a leer escuchando el sonido de cada letra (Phonics). Las palabras CVC son palabras cortas formadas por: Consonante + Vocal corta + Consonante. Por ejemplo: C-A-T hace /k/ - /æ/ - /t/ = CAT (gato). S-U-N hace /s/ - /ʌ/ - /n/ = SUN (sol). H-A-T hace /h/ - /æ/ - /t/ = HAT (sombrero). ¡Es como hacer música con las letras!',
      vocabulary: [
        { term: 'Cat', definition: 'A small furry pet that purrs and meows.', childFriendlyExample: 'The cat is sleeping on the warm mat.' },
        { term: 'Sun', definition: 'The bright star that gives us light and warmth during the day.', childFriendlyExample: 'The yellow sun shines bright today.' },
        { term: 'Hat', definition: 'Something you wear on your head for fun or sun protection.', childFriendlyExample: 'Gael wears a cool hat when he plays in the park.' }
      ],
      contextualizedExample: 'When you see a yellow school bus in Quito and say "Look, a yellow BUS (/b/ - /ʌ/ - /s/)!", you are speaking English like a native champion!',
      socraticQuestions: [
        'If we change the first sound of "CAT" (/k/) for the sound /h/, what new word do we get? (HAT!)',
        'Can you make the sound of the letter S like a friendly snake? /ssssss/! What words start with that sound?',
        'Why is it so much fun to chant and sing the sounds instead of just looking at the letters?'
      ],
      practicalActivity: {
        title: 'The 3-Box Phonics Puzzle (El puzzle de las 3 casillas)',
        instructions: [
          'Draw 3 connected squares on your magic whiteboard: [ C ] [ A ] [ T ].',
          'Use 3 colored Lego bricks: place one brick in each box as you say each sound aloud: /k/ (red brick), /æ/ (yellow brick), /t/ (blue brick).',
          'Slide your finger fast under the three boxes and shout the blended word: "CAT!"',
          'Repeat the same game with the words: S-U-N (Sun) and B-U-S (Bus).'
        ],
        materials: ['Whiteboard or paper', '3 Lego blocks of different colors', 'Marker']
      },
      applicationActivity: {
        title: 'My First Phonics Comic Strip',
        task: 'Draw 3 small frames in your notebook: 1) A happy cat, 2) A bright sun, 3) A funny hat. Write the CVC word under each picture using colorful uppercase and lowercase letters.',
        deliverable: 'Illustrated 3-word mini poster (CAT, SUN, HAT) with student drawing and neat handwriting.'
      },
      formativeEvaluation: {
        description: 'Phonemic awareness, initial sound identification and CVC blending.',
        expectedEvidence: 'Gael pronounces the isolated sounds /k/, /æ/, /t/ and blends them smoothly to say "cat" without hesitating.'
      },
      evaluationRubric: {
        criterion: 'Recognition and blending of English letter sounds CVC (EFL.2.4.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Repeats words after the teacher but struggles to identify individual letter sounds.' },
          { level: 'En desarrollo', descriptor: 'Identifies initial sounds like /s/ and /b/ and blends 3-letter words with teacher guidance.' },
          { level: 'Consolidado', descriptor: 'Autonomously sounds out and blends CVC words (cat, sun, hat, bus) with enthusiastic, accurate pronunciation.' }
        ]
      },
      expectedFeedback: 'Terrific phonics power, Gael! Your English sounds are crisp, clear and musical. You blended the sounds like a real English master. Teacher Emma gives you five stars! ⭐⭐⭐⭐⭐',
      difficultyAdaptation: 'Use flashcards with a picture of a cat on one side and the letters C-A-T with sound dots underneath on the other side.',
      advancedExtension: 'Gael can discover other rhyming words of the -AT family: BAT, RAT, FAT, and explain what each word means with gestures.',
      resources: [
        {
          id: 'class-ing-gael-01-res-1',
          type: 'simulator',
          title: 'Starfall Education: Learn to Read with Phonics',
          url: 'https://www.starfall.com/h/ltr-classic/',
          description: 'Plataforma educativa infantil abierta con animaciones interactivas de sonidos de vocales cortas y palabras CVC.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-ing-gael-01-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Phonics Fun & CVC Words',
          url: '/api/v1/academic/classes/class-ing-gael-01/guide.pdf',
          description: 'Ficha de trabajo imprimible con casillas de sonido y dibujos para colorear en 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-ing-gael-01-act-1',
          title: 'Sam the Cat Chant',
          description: 'Listen to the rhyme of Sam the cat and identify the rhyming words with -at.',
          type: 'listening',
          points: 10,
          completed: false
        },
        {
          id: 'class-ing-gael-01-act-2',
          title: 'Lego Phonics Blending Laboratory',
          description: 'Build the words CAT, SUN and BUS sliding your finger with 3 Lego blocks.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-ing-gael-01-act-3',
          title: 'Mini Phonics Comic Poster',
          description: 'Draw and label your 3 CVC words with bright colors and pride.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Teach your mom or dad the secret sound of letter C (/k/) and letter S (/s/) and show them your comic drawing.',
      reflectionPrompt: 'How does it feel to read your first English words all by yourself?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_ing_gael_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-ing-gael-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-05-ING', subjectCode: 'ING-401', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-ing-gael-02',
      subjectId: 'ing-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-10',
      dayOfWeek: 'Jueves',
      scheduleTime: '10:00 - 10:45 (45 min)',
      unit: 'Unidad 1 (Unit 1): Welcome to English Adventures: Phonics, Animals and Body Joy',
      theme: 'The Animal Safari: Pets, Jungle Friends and Bright Colors',
      objective: 'Name common animals in English (dog, cat, bird, frog, bear) and describe them using basic color adjectives in simple spoken phrases.',
      learningPurpose: 'Aprender a nombrar y describir a nuestros animales y mascotas favoritas combinando colores en inglés sin traducir mentalmente.',
      competencyDcd: 'EFL.2.2.1 — Understand and use basic vocabulary related to everyday objects, animals, and colors in short spoken interactions.',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — English as a Foreign Language (EFL Pre-A1 / MCER A1.1)',
      introduction: 'Welcome back to the English Safari, Ranger Gael! Today we are packing our binoculars and our green adventure hat. We are going to meet wonderful animal friends from the Ecuadorian rainforest and the cozy house! Can you roar like a bear? Can you ribbit like a green frog? Let’s learn their English names and paint them with awesome colors!',
      reading: 'Adventure: "A Walk in the Colorful Jungle". Ranger Gael walked quietly into the green forest. Look up in the tree! What do you see? "I see a blue bird! The bird is blue and sings a sweet song: tweet, tweet!". Then, look near the fresh river! What do you see? "I see a green frog! The frog is green and jumps high: hop, hop!". Under the big palm tree, what is that? "A big brown bear! The bear is brown and loves eating sweet berries!". And waiting at home with a wagging tail, who is that? "A happy yellow dog! The dog is loyal and loves to play ball!".',
      pedagogicalExplanation: 'En inglés, cuando queremos describir un animal con un color, decimos primero el color y luego el animal: decimos "A blue bird" (un pájaro azul) y no "a bird blue". También podemos armar oraciones completas y sencillas: "The frog is green" (La rana es verde) o "The dog is brown" (El perro es café). ¡Es muy fácil y ordenado!',
      vocabulary: [
        { term: 'Dog', definition: 'A friendly four-legged pet known as man\'s best friend.', childFriendlyExample: 'The brown dog wags its tail.' },
        { term: 'Frog', definition: 'A small green animal with long legs for jumping in rivers and ponds.', childFriendlyExample: 'The green frog jumps into the cool water.' },
        { term: 'Bird', definition: 'A creature with feathers and wings that can fly in the sky.', childFriendlyExample: 'The blue bird flies over the trees.' }
      ],
      contextualizedExample: 'When you visit the zoo and see a giant bear eating fruit, you can point and say with confidence: "Look! A big brown bear!".',
      socraticQuestions: [
        'Why in English do we put the color before the animal? We say "A green frog". How does that help our brain imagine the picture?',
        'If you could adopt any wild animal as a magical pet, what animal and what color would you choose?',
        'Can you make the sound and action of your favorite animal right now?'
      ],
      practicalActivity: {
        title: 'The Color & Animal Match Safari Game',
        instructions: [
          'Lay out 4 color cards on the table: Blue, Green, Brown, Yellow.',
          'Take 4 animal drawings or toy figures: Bird, Frog, Bear, Dog.',
          'Match each animal with its color card.',
          'Point to each pair and say aloud the magic phrase: "The bird is blue!", "The frog is green!", "The bear is brown!", "The dog is yellow!".'
        ],
        materials: ['Color paper slips (blue, green, brown, yellow)', 'Animal toy figurines or cutout cards']
      },
      applicationActivity: {
        title: 'My Dream Animal Safari Card',
        task: 'In your notebook, design an official Safari Explorer Card. Draw your favorite animal, color it brightly, and write below: "My animal is a [color] [animal]. It can [jump/run/fly]!".',
        deliverable: 'Illustrated Safari Passport Card with 2 complete English sentences written by Gael.'
      },
      formativeEvaluation: {
        description: 'Oral vocabulary production of animal names and color adjective sentence structure.',
        expectedEvidence: 'Gael says "A green frog" and "The bear is brown" with proper word order and confident pronunciation.'
      },
      evaluationRubric: {
        criterion: 'Oral vocabulary and descriptive sentences of animals and colors (EFL.2.2.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Names colors or animals in isolation when pointed out, but cannot form a phrase.' },
          { level: 'En desarrollo', descriptor: 'Combines color and animal (e.g., "blue bird") with gentle prompting from the tutor.' },
          { level: 'Consolidado', descriptor: 'Spontaneously uses the color-noun structure ("A green frog") and speaks full descriptive sentences ("The dog is brown") with enthusiasm.' }
        ]
      },
      expectedFeedback: 'Splendid safari adventure, Ranger Gael! You spoke about your animal friends with great fluency and your drawings are full of life. You are a natural English explorer!',
      difficultyAdaptation: 'Use an echo game where the teacher says "Green frog!" and Gael mimics the frog hopping while repeating "Green frog!".',
      advancedExtension: 'Gael learns two extra wild animals from the Galápagos Islands: "sea turtle" (tortuga marina) and "blue-footed booby" (piquero de patas azules).',
      resources: [
        {
          id: 'class-ing-gael-02-res-1',
          type: 'simulator',
          title: 'British Council LearnEnglish Kids: Animal Games & Songs',
          url: 'https://learnenglishkids.britishcouncil.org/word-games/animals-1',
          description: 'Juegos interactivos abiertos del British Council para emparejar animales y colores con audio de pronunciación nativa.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-ing-gael-02-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — The Colorful Animal Safari',
          url: '/api/v1/academic/classes/class-ing-gael-02/guide.pdf',
          description: 'Ficha imprimible con pasaporte de guardaparque y tarjetas de animales para 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-ing-gael-02-act-1',
          title: 'Jungle Echo Safari Listening',
          description: 'Listen to animal sounds and match each sound with its English name and color.',
          type: 'listening',
          points: 10,
          completed: false
        },
        {
          id: 'class-ing-gael-02-act-2',
          title: 'Color & Animal Pairing Challenge',
          description: 'Match the 4 color cards with animal tokens and practice the descriptive phrases.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-ing-gael-02-act-3',
          title: 'Official Safari Explorer Card',
          description: 'Create your colorful passport card with your dream animal and English sentences.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Look out your window or in your living room and name in English two animals or objects with their colors (e.g., "A black cat", "A red car").',
      reflectionPrompt: 'Which animal in the world would you love to see in person, and what would you say to it in English?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_ing_gael_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-ing-gael-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-05-ING', subjectCode: 'ING-401', unitNumber: 1, sessionNumber: 2 }
    },
    {
      id: 'class-ing-gael-03',
      subjectId: 'ing-gael',
      studentId: 'gael',
      gradeLevel: '4.º EGB Elemental (Gael - 8 años)',
      date: '2026-09-11',
      dayOfWeek: 'Viernes',
      scheduleTime: '10:45 - 11:30 (45 min)',
      unit: 'Unidad 1 (Unit 1): Welcome to English Adventures: Phonics, Animals and Body Joy',
      theme: 'My Body and Action Time: Simon Says Jump, Clap and Smile!',
      objective: 'Identify body parts (head, shoulders, knees, toes, eyes, ears) and execute action commands (jump, clap, touch, run) using Total Physical Response (TPR).',
      learningPurpose: 'Aprender inglés conectando el cerebro con el cuerpo en movimiento: cuando escuchamos y actuamos físicamente, el nuevo idioma se graba para siempre sin esfuerzo.',
      competencyDcd: 'EFL.2.1.1 — Respond physically to simple classroom commands and instructions through Total Physical Response (TPR).',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — English as a Foreign Language (EFL Pre-A1 / MCER A1.1)',
      introduction: 'Are you ready to move your body, champion Gael?! Today we are turning our learning space into an energetic game of "Simon Says!". We have a wonderful body: a head to think smart thoughts, eyes to see beauty, ears to hear songs, hands to build Lego towers, and feet to jump high! Let’s listen, move, laugh, and celebrate Friday with English power!',
      reading: 'Song Chant: "Head, Shoulders, Knees and Toes!". Stand up tall! Let\'s touch our body parts to the rhythm of the music: "Head, shoulders, knees and toes, knees and toes! Head, shoulders, knees and toes, knees and toes! And eyes, and ears, and mouth, and nose! Head, shoulders, knees and toes, knees and toes!". Now Teacher Emma says: "Simon says: CLAP your hands! (Clap, clap!). Simon says: JUMP three times! (1, 2, 3!). Simon says: SMILE big! (Big happy smile!)".',
      pedagogicalExplanation: 'El método TPR (Respuesta Física Total) nos enseña que la forma más rápida y natural de aprender una lengua extranjera es hacer la acción con el cuerpo cuando escuchamos la orden. Si escuchas "Jump!", saltas. Si escuchas "Touch your head!", tocas tu cabeza. Así, tu mente comprende el significado al instante sin necesidad de traducir al español.',
      vocabulary: [
        { term: 'Head', definition: 'The upper part of your body containing your brain, eyes, ears, nose and mouth.', childFriendlyExample: 'Touch your head and think a happy thought!' },
        { term: 'Jump', definition: 'To push yourself up into the air using your feet and legs.', childFriendlyExample: 'Simon says: jump as high as a kangaroo!' },
        { term: 'Clap', definition: 'To strike your open hands together to make a sharp sound and celebrate.', childFriendlyExample: 'Clap your hands when you are happy and you know it!' }
      ],
      contextualizedExample: 'When you are playing soccer or riding your bicycle and someone says "Run fast!" or "Jump!", you react with joy and agility because you know the words in your bones.',
      socraticQuestions: [
        'Why is it easier to remember an English word like "JUMP" when you actually jump with your feet instead of just reading it in a book?',
        'What body part is the most important for listening to Teacher Emma’s voice? (Our EARS!)',
        'If Simon does NOT say "Simon says", should you do the action? Why do we need to pay close attention?'
      ],
      practicalActivity: {
        title: 'The Simon Says Olympic Challenge',
        instructions: [
          'Stand in the middle of the room in ready position.',
          'Listen carefully to Teacher Emma’s commands.',
          'Rule: Only do the action if you hear "Simon says...".',
          'Command 1: "Simon says: Touch your shoulders!".',
          'Command 2: "Simon says: Clap your hands 4 times!".',
          'Command 3: "Simon says: Touch your knees!".',
          'Command 4 (Trick!): "Jump twice!" (Freeze! Don’t move because Simon didn’t say!).',
          'Command 5: "Simon says: Give a warm victory hug!".'
        ],
        materials: ['Your energized body', 'Open space to jump safely']
      },
      applicationActivity: {
        title: 'The Superhero Body Blueprint',
        task: 'Draw a superhero self-portrait in your notebook. Label 5 body parts using neat arrows: Head, Eyes, Ears, Hands, Feet. Write 1 action verb next to each part (e.g., Head = Think, Feet = Jump).',
        deliverable: 'Superhero blueprint illustration with 5 body parts and action labels in English.'
      },
      formativeEvaluation: {
        description: 'Physical and oral response to action commands and body part identification.',
        expectedEvidence: 'Gael touches his knees, shoulders and head immediately upon hearing the commands in English without looking for translations.'
      },
      evaluationRubric: {
        criterion: 'Physical response to English commands and body part naming TPR (EFL.2.1.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Looks at the teacher for visual cues before touching body parts.' },
          { level: 'En desarrollo', descriptor: 'Identifies head and hands quickly, but hesitates on knees or toes.' },
          { level: 'Consolidado', descriptor: 'Responds instantly with accuracy and joy to all TPR action commands (jump, clap, touch head/shoulders/knees) and follows Simon Says rules flawlessly.' }
        ]
      },
      expectedFeedback: 'Outstanding energy and mastery, Gael! You nailed every Simon Says command and your superhero blueprint looks epic. You have completed the English Unit 1 with flying colors! 🌟🚀',
      difficultyAdaptation: 'Perform the movements together facing a mirror so Gael can see his reflection while singing the chant.',
      advancedExtension: 'Gael takes the role of "Simon" and gives 3 English commands to the tutor or parents (e.g., "Simon says touch your nose!").',
      resources: [
        {
          id: 'class-ing-gael-03-res-1',
          type: 'simulator',
          title: 'Super Simple Songs: Action Songs for Kids',
          url: 'https://supersimple.com/song/head-shoulders-knees-and-toes/',
          description: 'Recurso oficial abierto con canciones educativas de ritmo TPR, coreografías infantiles y fichas de partes del cuerpo.',
          duration: '15 min',
          order: 1
        },
        {
          id: 'class-ing-gael-03-res-2',
          type: 'pdf',
          title: 'Guía Didáctica ALSIZ — Simon Says & My Superhero Body',
          url: '/api/v1/academic/classes/class-ing-gael-03/guide.pdf',
          description: 'Ficha imprimible de blueprint corporal y juego de tarjetas de acción para 4.° EGB.',
          duration: '20 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-ing-gael-03-act-1',
          title: 'Head, Shoulders, Knees and Toes Chant',
          description: 'Sing and dance the traditional action chant speeding up the tempo each round.',
          type: 'speaking',
          points: 10,
          completed: false
        },
        {
          id: 'class-ing-gael-03-act-2',
          title: 'The Simon Says Olympic Challenge',
          description: 'Participate actively in the physical Simon Says game demonstrating attentive listening.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-ing-gael-03-act-3',
          title: 'Superhero Body Blueprint',
          description: 'Illustrate and label your superhero self-portrait with 5 body parts and actions.',
          type: 'project',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Play a mini-round of "Simon Says" with a family member and teach them how to say "touch your head" in English.',
      reflectionPrompt: 'What action makes you feel full of energy and joy when you move your body?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_ing_gael_03.pdf',
      guideUrl: '/api/v1/academic/classes/class-ing-gael-03/guide.pdf',
      batchInfo: { batchId: 'LOTE-GAEL-05-ING', subjectCode: 'ING-401', unitNumber: 1, sessionNumber: 3 }
    }
  ]
};
