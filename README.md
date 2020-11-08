## About my-chat-app-api

This project was created using express.js. It is connects to my-chat-app-api where users can post images and share them.

## Technologies used

- Node.js
- Express.js
- sequelize-cli
- authentication using jwt
- socket.io

## Installation

On your terminal run the following (excluding the \$):

1. \$ git clone https://github.com/AllanRaf/instaimage-server
2. Switch to the project directory
3. \$ yarn
4. For my example I used docker to run an instance of the database in a container (more information under www.docker.com) by running
   \$ docker run -p 5432:5432 --name chat -e POSTGRES_PASSWORD=secret -d postgres
5. \$ node index.js

The server runs on your local host (http://localhost:5000) in the browser. You may wish to change this.
