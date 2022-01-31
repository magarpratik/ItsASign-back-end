const express = require('express');
const cleanBody = require('../signInUser/helpers/middleware');
const AuthController = require('../controllers/users.controller');

const usersRouter = express.Router();
const {
  getUsers,
  getUser,
  deleteUser,
  getUserProgress,
  patchUserDetails,
  SignIn,
} = require('../controllers/users.controller');

usersRouter.get('/', getUsers);
usersRouter
  .route('/:username')
  .get(getUser)
  .patch(patchUserDetails)
  .delete(deleteUser);
usersRouter.route('/:username/progress').get(getUserProgress);
usersRouter.post('/signup', cleanBody, AuthController.Signup);
usersRouter.post('/sign_in', SignIn);

module.exports = usersRouter;
