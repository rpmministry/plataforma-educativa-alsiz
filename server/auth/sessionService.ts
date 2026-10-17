import { getDatabaseAdapter } from '../db/dal';
import {
  generateSessionToken,
  hashToken,
  hashIp,
  generateUuid,
} from './crypto';
import {
  UserRole,
  SessionRow,
  AuthSessionUser,
} from './types';

const DEFAULT_TTL_HOURS = 72;

export function getSessionTtlHours(): number {
  const envTtl = Number(process.env.SESSION_TTL_HOURS);
  return !isNaN(envTtl) && envTtl > 0 ? envTtl : DEFAULT_TTL_HOURS;
}

export async function createSession(
  userId: string,
  role: UserRole,
  ip: string,
  userAgent?: string
): Promise<{ token: string; session: SessionRow }> {
  const db = getDatabaseAdapter();
  const rawToken = generateSessionToken();
  const tokenHash = hashToken(rawToken);
  const sessionId = generateUuid();
  const ipHashed = hashIp(ip);

  // Calcular expiración
  const expiresAt = new Date(Date.now() + getSessionTtlHours() * 3600 * 1000).toISOString();

  // Buscar si tiene perfil de estudiante o representante asociado
  let studentId: string | null = null;
  let representativeId: string | null = null;

  if (role === 'STUDENT') {
    const stu = await db.queryOne<{ id: string }>('SELECT id FROM students WHERE user_id = ?', [userId]);
    studentId = stu ? stu.id : null;
  } else if (role === 'REPRESENTATIVE') {
    const rep = await db.queryOne<{ id: string }>('SELECT id FROM representatives WHERE user_id = ?', [userId]);
    representativeId = rep ? rep.id : null;
  }

  await db.execute(`
    INSERT INTO sessions (id, user_id, token_hash, role, student_id, representative_id, ip_hash, user_agent, expires_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `, [
    sessionId,
    userId,
    tokenHash,
    role,
    studentId,
    representativeId,
    ipHashed,
    userAgent || null,
    expiresAt,
  ]);

  const sessionRow: SessionRow = {
    id: sessionId,
    user_id: userId,
    token_hash: tokenHash,
    role,
    student_id: studentId,
    representative_id: representativeId,
    ip_hash: ipHashed,
    user_agent: userAgent || null,
    expires_at: expiresAt,
    created_at: new Date().toISOString(),
  };

  return { token: rawToken, session: sessionRow };
}

export async function validateSession(rawToken: string): Promise<AuthSessionUser | null> {
  if (!rawToken || typeof rawToken !== 'string') {
    return null;
  }

  const db = getDatabaseAdapter();
  const tokenHash = hashToken(rawToken);
  const nowIso = new Date().toISOString();

  const query = `
    SELECT 
      s.id as session_id,
      s.user_id,
      s.role,
      s.student_id,
      s.representative_id,
      s.expires_at,
      u.email,
      u.username,
      u.status,
      u.first_name,
      u.last_name,
      u.avatar_asset_key,
      stu.student_code
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    LEFT JOIN students stu ON stu.id = s.student_id
    WHERE s.token_hash = ? AND s.expires_at > ? AND u.status = 'ACTIVE'
  `;

  const row = await db.queryOne<any>(query, [tokenHash, nowIso]);
  if (!row) {
    return null;
  }

  return {
    id: row.session_id,
    userId: row.user_id,
    email: row.email,
    username: row.username,
    role: row.role as UserRole,
    firstName: row.first_name,
    lastName: row.last_name,
    avatarUrl: row.avatar_asset_key ? `/avatars/${row.avatar_asset_key}.png` : undefined,
    studentId: row.student_id || undefined,
    studentCode: row.student_code || undefined,
    representativeId: row.representative_id || undefined,
    expiresAt: row.expires_at,
  };
}

export async function invalidateSession(rawToken: string): Promise<boolean> {
  if (!rawToken) return false;
  const db = getDatabaseAdapter();
  const tokenHash = hashToken(rawToken);
  const result = await db.execute('DELETE FROM sessions WHERE token_hash = ?', [tokenHash]);
  return Number(result.rowsAffected) > 0;
}

export async function invalidateAllUserSessions(userId: string): Promise<number> {
  const db = getDatabaseAdapter();
  const result = await db.execute('DELETE FROM sessions WHERE user_id = ?', [userId]);
  return Number(result.rowsAffected);
}

export async function cleanupExpiredSessions(): Promise<number> {
  const db = getDatabaseAdapter();
  const nowIso = new Date().toISOString();
  const result = await db.execute('DELETE FROM sessions WHERE expires_at <= ?', [nowIso]);
  return Number(result.rowsAffected);
}
