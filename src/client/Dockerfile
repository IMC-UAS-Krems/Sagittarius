FROM node:latest

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

EXPOSE 8081

RUN ["npm", "run", "build"]