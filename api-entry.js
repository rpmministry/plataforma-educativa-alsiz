// Entry de Vercel Serverless — Proxy Reverso hacia Backend Persistente (Opción A)
// Plataforma Educativa ALSIZ para Ekballo Church
//
// En la Opción A, Vercel sirve el frontend estático y esta función actúa como un proxy
// transparente hacia el backend persistente (Node 22 LTS con SQLite WAL en disco montado).
// NUNCA inicializa SQLite en el entorno efímero de Vercel.

const { URL } = require('node:url');

/**
 * Obtiene el cuerpo de la petición de forma segura, manejando buffers,
 * objetos pre-parseados por @vercel/node o streams entrantes.
 */
async function getRequestBody(req) {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return undefined;
  }

  if (req.body !== undefined && req.body !== null) {
    if (Buffer.isBuffer(req.body)) return req.body;
    if (typeof req.body === 'string') return Buffer.from(req.body);
    if (typeof req.body === 'object') return Buffer.from(JSON.stringify(req.body));
  }

  // Leer stream crudo si no fue parseado previamente
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  if (chunks.length === 0) return undefined;
  return Buffer.concat(chunks);
}

/**
 * Construye las cabeceras a reenviar normalizando Host y propagando X-Forwarded-*
 */
function buildForwardHeaders(req, targetUrl) {
  const headers = {};
  for (const [key, value] of Object.entries(req.headers || {})) {
    const lower = key.toLowerCase();
    if (
      lower === 'connection' ||
      lower === 'transfer-encoding' ||
      lower === 'content-length' ||
      lower === 'host'
    ) {
      continue;
    }
    headers[lower] = value;
  }

  headers['host'] = targetUrl.host;
  headers['x-forwarded-host'] = req.headers?.host || targetUrl.host;
  headers['x-forwarded-proto'] = req.headers?.['x-forwarded-proto'] || 'https';
  
  const clientIp = req.headers?.['x-forwarded-for'] || req.socket?.remoteAddress;
  if (clientIp) {
    headers['x-forwarded-for'] = clientIp;
  }

  // Soporte transparente para túneles seguros sin tarjetas (localtunnel / ngrok)
  headers['bypass-tunnel-reminder'] = 'true';

  return headers;
}

/**
 * Manejador principal del proxy
 */
async function proxyHandler(req, res) {
  const backendBase = (process.env.BACKEND_URL || process.env.PERSISTENT_BACKEND_URL || '').trim();

  // Si no se ha configurado la URL del backend persistente, responder de forma clara
  if (!backendBase) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(
      JSON.stringify({
        error: 'persistent_backend_not_configured',
        message:
          'La Plataforma Educativa ALSIZ requiere un backend persistente activo con volumen de disco montado (Opción A). Configure la variable de entorno BACKEND_URL en el panel de Vercel apuntando al servicio backend Node.js persistente.',
        status: 503,
        action: 'PENDIENTE_DEL_ADMINISTRADOR',
        timestamp: new Date().toISOString(),
      })
    );
    return;
  }

  try {
    const incomingUrl = req.url || '/';
    const targetUrl = new URL(incomingUrl, backendBase);
    const bodyBuffer = await getRequestBody(req);
    const forwardHeaders = buildForwardHeaders(req, targetUrl);

    if (bodyBuffer && !forwardHeaders['content-type'] && req.headers?.['content-type']) {
      forwardHeaders['content-type'] = req.headers['content-type'];
    }

    const response = await fetch(targetUrl.href, {
      method: req.method,
      headers: forwardHeaders,
      body: bodyBuffer,
      redirect: 'manual',
    });

    res.statusCode = response.status;

    // Reenviar todas las cabeceras de respuesta salvo hop-by-hop
    for (const [key, val] of response.headers.entries()) {
      const lower = key.toLowerCase();
      if (
        lower === 'set-cookie' ||
        lower === 'connection' ||
        lower === 'transfer-encoding' ||
        lower === 'content-length'
      ) {
        continue;
      }
      res.setHeader(key, val);
    }

    // Preservar múltiples cookies con getSetCookie() o valor raw
    if (typeof response.headers.getSetCookie === 'function') {
      const cookies = response.headers.getSetCookie();
      if (cookies && cookies.length > 0) {
        res.setHeader('Set-Cookie', cookies);
      }
    } else {
      const rawCookie = response.headers.get('set-cookie');
      if (rawCookie) {
        res.setHeader('Set-Cookie', rawCookie);
      }
    }

    const responseBuffer = Buffer.from(await response.arrayBuffer());
    res.setHeader('Content-Length', responseBuffer.length);
    res.end(responseBuffer);
  } catch (err) {
    console.error('[VercelProxy] Error conectando con backend persistente:', err.message || err);
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(
      JSON.stringify({
        error: 'backend_unreachable',
        message: `No se pudo conectar con el backend persistente de ALSIZ (${backendBase}). Error: ${err.message || 'Conexión rechazada o timeout'}`,
        status: 502,
        timestamp: new Date().toISOString(),
      })
    );
  }
}

let expressApp = null;
function getExpressApp() {
  if (!expressApp) {
    try {
      const serverModule = require('./api-server.js');
      expressApp = serverModule.default || serverModule.app || serverModule;
    } catch (loadErr) {
      console.error('[VercelServerless] Error al cargar api-server.js:', loadErr);
      throw loadErr;
    }
  }
  return expressApp;
}

module.exports = async function handler(req, res) {
  const backendBase = (process.env.BACKEND_URL || process.env.PERSISTENT_BACKEND_URL || '').trim();
  const tursoUrl = (process.env.TURSO_DATABASE_URL || '').trim();

  if (backendBase) {
    return proxyHandler(req, res);
  }

  if (process.env.VERCEL && tursoUrl) {
    const app = getExpressApp();
    return app(req, res);
  }

  return proxyHandler(req, res);
};
