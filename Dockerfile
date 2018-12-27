FROM node:11.3.0 AS builder
COPY package.json /app/
WORKDIR /app/
RUN ["yarn", "install"]
COPY src /app/src
COPY public /app/public
RUN ["yarn", "run", "build"]

#todo: use nginx alpine
FROM nginx:alpine AS production
COPY --from=builder /app/build/ /usr/share/nginx/html/
EXPOSE 80
