require("./connection");
const express = require("express");

const app = express();
const cors = require("cors");
const lessonsRouter = require("./routers/lessons.router");
const apiRouter = require("./routers/api.router");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

module.exports = app;
