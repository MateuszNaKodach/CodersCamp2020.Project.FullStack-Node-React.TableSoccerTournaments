FROM nikolaik/python-nodejs

WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "sh", "-c", "node ./dist/index.js" ]
