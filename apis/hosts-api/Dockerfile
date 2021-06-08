# FROM alpine:3.13.5
FROM ubuntu

WORKDIR /app

COPY ./hosts-api ./hosts-api

ENTRYPOINT ["/app/hosts-api", "--drop=true"]