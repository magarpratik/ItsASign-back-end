const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

beforeEach(() => {
    /* eslint-disable global-require */
    require("../connection");
});
afterAll(() => {
    mongoose.disconnect();
});

describe("GET /api/users", () => {
    it("200: returns list of all users", () =>
        request(app)
            .get("/api/users")
            .expect(200)
            .then(({ body }) => {
                console.log(body.users);
                expect(body.users.length).toBe(12);
            }));
});
