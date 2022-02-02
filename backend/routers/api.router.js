const apiRouter = require("express").Router();

const usersRouter = require("./users.router");

const coursesRouter = require("./lessons.router");
const { SignIn, getRankedUsers } = require("../controllers/users.controller");
const res = require("express/lib/response");

apiRouter.use("/users", usersRouter);
apiRouter.use("/courses", coursesRouter);
apiRouter.get("/sign_in/", SignIn);
apiRouter.get("/ranked_users", getRankedUsers);
module.exports = apiRouter;
