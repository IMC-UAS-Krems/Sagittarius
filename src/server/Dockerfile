FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Prisma generate
RUN npx prisma db pull

RUN npx prisma generate

EXPOSE 8080

CMD ["npm", "run", "start"]