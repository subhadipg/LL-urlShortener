FROM node:6.3.0

WORKDIR /src
COPY package.json /src/package.json
RUN npm install
COPY . /src

CMD ["node", "server.js"]