/**
 * ==============================================================================
 * Herramienta Segura de Bootstrap para el Primer Administrador
 * Plataforma Educativa ALSIZ — Ekballo Church
 * ==============================================================================
 * 
 * Permite inicializar un usuario administrador en entornos de producción
 * sin cargar las semillas de prueba (003_seed_dev_data.sql) ni exponer contraseñas.
 * 
 * Uso:
 *   npx tsx scripts/bootstrap-admin.ts --email admin@midominio.com --password "MiClaveSegura2026!"
 *   O mediante variables de entorno:
 *   BOOTSTRAP_ADMIN_EMAIL=admin@midominio.com BOOTSTRAP_ADMIN_PASSWORD="MiClaveSegura2026!" npx tsx scripts/bootstrap-admin.ts
 */

import dotenv from 'dotenv';
import readline from 'node:readline';
import { getDatabaseAdapter } from '../server/db/dal';
import { hashPassword, generateUuid } from '../server/auth/crypto';

// Cargar variables de entorno
dotenv.config();
dotenv.config({ path: '.env.local' });

function parseArgs(): { email?: string; password?: string; name?: string; force: boolean } {
  const args = process.argv.slice(2);
  let email = process.env.BOOTSTRAP_ADMIN_EMAIL;
  let password = process.env.BOOTSTRAP_ADMIN_PASSWORD;
  let name = process.env.BOOTSTRAP_ADMIN_NAME || 'Administrador ALSIZ';
  let force = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--email' && args[i + 1]) {
      email = args[i + 1];
      i++;
    } else if (args[i] === '--password' && args[i + 1]) {
      password = args[i + 1];
      i++;
    } else if (args[i] === '--name' && args[i + 1]) {
      name = args[i + 1];
      i++;
    } else if (args[i] === '--force') {
      force = true;
    }
  }

  return { email, password, name, force };
}

function askQuestion(rl: readline.Interface, query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve));
}

function validatePasswordPolicy(password: string): string | null {
  if (password.length < 10) {
    return 'La contraseña debe tener al menos 10 caracteres.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'La contraseña debe incluir al menos una letra mayúscula.';
  }
  if (!/[a-z]/.test(password)) {
    return 'La contraseña debe incluir al menos una letra minúscula.';
  }
  if (!/[0-9]/.test(password)) {
    return 'La contraseña debe incluir al menos un número.';
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return 'La contraseña debe incluir al menos un símbolo especial.';
  }
  return null;
}

export async function bootstrapAdmin(options?: {
  email?: string;
  password?: string;
  name?: string;
  force?: boolean;
}): Promise<{ success: boolean; userId?: string; email?: string; message: string }> {
  const db = getDatabaseAdapter();

  // 1. Verificar si ya existe un administrador registrado
  const existingAdmin = await db.queryOne<{ id: string; email: string }>(
    "SELECT id, email FROM users WHERE role = 'ADMIN' LIMIT 1;"
  );

  if (existingAdmin && !options?.force) {
    return {
      success: false,
      message: `Ya existe un administrador registrado (${existingAdmin.email}). Para agregar otro use --force.`,
    };
  }

  let email = options?.email?.trim().toLowerCase();
  let password = options?.password;
  let fullName = options?.name?.trim() || 'Administrador ALSIZ';

  // Si no se proporcionaron credenciales y estamos en entorno interactivo
  if ((!email || !password) && process.stdin.isTTY) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      if (!email) {
        email = (await askQuestion(rl, 'Correo electrónico del nuevo administrador: ')).trim().toLowerCase();
      }
      if (!password) {
        password = await askQuestion(rl, 'Contraseña robusta para el nuevo administrador: ');
      }
    } finally {
      rl.close();
    }
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      message: 'Dirección de correo electrónico inválida.',
    };
  }

  if (!password) {
    return {
      success: false,
      message: 'La contraseña de administración es obligatoria.',
    };
  }

  const policyError = validatePasswordPolicy(password);
  if (policyError) {
    return {
      success: false,
      message: `Política de contraseña no cumplida: ${policyError}`,
    };
  }

  // 2. Hasheo seguro mediante scrypt
  const passwordHash = hashPassword(password);
  const userId = `usr-admin-${generateUuid().slice(0, 8)}`;
  const username = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || 'Administrador';
  const lastName = nameParts.slice(1).join(' ') || 'ALSIZ';

  // 3. Inserción idempotente / segura
  await db.execute(
    `
    INSERT INTO users (id, email, username, password_hash, role, status, first_name, last_name, avatar_asset_key)
    VALUES (?, ?, ?, ?, 'ADMIN', 'ACTIVE', ?, ?, 'admin_shield');
  `,
    [userId, email, username, passwordHash, firstName, lastName]
  );

  return {
    success: true,
    userId,
    email,
    message: `Administrador inicial creado exitosamente con identificador ${userId}.`,
  };
}

// Ejecución directa si se invoca como script
if (require.main === module) {
  (async () => {
    try {
      console.log('===========================================================');
      console.log('  ALSIZ — Inicialización Segura de Administrador (Bootstrap)');
      console.log('===========================================================');

      const parsed = parseArgs();
      const result = await bootstrapAdmin(parsed);

      if (result.success) {
        console.log(`\n✅ [BootstrapAdmin] ÉXITO: ${result.message}`);
        console.log(`   Email: ${result.email}`);
        console.log(`   Rol: ADMIN`);
        console.log('   (La contraseña fue hasheada criptográficamente con scrypt y nunca almacenada en plano)\n');
        process.exit(0);
      } else {
        console.error(`\n❌ [BootstrapAdmin] ERROR: ${result.message}\n`);
        process.exit(1);
      }
    } catch (err: any) {
      console.error('\n❌ [BootstrapAdmin] Excepción inesperada:', err?.message || err);
      process.exit(1);
    }
  })();
}

