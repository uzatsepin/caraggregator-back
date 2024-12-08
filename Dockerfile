# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Устанавливаем все зависимости, включая devDependencies
RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3002

CMD ["node", "dist/app.js"]