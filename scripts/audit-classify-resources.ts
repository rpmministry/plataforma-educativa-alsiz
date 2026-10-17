import { AVRIL_DAILY_CLASSES } from '../src/data/dailyClassesAvril';
import { GAEL_DAILY_CLASSES } from '../src/data/dailyClassesGael';

const classifyResource = (url: string, title: string, type: string) => {
  const u = (url || '').trim();
  if (!u || u === '#' || u.startsWith('http://')) {
    return { decision: 'RETIRAR', reason: 'URL vacía, de anclaje (#) o insegura (http://).' };
  }
  if (u.includes('dQw4w9WgXcQ')) {
    return { decision: 'REEMPLAZAR', reason: 'Video placeholder (Rickroll dQw4w9WgXcQ); requiere sustitución pedagógica inmediata.' };
  }
  if (u.includes('wisdom-school.edu') || u.includes('wisdomschool.ec')) {
    return { decision: 'REGENERAR', reason: 'Apunta a dominio extinto o legado (Wisdom School); la guía didáctica o recurso debe ser regenerado y custodiado en ALSIZ.' };
  }
  if (u.includes('phet.colorado.edu')) {
    return { decision: 'CONSERVAR', reason: 'Laboratorio virtual PhET Universidad de Colorado (licencia CC-BY compatible).' };
  }
  if (u.includes('geogebra.org')) {
    return { decision: 'CONSERVAR', reason: 'Simulador dinámico GeoGebra para modelado matemático.' };
  }
  if (u.includes('scratch.mit.edu')) {
    return { decision: 'CONSERVAR', reason: 'Entorno oficial Scratch MIT para programación por bloques.' };
  }
  if (u.includes('quickdraw.withgoogle.com')) {
    return { decision: 'CONSERVAR', reason: 'Laboratorio de experimentación artística con IA de Google.' };
  }
  if (u.startsWith('https://www.youtube.com') || u.startsWith('https://youtu.be')) {
    return { decision: 'REVISIÓN HUMANA', reason: 'Video pedagógico externo en YouTube; requiere validación docente de vigencia y derechos de reproducción.' };
  }
  return { decision: 'REVISIÓN HUMANA', reason: 'Fuente externa de terceros; requiere verificación docente de disponibilidad, licencia y adecuación de edad.' };
};

const allClasses = [
  ...AVRIL_DAILY_CLASSES.map(c => ({ ...c, _student: 'avril' })),
  ...GAEL_DAILY_CLASSES.map(c => ({ ...c, _student: 'gael' })),
];

console.log('class_id,student,resource_id,title,type,url,decision,reason');
allClasses.forEach(c => {
  (c.resources || []).forEach(r => {
    const { decision, reason } = classifyResource(r.url, r.title, r.type);
    console.log(`"${c.id}","${c._student}","${r.id}","${r.title.replace(/"/g, '""')}","${r.type}","${r.url}","${decision}","${reason.replace(/"/g, '""')}"`);
  });
});
