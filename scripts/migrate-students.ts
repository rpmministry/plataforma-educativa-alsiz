/**
 * ==============================================================================
 * Script CLI de Migración Controlada — ETAPA 04 (ALSIZ / Ekballo Church)
 * Uso:
 *   npx tsx scripts/migrate-students.ts --dry-run
 *   npx tsx scripts/migrate-students.ts --staging
 *   npx tsx scripts/migrate-students.ts --inventory
 *   npx tsx scripts/migrate-students.ts --audit
 *   npx tsx scripts/migrate-students.ts --verify
 *   npx tsx scripts/migrate-students.ts --rollback
 *   npx tsx scripts/migrate-students.ts --production [requiere 4 factores de aprobación]
 * ==============================================================================
 */

import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';
import { LegacyMigrationEngine } from '../server/migration/legacyMigrationEngine';
import { initDatabase, closeDatabase, getDatabasePath } from '../server/db/database';
import { runMigrations } from '../server/db/migrator';

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || args.length === 0;
const isStaging = args.includes('--staging');
const isVerify = args.includes('--verify');
const isRollback = args.includes('--rollback');
const isAudit = args.includes('--audit');
const isInventory = args.includes('--inventory');
const isProduction = args.includes('--production');

function getArgValue(flag: string): string | null {
  const idx = args.indexOf(flag);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : null;
}

async function main() {
  console.log('================================================================');
  console.log('  MIGRACIÓN CONTROLADA DE EXPEDIENTES Y MATERIALES — ETAPA 04');
  console.log('  Plataforma Educativa ALSIZ para Ekballo Church');
  console.log('================================================================\n');

  const engine = new LegacyMigrationEngine();

  // 1. Inventario general
  if (isInventory || isDryRun) {
    const inventory = engine.generateInventory();
    console.log('--- INVENTARIO DE REGISTROS LEGADOS (SIN ESCRITURA) ---');
    console.log(`- Estudiantes a migrar: ${inventory.studentsCount} (Avril: 8.° EGB Superior, Gael: 4.° EGB Elemental)`);
    console.log(`- Representantes legales: ${inventory.representativesCount} (Mauricio Andrade Luna)`);
    console.log(`- Vínculos familiares de corresponsabilidad: ${inventory.familyLinksCount}`);
    console.log(`- Asignaturas totales: ${inventory.subjectsCount.total} (Avril: ${inventory.subjectsCount.avril}, Gael: ${inventory.subjectsCount.gael})`);
    console.log(`- Unidades curriculares: ${inventory.unitsCount.total} (Avril: ${inventory.unitsCount.avril}, Gael: ${inventory.unitsCount.gael})`);
    console.log(`- Clases socráticas: ${inventory.dailyClassesCount.total} (Avril: ${inventory.dailyClassesCount.avril}, Gael: ${inventory.dailyClassesCount.gael})`);
    console.log(`- Recursos didácticos: ${inventory.resourcesCount.total} (Reutilizar: ${inventory.resourcesCount.byAction.reutilizar}, Actualizar: ${inventory.resourcesCount.byAction.actualizar}, Pendientes: ${inventory.resourcesCount.byAction['pendiente de validacion']})`);
    console.log(`- Actividades evaluativas: ${inventory.activitiesCount.total} (Avril: ${inventory.activitiesCount.avril}, Gael: ${inventory.activitiesCount.gael})`);
    console.log(`- Entradas de horario semanal: ${inventory.scheduleSlotsCount.total}`);
    console.log(`- Colisiones de IDs detectadas en origen: ${inventory.legacyCollisionsDetected.classIds.length} clases resueltas deterministamente.`);
    console.log('\n--- CAMPOS PENDIENTES DE VERIFICACIÓN OFICIAL ---');
    inventory.pendingVerifications.forEach((pv, idx) => {
      console.log(`  ${idx + 1}. [${pv.entity}] ${pv.field}: ${pv.reason}`);
    });
    console.log('');
    if (isInventory) return;
  }

  // 2. Auditoría o reporte de recursos
  if (isAudit) {
    console.log('Generando auditoría exhaustiva de recursos pedagógicos...');
    const audit = engine.auditAllResources();
    console.log(`Total recursos auditados: ${audit.length}`);
    const summary: Record<string, number> = {};
    audit.forEach(a => {
      summary[a.action] = (summary[a.action] || 0) + 1;
    });
    console.log('Distribución por acción:', summary);
    console.log('\nMuestra de clasificación (primeros 5 recursos):');
    console.log(audit.slice(0, 5));
    return;
  }

  // 3. Control de Bloqueo de Producción (Multi-Factor Production Gate)
  if (isProduction) {
    console.log('🔒 VERIFICANDO CONTROL DE APROBACIÓN PRODUCTIVA DE MÚLTIPLES FACTORES...');

    const approvalToken = getArgValue('--approval-token');
    const backupPath = getArgValue('--backup-path');
    const confirmTargetDb = getArgValue('--confirm-target-db');
    const commitHash = getArgValue('--commit-hash');

    const expectedToken = process.env.PRODUCTION_MIGRATION_APPROVAL_TOKEN;
    const resolvedProdDb = getDatabasePath();

    const missingFactors: string[] = [];
    if (!expectedToken || !approvalToken || approvalToken !== expectedToken) {
      missingFactors.push('Factor 1: Token de aprobación humana inválido o ausente (--approval-token / PRODUCTION_MIGRATION_APPROVAL_TOKEN).');
    }

    if (!backupPath || !fs.existsSync(path.resolve(process.cwd(), backupPath))) {
      missingFactors.push('Factor 2: Archivo de respaldo validado ausente o inaccesible (--backup-path).');
    } else {
      const backupStat = fs.statSync(path.resolve(process.cwd(), backupPath));
      if (backupStat.size < 1000) {
        missingFactors.push('Factor 2: Archivo de respaldo sospechosamente pequeño (< 1KB).');
      }
    }

    if (!confirmTargetDb || path.normalize(path.resolve(process.cwd(), confirmTargetDb)) !== path.normalize(resolvedProdDb)) {
      missingFactors.push(`Factor 3: Destino de base de datos no confirmado exactamente (--confirm-target-db debe coincidir con ${resolvedProdDb}).`);
    }

    let currentGitCommit = '';
    try {
      currentGitCommit = execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
    } catch {
      missingFactors.push('Factor 4: No se pudo obtener el commit actual de git.');
    }

    if (!commitHash || commitHash !== currentGitCommit) {
      missingFactors.push(`Factor 4: Commit de código no verificado (--commit-hash ${commitHash || 'vacío'} != actual ${currentGitCommit}).`);
    }

    if (missingFactors.length > 0) {
      console.error('\n⛔ BLOQUEO DE SEGURIDAD ESTRICTO ACTIVADO:');
      console.error('La migración sobre la base de datos de producción ha sido DENEGADA.');
      console.error('Factores de aprobación no satisfechos:');
      missingFactors.forEach(f => console.error(`  - ${f}`));
      console.error('\nProcedimiento exigido por la directiva de Etapa 04:');
      console.error('  1. Ejecutar y validar el dry-run y el ensayo en staging.');
      console.error('  2. Crear y verificar una copia de seguridad en caliente con checksum sha256.');
      console.error('  3. Obtener aprobación humana explícita del responsable.');
      console.error('  4. Invocar con todos los factores de validación.\n');
      process.exit(1);
    }

    // Si todos los factores coinciden, calcular checksum del backup antes de permitir escritura
    const backupBuffer = fs.readFileSync(path.resolve(process.cwd(), backupPath!));
    const backupChecksum = crypto.createHash('sha256').update(backupBuffer).digest('hex');
    console.log(`✅ Factor 1 validado: Token de aprobación conforme.`);
    console.log(`✅ Factor 2 validado: Respaldo verificado [${backupPath}] (SHA-256: ${backupChecksum.substring(0, 16)}...).`);
    console.log(`✅ Factor 3 validado: Base de datos destino confirmada [${resolvedProdDb}].`);
    console.log(`✅ Factor 4 validado: Versión de código confirmada [Commit: ${currentGitCommit}].`);
    console.log('\n🚀 PROCEDIENDO A LA MIGRACIÓN CONTROLADA EN PRODUCCIÓN...');

    closeDatabase();
    const prodDb = initDatabase(resolvedProdDb);
    runMigrations(prodDb);

    const stats = engine.runMigration({ db: prodDb, dryRun: false });
    console.log('✅ Migración productiva completada.');
    console.log(`- Usuarios: ${stats.usersInserted}, Estudiantes: ${stats.studentsInserted}, Representantes: ${stats.representativesInserted}`);
    console.log(`- Asignaturas: ${stats.subjectsInserted}, Clases: ${stats.dailyClassesInserted}, Recursos: ${stats.resourcesInserted}`);

    const verifyProd = engine.verifyMigration(prodDb);
    if (!verifyProd.passed) {
      console.error('❌ ERROR CRÍTICO: Una verificación de integridad falló en producción.');
      process.exit(1);
    }
    console.log('✅ Verificación de integridad en producción PASÓ al 100%.');
    return;
  }

  // 4. Configurar base de datos de destino (Memoria o Staging)
  let db: DatabaseSync;
  let dbPathDesc = '';

  if (isStaging) {
    const stagingPath = path.resolve(process.cwd(), 'data', 'test_alsiz_staging_etapa04.db');
    dbPathDesc = stagingPath;
    console.log(`Ambiente seleccionado: ENSAYO / STAGING (${stagingPath})`);

    // Asegurar esquema base en la base de datos de staging
    closeDatabase();
    db = initDatabase(stagingPath);
    runMigrations(db);
  } else {
    dbPathDesc = ':memory: (Aislamiento total en memoria)';
    console.log(`Ambiente seleccionado: SIMULACIÓN / DRY-RUN (${dbPathDesc})`);
    db = new DatabaseSync(':memory:');
    runMigrations(db);
  }

  if (isRollback) {
    console.log('\n--- EJECUTANDO REVERSIÓN QUIRÚRGICA ---');
    const deleted = engine.rollbackMigration(db);
    console.log(`✅ Reversión completada. Registros eliminados: ${deleted}`);
    const verifyAfter = engine.verifyMigration(db);
    console.log(`Estado post-reversión: ${verifyAfter.counts['students_migrated'] || 0} estudiantes migrados.`);
    return;
  }

  if (isDryRun && !isStaging) {
    console.log('\n--- MODO ENSAYO / DRY-RUN (SIN ESCRITURA EN DISCO) ---');
    const dryStats = engine.runMigration({ db, dryRun: true });
    console.log('Estadísticas de la proyección dry-run:');
    console.log(dryStats);
    console.log('\n✅ Ensayo dry-run finalizado con éxito. Cero cambios persistidos en disco.');
    return;
  }

  // Ejecución en Staging
  console.log('\n--- EJECUTANDO MIGRACIÓN CONTROLADA EN STAGING ---');
  const stats = engine.runMigration({ db, dryRun: false });
  console.log('✅ Migración ejecutada. Estadísticas:');
  console.log(`- Usuarios insertados: ${stats.usersInserted} (1 Representante + 2 Estudiantes)`);
  console.log(`- Representantes insertados: ${stats.representativesInserted} (Mauricio Andrade Luna)`);
  console.log(`- Estudiantes insertados: ${stats.studentsInserted} (Avril y Gael)`);
  console.log(`- Vínculos de corresponsabilidad familiar: ${stats.studentRepresentativesInserted}`);
  console.log(`- Matrículas en programas: ${stats.programEnrollmentsInserted}`);
  console.log(`- Asignaturas insertadas: ${stats.subjectsInserted}`);
  console.log(`- Matrículas por materia: ${stats.subjectEnrollmentsInserted}`);
  console.log(`- Unidades insertadas: ${stats.unitsInserted}`);
  console.log(`- Clases diarias socráticas: ${stats.dailyClassesInserted}`);
  console.log(`- Objetivos de lección: ${stats.objectivesInserted}`);
  console.log(`- Recursos pedagógicos: ${stats.resourcesInserted}`);
  console.log(`- Evaluaciones formativas: ${stats.evaluationsInserted}`);
  console.log(`- Eventos de calendario: ${stats.calendarEventsInserted}`);
  console.log(`- Eventos de auditoría: ${stats.auditEventsInserted}\n`);

  // Verificación inmediata
  console.log('--- VERIFICANDO INTEGRIDAD Y RELACIONES ---');
  const verification = engine.verifyMigration(db);
  verification.checks.forEach(c => {
    const icon = c.passed ? '✅' : '❌';
    console.log(`${icon} ${c.name}: ${c.details}`);
  });

  if (!verification.passed) {
    console.error('\n❌ Error: Una o más verificaciones de integridad fallaron.');
    process.exit(1);
  }

  console.log('\n--- COMPROBACIÓN DE IDEMPOTENCIA ---');
  console.log('Ejecutando la migración por segunda vez para verificar idempotencia...');
  engine.runMigration({ db, dryRun: false });
  const secondVerification = engine.verifyMigration(db);
  console.log(`Registros de estudiantes tras 2da corrida: ${secondVerification.counts['students_migrated']}`);
  console.log(`Registros de asignaturas tras 2da corrida: ${secondVerification.counts['subjects_migrated']}`);
  console.log(`Registros de clases tras 2da corrida: ${secondVerification.counts['daily_classes_migrated']}`);

  if (secondVerification.counts['students_migrated'] === 2 && secondVerification.counts['subjects_migrated'] === 20) {
    console.log('✅ IDEMPOTENCIA CONFIRMADA: Cero duplicados generados al re-ejecutar.');
  } else {
    console.error('❌ Fallo de idempotencia: Se generaron duplicados.');
    process.exit(1);
  }

  console.log('\n================================================================');
  console.log('  ENSAYO DE MIGRACIÓN COMPLETADO CON ÉXITO');
  console.log('  Base de datos de producción permanece intacta.');
  console.log('================================================================\n');
}

main().catch(err => {
  console.error('Fatal error en migración:', err);
  process.exit(1);
});
