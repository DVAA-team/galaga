FROM node:16
WORKDIR /var/www
COPY package*.json .
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build
EXPOSE 3000
CMD npm start
