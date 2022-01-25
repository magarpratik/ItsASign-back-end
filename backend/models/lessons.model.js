const mongoose = require("mongoose");

const { Schema } = mongoose;

const coursesSchema = new Schema(
  {
    topic: { type: String, required: true },
    questions: { type: Object, required: true },

    letters: { type: Object },
    correct: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Courses = mongoose.model("Courses", coursesSchema);
// converting the raw table into a workable model
// with model(<name>, <schemaUsed>)

module.exports = { Courses };
