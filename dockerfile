FROM node:18-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]

RUN yarn add mongodb

RUN yarn global add prisma

ENV PRISMA_SCHEMA=/app/prisma/schema.prisma

RUN prisma generate

RUN prisma db push

ENV DATABASE_URL=$DATABASE_URL
