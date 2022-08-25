FROM node:16

WORKDIR /app

CMD ["npm", "i", "-g", "yarn"]

COPY ./package.json ./
RUN yarn
RUN mkdir client
COPY ./client/package.json ./client
RUN yarn --cwd client install
COPY . .

RUN ["yarn", "run", "client:build"]

ENV PORT 8080
ENV MONGO_URL mongodb://localhost:27017
ENV SECRET_JWT_KEY secret

EXPOSE $PORT

CMD ["yarn", "start"]
