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
