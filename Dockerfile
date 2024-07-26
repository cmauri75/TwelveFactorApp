FROM node:20.16-bookworm-slim

WORKDIR /usr/src/app

RUN npm install -g npm@8.5.0

COPY package*.json ./
RUN yarn

COPY ./server.js /usr/src/app/server.js
COPY ./models /usr/src/app/models
COPY ./routes /usr/src/app/routes

ENV MONGO_HOST=localhost
ENV MONGO_PORT=27017
ENV MONGO_DB=twelvefactor
ENV PORT=3000

CMD ["yarn","start"]