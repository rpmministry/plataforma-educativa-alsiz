import { getDatabaseAdapter, resetDatabaseAdapter, SqliteLocalAdapter, TursoAdapter } from '../server/db/dal';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testDAL() {
  console.log('================================================================');
  console.log('  VERIFICACIÓN DE CAPA DE ACCESO A DATOS (DAL AGNOSTIC)');
  console.log('================================================================');

  // 1. Probar Adaptador Local SQLite en memoria
  console.log('\n[DAL Test 1] Inicializando SqliteLocalAdapter (:memory:)...');
  const localAdapter = new SqliteLocalAdapter(':memory:');
  await localAdapter.executeMultiple(`
    CREATE TABLE test_items (id TEXT PRIMARY KEY, title TEXT, value INTEGER);
    INSERT INTO test_items VALUES ('1', 'Item A', 100), ('2', 'Item B', 200);
  `);
  const localRows = await localAdapter.query('SELECT * FROM test_items ORDER BY value DESC');
  const localItem = await localAdapter.queryOne<{ title: string }>('SELECT title FROM test_items WHERE id = ?', ['1']);
  console.log(`[DAL Test 1] ✅ Local SQLite OK: ${localRows.length} filas obtenidas. Item 1: ${localItem?.title}`);
  await localAdapter.close();

  // 2. Probar Adaptador Turso Cloud
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const tursoToken = process.env.TURSO_AUTH_TOKEN;
  if (tursoUrl && tursoToken) {
    console.log('\n[DAL Test 2] Inicializando TursoAdapter contra Turso Cloud...');
    const tursoAdapter = new TursoAdapter(tursoUrl, tursoToken);
    const users = await tursoAdapter.query<{ id: string; email: string; role: string }>(
      'SELECT id, email, role FROM users LIMIT 3'
    );
    console.log(`[DAL Test 2] ✅ Turso Adapter OK: ${users.length} usuarios consultados en la nube:`);
    for (const u of users) {
      console.log(`   - [${u.role}] ${u.email} (${u.id})`);
    }

    // Probar queryOne con parámetros
    const adminUser = await tursoAdapter.queryOne<{ username: string }>(
      'SELECT username FROM users WHERE role = ? LIMIT 1',
      ['ADMIN']
    );
    console.log(`[DAL Test 2] ✅ queryOne parametrizado OK: Admin encontrado: ${adminUser?.username}`);
    await tursoAdapter.close();
  }

  // 3. Probar Singleton getDatabaseAdapter()
  console.log('\n[DAL Test 3] Probando getDatabaseAdapter() singleton...');
  resetDatabaseAdapter();
  const defaultAdapter = getDatabaseAdapter();
  console.log(`[DAL Test 3] ✅ Proveedor detectado automáticamente: ${defaultAdapter.provider}`);
}

testDAL();

