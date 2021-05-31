FROM nginx:stable-alpine

COPY ./Dane-Proxy/dist /var/www/rooms
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]