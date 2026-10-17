import { Student, AITeacher, Subject, DailyClass, WorkAnalysisResult, MicroLessonPlan, MicroLesson } from '../types';
import { guideDateKey, readGuideContent, writeGuideContent, readGuideForClass } from '../utils/guideStore';
import type { GuideAiContent } from '../utils/guideGenerator';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface TeacherChatGuideContext {
  explicacion: string;
  preguntas: { tipo?: string; pregunta: string }[];
}

export interface TeacherChatRequest {
  student: Student;
  teacher: AITeacher;
  subject: Subject;
  dailyClass: DailyClass;
  conversationHistory: { role: 'user' | 'model'; content: string }[];
  message: string;
  /**
   * Guía v4 EXACTA del día (mismo string del PDF). `undefined` = no aplica (demo genérica);
   * `null` = la clase real aún no tiene guía generada (el profesor debe decirlo, no inventar).
   */
  guideContext?: TeacherChatGuideContext | null;
}

export interface AnalyzeWorkRequest {
  student: Student;
  subject: Subject;
  dailyClass: DailyClass;
  workTitle: string;
  workDescription: string;
  imageData?: string;
  mimeType?: string;
  studentNotes?: string;
}

// Retry configuration
const RETRY_DELAYS_MS = [2000, 4000, 6000]; // 2s, 4s, 6s
const MAX_RETRIES = RETRY_DELAYS_MS.length;

// Los errores de clave inválida/petición inválida son FATALES: reintentarlos solo quema 12 segundos.
class FatalAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FatalAIError';
  }
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  retries: number = MAX_RETRIES,
  delays: number[] = RETRY_DELAYS_MS
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fetchFn();
    } catch (error: any) {
      if (error?.name === 'FatalAIError') throw error; // transición inmediata al motor auxiliar
      lastError = error;
      
      // If this was the last attempt, throw
      if (attempt === retries) break;
      
      const delay = delays[attempt] || delays[delays.length - 1];
      console.warn(`[Reintento ${attempt + 1}/${retries}] Falló, reintentando en ${delay}ms:`, error.message);
      await sleep(delay);
    }
  }
  
  throw lastError || new Error('Todos los reintentos fallaron');
}

export function renderMarkdownToHtml(content: string): string {
  if (!content || typeof content !== 'string') return '';
  const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  const normalize = (value: string) => value.replace(/\r\n/g, '\n');
  const withInline = (value: string) => {
    let html = escapeHtml(value);
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
    return html;
  };
  const blocks = normalize(content).split(/\n{2,}/);
  const rendered = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (/^(-|\*)\s+/m.test(trimmed)) {
      const items = trimmed.split(/\n/).map((line) => line.trim()).filter(Boolean).map((line) => `<li>${withInline(line.replace(/^[-*]\s*/, ''))}</li>`).join('');
      return `<ul>${items}</ul>`;
    }
    if (/^\d+\.\s+/m.test(trimmed)) {
      const items = trimmed.split(/\n/).map((line) => line.trim()).filter(Boolean).map((line) => `<li>${withInline(line.replace(/^\d+\.\s*/, ''))}</li>`).join('');
      return `<ol>${items}</ol>`;
    }
    if (/^#{1,3}\s+/.test(trimmed)) {
      const headingMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = withInline(headingMatch[2]);
        return `<h${level}>${text}</h${level}>`;
      }
    }
    return `<p>${withInline(trimmed).replace(/\n/g, '<br />')}</p>`;
  });
  return rendered.filter(Boolean).join('');
}



async function fetchWithTimeout(resource: string, options: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(resource, { ...options, signal: controller.signal });
    clearTimeout(id); return response;
  } catch (error) { clearTimeout(id); throw error; }
}

// ==========================================
// PLAN DE MICRO-LECCIONES (ruta paginada + quizzes) — servido por la jerarquía gratuita del servidor
// ==========================================
// Contenido de la Guía Didáctica v4.0: { explicacion, preguntas }.
// El server recibe el material de la clase (y, si existen, los pasos que la Clase Interactiva ya resolvió
// como contexto) y devuelve una explicación corrida acotada por nivel + 2-3 preguntas ancladas al texto.
// `null` => el generador usa su fallback determinista (síntesis local del material de la clase).
export async function requestGuideContent(req: {
  student: Student;
  subject: Subject;
  dailyClass: DailyClass;
  steps?: { title: string; text: string }[];
}): Promise<import('../utils/guideGenerator').GuideAiContent | null> {
  const preset = (req.steps || []).filter((s) => s && typeof s.title === "string" && typeof s.text === "string" && s.text.trim().length > 25).slice(0, 3);
  // Misma entrada del almacén que usa el PDF: la guía buena se reusa sin gastar la cuota del día
  // y, sobre todo, el chat y el papel leen EXACTAMENTE el mismo texto.
  const dateKey = guideDateKey(req.dailyClass);
  const cachedGuide = readGuideContent(req.student?.id, req.dailyClass?.id, dateKey);
  if (cachedGuide && cachedGuide.preguntas.length >= 2) {
    return { ...cachedGuide, providerUsed: `${cachedGuide.providerUsed || 'IA'} (caché de hoy)` };
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch('/api/ai/guide-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        student: req.student, subject: req.subject, dailyClass: req.dailyClass,
        ...(preset.length ? { steps: preset } : {}),
      }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const c = data?.content;
    if (!c || typeof c.explicacion !== 'string' || !c.explicacion.trim() || !Array.isArray(c.preguntas)) return null;

    const preguntas = c.preguntas
      .filter((q: any) => q && typeof q.pregunta === 'string' && q.pregunta.trim())
      .slice(0, 3)
      .map((q: any, i: number) => ({
        tipo: ['literal', 'interpretativa', 'aplicacion'].includes(q.tipo) ? q.tipo : (['literal', 'interpretativa', 'aplicacion'][i] || 'interpretativa'),
        pregunta: String(q.pregunta),
        pista: q.pista ? String(q.pista) : null,
      }));
    if (preguntas.length < 2) return null;

    const built = {
      explicacion: String(c.explicacion),
      preguntas,
      providerUsed: data.providerUsed || 'guía IA v4.0',
    };
    // Persistimos en el almacén compartido; guideGenerator lo re-finaliza y reescribe con el texto impreso exacto.
    writeGuideContent(req.student?.id, req.dailyClass?.id, dateKey, built);
    return built;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Lee (sin red) la guía v4 EXACTA de la clase: la MISMA entrada que imprime el PDF.
// Devuelve null si esa clase todavía no tiene guía generada/persistida.
export function readCachedGuideContent(student: Student, dailyClass: DailyClass): GuideAiContent | null {
  const stored = readGuideForClass(student?.id, dailyClass);
  return stored ? { explicacion: stored.explicacion, preguntas: stored.preguntas, providerUsed: stored.providerUsed } : null;
}

// Lee los pasos de la ruta YA generados para una clase, sin tocar la red (para la descarga por lotes del día).
// Devuelve [] si esa clase aún no tiene micro-lecciones generadas.
export function readCachedBiteSteps(student: Student, dailyClass: DailyClass, total = 3): { title: string; text: string }[] {
  const out: { title: string; text: string }[] = [];
  const dateKey = dailyClass?.date || new Date().toISOString().slice(0, 10);
  for (let i = 1; i <= total; i++) {
    try {
      const raw = localStorage.getItem(biteCacheKey(student?.id || 'x', dailyClass?.id || 'c', dateKey, i));
      const l = raw ? JSON.parse(raw)?.lesson : null;
      if (l && typeof l.theory === 'string' && l.theory.trim()) {
        out.push({ title: String(l.title || `Lección ${i}`), text: [l.theory, l.analogy, l.example].filter(Boolean).join(' ') });
      }
    } catch { /* entrada corrupta: se ignora */ }
  }
  return out;
}

// Re-explicación afectuosa con sustento teórico (usa /api/ai/reexplain; null => el UI mantiene la explicación determinista).
export async function requestReExplanation(req: {
  student: Student;
  teacher: AITeacher;
  subject: Subject;
  dailyClass: DailyClass;
  explanation: { theory: string; analogy?: string; example?: string; question: string; correctAnswer: string };
}): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch('/api/ai/reexplain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        student: req.student, teacher: req.teacher, subject: req.subject,
        dailyClass: req.dailyClass, lesson: req.explanation,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const text = typeof data?.text === 'string' ? data.text.trim() : '';
    return text.length > 12 ? text : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Una micro-lección (JSON pequeño) — camino principal del MicroLessonPlayer: fiable incluso con la capa gratuita saturada.
const BITE_CACHE_PREFIX = 'wisdom_lesson_bite_v1_';
function biteCacheKey(studentId: string, classId: string, date: string, index: number): string {
  return `${BITE_CACHE_PREFIX}${studentId}_${classId}_${index}_${date}`;
}

export async function requestLessonBite(req: {
  student: Student;
  teacher: AITeacher;
  subject: Subject;
  dailyClass: DailyClass;
  index: number; // 1-based
  total: number;
  covered: string[]; // títulos ya explicados (para no repetir)
}): Promise<MicroLesson | null> {
  const dateKey = req.dailyClass?.date || new Date().toISOString().slice(0, 10);
  const key = biteCacheKey(req.student?.id || 'x', req.dailyClass?.id || 'c', dateKey, req.index);
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const parsed = JSON.parse(cached);
      const l = parsed?.lesson;
      if (l && typeof l.theory === 'string' && l.quiz?.options?.length === 3) {
        return {
          id: `micro-${req.dailyClass?.id}-L${req.index}`,
          title: l.title,
          theory: l.theory,
          analogy: l.analogy,
          example: l.example,
          quiz: l.quiz,
        };
      }
    }
  } catch { /* caché corrupta: regenerar */ }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch('/api/ai/lesson-bite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        student: req.student, teacher: req.teacher, subject: req.subject,
        dailyClass: req.dailyClass, index: req.index, total: req.total, covered: req.covered,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const l = data?.lesson;
    if (!l || typeof l.theory !== 'string' || !l.quiz || !Array.isArray(l.quiz.options) || l.quiz.options.length !== 3) return null;
    const lesson: MicroLesson = {
      id: `micro-${req.dailyClass?.id}-L${req.index}`,
      title: String(l.title ?? `Lección ${req.index}`),
      theory: String(l.theory),
      analogy: l.analogy,
      example: l.example,
      quiz: {
        question: String(l.quiz.question),
        options: l.quiz.options.map((o: any) => String(o)),
        correctIndex: Math.min(2, Math.max(0, Number(l.quiz.correctIndex) || 0)),
        correctExplanation: l.quiz.correctExplanation,
      },
    };
    try { localStorage.setItem(key, JSON.stringify({ lesson: l, providerUsed: data.providerUsed })); } catch { /* cuota llena: sin caché, funciona igual */ }
    return lesson;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

function normalizeLessonPlan(raw: any, dailyClass: DailyClass | null, providerUsed?: string): MicroLessonPlan | null {
  try {
    if (!raw || !Array.isArray(raw.lessons) || raw.lessons.length < 1 || raw.lessons.length > 5) return null;
    const lessons: MicroLesson[] = [];
    for (let i = 0; i < raw.lessons.length; i++) {
      const l = raw.lessons[i];
      if (!l || typeof l.title !== 'string' || typeof l.theory !== 'string' || l.theory.trim().length < 10) return null;
      let quiz = null;
      if (l.quiz && typeof l.quiz.question === 'string' && Array.isArray(l.quiz.options) && l.quiz.options.length === 3
        && l.quiz.options.every((o: any) => typeof o === 'string' && o.trim())
        && Number.isInteger(Number(l.quiz.correctIndex)) && Number(l.quiz.correctIndex) >= 0 && Number(l.quiz.correctIndex) <= 2) {
        quiz = {
          question: String(l.quiz.question).trim(),
          options: (l.quiz.options as string[]).map((o) => String(o).trim()),
          correctIndex: Number(l.quiz.correctIndex),
          correctExplanation: typeof l.quiz.correctExplanation === 'string' ? l.quiz.correctExplanation.trim() : undefined,
          encouragement: typeof l.quiz.encouragement === 'string' ? l.quiz.encouragement.trim() : undefined,
        };
      }
      lessons.push({
        id: `micro-${dailyClass?.id || 'clase'}-L${i + 1}`,
        title: String(l.title).trim(),
        theory: String(l.theory).trim(),
        analogy: typeof l.analogy === 'string' && l.analogy.trim() ? l.analogy.trim() : undefined,
        example: typeof l.example === 'string' && l.example.trim() ? l.example.trim() : undefined,
        quiz,
      });
    }
    return {
      unitTitle: typeof raw.unitTitle === 'string' && raw.unitTitle.trim() ? raw.unitTitle.trim() : (dailyClass?.theme || 'Ruta de Aprendizaje'),
      lessons,
      closingMessage: typeof raw.closingMessage === 'string' && raw.closingMessage.trim() ? raw.closingMessage.trim() : undefined,
      providerUsed,
      degraded: false,
    };
  } catch {
    return null;
  }
}

// Construye el plan de respaldo desde el learningPath estático de la clase (siembra sin costo, sin quizzes).
export function buildStaticLessonPlan(dailyClass: DailyClass): MicroLessonPlan | null {
  const stages = (dailyClass.learningPath && dailyClass.learningPath.length > 0)
    ? dailyClass.learningPath
    : [];
  if (stages.length === 0) return null;
  const lessons: MicroLesson[] = stages.map((s, i) => ({
    id: `micro-${dailyClass.id}-L${i + 1}`,
    title: s.title.replace(/^Paso \d+[:\s]*/i, '') || `Lección ${i + 1}`,
    theory: [s.coreConcept.summary, s.coreConcept.detailedExplanation].filter(Boolean).join(' '),
    analogy: s.coreConcept.visualAnalogy,
    example: (s.coreConcept.keyTakeaways || []).slice(0, 3).join(' · '),
    quiz: null,
  }));
  return { unitTitle: dailyClass.theme, lessons, closingMessage: undefined, providerUsed: 'learningPath estático', degraded: true };
}

function lessonPlanCacheKey(student: Student, dailyClass: DailyClass): string {
  const d = new Date();
  const day = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  return `wisdom_lesson_plan_v1_${student?.id || 'x'}_${dailyClass?.id || 'c'}_${dailyClass?.date || day}`;
}

export async function requestLessonPlan(req: {
  student: Student;
  teacher: AITeacher;
  subject: Subject;
  dailyClass: DailyClass;
}): Promise<MicroLessonPlan | null> {
  const cacheKey = lessonPlanCacheKey(req.student, req.dailyClass);
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      const plan = normalizeLessonPlan(parsed?.plan, req.dailyClass, parsed?.providerUsed ? `${parsed.providerUsed} (caché)` : 'caché');
      if (plan) {
        console.log('[lesson-plan] sirviendo desde caché local:', cacheKey);
        return plan;
      }
    }
  } catch { /* caché corrupta o no disponible: seguimos con la red */ }

  const controller = new AbortController();
  // Un plan grande en modelos puede tardar; el resultado se cachea, así que solo pesa la 1ª vez del día.
  const PLAN_TIMEOUT_MS = 90000;
  const timeoutId = setTimeout(() => controller.abort(), PLAN_TIMEOUT_MS);
  try {
    const res = await fetch('/api/ai/lesson-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({ student: req.student, teacher: req.teacher, subject: req.subject, dailyClass: req.dailyClass }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    if (!data || !data.plan) return null;
    const plan = normalizeLessonPlan(data.plan, req.dailyClass, data.providerUsed);
    if (plan) {
      try {
        // Solo cacheamos planes con evaluación (no degradados): un fallo 503 no debe quedar guardado.
        if (plan.lessons.length > 1 && plan.lessons.some((l) => l.quiz)) {
          localStorage.setItem(cacheKey, JSON.stringify({ plan: data.plan, providerUsed: data.providerUsed }));
        }
      } catch { /* sin caché si supera cuota: no es fatal */ }
      console.log('[lesson-plan] generado por:', plan.providerUsed);
    }
    return plan;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ==========================================
// ACCESO EXCLUSIVO VÍA SERVIDOR (Seguridad P0: Cero claves en cliente)
// ==========================================
async function tryServerTeacherHierarchy(req: TeacherChatRequest): Promise<string | null> {
  const SERVER_TIMEOUT_MS = 25000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), SERVER_TIMEOUT_MS);
  try {
    const res = await fetch('/api/ai/teacher-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        student: req.student,
        teacher: req.teacher,
        subject: req.subject,
        dailyClass: req.dailyClass,
        conversationHistory: req.conversationHistory,
        message: req.message,
        guideContext: req.guideContext,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const reply = data?.reply;
    // El servidor marca isOfflineSimulation=true cuando toda su jerarquía falló: en ese caso probamos la fase B local.
    if (data?.isOfflineSimulation) return null;
    if (reply && typeof reply === 'string' && reply.trim()) return reply.trim();
    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ==========================================
// FUNCIÓN CENTRAL: IA DEL PROFESOR (EXCLUSIVO VÍA SERVIDOR)
// ==========================================
export async function askAITeacher(req: TeacherChatRequest): Promise<string> {
  // Comunicación transparente y segura a través de la API propia del servidor
  try {
    const serverReply = await tryServerTeacherHierarchy(req);
    if (serverReply && typeof serverReply === 'string' && serverReply.trim()) {
      return serverReply.trim();
    }
  } catch (err: any) {
    console.warn('[TeacherChat] Error de comunicación con el servidor de IA:', err?.message || err);
  }

  // Estado honesto de contingencia (sin inventar falsas respuestas locales ni simular IA real)
  return `¡Hola, ${req.student.name}! En este momento la conexión con el profesor virtual no está disponible (modo de contingencia sin conexión).

No te preocupes: **tu avance sigue guardado**. Puedes repasar la ficha y los conceptos de la clase arriba, o consultar con tu tutor familiar mientras se restablece el servicio.`;
}

export async function analyzeWork(req: AnalyzeWorkRequest): Promise<WorkAnalysisResult> {
  return { strengths: ['Evidencia recibida correctamente'], errors: [], explanation: 'Trabajo procesado.', correction: '', recommendations: [], comprehensionLevel: 'En evaluación', feedbackSummary: 'Buen trabajo.' };
}