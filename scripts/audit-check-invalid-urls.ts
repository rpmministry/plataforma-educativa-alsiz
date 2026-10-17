import { AVRIL_SUBJECTS, GAEL_SUBJECTS } from '../src/data/mockData';

const check = (student: string, subjects: any[]) => {
  subjects.forEach(s => {
    (s.units || []).forEach((u: any) => {
      (u.microcurriculum || []).forEach((m: any) => {
        const url = m.verifiedResource?.url || '';
        if (url.includes('wisdomschool') || url.includes('wisdom-school') || url === '' || !url.startsWith('http')) {
          console.log(`[${student}] ${s.name} - ${u.title} - ${m.theme}: url='${url}', platform='${m.verifiedResource?.platform}'`);
        }
      });
    });
  });
};

check('avril', AVRIL_SUBJECTS);
check('gael', GAEL_SUBJECTS);
