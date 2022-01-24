require("./connection");
const express = require("express");

const app = express();
const cors = require("cors");
const lessonsRouter = require("./routers/lessons.router");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ msg: "hello" });
});

app.use("/lessons", lessonsRouter);

module.exports = app;
