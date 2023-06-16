FROM node:14
LABEL version="1.0"
LABEL description="Webserver for Barracas"
LABEL authors="brunocosta"

WORKDIR /usr/src/barracas



COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD [ "node", "bin/www" ]
