FROM node:20.14.0-slim

RUN npm install -g @nestjs/cli@11

USER node

WORKDIR /home/node/app-concert


CMD ["tail", "-f", "/dev/null"]