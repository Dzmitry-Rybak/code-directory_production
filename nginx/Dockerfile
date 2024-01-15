FROM nginx:1.15-alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/* 

# Установка пакетов, включая более новую версию OpenSSL
RUN apk --no-cache add openssl

COPY ./nginx.conf /etc/nginx/

# Expose the listening port
EXPOSE 80
EXPOSE 443

# for test!
# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]