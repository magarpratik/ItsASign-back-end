/* eslint-env node, mocha */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
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
  xit("200: returns list of all users", () =>
    request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const { users } = res.body;
        users.should.have.lengthOf(12);
      }));
});
describe("GET /api/courses", () => {
  it("200: returns list of all courses", () =>
    request(app)
      .get("/api/courses")
      .expect(200)
      .then(({ body }) => {
        const { courses } = body;
        expect(courses).to.have.lengthOf(9);
      }));
});
describe("GET /api/courses/:course_topic", () => {
  it("200: returns list of all courses with the requested topic", () => {
    const course_topic = "alpha";
    return request(app)
      .get(`/api/courses/${course_topic}`)
      .expect(200)
      .then(({ body }) => {
        const { courses } = body;

        expect(courses).to.have.lengthOf(2);
      });
  });
});
describe("GET /api/courses/:course_topic/:lesson_number", () => {
  it("200: returns list of all questions within the requested topic and lesson number", () => {
    const course_topic = "alpha";
    const lesson_number = 1;
    return request(app)
      .get(`/api/courses/${course_topic}/${lesson_number}`)
      .expect(200)
      .then(({ body }) => {
        const { questions } = body;
        expect(questions).to.have.lengthOf(2);
      });
  });
});
describe("GET /api/courses/:course_topic/:lesson_number/:index/question", () => {
  it("200: returns a question within the requested topic and lesson number", () => {
    const course_topic = "alpha";
    const lesson_number = 1;
    const index = 0;
    return request(app)
      .get(`/api/courses/${course_topic}/${lesson_number}/${index}/question`)
      .expect(200)
      .then(({ body }) => {
        const { question } = body;
        expect(question).to.be.a("string");
      });
  });
});
describe("GET /api/courses/:course_topic/:lesson_number/:index/answers", () => {
  it("200: returns an object with 4 answer keys", () => {
    const course_topic = "alpha";
    const lesson_number = 1;
    const index = 0;
    return request(app)
      .get(`/api/courses/${course_topic}/${lesson_number}/${index}/answers`)
      .expect(200)
      .then(({ body }) => {
        const { answers } = body;
        expect(answers).to.have.all.keys("a", "b", "c", "d");
      });
  });
});
