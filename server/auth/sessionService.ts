import { getDb } from '../db/database';
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
  UserRow,
  StudentRow,
  RepresentativeRow,
} from './types';

const DEFAULT_TTL_HOURS = 72;

export function getSessionTtlHours(): number {
  const envTtl = Number(process.env.SESSION_TTL_HOURS);
  return !isNaN(envTtl) && envTtl > 0 ? envTtl : DEFAULT_TTL_HOURS;
}

export function createSession(
  userId: string,
  role: UserRole,
  ip: string,
  userAgent?: string
): { token: string; session: SessionRow } {
  const db = getDb();
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
    const stu = db.prepare('SELECT id FROM students WHERE user_id = ?').get(userId) as { id: string } | undefined;
    studentId = stu ? stu.id : null;
  } else if (role === 'REPRESENTATIVE') {
    const rep = db.prepare('SELECT id FROM representatives WHERE user_id = ?').get(userId) as { id: string } | undefined;
    representativeId = rep ? rep.id : null;
  }

  const insertStmt = db.prepare(`
    INSERT INTO sessions (id, user_id, token_hash, role, student_id, representative_id, ip_hash, user_agent, expires_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `);

  insertStmt.run(
    sessionId,
    userId,
    tokenHash,
    role,
    studentId,
    representativeId,
    ipHashed,
    userAgent || null,
    expiresAt
  );

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

export function validateSession(rawToken: string): AuthSessionUser | null {
  if (!rawToken || typeof rawToken !== 'string') {
    return null;
  }

  const db = getDb();
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

  const row = db.prepare(query).get(tokenHash, nowIso) as any;
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

export function invalidateSession(rawToken: string): boolean {
  if (!rawToken) return false;
  const db = getDb();
  const tokenHash = hashToken(rawToken);
  const result = db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(tokenHash);
  return Number(result.changes) > 0;
}

export function invalidateAllUserSessions(userId: string): number {
  const db = getDb();
  const result = db.prepare('DELETE FROM sessions WHERE user_id = ?').run(userId);
  return Number(result.changes);
}

export function cleanupExpiredSessions(): number {
  const db = getDb();
  const nowIso = new Date().toISOString();
  const result = db.prepare('DELETE FROM sessions WHERE expires_at <= ?').run(nowIso);
  return Number(result.changes);
}

