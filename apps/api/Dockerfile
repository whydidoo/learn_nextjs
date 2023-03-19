FROM node

WORKDIR /usr/src/app

COPY package*.json .

COPY . .

RUN npm i -g ts-node
RUN yarn && yarn migration:create
