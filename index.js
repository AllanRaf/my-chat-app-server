const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;
const userRouter = require("./routers/user");
const chatRoomRouter = require("./routers/chatroom");
const authRouter = require("./routers/auth");
const http = require("http");
const { toData } = require("./util/jwt");

const jsonParser = bodyParser.json();

const app = express();
/* const server = http.Server(app);
const io = require("socket.io")(server); */

app
  .use(cors())
  .use(jsonParser)
  /*   .use(function (request, response, next) {
    request.io = io;
    next();
  }) */
  .use(authRouter)
  .use(userRouter)
  .use(chatRoomRouter);

/* io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const data = toData(token);
    socket.userId = data.userId;
    console.log("auth 1");
    next();
  } catch (err) {
    console.log("something went wrong");
  }
}); */

/* io.on("connection", (socket) => {
  console.log("connected: ", socket.userId);
  socket.on("chatmessage", (event) => {
    console.log("server chat message", event);
    io.emit("chatmessage", event);
  });

  socket.on("disconnect", () => {
    console.log("user has disconnected", socket.userId);
  });
}); */

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
