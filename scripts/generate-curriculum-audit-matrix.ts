import fs from 'node:fs';
import path from 'node:path';
import { AVRIL_SUBJECTS, GAEL_SUBJECTS, AVRIL_SCHEDULE_SLOTS, GAEL_SCHEDULE_SLOTS } from '../src/data/mockData';
import { AVRIL_DAILY_CLASSES } from '../src/data/dailyClassesAvril';
import { GAEL_DAILY_CLASSES } from '../src/data/dailyClassesGael';
import { DailyClass, Subject, MicrocurriculumItem } from '../src/types';

interface MatrixRow {
  estudiante_grado: string;
  materia: string;
  codigo_materia: string;
  categoria_materia: 'TRONCAL_MINEDUC' | 'FORMACION_CRISTIANA' | 'COMPLEMENTARIA_SIGLO_XXI';
  trimestre: string;
  unidad: string;
  semana: string;
  fecha_o_posicion_temporal: string;
  objetivo_curricular: string;
  tipo_clase: 'CLASE_SOCRATICA_DIARIA' | 'MICROCURRICULO_SESION' | 'UNIDAD_MACRO_FALTANTE';
  recurso: string;
  decision_recurso: 'CONSERVAR' | 'REEMPLAZAR' | 'REGENERAR' | 'RETIRAR' | 'REVISIÓN HUMANA' | 'SIN_RECURSO';
  idioma: 'Español' | 'Inglés' | 'Bilingüe';
  estado: 'COMPLETA' | 'PARCIAL_SIN_DCD' | 'RECURSO_INVALIDO' | 'ID_DUPLICADO' | 'PENDIENTE_GENERACION';
  fuente_oficial: string;
  evidencia_pendiente: string;
}

const getCategory = (code: string): 'TRONCAL_MINEDUC' | 'FORMACION_CRISTIANA' | 'COMPLEMENTARIA_SIGLO_XXI' => {
  if (code.startsWith('REL-')) return 'FORMACION_CRISTIANA';
  if (code.startsWith('SOFT-') || code.startsWith('POL-') || code.startsWith('ADM-')) return 'COMPLEMENTARIA_SIGLO_XXI';
  return 'TRONCAL_MINEDUC';
};

const getLanguage = (code: string): 'Español' | 'Inglés' | 'Bilingüe' => {
  if (code.startsWith('ING-')) return 'Inglés';
  if (code.startsWith('SOFT-')) return 'Bilingüe';
  return 'Español';
};

const classifyResource = (url?: string, title?: string): { decision: MatrixRow['decision_recurso']; reason: string } => {
  const u = (url || '').trim();
  if (!u || u === '#' || u.startsWith('http://')) {
    return { decision: 'RETIRAR', reason: 'URL vacía, anclaje (#) o protocolo inseguro (http://)' };
  }
  if (u.includes('dQw4w9WgXcQ')) {
    return { decision: 'REEMPLAZAR', reason: 'Video placeholder (Rickroll dQw4w9WgXcQ)' };
  }
  if (u.includes('wisdom-school.edu') || u.includes('wisdomschool.ec')) {
    return { decision: 'REGENERAR', reason: 'Dominio extinto / legado Wisdom School; requiere re-alojamiento o regeneración' };
  }
  if (u.includes('phet.colorado.edu') || u.includes('geogebra.org') || u.includes('scratch.mit.edu') || u.includes('quickdraw.withgoogle.com')) {
    return { decision: 'CONSERVAR', reason: 'Simulador / laboratorio interactivo oficial validado' };
  }
  if (u.startsWith('https://www.youtube.com') || u.startsWith('https://youtu.be')) {
    return { decision: 'REVISIÓN HUMANA', reason: 'Video educativo en YouTube; verificar disponibilidad y derechos' };
  }
  return { decision: 'REVISIÓN HUMANA', reason: 'Recurso externo web; verificar vigencia y licencia' };
};

const mapMineducSource = (student: string, subjectCode: string, theme: string): string => {
  // Mapping reference codes for MINEDUC Curriculum (EGB Elemental: Subnivel 2; EGB Superior: Subnivel 4)
  if (student === 'gael') {
    if (subjectCode === 'LEN-401') return 'MINEDUC Currículo EGB Elemental — Área Lengua y Literatura (DCD LL.2.*.*)';
    if (subjectCode === 'MAT-401') return 'MINEDUC Currículo EGB Elemental — Área Matemática (DCD M.2.*.* / Método CPA)';
    if (subjectCode === 'CNI-401') return 'MINEDUC Currículo EGB Elemental — Área Ciencias Naturales (DCD CN.2.*.*)';
    if (subjectCode === 'SOC-401') return 'MINEDUC Currículo EGB Elemental — Área Ciencias Sociales (DCD CS.2.*.*)';
    if (subjectCode === 'ING-401') return 'MINEDUC Currículo EGB Elemental — EFL Pre-A1 / MCER A1.1 (DCD EFL.2.*.*)';
    if (subjectCode === 'ART-401') return 'MINEDUC Currículo EGB Elemental — Área ECA (DCD ECA.2.*.*)';
    if (subjectCode === 'EFI-401') return 'MINEDUC Currículo EGB Elemental — Área Educación Física (DCD EF.2.*.*)';
    if (subjectCode === 'REL-401') return 'Ekballo Church — Módulo Doctrinal Semillitas de Fe (Marco Eclesial Autónomo)';
    if (subjectCode === 'SOFT-401') return 'Marco STEM Siglo XXI — Pensamiento Computacional Infantil / CSTA 1A';
  } else {
    if (subjectCode === 'LEN-801') return 'MINEDUC Currículo EGB Superior — Área Lengua y Literatura (DCD LL.4.*.*)';
    if (subjectCode === 'MAT-801') return 'MINEDUC Currículo EGB Superior — Área Matemática (DCD M.4.*.* / Virginia SOL Math 8)';
    if (subjectCode === 'CNI-801') return 'MINEDUC Currículo EGB Superior — Área Ciencias Naturales (DCD CN.4.*.* / NGSS MS-LS)';
    if (subjectCode === 'SOC-801') return 'MINEDUC Currículo EGB Superior — Área Ciencias Sociales (DCD CS.4.*.* / Historia Ecuador)';
    if (subjectCode === 'ING-801') return 'MINEDUC Currículo EGB Superior — EFL A2/B1 MCER (DCD EFL.4.*.* / Cambridge PET)';
    if (subjectCode === 'ART-801') return 'MINEDUC Currículo EGB Superior — Área ECA (DCD ECA.4.*.*)';
    if (subjectCode === 'EFI-801') return 'MINEDUC Currículo EGB Superior — Área Educación Física (DCD EF.4.*.*)';
    if (subjectCode === 'REL-801') return 'Ekballo Church — 7 Módulos Doctrinales Fundacionales (Marco Eclesial Autónomo)';
    if (subjectCode === 'SOFT-801') return 'Marco STEM Siglo XXI — CSTA 2 (Algoritmos, Scratch y Python)';
    if (subjectCode === 'POL-801') return 'Marco Cívico Siglo XXI — Teoría del Estado y Derechos Fundamentales';
    if (subjectCode === 'ADM-801') return 'Marco Emprendimiento Siglo XXI — Lean Startup y Modelo Canvas';
  }
  return 'PENDIENTE_MAPEO_DCD';
};

export function generateCurriculumMatrix(): MatrixRow[] {
  const rows: MatrixRow[] = [];

  // Track duplicate class IDs
  const allDailyClasses = [
    ...AVRIL_DAILY_CLASSES.map(c => ({ ...c, _student: 'avril', _grade: 'Avril (8.º EGB Superior)' })),
    ...GAEL_DAILY_CLASSES.map(c => ({ ...c, _student: 'gael', _grade: 'Gael (4.º EGB Elemental)' })),
  ];

  const classIdCounts: Record<string, number> = {};
  allDailyClasses.forEach(c => {
    classIdCounts[c.id] = (classIdCounts[c.id] || 0) + 1;
  });

  // 1. Process Daily Classes (43 sessions)
  allDailyClasses.forEach(c => {
    const isDup = classIdCounts[c.id] > 1;
    const resources = c.resources || [];
    const resourceSummary = resources.map(r => `${r.title} (${r.url})`).join(' | ');

    let mainDecision: MatrixRow['decision_recurso'] = 'CONSERVAR';
    let hasRickroll = false;
    let hasWisdomPdf = false;

    resources.forEach(r => {
      const { decision } = classifyResource(r.url, r.title);
      if (decision === 'REEMPLAZAR') {
        hasRickroll = true;
        mainDecision = 'REEMPLAZAR';
      } else if (decision === 'REGENERAR' && mainDecision !== 'REEMPLAZAR') {
        hasWisdomPdf = true;
        mainDecision = 'REGENERAR';
      }
    });

    let estado: MatrixRow['estado'] = 'COMPLETA';
    let evidencia = 'Clase diaria socrática estructurada con introducción, lectura, 3 preguntas y 3 actividades.';

    if (isDup) {
      estado = 'ID_DUPLICADO';
      evidencia += ' ALERTA: ID de clase duplicado en el repositorio legado; requiere desambiguación de clave primaria.';
    } else if (hasRickroll) {
      estado = 'RECURSO_INVALIDO';
      evidencia += ' ALERTA: Contiene video placeholder (Rickroll); requiere sustitución por material pedagógico verificado.';
    } else if (hasWisdomPdf) {
      estado = 'PARCIAL_SIN_DCD';
      evidencia += ' ALERTA: Guía didáctica PDF apunta a dominio extinto Wisdom School; requiere re-alojamiento.';
    }

    const code = c._student === 'avril'
      ? (AVRIL_SUBJECTS.find(s => s.id === c.subjectId)?.code || c.subjectId.toUpperCase())
      : (GAEL_SUBJECTS.find(s => s.id === c.subjectId)?.code || c.subjectId.toUpperCase());

    const subjectName = c._student === 'avril'
      ? (AVRIL_SUBJECTS.find(s => s.id === c.subjectId)?.name || c.subjectId)
      : (GAEL_SUBJECTS.find(s => s.id === c.subjectId)?.name || c.subjectId);

    rows.push({
      estudiante_grado: c._grade,
      materia: subjectName,
      codigo_materia: code,
      categoria_materia: getCategory(code),
      trimestre: '1',
      unidad: c.unit,
      semana: 'Semana 1',
      fecha_o_posicion_temporal: c.date,
      objetivo_curricular: c.objective,
      tipo_clase: 'CLASE_SOCRATICA_DIARIA',
      recurso: resourceSummary,
      decision_recurso: mainDecision,
      idioma: getLanguage(code),
      estado,
      fuente_oficial: mapMineducSource(c._student, code, c.theme),
      evidencia_pendiente: evidencia,
    });
  });

  // 2. Process Microcurriculum Items (492 sessions)
  const processSubjectUnits = (student: string, gradeLong: string, subjects: Subject[]) => {
    subjects.forEach(s => {
      (s.units || []).forEach(u => {
        (u.microcurriculum || []).forEach((m, mIdx) => {
          const res = m.verifiedResource;
          const { decision, reason } = classifyResource(res?.url, res?.title || m.theme);

          let estado: MatrixRow['estado'] = 'PARCIAL_SIN_DCD';
          let evidencia = `Sesión de microcurrículo definida (Tema: ${m.theme}). `;

          if (decision === 'REGENERAR') {
            estado = 'RECURSO_INVALIDO';
            evidencia += `Recurso vinculado a dominio extinto (${res?.url}). Requiere regeneración / curaduría. `;
          } else if (decision === 'RETIRAR') {
            estado = 'RECURSO_INVALIDO';
            evidencia += `Recurso con anclaje o URL inválida (${res?.url}). Requiere enlace válido. `;
          } else {
            evidencia += 'Recurso verificado. Pendiente redacción de clase socrática completa y actividades interactivas.';
          }

          rows.push({
            estudiante_grado: gradeLong,
            materia: s.name,
            codigo_materia: s.code,
            categoria_materia: getCategory(s.code),
            trimestre: String(u.unitNumber),
            unidad: u.title,
            semana: m.monthWeek || `Semana ${mIdx + 1}`,
            fecha_o_posicion_temporal: m.teachingDay || `Día ${m.dayNumber}`,
            objetivo_curricular: m.objective || `Comprender "${m.theme}" mediante preguntas socráticas y una actividad vivencial.`,
            tipo_clase: 'MICROCURRICULO_SESION',
            recurso: res ? `${res.title || m.theme} [${res.platform || 'Web'}] (${res.url})` : 'Sin recurso asignado',
            decision_recurso: decision,
            idioma: getLanguage(s.code),
            estado,
            fuente_oficial: mapMineducSource(student, s.code, m.theme),
            evidencia_pendiente: evidencia,
          });
        });
      });
    });
  };

  processSubjectUnits('avril', 'Avril (8.º EGB Superior)', AVRIL_SUBJECTS);
  processSubjectUnits('gael', 'Gael (4.º EGB Elemental)', GAEL_SUBJECTS);

  // 3. Process Missing Units in Gael (4.° EGB has 18 missing units!)
  GAEL_SUBJECTS.forEach(s => {
    const existingUnitNumbers = (s.units || []).map(u => u.unitNumber);
    [1, 2, 3].forEach(tNum => {
      if (!existingUnitNumbers.includes(tNum)) {
        rows.push({
          estudiante_grado: 'Gael (4.º EGB Elemental)',
          materia: s.name,
          codigo_materia: s.code,
          categoria_materia: getCategory(s.code),
          trimestre: String(tNum),
          unidad: `Unidad Trimestre ${tNum} (Pendiente de Autoría)`,
          semana: `Trimestre ${tNum} Completo (Semanas ${tNum === 1 ? '1-12' : tNum === 2 ? '13-26' : '27-40'})`,
          fecha_o_posicion_temporal: `Trimestre ${tNum} (Proyección Anual)`,
          objetivo_curricular: `Desarrollar las destrezas con criterio de desempeño de ${s.name} correspondientes al Trimestre ${tNum} de 4.° EGB.`,
          tipo_clase: 'UNIDAD_MACRO_FALTANTE',
          recurso: 'Pendiente de curaduría de recursos didácticos',
          decision_recurso: 'SIN_RECURSO',
          idioma: getLanguage(s.code),
          estado: 'PENDIENTE_GENERACION',
          fuente_oficial: mapMineducSource('gael', s.code, ''),
          evidencia_pendiente: `Unidad macrocurricular no definida en el repositorio legado. Se requiere diseñar temario de ~30 a 35 sesiones para este trimestre.`,
        });
      }
    });
  });

  return rows;
}

// Execution and file export
const matrix = generateCurriculumMatrix();
console.log(`Generated matrix rows: ${matrix.length}`);

// Generate CSV
const csvHeader = [
  'estudiante_grado',
  'materia',
  'codigo_materia',
  'categoria_materia',
  'trimestre',
  'unidad',
  'semana',
  'fecha_o_posicion_temporal',
  'objetivo_curricular',
  'tipo_clase',
  'recurso',
  'decision_recurso',
  'idioma',
  'estado',
  'fuente_oficial',
  'evidencia_pendiente',
].join(',');

const escapeCsv = (str: string) => `"${(str || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;

const csvRows = matrix.map(r => [
  escapeCsv(r.estudiante_grado),
  escapeCsv(r.materia),
  escapeCsv(r.codigo_materia),
  escapeCsv(r.categoria_materia),
  escapeCsv(r.trimestre),
  escapeCsv(r.unidad),
  escapeCsv(r.semana),
  escapeCsv(r.fecha_o_posicion_temporal),
  escapeCsv(r.objetivo_curricular),
  escapeCsv(r.tipo_clase),
  escapeCsv(r.recurso),
  escapeCsv(r.decision_recurso),
  escapeCsv(r.idioma),
  escapeCsv(r.estado),
  escapeCsv(r.fuente_oficial),
  escapeCsv(r.evidencia_pendiente),
].join(','));

const csvContent = [csvHeader, ...csvRows].join('\n');
const csvPath = path.resolve(process.cwd(), 'docs', 'curriculum', 'matriz_seguimiento_curriculo_2026_2027.csv');
fs.writeFileSync(csvPath, csvContent, 'utf-8');
console.log(`Saved CSV to: ${csvPath}`);
