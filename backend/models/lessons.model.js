const mongoose = require('mongoose');

const { Schema } = mongoose;

const lessonSchema = new Schema(
  {
    course_topic_alphabet: { type: Object, required: true },
    course_topic_greetings: { type: Object, required: true },
  },
  {
    timestamps: true,
  },
);

const Lessons = mongoose.model('Lessons', lessonSchema);
// converting the raw table into a workable model
// with model(<name>, <schemaUsed>)

module.exports = { Lessons };
