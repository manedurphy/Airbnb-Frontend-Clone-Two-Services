FROM node:16-alpine3.13

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --production

COPY ./backend ./backend

CMD ["npm", "run", "server"]