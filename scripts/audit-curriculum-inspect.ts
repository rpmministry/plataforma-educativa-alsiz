import { AVRIL_SUBJECTS, GAEL_SUBJECTS, AVRIL_SCHEDULE_SLOTS, GAEL_SCHEDULE_SLOTS } from '../src/data/mockData';
import { AVRIL_DAILY_CLASSES } from '../src/data/dailyClassesAvril';
import { GAEL_DAILY_CLASSES } from '../src/data/dailyClassesGael';

console.log('=== AVRIL SUBJECTS & UNITS ===');
let totalAvrilUnits = 0;
let totalAvrilMicro = 0;
AVRIL_SUBJECTS.forEach(s => {
  const microCount = (s.units || []).reduce((acc, u) => acc + (u.microcurriculum?.length || 0), 0);
  totalAvrilUnits += s.units?.length || 0;
  totalAvrilMicro += microCount;
  console.log(`- ${s.name} (${s.code}, ${s.id}): ${s.units?.length || 0} units, ${microCount} micro items, totalClasses target: ${s.totalClasses}, daysOfWeek: ${s.daysOfWeek.join(',')}`);
  (s.units || []).forEach(u => {
    console.log(`    Unit ${u.unitNumber}: ${u.title} (${u.microcurriculum?.length || 0} items)`);
  });
});
console.log(`Total Avril: ${AVRIL_SUBJECTS.length} subjects, ${totalAvrilUnits} units, ${totalAvrilMicro} micro items`);

console.log('\n=== GAEL SUBJECTS & UNITS ===');
let totalGaelUnits = 0;
let totalGaelMicro = 0;
GAEL_SUBJECTS.forEach(s => {
  const microCount = (s.units || []).reduce((acc, u) => acc + (u.microcurriculum?.length || 0), 0);
  totalGaelUnits += s.units?.length || 0;
  totalGaelMicro += microCount;
  console.log(`- ${s.name} (${s.code}, ${s.id}): ${s.units?.length || 0} units, ${microCount} micro items, totalClasses target: ${s.totalClasses}, daysOfWeek: ${s.daysOfWeek.join(',')}`);
  (s.units || []).forEach(u => {
    console.log(`    Unit ${u.unitNumber}: ${u.title} (${u.microcurriculum?.length || 0} items)`);
  });
});
console.log(`Total Gael: ${GAEL_SUBJECTS.length} subjects, ${totalGaelUnits} units, ${totalGaelMicro} micro items`);

console.log('\n=== DAILY CLASSES ===');
console.log('Avril daily classes count:', AVRIL_DAILY_CLASSES.length);
console.log('Gael daily classes count:', GAEL_DAILY_CLASSES.length);

console.log('\n=== SCHEDULE ANALYSIS ===');
const countSlots = (slots: any[]) => {
  const counts: Record<string, number> = {};
  slots.forEach(slot => {
    if (slot.isRecess) return;
    ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].forEach(day => {
      const subj = slot[day];
      if (subj) {
        counts[subj] = (counts[subj] || 0) + 1;
      }
    });
  });
  return counts;
};

console.log('Avril weekly slot counts:', countSlots(AVRIL_SCHEDULE_SLOTS));
console.log('Gael weekly slot counts:', countSlots(GAEL_SCHEDULE_SLOTS));

