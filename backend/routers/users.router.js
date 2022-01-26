const express = require("express");

const usersRouter = express.Router();
const {
    getUsers,
    getUser,
    getUserProgress,
} = require("../controllers/users.controller");

usersRouter.get("/", getUsers);
usersRouter.route("/:username").get(getUser);
usersRouter.route("/:username/progress").get(getUserProgress);

module.exports = usersRouter;
