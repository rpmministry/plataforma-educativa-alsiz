import { AvrilCurriculumLote } from './lote1-len';

export const AVRIL_LOTE_05_ING: AvrilCurriculumLote = {
  loteId: 'LOTE-AVRIL-05-ING',
  loteNumber: 5,
  subjectCode: 'ING-801',
  subjectName: 'Inglés',
  category: 'TRONCAL_MINEDUC',
  unitTitle: 'Unit 1: Critical Thinking & Global Discourse (CEFR B1)',
  unitNumber: 1,
  classesCount: 2,
  classes: [
    {
      id: 'class-ing-avril-01',
      subjectId: 'ing-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-10',
      dayOfWeek: 'Jueves',
      scheduleTime: '10:45 - 11:30 (45 min)',
      unit: 'Unit 1: Critical Thinking & Global Discourse (CEFR B1)',
      theme: 'Stating Opinions & Defending Arguments in Academic Discourse',
      objective: 'Articulate personal viewpoints and defend hypotheses on ethical and environmental topics using formal B1 discourse formulas (e.g., "From my perspective", "The evidence indicates that", "In contrast to").',
      learningPurpose: 'Elevate conversational English from simple descriptive sentences to structured, persuasive reasoning suitable for international academic dialogues and debates.',
      competencyDcd: 'EFL.4.2.1 — Understand phrases and expressions related to areas of most immediate priority and participate in short social exchanges or debates with spontaneous articulation (CEFR B1).',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Lengua Extranjera Inglés EGB Superior / Marco Común Europeo de Referencia (MCER B1)',
      introduction: 'Welcome to your Advanced English Seminar, dear Avril! I am Professor Sarah Mitchell. Speaking English at an intermediate B1 level does not mean simply knowing how to order food or introduce your family; it means having the linguistic power to express your intellect, question assumptions, and defend ideas that matter to our world. In today’s globalized reality, young thinkers like you lead debates on climate conservation, artificial intelligence ethics, and social equity in the international lingua franca. Today, we leave behind informal phrases like "I like it because it is good" and step into the arena of formal academic argumentation. Let’s train your rhetorical muscles!',
      reading: 'The Great Galapagos Conservation Dilemma: Consider this real-world scenario from the Galapagos Islands. On one hand, ecotourism brings millions of dollars to Ecuador, providing livelihoods for local families and funding scientific research. On the other hand, the carbon footprint of transcontinental flights and the risk of introducing invasive alien species pose severe threats to fragile endemic wildlife, such as the marine iguana and the giant tortoise. When international scientists debate this issue, they do not shout or use emotional rhetoric; they state: "While tourism generates substantial economic resources, uncontrolled visitor expansion fundamentally jeopardizes ecological equilibrium." Notice the grammatical balance: an introductory concession clause ("While...") followed by a strong, evidence-backed assertion. That is the architecture of mature English discourse.',
      pedagogicalExplanation: 'To articulate arguments at the CEFR B1 level, students master a three-step rhetorical framework: 1) Position Statement (The Claim): Introduce your stance with formal hedges and stance markers ("In my view...", "It seems evident that...", "I maintain that..."). 2) Supporting Evidence (The Premise): Provide empirical rationale or contextual data using transitional phrases ("According to recent data...", "For instance...", "This is corroborated by..."). 3) Counter-Argument Qualification (Rebuttal): Acknowledge opposing viewpoints before reaffirming your thesis ("Although opponents argue that X, evidence demonstrates that Y because Z").',
      vocabulary: [
        { term: 'Claim', definition: 'An assertion or proposition that states the primary point of an argument which can be questioned or debated.', childFriendlyExample: 'Her claim was that solar energy is more sustainable than fossil fuels in high-altitude Andean towns.' },
        { term: 'Counter-argument', definition: 'An argument or viewpoint put forward to oppose, qualify, or refute an earlier argument.', childFriendlyExample: 'He addressed the counter-argument that electric vehicles are expensive by pointing out long-term fuel savings.' },
        { term: 'Stance marker', definition: 'A phrase used by a speaker or writer to signal their personal attitude, confidence, or position toward an idea.', childFriendlyExample: 'Phrases like "Undoubtedly" and "From my perspective" are powerful stance markers.' }
      ],
      contextualizedExample: 'Debating whether Ecuador should ban single-use plastics in the Andean highlands: "While plastic packaging is inexpensive for small merchants, its non-biodegradable nature causes irreversible pollution in highland páramo watersheds; therefore, adopting biodegradable banana-fiber alternatives is an ecological imperative."',
      socraticQuestions: [
        'Why does beginning a sentence with "While it is true that..." make your overall argument stronger than simply ignoring the opposing view?',
        'How does substituting "I think" with "The available evidence indicates that" change how an international audience perceives your intellectual credibility?',
        'If a debater makes a personal attack (ad hominem) in an academic discussion, which English phrase could you use to politely redirect the debate back to the facts?'
      ],
      practicalActivity: {
        title: 'The Socratic Debate Arena: Galapagos Tourism Ethics',
        instructions: [
          'Listen to the BBC Learning English B1 audio track on environmental dilemmas.',
          'Choose one stance on the Galapagos dilemma: A) Pro-Tourism Regulation, or B) Pro-Community Economic Development.',
          'Draft a formal argument speech of exactly 5 sentences following the 3-step framework (Claim, Evidence, Counter-argument rebuttal).',
          'Record a 60-second voice memo in English articulating your speech with clear pronunciation, correct intonation, and confident pacing.',
          'Self-evaluate your recording using the ALSIZ CEFR B1 pronunciation and fluency checklist.'
        ],
        materials: ['Audio player / smartphone microphone', 'English notebook', 'CEFR B1 Argumentation cheat-sheet']
      },
      applicationActivity: {
        title: 'B1 Opinion Editorial: Sustainable Fashion in Ecuador',
        task: 'Write an opinion paragraph (80-100 words) in English addressing the problem of "Fast Fashion vs. Traditional Artisanal Textiles in Otavalo". Include at least two stance markers, one concession clause starting with "Although" or "While", and one conclusion marker ("Consequently" or "Therefore").',
        deliverable: 'Typed or neatly handwritten paragraph in the English Writing Portfolio with peer-review rubrics attached.'
      },
      formativeEvaluation: {
        description: 'Assessment of oral and written argumentation fluency, accurate use of B1 stance markers and ability to formulate balanced rebuttals.',
        expectedEvidence: 'Avril constructs clear compound and complex sentences in English expressing a defendable stance with appropriate transitional discourse markers.'
      },
      evaluationRubric: {
        criterion: 'Oral and written academic argumentation at CEFR B1 level (EFL.4.2.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Uses isolated words and elementary phrases (A1/A2); struggles to link sentences logically or relies heavily on Spanish translation.' },
          { level: 'En desarrollo', descriptor: 'Expresses opinions using basic connectors (because, but, so); attempts formal phrases but shows occasional pauses or grammatical inaccuracies.' },
          { level: 'Consolidado', descriptor: 'Fluently articulates complex arguments using varied B1 discourse markers (furthermore, in contrast, evidence suggests); demonstrates clear pronunciation and coherent paragraph architecture.' }
        ]
      },
      expectedFeedback: 'Outstanding linguistic maturity, Avril! Your speech on Galapagos was persuasive, well-structured, and delivered with natural inflection. Moving beyond "I think" to "The evidence indicates" demonstrates genuine B1+ academic proficiency.',
      difficultyAdaptation: 'Provide a sentence-frame organizer with color-coded slots for Claim, Reason, and Rebuttal to guide speech drafting.',
      advancedExtension: 'Avril drafts a formal 150-word letter in English to an international conservation NGO proposing a youth ambassadors program for Ecuadorian cloud forests.',
      resources: [
        {
          id: 'class-ing-avril-01-res-1',
          type: 'simulator',
          title: 'BBC Learning English — 6 Minute English: Environmental Dilemmas & Debate',
          url: 'https://www.bbc.co.uk/learningenglish/english/features/6-minute-english',
          description: 'Official British public broadcaster educational podcast featuring authentic dialogues, vocabulary glossaries, and debate structures.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-ing-avril-01-res-2',
          type: 'pdf',
          title: 'ALSIZ English Guide — Academic Argumentation & Stance Formulas (B1)',
          url: '/api/v1/academic/classes/class-ing-avril-01/guide.pdf',
          description: 'Pedagogical handbook with phrase banks, rhetorical organizers, and pronunciation exercises for Ecuadorian students.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-ing-avril-01-act-1',
          title: 'The Galapagos Dilemma Analysis',
          description: 'Read the case study and identify the concession clause and main claim in the text.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-ing-avril-01-act-2',
          title: 'Socratic Debate Voice Recording',
          description: 'Record a 60-second speech in English following the 3-step academic argumentation model.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-ing-avril-01-act-3',
          title: 'B1 Opinion Editorial Writing',
          description: 'Draft the 100-word persuasive paragraph on sustainable textiles applying target connectors.',
          type: 'writing',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Listen to a 5-minute English podcast or news report and transcribe three sentences that express an opinion or provide supporting evidence.',
      reflectionPrompt: 'How does mastering English enable you to share the cultural and biological treasures of Ecuador with the entire planet?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_ing_avril_01.pdf',
      guideUrl: '/api/v1/academic/classes/class-ing-avril-01/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-05-ING', subjectCode: 'ING-801', unitNumber: 1, sessionNumber: 1 }
    },
    {
      id: 'class-ing-avril-02',
      subjectId: 'ing-avril',
      studentId: 'avril',
      gradeLevel: '8.º EGB Superior (Avril - 12 años)',
      date: '2026-09-11',
      dayOfWeek: 'Viernes',
      scheduleTime: '08:45 - 09:30 (45 min)',
      unit: 'Unit 1: Critical Thinking & Global Discourse (CEFR B1)',
      theme: 'Discourse Markers & Cause-Effect Relationships in Persuasive Speaking and Writing',
      objective: 'Synthesize complex ideas by employing varied discourse markers of cause, effect, and concession (consequently, as a result, on the other hand, nevertheless) in a coherent persuasive essay paragraph.',
      learningPurpose: 'Transform isolated ideas into a flowing river of reasoned thought, ensuring that readers and listeners can follow your logical chain effortlessly.',
      competencyDcd: 'EFL.4.3.1 — Write straightforward connected texts on a range of familiar subjects within one’s field of interest, by linking a series of shorter discrete elements into a linear sequence (CEFR B1).',
      officialSource: 'Currículo Nacional MINEDUC Ecuador — Lengua Extranjera Inglés EGB Superior / Marco Común Europeo de Referencia (MCER B1)',
      introduction: 'Good morning, Avril! Welcome to our Friday English workshop with Professor Sarah Mitchell. Have you ever read an essay that felt like a bumpy gravel road, jumping from one disjointed sentence to another? What turns a rough road into a smooth highway of thought is the strategic use of DISCOURSE MARKERS. In English linguistics, discourse markers are the road signs of prose: they warn the reader when a curve is coming ("However..."), show when two roads merge ("Furthermore..."), and indicate the final destination ("Consequently..."). Today, we will master the logic of cause, effect, and contrast to give your English writing elegance, authority, and seamless cohesion.',
      reading: 'The Chemistry of Words: Connectors as Molecular Bonds: In physical chemistry, individual atoms cannot create a living cell unless they are bonded by stable covalent interactions. Similarly, in written English, brilliant ideas remain fragmented notes unless they are bonded by logical connectors. Examine how a professional editorial links thoughts: "Urban vertical farming reduces agricultural water consumption by up to ninety percent. Furthermore, it eliminates the need for long-distance refrigerated transportation. Consequently, cities that adopt vertical greenhouses dramatically diminish their overall carbon emissions, even though initial capital expenditures remain relatively high." Notice how the ideas flow seamlessly from innovation to efficiency, then to ecological consequence, and finally to an economic qualification. The text feels alive, deliberate, and undeniably persuasive.',
      pedagogicalExplanation: 'Discourse markers at CEFR B1 are classified into specific semantic families: 1) Addition and Reinforcement: moreover, furthermore, in addition to, besides. 2) Cause and Reason: owing to, due to the fact that, since, given that. 3) Effect and Consequence: consequently, as a result, therefore, thus. 4) Contrast and Concession: whereas, on the contrary, nevertheless, despite the fact that. Effective writers never repeat the same connector twice in a single paragraph; they select words that reflect the exact degree of logical relationship they intend to communicate.',
      vocabulary: [
        { term: 'Discourse marker', definition: 'A word or phrase whose function is to organize written or spoken discourse into a coherent, logically linked structure.', childFriendlyExample: 'The word "Nevertheless" is a discourse marker signaling that an unexpected result follows.' },
        { term: 'Concession', definition: 'Acknowledging a valid point made by the opposing side to demonstrate fairness and thoroughness.', childFriendlyExample: 'Saying "Although it was raining, the team completed the marathon" contains a concession.' },
        { term: 'Cohesion', definition: 'The grammatical and lexical linking within a text that holds it together and gives it meaning.', childFriendlyExample: 'Cohesion is the invisible glue that makes your essay feel like a single unified piece.' }
      ],
      contextualizedExample: 'Analyzing renewable energy in the Ecuadorian Andes: "The Andean mountain range possesses extraordinary wind power potential; nevertheless, constructing high-altitude wind turbines presents complex logistical challenges. As a result, hybrid wind-solar systems are currently being prioritized by environmental engineers."',
      socraticQuestions: [
        'What is the subtle difference in tone and meaning between "but" and "nevertheless" in a formal written paragraph?',
        'If you write "The crops failed because of severe drought; therefore, food prices rose", which connector indicates cause and which indicates consequence?',
        'Why does overusing simple words like "and... and... and..." make writing sound childlike, and how do words like "furthermore" and "in addition" transform that tone?'
      ],
      practicalActivity: {
        title: 'The Cohesion Architecture Workshop: British Council OER',
        instructions: [
          'Access the British Council LearnEnglish Teens portal on Linking Words and Paragraph Cohesion.',
          'Read the 6 unlinked sentences describing clean energy in Latin America.',
          'Reorder and synthesize them into a single, beautifully articulated 80-word paragraph.',
          'Incorporate exactly one addition marker, one contrast marker, and one result marker without repeating any connector.',
          'Highlight each discourse marker in green and underline the cause-and-effect relationship in blue.'
        ],
        materials: ['Computer or tablet', 'LearnEnglish Teens grammar practice sheet', 'English notebook and colored highlighters']
      },
      applicationActivity: {
        title: 'Persuasive Mini-Essay: Youth Mental Well-being & Screen Time',
        task: 'Compose a 100-120 word mini-essay arguing for a healthy balance between digital devices and physical outdoor recreation for teenagers. Your paragraph must contain: an introductory topic sentence, three supporting arguments linked by varied B1 discourse markers (e.g., "Owing to...", "On the one hand... On the other hand...", "As a consequence..."), and a concluding synthesis statement.',
        deliverable: 'Neatly typed or written mini-essay submitted to the ALSIZ Student Portal with self-assessment checklist completed.'
      },
      formativeEvaluation: {
        description: 'Evaluation of syntactic precision, lexical variety in connectors and logical progression of arguments in English.',
        expectedEvidence: 'Avril writes a cohesive paragraph using at least three distinct categories of discourse markers without grammatical errors in punctuation or sentence fragments.'
      },
      evaluationRubric: {
        criterion: 'Written paragraph cohesion and discourse markers at CEFR B1 level (EFL.4.3.1)',
        indicators: [
          { level: 'Inicial', descriptor: 'Struggles to connect sentences; relies exclusively on "and", "but", and "because" with frequent punctuation errors.' },
          { level: 'En desarrollo', descriptor: 'Uses B1 connectors (however, therefore) but occasionally places them incorrectly or creates comma splices.' },
          { level: 'Consolidado', descriptor: 'Skillfully crafts cohesive paragraphs using varied markers of cause, contrast, and consequence with proper punctuation (semicolons, commas) and clear rhetorical intent.' }
        ]
      },
      expectedFeedback: 'Magnificent writing craftsmanship, Avril! Your paragraph demonstrates a sophisticated command of transitional phrases. The rhythm of your sentences is natural, and your logical deductions are compelling. Keep expanding your academic vocabulary!',
      difficultyAdaptation: 'Provide a connector substitution chart showing basic connectors alongside their formal B1 equivalents (e.g., but -> however; so -> therefore).',
      advancedExtension: 'Avril analyzes a real excerpt from a United Nations environmental declaration, underlining all concession markers and explaining how they build diplomatic consensus.',
      resources: [
        {
          id: 'class-ing-avril-02-res-1',
          type: 'simulator',
          title: 'British Council LearnEnglish Teens — Linking Words & Paragraph Cohesion',
          url: 'https://learnenglishteens.britishcouncil.org/skills/writing/b1-writing',
          description: 'Official British Council educational resource for B1 intermediate learners with interactive exercises on discursive cohesion.',
          duration: '20 min',
          order: 1
        },
        {
          id: 'class-ing-avril-02-res-2',
          type: 'pdf',
          title: 'ALSIZ English Guide — Cohesion Markers & Cause-Effect Syntax (B1)',
          url: '/api/v1/academic/classes/class-ing-avril-02/guide.pdf',
          description: 'Worksheet featuring connector transformation drills, punctuation rules for conjunctive adverbs, and essay templates.',
          duration: '25 min',
          order: 2
        }
      ],
      activities: [
        {
          id: 'class-ing-avril-02-act-1',
          title: 'Discourse Marker Diagnostics',
          description: 'Analyze sample sentences and categorize connectors into addition, contrast, cause, or result.',
          type: 'reflection',
          points: 10,
          completed: false
        },
        {
          id: 'class-ing-avril-02-act-2',
          title: 'Cohesion Architecture Practice',
          description: 'Rewrite fragmented sentences into a cohesive paragraph using targeted B1 transition words.',
          type: 'practice',
          points: 15,
          completed: false
        },
        {
          id: 'class-ing-avril-02-act-3',
          title: 'Persuasive Mini-Essay on Screen Time',
          description: 'Write the 120-word essay applying the cause-effect discourse framework with accurate punctuation.',
          type: 'writing',
          points: 15,
          completed: false
        }
      ],
      homeworkTask: 'Find an English article from an online magazine (like National Geographic Kids or Science News Explores) and find 4 different discourse markers used by the author.',
      reflectionPrompt: 'How does learning to connect your thoughts with clarity in English give you confidence when speaking in front of people from diverse cultures?',
      isCompleted: false,
      guideTitle: 'Guia_Didactica_class_ing_avril_02.pdf',
      guideUrl: '/api/v1/academic/classes/class-ing-avril-02/guide.pdf',
      batchInfo: { batchId: 'LOTE-AVRIL-05-ING', subjectCode: 'ING-801', unitNumber: 1, sessionNumber: 2 }
    }
  ]
};

