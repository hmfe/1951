FROM node:11.3.0 AS builder
COPY . /app/
WORKDIR /app/
RUN npm install && npm build

#todo: use nginx alpine
FROM sdelrio/docker-minimal-nginx AS production
COPY --from=builder /app/build/ /usr/share/nginx/html/
EXPOSE 8080