const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    picture: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: Number, required: true },
    progress: {
      completed_lessons: { type: Array },
      total_xp: { type: Number },
      badges: { type: Array },
    },
  },
  {
    timestamps: true,
  },
);

const Users = mongoose.model('User', userSchema);
// converting the raw table into a workable model
// with model(<name>, <schemaUsed>)

module.exports = { Users };
