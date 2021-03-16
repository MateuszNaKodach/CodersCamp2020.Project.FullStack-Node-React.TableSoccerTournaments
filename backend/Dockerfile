FROM nikolaik/python-nodejs

ARG PORT=5000
ENV REST_API_PORT=${PORT}

WORKDIR /app/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENTRYPOINT node ./dist/index
