const mongoose = require("mongoose");
require("dotenv").config();

const { DB_PASS } = process.env;
const { URL } = process.env;
const { DB_USER } = process.env;

const options = {
    user: DB_USER,
    pass: DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose
    .connect(URL, options)
    .then(() => {
        console.log("database is connected");
    })
    .catch((err) => {
        console.log(err);
    });
