FROM node:lts-alpine3.24 AS deps

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev


FROM node:lts-alpine3.24

WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY src ./src

EXPOSE 3000

CMD ["node", "src/server.js"]

