/* eslint-disable camelcase */
const { Courses } = require("../models/lessons.model");

exports.getCourses = (req, res) => {
  Courses.find()
    .sort({ createdAt: -1 })
    .then((courses) => {
      res.status(200).send({ courses });
    })
    .catch((err) => {
      res.status(400).send(`There was an error with loading Courses. ${err}`);
    });
};

exports.getCourse_by_topic = (req, res) => {
  const { course_topic } = req.params;
  Courses.find({ course_topic })
    .then((courses) => {
      res.status(200).send({ courses });
    })
    .catch((err) => {
      res.status(400).send(`There was an error with loading Courses. ${err}`);
    });
};
exports.getLessons_by_topic = (req, res) => {
  const { course_topic, lesson_number } = req.params;
  console.log("course_topic", course_topic);
  Courses.find({ course_topic, lesson_number })
    .then((courses) => {
      res.status(200).send({ questions: courses[0].questions });
    })
    .catch((err) => {
      res.status(400).send(`There was an error with loading questions. ${err}`);
    });
};

exports.getQuestion = (req, res) => {
  const { course_topic, lesson_number, index } = req.params;
  Courses.find({ course_topic, lesson_number })
    .then((course) => {
      res.status(200).send({ question: course[0].questions[index].question });
    })
    .catch((err) => {
      res.status(400).send(`There was an error with loading question. ${err}`);
    });
};

exports.getAnswers = (req, res) => {
  const { course_topic, lesson_number, index } = req.params;
  Courses.find({ course_topic, lesson_number })
    .then((course) => {
      res.status(200).send({ answers: course[0].questions[index].answers });
    })
    .catch((err) => {
      res
        .status(400)
        .send(`There was an error with loading the answers. ${err}`);
    });
};
