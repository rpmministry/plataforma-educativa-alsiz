/**
 * ==============================================================================
 * Servicio de Dominio — Formación No Escolar, Artes, Oficios y Educación Continua
 * ETAPA 12 (ALSIZ / Ekballo Church)
 * ==============================================================================
 */

import { DatabaseSync } from 'node:sqlite';
import crypto from 'node:crypto';
import { getDb } from '../db/database';

export const LEGAL_DISCLAIMER_CONTINUING_ED = 
  'Constancia de formación continua y capacitación no formal emitida por la Plataforma Educativa ALSIZ ' +
  'para Ekballo Church, conforme al Art. 32 del Acuerdo Ministerial MINEDUC-2023-00069-A y normas conexas. ' +
  'Este documento certifica horas de participación y aprovechamiento en educación no escolarizada; ' +
  'no constituye título oficial de bachillerato, título universitario de educación superior ni habilitación profesional regulada por el Estado ecuatoriano.';

export interface ContinuingCourseInput {
  code: string;
  title: string;
  slug?: string;
  category: 'ARTES' | 'OFICIOS' | 'TECNOLOGIA' | 'IDIOMAS' | 'EMPRENDIMIENTO' | 'HABILIDADES_PROFESIONALES' | 'FORMACION_MINISTERIAL';
  modality: 'ONLINE_ASYNC' | 'ONLINE_SYNC' | 'PRESENCIAL' | 'HYBRID';
  level: 'PRINCIPIANTE' | 'INTERMEDIO' | 'AVANZADO' | 'TODOS_LOS_NIVELES';
  language?: 'es' | 'en' | 'bilingual';
  estimatedDurationHours: number;
  instructorUserId?: string;
  instructorName: string;
  instructorBio?: string;
  shortDescription: string;
  fullDescription?: string;
  learningObjectives?: string[];
  prerequisites?: string[];
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  maxCapacity?: number | null;
  pricingType?: 'FREE' | 'PAID';
  priceUsd?: number;
  thumbnailUrl?: string;
}

export class ContinuingEducationService {
  private _customDb?: DatabaseSync;

  constructor(customDb?: DatabaseSync) {
    this._customDb = customDb;
  }

  private get db(): DatabaseSync {
    return this._customDb || getDb();
  }

  // ==========================================
  // 1. GESTIÓN Y CATÁLOGO DE CURSOS
  // ==========================================

  public createCourse(data: ContinuingCourseInput, actorUserId = 'usr-admin-01') {
    const id = `course-${crypto.randomBytes(6).toString('hex')}`;
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Validación de precios y pagos
    const pricingType = data.pricingType || 'FREE';
    const priceUsd = pricingType === 'PAID' ? Math.max(0, Number(data.priceUsd) || 0) : 0;

    const stmt = this.db.prepare(`
      INSERT INTO continuing_courses (
        id, code, title, slug, category, modality, level, language,
        estimated_duration_hours, instructor_user_id, instructor_name, instructor_bio,
        short_description, full_description, learning_objectives_json, prerequisites_json,
        status, max_capacity, pricing_type, price_usd, thumbnail_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      data.code.trim().toUpperCase(),
      data.title.trim(),
      slug,
      data.category,
      data.modality,
      data.level,
      data.language || 'es',
      Math.max(1, data.estimatedDurationHours || 20),
      data.instructorUserId || null,
      data.instructorName.trim(),
      data.instructorBio || null,
      data.shortDescription.trim(),
      data.fullDescription || null,
      JSON.stringify(data.learningObjectives || []),
      JSON.stringify(data.prerequisites || []),
      data.status || 'DRAFT',
      data.maxCapacity ?? null,
      pricingType,
      priceUsd,
      data.thumbnailUrl || null
    );

    // Registro de auditoría
    this.recordAudit(actorUserId, 'COURSE_CREATED', 'continuing_courses', id, {
      code: data.code,
      title: data.title,
      category: data.category,
      pricingType,
    });

    return this.getCourseById(id);
  }

  public getCourses(params?: {
    category?: string;
    modality?: string;
    level?: string;
    status?: string;
    pricingType?: string;
    search?: string;
    includeDrafts?: boolean;
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(1, Number(params?.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(params?.limit) || 20));
    const offset = (page - 1) * limit;

    const whereClauses: string[] = [];
    const queryParams: any[] = [];

    if (!params?.includeDrafts) {
      whereClauses.push("status = 'PUBLISHED'");
    } else if (params?.status) {
      whereClauses.push('status = ?');
      queryParams.push(params.status);
    }

    if (params?.category) {
      whereClauses.push('category = ?');
      queryParams.push(params.category);
    }
    if (params?.modality) {
      whereClauses.push('modality = ?');
      queryParams.push(params.modality);
    }
    if (params?.level) {
      whereClauses.push('level = ?');
      queryParams.push(params.level);
    }
    if (params?.pricingType) {
      whereClauses.push('pricing_type = ?');
      queryParams.push(params.pricingType);
    }
    if (params?.search) {
      whereClauses.push('(title LIKE ? OR short_description LIKE ? OR code LIKE ?)');
      const term = `%${params.search}%`;
      queryParams.push(term, term, term);
    }

    const whereStr = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countRow = this.db.prepare(`SELECT COUNT(*) as total FROM continuing_courses ${whereStr}`).get(...queryParams) as any;
    const total = Number(countRow?.total || 0);

    const rows = this.db.prepare(`
      SELECT * FROM continuing_courses 
      ${whereStr} 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `).all(...queryParams, limit, offset) as any[];

    const data = rows.map(r => ({
      ...r,
      learning_objectives: JSON.parse(r.learning_objectives_json || '[]'),
      prerequisites: JSON.parse(r.prerequisites_json || '[]'),
    }));

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  public getCourseById(id: string) {
    const course = this.db.prepare('SELECT * FROM continuing_courses WHERE id = ?').get(id) as any;
    if (!course) return null;
    return this.enrichCourseDetails(course);
  }

  public getCourseBySlug(slug: string) {
    const course = this.db.prepare('SELECT * FROM continuing_courses WHERE slug = ?').get(slug) as any;
    if (!course) return null;
    return this.enrichCourseDetails(course);
  }

  private enrichCourseDetails(course: any) {
    const modules = this.db.prepare(`
      SELECT * FROM course_modules WHERE course_id = ? ORDER BY order_index ASC
    `).all(course.id) as any[];

    const enrichedModules = modules.map(m => {
      const lessons = this.db.prepare(`
        SELECT * FROM course_lessons WHERE module_id = ? ORDER BY order_index ASC
      `).all(m.id) as any[];

      return {
        ...m,
        lessons: lessons.map(l => ({
          ...l,
          external_resources: JSON.parse(l.external_resources_json || '[]'),
        })),
      };
    });

    const evaluations = this.db.prepare(`
      SELECT id, title, description, evaluation_type, passing_score, max_score, created_at 
      FROM course_evaluations WHERE course_id = ?
    `).all(course.id);

    return {
      ...course,
      learning_objectives: JSON.parse(course.learning_objectives_json || '[]'),
      prerequisites: JSON.parse(course.prerequisites_json || '[]'),
      modules: enrichedModules,
      evaluations,
    };
  }

  public updateCourse(courseId: string, updates: Partial<ContinuingCourseInput>, actorUserId = 'usr-admin-01') {
    const course = this.getCourseById(courseId);
    if (!course) throw new Error('Curso no encontrado');

    const fields: string[] = [];
    const values: any[] = [];

    if (updates.title !== undefined) { fields.push('title = ?'); values.push(updates.title); }
    if (updates.category !== undefined) { fields.push('category = ?'); values.push(updates.category); }
    if (updates.modality !== undefined) { fields.push('modality = ?'); values.push(updates.modality); }
    if (updates.level !== undefined) { fields.push('level = ?'); values.push(updates.level); }
    if (updates.language !== undefined) { fields.push('language = ?'); values.push(updates.language); }
    if (updates.estimatedDurationHours !== undefined) { fields.push('estimated_duration_hours = ?'); values.push(updates.estimatedDurationHours); }
    if (updates.instructorName !== undefined) { fields.push('instructor_name = ?'); values.push(updates.instructorName); }
    if (updates.instructorBio !== undefined) { fields.push('instructor_bio = ?'); values.push(updates.instructorBio); }
    if (updates.shortDescription !== undefined) { fields.push('short_description = ?'); values.push(updates.shortDescription); }
    if (updates.fullDescription !== undefined) { fields.push('full_description = ?'); values.push(updates.fullDescription); }
    if (updates.learningObjectives !== undefined) { fields.push('learning_objectives_json = ?'); values.push(JSON.stringify(updates.learningObjectives)); }
    if (updates.prerequisites !== undefined) { fields.push('prerequisites_json = ?'); values.push(JSON.stringify(updates.prerequisites)); }
    if (updates.status !== undefined) { fields.push('status = ?'); values.push(updates.status); }
    if (updates.maxCapacity !== undefined) { fields.push('max_capacity = ?'); values.push(updates.maxCapacity); }
    if (updates.pricingType !== undefined) { fields.push('pricing_type = ?'); values.push(updates.pricingType); }
    if (updates.priceUsd !== undefined) { fields.push('price_usd = ?'); values.push(updates.priceUsd); }
    if (updates.thumbnailUrl !== undefined) { fields.push('thumbnail_url = ?'); values.push(updates.thumbnailUrl); }

    fields.push("updated_at = datetime('now')");
    values.push(courseId);

    this.db.prepare(`UPDATE continuing_courses SET ${fields.join(', ')} WHERE id = ?`).run(...values);

    this.recordAudit(actorUserId, 'COURSE_UPDATED', 'continuing_courses', courseId, updates);
    return this.getCourseById(courseId);
  }

  // ==========================================
  // 2. MÓDULOS Y LECCIONES
  // ==========================================

  public createModule(courseId: string, data: { title: string; description?: string; orderIndex?: number }) {
    const course = this.getCourseById(courseId);
    if (!course) throw new Error('Curso no encontrado');

    const nextOrder = data.orderIndex || ((course.modules?.length || 0) + 1);
    const id = `cmod-${crypto.randomBytes(6).toString('hex')}`;

    this.db.prepare(`
      INSERT INTO course_modules (id, course_id, order_index, title, description)
      VALUES (?, ?, ?, ?, ?)
    `).run(id, courseId, nextOrder, data.title.trim(), data.description || null);

    return this.db.prepare('SELECT * FROM course_modules WHERE id = ?').get(id);
  }

  public createLesson(moduleId: string, data: {
    title: string;
    lessonType: 'VIDEO' | 'READING' | 'PRACTICE' | 'WORKSHOP' | 'INTERACTIVE_LAB';
    contentMarkdown: string;
    videoUrl?: string;
    externalResources?: Array<{ title: string; url: string; type: string }>;
    estimatedMinutes?: number;
    orderIndex?: number;
  }) {
    const mod = this.db.prepare('SELECT * FROM course_modules WHERE id = ?').get(moduleId) as any;
    if (!mod) throw new Error('Módulo no encontrado');

    const existingLessons = this.db.prepare('SELECT COUNT(*) as c FROM course_lessons WHERE module_id = ?').get(moduleId) as any;
    const nextOrder = data.orderIndex || (Number(existingLessons?.c || 0) + 1);
    const id = `cless-${crypto.randomBytes(6).toString('hex')}`;

    this.db.prepare(`
      INSERT INTO course_lessons (
        id, module_id, order_index, title, lesson_type,
        content_markdown, video_url, external_resources_json, estimated_minutes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      moduleId,
      nextOrder,
      data.title.trim(),
      data.lessonType,
      data.contentMarkdown.trim(),
      data.videoUrl || null,
      JSON.stringify(data.externalResources || []),
      Math.max(5, data.estimatedMinutes || 30)
    );

    return this.db.prepare('SELECT * FROM course_lessons WHERE id = ?').get(id);
  }

  // ==========================================
  // 3. INSCRIPCIÓN Y PROGRESO
  // ==========================================

  public enrollUser(courseId: string, userId: string) {
    const course = this.getCourseById(courseId);
    if (!course) throw new Error('Curso no encontrado');
    if (course.status !== 'PUBLISHED') throw new Error('El curso no está disponible para inscripciones');

    // Verificar si ya está inscrito
    const existing = this.db.prepare('SELECT * FROM course_enrollments WHERE course_id = ? AND user_id = ?').get(courseId, userId) as any;
    if (existing) {
      if (existing.status === 'DROPPED') {
        this.db.prepare("UPDATE course_enrollments SET status = 'ACTIVE' WHERE id = ?").run(existing.id);
        return this.getEnrollmentById(existing.id);
      }
      return this.getEnrollmentById(existing.id);
    }

    // Verificar cupo
    if (course.max_capacity !== null && course.enrolled_count >= course.max_capacity) {
      throw new Error('El curso ha alcanzado su cupo máximo de participantes');
    }

    const id = `cenr-${crypto.randomBytes(6).toString('hex')}`;
    this.db.prepare(`
      INSERT INTO course_enrollments (id, course_id, user_id, status, progress_percent)
      VALUES (?, ?, ?, 'ACTIVE', 0.00)
    `).run(id, courseId, userId);

    // Incrementar conteo en el curso
    this.db.prepare('UPDATE continuing_courses SET enrolled_count = enrolled_count + 1 WHERE id = ?').run(courseId);

    this.recordAudit(userId, 'COURSE_ENROLLED', 'course_enrollments', id, { courseId, userId });
    return this.getEnrollmentById(id);
  }

  public getEnrollmentById(enrollmentId: string) {
    const enrollment = this.db.prepare(`
      SELECT ce.*, c.title as course_title, c.category, c.estimated_duration_hours, c.code as course_code
      FROM course_enrollments ce
      JOIN continuing_courses c ON ce.course_id = c.id
      WHERE ce.id = ?
    `).get(enrollmentId) as any;

    if (!enrollment) return null;

    const cert = this.db.prepare('SELECT * FROM course_certificates WHERE enrollment_id = ?').get(enrollmentId);
    return { ...enrollment, certificate: cert || null };
  }

  public getUserEnrollments(userId: string) {
    const rows = this.db.prepare(`
      SELECT ce.*, c.title as course_title, c.category, c.modality, c.level, c.thumbnail_url, c.estimated_duration_hours
      FROM course_enrollments ce
      JOIN continuing_courses c ON ce.course_id = c.id
      WHERE ce.user_id = ?
      ORDER BY ce.enrolled_at DESC
    `).all(userId) as any[];

    return rows.map(r => {
      const cert = this.db.prepare('SELECT id, certificate_code, issued_at FROM course_certificates WHERE enrollment_id = ?').get(r.id);
      return { ...r, certificate: cert || null };
    });
  }

  public markLessonComplete(enrollmentId: string, lessonId: string, userId: string) {
    const enrollment = this.getEnrollmentById(enrollmentId);
    if (!enrollment) throw new Error('Inscripción no encontrada');
    if (enrollment.user_id !== userId) throw new Error('Acceso no autorizado a la inscripción');

    // Registrar progreso
    const progId = `cprog-${crypto.randomBytes(6).toString('hex')}`;
    this.db.prepare(`
      INSERT OR IGNORE INTO course_lesson_progress (id, enrollment_id, lesson_id, is_completed)
      VALUES (?, ?, ?, 1)
    `).run(progId, enrollmentId, lessonId);

    // Calcular porcentaje de avance
    const totalLessonsRow = this.db.prepare(`
      SELECT COUNT(*) as total
      FROM course_lessons cl
      JOIN course_modules cm ON cl.module_id = cm.id
      WHERE cm.course_id = ?
    `).get(enrollment.course_id) as any;
    const totalLessons = Number(totalLessonsRow?.total || 1);

    const completedRow = this.db.prepare(`
      SELECT COUNT(*) as total FROM course_lesson_progress WHERE enrollment_id = ?
    `).get(enrollmentId) as any;
    const completed = Number(completedRow?.total || 0);

    const progressPercent = Math.min(100, Math.round((completed / totalLessons) * 10000) / 100);

    // Actualizar progreso
    this.db.prepare(`
      UPDATE course_enrollments 
      SET progress_percent = ?, last_accessed_at = datetime('now')
      WHERE id = ?
    `).run(progressPercent, enrollmentId);

    return {
      enrollmentId,
      lessonId,
      completedLessons: completed,
      totalLessons,
      progressPercent,
      isCourseFullyLearned: progressPercent >= 100,
    };
  }

  // ==========================================
  // 4. EVALUACIONES DE CURSO
  // ==========================================

  public createEvaluation(courseId: string, data: {
    title: string;
    description?: string;
    evaluationType: 'FINAL_EXAM' | 'PRACTICAL_PROJECT' | 'QUIZ';
    passingScore?: number;
    maxScore?: number;
    questions?: any[];
  }) {
    const course = this.getCourseById(courseId);
    if (!course) throw new Error('Curso no encontrado');

    const id = `ceval-${crypto.randomBytes(6).toString('hex')}`;
    this.db.prepare(`
      INSERT INTO course_evaluations (
        id, course_id, title, description, evaluation_type,
        passing_score, max_score, questions_json
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      courseId,
      data.title.trim(),
      data.description || null,
      data.evaluationType,
      data.passingScore || 7.00,
      data.maxScore || 10.00,
      JSON.stringify(data.questions || [])
    );

    return this.db.prepare('SELECT * FROM course_evaluations WHERE id = ?').get(id);
  }

  public submitEvaluation(evaluationId: string, enrollmentId: string, userId: string, submissionContent: string) {
    const evalObj = this.db.prepare('SELECT * FROM course_evaluations WHERE id = ?').get(evaluationId) as any;
    if (!evalObj) throw new Error('Evaluación no encontrada');

    const enrollment = this.getEnrollmentById(enrollmentId);
    if (!enrollment || enrollment.user_id !== userId) throw new Error('Inscripción no autorizada');

    const subId = `csub-${crypto.randomBytes(6).toString('hex')}`;
    this.db.prepare(`
      INSERT INTO course_evaluation_submissions (
        id, evaluation_id, enrollment_id, user_id, submission_content, status
      ) VALUES (?, ?, ?, ?, ?, 'SUBMITTED')
    `).run(subId, evaluationId, enrollmentId, userId, submissionContent.trim());

    return this.db.prepare('SELECT * FROM course_evaluation_submissions WHERE id = ?').get(subId);
  }

  public gradeEvaluation(submissionId: string, score: number, feedback: string, graderUserId = 'usr-teacher-01') {
    const sub = this.db.prepare(`
      SELECT s.*, e.passing_score, e.max_score, e.course_id
      FROM course_evaluation_submissions s
      JOIN course_evaluations e ON s.evaluation_id = e.id
      WHERE s.id = ?
    `).get(submissionId) as any;

    if (!sub) throw new Error('Entrega no encontrada');

    const validScore = Math.max(0, Math.min(Number(sub.max_score), Number(score)));

    this.db.prepare(`
      UPDATE course_evaluation_submissions
      SET score = ?, feedback = ?, status = 'GRADED', graded_by_user_id = ?, graded_at = datetime('now')
      WHERE id = ?
    `).run(validScore, feedback.trim(), graderUserId, submissionId);

    const isPassed = validScore >= Number(sub.passing_score);

    // Si aprueba y el curso está al 100% de lecciones, completar curso
    if (isPassed) {
      const enr = this.getEnrollmentById(sub.enrollment_id);
      if (enr && enr.progress_percent >= 100) {
        this.db.prepare(`
          UPDATE course_enrollments
          SET status = 'COMPLETED', completed_at = datetime('now')
          WHERE id = ?
        `).run(sub.enrollment_id);
      }
    }

    return {
      submissionId,
      score: validScore,
      isPassed,
      feedback,
    };
  }

  // ==========================================
  // 5. CERTIFICADOS Y CONSTANCIAS NO FORMALES
  // ==========================================

  public issueCertificate(enrollmentId: string, actorUserId = 'usr-admin-01') {
    const enr = this.getEnrollmentById(enrollmentId);
    if (!enr) throw new Error('Inscripción no encontrada');

    // Verificar progreso
    if (enr.progress_percent < 100) {
      throw new Error('El usuario no ha completado el 100% de las lecciones del curso');
    }

    // Verificar si existen evaluaciones obligatorias y si están aprobadas
    const evals = this.db.prepare('SELECT * FROM course_evaluations WHERE course_id = ?').all(enr.course_id) as any[];
    let finalScore: number | null = null;

    if (evals.length > 0) {
      const submissions = this.db.prepare(`
        SELECT * FROM course_evaluation_submissions 
        WHERE enrollment_id = ? AND status = 'GRADED'
      `).all(enrollmentId) as any[];

      const passedAll = evals.every(ev => {
        const matchingSub = submissions.find(s => s.evaluation_id === ev.id);
        return matchingSub && Number(matchingSub.score) >= Number(ev.passing_score);
      });

      if (!passedAll) {
        throw new Error('El participante tiene evaluaciones obligatorias pendientes o reprobadas');
      }

      const totalScore = submissions.reduce((sum, s) => sum + Number(s.score), 0);
      finalScore = Math.round((totalScore / submissions.length) * 100) / 100;
    }

    // Si ya existe un certificado emitido, devolverlo de forma idempotente
    const existingCert = this.db.prepare('SELECT * FROM course_certificates WHERE enrollment_id = ?').get(enrollmentId) as any;
    if (existingCert) {
      return existingCert;
    }

    // Obtener datos del usuario
    const user = this.db.prepare('SELECT first_name, last_name FROM users WHERE id = ?').get(enr.user_id) as any;
    const studentFullName = user ? `${user.first_name} ${user.last_name}`.trim() : 'Participante ALSIZ';

    // Generar código y hash criptográfico
    const categoryCode = enr.category.substring(0, 4);
    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
    const certCode = `CERT-${categoryCode}-2026-${randomHex}`;
    const issuedAt = new Date().toISOString();

    const verificationPayload = `${certCode}|${enr.user_id}|${enr.course_id}|${issuedAt}|${LEGAL_DISCLAIMER_CONTINUING_ED}`;
    const verificationHash = crypto.createHash('sha256').update(verificationPayload).digest('hex');

    const id = `cert-${crypto.randomBytes(6).toString('hex')}`;

    this.db.prepare(`
      INSERT INTO course_certificates (
        id, certificate_code, enrollment_id, course_id, user_id,
        student_full_name, course_title, category, hours_completed,
        final_score, issued_at, verification_hash_sha256, disclaimer_legal
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      certCode,
      enrollmentId,
      enr.course_id,
      enr.user_id,
      studentFullName,
      enr.course_title,
      enr.category,
      enr.estimated_duration_hours,
      finalScore,
      issuedAt,
      verificationHash,
      LEGAL_DISCLAIMER_CONTINUING_ED
    );

    // Asegurar estado de inscripción como COMPLETED
    this.db.prepare("UPDATE course_enrollments SET status = 'COMPLETED', completed_at = datetime('now') WHERE id = ?").run(enrollmentId);

    this.recordAudit(actorUserId, 'CERTIFICATE_ISSUED', 'course_certificates', id, {
      certificateCode: certCode,
      courseTitle: enr.course_title,
      userId: enr.user_id,
    });

    return this.db.prepare('SELECT * FROM course_certificates WHERE id = ?').get(id);
  }

  public verifyCertificate(codeOrHash: string) {
    const cert = this.db.prepare(`
      SELECT c.*, co.modality, co.level, co.instructor_name
      FROM course_certificates c
      JOIN continuing_courses co ON c.course_id = co.id
      WHERE c.certificate_code = ? OR c.verification_hash_sha256 = ?
    `).get(codeOrHash.trim(), codeOrHash.trim()) as any;

    if (!cert) {
      return {
        isValid: false,
        message: 'Certificado no encontrado o código de verificación inválido.',
      };
    }

    return {
      isValid: true,
      certificateCode: cert.certificate_code,
      studentFullName: cert.student_full_name,
      courseTitle: cert.course_title,
      category: cert.category,
      hoursCompleted: cert.hours_completed,
      finalScore: cert.final_score,
      issuedAt: cert.issued_at,
      verificationHash: cert.verification_hash_sha256,
      disclaimerLegal: cert.disclaimer_legal,
      instructorName: cert.instructor_name,
      modality: cert.modality,
    };
  }

  // ==========================================
  // 6. INFORMES Y ANALÍTICA DE CURSO
  // ==========================================

  public getCourseReport(courseId: string) {
    const course = this.getCourseById(courseId);
    if (!course) throw new Error('Curso no encontrado');

    const enrollments = this.db.prepare('SELECT * FROM course_enrollments WHERE course_id = ?').all(courseId) as any[];
    const totalEnrolled = enrollments.length;
    const active = enrollments.filter(e => e.status === 'ACTIVE').length;
    const completed = enrollments.filter(e => e.status === 'COMPLETED').length;
    const dropped = enrollments.filter(e => e.status === 'DROPPED').length;

    const avgProgress = totalEnrolled > 0
      ? Math.round((enrollments.reduce((sum, e) => sum + Number(e.progress_percent), 0) / totalEnrolled) * 100) / 100
      : 0;

    const certsCountRow = this.db.prepare('SELECT COUNT(*) as c FROM course_certificates WHERE course_id = ?').get(courseId) as any;
    const certificatesIssued = Number(certsCountRow?.c || 0);

    const submissions = this.db.prepare(`
      SELECT s.score FROM course_evaluation_submissions s
      JOIN course_evaluations e ON s.evaluation_id = e.id
      WHERE e.course_id = ? AND s.status = 'GRADED'
    `).all(courseId) as any[];

    const avgScore = submissions.length > 0
      ? Math.round((submissions.reduce((sum, s) => sum + Number(s.score), 0) / submissions.length) * 100) / 100
      : null;

    return {
      courseId,
      courseCode: course.code,
      courseTitle: course.title,
      category: course.category,
      modality: course.modality,
      status: course.status,
      maxCapacity: course.max_capacity,
      totalEnrolled,
      activeParticipants: active,
      completedParticipants: completed,
      droppedParticipants: dropped,
      completionRatePercent: totalEnrolled > 0 ? Math.round((completed / totalEnrolled) * 10000) / 100 : 0,
      averageProgressPercent: avgProgress,
      averageEvaluationScore: avgScore,
      certificatesIssued,
    };
  }

  private recordAudit(userId: string, eventType: string, resourceType: string, resourceId: string, details: any) {
    const auditId = `aud-ce-${crypto.randomBytes(6).toString('hex')}`;
    try {
      this.db.prepare(`
        INSERT INTO audit_events (id, user_id, event_type, resource_type, resource_id, ip_hash, user_agent, details_json)
        VALUES (?, ?, ?, ?, ?, ?, 'ALSIZ_ContinuingEd/1.0', ?)
      `).run(
        auditId,
        userId,
        eventType,
        resourceType,
        resourceId,
        crypto.createHash('sha256').update('127.0.0.1').digest('hex'),
        JSON.stringify(details)
      );
    } catch { /* continuar si no existe tabla en pruebas aisladas */ }
  }
}

