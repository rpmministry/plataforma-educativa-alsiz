/**
 * ==============================================================================
 * Suite de Pruebas de Integración — ETAPA 03
 * Conexión de Interfaz, Autenticación y Creación de Cuentas en Base de Datos
 * Plataforma Educativa ALSIZ — Ekballo Church
 * ==============================================================================
 *
 * Valida de forma reproducible los 10 requerimientos del PROMPT 03:
 * 1. Autoridad de backend: GET /api/v1/auth/me responde 401 sin sesión válida
 * 2. Autenticación por credenciales de administrador y emisión de cookie HttpOnly alsiz_session
 * 3. Autenticación de estudiante por código/PIN secreto institucional y resolución de perfil
 * 4. Aislamiento Anti-IDOR: estudiante no puede acceder a expedientes ni datos de otro estudiante
 * 5. Aislamiento Anti-BOLA: representante solo accede a sus menores vinculados y es rechazado ante ajenos
 * 6. Creación atómica de estudiante en base de datos (users, students, tutores, matrículas, materias, LOPDP)
 * 7. Inicio de sesión del nuevo estudiante y persistencia tras recarga simulada sin tokens en localStorage
 * 8. Suspensión administrativa de cuenta e invalidación inmediata de sesiones activas en tiempo real
 * 9. Reactivación, reseteo de credenciales con scrypt y cierre seguro de sesión (logout)
 * 10. Auditoría inmutable de eventos sensibles con sanitización total de secretos (cero contraseñas en logs)
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { app } from '../server';
import { initDatabase, getDb } from '../server/db/database';
import { runMigrations } from '../server/db/migrator';
import { getDatabaseAdapter, resetDatabaseAdapter } from '../server/db/dal';

interface TestResult {
  num: number;
  name: string;
  passed: boolean;
  details?: string;
  error?: string;
}

const testResults: TestResult[] = [];

function record(num: number, name: string, passed: boolean, details?: string, error?: string) {
  testResults.push({ num, name, passed, details, error });
  const icon = passed ? '✅ PASÓ' : '❌ FALLÓ';
  console.log(`[E3-TEST-${String(num).padStart(2, '0')}] ${icon}: ${name}`);
  if (details) {
    console.log(`             ℹ️  ${details}`);
  }
  if (error) {
    console.error(`             ⚠️  Error: ${error}`);
  }
}

function parseCookie(setCookieHeaders: string[] | string | undefined | null): string {
  if (!setCookieHeaders) return '';
  const headers = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
  for (const h of headers) {
    const match = h.match(/alsiz_session=([^;]+)/);
    if (match) return `alsiz_session=${match[1]}`;
  }
  return '';
}

async function runEtapa03Suite() {
  console.log('================================================================');
  console.log('  SUITE DE PRUEBAS DE INTEGRACIÓN — ETAPA 03');
  console.log('  Autenticación, Sesiones Seguras y Creación en Base de Datos');
  console.log('  Plataforma Educativa ALSIZ — Ekballo Church');
  console.log('================================================================\n');

  const testDbDir = path.resolve(process.cwd(), 'data');
  const testDbPath = path.resolve(testDbDir, 'alsiz_test_etapa03.db');

  // Asegurar entorno de pruebas local aislado
  process.env.NODE_ENV = 'test';
  process.env.USE_LOCAL_SQLITE = 'true';
  process.env.DATABASE_PATH = testDbPath;
  process.env.SESSION_SECRET = 'alsiz_test_session_secret_2026_super_secure_key_1234567890';

  if (!fs.existsSync(testDbDir)) {
    fs.mkdirSync(testDbDir, { recursive: true });
  }

  // Eliminar BD de prueba previa si existiera
  if (fs.existsSync(testDbPath)) {
    try { fs.unlinkSync(testDbPath); } catch {}
  }

  // Inicializar base de datos y ejecutar migraciones (001, 002, 003 de desarrollo)
  const testDb = initDatabase(testDbPath);
  resetDatabaseAdapter();
  runMigrations(testDb);

  // Levantar servidor HTTP de prueba en puerto efímero
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address() as any;
  const baseUrl = `http://127.0.0.1:${address.port}`;

  let adminCookie = '';
  let student1Cookie = '';
  let rep1Cookie = '';
  let newStudentId = '';
  let newStudentUserId = '';
  let newStudentUsername = '';
  let newStudentCookie = '';

  try {
    // ---------------------------------------------------------------------------
    // TEST 1: Autoridad de Backend en /api/v1/auth/me
    // ---------------------------------------------------------------------------
    try {
      const res = await fetch(`${baseUrl}/api/v1/auth/me`);
      const body = await res.json();
      const passed = res.status === 401 && body.success === false;
      record(1, 'Autoridad de backend: /api/v1/auth/me rechaza acceso sin sesión válida (401)', passed, `Status: ${res.status}, ErrorCode: ${body.error?.code}`);
    } catch (err: any) {
      record(1, 'Autoridad de backend: /api/v1/auth/me rechaza acceso sin sesión válida (401)', false, undefined, err.message);
    }

    // ---------------------------------------------------------------------------
    // TEST 2: Login con Credenciales de Admin y Emisión de Cookie HttpOnly
    // ---------------------------------------------------------------------------
    try {
      const loginRes = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: 'admin@alsiz.local',
          password: 'DevAdmin2026!',
        }),
      });

      const setCookie = loginRes.headers.get('set-cookie');
      adminCookie = parseCookie(setCookie);
      const loginBody = await loginRes.json();

      const hasHttpOnly = (setCookie || '').toLowerCase().includes('httponly');
      const hasPath = (setCookie || '').toLowerCase().includes('path=/');

      const meRes = await fetch(`${baseUrl}/api/v1/auth/me`, {
        headers: { Cookie: adminCookie },
      });
      const meBody = await meRes.json();

      const passed = loginRes.status === 200 &&
                     loginBody.success === true &&
                     adminCookie.length > 0 &&
                     hasHttpOnly &&
                     hasPath &&
                     meRes.status === 200 &&
                     meBody.data?.user?.role === 'ADMIN';

      record(
        2,
        'Autenticación de Administrador con cookie segura HttpOnly y verificación en /me',
        passed,
        `Usuario: ${meBody.data?.user?.username}, Rol: ${meBody.data?.user?.role}, HttpOnly: ${hasHttpOnly}`
      );
    } catch (err: any) {
      record(2, 'Autenticación de Administrador con cookie segura HttpOnly y verificación en /me', false, undefined, err.message);
    }

    // ---------------------------------------------------------------------------
    // TEST 3: Login de Estudiante Sintético 1 por PIN Institucional
    // ---------------------------------------------------------------------------
    try {
      const pinRes = await fetch(`${baseUrl}/api/v1/auth/login-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: 'STU-SYNTH-01',
          pin: '1234',
        }),
      });

      const setCookie = pinRes.headers.get('set-cookie');
      student1Cookie = parseCookie(setCookie);
      const pinBody = await pinRes.json();

      const meRes = await fetch(`${baseUrl}/api/v1/auth/me`, {
        headers: { Cookie: student1Cookie },
      });
      const meBody = await meRes.json();

      const passed = pinRes.status === 200 &&
                     pinBody.success === true &&
                     student1Cookie.length > 0 &&
                     meRes.status === 200 &&
                     meBody.data?.user?.role === 'STUDENT' &&
                     meBody.data?.user?.studentId === 'stu-01';

      record(
        3,
        'Autenticación de estudiante mediante código y PIN institucional en /login-pin',
        passed,
        `Estudiante: ${meBody.data?.user?.firstName} ${meBody.data?.user?.lastName}, StudentId: ${meBody.data?.user?.studentId}`
      );
    } catch (err: any) {
      record(3, 'Autenticación de estudiante mediante código y PIN institucional en /login-pin', false, undefined, err.message);
    }

    // ---------------------------------------------------------------------------
    // TEST 4: Aislamiento Estudiantil Anti-IDOR (stu-01 vs stu-02)
    // ---------------------------------------------------------------------------
    try {
      // Acceso a su propio expediente (stu-01) -> Permitido
      const ownRes = await fetch(`${baseUrl}/api/v1/students/stu-01`, {
        headers: { Cookie: student1Cookie },
      });

      // Intento de acceso cruzado a expediente de stu-02 -> 403 Forbidden
      const crossRes = await fetch(`${baseUrl}/api/v1/students/stu-02`, {
        headers: { Cookie: student1Cookie },
      });
      const crossBody = await crossRes.json();

      // Intento de acceso cruzado a asignaturas de stu-02 -> 403 Forbidden
      const crossSubjRes = await fetch(`${baseUrl}/api/v1/students/stu-02/subjects`, {
        headers: { Cookie: student1Cookie },
      });

      const passed = ownRes.status === 200 &&
                     crossRes.status === 403 &&
                     (crossBody.error?.code === 'STUDENT_FORBIDDEN' || crossBody.error?.code === 'FORBIDDEN_STUDENT_ACCESS') &&
                     crossSubjRes.status === 403;

      record(
        4,
        'Aislamiento Estudiantil Anti-IDOR: rechazo estricto (403) a expedientes de terceros',
        passed,
        `Propio: ${ownRes.status}, Cruzado: ${crossRes.status} (${crossBody.error?.code})`
      );
    } catch (err: any) {
      record(4, 'Aislamiento Estudiantil Anti-IDOR: rechazo estricto (403) a expedientes de terceros', false, undefined, err.message);
    }

    // ---------------------------------------------------------------------------
    // TEST 5: Aislamiento Familiar Anti-BOLA (rep-01 accede a stu-01, rechaza stu-02)
    // ---------------------------------------------------------------------------
    try {
      // Iniciar sesión como Representante Familia 1
      const repLoginRes = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: 'familia.santos@alsiz.local',
          password: 'DevPass123!',
        }),
      });
      rep1Cookie = parseCookie(repLoginRes.headers.get('set-cookie'));

      // Acceso a resumen de su propio hijo (stu-01) -> 200 OK
      const childRes = await fetch(`${baseUrl}/api/v1/representatives/students/stu-01/academic-summary`, {
        headers: { Cookie: rep1Cookie },
      });

      // Intento de acceso cruzado a hijo de otra familia (stu-02) -> 403 Forbidden
      const foreignChildRes = await fetch(`${baseUrl}/api/v1/representatives/students/stu-02/academic-summary`, {
        headers: { Cookie: rep1Cookie },
      });
      const foreignBody = await foreignChildRes.json();

      const passed = repLoginRes.status === 200 &&
                     childRes.status === 200 &&
                     foreignChildRes.status === 403 &&
                     foreignBody.error?.code === 'FORBIDDEN_STUDENT_ACCESS';

      record(
        5,
        'Aislamiento Familiar Anti-BOLA: representante solo accede a sus menores vinculados (403)',
        passed,
        `Menor propio: ${childRes.status}, Menor ajeno: ${foreignChildRes.status} (${foreignBody.error?.code})`
      );
    } catch (err: any) {
      record(5, 'Aislamiento Familiar Anti-BOLA: representante solo accede a sus menores vinculados (403)', false, undefined, err.message);
    }

    // ---------------------------------------------------------------------------
    // TEST 6: Creación Atómica de Cuenta Estudiantil en BD por Administrador
    // ---------------------------------------------------------------------------
    let generatedPin = '';
    let generatedPassword = '';
    try {
      const createRes = await fetch(`${baseUrl}/api/v1/admin/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: adminCookie,
        },
        body: JSON.stringify({
          firstName: 'SinteticoTres',
          lastName: 'PruebaEtapaTres',
          birthDate: '2013-08-20',
          programId: 'prog-homeschool',
          levelId: 'lvl-sup-8',
          representativeId: 'rep-01',
          relationshipType: 'FATHER',
          initialPin: '4321',
          initialPassword: 'DevSynthPass123!',
          consentVerified: true,
        }),
      });

      const createBody = await createRes.json();
      newStudentId = createBody.data?.student?.id || '';
      newStudentUserId = createBody.data?.student?.userId || '';
      newStudentUsername = createBody.data?.student?.username || '';
      generatedPin = createBody.data?.temporaryCredentials?.initialPin || '';
      generatedPassword = createBody.data?.temporaryCredentials?.initialPassword || '';

      // Verificación directa en base de datos relacional
      const userRow = newStudentUserId ? (testDb.prepare('SELECT id, role, status FROM users WHERE id = ?').get(newStudentUserId) as any) : null;
      const studentRow = newStudentId ? (testDb.prepare('SELECT id, student_code, pin_code_hash FROM students WHERE id = ?').get(newStudentId) as any) : null;
      const repLinkRow = newStudentId ? (testDb.prepare('SELECT * FROM student_representatives WHERE student_id = ? AND representative_id = ?').get(newStudentId, 'rep-01') as any) : null;
      const progEnrollRow = newStudentId ? (testDb.prepare('SELECT * FROM student_program_enrollments WHERE student_id = ?').get(newStudentId) as any) : null;
      const subjEnrollRows = newStudentId ? (testDb.prepare('SELECT count(*) as cnt FROM student_subject_enrollments WHERE student_id = ?').get(newStudentId) as any) : null;

      const isPinHashed = studentRow?.pin_code_hash?.startsWith('scrypt$');

      const passed = createRes.status === 201 &&
                     createBody.success === true &&
                     Boolean(userRow && userRow.role === 'STUDENT' && userRow.status === 'ACTIVE') &&
                     Boolean(studentRow && isPinHashed) &&
                     Boolean(repLinkRow) &&
                     Boolean(progEnrollRow && progEnrollRow.level_id === 'lvl-sup-8') &&
                     Boolean(subjEnrollRows && subjEnrollRows.cnt > 0);

      record(
        6,
        'Creación atómica de cuenta de estudiante en base de datos con hash scrypt y matrículas',
        passed,
        `StudentId: ${newStudentId}, Asignaturas matriculadas: ${subjEnrollRows?.cnt}, PIN hasheado: ${isPinHashed}`
      );
    } catch (err: any) {
      record(6, 'Creación atómica de cuenta de estudiante en base de datos con hash scrypt y matrículas', false, undefined, err.message);
    }

    // ---------------------------------------------------------------------------
    // TEST 7: Login del Nuevo Estudiante y Persistencia tras Recarga Simulada
    // ---------------------------------------------------------------------------
    try {
      const newLoginRes = await fetch(`${baseUrl}/api/v1/auth/login-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: newStudentUsername,
          pin: generatedPin,
        }),
      });

      newStudentCookie = parseCookie(newLoginRes.headers.get('set-cookie'));
      const newLoginBody = await newLoginRes.json();

      // Simular recarga de página: invocación a /api/v1/auth/me enviando ÚNICAMENTE la cookie
      const reloadMeRes = await fetch(`${baseUrl}/api/v1/auth/me`, {
        headers: { Cookie: newStudentCookie },
      });
      const reloadMeBody = await reloadMeRes.json();

      const isUserMatch = (reloadMeBody.data?.user?.userId === newStudentUserId || reloadMeBody.data?.userId === newStudentUserId || reloadMeBody.data?.user?.id === newStudentUserId || reloadMeBody.data?.id === newStudentUserId);
      const isStudentMatch = (reloadMeBody.data?.user?.studentId === newStudentId || reloadMeBody.data?.studentId === newStudentId);

      const passed = newLoginRes.status === 200 &&
                     newLoginBody.success === true &&
                     newStudentCookie.length > 0 &&
                     reloadMeRes.status === 200 &&
                     isUserMatch &&
                     isStudentMatch;

      record(
        7,
        'Sesión autoritativa persistente tras recarga simulada sin tokens en localStorage',
        passed,
        `Recarga verificada en servidor. User ID: ${reloadMeBody.data?.user?.userId || reloadMeBody.data?.userId}, Rol: ${reloadMeBody.data?.user?.role || reloadMeBody.data?.role}`
      );
    } catch (err: any) {
      record(7, 'Sesión autoritativa persistente tras recarga simulada sin tokens en localStorage', false, undefined, err.message);
    }

    // ---------------------------------------------------------------------------
    // TEST 8: Suspensión Administrativa e Invalidación Inmediata de Sesiones
    // ---------------------------------------------------------------------------
    try {
      // Admin suspende al usuario creado
      const suspendRes = await fetch(`${baseUrl}/api/v1/admin/users/${newStudentUserId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: adminCookie,
        },
        body: JSON.stringify({
          status: 'SUSPENDED',
          reason: 'Prueba de revocación inmediata de sesiones activas en etapa 03',
        }),
      });
      const suspendBody = await suspendRes.json();

      // La sesión activa existente del estudiante DEBE ser rechazada de inmediato
      const revokedMeRes = await fetch(`${baseUrl}/api/v1/auth/me`, {
        headers: { Cookie: newStudentCookie },
      });

      // Un nuevo intento de login con credenciales válidas debe ser rechazado
      const reLoginRes = await fetch(`${baseUrl}/api/v1/auth/login-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: newStudentUsername,
          pin: generatedPin,
        }),
      });
      const reLoginBody = await reLoginRes.json();

      const passed = suspendRes.status === 200 &&
                     suspendBody.success === true &&
                     revokedMeRes.status === 401 &&
                     reLoginRes.status === 403 &&
                     reLoginBody.error?.code === 'AUTH_ACCOUNT_INACTIVE';

      record(
        8,
        'Suspensión administrativa con revocación instantánea de sesiones y bloqueo de acceso',
        passed,
        `Estado suspensión: ${suspendBody.data?.user?.status}, Acceso revocado: ${revokedMeRes.status}, Re-login bloqueado: ${reLoginRes.status}`
      );
    } catch (err: any) {
      record(8, 'Suspensión administrativa con revocación instantánea de sesiones y bloqueo de acceso', false, undefined, err.message);
    }

    // ---------------------------------------------------------------------------
    // TEST 9: Restablecimiento de Credenciales, Reactivación y Logout Seguro
    // ---------------------------------------------------------------------------
    try {
      // 1. Reactivar usuario
      await fetch(`${baseUrl}/api/v1/admin/users/${newStudentUserId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: adminCookie,
        },
        body: JSON.stringify({ status: 'ACTIVE' }),
      });

      // 2. Admin restablece credenciales (nuevo PIN 7788)
      const resetRes = await fetch(`${baseUrl}/api/v1/admin/users/${newStudentUserId}/reset-credentials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: adminCookie,
        },
        body: JSON.stringify({
          newPin: '7788',
          newPassword: 'NewDevPass7788!',
        }),
      });
      const resetBody = await resetRes.json();

      // 3. Estudiante ingresa con su nuevo PIN
      const newPinLoginRes = await fetch(`${baseUrl}/api/v1/auth/login-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: newStudentUsername,
          pin: '7788',
        }),
      });
      const freshCookie = parseCookie(newPinLoginRes.headers.get('set-cookie'));

      // 4. Logout seguro
      const logoutRes = await fetch(`${baseUrl}/api/v1/auth/logout`, {
        method: 'POST',
        headers: { Cookie: freshCookie },
      });
      const logoutSetCookie = logoutRes.headers.get('set-cookie') || '';
      const cookieCleared = logoutSetCookie.toLowerCase().includes('max-age=0') || logoutSetCookie.toLowerCase().includes('expires=');

      // 5. Invocación posterior a /me con cookie vieja -> 401
      const afterLogoutMeRes = await fetch(`${baseUrl}/api/v1/auth/me`, {
        headers: { Cookie: freshCookie },
      });

      const passed = resetRes.status === 200 &&
                     resetBody.success === true &&
                     newPinLoginRes.status === 200 &&
                     logoutRes.status === 200 &&
                     cookieCleared &&
                     afterLogoutMeRes.status === 401;

      record(
        9,
        'Restablecimiento seguro de credenciales con scrypt, reactivación y cierre de sesión (logout)',
        passed,
        `Reset: ${resetRes.status}, Nuevo Login: ${newPinLoginRes.status}, Logout: ${logoutRes.status}, Cookie limpiada: ${cookieCleared}`
      );
    } catch (err: any) {
      record(9, 'Restablecimiento seguro de credenciales con scrypt, reactivación y cierre de sesión (logout)', false, undefined, err.message);
    }

    // ---------------------------------------------------------------------------
    // TEST 10: Auditoría Inmutable y Cero Fuga de Secretos en Logs
    // ---------------------------------------------------------------------------
    try {
      const auditRows = testDb.prepare(`
        SELECT id, event_type, resource_type, details_json
        FROM audit_events
        ORDER BY created_at DESC
      `).all() as any[];

      const eventTypes = auditRows.map((r) => r.event_type);
      const hasAccountCreated = eventTypes.includes('STUDENT_ACCOUNT_CREATED');
      const hasAuthSuccess = eventTypes.includes('AUTH_SUCCESS');
      const hasSuspended = eventTypes.includes('USER_SUSPENDED');
      const hasCredsReset = eventTypes.includes('USER_CREDENTIALS_RESET') || eventTypes.includes('CREDENTIALS_RESET');

      // Búsqueda exhaustiva de texto plano de contraseñas y PINs en todos los registros
      let secretLeakFound = false;
      const dangerousPatterns = [
        /DevSynthPass123!/i,
        /NewDevPass7788!/i,
        /DevAdmin2026!/i,
        /DevPass123!/i,
        /"initialPassword"\s*:\s*"(?!\[REDACTED\])/i,
        /"initialPin"\s*:\s*"(?!\[REDACTED\])/i,
        /"password"\s*:\s*"(?!\[REDACTED\])/i,
        /"pin"\s*:\s*"(?!\[REDACTED\])/i,
      ];

      for (const row of auditRows) {
        const text = row.details_json || '';
        for (const pattern of dangerousPatterns) {
          if (pattern.test(text)) {
            secretLeakFound = true;
            break;
          }
        }
        if (secretLeakFound) break;
      }

      const passed = auditRows.length > 0 &&
                     hasAccountCreated &&
                     hasAuthSuccess &&
                     hasSuspended &&
                     hasCredsReset &&
                     !secretLeakFound;

      record(
        10,
        'Auditoría inmutable institucional completa con sanitización estricta de secretos',
        passed,
        `Eventos registrados: ${auditRows.length}, Secretos en texto plano filtrados: ${secretLeakFound ? 'SÍ (ERROR)' : 'NINGUNO (SEGURO)'}`
      );
    } catch (err: any) {
      record(10, 'Auditoría inmutable institucional completa con sanitización estricta de secretos', false, undefined, err.message);
    }

  } finally {
    // Limpieza de recursos
    await new Promise<void>((resolve) => server.close(() => resolve()));
    try { testDb.close(); } catch {}
    if (fs.existsSync(testDbPath)) {
      try { fs.unlinkSync(testDbPath); } catch {}
    }
    // Eliminar también archivos -wal y -shm si existiesen
    try { fs.unlinkSync(`${testDbPath}-wal`); } catch {}
    try { fs.unlinkSync(`${testDbPath}-shm`); } catch {}
  }

  console.log('\n================================================================');
  console.log('  RESUMEN DE PRUEBAS — ETAPA 03');
  console.log('================================================================');

  const total = testResults.length;
  const passedCount = testResults.filter((t) => t.passed).length;
  const failedCount = total - passedCount;

  console.log(`Total Pruebas:    ${total}`);
  console.log(`Exitosas:         ${passedCount}`);
  console.log(`Fallidas:         ${failedCount}`);

  if (failedCount > 0) {
    console.error(`\n❌ ERROR: ${failedCount} prueba(s) fallaron en la Etapa 03.`);
    process.exit(1);
  } else {
    console.log(`\n🎉 ÉXITO: Las ${passedCount} pruebas de la Etapa 03 pasaron satisfactoriamente.`);
    process.exit(0);
  }
}

runEtapa03Suite().catch((fatal) => {
  console.error('[FATAL] Error no controlado en suite de pruebas Etapa 03:', fatal);
  process.exit(1);
});
