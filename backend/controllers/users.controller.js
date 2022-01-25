const { Users } = require("../models/users.model");

exports.getUsers = (req, res) => {
    Users.find()
        .sort("createdAt")
        .then((users) => {
            res.status(200).send({ users });
        })
        .catch((err) => {
            res.status(400).send(
                `There was an error with loading Users. ${err}`
            );
        });
};
