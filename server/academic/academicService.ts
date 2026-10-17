import crypto from 'node:crypto';
import { IDatabaseAdapter, getDatabaseAdapter } from '../db/dal';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export class AcademicService {
  private _customDb?: IDatabaseAdapter;

  constructor(customDb?: IDatabaseAdapter) {
    this._customDb = customDb;
  }

  private get db(): IDatabaseAdapter {
    return this._customDb || getDatabaseAdapter();
  }

  // ==========================================
  // 1. PROGRAMAS, NIVELES Y PERIODOS
  // ==========================================

  async createProgram(data: {
    code: string;
    name: string;
    programType: 'K12_HOMESCHOOL' | 'DISCIPLESHIP' | 'CONTINUING_ED' | 'SUMMER_CAMP';
    description?: string;
    isActive?: boolean;
  }) {
    const id = `prog-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO programs (id, code, name, program_type, description, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        data.code.trim().toUpperCase(),
        data.name.trim(),
        data.programType,
        data.description ?? null,
        data.isActive !== false ? 1 : 0,
      ]
    );

    return await this.getProgramById(id);
  }

  async getPrograms(params?: { activeOnly?: boolean; programType?: string } & PaginationParams): Promise<PaginatedResult<any>> {
    const page = Math.max(1, Number(params?.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(params?.limit) || 20));
    const offset = (page - 1) * limit;

    let whereClauses: string[] = [];
    let queryParams: any[] = [];

    if (params?.activeOnly) {
      whereClauses.push('is_active = 1');
    }
    if (params?.programType) {
      whereClauses.push('program_type = ?');
      queryParams.push(params.programType);
    }

    const whereStr = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countRow = await this.db.queryOne<any>(`SELECT COUNT(*) as total FROM programs ${whereStr}`, queryParams);
    const total = Number(countRow?.total || 0);

    const rows = await this.db.query<any>(
      `SELECT * FROM programs ${whereStr} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );

    return {
      data: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async getProgramById(idOrCode: string) {
    return await this.db.queryOne('SELECT * FROM programs WHERE id = ? OR code = ?', [idOrCode, idOrCode]);
  }

  async createLevel(data: {
    programId: string;
    code: string;
    name: string;
    orderIndex: number;
    minRecommendedAge?: number;
  }) {
    const id = `lvl-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO levels (id, program_id, code, name, order_index, min_recommended_age)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        data.programId,
        data.code.trim().toUpperCase(),
        data.name.trim(),
        data.orderIndex,
        data.minRecommendedAge ?? null,
      ]
    );
    return await this.db.queryOne('SELECT * FROM levels WHERE id = ?', [id]);
  }

  async getLevelsByProgram(programId: string) {
    return await this.db.query('SELECT * FROM levels WHERE program_id = ? ORDER BY order_index ASC', [programId]);
  }

  async createAcademicPeriod(data: {
    code: string;
    name: string;
    schoolYear: string;
    trimesterNumber?: number;
    startDate: string;
    endDate: string;
    isCurrent?: boolean;
  }) {
    const id = `per-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO academic_periods (id, code, name, school_year, trimester_number, start_date, end_date, is_current)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        data.code.trim().toUpperCase(),
        data.name.trim(),
        data.schoolYear.trim(),
        data.trimesterNumber ?? null,
        data.startDate,
        data.endDate,
        data.isCurrent ? 1 : 0,
      ]
    );
    return await this.db.queryOne('SELECT * FROM academic_periods WHERE id = ?', [id]);
  }

  async getAcademicPeriods(schoolYear?: string) {
    if (schoolYear) {
      return await this.db.query('SELECT * FROM academic_periods WHERE school_year = ? ORDER BY start_date ASC', [schoolYear]);
    }
    return await this.db.query('SELECT * FROM academic_periods ORDER BY start_date DESC');
  }

  // ==========================================
  // 2. ASIGNATURAS Y MALLA CURRICULAR
  // ==========================================

  async createSubject(data: {
    programId: string;
    levelId: string;
    code: string;
    name: string;
    category: 'TRONCAL_MINEDUC' | 'FORMACION_CRISTIANA' | 'COMPLEMENTARIA' | 'AMPLIACION_INTERNACIONAL';
    weeklyHours?: number;
    defaultTeacherId?: string;
  }) {
    const id = `subj-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO subjects (id, program_id, level_id, code, name, category, weekly_hours, default_teacher_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        data.programId,
        data.levelId,
        data.code.trim().toUpperCase(),
        data.name.trim(),
        data.category,
        data.weeklyHours ?? 3,
        data.defaultTeacherId ?? null,
      ]
    );
    return await this.getSubjectById(id);
  }

  async getSubjects(params?: {
    programId?: string;
    levelId?: string;
    category?: string;
    search?: string;
  } & PaginationParams): Promise<PaginatedResult<any>> {
    const page = Math.max(1, Number(params?.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(params?.limit) || 20));
    const offset = (page - 1) * limit;

    let whereClauses: string[] = [];
    let queryParams: any[] = [];

    if (params?.programId) {
      whereClauses.push('s.program_id = ?');
      queryParams.push(params.programId);
    }
    if (params?.levelId) {
      whereClauses.push('s.level_id = ?');
      queryParams.push(params.levelId);
    }
    if (params?.category) {
      whereClauses.push('s.category = ?');
      queryParams.push(params.category);
    }
    if (params?.search) {
      whereClauses.push('(s.name LIKE ? OR s.code LIKE ?)');
      queryParams.push(`%${params.search}%`, `%${params.search}%`);
    }

    const whereStr = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countRow = await this.db.queryOne<any>(`SELECT COUNT(*) as total FROM subjects s ${whereStr}`, queryParams);
    const total = Number(countRow?.total || 0);

    const query = `
      SELECT 
        s.*,
        p.name as program_name,
        p.code as program_code,
        p.program_type,
        l.name as level_name,
        l.code as level_code,
        u.first_name as teacher_first_name,
        u.last_name as teacher_last_name
      FROM subjects s
      JOIN programs p ON p.id = s.program_id
      JOIN levels l ON l.id = s.level_id
      LEFT JOIN users u ON u.id = s.default_teacher_id
      ${whereStr}
      ORDER BY l.order_index ASC, s.name ASC
      LIMIT ? OFFSET ?
    `;

    const rows = await this.db.query<any>(query, [...queryParams, limit, offset]);

    return {
      data: rows,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async getSubjectById(idOrCode: string) {
    const query = `
      SELECT 
        s.*,
        p.name as program_name,
        p.code as program_code,
        p.program_type,
        l.name as level_name,
        l.code as level_code,
        u.first_name as teacher_first_name,
        u.last_name as teacher_last_name
      FROM subjects s
      JOIN programs p ON p.id = s.program_id
      JOIN levels l ON l.id = s.level_id
      LEFT JOIN users u ON u.id = s.default_teacher_id
      WHERE s.id = ? OR s.code = ?
    `;
    return await this.db.queryOne(query, [idOrCode, idOrCode]);
  }

  async updateSubject(
    id: string,
    data: {
      name?: string;
      code?: string;
      weeklyHours?: number;
      defaultTeacherId?: string | null;
      category?: string;
    }
  ) {
    const existing = (await this.getSubjectById(id)) as any;
    if (!existing) {
      throw new Error(`NOT_FOUND: Asignatura con ID ${id} no encontrada.`);
    }

    const updates: string[] = [];
    const values: any[] = [];

    if (data.name !== undefined) {
      updates.push('name = ?');
      values.push(data.name.trim());
    }
    if (data.code !== undefined) {
      updates.push('code = ?');
      values.push(data.code.trim().toUpperCase());
    }
    if (data.weeklyHours !== undefined) {
      updates.push('weekly_hours = ?');
      values.push(data.weeklyHours);
    }
    if (data.defaultTeacherId !== undefined) {
      updates.push('default_teacher_id = ?');
      values.push(data.defaultTeacherId);
    }
    if (data.category !== undefined) {
      updates.push('category = ?');
      values.push(data.category);
    }

    if (updates.length > 0) {
      values.push(existing.id);
      await this.db.execute(`UPDATE subjects SET ${updates.join(', ')} WHERE id = ?`, values);
    }

    return await this.getSubjectById(existing.id);
  }

  // ==========================================
  // 3. MATRICULACIÓN NORMALIZADA
  // ==========================================

  async enrollStudentInProgram(data: {
    studentId: string;
    programId: string;
    levelId: string;
    schoolYear: string;
  }) {
    const existing = (await this.db.queryOne(
      `
      SELECT id FROM student_program_enrollments 
      WHERE student_id = ? AND program_id = ? AND school_year = ?
    `,
      [data.studentId, data.programId, data.schoolYear]
    )) as any;

    if (existing) {
      return await this.db.queryOne('SELECT * FROM student_program_enrollments WHERE id = ?', [existing.id]);
    }

    const id = `enr-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO student_program_enrollments (id, student_id, program_id, level_id, school_year, status)
      VALUES (?, ?, ?, ?, ?, 'ACTIVE')
    `,
      [id, data.studentId, data.programId, data.levelId, data.schoolYear]
    );

    // Auto-matricular en las asignaturas del nivel si existen
    const subjects = (await this.db.query('SELECT id FROM subjects WHERE program_id = ? AND level_id = ?', [
      data.programId,
      data.levelId,
    ])) as any[];
    for (const subj of subjects) {
      await this.enrollStudentInSubject({
        studentId: data.studentId,
        subjectId: subj.id,
        programEnrollmentId: id,
      });
    }

    return await this.db.queryOne('SELECT * FROM student_program_enrollments WHERE id = ?', [id]);
  }

  async enrollStudentInSubject(data: {
    studentId: string;
    subjectId: string;
    programEnrollmentId?: string;
  }) {
    const existing = (await this.db.queryOne(
      `
      SELECT id FROM student_subject_enrollments 
      WHERE student_id = ? AND subject_id = ?
    `,
      [data.studentId, data.subjectId]
    )) as any;

    if (existing) {
      return await this.db.queryOne('SELECT * FROM student_subject_enrollments WHERE id = ?', [existing.id]);
    }

    const id = `sub-enr-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO student_subject_enrollments (id, student_id, subject_id, program_enrollment_id, status)
      VALUES (?, ?, ?, ?, 'ACTIVE')
    `,
      [id, data.studentId, data.subjectId, data.programEnrollmentId ?? null]
    );

    return await this.db.queryOne('SELECT * FROM student_subject_enrollments WHERE id = ?', [id]);
  }

  async getStudentSubjectEnrollments(studentId: string) {
    const query = `
      SELECT 
        sse.id as subject_enrollment_id,
        sse.status as enrollment_status,
        sse.final_grade,
        sse.enrolled_at,
        s.id as subject_id,
        s.code as subject_code,
        s.name as subject_name,
        s.category,
        s.weekly_hours,
        p.code as program_code,
        p.name as program_name,
        p.program_type,
        l.name as level_name,
        u.first_name as teacher_first_name,
        u.last_name as teacher_last_name
      FROM student_subject_enrollments sse
      JOIN subjects s ON s.id = sse.subject_id
      JOIN programs p ON p.id = s.program_id
      JOIN levels l ON l.id = s.level_id
      LEFT JOIN users u ON u.id = s.default_teacher_id
      WHERE sse.student_id = ?
      ORDER BY p.program_type ASC, s.name ASC
    `;
    return await this.db.query(query, [studentId]);
  }

  // ==========================================
  // 4. UNIDADES, LECCIONES, OBJETIVOS Y RECURSOS
  // ==========================================

  async createCompetency(data: {
    subjectId: string;
    officialCode: string;
    title: string;
    description: string;
    domainCategory: 'COMUNICACIONAL' | 'MATEMATICA' | 'DIGITAL' | 'SOCIOEMOCIONAL' | 'ESPIRITUAL';
    sourceStandard: string;
  }) {
    const id = `comp-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO competencies (id, subject_id, official_code, title, description, domain_category, source_standard)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        data.subjectId,
        data.officialCode.trim(),
        data.title.trim(),
        data.description.trim(),
        data.domainCategory,
        data.sourceStandard.trim(),
      ]
    );
    return await this.db.queryOne('SELECT * FROM competencies WHERE id = ?', [id]);
  }

  async getCompetenciesBySubject(subjectId: string) {
    return await this.db.query('SELECT * FROM competencies WHERE subject_id = ? ORDER BY official_code ASC', [subjectId]);
  }

  async createUnit(data: {
    subjectId: string;
    unitNumber: number;
    trimesterNumber: number;
    title: string;
    learningAxis?: string;
  }) {
    const id = `unit-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO curriculum_units (id, subject_id, unit_number, trimester_number, title, learning_axis)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [id, data.subjectId, data.unitNumber, data.trimesterNumber, data.title.trim(), data.learningAxis ?? null]
    );
    return await this.db.queryOne('SELECT * FROM curriculum_units WHERE id = ?', [id]);
  }

  async getUnitsBySubject(subjectId: string) {
    return await this.db.query(
      'SELECT * FROM curriculum_units WHERE subject_id = ? ORDER BY trimester_number ASC, unit_number ASC',
      [subjectId]
    );
  }

  async createLesson(data: {
    unitId: string;
    dayNumber: number;
    title: string;
    socraticQuestion: string;
    dynamicActivity: string;
    contentMarkdown: string;
    labType?: string;
  }) {
    const id = `class-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO daily_classes (id, unit_id, day_number, title, socratic_question, dynamic_activity, content_markdown, lab_type)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        data.unitId,
        data.dayNumber,
        data.title.trim(),
        data.socraticQuestion.trim(),
        data.dynamicActivity.trim(),
        data.contentMarkdown,
        data.labType ?? null,
      ]
    );
    return await this.getLessonById(id);
  }

  async getLessonsByUnit(unitId: string) {
    return await this.db.query('SELECT * FROM daily_classes WHERE unit_id = ? ORDER BY day_number ASC', [unitId]);
  }

  async getLessonById(id: string) {
    const lesson = (await this.db.queryOne(
      `
      SELECT 
        dc.*,
        cu.title as unit_title,
        cu.trimester_number,
        cu.subject_id,
        s.name as subject_name,
        s.code as subject_code
      FROM daily_classes dc
      JOIN curriculum_units cu ON cu.id = dc.unit_id
      JOIN subjects s ON s.id = cu.subject_id
      WHERE dc.id = ?
    `,
      [id]
    )) as any;

    if (!lesson) return null;

    const objectives = await this.getLessonObjectives(id);
    const resources = await this.getLessonResources(id);
    const evaluations = await this.getEvaluationsByLesson(id);

    return {
      ...lesson,
      objectives,
      resources,
      evaluations,
    };
  }

  async createLessonObjective(data: {
    dailyClassId?: string;
    unitId?: string;
    competencyId?: string;
    description: string;
    orderIndex?: number;
  }) {
    const id = `obj-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO lesson_objectives (id, daily_class_id, unit_id, competency_id, description, order_index)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        data.dailyClassId ?? null,
        data.unitId ?? null,
        data.competencyId ?? null,
        data.description.trim(),
        data.orderIndex ?? 1,
      ]
    );
    return await this.db.queryOne('SELECT * FROM lesson_objectives WHERE id = ?', [id]);
  }

  async getLessonObjectives(dailyClassId: string) {
    return await this.db.query(
      `
      SELECT lo.*, c.official_code as competency_code, c.title as competency_title
      FROM lesson_objectives lo
      LEFT JOIN competencies c ON c.id = lo.competency_id
      WHERE lo.daily_class_id = ?
      ORDER BY lo.order_index ASC
    `,
      [dailyClassId]
    );
  }

  async createResource(data: {
    dailyClassId?: string;
    unitId?: string;
    title: string;
    description?: string;
    resourceType: 'PDF' | 'VIDEO' | 'LINK' | 'WORKSHEET' | 'INTERACTIVE_LAB' | 'PHET_SIMULATION' | 'SCRIPTURE_REFERENCE';
    urlOrKey: string;
    language?: 'es' | 'en' | 'bilingual';
    isTranslated?: boolean;
    fallbackLanguage?: string;
    orderIndex?: number;
  }) {
    const id = `res-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO learning_resources (id, daily_class_id, unit_id, title, description, resource_type, url_or_key, language, is_translated, fallback_language, order_index)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        data.dailyClassId ?? null,
        data.unitId ?? null,
        data.title.trim(),
        data.description ?? null,
        data.resourceType,
        data.urlOrKey.trim(),
        data.language ?? 'es',
        data.isTranslated !== false ? 1 : 0,
        data.fallbackLanguage ?? 'es',
        data.orderIndex ?? 1,
      ]
    );
    return await this.db.queryOne('SELECT * FROM learning_resources WHERE id = ?', [id]);
  }

  /**
   * Obtiene recursos de la lección con soporte de preferencia de idioma y degradación elegante (fallback).
   */
  async getLessonResources(dailyClassId: string, preferredLang: string = 'es') {
    const allResources = (await this.db.query(
      `
      SELECT * FROM learning_resources 
      WHERE daily_class_id = ? 
      ORDER BY order_index ASC
    `,
      [dailyClassId]
    )) as any[];

    return allResources.map((res) => {
      const matchesLanguage = res.language === preferredLang || res.language === 'bilingual';
      const fallbackApplied = !matchesLanguage && Boolean(res.fallback_language);

      return {
        ...res,
        is_translated: Boolean(res.is_translated),
        matchesRequestedLanguage: matchesLanguage,
        fallbackApplied,
        activeLanguage: matchesLanguage ? res.language : res.fallback_language || 'es',
      };
    });
  }

  // ==========================================
  // 5. CALENDARIOS Y EVENTOS
  // ==========================================

  async createCalendarEvent(data: {
    periodId?: string;
    programId?: string;
    subjectId?: string;
    title: string;
    description?: string;
    eventType: 'CLASS_DAY' | 'EXAM_PERIOD' | 'HOLIDAY' | 'EVALUATION_DEADLINE' | 'PARENT_MEETING' | 'INSTITUTIONAL';
    startDate: string;
    endDate: string;
    isMandatory?: boolean;
  }) {
    const id = `cal-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO academic_calendar_events (id, period_id, program_id, subject_id, title, description, event_type, start_date, end_date, is_mandatory)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        data.periodId ?? null,
        data.programId ?? null,
        data.subjectId ?? null,
        data.title.trim(),
        data.description ?? null,
        data.eventType,
        data.startDate,
        data.endDate,
        data.isMandatory !== false ? 1 : 0,
      ]
    );
    return await this.db.queryOne('SELECT * FROM academic_calendar_events WHERE id = ?', [id]);
  }

  async getCalendarEvents(params?: {
    periodId?: string;
    programId?: string;
    subjectId?: string;
    eventType?: string;
    fromDate?: string;
    toDate?: string;
  }) {
    let whereClauses: string[] = [];
    let queryParams: any[] = [];

    if (params?.periodId) {
      whereClauses.push('period_id = ?');
      queryParams.push(params.periodId);
    }
    if (params?.programId) {
      whereClauses.push('(program_id = ? OR program_id IS NULL)');
      queryParams.push(params.programId);
    }
    if (params?.subjectId) {
      whereClauses.push('(subject_id = ? OR subject_id IS NULL)');
      queryParams.push(params.subjectId);
    }
    if (params?.eventType) {
      whereClauses.push('event_type = ?');
      queryParams.push(params.eventType);
    }
    if (params?.fromDate) {
      whereClauses.push('end_date >= ?');
      queryParams.push(params.fromDate);
    }
    if (params?.toDate) {
      whereClauses.push('start_date <= ?');
      queryParams.push(params.toDate);
    }

    const whereStr = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    return await this.db.query(
      `
      SELECT ace.*, s.name as subject_name, p.name as program_name
      FROM academic_calendar_events ace
      LEFT JOIN subjects s ON s.id = ace.subject_id
      LEFT JOIN programs p ON p.id = ace.program_id
      ${whereStr}
      ORDER BY start_date ASC
    `,
      queryParams
    );
  }

  // ==========================================
  // 6. ACTIVIDADES, ENTREGAS Y EVALUACIONES
  // ==========================================

  async createEvaluation(data: {
    dailyClassId?: string;
    unitId?: string;
    title: string;
    evaluationType: 'PROJECT_RUBRIC' | 'QUIZ_ADAPTIVE' | 'SOCRATIC_DIALOGUE' | 'PORTFOLIO_EVIDENCE';
    maxScore?: number;
    rubricDefinitionJson?: string;
    isMineducEvidence?: boolean;
    dueDate?: string;
    instructions?: string;
    passingScore?: number;
    competencyId?: string;
  }) {
    const id = `eval-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO evaluations (
        id, daily_class_id, unit_id, title, evaluation_type, max_score, 
        rubric_definition_json, is_mineduc_evidence, due_date, instructions, 
        passing_score, competency_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        data.dailyClassId ?? null,
        data.unitId ?? null,
        data.title.trim(),
        data.evaluationType,
        data.maxScore ?? 10.0,
        data.rubricDefinitionJson ?? null,
        data.isMineducEvidence ? 1 : 0,
        data.dueDate ?? null,
        data.instructions ?? null,
        data.passingScore ?? 7.0,
        data.competencyId ?? null,
      ]
    );
    return await this.getEvaluationById(id);
  }

  async getEvaluationsByLesson(lessonId: string) {
    return await this.db.query(
      `
      SELECT ev.*, c.official_code as competency_code, c.title as competency_title
      FROM evaluations ev
      LEFT JOIN competencies c ON c.id = ev.competency_id
      WHERE ev.daily_class_id = ?
      ORDER BY ev.created_at ASC
    `,
      [lessonId]
    );
  }

  async getEvaluationById(id: string) {
    return await this.db.queryOne(
      `
      SELECT 
        ev.*,
        c.official_code as competency_code,
        c.title as competency_title,
        dc.title as lesson_title,
        dc.day_number,
        cu.title as unit_title,
        cu.subject_id
      FROM evaluations ev
      LEFT JOIN competencies c ON c.id = ev.competency_id
      LEFT JOIN daily_classes dc ON dc.id = ev.daily_class_id
      LEFT JOIN curriculum_units cu ON cu.id = COALESCE(ev.unit_id, dc.unit_id)
      WHERE ev.id = ?
    `,
      [id]
    );
  }

  async submitActivity(data: {
    studentId: string;
    evaluationId: string;
    submissionText?: string;
    attachmentAssetKey?: string;
  }) {
    const existing = (await this.db.queryOne(
      `
      SELECT id, status, score FROM student_submissions 
      WHERE student_id = ? AND evaluation_id = ?
    `,
      [data.studentId, data.evaluationId]
    )) as any;

    let submissionId = existing?.id;

    if (existing) {
      await this.db.execute(
        `
        UPDATE student_submissions 
        SET submission_text = COALESCE(?, submission_text),
            attachment_asset_key = COALESCE(?, attachment_asset_key),
            status = 'SUBMITTED',
            submitted_at = datetime('now')
        WHERE id = ?
      `,
        [data.submissionText ?? null, data.attachmentAssetKey ?? null, existing.id]
      );
    } else {
      submissionId = `sub-${crypto.randomBytes(6).toString('hex')}`;
      await this.db.execute(
        `
        INSERT INTO student_submissions (id, student_id, evaluation_id, submission_text, attachment_asset_key, status)
        VALUES (?, ?, ?, ?, ?, 'SUBMITTED')
      `,
        [submissionId, data.studentId, data.evaluationId, data.submissionText ?? null, data.attachmentAssetKey ?? null]
      );
    }

    // Actualizar seguimiento competencial como "en progreso" o "actividad completada" si no está evaluada
    await this.refreshCompetencyMastery(data.studentId, data.evaluationId);

    return await this.db.queryOne('SELECT * FROM student_submissions WHERE id = ?', [submissionId]);
  }

  // ==========================================
  // 7. CALIFICACIONES, RÚBRICAS E HISTORIAL
  // ==========================================

  async evaluateSubmission(data: {
    submissionId: string;
    evaluatorUserId: string;
    score: number;
    qualitativeFeedback?: string;
    rubricScores?: Record<string, number>;
    changeReason: string;
  }) {
    const sub = (await this.db.queryOne('SELECT * FROM student_submissions WHERE id = ?', [data.submissionId])) as any;
    if (!sub) {
      throw new Error(`Entrega no encontrada: ${data.submissionId}`);
    }

    const previousScore = sub.score !== null ? Number(sub.score) : null;
    const newScore = Number(data.score);
    const rubricJson = data.rubricScores ? JSON.stringify(data.rubricScores) : null;

    // Actualizar entrega
    await this.db.execute(
      `
      UPDATE student_submissions 
      SET score = ?,
          qualitative_feedback = ?,
          evaluated_by_user_id = ?,
          status = 'EVALUATED',
          evaluated_at = datetime('now')
      WHERE id = ?
    `,
      [newScore, data.qualitativeFeedback ?? null, data.evaluatorUserId, data.submissionId]
    );

    // Registrar en historial inmutable de calificaciones
    const historyId = `grd-hist-${crypto.randomBytes(6).toString('hex')}`;
    await this.db.execute(
      `
      INSERT INTO submission_grade_history (
        id, submission_id, changed_by_user_id, previous_score, 
        new_score, feedback, rubric_scores_json, change_reason
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        historyId,
        data.submissionId,
        data.evaluatorUserId,
        previousScore,
        newScore,
        data.qualitativeFeedback ?? null,
        rubricJson,
        data.changeReason.trim(),
      ]
    );

    // Actualizar o recomputar el dominio de la competencia vinculada
    await this.refreshCompetencyMastery(sub.student_id, sub.evaluation_id);

    return {
      submission: await this.db.queryOne('SELECT * FROM student_submissions WHERE id = ?', [data.submissionId]),
      historyRecordId: historyId,
    };
  }

  async getSubmissionGradeHistory(submissionId: string) {
    const query = `
      SELECT 
        sgh.*,
        u.first_name as evaluator_first_name,
        u.last_name as evaluator_last_name,
        u.role as evaluator_role
      FROM submission_grade_history sgh
      JOIN users u ON u.id = sgh.changed_by_user_id
      WHERE sgh.submission_id = ?
      ORDER BY sgh.rowid DESC
    `;
    const rows = (await this.db.query(query, [submissionId])) as any[];
    return rows.map((r) => ({
      ...r,
      rubric_scores: r.rubric_scores_json ? JSON.parse(r.rubric_scores_json) : null,
    }));
  }

  // ==========================================
  // 8. SEGUIMIENTO DE COMPETENCIAS (ACTIVIDAD vs DOMINIO)
  // ==========================================

  /**
   * Recalcula el estado de dominio para la competencia asociada a una evaluación.
   * Regla de Negocio Crítica:
   * - Actividad completada (entregada/realizada): se registra conteo de actividades.
   * - Dominio demostrado: Requiere evaluación calificada con nota >= passing_score (mínimo 7.00/10).
   * - Si la nota es inferior a 7.00 (ej. 5.50), el estado es COMPLETED_NO_MASTERY (NO otorga dominio).
   */
  private async refreshCompetencyMastery(studentId: string, evaluationId: string) {
    const evalData = (await this.db.queryOne('SELECT competency_id, passing_score FROM evaluations WHERE id = ?', [
      evaluationId,
    ])) as any;
    if (!evalData || !evalData.competency_id) return;

    const competencyId = evalData.competency_id;
    const passingScore = evalData.passing_score !== null ? Number(evalData.passing_score) : 7.0;

    // Obtener todas las entregas del estudiante para evaluaciones de esta competencia
    const submissions = (await this.db.query(
      `
      SELECT 
        sub.id,
        sub.status,
        sub.score,
        sub.evaluated_at
      FROM student_submissions sub
      JOIN evaluations ev ON ev.id = sub.evaluation_id
      WHERE sub.student_id = ? AND ev.competency_id = ?
      ORDER BY sub.submitted_at DESC
    `,
      [studentId, competencyId]
    )) as any[];

    const activitiesCompletedCount = submissions.length;
    const evaluatedSubmissions = submissions.filter((s) => s.score !== null);
    const evidencesEvaluatedCount = evaluatedSubmissions.length;

    let latestScore: number | null = null;
    let averageScore: number | null = null;
    let masteryStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED_NO_MASTERY' | 'DEMONSTRATED_MASTERY' = 'NOT_STARTED';
    let masteryDemonstratedAt: string | null = null;

    if (evidencesEvaluatedCount > 0) {
      latestScore = Number(evaluatedSubmissions[0].score);
      const sum = evaluatedSubmissions.reduce((acc, curr) => acc + Number(curr.score), 0);
      averageScore = Math.round((sum / evidencesEvaluatedCount) * 100) / 100;

      // COMPROBACIÓN CRÍTICA DE DOMINIO:
      if (latestScore >= passingScore) {
        masteryStatus = 'DEMONSTRATED_MASTERY';
        masteryDemonstratedAt = evaluatedSubmissions[0].evaluated_at || new Date().toISOString();
      } else {
        masteryStatus = 'COMPLETED_NO_MASTERY';
      }
    } else if (activitiesCompletedCount > 0) {
      masteryStatus = 'IN_PROGRESS';
    }

    // Upsert en student_competency_mastery
    const existing = (await this.db.queryOne(
      `
      SELECT id FROM student_competency_mastery 
      WHERE student_id = ? AND competency_id = ?
    `,
      [studentId, competencyId]
    )) as any;

    if (existing) {
      await this.db.execute(
        `
        UPDATE student_competency_mastery 
        SET activities_completed_count = ?,
            evidences_evaluated_count = ?,
            latest_score = ?,
            average_score = ?,
            mastery_status = ?,
            mastery_demonstrated_at = COALESCE(?, mastery_demonstrated_at),
            last_evaluated_at = datetime('now'),
            updated_at = datetime('now')
        WHERE id = ?
      `,
        [
          activitiesCompletedCount,
          evidencesEvaluatedCount,
          latestScore,
          averageScore,
          masteryStatus,
          masteryDemonstratedAt,
          existing.id,
        ]
      );
    } else {
      const id = `mst-${crypto.randomBytes(6).toString('hex')}`;
      await this.db.execute(
        `
        INSERT INTO student_competency_mastery (
          id, student_id, competency_id, activities_completed_count, 
          evidences_evaluated_count, latest_score, average_score, 
          mastery_status, mastery_demonstrated_at, last_evaluated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `,
        [
          id,
          studentId,
          competencyId,
          activitiesCompletedCount,
          evidencesEvaluatedCount,
          latestScore,
          averageScore,
          masteryStatus,
          masteryDemonstratedAt,
        ]
      );
    }
  }

  async getStudentCompetencyProgress(studentId: string, subjectId?: string) {
    let whereClause = 'WHERE sse.student_id = ?';
    let queryParams: any[] = [studentId];

    if (subjectId) {
      whereClause += ' AND s.id = ?';
      queryParams.push(subjectId);
    }

    const query = `
      SELECT 
        c.id as competency_id,
        c.official_code,
        c.title,
        c.description,
        c.domain_category,
        c.source_standard,
        s.id as subject_id,
        s.name as subject_name,
        s.code as subject_code,
        COALESCE(scm.activities_completed_count, 0) as activities_completed_count,
        COALESCE(scm.evidences_evaluated_count, 0) as evidences_evaluated_count,
        scm.latest_score,
        scm.average_score,
        COALESCE(scm.mastery_status, 'NOT_STARTED') as mastery_status,
        scm.mastery_demonstrated_at,
        scm.last_evaluated_at
      FROM competencies c
      JOIN subjects s ON s.id = c.subject_id
      JOIN student_subject_enrollments sse ON sse.subject_id = s.id
      LEFT JOIN student_competency_mastery scm ON scm.competency_id = c.id AND scm.student_id = ?
      ${whereClause}
      ORDER BY s.name ASC, c.official_code ASC
    `;

    const rows = (await this.db.query(query, [studentId, ...queryParams])) as any[];

    const total = rows.length;
    const demonstratedMastery = rows.filter((r) => r.mastery_status === 'DEMONSTRATED_MASTERY').length;
    const completedNoMastery = rows.filter((r) => r.mastery_status === 'COMPLETED_NO_MASTERY').length;
    const inProgress = rows.filter((r) => r.mastery_status === 'IN_PROGRESS').length;
    const notStarted = rows.filter((r) => r.mastery_status === 'NOT_STARTED').length;

    return {
      studentId,
      totalCompetencies: total,
      demonstratedMasteryCount: demonstratedMastery,
      completedNoMasteryCount: completedNoMastery,
      inProgressCount: inProgress,
      notStartedCount: notStarted,
      masteryRatePercentage: total > 0 ? Math.round((demonstratedMastery / total) * 100) : 0,
      competencies: rows,
    };
  }

  // ==========================================
  // 9. INFORMES Y BOLETINES EXPORTABLES
  // ==========================================

  async generateStudentAcademicReport(studentId: string, schoolYear: string = '2026-2027') {
    const student = (await this.db.queryOne(
      `
      SELECT 
        s.id,
        s.student_code,
        s.birth_date,
        s.motto,
        u.first_name,
        u.last_name,
        u.email
      FROM students s
      JOIN users u ON u.id = s.user_id
      WHERE s.id = ? OR s.student_code = ?
    `,
      [studentId, studentId]
    )) as any;

    if (!student) {
      throw new Error(`Estudiante no encontrado: ${studentId}`);
    }

    const enrollments = await this.getStudentSubjectEnrollments(student.id);
    const competencyProgress = await this.getStudentCompetencyProgress(student.id);

    // Separar troncales/escolares K12 de discipulado/continuing
    const k12Subjects = enrollments.filter((e: any) => e.program_type === 'K12_HOMESCHOOL');
    const discipleshipSubjects = enrollments.filter((e: any) => e.program_type === 'DISCIPLESHIP');

    // Calcular promedio general cuantitativo de asignaturas evaluadas
    const graded = enrollments.filter((e: any) => e.final_grade !== null);
    const overallAverage =
      graded.length > 0
        ? Math.round(
            (graded.reduce((acc: number, curr: any) => acc + Number(curr.final_grade), 0) / graded.length) * 100
          ) / 100
        : null;

    const reportCard = {
      institution: {
        name: 'Plataforma Educativa ALSIZ — Ekballo Church',
        legalFramework: 'Art. 32 Acuerdo Ministerial MINEDUC-2023-00069-A (Educación No Formal Complementaria)',
        schoolYear,
        issuedAt: new Date().toISOString(),
      },
      student: {
        id: student.id,
        studentCode: student.student_code,
        fullName: `${student.first_name} ${student.last_name}`,
        birthDate: student.birth_date,
        motto: student.motto,
      },
      academicSummary: {
        totalEnrolledSubjects: enrollments.length,
        overallAverage,
        k12CurriculumHours: k12Subjects.reduce((acc: number, s: any) => acc + (s.weekly_hours || 0), 0),
        annualEquivalentHoursEstimated: 800, // Requisito MINEDUC
        competenciesTotal: competencyProgress.totalCompetencies,
        competenciesMastered: competencyProgress.demonstratedMasteryCount,
        competenciesCompletedNoMastery: competencyProgress.completedNoMasteryCount,
        competenciesInProgress: competencyProgress.inProgressCount,
      },
      subjects: {
        k12SchoolProgram: k12Subjects,
        discipleshipProgram: discipleshipSubjects,
      },
      competencyBreakdown: competencyProgress.competencies,
    };

    return reportCard;
  }
}

export const academicService = new AcademicService();
