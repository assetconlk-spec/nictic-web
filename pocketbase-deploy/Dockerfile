FROM alpine:latest

ARG PB_VERSION=0.37.5

RUN apk add --no-cache unzip wget ca-certificates

RUN wget https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip \
    && unzip pocketbase_${PB_VERSION}_linux_amd64.zip \
    && rm pocketbase_${PB_VERSION}_linux_amd64.zip \
    && chmod +x pocketbase

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8090

CMD ["/start.sh"]
