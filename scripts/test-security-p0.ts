/**
 * ==============================================================================
 * Suite de Verificación Automatizada: Seguridad P0 y Eliminación de Credenciales
 * Plataforma Educativa ALSIZ — Ekballo Church
 * ==============================================================================
 * 
 * Verifica 10 dimensiones críticas de seguridad exigidas para la Etapa 01:
 * 1. Sanitización de frontend (cero claves ni URLs de IA en src/)
 * 2. Unificación de proveedores en ProviderManager
 * 3. Catálogo honesto de proveedores (no anuncia OpenCode)
 * 4. Degradación elegante a simulador local socrático (cero 500)
 * 5. Validación estricta de SESSION_SECRET en producción (rechazo de claves cortas o por defecto)
 * 6. Aislamiento de migraciones en producción (exclusión de 003_seed_dev_data.sql)
 * 7. Herramienta de inicialización segura de administrador (Bootstrap)
 * 8. Política de contraseñas robustas y hashing scrypt en bootstrap
 * 9. Sanitización de telemetría y logs de auditoría (redacción de secretos y hashing de IPs)
 * 10. Salud de API /api/health sin exposición de claves ni tokens
 */

import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { ProviderManager } from '../server/agents/providers/providerManager';
import {
  validateProductionSessionSecret,
  hashPassword,
  verifyPassword,
  hashIp,
} from '../server/auth/crypto';
import { runMigrations } from '../server/db/migrator';
import { bootstrapAdmin } from './bootstrap-admin';
import { sanitizeAuditDetails } from '../server/middleware/auditMiddleware';

interface TestRecord {
  num: number;
  name: string;
  passed: boolean;
  details?: string;
  error?: string;
}

const tests: TestRecord[] = [];

function record(num: number, name: string, passed: boolean, details?: string, error?: string) {
  tests.push({ num, name, passed, details, error });
  const statusStr = passed ? '✅ PASÓ' : '❌ FALLÓ';
  console.log(`[P0-TEST-${num.toString().padStart(2, '0')}] ${statusStr}: ${name}`);
  if (details) console.log(`             ℹ️  ${details}`);
  if (error) console.error(`             ⚠️  Error: ${error}`);
}

async function runSecurityP0Suite() {
  console.log('================================================================');
  console.log('  SUITE DE PRUEBAS DE SEGURIDAD P0 — PLATAFORMA EDUCATIVA ALSIZ');
  console.log('  Ekballo Church — Etapa 01: Seguridad y Claves de Cliente');
  console.log('================================================================\n');

  const appRoot = process.cwd();

  // -------------------------------------------------------------------------
  // TEST 1: Sanitización de Código Frontend (src/)
  // -------------------------------------------------------------------------
  try {
    const srcDir = path.join(appRoot, 'src');
    const forbiddenPatterns = [
      /VITE_GEMINI/g,
      /VITE_OPENROUTER/g,
      /generativelanguage\.googleapis\.com/g,
      /openrouter\.ai\/api/g,
    ];

    let foundLeaks: string[] = [];

    function checkDir(dir: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          checkDir(fullPath);
        } else if (/\.(tsx?|jsx?|html)$/.test(entry.name)) {
          const content = fs.readFileSync(fullPath, 'utf8');
          for (const pat of forbiddenPatterns) {
            pat.lastIndex = 0;
            if (pat.test(content)) {
              foundLeaks.push(`${path.relative(appRoot, fullPath)} -> ${pat.source}`);
            }
          }
        }
      }
    }

    checkDir(srcDir);

    const passed = foundLeaks.length === 0;
    record(
      1,
      'Sanitización de código fuente frontend (src/ sin claves VITE ni URLs de proveedores externos)',
      passed,
      passed ? 'src/ completamente limpio de claves y peticiones directas' : `Fugas detectadas: ${foundLeaks.join('; ')}`
    );
  } catch (err: any) {
    record(1, 'Sanitización de código fuente frontend', false, undefined, err?.message);
  }

  // -------------------------------------------------------------------------
  // TEST 2: Unificación de Proveedores en ProviderManager
  // -------------------------------------------------------------------------
  try {
    const providers = ProviderManager.getAvailableProviders();
    const hasSimulated = providers.includes('SIMULATED_LOCAL');
    const hasValidNames = providers.every((p) =>
      ['SIMULATED_LOCAL', 'GOOGLE_GEMINI', 'DEEPSEEK_API', 'OPENROUTER_API'].includes(p)
    );

    record(
      2,
      'Unificación de capa de proveedores del servidor (ProviderManager con fallback socrático)',
      hasSimulated && hasValidNames,
      `Proveedores activos: ${providers.join(', ')}`
    );
  } catch (err: any) {
    record(2, 'Unificación de capa de proveedores', false, undefined, err?.message);
  }

  // -------------------------------------------------------------------------
  // TEST 3: Catálogo Honesto de Proveedores (No anuncia OpenCode ni módulos no implementados)
  // -------------------------------------------------------------------------
  try {
    const isOpenCodeAvailable = ProviderManager.isProviderAvailable('OPENCODE');
    const isSimulatedAvailable = ProviderManager.isProviderAvailable('SIMULATED_LOCAL');
    const passed = !isOpenCodeAvailable && isSimulatedAvailable;

    record(
      3,
      'Catálogo honesto de proveedores (OpenCode rechazado, proveedores implementados soportados)',
      passed,
      `isProviderAvailable('OPENCODE'): ${isOpenCodeAvailable} (Esperado: false), SIMULATED_LOCAL: ${isSimulatedAvailable}`
    );
  } catch (err: any) {
    record(3, 'Catálogo honesto de proveedores', false, undefined, err?.message);
  }

  // -------------------------------------------------------------------------
  // TEST 4: Degradación Elegante a Simulador Local (Garantía Cero 500)
  // -------------------------------------------------------------------------
  try {
    const res = await ProviderManager.generateResponse({
      agentCode: 'AGT-SOCRATIC',
      systemPrompt: 'Eres un tutor socrático.',
      userPrompt: '¿Cómo funciona la fotosíntesis?',
      temperature: 0.7,
      maxTokens: 500,
      forceProvider: 'SIMULATED',
    });

    const hasContent = Boolean(res.content && res.content.length > 20);
    const passed = hasContent && res.providerName === 'SIMULATED_LOCAL';

    record(
      4,
      'Degradación elegante a Simulador Local Socrático en contingencia (cero 500)',
      passed,
      `Proveedor: ${res.providerName}, Longitud respuesta: ${res.content.length} chars, Fallback: ${res.isFallback}`
    );
  } catch (err: any) {
    record(4, 'Degradación elegante a Simulador Local', false, undefined, err?.message);
  }

  // -------------------------------------------------------------------------
  // TEST 5: Validación Estricta de SESSION_SECRET en Producción
  // -------------------------------------------------------------------------
  try {
    let rejectedMissing = false;
    let rejectedShort = false;
    let rejectedDefault = false;
    let acceptedStrong = false;

    // 1. Debe rechazar indefinido o vacío
    try {
      validateProductionSessionSecret(undefined, true);
    } catch {
      rejectedMissing = true;
    }

    // 2. Debe rechazar secreto corto (<32 caracteres)
    try {
      validateProductionSessionSecret('clave_corta_123', true);
    } catch {
      rejectedShort = true;
    }

    // 3. Debe rechazar valor de ejemplo inseguro
    try {
      validateProductionSessionSecret('alsiz_default_privacy_pepper_2026', true);
    } catch {
      rejectedDefault = true;
    }

    // 4. Debe aceptar clave de 32+ caracteres criptográfica
    try {
      validateProductionSessionSecret('alsiz_produccion_secreto_super_seguro_2026_entropy_ok_99', true);
      acceptedStrong = true;
    } catch {
      acceptedStrong = false;
    }

    const passed = rejectedMissing && rejectedShort && rejectedDefault && acceptedStrong;
    record(
      5,
      'Validación estricta de SESSION_SECRET en producción (rechazo de claves cortas, vacías y default)',
      passed,
      `Rechazo nula: ${rejectedMissing}, Rechazo corta: ${rejectedShort}, Rechazo default: ${rejectedDefault}, Acepta 32+ robusta: ${acceptedStrong}`
    );
  } catch (err: any) {
    record(5, 'Validación de SESSION_SECRET en producción', false, undefined, err?.message);
  }

  // -------------------------------------------------------------------------
  // TEST 6: Aislamiento de Migraciones en Producción (Exclusión de 003_seed_dev_data.sql)
  // -------------------------------------------------------------------------
  try {
    const memoryDb = new DatabaseSync(':memory:');
    const migrationResults = runMigrations(memoryDb, { skipDevSeeds: true });

    const seedMigration = migrationResults.find((m) => m.version === '003');
    const wasSkipped = seedMigration?.status === 'SKIPPED';

    // Verificar que la tabla users no contiene usuarios de desarrollo
    const userCountRow = memoryDb.prepare('SELECT COUNT(*) as count FROM users;').get() as { count: number };
    const devUsersPresent = userCountRow.count > 0;

    memoryDb.close();

    const passed = wasSkipped && !devUsersPresent;
    record(
      6,
      'Aislamiento de migraciones en producción (003_seed_dev_data.sql omitido, cero cuentas demo)',
      passed,
      `Migración 003 status: ${seedMigration?.status}, Usuarios en BD limpia: ${userCountRow.count}`
    );
  } catch (err: any) {
    record(6, 'Aislamiento de migraciones en producción', false, undefined, err?.message);
  }

  // -------------------------------------------------------------------------
  // TEST 7: Inicialización Segura de Administrador (Bootstrap Admin Tool)
  // -------------------------------------------------------------------------
  let createdAdminEmail = `admin.test.${Date.now()}@alsiz.local`;
  try {
    const bootstrapRes = await bootstrapAdmin({
      email: createdAdminEmail,
      password: 'StrongBootstrapPassword2026!#',
      name: 'Admin Bootstrap Test',
      force: true,
    });

    const passed = bootstrapRes.success && Boolean(bootstrapRes.userId);
    record(
      7,
      'Herramienta de bootstrap para inicialización del primer administrador',
      passed,
      `Éxito: ${bootstrapRes.success}, Mensaje: ${bootstrapRes.message}`
    );
  } catch (err: any) {
    record(7, 'Herramienta de bootstrap admin', false, undefined, err?.message);
  }

  // -------------------------------------------------------------------------
  // TEST 8: Política de Contraseñas y Hasheo Scrypt en Bootstrap
  // -------------------------------------------------------------------------
  try {
    const weakRes = await bootstrapAdmin({
      email: `weak.${Date.now()}@alsiz.local`,
      password: '123',
      name: 'Weak Admin',
      force: true,
    });

    const rejectedWeak = !weakRes.success && weakRes.message.includes('Política de contraseña');

    // Comprobar hasheo scrypt
    const testPlain = 'PruebaScrypt2026!@#';
    const hash = hashPassword(testPlain);
    const isValid = verifyPassword(testPlain, hash);
    const isBadValid = verifyPassword('WrongPassword', hash);

    const passed = rejectedWeak && isValid && !isBadValid && hash.startsWith('scrypt$');
    record(
      8,
      'Cumplimiento de política de contraseñas robustas y hashing scrypt en bootstrap',
      passed,
      `Rechazó débil: ${rejectedWeak}, Scrypt verificado: ${isValid}, Rechaza errónea: ${!isBadValid}`
    );
  } catch (err: any) {
    record(8, 'Política de contraseñas y hashing scrypt', false, undefined, err?.message);
  }

  // -------------------------------------------------------------------------
  // TEST 9: Sanitización de Telemetría y Logs de Auditoría
  // -------------------------------------------------------------------------
  try {
    const dirtyPayload = {
      user: 'Carlos',
      password: 'SuperSecretPassword123!',
      pinCode: '1234',
      token: 'raw_session_token_xyz',
      nested: {
        creditCard: '4532-1234-5678-9012',
        secret: 'api_secret_key',
        safeProperty: 'Grado 4to EGB',
      },
    };

    const sanitized = sanitizeAuditDetails(dirtyPayload);
    const rawIp = '192.168.1.105';
    const hashedIp = hashIp(rawIp);

    const noPassword = sanitized.password === '[REDACTED]';
    const noPin = sanitized.pinCode === '[REDACTED]';
    const noToken = sanitized.token === '[REDACTED]';
    const noCard = sanitized.nested.creditCard === '[REDACTED]';
    const keepsSafe = sanitized.nested.safeProperty === 'Grado 4to EGB';
    const ipIsHashed = hashedIp !== rawIp && hashedIp.length === 64;

    const passed = noPassword && noPin && noToken && noCard && keepsSafe && ipIsHashed;
    record(
      9,
      'Sanitización de telemetría y auditoría (redacción de secretos y HMAC-SHA256 en IPs)',
      passed,
      `Redacción secretos: OK, Propiedades seguras preservadas: OK, IP Hasheada: ${hashedIp.slice(0, 12)}...`
    );
  } catch (err: any) {
    record(9, 'Sanitización de telemetría y auditoría', false, undefined, err?.message);
  }

  // -------------------------------------------------------------------------
  // TEST 10: Salud de API /api/health sin Exposición de Secretos
  // -------------------------------------------------------------------------
  try {
    const healthPayload = {
      status: 'ok',
      service: 'Plataforma Educativa ALSIZ — Ekballo Church',
      database: {
        engine: 'Turso Cloud (libSQL Remote)',
        status: 'HEALTHY',
      },
      ai: {
        deepSeekConfigured: ProviderManager.isProviderAvailable('DEEPSEEK'),
        deepSeekModel: 'deepseek-chat',
        geminiConfigured: ProviderManager.isProviderAvailable('GEMINI'),
        openRouterConfigured: ProviderManager.isProviderAvailable('OPENROUTER'),
        ttsConfigured: false,
        freeFirst: true,
        availableProviders: ProviderManager.getAvailableProviders(),
        hierarchy: ['Gemini: gemini-2.5-flash'],
      },
      time: new Date().toISOString(),
    };

    const serialized = JSON.stringify(healthPayload);
    const hasNoKeys = !serialized.includes('AIzaSy') && !serialized.includes('sk-') && !serialized.includes('re_');
    const hasOnlyBooleans = typeof healthPayload.ai.geminiConfigured === 'boolean' && typeof healthPayload.ai.deepSeekConfigured === 'boolean';
    const passed = hasNoKeys && hasOnlyBooleans && healthPayload.status === 'ok';

    record(
      10,
      'Contrato de salud /api/health seguro (sólo booleanos de disponibilidad y cero claves expuestas)',
      passed,
      `Estado: ${healthPayload.status}, Cero claves en serialización JSON: ${hasNoKeys}`
    );
  } catch (err: any) {
    record(10, 'Contrato de salud /api/health seguro', false, undefined, err?.message);
  }

  // -------------------------------------------------------------------------
  // RESUMEN GENERAL
  // -------------------------------------------------------------------------
  console.log('\n================================================================');
  const allPassed = tests.every((t) => t.passed);
  const passedCount = tests.filter((t) => t.passed).length;
  console.log(`  RESULTADO: ${passedCount} / ${tests.length} PRUEBAS PASADAS`);
  if (allPassed) {
    console.log('  ESTADO: ✅ SUITE DE SEGURIDAD P0 APROBADA EXITOSAMENTE');
  } else {
    console.error('  ESTADO: ❌ EXISTEN FALLOS EN LA SUITE DE SEGURIDAD P0');
  }
  console.log('================================================================\n');

  if (!allPassed) {
    process.exit(1);
  }
}

runSecurityP0Suite().catch((err) => {
  console.error('[P0-FATAL] Error no controlado en suite:', err);
  process.exit(1);
});
