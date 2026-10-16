# Guía de Instalación y Despliegue Operativo
## Plataforma Educativa ALSIZ para Ekballo Church

- **Documento**: `docs/operacion/guia_instalacion_despliegue.md`
- **Versión**: 1.0.0 (Producción / Staging)
- **Fecha**: 2026-10-16
- **Audiencia**: Administradores de Sistemas, Ingenieros DevOps y Líderes Técnicos

---

### 1. Arquitectura y Modelos de Despliegue

La **Plataforma Educativa ALSIZ** está diseñada como un sistema híbrido de alto rendimiento:
- **Frontend**: Single Page Application (SPA) desarrollada en React 19, TypeScript 5.8, Tailwind CSS 4 y Vite 6.
- **Backend**: API RESTful modular en Node.js 22 LTS con Express 4.
- **Persistencia**: Base de datos relacional transaccional embebida SQLite3 (mediante el módulo nativo de Node.js `node:sqlite`), optimizada con Write-Ahead Logging (`WAL`), claves foráneas activas (`PRAGMA foreign_keys = ON`) y sincronización balanceada (`PRAGMA synchronous = NORMAL`).

#### Modelos de Despliegue Soportados:

1. **Despliegue Recomendado para Producción Permanente (VPS / Docker / PaaS Persistente)**:
   - Servidor Linux (Ubuntu 22.04 LTS / 24.04 LTS o Debian 12) con Node.js 22.x LTS.
   - Gestión de procesos mediante `PM2` o contenedor Docker con volumen montado para `./data/` y `./backups/`.
   - Reverse Proxy inverso Nginx o Caddy con terminación SSL/TLS (HTTPS obligatorio para cookies seguras y Web APIs de audio/micrófono).
   - Plataformas PaaS compatibles: Render (con persistent disk en `/data`), Fly.io (con persistent volume), Railway o VPS dedicado (Hetzner, DigitalOcean, Linode, AWS EC2).

2. **Despliegue Serverless (Vercel / AWS Lambda)**:
   - Configurado en `vercel.json` para hospedar la SPA estática y enrutar las funciones backend en `api-entry.js` -> `api-server.js`.
   - *Consideración crítica de persistencia*: Las funciones serverless de Vercel son de naturaleza efímera (*stateless*). En este entorno, el directorio de trabajo solo permite escrituras en `/tmp`. Para despliegues productivos permanentes en Vercel, debe utilizarse almacenamiento distribuido/externo (ej. Turso / LibSQL sobre HTTP) o destinar Vercel al frontend y un servidor Node.js dedicado al backend persistente.

3. **Entorno de Desarrollo Local y Homologación**:
   - Ejecución mediante `npm run dev` (Vite dev server con HMR + Express) o `npm run start` (servidor compilado de producción local).

---

### 2. Requisitos Previos del Sistema

| Componente | Requisito Mínimo | Requisito Recomendado |
|---|---|---|
| **Sistema Operativo** | Linux (Ubuntu/Debian), Windows 10/11, macOS | Ubuntu Server 24.04 LTS |
| **Node.js** | v22.12.0 LTS (requiere soporte nativo `node:sqlite`) | v22.14.0 LTS |
| **npm** | v10.x o superior | v10.9.x |
| **Memoria RAM** | 1 GB disponible | 2 GB a 4 GB RAM |
| **Almacenamiento** | 2 GB libres en disco (SSD recomendado) | 10 GB (para histórico de backups y activos) |
| **Puertos** | 3000 (HTTP backend/app) | 80/443 (Reverse Proxy Nginx) |

---

### 3. Procedimiento de Instalación Paso a Paso

#### Paso 1: Clonar el Repositorio Oficial
```bash
git clone https://github.com/rpmministry/plataforma-educativa-alsiz.git
cd plataforma-educativa-alsiz
```

#### Paso 2: Verificar la Rama Autorizada
```bash
# Para verificar la versión a desplegar
git fetch origin
git checkout main
```

#### Paso 3: Instalación Limpia y Determinista de Dependencias
```bash
# Utilizar npm ci para garantizar que se respeten exactamente las versiones de package-lock.json
npm ci --prefer-offline
```

#### Paso 4: Configurar Variables de Entorno
Copiar el archivo de plantilla a la configuración del entorno:
```bash
cp .env.example .env.production
# O editar directamente .env respetando los permisos de archivo (chmod 600)
```
*Consulte la `Guía de Configuración de Entornos` para el detalle de cada variable.*

#### Paso 5: Ejecutar Migraciones de Base de Datos
Antes de arrancar la aplicación, se debe garantizar la creación de tablas e índices:
```bash
npm run db:migrate
```
*Salida esperada*: Migraciones v001 a v012 aplicadas o verificadas con éxito.

#### Paso 6: Compilación de Artefactos de Producción
```bash
npm run build
```
Este comando ejecuta en secuencia:
1. `vite build`: Compila la SPA de React en la carpeta `./dist`.
2. `esbuild dev-server.ts`: Genera el bundle de producción del servidor en `dist/server.cjs`.
3. `esbuild server.ts`: Genera el bundle de la API serverless en `api-server.js`.

#### Paso 7: Diagnóstico Pre-Vuelo (Health Check)
```bash
npm run health
```
Debe certificar:
- Archivo de base de datos íntegro (`PRAGMA integrity_check: ok`).
- 12 migraciones registradas.
- Artefactos de producción en `dist/` presentes.

---

### 4. Ejecución en Producción

#### Opción A: Ejecución Directa con Node.js
```bash
NODE_ENV=production PORT=3000 node dist/server.cjs
```

#### Opción B: Ejecución con Gestor de Procesos PM2 (Recomendado)
Crear el archivo `ecosystem.config.cjs`:
```javascript
module.exports = {
  apps: [
    {
      name: 'alsiz-ekballo-platform',
      script: 'dist/server.cjs',
      instances: 1, // Modo single-process por ser SQLite con WAL
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_PATH: './data/alsiz.db'
      },
      max_memory_restart: '1G',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      merge_logs: true
    }
  ]
};
```
Iniciar y persistir el servicio:
```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

---

### 5. Configuración de Nginx Reverse Proxy (con HTTPS)

```nginx
server {
    listen 80;
    server_name educacion.ekballochurch.org;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name educacion.ekballochurch.org;

    ssl_certificate /etc/letsencrypt/live/educacion.ekballochurch.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/educacion.ekballochurch.org/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Encabezados de Seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Tamaño máximo de carga (para fotos de tareas y documentos)
    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts para streaming de respuestas de IA
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Bloquear acceso a archivos sensibles o base de datos por HTTP
    location ~* \.(db|sql|env|log)$ {
        deny all;
        return 404;
    }
}
```

---

### 6. Comprobaciones Posteriores al Despliegue (Smoke Tests)

Una vez iniciado el servicio, ejecute las siguientes verificaciones:
1. **Endpoint de Salud**:
   ```bash
   curl -I https://educacion.ekballochurch.org/api/health
   # Debe responder HTTP 200 OK con JSON de estado.
   ```
2. **Acceso al Frontend**:
   Cargar `https://educacion.ekballochurch.org` en un navegador en modo incógnito; verificar que la página inicial cargue con el logotipo de Ekballo Church y las opciones de acceso.
3. **Inicio de Sesión y Aislamiento**:
   Ingresar con un usuario tutor de prueba y verificar que solo se visualicen sus hijos asignados.
4. **Verificación de Respaldo Inicial**:
   Ejecutar `npm run db:backup` para generar la copia base del nuevo despliegue.

