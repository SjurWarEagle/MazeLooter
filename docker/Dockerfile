FROM node:15.3.0-stretch
RUN mkdir -p /project/

RUN apt update -y && \
    apt install -y --no-install-recommends --no-install-suggests \
    nginx \
    ca-certificates &&\
    rm -rf /var/cache/apt/ &&\
    rm -rf /var/lib/apt/lists/*

WORKDIR /project
RUN git clone https://github.com/SjurWarEagle/MazeLooter .
RUN npm install --no-audi && \
    npm run build


ADD docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/apt/apt.conf.d/90nginx


EXPOSE 90

STOPSIGNAL SIGTERM

ADD docker/start.sh /
RUN chmod +x /start.sh

CMD ["/start.sh"]
