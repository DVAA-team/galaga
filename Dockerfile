# build stage
FROM node:lts-alpine as production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --include=dev --ignore-scripts

COPY . .

RUN mkdir -p ~/app/.postgresql && \
wget "https://storage.yandexcloud.net/cloud-certs/CA.pem" -O ~/app/.postgresql/root.crt && \
chmod 0600 ~/app/.postgresql/root.crt && \
npm run build

CMD npm start
