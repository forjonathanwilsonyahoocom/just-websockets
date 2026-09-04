# ───────────────────────────────────────────────────────────────
# Builder stage – install dev deps & compile
# ───────────────────────────────────────────────────────────────
FROM node:lts-alpine3.24 AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# ───────────────────────────────────────────────────────────────
# Runtime stage – keep only the compiled output + prod deps
# ───────────────────────────────────────────────────────────────
FROM node:lts-alpine3.24

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/package.json ./

RUN npm ci --production

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:3000/health || exit 1

# 7. Default entrypoint
CMD ["node", "dist/server.js"]

