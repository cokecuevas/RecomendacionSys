    FROM python:3.6-alpine
    
    WORKDIR /src
    RUN apk add --no-cache \
        ca-certificates \
        make \
        nano \
        git \
        gcc \
        musl-dev \
        openssl \
        libressl-dev \
        libffi-dev \
        go
    COPY requirements.txt requirements.txt
    RUN pip3 install -r requirements.txt
    COPY . .
    COPY boot.sh ./
    RUN chmod +x boot.sh
    EXPOSE 5090
    ENTRYPOINT ["./boot.sh"]
