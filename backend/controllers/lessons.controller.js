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
  Courses.find({ course_topic: course_topic })
    .sort({ createdAt: -1 })
    .then((courses) => {
      res.status(200).send({ courses });
    })
    .catch((err) => {
      res.status(400).send(`There was an error with loading Courses. ${err}`);
    });
};
exports.getLessons_by_topic = (req, res) => {
  const { course_topic, lesson_number } = req.params;
  Courses.find({ course_topic: course_topic, lesson_number: lesson_number })
    .sort({ createdAt: -1 })
    .then((courses) => {
      res.status(200).send(courses[0].questions);
    })
    .catch((err) => {
      res.status(400).send(`There was an error with loading questions. ${err}`);
    });
};
