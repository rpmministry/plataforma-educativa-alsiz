import { DailyClass } from '../../src/types';
import { AVRIL_LOTE_01_LEN, AvrilCurriculumLote } from './lote1-len';
import { AVRIL_LOTE_02_MAT } from './lote2-mat';
import { AVRIL_LOTE_03_CNI } from './lote3-cni';
import { AVRIL_LOTE_04_SOC } from './lote4-soc';
import { AVRIL_LOTE_05_ING } from './lote5-ing';
import { AVRIL_LOTE_06_ADM } from './lote6-adm';
import { AVRIL_LOTE_07_POL } from './lote7-pol';
import { AVRIL_LOTE_08_SOFT } from './lote8-soft';
import { AVRIL_LOTE_09_REL } from './lote9-rel';
import { AVRIL_LOTE_10_ART } from './lote10-art';
import { AVRIL_LOTE_11_EFI } from './lote11-efi';

export type { AvrilCurriculumLote };

export const AVRIL_LOTES: AvrilCurriculumLote[] = [
  AVRIL_LOTE_01_LEN,
  AVRIL_LOTE_02_MAT,
  AVRIL_LOTE_03_CNI,
  AVRIL_LOTE_04_SOC,
  AVRIL_LOTE_05_ING,
  AVRIL_LOTE_06_ADM,
  AVRIL_LOTE_07_POL,
  AVRIL_LOTE_08_SOFT,
  AVRIL_LOTE_09_REL,
  AVRIL_LOTE_10_ART,
  AVRIL_LOTE_11_EFI,
];

// Flat collection of all 23 classes
export const CONSOLIDATED_AVRIL_CLASSES: DailyClass[] = AVRIL_LOTES.flatMap(lote => lote.classes);
