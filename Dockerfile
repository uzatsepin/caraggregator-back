# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# Install dependencies with yarn
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# Install production dependencies
RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3002

CMD ["node", "dist/app.js"]