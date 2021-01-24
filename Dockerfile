# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./
EXPOSE 8080

CMD [ "npm", "start" ]
