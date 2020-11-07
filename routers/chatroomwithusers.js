const { Router } = require("express");
const { ChatroomWithUsers } = require("../models");
const auth = require("../middleware/auth");
const router = new Router();

router.post("/joinroom", auth, async (request, response) => {
  console.log("joining this room");
  try {
    const { userId } = request;
    console.log("userId", userId);

    const joinRoom = ChatroomWithUsers.create({
      userId,
      roomId: request.body.roomId,
    });

    response.status.json(joinRoom);
  } catch {
    console.log("something went wrong with joining room");
  }
});

module.exports = router;
