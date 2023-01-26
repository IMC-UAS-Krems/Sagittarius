# BUILD STAGE
FROM node:latest as build-stage

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install -g @vue/cli

RUN npm install https://github.com/IMC-UAS-Krems/Sagittarius-Server

RUN npm install

# Bundle app source
COPY . .

# Prisma generate
RUN npx prisma db pull --schema ./node_modules/sagittarius-server/prisma/schema.prisma

RUN npx prisma generate --schema ./node_modules/sagittarius-server/prisma/schema.prisma

RUN npm run build

# PRODUCTION STAGE
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage usr/src/app/dist /usr/share/nginx/html

EXPOSE 8081

CMD ["nginx", "-g", "daemon off;"]