FROM node:10

# setting node to be on production
ENV NODE_ENV production

# create app directory
WORKDIR /app

# install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "dist/src/index.js" ]
