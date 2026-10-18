import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getDatabaseAdapter } from '../db/dal';
import { verifyPassword, verifyPin, hashPassword, hashPin, hashToken, generateUuid } from '../auth/crypto';
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
  studentCode: z.string().min(1).optional(),
  identifier: z.string().min(1).optional(),
  pinCode: z.string().regex(/^\d{4,6}$/).optional(),
  pin: z.string().regex(/^\d{4,6}$/).optional(),
}).refine(
  (data) => Boolean(data.studentCode || data.identifier) && Boolean(data.pinCode || data.pin),
  { message: 'Código/identificador de estudiante y PIN numérico (4 a 6 dígitos) requeridos.' }
);

// 3. Esquema de recuperación
const recoverSchema = z.object({
  identifier: z.string().min(3, 'Identificador requerido.'),
});

/**
 * Helper para setear la cookie de sesión HttpOnly segura
 */
function setSessionCookie(res: Response, token: string, req?: Request): void {
  const isProd = process.env.NODE_ENV === 'production';
  const isHttps = isProd || Boolean(req?.secure) || req?.headers['x-forwarded-proto'] === 'https';
  const maxAgeSeconds = 72 * 3600; // 72 horas
  let cookieHeader = `alsiz_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
  if (isHttps) {
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
    const db = getDatabaseAdapter();
    const cleanId = identifier.trim().toLowerCase();

    const user = await db.queryOne<any>(
      'SELECT * FROM users WHERE LOWER(email) = ? OR LOWER(username) = ?',
      [cleanId, cleanId]
    );

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
    const { token, session } = await createSession(user.id, user.role as UserRole, req.ip || '127.0.0.1', req.get('user-agent'));
    setSessionCookie(res, token, req);

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
const handlePinLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const raw = pinLoginSchema.parse(req.body);
    const db = getDatabaseAdapter();
    const cleanCode = (raw.studentCode || raw.identifier || '').trim().toUpperCase();
    const pinCode = raw.pinCode || raw.pin || '';

    const studentRow = await db.queryOne<any>(`
      SELECT s.*, u.id as user_id, u.username, u.email, u.role, u.status, u.first_name, u.last_name, u.avatar_asset_key
      FROM students s
      JOIN users u ON u.id = s.user_id
      WHERE UPPER(s.student_code) = ? 
         OR UPPER(s.id) = ?
         OR UPPER(u.username) = ?
         OR UPPER(u.email) = ?
    `, [cleanCode, cleanCode, cleanCode, cleanCode]);

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

    const { token, session } = await createSession(
      studentRow.user_id,
      'STUDENT',
      req.ip || '127.0.0.1',
      req.get('user-agent')
    );
    setSessionCookie(res, token, req);

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
};

authRouter.post('/pin-login', authRateLimiter, handlePinLogin);
authRouter.post('/login-pin', authRateLimiter, handlePinLogin);

/**
 * POST /api/v1/auth/logout
 * Cierre de sesión seguro con revocación inmediata del token en base de datos
 */
authRouter.post('/logout', async (req: Request, res: Response) => {
  const token = extractSessionToken(req);
  if (token) {
    await invalidateSession(token);
  }
  // Eliminar cookie del cliente preservando SameSite y Secure
  const isProd = process.env.NODE_ENV === 'production';
  const isHttps = isProd || Boolean(req.secure) || req.headers['x-forwarded-proto'] === 'https';
  let cookieHeader = 'alsiz_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';
  if (isHttps) {
    cookieHeader += '; Secure';
  }
  res.setHeader('Set-Cookie', cookieHeader);
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
    data: {
      user: req.user,
      ...req.user,
    },
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
    const db = getDatabaseAdapter();
    const cleanId = identifier.trim().toLowerCase();

    const user = await db.queryOne<any>(
      'SELECT id, email FROM users WHERE LOWER(email) = ? OR LOWER(username) = ?',
      [cleanId, cleanId]
    );

    if (user) {
      const resetToken = generateUuid();
      const resetTokenHash = hashToken(resetToken);
      const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString(); // 1 hora

      await db.execute(`
        INSERT INTO password_resets (id, user_id, reset_token_hash, expires_at)
        VALUES (?, ?, ?, ?);
      `, [generateUuid(), user.id, resetTokenHash, expiresAt]);

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

/**
 * POST /api/v1/auth/google
 * Validación segura en el servidor del token de Google Sign-In (OWASP Token Verification)
 */
const googleLoginSchema = z.object({
  idToken: z.string().min(10, 'Token de Google requerido.'),
});

authRouter.post('/google', authRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idToken } = googleLoginSchema.parse(req.body);

    let googleData: any;
    try {
      const gRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
      if (!gRes.ok) {
        res.status(401).json({
          success: false,
          error: {
            code: 'AUTH_GOOGLE_INVALID_TOKEN',
            message: 'El token de Google no es válido o ha expirado.',
          },
          timestamp: new Date().toISOString(),
        });
        return;
      }
      googleData = await gRes.json();
    } catch {
      res.status(502).json({
        success: false,
        error: {
          code: 'AUTH_GOOGLE_VERIFICATION_FAILED',
          message: 'No se pudo comunicar con los servidores de Google para validar la identidad.',
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const email = googleData?.email?.toLowerCase()?.trim();
    if (!email) {
      res.status(400).json({
        success: false,
        error: {
          code: 'AUTH_GOOGLE_EMAIL_MISSING',
          message: 'No se pudo obtener el correo asociado a la cuenta de Google.',
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const db = getDatabaseAdapter();
    const user = await db.queryOne<any>('SELECT * FROM users WHERE LOWER(email) = ?', [email]);

    if (!user) {
      recordAuditEvent({
        userId: null,
        eventType: 'AUTH_FAILURE',
        resourceType: 'auth',
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { reason: 'GOOGLE_USER_NOT_REGISTERED', emailAttempted: email },
      });

      res.status(404).json({
        success: false,
        error: {
          code: 'AUTH_USER_NOT_REGISTERED',
          message: `La cuenta de Google (${email}) no se encuentra inscrita en la institución.`,
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

    const { token, session } = await createSession(user.id, user.role as UserRole, req.ip || '127.0.0.1', req.get('user-agent'));
    setSessionCookie(res, token, req);

    recordAuditEvent({
      userId: user.id,
      eventType: 'AUTH_SUCCESS',
      resourceType: 'auth',
      resourceId: session.id,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      details: { role: user.role, loginMethod: 'GOOGLE', email },
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
 * POST /api/v1/auth/change-password
 * Actualización segura de contraseña para usuario autenticado
 */
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Contraseña actual requerida.'),
  newPassword: z.string().min(6, 'La nueva contraseña debe tener al menos 6 caracteres.'),
});

authRouter.post('/change-password', requireAuth, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'No autenticado.' } });
      return;
    }

    const db = getDatabaseAdapter();
    const user = await db.queryOne<any>('SELECT * FROM users WHERE id = ?', [userId]);
    if (!user) {
      res.status(404).json({ success: false, error: { code: 'USER_NOT_FOUND', message: 'Usuario no encontrado.' } });
      return;
    }

    let isCurrentValid = verifyPassword(currentPassword, user.password_hash);
    if (!isCurrentValid && user.role === 'STUDENT') {
      const studentRow = await db.queryOne<any>('SELECT pin_code_hash FROM students WHERE user_id = ?', [userId]);
      if (studentRow?.pin_code_hash && verifyPin(currentPassword, studentRow.pin_code_hash)) {
        isCurrentValid = true;
      }
    }

    if (!isCurrentValid) {
      res.status(400).json({
        success: false,
        error: { code: 'AUTH_INVALID_CURRENT_PASSWORD', message: 'La contraseña o PIN actual no coincide.' },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const newHash = hashPassword(newPassword);
    await db.execute("UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?", [newHash, userId]);

    recordAuditEvent({
      userId,
      eventType: 'AUTH_PASSWORD_CHANGED',
      resourceType: 'users',
      resourceId: userId,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      details: { role: user.role },
    });

    res.json({
      success: true,
      data: { message: 'Contraseña actualizada exitosamente.' },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/auth/change-pin
 * Actualización de PIN táctil de estudiante autenticado
 */
const changePinSchema = z.object({
  currentPin: z.string().regex(/^\d{4,6}$/, 'PIN actual requerido (4-6 dígitos).'),
  newPin: z.string().regex(/^\d{4,6}$/, 'El nuevo PIN debe componerse de 4 a 6 dígitos numéricos.'),
});

authRouter.post('/change-pin', requireAuth, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { currentPin, newPin } = changePinSchema.parse(req.body);
    const userId = req.user?.userId;
    if (!userId || req.user?.role !== 'STUDENT') {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Operación válida únicamente para estudiantes.' } });
      return;
    }

    const db = getDatabaseAdapter();
    const student = await db.queryOne<any>('SELECT id, pin_code_hash FROM students WHERE user_id = ?', [userId]);
    if (!student || !student.pin_code_hash || !verifyPin(currentPin, student.pin_code_hash)) {
      res.status(400).json({ success: false, error: { code: 'AUTH_INVALID_CURRENT_PIN', message: 'El PIN actual no coincide.' } });
      return;
    }

    const newPinHash = hashPin(newPin);
    await db.execute('UPDATE students SET pin_code_hash = ? WHERE id = ?', [newPinHash, student.id]);

    recordAuditEvent({
      userId,
      eventType: 'AUTH_PIN_CHANGED',
      resourceType: 'students',
      resourceId: student.id,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      details: { studentId: student.id },
    });

    res.json({
      success: true,
      data: { message: 'PIN táctil actualizado exitosamente.' },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    next(err);
  }
});

