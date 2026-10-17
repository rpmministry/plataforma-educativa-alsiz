import crypto from 'node:crypto';

const SCRYPT_KEYLEN = 64;

/**
 * Hashea una contraseña usando scrypt con sal aleatoria criptográfica (NIST / OWASP).
 * Formato del resultado: `scrypt$<saltHex>$<derivedKeyHex>`
 */
export function hashPassword(password: string): string {
  if (!password || typeof password !== 'string') {
    throw new Error('Contraseña inválida para generar hash.');
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password.normalize('NFKC'), salt, SCRYPT_KEYLEN);
  return `scrypt$${salt}$${derivedKey.toString('hex')}`;
}

/**
 * Verifica si una contraseña coincide con el hash almacenado en tiempo constante
 * para prevenir ataques de canal lateral por temporización (Timing Attacks).
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!password || !storedHash || !storedHash.startsWith('scrypt$')) {
    return false;
  }
  const parts = storedHash.split('$');
  if (parts.length !== 3) {
    return false;
  }
  const salt = parts[1];
  const expectedKey = Buffer.from(parts[2], 'hex');
  const actualKey = crypto.scryptSync(password.normalize('NFKC'), salt, SCRYPT_KEYLEN);

  if (expectedKey.length !== actualKey.length) {
    return false;
  }
  return crypto.timingSafeEqual(expectedKey, actualKey);
}

/**
 * Hashea un código PIN táctil de 4 a 6 dígitos con sal independiente.
 */
export function hashPin(pin: string): string {
  return hashPassword(pin.trim());
}

/**
 * Verifica un código PIN contra el hash almacenado en tiempo constante.
 */
export function verifyPin(pin: string, storedHash: string): boolean {
  return verifyPassword(pin.trim(), storedHash);
}

/**
 * Hashea una dirección IP con sal fija de entorno para cumplir con el principio de
 * minimización y no exposición de identificadores personales según el Art. 22 de la LOPDP.
 */
export function hashIp(ip: string): string {
  const pepper = process.env.SESSION_SECRET || 'alsiz_default_privacy_pepper_2026';
  return crypto.createHmac('sha256', pepper).update(ip || '127.0.0.1').digest('hex');
}

/**
 * Genera el hash SHA-256 de un token de sesión para guardarlo en la base de datos.
 * La base de datos nunca almacena el token crudo en texto plano.
 */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Genera un token de sesión opaco con 256 bits de entropía criptográfica real.
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Genera un identificador universal único (UUID v4).
 */
export function generateUuid(): string {
  return crypto.randomUUID();
}

const INSECURE_DEFAULT_SECRETS = new Set([
  'alsiz_default_privacy_pepper_2026',
  'alsiz_ekballo_session_secret_change_in_production_2026_min32bytes',
  'cambiar_en_produccion_por_un_secreto_largo_y_seguro_minimo_32_chars',
  'secret',
  'session_secret',
  '12345678901234567890123456789012',
  'alsiz_session_secret_default_change_me_production_min32',
  'changeme_production_session_secret_min_32_bytes',
]);

/**
 * Valida la seguridad de la configuración de sesión en producción.
 * Si se detecta un secreto nulo, demasiado corto (< 32 caracteres) o un valor de ejemplo por defecto,
 * arroja un error crítico para impedir el inicio del servidor en producción.
 */
export function validateProductionSessionSecret(secret?: string, isProd?: boolean): void {
  const isProduction = isProd !== undefined ? isProd : (process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL));
  const currentSecret = arguments.length >= 1 ? secret : process.env.SESSION_SECRET;

  if (isProduction) {
    if (!currentSecret || typeof currentSecret !== 'string') {
      throw new Error(
        'CRITICAL_SECURITY_ERROR: SESSION_SECRET es obligatoria en entorno de producción. Configure una clave secreta aleatoria de al menos 32 caracteres.'
      );
    }
    if (currentSecret.trim().length < 32) {
      throw new Error(
        `CRITICAL_SECURITY_ERROR: SESSION_SECRET es demasiado corta (${currentSecret.trim().length} caracteres). Se exige un mínimo de 32 caracteres criptográficamente seguros.`
      );
    }
    if (INSECURE_DEFAULT_SECRETS.has(currentSecret.trim().toLowerCase())) {
      throw new Error(
        'CRITICAL_SECURITY_ERROR: SESSION_SECRET coincide con una clave de ejemplo o predeterminada insegura. Genere un secreto único de alta entropía para producción.'
      );
    }
  }
}

