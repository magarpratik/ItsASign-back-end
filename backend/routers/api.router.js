const apiRouter = require("express").Router();

const usersRouter = require("./users.router.js");

apiRouter.use("/users", usersRouter);
module.exports = apiRouter;
