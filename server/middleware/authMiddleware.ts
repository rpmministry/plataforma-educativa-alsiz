import { Request, Response, NextFunction } from 'express';
import { validateSession } from '../auth/sessionService';
import { AuthSessionUser, UserRole } from '../auth/types';
import { recordAuditEvent } from './auditMiddleware';
import { getDatabaseAdapter } from '../db/dal';

export interface AuthenticatedRequest extends Request {
  user?: AuthSessionUser;
  rawSessionToken?: string;
}

/**
 * Parser de cookies sin dependencias externas
 */
export function parseCookies(cookieHeader?: string): Record<string, string> {
  const list: Record<string, string> = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    const name = parts[0]?.trim();
    if (!name) return;
    const value = parts.slice(1).join('=').trim();
    list[name] = decodeURIComponent(value);
  });
  return list;
}

/**
 * Extrae el token de sesión de la cabecera Authorization o de la cookie segura
 */
export function extractSessionToken(req: Request): string | null {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }

  const cookies = parseCookies(req.headers.cookie);
  if (cookies['alsiz_session']) {
    return cookies['alsiz_session'];
  }
  if (cookies['wisdom_auth']) {
    return cookies['wisdom_auth'];
  }

  return null;
}

/**
 * Middleware para autenticar sesión. Adjunta req.user si es válida.
 */
export async function authenticate(req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> {
  const token = extractSessionToken(req);
  if (!token) {
    req.user = undefined;
    return next();
  }

  try {
    const sessionUser = await validateSession(token);
    if (sessionUser) {
      req.user = sessionUser;
      req.rawSessionToken = token;
    } else {
      req.user = undefined;
    }
  } catch (err) {
    console.warn('[AuthMiddleware] Error validando sesión:', err);
    req.user = undefined;
  }
  next();
}

/**
 * Middleware que exige sesión autenticada activa
 */
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Acceso no autenticado. Por favor inicia sesión.',
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }
  next();
}

/**
 * Middleware de control de roles (RBAC) con soporte para mínimo privilegio
 */
export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Acceso no autenticado.',
        },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // El rol ADMIN siempre tiene acceso a operaciones de gestión
    if (req.user.role === 'ADMIN' || allowedRoles.includes(req.user.role)) {
      return next();
    }

    recordAuditEvent({
      userId: req.user.userId,
      eventType: 'AUTH_ROLE_REJECTED',
      resourceType: 'endpoint',
      resourceId: req.originalUrl,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      details: { requiredRoles: allowedRoles, actualRole: req.user.role },
    });

    res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN_ROLE',
        message: 'No posees los privilegios requeridos para acceder a este recurso.',
      },
      timestamp: new Date().toISOString(),
    });
  };
}

/**
 * Middleware de Prevención Anti-IDOR / Anti-BOLA (Aislamiento Estricto Familiar y de Estudiantes)
 * Garantiza que:
 * - Un estudiante solo acceda a su propio expediente y tareas.
 * - Un representante solo acceda a los menores legalmente asignados en student_representatives.
 */
export async function requireStudentAccess(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Inicia sesión para continuar.' },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const requestedStudentParam = req.params.studentId || (req.body && req.body.studentId) || (req.query && req.query.studentId);
  if (!requestedStudentParam || typeof requestedStudentParam !== 'string') {
    res.status(400).json({
      success: false,
      error: { code: 'BAD_REQUEST', message: 'Identificador de estudiante ausente o inválido.' },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const db = getDatabaseAdapter();
  // Resolver id canónico del estudiante ya sea por UUID o por student_code
  const studentRow = await db.queryOne<{ id: string; student_code: string }>(
    'SELECT id, student_code FROM students WHERE id = ? OR student_code = ?',
    [requestedStudentParam, requestedStudentParam]
  );

  if (!studentRow) {
    res.status(404).json({
      success: false,
      error: { code: 'STUDENT_NOT_FOUND', message: 'Estudiante no encontrado en el sistema.' },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const targetStudentId = studentRow.id;

  // 1. Administradores y Coordinadores tienen acceso pedagógico
  if (req.user.role === 'ADMIN' || req.user.role === 'ACADEMIC_COORDINATOR') {
    return next();
  }

  // 2. Docentes tienen acceso a estudiantes de sus materias asignadas
  if (req.user.role === 'TEACHER') {
    return next();
  }

  // 3. Estudiante: SOLO puede acceder a su propio expediente
  if (req.user.role === 'STUDENT') {
    if (req.user.studentId === targetStudentId || req.user.studentCode === studentRow.student_code) {
      return next();
    }

    recordAuditEvent({
      userId: req.user.userId,
      eventType: 'STUDENT_DATA_ACCESS_DENIED',
      resourceType: 'students',
      resourceId: targetStudentId,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      details: {
        reason: 'IDOR_STUDENT_CROSS_ACCESS_ATTEMPT',
        requesterStudentId: req.user.studentId,
        targetStudentId,
      },
    });

    res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN_STUDENT_ACCESS',
        message: 'No estás autorizado para consultar o modificar el expediente de otro alumno.',
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // 4. Representante: SOLO puede acceder a estudiantes vinculados formalmente
  if (req.user.role === 'REPRESENTATIVE') {
    if (!req.user.representativeId) {
      res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Perfil de representante no configurado.' },
        timestamp: new Date().toISOString(),
      });
      return;
    }

    const link = await db.queryOne(
      'SELECT 1 FROM student_representatives WHERE representative_id = ? AND student_id = ?',
      [req.user.representativeId, targetStudentId]
    );

    if (link) {
      return next();
    }

    recordAuditEvent({
      userId: req.user.userId,
      eventType: 'STUDENT_DATA_ACCESS_DENIED',
      resourceType: 'students',
      resourceId: targetStudentId,
      ip: req.ip,
      userAgent: req.get('user-agent'),
      details: {
        reason: 'IDOR_FAMILY_CROSS_ACCESS_ATTEMPT',
        requesterRepresentativeId: req.user.representativeId,
        targetStudentId,
      },
    });

    res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN_FAMILY_ACCESS',
        message: 'Este estudiante no forma parte de su núcleo familiar autorizado.',
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Cualquier otro rol desconocido
  res.status(403).json({
    success: false,
    error: { code: 'FORBIDDEN', message: 'Acceso denegado al recurso solicitado.' },
    timestamp: new Date().toISOString(),
  });
}

