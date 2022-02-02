/* eslint-disable */
const Joi = require("joi");
const { Users, hashPassword } = require("../models/users.model");
const bcrypt = require("bcrypt");
exports.getUsers = (req, res) => {
  Users.find()
    .sort("createdAt")
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      res.status(400).send(`There was an error with loading Users. ${err}`);
    });
};

exports.getUser = (req, res) => {
  const { username } = req.params;
  Users.find({ username })
    .then((userArray) => {
      if (userArray[0]) {
        const user = userArray[0];
        res.status(200).send({ user });
      } else {
        res.status(400).send({ message: "User does not exist" });
      }
    })
    .catch((err) => {
      res.status(400).send(`There was an error with loading Users. ${err}`);
    });
};

exports.deleteUser = (req, res) => {
  const { username } = req.params;
  Users.deleteOne({ username }).then((result) => {
    res.status(200).send(result);
  });
};

exports.getUserProgress = (req, res) => {
  const { username } = req.params;
  Users.find({ username })
    .then((userArray) => {
      const { progress } = userArray[0];
      res.status(200).send({ progress });
    })
    .catch((err) => {
      res.status(400).send(`There was an error with loading Users. ${err}`);
    });
};

exports.patchUserDetails = (req, res) => {
  const { username } = req.params;
  const { email, password, progress, picture } = req.body;

  if (email) {
    Users.updateOne({ username }, { email }).then((result) => {
      res.status(201).send({ updated: result.modifiedCount });
    });
  } else if (password) {
    Users.updateOne({ username }, { password }).then((result) => {
      res.status(201).send({ updated: result.modifiedCount });
    });
  } else if (progress) {
    Users.updateOne({ username }, { progress }).then((result) => {
      res.status(201).send({ updated: result.modifiedCount });
    });
  }
};

exports.getRankedUsers = (req, res) => {
  Users.find()
    .sort({ "progress.total_xp": -1 })
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      res.status(400).send(`There was an error with loading Users. ${err}`);
    });
};

// Validate user schema
const userSchema = Joi.object().keys({
  username: Joi.string().required().min(4),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required().min(4),
  name: Joi.string().required().min(2),
});
exports.Signup = async (req, res) => {
  try {
    const result = userSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.json({
        error: true,
        status: 400,
        message: result.error.message,
      });
    }
    // Check if the email has been already registered.
    const user = await Users.findOne({
      email: result.value.email,
    });
    if (user) {
      return res.json({
        error: true,
        message: "Email is already in use",
      });
    }
    // Check if the username is unique.
    await Users.findOne({
      username: result.value.username,
    });
    if (user) {
      return res.json({
        error: true,
        message: `${user.username} is already in use`,
      });
    }

    result.value.password = await hashPassword(result.value.password);

    const newUser = new Users(result.value);

    await newUser.save();
    console.log(newUser);

    return res.status(200).json({
      success: true,
      message: "Registration Success",
    });
  } catch (error) {
    // console.error("signup-error", error);
    return res.status(400).json({
      success: false,
      error: error,
      message: "Cannot Register",
    });
  }
};

//SING IN//
const inputSchema = Joi.object().keys({
  username: Joi.string().required().min(4),
  password: Joi.string().required().min(4),
});

exports.SignIn = (req, res) => {
  const { username, password } = req.query;
  const result = inputSchema.validate(req.query);

  if (result.error) {
    return res.json({
      error: true,
      successful: false,
      status: 400,
      message: result.error.message,
    });
  } else {
    Users.findOne({ username }).then((user) => {
      if (!user) {
        return res.status(404).send({
          successful: false,
          message: "User does not exist",
        });
      } else {
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === false) {
            return res.status(401).send({
              successful: false,
              message: "Wrong password",
            });
          } else if (result === true) {
            return res.status(200).send({
              successful: true,
              username: user.username,
            });
          } else
            return res.status(400).send({
              successful: false,
              message: "there was an error signing in",
            });
        });
      }
    });
  }
};
