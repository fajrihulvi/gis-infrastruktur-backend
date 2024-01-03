# Set the base image to node:14-alpine
FROM node:18.19.0-alpine as base
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node

FROM base as deps
COPY --chown=node:node ./package*.json ./
RUN npm install
COPY --chown=node:node . .

# ENV ENV_PATH=/home/node/app/.env
ENV NODE_ENV="development"
ENV HOST=0.0.0.0
EXPOSE $PORT

RUN chmod +x /home/node/app/docker/dev/entrypoint.sh
ENTRYPOINT ["/home/node/app/docker/dev/entrypoint.sh"]
