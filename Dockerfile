FROM node:20.14.0-slim

WORKDIR /home/node/app-concert

RUN npm install -g @nestjs/cli@11

EXPOSE 3838

CMD ["tail", "-f", "/dev/null"]
