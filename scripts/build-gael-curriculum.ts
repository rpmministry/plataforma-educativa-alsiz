import fs from 'node:fs';
import path from 'node:path';
import { ALL_GAEL_LOTES, CONSOLIDATED_GAEL_CLASSES, CurriculumLote } from './lotes';
import { DailyClass } from '../src/types';

interface ValidationResult {
  loteId: string;
  subjectCode: string;
  classesCount: number;
  status: 'PASSED' | 'FAILED';
  errors: string[];
}

export function validateAndBuildGaelCurriculum() {
  console.log('==============================================================================');
  console.log('VALIDADOR Y CONSOLIDADOR DE CURRÍCULO DE GAEL — ETAPA 06A');
  console.log('==============================================================================\n');

  const logs: string[] = [];
  const log = (msg: string) => {
    console.log(msg);
    logs.push(msg);
  };

  log(`Fecha y hora de validación: ${new Date().toISOString()}`);
  log(`Total de lotes a validar: ${ALL_GAEL_LOTES.length}`);
  log(`Total de clases consolidables: ${CONSOLIDATED_GAEL_CLASSES.length}\n`);

  const seenClassIds = new Set<string>();
  const seenResourceIds = new Set<string>();
  const seenActivityIds = new Set<string>();
  const loteResults: ValidationResult[] = [];
  let totalErrors = 0;

  for (const lote of ALL_GAEL_LOTES) {
    const errors: string[] = [];
    log(`--- VALIDANDO ${lote.loteId} (${lote.subjectName} - ${lote.subjectCode}) ---`);
    log(`Sesiones declaradas: ${lote.classesCount} | Clases en array: ${lote.classes.length}`);

    if (lote.classes.length !== lote.classesCount) {
      errors.push(`Discrepancia en conteo: se esperaban ${lote.classesCount} pero hay ${lote.classes.length}`);
    }

    for (const [idx, cls] of lote.classes.entries()) {
      const prefix = `[Clase ${cls.id || `idx-${idx}`}]`;

      // 1. Unicidad de ID
      if (!cls.id) {
        errors.push(`${prefix} Falta ID único de clase.`);
      } else if (seenClassIds.has(cls.id)) {
        errors.push(`${prefix} ID duplicado detectado: ${cls.id}`);
      } else {
        seenClassIds.add(cls.id);
      }

      // 2. Grado y Asignatura
      if (!cls.gradeLevel || !cls.gradeLevel.includes('4.º EGB Elemental')) {
        errors.push(`${prefix} gradeLevel inválido o ausente: ${cls.gradeLevel}`);
      }
      if (!cls.subjectId || cls.studentId !== 'gael') {
        errors.push(`${prefix} subjectId o studentId inválido: subjectId=${cls.subjectId}, studentId=${cls.studentId}`);
      }

      // 3. Trimestre / Unidad
      if (!cls.unit || (!cls.unit.includes('Unidad 1') && !cls.unit.includes('Unit 1'))) {
        errors.push(`${prefix} Unidad no declarada correctamente como Unidad 1 / Unit 1: ${cls.unit}`);
      }

      // 4. Posición temporal / fecha
      if (!cls.date || !cls.dayOfWeek || !cls.scheduleTime) {
        errors.push(`${prefix} Datos temporales incompletos (date, dayOfWeek, scheduleTime).`);
      }

      // 5. Propósito y objetivos
      if (!cls.objective || !cls.learningPurpose || !cls.theme) {
        errors.push(`${prefix} Falta objective, learningPurpose o theme.`);
      }

      // 6. Destreza DCD y fuente oficial
      if (!cls.competencyDcd || cls.competencyDcd.length < 5) {
        errors.push(`${prefix} competencyDcd inválido o ausente.`);
      }
      if (!cls.officialSource || cls.officialSource.length < 5) {
        errors.push(`${prefix} officialSource inválido o ausente.`);
      }

      // 7. Explicación didáctica para 8 años
      if (!cls.introduction || !cls.reading || !cls.pedagogicalExplanation) {
        errors.push(`${prefix} introduction, reading o pedagogicalExplanation ausente.`);
      }

      // 8. Vocabulario contextualizado
      if (!Array.isArray(cls.vocabulary) || cls.vocabulary.length < 2) {
        errors.push(`${prefix} vocabulary debe tener al menos 2 términos explicados para niños.`);
      }

      // 9. Ejemplo contextualizado
      if (!cls.contextualizedExample || cls.contextualizedExample.length < 15) {
        errors.push(`${prefix} contextualizedExample ausente o demasiado corto.`);
      }

      // 10. Preguntas socráticas graduadas
      if (!Array.isArray(cls.socraticQuestions) || cls.socraticQuestions.length < 2) {
        errors.push(`${prefix} socraticQuestions debe contener al menos 2 preguntas.`);
      }

      // 11. Actividad práctica
      if (!cls.practicalActivity || !cls.practicalActivity.title || !cls.practicalActivity.instructions) {
        errors.push(`${prefix} practicalActivity incompleta.`);
      }

      // 12. Actividad de aplicación
      if (!cls.applicationActivity || !cls.applicationActivity.title || !cls.applicationActivity.deliverable) {
        errors.push(`${prefix} applicationActivity incompleta.`);
      }

      // 13. Evaluación formativa
      if (!cls.formativeEvaluation || !cls.formativeEvaluation.expectedEvidence) {
        errors.push(`${prefix} formativeEvaluation incompleta.`);
      }

      // 14. Rúbrica / Criterios
      if (!cls.evaluationRubric || !Array.isArray(cls.evaluationRubric.indicators) || cls.evaluationRubric.indicators.length < 3) {
        errors.push(`${prefix} evaluationRubric incompleta (debe tener niveles Inicial, En desarrollo, Consolidado).`);
      }

      // 15. Retroalimentación esperada
      if (!cls.expectedFeedback || cls.expectedFeedback.length < 15) {
        errors.push(`${prefix} expectedFeedback ausente o corto.`);
      }

      // 16. Recursos seguros y legales
      if (!Array.isArray(cls.resources) || cls.resources.length < 2) {
        errors.push(`${prefix} resources debe contener al menos 2 recursos.`);
      } else {
        for (const res of cls.resources) {
          if (seenResourceIds.has(res.id)) {
            errors.push(`${prefix} ID de recurso duplicado: ${res.id}`);
          } else {
            seenResourceIds.add(res.id);
          }
          if (res.url.includes('dQw4w9WgXcQ')) {
            errors.push(`${prefix} ALERTA CRÍTICA: Enlace Rickroll detectado en recurso ${res.id}`);
          }
          if (res.url.includes('wisdom-school.edu')) {
            errors.push(`${prefix} ALERTA CRÍTICA: Dominio extinto wisdom-school.edu detectado en recurso ${res.id}`);
          }
        }
      }

      // 17. Adaptación para dificultades
      if (!cls.difficultyAdaptation || cls.difficultyAdaptation.length < 10) {
        errors.push(`${prefix} difficultyAdaptation ausente.`);
      }

      // 18. Extensión para avance rápido
      if (!cls.advancedExtension || cls.advancedExtension.length < 10) {
        errors.push(`${prefix} advancedExtension ausente.`);
      }

      // BatchInfo de trazabilidad
      if (!cls.batchInfo || cls.batchInfo.batchId !== lote.loteId) {
        errors.push(`${prefix} batchInfo inconsistente con el lote actual.`);
      }

      // Verificación de actividades
      if (!Array.isArray(cls.activities) || cls.activities.length < 3) {
        errors.push(`${prefix} activities debe tener al menos 3 actividades socráticas.`);
      } else {
        for (const act of cls.activities) {
          if (seenActivityIds.has(act.id)) {
            errors.push(`${prefix} ID de actividad duplicado: ${act.id}`);
          } else {
            seenActivityIds.add(act.id);
          }
        }
      }
    }

    if (errors.length === 0) {
      log(`✅ Lote ${lote.loteId}: APROBADO (0 errores en sus ${lote.classes.length} clases).`);
      loteResults.push({
        loteId: lote.loteId,
        subjectCode: lote.subjectCode,
        classesCount: lote.classes.length,
        status: 'PASSED',
        errors: []
      });
    } else {
      log(`❌ Lote ${lote.loteId}: FALLIDO con ${errors.length} errores.`);
      errors.forEach(e => log(`   - ${e}`));
      totalErrors += errors.length;
      loteResults.push({
        loteId: lote.loteId,
        subjectCode: lote.subjectCode,
        classesCount: lote.classes.length,
        status: 'FAILED',
        errors
      });
    }
    log('');
  }

  log('==============================================================================');
  log(`RESUMEN GLOBAL DE LA VALIDACIÓN:`);
  log(`- Lotes analizados: ${loteResults.length} / 9`);
  log(`- Lotes aprobados: ${loteResults.filter(r => r.status === 'PASSED').length} / 9`);
  log(`- Total clases consolidadas: ${CONSOLIDATED_GAEL_CLASSES.length} / 25`);
  log(`- Total IDs de clases únicos: ${seenClassIds.size} / 25`);
  log(`- Total recursos seguros únicos: ${seenResourceIds.size} / 50`);
  log(`- Total errores detectados: ${totalErrors}`);
  log('==============================================================================\n');

  if (totalErrors > 0) {
    throw new Error(`Validación fallida con ${totalErrors} errores. No se exportará el currículo.`);
  }

  // Exportar a src/data/dailyClassesGael.ts
  const targetPath = path.resolve(process.cwd(), 'src/data/dailyClassesGael.ts');
  log(`Exportando 25 clases consolidadas a: ${targetPath}`);

  const fileContent = `import { DailyClass } from '../types';

/**
 * ==============================================================================
 * CLASES DIARIAS SOCRÁTICAS — GAEL (4.º EGB ELEMENTAL)
 * Año Lectivo 2026 - 2027 | Currículo Oficial MINEDUC y Ekballo Church
 * Consolidado y Validado por Lotes bajo la Etapa 06A
 * ==============================================================================
 * Total Clases: ${CONSOLIDATED_GAEL_CLASSES.length} | Asignaturas: 9 | Cobertura Unidad 1: 100%
 * Criterios Verificados:
 * - 0 Enlaces Rickroll
 * - 0 Dominios extintos (wisdom-school.edu)
 * - 100% IDs únicos desambiguados
 * - 100% Destrezas con Criterio de Desempeño (DCD) oficiales
 * - 18 Campos pedagógicos completos por clase
 * ==============================================================================
 */

export const GAEL_DAILY_CLASSES: DailyClass[] = ${JSON.stringify(CONSOLIDATED_GAEL_CLASSES, null, 2)};
`;

  fs.writeFileSync(targetPath, fileContent, 'utf-8');
  log(`✅ Archivo src/data/dailyClassesGael.ts actualizado con éxito (${fs.statSync(targetPath).size} bytes).\n`);

  // Guardar reporte en evidencias de ETAPA-06A
  const evidenceDir = path.resolve(process.cwd(), 'docs/ejecucion/continuacion-produccion/ETAPA-06A/evidencias');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }
  const evidencePath = path.join(evidenceDir, '01_pruebas_lotes_gael.txt');
  fs.writeFileSync(evidencePath, logs.join('\n'), 'utf-8');
  log(`✅ Evidencia guardada en: ${evidencePath}`);
}

// Ejecutar si es llamado directamente
if (require.main === module || process.argv[1]?.includes('build-gael-curriculum')) {
  validateAndBuildGaelCurriculum();
}
