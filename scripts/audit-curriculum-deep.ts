import { AVRIL_SUBJECTS, GAEL_SUBJECTS, AVRIL_SCHEDULE_SLOTS, GAEL_SCHEDULE_SLOTS, STUDENTS_DATA } from '../src/data/mockData';
import { AVRIL_DAILY_CLASSES } from '../src/data/dailyClassesAvril';
import { GAEL_DAILY_CLASSES } from '../src/data/dailyClassesGael';

interface ClassIssue {
  student: string;
  classId: string;
  issue: string;
  details: string;
}

const issues: ClassIssue[] = [];

// 1. Audit Daily Classes
const allClasses = [
  ...AVRIL_DAILY_CLASSES.map(c => ({ ...c, _student: 'avril' })),
  ...GAEL_DAILY_CLASSES.map(c => ({ ...c, _student: 'gael' })),
];

console.log(`Total Daily Classes: ${allClasses.length} (Avril: ${AVRIL_DAILY_CLASSES.length}, Gael: ${GAEL_DAILY_CLASSES.length})`);

// Duplicate class IDs
const classIdCounts: Record<string, number> = {};
const classIdObjects: Record<string, any[]> = {};
allClasses.forEach(c => {
  classIdCounts[c.id] = (classIdCounts[c.id] || 0) + 1;
  if (!classIdObjects[c.id]) classIdObjects[c.id] = [];
  classIdObjects[c.id].push(c);
});
Object.entries(classIdCounts).forEach(([id, count]) => {
  if (count > 1) {
    const list = classIdObjects[id];
    issues.push({
      student: 'shared/both',
      classId: id,
      issue: 'DUPLICATE_CLASS_ID',
      details: `ID appears ${count} times: ${list.map((c: any) => `${c._student}:${c.subjectId}:${c.theme}`).join(' | ')}`,
    });
  }
});

// Check content completeness
allClasses.forEach(c => {
  if (!c.objective || c.objective.trim() === '') {
    issues.push({ student: c._student, classId: c.id, issue: 'NO_OBJECTIVE', details: 'Class has no objective' });
  }
  if (!c.activities || c.activities.length === 0) {
    issues.push({ student: c._student, classId: c.id, issue: 'NO_ACTIVITIES', details: 'Class has 0 activities' });
  }
  if (!c.socraticQuestions || c.socraticQuestions.length === 0) {
    issues.push({ student: c._student, classId: c.id, issue: 'NO_SOCRATIC_QUESTIONS', details: 'Class has no socratic questions' });
  }
  if (!c.reading || c.reading.trim() === '') {
    issues.push({ student: c._student, classId: c.id, issue: 'NO_READING', details: 'Class has no reading text' });
  }
});

// Audit Resources in daily classes
interface ResourceRecord {
  student: string;
  classId: string;
  resourceId: string;
  type: string;
  title: string;
  url: string;
  decision: 'CONSERVAR' | 'REEMPLAZAR' | 'REGENERAR' | 'RETIRAR' | 'REVISIÓN HUMANA';
  reason: string;
}

const resources: ResourceRecord[] = [];
const resourceIdCounts: Record<string, number> = {};
const resourceIdObjects: Record<string, any[]> = {};

allClasses.forEach(c => {
  (c.resources || []).forEach(r => {
    resourceIdCounts[r.id] = (resourceIdCounts[r.id] || 0) + 1;
    if (!resourceIdObjects[r.id]) resourceIdObjects[r.id] = [];
    resourceIdObjects[r.id].push({ student: c._student, classId: c.id, title: r.title, url: r.url });

    let decision: 'CONSERVAR' | 'REEMPLAZAR' | 'REGENERAR' | 'RETIRAR' | 'REVISIÓN HUMANA' = 'REVISIÓN HUMANA';
    let reason = '';

    const url = r.url || '';

    if (url.includes('dQw4w9WgXcQ')) {
      decision = 'REEMPLAZAR';
      reason = 'Video placeholder Rickroll (dQw4w9WgXcQ); requiere reemplazo pedagógico urgente.';
    } else if (url.includes('wisdom-school.edu')) {
      decision = 'REGENERAR';
      reason = 'Dominio extinto de Wisdom School; la guía PDF debe ser regenerada y alojada en el repositorio interno ALSIZ.';
    } else if (url.includes('phet.colorado.edu')) {
      decision = 'CONSERVAR';
      reason = 'Simulación interactiva oficial PhET de la Universidad de Colorado (licencia CC-BY).';
    } else if (url.includes('geogebra.org')) {
      decision = 'CONSERVAR';
      reason = 'Simulación/laboratorio matemático interactivo GeoGebra verificado.';
    } else if (url.includes('quickdraw.withgoogle.com')) {
      decision = 'CONSERVAR';
      reason = 'Herramienta interactiva de IA de Google para educación artística.';
    } else if (url.includes('scratch.mit.edu')) {
      decision = 'CONSERVAR';
      reason = 'Plataforma oficial del MIT Scratch para programación por bloques.';
    } else if (url.startsWith('https://www.youtube.com') || url.startsWith('https://youtu.be')) {
      decision = 'REVISIÓN HUMANA';
      reason = 'Video de YouTube pedagógico; requiere verificación humana de vigencia de enlace y derechos de reproducción.';
    } else if (url.startsWith('http://') || url === '' || url === '#') {
      decision = 'RETIRAR';
      reason = 'Enlace vacío, inseguro o no válido.';
    } else {
      decision = 'REVISIÓN HUMANA';
      reason = 'Enlace externo que requiere verificación de disponibilidad y licencia.';
    }

    resources.push({
      student: c._student,
      classId: c.id,
      resourceId: r.id,
      type: r.type,
      title: r.title,
      url: r.url,
      decision,
      reason,
    });
  });
});

Object.entries(resourceIdCounts).forEach(([id, count]) => {
  if (count > 1) {
    const list = resourceIdObjects[id];
    issues.push({
      student: 'shared/both',
      classId: 'multiple',
      issue: 'DUPLICATE_RESOURCE_ID',
      details: `Resource ID ${id} appears ${count} times: ${list.map((r: any) => `${r.student}:${r.classId}:${r.title}`).join(' | ')}`,
    });
  }
});

console.log('\n=== AUDIT RESULTS SUMMARY ===');
console.log(`Issues detected: ${issues.length}`);
const issueByType: Record<string, number> = {};
issues.forEach(i => {
  issueByType[i.issue] = (issueByType[i.issue] || 0) + 1;
});
console.log('Issues by type:', issueByType);
console.log('\n=== ALL DETECTED ISSUES ===');
issues.forEach(i => {
  console.log(`[${i.issue}] (${i.student}) ${i.classId}: ${i.details}`);
});

console.log(`\nTotal Resources in daily classes: ${resources.length}`);
const decisionCounts: Record<string, number> = {};
resources.forEach(r => {
  decisionCounts[r.decision] = (decisionCounts[r.decision] || 0) + 1;
});
console.log('Decisions breakdown:', decisionCounts);

// Microcurriculum Analysis
console.log('\n=== MICROCURRICULUM ANALYSIS ===');
let totalMicro = 0;
let microWithoutObjective = 0;
let microWithoutResource = 0;
let microWithMineducCode = 0;

const examineMicro = (student: string, subjects: any[]) => {
  subjects.forEach(s => {
    (s.units || []).forEach((u: any) => {
      (u.microcurriculum || []).forEach((m: any) => {
        totalMicro++;
        if (!m.objective || m.objective.trim() === '') microWithoutObjective++;
        if (!m.verifiedResource || !m.verifiedResource.url) microWithoutResource++;
        // Check for official MINEDUC code pattern (e.g. LL.2., M.2., CN.2., CS.2., EFL.2., ECA.2., EF.2. or LL.4., M.4., etc.)
        const hasCode = /([A-Z]{1,3}\.\d+\.\d+(\.\d+)?)/i.test((m.objective || '') + ' ' + (m.theme || '') + ' ' + (u.title || ''));
        if (hasCode) microWithMineducCode++;
      });
    });
  });
};

examineMicro('avril', AVRIL_SUBJECTS);
examineMicro('gael', GAEL_SUBJECTS);

console.log(`Total microcurriculum items: ${totalMicro}`);
console.log(`Micro items without explicit objective: ${microWithoutObjective}`);
console.log(`Micro items without verifiedResource: ${microWithoutResource}`);
console.log(`Micro items with MINEDUC code: ${microWithMineducCode}`);
