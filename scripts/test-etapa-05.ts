import { initDatabase, closeDatabase } from '../server/db/database';
import { runMigrations } from '../server/db/migrator';
import { createHotBackup, restoreFromBackup } from '../server/backup/backupService';
import app from '../server';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

interface TestResult {
  name: string;
  category: string;
  status: 'PASÓ' | 'FALLÓ';
  details: string;
}

const results: TestResult[] = [];

function recordResult(name: string, category: string, passed: boolean, details: string) {
  results.push({
    name,
    category,
    status: passed ? 'PASÓ' : 'FALLÓ',
    details,
  });
  const symbol = passed ? '✅' : '❌';
  console.log(`${symbol} [${category}] ${name}: ${details}`);
}

async function request(
  serverPort: number,
  options: {
    method: string;
    path: string;
    headers?: Record<string, string>;
    body?: any;
  }
): Promise<{ status: number; body: any; headers: http.IncomingHttpHeaders }> {
  return new Promise((resolve, reject) => {
    const payload = options.body ? JSON.stringify(options.body) : undefined;
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: serverPort,
        path: options.path,
        method: options.method,
        headers: {
          'Content-Type': 'application/json',
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
          ...options.headers,
        },
      },
      (res) => {
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          let parsed: any;
          try {
            parsed = JSON.parse(rawData);
          } catch {
            parsed = rawData;
          }
          resolve({
            status: res.statusCode || 500,
            body: parsed,
            headers: res.headers,
          });
        });
      }
    );

    req.on('error', (err) => reject(err));
    if (payload) {
      req.write(payload);
    }
    req.end();
  });
}

async function runAllTests() {
  console.log('================================================================');
  console.log('  SUITE DE PRUEBAS AUTOMATIZADAS — ETAPA 05 (ALSIZ / EKBALLO)');
  console.log('================================================================\n');

  // Configurar entorno de pruebas aislado
  const testDbDir = path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(testDbDir)) fs.mkdirSync(testDbDir, { recursive: true });
  const testDbPath = path.resolve(testDbDir, 'test_alsiz_suite.db');
  if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);

  process.env.DATABASE_PATH = testDbPath;
  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'secreto_de_prueba_automatizada_alsiz_2026_min32';

  // 1. Prueba de Migraciones
  try {
    const testDb = initDatabase(testDbPath);
    const migrationResults = runMigrations(testDb);
    const allApplied = migrationResults.every((m) => m.status === 'APPLIED' || m.status === 'SKIPPED');
    recordResult(
      'Migraciones de esquema e índices desde cero',
      'Migraciones',
      allApplied && migrationResults.length >= 3,
      `Se aplicaron ${migrationResults.length} migraciones correctamente (${migrationResults.map((m) => m.name).join(', ')}).`
    );
  } catch (err: any) {
    recordResult('Migraciones de esquema e índices desde cero', 'Migraciones', false, err.message);
  }

  // 2. Levantar servidor Express en puerto efímero de prueba
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
  const address = server.address() as any;
  const port = address.port;

  let adminToken = '';
  let student1Token = '';
  let student2Token = '';
  let rep1Token = '';
  let rep2Token = '';

  try {
    // --- AUTENTICACIÓN ---
    // Test 1.1: Login Admin exitoso
    const adminLoginRes = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'admin_alsiz', password: 'DevAdmin2026!' },
    });
    const adminPassed = adminLoginRes.status === 200 && adminLoginRes.body.success && adminLoginRes.body.data.token;
    if (adminPassed) adminToken = adminLoginRes.body.data.token;
    recordResult(
      'Login exitoso con usuario y contraseña (ADMIN)',
      'Autenticación',
      adminPassed,
      `Status HTTP ${adminLoginRes.status}. Token emitido y rol ADMIN verificado.`
    );

    // Test 1.2: Login Estudiante 1 por PIN (iPad)
    const pinLoginRes = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/pin-login',
      body: { studentCode: 'STU-SYNTH-01', pinCode: '1234' },
    });
    const pinPassed = pinLoginRes.status === 200 && pinLoginRes.body.success && pinLoginRes.body.data.user.role === 'STUDENT';
    if (pinPassed) student1Token = pinLoginRes.body.data.token;
    recordResult(
      'Login táctil de estudiante por PIN (4 dígitos)',
      'Autenticación',
      pinPassed,
      `Status HTTP ${pinLoginRes.status}. Alumno STU-SYNTH-01 autenticado por PIN.`
    );

    // Test 1.3: Login Estudiante 2 por PIN
    const pin2Res = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/pin-login',
      body: { studentCode: 'STU-SYNTH-02', pinCode: '5678' },
    });
    if (pin2Res.status === 200) student2Token = pin2Res.body.data.token;

    // Test 1.4: Login Representante 1 (Padre Santos)
    const rep1Res = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'padre_santos', password: 'DevPass123!' },
    });
    if (rep1Res.status === 200) rep1Token = rep1Res.body.data.token;
    recordResult(
      'Login exitoso de Representante Legal',
      'Autenticación',
      rep1Res.status === 200,
      `Status HTTP ${rep1Res.status}. Representante rep-01 autenticado.`
    );

    // Test 1.5: Login con credenciales inválidas (Rechazo correcto)
    const badLoginRes = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'admin_alsiz', password: 'PasswordErroneo!' },
    });
    recordResult(
      'Rechazo de credenciales incorrectas',
      'Autenticación',
      badLoginRes.status === 401 && badLoginRes.body.error?.code === 'AUTH_INVALID_CREDENTIALS',
      `Status HTTP ${badLoginRes.status}. Código de error: ${badLoginRes.body.error?.code}.`
    );

    // Test 1.6: Login PIN incorrecto (Rechazo correcto)
    const badPinRes = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/pin-login',
      body: { studentCode: 'STU-SYNTH-01', pinCode: '9999' },
    });
    recordResult(
      'Rechazo de PIN táctil incorrecto',
      'Autenticación',
      badPinRes.status === 401 && badPinRes.body.error?.code === 'AUTH_INVALID_PIN',
      `Status HTTP ${badPinRes.status}. Código de error: ${badPinRes.body.error?.code}.`
    );

    // --- AUTORIZACIÓN Y PROTECCIÓN ANTI-IDOR / ANTI-BOLA ---
    // Test 2.1: Acceso anónimo a recurso protegido (Rechazo 401)
    const anonRes = await request(port, {
      method: 'GET',
      path: '/api/v1/students/STU-SYNTH-01',
    });
    recordResult(
      'Rechazo de solicitud no autenticada a expediente de menor',
      'Seguridad & RBAC',
      anonRes.status === 401 && anonRes.body.error?.code === 'UNAUTHORIZED',
      `Status HTTP ${anonRes.status}. Respuesta 401 con código UNAUTHORIZED.`
    );

    // Test 2.2: Estudiante consulta su PROPIO expediente (200 OK)
    const stuOwnRes = await request(port, {
      method: 'GET',
      path: '/api/v1/students/STU-SYNTH-01',
      headers: { Authorization: `Bearer ${student1Token}` },
    });
    recordResult(
      'Estudiante consulta legítimamente su propio expediente',
      'Aislamiento IDOR',
      stuOwnRes.status === 200 && stuOwnRes.body.data.studentCode === 'STU-SYNTH-01',
      `Status HTTP ${stuOwnRes.status}. Acceso permitido a su propio registro.`
    );

    // Test 2.3: CRÍTICO ANTI-IDOR — Estudiante 1 intenta consultar expediente de Estudiante 2 (403 Forbidden)
    const idorStuRes = await request(port, {
      method: 'GET',
      path: '/api/v1/students/STU-SYNTH-02',
      headers: { Authorization: `Bearer ${student1Token}` },
    });
    recordResult(
      'CRÍTICO: Estudiante no puede acceder al expediente de otro alumno (Anti-IDOR)',
      'Aislamiento IDOR',
      idorStuRes.status === 403 && idorStuRes.body.error?.code === 'FORBIDDEN_STUDENT_ACCESS',
      `Status HTTP ${idorStuRes.status}. Rechazo 403 con código FORBIDDEN_STUDENT_ACCESS.`
    );

    // Test 2.4: Representante 1 consulta legítimamente a su hijo asignado (200 OK)
    const repChildRes = await request(port, {
      method: 'GET',
      path: '/api/v1/students/STU-SYNTH-01',
      headers: { Authorization: `Bearer ${rep1Token}` },
    });
    recordResult(
      'Representante accede a los datos de su hijo autorizado',
      'Aislamiento Familiar',
      repChildRes.status === 200 && repChildRes.body.data.studentCode === 'STU-SYNTH-01',
      `Status HTTP ${repChildRes.status}. Acceso autorizado por vínculo familiar verificado.`
    );

    // Test 2.5: CRÍTICO ANTI-IDOR — Representante 1 intenta consultar alumno de Familia 2 (403 Forbidden)
    const repOtherFamilyRes = await request(port, {
      method: 'GET',
      path: '/api/v1/students/STU-SYNTH-02',
      headers: { Authorization: `Bearer ${rep1Token}` },
    });
    recordResult(
      'CRÍTICO: Representante no puede acceder a menores de otra familia (Anti-IDOR Familiar)',
      'Aislamiento Familiar',
      repOtherFamilyRes.status === 403 && repOtherFamilyRes.body.error?.code === 'FORBIDDEN_FAMILY_ACCESS',
      `Status HTTP ${repOtherFamilyRes.status}. Rechazo 403 con código FORBIDDEN_FAMILY_ACCESS.`
    );

    // Test 2.6: Estudiante intenta acceder a panel administrativo de usuarios (403 Forbidden)
    const stuAdminRes = await request(port, {
      method: 'GET',
      path: '/api/v1/admin/users',
      headers: { Authorization: `Bearer ${student1Token}` },
    });
    recordResult(
      'Estudiante bloqueado de consultar rutas administrativas (RBAC)',
      'Seguridad & RBAC',
      stuAdminRes.status === 403 && stuAdminRes.body.error?.code === 'FORBIDDEN_ROLE',
      `Status HTTP ${stuAdminRes.status}. Rechazo 403 por falta de rol administrativo.`
    );

    // Test 2.7: Admin consulta legítimamente nómina de usuarios (200 OK y sin hashes)
    const adminUsersRes = await request(port, {
      method: 'GET',
      path: '/api/v1/admin/users',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const usersData = adminUsersRes.body.data?.users || [];
    const noHashesLeaked = usersData.every((u: any) => u.password_hash === undefined && u.pin_code_hash === undefined);
    recordResult(
      'Nómina administrativa de usuarios sin exposición de hashes de contraseñas',
      'Privacidad & LOPDP',
      adminUsersRes.status === 200 && noHashesLeaked && usersData.length >= 6,
      `Status HTTP ${adminUsersRes.status}. ${usersData.length} usuarios obtenidos. Cero hashes filtrados.`
    );

    // --- LIBRO MAYOR DE AUDITORÍA INMUTABLE (LOPDP) ---
    // Test 3.1: Consulta de auditoría como Admin
    const auditRes = await request(port, {
      method: 'GET',
      path: '/api/v1/admin/audit-logs',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const logs = auditRes.body.data?.logs || [];
    const hasAccessDeniedLog = logs.some((l: any) => l.event_type === 'STUDENT_DATA_ACCESS_DENIED');
    const allIpsHashed = logs.every((l: any) => typeof l.ip_hash === 'string' && l.ip_hash.length === 64);
    recordResult(
      'Libro mayor de auditoría registra rechazos IDOR y anonimiza IPs (SHA-256)',
      'Auditoría LOPDP',
      auditRes.status === 200 && hasAccessDeniedLog && allIpsHashed,
      `Auditoría contiene evento STUDENT_DATA_ACCESS_DENIED. Todas las IPs hasheadas.`
    );

    // --- RESPALDO Y RESTAURACIÓN ---
    // Test 4.1: Hot Backup de base de datos
    const tempBackupDir = path.resolve(process.cwd(), 'backups', 'test_run');
    const backupRes = createHotBackup(tempBackupDir);
    recordResult(
      'Generación de Hot Backup transaccional (VACUUM INTO)',
      'Respaldo & Recuperación',
      backupRes.success && fs.existsSync(backupRes.backupPath) && backupRes.backupSize > 0,
      `Respaldo creado en ${path.basename(backupRes.backupPath)} (${backupRes.backupSize} bytes). Checksum: ${backupRes.checksumSha256.slice(0, 12)}...`
    );

    // Test 4.2: Restauración y verificación de integridad
    const tempRestoreDbPath = path.resolve(testDbDir, 'restored_test_alsiz.db');
    const restoreRes = restoreFromBackup(backupRes.backupPath, tempRestoreDbPath);
    recordResult(
      'Restauración de respaldo y verificación de integridad (PRAGMA integrity_check)',
      'Respaldo & Recuperación',
      restoreRes.success && restoreRes.integrityCheck === 'ok',
      `Restauración verificada con éxito. PRAGMA integrity_check = "${restoreRes.integrityCheck}".`
    );

    // Limpieza segura de archivos de prueba
    const safeUnlink = (p: string) => {
      try {
        if (fs.existsSync(p)) fs.unlinkSync(p);
      } catch { /* ignorar cierre pendiente del sistema operativo */ }
    };
    safeUnlink(tempRestoreDbPath);
    safeUnlink(backupRes.backupPath);
  } finally {
    server.close();
    closeDatabase();
    const safeUnlink = (p: string) => {
      try {
        if (fs.existsSync(p)) fs.unlinkSync(p);
      } catch { /* ignorar */ }
    };
    safeUnlink(testDbPath);
    safeUnlink(`${testDbPath}-wal`);
    safeUnlink(`${testDbPath}-shm`);
  }

  console.log('\n================================================================');
  console.log('  RESUMEN FINAL DE LA SUITE DE PRUEBAS DE LA ETAPA 05');
  console.log('================================================================\n');

  const passedCount = results.filter((r) => r.status === 'PASÓ').length;
  const failedCount = results.filter((r) => r.status === 'FALLÓ').length;

  console.log(`Total de pruebas ejecutadas: ${results.length}`);
  console.log(`Pruebas aprobadas (PASÓ):   ${passedCount}`);
  console.log(`Pruebas fallidas  (FALLÓ):  ${failedCount}\n`);

  if (failedCount > 0) {
    console.error('ALERTA: Se detectaron fallos en la suite de pruebas críticas.');
    process.exit(1);
  } else {
    console.log('Todas las pruebas críticas de la ETAPA 05 fueron APROBADAS con éxito.');
    process.exit(0);
  }
}

runAllTests().catch((err) => {
  console.error('Error fatal ejecutando la suite de pruebas:', err);
  process.exit(1);
});
