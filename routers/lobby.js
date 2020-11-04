const { Router } = require("express");
const { ChatRoom, User } = require("../models");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const router = new Router();
