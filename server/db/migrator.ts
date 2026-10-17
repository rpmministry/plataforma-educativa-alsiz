import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { getDb } from './database';

export interface MigrationResult {
  version: string;
  name: string;
  checksum: string;
  status: 'APPLIED' | 'SKIPPED' | 'FAILED';
  error?: string;
}

export function computeChecksum(content: string): string {
  // Normalizar saltos de línea CRLF a LF para cálculo determinista cross-platform
  const normalized = content.replace(/\r\n/g, '\n').trim();
  return crypto.createHash('sha256').update(normalized, 'utf8').digest('hex');
}

export interface MigrationOptions {
  skipDevSeeds?: boolean;
}

export function runMigrations(customDb?: DatabaseSync, options?: MigrationOptions): MigrationResult[] {
  const db = customDb || getDb();
  const results: MigrationResult[] = [];

  // 1. Asegurar tabla de control de versiones
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      version TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      checksum_sha256 TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // 2. Localizar directorio de migraciones
  const migrationsDir = path.resolve(__dirname, 'migrations');
  if (!fs.existsSync(migrationsDir)) {
    console.warn(`[Migrator] Carpeta de migraciones no encontrada en ${migrationsDir}`);
    return results;
  }

  // 3. Obtener y ordenar archivos SQL
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  // 4. Consultar migraciones aplicadas previamente
  const appliedRows = db.prepare('SELECT version, checksum_sha256 FROM schema_migrations').all() as Array<{
    version: string;
    checksum_sha256: string;
  }>;
  const appliedMap = new Map<string, string>(appliedRows.map((r) => [r.version, r.checksum_sha256]));

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const checksum = computeChecksum(content);
    const version = file.split('_')[0];

    // Verificar si ya fue aplicada
    if (appliedMap.has(version)) {
      const existingChecksum = appliedMap.get(version);
      if (existingChecksum !== checksum) {
        console.warn(
          `[Migrator] ADVERTENCIA: La migración ${file} tiene un checksum distinto al registrado en BD. Registrado: ${existingChecksum?.slice(0, 8)}, Actual: ${checksum.slice(0, 8)}`
        );
      }
      results.push({
        version,
        name: file,
        checksum,
        status: 'SKIPPED',
      });
      continue;
    }

    // Política P0 de Seguridad: Omitir estrictamente semillas de desarrollo en producción
    const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);
    const shouldSkipDevSeed = (isProduction || options?.skipDevSeeds) && (file.toLowerCase().includes('seed') || version === '003');
    if (shouldSkipDevSeed) {
      console.log(`[Migrator] Omitiendo migración de datos semilla (${file}) por política de seguridad de producción.`);
      results.push({
        version,
        name: file,
        checksum,
        status: 'SKIPPED',
      });
      continue;
    }

    // Aplicar migración en transacción segura
    try {
      db.exec('BEGIN TRANSACTION;');
      db.exec(content);
      const insertStmt = db.prepare(`
        INSERT INTO schema_migrations (version, name, checksum_sha256)
        VALUES (?, ?, ?);
      `);
      insertStmt.run(version, file, checksum);
      db.exec('COMMIT;');

      results.push({
        version,
        name: file,
        checksum,
        status: 'APPLIED',
      });
      console.log(`[Migrator] Migración ${file} (v${version}) aplicada exitosamente.`);
    } catch (err: any) {
      try {
        db.exec('ROLLBACK;');
      } catch { /* ignorar rollback fallido */ }
      console.error(`[Migrator] ERROR aplicando migración ${file}:`, err?.message || err);
      results.push({
        version,
        name: file,
        checksum,
        status: 'FAILED',
        error: err?.message || String(err),
      });
      throw new Error(`Fallo crítico en migración ${file}: ${err?.message || err}`);
    }
  }

  return results;
}

export interface MigrationHealth {
  status: 'SYNCED' | 'PENDING' | 'MISMATCH' | 'UNINITIALIZED';
  totalMigrationsOnDisk: number;
  appliedCount: number;
  latestVersion: string | null;
  pendingVersions: string[];
  mismatchedVersions: string[];
}

export function checkMigrationsStatus(customDb?: DatabaseSync): MigrationHealth {
  const db = customDb || getDb();

  try {
    const tableCheck = db.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='schema_migrations';"
    ).get() as { name: string } | undefined;

    if (!tableCheck) {
      return {
        status: 'UNINITIALIZED',
        totalMigrationsOnDisk: 0,
        appliedCount: 0,
        latestVersion: null,
        pendingVersions: [],
        mismatchedVersions: [],
      };
    }

    const appliedRows = db.prepare('SELECT version, checksum_sha256 FROM schema_migrations ORDER BY version ASC').all() as Array<{
      version: string;
      checksum_sha256: string;
    }>;
    const appliedMap = new Map<string, string>(appliedRows.map((r) => [r.version, r.checksum_sha256]));

    const migrationsDir = path.resolve(__dirname, 'migrations');
    if (!fs.existsSync(migrationsDir)) {
      return {
        status: 'SYNCED',
        totalMigrationsOnDisk: 0,
        appliedCount: appliedRows.length,
        latestVersion: appliedRows.length > 0 ? appliedRows[appliedRows.length - 1].version : null,
        pendingVersions: [],
        mismatchedVersions: [],
      };
    }

    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    const isProduction = process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL);
    const pendingVersions: string[] = [];
    const mismatchedVersions: string[] = [];

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const checksum = computeChecksum(content);
      const version = file.split('_')[0];

      const isDevSeed = file.toLowerCase().includes('seed') || version === '003';
      if (isProduction && isDevSeed) {
        continue;
      }

      if (!appliedMap.has(version)) {
        pendingVersions.push(version);
      } else {
        const recorded = appliedMap.get(version);
        if (recorded !== checksum) {
          mismatchedVersions.push(version);
        }
      }
    }

    let status: 'SYNCED' | 'PENDING' | 'MISMATCH' | 'UNINITIALIZED' = 'SYNCED';
    if (mismatchedVersions.length > 0) {
      status = 'MISMATCH';
    } else if (pendingVersions.length > 0) {
      status = 'PENDING';
    }

    const latest = appliedRows.length > 0 ? appliedRows[appliedRows.length - 1].version : null;

    return {
      status,
      totalMigrationsOnDisk: files.length,
      appliedCount: appliedRows.length,
      latestVersion: latest,
      pendingVersions,
      mismatchedVersions,
    };
  } catch (err: any) {
    return {
      status: 'UNINITIALIZED',
      totalMigrationsOnDisk: 0,
      appliedCount: 0,
      latestVersion: null,
      pendingVersions: [],
      mismatchedVersions: [],
    };
  }
}

// Ejecución directa por CLI si se invoca con tsx o node
if (require.main === module) {
  try {
    console.log('[Migrator] Ejecutando migraciones de base de datos...');
    const results = runMigrations();
    console.log('[Migrator] Resumen de ejecución:');
    results.forEach((r) => {
      console.log(` - [${r.status}] v${r.version} (${r.name})`);
    });
    process.exit(0);
  } catch (err) {
    console.error('[Migrator] Error fatal en migraciones:', err);
    process.exit(1);
  }
}

