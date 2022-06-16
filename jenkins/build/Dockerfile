
FROM node:10-alpine

RUN mkdir /app

WORKDIR /app

COPY ./clone-bitbucket-remote_host-container/package*.json /app

RUN npm install

COPY ./clone-bitbucket-remote_host-container/ /app

EXPOSE 3000

CMD ["npm", "start"]
