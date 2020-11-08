const { Router } = require("express");
const { ChatroomMessages } = require("../models");
const auth = require("../middleware/auth");
const router = new Router();

router.get("/messages/:roomId", auth, async (request, response) => {
  console.log("fetching messages", request.params.roomId);
  /*   const messages = await ChatroomMessages.findAll();
    response.status(201).json(messages); */
  response.status(201).json({ roomId: request.params.roomId });
});

router.post("/messages/:roomId", auth, async (request, response) => {
  console.log("posting a message", request.params.roomId);

  const chatRoomMessage = await ChatroomMessages.create({
    roomId: request.params.roomId,
    userId: request.userId,
    message: "hello",
  });
  console.log("the new message", chatRoomMessage);
});

module.exports = router;
