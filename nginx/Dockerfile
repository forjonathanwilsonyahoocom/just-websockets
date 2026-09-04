FROM nginx:alpine

COPY favicon.ico /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

#make invalid self signed cert to use for any scanner traffic
RUN apk add --no-cache openssl \
    && mkdir -p /etc/ssl_sink/certs/sink \
    && openssl req -x509 -nodes -newkey rsa:2048 \
         -days 3650 \
         -keyout /etc/ssl_sink/certs/sink/privkey.pem \
         -out /etc/ssl_sink/certs/sink/fullchain.pem \
         -subj "/CN=invalid.local" \
    && chmod 600 /etc/ssl_sink/certs/sink/privkey.pem \
    && chmod 644 /etc/ssl_sink/certs/sink/fullchain.pem
    
CMD ["nginx", "-g", "daemon off;"]

