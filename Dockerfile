FROM node:12

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

EXPOSE 3001

COPY . .

CMD ["node", "server/server.js"]