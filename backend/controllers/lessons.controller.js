const { Lessons } = require('../models/lessons.model');

exports.getLessons = (req, res) => {
  Lessons.find()
    .sort({ createdAt: -1 })
    .then((lessons) => {
      res.status(200).send({ lessons });
    })
    .catch((err) => {
      res.status(400).send(
        `There was an error with loading Lessons. ${err}`,
      );
    });
};
