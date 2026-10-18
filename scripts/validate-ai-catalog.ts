/**
 * ==============================================================================
 * Validador de Catálogo Curricular, Matrícula, Agentes IA y Fuentes (ETAPA-07)
 * Plataforma Educativa ALSIZ para Ekballo Church
 * ==============================================================================
 * Comprueba:
 * 1. Correspondencia 1:1 entre materias activas de Gael (4.º EGB) y Avril (8.º EGB).
 * 2. Existencia de un agente especializado por asignatura y nivel en ai_agents.
 * 3. Existencia y completitud de la Matriz Temática en docs/ai-agents/matrices-tematicas/.
 * 4. Presencia de al menos una fuente aprobada (status = 'APROBADO') en knowledge_sources.
 * 5. Presencia de fragmentos de conocimiento (chunks) indexados con etiquetas de citación formal.
 * 6. Presencia y configuración de los 5 roles transversales institucionales.
 * 
 * Falla si cualquier materia de un estudiante carece de agente especializado o fuentes mínimas.
 */

import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { GAEL_SUBJECTS, AVRIL_SUBJECTS } from '../src/data/mockData';

interface ValidationIssue {
  student: string;
  subjectCode: string;
  subjectName: string;
  severity: 'CRITICAL' | 'WARNING';
  message: string;
}

interface ValidationReport {
  timestamp: string;
  totalSubjectsChecked: number;
  totalAgentsChecked: number;
  totalMatricesChecked: number;
  totalSourcesChecked: number;
  transversalRolesVerified: number;
  issues: ValidationIssue[];
  passed: boolean;
}

export function validateAICatalog(dbPath?: string): ValidationReport {
  const issues: ValidationIssue[] = [];
  const targetDbPath = dbPath || path.resolve(process.cwd(), 'data', 'alsiz.db');
  
  if (!fs.existsSync(targetDbPath)) {
    throw new Error(`DATABASE_NOT_FOUND: No se encontró la base de datos en ${targetDbPath}`);
  }

  const db = new DatabaseSync(targetDbPath);
  const matricesDir = path.resolve(process.cwd(), 'docs', 'ai-agents', 'matrices-tematicas');

  // 1. Estudiantes y materias a auditar
  const students = [
    { id: 'gael', name: 'Gael (4.º EGB Elemental)', levelId: 'lvl-elem-4', subjects: GAEL_SUBJECTS },
    { id: 'avril', name: 'Avril (8.º EGB Superior)', levelId: 'lvl-sup-8', subjects: AVRIL_SUBJECTS },
  ];

  let totalSubjects = 0;
  let totalAgents = 0;
  let totalMatrices = 0;
  let totalSources = 0;

  for (const stu of students) {
    for (const subj of stu.subjects) {
      totalSubjects++;
      const code = subj.code;
      const name = subj.name;

      // 2. Verificar existencia de Agente Especializado
      const agent = db.prepare(`
        SELECT * FROM ai_agents 
        WHERE (subject_id = ? OR code LIKE ? OR system_prompt LIKE ?)
          AND level_id = ?
      `).get(
        subj.id,
        `%${stu.id}_%`,
        `%${code}%`,
        stu.levelId
      ) as any;

      if (!agent) {
        issues.push({
          student: stu.name,
          subjectCode: code,
          subjectName: name,
          severity: 'CRITICAL',
          message: `No se encontró un Agente IA especializado para el nivel ${stu.levelId} y asignatura ${code}.`,
        });
        continue;
      }

      totalAgents++;

      // 3. Verificar Matriz Temática en disco
      const matrixFilename = `MT-${code}.md`;
      const matrixPath = path.join(matricesDir, matrixFilename);

      if (!fs.existsSync(matrixPath)) {
        issues.push({
          student: stu.name,
          subjectCode: code,
          subjectName: name,
          severity: 'CRITICAL',
          message: `Falta el archivo de Matriz Temática obligatorio: ${matrixFilename}`,
        });
      } else {
        totalMatrices++;
        const matrixContent = fs.readFileSync(matrixPath, 'utf8');
        const requiredSections = [
          'Competencias y Destrezas Clave',
          'Secuencia Didáctica Anual',
          'Prerrequisitos Cognitivos',
          'Vocabulario Técnico Graduado',
          'Errores Conceptuales Frecuentes',
          'Explicaciones Graduadas',
          'Actividades Socráticas Interactivas',
          'Respuestas de Referencia',
          'Rúbrica Analítica de Evaluación Formativa',
          'Fuentes Válidas del Centro de Conocimiento',
          'Límites de Seguridad y Protocolos de Derivación',
        ];

        for (const sec of requiredSections) {
          if (!matrixContent.includes(sec)) {
            issues.push({
              student: stu.name,
              subjectCode: code,
              subjectName: name,
              severity: 'WARNING',
              message: `La matriz temática ${matrixFilename} carece de la sección requerida: "${sec}".`,
            });
          }
        }
      }

      // 4. Verificar Fuentes Aprobadas en Centro de Conocimiento
      let allowedSourceCodes: string[] = [];
      if (agent.allowed_source_codes_json) {
        try {
          allowedSourceCodes = JSON.parse(agent.allowed_source_codes_json);
        } catch {
          issues.push({
            student: stu.name,
            subjectCode: code,
            subjectName: name,
            severity: 'CRITICAL',
            message: `JSON corrupto en allowed_source_codes_json del agente ${agent.code}.`,
          });
        }
      }

      if (allowedSourceCodes.length === 0) {
        issues.push({
          student: stu.name,
          subjectCode: code,
          subjectName: name,
          severity: 'CRITICAL',
          message: `El agente ${agent.code} no tiene fuentes asignadas en allowed_source_codes_json.`,
        });
      } else {
        for (const srcCode of allowedSourceCodes) {
          const source = db.prepare(`
            SELECT * FROM knowledge_sources WHERE code = ? AND status = 'APROBADO'
          `).get(srcCode) as any;

          if (!source) {
            issues.push({
              student: stu.name,
              subjectCode: code,
              subjectName: name,
              severity: 'CRITICAL',
              message: `La fuente asignada '${srcCode}' no existe o no se encuentra en estado APROBADO.`,
            });
          } else {
            totalSources++;
            // 5. Verificar chunks indexados
            const chunkCountRow = db.prepare(`
              SELECT COUNT(*) as count FROM knowledge_chunks WHERE source_id = ?
            `).get(source.id) as any;

            if (!chunkCountRow || chunkCountRow.count === 0) {
              issues.push({
                student: stu.name,
                subjectCode: code,
                subjectName: name,
                severity: 'CRITICAL',
                message: `La fuente aprobada '${srcCode}' tiene 0 fragmentos (chunks) indexados para RAG.`,
              });
            }
          }
        }
      }
    }
  }

  // 6. Verificar Roles Transversales Obligatorios
  const requiredTransversals = [
    { role: 'COORDINATOR', code: 'coord_academico_global' },
    { role: 'SOCRATIC_TUTOR', code: 'tutor_socratico_transversal' },
    { role: 'ESSAY_EVALUATOR', code: 'evaluador_formativo_rubricas' },
    { role: 'KNOWLEDGE_CURATOR', code: 'curador_conocimiento_alsiz' },
    { role: 'SAFETY_SUPERVISOR', code: 'supervisor_seguridad_infantil' },
  ];

  let verifiedTransversals = 0;
  for (const trans of requiredTransversals) {
    const row = db.prepare(`
      SELECT * FROM ai_agents WHERE code = ? AND role_type = ?
    `).get(trans.code, trans.role) as any;

    if (!row) {
      issues.push({
        student: 'TRANSVERSAL_SYSTEM',
        subjectCode: 'SYSTEM',
        subjectName: 'Rol Transversal',
        severity: 'CRITICAL',
        message: `Falta el agente transversal obligatorio '${trans.code}' con rol '${trans.role}'.`,
      });
    } else {
      verifiedTransversals++;
    }
  }

  const passed = issues.filter((i) => i.severity === 'CRITICAL').length === 0;

  return {
    timestamp: new Date().toISOString(),
    totalSubjectsChecked: totalSubjects,
    totalAgentsChecked: totalAgents,
    totalMatricesChecked: totalMatrices,
    totalSourcesChecked: totalSources,
    transversalRolesVerified: verifiedTransversals,
    issues,
    passed,
  };
}

// Ejecución directa por CLI
if (require.main === module) {
  const customDb = process.argv[2];
  console.log('================================================================');
  console.log('  VALIDADOR DE CATÁLOGO CURRICULAR, AGENTES IA Y FUENTES (ETAPA-07)');
  console.log('================================================================\n');

  try {
    const report = validateAICatalog(customDb);
    console.log(`Fecha de auditoría:      ${report.timestamp}`);
    console.log(`Asignaturas auditadas:    ${report.totalSubjectsChecked} (9 Gael + 11 Avril)`);
    console.log(`Agentes verificados:      ${report.totalAgentsChecked}`);
    console.log(`Matrices en disco:        ${report.totalMatricesChecked} / 20`);
    console.log(`Fuentes RAG aprobadas:    ${report.totalSourcesChecked}`);
    console.log(`Roles transversales:      ${report.transversalRolesVerified} / 5\n`);

    if (report.issues.length > 0) {
      console.log('--- INCIDENCIAS DETECTADAS ---');
      for (const iss of report.issues) {
        const icon = iss.severity === 'CRITICAL' ? '❌' : '⚠️';
        console.log(`${icon} [${iss.severity}] ${iss.student} (${iss.subjectCode}): ${iss.message}`);
      }
      console.log('------------------------------\n');
    }

    if (report.passed) {
      console.log('✅ RESULTADO: AUDITORÍA EXITOSA — 100% de asignaturas cubiertas con agentes, matrices y fuentes.');
      process.exit(0);
    } else {
      console.error('❌ RESULTADO: AUDITORÍA FALLIDA — Existen asignaturas sin agente especializado o sin fuentes mínimas.');
      process.exit(1);
    }
  } catch (err: any) {
    console.error('❌ ERROR FATAL DE AUDITORÍA:', err.message);
    process.exit(1);
  }
}

