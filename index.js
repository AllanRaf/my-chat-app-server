const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;
const userRouter = require("./routers/user");
const chatRoomRouter = require("./routers/chatroom");
const authRouter = require("./routers/auth");
const joinRoomRouter = require("./routers/chatroomwithusers");
const chatRoomMessagesRouter = require("./routers/chatroommessages");
const http = require("http");

const jsonParser = bodyParser.json();

const app = express();

const options = {
  cors: true,
  origins: "*,*",
}; // some legacy browsers (IE11, various SmartTVs) choke on 204

const server = http.Server(app.use(cors()));
const io = require("socket.io")(server);
io.set("origins", "*:*");

app
  .use(cors())
  .use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    next();
  })
  .use(jsonParser)
  .use(function (request, response, next) {
    request.io = io;
    next();
  })
  .use(authRouter)
  .use(userRouter)
  .use(chatRoomRouter)
  .use(joinRoomRouter)
  .use(chatRoomMessagesRouter);

io.on("connection", (socket) => {
  console.log("connected: ", socket);

  socket.on("disconnect", () => {
    console.log("user has disconnected", socket.userId);
  });
});

app.get("/", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for a Single Route" });
});
server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
