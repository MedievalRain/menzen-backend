
FROM node:slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run schema

EXPOSE 8000

# Command to run the app
CMD ["node", "dist/app.js"]