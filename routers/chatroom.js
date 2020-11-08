const { Router } = require("express");
const { Chatroom, User } = require("../models");
const auth = require("../middleware/auth");
const router = new Router();

/* router.post("/message", auth, async (request, response) => {
  try {
    const user = await User.findOne({ where: { id: request.userId } });
        request.io.on("connection", (socket) => {
      socket.on("chatmessage", (event) => {
        console.log("server chat message", event);
    let event = { id: 0, username: "" };
    event.id = user.dataValues.id;
    event.username = user.dataValues.email;
    event.message = request.body.newMessage.message;
    request.io.emit("chatmessage", event);

           socket.on("disconnect", () => {
        console.log("user has disconnected", socket.userId);
      }); 
    });

    const createNewMessage = await Chatroom.create({
      username: user.dataValues.email,
      message: request.body.newMessage.message,
    });

    response.status(201).json(createNewMessage);
  } catch (err) {
    console.log("Chat route error", err);
  }
}); */

router.post("/chatroom", auth, async (request, response) => {
  try {
    const user = await User.findOne({ where: { id: request.userId } });
    let event = {};

    const createNewChatRoom = await Chatroom.create({
      roomName: request.body.roomName,
      createdBy: request.userId,
    });
    event.roomName = request.body.roomName;
    event.createdBy = user.dataValues.email;
    event.roomId = createNewChatRoom.dataValues.id;
    request.io.emit("chatrooms", event);

    response.status(201).json(createNewChatRoom);
  } catch (err) {
    console.log("Chat route error", err);
  }
});

/* router.get("/messages", auth, async (req, response) => {
  const messages = await ChatRoom.findAll();
  response.status(201).json(messages);
}); */

router.get("/chatrooms", auth, async (req, response) => {
  const chatRooms = await Chatroom.findAll({
    include: [{ model: User, attributes: ["username"] }],
  });
  response.status(201).json(chatRooms);
});

module.exports = router;
