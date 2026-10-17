/**
 * ==============================================================================
 * Prueba de Integración End-to-End: Turso Cloud + Autenticación + Email Resend
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 */

import dotenv from 'dotenv';
dotenv.config();
dotenv.config({ path: '.env.local' });

import { getDatabaseAdapter } from '../server/db/dal';
import { hashPassword, hashPin, generateUuid } from '../server/auth/crypto';
import { sendStudentPinEmail } from '../server/email/emailService';
import app from '../server';
import http from 'node:http';

interface TestResult {
  name: string;
  status: 'PASÓ' | 'FALLÓ';
  details: string;
}

const results: TestResult[] = [];

function record(name: string, passed: boolean, details: string) {
  results.push({ name, status: passed ? 'PASÓ' : 'FALLÓ', details });
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} ${name}: ${details}`);
}

async function makeRequest(
  port: number,
  method: string,
  path: string,
  headers: Record<string, string> = {},
  body?: any
): Promise<{ status: number; body: any; headers: http.IncomingHttpHeaders }> {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : undefined;
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {}),
          ...headers,
        },
      },
      (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => {
          let parsed: any;
          try {
            parsed = JSON.parse(raw);
          } catch {
            parsed = raw;
          }
          resolve({ status: res.statusCode || 500, body: parsed, headers: res.headers });
        });
      }
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('================================================================');
  console.log('  TEST END-TO-END: TURSO CLOUD + AUTENTICACIÓN + RESEND EMAIL  ');
  console.log('================================================================');

  const db = getDatabaseAdapter();

  // Iniciar servidor temporal en puerto dinámico
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
  const port = (server.address() as any).port;

  const testUserId = `usr-test-${Date.now()}`;
  const testStudentId = `stu-test-${Date.now()}`;
  const testEmail = `test.estudiante.${Date.now()}@alsiz.local`;
  const testCode = `STU-TEST-${Math.floor(1000 + Math.random() * 9000)}`;
  const testPassword = 'TestPassword2026!';
  const testPin = '8492';

  try {
    // 1. Verificación de conexión a Turso Cloud
    const ping = await db.queryOne<{ ping: number }>('SELECT 1 as ping');
    record('Conexión con Base de Datos Remota (Turso)', ping?.ping === 1, 'SELECT 1 ejecutado con éxito en Turso libSQL.');

    // 2. Registro de Usuario Sintético y Estudiante en Turso
    const passHash = hashPassword(testPassword);
    const pinHash = hashPin(testPin);

    await db.execute(`
      INSERT INTO users (id, email, username, password_hash, role, status, first_name, last_name, avatar_asset_key)
      VALUES (?, ?, ?, ?, 'STUDENT', 'ACTIVE', 'Estudiante', 'Sintético E2E', 'student_avatar_test');
    `, [testUserId, testEmail, `test_stu_${Date.now()}`, passHash]);

    await db.execute(`
      INSERT INTO students (id, user_id, student_code, pin_code_hash, birth_date)
      VALUES (?, ?, ?, ?, '2014-05-15');
    `, [testStudentId, testUserId, testCode, pinHash]);

    record('Persistencia de Estudiante Sintético en Turso', true, `Usuario ${testUserId} y Estudiante ${testCode} insertados con hashes scrypt.`);

    // 3. Inicio de sesión real por contraseña (/api/v1/auth/login)
    const loginRes = await makeRequest(port, 'POST', '/api/v1/auth/login', {}, {
      identifier: testEmail,
      password: testPassword,
    });

    const loginOk = loginRes.status === 200 && loginRes.body?.success === true;
    const token = loginRes.body?.data?.token;
    const cookieHeader = loginRes.headers['set-cookie']?.toString() || '';
    record('Login Real con Contraseña (HTTP 200 + Token + Set-Cookie)', loginOk && !!token && cookieHeader.includes('alsiz_session='), `Token emitido. Cookie HttpOnly presente: ${cookieHeader.includes('HttpOnly')}`);

    // 4. Verificación de identidad con /api/v1/auth/me
    const meRes = await makeRequest(port, 'GET', '/api/v1/auth/me', {
      Authorization: `Bearer ${token}`,
    });
    const meOk = meRes.status === 200 && meRes.body?.data?.userId === testUserId;
    record('Consulta de Sesión Activa /api/v1/auth/me', meOk, `Identidad validada: userId=${meRes.body?.data?.userId}, role=${meRes.body?.data?.role}`);

    // 5. Inicio de sesión táctil con PIN (/api/v1/auth/pin-login)
    const pinLoginRes = await makeRequest(port, 'POST', '/api/v1/auth/pin-login', {}, {
      studentCode: testCode,
      pinCode: testPin,
    });
    const pinOk = pinLoginRes.status === 200 && pinLoginRes.body?.success === true;
    const pinToken = pinLoginRes.body?.data?.token;
    record('Login Táctil con PIN numérico de 4 dígitos (/api/v1/auth/pin-login)', pinOk && !!pinToken, `Autenticación por PIN exitosa para ${testCode}`);

    // 6. Prueba Anti-IDOR: Intento de consultar expediente ajeno
    const idorRes = await makeRequest(port, 'GET', '/api/v1/students/stu-01', {
      Authorization: `Bearer ${pinToken}`,
    });
    const idorBlocked = idorRes.status === 403;
    record('Protección Anti-IDOR (Aislamiento Estudiantil en Turso)', idorBlocked, `Acceso a expediente no propio rechazado con HTTP 403 (${idorRes.body?.error?.code || 'FORBIDDEN'})`);

    // 7. Servicio de Notificación de PIN por Email (Resend)
    const emailResult = await sendStudentPinEmail({
      toEmail: 'delivered@resend.dev', // Dominio de prueba seguro de Resend
      studentName: 'Estudiante Sintético E2E',
      pinCode: testPin,
    });
    record('Servicio Transaccional de Email (Resend/Simulated)', emailResult.success, `Proveedor: ${emailResult.provider}, MensajeId: ${emailResult.messageId || 'N/A'}`);

    // 8. Cierre de sesión real (/api/v1/auth/logout)
    const logoutRes = await makeRequest(port, 'POST', '/api/v1/auth/logout', {
      Authorization: `Bearer ${pinToken}`,
    });
    const logoutOk = logoutRes.status === 200 && logoutRes.body?.success === true;
    record('Cierre de Sesión Real e Invalidación en BD (/api/v1/auth/logout)', logoutOk, 'Token revocado en Turso y cookie limpiada.');

    // 9. Comprobar que el token revocado ya no tiene acceso
    const postLogoutMe = await makeRequest(port, 'GET', '/api/v1/auth/me', {
      Authorization: `Bearer ${pinToken}`,
    });
    record('Bloqueo de Token Revocado tras Logout', postLogoutMe.status === 401, `Estado tras logout: HTTP ${postLogoutMe.status} UNAUTHORIZED`);

  } finally {
    // Limpieza de datos sintéticos de prueba en Turso
    try {
      await db.execute('DELETE FROM sessions WHERE user_id = ?', [testUserId]);
      await db.execute('DELETE FROM audit_events WHERE user_id = ?', [testUserId]);
      await db.execute('DELETE FROM students WHERE id = ?', [testStudentId]);
      await db.execute('DELETE FROM users WHERE id = ?', [testUserId]);
      console.log('🧹 Limpieza de registros sintéticos de prueba en Turso completada.');
    } catch (cleanupErr: any) {
      console.warn('Advertencia en limpieza Turso:', cleanupErr?.message || cleanupErr);
    }

    server.close();
  }

  console.log('================================================================');
  console.log('  RESUMEN DE PRUEBAS E2E (TURSO + AUTH + EMAIL)                 ');
  console.log('================================================================');
  const total = results.length;
  const passed = results.filter((r) => r.status === 'PASÓ').length;
  const failed = results.filter((r) => r.status === 'FALLÓ').length;
  console.log(`Total: ${total} | Aprobadas: ${passed} | Fallidas: ${failed}`);

  process.exit(failed > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error('Error fatal ejecutando test E2E:', err);
  process.exit(1);
});
