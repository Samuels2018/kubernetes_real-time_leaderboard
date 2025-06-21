FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i --omit=dev

EXPOSE 3000

CMD ["npm", "dist/index.js"]