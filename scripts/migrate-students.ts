/**
 * ==============================================================================
 * Script CLI de Migración Controlada — ETAPA 11 (ALSIZ / Ekballo Church)
 * Uso:
 *   npx tsx scripts/migrate-students.ts --dry-run
 *   npx tsx scripts/migrate-students.ts --staging
 *   npx tsx scripts/migrate-students.ts --verify
 *   npx tsx scripts/migrate-students.ts --rollback
 *   npx tsx scripts/migrate-students.ts --audit
 * ==============================================================================
 */

import path from 'node:path';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { LegacyMigrationEngine } from '../server/migration/legacyMigrationEngine';
import { initDatabase, closeDatabase } from '../server/db/database';
import { runMigrations } from '../server/db/migrator';

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run') || args.length === 0;
const isStaging = args.includes('--staging');
const isVerify = args.includes('--verify');
const isRollback = args.includes('--rollback');
const isAudit = args.includes('--audit');
const isProduction = args.includes('--production');

async function main() {
  console.log('================================================================');
  console.log('  MIGRACIÓN CONTROLADA DE EXPEDIENTES Y MATERIALES — ETAPA 11');
  console.log('  Plataforma Educativa ALSIZ para Ekballo Church');
  console.log('================================================================\n');

  const engine = new LegacyMigrationEngine();

  // 1. Auditoría o reporte de recursos
  if (isAudit) {
    console.log('Generando auditoría exhaustiva de recursos pedagógicos...');
    const audit = engine.auditAllResources();
    console.log(`Total recursos auditados: ${audit.length}`);
    const summary: Record<string, number> = {};
    audit.forEach(a => {
      summary[a.action] = (summary[a.action] || 0) + 1;
    });
    console.log('Distribución por acción:', summary);
    console.log('\nMuestra de clasificación (primeros 5):');
    console.log(audit.slice(0, 5));
    return;
  }

  // 2. Inventario general
  const inventory = engine.generateInventory();
  console.log('--- INVENTARIO DE REGISTROS LEGADOS ---');
  console.log(`- Estudiantes a migrar: ${inventory.studentsCount} (Estudiante A y Estudiante G)`);
  console.log(`- Asignaturas totales: ${inventory.subjectsCount.total} (Avril: ${inventory.subjectsCount.avril}, Gael: ${inventory.subjectsCount.gael})`);
  console.log(`- Unidades curriculares: ${inventory.unitsCount.total} (Avril: ${inventory.unitsCount.avril}, Gael: ${inventory.unitsCount.gael})`);
  console.log(`- Clases socráticas: ${inventory.dailyClassesCount.total} (Avril: ${inventory.dailyClassesCount.avril}, Gael: ${inventory.dailyClassesCount.gael})`);
  console.log(`- Recursos didácticos: ${inventory.resourcesCount.total} (Reutilizar: ${inventory.resourcesCount.byAction.reutilizar}, Actualizar: ${inventory.resourcesCount.byAction.actualizar}, Pendientes: ${inventory.resourcesCount.byAction['pendiente de validacion']})`);
  console.log(`- Actividades evaluativas: ${inventory.activitiesCount.total} (Avril: ${inventory.activitiesCount.avril}, Gael: ${inventory.activitiesCount.gael})`);
  console.log(`- Entradas de horario: ${inventory.scheduleSlotsCount.total}\n`);

  // Protección de producción: No ejecutar en producción sin autorización explícita
  if (isProduction) {
    console.error('⛔ BLOQUEO DE SEGURIDAD ESTRICTO:');
    console.error('La migración sobre la base de datos de producción está BLOQUEADA por las directivas de la Etapa 11.');
    console.error('Se requiere autorización expresa del responsable técnico tras validar el informe de ensayo.\n');
    process.exit(1);
  }

  // Configurar base de datos de destino (Memoria o Staging)
  let db: DatabaseSync;
  let dbPathDesc = '';

  if (isStaging) {
    const stagingPath = path.resolve(process.cwd(), 'data', 'test_alsiz_staging_etapa11.db');
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
  console.log(`- Usuarios insertados: ${stats.usersInserted}`);
  console.log(`- Estudiantes insertados: ${stats.studentsInserted}`);
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
  const secondRun = engine.runMigration({ db, dryRun: false });
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

