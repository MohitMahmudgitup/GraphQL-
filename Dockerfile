FROM node:18

WORKDIR /home/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "build/index.js"]