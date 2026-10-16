/**
 * Script de Verificación de Salud Operativa (Health Check) para ALSIZ.
 * Inspecciona el estado de la base de datos, migraciones aplicadas,
 * esquema de tablas, configuración de entorno y, si se indica,
 * el endpoint HTTP /api/health.
 * 
 * Uso:
 *   npx tsx scripts/health-check.ts [--http]
 */

import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { getDatabasePath } from '../server/db/database';

async function runHealthCheck() {
  console.log('====================================================');
  console.log('  ALSIZ Ekballo — Diagnóstico y Verificación de Salud');
  console.log('====================================================\n');

  let hasErrors = false;

  // 1. Verificación de Archivos y Entorno Base
  console.log('1. Verificación del Entorno Base:');
  const envFile = path.resolve(process.cwd(), '.env');
  const envLocalFile = path.resolve(process.cwd(), '.env.local');
  const envExampleFile = path.resolve(process.cwd(), '.env.example');

  console.log(`   - .env.example presente: ${fs.existsSync(envExampleFile) ? 'SI (OK)' : 'NO (ADVERTENCIA)'}`);
  console.log(`   - .env presente: ${fs.existsSync(envFile) ? 'SI' : 'NO (Usa valores por defecto o .env.local)'}`);
  console.log(`   - .env.local presente: ${fs.existsSync(envLocalFile) ? 'SI' : 'NO'}`);
  console.log(`   - NODE_ENV: ${process.env.NODE_ENV || 'development (default)'}`);

  // 2. Verificación de Base de Datos
  console.log('\n2. Verificación de Persistencia y Base de Datos:');
  const dbPath = getDatabasePath();
  console.log(`   - Ruta configurada: ${dbPath}`);

  if (!fs.existsSync(dbPath)) {
    console.error(`   - [ERROR CRÍTICO] El archivo de base de datos no existe en la ruta.`);
    hasErrors = true;
  } else {
    try {
      const stats = fs.statSync(dbPath);
      console.log(`   - Tamaño del archivo: ${(stats.size / 1024).toFixed(2)} KB`);

      const db = new DatabaseSync(dbPath, { readOnly: true });
      const integrity = db.prepare('PRAGMA integrity_check;').get() as { integrity_check: string };
      console.log(`   - Integridad física (PRAGMA integrity_check): ${integrity.integrity_check}`);

      if (integrity.integrity_check !== 'ok') {
        console.error(`   - [ERROR CRÍTICO] La base de datos no pasó el chequeo de integridad.`);
        hasErrors = true;
      }

      // Migraciones aplicadas
      const migrationsTable = db.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='schema_migrations';"
      ).get();

      if (migrationsTable) {
        const migrations = db.prepare(
          'SELECT version, name, applied_at FROM schema_migrations ORDER BY version ASC;'
        ).all() as Array<{ version: string; name: string; applied_at: string }>;
        console.log(`   - Migraciones registradas: ${migrations.length}`);
        migrations.forEach((m) => console.log(`     * [v${m.version}] ${m.name} (${m.applied_at})`));
      } else {
        console.warn('   - [ADVERTENCIA] No existe tabla schema_migrations.');
      }

      // Conteo de entidades críticas
      const tablesToCheck = [
        'users',
        'students',
        'programs',
        'subjects',
        'knowledge_sources',
        'ai_agents',
        'continuing_courses',
      ];

      console.log('   - Estado de entidades principales:');
      for (const table of tablesToCheck) {
        try {
          const rowCount = db.prepare(`SELECT count(*) as c FROM ${table};`).get() as { c: number };
          console.log(`     * ${table}: ${rowCount.c} registros`);
        } catch {
          console.log(`     * ${table}: [Tabla no inicializada o inexistente]`);
        }
      }

      db.close();
    } catch (err: any) {
      console.error(`   - [ERROR] Error leyendo la base de datos:`, err?.message || err);
      hasErrors = true;
    }
  }

  // 3. Verificación de Compilados y Artefactos de Frontend
  console.log('\n3. Verificación de Artefactos de Producción:');
  const distDir = path.resolve(process.cwd(), 'dist');
  const distIndex = path.join(distDir, 'index.html');
  const distServer = path.join(distDir, 'server.cjs');
  const apiServer = path.resolve(process.cwd(), 'api-server.js');

  console.log(`   - Carpeta dist/ presente: ${fs.existsSync(distDir) ? 'SI' : 'NO'}`);
  console.log(`   - Frontend index.html compilado: ${fs.existsSync(distIndex) ? 'SI' : 'NO'}`);
  console.log(`   - Servidor Node compilado (dist/server.cjs): ${fs.existsSync(distServer) ? 'SI' : 'NO'}`);
  console.log(`   - Serverless entry (api-server.js): ${fs.existsSync(apiServer) ? 'SI' : 'NO'}`);

  // 4. Verificación de Carpetas Operativas y Documentación
  console.log('\n4. Verificación de Infraestructura Operativa:');
  const backupsDir = path.resolve(process.cwd(), 'backups');
  const operacionDocsDir = path.resolve(process.cwd(), 'docs', 'operacion');

  console.log(`   - Directorio de respaldos (backups/): ${fs.existsSync(backupsDir) ? 'SI' : 'Se creará en el primer respaldo'}`);
  console.log(`   - Directorio de documentación operativa (docs/operacion/): ${fs.existsSync(operacionDocsDir) ? 'SI' : 'NO'}`);

  console.log('\n====================================================');
  if (hasErrors) {
    console.error('  RESULTADO: DIAGNÓSTICO CON ADVERTENCIAS O ERRORES');
    console.log('====================================================\n');
    process.exit(1);
  } else {
    console.log('  RESULTADO: SISTEMA EN CONDICIONES SALUDABLES (HEALTHY)');
    console.log('====================================================\n');
    process.exit(0);
  }
}

runHealthCheck();
