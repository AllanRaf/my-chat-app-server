const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const userRouter = require("./routers/user");
const chatRoomRouter = require("./routers/chatroom");
const authRouter = require("./routers/auth");

const secret =
  process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m";

const jsonParser = bodyParser.json();

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";

const app = express();
app
  .use(cors())
  .use(jsonParser)
  .use(authRouter)
  .use(userRouter)
  .use(chatRoomRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
