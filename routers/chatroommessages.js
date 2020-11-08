const { Router } = require("express");
const { ChatroomMessages, User } = require("../models");
const auth = require("../middleware/auth");
const router = new Router();

router.get("/messages/:roomId", auth, async (request, response) => {
  console.log("fetching messages", request.params.roomId);

  response.status(201).json({ roomId: request.params.roomId });
});

router.post("/messages/:roomId", auth, async (request, response) => {
  const chatRoomMessage = await ChatroomMessages.create({
    roomId: request.params.roomId,
    userId: request.userId,
    message: request.body.messageToSend,
  });
  //find the username of the person who sent the message

  const user = await User.findOne({ where: { id: request.userId } });
  console.log("user found is", user);

  let event = {};
  event.roomName = request.body.roomName;
  event.username = user.dataValues.username;
  event.message = request.body.messageToSend;
  event.messageId = chatRoomMessage.dataValues.id;

  request.io.emit(request.body.roomName, event);

  response.status(201).json({ chatRoomMessage });
});

module.exports = router;
