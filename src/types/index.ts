// Wisdom School - Domain Types & Data Models

export type StudentId = string;

export interface StudentCredentials {
  email: string;
  pinCode: string;
  password?: string;
}

export interface NewStudentInput {
  name: string;
  email?: string;
  pinCode?: string;
  password?: string;
  age: number;
  grade: string;
  gradeLong?: string;
  methodology?: string;
  interests?: string[];
  avatar?: string;
  themeWorld?: 'snoopy' | 'mario' | 'stem' | 'general';
}

export interface AcademicTrimester {
  trimesterNumber: 1 | 2 | 3;
  title: string;
  startDate: string;
  endDate: string;
  valuationDate: string;
  description: string;
  notes?: string;
  isCurrent?: boolean;
}

export interface InterdisciplinaryProject {
  id: string;
  trimesterNumber: 1 | 2 | 3;
  title: string;
  subjectsInvolved: string[];
  description: string;
  deliverables: string[];
  evaluationCriteria: string;
  status: 'active' | 'upcoming' | 'completed';
}

export interface AcademicPlan {
  schoolYear: string; // e.g. "2026 - 2027"
  ministryStandard: string; // e.g. "Ministerio de Educación de Ecuador"
  educationLevel: string; // e.g. "8.º Año de Educación General Básica Superior" or "4.º Año EGB Elemental"
  workingDays: number; // 200
  totalTrimesters: number; // 3
  totalSubjects: number; // 11 for Avril, 9 for Gael
  evaluationModel: string; // "Proyectos Interdisciplinarios (Sin exámenes memorísticos)"
  gradingSystem: string; // "Nota Mínima: 7.00 / 10" or "Evaluación Cualitativa / Portafolio"
  supletoriosPeriod: string; // "Del 28 de junio al 02 de julio de 2027"
  trimesters: AcademicTrimester[];
  projects: InterdisciplinaryProject[];
}

export interface Student {
  id: StudentId;
  name: string;
  email?: string;
  pinCode?: string;
  password?: string;
  age: number;
  grade: string;
  gradeLong: string;
  avatar: string;
  academicPlan: AcademicPlan;
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
    gradient: string;
    badge: string;
  };
  motto: string;
  interests: string[];
  isDemo?: boolean;
}

export interface AITeacher {
  id: string;
  name: string;
  avatar: string;
  title: string;
  specialty: string;
  personality: string;
  educationalLevel: string;
  pedagogicalStyle: string;
  welcomeMessage: string;
}

export type ResourceType = 'video' | 'pdf' | 'simulator' | 'external_link' | 'interactive' | 'audio' | 'reading';

export interface ClassResource {
  id: string;
  type: ResourceType;
  title: string;
  url: string;
  description: string;
  duration?: string;
  order: number;
}

export type ClassActivityType = 'reflection' | 'practice' | 'quiz' | 'project' | 'experiment' | 'observation' | 'research' | 'writing' | 'analysis' | 'speaking' | 'listening' | 'debugging';

export interface ClassActivity {
  id: string;
  title: string;
  description: string;
  type: ClassActivityType;
  points: number;
  completed?: boolean;
}

export interface DailyClass {
  id: string;
  subjectId: string;
  studentId: StudentId;
  date: string; // ISO format or YYYY-MM-DD
  dayOfWeek: string;
  scheduleTime?: string; // e.g. "08:00 - 09:30 (90 min)"
  timeBreakdown?: { phase: string; minutes: number; description: string }[];
  unit: string;
  theme: string;
  objective: string;
  introduction: string;
  reading: string;
  videoUrl?: string;
  simulatorUrl?: string;
  socraticQuestions: string[];
  resources: ClassResource[];
  activities: ClassActivity[];
  guideUrl?: string;
  guideTitle?: string;
  homeworkTask: string;
  reflectionPrompt: string;
  isCompleted?: boolean;
  /** Progressive learning-path stages for the Gamified Masterclass */
  learningPath?: LearningPathStage[];
  /** Curated verified video resources for the Digital Laboratory */
  digitalResources?: DigitalResource[];
  /** Socratic pause prompts placed at key moments in the flow */
  socraticPauses?: SocraticPause[];
  /** Evidence criteria aligned with each learning-path stage */
  evidenceCriteria?: EvidenceCriterion[];
  /** Enriched pedagogical and official curriculum fields (Etapa 06A) */
  gradeLevel?: string;
  competencyDcd?: string;
  officialSource?: string;
  learningPurpose?: string;
  pedagogicalExplanation?: string;
  vocabulary?: { term: string; definition: string; childFriendlyExample: string }[];
  contextualizedExample?: string;
  practicalActivity?: { title: string; instructions: string[]; materials: string[] };
  applicationActivity?: { title: string; task: string; deliverable: string };
  formativeEvaluation?: { description: string; expectedEvidence: string };
  evaluationRubric?: { criterion: string; indicators: { level: string; descriptor: string }[] };
  expectedFeedback?: string;
  difficultyAdaptation?: string;
  advancedExtension?: string;
  batchInfo?: { batchId: string; subjectCode: string; unitNumber: number; sessionNumber: number };
}

/** Progressive path stage: concept → deepen → apply → create */
export interface LearningPathStage {
  id: string;
  order: number;
  title: string;
  type: 'concept' | 'deepen' | 'apply' | 'create';
  /** Core concept content presented visually and narratively */
  coreConcept: {
    summary: string;
    detailedExplanation: string;
    visualAnalogy?: string;
    keyTakeaways: string[];
  };
  /** Guiding question to verify comprehension before advancing */
  guidingQuestion: string;
  /** Scaffolded hints if student struggles */
  socraticHints?: string[];
  /** Expected response depth indicator */
  minResponseLength?: number;
  /** Advance signal text shown when ready to proceed */
  advanceSignal: string;
  /** Estimated minutes for this stage */
  estimatedMinutes: number;
}

/** Verified digital resource (video, simulator, article) */
export type DigitalResourceType = 'video' | 'simulator' | 'interactive' | 'article' | 'document';

export interface DigitalResource {
  id: string;
  title: string;
  type: DigitalResourceType;
  url: string;
  platform: string;
  language: 'es' | 'en' | 'both';
  durationMinutes?: number;
  verifiedAt: string; // ISO date
  isAccessible: boolean;
  description: string;
  alignsWithStages: string[]; // learningPathStage ids
}

/** Socratic pause embedded at specific flow moments */
export interface SocraticPause {
  id: string;
  trigger: 'afterStage' | 'beforeStage' | 'midStage';
  targetStageId: string;
  prompt: string;
  followUpQuestion?: string;
  reflectionPrompt: string;
}

/** Evidence criterion tied to a learning-path stage */
export interface EvidenceCriterion {
  stageId: string;
  criterion: string;
  indicator: string; // observable evidence
  weight: number; // 1-5
}

/** ---- Microlearning: Ruta de Aprendizaje Paginada (Clase Interactiva) ---- */

export interface MicroLessonQuiz {
  question: string;
  options: string[]; // exactamente 3 opciones
  correctIndex: number; // 0 | 1 | 2
  correctExplanation?: string; // refuerzo positivo al acertar
  encouragement?: string; // mensaje tierno al fallar
}

export interface MicroLesson {
  id: string;
  title: string;
  theory: string; // teoría breve (<=70 palabras)
  analogy?: string; // analogía del mundo del estudiante
  example?: string; // ejemplo con números/caso concreto
  quiz?: MicroLessonQuiz | null;
}

export interface MicroLessonPlan {
  unitTitle: string;
  lessons: MicroLesson[]; // 1..5 micro-lecciones secuenciales
  closingMessage?: string; // felicitación final del profesor
  providerUsed?: string; // trazabilidad de qué modelo generó el plan
  degraded?: boolean; // true cuando se construyó desde learningPath sin quizzes
}

export interface VerifiedResource {
  title?: string;
  name?: string;
  url: string;
  platform?: string;
  type?: string;
  description?: string;
  thumbnail?: string;
}

export interface MicrocurriculumItem {
  id: string;
  dayNumber: number;
  teachingDay?: string; // e.g. "1 (Lun)", "3 (Jue)"
  monthWeek?: string; // e.g. "Sep / Sem 1"
  date?: string;
  theme: string;
  objective?: string;
  socraticQuestion?: string;
  dynamicActivity?: string;
  verifiedResource?: VerifiedResource;
  classId: string;
  status: 'completed' | 'in_progress' | 'upcoming';
}

export interface MacroTrimesterOverview {
  trimesterNumber: 1 | 2 | 3;
  title: string;
  durationWeeks?: number;
  learningAxis?: string;
  projectIntegration?: string;
  integrativeProject?: string;
  guidingSocraticQuestion?: string;
  evaluativeDeliverable?: string;
  totalClassesScheduled?: number;
}

export interface MacroCurriculum {
  methodology?: string;
  pedagogicalDirective?: string;
  methodologicalApproach?: string;
  generalCompetency?: string;
  studentName?: string;
  gradeLevel?: string;
  trimestersOverview?: MacroTrimesterOverview[];
  trimesters?: MacroTrimesterOverview[];
}

export interface CurriculumUnit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  durationWeeks: number;
  microcurriculum: MicrocurriculumItem[];
}

export interface Subject {
  id: string;
  studentId: StudentId;
  name: string;
  code: string;
  iconName: string;
  color: string;
  description: string;
  teacher: AITeacher;
  curriculumOverview: string;
  macroCurriculum?: MacroCurriculum;
  units: CurriculumUnit[];
  scheduleTime: string;
  daysOfWeek: string[];
  progressPercentage: number;
  classesCompleted: number;
  totalClasses: number;
  category?: 'TRONCAL_MINEDUC' | 'FORMACION_CRISTIANA' | 'COMPLEMENTARIA' | 'AMPLIACION_INTERNACIONAL' | string;
  weeklyHours?: number;
}

export interface WorkAnalysisResult {
  strengths: string[];
  errors: string[];
  explanation: string;
  correction: string;
  recommendations: string[];
  comprehensionLevel: string;
  feedbackSummary: string;
}

export interface StudentSubmission {
  id: string;
  studentId: StudentId;
  subjectId: string;
  classId: string;
  title: string;
  description: string;
  submittedAt: string;
  fileName: string;
  fileType: string;
  fileSize?: string;
  previewUrl?: string;
  status: 'analyzing' | 'reviewed' | 'pending';
  analysis?: WorkAnalysisResult;
  studentNotes?: string;
}

export interface ScheduleSlot {
  timeRange: string; // e.g. "08:00 - 08:45"
  isRecess?: boolean;
  Lunes: string;
  Martes: string;
  Miércoles: string;
  Jueves: string;
  Viernes: string;
}

export interface ScheduleEntry {
  id: string;
  studentId: StudentId;
  subjectId?: string;
  subjectName: string;
  dayOfWeek: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes';
  startTime: string;
  endTime: string;
  color: string;
  iconName: string;
  classId?: string;
  isRecess?: boolean;
}

export type UserRole = 'student' | 'representative' | 'teacher' | 'admin';

export type NavigationTab = 
  | 'home'
  | 'access'
  | 'space'
  | 'subjects'
  | 'subject-detail'
  | 'schedule'
  | 'classes'
  | 'progress'
  | 'parent'
  | 'admin';

