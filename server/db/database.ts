import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

let instance: DatabaseSync | null = null;
let currentDbPath: string | null = null;

export function getDatabasePath(): string {
  if (process.env.DATABASE_PATH) {
    return path.resolve(process.cwd(), process.env.DATABASE_PATH);
  }
  return path.resolve(process.cwd(), 'data', 'alsiz.db');
}

export function initDatabase(customPath?: string): DatabaseSync {
  if (instance) {
    return instance;
  }

  const dbPath = customPath || getDatabasePath();
  currentDbPath = dbPath;

  // Si no es en memoria, asegurar que el directorio exista
  if (dbPath !== ':memory:') {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  instance = new DatabaseSync(dbPath);

  // Optimizaciones de rendimiento y seguridad referencial
  instance.exec('PRAGMA foreign_keys = ON;');
  if (dbPath !== ':memory:') {
    instance.exec('PRAGMA journal_mode = WAL;');
    instance.exec('PRAGMA synchronous = NORMAL;');
  }

  return instance;
}

export function getDb(): DatabaseSync {
  if (!instance) {
    return initDatabase();
  }
  return instance;
}

export function closeDatabase(): void {
  if (instance) {
    try {
      instance.close();
    } catch (err) {
      console.warn('[Database] Error cerrando conexión:', err);
    }
    instance = null;
    currentDbPath = null;
  }
}

