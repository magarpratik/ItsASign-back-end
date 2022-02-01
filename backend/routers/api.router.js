const apiRouter = require('express').Router();

const usersRouter = require('./users.router');

const coursesRouter = require('./lessons.router');
const { SignIn } = require('../controllers/users.controller');

apiRouter.use('/users', usersRouter);
apiRouter.use('/courses', coursesRouter);
apiRouter.get('/sign_in/', SignIn);

module.exports = apiRouter;
