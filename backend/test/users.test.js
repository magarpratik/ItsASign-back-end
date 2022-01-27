/* eslint-env node, mocha */
/* eslint-disable */
require("dotenv").config({ path: `${__dirname}/.env.test` });
const mongoose = require("mongoose");
const { expect } = require("chai");
const should = require("chai").should();
const { have } = require("chai");
const request = require("supertest");
const req = require("express/lib/request");
const chai = require("chai");
const app = require("../app");

chai.use(require("chai-sorted"));
mongoose.Promise = global.Promise;

before(() => {
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

after(() => {
  mongoose.disconnect();
});
describe("GET /api/users", () => {
  it("200: returns list of all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        users.should.be.a("array");
        users.should.be.lengthOf(12);
        users.forEach((user) => {
          expect(user).to.have.keys(
            "_id",
            "username",
            "picture",
            "name",
            "email",
            "password",
            "progress",
            "createdAt",
            "updatedAt"
          );
        });
      });
  });
});

describe("GET /api/users/:user_id", () => {
  it("200: returns a specific user", () => {
    return request(app)
      .get("/api/users/Mejia")
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).to.eql({
          _id: "61f2b4f082f0650a75fce302",
          createdAt: "1977-10-29T03:02:03.000Z",
          updatedAt: "1982-03-06T03:36:01.000Z",
          username: "Mejia",
          picture: "http://placehold.it/32x32",
          name: "Gertrude Hardin",
          email: "gertrudehardin@tellifly.com",
          password: -97145,
          progress: {
            completed_lessons: ["est", "elit"],
            total_xp: 124,
            badges: ["aute", "laborum", "sint"],
          },
        });
      });
  });
});

describe("GET /api/users/:username/progress", () => {
  it("200: get object containing details of progress", () => {
    return request(app)
      .get("/api/users/Mejia/progress")
      .expect(200)
      .then(({ body: { progress } }) => {
        expect(progress).to.deep.equal({
          completed_lessons: ["est", "elit"],
          total_xp: 124,
          badges: ["aute", "laborum", "sint"],
        });
      });
  });
});

describe("PATCH /api/users/:username", () => {
  it("201: updates user email", () => {
    return request(app)
      .patch("/api/users/Knowles")
      .send({ email: "test@example.com" })
      .expect(201)
      .then(({ body: { updated } }) => {
        expect(updated).to.eql(1);
      });
  });

  it("201: updates user password", () => {
    return request(app)
      .patch("/api/users/Knowles")
      .send({ password: 444 })
      .expect(201)
      .then(({ body: { updated } }) => {
        expect(updated).to.eql(1);
      });
  });

  it("201: updates user progress", () => {
    return request(app)
      .patch("/api/users/Knowles")
      .send({
        progress: {
          completed_lessons: ["test-lesson-1", "test-lesson-2"],
          total_xp: 50,
          badges: ["test-badge-1", "test-badge-2"],
        },
      })
      .expect(201)
      .then(({ body: { updated } }) => {
        expect(updated).to.eql(1);
      });
  });
});

describe("POST /api/users/signup", () => {
  it("201: posts a user to the database", () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        username: "AndyRobots",
        email: "andyrobotdroid@gmail.com",
        password: "10021994",
        confirmPassword: "10021994",
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).to.eql({
          success: true,
          message: "Registration Success",
        });
      });
  });

  it("200: gives error if email is already in use ", () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        username: "ARobots",
        email: "andyrobotdroid@gmail.com",
        password: "1001994",
        confirmPassword: "1001994",
      })
      .expect(200)
      .then(({ body }) => {
        expect(body).to.eql({
          error: true,
          message: "Email is already in use",
        });
      });
  });

  it("400: gives error if username exists", () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        username: "AndyRobots",
        email: "pratikmagar@gmail.com",
        password: "1001994",
        confirmPassword: "1001994",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body).to.eql({
          error: true,
          message: "Cannot Register",
        });
      });
  });
});
