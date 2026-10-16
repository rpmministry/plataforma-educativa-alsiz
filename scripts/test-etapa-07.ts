/**
 * ==============================================================================
 * Suite de Pruebas Automatizadas — ETAPA 07 (ALSIZ / Ekballo Church)
 * Centro de Conocimiento, Fragmentación, FTS5 BM25, Versionado y Retirada RAG
 * ==============================================================================
 */

import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import app from '../server';
import { initDatabase, closeDatabase } from '../server/db/database';
import { runMigrations } from '../server/db/migrator';

interface TestResult {
  name: string;
  category: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

function recordResult(name: string, category: string, passed: boolean, details?: string): void {
  results.push({ name, category, passed, details });
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} [${category}] ${name}: ${details || (passed ? 'PASÓ' : 'FALLÓ')}`);
}

async function request(
  port: number,
  options: {
    method: string;
    path: string;
    headers?: Record<string, string>;
    body?: any;
  }
): Promise<{ status: number; body: any; headers: http.IncomingHttpHeaders }> {
  return new Promise((resolve, reject) => {
    const postData = options.body ? JSON.stringify(options.body) : undefined;
    const reqHeaders: Record<string, string> = {
      ...(options.headers || {}),
    };

    if (postData) {
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(postData).toString();
    }

    const req = http.request(
      {
        hostname: '127.0.0.1',
        port,
        path: options.path,
        method: options.method,
        headers: reqHeaders,
      },
      (res) => {
        let rawData = '';
        res.on('data', (chunk) => {
          rawData += chunk;
        });
        res.on('end', () => {
          let parsed: any = null;
          try {
            parsed = rawData ? JSON.parse(rawData) : null;
          } catch {
            parsed = rawData;
          }
          resolve({ status: res.statusCode || 500, body: parsed, headers: res.headers });
        });
      }
    );

    req.on('error', (err) => reject(err));
    if (postData) req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('================================================================');
  console.log('  SUITE DE PRUEBAS AUTOMATIZADAS — ETAPA 07 (ALSIZ / EKBALLO)');
  console.log('  CENTRO DE CONOCIMIENTO, FRAGMENTACIÓN, FTS5 Y RETIRADA RAG');
  console.log('================================================================\n');

  // Configuración de base de datos efímera para pruebas
  const testDbPath = path.resolve(process.cwd(), 'data', 'test_alsiz_etapa07.db');
  closeDatabase();
  if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);

  process.env.DATABASE_PATH = testDbPath;
  process.env.NODE_ENV = 'test';
  process.env.SESSION_SECRET = 'secreto_de_prueba_automatizada_alsiz_2026_min32';

  // 1. Ejecutar Migraciones (001 a 007)
  try {
    const testDb = initDatabase(testDbPath);
    const migrationResults = runMigrations(testDb);
    const allApplied = migrationResults.every((m) => m.status === 'APPLIED' || m.status === 'SKIPPED');
    recordResult(
      'Migraciones de esquema completas (v001 a v007)',
      'Migraciones',
      allApplied && migrationResults.length >= 7,
      `Se verificaron ${migrationResults.length} migraciones aplicadas correctamente.`
    );
  } catch (err: any) {
    recordResult('Migraciones de esquema', 'Migraciones', false, `Error: ${err.message}`);
    process.exit(1);
  }

  // 2. Levantar Servidor en puerto efímero
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
  const address = server.address() as any;
  const port = address.port;

  let adminToken = '';
  let teacherToken = '';
  let student1Token = '';
  let rep1Token = '';

  try {
    // 3. Autenticación de los 4 roles
    const adminLogin = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'admin_alsiz', password: 'DevAdmin2026!' },
    });
    adminToken = adminLogin.body?.data?.token;

    const teacherLogin = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'prof_mentoria', password: 'DevPass123!' },
    });
    teacherToken = teacherLogin.body?.data?.token;

    const studentLogin = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'alumno_santos_1', password: 'DevPass123!' },
    });
    student1Token = studentLogin.body?.data?.token;

    const repLogin = await request(port, {
      method: 'POST',
      path: '/api/v1/auth/login',
      body: { identifier: 'padre_santos', password: 'DevPass123!' },
    });
    rep1Token = repLogin.body?.data?.token;

    recordResult(
      'Autenticación inicial de los 4 roles de prueba',
      'Autenticación',
      Boolean(adminToken && teacherToken && student1Token && rep1Token),
      'Tokens emitidos para ADMIN, TEACHER, STUDENT y REPRESENTATIVE.'
    );

    const runTag = Date.now().toString().slice(-6);
    const testDocCode = `TEST-OPTICA-${runTag}`;
    let createdSourceId = '';

    // ==========================================
    // CRITERIO 1: Carga de documento autorizado (Docente)
    // ==========================================
    const sampleMarkdown = `
# Guía Pedagógica de Óptica Geométrica y Refracción

## Principios Fundamentales de la Luz
La luz viaja en línea recta en un medio homogéneo e isótropo con una velocidad aproximada de trescientos mil kilómetros por segundo en el vacío. Cuando una onda electromagnética incide sobre la superficie de separación entre dos medios transparentes con distinto índice de refracción, una parte se refleja y otra se refracta.

## Ley de Snell y Reflexión Total Interna
La ley de Snell establece que el producto del índice de refracción del primer medio por el seno del ángulo de incidencia es igual al producto del índice de refracción del segundo medio por el seno del ángulo de refracción. Si el ángulo de incidencia supera el ángulo crítico, ocurre el fenómeno de reflexión total interna, fundamento físico de la fibra óptica moderna.

## Método Socrático en Óptica
¿Cómo podemos deducir que la luz se curva al pasar del aire al agua sin mirar directamente el rayo, observando únicamente la aparente deformación de una varilla sumergida?
    `.trim();

    const uploadRes = await request(port, {
      method: 'POST',
      path: '/api/v1/knowledge/sources',
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: {
        code: testDocCode,
        title: 'Taller Experimental de Óptica Geométrica y Refracción',
        description: 'Material complementario para BGU con derivación de la ley de Snell y debate socrático.',
        sourceType: 'OFICIAL_MINEDUC',
        formatType: 'DOCUMENT_MD',
        uriOrUrl: 'canonical://ekballo/ciencias/optica_geometrica_snell.md',
        contentText: sampleMarkdown,
        subjectId: 'subj-mat-801',
        levelId: 'lvl-sup-8',
        language: 'es',
        targetAgentFamily: 'SOCRATIC_TUTOR',
        trustLevel: 'CANONICAL_ALTO',
        licenseType: 'DOMINIO_PUBLICO_MINEDUC',
        authorOrPublisher: 'Coordinación de Ciencias ALSIZ',
      },
    });

    createdSourceId = uploadRes.body?.data?.id;
    const isPending = uploadRes.body?.data?.status === 'PENDIENTE';
    recordResult(
      'Criterio 1: Carga de documento de prueba autorizado en estado PENDIENTE',
      'Gestión de Fuentes',
      uploadRes.status === 201 && Boolean(createdSourceId) && isPending,
      `Status HTTP ${uploadRes.status}. ID: ${createdSourceId}. Estado inicial: PENDIENTE (no auto-aprobado).`
    );

    // ==========================================
    // CRITERIO 2: Detección y rechazo de duplicados por checksum
    // ==========================================
    const duplicateRes = await request(port, {
      method: 'POST',
      path: '/api/v1/knowledge/sources',
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: {
        code: `DUPLICATE-${runTag}`,
        title: 'Documento Duplicado con Mismo Contenido',
        sourceType: 'OFICIAL_MINEDUC',
        formatType: 'DOCUMENT_MD',
        uriOrUrl: 'https://otro-sitio.com/duplicado.md',
        contentText: sampleMarkdown, // Contenido idéntico
      },
    });

    recordResult(
      'Criterio 2: Detección y rechazo de contenido duplicado (SHA-256 Checksum)',
      'Seguridad & Deduplicación',
      duplicateRes.status === 409,
      `Status HTTP ${duplicateRes.status}. Código de rechazo: ${duplicateRes.body?.error?.code}.`
    );

    // ==========================================
    // CRITERIO 3: Metadatos, extracción y fragmentación (Chunks)
    // ==========================================
    const detailRes = await request(port, {
      method: 'POST',
      path: `/api/v1/knowledge/sources/${createdSourceId}`,
      headers: { Authorization: `Bearer ${teacherToken}` },
    });

    // Usar GET para consultar detalle
    const getDetailRes = await request(port, {
      method: 'GET',
      path: `/api/v1/knowledge/sources/${createdSourceId}`,
      headers: { Authorization: `Bearer ${teacherToken}` },
    });

    const chunks = getDetailRes.body?.data?.chunks || [];
    const hasValidCitationTags = chunks.length > 0 && chunks.every((c: any) => c.citation_tag && c.citation_tag.startsWith(`[${testDocCode}#C`));

    recordResult(
      'Criterio 3: Extracción y segmentación en fragmentos con etiquetas de citación',
      'Extracción & Chunking',
      getDetailRes.status === 200 && chunks.length >= 2 && hasValidCitationTags,
      `Status HTTP ${getDetailRes.status}. Fragmentos generados: ${chunks.length}. Etiquetas: ${chunks[0]?.citation_tag}, ${chunks[1]?.citation_tag}.`
    );

    // ==========================================
    // CRITERIO 4: Control de permisos RBAC para aprobación
    // ==========================================
    // Intento 4A: Docente intenta auto-aprobar la fuente
    const teacherReviewRes = await request(port, {
      method: 'POST',
      path: `/api/v1/knowledge/sources/${createdSourceId}/review`,
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: { status: 'APROBADO', justification: 'Intento de auto-aprobación docente' },
    });

    recordResult(
      'Criterio 4A: Docente bloqueado de auto-aprobar fuentes (RBAC 403)',
      'Seguridad & RBAC',
      teacherReviewRes.status === 403,
      `Status HTTP ${teacherReviewRes.status}. Solo ADMIN y ACADEMIC_COORDINATOR pueden aprobar.`
    );

    // Intento 4B: Estudiante intenta consultar detalle editorial de la fuente
    const studentAccessRes = await request(port, {
      method: 'GET',
      path: `/api/v1/knowledge/sources/${createdSourceId}`,
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    recordResult(
      'Criterio 4B: Estudiante bloqueado de administración del centro de conocimiento (RBAC 403)',
      'Seguridad & RBAC',
      studentAccessRes.status === 403,
      `Status HTTP ${studentAccessRes.status}. Acceso restringido por rol.`
    );

    // ==========================================
    // CRITERIO 5: Aprobación editorial formal por Administrador
    // ==========================================
    const adminReviewRes = await request(port, {
      method: 'POST',
      path: `/api/v1/knowledge/sources/${createdSourceId}/review`,
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        status: 'APROBADO',
        justification: 'Documento verificado y validado conforme al currículo de Física BGU.',
      },
    });

    const isApproved = adminReviewRes.body?.data?.status === 'APROBADO';
    recordResult(
      'Criterio 5: Aprobación editorial por Administrador con justificación en auditoría',
      'Control Editorial',
      adminReviewRes.status === 200 && isApproved,
      `Status HTTP ${adminReviewRes.status}. Estado promovido a APROBADO.`
    );

    // ==========================================
    // CRITERIO 6: Búsqueda y recuperación temática en FTS5 BM25 (RAG Retrieval)
    // ==========================================
    const searchRes = await request(port, {
      method: 'GET',
      path: '/api/v1/knowledge/search?q=Snell+refraccion',
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    const searchResults = searchRes.body?.data?.results || [];
    const foundChunk = searchResults.find((r: any) => r.sourceId === createdSourceId);

    recordResult(
      'Criterio 6: Búsqueda y recuperación temática exitosa en SQLite FTS5 (BM25)',
      'Indexación & Retrieval',
      searchRes.status === 200 && Boolean(foundChunk),
      `Status HTTP ${searchRes.status}. Fragmentos recuperados: ${searchResults.length}. Relevancia: ${foundChunk?.relevanceScore?.toFixed(2)}.`
    );

    // ==========================================
    // CRITERIO 7: Publicación de nueva versión e historial
    // ==========================================
    const newVersionRes = await request(port, {
      method: 'POST',
      path: `/api/v1/knowledge/sources/${createdSourceId}/versions`,
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        title: 'Taller Experimental de Óptica (Segunda Edición)',
        contentText: sampleMarkdown + '\n\n## Experimento Práctico\nMedición del índice de refracción de la glicerina con láser verde.',
      },
    });

    const versionNumber = newVersionRes.body?.data?.version_number;
    const parentId = newVersionRes.body?.data?.parent_source_id;

    recordResult(
      'Criterio 7: Publicación de nueva versión y trazabilidad de árbol de versiones',
      'Versionado',
      newVersionRes.status === 201 && versionNumber === 2 && parentId === createdSourceId,
      `Status HTTP ${newVersionRes.status}. Versión: ${versionNumber}. Parent ID: ${parentId}.`
    );

    // ==========================================
    // CRITERIO 8: CRÍTICO — Retirada / Desactivación efectiva de la fuente
    // ==========================================
    const retireRes = await request(port, {
      method: 'POST',
      path: `/api/v1/knowledge/sources/${createdSourceId}/retire`,
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        justification: 'Desactivación de la fuente para reemplazo por la nueva versión curricular.',
      },
    });

    const isDeactivated = retireRes.body?.data?.status === 'DESACTIVADO';
    recordResult(
      'Criterio 8: Retirada / desactivación efectiva de la fuente en base de datos',
      'Retirada Efectiva',
      retireRes.status === 200 && isDeactivated,
      `Status HTTP ${retireRes.status}. Estado actualizado a DESACTIVADO.`
    );

    // ==========================================
    // CRITERIO 9: CRÍTICO — Demostrar que la fuente desactivada DEJA DE SER RECUPERADA en RAG
    // ==========================================
    const searchAfterRetireRes = await request(port, {
      method: 'GET',
      path: '/api/v1/knowledge/search?q=Snell+refraccion',
      headers: { Authorization: `Bearer ${student1Token}` },
    });

    const searchAfterResults = searchAfterRetireRes.body?.data?.results || [];
    const foundAfterRetire = searchAfterResults.find((r: any) => r.sourceId === createdSourceId);

    recordResult(
      'Criterio 9: CRÍTICO: La fuente retirada DEJA DE RECUPERARSE en el motor RAG de los agentes',
      'Retirada Efectiva',
      searchAfterRetireRes.status === 200 && !foundAfterRetire,
      `Status HTTP ${searchAfterRetireRes.status}. Fragmentos de fuente desactivada recuperados: 0. Exclusión estricta confirmada.`
    );

    // ==========================================
    // CRITERIO 10: Validación de archivo inválido / tamaño excesivo
    // ==========================================
    const invalidRes = await request(port, {
      method: 'POST',
      path: '/api/v1/knowledge/sources',
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        code: `INVALID-${runTag}`,
        title: 'Documento Vacío',
        sourceType: 'OFICIAL_MINEDUC',
        formatType: 'DOCUMENT_MD',
        uriOrUrl: 'https://invalido.com',
        contentText: 'corto', // Muy corto (< 20 caracteres)
      },
    });

    recordResult(
      'Criterio 10: Validación de entrada, rechazo de contenido insuficiente o inválido',
      'Validación de Archivos',
      invalidRes.status === 400 && invalidRes.body?.error?.code === 'VALIDATION_ERROR',
      `Status HTTP ${invalidRes.status}. Mensaje: ${invalidRes.body?.error?.message}.`
    );

    // ==========================================
    // CRITERIO 11: Registro y escalamiento de conflicto doctrinal/curricular
    // ==========================================
    const conflictRes = await request(port, {
      method: 'POST',
      path: '/api/v1/knowledge/conflicts',
      headers: { Authorization: `Bearer ${teacherToken}` },
      body: {
        sourceIdA: createdSourceId,
        sourceIdB: 'src-ekb-fundamentos-01',
        conflictType: 'CURRICULAR_MISMATCH',
        description: 'Diferencia en la secuencia pedagógica de inicio del concepto de inercia y gravedad.',
      },
    });

    const conflictId = conflictRes.body?.data?.conflictId;
    recordResult(
      'Criterio 11: Registro y escalamiento de conflicto editorial para revisión humana',
      'Control Editorial',
      conflictRes.status === 201 && Boolean(conflictId),
      `Status HTTP ${conflictRes.status}. Conflicto ID: ${conflictId}. Estado: REPORTED.`
    );

    // ==========================================
    // CRITERIO 12: Resolución de conflicto reportado
    // ==========================================
    const resolveRes = await request(port, {
      method: 'POST',
      path: `/api/v1/knowledge/conflicts/${conflictId}/resolve`,
      headers: { Authorization: `Bearer ${adminToken}` },
      body: {
        resolutionNotes: 'Se acuerda priorizar la secuencia de la guía oficial MINEDUC complementada con la cosmovisión creacional de Ekballo.',
      },
    });

    recordResult(
      'Criterio 12: Resolución formal de conflicto editorial por Administrador',
      'Control Editorial',
      resolveRes.status === 200,
      `Status HTTP ${resolveRes.status}. Conflicto resuelto exitosamente.`
    );

    // ==========================================
    // CRITERIO 13: Estadísticas y telemetría del Centro de Conocimiento
    // ==========================================
    const statsRes = await request(port, {
      method: 'GET',
      path: '/api/v1/knowledge/stats',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const statsData = statsRes.body?.data;
    const hasStats = statsData && typeof statsData.totalChunks === 'number' && Array.isArray(statsData.byStatus);

    recordResult(
      'Criterio 13: Métricas y resumen estadístico del centro de conocimiento',
      'Telemetría',
      statsRes.status === 200 && hasStats,
      `Status HTTP ${statsRes.status}. Total Chunks: ${statsData?.totalChunks}. Grupos de estado: ${statsData?.byStatus?.length}.`
    );

  } catch (err: any) {
    console.error('Error no capturado durante ejecución de pruebas:', err);
  } finally {
    server.close();
    closeDatabase();
  }

  // ==========================================
  // RESUMEN FINAL
  // ==========================================
  console.log('\n================================================================');
  console.log('  RESUMEN FINAL DE LA SUITE DE PRUEBAS DE LA ETAPA 07');
  console.log('================================================================\n');

  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log(`Total de pruebas ejecutadas: ${total}`);
  console.log(`Pruebas aprobadas (PASÓ):   ${passed}`);
  console.log(`Pruebas fallidas  (FALLÓ):  ${failed}\n`);

  server.close();
  if (failed > 0) {
    console.error('ALERTA: Se detectaron fallos en la suite de pruebas críticas.');
    process.exit(1);
  } else {
    console.log('Todas las pruebas críticas de la ETAPA 07 fueron APROBADAS con éxito.\n');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fallo de ejecución:', err);
  process.exit(1);
});

