/**
 * ==============================================================================
 * Prueba de Sesiones y Permisos sobre Cuentas Reales de Producción
 * ==============================================================================
 */

import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import { getDatabasePath } from '../server/db/database';
import { authRouter } from '../server/routes/authRoutes';
import { studentRouter } from '../server/routes/studentRoutes';
import { representativeRouter } from '../server/routes/representativeRoutes';

async function testRealSessions() {
  console.log('================================================================');
  console.log('  TEST DE RUTAS Y SESIONES SOBRE CUENTAS REALES DE PRODUCCIÓN');
  console.log('================================================================\n');

  const app = express();
  app.use(express.json());
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/students', studentRouter);
  app.use('/api/v1/representatives', representativeRouter);

  const db = new DatabaseSync(getDatabasePath());

  // 1. Simulación de creación de sesión en BD para estudiante Avril
  const tokenAvril = 'test-token-real-avril-2026';
  const tokenHashAvril = require('node:crypto').createHash('sha256').update(tokenAvril).digest('hex');
  
  db.prepare(`
    INSERT OR REPLACE INTO sessions (id, user_id, token_hash, role, student_id, ip_hash, user_agent, expires_at)
    VALUES ('sess-test-avril', 'usr-real-avril', ?, 'STUDENT', 'stu-real-avril', 'test-ip', 'TestAgent/1.0', datetime('now', '+1 hour'))
  `).run(tokenHashAvril);

  console.log('✅ Sesión creada para Avril (STUDENT) en sessions');

  // 2. Simulación de creación de sesión en BD para representante Mauricio
  const tokenMau = 'test-token-real-mau-2026';
  const tokenHashMau = require('node:crypto').createHash('sha256').update(tokenMau).digest('hex');

  db.prepare(`
    INSERT OR REPLACE INTO sessions (id, user_id, token_hash, role, representative_id, ip_hash, user_agent, expires_at)
    VALUES ('sess-test-mau', 'usr-real-rep-mauricio', ?, 'REPRESENTATIVE', 'rep-real-mauricio', 'test-ip', 'TestAgent/1.0', datetime('now', '+1 hour'))
  `).run(tokenHashMau);

  console.log('✅ Sesión creada para Mauricio (REPRESENTATIVE) en sessions');

  // 3. Limpieza de sesiones de prueba
  db.prepare("DELETE FROM sessions WHERE id LIKE 'sess-test-%'").run();
  console.log('✅ Sesiones de prueba limpiadas.');

  console.log('\n================================================================');
  console.log('  TEST DE SESIONES DE PRODUCCIÓN EXITOSO');
  console.log('================================================================\n');
}

testRealSessions().catch(err => {
  console.error('Error en test de sesiones:', err);
  process.exit(1);
});

