FROM node:slim
LABEL maintainer="Gizzal"
RUN npm install nodemon -g
COPY ./ /service
COPY ./entrypoint.sh /
WORKDIR /service
RUN npm install
RUN ["chmod", "+x", "/entrypoint.sh"]
CMD ["bash", "/entrypoint.sh"]