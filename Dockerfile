FROM node:10.15.0-alpine as builder
RUN npm install -g yarn

WORKDIR /app

# copy dependencies stuff
COPY package.json ./
COPY yarn.lock ./

# package.json for every package
COPY packages/client/package.json ./packages/client/package.json
COPY packages/server/package.json ./packages/server/package.json

# run install on root dir for all workspaces
RUN yarn install

# Bundle app source
COPY . .


# === web stage ===
FROM builder as web
WORKDIR /app

EXPOSE 3000
CMD /bin/sh -c "cd packages/client && yarn dev"


# === api stage ===
FROM builder as api
WORKDIR /app

RUN chmod +x ./scripts/wait-for.sh

EXPOSE 4100
CMD ./scripts/wait-for.sh db:5432 -- /bin/sh -c "cd packages/server && yarn dev"
