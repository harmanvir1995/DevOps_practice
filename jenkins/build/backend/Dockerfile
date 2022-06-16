FROM strapi/strapi

WORKDIR /src/app

COPY  ./clone-bitbucket-remote_host-container/package*.json /src/app/

RUN npm install

COPY ./clone-bitbucket-remote_host-container /src/app/

EXPOSE 1337

CMD ["npm", "start"]
