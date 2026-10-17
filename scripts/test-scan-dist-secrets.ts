/**
 * ==============================================================================
 * Escáner Estático de Seguridad de Bundles — Detección de Secretos y Fugas (P0)
 * Plataforma Educativa ALSIZ — Ekballo Church
 * ==============================================================================
 * 
 * Audita recursivamente la carpeta dist/ para garantizar que:
 * 1. Ninguna clave API privada (Gemini, OpenRouter, DeepSeek, Resend, Turso) se haya filtrado en el cliente.
 * 2. Ningún bundle del navegador llame directamente a endpoints de proveedores externos.
 * 3. Ninguna variable VITE_* contenga credenciales privadas.
 * 
 * Regla de cumplimiento:
 * Si se detecta un patrón sospechoso, NUNCA imprime el valor del secreto en los logs.
 */

import fs from 'node:fs';
import path from 'node:path';

interface Finding {
  file: string;
  patternName: string;
  severity: 'CRITICAL' | 'WARNING';
}

const PATTERNS: Array<{ name: string; regex: RegExp; severity: 'CRITICAL' | 'WARNING'; clientOnly?: boolean }> = [
  {
    name: 'Gemini API Key (AIzaSy...)',
    regex: /AIzaSy[A-Za-z0-9_-]{33}/g,
    severity: 'CRITICAL',
  },
  {
    name: 'OpenRouter Key (sk-or-v1-...)',
    regex: /sk-or-v1-[a-f0-9]{64}/g,
    severity: 'CRITICAL',
  },
  {
    name: 'DeepSeek / OpenAI Key (sk-...)',
    regex: /sk-[a-zA-Z0-9]{32,}/g,
    severity: 'CRITICAL',
  },
  {
    name: 'Resend API Key (re_...)',
    regex: /re_[a-zA-Z0-9]{20,}/g,
    severity: 'CRITICAL',
  },
  {
    name: 'Direct Browser Call: Google Generative Language API',
    regex: /generativelanguage\.googleapis\.com/gi,
    severity: 'CRITICAL',
    clientOnly: true,
  },
  {
    name: 'Direct Browser Call: OpenRouter API',
    regex: /openrouter\.ai\/api/gi,
    severity: 'CRITICAL',
    clientOnly: true,
  },
  {
    name: 'Direct Browser Call: DeepSeek API',
    regex: /api\.deepseek\.com/gi,
    severity: 'CRITICAL',
    clientOnly: true,
  },
  {
    name: 'VITE Secret Exposure Variable',
    regex: /VITE_(GEMINI|OPENROUTER|DEEPSEEK|TURSO|RESEND)_(API_KEY|AUTH_TOKEN|SECRET)/gi,
    severity: 'CRITICAL',
    clientOnly: true,
  },
];

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

export function scanDistSecrets(distPath: string): { findings: Finding[]; totalFilesScanned: number } {
  const files = getAllFiles(distPath);
  const findings: Finding[] = [];

  for (const filePath of files) {
    const relPath = path.relative(distPath, filePath).replace(/\\/g, '/');
    const isClientBundle = !relPath.startsWith('server.cjs') && !relPath.endsWith('.map');

    // Solo analizar archivos de texto / código
    if (!/\.(html|js|cjs|mjs|css|json|txt)$/i.test(filePath)) {
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');

    for (const rule of PATTERNS) {
      if (rule.clientOnly && !isClientBundle) {
        continue;
      }

      rule.regex.lastIndex = 0;
      if (rule.regex.test(content)) {
        findings.push({
          file: relPath,
          patternName: rule.name,
          severity: rule.severity,
        });
      }
    }
  }

  return { findings, totalFilesScanned: files.length };
}

// Ejecución directa si se invoca como CLI
if (require.main === module) {
  const appRoot = process.cwd();
  const distDir = path.join(appRoot, 'dist');

  console.log('===========================================================');
  console.log('  ALSIZ — Escaneo Estático de Seguridad de Bundles (dist/)');
  console.log('===========================================================');

  if (!fs.existsSync(distDir)) {
    console.error('❌ Error: El directorio dist/ no existe. Ejecuta "npm run build" antes de escanear.');
    process.exit(1);
  }

  const { findings, totalFilesScanned } = scanDistSecrets(distDir);

  console.log(`Archivos analizados: ${totalFilesScanned}`);

  const criticalFindings = findings.filter((f) => f.severity === 'CRITICAL');

  if (findings.length === 0) {
    console.log('\n✅ CERO SECRETOS DETECTADOS: Los artefactos de frontend no contienen claves ni llamadas directas a proveedores.');
    process.exit(0);
  } else {
    console.error(`\n❌ Se encontraron ${findings.length} hallazgos de seguridad en dist/:`);
    for (const f of findings) {
      console.error(`  [${f.severity}] Archivo: ${f.file} -> Patrón detectado: ${f.patternName} (valor no divulgado por seguridad)`);
    }
    if (criticalFindings.length > 0) {
      process.exit(1);
    }
    process.exit(0);
  }
}

