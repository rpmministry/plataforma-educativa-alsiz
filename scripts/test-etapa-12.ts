/**
 * ==============================================================================
 * Suite de Pruebas Automatizadas — ETAPA 12 (ALSIZ / Ekballo Church)
 * Cursos Profesionales, Artes y Oficios: Catálogo, Módulos, Lecciones,
 * Inscripciones, Evaluaciones, Certificados Criptográficos con Descargo Legal
 * (Art. 32 MINEDUC-2023-00069-A), Control de Cupos e Informes de Curso
 * ==============================================================================
 */

import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { ContinuingEducationService, LEGAL_DISCLAIMER_CONTINUING_ED } from '../server/continuing-ed/continuingEducationService';
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

async function runTestSuite() {
  console.log('================================================================');
  console.log('  SUITE DE PRUEBAS AUTOMATIZADAS — ETAPA 12 (ALSIZ / EKBALLO)');
  console.log('  CURSOS PROFESIONALES, ARTES, OFICIOS Y FORMACIÓN CONTINUA');
  console.log('================================================================\n');

  // Entorno de prueba aislado
  const testDbDir = path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(testDbDir)) fs.mkdirSync(testDbDir, { recursive: true });
  const testDbPath = path.resolve(testDbDir, 'test_alsiz_etapa12_suite.db');

  closeDatabase();
  if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
  if (fs.existsSync(`${testDbPath}-wal`)) fs.unlinkSync(`${testDbPath}-wal`);
  if (fs.existsSync(`${testDbPath}-shm`)) fs.unlinkSync(`${testDbPath}-shm`);

  const db = initDatabase(testDbPath);
  runMigrations(db);

  const service = new ContinuingEducationService(db);

  // -------------------------------------------------------------
  // Test 1: Catálogo y Cursos Semilla Iniciales
  // -------------------------------------------------------------
  try {
    const catalog = service.getCourses();
    const hasInitialCourses = catalog.data.length >= 4;
    const categories = new Set(catalog.data.map((c: any) => c.category));
    const hasDiverseCategories =
      categories.has('OFICIOS') &&
      categories.has('TECNOLOGIA') &&
      categories.has('ARTES') &&
      categories.has('FORMACION_MINISTERIAL');

    recordResult(
      'Criterio 1: Carga de catálogo y cursos semilla canónicos',
      'Catálogo & Metadatos',
      hasInitialCourses && hasDiverseCategories,
      `${catalog.data.length} cursos encontrados. Categorías verificadas: ${Array.from(categories).join(', ')}`
    );
  } catch (err: any) {
    recordResult('Criterio 1: Carga de catálogo y cursos semilla', 'Catálogo & Metadatos', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 2: Filtros de Búsqueda (Categoría, Modalidad, Nivel, Texto)
  // -------------------------------------------------------------
  try {
    const oficiosFilter = service.getCourses({ category: 'OFICIOS' });
    const isOficiosOk = oficiosFilter.data.every((c: any) => c.category === 'OFICIOS') && oficiosFilter.data.length >= 1;

    const searchFilter = service.getCourses({ search: 'Python' });
    const isSearchOk = searchFilter.data.length >= 1 && searchFilter.data[0].code === 'TECH-DEV-201';

    const modalityFilter = service.getCourses({ modality: 'HYBRID' });
    const isModalityOk = modalityFilter.data.every((c: any) => c.modality === 'HYBRID') && modalityFilter.data.length >= 1;

    recordResult(
      'Criterio 2: Filtrado multicriterio de cursos (categoría, texto, modalidad)',
      'Catálogo & Metadatos',
      isOficiosOk && isSearchOk && isModalityOk,
      `Filtros de oficios (${oficiosFilter.data.length}), búsqueda por palabra clave (${searchFilter.data.length}) y modalidad híbrida (${modalityFilter.data.length}) comprobados`
    );
  } catch (err: any) {
    recordResult('Criterio 2: Filtrado multicriterio de cursos', 'Catálogo & Metadatos', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 3: Creación y Actualización de Curso por Administrador
  // -------------------------------------------------------------
  let createdCourseId = '';
  try {
    const newCourse = service.createCourse({
      code: 'OFIC-002',
      title: 'Instalaciones Eléctricas Residenciales y Domótica',
      category: 'OFICIOS',
      modality: 'HYBRID',
      level: 'INTERMEDIO',
      estimatedDurationHours: 60,
      instructorName: 'Ing. Mateo Proaño',
      instructorBio: 'Especialista en redes eléctricas de baja tensión y domótica residencial.',
      shortDescription: 'Taller práctico de diseño, cableado, tableros de breakers y seguridad eléctrica bajo normas NEC.',
      learningObjectives: ['Interpretar planos eléctricos unifilares', 'Calcular calibres y protecciones térmicas', 'Instalar módulos domóticos'],
      prerequisites: ['Conocimientos básicos de electricidad'],
      status: 'PUBLISHED',
      maxCapacity: 2, // Cupo limitado para probar control de cupos
      pricingType: 'FREE',
    }, 'usr-admin-01');

    createdCourseId = newCourse.id;

    const updated = service.updateCourse(createdCourseId, {
      fullDescription: 'Descripción extendida del programa con prácticas de laboratorio.',
    }, 'usr-admin-01');

    recordResult(
      'Criterio 3: Creación y actualización de curso con objetivos y prerrequisitos',
      'Gestión Administrativa',
      Boolean(newCourse.id && updated.full_description?.includes('laboratorio')),
      `Curso creado con código ${newCourse.code}, duración ${newCourse.estimated_duration_hours}h, cupo máx: ${newCourse.max_capacity}`
    );
  } catch (err: any) {
    recordResult('Criterio 3: Creación y actualización de curso', 'Gestión Administrativa', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 4: Estructura Modular y Creación de Lecciones
  // -------------------------------------------------------------
  let moduleId1 = '';
  let lessonId1 = '';
  let lessonId2 = '';
  try {
    const mod1 = service.createModule(createdCourseId, {
      title: 'Módulo 1: Fundamentos de Circuitos y Seguridad Eléctrica',
      description: 'Reglas de oro, equipo de protección y dimensionamiento de cables.',
      orderIndex: 1,
    });
    moduleId1 = (mod1 as any).id;

    const less1 = service.createLesson(moduleId1, {
      title: 'Lección 1: Las 5 Reglas de Oro de la Seguridad Eléctrica',
      lessonType: 'VIDEO',
      contentMarkdown: '# 5 Reglas de Oro\n1. Desconectar\n2. Prevenir reconexión...',
      estimatedMinutes: 45,
      orderIndex: 1,
    });
    lessonId1 = (less1 as any).id;

    const less2 = service.createLesson(moduleId1, {
      title: 'Lección 2: Práctica de Tablero de Distribución y Conexión de Breakers',
      lessonType: 'PRACTICE',
      contentMarkdown: '# Práctica de Taller\nMontaje de riel DIN y breaker termomagnético...',
      estimatedMinutes: 90,
      orderIndex: 2,
    });
    lessonId2 = (less2 as any).id;

    const enrichedCourse = service.getCourseById(createdCourseId);
    const hasModulesAndLessons =
      enrichedCourse.modules.length >= 1 &&
      enrichedCourse.modules[0].lessons.length === 2;

    recordResult(
      'Criterio 4: Estructura jerárquica Curso -> Módulos -> Lecciones',
      'Contenidos & Estructura',
      hasModulesAndLessons,
      `Módulo '${(mod1 as any).title}' con 2 lecciones vinculadas correctamente`
    );
  } catch (err: any) {
    recordResult('Criterio 4: Estructura jerárquica Curso -> Módulos -> Lecciones', 'Contenidos & Estructura', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 5: Inscripción de Usuario Sintético y Validación de Cupos
  // -------------------------------------------------------------
  let enrollment1Id = '';
  try {
    // Inscripción de usuario 1 (usr-stu-01)
    const enr1 = service.enrollUser(createdCourseId, 'usr-stu-01');
    enrollment1Id = enr1.id;

    // Inscripción de usuario 2 (usr-stu-02)
    service.enrollUser(createdCourseId, 'usr-stu-02');

    // Intento de inscripción de usuario 3 (debe fallar por max_capacity = 2)
    let rejectedByCapacity = false;
    try {
      service.enrollUser(createdCourseId, 'usr-rep-01');
    } catch (e: any) {
      if (e.message.includes('cupo máximo')) {
        rejectedByCapacity = true;
      }
    }

    recordResult(
      'Criterio 5: Inscripción de usuarios y salvaguarda estricta de cupo máximo',
      'Inscripciones & Cupos',
      Boolean(enr1.id) && rejectedByCapacity,
      `2 participantes inscritos. Tercer intento rechazado exitosamente por límite de cupo`
    );
  } catch (err: any) {
    recordResult('Criterio 5: Inscripción y control de cupos', 'Inscripciones & Cupos', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 6: Registro de Progreso Dinámico de Lecciones
  // -------------------------------------------------------------
  try {
    // Completar lección 1 -> debe dar 50%
    const prog1 = service.markLessonComplete(enrollment1Id, lessonId1, 'usr-stu-01');
    const isHalfDone = prog1.progressPercent === 50 && prog1.completedLessons === 1;

    // Completar lección 2 -> debe dar 100%
    const prog2 = service.markLessonComplete(enrollment1Id, lessonId2, 'usr-stu-01');
    const isFullyDone = prog2.progressPercent === 100 && prog2.completedLessons === 2 && prog2.isCourseFullyLearned;

    const currentEnrollment = service.getEnrollmentById(enrollment1Id);
    const enrollmentMatches = Number(currentEnrollment.progress_percent) === 100;

    recordResult(
      'Criterio 6: Cálculo dinámico y en tiempo real del progreso del estudiante',
      'Progreso & Avance',
      isHalfDone && isFullyDone && enrollmentMatches,
      `Avance calculado: 50% tras lección 1, 100% tras lección 2 (${prog2.completedLessons}/${prog2.totalLessons} lecciones)`
    );
  } catch (err: any) {
    recordResult('Criterio 6: Cálculo dinámico del progreso', 'Progreso & Avance', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 7: Evaluación Práctica / Examen de Finalización
  // -------------------------------------------------------------
  let evaluationId = '';
  let submissionId = '';
  try {
    const evaluation = service.createEvaluation(createdCourseId, {
      title: 'Proyecto Práctico Final: Cableado de Tablero Domótico',
      description: 'Entrega de memoria técnica con diagrama de conexiones y video demostrativo de funcionamiento.',
      evaluationType: 'PRACTICAL_PROJECT',
      passingScore: 7.00,
      maxScore: 10.00,
    });
    evaluationId = (evaluation as any).id;

    // Estudiante envía la entrega
    const submission = service.submitEvaluation(
      evaluationId,
      enrollment1Id,
      'usr-stu-01',
      'Memoria técnica entregada: tablero balanceado con 4 circuitos ramales y breaker GFCI. Enlace al video de prueba funcional.'
    );
    submissionId = (submission as any).id;

    // Docente califica con nota aprobatoria (9.5 / 10)
    const gradeResult = service.gradeEvaluation(
      submissionId,
      9.50,
      'Excelente distribución de cargas y apego a las 5 reglas de seguridad eléctrica.',
      'usr-teacher-01'
    );

    recordResult(
      'Criterio 7: Evaluación práctica, entrega estudiantil y calificación docente',
      'Evaluaciones & Calificación',
      Boolean(submissionId && gradeResult.isPassed && gradeResult.score === 9.5),
      `Proyecto práctico evaluado: Nota 9.50 / 10.00 (mínimo aprobatorio: 7.00). Aprobado: ${gradeResult.isPassed}`
    );
  } catch (err: any) {
    recordResult('Criterio 7: Evaluación práctica y calificación', 'Evaluaciones & Calificación', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 8: Emisión y Firma Criptográfica del Certificado No Formal
  // -------------------------------------------------------------
  let certificateData: any = null;
  try {
    certificateData = service.issueCertificate(enrollment1Id, 'usr-admin-01');

    const hasCode = Boolean(certificateData.certificate_code?.startsWith('CERT-OFIC-2026-'));
    const hasHash = Boolean(certificateData.verification_hash_sha256?.length === 64);
    const hasLegalDisclaimer = certificateData.disclaimer_legal === LEGAL_DISCLAIMER_CONTINUING_ED;
    const mentionsMineducArt32 = certificateData.disclaimer_legal.includes('Art. 32 del Acuerdo Ministerial MINEDUC-2023-00069-A');
    const mentionsNotOfficialDegree = certificateData.disclaimer_legal.includes('no constituye título oficial de bachillerato');

    recordResult(
      'Criterio 8: Emisión de certificado no formal con hash SHA-256 y descargo legal',
      'Certificados & Marco Legal',
      hasCode && hasHash && hasLegalDisclaimer && mentionsMineducArt32 && mentionsNotOfficialDegree,
      `Código: ${certificateData.certificate_code}, Hash SHA-256: ${certificateData.verification_hash_sha256.substring(0, 16)}..., Descargo Art. 32 verificado`
    );
  } catch (err: any) {
    recordResult('Criterio 8: Emisión de certificado no formal', 'Certificados & Marco Legal', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 9: Verificación Pública de Certificado (Por Código y por Hash)
  // -------------------------------------------------------------
  try {
    const verifyByCode = service.verifyCertificate(certificateData.certificate_code);
    const verifyByHash = service.verifyCertificate(certificateData.verification_hash_sha256);
    const verifyInvalid = service.verifyCertificate('CERT-FAKE-9999-XXXXXX');

    const isValidOk =
      verifyByCode.isValid &&
      verifyByHash.isValid &&
      !verifyInvalid.isValid &&
      verifyByCode.studentFullName.length > 0 &&
      verifyByCode.hoursCompleted === 60;

    recordResult(
      'Criterio 9: Verificación pública universal de certificados (código y hash SHA-256)',
      'Certificados & Marco Legal',
      isValidOk,
      `Verificación por código: ${verifyByCode.isValid}, por hash: ${verifyByHash.isValid}, código inexistente rechazado: ${!verifyInvalid.isValid}`
    );
  } catch (err: any) {
    recordResult('Criterio 9: Verificación pública universal', 'Certificados & Marco Legal', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 10: Métricas e Informes Analíticos de Curso
  // -------------------------------------------------------------
  try {
    const report = service.getCourseReport(createdCourseId);
    const isReportAccurate =
      report.totalEnrolled === 2 &&
      report.completedParticipants === 1 &&
      report.activeParticipants === 1 &&
      report.completionRatePercent === 50 &&
      report.certificatesIssued === 1 &&
      report.averageEvaluationScore === 9.5;

    recordResult(
      'Criterio 10: Informe analítico de desempeño y finalización del curso',
      'Informes & Analítica',
      isReportAccurate,
      `Inscritos: ${report.totalEnrolled}, Finalizados: ${report.completedParticipants}, Tasa finalización: ${report.completionRatePercent}%, Certificados: ${report.certificatesIssued}`
    );
  } catch (err: any) {
    recordResult('Criterio 10: Informe analítico de curso', 'Informes & Analítica', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 11: Idempotencia en la Emisión de Certificados
  // -------------------------------------------------------------
  try {
    const secondCallCert = service.issueCertificate(enrollment1Id, 'usr-admin-01');
    const isIdempotent = secondCallCert.id === certificateData.id && secondCallCert.certificate_code === certificateData.certificate_code;

    recordResult(
      'Criterio 11: Idempotencia en emisión de certificados ante reintentos',
      'Certificados & Marco Legal',
      isIdempotent,
      `Reintento devolvió el certificado previamente generado sin duplicar registros en base de datos`
    );
  } catch (err: any) {
    recordResult('Criterio 11: Idempotencia en emisión de certificados', 'Certificados & Marco Legal', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 12: Separación Académica Estricta respecto a K-12 Homeschool
  // -------------------------------------------------------------
  try {
    // Verificar que las tablas escolares no tienen contaminación de continuing_courses
    const k12SubjectsCount = (db.prepare("SELECT COUNT(*) as c FROM subjects WHERE code LIKE 'OFIC-%' OR code LIKE 'TECH-%'").get() as any)?.c;
    const k12Enrollments = (db.prepare("SELECT COUNT(*) as c FROM student_subject_enrollments WHERE subject_id LIKE 'course-%'").get() as any)?.c;
    const k12Programs = (db.prepare("SELECT COUNT(*) as c FROM programs WHERE code = 'OFIC-002'").get() as any)?.c;

    const isStrictlySeparated = k12SubjectsCount === 0 && k12Enrollments === 0 && k12Programs === 0;

    recordResult(
      'Criterio 12: Aislamiento arquitectónico y separación de malla K-12 EGB',
      'Separación Académica',
      isStrictlySeparated,
      `Cero contaminación en tabla 'subjects' (${k12SubjectsCount}), cero en 'student_subject_enrollments' (${k12Enrollments}), cero en 'programs' (${k12Programs})`
    );
  } catch (err: any) {
    recordResult('Criterio 12: Aislamiento arquitectónico', 'Separación Académica', false, err.message);
  }

  // -------------------------------------------------------------
  // Resumen Final
  // -------------------------------------------------------------
  console.log('\n================================================================');
  console.log('  RESUMEN DE PRUEBAS AUTOMATIZADAS — ETAPA 12');
  console.log('================================================================');

  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;

  console.log(`Total Pruebas: ${total} | Aprobadas: ${passed} | Fallidas: ${failed}`);

  if (failed > 0) {
    console.error('\n❌ LA SUITE DE PRUEBAS DE LA ETAPA 12 FALLÓ.');
    process.exit(1);
  } else {
    console.log('\n✅ TODAS LAS PRUEBAS DE LA ETAPA 12 PASARON SATISFACTORIAMENTE.');
  }
}

runTestSuite().catch((e) => {
  console.error('Error fatal ejecutando suite de prueba Etapa 12:', e);
  process.exit(1);
});
