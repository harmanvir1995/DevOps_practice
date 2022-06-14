
FROM node:10-alpine

RUN mkdir /app

WORKDIR /app

COPY ./clone-bitbucket-remote_host-container/ /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
