import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getDb } from '../db/database';
import { verifyPassword, verifyPin, hashToken, generateUuid } from '../auth/crypto';
import { createSession, invalidateSession } from '../auth/sessionService';
import { AuthenticatedRequest, requireAuth, extractSessionToken } from '../middleware/authMiddleware';
import { recordAuditEvent } from '../middleware/auditMiddleware';
import { authRateLimiter } from '../middleware/rateLimiter';
import { UserRole } from '../auth/types';

export const authRouter = Router();

// 1. Esquema de validación para Login tradicional
const loginSchema = z.object({
  identifier: z.string().min(3, 'El identificador debe tener al menos 3 caracteres.'),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres.'),
});

// 2. Esquema de validación para PIN Login en iPad/tableta
const pinLoginSchema = z.object({
  studentCode: z.string().min(3, 'Código de estudiante requerido.'),
  pinCode: z.string().regex(/^\d{4,6}$/, 'El PIN debe componerse de 4 a 6 dígitos numéricos.'),
});

// 3. Esquema de recuperación
const recoverSchema = z.object({
  identifier: z.string().min(3, 'Identificador requerido.'),
});

/**
 * Helper para setear la cookie de sesión HttpOnly segura
 */
function setSessionCookie(res: Response, token: string): void {
  const isProd = process.env.NODE_ENV === 'production';
  const maxAgeSeconds = 72 * 3600; // 72 horas
  let cookieHeader = `alsiz_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
  if (isProd) {
    cookieHeader += '; Secure';
  }
  res.setHeader('Set-Cookie', cookieHeader);
}

/**
 * POST /api/v1/auth/login
 * Inicio de sesión seguro con correo/usuario y contraseña
 */
authRouter.post('/login', authRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { identifier, password } = loginSchema.parse(req.body);
    const db = getDb();
    const cleanId = identifier.trim().toLowerCase();

    const user = db
      .prepare(
        'SELECT * FROM users WHERE LOWER(email) = ? OR LOWER(username) = ?'
      )
      .get(cleanId, cleanId) as any;

    if (!user || !verifyPassword(password, user.password_hash)) {
      recordAuditEvent({
        userId: user ? user.id : null,
        eventType: 'AUTH_FAILURE',
        resourceType: 'auth',
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { reason: 'INVALID_CREDENTIALS', identifierAttempted: cleanId },
      });

      res.status(401).json({
        success: false,
        error: {
          code: 'AUTH_INVALID_CREDENTIALS',
          message: 'Identificador o contraseña incorrectos.',
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (user.status !== 'ACTIVE') {
      res.status(403).json({
        success: false,
        error: {
          code: 'AUTH_ACCOUNT_INACTIVE',
          message: 'Esta cuenta se encuentra inactiva o suspendida.',
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Crear sesión de servidor
    const { token, session } = createSession(user.id, user.role as UserRole, req.ip || '127.0.0.1', req.get('user-agent'));
    setSessionCookie(res, token);

    recordAuditEvent({
      userId: user.id,
      eventType: 'AUTH_SUCCESS',
      resourceType: 'auth',
      resourceId: session.id,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      details: { role: user.role, loginMethod: 'PASSWORD' },
    });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          firstName: user.first_name,
          lastName: user.last_name,
          avatarUrl: user.avatar_asset_key ? `/avatars/${user.avatar_asset_key}.png` : undefined,
          studentId: session.student_id,
          representativeId: session.representative_id,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/auth/pin-login
 * Inicio de sesión táctil simplificado para estudiantes pequeños (ej. Gael en iPad)
 */
authRouter.post('/pin-login', authRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentCode, pinCode } = pinLoginSchema.parse(req.body);
    const db = getDb();
    const cleanCode = studentCode.trim().toUpperCase();

    const studentRow = db
      .prepare(`
        SELECT s.*, u.id as user_id, u.username, u.email, u.role, u.status, u.first_name, u.last_name, u.avatar_asset_key
        FROM students s
        JOIN users u ON u.id = s.user_id
        WHERE UPPER(s.student_code) = ? OR UPPER(s.id) = ?
      `)
      .get(cleanCode, cleanCode) as any;

    if (!studentRow || !studentRow.pin_code_hash || !verifyPin(pinCode, studentRow.pin_code_hash)) {
      recordAuditEvent({
        userId: studentRow ? studentRow.user_id : null,
        eventType: 'AUTH_FAILURE',
        resourceType: 'auth',
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { reason: 'INVALID_PIN', studentCodeAttempted: cleanCode },
      });

      res.status(401).json({
        success: false,
        error: {
          code: 'AUTH_INVALID_PIN',
          message: 'Código de estudiante o PIN incorrecto.',
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    if (studentRow.status !== 'ACTIVE') {
      res.status(403).json({
        success: false,
        error: {
          code: 'AUTH_ACCOUNT_INACTIVE',
          message: 'La cuenta del estudiante no se encuentra activa.',
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const { token, session } = createSession(
      studentRow.user_id,
      'STUDENT',
      req.ip || '127.0.0.1',
      req.get('user-agent')
    );
    setSessionCookie(res, token);

    recordAuditEvent({
      userId: studentRow.user_id,
      eventType: 'AUTH_SUCCESS',
      resourceType: 'auth',
      resourceId: session.id,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      details: { role: 'STUDENT', studentCode: cleanCode, loginMethod: 'PIN' },
    });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: studentRow.user_id,
          username: studentRow.username,
          email: studentRow.email,
          role: 'STUDENT',
          firstName: studentRow.first_name,
          lastName: studentRow.last_name,
          avatarUrl: studentRow.avatar_asset_key ? `/avatars/${studentRow.avatar_asset_key}.png` : undefined,
          studentId: studentRow.id,
          studentCode: studentRow.student_code,
        },
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/auth/logout
 * Cierre de sesión seguro con revocación inmediata del token en base de datos
 */
authRouter.post('/logout', (req: Request, res: Response) => {
  const token = extractSessionToken(req);
  if (token) {
    invalidateSession(token);
  }
  // Eliminar cookie del cliente
  res.setHeader('Set-Cookie', 'alsiz_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
  res.json({
    success: true,
    data: { message: 'Sesión finalizada exitosamente.' },
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/v1/auth/me
 * Retorna los datos de identidad y sesión del usuario autenticado
 */
authRouter.get('/me', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    data: req.user,
    timestamp: new Date().toISOString(),
  });
});

/**
 * POST /api/v1/auth/recover-access
 * Solicitud segura de recuperación sin divulgación de existencia de cuentas (OWASP Anti-Enumeration)
 */
authRouter.post('/recover-access', authRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { identifier } = recoverSchema.parse(req.body);
    const db = getDb();
    const cleanId = identifier.trim().toLowerCase();

    const user = db
      .prepare('SELECT id, email FROM users WHERE LOWER(email) = ? OR LOWER(username) = ?')
      .get(cleanId, cleanId) as any;

    if (user) {
      const resetToken = generateUuid();
      const resetTokenHash = hashToken(resetToken);
      const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString(); // 1 hora

      db.prepare(`
        INSERT INTO password_resets (id, user_id, reset_token_hash, expires_at)
        VALUES (?, ?, ?, ?);
      `).run(generateUuid(), user.id, resetTokenHash, expiresAt);

      recordAuditEvent({
        userId: user.id,
        eventType: 'AUTH_RECOVERY_REQUESTED',
        resourceType: 'password_resets',
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { email: user.email },
      });
    }

    // Respuesta genérica idéntica tanto si el usuario existe como si no existe
    res.json({
      success: true,
      data: {
        message:
          'Si el identificador ingresado corresponde a una cuenta activa, se han generado instrucciones de acceso.',
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

