const express = require('express');

const usersRouter = express.Router();
const {
  getUsers,
  getUser,
  getUserProgress,
  patchUserDetails,
} = require('../controllers/users.controller');

usersRouter.get('/', getUsers);
usersRouter.route('/:username').get(getUser).patch(patchUserDetails);
usersRouter.route('/:username/progress').get(getUserProgress);

const cleanBody = require('../signInUser/helpers/middleware');
const AuthController = require('../controllers/users.controller');
// Define endpoints
usersRouter.post('/signup', cleanBody, AuthController.Signup);

module.exports = usersRouter;
