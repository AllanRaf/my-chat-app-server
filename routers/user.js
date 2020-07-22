const { Router } = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const router = new Router();

router.get("/user", (req, res, next) => {
  res.send({
    message: "success",
  });
});

router.post("/user", (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((userRes) => {
      if (userRes) {
        console.log(`User ${req.body.email} already exists`);
        res.status(400).send({
          message: "user already exists",
        });
      } else {
        User.create({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10), // 10 salt is the salt
        }).then((user) => res.status(201).json(user));
      }
    })
    .catch(next);
});

module.exports = router;
