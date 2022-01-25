/* eslint-env node, mocha */
/* eslint-disable no-unused-vars */
require("dotenv").config({ path: `${__dirname}/.env.test` });
const mongoose = require("mongoose");
const { expect } = require("chai");
const should = require("chai").should();
const request = require("supertest");
const app = require("../app");

mongoose.Promise = global.Promise;

before((done) => {
  const { DB_PASS } = process.env;
  const { URL } = process.env;
  const { DB_USER } = process.env;

  const options = {
    user: DB_USER,
    pass: DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(URL, options);
  mongoose.connection
    .once("open", () => {
      done();
    })
    .on("error", (error) => {
      console.warn("warning", error);
      done(error);
    });
});
// beforeEach((done) => {
//     done();
// });
after(() => {
  mongoose.disconnect();
});

describe("GET /api/users", (done) => {
  it("200: returns list of all users", () =>
    request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const { users } = res.body;

        users.should.have.lengthOf(12);
      }));
});
describe("GET /api/courses", (done) => {
  it("200: returns list of all courses", () =>
    request(app)
      .get("/api/courses")
      .expect(200)
      .then(({ body }) => {
        const { courses } = body;
        console.log(courses);
        courses.should.have.lengthOf(3);
      }));
});
