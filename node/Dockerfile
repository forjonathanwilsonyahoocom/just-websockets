# ───────────────────────────────────────────────────────────────
# 1️⃣ Builder stage – install dev deps & compile
# ───────────────────────────────────────────────────────────────
FROM node:lts-alpine3.24 AS builder

WORKDIR /app

# 1. Bring the lock‑file first → cache‑friendly
COPY package.json package-lock.json ./

# 2. Install *all* deps (dev + prod).  npm ci is deterministic.
RUN npm ci

# 3. Copy the whole source tree (TS, JS, assets, etc.)
COPY . .

# 4. Run the user‑defined build step
#    (change the script name if you use a different one)
RUN npm run build

# ───────────────────────────────────────────────────────────────
# 2️⃣ Runtime stage – keep only the compiled output + prod deps
# ───────────────────────────────────────────────────────────────
FROM node:lts-alpine3.24

# 1. Where the app lives inside the container
WORKDIR /app

# 2. Copy only the compiled artefacts
COPY --from=builder /app/dist ./dist

# 3. Bring the package files so we can install prod deps
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# 4. Install only production dependencies
#    (no devDependencies, no build tools)
RUN npm ci --production

# 5. Expose the port your app uses
EXPOSE 3000

# 6. Optional – a very lightweight health‑check
HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:3000/health || exit 1

# 7. Default entrypoint
CMD ["node", "dist/server.js"]

