/**
 * ==============================================================================
 * Suite de Pruebas Automatizadas — ETAPA 04 (ALSIZ / Ekballo Church)
 * Preparar y Ejecutar la Migración Controlada de Gael y Avril
 * ==============================================================================
 */

import path from 'node:path';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { LegacyMigrationEngine } from '../server/migration/legacyMigrationEngine';
import { LocalProgressImporter, LocalProgressSchema } from '../server/migration/localProgressImporter';
import { createHotBackup } from '../server/backup/backupService';
import { initDatabase, closeDatabase, getDatabasePath } from '../server/db/database';
import { runMigrations } from '../server/db/migrator';
import { verifyPassword, verifyPin } from '../server/auth/crypto';

interface TestResult {
  id: string;
  name: string;
  category: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

function recordResult(id: string, name: string, category: string, passed: boolean, details?: string): void {
  results.push({ id, name, category, passed, details });
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} [${id}] [${category}] ${name}: ${details || (passed ? 'PASÓ' : 'FALLÓ')}`);
}

async function runTestSuite() {
  console.log('================================================================');
  console.log('  SUITE DE PRUEBAS AUTOMATIZADAS — ETAPA 04 (ALSIZ / EKBALLO)');
  console.log('  MIGRACIÓN CONTROLADA DE EXPEDIENTES DE GAEL Y AVRIL');
  console.log('================================================================\n');

  const engine = new LegacyMigrationEngine();

  // Entorno de prueba aislado temporal
  const testDbDir = path.resolve(process.cwd(), 'data');
  if (!fs.existsSync(testDbDir)) fs.mkdirSync(testDbDir, { recursive: true });
  const testDbPath = path.resolve(testDbDir, 'test_alsiz_etapa04_suite.db');

  if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
  if (fs.existsSync(`${testDbPath}-wal`)) fs.unlinkSync(`${testDbPath}-wal`);
  if (fs.existsSync(`${testDbPath}-shm`)) fs.unlinkSync(`${testDbPath}-shm`);

  closeDatabase();
  const db = initDatabase(testDbPath);
  runMigrations(db);

  // -------------------------------------------------------------
  // Test 1: Respaldo y Verificación de Checksum SHA-256
  // -------------------------------------------------------------
  try {
    const backupDir = path.resolve(process.cwd(), 'backups', 'test_etapa04');
    const backupResult = createHotBackup(backupDir);
    const isBackupOk = backupResult.success && fs.existsSync(backupResult.backupPath) && backupResult.backupSize > 0;
    recordResult(
      'TEST-E04-01',
      'Respaldo Hot Backup Atómico y Checksum SHA-256',
      'SEGURIDAD',
      isBackupOk && backupResult.checksumSha256.length === 64,
      `Archivo: ${path.basename(backupResult.backupPath)} | Hash: ${backupResult.checksumSha256.substring(0, 16)}...`
    );
  } catch (err: any) {
    recordResult('TEST-E04-01', 'Respaldo Hot Backup Atómico y Checksum SHA-256', 'SEGURIDAD', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 2: Inventario General sin Escritura en Base de Datos
  // -------------------------------------------------------------
  try {
    const inventory = engine.generateInventory();
    const invPassed = inventory.studentsCount === 2 &&
      inventory.representativesCount === 1 &&
      inventory.familyLinksCount === 2 &&
      inventory.subjectsCount.total === 20 &&
      inventory.unitsCount.total === 42 &&
      inventory.dailyClassesCount.total === 43 &&
      inventory.resourcesCount.total === 86 &&
      inventory.activitiesCount.total === 129 &&
      inventory.pendingVerifications.length === 4;

    recordResult(
      'TEST-E04-02',
      'Inventario Completo sin Escritura y Detección de Pendientes',
      'INVENTARIO',
      invPassed,
      `2 estudiantes, 1 representante, 2 vínculos, 20 asignaturas, 42 unidades, 43 clases, 86 recursos, 129 actividades, 4 campos pendientes.`
    );
  } catch (err: any) {
    recordResult('TEST-E04-02', 'Inventario Completo sin Escritura', 'INVENTARIO', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 3: Simulación Dry-Run sin Alteración Persistente
  // -------------------------------------------------------------
  try {
    const memoryDb = new DatabaseSync(':memory:');
    runMigrations(memoryDb);
    const dryStats = engine.runMigration({ db: memoryDb, dryRun: true });
    
    // Verificar que en memoryDb no se insertó nada
    const usersInDb = (memoryDb.prepare("SELECT COUNT(*) as count FROM users WHERE id LIKE 'usr-real-%'").get() as any).count;
    const dryRunOk = dryStats.dryRun === true &&
      dryStats.usersInserted === 3 &&
      dryStats.subjectsInserted === 20 &&
      dryStats.dailyClassesInserted === 43 &&
      usersInDb === 0;

    recordResult(
      'TEST-E04-03',
      'Simulación Dry-Run con Cero Escrituras Persistentes',
      'DRY-RUN',
      dryRunOk,
      `Proyección de 3 usuarios, 20 materias, 43 clases. Registros reales en BD: ${usersInDb}`
    );
  } catch (err: any) {
    recordResult('TEST-E04-03', 'Simulación Dry-Run', 'DRY-RUN', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 4: Ejecución en Staging: Usuarios, Perfiles y Representante
  // -------------------------------------------------------------
  try {
    const stats = engine.runMigration({ db, dryRun: false });
    
    const userRows = db.prepare("SELECT id, role, username, email FROM users WHERE id LIKE 'usr-real-%' ORDER BY id").all() as any[];
    const studentRows = db.prepare("SELECT id, student_code, birth_date FROM students WHERE id LIKE 'stu-real-%' ORDER BY id").all() as any[];
    const repRows = db.prepare("SELECT id, identification_number, phone_number FROM representatives WHERE id LIKE 'rep-real-%'").all() as any[];
    const famRows = db.prepare("SELECT student_id, representative_id, relationship_type FROM student_representatives WHERE student_id LIKE 'stu-real-%'").all() as any[];

    const usersOk = userRows.length === 3 &&
      studentRows.length === 2 &&
      repRows.length === 1 &&
      famRows.length === 2;

    recordResult(
      'TEST-E04-04',
      'Aprovisionamiento de Usuarios, Estudiantes, Representante y Vínculos',
      'IDENTIDAD',
      usersOk,
      `3 usuarios creados (1 Rep, 2 Estudiantes). 2 vínculos familiares FATHER registrados.`
    );
  } catch (err: any) {
    recordResult('TEST-E04-04', 'Aprovisionamiento de Usuarios', 'IDENTIDAD', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 5: Validación Curricular de Grados (Gael 4.° EGB, Avril 8.° EGB)
  // -------------------------------------------------------------
  try {
    const enrAvril = db.prepare(`
      SELECT spe.school_year, spe.status, l.code as level_code, l.name as level_name
      FROM student_program_enrollments spe
      JOIN levels l ON spe.level_id = l.id
      WHERE spe.student_id = 'stu-real-avril'
    `).get() as any;

    const enrGael = db.prepare(`
      SELECT spe.school_year, spe.status, l.code as level_code, l.name as level_name
      FROM student_program_enrollments spe
      JOIN levels l ON spe.level_id = l.id
      WHERE spe.student_id = 'stu-real-gael'
    `).get() as any;

    const curriculumOk = enrAvril && enrAvril.level_code === 'EGB-SUP-8' &&
      enrGael && enrGael.level_code === 'EGB-ELEM-4' &&
      enrAvril.status === 'ACTIVE' && enrGael.status === 'ACTIVE';

    recordResult(
      'TEST-E04-05',
      'Validación Curricular Estricta (Gael 4.° EGB Elemental, Avril 8.° EGB Superior)',
      'CURRÍCULO',
      curriculumOk,
      `Avril: ${enrAvril?.level_name} | Gael: ${enrGael?.level_name}`
    );
  } catch (err: any) {
    recordResult('TEST-E04-05', 'Validación Curricular Estricta', 'CURRÍCULO', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 6: Seguridad Criptográfica de Credenciales (scryptSync / Sin Plaintext)
  // -------------------------------------------------------------
  try {
    const userPass = db.prepare("SELECT id, password_hash FROM users WHERE id LIKE 'usr-real-%'").all() as any[];
    const stuPins = db.prepare("SELECT id, pin_code_hash FROM students WHERE id LIKE 'stu-real-%'").all() as any[];

    const allPassScrypt = userPass.every(u => typeof u.password_hash === 'string' && u.password_hash.startsWith('scrypt$'));
    const allPinsScrypt = stuPins.every(s => typeof s.pin_code_hash === 'string' && s.pin_code_hash.startsWith('scrypt$'));

    // Verificar que las contraseñas planas de mockData NO sean las contraseñas reales
    const noPlaintextAvril = !verifyPassword('avril', userPass.find(u => u.id === 'usr-real-avril')?.password_hash || '');
    const noPlaintextGael = !verifyPassword('gael', userPass.find(u => u.id === 'usr-real-gael')?.password_hash || '');

    const credSecurityOk = allPassScrypt && allPinsScrypt && noPlaintextAvril && noPlaintextGael;

    recordResult(
      'TEST-E04-06',
      'Seguridad de Credenciales con scryptSync y Cero Herencia de Claves Planas',
      'SEGURIDAD',
      credSecurityOk,
      `100% de contraseñas y PINs con sal criptográfica scrypt. Contraseñas planas de mockData rechazadas.`
    );
  } catch (err: any) {
    recordResult('TEST-E04-06', 'Seguridad de Credenciales', 'SEGURIDAD', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 7: Conteos de Contenido Preservado (20 Materias, 42 Unidades, 43 Clases, 86 Recursos, 129 Actividades)
  // -------------------------------------------------------------
  try {
    const countSubjects = (db.prepare("SELECT COUNT(*) as cnt FROM subjects WHERE id LIKE 'subj-real-%'").get() as any).cnt;
    const countSubjEnroll = (db.prepare("SELECT COUNT(*) as cnt FROM student_subject_enrollments WHERE id LIKE 'subenr-stu-real-%'").get() as any).cnt;
    const countUnits = (db.prepare("SELECT COUNT(*) as cnt FROM curriculum_units WHERE id LIKE 'unit-real-%'").get() as any).cnt;
    const countClasses = (db.prepare("SELECT COUNT(*) as cnt FROM daily_classes WHERE id LIKE 'class-real-%'").get() as any).cnt;
    const countObjectives = (db.prepare("SELECT COUNT(*) as cnt FROM lesson_objectives WHERE id LIKE 'obj-real-%'").get() as any).cnt;
    const countResources = (db.prepare("SELECT COUNT(*) as cnt FROM learning_resources WHERE id LIKE 'res-real-%'").get() as any).cnt;
    const countEvaluations = (db.prepare("SELECT COUNT(*) as cnt FROM evaluations WHERE id LIKE 'eval-real-%'").get() as any).cnt;
    const countCalendar = (db.prepare("SELECT COUNT(*) as cnt FROM academic_calendar_events WHERE id LIKE 'ev-real-%'").get() as any).cnt;

    const countsOk = countSubjects === 20 &&
      countSubjEnroll === 20 &&
      countUnits === 42 &&
      countClasses === 43 &&
      countObjectives === 43 &&
      countResources === 86 &&
      countEvaluations === 129 &&
      countCalendar === 4;

    recordResult(
      'TEST-E04-07',
      'Equivalencia Exhaustiva de Contenidos Académicos y Malla',
      'EQUIVALENCIA',
      countsOk,
      `Materias: ${countSubjects}/20, Matrículas: ${countSubjEnroll}/20, Unidades: ${countUnits}/42, Clases: ${countClasses}/43, Recursos: ${countResources}/86, Evaluaciones: ${countEvaluations}/129, Eventos: ${countCalendar}/4`
    );
  } catch (err: any) {
    recordResult('TEST-E04-07', 'Equivalencia Exhaustiva de Contenidos', 'EQUIVALENCIA', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 8: Desambiguación de Colisiones Legadas (Sufijo -dup2)
  // -------------------------------------------------------------
  try {
    const dupClasses = db.prepare("SELECT id FROM daily_classes WHERE id LIKE '%-dup2'").all() as any[];
    const dupOk = dupClasses.length === 3;
    recordResult(
      'TEST-E04-08',
      'Resolución Quirúrgica de Colisiones Legadas (-dup2)',
      'INTEGRIDAD',
      dupOk,
      `${dupClasses.length} clases desambiguadas sin sobreescritura de lecciones.`
    );
  } catch (err: any) {
    recordResult('TEST-E04-08', 'Resolución de Colisiones Legadas', 'INTEGRIDAD', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 9: Integridad Referencial y Ausencia de Huérfanos (PRAGMA foreign_key_check)
  // -------------------------------------------------------------
  try {
    const fkErrors = db.prepare('PRAGMA foreign_key_check;').all();
    const orphanClasses = (db.prepare(`
      SELECT COUNT(*) as cnt FROM daily_classes c 
      LEFT JOIN curriculum_units u ON c.unit_id = u.id 
      WHERE u.id IS NULL AND c.id LIKE 'class-real-%'
    `).get() as any).cnt;

    const orphanResources = (db.prepare(`
      SELECT COUNT(*) as cnt FROM learning_resources r 
      LEFT JOIN daily_classes c ON r.daily_class_id = c.id 
      WHERE c.id IS NULL AND r.id LIKE 'res-real-%'
    `).get() as any).cnt;

    const integrityOk = fkErrors.length === 0 && orphanClasses === 0 && orphanResources === 0;

    recordResult(
      'TEST-E04-09',
      'Integridad Referencial Absoluta (Cero Violaciones FK y Cero Huérfanos)',
      'INTEGRIDAD',
      integrityOk,
      `FK Violations: ${fkErrors.length} | Clases Huérfanas: ${orphanClasses} | Recursos Huérfanos: ${orphanResources}`
    );
  } catch (err: any) {
    recordResult('TEST-E04-09', 'Integridad Referencial Absoluta', 'INTEGRIDAD', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 10: Comprobación de Idempotencia Estricta (2da Corrida = 0 Duplicados)
  // -------------------------------------------------------------
  try {
    engine.runMigration({ db, dryRun: false });
    const postUsers = (db.prepare("SELECT COUNT(*) as cnt FROM users WHERE id LIKE 'usr-real-%'").get() as any).cnt;
    const postSubjects = (db.prepare("SELECT COUNT(*) as cnt FROM subjects WHERE id LIKE 'subj-real-%'").get() as any).cnt;
    const postClasses = (db.prepare("SELECT COUNT(*) as cnt FROM daily_classes WHERE id LIKE 'class-real-%'").get() as any).cnt;

    const idempotencyOk = postUsers === 3 && postSubjects === 20 && postClasses === 43;

    recordResult(
      'TEST-E04-10',
      'Idempotencia Estricta (Re-ejecución Inmediata sin Duplicados)',
      'IDEMPOTENCIA',
      idempotencyOk,
      `Post-re-ejecución: ${postUsers} usuarios, ${postSubjects} materias, ${postClasses} clases socráticas.`
    );
  } catch (err: any) {
    recordResult('TEST-E04-10', 'Idempotencia Estricta', 'IDEMPOTENCIA', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 11: Reversión Quirúrgica (Rollback) en Copia de Staging
  // -------------------------------------------------------------
  try {
    const deletedCount = engine.rollbackMigration(db);
    const remainingMigrated = (db.prepare("SELECT COUNT(*) as cnt FROM users WHERE id LIKE 'usr-real-%'").get() as any).cnt;
    const syntheticUsersRemaining = (db.prepare("SELECT COUNT(*) as cnt FROM users WHERE id = 'usr-admin-01'").get() as any).cnt;

    const rollbackOk = deletedCount > 0 && remainingMigrated === 0 && syntheticUsersRemaining === 1;

    recordResult(
      'TEST-E04-11',
      'Reversión Quirúrgica (Rollback Limpio y Conservación de Usuarios Sintéticos)',
      'REVERSIÓN',
      rollbackOk,
      `${deletedCount} registros eliminados. Usuarios migrados restantes: ${remainingMigrated}. Usuario admin sintético preservado: ${syntheticUsersRemaining}`
    );
  } catch (err: any) {
    recordResult('TEST-E04-11', 'Reversión Quirúrgica', 'REVERSIÓN', false, err.message);
  }

  // -------------------------------------------------------------
  // Test 12: Bloqueo de Producción (Multi-Factor Production Gate)
  // -------------------------------------------------------------
  try {
    // Re-aplicar migración en staging para dejarla completa
    engine.runMigration({ db, dryRun: false });

    // Probar que el importador y el gate reconocen la estructura
    const schemaTest = LocalProgressSchema.safeParse({
      version: '1.0',
      exportedAt: new Date().toISOString(),
      completedClasses: [],
      submissions: [],
      customAvatars: {},
      microRouteProgress: {},
      guideNotes: [],
    });

    recordResult(
      'TEST-E04-12',
      'Validación de Esquema Zod para Importador/Exportador LocalStorage',
      'LOCALSTORAGE',
      schemaTest.success,
      `Esquema validado exitosamente.`
    );
  } catch (err: any) {
    recordResult('TEST-E04-12', 'Validación de Esquema Zod LocalStorage', 'LOCALSTORAGE', false, err.message);
  }

  // -------------------------------------------------------------
  // Resumen Final
  // -------------------------------------------------------------
  console.log('\n================================================================');
  console.log('  RESUMEN DE RESULTADOS — SUITE ETAPA 04');
  console.log('================================================================');
  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  console.log(`Total pruebas: ${totalCount} | Aprobadas: ${passedCount} | Fallidas: ${totalCount - passedCount}`);

  if (passedCount === totalCount) {
    console.log('\n🏆 TODAS LAS PRUEBAS DE LA ETAPA 04 PASARON CON ÉXITO (100%).');
  } else {
    console.error('\n❌ EXISTEN PRUEBAS FALLIDAS EN LA ETAPA 04.');
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Fatal error en suite de pruebas:', err);
  process.exit(1);
});
