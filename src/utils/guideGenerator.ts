import { DailyClass, Subject } from "../types";
import { readGuideForClass, writeGuideForClass } from "./guideStore";

// ============================================================================
// Guías Didácticas v4.0
// Una guía = una materia = una página. Estructura fija:
//   1) encabezado compacto · 2) explicación corrida · 3) 2-3 preguntas ancladas
//   al texto · 4) firmas.
// El contenido lo produce /api/ai/guide-content con el prompt maestro v4.0 y el
// campo exacto: { explicacion, preguntas }. Si no hay IA, el frontend compone
// una explicación local a partir del material real de la clase.
// ============================================================================

export type EgbLevel = 'Elemental' | 'Media' | 'Superior';
export type GuideQuestionType = 'literal' | 'interpretativa' | 'aplicacion';

export interface GuideQuestion {
  tipo: GuideQuestionType;
  pregunta: string;
  /** Pista corta opcional (máx. 12 palabras), sin símbolos ni capas. */
  pista?: string | null;
}

export interface GuideAiContent {
  explicacion: string;
  preguntas: GuideQuestion[];
  providerUsed?: string;
}

const clean = (s: string, max = 300): string => (s || "").replace(/\s+/g, " ").trim().slice(0, max).replace(/[,;:\s]+$/g, "");
const esc = (s: string): string => (s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const countWords = (s: string): number => (s || "").trim().split(/\s+/).filter(Boolean).length;
const truncateWords = (s: string, max: number): string => {
  const words = (s || "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= max) return s.trim();
  return words.slice(0, max).join(" ").replace(/[,;:\s]+$/g, "") + ".";
};

/** Nivel EGB del estudiante a partir del grado (con respaldo por perfil conocido). */
export function resolveEgbLevel(studentGrade?: string, studentId?: string): EgbLevel {
  const text = (studentGrade || "").toLowerCase();
  if (text.includes('elemental') || text.includes('1.º') || text.includes('2.º') || text.includes('3.º') || text.includes('4.º')) return 'Elemental';
  if (text.includes('media') || text.includes('5.º') || text.includes('6.º') || text.includes('7.º')) return 'Media';
  if (text.includes('superior') || text.includes('8.º') || text.includes('9.º') || text.includes('10.º')) return 'Superior';
  if (studentId === 'gael' || studentId === 'mauricio') return 'Elemental';
  if (studentId === 'avril' || studentId === 'karen') return 'Superior';
  return 'Media';
}

/** Tope duro de palabras de la explicación según nivel (sección 4 del prompt maestro). */
export const wordCapForLevel = (level: EgbLevel): number =>
  level === 'Elemental' ? 120 : level === 'Media' ? 160 : 200;

/** Cantidad y tipos de pregunta exigidos por nivel. */
export const questionTypesForLevel = (level: EgbLevel): GuideQuestionType[] =>
  level === 'Elemental' ? ['literal', 'interpretativa'] : ['literal', 'interpretativa', 'aplicacion'];

export const questionLabel = (tipo: GuideQuestionType): string =>
  tipo === 'literal' ? 'Literal' : tipo === 'interpretativa' ? 'Interpretativa' : 'Aplicación';

const buildQuestions = (theme: string, level: EgbLevel): GuideQuestion[] => {
  const literal: GuideQuestion = { tipo: 'literal', pregunta: `¿Qué es "${theme}" según el texto?`, pista: 'Búscalo en la explicación' };
  const interpretativa: GuideQuestion = { tipo: 'interpretativa', pregunta: `¿Por qué es importante entender "${theme}"?`, pista: 'Conecta dos ideas del texto' };
  const aplicacion: GuideQuestion = { tipo: 'aplicacion', pregunta: `¿Cómo aplicarías hoy algo de "${theme}" en tu vida diaria?`, pista: 'Menciona un ejemplo tuyo' };
  return questionTypesForLevel(level).map((tipo) =>
    tipo === 'literal' ? literal : tipo === 'interpretativa' ? interpretativa : aplicacion,
  );
};

/** Fallback determinista: una explicación corrida con el material real de la clase. */
const buildFromReading = (c: DailyClass, level: EgbLevel): GuideAiContent => {
  const cap = wordCapForLevel(level);
  const theme = clean(c.theme, 80) || "el tema de hoy";
  const parts = [clean(c.introduction, 300), clean(c.reading, 260), clean(c.objective, 180)]
    .filter((s) => s && countWords(s) >= 4);
  let explicacion = parts.length
    ? parts.join(" ")
    : `El tema de hoy es "${theme}". Trabajaremos qué es, por qué importa y un ejemplo para tu edad.`;
  if (countWords(explicacion) < 60) {
    explicacion += ` Por ejemplo, imagina cómo "${theme}" aparece en una situación de tu día a día: allí se entiende mejor.`;
  }
  return {
    explicacion: truncateWords(clean(explicacion, 3000), cap),
    preguntas: buildQuestions(theme, level),
    providerUsed: "síntesis local del material de la clase",
  };
};

/**
 * Compone la explicación a partir de los pasos que la ruta interactiva ya resolvió
 * (caché local, sin red). Mantiene la coherencia guía == clase, pero en un solo bloque.
 */
export function routeGuideContent(
  routeSteps: { title: string; text: string }[],
  meta: { theme: string; studentGrade?: string; studentId?: string; subjectName?: string },
): GuideAiContent | null {
  const steps = (routeSteps || [])
    .filter((s) => s && typeof s.text === 'string' && countWords(s.text) >= 6)
    .slice(0, 3);
  if (steps.length < 2) return null;
  const level = resolveEgbLevel(meta.studentGrade, meta.studentId);
  const cap = wordCapForLevel(level);
  const theme = clean((meta.theme || '').replace(/^(continuaci[oó]n|repaso|ampliaci[oó]n|conexi[oó]n)\s*[:\-–—]\s*/i, ''), 80);
  const body = steps.map((s) => clean(s.text, 320)).join(' ');
  const explicacion = truncateWords(clean(`Hoy estudiamos "${theme}". ${body}`, 3000), cap);
  return {
    explicacion,
    preguntas: buildQuestions(theme, level),
    providerUsed: "compuesta desde la ruta del estudiante (local)",
  };
}

// ----------------------------------------------------------------------------
// Plantilla HTML (una página A4 por materia)
// ----------------------------------------------------------------------------

const WISDOM_LOGO_SVG = `<svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none" aria-label="Wisdom School"><path d="M 16 56 L 16 24 C 33.67 24 48 38.33 48 56 Z" fill="#78C043"/><path d="M 16 56 H 48 V 88 C 30.33 88 16 73.67 16 56 Z" fill="#E5234A"/><path d="M 48 88 V 56 C 65.67 56 80 70.33 80 88 Z" fill="#F37023"/><path d="M 112 56 H 80 C 80 38.33 94.33 24 112 24 Z" fill="#00AEEF"/><path d="M 80 56 H 112 C 112 73.67 97.67 88 80 88 Z" fill="#583F8C"/></svg>`;

const GUIDE_PAGE_CSS = `
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; orphans: 3; widows: 3; }
  html, body { margin: 0; padding: 0; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #1f2937; background: #e2e8f0; }
  .pagina-guia {
    width: 210mm; min-height: 297mm; padding: 18mm 16mm 20mm 16mm;
    background: #fff; margin: 0 auto;
    display: flex; flex-direction: column;
    page-break-after: always; page-break-inside: avoid;
  }
  .pagina-guia:last-child { page-break-after: auto; }
  .encabezado { flex: 0 0 auto; max-height: 22mm; border-bottom: 2px solid #1e3a8a; padding-bottom: 2.5mm; }
  .guia-marca { font: 700 9pt 'Segoe UI', Arial, sans-serif; color: #1e3a8a; letter-spacing: .6px; text-transform: uppercase; }
  .guia-titulo { font: 800 15pt/1.2 'Segoe UI', Arial, sans-serif; color: #0f172a; margin: 1mm 0 .5mm; }
  .guia-meta { font: 9.5pt 'Segoe UI', Arial, sans-serif; color: #475569; line-height: 1.35; }
  .guia-meta strong { color: #0f172a; }
  .bloque-explicacion { flex: 0 0 auto; max-height: 95mm; overflow: hidden; margin-top: 4mm; }
  .bloque-titulo { font: 800 11pt 'Segoe UI', Arial, sans-serif; color: #fff; background: #1e3a8a; display: inline-block; padding: 1mm 3mm; border-radius: 1.5mm; margin: 0 0 2.5mm; }
  .explicacion { font-size: 12pt; line-height: 1.55; margin: 0; text-align: justify; }
  .bloque-preguntas { flex: 1 1 auto; font-size: 12pt; line-height: 1.6; margin-top: 4mm; }
  .pregunta { margin-bottom: 3.5mm; }
  .pregunta-texto { margin: 0; font-size: 12pt; }
  .pregunta-num { font-weight: 700; color: #1e3a8a; }
  .pregunta-tipo { font: 700 8pt 'Segoe UI', Arial, sans-serif; text-transform: uppercase; color: #64748b; letter-spacing: .5px; }
  .pista { font: italic 9.5pt 'Segoe UI', Arial, sans-serif; color: #64748b; margin: 1mm 0 0; }
  .linea-respuesta { border-bottom: 1px dotted #94a3b8; height: 8mm; margin-top: 2mm; }
  .pagina-guia.nivel-elemental .linea-respuesta { height: 9mm; }
  .firma { flex: 0 0 auto; margin-top: auto; padding-top: 10mm; display: flex; gap: 20mm; }
  .firma div { flex: 1; border-top: 1px solid #64748b; padding-top: 2mm; text-align: center; font: 9pt 'Segoe UI', Arial, sans-serif; color: #475569; }
  .pie { flex: 0 0 auto; text-align: center; font: 8pt 'Segoe UI', Arial, sans-serif; color: #94a3b8; margin-top: 4mm; }

  @media print {
    body { background: #fff; }
    .pagina-guia { margin: 0; box-shadow: none; }
    .no-print { display: none !important; }
  }
`;

const COVER_CSS = `
  .portada {
    width: 210mm; min-height: 297mm; padding: 28mm 20mm; background: #fff; margin: 0 auto;
    display: flex; flex-direction: column; justify-content: flex-start;
    page-break-after: always; page-break-inside: avoid;
  }
  .portada .brand { display: flex; align-items: center; gap: 3mm; border-bottom: 3px double #1e3a8a; padding-bottom: 3mm; }
  .portada .brand .logo { width: 12mm; height: 12mm; }
  .portada .brand .ws { font: 800 16pt 'Segoe UI', Arial, sans-serif; color: #1e3a8a; }
  .portada .brand small { margin-left: auto; font: 9pt 'Segoe UI', Arial, sans-serif; color: #64748b; letter-spacing: 1px; }
  .portada h1 { font: 800 22pt/1.25 'Segoe UI', Arial, sans-serif; color: #0f172a; margin: 18mm 0 4mm; }
  .portada .sub { font: 12pt 'Segoe UI', Arial, sans-serif; color: #475569; margin-bottom: 10mm; }
  .portada .cover-meta { font: 11pt 'Segoe UI', Arial, sans-serif; color: #334155; line-height: 1.9; border: 1.5px solid #cbd5e1; border-radius: 3mm; padding: 6mm 8mm; }
  .portada .cover-meta strong { color: #0f172a; }
  .portada .cover-list { font-size: 11pt; color: #1f2937; margin: 8mm 0 0 6mm; padding: 0; }
  .portada .cover-list li { margin-bottom: 1.5mm; }
  .portada .nota { font: 10pt 'Segoe UI', Arial, sans-serif; color: #64748b; margin-top: 10mm; }
  .portada .firma { margin-top: auto; }
`;

const bannerFor = (_studentId: string): string =>
  `<div style="margin:2mm 0 3mm;background:#f8fafc;border:1px solid #cbd5e1;border-radius:2mm;padding:2mm 3mm;font:9.5pt 'Segoe UI',Arial;color:#334155;">🎓 <strong>Wisdom Academy:</strong> Aprender con profundidad. Avanzar con propósito. <em>Guía Pedagógica Socrática</em></div>`;

const buildQuestionsHtml = (preguntas: GuideQuestion[], level: EgbLevel): string => {
  const lines = level === 'Elemental' ? 3 : 2;
  return preguntas.map((q, i) => `
    <div class="pregunta">
      <p class="pregunta-texto">
        <span class="pregunta-num">${i + 1}.</span>
        <span class="pregunta-tipo">${esc(questionLabel(q.tipo))}</span>
        ${esc(clean(q.pregunta, 240))}
      </p>
      ${q.pista ? `<p class="pista">Pista: ${esc(clean(q.pista, 90))}</p>` : ''}
      ${Array.from({ length: lines }, () => '<div class="linea-respuesta"></div>').join('')}
    </div>`).join('');
};

const isUsableGuide = (c?: GuideAiContent | null): c is GuideAiContent =>
  !!c && typeof c.explicacion === 'string' && c.explicacion.trim().length > 0 && Array.isArray(c.preguntas) && c.preguntas.length >= 2;

/**
 * Resuelve el contenido EXACTO de la guía y lo persiste en el almacén por clase.
 * Prioridad: IA recién generada → guía ya almacenada (mismo string que un PDF previo) → síntesis local.
 * El texto final (ya recortado al tope de palabras y con las preguntas del nivel) es el que se
 * guarda, de modo que el chat del profesor cite literalmente lo impreso.
 */
const resolveGuideContent = (currentClass: DailyClass, level: EgbLevel, ai?: GuideAiContent | null): GuideAiContent => {
  const raw: GuideAiContent = isUsableGuide(ai)
    ? ai
    : (readGuideForClass(currentClass.studentId, currentClass) as GuideAiContent | null) || buildFromReading(currentClass, level);

  const finalContent: GuideAiContent = {
    explicacion: truncateWords(clean(raw.explicacion, 3000), wordCapForLevel(level)),
    preguntas: (raw.preguntas || []).filter((q) => q && q.pregunta).slice(0, level === 'Elemental' ? 2 : 3),
    providerUsed: raw.providerUsed,
  };
  writeGuideForClass(currentClass.studentId, currentClass, finalContent);
  return finalContent;
};

const buildGuidePage = (
  currentClass: DailyClass,
  subject: Subject | undefined,
  studentName: string,
  studentGrade: string,
  ai?: GuideAiContent | null,
): string => {
  const level = resolveEgbLevel(studentGrade, currentClass.studentId);
  const content = resolveGuideContent(currentClass, level, ai);
  const explicacion = content.explicacion;
  const preguntas = content.preguntas;
  const subjectName = subject?.name || 'Materia';
  const teacherName = subject?.teacher?.name || 'Docente IA';
  const dateStr = currentClass.date || new Date().toLocaleDateString('es-EC');
  const unit = currentClass.unit || 'Unidad curricular';
  const origin = content.providerUsed ? `<div class="guia-meta">Origen del contenido: ${esc(clean(content.providerUsed, 90))}</div>` : '';

  return `
  <section class="pagina-guia ${level === 'Elemental' ? 'nivel-elemental' : ''}">
    <header class="encabezado">
      <div class="guia-marca">Wisdom School · Guía Didáctica v4.0</div>
      <div class="guia-titulo">${esc(subjectName)} — ${esc(clean(currentClass.theme, 90))}</div>
      <div class="guia-meta"><strong>Unidad:</strong> ${esc(clean(unit, 110))}</div>
      <div class="guia-meta"><strong>Estudiante:</strong> ${esc(studentName)} · ${esc(studentGrade)} · <strong>Docente IA:</strong> ${esc(teacherName)} · <strong>Fecha:</strong> ${esc(dateStr)}</div>
      ${origin}
    </header>

    <div class="bloque-explicacion">
      <h2 class="bloque-titulo">1. Explicación del tema</h2>
      <p class="explicacion">${esc(explicacion)}</p>
    </div>

    <div class="bloque-preguntas">
      <h2 class="bloque-titulo">2. Preguntas sobre el texto</h2>
      ${buildQuestionsHtml(preguntas, level)}
    </div>

    <div class="firma">
      <div>Firma del estudiante</div>
      <div>Firma del representante / docente guía</div>
    </div>
    <div class="pie">Wisdom School · Guía Didáctica v4.0 · ${esc(subjectName)} · ${esc(dateStr)}</div>
  </section>`;
};

export function generateClassGuideHTML(
  currentClass: DailyClass,
  subject?: Subject,
  studentName: string = "Estudiante",
  studentGrade: string = "Educación General Básica",
  ai?: GuideAiContent | null,
): string {
  const page = buildGuidePage(currentClass, subject, studentName, studentGrade, ai);
  const printBar = `<div class="no-print" style="position:fixed;top:12px;right:14px;z-index:50;"><button onclick="window.print()" style="background:#2563eb;color:#fff;border:none;padding:8px 16px;border-radius:6px;font:700 13px 'Segoe UI',Arial;cursor:pointer;">🖨️ Imprimir / Guardar PDF</button></div>`;
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${esc(clean(currentClass.guideTitle || `Guía Didáctica — ${currentClass.theme}`, 90))}</title>
  <style>${GUIDE_PAGE_CSS}</style>
</head>
<body>
  ${printBar}
  ${page}
</body>
</html>`;
}

const downloadHTML = (html: string, filename: string): void => {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  try {
    const win = window.open("", "_blank");
    if (win) { win.document.write(html); win.document.close(); }
  } catch { /* bloqueado: la descarga ya ocurrió */ }
};

export function downloadClassGuide(
  currentClass: DailyClass,
  subject?: Subject,
  studentName: string = "Estudiante",
  studentGrade: string = "Educación General Básica",
  ai?: GuideAiContent | null,
): void {
  const html = generateClassGuideHTML(currentClass, subject, studentName, studentGrade, ai ?? null);
  const n = new Date();
  const stamp = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}_${String(n.getHours()).padStart(2, '0')}${String(n.getMinutes()).padStart(2, '0')}`;
  downloadHTML(html, `Guia_Didactica_${subject?.code || 'GEN'}_${currentClass.id || 'clase'}_${stamp}.html`);
}

export interface DailyGuideBundleItem {
  currentClass: DailyClass;
  subject?: Subject;
  ai?: GuideAiContent | null;
}

/** Portada (logo + mundo temático) + una página por materia programada del día. */
export function generateDailyGuidesBundleHTML(opts: {
  studentName: string;
  studentGrade: string;
  dateStr: string;
  dayLabel?: string;
  studentId?: string;
  items: DailyGuideBundleItem[];
}): string {
  const { studentName, studentGrade, dateStr, dayLabel, studentId } = opts;
  const items = (opts.items || []).filter((it) => it && it.currentClass);
  const pages = items.map((it) => buildGuidePage(it.currentClass, it.subject, studentName, studentGrade, it.ai ?? null));
  const printBar = `<div class="no-print" style="position:fixed;top:12px;right:14px;z-index:50;"><button onclick="window.print()" style="background:#2563eb;color:#fff;border:none;padding:8px 16px;border-radius:6px;font:700 13px 'Segoe UI',Arial;cursor:pointer;">🖨️ Imprimir / Guardar PDF combinado</button></div>`;

  const cover = `
  <section class="portada">
    <div class="brand">
      ${WISDOM_LOGO_SVG}
      <span class="ws">WISDOM SCHOOL</span>
      <small>ECUADOR · 2026-2027 · CONFESIÓN EVANGÉLICA</small>
    </div>
    <h1>Guías Didácticas del Día<br><span style="color:#1e3a8a;">Formato v4.0</span></h1>
    <div class="sub">${items.length} asignatura${items.length === 1 ? "" : "s"} programada${items.length === 1 ? "" : "s"} en el horario escolar</div>
    ${bannerFor(studentId || '')}
    <div class="cover-meta">
      <div><strong>Alumno:</strong> ${esc(studentName)}</div>
      <div><strong>Grado:</strong> ${esc(studentGrade)}</div>
      <div><strong>Fecha:</strong> ${esc(dateStr)}</div>
      ${dayLabel ? `<div><strong>Día escolar:</strong> ${esc(dayLabel)}</div>` : ''}
    </div>
    <ol class="cover-list">
      ${items.map((it) => `<li><b>${esc(it.subject?.name || "Materia")}</b> — ${esc(clean(it.currentClass.theme, 70))}</li>`).join("")}
    </ol>
    <p class="nota">Una página por asignatura. Usa «Imprimir / Guardar PDF combinado» y elige «Guardar como PDF».</p>
    <div class="firma">
      <div>Firma del estudiante</div>
      <div>Firma del representante / docente guía</div>
    </div>
  </section>`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Guías Didácticas del Día — ${esc(dateStr)}</title>
  <style>${GUIDE_PAGE_CSS}${COVER_CSS}</style>
</head>
<body>
  ${printBar}
  ${cover}
  ${pages.join("\n")}
</body>
</html>`;
}

export function downloadDailyGuidesBundle(opts: {
  studentName: string;
  studentGrade: string;
  dateStr: string;
  dayLabel?: string;
  studentId?: string;
  items: DailyGuideBundleItem[];
}): string {
  const html = generateDailyGuidesBundleHTML(opts);
  const n = new Date();
  const hhmm = `${String(n.getHours()).padStart(2, '0')}${String(n.getMinutes()).padStart(2, '0')}`;
  const safeDate = (opts.dateStr || "dia").replace(/[^\w\-]+/g, "_");
  const safeStudent = (opts.studentName || "estudiante").split(" ")[0].replace(/[^\w\-]+/g, "");
  const filename = `Guias_Didacticas_v4_${safeDate}_${safeStudent}_${hhmm}.html`;
  downloadHTML(html, filename);
  return filename;
}
