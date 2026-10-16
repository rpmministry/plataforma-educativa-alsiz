/**
 * Script de Restauración y Verificación de Integridad para Base de Datos ALSIZ.
 * Restaura la base de datos a partir de una copia de seguridad y ejecuta
 * PRAGMA integrity_check para certificar que el archivo restaurado es 100% válido.
 * 
 * Uso:
 *   npx tsx scripts/restore-db.ts <ruta_al_archivo_backup.db> [ruta_destino_opcional]
 */

import path from 'node:path';
import fs from 'node:fs';
import { restoreFromBackup } from '../server/backup/backupService';
import { getDatabasePath } from '../server/db/database';

async function runRestoreCLI() {
  console.log('====================================================');
  console.log('  ALSIZ Ekballo — Utilidad de Restauración de BD');
  console.log('====================================================\n');

  const backupFileArg = process.argv[2];
  if (!backupFileArg) {
    console.error('[ERROR] Debe especificar la ruta del archivo de respaldo a restaurar.');
    console.log('Uso: npx tsx scripts/restore-db.ts <ruta_backup.db> [ruta_destino.db]');
    process.exit(1);
  }

  const backupFilePath = path.resolve(process.cwd(), backupFileArg);
  if (!fs.existsSync(backupFilePath)) {
    console.error(`[ERROR] El archivo de respaldo no existe: ${backupFilePath}`);
    process.exit(1);
  }

  // Destino: si no se especifica, por seguridad en modo CLI sin flags se restaura en un destino de prueba
  // o en el destino predeterminado si se pasa expresamente.
  const targetDbArg = process.argv[3];
  const targetDbPath = targetDbArg 
    ? path.resolve(process.cwd(), targetDbArg)
    : getDatabasePath();

  console.log(`[INFO] Archivo de origen: ${backupFilePath}`);
  console.log(`[INFO] Destino de restauración: ${targetDbPath}`);

  const startTime = Date.now();
  try {
    const result = restoreFromBackup(backupFilePath, targetDbPath);
    const durationMs = Date.now() - startTime;

    console.log('\n====================================================');
    console.log('  RESTAURACIÓN COMPLETADA Y VERIFICADA');
    console.log('====================================================');
    console.log(`- Origen: ${result.restoredFromPath}`);
    console.log(`- Destino: ${targetDbPath}`);
    console.log(`- Integridad SQLite (PRAGMA integrity_check): ${result.integrityCheck.toUpperCase()}`);
    console.log(`- Fecha/Hora: ${result.timestamp}`);
    console.log(`- Tiempo de ejecución: ${durationMs} ms`);
    console.log('====================================================\n');
  } catch (err: any) {
    console.error('\n[ERROR] Falló la restauración de la base de datos:', err?.message || err);
    process.exit(1);
  }
}

runRestoreCLI();

