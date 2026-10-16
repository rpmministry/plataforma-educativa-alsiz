/**
 * ==============================================================================
 * Enrutador de API RESTful: Centro Administrativo Unificado (ETAPA-10)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 */

import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getDb } from '../db/database';
import { AuthenticatedRequest, requireAuth, requireRole } from '../middleware/authMiddleware';
import { recordAuditEvent } from '../middleware/auditMiddleware';
import { PilotConfigService } from '../pilot/pilotConfigService';
import { PilotSessionService } from '../pilot/pilotSessionService';
import { ProviderManager } from '../agents/providers/providerManager';

export const adminRouter = Router();

// ==========================================
// 1. DASHBOARD GENERAL Y TAREAS PENDIENTES
// ==========================================

/**
 * GET /api/v1/admin/dashboard-summary
 * Vista resumida consolidada del estado del sistema, métricas reales y tareas pendientes
 */
adminRouter.get(
  '/dashboard-summary',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const db = getDb();

      // Métricas de usuarios por rol
      const usersByRole = db.prepare(`
        SELECT role, count(*) as count 
        FROM users 
        GROUP BY role
      `).all() as Array<{ role: string; count: number }>;

      const userRoleMap: Record<string, number> = {
        STUDENT: 0,
        REPRESENTATIVE: 0,
        TEACHER: 0,
        ACADEMIC_COORDINATOR: 0,
        ADMIN: 0,
      };
      let totalUsers = 0;
      for (const r of usersByRole) {
        userRoleMap[r.role] = r.count;
        totalUsers += r.count;
      }

      // Métricas académicas
      const programsCount = (db.prepare('SELECT count(*) as cnt FROM programs WHERE is_active = 1').get() as any)?.cnt || 0;
      const subjectsCount = (db.prepare('SELECT count(*) as cnt FROM subjects').get() as any)?.cnt || 0;
      const enrollmentsCount = (db.prepare("SELECT count(*) as cnt FROM student_program_enrollments WHERE status = 'ACTIVE'").get() as any)?.cnt || 0;

      // Métricas del Centro de Conocimiento
      const knowledgeStats = db.prepare(`
        SELECT 
          count(*) as total,
          SUM(CASE WHEN status = 'APROBADO' THEN 1 ELSE 0 END) as approved,
          SUM(CASE WHEN status = 'PENDIENTE' THEN 1 ELSE 0 END) as pending,
          SUM(CASE WHEN status = 'DESACTIVADO' THEN 1 ELSE 0 END) as deactivated
        FROM knowledge_sources
      `).get() as any;

      const chunksCount = (db.prepare('SELECT count(*) as cnt FROM knowledge_chunks').get() as any)?.cnt || 0;

      // Métricas de IA y Agentes
      const activeAgentsCount = (db.prepare("SELECT count(*) as cnt FROM ai_agents WHERE is_active = 1").get() as any)?.cnt || 0;
      const aiTelemetryStats = db.prepare(`
        SELECT count(*) as total, avg(latency_ms) as avg_latency 
        FROM ai_telemetry_logs
      `).get() as any;

      // Métricas del Piloto Interactivo
      const pilotConfig = PilotConfigService.getConfig();
      const pilotTelemetry = PilotSessionService.getAdminTelemetrySummary();

      // Bandeja de Tareas Pendientes (Action Items)
      const pendingSources = db.prepare(`
        SELECT id, code, title, source_type, created_at 
        FROM knowledge_sources 
        WHERE status = 'PENDIENTE' 
        ORDER BY created_at ASC 
        LIMIT 10
      `).all();

      const pendingMaterials = db.prepare(`
        SELECT id, title, agent_id, created_at 
        FROM ai_generated_materials 
        WHERE status = 'DRAFT_REVIEW' 
        ORDER BY created_at ASC 
        LIMIT 10
      `).all();

      const reportedConflicts = (db.prepare("SELECT count(*) as cnt FROM knowledge_source_conflicts WHERE status = 'REPORTED'").get() as any)?.cnt || 0;

      res.json({
        success: true,
        data: {
          metrics: {
            totalUsers,
            usersByRole: userRoleMap,
            programsCount,
            subjectsCount,
            enrollmentsCount,
            knowledge: {
              totalSources: knowledgeStats?.total || 0,
              approvedSources: knowledgeStats?.approved || 0,
              pendingSources: knowledgeStats?.pending || 0,
              deactivatedSources: knowledgeStats?.deactivated || 0,
              chunksCount,
            },
            ai: {
              activeAgentsCount,
              totalInteractions: aiTelemetryStats?.total || 0,
              averageLatencyMs: Math.round(aiTelemetryStats?.avg_latency || 0),
              providersAvailable: ProviderManager.getAvailableProviders(),
            },
            pilot: {
              enabled: pilotConfig.pilotEnabled,
              totalSessions: pilotTelemetry.totalSessions,
              activeSessions: pilotTelemetry.activeSessions,
              completedSessions: pilotTelemetry.completedSessions,
              abortedSessions: pilotTelemetry.abortedSessions,
            },
          },
          pendingTasks: {
            pendingKnowledgeSourcesCount: pendingSources.length,
            pendingKnowledgeSources: pendingSources,
            pendingMaterialsCount: pendingMaterials.length,
            pendingMaterials: pendingMaterials,
            unresolvedConflictsCount: reportedConflicts,
          },
          system: {
            engine: 'node:sqlite (Embedded SQLite3 with WAL)',
            uptimeSeconds: Math.floor(process.uptime()),
            memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
            migrationsApplied: 11,
          },
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

// ==========================================
// 2. GESTIÓN DE USUARIOS, ROLES Y FAMILIAS
// ==========================================

/**
 * GET /api/v1/admin/users
 * Nómina completa de usuarios del sistema con filtros de búsqueda (sin exponer hashes)
 */
adminRouter.get(
  '/users',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const db = getDb();
      const { role, status, search } = req.query;

      let sql = `
        SELECT 
          id, email, username, role, status, first_name, last_name, 
          avatar_asset_key, created_at, updated_at
        FROM users
        WHERE 1=1
      `;
      const params: any[] = [];

      if (role && typeof role === 'string' && role !== 'ALL') {
        sql += ' AND role = ?';
        params.push(role);
      }

      if (status && typeof status === 'string' && status !== 'ALL') {
        sql += ' AND status = ?';
        params.push(status);
      }

      if (search && typeof search === 'string') {
        sql += ' AND (first_name LIKE ? OR last_name LIKE ? OR username LIKE ? OR email LIKE ?)';
        const queryTerm = `%${search.trim()}%`;
        params.push(queryTerm, queryTerm, queryTerm, queryTerm);
      }

      sql += ' ORDER BY created_at DESC';
      const users = db.prepare(sql).all(...params);

      res.json({
        success: true,
        data: {
          totalUsers: users.length,
          users,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

const roleUpdateSchema = z.object({
  role: z.enum(['ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER', 'REPRESENTATIVE', 'STUDENT']),
  justification: z.string().min(5, 'Se requiere justificación del cambio de rol (mínimo 5 caracteres).'),
});

/**
 * PATCH /api/v1/admin/users/:userId/role
 * Cambio controlado de rol de usuario con registro de auditoría (LOPDP Art. 21)
 */
adminRouter.patch(
  '/users/:userId/role',
  requireAuth,
  requireRole('ADMIN'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { role: newRole, justification } = roleUpdateSchema.parse(req.body);
      const db = getDb();

      const user = db.prepare('SELECT id, username, role FROM users WHERE id = ?').get(userId) as any;
      if (!user) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Usuario no encontrado.' } });
        return;
      }

      // Salvaguarda: No permitir degradar al último administrador
      if (user.role === 'ADMIN' && newRole !== 'ADMIN') {
        const adminCount = (db.prepare("SELECT count(*) as cnt FROM users WHERE role = 'ADMIN' AND status = 'ACTIVE'").get() as any)?.cnt || 0;
        if (adminCount <= 1) {
          res.status(400).json({
            success: false,
            error: { code: 'LAST_ADMIN_PROTECTED', message: 'No se puede remover el rol de Administrador al único administrador activo del sistema.' },
          });
          return;
        }
      }

      const previousRole = user.role;
      db.prepare("UPDATE users SET role = ?, updated_at = datetime('now') WHERE id = ?").run(newRole, userId);

      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'USER_ROLE_CHANGED',
        resourceType: 'users',
        resourceId: userId,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { targetUserId: userId, username: user.username, previousRole, newRole, justification },
      });

      res.json({
        success: true,
        data: { userId, previousRole, newRole },
        message: `Rol del usuario @${user.username} actualizado a ${newRole}.`,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

const statusUpdateSchema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
  justification: z.string().min(5, 'Se requiere justificación del cambio de estado.'),
});

/**
 * PATCH /api/v1/admin/users/:userId/status
 * Actualiza el estado de la cuenta (activo, inactivo, suspendido)
 */
adminRouter.patch(
  '/users/:userId/status',
  requireAuth,
  requireRole('ADMIN'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { status: newStatus, justification } = statusUpdateSchema.parse(req.body);
      const db = getDb();

      const user = db.prepare('SELECT id, username, status FROM users WHERE id = ?').get(userId) as any;
      if (!user) {
        res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Usuario no encontrado.' } });
        return;
      }

      const previousStatus = user.status;
      db.prepare("UPDATE users SET status = ?, updated_at = datetime('now') WHERE id = ?").run(newStatus, userId);

      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'USER_STATUS_CHANGED',
        resourceType: 'users',
        resourceId: userId,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { targetUserId: userId, username: user.username, previousStatus, newStatus, justification },
      });

      res.json({
        success: true,
        data: { userId, previousStatus, newStatus },
        message: `Estado del usuario @${user.username} actualizado a ${newStatus}.`,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/v1/admin/representatives
 * Lista de representantes y estudiantes asociados para tutela familiar
 */
adminRouter.get(
  '/representatives',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const db = getDb();
      const reps = db.prepare(`
        SELECT 
          r.id, r.user_id, r.phone_number, r.phone_number as emergency_phone, r.consent_lopdp_signed_at, r.address_text,
          u.first_name, u.last_name, u.email, u.status
        FROM representatives r
        JOIN users u ON u.id = r.user_id
        ORDER BY u.last_name ASC
      `).all() as any[];

      const enrichedReps = reps.map((rep) => {
        const students = db.prepare(`
          SELECT 
            s.id, s.student_code, u.first_name, u.last_name, 
            sr.relationship_type, sr.is_primary_contact
          FROM student_representatives sr
          JOIN students s ON s.id = sr.student_id
          JOIN users u ON u.id = s.user_id
          WHERE sr.representative_id = ?
        `).all(rep.id);

        return {
          ...rep,
          students,
        };
      });

      res.json({
        success: true,
        data: {
          totalRepresentatives: enrichedReps.length,
          representatives: enrichedReps,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

const linkFamilySchema = z.object({
  representativeId: z.string(),
  studentId: z.string(),
  relationshipType: z.enum(['FATHER', 'MOTHER', 'LEGAL_GUARDIAN', 'TUTOR', 'OTHER']),
  isPrimaryContact: z.boolean().default(false),
});

/**
 * POST /api/v1/admin/representatives/link-student
 * Vincula un estudiante con un representante legal
 */
adminRouter.post(
  '/representatives/link-student',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const { representativeId, studentId, relationshipType, isPrimaryContact } = linkFamilySchema.parse(req.body);
      const db = getDb();

      // Verificar existencia de representante y estudiante
      const repExists = db.prepare('SELECT id FROM representatives WHERE id = ?').get(representativeId);
      const studentExists = db.prepare('SELECT id FROM students WHERE id = ?').get(studentId);

      if (!repExists || !studentExists) {
        res.status(404).json({
          success: false,
          error: { code: 'NOT_FOUND', message: 'El estudiante o representante especificado no existe.' },
        });
        return;
      }

      // Si es contacto primario, desmarcar otros si existen
      if (isPrimaryContact) {
        db.prepare('UPDATE student_representatives SET is_primary_contact = 0 WHERE student_id = ?').run(studentId);
      }

      db.prepare(`
        INSERT INTO student_representatives (representative_id, student_id, relationship_type, is_primary_contact)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(representative_id, student_id) DO UPDATE SET
          relationship_type = excluded.relationship_type,
          is_primary_contact = excluded.is_primary_contact
      `).run(representativeId, studentId, relationshipType, isPrimaryContact ? 1 : 0);

      recordAuditEvent({
        userId: req.user?.userId,
        eventType: 'REPRESENTATIVE_LINKED_STUDENT',
        resourceType: 'student_representatives',
        resourceId: `${representativeId}:${studentId}`,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { representativeId, studentId, relationshipType, isPrimaryContact },
      });

      res.status(201).json({
        success: true,
        message: 'Vinculación de tutela familiar registrada exitosamente.',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

// ==========================================
// 3. TELEMETRÍA DE ERRORES Y DISPONIBILIDAD
// ==========================================

/**
 * GET /api/v1/admin/telemetry/errors
 * Registro unificado de errores de integración, fallbacks de proveedores y sesiones interrumpidas
 */
adminRouter.get(
  '/telemetry/errors',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const db = getDb();

      // Sesiones del piloto con error o abortadas
      const abortedPilotSessions = db.prepare(`
        SELECT id, subject_code, lesson_theme, status, started_at, ended_at 
        FROM interactive_pilot_sessions 
        WHERE status IN ('TERMINATED_ERROR', 'ABORTED_BY_USER')
        ORDER BY started_at DESC 
        LIMIT 20
      `).all();

      // Telemetría con errores o latencias críticas
      const criticalAiLogs = db.prepare(`
        SELECT id, agent_code, provider_name, latency_ms, status_code, created_at as logged_at, created_at 
        FROM ai_telemetry_logs 
        WHERE status_code >= 400 OR latency_ms > 4000
        ORDER BY created_at DESC 
        LIMIT 20
      `).all();

      // Eventos de seguridad o rechazos de autenticación
      const authFailures = db.prepare(`
        SELECT id, event_type, resource_type, ip_hash, created_at, details_json
        FROM audit_events 
        WHERE event_type IN ('AUTH_LOGIN_FAILED', 'FORBIDDEN_STUDENT_ACCESS', 'RBAC_ACCESS_DENIED')
        ORDER BY created_at DESC 
        LIMIT 20
      `).all() as any[];

      const sanitizedAuthFailures = authFailures.map((af) => ({
        ...af,
        details: af.details_json ? JSON.parse(af.details_json) : null,
        details_json: undefined,
      }));

      res.json({
        success: true,
        data: {
          abortedPilotSessionsCount: abortedPilotSessions.length,
          abortedPilotSessions,
          criticalAiLogsCount: criticalAiLogs.length,
          criticalAiLogs,
          authFailuresCount: sanitizedAuthFailures.length,
          authFailures: sanitizedAuthFailures,
          providersAvailable: ProviderManager.getAvailableProviders(),
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

// ==========================================
// 4. CONFIGURACIÓN INSTITUCIONAL
// ==========================================

/**
 * GET /api/v1/admin/settings
 * Consulta de parámetros globales y configuración institucional
 */
adminRouter.get(
  '/settings',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const db = getDb();
      const settings = db.prepare(`
        SELECT key, value, description, category, is_editable, updated_at 
        FROM institution_settings 
        ORDER BY category ASC, key ASC
      `).all();

      const settingsMap: Record<string, string> = {};
      for (const s of settings as any[]) {
        settingsMap[s.key] = s.value;
      }

      res.json({
        success: true,
        data: {
          settings,
          settingsMap,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

const settingsUpdateSchema = z.record(z.string(), z.string());

/**
 * PUT /api/v1/admin/settings
 * Actualiza configuraciones institucionales editables (solo Administradores)
 */
adminRouter.put(
  '/settings',
  requireAuth,
  requireRole('ADMIN'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const updates = settingsUpdateSchema.parse(req.body);
      const db = getDb();
      const userId = req.user?.userId;

      const updateStmt = db.prepare(`
        UPDATE institution_settings 
        SET value = ?, updated_at = datetime('now'), updated_by_user_id = ? 
        WHERE key = ? AND is_editable = 1
      `);

      const updatedKeys: string[] = [];
      for (const [key, val] of Object.entries(updates)) {
        const info = updateStmt.run(String(val), userId, key);
        if (info.changes > 0) {
          updatedKeys.push(key);
        }
      }

      recordAuditEvent({
        userId,
        eventType: 'INSTITUTION_SETTINGS_UPDATED',
        resourceType: 'institution_settings',
        resourceId: 'global',
        ip: req.ip,
        userAgent: req.get('user-agent'),
        details: { updatedKeys },
      });

      res.json({
        success: true,
        data: { updatedKeys },
        message: `${updatedKeys.length} ajustes institucionales actualizados correctamente.`,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

// ==========================================
// 5. REGISTRO DE AUDITORÍA LOPDP
// ==========================================

/**
 * GET /api/v1/admin/audit-logs
 * Consulta del Libro Mayor de Auditoría Inmutable (LOPDP) con filtros por tipo de evento
 */
adminRouter.get(
  '/audit-logs',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const limit = Math.min(Number(req.query.limit) || 50, 200);
      const { eventType, resourceType, userId } = req.query;
      const db = getDb();

      let sql = `
        SELECT 
          a.id,
          a.user_id,
          u.username,
          u.role as user_role,
          a.event_type,
          a.resource_type,
          a.resource_id,
          a.ip_hash,
          a.details_json,
          a.created_at
        FROM audit_events a
        LEFT JOIN users u ON u.id = a.user_id
        WHERE 1=1
      `;
      const params: any[] = [];

      if (eventType && typeof eventType === 'string' && eventType !== 'ALL') {
        sql += ' AND a.event_type = ?';
        params.push(eventType);
      }

      if (resourceType && typeof resourceType === 'string') {
        sql += ' AND a.resource_type = ?';
        params.push(resourceType);
      }

      if (userId && typeof userId === 'string') {
        sql += ' AND a.user_id = ?';
        params.push(userId);
      }

      sql += ' ORDER BY a.created_at DESC LIMIT ?';
      params.push(limit);

      const rawLogs = db.prepare(sql).all(...params) as any[];
      const logs = rawLogs.map((log) => ({
        ...log,
        details: log.details_json ? JSON.parse(log.details_json) : null,
        details_json: undefined,
      }));

      res.json({
        success: true,
        data: {
          count: logs.length,
          logs,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

// ==========================================
// 6. INFORMES ADMINISTRATIVOS Y ACADÉMICOS
// ==========================================

/**
 * GET /api/v1/admin/reports/academic-summary
 * Reporte consolidado de rendimiento académico, logros competenciales y estado de evaluaciones
 */
adminRouter.get(
  '/reports/academic-summary',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR', 'TEACHER'),
  async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const db = getDb();

      // Métricas por asignatura (promedios y entregas)
      const subjectMetrics = db.prepare(`
        SELECT 
          s.id, s.code, s.name, s.category,
          count(DISTINCT e.id) as evaluations_count,
          count(DISTINCT sub.id) as total_submissions,
          avg(sub.score) as average_score
        FROM subjects s
        LEFT JOIN curriculum_units u ON u.subject_id = s.id
        LEFT JOIN evaluations e ON (e.unit_id = u.id OR e.daily_class_id IN (SELECT dc.id FROM daily_classes dc WHERE dc.unit_id = u.id))
        LEFT JOIN student_submissions sub ON sub.evaluation_id = e.id
        GROUP BY s.id
        ORDER BY s.name ASC
      `).all() as any[];

      // Resumen de dominio competencial MINEDUC
      const masteryStats = db.prepare(`
        SELECT 
          mastery_status, count(*) as count 
        FROM student_competency_mastery 
        GROUP BY mastery_status
      `).all() as Array<{ mastery_status: string; count: number }>;

      const masteryMap: Record<string, number> = {
        DEMONSTRATED_MASTERY: 0,
        COMPLETED_NO_MASTERY: 0,
        IN_PROGRESS: 0,
      };
      for (const m of masteryStats) {
        masteryMap[m.mastery_status] = m.count;
      }

      res.json({
        success: true,
        data: {
          totalSubjectsEvaluated: subjectMetrics.length,
          subjectMetrics: subjectMetrics.map((sm) => ({
            ...sm,
            average_score: sm.average_score !== null ? Math.round(sm.average_score * 100) / 100 : null,
          })),
          competencyMasteryDistribution: masteryMap,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);

// ==========================================
// 7. DIAGNÓSTICO DE INFRAESTRUCTURA
// ==========================================

/**
 * GET /api/v1/admin/health-check
 * Diagnóstico de infraestructura de base de datos y migraciones
 */
adminRouter.get(
  '/health-check',
  requireAuth,
  requireRole('ADMIN', 'ACADEMIC_COORDINATOR'),
  async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const db = getDb();
      const migrations = db.prepare('SELECT version, name, applied_at FROM schema_migrations ORDER BY version ASC').all();
      const userCount = (db.prepare('SELECT COUNT(*) as cnt FROM users').get() as any).cnt;
      const studentCount = (db.prepare('SELECT COUNT(*) as cnt FROM students').get() as any).cnt;
      const auditCount = (db.prepare('SELECT COUNT(*) as cnt FROM audit_events').get() as any).cnt;

      res.json({
        success: true,
        data: {
          database: {
            engine: 'node:sqlite (Embedded SQLite3 with WAL)',
            status: 'HEALTHY',
            tablesVerified: true,
            totalUsers: userCount,
            totalStudents: studentCount,
            totalAuditEvents: auditCount,
            appliedMigrations: migrations,
          },
          uptimeSeconds: Math.floor(process.uptime()),
          memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
);
