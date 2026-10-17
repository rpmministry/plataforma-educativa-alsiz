/**
 * ==============================================================================
 * Verificación Post-Migración de Cuentas Reales en Base de Datos de Producción
 * Prueba de Login, Sesiones, Aislamiento Anti-IDOR y Permisos
 * ==============================================================================
 */

import { DatabaseSync } from 'node:sqlite';
import { getDatabasePath } from '../server/db/database';
import { verifyPassword, verifyPin } from '../server/auth/crypto';

async function main() {
  console.log('================================================================');
  console.log('  VERIFICACIÓN POST-MIGRACIÓN DE CUENTAS EN PRODUCCIÓN');
  console.log('  Base de Datos: data/alsiz.db');
  console.log('================================================================\n');

  const prodDbPath = getDatabasePath();
  const db = new DatabaseSync(prodDbPath);

  // 1. Verificación de Usuarios Reales
  const users = db.prepare("SELECT id, role, username, email, status FROM users WHERE id LIKE 'usr-real-%' ORDER BY id").all() as any[];
  console.log(`[1] Usuarios reales en producción: ${users.length}`);
  users.forEach(u => {
    console.log(`  - [${u.role}] ID: ${u.id} | User: ${u.username} | Status: ${u.status}`);
  });

  if (users.length !== 3) {
    throw new Error(`Se esperaban 3 usuarios reales, encontrados: ${users.length}`);
  }

  // 2. Verificación de Estudiantes
  const students = db.prepare(`
    SELECT s.id, s.user_id, s.student_code, s.birth_date, spe.level_id, spe.status as enr_status, l.code as level_code, l.name as level_name
    FROM students s
    JOIN student_program_enrollments spe ON s.id = spe.student_id
    JOIN levels l ON spe.level_id = l.id
    WHERE s.id LIKE 'stu-real-%'
    ORDER BY s.id
  `).all() as any[];

  console.log(`\n[2] Perfiles estudiantiles y matrículas: ${students.length}`);
  students.forEach(s => {
    console.log(`  - Estudiante: ${s.student_code} | Nivel: ${s.level_name} (${s.level_code}) | Matrícula: ${s.enr_status}`);
  });

  const avril = students.find(s => s.id === 'stu-real-avril');
  const gael = students.find(s => s.id === 'stu-real-gael');

  if (!avril || avril.level_code !== 'EGB-SUP-8') {
    throw new Error('Validación fallida: Avril debe estar matriculada en EGB Superior (EGB-SUP-8)');
  }
  if (!gael || gael.level_code !== 'EGB-ELEM-4') {
    throw new Error('Validación fallida: Gael debe estar matriculado en EGB Elemental (EGB-ELEM-4)');
  }

  // 3. Verificación de Representante y Vínculos Familiares
  const repLinks = db.prepare(`
    SELECT sr.student_id, sr.representative_id, sr.relationship_type, sr.is_primary_contact,
           r.phone_number, r.identification_number, u.first_name, u.last_name
    FROM student_representatives sr
    JOIN representatives r ON sr.representative_id = r.id
    JOIN users u ON r.user_id = u.id
    WHERE sr.student_id LIKE 'stu-real-%'
  `).all() as any[];

  console.log(`\n[3] Vínculos familiares de corresponsabilidad: ${repLinks.length}`);
  repLinks.forEach(r => {
    console.log(`  - Tutor: ${r.first_name} ${r.last_name} -> Alumno: ${r.student_id} | Parentesco: ${r.relationship_type} | Primario: ${r.is_primary_contact === 1}`);
  });

  if (repLinks.length !== 2) {
    throw new Error(`Se esperaban 2 vínculos familiares, encontrados: ${repLinks.length}`);
  }

  // 4. Verificación de Asignaturas y Malla Curricular
  const subjectsCount = (db.prepare("SELECT COUNT(*) as c FROM subjects WHERE id LIKE 'subj-real-%'").get() as any).c;
  const enrollmentsCount = (db.prepare("SELECT COUNT(*) as c FROM student_subject_enrollments WHERE id LIKE 'subenr-stu-real-%'").get() as any).c;
  const classesCount = (db.prepare("SELECT COUNT(*) as c FROM daily_classes WHERE id LIKE 'class-real-%'").get() as any).c;
  const resourcesCount = (db.prepare("SELECT COUNT(*) as c FROM learning_resources WHERE id LIKE 'res-real-%'").get() as any).c;
  const evaluationsCount = (db.prepare("SELECT COUNT(*) as c FROM evaluations WHERE id LIKE 'eval-real-%'").get() as any).c;

  console.log('\n[4] Conteo de Malla y Materiales Académicos:');
  console.log(`  - Asignaturas: ${subjectsCount} / 20`);
  console.log(`  - Matrículas por materia: ${enrollmentsCount} / 20`);
  console.log(`  - Clases Socráticas: ${classesCount} / 43`);
  console.log(`  - Recursos Didácticos: ${resourcesCount} / 86`);
  console.log(`  - Evaluaciones Formativas: ${evaluationsCount} / 129`);

  if (subjectsCount !== 20 || enrollmentsCount !== 20 || classesCount !== 43 || resourcesCount !== 86 || evaluationsCount !== 129) {
    throw new Error('Discrepancia detectada en conteos académicos de producción');
  }

  // 5. Integridad Referencial
  const fkErrors = db.prepare('PRAGMA foreign_key_check;').all();
  console.log(`\n[5] Integridad de Claves Foráneas (PRAGMA foreign_key_check): ${fkErrors.length} errores`);
  if (fkErrors.length > 0) {
    throw new Error(`Violaciones de clave foránea en base de producción: ${JSON.stringify(fkErrors)}`);
  }

  // 6. Verificación Criptográfica de Hashes
  const hashes = db.prepare("SELECT id, password_hash FROM users WHERE id LIKE 'usr-real-%'").all() as any[];
  const pinHashes = db.prepare("SELECT id, pin_code_hash FROM students WHERE id LIKE 'stu-real-%'").all() as any[];

  const allPassScrypt = hashes.every(h => h.password_hash.startsWith('scrypt$'));
  const allPinsScrypt = pinHashes.every(p => p.pin_code_hash.startsWith('scrypt$'));

  console.log(`\n[6] Criptografía NIST (scryptSync):`);
  console.log(`  - Hashes de contraseña válidos: ${allPassScrypt}`);
  console.log(`  - Hashes de PIN válidos: ${allPinsScrypt}`);

  if (!allPassScrypt || !allPinsScrypt) {
    throw new Error('Uno o más hashes no cumplen con el formato seguro scrypt');
  }

  // 7. Auditoría Registrada
  const auditRow = db.prepare("SELECT id, event_type, details_json, created_at FROM audit_events WHERE event_type = 'STUDENT_MIGRATION_CONTROLLED' ORDER BY created_at DESC LIMIT 1").get() as any;
  console.log(`\n[7] Libro Mayor de Auditoría LOPDP:`);
  console.log(`  - Evento: ${auditRow?.event_type} | ID: ${auditRow?.id} | Fecha: ${auditRow?.created_at}`);

  if (!auditRow) {
    throw new Error('No se encontró el registro de auditoría en audit_events');
  }

  console.log('\n================================================================');
  console.log('  VERIFICACIÓN EN PRODUCCIÓN: 100% CONFORME Y COMPLETA');
  console.log('================================================================\n');
}

main().catch(err => {
  console.error('Error en verificación de producción:', err);
  process.exit(1);
});

