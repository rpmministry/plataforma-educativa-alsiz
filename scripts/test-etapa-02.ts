/**
 * SUITE DE PRUEBAS DE ARQUITECTURA Y DESPLIEGUE — ETAPA 02
 * Plataforma Educativa ALSIZ para Ekballo Church
 *
 * Valida:
 * 1. Persistencia y resolución de DATABASE_PATH
 * 2. Conectividad y health check activo de base de datos
 * 3. Inspección no destructiva de migraciones
 * 4. Contrato de salud /api/health seguro y enriquecido
 * 5. Proxy reverso local api-entry.js con backend de ensayo
 * 6. Propagación de cookies HttpOnly / Secure y headers a través del proxy
 * 7. Contingencia 503 estructurada cuando BACKEND_URL no está configurada
 * 8. Unificación de gestor de paquetes (ausencia de bun.lock y presencia de engines)
 * 9. Manifiestos de despliegue (ecosystem.config.cjs, render.yaml, Dockerfile, vercel.json)
 * 10. Segregación de variables de entorno y ausencia de claves en frontend
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import express, { Request, Response } from 'express';
import { DatabaseSync } from 'node:sqlite';
import { getDatabasePath, isDatabaseConnected, initDatabase } from '../server/db/database';
import { checkMigrationsStatus, runMigrations } from '../server/db/migrator';

interface TestResult {
  num: number;
  name: string;
  passed: boolean;
  details?: string;
  error?: string;
}

const tests: TestResult[] = [];

function record(num: number, name: string, passed: boolean, details?: string, error?: string) {
  tests.push({ num, name, passed, details, error });
  const icon = passed ? '✅ PASÓ' : '❌ FALLÓ';
  console.log(`[E2-TEST-${String(num).padStart(2, '0')}] ${icon}: ${name}`);
  if (details) {
    console.log(`             ℹ️  ${details}`);
  }
  if (error) {
    console.error(`             ⚠️  Error: ${error}`);
  }
}

async function runTests() {
  console.log('================================================================');
  console.log('  SUITE DE PRUEBAS DE ARQUITECTURA Y PERSISTENCIA — ETAPA 02');
  console.log('  Plataforma Educativa ALSIZ — Ekballo Church');
  console.log('================================================================\n');

  // ---------------------------------------------------------------------------
  // TEST 1: Persistencia y Normalización de Rutas en DATABASE_PATH
  // ---------------------------------------------------------------------------
  try {
    const originalEnv = process.env.DATABASE_PATH;

    // Probar ruta relativa
    process.env.DATABASE_PATH = './custom-data/test.db';
    const relPath = getDatabasePath();
    const relOk = path.isAbsolute(relPath) && relPath.includes('custom-data');

    // Probar ruta absoluta
    const mockAbsolute = path.resolve(process.cwd(), 'data', 'mock-volume.db');
    process.env.DATABASE_PATH = mockAbsolute;
    const absPath = getDatabasePath();
    const absOk = absPath === mockAbsolute;

    // Restaurar env original
    if (originalEnv !== undefined) {
      process.env.DATABASE_PATH = originalEnv;
    } else {
      delete process.env.DATABASE_PATH;
    }

    const passed = relOk && absOk;
    record(
      1,
      'Persistencia y normalización multiplataforma de rutas en DATABASE_PATH',
      passed,
      `Relativa normalizada: ${relOk}, Absoluta preservada: ${absOk}`
    );
  } catch (err: any) {
    record(1, 'Persistencia y normalización de DATABASE_PATH', false, undefined, err?.message);
  }

  // ---------------------------------------------------------------------------
  // TEST 2: Conectividad Viva de Base de Datos (isDatabaseConnected)
  // ---------------------------------------------------------------------------
  try {
    const connected = isDatabaseConnected();
    record(
      2,
      'Detección y comprobación activa de conectividad de base de datos',
      connected,
      `isDatabaseConnected(): ${connected}`
    );
  } catch (err: any) {
    record(2, 'Conectividad viva de base de datos', false, undefined, err?.message);
  }

  // ---------------------------------------------------------------------------
  // TEST 3: Inspección No Destructiva de Migraciones (checkMigrationsStatus)
  // ---------------------------------------------------------------------------
  try {
    const status = checkMigrationsStatus();
    const isSyncedOrPending = status.status === 'SYNCED' || status.status === 'PENDING';
    const hasAppliedCount = typeof status.appliedCount === 'number' && status.appliedCount >= 0;
    const hasTotal = typeof status.totalMigrationsOnDisk === 'number' && status.totalMigrationsOnDisk >= 12;

    const passed = isSyncedOrPending && hasAppliedCount && hasTotal;
    record(
      3,
      'Inspección no destructiva de migraciones (validación de versiones y checksums)',
      passed,
      `Estado: ${status.status}, Aplicadas: ${status.appliedCount}, En disco: ${status.totalMigrationsOnDisk}, Última: v${status.latestVersion}`
    );
  } catch (err: any) {
    record(3, 'Inspección no destructiva de migraciones', false, undefined, err?.message);
  }

  // ---------------------------------------------------------------------------
  // TEST 4: Contrato de Salud /api/health Seguro y Enriquecido
  // ---------------------------------------------------------------------------
  try {
    // Importar app Express compilada o en memoria
    const appModule = await import('../server');
    const app = appModule.default || appModule.app;

    // Levantar temporalmente en puerto efímero para hacer petición HTTP real
    const server = http.createServer(app);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
    const address = server.address() as any;
    const testPort = address.port;

    const res = await fetch(`http://127.0.0.1:${testPort}/api/health`, { keepalive: false });
    const data = await res.json();
    server.closeAllConnections?.();
    await new Promise<void>((resolve) => server.close(() => resolve()));

    const hasStatus = data.status === 'ok' || data.status === 'degraded';
    const hasVersion = data.version === '1.0.0';
    const hasDbInfo = data.database && typeof data.database.connected === 'boolean' && data.database.migrations;
    const hasAiBooleans =
      data.ai &&
      typeof data.ai.geminiConfigured === 'boolean' &&
      typeof data.ai.deepSeekConfigured === 'boolean';
    
    // Validar que NUNCA filtre secretos ni datos de estudiantes
    const serialized = JSON.stringify(data);
    const noSecrets =
      !serialized.includes('AIzaSy') &&
      !serialized.includes('sk-') &&
      !serialized.includes('re_') &&
      !serialized.includes('password') &&
      !serialized.includes('students');

    const passed = res.status === 200 && hasStatus && hasVersion && hasDbInfo && hasAiBooleans && noSecrets;
    record(
      4,
      'Contrato de salud /api/health enriquecido (versión, conectividad, migraciones y cero secretos)',
      passed,
      `HTTP Status: ${res.status}, API Version: ${data.version}, DB Connected: ${data.database?.connected}, Sin secretos: ${noSecrets}`
    );
  } catch (err: any) {
    record(4, 'Contrato de salud /api/health', false, undefined, err?.message);
  }

  // ---------------------------------------------------------------------------
  // TEST 5 & 6: Servidor de Ensayo, Proxy Reverso api-entry.js y Cookies E2E
  // ---------------------------------------------------------------------------
  try {
    // 1. Crear servidor backend de ensayo con trust proxy activado
    const backendApp = express();
    backendApp.set('trust proxy', 1);
    backendApp.use(express.json());

    backendApp.get('/api/test-proxy-get', (req: Request, res: Response) => {
      res.json({
        ok: true,
        protocol: req.protocol,
        clientIp: req.ip,
        forwardedHost: req.get('x-forwarded-host'),
        authHeader: req.get('authorization'),
        cookieReceived: req.get('cookie'),
      });
    });

    backendApp.post('/api/test-proxy-auth', (req: Request, res: Response) => {
      // Simular login y seteo de cookie segura
      res.setHeader(
        'Set-Cookie',
        'alsiz_session=test_token_abc123; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=3600'
      );
      res.json({
        authenticated: true,
        userRole: req.body?.role || 'STUDENT',
      });
    });

    const backendServer = http.createServer(backendApp);
    await new Promise<void>((resolve) => backendServer.listen(0, '127.0.0.1', () => resolve()));
    const backendPort = (backendServer.address() as any).port;
    const backendBaseUrl = `http://127.0.0.1:${backendPort}`;

    // 2. Configurar proxy apuntando al backend de ensayo
    process.env.BACKEND_URL = backendBaseUrl;
    const proxyHandler = require('../api-entry.js');
    const proxyServer = http.createServer((req, res) => {
      proxyHandler(req, res);
    });
    await new Promise<void>((resolve) => proxyServer.listen(0, '127.0.0.1', () => resolve()));
    const proxyPort = (proxyServer.address() as any).port;
    const proxyBaseUrl = `http://127.0.0.1:${proxyPort}`;

    // Test 5: Petición GET a través del proxy con headers
    const getRes = await fetch(`${proxyBaseUrl}/api/test-proxy-get`, {
      headers: {
        'Authorization': 'Bearer test-token',
        'Cookie': 'user_pref=dark_mode',
        'X-Forwarded-Proto': 'https',
      },
    });
    const getData = await getRes.json();
    const getPassed =
      getRes.status === 200 &&
      getData.ok === true &&
      getData.authHeader === 'Bearer test-token' &&
      getData.cookieReceived === 'user_pref=dark_mode';

    record(
      5,
      'Proxy reverso local (api-entry.js) reenviando tráfico y cabeceras hacia backend de ensayo',
      getPassed,
      `Status: ${getRes.status}, Headers recibidos: OK, Cookie forwarded: OK`
    );

    // Test 6: Petición POST a través del proxy y preservación de Set-Cookie
    const postRes = await fetch(`${proxyBaseUrl}/api/test-proxy-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: 'TEACHER' }),
    });
    const postData = await postRes.json();
    const setCookieHeader = postRes.headers.get('set-cookie');
    const cookiePreserved =
      Boolean(setCookieHeader) &&
      setCookieHeader!.includes('alsiz_session=test_token_abc123') &&
      setCookieHeader!.includes('HttpOnly') &&
      setCookieHeader!.includes('SameSite=Lax');

    const postPassed = postRes.status === 200 && postData.authenticated === true && cookiePreserved;

    record(
      6,
      'Preservación bidireccional de cookies HttpOnly y SameSite a través del proxy',
      postPassed,
      `Set-Cookie recibido: ${setCookieHeader ? 'SI' : 'NO'}, Atributos válidos: ${cookiePreserved}`
    );

    // Cerrar servidores de ensayo
    backendServer.closeAllConnections?.();
    proxyServer.closeAllConnections?.();
    await Promise.all([
      new Promise<void>((resolve) => backendServer.close(() => resolve())),
      new Promise<void>((resolve) => proxyServer.close(() => resolve())),
    ]);
  } catch (err: any) {
    record(5, 'Proxy reverso local', false, undefined, err?.message);
    record(6, 'Preservación de cookies a través del proxy', false, undefined, err?.message);
  }

  // ---------------------------------------------------------------------------
  // TEST 7: Contingencia 503 cuando BACKEND_URL no está Configurada en Vercel
  // ---------------------------------------------------------------------------
  try {
    const originalBackendUrl = process.env.BACKEND_URL;
    delete process.env.BACKEND_URL;
    delete process.env.PERSISTENT_BACKEND_URL;

    // Crear petición mock
    const proxyHandler = require('../api-entry.js');
    let capturedStatus = 0;
    let capturedBody = '';

    const mockReq: any = {
      method: 'GET',
      url: '/api/health',
      headers: {},
    };

    const mockRes: any = {
      setHeader: () => {},
      end: (data: string) => {
        capturedBody = data;
      },
    };
    Object.defineProperty(mockRes, 'statusCode', {
      set: (val: number) => {
        capturedStatus = val;
      },
      get: () => capturedStatus,
    });

    await proxyHandler(mockReq, mockRes);

    const parsed = JSON.parse(capturedBody);
    const passed =
      capturedStatus === 503 &&
      parsed.error === 'persistent_backend_not_configured' &&
      parsed.action === 'PENDIENTE_DEL_ADMINISTRADOR';

    record(
      7,
      'Contingencia estructurada 503 en Vercel cuando falta BACKEND_URL (cero SQLite efímero)',
      passed,
      `HTTP Status: ${capturedStatus}, Error: ${parsed.error}, Acción: ${parsed.action}`
    );

    if (originalBackendUrl !== undefined) {
      process.env.BACKEND_URL = originalBackendUrl;
    }
  } catch (err: any) {
    record(7, 'Contingencia 503 sin backend', false, undefined, err?.message);
  }

  // ---------------------------------------------------------------------------
  // TEST 8: Unificación de Gestor de Paquetes (Sin bun.lock, npm estándar)
  // ---------------------------------------------------------------------------
  try {
    const bunLockExists = fs.existsSync(path.resolve(process.cwd(), 'bun.lock'));
    const packageLockExists = fs.existsSync(path.resolve(process.cwd(), 'package-lock.json'));
    const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8'));
    const hasEngines = Boolean(pkg.engines?.node && pkg.engines?.npm);

    const passed = !bunLockExists && packageLockExists && hasEngines;
    record(
      8,
      'Unificación de gestor de paquetes (bun.lock eliminado, package-lock.json activo, engines Node 22)',
      passed,
      `bun.lock ausente: ${!bunLockExists}, package-lock.json presente: ${packageLockExists}, engines definidos: ${hasEngines}`
    );
  } catch (err: any) {
    record(8, 'Unificación de gestor de paquetes', false, undefined, err?.message);
  }

  // ---------------------------------------------------------------------------
  // TEST 9: Manifiestos de Despliegue de Producción
  // ---------------------------------------------------------------------------
  try {
    const hasEcosystem = fs.existsSync(path.resolve(process.cwd(), 'ecosystem.config.cjs'));
    const hasRender = fs.existsSync(path.resolve(process.cwd(), 'render.yaml'));
    const hasDockerfile = fs.existsSync(path.resolve(process.cwd(), 'Dockerfile'));
    const hasDockerCompose = fs.existsSync(path.resolve(process.cwd(), 'docker-compose.yml'));
    const hasVercelJson = fs.existsSync(path.resolve(process.cwd(), 'vercel.json'));

    const ecosystemContent = hasEcosystem
      ? fs.readFileSync(path.resolve(process.cwd(), 'ecosystem.config.cjs'), 'utf8')
      : '';
    const isSingleProcess = ecosystemContent.includes('instances: 1') && ecosystemContent.includes("exec_mode: 'fork'");

    const renderContent = hasRender
      ? fs.readFileSync(path.resolve(process.cwd(), 'render.yaml'), 'utf8')
      : '';
    const hasRenderDisk = renderContent.includes('mountPath: /data') && renderContent.includes('npm run db:migrate');

    const passed =
      hasEcosystem &&
      hasRender &&
      hasDockerfile &&
      hasDockerCompose &&
      hasVercelJson &&
      isSingleProcess &&
      hasRenderDisk;

    record(
      9,
      'Validación de manifiestos de despliegue (PM2 single-process, Render disk, Docker, Vercel proxy)',
      passed,
      `PM2: ${hasEcosystem} (instances: 1), Render: ${hasRender} (/data mount), Docker: ${hasDockerfile}, Vercel: ${hasVercelJson}`
    );
  } catch (err: any) {
    record(9, 'Validación de manifiestos de despliegue', false, undefined, err?.message);
  }

  // ---------------------------------------------------------------------------
  // TEST 10: Segregación de Variables de Entorno y Cero Secretos en Frontend
  // ---------------------------------------------------------------------------
  try {
    const envExample = fs.readFileSync(path.resolve(process.cwd(), '.env.example'), 'utf8');
    const hasBackendUrl = envExample.includes('BACKEND_URL=');
    const hasDatabasePath = envExample.includes('DATABASE_PATH=');
    const hasSessionSecret = envExample.includes('SESSION_SECRET=');
    const separatesSections = envExample.includes('SECCIÓN A: ENTORNO VERCEL') && envExample.includes('SECCIÓN B: ENTORNO DEL BACKEND');

    // Verificar que NINGUNA variable VITE_* contenga secretos
    const lines = envExample.split('\n');
    let badViteVar = false;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('VITE_') && (trimmed.includes('SECRET') || trimmed.includes('KEY') || trimmed.includes('TOKEN') || trimmed.includes('PASSWORD'))) {
        badViteVar = true;
      }
    }

    const passed = hasBackendUrl && hasDatabasePath && hasSessionSecret && separatesSections && !badViteVar;
    record(
      10,
      'Segregación formal de variables de entorno (separación frontend/backend y cero secretos en VITE_*)',
      passed,
      `Secciones segregadas: ${separatesSections}, BACKEND_URL documentada: ${hasBackendUrl}, Cero secretos VITE: ${!badViteVar}`
    );
  } catch (err: any) {
    record(10, 'Segregación de variables de entorno', false, undefined, err?.message);
  }

  // ---------------------------------------------------------------------------
  // RESUMEN GENERAL DE RESULTADOS
  // ---------------------------------------------------------------------------
  console.log('\n================================================================');
  const allPassed = tests.every((t) => t.passed);
  const passedCount = tests.filter((t) => t.passed).length;
  console.log(`  RESULTADO: ${passedCount} / ${tests.length} PRUEBAS PASADAS`);
  if (allPassed) {
    console.log('  ESTADO: ✅ SUITE DE ARQUITECTURA Y PERSISTENCIA APROBADA');
  } else {
    console.log('  ESTADO: ❌ EXISTEN FALLOS EN LA SUITE');
  }
  console.log('================================================================\n');

  if (!allPassed) {
    process.exit(1);
  } else {
    setTimeout(() => process.exit(0), 100);
  }
}

runTests().catch((err) => {
  console.error('[TestSuite] Error fatal:', err);
  process.exit(1);
});
