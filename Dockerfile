FROM node:10.15.0-alpine as node_base


# === WEB deps stage ===
FROM node_base as web_deps
WORKDIR /app
COPY packages/client/package.json ./packages/client/package.json
COPY packages/client/yarn.lock ./packages/client/yarn.lock
WORKDIR /app/packages/client
RUN yarn install


# === web stage ===
FROM node_base as web
WORKDIR /app

COPY --from=web_deps /app/packages/client/node_modules /app/packages/client/node_modules
COPY . /app

EXPOSE 3000
CMD /bin/sh -c "cd packages/client && yarn dev"


# === SERVER deps stage ===
FROM node_base as server_deps
WORKDIR /app
COPY packages/server/package.json ./packages/server/package.json
COPY packages/server/yarn.lock ./packages/server/yarn.lock
WORKDIR /app/packages/server
RUN yarn install


# === api stage ===
FROM node_base as api
WORKDIR /app

COPY --from=server_deps /app/packages/server/node_modules /app/packages/server/node_modules
COPY . /app

RUN chmod +x ./scripts/wait-for.sh

EXPOSE 4100
CMD ./scripts/wait-for.sh db:5432 -- /bin/sh -c "cd packages/server && yarn dev"
