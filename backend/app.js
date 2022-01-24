require("./connection");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "hello" });
});

app.get("/lessons", (req, res) => {
  res.send({ res });
});

module.exports = app;
