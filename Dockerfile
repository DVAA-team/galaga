# build stage
FROM node:lts-alpine as production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --include=dev --ignore-scripts

COPY . .

RUN npm run build

