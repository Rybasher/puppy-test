FROM node:14.20

WORKDIR /usr/app

COPY package.json tsconfig.json ./

RUN yarn

COPY . ./

EXPOSE 3000

CMD ["yarn", "start"]