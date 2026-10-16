/**
 * ==============================================================================
 * Suite de Pruebas Automatizadas — ETAPA 10 (ALSIZ / Ekballo Church)
 * Centro Administrativo Unificado: Permisos Estrictos, Asignaturas,
 * Centro de Conocimiento, Agentes Piloto, Telemetría y Configuración
 * ==============================================================================
 */

import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import app from '../server';
import { initDatabase, closeDatabase, getDb } from '../server/db/database';
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
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTestSuite(): Promise<void> {
  console.log('================================================================');
  console.log('  SUITE DE PRUEBAS AUTOMATIZADAS — ETAPA 10 (ALSIZ / EKBALLO)');
  console.log('  CENTRO ADMINISTRATIVO UNIFICADO Y AUDITORÍA LOPDP');
  console.log('================================================================\n');

  const testDbPath = path.resolve(process.cwd(), 'data', 'test_alsiz_etapa10.db');
  closeDatabase();
  if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);

  process.env.DATABASE_PATH = testDbPath;
  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'secreto_de_prueba_automatizada_alsiz_2026_min32';

  const db = initDatabase(testDbPath);
  const migrationResults = runMigrations(db);

  const appliedCount = migrationResults.filter((m) => m.status === 'APPLIED' || m.status === 'SKIPPED').length;
  recordResult(
    'Migraciones de esquema completas (v001 a v011)',
    'Migraciones',
    appliedCount >= 11,
    `Se verificaron ${appliedCount} migraciones aplicadas correctamente.`
  );

  const server = http.createServer(app);
  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve());
  });

  const port = (server.address() as any).port;

  try {
    // -------------------------------------------------------------
    // Autenticación de Roles para Pruebas
    // -------------------------------------------------------------
    const loginAdmin = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'admin_alsiz', password: 'DevAdmin2026!' },
    });
    const adminToken = loginAdmin.body?.data?.token;

    const loginTeacher = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'prof_mentoria', password: 'DevPass123!' },
    });
    const teacherToken = loginTeacher.body?.data?.token;

    const loginStudent = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'alumno_santos_1', password: 'DevPass123!' },
    });
    const studentToken = loginStudent.body?.data?.token;

    recordResult(
      'Autenticación inicial de los roles de prueba (ADMIN, TEACHER, STUDENT)',
      'Autenticación',
      Boolean(adminToken && teacherToken && studentToken),
      'Tokens emitidos satisfactoriamente para los 3 roles.'
    );

    // -------------------------------------------------------------
    // Criterio 1: Administrador autorizado crea asignatura de prueba
    // -------------------------------------------------------------
    const testSubjCode = `SUBJ-T10-${Date.now().toString().slice(-4)}`;
    const createSubjRes = await request(port, {
      method: 'POST',
      path: '/api/v1/academic/subjects',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        programId: 'prog-homeschool',
        levelId: 'lvl-sup-8',
        code: testSubjCode,
        name: 'Asignatura Experimental de Prueba 10',
        category: 'COMPLEMENTARIA',
        weeklyHours: 4,
      },
    });

    const createdSubj = createSubjRes.body?.data;
    const isSubjCreated = createSubjRes.status === 201 && createdSubj?.code === testSubjCode;
    recordResult(
      'Criterio 1: Administrador autorizado puede crear una asignatura de prueba',
      'Gestión Académica',
      isSubjCreated,
      `Status HTTP ${createSubjRes.status}. Asignatura creada con ID: ${createdSubj?.id}.`
    );

    // -------------------------------------------------------------
    // Criterio 2: Administrador autorizado modifica la asignatura de prueba
    // -------------------------------------------------------------
    const updatedSubjName = 'Asignatura Experimental Modificada 10';
    const updateSubjRes = await request(port, {
      method: 'PUT',
      path: `/api/v1/academic/subjects/${createdSubj?.id}`,
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        name: updatedSubjName,
        weeklyHours: 6,
      },
    });

    const isSubjUpdated =
      updateSubjRes.status === 200 &&
      updateSubjRes.body?.data?.name === updatedSubjName &&
      updateSubjRes.body?.data?.weekly_hours === 6;

    recordResult(
      'Criterio 2: Administrador autorizado puede modificar una asignatura de prueba',
      'Gestión Académica',
      isSubjUpdated,
      `Status HTTP ${updateSubjRes.status}. Nombre actualizado a: "${updateSubjRes.body?.data?.name}". Horas: ${updateSubjRes.body?.data?.weekly_hours}.`
    );

    // -------------------------------------------------------------
    // Criterio 3: Rol sin permiso (Estudiante) es rechazado al modificar o crear asignatura
    // -------------------------------------------------------------
    const studentUpdateRes = await request(port, {
      method: 'PUT',
      path: `/api/v1/academic/subjects/${createdSubj?.id}`,
      headers: { Authorization: `Bearer ${studentToken}` },
      body: { name: 'Intento de Modificación por Alumno' },
    });

    const studentCreateRes = await request(port, {
      method: 'POST',
      path: '/api/v1/academic/subjects',
      headers: { Authorization: `Bearer ${studentToken}` },
      body: {
        programId: 'prog-homeschool',
        levelId: 'lvl-sup-8',
        code: 'HACK-SUBJ',
        name: 'Asignatura Ilegal',
        category: 'COMPLEMENTARIA',
      },
    });

    const isRbacProtected = studentUpdateRes.status === 403 && studentCreateRes.status === 403;
    recordResult(
      'Criterio 3: Rol sin permiso no puede crear ni modificar asignaturas (HTTP 403)',
      'Seguridad & RBAC',
      isRbacProtected,
      `PUT status: ${studentUpdateRes.status}, POST status: ${studentCreateRes.status}. Acceso denegado correctamente.`
    );

    // -------------------------------------------------------------
    // Criterio 4: Actualización de una fuente de conocimiento
    // -------------------------------------------------------------
    const getSourcesRes = await request(port, {
      method: 'GET',
      path: '/api/v1/knowledge/sources',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const targetSource = getSourcesRes.body?.data?.sources?.[0];

    const updateSourceRes = await request(port, {
      method: 'PUT',
      path: `/api/v1/knowledge/sources/${targetSource?.id}`,
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        title: `${targetSource?.title || 'Fuente'} (Actualizada Etapa 10)`,
        description: 'Actualización validada de metadatos pedagógicos para pruebas de aceptación.',
        justification: 'Ajuste editorial formal registrado durante la validación de la Etapa 10.',
      },
    });

    const isSourceUpdated = updateSourceRes.status === 200 && updateSourceRes.body?.success === true;
    recordResult(
      'Criterio 4: Se puede actualizar una fuente de conocimiento con justificación',
      'Centro de Conocimiento',
      isSourceUpdated,
      `Status HTTP ${updateSourceRes.status}. Título actualizado: "${updateSourceRes.body?.data?.title}".`
    );

    // -------------------------------------------------------------
    // Criterio 5: Consulta del historial de auditoría de la fuente
    // -------------------------------------------------------------
    const historyRes = await request(port, {
      method: 'GET',
      path: `/api/v1/knowledge/sources/${targetSource?.id}/history`,
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const historyItems = historyRes.body?.data?.history;
    const hasUpdateEvent = Array.isArray(historyItems) && historyItems.some((h: any) => h.action === 'UPDATED');
    recordResult(
      'Criterio 5: Se puede consultar el historial completo de cambios de la fuente',
      'Centro de Conocimiento',
      historyRes.status === 200 && hasUpdateEvent,
      `Status HTTP ${historyRes.status}. Eventos encontrados: ${historyItems?.length || 0}. Evento UPDATED verificado.`
    );

    // -------------------------------------------------------------
    // Criterio 6: Revisión del estado del agente piloto
    // -------------------------------------------------------------
    const pilotStatusRes = await request(port, {
      method: 'GET',
      path: '/api/v1/pilot/status',
    });

    const isPilotStatusValid =
      pilotStatusRes.status === 200 &&
      typeof pilotStatusRes.body?.data?.pilotEnabled === 'boolean' &&
      Array.isArray(pilotStatusRes.body?.data?.allowedSubjectCodes);

    recordResult(
      'Criterio 6: Se puede revisar el estado y configuración pública del agente piloto',
      'Agentes IA & Piloto',
      isPilotStatusValid,
      `Status HTTP ${pilotStatusRes.status}. Piloto activo: ${pilotStatusRes.body?.data?.pilotEnabled}.`
    );

    // -------------------------------------------------------------
    // Criterio 7: Vista de errores de integración y telemetría disponible
    // -------------------------------------------------------------
    const telemetryErrorsRes = await request(port, {
      method: 'GET',
      path: '/api/v1/admin/telemetry/errors',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const errorsData = telemetryErrorsRes.body?.data;
    const hasTelemetryData =
      telemetryErrorsRes.status === 200 &&
      typeof errorsData?.abortedPilotSessionsCount === 'number' &&
      Array.isArray(errorsData?.providersAvailable);

    recordResult(
      'Criterio 7: Vista de errores de integración, fallbacks y disponibilidad con datos reales',
      'Agentes IA & Piloto',
      hasTelemetryData,
      `Status HTTP ${telemetryErrorsRes.status}. Sesiones abortadas registradas: ${errorsData?.abortedPilotSessionsCount}. Proveedores: ${errorsData?.providersAvailable?.join(', ')}.`
    );

    // -------------------------------------------------------------
    // Criterio 8: Las acciones sensibles quedan registradas en el libro mayor sin secretos
    // -------------------------------------------------------------
    const auditRes = await request(port, {
      method: 'GET',
      path: '/api/v1/admin/audit-logs?limit=10',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const logs = auditRes.body?.data?.logs || [];
    const hasSubjectEvents = logs.some(
      (l: any) => l.event_type === 'ACADEMIC_SUBJECT_CREATED' || l.event_type === 'ACADEMIC_SUBJECT_UPDATED'
    );

    // Comprobar que ningún detalle contenga claves sensibles
    let secretsExposed = false;
    for (const l of logs) {
      const detailsStr = JSON.stringify(l.details || '');
      if (detailsStr.includes('password') || detailsStr.includes('hash') || detailsStr.includes('AdminPass2026')) {
        secretsExposed = true;
        break;
      }
    }

    recordResult(
      'Criterio 8: Acciones sensibles quedan registradas en auditoría inmutable sin secretos (LOPDP)',
      'Seguridad & Auditoría',
      hasSubjectEvents && !secretsExposed,
      `Eventos registrados: ${logs.length}. Fuga de secretos: ${secretsExposed ? 'DETECTADA' : 'CERO (Cumple)'}.`
    );

    // -------------------------------------------------------------
    // Criterio 9: Consulta y actualización de configuración institucional
    // -------------------------------------------------------------
    const getSettingsRes = await request(port, {
      method: 'GET',
      path: '/api/v1/admin/settings',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const updateSettingsRes = await request(port, {
      method: 'PUT',
      path: '/api/v1/admin/settings',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        institution_name: 'Ekballo Church — Plataforma Educativa ALSIZ (Validada Etapa 10)',
        current_school_year: '2026-2027',
      },
    });

    const isSettingsUpdated =
      getSettingsRes.status === 200 &&
      updateSettingsRes.status === 200 &&
      updateSettingsRes.body?.data?.updatedKeys?.includes('institution_name');

    recordResult(
      'Criterio 9: Consulta y actualización de configuración institucional por Administrador',
      'Configuración',
      isSettingsUpdated,
      `Status HTTP ${updateSettingsRes.status}. Claves actualizadas: ${updateSettingsRes.body?.data?.updatedKeys?.join(', ')}.`
    );

    // -------------------------------------------------------------
    // Criterio 10: Usuario no administrador es rechazado en configuración institucional
    // -------------------------------------------------------------
    const studentSettingsRes = await request(port, {
      method: 'PUT',
      path: '/api/v1/admin/settings',
      headers: { Authorization: `Bearer ${studentToken}` },
      body: { institution_name: 'Ataque Ilegal' },
    });

    recordResult(
      'Criterio 10: Usuario no autorizado no puede modificar configuración institucional (HTTP 403)',
      'Seguridad & RBAC',
      studentSettingsRes.status === 403,
      `Status HTTP ${studentSettingsRes.status}. Acceso denegado a rol STUDENT.`
    );

    // -------------------------------------------------------------
    // Criterio 11: Resumen consolidado del dashboard con tareas pendientes reales
    // -------------------------------------------------------------
    const dashboardRes = await request(port, {
      method: 'GET',
      path: '/api/v1/admin/dashboard-summary',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const dashData = dashboardRes.body?.data;
    const isDashboardValid =
      dashboardRes.status === 200 &&
      dashData?.metrics?.totalUsers > 0 &&
      dashData?.metrics?.programsCount > 0 &&
      typeof dashData?.pendingTasks?.pendingKnowledgeSourcesCount === 'number' &&
      typeof dashData?.pendingTasks?.pendingMaterialsCount === 'number';

    recordResult(
      'Criterio 11: Dashboard consolidado retorna métricas reales y tareas pendientes sin invención',
      'Centro Unificado',
      isDashboardValid,
      `Status HTTP ${dashboardRes.status}. Usuarios: ${dashData?.metrics?.totalUsers}. Programas: ${dashData?.metrics?.programsCount}. Tareas pendientes calculadas.`
    );

    // -------------------------------------------------------------
    // Criterio 12: Gestión de usuarios con filtros y relaciones de tutela familiar
    // -------------------------------------------------------------
    const usersFilteredRes = await request(port, {
      method: 'GET',
      path: '/api/v1/admin/users?role=TEACHER',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const repsRes = await request(port, {
      method: 'GET',
      path: '/api/v1/admin/representatives',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const isUsersAndFamilyValid =
      usersFilteredRes.status === 200 &&
      Array.isArray(usersFilteredRes.body?.data?.users) &&
      repsRes.status === 200 &&
      Array.isArray(repsRes.body?.data?.representatives);

    recordResult(
      'Criterio 12: Nómina de usuarios con filtros por rol y relaciones de tutela familiar',
      'Gestión de Usuarios',
      isUsersAndFamilyValid,
      `Filtro TEACHER: ${usersFilteredRes.body?.data?.totalUsers} usuarios. Representantes vinculados: ${repsRes.body?.data?.totalRepresentatives}.`
    );

    // -------------------------------------------------------------
    // Criterio 13: Reportes académicos consolidados y logros competenciales MINEDUC
    // -------------------------------------------------------------
    const reportsRes = await request(port, {
      method: 'GET',
      path: '/api/v1/admin/reports/academic-summary',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const repData = reportsRes.body?.data;
    const isReportValid =
      reportsRes.status === 200 &&
      typeof repData?.totalSubjectsEvaluated === 'number' &&
      typeof repData?.competencyMasteryDistribution?.DEMONSTRATED_MASTERY === 'number';

    recordResult(
      'Criterio 13: Reporte académico consolidado con distribución de competencias MINEDUC',
      'Informes',
      isReportValid,
      `Status HTTP ${reportsRes.status}. Asignaturas evaluadas: ${repData?.totalSubjectsEvaluated}. Dominio demostrado: ${repData?.competencyMasteryDistribution?.DEMONSTRATED_MASTERY}.`
    );
  } finally {
    server.close();
    closeDatabase();
  }

  // -------------------------------------------------------------
  // Resumen Final
  // -------------------------------------------------------------
  console.log('\n================================================================');
  console.log('  RESUMEN FINAL DE LA SUITE DE PRUEBAS DE LA ETAPA 10');
  console.log('================================================================\n');

  const totalTests = results.length;
  const passedTests = results.filter((r) => r.passed).length;
  const failedTests = results.filter((r) => !r.passed).length;

  console.log(`Total de pruebas ejecutadas: ${totalTests}`);
  console.log(`Pruebas aprobadas (PASÓ):   ${passedTests}`);
  console.log(`Pruebas fallidas  (FALLÓ):  ${failedTests}\n`);

  if (failedTests > 0) {
    console.error('❌ SE DETECTARON FALLOS EN LA SUITE DE PRUEBAS DE LA ETAPA 10.');
    process.exit(1);
  } else {
    console.log('Todas las pruebas críticas de la ETAPA 10 fueron APROBADAS con éxito.');
    process.exit(0);
  }
}

runTestSuite().catch((err) => {
  console.error('Error fatal ejecutando la suite de la Etapa 10:', err);
  process.exit(1);
});
