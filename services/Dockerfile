## SE GENERA EL FRONTD
FROM node:13.12.0-alpine as build-react

WORKDIR /app

COPY ./frontend/package.json ./

RUN npm i

COPY ./frontend ./

RUN npm run build

## SE GENERA EL BACKEND
FROM node:13.12.0-alpine as build-backend

WORKDIR /app

COPY ./backend/package.json ./

RUN npm install -g typescript

RUN npm i

COPY ./backend ./

RUN npm run build

##SE GENERA SERVICE
FROM node:13.12.0-alpine  as prod

RUN mkdir -p /app

WORKDIR /app

COPY ./backend/package.json .
COPY --from=build-backend /app/dist .
COPY --from=build-react /app/build ./public

ENV PORT=8080
ENV PGHOST=db
ENV PGUSER=admin
ENV PGDATABASE=prog_app
ENV PGPASSWORD=admin
ENV PGPORT=5432

EXPOSE 8080

RUN npm install 






