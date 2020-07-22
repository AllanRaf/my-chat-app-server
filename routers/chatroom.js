const { Router } = require("express");
const { ChatRoom, User } = require("../models");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const router = new Router();

router.post("/message", auth, async (request, response) => {
  console.log("got a request on /message", request.body, request.userId);
  const user = await User.findOne({ where: { id: request.userId } });
  console.log("user found", user.dataValues.username);
  const createNewMessage = await ChatRoom.create({
    username: user.dataValues.username,
    message: request.body.newMessage.message,
  });
  response.status(201).json(createNewMessage);
});

router.get("/messages", auth, async (request, response) => {
  const messages = await ChatRoom.findAll();
  response.status(201).json(messages);
  console.log("all messages", messages[0]);
});

module.exports = router;
