const { Router } = require("express");
const { ChatRoom, User } = require("../models");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const router = new Router();

router.post("/message", auth, async (request, response) => {
  try {
    const user = await User.findOne({ where: { id: request.userId } });
    request.io.on("connection", (socket) => {
      console.log("connected: ", socket);
      socket.on("chatmessage", (event) => {
        console.log("server chat message", event);
        event.id = createNewMessage.dataValues.id;
        event.username = user.dataValues.email;
        request.io.emit("chatmessage", event);
      });

      socket.on("disconnect", () => {
        console.log("user has disconnected", socket.userId);
      });
    });

    const createNewMessage = await ChatRoom.create({
      username: user.dataValues.email,
      message: request.body.newMessage.message,
    });

    response.status(201).json(createNewMessage);
  } catch (err) {
    console.log("Chat route error", err);
  }
});

router.get("/messages", auth, async (req, response) => {
  const messages = await ChatRoom.findAll();
  response.status(201).json(messages);
});

module.exports = router;
