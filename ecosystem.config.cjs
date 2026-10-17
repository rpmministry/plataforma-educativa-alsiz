/**
 * Configuración de PM2 para el Backend Persistente de la Plataforma Educativa ALSIZ
 * Ekballo Church — Opción A de Despliegue (VPS / Servidor Dedicado)
 *
 * NOTA CRÍTICA DE CONCURRENCIA:
 * SQLite con WAL requiere proceso único escritor (instances: 1, exec_mode: 'fork').
 * NUNCA utilizar exec_mode: 'cluster' ni instances > 1 mientras se use SQLite local.
 */

module.exports = {
  apps: [
    {
      name: 'alsiz-backend-api',
      script: 'dist/server.cjs',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_PATH: '/data/alsiz.db',
        RUN_MIGRATIONS_ON_STARTUP: 'false',
        TRUST_PROXY: '1',
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      merge_logs: true,
      time: true,
    },
  ],
};

