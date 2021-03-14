# Cook 
FROM node:lts-alpine AS builder

ARG VUE_APP_NAME=frontin
ARG BASE_URL=/
ARG VUE_APP_CLIENT_URL=http://localhost
ARG VUE_APP_SERVER_URL=http://localhost
ARG VUE_APP_ROOT_API=/api
ARG VUE_APP_LOGGER_LEVEL=2
ARG VUE_APP_GIT_LINK=https://github.com/getlarge/frontin/
ARG VUE_APP_GIT_COMPONENTS_PATH=tree/master/src/components
ARG VUE_APP_DOMAIN=getlarge.eu
ARG VUE_APP_PHONE=

WORKDIR /app
COPY . .

RUN npm install && npm run build

# Serve
FROM nginx:alpine

ENV PROXY_HTTP_SERVER_PORT=80
ENV PROXY_HTTPS_SERVER_PORT=443
ENV PROXY_SERVER_HOST=localhost
ENV PROXY_DOMAIN=localhost

RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir -p /var/www/app
RUN mkdir -p /var/www/certbot
RUN mkdir /etc/letsencrypt

COPY --from=builder /app/dist /var/www/app
COPY --from=builder /app/public /var/www/app

CMD envsubst ',$$PROXY_HTTP_SERVER_PORT,$$PROXY_HTTPS_SERVER_PORT,\
  $$PROXY_SERVER_HOST,$$PROXY_DOMAIN,$$PROXY_EXTENSION' < /etc/nginx/nginx.template > /etc/nginx/nginx.conf ; \
  while :; do sleep 6h & wait ${!}; nginx -s reload; done & nginx -g 'daemon off;'