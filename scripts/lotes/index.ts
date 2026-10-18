import { CurriculumLote, LOTE_01_LEN } from './lote1-len';
import { LOTE_02_MAT } from './lote2-mat';
import { LOTE_03_CNI } from './lote3-cni';
import { LOTE_04_SOC } from './lote4-soc';
import { LOTE_05_ING } from './lote5-ing';
import { LOTE_06_SOFT } from './lote6-soft';
import { LOTE_07_REL } from './lote7-rel';
import { LOTE_08_ART } from './lote8-art';
import { LOTE_09_EFI } from './lote9-efi';
import { DailyClass } from '../../src/types';

export type { CurriculumLote };
export {
  LOTE_01_LEN,
  LOTE_02_MAT,
  LOTE_03_CNI,
  LOTE_04_SOC,
  LOTE_05_ING,
  LOTE_06_SOFT,
  LOTE_07_REL,
  LOTE_08_ART,
  LOTE_09_EFI
};

export const ALL_GAEL_LOTES: CurriculumLote[] = [
  LOTE_01_LEN,  // 5 sesiones: LEN-401
  LOTE_02_MAT,  // 5 sesiones: MAT-401
  LOTE_03_CNI,  // 4 sesiones: CNI-401
  LOTE_04_SOC,  // 3 sesiones: SOC-401
  LOTE_05_ING,  // 3 sesiones: ING-401
  LOTE_06_SOFT, // 2 sesiones: SOFT-401
  LOTE_07_REL,  // 1 sesión: REL-401
  LOTE_08_ART,  // 1 sesión: ART-401
  LOTE_09_EFI   // 1 sesión: EFI-401
];

export const CONSOLIDATED_GAEL_CLASSES: DailyClass[] = ALL_GAEL_LOTES.flatMap(l => l.classes);
