import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testConnection() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error('ERROR: TURSO_DATABASE_URL o TURSO_AUTH_TOKEN no configurados en .env.local');
    process.exit(1);
  }

  console.log('[Turso Test] Iniciando conexion segura con Turso Cloud...');
  const client = createClient({
    url,
    authToken,
  });

  try {
    const start = Date.now();
    const result = await client.execute("SELECT 1 as connected, datetime('now') as server_time");
    const latency = Date.now() - start;

    console.log(`[Turso Test] ✅ CONEXION EXITOSA en ${latency} ms`);
    console.log(`[Turso Test] Filas recibidas:`, result.rows);
  } catch (err: any) {
    console.error('[Turso Test] ❌ Error conectando a Turso:', err.message || err);
    process.exit(1);
  }
}

testConnection();
