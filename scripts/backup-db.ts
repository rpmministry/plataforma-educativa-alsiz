/**
 * Script de Respaldo en Caliente (Hot Backup) para la Base de Datos SQLite ALSIZ.
 * Ejecuta VACUUM INTO para generar una copia instantánea, atómica e íntegra
 * sin bloquear lecturas ni interrumpir la operación del servidor.
 * 
 * Uso:
 *   npx tsx scripts/backup-db.ts [directorio_destino]
 */

import path from 'node:path';
import fs from 'node:fs';
import { createHotBackup } from '../server/backup/backupService';
import { getDatabasePath } from '../server/db/database';

async function runBackupCLI() {
  console.log('====================================================');
  console.log('  ALSIZ Ekballo — Utilidad de Respaldo de Base de Datos');
  console.log('====================================================\n');

  const sourceDb = getDatabasePath();
  console.log(`[INFO] Base de datos origen: ${sourceDb}`);

  if (!fs.existsSync(sourceDb)) {
    console.error(`[ERROR] No se encontró el archivo de base de datos en: ${sourceDb}`);
    console.error('[HINT] Asegúrese de haber ejecutado las migraciones previamente: npm run db:migrate');
    process.exit(1);
  }

  const customDir = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : undefined;
  console.log(`[INFO] Generando respaldo en caliente (Hot Backup via VACUUM INTO)...`);

  const startTime = Date.now();
  try {
    const result = createHotBackup(customDir);
    const durationMs = Date.now() - startTime;

    console.log('\n====================================================');
    console.log('  RESPALDO COMPLETADO EXITOSAMENTE');
    console.log('====================================================');
    console.log(`- Archivo generado: ${result.backupPath}`);
    console.log(`- Tamaño: ${(result.backupSize / 1024).toFixed(2)} KB (${result.backupSize} bytes)`);
    console.log(`- Checksum SHA-256: ${result.checksumSha256}`);
    console.log(`- Fecha/Hora: ${result.timestamp}`);
    console.log(`- Tiempo de ejecución: ${durationMs} ms`);
    console.log('====================================================\n');
  } catch (err: any) {
    console.error('\n[ERROR] Falló la creación del respaldo:', err?.message || err);
    process.exit(1);
  }
}

runBackupCLI();

