const apiRouter = require("express").Router();

const usersRouter = require("./users.router");
const coursesRouter = require(`./lessons.router`);

apiRouter.use("/users", usersRouter);
apiRouter.use(`/courses`, coursesRouter);

module.exports = apiRouter;
