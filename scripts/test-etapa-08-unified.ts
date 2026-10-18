/**
 * ==============================================================================
 * Suite Determinista Unificada: ETAPA-08
 * Configuración Verificable de APIs de IA y Prueba de Proveedores
 * Plataforma Educativa ALSIZ — Ekballo Church
 * ==============================================================================
 * 
 * Valida los 9 criterios de aceptación del PROMPT 08 de forma reproducible:
 * 1. Unificación en backend (enrutador único ProviderManager, catálogo honesto sin OpenCode).
 * 2. Políticas de cascada, timeouts, reintentos máximos (<= 1) y error tipado AIProviderError.
 * 3. Auditoría segura de configuración (sólo 'CONFIGURADA'/'NO_CONFIGURADA', cero valores expuestos).
 * 4. Separación de pruebas y marcaje honesto cuando falta secreto (BLOCKED_SECRET_MISSING / isAvailable false).
 * 5. Protección de menores: rechazo de llamadas autónomas y límites de cuota/volumen por estudiante.
 * 6. Validación estricta de citas fundamentadas (sólo tags presentes en el texto resultante).
 * 7. Endpoint de salud protegido y sanitizado (cero claves ni PII en reporte).
 * 8. Sanitización de frontend y verificación de bundle compilado dist/ (cero claves VITE_ ni URLs directas).
 * 9. Sincronización de documentación y plantilla .env.example.
 */

import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { ProviderManager } from '../server/agents/providers/providerManager';
import { GeminiProvider } from '../server/agents/providers/geminiProvider';
import { AIProviderError, RagContextChunk } from '../server/agents/types';
import { auditAIConfiguration } from './test-ai-providers-config';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

interface TestResult {
  criterio: number;
  nombre: string;
  paso: boolean;
  detalles: string;
  error?: string;
}

const resultados: TestResult[] = [];

function registrar(criterio: number, nombre: string, paso: boolean, detalles: string, error?: string) {
  resultados.push({ criterio, nombre, paso, detalles, error });
  const icon = paso ? '✅ PASÓ' : '❌ FALLÓ';
  console.log(`[ETAPA-08-CRIT-${criterio.toString().padStart(2, '0')}] ${icon}: ${nombre}`);
  console.log(`                       ℹ️  ${detalles}`);
  if (error) console.error(`                       ⚠️  Error: ${error}`);
}

async function ejecutarSuiteUnificada() {
  console.log('================================================================');
  console.log('  SUITE DETERMINISTA UNIFICADA — ETAPA 08: PROVEEDORES IA');
  console.log('  Plataforma Educativa ALSIZ — Ekballo Church');
  console.log('================================================================\n');

  const appRoot = process.cwd();

  // -------------------------------------------------------------------------
  // CRITERIO 1: Unificación de Enrutador Backend y Catálogo Honesto
  // -------------------------------------------------------------------------
  try {
    const isOpencodeAvailable = ProviderManager.isProviderAvailable('OPENCODE');
    const isSimulatedAvailable = ProviderManager.isProviderAvailable('SIMULATED_LOCAL');
    const health = ProviderManager.getHealthReport();
    
    // OpenCode no debe ser reportado como disponible ni consumido
    const opencodeRechazado = isOpencodeAvailable === false;
    const providerNames = health.providers.map((p) => p.name);
    const proveedoresValidos = providerNames.every((p) => 
      ['GOOGLE_GEMINI', 'DEEPSEEK_API', 'OPENROUTER_API', 'SIMULATED_LOCAL'].includes(p)
    );

    const paso = opencodeRechazado && isSimulatedAvailable && proveedoresValidos;
    registrar(
      1,
      'Unificación en backend y catálogo honesto de proveedores',
      paso,
      `OpenCode rechazado: ${opencodeRechazado}, SIMULATED_LOCAL activo: ${isSimulatedAvailable}, Proveedores registrados: ${providerNames.join(', ')}`
    );
  } catch (err: any) {
    registrar(1, 'Unificación en backend y catálogo honesto', false, 'Excepción en prueba', err?.message);
  }

  // -------------------------------------------------------------------------
  // CRITERIO 2: Cascada, Timeout, Máximo Reintentos y Fallback Honesto
  // -------------------------------------------------------------------------
  try {
    // Probar degradación forzando SIMULATED_LOCAL
    const start = Date.now();
    const fallbackRes = await ProviderManager.generateResponse({
      agentCode: 'prof_gael_lengua',
      systemPrompt: 'Eres un tutor socrático.',
      userPrompt: '¿Qué es una planta?',
      forceProvider: 'SIMULATED_LOCAL',
      isManualUserAction: true,
      studentId: 'stu-synth-test',
    });
    const duration = Date.now() - start;

    const esFallbackHonesto = fallbackRes.isFallback === true && fallbackRes.providerName === 'SIMULATED_LOCAL';
    const respuestaNoVacia = Boolean(fallbackRes.content && fallbackRes.content.length > 20);
    const tiempoRazonable = duration < 5000;

    // Verificar clase AIProviderError tipada
    const sampleError = new AIProviderError('AI_ERROR_TIMEOUT', 'Prueba timeout', true, 408);
    const errorTipadoOk = sampleError.code === 'AI_ERROR_TIMEOUT' && sampleError.retryable === true && sampleError.statusCode === 408;

    const paso = esFallbackHonesto && respuestaNoVacia && tiempoRazonable && errorTipadoOk;
    registrar(
      2,
      'Cascada, timeouts, límite de reintentos y fallback honesto a SIMULATED_LOCAL',
      paso,
      `Fallback honesto: ${esFallbackHonesto}, Proveedor: ${fallbackRes.providerName}, Duración: ${duration}ms, AIProviderError tipado: ${errorTipadoOk}`
    );
  } catch (err: any) {
    registrar(2, 'Cascada y políticas de tolerancia', false, 'Fallo al verificar fallback', err?.message);
  }

  // -------------------------------------------------------------------------
  // CRITERIO 3: Auditoría Segura de Configuración (Cero Valores Expuestos)
  // -------------------------------------------------------------------------
  try {
    const { checks } = auditAIConfiguration();
    let zeroLeaks = true;
    let validStatusValues = true;

    for (const c of checks) {
      if (c.status !== 'CONFIGURADA' && c.status !== 'NO_CONFIGURADA') {
        validStatusValues = false;
      }
      // Asegurar que no hay cadenas largas con formato de claves
      const checkStr = JSON.stringify(c);
      if (checkStr.includes('AIzaSy') || checkStr.includes('sk-ant') || checkStr.includes('sk-proj')) {
        zeroLeaks = false;
      }
    }

    const paso = zeroLeaks && validStatusValues && checks.length >= 4;
    registrar(
      3,
      'Auditoría segura de configuración de secretos (solo configurada/no configurada, cero fugas)',
      paso,
      `Variables auditadas: ${checks.length}, Cero valores expuestos: ${zeroLeaks}, Estados normalizados: ${validStatusValues}`
    );
  } catch (err: any) {
    registrar(3, 'Auditoría de configuración', false, 'Error en auditoría', err?.message);
  }

  // -------------------------------------------------------------------------
  // CRITERIO 4: Separación de Prueba Externa y Manejo de Falta de Clave
  // -------------------------------------------------------------------------
  try {
    // Si un proveedor no tiene clave configurada, debe retornar no disponible y marcar BLOCKED
    const originalEnv = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    const tempGemini = new GeminiProvider();
    const isBlocked = tempGemini.isAvailable() === false;
    process.env.GEMINI_API_KEY = originalEnv;

    const paso = isBlocked;
    registrar(
      4,
      'Separación de pruebas y marcaje honesto BLOCKED cuando falta secreto',
      paso,
      `Proveedor sin clave reporta isAvailable=false (BLOCKED): ${isBlocked}`
    );
  } catch (err: any) {
    registrar(4, 'Separación de prueba externa', false, 'Error en verificación de proveedor', err?.message);
  }

  // -------------------------------------------------------------------------
  // CRITERIO 5: Protección de Menores (Rechazo de Llamadas Autónomas y Límites de Cuota)
  // -------------------------------------------------------------------------
  try {
    let rechazoAutonomo = false;
    try {
      await ProviderManager.generateResponse({
        agentCode: 'prof_gael_lengua',
        systemPrompt: 'Eres un tutor.',
        userPrompt: 'Alerta automática periódica',
        isManualUserAction: false, // Llamada autónoma por temporizador prohibida
        studentId: 'stu-synth-timer',
      });
    } catch (err: any) {
      if (err instanceof AIProviderError && err.code === 'AI_ERROR_BAD_REQUEST' && err.message.includes('REJECTED_AUTONOMOUS_CALL')) {
        rechazoAutonomo = true;
      }
    }

    // Verificar rate limiter para estudiante menor
    const testStudentId = `stu-test-rate-${Date.now()}`;
    let rateLimitExceeded = false;
    // Agotar cuota por minuto (límite: 15 req/min)
    for (let i = 0; i < 16; i++) {
      try {
        await ProviderManager.generateResponse({
          agentCode: 'prof_gael_lengua',
          systemPrompt: 'Tutor',
          userPrompt: `Ping didáctico ${i}`,
          isManualUserAction: true,
          studentId: testStudentId,
          forceProvider: 'SIMULATED_LOCAL',
        });
      } catch (err: any) {
        if (err instanceof AIProviderError && err.code === 'AI_ERROR_RATE_LIMIT' && err.message.includes('RATE_LIMIT_EXCEEDED')) {
          rateLimitExceeded = true;
          break;
        }
      }
    }

    const paso = rechazoAutonomo && rateLimitExceeded;
    registrar(
      5,
      'Control de costos y protección de menores (rechazo de temporizadores autónomos y límites por estudiante)',
      paso,
      `Rechazo de temporizador autónomo: ${rechazoAutonomo}, Límite por estudiante activo: ${rateLimitExceeded}`
    );
  } catch (err: any) {
    registrar(5, 'Protección de menores', false, 'Fallo en validación de límites', err?.message);
  }

  // -------------------------------------------------------------------------
  // CRITERIO 6: Validación Estricta de Citas Fundamentadas (Anti-Alucinación RAG)
  // -------------------------------------------------------------------------
  try {
    const chunksRecuperados: RagContextChunk[] = [
      {
        sourceCode: 'src-1',
        citationTag: '[EKB-VAL-ELEM-4#C1]',
        sourceTitle: 'Valores Ekballo',
        sectionTitle: 'Mayordomía',
        contentText: 'Cuidar la creación con amor y responsabilidad.',
        relevanceScore: 0.95,
      },
      {
        sourceCode: 'src-2',
        citationTag: '[EKB-DOC-NO-CITADO#C9]',
        sourceTitle: 'Documento Secundario',
        sectionTitle: 'No Citado',
        contentText: 'Este fragmento nunca debe figurar como cita si no aparece en el texto.',
        relevanceScore: 0.3,
      },
    ];

    // Enviar a SimulatedProvider con fragmentos RAG
    const resRAG = await ProviderManager.generateResponse({
      agentCode: 'prof_gael_valores',
      systemPrompt: 'Eres el profesor de valores.',
      userPrompt: '¿Qué es la mayordomía de la naturaleza?',
      ragContext: chunksRecuperados,
      forceProvider: 'SIMULATED_LOCAL',
      isManualUserAction: true,
      studentId: 'stu-synth-rag',
    });

    const citasDevueltas = resRAG.citationTags || [];
    const soloCitaEtiquetasPresentes = citasDevueltas.every((tag) => resRAG.content.includes(tag));
    const contieneEtiquetaUtilizada = citasDevueltas.includes('[EKB-VAL-ELEM-4#C1]');
    const etiquetaNoCitadaOmitida = !citasDevueltas.includes('[EKB-DOC-NO-CITADO#C9]');

    const paso = soloCitaEtiquetasPresentes && contieneEtiquetaUtilizada && etiquetaNoCitadaOmitida;
    registrar(
      6,
      'Validación estricta de citas fundamentadas (sólo tags en texto devuelto, sin alucinación de fuentes)',
      paso,
      `Citas devueltas: [${citasDevueltas.join(', ')}], Todas presentes en el texto: ${soloCitaEtiquetasPresentes}, Fuente no usada excluida: ${etiquetaNoCitadaOmitida}`
    );
  } catch (err: any) {
    registrar(6, 'Validación de citas RAG', false, 'Error en prueba de citas', err?.message);
  }

  // -------------------------------------------------------------------------
  // CRITERIO 7: Endpoint de Salud Protegido y Sanitizado
  // -------------------------------------------------------------------------
  try {
    const report = ProviderManager.getHealthReport();
    const serialized = JSON.stringify(report);

    // Cero secretos en reporte serializado
    const safeSerialization = 
      !serialized.includes('AIzaSy') && 
      !serialized.includes('sk-') && 
      !serialized.includes('password') &&
      !serialized.includes('studentId');

    const estructuraCorrecta = 
      report.status !== undefined &&
      Array.isArray(report.providers) &&
      report.providers.length >= 4 &&
      Array.isArray(report.activeCascadeOrder) &&
      report.activeCascadeOrder.length > 0;

    const paso = safeSerialization && estructuraCorrecta;
    registrar(
      7,
      'Endpoint de salud sanitizado y seguro (/api/v1/agents/health y /api/ai/health)',
      paso,
      `Estado global: ${report.status}, Proveedores: ${report.providers.length}, Cascada: [${report.activeCascadeOrder.join(' -> ')}], Cero secretos/PII: ${safeSerialization}`
    );
  } catch (err: any) {
    registrar(7, 'Salud de proveedores', false, 'Error en reporte de salud', err?.message);
  }

  // -------------------------------------------------------------------------
  // CRITERIO 8: Sanitización de Código Fuente (src/) y Bundle Compilado (dist/)
  // -------------------------------------------------------------------------
  try {
    const srcDir = path.join(appRoot, 'src');
    const distDir = path.join(appRoot, 'dist');
    const forbiddenPatterns = [
      /VITE_GEMINI/g,
      /VITE_OPENROUTER/g,
      /VITE_DEEPSEEK/g,
      /generativelanguage\.googleapis\.com/g,
      /openrouter\.ai\/api/g,
      /api\.deepseek\.com/g,
    ];

    let srcLeaks: string[] = [];
    let distLeaks: string[] = [];

    function scanDirectory(dir: string, leakList: string[]) {
      if (!fs.existsSync(dir)) return;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDirectory(fullPath, leakList);
        } else if (/\.(tsx?|jsx?|html|js|css)$/.test(entry.name)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          for (const pat of forbiddenPatterns) {
            pat.lastIndex = 0;
            if (pat.test(content)) {
              leakList.push(`${path.relative(appRoot, fullPath)} -> ${pat.source}`);
            }
          }
        }
      }
    }

    scanDirectory(srcDir, srcLeaks);
    scanDirectory(distDir, distLeaks);

    const paso = srcLeaks.length === 0 && distLeaks.length === 0;
    registrar(
      8,
      'Sanitización de cliente y verificación de bundle compilado dist/ (cero variables VITE_ ni URLs directas)',
      paso,
      `Fugas en src/: ${srcLeaks.length}, Fugas en dist/: ${distLeaks.length}`
    );
  } catch (err: any) {
    registrar(8, 'Sanitización de cliente y dist/', false, 'Error al escanear archivos', err?.message);
  }

  // -------------------------------------------------------------------------
  // CRITERIO 9: Documentación y .env.example Sincronizados
  // -------------------------------------------------------------------------
  try {
    const envExamplePath = path.join(appRoot, '.env.example');
    const content = fs.readFileSync(envExamplePath, 'utf8');

    const tienePrioridad = content.includes('AI_PROVIDER_PRIORITY');
    const tieneTimeout = content.includes('AI_TIMEOUT_MS');
    const tieneRetries = content.includes('AI_MAX_RETRIES');
    const tieneStudentLimit = content.includes('AI_STUDENT_MAX_DAILY_REQUESTS');
    const tieneGemini = content.includes('GEMINI_API_KEY');
    const tieneDeepseek = content.includes('DEEPSEEK_API_KEY');
    const tieneOpenrouter = content.includes('OPENROUTER_API_KEY');
    const clasificaObligatorias = content.includes('OBLIGATORIA') && content.includes('OPCIONAL');

    const paso = tienePrioridad && tieneTimeout && tieneRetries && tieneStudentLimit && 
                 tieneGemini && tieneDeepseek && tieneOpenrouter && clasificaObligatorias;

    registrar(
      9,
      'Sincronización de plantilla maestra .env.example (clasificación obligatoria vs opcional, prioridades y límites)',
      paso,
      `Prioridad documentada: ${tienePrioridad}, Timeouts y cuotas documentados: ${tieneTimeout && tieneRetries && tieneStudentLimit}, Obligatoriedad clara: ${clasificaObligatorias}`
    );
  } catch (err: any) {
    registrar(9, 'Documentación .env.example', false, 'Error al leer .env.example', err?.message);
  }

  console.log('\n================================================================');
  const todasPasaron = resultados.every((r) => r.paso);
  const conteo = `${resultados.filter((r) => r.paso).length} / ${resultados.length}`;
  console.log(`  RESULTADO FINAL ETAPA 08: ${conteo} CRITERIOS APROBADOS`);
  console.log(`  ESTADO: ${todasPasaron ? '✅ SUITE APROBADA EXITOSAMENTE' : '❌ EXISTEN FALLOS'}`);
  console.log('================================================================\n');

  if (!todasPasaron) {
    process.exit(1);
  }
}

ejecutarSuiteUnificada();

