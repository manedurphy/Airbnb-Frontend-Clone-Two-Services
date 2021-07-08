FROM --platform=${BUILDPLATFORM} golang:1.16-alpine3.14 as builder

ARG TARGETARCH
ARG TARGETOS

WORKDIR /app

COPY ./ ./

ENV GIN_MODE=release
RUN CGO_ENABLED=0 GOOS=${TARGETOS} GOARCH=${TARGETARCH} go build -o get-data-api .

FROM alpine:3.14.0

WORKDIR /app

COPY --from=builder /app/get-data-api ./

CMD ["/app/get-data-api"]