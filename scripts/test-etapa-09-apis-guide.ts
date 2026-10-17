/**
 * ==============================================================================
 * Verificador Automatizado de la Guía de Configuración de APIs (ETAPA-09)
 * Plataforma Educativa ALSIZ — Ekballo Church
 * ==============================================================================
 * Verifica que docs/operacion/guia_configuracion_apis_piloto.md cumpla estrictamente
 * todos los requisitos de contenido, enlaces oficiales, aislamiento de secretos,
 * catálogo honesto y compatibilidad arquitectónica.
 */

import fs from 'node:fs';
import path from 'node:path';
import { ProviderManager } from '../server/agents/providers/providerManager';
import { auditAIConfiguration } from './test-ai-providers-config';

interface CheckItem {
  id: string;
  name: string;
  passed: boolean;
  details: string;
}

const checks: CheckItem[] = [];

function recordCheck(id: string, name: string, passed: boolean, details: string) {
  checks.push({ id, name, passed, details });
  const icon = passed ? '✅' : '❌';
  console.log(`[${id}] ${icon} ${name}`);
  console.log(`       Detalle: ${details}`);
}

async function runGuideVerification(): Promise<boolean> {
  console.log('================================================================');
  console.log('  VALIDACIÓN AUTOMATIZADA — ETAPA 09: GUÍA DE CONFIGURACIÓN DE APIS');
  console.log('================================================================\n');

  const guidePath = path.resolve(process.cwd(), 'docs/operacion/guia_configuracion_apis_piloto.md');
  const exists = fs.existsSync(guidePath);

  recordCheck(
    'C01_ARCHIVO_EXISTE',
    'Existencia física de la guía de configuración',
    exists,
    exists ? `Archivo encontrado en ${guidePath} (${fs.statSync(guidePath).size} bytes)` : 'Archivo no encontrado'
  );

  if (!exists) {
    return false;
  }

  const content = fs.readFileSync(guidePath, 'utf-8');

  // C02: Sección Gemini
  const hasGeminiDocUrl = content.includes('https://ai.google.dev/gemini-api/docs/api-key') || content.includes('ai.google.dev/gemini-api/docs/api-key');
  const hasAIStudioUrl = content.includes('https://aistudio.google.com/apikey') || content.includes('aistudio.google.com/apikey');
  const hasGeminiVar = content.includes('GEMINI_API_KEY');
  const forbidsVitePrefix = content.includes('VITE_') && (content.includes('nunca con prefijo `VITE_`') || content.includes('NUNCA deben tener el prefijo `VITE_`'));
  const mentionsOAuthWarning = content.includes('OAuth') && content.includes('OAuth Client ID');
  const mentionsApiRestriction = content.includes('Generative Language API') || content.includes('Restrict key');
  const mentionsGeminiRotation = content.includes('Rotación') || content.includes('rotar');

  const geminiComplete = hasGeminiDocUrl && hasAIStudioUrl && hasGeminiVar && forbidsVitePrefix && mentionsOAuthWarning && mentionsApiRestriction && mentionsGeminiRotation;
  recordCheck(
    'C02_SECCION_GEMINI',
    'Sección A: Google Gemini documentada con portal, variable, restricciones y rotación',
    geminiComplete,
    `URLs oficiales: ${hasGeminiDocUrl && hasAIStudioUrl}, Variable: ${hasGeminiVar}, Prohibición VITE: ${forbidsVitePrefix}, Advertencia OAuth: ${mentionsOAuthWarning}, Restricciones API: ${mentionsApiRestriction}, Rotación: ${mentionsGeminiRotation}`
  );

  // C03: Sección DeepSeek
  const hasDeepSeekPortal = content.includes('https://platform.deepseek.com/api_keys') || content.includes('platform.deepseek.com/api_keys');
  const hasDeepSeekDocs = content.includes('https://api-docs.deepseek.com/api/create-chat-completion/') || content.includes('api-docs.deepseek.com/api/create-chat-completion');
  const hasDeepSeekVar = content.includes('DEEPSEEK_API_KEY');
  const mentionsBilling = content.includes('saldo') || content.includes('Top up') || content.includes('facturación') || content.includes('cuota');
  const mentionsCascade = content.includes('cascada') || content.includes('fallback') || content.includes('Fallback');
  const mentionsDeepSeekRotation = content.includes('Rotación de Clave DeepSeek') || (content.includes('DeepSeek') && content.includes('rotar'));

  const deepseekComplete = hasDeepSeekPortal && hasDeepSeekDocs && hasDeepSeekVar && mentionsBilling && mentionsCascade && mentionsDeepSeekRotation;
  recordCheck(
    'C03_SECCION_DEEPSEEK',
    'Sección B: DeepSeek documentado con portal, endpoint de chat, saldo, cascada y rotación',
    deepseekComplete,
    `Portal: ${hasDeepSeekPortal}, Endpoint Doc: ${hasDeepSeekDocs}, Variable: ${hasDeepSeekVar}, Facturación/Saldo: ${mentionsBilling}, Cascada: ${mentionsCascade}, Rotación: ${mentionsDeepSeekRotation}`
  );

  // C04: Sección OpenRouter y OpenCode (Catálogo honesto)
  const hasOpenRouter = content.includes('OPENROUTER_API_KEY') && content.includes('https://openrouter.ai/settings/keys');
  const openCodeHonesty = content.includes('OpenCode') && content.includes('NO') && (content.includes('NO INTEGRADO') || content.includes('NO Conectado'));
  const warnsAgainstOpenCodeAccount = content.includes('NO cree cuentas en OpenCode') || content.includes('No crear cuentas');

  recordCheck(
    'C04_OPENROUTER_Y_OPENCODE_HONESTIDAD',
    'Sección C: OpenRouter documentado y OpenCode transparentemente declarado NO conectado',
    hasOpenRouter && openCodeHonesty && warnsAgainstOpenCodeAccount,
    `OpenRouter integrado: ${hasOpenRouter}, OpenCode honesto: ${openCodeHonesty}, Advertencia no crear cuenta: ${warnsAgainstOpenCodeAccount}`
  );

  // C05: Inventario de Variables de Entorno del Backend
  const expectedVars = [
    'NODE_ENV',
    'PORT',
    'APP_URL',
    'DATABASE_PATH',
    'SESSION_SECRET',
    'SESSION_TTL_HOURS',
    'GEMINI_API_KEY',
    'DEEPSEEK_API_KEY',
    'OPENROUTER_API_KEY',
    'EMAIL_USER',
    'EMAIL_PASS',
    'RESEND_API_KEY',
  ];

  const missingVars = expectedVars.filter((v) => !content.includes(v));
  const varsComplete = missingVars.length === 0;

  recordCheck(
    'C05_INVENTARIO_VARIABLES',
    'Sección D: Inventario exhaustivo de variables efectivamente leídas por el backend',
    varsComplete,
    varsComplete ? `Todas las ${expectedVars.length} variables documentadas` : `Faltan variables: ${missingVars.join(', ')}`
  );

  // C06: Reglas de Entornos, .env.example y Redeployment de Vercel
  const mentionsEnvExample = content.includes('.env.example');
  const mentionsGitIgnore = content.includes('.gitignore') || content.includes('no se versionan') || content.includes('nunca se suben');
  const hasVercelRedeployRule = content.includes('https://vercel.com/docs/environment-variables') && (content.includes('Redeploy') || content.includes('nuevo despliegue'));
  const mentionsSyntheticEmailForTests = content.includes('sintética') || content.includes('prueba');

  const envRulesComplete = mentionsEnvExample && mentionsGitIgnore && hasVercelRedeployRule && mentionsSyntheticEmailForTests;
  recordCheck(
    'C06_REGLAS_ENTORNOS_Y_VERCEL',
    'Sección D: Reglas de no versionado, .env.example, redeploy obligatorio en Vercel y emails sintéticos',
    envRulesComplete,
    `.env.example: ${mentionsEnvExample}, No versionado: ${mentionsGitIgnore}, Vercel Redeploy doc: ${hasVercelRedeployRule}, Test sintético: ${mentionsSyntheticEmailForTests}`
  );

  // C07: Comparativa de Arquitecturas (Recomendada vs Alternativa)
  const mentionsOptionA = content.includes('Opción A') || content.includes('Arquitectura Recomendada');
  const mentionsOptionB = content.includes('Opción B') || content.includes('Arquitectura Alternativa');
  const isolatesSecretsFromVercelInA = content.includes('BACKEND_URL') && content.includes('NO configure `GEMINI_API_KEY`') || content.includes('residir EXCLUSIVAMENTE');
  const detailsProductionAndPreviewInB = content.includes('Production') && content.includes('Preview') && content.includes('TURSO_DATABASE_URL');
  const requiresSmokeTestConfirmation = content.includes('smoke test') || content.includes('Smoke Test');

  const archComplete = mentionsOptionA && mentionsOptionB && isolatesSecretsFromVercelInA && detailsProductionAndPreviewInB && requiresSmokeTestConfirmation;
  recordCheck(
    'C07_ARQUITECTURAS_Y_VERIFICACION',
    'Sección E: Mapeo exacto por plataforma (Vercel vs Backend Persistente / Turso) con ambientes separados',
    archComplete,
    `Opción A: ${mentionsOptionA}, Opción B: ${mentionsOptionB}, Aislamiento secretos en A: ${isolatesSecretsFromVercelInA}, Prod/Preview en B: ${detailsProductionAndPreviewInB}, Smoke test: ${requiresSmokeTestConfirmation}`
  );

  // C08: Cero Fuga de Secretos en el Documento (P0)
  // Patrones sospechosos de claves reales
  const realKeyPatterns = [
    /AIzaSy[A-Za-z0-9_-]{33}/,
    /sk-[a-zA-Z0-9]{30,}/,
    /re_[a-zA-Z0-9]{20,}/,
    /ghp_[a-zA-Z0-9]{36}/,
  ];

  let leakedSecrets = 0;
  for (const pat of realKeyPatterns) {
    if (pat.test(content)) {
      leakedSecrets++;
    }
  }

  recordCheck(
    'C08_CERO_FUGA_DE_SECRETOS',
    'Seguridad P0: Ausencia absoluta de claves API, tokens o contraseñas reales en el texto',
    leakedSecrets === 0,
    leakedSecrets === 0 ? 'Documento limpio: 0 claves o patrones secretos detectados' : `¡ALERTA! Se detectaron ${leakedSecrets} posibles secretos en el documento`
  );

  // C09: Validación Técnica de Runtime (Catálogo honesto y auditoría sanitizada)
  const isOpencodeAvail = ProviderManager.isProviderAvailable('OPENCODE');
  const auditResult = auditAIConfiguration();
  const allChecksSanitized = auditResult.checks.every((c) => c.status === 'CONFIGURADA' || c.status === 'NO_CONFIGURADA');

  const runtimeConsistent = !isOpencodeAvail && allChecksSanitized;
  recordCheck(
    'C09_CONSISTENCIA_RUNTIME_BACKEND',
    'Consistencia técnica con el runtime (OpenCode rechazado en runtime y auditoría sanitizada)',
    runtimeConsistent,
    `isProviderAvailable('OPENCODE'): ${isOpencodeAvail} (Esperado: false), Auditoría booleana sanitizada: ${allChecksSanitized}`
  );

  const allPassed = checks.every((c) => c.passed);

  console.log('\n----------------------------------------------------------------');
  console.log(`RESULTADO DE LA AUDITORÍA DE LA GUÍA: ${allPassed ? '✅ TODOS LOS CRITERIOS APROBADOS' : '❌ FALLARON ALGUNOS CRITERIOS'}`);
  console.log(`Criterios cumplidos: ${checks.filter((c) => c.passed).length} / ${checks.length}`);
  console.log('----------------------------------------------------------------\n');

  return allPassed;
}

if (require.main === module) {
  runGuideVerification().then((ok) => {
    if (!ok) process.exit(1);
  });
}

