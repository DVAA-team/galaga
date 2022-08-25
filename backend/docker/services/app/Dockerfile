FROM node:16

WORKDIR /app

EXPOSE 80

COPY . .

RUN npm ci --ignore-scripts && \
    npm run build
