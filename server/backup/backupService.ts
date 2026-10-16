import { getDb, getDatabasePath, closeDatabase, initDatabase } from '../db/database';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

export interface BackupResult {
  success: boolean;
  backupPath: string;
  backupSize: number;
  checksumSha256: string;
  timestamp: string;
}

export interface RestoreResult {
  success: boolean;
  restoredFromPath: string;
  integrityCheck: string;
  timestamp: string;
}

/**
 * Realiza una copia de seguridad caliente (Hot Backup) de la base de datos SQLite
 * utilizando la instrucción atómica y transaccional VACUUM INTO.
 */
export function createHotBackup(customDestDir?: string): BackupResult {
  const db = getDb();
  const backupDir = customDestDir || path.resolve(process.cwd(), 'backups');

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestampStr = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFileName = `alsiz_backup_${timestampStr}.db`;
  const backupFilePath = path.join(backupDir, backupFileName);

  // Asegurar que cualquier transacción WAL pendiente se consolide
  try {
    db.exec('PRAGMA wal_checkpoint(PASSIVE);');
  } catch { /* continuar */ }

  // VACUUM INTO genera una copia limpia, compactada e íntegra del archivo de BD
  db.exec(`VACUUM INTO '${backupFilePath.replace(/\\/g, '/')}';`);

  const fileBuffer = fs.readFileSync(backupFilePath);
  const checksum = crypto.createHash('sha256').update(fileBuffer).digest('hex');

  return {
    success: true,
    backupPath: backupFilePath,
    backupSize: fileBuffer.length,
    checksumSha256: checksum,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Restaura una base de datos desde un archivo de respaldo verificado.
 * Diseñado para ejecución en entorno de pruebas controlado o recuperación ante desastres.
 */
export function restoreFromBackup(backupFilePath: string, targetDbPath?: string): RestoreResult {
  if (!fs.existsSync(backupFilePath)) {
    throw new Error(`El archivo de respaldo no existe: ${backupFilePath}`);
  }

  const targetPath = targetDbPath || getDatabasePath();

  // 1. Cerrar conexión activa para liberar bloqueos
  closeDatabase();

  // 2. Copiar archivo de respaldo al destino
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Si existen archivos auxiliares WAL o SHM, eliminarlos antes de restaurar
  if (fs.existsSync(`${targetPath}-wal`)) fs.unlinkSync(`${targetPath}-wal`);
  if (fs.existsSync(`${targetPath}-shm`)) fs.unlinkSync(`${targetPath}-shm`);

  fs.copyFileSync(backupFilePath, targetPath);

  // 3. Abrir temporalmente la BD restaurada y verificar integridad
  const restoredDb = new DatabaseSync(targetPath);
  const check = restoredDb.prepare('PRAGMA integrity_check;').get() as { integrity_check: string };
  restoredDb.close();

  if (check.integrity_check !== 'ok') {
    throw new Error(`Fallo en verificación de integridad tras restaurar: ${check.integrity_check}`);
  }

  return {
    success: true,
    restoredFromPath: backupFilePath,
    integrityCheck: check.integrity_check,
    timestamp: new Date().toISOString(),
  };
}

