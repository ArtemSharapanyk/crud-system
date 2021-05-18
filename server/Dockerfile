FROM node:14
WORKDIR /server

COPY package*.json /server/
RUN npm install 

COPY . /server/
EXPOSE 5000

CMD ["npm", "run", "backend"]