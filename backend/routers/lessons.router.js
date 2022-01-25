const express = require("express");

const coursesRouter = express.Router();
const { getCourses } = require("../controllers/lessons.controller");

coursesRouter.get("/", getCourses);

module.exports = coursesRouter;
