import { AVRIL_SUBJECTS, GAEL_SUBJECTS } from '../src/data/mockData';

const platforms: Record<string, number> = {};
const domains: Record<string, number> = {};
let totalMicroResources = 0;
let youtubeCount = 0;
let phetCount = 0;
let geogebraCount = 0;
let scratchCount = 0;
let otherCount = 0;

const examineMicroResources = (student: string, subjects: any[]) => {
  subjects.forEach(s => {
    (s.units || []).forEach((u: any) => {
      (u.microcurriculum || []).forEach((m: any) => {
        const res = m.verifiedResource;
        if (res && res.url) {
          totalMicroResources++;
          const p = res.platform || 'Unknown';
          platforms[p] = (platforms[p] || 0) + 1;
          try {
            const urlObj = new URL(res.url);
            const host = urlObj.hostname;
            domains[host] = (domains[host] || 0) + 1;
            if (host.includes('youtube.com') || host.includes('youtu.be')) youtubeCount++;
            else if (host.includes('phet.colorado.edu')) phetCount++;
            else if (host.includes('geogebra.org')) geogebraCount++;
            else if (host.includes('scratch.mit.edu')) scratchCount++;
            else otherCount++;
          } catch (e) {
            domains['invalid-url'] = (domains['invalid-url'] || 0) + 1;
          }
        }
      });
    });
  });
};

examineMicroResources('avril', AVRIL_SUBJECTS);
examineMicroResources('gael', GAEL_SUBJECTS);

console.log('Total micro resources:', totalMicroResources);
console.log('Platforms:', platforms);
console.log('Top Domains:', domains);
console.log(`YouTube: ${youtubeCount}, PhET: ${phetCount}, GeoGebra: ${geogebraCount}, Scratch: ${scratchCount}, Other: ${otherCount}`);
