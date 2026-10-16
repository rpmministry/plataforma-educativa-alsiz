/**
 * ==============================================================================
 * Suite de Pruebas Automatizadas — ETAPA 09 (ALSIZ / Ekballo Church)
 * Aula Interactiva e Integración Evaluada de OpenMAIC (Sandbox & Feature Flag)
 * ==============================================================================
 */

import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import app from '../server';
import { initDatabase, closeDatabase } from '../server/db/database';
import { runMigrations } from '../server/db/migrator';

interface TestResult {
  name: string;
  category: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

function recordResult(name: string, category: string, passed: boolean, details?: string): void {
  results.push({ name, category, passed, details });
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} [${category}] ${name}: ${details || (passed ? 'PASÓ' : 'FALLÓ')}`);
}

async function request(
  port: number,
  options: {
    method: string;
    path: string;
    headers?: Record<string, string>;
    body?: any;
  }
): Promise<{ status: number; body: any; headers: http.IncomingHttpHeaders }> {
  return new Promise((resolve, reject) => {
    const postData = options.body ? JSON.stringify(options.body) : undefined;
    const reqHeaders: Record<string, string> = {
      ...(options.headers || {}),
    };

    if (postData) {
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(postData).toString();
    }

    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path: options.path,
        method: options.method,
        headers: reqHeaders,
      },
      (res) => {
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          let parsed: any = null;
          try {
            parsed = rawData ? JSON.parse(rawData) : null;
          } catch {
            parsed = rawData;
          }
          resolve({ status: res.statusCode || 500, body: parsed, headers: res.headers });
        });
      }
    );

    req.on('error', (err) => reject(err));
    if (postData) req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('================================================================');
  console.log('  SUITE DE PRUEBAS AUTOMATIZADAS — ETAPA 09 (ALSIZ / EKBALLO)');
  console.log('  AULA INTERACTIVA E INTEGRACIÓN EVALUADA DE OPENMAIC');
  console.log('================================================================\n');

  // Configuración de base de datos efímera para pruebas
  const testDbPath = path.resolve(process.cwd(), 'data', 'test_alsiz_etapa09.db');
  closeDatabase();
  if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);

  process.env.DATABASE_PATH = testDbPath;
  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'secreto_de_prueba_automatizada_alsiz_2026_min32';

  // 1. Ejecutar Migraciones (001 a 010)
  try {
    const testDb = initDatabase(testDbPath);
    const migrationResults = runMigrations(testDb);
    const allApplied = migrationResults.every((m) => m.status === 'APPLIED' || m.status === 'SKIPPED');
    recordResult(
      'Migraciones de esquema completas (v001 a v010)',
      'Migraciones',
      allApplied && migrationResults.length >= 10,
      `Se verificaron ${migrationResults.length} migraciones aplicadas correctamente.`
    );
  } catch (err: any) {
    recordResult('Migraciones de esquema', 'Migraciones', false, `Error: ${err.message}`);
    process.exit(1);
  }

  // 2. Levantar Servidor en puerto efímero
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
  const address = server.address() as any;
  const port = address.port;

  let adminToken = '';
  let teacherToken = '';
  let student1Token = '';

  try {
    // 3. Autenticación de Roles de Prueba
    const adminLogin = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'admin_alsiz', password: 'DevAdmin2026!' },
    });
    adminToken = adminLogin.body?.data?.token;

    const teacherLogin = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'prof_mentoria', password: 'DevPass123!' },
    });
    teacherToken = teacherLogin.body?.data?.token;

    const studentLogin = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'alumno_santos_1', password: 'DevPass123!' },
    });
    student1Token = studentLogin.body?.data?.token;

    recordResult(
      'Autenticación inicial de los roles de prueba',
      'Autenticación',
      Boolean(adminToken && teacherToken && student1Token),
      'Tokens emitidos para ADMIN, TEACHER y STUDENT 1.'
    );

    // ==========================================
    // CRITERIO 1: Estado del Feature Flag y Configuración Pública
    // ==========================================
    const statusRes = await request(port, {
      method: 'GET',
      path: '/api/v1/pilot/status',
    });

    const isEnabled = statusRes.body?.data?.pilotEnabled;
    const allowedSubjects = statusRes.body?.data?.allowedSubjectCodes || [];

    recordResult(
      'Criterio 1: Estado del Feature Flag y configuración pública del piloto',
      'Feature Flag',
      statusRes.status === 200 && isEnabled === true && allowedSubjects.length > 0,
      `Status HTTP ${statusRes.status}. Piloto habilitado: ${isEnabled}. Asignaturas autorizadas: ${allowedSubjects.join(', ')}.`
    );

    // ==========================================
    // CRITERIO 2: Inicio de Sesión Efímera y Aislamiento Anti-PII Estricto
    // ==========================================
    const initiateRes = await request(port, {
      method: 'POST',
      path: '/api/v1/pilot/sessions/initiate',
      headers: { Authorization: `Bearer ${student1Token}` },
      body: {
        subjectCode: 'subj-fis-bgu-01',
        lessonTheme: 'Óptica Geométrica y Ley de Snell',
      },
    });

    const sessionData = initiateRes.body?.data;
    const ephemeralToken = sessionData?.ephemeralToken;
    const syntheticAlias = sessionData?.studentSyntheticAlias;

    // Verificar que la respuesta NO exponga PII (sin email, sin password, sin nombre real)
    const hasNoPii =
      !JSON.stringify(initiateRes.body).includes('mateo.santos') &&
      !JSON.stringify(initiateRes.body).includes('password') &&
      syntheticAlias?.startsWith('Estudiante Explorador #');

    recordResult(
      'Criterio 2: Inicio de sesión efímera y aislamiento Anti-PII estricto',
      'Seguridad & Privacidad',
      initiateRes.status === 201 && Boolean(ephemeralToken) && Boolean(hasNoPii),
      `Status HTTP ${initiateRes.status}. Token efímero generado. Alias sintético asignado: "${syntheticAlias}". Cero PII transmitida.`
    );

    // ==========================================
    // CRITERIO 3: Consulta de Sesión Activa por Token Efímero
    // ==========================================
    const getSessionRes = await request(port, {
      method: 'GET',
      path: `/api/v1/pilot/sessions/${ephemeralToken}`,
    });

    recordResult(
      'Criterio 3: Consulta de sesión activa por token efímero',
      'Sesión Efímera',
      getSessionRes.status === 200 && getSessionRes.body?.data?.status === 'ACTIVE',
      `Status HTTP ${getSessionRes.status}. Estado de sesión: ${getSessionRes.body?.data?.status}.`
    );

    // ==========================================
    // CRITERIO 4: Simulación Multiagente Interactiva (Física / Refracción)
    // ==========================================
    const turn1Res = await request(port, {
      method: 'POST',
      path: `/api/v1/pilot/sessions/${ephemeralToken}/interact`,
      body: {
        turnIndex: 1,
        userAction: 'ADJUST_ANGLE',
        n1: 1.00,
        n2: 1.33,
        angleIncidentDeg: 30,
      },
    });

    const turn1Data = turn1Res.body?.data;
    const teacherSpeech1 = turn1Data?.teacherSpeech || '';
    const peerSpeech1 = turn1Data?.virtualPeerSpeech || '';
    const angleRefracted = turn1Data?.simulationState?.angleRefractedDeg;

    // Con n1=1.00, n2=1.33, theta1=30° -> theta2 ≈ 22.1°
    const physicsValid = Math.abs(angleRefracted - 22.1) <= 0.2;
    const multiAgentComplete =
      Boolean(teacherSpeech1) &&
      Boolean(peerSpeech1) &&
      turn1Data?.virtualPeerName === 'Sofía (Compañera Virtual)';

    recordResult(
      'Criterio 4: Dinámica multiagente interactiva en vivo (Profesor Kepler + Compañera Sofía + Física Snell)',
      'Pedagogía Multiagente',
      turn1Res.status === 200 && physicsValid && multiAgentComplete,
      `Status HTTP ${turn1Res.status}. Refracción física calculada: ${angleRefracted}° (Esperado 22.1°). Diálogo simultáneo generado.`
    );

    // ==========================================
    // CRITERIO 5: Simulación de Reflexión Total Interna (TIR)
    // ==========================================
    const tirRes = await request(port, {
      method: 'POST',
      path: `/api/v1/pilot/sessions/${ephemeralToken}/interact`,
      body: {
        turnIndex: 2,
        userAction: 'EXPLORE_CRITICAL_ANGLE',
        n1: 1.52, // Vidrio
        n2: 1.00, // Aire
        angleIncidentDeg: 60, // Mayor que ángulo crítico (~41.1°)
      },
    });

    const tirData = tirRes.body?.data;
    const isTirActive = tirData?.simulationState?.isTotalInternalReflection === true;
    const tirSpeechMentionsTir = tirData?.teacherSpeech?.includes('Reflexión Total Interna');

    recordResult(
      'Criterio 5: Simulación física avanzada de Reflexión Total Interna (TIR)',
      'Simulador Óptico',
      tirRes.status === 200 && isTirActive && tirSpeechMentionsTir,
      `Status HTTP ${tirRes.status}. Reflexión Total Interna detectada (n1=1.52 > n2=1.00 a 60°). Explicación óptica provista.`
    );

    // ==========================================
    // CRITERIO 6: Control de Costos: Límite Pedagógico de Turnos (Anti-Abuso)
    // ==========================================
    const maxTurnRes = await request(port, {
      method: 'POST',
      path: `/api/v1/pilot/sessions/${ephemeralToken}/interact`,
      body: {
        turnIndex: 7, // Superior al límite de 6 turnos
        userAction: 'ADJUST_ANGLE',
      },
    });

    recordResult(
      'Criterio 6: Límite pedagógico de turnos por sesión para control de consumo de tokens',
      'Control de Costos',
      maxTurnRes.status === 429 && maxTurnRes.body?.error?.includes('MAX_TURNS_EXCEEDED'),
      `Status HTTP ${maxTurnRes.status}. Límite excedido bloqueado adecuadamente con HTTP 429.`
    );

    // ==========================================
    // CRITERIO 7: Salida Anticipada Ordenada ("Volver al Aula Tradicional")
    // ==========================================
    const terminateRes = await request(port, {
      method: 'POST',
      path: `/api/v1/pilot/sessions/${ephemeralToken}/terminate`,
      body: {
        exitReason: 'USER_EXIT',
        telemetry: {
          turnsCount: 2,
          latencyMs: 38,
          tokensEstimated: 280,
          simulationInteractions: 3,
        },
      },
    });

    const isTerminated = terminateRes.body?.data?.status === 'ABORTED_BY_USER';

    recordResult(
      'Criterio 7: Salida inmediata y desacople seguro ("Volver al Aula Tradicional")',
      'Resiliencia y Salida',
      terminateRes.status === 200 && isTerminated,
      `Status HTTP ${terminateRes.status}. Sesión finalizada con razón: USER_EXIT. Estado: ABORTED_BY_USER.`
    );

    // ==========================================
    // CRITERIO 8: Registro de Telemetría Operativa sin PII
    // ==========================================
    const telemRes = await request(port, {
      method: 'GET',
      path: '/api/v1/pilot/admin/telemetry',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const telemSummary = telemRes.body?.data;
    const hasTelemetry =
      telemSummary?.totalSessions > 0 &&
      telemSummary?.averageLatencyMs > 0 &&
      telemSummary?.exitReasonsCount?.USER_EXIT > 0;

    recordResult(
      'Criterio 8: Telemetría operacional acumulada sin datos personales de menores',
      'Telemetría y Métricas',
      telemRes.status === 200 && Boolean(hasTelemetry),
      `Status HTTP ${telemRes.status}. Total sesiones: ${telemSummary?.totalSessions}. Latencia media: ${telemSummary?.averageLatencyMs} ms. Salidas: ${telemSummary?.abortedSessions}.`
    );

    // ==========================================
    // CRITERIO 9: Seguridad y RBAC: Estudiante no puede acceder a telemetría administrativa
    // ==========================================
    const rbacTelemRes = await request(port, {
      method: 'GET',
      path: '/api/v1/pilot/admin/telemetry',
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    recordResult(
      'Criterio 9: Control de Acceso RBAC: Bloqueo de telemetría a estudiantes (HTTP 403)',
      'Seguridad & RBAC',
      rbacTelemRes.status === 403,
      `Status HTTP ${rbacTelemRes.status}. Solicitud de estudiante bloqueada por política de privilegios.`
    );

    // ==========================================
    // CRITERIO 10: Interruptor Maestro de Emergencia (Kill-Switch)
    // ==========================================
    // Administrador acciona el Kill-Switch
    const killSwitchRes = await request(port, {
      method: 'POST',
      path: '/api/v1/pilot/admin/toggle',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: { enabled: false },
    });

    // Intento de iniciar sesión con piloto desactivado
    const blockedInitiateRes = await request(port, {
      method: 'POST',
      path: '/api/v1/pilot/sessions/initiate',
      headers: { Authorization: `Bearer ${student1Token}` },
      body: {
        subjectCode: 'subj-fis-bgu-01',
        lessonTheme: 'Intento con Piloto Desactivado',
      },
    });

    const killSwitchEffective =
      killSwitchRes.status === 200 &&
      blockedInitiateRes.status === 403 &&
      blockedInitiateRes.body?.error?.includes('PILOT_DISABLED');

    recordResult(
      'Criterio 10: CRÍTICO: Conmutador de Emergencia (Kill-Switch) desactiva el piloto de inmediato sin error 500',
      'Gobernanza y Kill-Switch',
      killSwitchEffective,
      `Status HTTP ${blockedInitiateRes.status}. Solicitud rechazada limpiamente con código PILOT_DISABLED.`
    );

    // ==========================================
    // CRITERIO 11: Reactivación del Piloto tras Mitigación
    // ==========================================
    const reactivateRes = await request(port, {
      method: 'POST',
      path: '/api/v1/pilot/admin/toggle',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: { enabled: true },
    });

    const newSessionRes = await request(port, {
      method: 'POST',
      path: '/api/v1/pilot/sessions/initiate',
      headers: { Authorization: `Bearer ${student1Token}` },
      body: {
        subjectCode: 'subj-fis-bgu-01',
        lessonTheme: 'Sesión Post Reactivación',
      },
    });

    recordResult(
      'Criterio 11: Reactivación ágil del piloto tras contingencia',
      'Gobernanza y Kill-Switch',
      reactivateRes.status === 200 && newSessionRes.status === 201,
      `Status HTTP ${newSessionRes.status}. El piloto interactivo vuelve a admitir sesiones sin necesidad de reiniciar el servidor.`
    );

    // ==========================================
    // CRITERIO 12: Conclusión Exitosa de Sesión Educativa
    // ==========================================
    const completedToken = newSessionRes.body?.data?.ephemeralToken;
    const completeRes = await request(port, {
      method: 'POST',
      path: `/api/v1/pilot/sessions/${completedToken}/terminate`,
      body: {
        exitReason: 'LESSON_COMPLETED',
        telemetry: {
          turnsCount: 4,
          latencyMs: 32,
          tokensEstimated: 450,
          simulationInteractions: 5,
        },
      },
    });

    recordResult(
      'Criterio 12: Conclusión formativa exitosa con registro de estado COMPLETED',
      'Ciclo de Vida de Sesión',
      completeRes.status === 200 && completeRes.body?.data?.status === 'COMPLETED',
      `Status HTTP ${completeRes.status}. Sesión finalizada con éxito y estado COMPLETED persistido.`
    );

  } catch (err: any) {
    console.error('Error general durante la ejecución de la suite:', err);
  }

  // ==========================================
  // RESUMEN FINAL
  // ==========================================
  console.log('\n================================================================');
  console.log('  RESUMEN FINAL DE LA SUITE DE PRUEBAS DE LA ETAPA 09');
  console.log('================================================================\n');

  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log(`Total de pruebas ejecutadas: ${total}`);
  console.log(`Pruebas aprobadas (PASÓ):   ${passed}`);
  console.log(`Pruebas fallidas  (FALLÓ):  ${failed}\n`);

  server.close();

  if (failed > 0) {
    console.error('ALERTA: Se detectaron fallos en la suite de pruebas críticas.');
    process.exit(1);
  } else {
    console.log('Todas las pruebas críticas de la ETAPA 09 fueron APROBADAS con éxito.\n');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fallo de ejecución:', err);
  process.exit(1);
});

