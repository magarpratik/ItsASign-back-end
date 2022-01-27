const mongoose = require('mongoose');

const { Schema } = mongoose;

const coursesSchema = new Schema(
  {
    course_topic: { type: String, required: true },
    lesson_number: { type: Number, required: true },
    questions: [
      {
        question: { type: String, required: true },
        answers: {
          _id: false,
          a: {
            answer: { type: String, required: true },
            correct: { type: Boolean, required: true },
          },
          b: {
            answer: { type: String, required: true },
            correct: { type: Boolean, required: true },
          },
          c: {
            answer: { type: String, required: true },
            correct: { type: Boolean, required: true },
          },
          d: {
            answer: { type: String, required: true },
            correct: { type: Boolean, required: true },
          },
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Courses = mongoose.model('Courses', coursesSchema);
// converting the raw table into a workable model
// with model(<name>, <schemaUsed>)

module.exports = { Courses };
