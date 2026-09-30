FROM nginx:1.28-alpine
RUN apk add --no-cache ca-certificates
COPY dist /usr/share/nginx/html
COPY deploy/nginx.conf.template /etc/nginx/templates/default.conf.template
ENV COLLECTOR_UPSTREAM=http://collector:8787
EXPOSE 80
