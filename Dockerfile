FROM node:16

# set a directory for the app
WORKDIR /app

# copy package.json and package-lock.json to the app directory
COPY package.json .
COPY wait-for-it.sh .

# install dependencies
RUN chmod +x ./wait-for-it.sh; yarn

# copy all files to the app directory
COPY . ./

EXPOSE 6379
# tell the port number the container will be listening on
EXPOSE 3333
# run the app
CMD ["node", "index.js"]