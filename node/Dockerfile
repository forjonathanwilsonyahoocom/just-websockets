FROM node:lts-alpine3.24 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src ./src


FROM node:lts-alpine3.24

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/src ./src

EXPOSE 3000

CMD ["node", "src/server.js"]
