import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

let instance: DatabaseSync | null = null;
let currentDbPath: string | null = null;

export function getDatabasePath(): string {
  if (process.env.DATABASE_PATH) {
    const rawPath = process.env.DATABASE_PATH.trim();
    if (path.isAbsolute(rawPath)) {
      return path.normalize(rawPath);
    }
    return path.resolve(process.cwd(), rawPath);
  }
  // En producción, si existe un volumen montado estándar en /data, usarlo por defecto
  if (process.env.NODE_ENV === 'production' && fs.existsSync('/data')) {
    return '/data/alsiz.db';
  }
  return path.resolve(process.cwd(), 'data', 'alsiz.db');
}

export function initDatabase(customPath?: string): DatabaseSync {
  if (instance) {
    return instance;
  }

  const dbPath = customPath || getDatabasePath();
  currentDbPath = dbPath;

  // Validación de seguridad de persistencia en producción
  if (process.env.NODE_ENV === 'production' && dbPath !== ':memory:') {
    const normalized = path.normalize(dbPath).toLowerCase();
    if (normalized.includes(path.sep + 'dist' + path.sep) || normalized.startsWith('/tmp') || normalized.startsWith('\\tmp')) {
      console.warn(`[Database] ADVERTENCIA CRÍTICA: La base de datos está ubicada en una ruta volátil o efímera: ${dbPath}`);
    }
  }

  // Si no es en memoria, asegurar que el directorio exista
  if (dbPath !== ':memory:') {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  instance = new DatabaseSync(dbPath);

  // Optimizaciones de rendimiento, concurrencia y seguridad referencial
  instance.exec('PRAGMA foreign_keys = ON;');
  if (dbPath !== ':memory:') {
    instance.exec('PRAGMA journal_mode = WAL;');
    instance.exec('PRAGMA synchronous = NORMAL;');
    instance.exec('PRAGMA busy_timeout = 5000;');
  }

  return instance;
}

export function isDatabaseConnected(): boolean {
  try {
    const db = getDb();
    const result = db.prepare('SELECT 1 as alive;').get() as { alive: number };
    return result?.alive === 1;
  } catch {
    return false;
  }
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

