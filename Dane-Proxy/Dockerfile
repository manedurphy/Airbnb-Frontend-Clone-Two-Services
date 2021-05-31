FROM node:16-alpine3.13

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "server"]