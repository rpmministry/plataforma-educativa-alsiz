import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

function computeChecksum(content: string): string {
  return crypto.createHash('sha256').update(content.trim(), 'utf8').digest('hex');
}

async function runTursoMigrations() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error('ERROR: Credenciales de Turso no configuradas.');
    process.exit(1);
  }

  console.log('================================================================');
  console.log('  AUDITORÍA DE MIGRACIONES EN TURSO CLOUD (ENTORNO DEV/TEST)');
  console.log('================================================================');

  const client = createClient({ url, authToken });

  // 1. Crear tabla schema_migrations
  await client.execute(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      version TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      checksum_sha256 TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const appliedResult = await client.execute('SELECT version FROM schema_migrations');
  const appliedSet = new Set(appliedResult.rows.map((r: any) => String(r.version)));

  const migrationsDir = path.resolve(process.cwd(), 'server', 'db', 'migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  console.log(`[Turso Migrator] Total migraciones a evaluar: ${files.length}`);

  for (const file of files) {
    const version = file.split('_')[0];
    if (appliedSet.has(version)) {
      console.log(`[Turso Migrator] ⏭️  Saltando v${version} (${file}): ya aplicada previamente.`);
      continue;
    }

    const filePath = path.join(migrationsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const checksum = computeChecksum(content);

    console.log(`[Turso Migrator] ⏳ Aplicando v${version} (${file})...`);
    const start = Date.now();

    try {
      // libSQL executeMultiple ejecuta scripts con múltiples sentencias DDL/DML
      await client.executeMultiple(content);

      await client.execute({
        sql: 'INSERT INTO schema_migrations (version, name, checksum_sha256) VALUES (?, ?, ?)',
        args: [version, file, checksum],
      });

      const elapsed = Date.now() - start;
      console.log(`[Turso Migrator] ✅ v${version} (${file}) aplicada con éxito en ${elapsed} ms.`);
    } catch (err: any) {
      console.error(`[Turso Migrator] ❌ ERROR aplicando ${file}:`, err.message || err);
      process.exit(1);
    }
  }

  console.log('================================================================');
  console.log('  TODAS LAS MIGRACIONES FUERON APLICADAS EN TURSO EXITOSAMENTE');
  console.log('================================================================');

  // Comprobar tablas creadas en Turso
  const tablesRes = await client.execute(`
    SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;
  `);
  console.log('\n[Turso Migrator] Tablas existentes en Turso Cloud:');
  console.log(tablesRes.rows.map((r: any) => r.name).join(', '));
}

runTursoMigrations();

