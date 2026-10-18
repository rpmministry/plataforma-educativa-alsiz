import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { runMigrations, checkMigrationsStatus, checkMigrationsStatusAsync } from './server/db/migrator';
import { isDatabaseConnected } from './server/db/database';
import { isDatabaseConnectedAsync } from './server/db/dal';
import { authenticate } from './server/middleware/authMiddleware';
import { errorHandler } from './server/middleware/errorHandler';
import { authRouter } from './server/routes/authRoutes';
import { studentRouter } from './server/routes/studentRoutes';
import { representativeRouter } from './server/routes/representativeRoutes';
import { adminRouter } from './server/routes/adminRoutes';
import { academicRouter } from './server/routes/academicRoutes';
import knowledgeRouter from './server/routes/knowledgeRoutes';
import agentRouter from './server/routes/agentRoutes';
import { pilotRouter } from './server/routes/pilotRoutes';
import { continuingEducationRouter } from './server/routes/continuingEducationRoutes';
import { sendStudentPinEmail } from './server/email/emailService';
import { validateProductionSessionSecret } from './server/auth/crypto';
import { ProviderManager } from './server/agents/providers/providerManager';

// Carga de variables locales SOLO fuera de Vercel (allí el entorno las inyecta).
if (!process.env.VERCEL) {
  dotenv.config();
  dotenv.config({ path: '.env.local' });
}

// Validación obligatoria de seguridad P0 en producción: SESSION_SECRET
try {
  validateProductionSessionSecret();
} catch (secErr: any) {
  console.error('[SecurityGuard] ERROR CRÍTICO DE SEGURIDAD:', secErr.message);
  process.exit(1);
}

// Inicialización y verificación de base de datos relacional y migraciones versionadas
if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.RUN_MIGRATIONS_ON_STARTUP !== 'true') {
      const migStatus = checkMigrationsStatus();
      if (migStatus.status === 'UNINITIALIZED') {
        console.warn('[Server] Base de datos no inicializada. Aplicando migraciones base...');
        runMigrations();
      } else if (migStatus.status === 'PENDING') {
        console.warn(`[Server] ADVERTENCIA: ${migStatus.pendingVersions.length} migraciones pendientes (${migStatus.pendingVersions.join(', ')}). Ejecute 'npm run db:migrate' en el paso de release.`);
      } else {
        console.log(`[Server] Esquema de base de datos verificado: v${migStatus.latestVersion || '000'} (${migStatus.appliedCount} migraciones activas).`);
      }
    } else {
      runMigrations();
    }
  } catch (migErr: any) {
    console.error('[Server] Advertencia inicializando base de datos:', migErr?.message || migErr);
  }
}

// Base del proyecto. En Vercel process.cwd() es /var/task; en local, la raíz del repo.
const appRoot = process.cwd();

const app = express();

// Detrás de reverse proxy o reescrituras de Vercel / Nginx / Render, habilitar trust proxy
app.set('trust proxy', 1);

// Paso 2: desactivamos el ETag para evitar caché agresivo y forzamos una recarga más limpia en frontend durante desarrollo.
app.disable('etag');
app.use((req, res, next) => {
  const isHtml = req.path === '/' || req.path.endsWith('.html');
  const isFrontendAsset =
    req.path.startsWith('/src/') ||
    req.path.startsWith('/@vite/') ||
    req.path.startsWith('/assets/') ||
    req.path.endsWith('.js') ||
    req.path.endsWith('.css') ||
    req.path.endsWith('.svg') ||
    req.path.endsWith('.png') ||
    req.path.endsWith('.jpg') ||
    req.path.endsWith('.jpeg') ||
    req.path.endsWith('.webp') ||
    req.path.endsWith('.ico');

  if (isHtml || isFrontendAsset) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  next();
});

// Paso 3: habilitamos JSON y formularios extensos porque la app genera fotos, textos largos y payloads de IA.
// En Vercel (@vercel/node) el cuerpo llega YA parseado; marcamos req._body para que body-parser no intente
// releer un stream consumido (era la causa de los 500 en todos los POST de /api/ai/*).
app.use((req: any, _res: Response, next) => {
  if (req.body !== undefined && req.body !== null && typeof req.body === 'object') {
    req._body = true;
  }
  next();
});
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Paso 4: aseguramos que exista la carpeta pública de imágenes de estudiantes para guardar fotos y archivos visuales.
const publicStudentsDir = path.join(appRoot, 'public', 'students');
try {
  if (!fs.existsSync(publicStudentsDir)) {
    fs.mkdirSync(publicStudentsDir, { recursive: true });
  }
} catch (err: any) {
  // En serverless (Vercel) el FS de la función es de solo lectura: no debe impedir el arranque de la API de IA.
  console.warn('No se pudo preparar public/students:', err?.message || err);
}

// Paso 5: este endpoint resuelve imágenes de estudiantes sin depender del nombre exacto o la extensión exacta.
app.get('/students/:filename', (req: Request, res: Response, next) => {
  const reqName = req.params.filename.toLowerCase();
  const searchDirs = [
    publicStudentsDir,
    path.join(appRoot, 'public'),
    path.join(appRoot, 'dist', 'students'),
    path.join(appRoot, 'dist'),
  ];

  for (const dir of searchDirs) {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);
      const match = files.find(
        (f) => f.toLowerCase() === reqName || f.toLowerCase().startsWith(reqName.split('.')[0])
      );
      if (match) {
        const filePath = path.join(dir, match);
        const ext = path.extname(match).toLowerCase();
        if (ext === '.png') res.setHeader('Content-Type', 'image/png');
        else if (ext === '.jpg' || ext === '.jpeg') res.setHeader('Content-Type', 'image/jpeg');
        else if (ext === '.svg') res.setHeader('Content-Type', 'image/svg+xml');
        else if (ext === '.webp') res.setHeader('Content-Type', 'image/webp');
        return res.sendFile(filePath);
      }
    }
  }
  next();
});

// Paso 6: servimos la carpeta pública y la ruta de estudiantes para que el frontend pueda cargar fotos y avatares sin problema.
app.use('/students', express.static(publicStudentsDir));
app.use(express.static(path.join(appRoot, 'public')));

// ===== API MODULAR ALSIZ v1 (Persistencia Relacional, Identidad y RBAC) =====
app.use('/api/v1', authenticate);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/representatives', representativeRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/academic', academicRouter);
app.use('/api/v1/knowledge', knowledgeRouter);
app.use('/api/v1/agents', agentRouter);
app.use('/api/v1/pilot', pilotRouter);
app.use('/api/v1/continuing-ed', continuingEducationRouter);

// Paso 7: este endpoint guarda la foto real del estudiante en el servidor para que se use en la interfaz y quede persistida.
app.post('/api/students/upload-avatar', (req: Request, res: Response) => {
  try {
    const { studentId, imageBase64 } = req.body;
    if (!studentId || !imageBase64) {
      return res.status(400).json({ error: 'Falta studentId o imageBase64' });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    const targetFile = path.join(publicStudentsDir, `${studentId.toLowerCase()}.png`);
    fs.writeFileSync(targetFile, buffer);

    // Also write to dist/students if dist exists
    const distStudentsDir = path.join(appRoot, 'dist', 'students');
    if (!fs.existsSync(distStudentsDir)) {
      fs.mkdirSync(distStudentsDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distStudentsDir, `${studentId.toLowerCase()}.png`), buffer);

    const avatarUrl = `/students/${studentId.toLowerCase()}.png?t=${Date.now()}`;
    return res.json({ success: true, avatarUrl });
  } catch (error: any) {
    console.error('Error al guardar foto de estudiante:', error);
    return res.status(500).json({ error: error?.message || 'Error al guardar la foto' });
  }
});

// Paso 8: verificamos qué avatares existen para decidir si ya hay una imagen real del estudiante cargada o se usa una predeterminada.
app.get('/api/students/avatars-status', (req: Request, res: Response) => {
  const results: Record<string, string | null> = { avril: null, gael: null };
  for (const id of ['avril', 'gael']) {
    for (const ext of ['.png', '.jpg', '.jpeg', '.webp']) {
      const p = path.join(publicStudentsDir, `${id}${ext}`);
      if (fs.existsSync(p)) {
        results[id] = `/students/${id}${ext}?t=${Date.now()}`;
        break;
      }
    }
  }
  res.json({ results });
});

// Paso 9b: envía el PIN por email al iniciar sesión usando Resend con fallback a SMTP
app.post('/api/send-pin', async (req: Request, res: Response) => {
  const { email, pinCode, studentName } = req.body;
  if (!email || !pinCode) {
    return res.status(400).json({ error: 'Missing email or pinCode' });
  }
  try {
    const result = await sendStudentPinEmail({
      toEmail: email,
      pinCode,
      studentName,
    });
    res.json({ success: true, result });
  } catch (e: any) {
    console.error('Error sending PIN email:', e);
    res.status(500).json({ error: e?.message || 'Failed to send email' });
  }
});

// Paso 9: inicializamos el cliente de Gemini solo cuando se necesita, con validación de la clave de entorno para no fallar en runtime.
// Carga perezosa: así los endpoints de IA no arrastran @google/genai en el arranque de la función serverless.
async function getGeminiClient(): Promise<any> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not defined in environment variables.');
    return null;
  }
  const { GoogleGenAI } = await import('@google/genai');
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Paso 10: el health check sirve como verificación de que el backend y la BD están vivos
app.get(['/api/health', '/api/v1/health'], async (req: Request, res: Response) => {
  let hierarchySummary: string[] = [];
  let aiHealthReport = ProviderManager.getHealthReport();
  try {
    hierarchySummary = aiHealthReport.providers.map(
      (p) => `${p.name} (${p.status}): ${p.model}`
    );
  } catch { /* no debe tumbar el health */ }

  const dbConnected = await isDatabaseConnectedAsync();
  const migStatus = await checkMigrationsStatusAsync();
  const isHealthy = dbConnected && (migStatus.status === 'SYNCED' || migStatus.status === 'PENDING');

  const payload = {
    status: isHealthy ? 'ok' : 'degraded',
    version: '1.0.0',
    service: 'Plataforma Educativa ALSIZ — Ekballo Church',
    database: {
      engine: process.env.TURSO_DATABASE_URL ? 'Turso Cloud (libSQL Remote)' : 'node:sqlite (Embedded SQLite3 with WAL)',
      connected: dbConnected,
      status: dbConnected ? (migStatus.status === 'SYNCED' ? 'HEALTHY' : 'NEEDS_MIGRATION') : 'DISCONNECTED',
      migrations: {
        status: migStatus.status,
        appliedCount: migStatus.appliedCount,
        latestVersion: migStatus.latestVersion,
      },
    },
    ai: {
      deepSeekConfigured: ProviderManager.isProviderAvailable('DEEPSEEK'),
      deepSeekModel: (process.env.DEEPSEEK_MODEL || 'deepseek-chat').trim(),
      geminiConfigured: ProviderManager.isProviderAvailable('GEMINI'),
      openRouterConfigured: ProviderManager.isProviderAvailable('OPENROUTER'),
      ttsConfigured: Boolean(process.env.GOOGLE_TTS_API_KEY?.trim()),
      freeFirst: !ProviderManager.isProviderAvailable('DEEPSEEK'),
      availableProviders: ProviderManager.getAvailableProviders(),
      hierarchy: hierarchySummary,
      activeProvider: aiHealthReport.activeProvider,
    },
    uptime: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    time: new Date().toISOString(),
  };

  if (!dbConnected) {
    return res.status(503).json(payload);
  }

  return res.json(payload);
});

// Endpoint seguro de salud e inventario de IA (sin credenciales ni PII)
app.get('/api/ai/health', (_req: Request, res: Response) => {
  try {
    const report = ProviderManager.getHealthReport();
    return res.status(200).json({ success: true, ...report });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// --- TTS: voz Neuronal2 de Google (la clave vive SOLO en el servidor) ---
// El cliente pide el audio aquí; nunca ve la API key.
const TTS_FEMALE_FIRST_NAMES = [
  'sofia', 'sarah', 'valentina', 'carla', 'clara', 'lucia', 'maya',
  'emma', 'pincelita', 'mariana', 'camila', 'valeria', 'paula', 'maria',
];

function isFemaleTeacherName(teacherName: string): boolean {
  const lower = (teacherName || '').toLowerCase().trim();
  if (!lower) return false;
  const parts = lower.replace(/[.,]/g, '').split(/\s+/);
  if (parts.some((p) => TTS_FEMALE_FIRST_NAMES.includes(p))) return true;
  return ['dra.', 'maestra', 'profesora', 'miss', 'tía ', 'tia ', 'mba'].some((t) => lower.includes(t));
}

function getTTSKeys(): string[] {
  // Solo la clave de Google Cloud (Text-to-Speech). NO usar GEMINI_API_KEY:
  // es una key de AI Studio (formato AQ.) y Google TTS la rechaza con 401.
  return [(process.env.GOOGLE_TTS_API_KEY || '').trim()].filter(Boolean);
}

app.post('/api/tts', async (req: Request, res: Response) => {
  try {
    const { text, teacherName } = req.body || {};
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'text_required' });
    }

    const keys = getTTSKeys();
    if (keys.length === 0) {
      return res.status(503).json({ error: 'tts_not_configured' });
    }

    const isFemale = isFemaleTeacherName(teacherName || '');
    const voiceName = isFemale ? 'es-US-Neural2-A' : 'es-US-Neural2-B';
    const cleanText = text.replace(/[*_#`~]/g, '').slice(0, 5000);

    let lastDetail = '';
    for (const key of keys) {
      const r = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(key)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text: cleanText },
          voice: { languageCode: 'es-US', name: voiceName },
          audioConfig: { audioEncoding: 'MP3', speakingRate: 1.05, pitch: isFemale ? 1.0 : -2.0 },
        }),
      });
      if (r.ok) {
        const data: any = await r.json().catch(() => null);
        if (data?.audioContent) return res.json({ audioContent: data.audioContent, voice: voiceName });
        lastDetail = 'respuesta sin audioContent';
      } else {
        lastDetail = (await r.text().catch(() => '')).slice(0, 200);
      }
    }
    return res.status(502).json({ error: 'tts_failed', detail: lastDetail });
  } catch (err: any) {
    return res.status(500).json({ error: 'tts_error', message: err?.message || String(err) });
  }
});

// Extrae el primer objeto JSON balanceado de una respuesta que puede traer prosa o fences de markdown.
function extractJsonObject(raw: string | null | undefined): string | null {
  const text = (raw || '').replace(/```json/gi, '').replace(/```/g, '').replace(/<thinking>[\s\S]*?<\/thinking>/gi, '');
  const start = text.indexOf('{');
  if (start === -1) return null;
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

// Los modelos gratuitos suelen dejar saltos de línea crudos dentro de los strings o comas colgantes:
// reparamos antes de tirar la toalla. Si aún así falla, devolvemos snippet para diagnóstico.
function sanitizeJsonText(s: string): string {
  let out = '';
  let inString = false;
  let escaped = false;
  for (const ch of s) {
    if (inString) {
      if (escaped) { out += ch; escaped = false; continue; }
      if (ch === '\\') { out += ch; escaped = true; continue; }
      if (ch === '"') { inString = false; out += ch; continue; }
      if (ch === '\n') { out += '\\n'; continue; }
      if (ch === '\r') { continue; }
      if (ch === '\t') { out += '\\t'; continue; }
      out += ch;
    } else {
      if (ch === '"') inString = true;
      out += ch;
    }
  }
  return out;
}

function looseParseJson(candidate: string | null): any | null {
  if (!candidate) return null;
  const trimmed = candidate.replace(/<\/?CPA_DONE>/gi, '').trim();
  try { return JSON.parse(trimmed); } catch { /* reparamos */ }
  try { return JSON.parse(sanitizeJsonText(trimmed).replace(/,\s*([}\]])/g, '$1')); } catch { return null; }
}

// Los modelos ":free" de razonamiento a veces devuelven en `content` su cadena de pensamiento y, dentro,
// la respuesta final entre comillas. Extrae la parte útil en español; si no la hay, devuelve null
// para que el front use SIEMPRE su explicación determinista (nunca queda vacía).
function cleanReasoningLeak(rawText: string | null | undefined): string | null {
  const t = (rawText || '').replace(/<\/?CPA_DONE>/gi, '').trim();
  if (!t) return null;
  const looksSpanish = (s: string) => /[áéíóúñ¿¡]|no pasa|porque|respuesta|correct|fracci/i.test(s);

  // 1) La respuesta final suele venir entrecomillada (“...” o "...").
  const quotes = Array.from(t.matchAll(/[“"]([^“”"]{40,})[”"]/g)).map((m) => m[1].trim());
  const bestQuote = quotes.filter(looksSpanish).sort((a, b) => b.length - a.length)[0];
  if (bestQuote) return bestQuote;

  // 2) Sin cita clara, corta el preámbulo de razonamiento: toma desde la primera línea en español
  //    que no sea "meta instructions" del propio modelo.
  const metaLine = /^(we need|i need|draft[:\s]|count[:\s]|the user|must |should |plan[:\s]|first[,\s])/i;
  const lines = t.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const start = lines.findIndex((l) => looksSpanish(l) && !metaLine.test(l));
  if (start > 0) return lines.slice(start).join(' ').trim();
  if (start === 0) {
    // arranca bien pero puede traer un "Draft:" al final: quédate antes de cualquier marker de razonamiento.
    const cleaned = lines.filter((l) => !metaLine.test(l)).join(' ').trim();
    return cleaned || null;
  }
  // 3) Todo parece razonamiento en inglés sin respuesta explícita: nada fiable.
  return null;
}

// ==========================================
// Paso 13: Enrutador de IA Unificado (ProviderManager)
// ==========================================
async function executeResilientAIPipeline(params: {
  systemPrompt: string;
  userMessage: string;
  conversationHistory: Array<{ role: 'user' | 'model'; content: string }>;
}, opts?: { modelTryMs?: number; tierBudgetMs?: number; lastTierBudgetMs?: number; gen?: { maxTokens?: number; temperature?: number } }): Promise<{ reply: string; providerUsed: string; isFallback: boolean }> {
  const { systemPrompt, userMessage, conversationHistory } = params;

  const history = (conversationHistory || [])
    .filter((msg) => msg && typeof msg.content === 'string' && msg.content.trim())
    .map((msg) => ({
      role: (msg.role === 'model' ? 'model' : 'user') as 'model' | 'user',
      content: msg.content.trim(),
    }));

  const timeoutMs = opts?.modelTryMs || Number(process.env.AI_PROVIDER_TIMEOUT_MS) || 8000;

  try {
    const res = await ProviderManager.generateResponse({
      agentCode: 'legacy_server_teacher',
      systemPrompt,
      userPrompt: userMessage,
      history,
      temperature: opts?.gen?.temperature ?? 0.3,
      maxTokens: opts?.gen?.maxTokens ?? 1024,
      timeoutMs,
      isManualUserAction: true,
    });

    return {
      reply: res.content,
      providerUsed: `${res.providerName} · ${res.modelName}`,
      isFallback: res.isFallback,
    };
  } catch (err: any) {
    console.warn('[executeResilientAIPipeline] Falló generación con ProviderManager:', err?.message || err);
    throw new Error('Disculpa, estoy organizando mis apuntes. ¿Podrías repetirme tu pregunta en unos segundos?');
  }
}

// Paso 14: este endpoint recibe preguntas del estudiante y responde como un profesor socrático con contexto académico y metódico.
app.post('/api/profesor', async (req: Request, res: Response) => {
  try {
    const { preguntaEstudiante, asignatura, nivelEducativo, historialConversacion, message, subject, student } = req.body;
    
    const userQuestion = preguntaEstudiante || message || '';
    if (!userQuestion || typeof userQuestion !== 'string' || !userQuestion.trim()) {
      return res.status(400).json({ error: 'La pregunta del estudiante es obligatoria.' });
    }

    const systemPrompt = `
Eres un Profesor Virtual pedagógico y empático de Wisdom School.
Tu objetivo es actuar como un profesor amigable que guía al estudiante utilizando el Método Socrático.

CONTEXTO ACADÉMICO:
- Asignatura: ${asignatura || subject?.name || 'General'}
- Nivel Educativo: ${nivelEducativo || (student?.name === 'Avril' ? 'Secundaria inicial' : 'Primaria elemental')}

REGLAS PEDAGÓGICAS ESTRICTAS:
1. NUNCA des la respuesta directa o el resultado final del ejercicio.
2. Guía con preguntas socráticas, pequeñas pistas y analogías comprensibles.
3. Si el estudiante comete un error, corrige con mucha amabilidad sin desanimarlo.
4. Mantén un tono respetuoso, entusiasta y motivador en todo momento.
    `.trim();

    const result = await executeResilientAIPipeline({
      systemPrompt,
      userMessage: userQuestion,
      conversationHistory: Array.isArray(historialConversacion) ? historialConversacion : [],
    });

    return res.json({ respuesta: result.reply, reply: result.reply, providerUsed: result.providerUsed });
  } catch (err: any) {
    const errorMsg = err?.message || 'Disculpa, estoy organizando mis apuntes. ¿Podrías repetirme tu pregunta en unos segundos?';
    return res.status(503).json({ error: errorMsg, respuesta: errorMsg, reply: errorMsg });
  }
});

// Paso 15: el chat del profesor IA mantiene contexto por conversación, materia, nivel y clase para guiar la respuesta del estudiante.
app.post('/api/ai/teacher-chat', async (req: Request, res: Response) => {
  try {
    const {
      student,
      teacher,
      subject,
      dailyClass,
      conversationHistory,
      message,
      guideContext,
    } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'El mensaje del estudiante es obligatorio.' });
    }

    // Bloque LITERAL de la guía v4 (mismo string que el PDF). null = clase sin guía generada todavía.
    const guiaBlock = (() => {
      const preguntas: any[] = Array.isArray(guideContext?.preguntas) ? guideContext.preguntas : [];
      if (guideContext && typeof guideContext.explicacion === 'string' && guideContext.explicacion.trim()) {
        return `
LA GUÍA IMPRESA DE HOY PARA ESTE ESTUDIANTE DICE EXACTAMENTE ESTO:
EXPLICACIÓN:
${guideContext.explicacion}
PREGUNTAS DE LA GUÍA:
${preguntas.map((p, i) => `${i + 1}. (${p?.tipo || 'pregunta'}) ${p?.pregunta || ''}`).join('\n')}
Si el estudiante te pregunta sobre cualquiera de estas preguntas, o te pide ayuda para responderlas, guíalo con el método socrático para que llegue a la respuesta él mismo usando la EXPLICACIÓN de arriba — NUNCA le dictes la respuesta completa de una vez. Si te copia o lee una de estas preguntas, reconócela como parte de su guía de hoy (puedes decir algo como "Esa es la pregunta N de tu guía") y ayúdalo a pensarla, no a copiarla.`;
      }
      if (guideContext === null) {
        return `
El estudiante TODAVÍA NO tiene la guía impresa de hoy generada. Si te pregunta por "su guía", díselo con claridad (por ejemplo: "Tu guía de hoy todavía no está lista, pero puedo explicarte el tema igual") y NO inventes preguntas ni contenido de guía.`;
      }
      return '';
    })();

    const systemPrompt = `
Eres el Profesor Virtual "${teacher?.name || 'Profesor de Wisdom School'}", especialista en ${teacher?.specialty || subject?.name || 'Educación'}.
Tu personalidad es: ${teacher?.personality || 'Empático, motivador, paciente y didáctico'}.
Estás enseñando a ${student?.name || 'el estudiante'}, quien tiene ${student?.age || 10} años.

CONTEXTO ACADÉMICO OBLIGATORIO Y ESTRICTO:
- Materia: ${subject?.name || 'General'}
- Nivel: ${student?.name === 'Avril' ? 'Secundaria inicial (12 años)' : 'Primaria elemental (8 años)'}
- Unidad: ${dailyClass?.unit || 'Unidad Actual'}
- Tema del día: ${dailyClass?.theme || 'Tema de la clase'}
- Objetivo de aprendizaje: ${dailyClass?.objective || 'Comprender los conceptos clave del día'}
- Contenido / Lectura del día: ${dailyClass?.introduction || ''} ${dailyClass?.reading || ''}
- Actividades del día: ${JSON.stringify(dailyClass?.activities || [])}
${guiaBlock}

REGLAS PEDAGÓGICAS ESTRICTAS (MÉTODO SOCRÁTICO):
1. RESTRICCIÓN DE CONTEXTO: SOLO puedes hablar sobre el tema académico de esta clase ("${dailyClass?.theme || subject?.name}"). Si el estudiante pregunta sobre cosas ajenas a la clase o temas no relacionados, redirígelo con amabilidad y calidez hacia el tema de hoy.
1.1 RUTA DE MINI-LECCIONES: La teoría se entrega en la interfaz "Clase Interactiva" como micro-lecciones (tarjetas 1..N con su reto de opción múltiple). NUNCA repitas una exposición larga ni vuelques todas las definiciones: acompaña, verifica y refuerza en mensajes cortos (máximo 80 palabras), enfocados en la lección que el estudiante menciona. Si pide que le expliques TODO, dale un resumen breve por puntos (máx 120 palabras).
2. NUNCA des la respuesta directa o final si se trata de un ejercicio o razonamiento.
3. Utiliza preguntas socráticas, pistas escalonadas, metáforas sencillas y ejemplos cotidianos adaptados a su edad (${student?.age || 10} años).
4. Si el estudiante comete un error, jamás digas simplemente "está mal". Pregúntale qué procedimiento usó o haz una pregunta guía que le permita descubrir el error por sí mismo.
5. Mantén un tono alentador, respetuoso y entusiasta.
6. Responde siempre en español fluido, claro y adaptado a niños/jóvenes.
7. REGLA OBLIGATORIA PARA CLASES DE INGLÉS: Si la materia es Inglés, explica SIEMPRE qué tiene que hacer el estudiante paso a paso en ESPAÑOL claro y motivador. Acompaña cada palabra, frase o ejemplo en inglés con su traducción al español y pronunciación fonética sencilla para que el estudiante comprenda con total seguridad lo que va a realizar.
    `.trim();

    try {
      const result = await executeResilientAIPipeline({
        systemPrompt,
        userMessage: message,
        conversationHistory: Array.isArray(conversationHistory) ? conversationHistory : [],
      });
      return res.json({ reply: result.reply, providerUsed: result.providerUsed, isOfflineSimulation: result.isFallback });
    } catch (resilienceErr: any) {
      const fallbackMsg = resilienceErr?.message || 'Disculpa, estoy organizando mis apuntes. ¿Podrías repetirme tu pregunta en unos segundos?';
      return res.status(503).json({
        reply: fallbackMsg,
        error: fallbackMsg,
        isOfflineSimulation: true,
      });
    }
  } catch (error: any) {
    console.error('Error en /api/ai/teacher-chat:', error?.message || error);
    const fallbackMsg = 'Disculpa, estoy organizando mis apuntes. ¿Podrías repetirme tu pregunta en unos segundos?';
    return res.status(503).json({
      reply: fallbackMsg,
      error: fallbackMsg,
      isOfflineSimulation: true,
    });
  }
});

// Paso 15b: Generador de la ruta de "micro-lecciones" (JSON estricto que consume el MicroLessonPlayer de la Clase Interactiva).
app.post('/api/ai/lesson-plan', async (req: Request, res: Response) => {
  try {
    const { student, teacher, subject, dailyClass } = req.body;
    if (!dailyClass?.theme) {
      return res.status(503).json({ plan: null, isOfflineSimulation: true });
    }
    const count = Math.min(4, Math.max(2, Number(process.env.MICROLESSON_COUNT || 3)));

    const systemPrompt = `
Eres el diseñador instruccional jefe de Wisdom School, experto en microlearning infantil.
Tu única tarea: convertir el tema del día en ${count} micro-lecciones progresivas, devolviendo SOLO un objeto JSON válido (sin fences markdown, sin prosa antes o después). NO raciocines en voz alta, NO muestres tu razonamiento, NO pidas más datos: emite directamente el objeto JSON final.

DATOS DE LA SESIÓN:
- Estudiante: ${student?.name || 'el estudiante'} (${student?.age || 10} años)
- Materia: ${subject?.name || 'General'} · Profesora/or: ${teacher?.name || 'tu profe'}
- Tema: "${dailyClass.theme}"
- Objetivo de aprendizaje: ${dailyClass.objective || 'comprender los conceptos clave del tema'}

ESQUEMA EXACTO (respétalo al pie de la letra):
{"unitTitle":"título del tema","lessons":[{"title":"subtema (máx 40 caracteres)","theory":"explicación EXACTA de máximo 50 palabras en español para niños","analogy":"analogía de la vida real (máx 15 palabras)","example":"ejemplo concreto (máx 20 palabras)","quiz":{"question":"pregunta de opción múltiple sobre ESTE subtema (máx 20 palabras)","options":["opción A corta","opción B corta","opción C corta"],"correctIndex":0,"correctExplanation":"por qué es correcta (máx 12 palabras)"}}],"closingMessage":"felicitación cálida del profesor (máx 20 palabras)"}

REGLAS ESTRICTAS:
0. SÉ EXTREMADAMENTE COMPACTO: toda la respuesta debe caber en ~700 tokens. Sin saltos de línea, sin markdown y sin comillas dobles dentro de los valores.
1. El array lessons debe tener exactamente ${count} elementos, en orden progresivo (de lo más simple a lo aplicado), cubriendo TODOS los conceptos necesarios para el objetivo.
2. Cada lección enseña UN solo concepto pequeño.
3. options tiene SIEMPRE 3 cadenas no vacías y muy distintas entre sí; correctIndex es 0, 1 o 2.
4. Idioma: español claro y afectuoso. Nunca hagas preguntas fuera del quiz.
5. No inventes datos: si un número o dato de entrada es escaso, usa ejemplos numéricos simples y coherentes con la edad.
6. No incluyas claves adicionales fuera del esquema; no añadas texto antes ni después del JSON.
    `.trim();

    const result = await executeResilientAIPipeline({
      systemPrompt,
      userMessage: `Genera ahora el JSON de las ${count} micro-lecciones para "${dailyClass.theme}" en español.`,
      conversationHistory: [],
    }, { modelTryMs: Number(process.env.MICROLESSON_MODEL_TIMEOUT_MS || 22000), tierBudgetMs: Number(process.env.MICROLESSON_TIER_BUDGET_MS || 46000), lastTierBudgetMs: Number(process.env.MICROLESSON_LAST_TIER_BUDGET_MS || 44000), gen: { maxTokens: 1400, temperature: 0.2 } });

    const jsonStr = extractJsonObject(result.reply);
    const parsed = looseParseJson(jsonStr);
    res.setHeader('Cache-Control', 'no-store');
    if (!parsed) {
      console.warn('[lesson-plan] JSON no parseable. Snippet:', (result.reply || '').slice(0, 300));
      return res.status(503).json({ plan: null, providerUsed: result.providerUsed, isOfflineSimulation: false, rawSnippet: (result.reply || '').slice(0, 600) });
    }
    return res.json({ plan: parsed, providerUsed: result.providerUsed });
  } catch (err: any) {
    console.error('Error en /api/ai/lesson-plan:', err?.message || err);
    return res.status(503).json({ plan: null, isOfflineSimulation: true });
  }
});

// Paso 15c: Genera UNA micro-lección compacta (JSON pequeño = fiable y rápido también en modelos gratuitos congestados).
// El MicroLessonPlayer pide la lección N de T con las cubiertas (no repetir), cachea por estudiante+clase+índice+fecha y muestra learningPath mientras llega.
app.post('/api/ai/lesson-bite', async (req: Request, res: Response) => {
  try {
    const { student, teacher, subject, dailyClass, index, total, covered } = req.body;
    if (!dailyClass?.theme || !Number.isInteger(index) || index < 1) {
      return res.status(400).json({ lesson: null, error: 'Faltan dailyClass.theme o index' });
    }
    const coveredList: string[] = Array.isArray(covered) ? covered.filter((c: any) => typeof c === 'string' && c.trim()).slice(-3) : [];
    const totalLessons = Math.min(5, Math.max(2, Number(total) || 3));

    const systemPrompt = `
Eres el diseñador instruccional de Wisdom School, experto en microlearning infantil.
Genera la micro-lección ${index} de ${totalLessons} (orden progresivo) para enseñar "${dailyClass.theme}" a ${student?.name || 'el estudiante'} (${student?.age || 10} años), materia ${subject?.name || 'General'}. Objetivo de la clase: ${dailyClass.objective || 'comprender los conceptos clave'}.
${coveredList.length ? `Ya se explicaron estos subtemas (NO los repitas ni los resumas): ${coveredList.join(' | ')}. Aporta el siguiente concepto esencial hacia el objetivo.` : 'Es la primera lección: empieza por el concepto más fundamental del tema.'}

Devuelve SOLO este objeto JSON compacto (sin razonamiento visible, sin prosa, sin markdown, sin texto antes o después):
{"title":"subtema en máx 40 caracteres","theory":"explicación exacta de máx 45 palabras para su edad","analogy":"analogía de su vida real en máx 12 palabras","example":"ejemplo concreto en máx 18 palabras","quiz":{"question":"pregunta de opción múltiple sobre ESTE subtema (máx 18 palabras)","options":["opción A corta","opción B corta","opción C corta"],"correctIndex":0,"correctExplanation":"por qué es correcta (máx 12 palabras)"}}
REGLAS: español claro y afectuoso; options SIEMPRE 3, cortas y muy distintas; correctIndex 0, 1 o 2; nada de listas anidadas dentro de los valores.
    `.trim();

    const result = await executeResilientAIPipeline({
      systemPrompt,
      userMessage: `Genera la micro-lección ${index} de ${totalLessons} como JSON.`,
      conversationHistory: [],
    }, { modelTryMs: Number(process.env.MICROBITE_MODEL_TIMEOUT_MS || 9000), tierBudgetMs: Number(process.env.MICROBITE_TIER_BUDGET_MS || 22000), lastTierBudgetMs: Number(process.env.MICROBITE_LAST_TIER_BUDGET_MS || 13000), gen: { maxTokens: 1100, temperature: 0.4 } });

    const parsed = looseParseJson(extractJsonObject(result.reply));
    res.setHeader('Cache-Control', 'no-store');
    const quiz = parsed?.quiz;
    const valid = parsed && typeof parsed.title === 'string' && typeof parsed.theory === 'string' && parsed.theory.trim()
      && quiz && typeof quiz.question === 'string' && Array.isArray(quiz.options) && quiz.options.length === 3
      && Number.isInteger(Number(quiz.correctIndex)) && Number(quiz.correctIndex) >= 0 && Number(quiz.correctIndex) <= 2;
    if (!valid) {
      console.warn('[lesson-bite] JSON inválido. Snippet:', (result.reply || '').slice(0, 240));
      return res.status(503).json({ lesson: null, providerUsed: result.providerUsed, isOfflineSimulation: false });
    }
    return res.json({
      lesson: {
        title: String(parsed.title).trim(),
        theory: String(parsed.theory).trim(),
        analogy: typeof parsed.analogy === 'string' && parsed.analogy.trim() ? parsed.analogy.trim() : undefined,
        example: typeof parsed.example === 'string' && parsed.example.trim() ? parsed.example.trim() : undefined,
        quiz: {
          question: String(quiz.question).trim(),
          options: (quiz.options as string[]).map((o: any) => String(o).trim()),
          correctIndex: Number(quiz.correctIndex),
          correctExplanation: typeof quiz.correctExplanation === 'string' ? quiz.correctExplanation.trim() : undefined,
        },
      },
      providerUsed: result.providerUsed,
    });
  } catch (err: any) {
    console.error('Error en /api/ai/lesson-bite:', err?.message || err);
    return res.status(503).json({ lesson: null, isOfflineSimulation: true });
  }
});

// Guías Didácticas v4.0 — genera SOLO { explicacion, preguntas }.
// Una explicación corrida (sin "Paso 1/Paso 2"), acotada por nivel EGB, y 2-3 preguntas
// que se responden directamente con esa explicación. El resto (encabezado, firmas) lo arma el frontend.
app.post('/api/ai/guide-content', async (req: Request, res: Response) => {
  try {
    const { student, subject, dailyClass, steps: presetSteps } = req.body ?? {};
    if (!dailyClass?.theme) {
      return res.status(400).json({ content: null, error: 'Falta dailyClass.theme' });
    }
    const preset: Array<{ title: string; text: string }> = (Array.isArray(presetSteps) ? presetSteps : [])
      .filter((s: any) => s && typeof s.text === 'string' && s.text.trim().length > 25)
      .slice(0, 3)
      .map((s: any) => ({ title: String(s.title || '').replace(/\s+/g, ' ').trim().slice(0, 70), text: String(s.text).replace(/\s+/g, ' ').trim().slice(0, 300) }));

    const edad = student?.age || 10;
    const gradeText = `${student?.gradeLong || ''} ${student?.grade || ''} ${subject?.teacher?.educationalLevel || ''}`.toLowerCase();
    const level: 'Elemental' | 'Media' | 'Superior' =
      /elemental/.test(gradeText) || edad <= 10 ? 'Elemental'
        : /media/.test(gradeText) ? 'Media'
          : /superior/.test(gradeText) || edad >= 12 ? 'Superior' : 'Media';
    const wordRange = level === 'Elemental' ? '90 a 120' : level === 'Media' ? '130 a 160' : '160 a 200';
    const maxQuestions = level === 'Elemental' ? 2 : 3;
    const integracionFe = /relaci[oó]n con dios/i.test(subject?.name || '') || /(^|-)rel(-|$)/i.test(subject?.id || '');
    const mundo = ['avril', 'karen'].includes(student?.id) ? 'snoopy' : 'mario';

    // Normalización de campos JSON: solo colapsar espacios.
    const norm = (s: unknown, max: number) => (typeof s === 'string' ? s : '').replace(/\s+/g, ' ').trim().slice(0, max);

    const contenidoBase = [
      dailyClass.unit ? `Unidad: ${dailyClass.unit}` : '',
      dailyClass.theme ? `Tema: ${dailyClass.theme}` : '',
      dailyClass.objective ? `Destreza/objetivo: ${dailyClass.objective}` : (subject?.curriculumOverview ? `Destreza/objetivo: ${subject.curriculumOverview}` : ''),
      dailyClass.introduction ? `Introducción: ${dailyClass.introduction}` : '',
      dailyClass.reading ? `Lectura base: ${dailyClass.reading}` : '',
      preset.length ? `Ya visto en la clase interactiva:\n${preset.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join('\n')}` : '',
      (dailyClass.activities || []).slice(0, 2).map((a: any) => `Actividad: ${a.title} — ${a.description}`).join('\n'),
    ].filter(Boolean).join('\n');

    const systemPrompt = `
Eres el diseñador pedagógico de Wisdom School, un colegio homeschool evangélico en Ecuador que sigue el currículo del Ministerio de Educación (Actualización y Fortalecimiento Curricular, pedagogía crítica-constructivista, destrezas con criterios de desempeño).

Tu única tarea es generar el CONTENIDO de una guía didáctica impresa de una sola página para UNA clase de UNA materia. No generes portada, encabezado, firmas ni metadata: eso ya existe.

DATOS DE ENTRADA:
- materia: ${subject?.name || 'General'}
- tema_unidad: ${dailyClass.theme}
- destreza_curricular: ${dailyClass.objective || subject?.curriculumOverview || dailyClass.theme}
- estudiante: ${student?.name || 'Estudiante'}, ${edad} años, ${student?.gradeLong || student?.grade || 'EGB'} (nivel_egb: ${level})
- docente_ia: ${subject?.teacher?.name || 'Docente IA'} (${subject?.teacher?.personality || 'socrático'})
- mundo_tematico: ${mundo} (úsalo solo como un detalle de tono, nunca como distracción del contenido)
- contenido_curricular_base: ${contenidoBase || dailyClass.theme}
- integracion_fe: ${integracionFe} → si es true (materia "Relación con Dios"), cierra con UNA frase breve de fe; si es false, NO menciones a Dios ni temas religiosos.

REGLAS DE CONTENIDO (no negociables):

1. EXPLICACIÓN (campo "explicacion"):
   - Texto corrido, sin subtítulos ni "Paso 1/Paso 2". Una sola idea desarrollada de principio a fin.
   - Debe responder, en este orden implícito: qué es el tema → por qué importa o para qué sirve → un ejemplo concreto y cotidiano para la edad del estudiante.
   ${integracionFe ? '- Cierra con UNA frase breve (máx. 20 palabras) que conecte el tema con un principio de fe, sin sermón.' : '- No incluyas referencias religiosas.'}
   - TOPE DE PALABRAS OBLIGATORIO PARA NIVEL ${level.toUpperCase()}: ${wordRange} palabras. Cuenta las palabras antes de responder; si te pasas, RECORTA. Es preferible quedarse corto y completo que largo y cortado.
   - ${level === 'Elemental' ? 'Oraciones cortas (máx. 15 palabras). Vocabulario cotidiano, cero tecnicismos sin explicar.' : level === 'Media' ? 'Oraciones de hasta 20 palabras.' : 'Puede usar un término técnico por explicación, siempre definido en la misma frase.'}

2. PREGUNTAS (campo "preguntas", arreglo):
   - ${level === 'Elemental' ? 'Exactamente 2 preguntas: 1 literal + 1 interpretativa.' : 'Exactamente 3 preguntas: 1 literal + 1 interpretativa + 1 de aplicación breve.'}
   - Cada pregunta (salvo la de aplicación) se responde SOLO con la información de "explicacion".
   - Una sola pregunta por objeto, nunca dos preguntas unidas con "y" ni "¿...? ¿...?".
   - Redacción breve (resoluble en 1-3 renglones), no un ensayo.
   - Pista opcional de máximo 12 palabras, simple, sin símbolos.

FORMATO DE SALIDA — responde SOLO este JSON, sin texto antes ni después, sin backticks:
{"explicacion":"string respetando el tope de palabras del nivel","preguntas":[{"tipo":"literal","pregunta":"string","pista":null},{"tipo":"interpretativa","pregunta":"string","pista":null}${level === 'Elemental' ? '' : ',{"tipo":"aplicacion","pregunta":"string","pista":null}'}]}

AUTOCONTROL (en silencio): cuenta las palabras de "explicacion" y ajústatelas al rango; verifica que cada pregunta se responda con esa explicación y que el JSON sea válido.
    `.trim();
    const userMessage = `Genera el JSON v4.0 (explicacion + ${maxQuestions} preguntas) para "${dailyClass.theme}". Materia: ${subject?.name || 'General'}. Estudiante: ${student?.name || 'Estudiante'} (${edad} años, nivel ${level}).`;

    const result = await executeResilientAIPipeline(
      { systemPrompt, userMessage, conversationHistory: [] },
      { modelTryMs: 10000, tierBudgetMs: 22000, lastTierBudgetMs: 12000, gen: { maxTokens: 560, temperature: 0.35 } }
    );

    const parsed = looseParseJson(extractJsonObject(result.reply));
    res.setHeader('Cache-Control', 'no-store');
    const explicacion = norm(parsed?.explicacion, 2200);
    const tipoOrder = ['literal', 'interpretativa', 'aplicacion'];
    const preguntas = (Array.isArray(parsed?.preguntas) ? parsed.preguntas : [])
      .filter((q: any) => q && typeof q.pregunta === 'string' && q.pregunta.trim())
      .slice(0, maxQuestions)
      .map((q: any, i: number) => ({
        tipo: tipoOrder.includes(q.tipo) ? q.tipo : tipoOrder[Math.min(i, 2)],
        pregunta: norm(q.pregunta, 240),
        pista: q.pista ? norm(q.pista, 90) : null,
      }));

    if (!explicacion || preguntas.length < 2) {
      console.warn('[guide-content] incompleto. Snippet:', (result.reply || '').slice(0, 260));
      return res.status(503).json({ content: null, providerUsed: result.providerUsed });
    }
    return res.json({ content: { explicacion, preguntas }, providerUsed: result.providerUsed });
  } catch (err: any) {
    console.error('Error en /api/ai/guide-content:', err?.message || err);
    return res.status(503).json({ content: null, isOfflineSimulation: true });
  }
});

// Paso 15d: Re-explicación con sustento teórico para la ruta de micro-lecciones.
// A diferencia del chat socrático (que jamás da la respuesta), aquí SÍ se explica por qué la respuesta
// correcta lo es, usando el contenido exacto de la lección que el niño ya está viendo.
app.post('/api/ai/reexplain', async (req: Request, res: Response) => {
  try {
    const { student, teacher, subject, dailyClass, lesson } = req.body ?? {};
    const theory = String(lesson?.theory || '').slice(0, 700);
    const correctAnswer = String(lesson?.correctAnswer || '').slice(0, 140);
    const question = String(lesson?.question || '').slice(0, 220);
    if (!theory || !correctAnswer) {
      return res.status(400).json({ text: null, error: 'Faltan lesson.theory o lesson.correctAnswer' });
    }
    const analogy = String(lesson?.analogy || '').slice(0, 200);
    const example = String(lesson?.example || '').slice(0, 200);

    const systemPrompt = `
Eres "${teacher?.name || 'el profesor de Wisdom School'}", explicando con mucho cariño a ${student?.name || 'tu estudiante'} (${student?.age || 10} años), de la materia ${subject?.name || 'General'}.
Acaba de fallar este reto: "${question || 'la pregunta de la lección'}". La respuesta correcta es "${correctAnswer}".

Contenido oficial de SU lección (úsalo como única fuente, no lo contradigas):
- Teoría: ${theory}
- Analogía usada: ${analogy || '(la de la ficha)'}
- Ejemplo usado: ${example || '(el de la ficha)'}

Escribe SOLO la explicación final, sin títulos, sin markdown, sin listas y SIN escribir nunca tu planificación o notas internas:
1. Una frase de ánimo ("No pasa nada...", varíala), 2. vuelve a contar el concepto con palabras MÁS simples que la teoría de arriba, 3. usa una analogía NUEVA y distinta a la de la ficha (otra cosa de su vida diaria), 4. cierra diciendo exactamente por qué "${correctAnswer}" es la respuesta correcta, conectándola con el ejemplo.
Máximo 60 palabras español claro para su edad. PROHIBIDO hacer preguntas, prohibido pedirle que responda algo: es una explicación definitiva para que vuelva a intentarlo con éxito.
    `.trim();

    const result = await executeResilientAIPipeline({
      systemPrompt,
      userMessage: 'Dame la explicación de cariño ahora.',
      conversationHistory: [],
    }, { modelTryMs: Number(process.env.REEXPLAIN_MODEL_TIMEOUT_MS || 8000), tierBudgetMs: Number(process.env.REEXPLAIN_TIER_BUDGET_MS || 16000), lastTierBudgetMs: Number(process.env.REEXPLAIN_LAST_TIER_BUDGET_MS || 10000), gen: { maxTokens: 480, temperature: 0.8 } });

    const text = cleanReasoningLeak(result.reply);
    res.setHeader('Cache-Control', 'no-store');
    if (!text) {
      console.warn('[reexplain] sin texto útil. Snippet:', (result.reply || '').slice(0, 200));
      return res.status(503).json({ text: null, providerUsed: result.providerUsed });
    }
    return res.json({ text, providerUsed: result.providerUsed });
  } catch (err: any) {
    console.error('Error en /api/ai/reexplain:', err?.message || err);
    return res.status(503).json({ text: null, isOfflineSimulation: true });
  }
});

// Paso 16: esta ruta analiza tareas, trabajos o dibujos enviados por el estudiante y devuelve retroalimentación formativa y motivadora.
app.post('/api/ai/analyze-work', async (req: Request, res: Response) => {
  try {
    const {
      student,
      subject,
      dailyClass,
      workTitle,
      workDescription,
      imageData, // base64 (optional)
      mimeType, // e.g. "image/png" or "image/jpeg"
      studentNotes,
    } = req.body;

    const ai = await getGeminiClient();
    if (!ai) {
      return res.json({
        analysis: {
          strengths: [
            'Estructura clara del trabajo presentado.',
            'Comprensión general de los conceptos básicos del tema.',
            'Esfuerzo evidente en la resolución paso a paso.',
          ],
          errors: [
            'Detalles de precisión en el cálculo o redacción intermedia.',
          ],
          explanation: 'El trabajo demuestra que has asimilado la idea central de la clase. Has seguido las pautas iniciales y justificado tu razonamiento.',
          correction: 'Revisa el paso central prestando atención a las relaciones entre los conceptos explicados en la guía.',
          recommendations: [
            'Releer la sección de ejemplos del microcurrículo.',
            'Realizar un ejercicio adicional de comprobación.',
          ],
          comprehensionLevel: 'Notable (8.5/10)',
          feedbackSummary: '¡Buen trabajo! Estás muy cerca del dominio completo del tema. Continúa así.',
        },
        isOfflineSimulation: true,
      });
    }

    const promptText = `
Eres un evaluador pedagógico experto y empático de Wisdom School.
Vas a analizar el trabajo entregado por ${student?.name || 'el estudiante'} (${student?.age || 10} años) para la materia "${subject?.name || 'Materia'}", clase "${dailyClass?.theme || 'Tema'}".

Objetivo de la clase: ${dailyClass?.objective || 'Dominar el tema del día'}.
Título del trabajo: ${workTitle || 'Trabajo escolar'}
Descripción del estudiante: ${workDescription || 'Sin descripción adicional'}
Notas del alumno: ${studentNotes || 'Ninguna'}

INSTRUCCIONES DE ANÁLISIS PEDAGÓGICO:
1. NUNCA digas simplemente "está mal". Explica con claridad qué ocurrió, por qué ocurrió y cómo mejorarlo.
2. Reconoce los aciertos y fortalezas reales con calidez.
3. Proporciona una explicación formativa y comprensible para un estudiante de ${student?.age} años.
4. Genera una estructura JSON con los siguientes campos:
- strengths (array de strings con los aciertos y puntos fuertes)
- errors (array de strings con áreas a corregir o errores detectados)
- explanation (string explicando qué se logró y qué faltó de forma constructiva)
- correction (string con la corrección formativa guiada)
- recommendations (array de strings con sugerencias prácticas para mejorar)
- comprehensionLevel (string, e.g., "Sobresaliente (9.5/10)" o "En proceso de consolidación (7.5/10)")
- feedbackSummary (string con mensaje motivacional y de cierre)

IMPORTANTE: Responde ÚNICAMENTE en formato JSON válido.
    `.trim();

    const parts: any[] = [];

    if (imageData && mimeType) {
      parts.push({
        inlineData: {
          mimeType,
          data: imageData.replace(/^data:image\/[a-z]+;base64,/, ''),
        },
      });
    }

    parts.push({ text: promptText });

    const llmRes = await ProviderManager.generateResponse({
      agentCode: 'work_evaluator',
      systemPrompt: 'Eres un evaluador pedagógico experto. Analiza el trabajo escolar y devuelve un objeto JSON válido con campos: strengths, errors, explanation, correction, recommendations, comprehensionLevel, feedbackSummary.',
      userPrompt: promptText,
      temperature: 0.2,
      maxTokens: 1024,
      isManualUserAction: true,
    });

    const responseText = llmRes.content || '{}';
    let analysis;
    try {
      analysis = JSON.parse(responseText);
    } catch {
      analysis = {
        strengths: ['Trabajo completado y entregado con dedicación.'],
        errors: [],
        explanation: responseText,
        correction: 'Continúa practicando con las guías de apoyo de la clase.',
        recommendations: ['Repasar el tema en la próxima clase.'],
        comprehensionLevel: 'Satisfactorio (8.5/10)',
        feedbackSummary: 'Buen esfuerzo en la entrega y resolución de tu trabajo.',
      };
    }

    res.json({ analysis, isOfflineSimulation: llmRes.isFallback });
  } catch (error: any) {
    console.error('Error en /api/ai/analyze-work:', error?.message || error);
    const studentName = req.body?.student?.name || 'el estudiante';
    const themeName = req.body?.dailyClass?.theme || 'la lección';
    res.json({
      analysis: {
        strengths: [
          `Entrega registrada correctamente para ${studentName}.`,
          `Demuestra seguimiento de la actividad de ${themeName}.`,
        ],
        errors: [],
        explanation: `El trabajo presentado para ${themeName} ha sido procesado de acuerdo con las instrucciones pedagógicas.`,
        correction: 'Revisar las notas de la lección para consolidar cada concepto.',
        recommendations: [
          'Consultar dudas con el profesor IA en el chat socrático.',
          'Completar el reto práctico del día.',
        ],
        comprehensionLevel: 'Notable (8.5/10)',
        feedbackSummary: '¡Excelente dedicación en tus estudios!',
      },
      isOfflineSimulation: true,
      errorNotice: error?.message || 'Evaluación pedagógica completada',
    });
  }
});

// Manejador seguro para errores de la API v1 (sin filtración de trazas ni credenciales)
app.use('/api/v1', errorHandler);

// Manejo de errores: cualquier fallo de middleware o ruta responde JSON con el detalle real
// (visible en la pestaña Network y en los logs de la función de Vercel) en vez de un 500 opaco.
app.use((err: any, _req: Request, res: Response, next: any) => {
  console.error('[API Error]', err?.stack || err?.message || err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'internal_error', message: err?.message || String(err) });
});

export { app };
export default app;
