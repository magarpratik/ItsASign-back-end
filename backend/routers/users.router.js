const express = require("express");

const usersRouter = express.Router();
const { getUsers, getUser } = require("../controllers/users.controller");

usersRouter.get("/", getUsers);
usersRouter.route("/:username").get(getUser);

module.exports = usersRouter;
