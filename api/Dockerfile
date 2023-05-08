FROM node:alpine

WORKDIR /app

COPY . .

COPY .env .

RUN npm install

RUN npx prisma generate
