/**
 * ==============================================================================
 * Capa de Acceso a Datos Agnóstica (DAL / Data Access Layer)
 * Plataforma Educativa ALSIZ para Ekballo Church
 *
 * Abstracción desacoplada para persistencia relacional que soporta:
 * 1. Turso Cloud (libSQL sobre HTTP/WebSocket para entornos serverless en Vercel)
 * 2. SQLite Local (node:sqlite sincrónico/en memoria para tests de regresión y desarrollo offline)
 * 3. Preparado para futuras extensiones (PostgreSQL / LibSQL autónomo)
 * ==============================================================================
 */

import { DatabaseSync } from 'node:sqlite';
import { createClient, Client } from '@libsql/client';
import path from 'node:path';
import fs from 'node:fs';
import { getDb } from './database';

export type DatabaseProviderType = 'TURSO' | 'SQLITE_LOCAL';

export interface ExecuteResult {
  rowsAffected: number;
  lastInsertRowid?: number | bigint;
}

export interface IDatabaseAdapter {
  readonly provider: DatabaseProviderType;
  query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  queryOne<T = any>(sql: string, params?: any[]): Promise<T | null>;
  execute(sql: string, params?: any[]): Promise<ExecuteResult>;
  executeMultiple(sql: string): Promise<void>;
  transaction<T>(fn: (tx: IDatabaseAdapter) => Promise<T>): Promise<T>;
  close(): Promise<void>;
}

/**
 * Adaptador para Turso Cloud / libSQL (Async sobre HTTP)
 */
export class TursoAdapter implements IDatabaseAdapter {
  public readonly provider: DatabaseProviderType = 'TURSO';
  private client: Client;

  constructor(url: string, authToken: string) {
    this.client = createClient({ url, authToken });
  }

  public async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const res = await this.client.execute({ sql, args: params });
    return (res.rows as unknown) as T[];
  }

  public async queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  }

  public async execute(sql: string, params: any[] = []): Promise<ExecuteResult> {
    const res = await this.client.execute({ sql, args: params });
    return {
      rowsAffected: res.rowsAffected,
      lastInsertRowid: res.lastInsertRowid,
    };
  }

  public async executeMultiple(sql: string): Promise<void> {
    await this.client.executeMultiple(sql);
  }

  public async transaction<T>(fn: (tx: IDatabaseAdapter) => Promise<T>): Promise<T> {
    const tx = await this.client.transaction('write');
    const txAdapter: IDatabaseAdapter = {
      provider: 'TURSO',
      query: async <R = any>(sql: string, params: any[] = []) => {
        const res = await tx.execute({ sql, args: params });
        return (res.rows as unknown) as R[];
      },
      queryOne: async <R = any>(sql: string, params: any[] = []) => {
        const res = await tx.execute({ sql, args: params });
        return res.rows.length > 0 ? ((res.rows[0] as unknown) as R) : null;
      },
      execute: async (sql: string, params: any[] = []) => {
        const res = await tx.execute({ sql, args: params });
        return { rowsAffected: res.rowsAffected, lastInsertRowid: res.lastInsertRowid };
      },
      executeMultiple: async (sql: string) => {
        await tx.executeMultiple(sql);
      },
      transaction: () => {
        throw new Error('Las transacciones anidadas no están soportadas directamente.');
      },
      close: async () => {},
    };

    try {
      const result = await fn(txAdapter);
      await tx.commit();
      return result;
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  }

  public async close(): Promise<void> {
    this.client.close();
  }
}

/**
 * Adaptador para SQLite local con node:sqlite (Para tests en memoria o desarrollo offline)
 */
export class SqliteLocalAdapter implements IDatabaseAdapter {
  public readonly provider: DatabaseProviderType = 'SQLITE_LOCAL';
  private db: DatabaseSync | null = null;
  private isCustom: boolean = false;

  constructor(customPathOrDb?: string | DatabaseSync) {
    if (customPathOrDb instanceof DatabaseSync) {
      this.db = customPathOrDb;
      this.isCustom = true;
    } else if (typeof customPathOrDb === 'string') {
      const dbPath = customPathOrDb;
      if (dbPath !== ':memory:') {
        const dir = path.dirname(dbPath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      }
      this.db = new DatabaseSync(dbPath);
      this.db.exec('PRAGMA foreign_keys = ON;');
      this.isCustom = true;
    } else {
      this.isCustom = false;
      this.db = null;
    }
  }

  private getActiveDb(): DatabaseSync {
    if (this.isCustom && this.db) {
      return this.db;
    }
    return getDb();
  }

  public async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return (this.getActiveDb().prepare(sql).all(...params) as unknown) as T[];
  }

  public async queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const row = this.getActiveDb().prepare(sql).get(...params);
    return row ? ((row as unknown) as T) : null;
  }

  public async execute(sql: string, params: any[] = []): Promise<ExecuteResult> {
    const stmt = this.getActiveDb().prepare(sql);
    const info = stmt.run(...params) as any;
    return {
      rowsAffected: info.changes ?? 0,
      lastInsertRowid: info.lastInsertRowid,
    };
  }

  public async executeMultiple(sql: string): Promise<void> {
    this.getActiveDb().exec(sql);
  }

  public async transaction<T>(fn: (tx: IDatabaseAdapter) => Promise<T>): Promise<T> {
    const db = this.getActiveDb();
    db.exec('BEGIN TRANSACTION;');
    try {
      const result = await fn(this);
      db.exec('COMMIT;');
      return result;
    } catch (err) {
      try {
        db.exec('ROLLBACK;');
      } catch {}
      throw err;
    }
  }

  public async close(): Promise<void> {
    if (this.isCustom && this.db) {
      try {
        this.db.close();
      } catch {}
    }
  }

  public getRawSyncDb(): DatabaseSync {
    return this.getActiveDb();
  }
}

let activeAdapter: IDatabaseAdapter | null = null;

/**
 * Retorna el adaptador de base de datos singleton activo.
 * Prioridad de resolución:
 * 1. Si TURSO_DATABASE_URL y TURSO_AUTH_TOKEN están presentes y USE_LOCAL_SQLITE !== 'true' -> Turso Cloud.
 * 2. En caso contrario -> SQLite Local (node:sqlite).
 */
export function getDatabaseAdapter(customAdapter?: IDatabaseAdapter): IDatabaseAdapter {
  if (customAdapter) {
    activeAdapter = customAdapter;
    return activeAdapter;
  }

  if (activeAdapter) {
    return activeAdapter;
  }

  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;
  const isTest = process.env.NODE_ENV === 'test';
  const forceLocal = process.env.USE_LOCAL_SQLITE === 'true' || isTest;

  if (tursoUrl && tursoToken && !forceLocal) {
    activeAdapter = new TursoAdapter(tursoUrl, tursoToken);
  } else {
    activeAdapter = new SqliteLocalAdapter();
  }

  return activeAdapter;
}

export function resetDatabaseAdapter(): void {
  activeAdapter = null;
}

