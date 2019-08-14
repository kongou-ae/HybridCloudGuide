FROM nginx:latest

RUN apt-get update && \
    apt-get install wget -y && \
    apt-get install unzip -y && \
    wget http://vivliostyle.github.io/vivliostyle.js/downloads/vivliostyle-js-latest.zip && \
    unzip vivliostyle-js-latest.zip && \
    rm vivliostyle-js-latest.zip && \
    mv vivliostyle-* vivliostyle && \
    mv vivliostyle /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]