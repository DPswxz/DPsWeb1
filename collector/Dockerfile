FROM node:22-bookworm-slim

WORKDIR /app/collector
COPY collector/package*.json ./
RUN npm ci --omit=dev && npx playwright install --with-deps chromium \
    && rm -rf /var/lib/apt/lists/*
COPY collector/src ./src
COPY dist /app/dist
RUN mkdir -p /app/collector/data

ENV NODE_ENV=production HOST=0.0.0.0 PORT=8787 REFRESH_MINUTES=60 \
    NINTENDO_IMAGE_DIR=/app/collector/data/assets/nintendo-hk
EXPOSE 8787
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:8787/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "src/server.mjs"]
