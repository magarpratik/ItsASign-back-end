/* eslint-env node, mocha */
/* eslint-disable no-unused-vars */
require('dotenv').config({ path: `${__dirname}/.env.test` });
const mongoose = require('mongoose');
const { expect } = require('chai');
const should = require('chai').should();
const { have } = require('chai');
const request = require('supertest');
const req = require('express/lib/request');
const app = require('../app');

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
    .once('open', () => {
      done();
    })
    .on('error', (error) => {
      console.warn('warning', error);
      done(error);
    });
});

after(() => {
  mongoose.disconnect();
});

describe('GET /api/users', (done) => {
  it('200: returns list of all users', () => request(app)
    .get('/api/users')
    .expect(200)
    .then(({ body: { users } }) => {
      users.should.be.a('array');
      users.should.be.lengthOf(9);
      users.forEach((user) => {
        expect(user).to.have.all.keys(
          '_id',
          'username',
          'picture',
          'name',
          'email',
          'password',
          'progress',
        );
      });
    }));
});
