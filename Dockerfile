# Dockerfile para Backend Persistente — Plataforma Educativa ALSIZ
# Ekballo Church — Node.js 22 LTS en Debian Bookworm Slim

FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Instalar dependencias deterministas mediante npm ci
COPY package.json package-lock.json ./
RUN npm ci --prefer-offline

# Copiar código fuente y compilar artefactos
COPY . .
RUN npm run build

# Etapa final de ejecución
FROM node:22-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_PATH=/data/alsiz.db

# Crear directorio de persistencia para el volumen montado
RUN mkdir -p /data /app/logs && chown -R node:node /data /app

# Copiar dependencias de producción y artefactos compilados
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --prefer-offline

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/db/migrations ./server/db/migrations
COPY --from=builder /app/api-server.js ./api-server.js

# Cambiar a usuario sin privilegios
USER node

# Volumen para la base de datos persistente SQLite
VOLUME ["/data"]

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:3000/api/health').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

CMD ["node", "dist/server.cjs"]

