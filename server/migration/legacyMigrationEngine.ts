/**
 * ==============================================================================
 * Motor de Migración Controlada — ETAPA 11 (ALSIZ / Ekballo Church)
 * Migración Idempotente, Segura y con Trazabilidad de los Expedientes de
 * Estudiante A (8vo EGB Superior) y Estudiante G (4to EGB Elemental)
 * ==============================================================================
 */

import { DatabaseSync } from 'node:sqlite';
import crypto from 'node:crypto';
import { hashPassword, hashPin } from '../auth/crypto';
import {
  STUDENTS_DATA,
  AVRIL_SUBJECTS,
  GAEL_SUBJECTS,
  SCHEDULE_DATA,
} from '../../src/data/mockData';
import { AVRIL_DAILY_CLASSES } from '../../src/data/dailyClassesAvril';
import { GAEL_DAILY_CLASSES } from '../../src/data/dailyClassesGael';
import { DailyClass, Subject, ClassResource } from '../../src/types';

export interface MigrationOptions {
  db: DatabaseSync;
  dryRun?: boolean;
  targetStudentIds?: string[]; // e.g. ['avril', 'gael']
  actorUserId?: string; // admin user requesting migration
}

export type ResourceAction = 'reutilizar' | 'actualizar' | 'duplicado' | 'pendiente de validacion' | 'no migrar';

export interface ResourceAuditItem {
  studentId: string;
  classId: string;
  resourceId: string;
  rawType: string;
  targetType: string;
  title: string;
  url: string;
  action: ResourceAction;
  justification: string;
}

export interface InventorySummary {
  studentsCount: number;
  subjectsCount: {
    avril: number;
    gael: number;
    total: number;
  };
  unitsCount: {
    avril: number;
    gael: number;
    total: number;
  };
  dailyClassesCount: {
    avril: number;
    gael: number;
    total: number;
  };
  resourcesCount: {
    avril: number;
    gael: number;
    total: number;
    byAction: Record<ResourceAction, number>;
  };
  activitiesCount: {
    avril: number;
    gael: number;
    total: number;
  };
  scheduleSlotsCount: {
    avril: number;
    gael: number;
    total: number;
  };
  legacyCollisionsDetected: {
    classIds: string[];
    resourceIds: string[];
    activityIds: string[];
  };
}

export interface MigrationStats {
  dryRun: boolean;
  usersInserted: number;
  studentsInserted: number;
  programEnrollmentsInserted: number;
  subjectsInserted: number;
  subjectEnrollmentsInserted: number;
  unitsInserted: number;
  dailyClassesInserted: number;
  objectivesInserted: number;
  resourcesInserted: number;
  evaluationsInserted: number;
  periodsInserted: number;
  calendarEventsInserted: number;
  auditEventsInserted: number;
  collisionsDisambiguated: number;
  skippedExisting: number;
  errors: string[];
}

export interface VerificationResult {
  passed: boolean;
  checks: {
    name: string;
    passed: boolean;
    details: string;
  }[];
  counts: Record<string, number>;
}

export class LegacyMigrationEngine {
  /**
   * Genera el inventario completo de los registros legados sin tocar la base de datos.
   */
  public generateInventory(): InventorySummary {
    const avrilUnits = AVRIL_SUBJECTS.reduce((acc, s) => acc + (s.units?.length || 0), 0);
    const gaelUnits = GAEL_SUBJECTS.reduce((acc, s) => acc + (s.units?.length || 0), 0);

    const avrilActs = AVRIL_DAILY_CLASSES.reduce((acc, c) => acc + (c.activities?.length || 0), 0);
    const gaelActs = GAEL_DAILY_CLASSES.reduce((acc, c) => acc + (c.activities?.length || 0), 0);

    const audit = this.auditAllResources();
    const byAction: Record<ResourceAction, number> = {
      reutilizar: 0,
      actualizar: 0,
      duplicado: 0,
      'pendiente de validacion': 0,
      'no migrar': 0,
    };

    audit.forEach(item => {
      byAction[item.action] = (byAction[item.action] || 0) + 1;
    });

    const avrilSch = SCHEDULE_DATA.filter(s => s.studentId === 'avril').length;
    const gaelSch = SCHEDULE_DATA.filter(s => s.studentId === 'gael').length;

    // Detección de colisiones legadas
    const seenC = new Set<string>();
    const dupC: string[] = [];
    [...AVRIL_DAILY_CLASSES, ...GAEL_DAILY_CLASSES].forEach(c => {
      if (seenC.has(c.id)) dupC.push(c.id);
      seenC.add(c.id);
    });

    const seenR = new Set<string>();
    const dupR: string[] = [];
    [...AVRIL_DAILY_CLASSES, ...GAEL_DAILY_CLASSES].forEach(c => {
      (c.resources || []).forEach(r => {
        if (seenR.has(r.id)) dupR.push(r.id);
        seenR.add(r.id);
      });
    });

    const seenA = new Set<string>();
    const dupA: string[] = [];
    [...AVRIL_DAILY_CLASSES, ...GAEL_DAILY_CLASSES].forEach(c => {
      (c.activities || []).forEach(a => {
        if (seenA.has(a.id)) dupA.push(a.id);
        seenA.add(a.id);
      });
    });

    return {
      studentsCount: 2, // Avril y Gael
      subjectsCount: {
        avril: AVRIL_SUBJECTS.length,
        gael: GAEL_SUBJECTS.length,
        total: AVRIL_SUBJECTS.length + GAEL_SUBJECTS.length,
      },
      unitsCount: {
        avril: avrilUnits,
        gael: gaelUnits,
        total: avrilUnits + gaelUnits,
      },
      dailyClassesCount: {
        avril: AVRIL_DAILY_CLASSES.length,
        gael: GAEL_DAILY_CLASSES.length,
        total: AVRIL_DAILY_CLASSES.length + GAEL_DAILY_CLASSES.length,
      },
      resourcesCount: {
        avril: AVRIL_DAILY_CLASSES.reduce((acc, c) => acc + (c.resources?.length || 0), 0),
        gael: GAEL_DAILY_CLASSES.reduce((acc, c) => acc + (c.resources?.length || 0), 0),
        total: audit.length,
        byAction,
      },
      activitiesCount: {
        avril: avrilActs,
        gael: gaelActs,
        total: avrilActs + gaelActs,
      },
      scheduleSlotsCount: {
        avril: avrilSch,
        gael: gaelSch,
        total: avrilSch + gaelSch,
      },
      legacyCollisionsDetected: {
        classIds: dupC,
        resourceIds: dupR,
        activityIds: dupA,
      },
    };
  }

  /**
   * Audita todos los recursos de ambas mallas y los clasifica formalmente según los 5 estados exigidos.
   */
  public auditAllResources(): ResourceAuditItem[] {
    const list: ResourceAuditItem[] = [];

    const processClasses = (studentId: string, classes: DailyClass[]) => {
      classes.forEach(c => {
        (c.resources || []).forEach(r => {
          let action: ResourceAction = 'pendiente de validacion';
          let justification = '';
          let targetType = 'LINK';

          const url = r.url || '';

          if (url.includes('phet.colorado.edu')) {
            action = 'reutilizar';
            targetType = 'PHET_SIMULATION';
            justification = 'Laboratorio virtual interactivo PhET Colorado de física/química/biología, compatible con navegadores y tablets.';
          } else if (url.includes('geogebra.org')) {
            action = 'reutilizar';
            targetType = 'INTERACTIVE_LAB';
            justification = 'Simulador dinámico GeoGebra para modelado matemático y geométrico.';
          } else if (url.includes('quickdraw.withgoogle.com')) {
            action = 'actualizar';
            targetType = 'INTERACTIVE_LAB';
            justification = 'Herramienta de dibujo interactiva con IA de Google para Arte (ECA). Reclasificada de VIDEO a INTERACTIVE_LAB.';
          } else if (url.includes('scratch.mit.edu')) {
            action = 'actualizar';
            targetType = 'INTERACTIVE_LAB';
            justification = 'Entorno interactivo de programación en bloques Scratch del MIT. Reclasificado de VIDEO a INTERACTIVE_LAB.';
          } else if (url.includes('wisdom-school.edu')) {
            action = 'actualizar';
            targetType = 'PDF';
            justification = 'Guía didáctica en PDF vinculada a dominio legado obsoleto de Wisdom School. Requiere re-alojamiento en el Centro de Conocimiento ALSIZ.';
          } else if (url.includes('dQw4w9WgXcQ')) {
            action = 'actualizar';
            targetType = 'VIDEO';
            justification = 'Enlace simulado (Rickroll) usado como placeholder temporal. Requiere asignación de video pedagógico real de Ekballo Church o MINEDUC.';
          } else if (url.startsWith('https://www.youtube.com') || url.startsWith('https://youtu.be')) {
            action = 'reutilizar';
            targetType = 'VIDEO';
            justification = 'Video educativo audiovisual curado y disponible en YouTube.';
          } else {
            action = 'pendiente de validacion';
            targetType = 'LINK';
            justification = 'Recurso externo que requiere validación pedagógica de disponibilidad y derechos de uso.';
          }

          list.push({
            studentId,
            classId: c.id,
            resourceId: r.id,
            rawType: r.type,
            targetType,
            title: r.title,
            url,
            action,
            justification,
          });
        });
      });
    };

    processClasses('avril', AVRIL_DAILY_CLASSES);
    processClasses('gael', GAEL_DAILY_CLASSES);

    return list;
  }

  /**
   * Ejecuta la migración de forma idempotente.
   * Si dryRun es true, ejecuta todas las verificaciones y transformaciones sin alterar la BD.
   */
  public runMigration(options: MigrationOptions): MigrationStats {
    const { db, dryRun = false, targetStudentIds = ['avril', 'gael'], actorUserId = 'usr-admin-01' } = options;

    const stats: MigrationStats = {
      dryRun,
      usersInserted: 0,
      studentsInserted: 0,
      programEnrollmentsInserted: 0,
      subjectsInserted: 0,
      subjectEnrollmentsInserted: 0,
      unitsInserted: 0,
      dailyClassesInserted: 0,
      objectivesInserted: 0,
      resourcesInserted: 0,
      evaluationsInserted: 0,
      periodsInserted: 0,
      calendarEventsInserted: 0,
      auditEventsInserted: 0,
      collisionsDisambiguated: 0,
      skippedExisting: 0,
      errors: [],
    };

    const targetStudents = STUDENTS_DATA.filter(s => targetStudentIds.includes(s.id));

    // Si es dryRun, ejecutamos las verificaciones y salimos reportando lo proyectado
    if (dryRun) {
      targetStudents.forEach(student => {
        stats.usersInserted++;
        stats.studentsInserted++;
        stats.programEnrollmentsInserted++;

        const isAvril = student.id === 'avril';
        const subjects = isAvril ? AVRIL_SUBJECTS : GAEL_SUBJECTS;
        const classes = isAvril ? AVRIL_DAILY_CLASSES : GAEL_DAILY_CLASSES;

        stats.subjectsInserted += subjects.length;
        stats.subjectEnrollmentsInserted += subjects.length;

        subjects.forEach(subj => {
          stats.unitsInserted += (subj.units?.length || 0);
        });

        stats.dailyClassesInserted += classes.length;
        classes.forEach(c => {
          stats.objectivesInserted++;
          stats.resourcesInserted += (c.resources?.length || 0);
          stats.evaluationsInserted += (c.activities?.length || 0);
        });

        // Periodos y eventos
        stats.periodsInserted = 3;
        stats.calendarEventsInserted += (student.academicPlan?.projects?.length || 0);
      });

      stats.auditEventsInserted = 1;
      return stats;
    }

    // ==========================================
    // EJECUCIÓN REAL (IDEMPOTENTE Y ATÓMICA)
    // ==========================================
    db.exec('BEGIN TRANSACTION;');

    try {
      // 1. Asegurar programas y niveles base
      db.prepare(`
        INSERT OR IGNORE INTO programs (id, code, name, program_type, description, is_active)
        VALUES ('prog-homeschool', 'EKB-HOMESCHOOL', 'Educación en Casa K-12', 'K12_HOMESCHOOL', 'Currículo integral de homeschooling con alineación MINEDUC y formación cristiana', 1);
      `).run();

      db.prepare(`
        INSERT OR IGNORE INTO levels (id, program_id, code, name, order_index, min_recommended_age)
        VALUES 
          ('lvl-elem-4', 'prog-homeschool', 'EGB-ELEM-4', '4.º Grado EGB Elemental', 4, 8),
          ('lvl-sup-8', 'prog-homeschool', 'EGB-SUP-8', '8.º Grado EGB Superior', 8, 12);
      `).run();

      // 2. Periodos Académicos del Año Lectivo 2026-2027 (con fechas exactas de mockData)
      const periods = [
        { id: 'per-2026-t1', code: 'PER-2026-2027-T1', name: '1.º TRIMESTRE: Diagnóstico y Proyectos Iniciales', trimester: 1, start: '2026-09-07', end: '2026-11-24', isCurrent: 1 },
        { id: 'per-2026-t2', code: 'PER-2026-2027-T2', name: '2.º TRIMESTRE: Avance Interdisciplinario', trimester: 2, start: '2026-11-26', end: '2027-03-08', isCurrent: 0 },
        { id: 'per-2026-t3', code: 'PER-2026-2027-T3', name: '3.º TRIMESTRE: Cierre de Año y Exposición', trimester: 3, start: '2027-03-10', end: '2027-06-09', isCurrent: 0 },
      ];

      const stmtPeriod = db.prepare(`
        INSERT OR IGNORE INTO academic_periods (id, code, name, school_year, trimester_number, start_date, end_date, is_current)
        VALUES (?, ?, ?, '2026-2027', ?, ?, ?, ?)
      `);

      periods.forEach(p => {
        const res = stmtPeriod.run(p.id, p.code, p.name, p.trimester, p.start, p.end, p.isCurrent);
        if (Number(res.changes) > 0) stats.periodsInserted++;
        else stats.skippedExisting++;
      });

      // Rastrear IDs insertados para desambiguar colisiones en los datos legados de Wisdom School
      const seenClassDbIds = new Set<string>();
      const seenObjDbIds = new Set<string>();
      const seenResDbIds = new Set<string>();
      const seenEvalDbIds = new Set<string>();

      // 3. Migración por Estudiante
      for (const student of targetStudents) {
        const isAvril = student.id === 'avril';
        const levelId = isAvril ? 'lvl-sup-8' : 'lvl-elem-4';
        const studentCode = isAvril ? 'ALSIZ-8VO-AVR' : 'ALSIZ-4TO-GAE';
        const userId = `usr-mig-${student.id}`;
        const studentDbId = `stu-mig-${student.id}`;
        const enrollmentId = `enr-mig-${student.id}-homeschool`;

        // Contraseña y PIN hasheados (NUNCA en texto claro)
        const rawPassword = student.password || student.id;
        const rawPin = student.pinCode || `${student.id.toUpperCase()}-2026`;
        const passHash = hashPassword(rawPassword);
        const pinHash = hashPin(rawPin);

        // Fecha de nacimiento: deducida con honestidad a partir de edad documentada (12 o 8 años)
        // sin inventar día/mes aleatorio (se asigna 01 de enero del año deducible y se documenta)
        const deducedYear = 2026 - (student.age || (isAvril ? 12 : 8));
        const birthDate = `${deducedYear}-01-01`;

        // 3.1 Usuario en users
        const stmtUser = db.prepare(`
          INSERT INTO users (id, email, username, password_hash, role, status, first_name, last_name, avatar_asset_key)
          VALUES (?, ?, ?, ?, 'STUDENT', 'ACTIVE', ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            status = 'ACTIVE',
            updated_at = datetime('now');
        `);
        const userRes = stmtUser.run(
          userId,
          student.email || `${student.id}@ekballo.alsiz.edu`,
          `${student.id}_ekballo`,
          passHash,
          student.name,
          'Andrade Sánchez',
          student.avatar || (isAvril ? 'snoopy_avatar' : 'mario_avatar')
        );
        if (Number(userRes.changes) > 0) stats.usersInserted++;

        // 3.2 Perfil en students
        const stmtStudent = db.prepare(`
          INSERT INTO students (id, user_id, pin_code_hash, student_code, birth_date, motto, color_theme_json)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            motto = excluded.motto,
            color_theme_json = excluded.color_theme_json;
        `);
        const studRes = stmtStudent.run(
          studentDbId,
          userId,
          pinHash,
          studentCode,
          birthDate,
          student.motto || '',
          JSON.stringify(student.colorTheme || {})
        );
        if (Number(studRes.changes) > 0) stats.studentsInserted++;

        // 3.3 Matrícula en programa
        const stmtEnr = db.prepare(`
          INSERT INTO student_program_enrollments (id, student_id, program_id, level_id, school_year, status)
          VALUES (?, ?, 'prog-homeschool', ?, '2026-2027', 'ACTIVE')
          ON CONFLICT(id) DO UPDATE SET status = 'ACTIVE';
        `);
        const enrRes = stmtEnr.run(enrollmentId, studentDbId, levelId);
        if (Number(enrRes.changes) > 0) stats.programEnrollmentsInserted++;

        // 3.4 Asignaturas y Unidades
        const subjects = isAvril ? AVRIL_SUBJECTS : GAEL_SUBJECTS;
        const stmtSubject = db.prepare(`
          INSERT INTO subjects (id, program_id, level_id, code, name, category, weekly_hours, default_teacher_id)
          VALUES (?, 'prog-homeschool', ?, ?, ?, ?, ?, 'usr-teacher-01')
          ON CONFLICT(id) DO UPDATE SET
            name = excluded.name,
            category = excluded.category,
            weekly_hours = excluded.weekly_hours;
        `);

        const stmtSubjEnrollment = db.prepare(`
          INSERT INTO student_subject_enrollments (id, student_id, subject_id, program_enrollment_id, status)
          VALUES (?, ?, ?, ?, 'ACTIVE')
          ON CONFLICT(student_id, subject_id) DO UPDATE SET status = 'ACTIVE';
        `);

        const stmtUnit = db.prepare(`
          INSERT INTO curriculum_units (id, subject_id, unit_number, trimester_number, title, learning_axis)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            title = excluded.title,
            learning_axis = excluded.learning_axis;
        `);

        for (const subj of subjects) {
          const subjectDbId = `subj-mig-${subj.id}`;

          // Categorización de asignaturas
          let category = 'COMPLEMENTARIA';
          if (['mat', 'len', 'sci', 'soc', 'art', 'efi'].some(prefix => subj.id.startsWith(prefix))) {
            category = 'TRONCAL_MINEDUC';
          } else if (subj.id.startsWith('rel')) {
            category = 'FORMACION_CRISTIANA';
          } else if (subj.id.startsWith('ing')) {
            category = 'AMPLIACION_INTERNACIONAL';
          }

          const hours = subj.id.startsWith('mat') || subj.id.startsWith('len') ? 4 : 3;

          const sRes = stmtSubject.run(
            subjectDbId,
            levelId,
            subj.code,
            subj.name,
            category,
            hours
          );
          if (Number(sRes.changes) > 0) stats.subjectsInserted++;

          // Matrícula por asignatura
          const subEnrId = `subenr-${studentDbId}-${subjectDbId}`;
          const seRes = stmtSubjEnrollment.run(subEnrId, studentDbId, subjectDbId, enrollmentId);
          if (Number(seRes.changes) > 0) stats.subjectEnrollmentsInserted++;

          // Unidades curriculares
          if (subj.units && subj.units.length > 0) {
            for (const unit of subj.units) {
              const unitDbId = `unit-mig-${unit.id}`;
              const uRes = stmtUnit.run(
                unitDbId,
                subjectDbId,
                unit.unitNumber || 1,
                unit.unitNumber || 1,
                unit.title,
                unit.description || `Eje temático de ${subj.name}`
              );
              if (Number(uRes.changes) > 0) stats.unitsInserted++;
            }
          } else {
            // Unidad por defecto si no venía fragmentada
            const unitDbId = `unit-mig-${subj.id}-u1`;
            const uRes = stmtUnit.run(
              unitDbId,
              subjectDbId,
              1,
              1,
              `Unidad 1: Fundamentos de ${subj.name}`,
              `Eje temático principal de ${subj.name}`
            );
            if (Number(uRes.changes) > 0) stats.unitsInserted++;
          }
        }

        // 3.5 Clases Diarias, Objetivos, Recursos y Evaluaciones
        const classes = isAvril ? AVRIL_DAILY_CLASSES : GAEL_DAILY_CLASSES;

        const stmtClass = db.prepare(`
          INSERT INTO daily_classes (id, unit_id, day_number, title, socratic_question, dynamic_activity, content_markdown, lab_type)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            title = excluded.title,
            socratic_question = excluded.socratic_question,
            dynamic_activity = excluded.dynamic_activity,
            content_markdown = excluded.content_markdown,
            lab_type = excluded.lab_type;
        `);

        const stmtObj = db.prepare(`
          INSERT INTO lesson_objectives (id, daily_class_id, unit_id, description, order_index)
          VALUES (?, ?, ?, ?, 1)
          ON CONFLICT(id) DO UPDATE SET description = excluded.description;
        `);

        const stmtResource = db.prepare(`
          INSERT INTO learning_resources (id, daily_class_id, unit_id, title, description, resource_type, url_or_key, language, is_translated, fallback_language, order_index)
          VALUES (?, ?, ?, ?, ?, ?, ?, 'es', 1, 'es', ?)
          ON CONFLICT(id) DO UPDATE SET
            title = excluded.title,
            url_or_key = excluded.url_or_key,
            resource_type = excluded.resource_type;
        `);

        const stmtEval = db.prepare(`
          INSERT INTO evaluations (id, daily_class_id, unit_id, title, evaluation_type, max_score, is_mineduc_evidence)
          VALUES (?, ?, ?, ?, ?, 10.00, 1)
          ON CONFLICT(id) DO UPDATE SET title = excluded.title;
        `);

        for (let idx = 0; idx < classes.length; idx++) {
          const cls = classes[idx];
          
          // Desambiguar ID si hubo colisión en el código legado
          let classDbId = `class-mig-${cls.id}`;
          if (seenClassDbIds.has(classDbId)) {
            classDbId = `${classDbId}-dup2`;
            stats.collisionsDisambiguated++;
          }
          seenClassDbIds.add(classDbId);

          const subjectDbId = `subj-mig-${cls.subjectId}`;

          // Asociar con la primera unidad disponible de la materia
          const rowUnit = db.prepare('SELECT id FROM curriculum_units WHERE subject_id = ? ORDER BY unit_number ASC LIMIT 1').get(subjectDbId) as any;
          const unitDbId = rowUnit ? rowUnit.id : `unit-mig-${cls.subjectId}-u1`;

          // Detectar simulador
          let labType: string | null = null;
          const resSim = (cls.resources || []).find(r => r.type === 'simulator' || (r.url && (r.url.includes('phet') || r.url.includes('geogebra'))));
          if (resSim) {
            labType = resSim.url.includes('phet') ? 'phet' : 'geogebra';
          }

          const socraticQ = (cls.socraticQuestions && cls.socraticQuestions.length > 0)
            ? cls.socraticQuestions.join('\n\n')
            : '¿Cómo aplicarías este conocimiento a un problema real de tu entorno?';

          const dynamicAct = (cls.activities && cls.activities.length > 0)
            ? cls.activities.map(a => `${a.title}: ${a.description}`).join('\n')
            : 'Desarrollo del taller socrático guiado.';

          const contentMd = `# ${cls.theme}\n\n${cls.introduction || ''}\n\n${cls.reading ? `## Lectura Recomendada\n${cls.reading}\n\n` : ''}## Preguntas Socráticas\n${socraticQ}`;

          const cRes = stmtClass.run(
            classDbId,
            unitDbId,
            idx + 1,
            cls.theme,
            socraticQ,
            dynamicAct,
            contentMd,
            labType
          );
          if (Number(cRes.changes) > 0) stats.dailyClassesInserted++;

          // Objetivo de aprendizaje
          if (cls.objective) {
            let objId = `obj-mig-${cls.id}`;
            if (seenObjDbIds.has(objId)) {
              objId = `${objId}-dup2`;
            }
            seenObjDbIds.add(objId);

            const oRes = stmtObj.run(objId, classDbId, unitDbId, cls.objective);
            if (Number(oRes.changes) > 0) stats.objectivesInserted++;
          }

          // Recursos didácticos
          if (cls.resources && cls.resources.length > 0) {
            for (let rIdx = 0; rIdx < cls.resources.length; rIdx++) {
              const res = cls.resources[rIdx];
              let resId = `res-mig-${res.id}`;
              if (seenResDbIds.has(resId)) {
                resId = `${resId}-dup2`;
              }
              seenResDbIds.add(resId);

              let targetType = 'LINK';
              const u = res.url || '';
              if (u.includes('phet.colorado.edu')) targetType = 'PHET_SIMULATION';
              else if (u.includes('geogebra.org') || u.includes('scratch.mit.edu') || u.includes('quickdraw')) targetType = 'INTERACTIVE_LAB';
              else if (res.type === 'pdf' || u.includes('.pdf')) targetType = 'PDF';
              else if (res.type === 'video' || u.includes('youtube') || u.includes('youtu.be')) targetType = 'VIDEO';

              const rRes = stmtResource.run(
                resId,
                classDbId,
                unitDbId,
                res.title,
                res.description || `Recurso pedagógico de apoyo para ${cls.theme}`,
                targetType,
                res.url || '',
                rIdx + 1
              );
              if (Number(rRes.changes) > 0) stats.resourcesInserted++;
            }
          }

          // Actividades evaluativas
          if (cls.activities && cls.activities.length > 0) {
            for (const act of cls.activities) {
              let evalId = `eval-mig-${act.id}`;
              if (seenEvalDbIds.has(evalId)) {
                evalId = `${evalId}-dup2`;
              }
              seenEvalDbIds.add(evalId);

              let evalType = 'PROJECT_RUBRIC';
              if (act.type === 'reflection') evalType = 'SOCRATIC_DIALOGUE';
              else if (act.type === 'analysis' || act.type === 'practice') evalType = 'PORTFOLIO_EVIDENCE';

              const eRes = stmtEval.run(
                evalId,
                classDbId,
                unitDbId,
                act.title,
                evalType
              );
              if (Number(eRes.changes) > 0) stats.evaluationsInserted++;
            }
          }
        }

        // 3.6 Eventos de Calendario Académico (Proyectos Interdisciplinarios)
        const projects = student.academicPlan?.projects || [];
        const stmtEvent = db.prepare(`
          INSERT INTO academic_calendar_events (id, period_id, program_id, subject_id, title, description, event_type, start_date, end_date, is_mandatory)
          VALUES (?, ?, 'prog-homeschool', NULL, ?, ?, 'EVALUATION_DEADLINE', ?, ?, 1)
          ON CONFLICT(id) DO UPDATE SET title = excluded.title;
        `);

        for (const proj of projects) {
          const eventId = `ev-mig-${proj.id}`;
          const periodId = `per-2026-t${proj.trimesterNumber}`;
          const dateRange = proj.trimesterNumber === 1 ? '2026-11-20' : '2027-03-05';

          const evRes = stmtEvent.run(
            eventId,
            periodId,
            `Hito Evaluativo: Proyecto Integrador ${proj.title}`,
            `Entregables: ${proj.deliverables?.join(', ')}. Criterio: ${proj.evaluationCriteria}`,
            dateRange,
            dateRange
          );
          if (Number(evRes.changes) > 0) stats.calendarEventsInserted++;
        }
      }

      // 4. Registro en el Libro Mayor de Auditoría Inmutable (LOPDP)
      const auditId = `aud-mig-${crypto.randomBytes(6).toString('hex')}`;
      const stmtAudit = db.prepare(`
        INSERT INTO audit_events (id, user_id, event_type, resource_type, resource_id, ip_hash, user_agent, details_json)
        VALUES (?, ?, 'STUDENT_MIGRATION_CONTROLLED', 'students', 'multi-students', ?, 'ALSIZ_Migration_Engine/1.0', ?)
      `);

      stmtAudit.run(
        auditId,
        actorUserId,
        crypto.createHash('sha256').update('127.0.0.1').digest('hex'),
        JSON.stringify({
          action: 'CONTROLLED_MIGRATION_EXECUTE',
          studentsMigrated: targetStudentIds,
          totalUsersInserted: stats.usersInserted,
          totalStudentsInserted: stats.studentsInserted,
          totalSubjectsInserted: stats.subjectsInserted,
          totalDailyClassesInserted: stats.dailyClassesInserted,
          totalResourcesInserted: stats.resourcesInserted,
          collisionsDisambiguated: stats.collisionsDisambiguated,
          timestamp: new Date().toISOString(),
        })
      );
      stats.auditEventsInserted++;

      db.exec('COMMIT;');
    } catch (err: any) {
      db.exec('ROLLBACK;');
      stats.errors.push(err.message || String(err));
      throw err;
    }

    return stats;
  }

  /**
   * Verifica minuciosamente la integridad referencial y conteos de la migración realizada.
   */
  public verifyMigration(db: DatabaseSync, targetStudentIds = ['avril', 'gael']): VerificationResult {
    const checks: VerificationResult['checks'] = [];
    const counts: Record<string, number> = {};

    const getCount = (query: string, ...params: any[]): number => {
      const row = db.prepare(query).get(...params) as any;
      return Number(row?.count || row?.total || 0);
    };

    // 1. Conteo de usuarios migrados
    const usersCount = getCount("SELECT COUNT(*) as total FROM users WHERE id LIKE 'usr-mig-%'");
    counts['users_migrated'] = usersCount;
    checks.push({
      name: 'Usuarios migrados con hash seguro',
      passed: usersCount === targetStudentIds.length,
      details: `${usersCount} de ${targetStudentIds.length} usuarios migrados.`,
    });

    // 2. Conteo de estudiantes migrados
    const studentsCount = getCount("SELECT COUNT(*) as total FROM students WHERE id LIKE 'stu-mig-%'");
    counts['students_migrated'] = studentsCount;
    checks.push({
      name: 'Estudiantes migrados con PIN hash y código de matrícula',
      passed: studentsCount === targetStudentIds.length,
      details: `${studentsCount} de ${targetStudentIds.length} perfiles creados.`,
    });

    // 3. Asignaturas migradas
    const subjectsCount = getCount("SELECT COUNT(*) as total FROM subjects WHERE id LIKE 'subj-mig-%'");
    counts['subjects_migrated'] = subjectsCount;
    checks.push({
      name: 'Asignaturas migradas (11 Superior + 9 Elemental = 20)',
      passed: subjectsCount === 20,
      details: `${subjectsCount} asignaturas encontradas en base de datos.`,
    });

    // 4. Clases diarias migradas
    const classesCount = getCount("SELECT COUNT(*) as total FROM daily_classes WHERE id LIKE 'class-mig-%'");
    counts['daily_classes_migrated'] = classesCount;
    checks.push({
      name: 'Clases diarias migradas (23 Superior + 20 Elemental = 43)',
      passed: classesCount === 43,
      details: `${classesCount} clases socráticas encontradas.`,
    });

    // 5. Recursos pedagógicos
    const resourcesCount = getCount("SELECT COUNT(*) as total FROM learning_resources WHERE id LIKE 'res-mig-%'");
    counts['resources_migrated'] = resourcesCount;
    checks.push({
      name: 'Recursos pedagógicos migrados (86 recursos auditados)',
      passed: resourcesCount === 86,
      details: `${resourcesCount} recursos vinculados a lecciones.`,
    });

    // 6. Evaluaciones formativas
    const evaluationsCount = getCount("SELECT COUNT(*) as total FROM evaluations WHERE id LIKE 'eval-mig-%'");
    counts['evaluations_migrated'] = evaluationsCount;
    checks.push({
      name: 'Evaluaciones formativas derivadas de actividades (129 actividades)',
      passed: evaluationsCount === 129,
      details: `${evaluationsCount} rúbricas/talleres formativos generados.`,
    });

    // 7. Integridad referencial (Cero claves foráneas rotas o huérfanas)
    const orphanClasses = getCount(`
      SELECT COUNT(*) as total FROM daily_classes c 
      LEFT JOIN curriculum_units u ON c.unit_id = u.id 
      WHERE u.id IS NULL AND c.id LIKE 'class-mig-%'
    `);
    checks.push({
      name: 'Cero clases huérfanas sin unidad curricular',
      passed: orphanClasses === 0,
      details: `Huérfanas encontradas: ${orphanClasses}.`,
    });

    const orphanResources = getCount(`
      SELECT COUNT(*) as total FROM learning_resources r 
      LEFT JOIN daily_classes c ON r.daily_class_id = c.id 
      WHERE c.id IS NULL AND r.id LIKE 'res-mig-%'
    `);
    checks.push({
      name: 'Cero recursos huérfanos sin clase diaria vinculada',
      passed: orphanResources === 0,
      details: `Huérfanos encontrados: ${orphanResources}.`,
    });

    const orphanEnrollments = getCount(`
      SELECT COUNT(*) as total FROM student_subject_enrollments se
      LEFT JOIN students s ON se.student_id = s.id
      LEFT JOIN subjects subj ON se.subject_id = subj.id
      WHERE (s.id IS NULL OR subj.id IS NULL) AND se.id LIKE 'subenr-stu-mig-%'
    `);
    checks.push({
      name: 'Cero matrículas huérfanas en asignaturas',
      passed: orphanEnrollments === 0,
      details: `Huérfanas encontradas: ${orphanEnrollments}.`,
    });

    // 8. Evento de auditoría registrado
    const auditEvents = getCount("SELECT COUNT(*) as total FROM audit_events WHERE event_type = 'STUDENT_MIGRATION_CONTROLLED'");
    checks.push({
      name: 'Auditoría LOPDP registrada en libro mayor inmutable',
      passed: auditEvents >= 1,
      details: `${auditEvents} eventos de migración registrados.`,
    });

    const passed = checks.every(c => c.passed);
    return { passed, checks, counts };
  }

  /**
   * Revierte de forma quirúrgica y limpia los registros migrados sin tocar registros sintéticos de desarrollo.
   */
  public rollbackMigration(db: DatabaseSync, targetStudentIds = ['avril', 'gael']): number {
    db.exec('BEGIN TRANSACTION;');
    let deletedCount = 0;

    try {
      // Eliminar en orden inverso por claves foráneas
      const stmts = [
        "DELETE FROM audit_events WHERE event_type = 'STUDENT_MIGRATION_CONTROLLED';",
        "DELETE FROM academic_calendar_events WHERE id LIKE 'ev-mig-%';",
        "DELETE FROM evaluations WHERE id LIKE 'eval-mig-%';",
        "DELETE FROM learning_resources WHERE id LIKE 'res-mig-%';",
        "DELETE FROM lesson_objectives WHERE id LIKE 'obj-mig-%';",
        "DELETE FROM daily_classes WHERE id LIKE 'class-mig-%';",
        "DELETE FROM curriculum_units WHERE id LIKE 'unit-mig-%';",
        "DELETE FROM student_subject_enrollments WHERE id LIKE 'subenr-stu-mig-%';",
        "DELETE FROM subjects WHERE id LIKE 'subj-mig-%';",
        "DELETE FROM student_program_enrollments WHERE id LIKE 'enr-mig-%';",
        "DELETE FROM students WHERE id LIKE 'stu-mig-%';",
        "DELETE FROM users WHERE id LIKE 'usr-mig-%';",
      ];

      stmts.forEach(sql => {
        const res = db.prepare(sql).run();
        deletedCount += Number(res.changes);
      });

      db.exec('COMMIT;');
    } catch (err) {
      db.exec('ROLLBACK;');
      throw err;
    }

    return deletedCount;
  }
}

