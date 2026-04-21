# build stage
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY public ./public
COPY package*.json ./
RUN npm install --omit=dev

CMD ["node", "dist/main.js"]