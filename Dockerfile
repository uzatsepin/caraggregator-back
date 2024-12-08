# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Обновленная команда установки
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Обновленная команда установки для production
RUN npm install --omit=dev --legacy-peer-deps

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Изменяем порт на 3002
EXPOSE 3002

CMD ["node", "dist/app.js"]