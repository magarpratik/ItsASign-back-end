/* eslint-disable camelcase */
const express = require("express");

const coursesRouter = express.Router();
const {
  getCourses,
  getCourse_by_topic,
  getLessons_by_topic,
  getQuestion,
  getAnswers,
} = require("../controllers/lessons.controller");

coursesRouter.get("/", getCourses);
coursesRouter.route("/:course_topic").get(getCourse_by_topic);
coursesRouter.route("/:course_topic/:lesson_number").get(getLessons_by_topic);
coursesRouter
  .route("/:course_topic/:lesson_number/:index/question")
  .get(getQuestion);
coursesRouter
  .route("/:course_topic/:lesson_number/:index/answers")
  .get(getAnswers);

module.exports = coursesRouter;
