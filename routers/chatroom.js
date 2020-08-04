const { Router } = require("express");
const { ChatRoom, User } = require("../models");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const router = new Router();

router.post("/message", auth, async (req, response) => {
  const user = await User.findOne({ where: { id: req.userId } });

  const createNewMessage = await ChatRoom.create({
    email: user.dataValues.email,
    message: req.body.newMessage.message,
  });

  /*   request.io.on("connection", (socket) => {
    console.log("connected: ", socket.userId);
    socket.on("chatmessage", (event) => {
      console.log("server chat message", event);
      event.id = createNewMessage.dataValues.id;
      request.io.emit("chatmessage", event);
    });

    socket.on("disconnect", () => {
      console.log("user has disconnected", socket.userId);
    });
  }); */
  response.status(201).json(createNewMessage);
});

router.get("/messages", auth, async (req, response) => {
  const messages = await ChatRoom.findAll();
  response.status(201).json(messages);
  console.log("all messages", messages[0]);
});

module.exports = router;
