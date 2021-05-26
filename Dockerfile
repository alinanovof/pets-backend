FROM node:14-alpine

WORKDIR /usr/api

COPY ./ ./

RUN npm ci

EXPOSE 8080

ENTRYPOINT ["npm"]
CMD ["start"]