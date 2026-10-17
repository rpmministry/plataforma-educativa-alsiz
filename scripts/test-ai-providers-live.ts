/**
 * ==============================================================================
 * Prueba de Conexión Real a Proveedores de IA Externos (ETAPA-08)
 * Plataforma Educativa ALSIZ — Ekballo Church
 * ==============================================================================
 * REGLAS OPERATIVAS:
 * 1. La prueba de un proveedor simulado NO cuenta como prueba de API real.
 * 2. Si no hay clave configurada, marca "BLOCKED: falta configurar secreto" (no simular éxito).
 * 3. Petición corta y no sensible (sintética).
 * 4. Registra proveedor, modelo, latencia (ms), tokens y estado.
 * 5. Cero exposición de claves o datos personales en consola o reportes.
 */

import path from 'node:path';
import dotenv from 'dotenv';
import { ProviderManager } from '../server/agents/providers/providerManager';
import { GeminiProvider } from '../server/agents/providers/geminiProvider';
import { DeepSeekProvider } from '../server/agents/providers/deepseekProvider';
import { OpenRouterProvider } from '../server/agents/providers/openRouterProvider';
import { SimulatedProvider } from '../server/agents/providers/simulatedProvider';
import { RagContextChunk } from '../server/agents/types';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

interface ProviderLiveResult {
  provider: string;
  configured: boolean;
  status: 'SUCCESS' | 'BLOCKED_MISSING_SECRET' | 'FAILED' | 'SKIPPED';
  model: string;
  latencyMs?: number;
  tokensPrompt?: number;
  tokensCompletion?: number;
  sampleOutput?: string;
  error?: string;
}

const liveResults: ProviderLiveResult[] = [];

async function testSingleProvider(
  name: string,
  providerInstance: { isAvailable(): boolean; generateResponse(req: any): Promise<any>; getModelName?: () => string },
  forcedName: string
): Promise<ProviderLiveResult> {
  const isConfigured = providerInstance.isAvailable();
  const modelName = providerInstance.getModelName ? providerInstance.getModelName() : 'desconocido';

  if (!isConfigured) {
    const res: ProviderLiveResult = {
      provider: name,
      configured: false,
      status: 'BLOCKED_MISSING_SECRET',
      model: modelName,
      error: 'BLOCKED: falta configurar secreto',
    };
    liveResults.push(res);
    return res;
  }

  const syntheticPrompt = 'Responde únicamente con la palabra CONECTADO para validar la conexión pedagógica.';
  const start = Date.now();

  try {
    const response = await ProviderManager.executeWithTimeout(
      providerInstance.generateResponse({
        agentCode: 'test_synthetic_ping',
        systemPrompt: 'Eres un sistema de prueba técnico. Responde concisamente según lo solicitado.',
        userPrompt: syntheticPrompt,
        temperature: 0.1,
        maxTokens: 50,
        forceProvider: forcedName,
        timeoutMs: 10000,
        isManualUserAction: true,
      }),
      10000,
      name
    );

    const latencyMs = Date.now() - start;
    const cleanOutput = (response.content || '').replace(/\s+/g, ' ').trim().slice(0, 60);

    const res: ProviderLiveResult = {
      provider: name,
      configured: true,
      status: 'SUCCESS',
      model: response.modelName || modelName,
      latencyMs,
      tokensPrompt: response.tokensPrompt,
      tokensCompletion: response.tokensCompletion,
      sampleOutput: cleanOutput,
    };
    liveResults.push(res);
    return res;
  } catch (err: any) {
    const latencyMs = Date.now() - start;
    const res: ProviderLiveResult = {
      provider: name,
      configured: true,
      status: 'FAILED',
      model: modelName,
      latencyMs,
      error: (err?.message || String(err)).slice(0, 120),
    };
    liveResults.push(res);
    return res;
  }
}

export async function runAIProvidersLiveTest(): Promise<{
  results: ProviderLiveResult[];
  cascadeRealSuccess: boolean;
  citationGroundingSuccess: boolean;
}> {
  console.log('================================================================');
  console.log('  PRUEBA REAL EXTERNA DE CONEXIÓN A PROVEEDORES IA (ETAPA 08)');
  console.log('  VALIDACIÓN DE LLAMADAS REALES SIN SIMULACIÓN FICTICIA');
  console.log('================================================================\n');

  const gemini = new GeminiProvider();
  const deepseek = new DeepSeekProvider();
  const openrouter = new OpenRouterProvider();
  const simulated = new SimulatedProvider();

  console.log('1. Probando Proveedor Oficial Google Gemini...');
  const geminiRes = await testSingleProvider('GOOGLE_GEMINI', gemini, 'GEMINI');
  console.log(`   Resultado: ${geminiRes.status} | Modelo: ${geminiRes.model} | Latencia: ${geminiRes.latencyMs || 0}ms`);
  if (geminiRes.sampleOutput) console.log(`   Salida: "${geminiRes.sampleOutput}"`);
  if (geminiRes.error) console.log(`   Detalle: ${geminiRes.error}`);

  console.log('\n2. Probando Proveedor DeepSeek API...');
  const deepseekRes = await testSingleProvider('DEEPSEEK_API', deepseek, 'DEEPSEEK');
  console.log(`   Resultado: ${deepseekRes.status} | Modelo: ${deepseekRes.model} | Latencia: ${deepseekRes.latencyMs || 0}ms`);
  if (deepseekRes.sampleOutput) console.log(`   Salida: "${deepseekRes.sampleOutput}"`);
  if (deepseekRes.error) console.log(`   Detalle: ${deepseekRes.error}`);

  console.log('\n3. Probando Proveedor OpenRouter API...');
  const openrouterRes = await testSingleProvider('OPENROUTER_API', openrouter, 'OPENROUTER');
  console.log(`   Resultado: ${openrouterRes.status} | Modelo: ${openrouterRes.model} | Latencia: ${openrouterRes.latencyMs || 0}ms`);
  if (openrouterRes.sampleOutput) console.log(`   Salida: "${openrouterRes.sampleOutput}"`);
  if (openrouterRes.error) console.log(`   Detalle: ${openrouterRes.error}`);

  console.log('\n4. Probando Cascada Natural mediante ProviderManager.generateResponse()...');
  let cascadeRealSuccess = false;
  try {
    const start = Date.now();
    const cascadeRes = await ProviderManager.generateResponse({
      agentCode: 'prof_gael_ciencias',
      systemPrompt: 'Eres el Profesor de Ciencias para primaria elemental.',
      userPrompt: '¿Qué es una planta? Responde en una sola frase breve.',
      temperature: 0.2,
      maxTokens: 100,
      isManualUserAction: true,
    });
    const cascadeLatency = Date.now() - start;

    console.log(`   Proveedor Utilizado: ${cascadeRes.providerName}`);
    console.log(`   Modelo Utilizado:    ${cascadeRes.modelName}`);
    console.log(`   Es Fallback Simulado: ${cascadeRes.isFallback ? 'SÍ (simulador local)' : 'NO (proveedor real externo)'}`);
    console.log(`   Latencia:            ${cascadeLatency}ms`);
    console.log(`   Salida Sanitizada:   "${cascadeRes.content.replace(/\s+/g, ' ').trim().slice(0, 80)}"`);

    if (!cascadeRes.isFallback && ['GOOGLE_GEMINI', 'DEEPSEEK_API', 'OPENROUTER_API'].includes(cascadeRes.providerName)) {
      cascadeRealSuccess = true;
    }
  } catch (err: any) {
    console.error('   ❌ Error en cascada:', err.message);
  }

  console.log('\n5. Probando Validación de Respuestas Fundamentadas (Citas RAG estrictas)...');
  let citationGroundingSuccess = false;
  try {
    const dummyChunks: RagContextChunk[] = [
      {
        citationTag: 'EKB-DOC-CIENCIAS#C1',
        sourceCode: 'EKB-DOC-CIENCIAS',
        sourceTitle: 'Guía Botánica Elemental ALSIZ',
        contentText: 'La fotosíntesis es el proceso mediante el cual las hojas absorben luz solar y dióxido de carbono para producir energía nutritiva.',
        relevanceScore: 0.95,
      },
      {
        citationTag: 'EKB-DOC-NO-USADO#C9',
        sourceCode: 'EKB-DOC-NO-USADO',
        sourceTitle: 'Fragmento No Citado',
        contentText: 'Este texto no debe ser citado porque la pregunta no versa sobre él.',
        relevanceScore: 0.1,
      },
    ];

    const ragTestRes = await ProviderManager.generateResponse({
      agentCode: 'prof_gael_ciencias',
      systemPrompt: 'Eres un profesor socrático. Si utilizas la información proporcionada, cita exactamente la etiqueta EKB-DOC-CIENCIAS#C1 en tu respuesta.',
      userPrompt: '¿Cómo obtienen energía las hojas según la guía?',
      ragContext: dummyChunks,
      temperature: 0.1,
      maxTokens: 150,
      isManualUserAction: true,
    });

    console.log(`   Fragmentos entregados al prompt: 2 (${dummyChunks.map((c) => c.citationTag).join(', ')})`);
    console.log(`   Citas reportadas por el proveedor: [${ragTestRes.citationTags.join(', ')}]`);
    console.log(`   Respuesta generada: "${ragTestRes.content.replace(/\s+/g, ' ').trim().slice(0, 100)}"`);

    // Validación estricta:
    // 1. Cada tag en citationTags DEBE estar presente literalmente en content
    const allTagsInText = ragTestRes.citationTags.every((tag) => ragTestRes.content.includes(tag));
    // 2. El tag no usado no debe estar inventado en citationTags a menos que esté en el texto
    const unreferencedNotIncluded = !ragTestRes.content.includes('EKB-DOC-NO-USADO#C9')
      ? !ragTestRes.citationTags.includes('EKB-DOC-NO-USADO#C9')
      : true;

    citationGroundingSuccess = allTagsInText && unreferencedNotIncluded;
    console.log(`   Fundamentación estricta verificada: ${citationGroundingSuccess ? '✅ SÍ' : '❌ NO'}`);
  } catch (err: any) {
    console.error('   ❌ Error en prueba de citas RAG:', err.message);
  }

  console.log('\n================================================================');
  console.log('RESUMEN DE PRUEBA REAL EXTERNA DE PROVEEDORES:');
  console.log('----------------------------------------------------------------');
  const atLeastOneRealWorks = liveResults.some((r) => r.configured && r.status === 'SUCCESS');
  console.log(`Al menos un proveedor real funciona: ${atLeastOneRealWorks ? '✅ SÍ' : '❌ NO'}`);
  console.log(`Cascada a proveedor real exitosa:   ${cascadeRealSuccess ? '✅ SÍ' : '⚠️ EN FALLBACK'}`);
  console.log(`Citas RAG estrictas y honestas:     ${citationGroundingSuccess ? '✅ SÍ' : '❌ NO'}`);
  console.log('================================================================\n');

  return {
    results: liveResults,
    cascadeRealSuccess,
    citationGroundingSuccess,
  };
}

if (require.main === module) {
  runAIProvidersLiveTest()
    .then((res) => {
      const atLeastOne = res.results.some((r) => r.configured && r.status === 'SUCCESS');
      if (!atLeastOne) {
        console.error('CRITERIO NO CUMPLIDO: Ningún proveedor externo real pudo responder.');
        process.exit(1);
      }
      process.exit(0);
    })
    .catch((err) => {
      console.error('Error fatal en ejecución de pruebas reales:', err);
      process.exit(1);
    });
}

