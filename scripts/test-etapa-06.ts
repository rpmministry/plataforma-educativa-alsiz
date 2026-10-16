import { initDatabase, closeDatabase } from '../server/db/database';
import { runMigrations } from '../server/db/migrator';
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
  console.log('  SUITE DE PRUEBAS AUTOMATIZADAS — ETAPA 06 (ALSIZ / EKBALLO)');
  console.log('  NÚCLEO ACADÉMICO LMS, CURRÍCULO, EVALUACIONES Y COMPETENCIAS');
  console.log('================================================================\n');

  // Configurar base de datos de prueba aislada
  const testDbDir = path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(testDbDir)) fs.mkdirSync(testDbDir, { recursive: true });
  const testDbPath = path.resolve(testDbDir, 'test_etapa06_suite.db');
  if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);

  process.env.DATABASE_PATH = testDbPath;
  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'secreto_de_prueba_automatizada_alsiz_2026_min32';

  // 1. Ejecutar Migraciones
  try {
    const testDb = initDatabase(testDbPath);
    const migrationResults = runMigrations(testDb);
    const allApplied = migrationResults.every((m) => m.status === 'APPLIED' || m.status === 'SKIPPED');
    recordResult(
      'Migraciones de esquema completas (v001 a v005)',
      'Migraciones',
      allApplied && migrationResults.length >= 5,
      `Se verificaron ${migrationResults.length} migraciones aplicadas correctamente.`
    );
  } catch (err: any) {
    recordResult('Migraciones de esquema', 'Migraciones', false, `Error: ${err.message}`);
    process.exit(1);
  }

  // 2. Levantar Servidor de Pruebas en puerto dinámico
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
  const address = server.address() as any;
  const port = address.port;

  let adminToken = '';
  let teacherToken = '';
  let student1Token = '';
  let rep1Token = '';

  try {
    // 3. Autenticación de Actores de Prueba
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

    const repLogin = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'padre_santos', password: 'DevPass123!' },
    });
    rep1Token = repLogin.body?.data?.token;

    recordResult(
      'Autenticación inicial de los 4 roles de prueba',
      'Autenticación',
      Boolean(adminToken && teacherToken && student1Token && rep1Token),
      'Tokens emitidos para ADMIN, TEACHER, STUDENT y REPRESENTATIVE.'
    );

    // Códigos únicos para cada ejecución de la suite
    const runTag = Date.now().toString().slice(-6);
    const testProgCode = `BGU-${runTag}`;
    const testLvlCode = `LVL-${runTag}`;
    const testSubjCode = `FIS-${runTag}`;
    const testCompCode = `CN.F.${runTag}`;

    // ==========================================
    // CRITERIO 1: Admin crea programa, grado y asignatura
    // ==========================================
    const progRes = await request(port, {
      method: 'POST',
      path: '/api/v1/academic/programs',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        code: testProgCode,
        name: `Bachillerato General Unificado en Ciencias (${runTag})`,
        programType: 'K12_HOMESCHOOL',
        description: 'Malla oficial para estudiantes de secundaria alta.',
      },
    });

    const programCreated = progRes.status === 201 && progRes.body?.data?.code === testProgCode;
    const programId = progRes.body?.data?.id;

    recordResult(
      'Criterio 1A: Administrador crea programa formativo',
      'Gestión Curricular',
      programCreated,
      `Status HTTP ${progRes.status}. Programa ID: ${programId}.`
    );

    const lvlRes = await request(port, {
      method: 'POST',
      path: '/api/v1/academic/levels',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        programId,
        code: testLvlCode,
        name: '1.º Curso de Bachillerato General Unificado',
        orderIndex: 1,
        minRecommendedAge: 15,
      },
    });

    const levelCreated = lvlRes.status === 201 && lvlRes.body?.data?.code === testLvlCode;
    const levelId = lvlRes.body?.data?.id;

    recordResult(
      'Criterio 1B: Administrador crea nivel / grado',
      'Gestión Curricular',
      levelCreated,
      `Status HTTP ${lvlRes.status}. Nivel ID: ${levelId}.`
    );

    const subjRes = await request(port, {
      method: 'POST',
      path: '/api/v1/academic/subjects',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        programId,
        levelId,
        code: testSubjCode,
        name: 'Física y Mecánica Clásica',
        category: 'TRONCAL_MINEDUC',
        weeklyHours: 4,
        defaultTeacherId: 'usr-teacher-01',
      },
    });

    const subjectCreated = subjRes.status === 201 && subjRes.body?.data?.code === testSubjCode;
    const subjectId = subjRes.body?.data?.id;

    recordResult(
      'Criterio 1C: Administrador crea asignatura de la malla',
      'Gestión Curricular',
      subjectCreated,
      `Status HTTP ${subjRes.status}. Asignatura ID: ${subjectId}.`
    );

    // ==========================================
    // CRITERIO 2: Asigna estudiante al programa y materia
    // ==========================================
    const enrRes = await request(port, {
      method: 'POST',
      path: '/api/v1/academic/enrollments',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        studentId: 'stu-01',
        programId,
        levelId,
        schoolYear: '2026-2027',
      },
    });

    const enrollmentSuccess = enrRes.status === 201 && enrRes.body?.data?.student_id === 'stu-01';
    const programEnrollmentId = enrRes.body?.data?.id;

    recordResult(
      'Criterio 2A: Matrícula de estudiante en programa y nivel',
      'Matriculación',
      enrollmentSuccess,
      `Status HTTP ${enrRes.status}. Matrícula ID: ${programEnrollmentId}.`
    );

    const subEnrRes = await request(port, {
      method: 'POST',
      path: '/api/v1/academic/subject-enrollments',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        studentId: 'stu-01',
        subjectId,
        programEnrollmentId,
      },
    });

    const subEnrSuccess = subEnrRes.status === 201;

    recordResult(
      'Criterio 2B: Asignación normalizada de estudiante a la asignatura',
      'Matriculación',
      subEnrSuccess,
      `Status HTTP ${subEnrRes.status}. Estudiante vinculado a materia ${subjectId}.`
    );

    // ==========================================
    // CRITERIO 3: Docente crea unidad, lección y actividad
    // ==========================================
    const compRes = await request(port, {
      method: 'POST',
      path: `/api/v1/academic/subjects/${subjectId}/competencies`,
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: {
        officialCode: testCompCode,
        title: 'Cinemática y Leyes de Movimiento',
        description: 'Determinar la posición y velocidad de un móvil que se mueve en línea recta aplicando las leyes de Newton.',
        domainCategory: 'MATEMATICA',
        sourceStandard: 'MINEDUC_2023',
      },
    });

    const compId = compRes.body?.data?.id;
    recordResult(
      'Criterio 3A: Docente crea competencia curricular',
      'Estructura Pedagógica',
      compRes.status === 201 && Boolean(compId),
      `Status HTTP ${compRes.status}. Competencia Código: ${testCompCode}.`
    );

    const unitRes = await request(port, {
      method: 'POST',
      path: `/api/v1/academic/subjects/${subjectId}/units`,
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: {
        unitNumber: 1,
        trimesterNumber: 1,
        title: 'Unidad 1: Cinemática y Principios de la Creación',
        learningAxis: 'Modelización matemática del movimiento rectilíneo.',
      },
    });

    const unitId = unitRes.body?.data?.id;
    recordResult(
      'Criterio 3B: Docente crea unidad curricular trimestral',
      'Estructura Pedagógica',
      unitRes.status === 201 && Boolean(unitId),
      `Status HTTP ${unitRes.status}. Unidad ID: ${unitId}.`
    );

    const lessonRes = await request(port, {
      method: 'POST',
      path: `/api/v1/academic/units/${unitId}/lessons`,
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: {
        dayNumber: 1,
        title: 'Clase 1: Primera Ley de Newton y Movimiento Rectilíneo',
        socraticQuestion: '¿Por qué un objeto continúa en movimiento indefinido en el vacío cósmico?',
        dynamicActivity: 'Simulación del plano inclinado con medición de tiempos y registro de aceleración.',
        contentMarkdown: '# Primera Ley de Newton\n\nTodo cuerpo continúa en su estado de reposo...',
        labType: 'phet',
      },
    });

    const lessonId = lessonRes.body?.data?.id;
    recordResult(
      'Criterio 3C: Docente crea lección diaria socrática',
      'Estructura Pedagógica',
      lessonRes.status === 201 && Boolean(lessonId),
      `Status HTTP ${lessonRes.status}. Lección ID: ${lessonId}.`
    );

    // Recursos multilingües con selección de idioma
    await request(port, {
      method: 'POST',
      path: `/api/v1/academic/lessons/${lessonId}/resources`,
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: {
        title: 'Guía de Dinámica y Fuerzas (Español)',
        description: 'Documento base con retos prácticos',
        resourceType: 'PDF',
        urlOrKey: '/resources/guia_dinamica_es.pdf',
        language: 'es',
        isTranslated: true,
      },
    });

    await request(port, {
      method: 'POST',
      path: `/api/v1/academic/lessons/${lessonId}/resources`,
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: {
        title: 'Dynamics & Forces Lab Sheet (English)',
        description: 'Bilingual worksheet for physics inquiry',
        resourceType: 'PDF',
        urlOrKey: '/resources/dynamics_lab_en.pdf',
        language: 'en',
        isTranslated: true,
      },
    });

    const evalRes = await request(port, {
      method: 'POST',
      path: `/api/v1/academic/lessons/${lessonId}/evaluations`,
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: {
        title: 'Taller Socrático: Retos de Cinemática',
        evaluationType: 'PROJECT_RUBRIC',
        maxScore: 10.0,
        passingScore: 7.0,
        competencyId: compId,
        dueDate: '2026-09-25T23:59:00Z',
        instructions: 'Elaborar el informe con tablas de datos y responder a las tres preguntas socráticas.',
        rubricDefinitionJson: JSON.stringify({
          criterios: [
            { id: 'crit_teoria', nombre: 'Comprensión de Principios Físicos', ponderacion: 5 },
            { id: 'crit_calculo', nombre: 'Precisión Gráfica y Numérica', ponderacion: 5 },
          ],
        }),
      },
    });

    const evalId = evalRes.body?.data?.id;
    recordResult(
      'Criterio 3D: Docente crea actividad evaluativa con rúbrica',
      'Evaluación Formativa',
      evalRes.status === 201 && Boolean(evalId),
      `Status HTTP ${evalRes.status}. Evaluación ID: ${evalId}.`
    );

    // ==========================================
    // CRITERIO 4: Estudiante accede al contenido y entrega la actividad
    // ==========================================
    const studentLessonView = await request(port, {
      method: 'GET',
      path: `/api/v1/academic/lessons/${lessonId}`,
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    const studentSeesContent = studentLessonView.status === 200 && studentLessonView.body?.data?.id === lessonId;

    recordResult(
      'Criterio 4A: Estudiante accede al contenido y lección socrática',
      'Experiencia del Estudiante',
      studentSeesContent,
      `Status HTTP ${studentLessonView.status}. Título: "${studentLessonView.body?.data?.title}".`
    );

    // Detección y selección de idioma
    const englishResourcesRes = await request(port, {
      method: 'GET',
      path: `/api/v1/academic/lessons/${lessonId}/resources?lang=en`,
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    const hasEnglishResource = englishResourcesRes.body?.data?.some(
      (r: any) => r.matchesRequestedLanguage && r.language === 'en'
    );

    recordResult(
      'Criterio 4B: Selección de idioma en recursos con fallback transparente',
      'Bilingüismo & Recursos',
      englishResourcesRes.status === 200 && Boolean(hasEnglishResource),
      `Status HTTP ${englishResourcesRes.status}. Idioma EN detectado correctamente.`
    );

    const submissionRes = await request(port, {
      method: 'POST',
      path: `/api/v1/academic/evaluations/${evalId}/submissions`,
      headers: { Authorization: `Bearer ${student1Token}` },
      body: {
        submissionText: 'Presento mi resolución del laboratorio: En el vacío cósmico un objeto no desacelera porque no existe fuerza neta externa que altere su estado.',
      },
    });

    const submissionCreated = submissionRes.status === 201 && submissionRes.body?.data?.status === 'SUBMITTED';
    const submissionId = submissionRes.body?.data?.id;

    recordResult(
      'Criterio 4C: Estudiante entrega la actividad formativa',
      'Entregas y Tareas',
      submissionCreated,
      `Status HTTP ${submissionRes.status}. Entrega ID: ${submissionId}. Estado: SUBMITTED.`
    );

    // ==========================================
    // CRITERIO 5 & 6: Calificación con rúbrica, historial y NO dominio si < 7.00
    // ==========================================
    // Primer intento: el docente califica con 5.50 (reprobado / requiere refuerzo)
    const gradeAttempt1 = await request(port, {
      method: 'POST',
      path: `/api/v1/academic/submissions/${submissionId}/evaluate`,
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: {
        score: 5.50,
        qualitativeFeedback: 'Buen razonamiento conceptual, pero omitiste los cálculos numéricos del plano inclinado.',
        rubricScores: { crit_teoria: 3.5, crit_calculo: 2.0 },
        changeReason: 'Primera evaluación formativa en borrador',
      },
    });

    const graded1Success = gradeAttempt1.status === 200 && gradeAttempt1.body?.data?.submission?.score === 5.50;

    recordResult(
      'Criterio 5A: Docente evalúa con rúbrica cuantitativa y retroalimentación',
      'Calificaciones & Rúbricas',
      graded1Success,
      `Status HTTP ${gradeAttempt1.status}. Nota asignada: 5.50 / 10.00.`
    );

    // Verificar seguimiento competencial con nota de 5.50 (NO debe declarar dominio)
    const compProg1 = await request(port, {
      method: 'GET',
      path: '/api/v1/academic/students/stu-01/competencies-progress',
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    const targetComp1 = compProg1.body?.data?.competencies?.find((c: any) => c.competency_id === compId);
    const noMasteryDeclared = targetComp1?.mastery_status === 'COMPLETED_NO_MASTERY';

    recordResult(
      'Criterio 6A: CRÍTICO: Panel distingue actividad completada de dominio demostrado (Sin dominio si nota < 7.00)',
      'Seguimiento Competencial',
      noMasteryDeclared && targetComp1?.activities_completed_count === 1,
      `Estado competencial: "${targetComp1?.mastery_status}". Actividades completadas: 1. Dominio no concedido.`
    );

    // Re-evaluación con nota aprobatoria (8.50 >= 7.00) tras corrección
    const gradeAttempt2 = await request(port, {
      method: 'POST',
      path: `/api/v1/academic/submissions/${submissionId}/evaluate`,
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: {
        score: 8.50,
        qualitativeFeedback: '¡Excelente revisión! Incluiste las fórmulas y mediciones experimentales con precisión.',
        rubricScores: { crit_teoria: 4.5, crit_calculo: 4.0 },
        changeReason: 'Re-evaluación formativa tras entrega de correcciones socráticas',
      },
    });

    const graded2Success = gradeAttempt2.status === 200 && gradeAttempt2.body?.data?.submission?.score === 8.50;

    recordResult(
      'Criterio 5B: Docente re-evalúa y actualiza calificación con justificación',
      'Calificaciones & Rúbricas',
      graded2Success,
      `Status HTTP ${gradeAttempt2.status}. Nueva nota: 8.50 / 10.00.`
    );

    // Verificar historial inmutable de cambios de calificación
    const historyRes = await request(port, {
      method: 'GET',
      path: `/api/v1/academic/submissions/${submissionId}/history`,
      headers: { Authorization: `Bearer ${teacherToken}` },
    });

    const historyItems = historyRes.body?.data || [];
    const hasHistoryOfTwo = historyItems.length === 2 && historyItems[0].previous_score === 5.50 && historyItems[0].new_score === 8.50;

    recordResult(
      'Criterio 5C: Historial inmutable de calificaciones registra cambios y autorías',
      'Auditoría de Calificaciones',
      hasHistoryOfTwo,
      `Se registraron ${historyItems.length} cambios con trazabilidad de motivo ("${historyItems[0]?.change_reason}").`
    );

    // Verificar que ahora con 8.50 SÍ se declara dominio demostrado
    const compProg2 = await request(port, {
      method: 'GET',
      path: '/api/v1/academic/students/stu-01/competencies-progress',
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    const targetComp2 = compProg2.body?.data?.competencies?.find((c: any) => c.competency_id === compId);
    const masteryNowDemonstrated = targetComp2?.mastery_status === 'DEMONSTRATED_MASTERY';

    recordResult(
      'Criterio 6B: Panel refleja DOMINIO DEMOSTRADO cuando se superan los criterios (≥ 7.00)',
      'Seguimiento Competencial',
      masteryNowDemonstrated,
      `Estado competencial: "${targetComp2?.mastery_status}". Nota promedio: ${targetComp2?.average_score}.`
    );

    // ==========================================
    // CRITERIO 7: Seguridad y Restricción de Permisos (RBAC y Anti-IDOR)
    // ==========================================
    // Intento no autenticado de crear programa
    const anonRes = await request(port, {
      method: 'POST',
      path: '/api/v1/academic/programs',
      body: { code: 'HACK-PROG', name: 'Hack Program', programType: 'K12_HOMESCHOOL' },
    });

    recordResult(
      'Criterio 7A: Rechazo de solicitud no autenticada a la API académica (401)',
      'Seguridad & RBAC',
      anonRes.status === 401,
      `Status HTTP ${anonRes.status}. Código de error: ${anonRes.body?.error?.code}.`
    );

    // Estudiante intentando calificar una entrega (Rechazo 403)
    const studentGradeAttempt = await request(port, {
      method: 'POST',
      path: `/api/v1/academic/submissions/${submissionId}/evaluate`,
      headers: { Authorization: `Bearer ${student1Token}` },
      body: { score: 10.0, qualitativeFeedback: 'Auto-nota', changeReason: 'Hack' },
    });

    recordResult(
      'Criterio 7B: Estudiante bloqueado de calificar o modificar notas (403)',
      'Seguridad & RBAC',
      studentGradeAttempt.status === 403,
      `Status HTTP ${studentGradeAttempt.status}. Rechazado por política de rol.`
    );

    // Aislamiento Anti-IDOR entre alumnos: Alumno 1 consulta competencias de Alumno 2 (Rechazo 403)
    const idorStudentAttempt = await request(port, {
      method: 'GET',
      path: '/api/v1/academic/students/stu-02/competencies-progress',
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    recordResult(
      'Criterio 7C: Estudiante no puede consultar progreso competencial de otro menor (Anti-IDOR)',
      'Aislamiento IDOR',
      idorStudentAttempt.status === 403,
      `Status HTTP ${idorStudentAttempt.status}. Código: ${idorStudentAttempt.body?.error?.code}.`
    );

    // Aislamiento Anti-IDOR Familiar: Representante 1 consulta boletín de hijo ajeno (stu-02) (Rechazo 403)
    const idorFamilyAttempt = await request(port, {
      method: 'GET',
      path: '/api/v1/academic/students/stu-02/report-card',
      headers: { Authorization: `Bearer ${rep1Token}` },
    });

    recordResult(
      'Criterio 7D: Representante bloqueado de consultar boletines de familias ajenas (Anti-IDOR Familiar)',
      'Aislamiento IDOR Familiar',
      idorFamilyAttempt.status === 403,
      `Status HTTP ${idorFamilyAttempt.status}. Código: ${idorFamilyAttempt.body?.error?.code}.`
    );

    // Representante 1 consulta boletín legítimo de su hijo (stu-01)
    const legitimateReportCard = await request(port, {
      method: 'GET',
      path: '/api/v1/academic/students/stu-01/report-card',
      headers: { Authorization: `Bearer ${rep1Token}` },
    });

    const reportCardOk = legitimateReportCard.status === 200 && legitimateReportCard.body?.data?.student?.fullName?.includes('Mateo');

    recordResult(
      'Criterio 7E: Representante accede legítimamente al Boletín Oficial de su hijo vinculado',
      'Acceso Familiar Legítimo',
      reportCardOk,
      `Status HTTP ${legitimateReportCard.status}. Estudiante: "${legitimateReportCard.body?.data?.student?.fullName}". Marco: MINEDUC Art. 32.`
    );

    // ==========================================
    // CRITERIO ADICIONAL: Calendario Académico
    // ==========================================
    const calEventRes = await request(port, {
      method: 'POST',
      path: '/api/v1/academic/calendar/events',
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: {
        programId,
        subjectId,
        title: 'Feria de Ciencias y Demostración Socrática',
        description: 'Exposición familiar de prototipos de cinemática',
        eventType: 'EXAM_PERIOD',
        startDate: '2026-10-15T09:00:00Z',
        endDate: '2026-10-15T13:00:00Z',
        isMandatory: true,
      },
    });

    recordResult(
      'Calendario Académico: Creación y consulta de hitos y fechas de entrega',
      'Calendario LMS',
      calEventRes.status === 201 && calEventRes.body?.data?.title?.includes('Feria de Ciencias'),
      `Status HTTP ${calEventRes.status}. Evento registrado en calendario oficial.`
    );

  } catch (error: any) {
    console.error('Error imprevisto en la ejecución de la suite:', error);
    recordResult('Ejecución global de suite', 'Suite', false, `Fallo imprevisto: ${error.message}`);
  } finally {
    // Cerrar servidor y base de datos de prueba
    await new Promise<void>((resolve) => server.close(() => resolve()));
    closeDatabase();
  }

  // Resumen Final
  console.log('\n================================================================');
  console.log('  RESUMEN FINAL DE LA SUITE DE PRUEBAS DE LA ETAPA 06');
  console.log('================================================================\n');

  const total = results.length;
  const passed = results.filter((r) => r.status === 'PASÓ').length;
  const failed = results.filter((r) => r.status === 'FALLÓ').length;

  console.log(`Total de pruebas ejecutadas: ${total}`);
  console.log(`Pruebas aprobadas (PASÓ):   ${passed}`);
  console.log(`Pruebas fallidas  (FALLÓ):  ${failed}\n`);

  if (failed === 0) {
    console.log('Todas las pruebas críticas de la ETAPA 06 fueron APROBADAS con éxito.\n');
    process.exit(0);
  } else {
    console.error(`Se detectaron ${failed} pruebas fallidas en la ETAPA 06.\n`);
    process.exit(1);
  }
}

runAllTests();
