const express = require('express');

const lessonsRouter = express.Router();
const { getLessons } = require('../controllers/lessons.controller');

lessonsRouter.get('/', getLessons);

module.exports = lessonsRouter;
