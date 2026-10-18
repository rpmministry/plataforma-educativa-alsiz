// ⚠️ OBSOLETO (2026) — formato ANTIGUO de "Guía Consolidada" (encabezado "Guía Didáctica y Taller Práctico DE CLASE").
// Reemplazado por:
//   · src/utils/guideGenerator.ts → generateClassGuideHTML()   → guía individual "Guía Didáctica y Taller Práctico" (v3.0)
//   · src/utils/guideGenerator.ts → downloadDailyGuidesBundle() → paquete diario (portada + una página por asignatura)
// Se conserva solo como referencia histórica; NO tiene llamadores en la aplicación.
import { DailyClass, Subject, Student } from '../types';
import {
  obtenerContextoTema,
  arreglarUrlRecurso,
  LAB_RESOURCES
} from '../data/pedagogicalContent';

interface ConsolidatedGuideOptions {
  student: Student;
  dayClasses: DailyClass[];
  daySubjects: Subject[];
  selectedDay: string;
  dateStr: string;
}

function getThemeVars(student?: Student) {
  const accent = student?.colorTheme?.accent || '#E0A82E';
  return {
    accent,
    accentLight: '#fbbf24',
    accentDark: '#b45309',
    bgGrad: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)',
    cardBg: '#fafafa',
    cardBorder: '#e4e4e7',
    cardTitle: '#18181b',
    sectionBg: '#f4f4f5',
    sectionBorder: '#d4d4d8',
    badgeBg: '#e4e4e7',
    quoteBg: '#fafafa',
    quoteBorder: '#e4e4e7',
    worldEmoji: '🎓',
    worldName: 'WISDOM ACADEMY',
    methodLabel: 'Metodología Socrática & Rigor Académico',
  };
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function buildDayOverviewTable(dayClasses: DailyClass[], student: Student) {
  const rows = dayClasses.map((c, i) => {
    const subj = c.subjectId.split('-')[0].toUpperCase();
    return `
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:8px 10px;text-align:center;font-weight:bold;color:${i === 0 ? '#fff' : '#334155'};background:${i === 0 ? '#6366f1' : '#f8fafc'};border-radius:${i === 0 ? '8px 8px 0 0' : '0'};">${i + 1}</td>
        <td style="padding:8px 10px;font-weight:600;color:#1e293b;">${escapeHtml(c.theme)}</td>
        <td style="padding:8px 10px;color:#64748b;font-size:11px;">${escapeHtml(c.scheduleTime || '—')}</td>
        <td style="padding:8px 10px;"><span style="background:#dbeafe;color:#1e40af;font-size:9px;padding:2px 7px;border-radius:10px;font-weight:bold;">${escapeHtml(subj)}</span></td>
      </tr>`;
  }).join('');
  return `<table style="width:100%;border-collapse:collapse;font-size:12px;margin-top:8px;">${rows}</table>`;
}

function buildPedagogicalRoute() {
  return `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px;">
      <div style="border:1px solid #cbd5e1;border-radius:8px;padding:10px;background:#f8fafc;">
        <div style="font-weight:bold;font-size:11px;color:#1e3a8a;">🔍 1. Observación Concreta (Charlotte Mason)</div>
        <div style="font-size:10px;color:#475569;margin-top:3px;">Observa la idea en la vida real. Relaciónala con tu entorno cotidiano y lecturas vivas.</div>
      </div>
      <div style="border:1px solid #cbd5e1;border-radius:8px;padding:10px;background:#f8fafc;">
        <div style="font-weight:bold;font-size:11px;color:#1e3a8a;">✋ 2. Descubrimiento Táctil (Montessori)</div>
        <div style="font-size:10px;color:#475569;margin-top:3px;">Manipula objetos, dibuja esquemas en tu cuaderno o prueba los simuladores.</div>
      </div>
      <div style="border:1px solid #cbd5e1;border-radius:8px;padding:10px;background:#f8fafc;">
        <div style="font-weight:bold;font-size:11px;color:#1e3a8a;">🗣️ 3. Círculo de Narración</div>
        <div style="font-size:10px;color:#475569;margin-top:3px;">Expresa con tus propias palabras lo que aprendiste ante un familiar o el Profesor IA.</div>
      </div>
      <div style="border:1px solid #cbd5e1;border-radius:8px;padding:10px;background:#f8fafc;">
        <div style="font-weight:bold;font-size:11px;color:#1e3a8a;">🎯 4. Misión Práctica y Evidencia</div>
        <div style="font-size:10px;color:#475569;margin-top:3px;">Desarrolla las actividades en tu libreta para consolidar tu maestría.</div>
      </div>
    </div>`;
}

function buildStageContent(stage: any, theme: string) {
  const typeLabel = stage.type === 'concept' ? 'Descubrimiento' : stage.type === 'deepen' ? 'Profundización Socrática' : stage.type === 'apply' ? 'Laboratorio y Aplicación' : 'Creación y Transferencia';
  const typeColor = stage.type === 'concept' ? '#3b82f6' : stage.type === 'deepen' ? '#8b5cf6' : stage.type === 'apply' ? '#059669' : '#d97706';
  return `
    <div style="border-left:3px solid ${typeColor};padding:10px 14px;margin-bottom:12px;background:#f8fafc;border-radius:0 8px 8px 0;">
      <div style="font-weight:bold;font-size:12px;color:${typeColor};margin-bottom:4px;">${stage.order}. ${stage.title}</div>
      <div style="font-size:11px;color:#475569;margin-bottom:6px;"><strong>Explicación:</strong> ${escapeHtml(stage.coreConcept?.detailedExplanation || stage.coreConcept?.summary || '—')}</div>
      ${stage.coreConcept?.visualAnalogy ? `<div style="font-size:10px;color:#94a3b8;font-style:italic;margin-bottom:6px;">💡 Analogía: ${escapeHtml(stage.coreConcept.visualAnalogy)}</div>` : ''}
      ${(stage.coreConcept?.keyTakeaways?.length > 0) ? `
        <div style="font-size:10px;color:#64748b;margin-bottom:4px;"><strong>Ideas clave:</strong></div>
        <ul style="margin:0 0 6px 16px;font-size:10px;color:#475569;">
          ${stage.coreConcept.keyTakeaways.map((k: string) => `<li>${escapeHtml(k)}</li>`).join('')}
        </ul>` : ''}
      <div style="font-size:11px;font-weight:600;color:#1e293b;">❓ Pregunta guía: "${escapeHtml(stage.guidingQuestion)}"</div>
      ${(stage.socraticHints?.length > 0) ? `<div style="font-size:10px;color:#6366f1;"><em>Sugerencias: ${stage.socraticHints.map((h: string) => escapeHtml(h)).join(' | ')}</em></div>` : ''}
      <div style="font-size:10px;color:#94a3b8;margin-top:3px;">⏱ Estimado: ${stage.estimatedMinutes || '?'} min | ${escapeHtml(stage.advanceSignal || '')}</div>
    </div>`;
}

function buildClassChapter(cls: DailyClass, subject?: Subject, student?: Student) {
  const vars = getThemeVars(student);
  const worldBanner = `
    <div style="background:linear-gradient(135deg,#f8fafc,#f1f5f9);border:1px solid #cbd5e1;border-radius:10px;padding:10px 14px;margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span style="font-weight:bold;color:#0f172a;font-size:12px;">🎓 ${vars.worldName} · GUÍA DIDÁCTICA</span>
        <span style="font-size:9px;background:#e2e8f0;color:#334155;padding:2px 7px;border-radius:10px;font-weight:bold;border:1px solid #cbd5e1;">${vars.methodLabel}</span>
      </div>
      <p style="font-size:10px;color:#475569;margin:4px 0 0 0;font-style:italic;">"El conocimiento riguroso florece cuando el estudiante reflexiona, formula preguntas y aplica con sentido práctico cada concepto."</p>
    </div>`;

  const activitiesHtml = (cls.activities || []).map((act: any, idx: number) => `
    <div style="border:1px solid #e2e8f0;border-radius:8px;padding:10px;margin-bottom:8px;background:#fff;">
      <div style="display:flex;justify-content:space-between;align-items:center;font-weight:bold;font-size:11px;color:#0f172a;margin-bottom:4px;">
        <span>☐ Actividad ${idx + 1}: ${escapeHtml(act.title)}</span>
        <span style="background:#dbeafe;color:#1e40af;font-size:9px;padding:2px 7px;border-radius:10px;font-weight:bold;">+${act.points || 0} pts</span>
      </div>
      <p style="font-size:10px;color:#334155;margin-bottom:6px;">${escapeHtml(act.description)}</p>
      <div style="border:1px dashed #cbd5e1;height:36px;background:#fafafa;border-radius:4px;padding:4px;font-size:9px;color:#94a3b8;">
        [Espacio para resolución, fórmulas, esquemas o redacción del estudiante]
      </div>
    </div>`).join('');

  const temaContexto = obtenerContextoTema(cls.theme);
  const observado = temaContexto ? `<div style="background:#eef7ff;border:1px solid #93c5fc;border-radius:8px;padding:10px 14px;margin-bottom:10px;font-size:11px;color:#1e3a8a;font-weight:bold;">${temaContexto.observacion}</div>` : '';
  const explicacionContexto = temaContexto ? `<div style="font-size:10px;color:#475569;margin-top:4px;margin-bottom:8px;">${temaContexto.explicacion}</div>` : '';
  const instruccionContexto = temaContexto ? `<div style="font-size:10px;color:#6366f1;margin-top:4px;font-style:italic;">${temaContexto.instruccion}</div>` : '';
  const simuladorInfo = temaContexto?.simuladorUrl ? ` <a href="${temaContexto.simuladorUrl}" target="_blank" style="color:#6366f1;text-decoration:none;font-size:10px;">🔗 ${temaContexto.simuladorNombre || 'Laboratorio'}</a>` : '';
  const labNote = !temaContexto?.simuladorUrl && !cls.simulatorUrl ? '<div style="font-size:10px;color:#94a3b8;">Disponible en la plataforma.</div>' : '';

  const contextoTemaHtml = temaContexto ? `
    <div style="background:#eef7ff;border:1px solid #93c5fd;border-radius:8px;padding:12px 14px;margin-bottom:12px;font-size:11px;color:#1e3a8a;">
      <strong>📖 Contexto del Tema / Observa y Analiza:</strong> ${temaContexto.observacion}
      <div style="margin-top:6px;color:#475569;">${temaContexto.explicacion}</div>
      ${temaContexto.instruccion ? `<div style="margin-top:4px;color:#6366f1;font-style:italic;">${temaContexto.instruccion}</div>` : ''}
      ${temaContexto.simuladorUrl ? `<div style="margin-top:6px;"><a href="${temaContexto.simuladorUrl}" target="_blank" style="color:#6366f1;text-decoration:none;font-size:10px;">🔗 ${temaContexto.simuladorNombre || 'Laboratorio'}</a></div>` : ''}
    </div>
  ` : '';

  const socraticHtml = (cls.socraticQuestions && cls.socraticQuestions.length > 0)
    ? cls.socraticQuestions.map((q: string, idx: number) => `
      <div style="background:#eef2ff;border-left:3px solid #6366f1;padding:8px 12px;border-radius:0 6px 6px 0;font-size:11px;margin-bottom:8px;">
        <strong>Pregunta de Reflexión #${idx + 1}:</strong> "${escapeHtml(q)}"
        <div style="border-bottom:1px solid #cbd5e1;height:20px;margin-top:4px;"></div>
      </div>
    `).join('')
    : `<div style="background:#eef2ff;border-left:3px solid #6366f1;padding:8px 12px;border-radius:0 6px 6px 0;font-size:11px;"><strong>Pregunta de Reflexión:</strong> "${escapeHtml(cls.reflectionPrompt || '¿Cómo aplicas este concepto en tu vida cotidiana?')}"<div style="border-bottom:1px solid #cbd5e1;height:20px;margin-top:4px;"></div></div>`;

  const correctedResources = (cls.resources || []).map(r => {
    const corrected = arreglarUrlRecurso(r.url, cls.theme);
    return { ...r, url: corrected.url, description: corrected.sitio || r.description };
  });

  const labSectionHtml = correctedResources.length > 0 || cls.simulatorUrl ? `
    <div style="font-size:13px;font-weight:bold;color:#1e3a8a;background:#e0e7ff;padding:6px 12px;border-left:4px solid #3b82f6;border-radius:0 6px 6px 0;text-transform:uppercase;margin-top:14px;margin-bottom:10px;">VI. LABORATORIO DIGITAL INTERACTIVO</div>
    <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:11px;color:#475569;">
      ${correctedResources.map(r => `
        <div style="margin-bottom:8px;display:flex;align-items:center;gap:6px;">
          <span style="font-weight:bold;">${r.title}:</span>
          ${r.url ? `<a href="${r.url}" target="_blank" style="color:#6366f1;text-decoration:none;">${r.description || 'Acceder'}</a>` : `<span style="font-size:10px;color:#94a3b8;">${r.description || 'No disponible'}</span>`}
        </div>
      `).join('')}
      ${labNote}
    </div>
  ` : '';

  const breaksHtml = (cls.timeBreakdown || []).map((tb: any) => `
    <tr style="border-bottom:1px solid #e2e8f0;">
      <td style="padding:5px 8px;font-size:10px;"><strong>${escapeHtml(tb.phase)}</strong></td>
      <td style="padding:5px 8px;font-size:10px;text-align:center;">${tb.minutes} min</td>
      <td style="padding:5px 8px;font-size:10px;">${escapeHtml(tb.description)}</td>
    </tr>`).join('');

  return `
    <div style="page-break-before:always;padding:20px;">
      ${worldBanner}
<div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:12px 16px;margin-bottom:12px;font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:6px;">
      <div><strong>Estudiante:</strong> ${escapeHtml(student?.name || 'Estudiante')}</div>
      <div><strong>Nivel:</strong> ${escapeHtml(student?.gradeLong || student?.grade || 'EGB')}</div>
      <div><strong>Materia:</strong> ${escapeHtml(subject?.name || 'Materia')}</div>
      <div><strong>Docente:</strong> ${escapeHtml(subject?.teacher?.name || 'Docente Asignado')}</div>
      <div><strong>Unidad:</strong> ${escapeHtml(cls.unit)}</div>
      <div><strong>Horario:</strong> ${escapeHtml(cls.scheduleTime || 'Sesión')}</div>
    </div>
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 14px;font-size:11px;color:#166534;margin-bottom:14px;">
      <strong>🎯 OBJETIVO:</strong> ${escapeHtml(cls.objective)}
    </div>
    <div style="background:#e0f2fe;border:1px solid #bae6fd;border-radius:8px;padding:12px 16px;font-size:11px;color:#0c4a6e;margin-bottom:14px;">
    <strong>🚀 RESULTADOS DE LA CLASE:</strong>
  </div>
  <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:12px 16px;margin-bottom:12px;font-size:11px;display:grid;grid-template-columns:1fr;gap:6px;">
    <div class="info-item"><span class="info-label">Ideas Clave:</span> 
      ${(cls.learningPath?.[0]?.coreConcept?.keyTakeaways || []).map((takeaway: string) => escapeHtml(takeaway)).join('; ')}
    </div>
  </div>
  <div style="background:#fffbeb;border:1px solid #fef3c7;border-left:4px solid #f59e0b;padding:12px;border-radius:6px;font-size:11px;color:#78350f;margin-bottom:14px;">
    <strong>📌 Criterios de Evaluación:</strong> ${ 
      (cls.evidenceCriteria || [])
        .map((ec: any) => `${escapeHtml(ec.criterion)} (${escapeHtml(ec.indicator)})`)
        .join('; ')
    }
  </div>
  ${buildPedagogicalRoute()}
  ${contextoTemaHtml}
  ${labSectionHtml}
      <div style="font-size:13px;font-weight:bold;color:#1e3a8a;background:#e0e7ff;padding:6px 12px;border-left:4px solid #3b82f6;border-radius:0 6px 6px 0;text-transform:uppercase;margin-top:14px;margin-bottom:10px;">I. INTRODUCCIÓN Y PASO A PASO EXPLICATIVO</div>
      <div style="font-size:11px;margin-bottom:12px;text-align:justify;line-height:1.6;">${escapeHtml(cls.introduction || 'Bienvenido a esta lección.')}</div>
      ${breaksHtml ? `<table style="width:100%;border-collapse:collapse;margin-bottom:14px;font-size:10px;"><thead><tr style="background:#1e293b;color:#fff;"><th style="padding:5px 8px;text-align:left;width:25%;">Momento</th><th style="padding:5px 8px;text-align:left;width:15%;">Tiempo</th><th style="padding:5px 8px;text-align:left;">Descripción</th></tr></thead><tbody>${breaksHtml}</tbody></table>` : ''}
      <div style="font-size:13px;font-weight:bold;color:#1e3a8a;background:#e0e7ff;padding:6px 12px;border-left:4px solid #3b82f6;border-radius:0 6px 6px 0;text-transform:uppercase;margin-top:14px;margin-bottom:10px;">II. DESARROLLO CONCEPTUAL — RUTA DE APRENDIZAJE</div>
      ${(cls.learningPath || []).map((stage: any) => buildStageContent(stage, cls.theme)).join('')}
      <div style="font-size:13px;font-weight:bold;color:#1e3a8a;background:#e0e7ff;padding:6px 12px;border-left:4px solid #3b82f6;border-radius:0 6px 6px 0;text-transform:uppercase;margin-top:14px;margin-bottom:10px;">III. PREGUNTAS SOCRÁTICAS Y RAZONAMIENTO CRÍTICO</div>
      <p style="font-size:10px;color:#475569;margin-bottom:8px;">Responde en tu cuaderno argumentando tu respuesta con base en el contexto teórico presentado arriba:</p>
      ${socraticHtml || `<div style="background:#eef2ff;border-left:3px solid #6366f1;padding:8px 12px;border-radius:0 6px 6px 0;font-size:11px;"><strong>Pregunta de Reflexión:</strong> "${escapeHtml(cls.reflectionPrompt || '¿Cómo aplicas este concepto en tu vida cotidiana?')}"<div style="border-bottom:1px solid #cbd5e1;height:20px;margin-top:4px;"></div></div>`}
      <div style="font-size:13px;font-weight:bold;color:#1e3a8a;background:#e0e7ff;padding:6px 12px;border-left:4px solid #3b82f6;border-radius:0 6px 6px 0;text-transform:uppercase;margin-top:14px;margin-bottom:10px;">IV. TALLER DE ACTIVIDADES Y RETOS PRÁCTICOS</div>
      ${activitiesHtml || '<div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px;background:#fff;"><p style="font-size:11px;color:#334155;">Desarrolla en tu cuaderno la guía de ejercicios prácticos asignada.</p></div>'}
      <div style="font-size:13px;font-weight:bold;color:#1e3a8a;background:#e0e7ff;padding:6px 12px;border-left:4px solid #3b82f6;border-radius:0 6px 6px 0;text-transform:uppercase;margin-top:14px;margin-bottom:10px;">V. TAREA DEL DÍA Y EVIDENCIA PARA EVALUACIÓN</div>
      <div style="background:#fffbeb;border:1px solid #fef3c7;border-left:4px solid #f59e0b;padding:12px;border-radius:6px;font-size:11px;color:#78350f;margin-bottom:14px;">
        <strong>📌 CONSIGNA:</strong> ${escapeHtml(cls.homeworkTask || 'Completa los ejercicios de tu libreta y sube evidencia a la plataforma.')}
      </div>
      <div style="text-align:center;font-size:10px;color:#94a3b8;margin-top:20px;border-top:1px solid #e2e8f0;padding-top:10px;">
        Capítulo: ${escapeHtml(subject?.name || cls.theme)} — ${escapeHtml(cls.theme)} — ${escapeHtml(cls.scheduleTime || '')}
      </div>
    </div>`;
}



export function generateConsolidatedDailyGuideHTML(opts: ConsolidatedGuideOptions): string {
  const { student, dayClasses, daySubjects, selectedDay, dateStr } = opts;
  const tv = getThemeVars(student);
  const sorted = [...dayClasses].sort((a, b) => (a.scheduleTime?.slice(0, 5) || '00:00').localeCompare(b.scheduleTime?.slice(0, 5) || '00:00'));

  const chaptersHtml = sorted.map((cls) => {
    const subj = daySubjects.find((s) => s.id === cls.subjectId);
    return buildClassChapter(cls, subj, student);
  }).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GUÍA DIDÁCTICA Y TALLER PRÁCTICO — ${escapeHtml(student.name)} — ${selectedDay} ${dateStr}</title>
<style>
  @page { size: letter; margin: 1.5cm; }
  body { font-family: 'Segoe UI', Arial, Helvetica, sans-serif; color: #1e293b; background: #fff; line-height: 1.6; margin: 0; padding: 0; }
  .cover { background: ${tv.bgGrad}; color: #fff; padding: 40px 30px; text-align: center; page-break-after: always; }
  .cover h1 { font-size: 22px; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 1px; }
  .cover h2 { font-size: 14px; font-weight: 400; margin: 0 0 20px; opacity: .9; }
  .cover .student-info { background: rgba(255,255,255,.15); border-radius: 12px; padding: 16px; display: inline-block; text-align: left; font-size: 12px; line-height: 1.8; }
  .cover .student-info strong { display: inline-block; width: 130px; }
  .cover .quote { margin-top: 24px; font-style: italic; font-size: 12px; opacity: .85; }
  .section-title { font-size: 13px; font-weight: bold; color: #1e3a8a; background: #e0e7ff; padding: 6px 12px; border-left: 4px solid #3b82f6; border-radius: 0 6px 6px 0; margin-top: 16px; margin-bottom: 10px; text-transform: uppercase; }
  .orientation-card { border: 2px solid ${tv.accent}; border-radius: 12px; padding: 16px; margin-bottom: 16px; background: ${tv.cardBg}; }
  .orientation-card h3 { margin: 0 0 6px; color: ${tv.cardTitle}; font-size: 14px; }
  .orientation-card p { margin: 0; font-size: 11px; color: #475569; }
  .day-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; margin-top: 10px; }
  .day-chip { background: #fff; border: 2px solid ${tv.sectionBorder}; border-radius: 8px; padding: 8px 4px; text-align: center; font-size: 10px; }
  .day-chip.active { background: ${tv.accent}; color: #fff; border-color: ${tv.accent}; }
  .day-chip .day-name { font-weight: 700; font-size: 11px; }
  .footer-sig { width: 100%; margin-top: 30px; border-collapse: collapse; }
  .footer-sig td { width: 50%; text-align: center; vertical-align: bottom; padding-top: 40px; font-size: 10px; color: #475569; }
  .sig-line { border-top: 1px solid #64748b; width: 70%; margin: 0 auto 6px auto; }
  @media print {
    body { padding: 0; background: #fff; }
    .no-print { display: none !important; }
    .cover { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>

<!-- COVER -->
<div class="cover">
  <div style="font-size:10px;opacity:.8;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(tv.worldName)} · Plataforma Pedagógica</div>
  <h1>Guía Didáctica y Taller Práctico de Clase</h1>
  <h2>Enfoque Montessori y Charlotte Mason · Homologación Ministerio de Educación</h2>
  <div class="student-info">
    <strong>Estudiante:</strong> ${escapeHtml(student.name)}<br>
    <strong>Nivel:</strong> ${escapeHtml(student.gradeLong || student.grade)}<br>
    <strong>Día:</strong> ${escapeHtml(selectedDay)} — ${escapeHtml(dateStr)}<br>
    <strong>Materias del día:</strong> ${sorted.length} clase(s)<br>
    <strong>Código:</strong> WIS-${student.id.toUpperCase()}-2026<br>
    <strong>Estado:</strong> Oficial
  </div>
  <div class="quote">"Aprender con profundidad. Avanzar con propósito." — Wisdom Academy</div>
</div>

<!-- ORIENTATION DASHBOARD -->
<div style="padding: 20px 24px;">
  <div class="orientation-card">
    <h3>🧭 Esquema General del Día — Orientación Rápida</h3>
    <p style="font-size:11px;color:#64748b;">Este cuadro te permite conocer el orden y duración de cada clase del día. Úsalo como mapa antes de empezar.</p>
    <div class="day-grid">
      ${['Lunes','Martes','Miércoles','Jueves','Viernes'].map(d => {
        const isActive = d === selectedDay;
        return `<div class="day-chip ${isActive ? 'active' : ''}"><div class="day-name">${d}</div><div style="font-size:9px;margin-top:2px;">${isActive ? `${sorted.length} clases` : '—'}</div></div>`;
      }).join('')}
    </div>
    ${buildDayOverviewTable(sorted, student)}
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px;">
    ${sorted.map((c, i) => `
      <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:8px 10px;font-size:10px;">
        <div style="font-weight:bold;color:#1e3a8a;margin-bottom:2px;">${i + 1}. ${escapeHtml(c.theme.substring(0, 30))}${c.theme.length > 30 ? '…' : ''}</div>
        <div style="color:#64748b;">⏱ ${escapeHtml(c.scheduleTime || '—')}</div>
        <div style="color:#6366f1;font-size:9px;">${escapeHtml(c.objective)}</div>
      </div>`).join('')}
  </div>

  <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 14px;font-size:11px;color:#166534;margin-bottom:14px;">
    <strong>📚 Cómo usar esta guía:</strong> Consulta cada capítulo en el orden del horario. Lee primero la Introducción y la Explicación Conceptual, responde las Preguntas Socráticas en tu cuaderno, resuelve las Actividades del Taller y entrega la Tarea del Día como evidencia.
  </div>
</div>

<!-- CHAPTERS -->
${chaptersHtml}

<!-- SIGNATURES -->
<div style="padding: 20px 24px;">
  <table class="footer-sig">
    <tr>
      <td><div class="sig-line"></div>Firma del Estudiante (${escapeHtml(student.name)})</td>
      <td><div class="sig-line"></div>Firma del Representante / Tutor</td>
    </tr>
  </table>
  <div style="text-align:center;font-size:9px;color:#94a3b8;margin-top:16px;">Wisdom School — Ecuador 2026-2027 · Código: WIS-${student.id.toUpperCase()}-2026 · Documento Oficial</div>
</div>

</body>
</html>`;
}

export function downloadConsolidatedDailyGuide(opts: ConsolidatedGuideOptions): void {
  const htmlContent = generateConsolidatedDailyGuideHTML(opts);
  const rawTitle = `Guia_Didactica_Consolidada_${opts.student.name}_${opts.selectedDay}_${opts.dateStr}.html`;
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = rawTitle;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  try {
    const printWindow = window.open('', '_blank');
    if (printWindow) { printWindow.document.write(htmlContent); printWindow.document.close(); }
  } catch { /* silent */ }
}