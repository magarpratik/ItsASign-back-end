/* eslint-env node, mocha */
/* eslint-disable no-unused-vars */
require('dotenv').config({ path: `${__dirname}/.env.test` });
const mongoose = require('mongoose');
const { expect } = require('chai');
const should = require('chai').should();
const { have } = require('chai');
const request = require('supertest');
const req = require('express/lib/request');
const chai = require('chai');
const app = require('../app');

chai.use(require('chai-sorted'));

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
      users.should.be.lengthOf(12);
      users.forEach((user) => {
        expect(user).to.have.all.keys(
          '_id',
          'username',
          'picture',
          'name',
          'email',
          'password',
          'progress',
          'createdAt',
          'updatedAt',
        );
      });
    }));
  xit('200: returns list sorted by creation date as default', () => request(app)
    .get('/api/users')
    .expect(200)
    .then(({ body: { users } }) => {
      expect(users).to.be.sortedBy('createdAt', {
        ascending: true,
      });
    }));
});
