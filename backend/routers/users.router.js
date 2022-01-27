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

module.exports = usersRouter;
