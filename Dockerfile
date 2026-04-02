# use node 18 alpine image
FROM node:24-alpine AS builder

# create work directory in app folder
WORKDIR /app

# copy over package.json files
COPY package.json /app/

# install all depencies
# RUN npm ci && npm cache clean --force
RUN npm install

# copy over all files to the work directory
ADD . /app

ARG BACKEND_BASE_URL
ENV BACKEND_BASE_URL=$BACKEND_BASE_URL

# build the project
RUN npm run build

FROM node:24-alpine

# create work directory in app folder
WORKDIR /app

# copy over package.json files
COPY --from=builder .output .

ENTRYPOINT [ "node", "./output/server/index.mjs" ]