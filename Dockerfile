FROM node:10.13-alpine

ENV NODE_ENV development

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY ["tsconfig.json", ".eslintrc.json", "./"]
COPY scripts ./scripts
COPY src ./src

RUN npm run build && cp ./src/config/*.json ./dist/config/

ENV NODE_ENV production

RUN npm prune

RUN rm -rf ./src

# The official node image provides an unprivileged user as a security best practice
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node

CMD node ./dist/web/server.js