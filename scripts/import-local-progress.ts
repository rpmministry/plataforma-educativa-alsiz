/**
 * ==============================================================================
 * CLI de Importación Controlada de Progreso LocalStorage
 * Plataforma Educativa ALSIZ — Ekballo Church
 * Uso:
 *   npx tsx scripts/import-local-progress.ts --file <ruta-al-json> [--dry-run]
 * ==============================================================================
 */

import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { LocalProgressImporter } from '../server/migration/localProgressImporter';
import { getDatabasePath } from '../server/db/database';

const args = process.argv.slice(2);
const fileIndex = args.indexOf('--file');
const filePath = fileIndex !== -1 ? args[fileIndex + 1] : null;
const isDryRun = args.includes('--dry-run') || !args.includes('--apply');

async function main() {
  console.log('================================================================');
  console.log('  IMPORTADOR CONTROLADO DE PROGRESO LOCALSTORAGE — ALSIZ');
  console.log('================================================================\n');

  if (!filePath) {
    console.log('ℹ️ No se especificó ningún archivo con --file <ruta>.');
    console.log('Modo de empleo:');
    console.log('  1. En el dispositivo del estudiante, ejecute la exportación desde la consola del navegador:');
    console.log('     window.__ALSIZ_EXPORT_PROGRESS__.downloadFile()');
    console.log('  2. Transfiera el archivo alsiz_device_progress_export.json de forma segura a este servidor.');
    console.log('  3. Ejecute la importación en modo dry-run:');
    console.log('     npx tsx scripts/import-local-progress.ts --file <ruta> --dry-run');
    console.log('  4. Si los resultados son conformes, ejecute con --apply.\n');
    return;
  }

  const resolved = path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(resolved)) {
    console.error(`❌ El archivo especificado no existe: ${resolved}`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(resolved, 'utf-8'));
  console.log(`Leído archivo de exportación: ${resolved}`);
  console.log(`Modo: ${isDryRun ? 'DRY-RUN (Simulación sin escritura)' : 'APLICAR EN BASE DE DATOS'}`);

  const dbPath = getDatabasePath();
  const db = new DatabaseSync(dbPath);

  const importer = new LocalProgressImporter();
  const stats = importer.importProgress(db, raw, { dryRun: isDryRun });

  console.log('\n--- RESULTADOS DE IMPORTACIÓN ---');
  console.log(`- Clases completadas detectadas: ${stats.completedClassesFound}`);
  console.log(`- Submissions procesadas: ${stats.submissionsInserted} de ${stats.submissionsFound}`);
  console.log(`- Avatares actualizados: ${stats.avatarsUpdated}`);
  console.log(`- Notas/Guías detectadas: ${stats.guidesFound}`);
  if (stats.errors.length > 0) {
    console.error('Errores:', stats.errors);
    process.exit(1);
  }

  console.log('\n✅ Proceso completado exitosamente.');
}

main().catch(err => {
  console.error('Fatal error en importación:', err);
  process.exit(1);
});

