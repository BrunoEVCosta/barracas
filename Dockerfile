FROM node:14
LABEL version="1.0"
LABEL description="Webserver for Barracas"
LABEL authors="brunocosta"

WORKDIR /usr/src/barracas



COPY package*.json ./

RUN npm install --production
#RUN npm install
## THIS copies the build as well
COPY . .

#RUN npm run build

EXPOSE 3000
#Used to change server
#ENV PORT=3035


CMD [ "node", "bin/www" ]
