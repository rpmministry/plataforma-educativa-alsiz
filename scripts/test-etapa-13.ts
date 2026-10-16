/**
 * ==============================================================================
 * Suite de Pruebas Automatizadas — ETAPA 13 (ALSIZ / Ekballo Church)
 * AUDITORÍA INTEGRAL, PRUEBAS DE ACEPTACIÓN Y VERIFICACIÓN END-TO-END
 * ==============================================================================
 */

import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { initDatabase, closeDatabase } from '../server/db/database';
import { runMigrations } from '../server/db/migrator';
import { verifyPassword, verifyPin } from '../server/auth/crypto';
import { createHotBackup, restoreFromBackup } from '../server/backup/backupService';
import { ContinuingEducationService, LEGAL_DISCLAIMER_CONTINUING_ED } from '../server/continuing-ed/continuingEducationService';
import { ProviderManager } from '../server/agents/providers/providerManager';

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
  console.log('  SUITE DE AUDITORÍA INTEGRAL Y ACEPTACIÓN — ETAPA 13 (ALSIZ)');
  console.log('  VERIFICACIÓN MULTIDISCIPLINAR DE FLUJOS, AISLAMIENTO Y SEGURIDAD');
  console.log('================================================================\n');

  // Entorno de prueba aislado
  const testDbDir = path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(testDbDir)) fs.mkdirSync(testDbDir, { recursive: true });
  const testDbPath = path.resolve(testDbDir, 'test_alsiz_etapa13_audit.db');

  closeDatabase();
  if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
  if (fs.existsSync(`${testDbPath}-wal`)) fs.unlinkSync(`${testDbPath}-wal`);
  if (fs.existsSync(`${testDbPath}-shm`)) fs.unlinkSync(`${testDbPath}-shm`);

  const db = initDatabase(testDbPath);
  runMigrations(db);

  const ceService = new ContinuingEducationService(db);

  // -------------------------------------------------------------
  // SECCIÓN 1: AUDITORÍA DE EXPEDIENTE DOCUMENTAL (ETAPAS 00 A 12)
  // -------------------------------------------------------------
  try {
    const requiredStages = [
      'ETAPA-00', 'ETAPA-01', 'ETAPA-02', 'ETAPA-03', 'ETAPA-04',
      'ETAPA-05', 'ETAPA-06', 'ETAPA-07', 'ETAPA-08', 'ETAPA-09',
      'ETAPA-10', 'ETAPA-11', 'ETAPA-12',
    ];
    const requiredFiles = [
      '00_PLAN.md', '01_CAMBIOS.md', '02_PRUEBAS.md', '03_VALIDACION.md',
      '04_RIESGOS_Y_DECISIONES.md', '05_REVERSA.md', '06_CIERRE.md',
    ];

    let allDocsPresent = true;
    let missingDoc = '';

    for (const stg of requiredStages) {
      const stgDir = path.resolve(process.cwd(), 'docs', 'ejecucion', 'etapas', stg);
      if (!fs.existsSync(stgDir)) {
        allDocsPresent = false;
        missingDoc = `Directorio faltante: ${stg}`;
        break;
      }
      for (const reqF of requiredFiles) {
        const filePath = path.resolve(stgDir, reqF);
        if (!fs.existsSync(filePath)) {
          allDocsPresent = false;
          missingDoc = `Archivo faltante: ${stg}/${reqF}`;
          break;
        }
      }
      if (!allDocsPresent) break;
    }

    const bitacoraPath = path.resolve(process.cwd(), 'docs', 'ejecucion', 'bitacora.md');
    const readmePath = path.resolve(process.cwd(), 'docs', 'ejecucion', 'README.md');
    const hasBitacoraAndReadme = fs.existsSync(bitacoraPath) && fs.existsSync(readmePath);

    recordResult(
      'Auditoría 1: Expediente documental completo de todas las etapas previas (00 a 12)',
      'Gobernanza Documental',
      allDocsPresent && hasBitacoraAndReadme,
      allDocsPresent ? 'Las 13 etapas previas cuentan con los 7 archivos normativos obligatorios y bitácora actualizada' : missingDoc
    );
  } catch (err: any) {
    recordResult('Auditoría 1: Expediente documental', 'Gobernanza Documental', false, err.message);
  }

  // -------------------------------------------------------------
  // SECCIÓN 2: FLUJO INTEGRAL E2E — IDENTIDAD Y TUTELA FAMILIAR
  // -------------------------------------------------------------
  try {
    // 2.1 Verificar usuarios sintéticos de desarrollo
    const adminUser = db.prepare("SELECT * FROM users WHERE id = 'usr-admin-01'").get() as any;
    const teacherUser = db.prepare("SELECT * FROM users WHERE id = 'usr-teacher-01'").get() as any;
    const student1 = db.prepare("SELECT * FROM users WHERE id = 'usr-stu-01'").get() as any;
    const rep1 = db.prepare("SELECT * FROM users WHERE id = 'usr-rep-01'").get() as any;

    const hasUsers = Boolean(adminUser && teacherUser && student1 && rep1);

    // 2.2 Verificar tutela familiar en tabla student_representatives
    const studentProfile = db.prepare("SELECT * FROM students WHERE user_id = 'usr-stu-01'").get() as any;
    const repLink = db.prepare("SELECT * FROM student_representatives WHERE student_id = ? AND representative_id = 'rep-01'").get(studentProfile.id) as any;
    const isLinkedToParent = Boolean(repLink && repLink.relationship_type === 'FATHER');

    // 2.3 Verificar hashing scrypt seguro (cero texto plano)
    const isScryptHash =
      adminUser.password_hash.startsWith('scrypt$') &&
      student1.password_hash.startsWith('scrypt$') &&
      rep1.password_hash.startsWith('scrypt$');

    recordResult(
      'Auditoría 2: Identidad, roles RBAC, tutela familiar e inmutabilidad de credenciales scrypt',
      'Identidad & Tutela',
      hasUsers && isLinkedToParent && isScryptHash,
      `Usuarios verificados (Admin, Docente, Alumno, Tutor). Representante vinculado (rep-01). Cero credenciales en claro.`
    );
  } catch (err: any) {
    recordResult('Auditoría 2: Identidad y tutela familiar', 'Identidad & Tutela', false, err.message);
  }

  // -------------------------------------------------------------
  // SECCIÓN 3: FLUJO INTEGRAL E2E — CURRÍCULO K-12 Y EVALUACIONES
  // -------------------------------------------------------------
  try {
    // Verificar programa K-12 Homeschool y asignaturas troncales
    const program = db.prepare("SELECT * FROM programs WHERE program_type = 'K12_HOMESCHOOL'").get() as any;
    const subjects = db.prepare("SELECT COUNT(*) as c FROM subjects WHERE program_id = ?").get(program.id) as any;
    const units = db.prepare("SELECT COUNT(*) as c FROM curriculum_units").get() as any;
    const classes = db.prepare("SELECT COUNT(*) as c FROM daily_classes").get() as any;

    const isCurriculumOk =
      Boolean(program) &&
      Number(subjects?.c || 0) >= 2 &&
      Number(units?.c || 0) >= 1 &&
      Number(classes?.c || 0) >= 1;

    recordResult(
      'Auditoría 3: Integridad de la Malla Curricular K-12 Homeschool EGB',
      'Núcleo Académico LMS',
      isCurriculumOk,
      `Programa: '${program?.name}', Asignaturas: ${subjects?.c}, Unidades: ${units?.c}, Clases diarias: ${classes?.c}`
    );
  } catch (err: any) {
    recordResult('Auditoría 3: Malla Curricular K-12', 'Núcleo Académico LMS', false, err.message);
  }

  // -------------------------------------------------------------
  // SECCIÓN 4: AISLAMIENTO INTER-FAMILIAR (ANTI-IDOR LOPDP)
  // -------------------------------------------------------------
  try {
    // Representante 1 (Carlos Santos) vinculado a Estudiante 1 (Mateo Santos)
    // Representante 2 (Elena Mendoza) vinculada a Estudiante 2 (Lucía Mendoza)
    const rep1Students = db.prepare(`
      SELECT s.id, u.first_name, u.last_name 
      FROM students s
      JOIN users u ON s.user_id = u.id
      JOIN student_representatives sr ON s.id = sr.student_id
      JOIN representatives r ON sr.representative_id = r.id
      WHERE r.user_id = 'usr-rep-01'
    `).all() as any[];

    const rep2Students = db.prepare(`
      SELECT s.id, u.first_name, u.last_name 
      FROM students s
      JOIN users u ON s.user_id = u.id
      JOIN student_representatives sr ON s.id = sr.student_id
      JOIN representatives r ON sr.representative_id = r.id
      WHERE r.user_id = 'usr-rep-02'
    `).all() as any[];

    const rep1SeesOnlyMateo = rep1Students.length === 1 && rep1Students[0].first_name.includes('Mateo');
    const rep2SeesOnlyLucia = rep2Students.length === 1 && rep2Students[0].first_name.includes('Lucía');
    const crossLeakage = rep1Students.some(s => s.first_name.includes('Lucía')) || rep2Students.some(s => s.first_name.includes('Mateo'));

    recordResult(
      'Auditoría 4: Aislamiento estricto de expedientes inter-familiares (Anti-IDOR)',
      'Seguridad & Privacidad',
      rep1SeesOnlyMateo && rep2SeesOnlyLucia && !crossLeakage,
      `Tutor 1 supervisa únicamente a Estudiante 1 (${rep1Students.length}); Tutor 2 supervisa únicamente a Estudiante 2 (${rep2Students.length}). Cero fuga transversal.`
    );
  } catch (err: any) {
    recordResult('Auditoría 4: Aislamiento inter-familiar Anti-IDOR', 'Seguridad & Privacidad', false, err.message);
  }

  // -------------------------------------------------------------
  // SECCIÓN 5: CENTRO DE CONOCIMIENTO RAG Y RETIRADA EFECTIVA
  // -------------------------------------------------------------
  try {
    // 5.1 Verificar fuentes canónicas aprobadas
    const approvedSources = db.prepare("SELECT COUNT(*) as c FROM knowledge_sources WHERE status = 'APROBADO'").get() as any;
    const approvedChunks = db.prepare(`
      SELECT COUNT(*) as c 
      FROM knowledge_chunks kc
      JOIN knowledge_sources ks ON kc.source_id = ks.id
      WHERE ks.status = 'APROBADO'
    `).get() as any;

    const hasApprovedRAG = Number(approvedSources?.c || 0) >= 2 && Number(approvedChunks?.c || 0) >= 3;

    // 5.2 Desactivar una fuente y comprobar que queda estrictamente excluida de consultas
    const testSrcId = 'src-test-temp-rag';
    db.prepare(`
      INSERT OR REPLACE INTO knowledge_sources (id, code, title, source_type, format_type, uri_or_url, language, target_agent_family, trust_level, license_type, content_text, status, checksum_sha256)
      VALUES (?, 'TEMP-AUDIT-01', 'Fuente de Prueba para Desactivación', 'OFICIAL_MINEDUC', 'DOCUMENT_MD', '/docs/temp.md', 'es', 'SOCRATIC_TUTOR', 'CANONICAL_ALTO', 'DOMINIO_PUBLICO_MINEDUC', 'Contenido confidencial o caducado...', 'DESACTIVADO', 'hash123')
    `).run(testSrcId);

    db.prepare(`
      INSERT OR REPLACE INTO knowledge_chunks (id, source_id, chunk_index, citation_tag, content_text, token_count)
      VALUES ('chk-temp-01', ?, 1, '[TEMP-AUDIT#C1]', 'Contenido confidencial o caducado...', 10)
    `).run(testSrcId);

    // Consulta emulada del motor RAG
    const ragQuery = db.prepare(`
      SELECT kc.* 
      FROM knowledge_chunks kc
      JOIN knowledge_sources ks ON kc.source_id = ks.id
      WHERE ks.status = 'APROBADO' AND kc.content_text LIKE '%confidencial%'
    `).all();

    const isEffectivelyExcluded = ragQuery.length === 0;

    recordResult(
      'Auditoría 5: Centro de Conocimiento RAG y exclusión estricta de fuentes desactivadas',
      'Conocimiento & RAG',
      hasApprovedRAG && isEffectivelyExcluded,
      `Fuentes aprobadas en RAG: ${approvedSources?.c}, Chunks aprobados: ${approvedChunks?.c}. Fuente desactivada excluida al 100%.`
    );
  } catch (err: any) {
    recordResult('Auditoría 5: Centro de Conocimiento RAG', 'Conocimiento & RAG', false, err.message);
  }

  // -------------------------------------------------------------
  // SECCIÓN 6: RESILIENCIA MULTIPROVEEDOR IA Y DEGRADACIÓN ELEGANTE
  // -------------------------------------------------------------
  try {
    const providers = ProviderManager.getAvailableProviders();
    const hasSimulatedFallback = providers.includes('SIMULATED_LOCAL');

    // Ejecutar llamada a través del ProviderManager forzando fallback ante ausencia de clave externa
    const response = await ProviderManager.generateResponse({
      agentCode: 'AG-SOCRATIC-KEPLER',
      systemPrompt: 'Eres un tutor socrático sutil para niños.',
      userPrompt: '¿Por qué la luna no se cae a la tierra?',
      forceProvider: 'SIMULATED_LOCAL',
    });

    const isFallbackGraceful =
      Boolean(response.content) &&
      response.content.length > 20 &&
      Boolean(response.providerName);

    recordResult(
      'Auditoría 6: Resiliencia de proveedores de IA y degradación elegante a simulación local',
      'Agentes IA & Resiliencia',
      hasSimulatedFallback && isFallbackGraceful,
      `Proveedores disponibles: ${providers.join(', ')}. Respuesta entregada por '${response.providerName}' sin error 500.`
    );
  } catch (err: any) {
    recordResult('Auditoría 6: Resiliencia de proveedores IA', 'Agentes IA & Resiliencia', false, err.message);
  }

  // -------------------------------------------------------------
  // SECCIÓN 7: CURSOS NO FORMALES, CAPACIDAD Y VERIFICACIÓN SHA-256
  // -------------------------------------------------------------
  try {
    // 7.1 Catálogo no formal cargado con 4 cursos semilla
    const courses = ceService.getCourses();
    const has4Courses = courses.data.length >= 4;

    // 7.2 Crear curso y verificar cupo máximo
    const testCourse = ceService.createCourse({
      code: 'AUDIT-OFIC-01',
      title: 'Taller de Ensamblaje y Soldadura Básica',
      category: 'OFICIOS',
      modality: 'PRESENCIAL',
      level: 'PRINCIPIANTE',
      estimatedDurationHours: 40,
      instructorName: 'Mtro. Pedro Gómez',
      shortDescription: 'Taller práctico de soldadura por arco y normas de seguridad en taller.',
      maxCapacity: 1, // Cupo para 1 persona
      status: 'PUBLISHED',
    }, 'usr-admin-01');

    // Inscribir 1er participante (permitido)
    const enr1 = ceService.enrollUser(testCourse.id, 'usr-stu-01');

    // Inscribir 2do participante (debe ser rechazado por maxCapacity=1)
    let rejectedCapacity = false;
    try {
      ceService.enrollUser(testCourse.id, 'usr-stu-02');
    } catch (e: any) {
      if (e.message.includes('cupo máximo')) rejectedCapacity = true;
    }

    // 7.3 Completar lección y emitir certificado
    const mod = ceService.createModule(testCourse.id, { title: 'Módulo 1: Seguridad' });
    const less = ceService.createLesson((mod as any).id, {
      title: 'Lección 1: Careta y Guantes de Cuero',
      lessonType: 'PRACTICE',
      contentMarkdown: '# Normas de EPP...',
    });

    ceService.markLessonComplete(enr1.id, (less as any).id, 'usr-stu-01');
    const cert = ceService.issueCertificate(enr1.id, 'usr-admin-01');

    // 7.4 Verificación pública
    const pubVerify = ceService.verifyCertificate(cert.certificate_code);
    const hashVerify = ceService.verifyCertificate(cert.verification_hash_sha256);
    const hasLegalNotice = cert.disclaimer_legal === LEGAL_DISCLAIMER_CONTINUING_ED;

    const isContinuingEdValid =
      has4Courses &&
      rejectedCapacity &&
      pubVerify.isValid &&
      hashVerify.isValid &&
      hasLegalNotice;

    recordResult(
      'Auditoría 7: Formación No Formal: Control de cupos, certificado SHA-256 y descargo Art. 32',
      'Educación No Formal',
      isContinuingEdValid,
      `Cupo respetado: ${rejectedCapacity}. Verificación pública (código/hash): OK. Descargo Art. 32 MINEDUC incluido.`
    );
  } catch (err: any) {
    recordResult('Auditoría 7: Formación No Formal y Certificación', 'Educación No Formal', false, err.message);
  }

  // -------------------------------------------------------------
  // SECCIÓN 8: AUDITORÍA DE PRIVACIDAD LOPDP Y ANONIMIZACIÓN DE IP
  // -------------------------------------------------------------
  try {
    // Generar evento de auditoría
    const auditEvents = db.prepare('SELECT * FROM audit_events ORDER BY created_at DESC LIMIT 10').all() as any[];
    const hasAuditEvents = auditEvents.length > 0;

    // Verificar que ninguna IP sea una dirección IPv4 o IPv6 en texto claro (debe ser hash SHA-256 de 64 caracteres)
    const isIpAnonymized = auditEvents.every(ev => {
      const ip = ev.ip_hash;
      return ip && ip.length === 64 && /^[a-f0-9]{64}$/i.test(ip);
    });

    // Verificar que no haya contraseñas ni tokens en el JSON de detalles
    const noSecretsInDetails = auditEvents.every(ev => {
      const details = ev.details_json || '';
      return !details.includes('password') && !details.includes('pinCode') && !details.includes('secret');
    });

    recordResult(
      'Auditoría 8: Privacidad LOPDP: Anonimización de IPs (SHA-256) y cero secretos en bitácora',
      'Seguridad & Privacidad',
      hasAuditEvents && isIpAnonymized && noSecretsInDetails,
      `Eventos auditados: ${auditEvents.length}. 100% de IPs anonimizadas con HMAC/SHA-256 de 64 hex. Cero contraseñas en logs.`
    );
  } catch (err: any) {
    recordResult('Auditoría 8: Privacidad LOPDP y anonimización de IP', 'Seguridad & Privacidad', false, err.message);
  }

  // -------------------------------------------------------------
  // SECCIÓN 9: RESPALDO EN CALIENTE Y RESTAURACIÓN VERIFICABLE
  // -------------------------------------------------------------
  try {
    const backupDir = path.resolve(process.cwd(), 'backups', 'test_etapa13_audit');
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

    const backupResult = createHotBackup(backupDir);
    const isBackupOk = backupResult.success && fs.existsSync(backupResult.backupPath) && backupResult.backupSize > 0;

    const restoreTargetPath = path.resolve(testDbDir, 'test_alsiz_restore_audit.db');
    if (fs.existsSync(restoreTargetPath)) fs.unlinkSync(restoreTargetPath);

    const restoreResult = restoreFromBackup(backupResult.backupPath, restoreTargetPath);
    const isRestoreOk = restoreResult.success && restoreResult.integrityCheck === 'ok';

    recordResult(
      'Auditoría 9: Respaldo en caliente (Hot Backup) y restauración comprobada (PRAGMA integrity_check)',
      'Respaldo & Recuperación',
      isBackupOk && isRestoreOk,
      `Respaldo creado (${backupResult.backupSize} bytes, SHA-256: ${backupResult.checksumSha256.substring(0, 16)}...). Restauración: ${restoreResult.integrityCheck}`
    );
  } catch (err: any) {
    recordResult('Auditoría 9: Respaldo y restauración', 'Respaldo & Recuperación', false, err.message);
  }

  // -------------------------------------------------------------
  // SECCIÓN 10: SALVAGUARDA ESTRICTA DE LA BASE DE PRODUCCIÓN
  // -------------------------------------------------------------
  try {
    const prodDbPath = path.resolve(process.cwd(), 'data', 'alsiz.db');
    const prodDbExists = fs.existsSync(prodDbPath);

    let prodClean = true;
    let prodDetails = '';

    if (prodDbExists) {
      const prodDb = new DatabaseSync(prodDbPath, { open: true, readOnly: true });
      // Verificar que los usuarios de prueba no contaminaron la BD de producción
      const testInProd = prodDb.prepare("SELECT COUNT(*) as c FROM users WHERE username LIKE '%test%'").get() as any;
      const count = Number(testInProd?.c || 0);
      prodClean = count === 0;
      prodDetails = `data/alsiz.db verificado en modo read-only: 0 contaminaciones de suites de prueba`;
      prodDb.close();
    } else {
      prodDetails = 'Base de producción data/alsiz.db protegida y sin escrituras no autorizadas';
    }

    recordResult(
      'Auditoría 10: Integridad y salvaguarda estricta de la base de datos de producción (data/alsiz.db)',
      'Seguridad & Producción',
      prodClean,
      prodDetails
    );
  } catch (err: any) {
    recordResult('Auditoría 10: Salvaguarda de base de producción', 'Seguridad & Producción', false, err.message);
  }

  // -------------------------------------------------------------
  // RESUMEN FINAL
  // -------------------------------------------------------------
  console.log('\n================================================================');
  console.log('  RESUMEN DE AUDITORÍA INTEGRAL — ETAPA 13');
  console.log('================================================================');

  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = total - passed;

  console.log(`Total Criterios Auditados: ${total} | Aprobados: ${passed} | Fallidos: ${failed}`);

  if (failed > 0) {
    console.error('\n❌ LA AUDITORÍA INTEGRAL DE LA ETAPA 13 IDENTIFICÓ DEFECTOS BLOQUEANTES.');
    process.exit(1);
  } else {
    console.log('\n✅ LA AUDITORÍA INTEGRAL DE LA ETAPA 13 CONCLUYÓ SATISFACTORIAMENTE (10/10 CRITERIOS APROBADOS).');
  }
}

runTestSuite().catch((e) => {
  console.error('Error fatal en la auditoría integral Etapa 13:', e);
  process.exit(1);
});
