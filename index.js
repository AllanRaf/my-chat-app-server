const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const port = 5000;

const secret =
  process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m";

function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

function toData(token) {
  return jwt.verify(token, secret);
}
const jsonParser = bodyParser.json();

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgres://postgres:secret@localhost:5432/postgres";

const app = express();
app.use(cors());
app.use(jsonParser);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const db = new Sequelize(databaseUrl);

const User = db.define(
  "user",
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

db.sync({ force: false })
  .then(() => console.log("database synced"))
  .catch((error) => console.log("got an error", error));

app.post("/user", (request, response, next) => {
  const password = bcrypt.hashSync(request.body.password, 10);

  const user = { ...request.body, password };

  User.create(user)
    .then((user) => response.send(user))
    .catch(next);
});
