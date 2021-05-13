#Each instruction in this file creates a new layer
#Here we are getting our node as Base image
FROM node:latest
#Creating a new directory for api-service files and setting path in the container
RUN mkdir -p /usr/src/app
# Update software and explicitly install nodesjs - TODO do we need this when building FROM latest?
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs
RUN echo "*** Node: " && node -v
RUN echo "*** NPM: " && npm -v
#setting working directory in the container
WORKDIR /usr/src/app
#copying the package.json file(contains dependencies) from project source dir to container dir
COPY package.json /usr/src/app
# installing the dependencies into the container
RUN npm install
#copying the source code of Application into the container dir
COPY . /usr/src/app
#container exposed network port number
EXPOSE 9000
#command to run within the container, MUST be double quotes
CMD ["npm", "start"]
