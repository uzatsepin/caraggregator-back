# Stage 1: Build
FROM node:18-alpine AS builder

# Установить рабочую директорию
WORKDIR /usr/src/app

# Копировать package.json и package-lock.json (если существует)
COPY package*.json ./

# Установить зависимости
RUN npm install

# Копировать исходный код
COPY . .

# Скомпилировать TypeScript в JavaScript
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

# Установить рабочую директорию
WORKDIR /usr/src/app

# Копировать package.json и package-lock.json
COPY package*.json ./

# Установить только production зависимости
RUN npm install --only=production

# Копировать скомпилированный код из предыдущего этапа
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# (Опционально) Копировать файл .env, если используется
# COPY .env ./

# Открыть необходимый порт (измените если требуется)
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "dist/app.js"]