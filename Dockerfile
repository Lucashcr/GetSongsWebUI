# use node 18 alpine image
FROM node:20-alpine

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

# expose the host and port 3000 to the server
ENV HOST 0.0.0.0
EXPOSE 3000

# run the build project with node
CMD ["node", "./server/index.mjs"]