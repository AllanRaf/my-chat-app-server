const { Router } = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { toJWT } = require("../util/jwt");
const router = new Router();

//let a user log in
router.post("/login", (req, res, next) => {
  if (!req.body) {
    res.status(400).send({
      message: "Please supply a valid email and password",
    });
  } else {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((entity) => {
        if (!entity) {
          res.status(400).send({
            message: "User with that email does not exist",
          });
        } else if (bcrypt.compareSync(req.body.password, entity.password)) {
          // 3. if the password is correct, return a JWT with the userId of the user (user.id)
          res.send({
            jwt: toJWT({ userId: entity.id }),
            name: entity.dataValues.username,
            user_id: entity.dataValues.id,
            //name: toJWT({ })
            //include username and user id here
          });
        } else {
          res.status(400).send({
            message: "Password was incorrect",
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send({
          message: "Something went wrong",
        });
      });
  }
});

module.exports = router;
