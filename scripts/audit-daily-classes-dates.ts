import { AVRIL_DAILY_CLASSES } from '../src/data/dailyClassesAvril';
import { GAEL_DAILY_CLASSES } from '../src/data/dailyClassesGael';

console.log('=== AVRIL DAILY CLASSES DATES & SUBJECTS ===');
AVRIL_DAILY_CLASSES.forEach((c, idx) => {
  console.log(`${idx + 1}. [${c.id}] Date: ${c.date}, Day: ${c.dayOfWeek}, Subject: ${c.subjectId}, Unit: ${c.unit}, Theme: ${c.theme}`);
});

console.log('\n=== GAEL DAILY CLASSES DATES & SUBJECTS ===');
GAEL_DAILY_CLASSES.forEach((c, idx) => {
  console.log(`${idx + 1}. [${c.id}] Date: ${c.date}, Day: ${c.dayOfWeek}, Subject: ${c.subjectId}, Unit: ${c.unit}, Theme: ${c.theme}`);
});
