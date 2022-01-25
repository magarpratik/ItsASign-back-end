const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: Object, required: true },
    picture: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const Users = mongoose.model('User', userSchema);
// converting the raw table into a workable model
// with model(<name>, <schemaUsed>)

module.exports = { Users };
