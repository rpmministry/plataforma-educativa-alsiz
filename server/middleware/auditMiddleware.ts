import { getDatabaseAdapter } from '../db/dal';
import { generateUuid, hashIp } from '../auth/crypto';

export interface AuditEventParams {
  userId?: string | null;
  eventType: string;
  resourceType: string;
  resourceId?: string | null;
  ip?: string;
  userAgent?: string | null;
  details?: Record<string, any>;
}

const FORBIDDEN_DETAIL_KEYS = new Set([
  'password',
  'pincode',
  'pin',
  'token',
  'rawtoken',
  'secret',
  'authorization',
  'cookie',
  'creditcard',
  'credential',
]);

/**
 * Sanitiza recursivamente objetos JSON para impedir la inclusión de secretos o contraseñas en los registros de auditoría.
 */
export function sanitizeAuditDetails(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(sanitizeAuditDetails);
  }

  const sanitized: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();
    if (FORBIDDEN_DETAIL_KEYS.has(lowerKey)) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object') {
      sanitized[key] = sanitizeAuditDetails(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

/**
 * Registra un evento inmutable en audit_events cumpliendo con los Arts. 21 y 22 de la LOPDP.
 * La IP se almacena hasheada (ip_hash) para preservar la privacidad del menor y su familia.
 */
export function recordAuditEvent(params: AuditEventParams): void {
  try {
    const db = getDatabaseAdapter();
    const id = generateUuid();
    const ipHash = hashIp(params.ip || '127.0.0.1');
    const sanitizedDetails = params.details ? JSON.stringify(sanitizeAuditDetails(params.details)) : null;

    db.execute(`
      INSERT INTO audit_events (id, user_id, event_type, resource_type, resource_id, ip_hash, user_agent, details_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `, [
      id,
      params.userId || null,
      params.eventType,
      params.resourceType,
      params.resourceId || null,
      ipHash,
      params.userAgent || null,
      sanitizedDetails
    ]).catch((err: any) => {
      console.warn('[Audit] Fallo registrando evento de auditoría asíncrono:', err?.message || err);
    });
  } catch (err: any) {
    // La auditoría no debe abortar la ejecución de negocio, pero debe advertir en consola segura
    console.warn('[Audit] Fallo registrando evento de auditoría:', err?.message || err);
  }
}

