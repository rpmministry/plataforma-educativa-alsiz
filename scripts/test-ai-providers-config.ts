/**
 * ==============================================================================
 * Prueba de Configuración de Proveedores IA (ETAPA-08 / P0 Seguridad)
 * Plataforma Educativa ALSIZ — Ekballo Church
 * ==============================================================================
 * REGLA ESTRICTA:
 * Informa ÚNICAMENTE si las variables están "configurada" o "no configurada".
 * NUNCA imprime, guarda, loguea ni expone valores de claves, longitud ni hashes.
 */

import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { ProviderManager } from '../server/agents/providers/providerManager';

// Cargar variables de entorno
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

interface ConfigCheck {
  keyName: string;
  isMandatory: boolean;
  status: 'CONFIGURADA' | 'NO_CONFIGURADA';
  purpose: string;
  location: string;
}

export function auditAIConfiguration(): {
  checks: ConfigCheck[];
  healthReport: ReturnType<typeof ProviderManager.getHealthReport>;
} {
  const secretKeysToCheck = [
    {
      keyName: 'GEMINI_API_KEY',
      isMandatory: true,
      purpose: 'Proveedor Primario LLM (Google AI Studio Free Tier / gemini-3.8-flash)',
      location: 'Google AI Studio (https://aistudio.google.com/apikey)',
    },
    {
      keyName: 'DEEPSEEK_API_KEY',
      isMandatory: false,
      purpose: 'Proveedor Secundario LLM (DeepSeek Platform API / deepseek-chat)',
      location: 'DeepSeek Platform (https://platform.deepseek.com/api_keys)',
    },
    {
      keyName: 'OPENROUTER_API_KEY',
      isMandatory: false,
      purpose: 'Proveedor Terciario / Respaldo Multimodelo (OpenRouter Free Models)',
      location: 'OpenRouter (https://openrouter.ai/settings/keys)',
    },
    {
      keyName: 'GOOGLE_TTS_API_KEY',
      isMandatory: false,
      purpose: 'Voz Neuronal Docente (Google Cloud Text-to-Speech Neural2)',
      location: 'Google Cloud Console (Cloud Text-to-Speech API)',
    },
    {
      keyName: 'OPENCODE_API_KEY',
      isMandatory: false,
      purpose: 'No consumido en runtime por la plataforma ALSIZ (Catálogo honesto)',
      location: 'N/A (Desactivado en runtime)',
    },
  ];

  const checks: ConfigCheck[] = secretKeysToCheck.map((item) => {
    const rawValue = process.env[item.keyName];
    const isConfigured = Boolean(rawValue && rawValue.trim().length > 0);
    return {
      keyName: item.keyName,
      isMandatory: item.isMandatory,
      status: isConfigured ? 'CONFIGURADA' : 'NO_CONFIGURADA',
      purpose: item.purpose,
      location: item.location,
    };
  });

  const healthReport = ProviderManager.getHealthReport();

  return { checks, healthReport };
}

function run(): void {
  console.log('================================================================');
  console.log('  AUDITORÍA DE CONFIGURACIÓN DE PROVEEDORES IA (ETAPA 08)');
  console.log('  POLÍTICA DE SEGURIDAD P0: CERO EXPOSICIÓN DE VALORES');
  console.log('================================================================\n');

  const { checks, healthReport } = auditAIConfiguration();

  console.log('ESTADO DE VARIABLES SECRETAS (Solo presencia / NUNCA valores):');
  console.log('----------------------------------------------------------------');
  for (const c of checks) {
    const icon = c.status === 'CONFIGURADA' ? '🟢' : c.isMandatory ? '🔴' : '⚪';
    const tag = c.isMandatory ? '[OBLIGATORIA]' : '[OPCIONAL]   ';
    console.log(`${icon} ${tag} ${c.keyName.padEnd(20)}: ${c.status}`);
    console.log(`     Propósito: ${c.purpose}`);
    console.log(`     Gestión:   ${c.location}`);
  }

  console.log('\n----------------------------------------------------------------');
  console.log('MODELOS CONFIGURADOS (Valores públicos de modelo):');
  console.log('----------------------------------------------------------------');
  console.log(` - GEMINI_MODEL:     ${process.env.GEMINI_MODEL || 'gemini-3.8-flash (predeterminado)'}`);
  console.log(` - DEEPSEEK_MODEL:   ${process.env.DEEPSEEK_MODEL || 'deepseek-chat (predeterminado)'}`);
  console.log(` - OPENROUTER_MODEL: ${process.env.OPENROUTER_MODEL || process.env.AI_TIER1_MODEL || 'meta-llama/llama-3.3-70b-instruct:free (predeterminado)'}`);
  console.log(` - SIMULATED_MODEL:  alsiz-socratic-local-v1 (fallback offline)`);

  console.log('\n----------------------------------------------------------------');
  console.log('REPORTE SANITIZADO DEL GESTOR (ProviderManager.getHealthReport):');
  console.log('----------------------------------------------------------------');
  console.log(`Estado General:    ${healthReport.status}`);
  console.log(`Proveedor Activo:  ${healthReport.activeProvider}`);
  console.log(`Política de Cuota: ${healthReport.quotaPolicy.maxRequestsPerMinute} req/min | ${healthReport.quotaPolicy.maxDailyPerStudent} req/día`);
  console.log(`Modo de Operación: ${healthReport.quotaPolicy.mode}`);
  console.log('\nProveedores Registrados:');
  for (const p of healthReport.providers) {
    console.log(` - ${p.name.padEnd(16)} | Modelo: ${p.model.padEnd(24)} | Estado: ${p.status.padEnd(22)} | Prioridad: ${p.priority} | Fallback: ${p.isFallback ? 'SÍ' : 'NO'}`);
  }

  // Verificación de seguridad estricta: asegurar que el reporte no contiene ninguna clave
  const serialized = JSON.stringify(healthReport);
  for (const c of checks) {
    const rawVal = process.env[c.keyName];
    if (rawVal && rawVal.length > 5 && serialized.includes(rawVal)) {
      console.error(`\n❌ ERROR CRÍTICO DE SEGURIDAD P0: El reporte de salud filtró el valor de ${c.keyName}!`);
      process.exit(1);
    }
  }

  console.log('\n✅ AUDITORÍA DE CONFIGURACIÓN COMPLETADA CON ÉXITO (0 SECRETOS EXPUESTOS)');
}

if (require.main === module) {
  run();
}

