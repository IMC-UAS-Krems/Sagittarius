FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install -g @vue/cli

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8081

RUN ["npm", "run", "build"]