/* eslint-disable no-console */

process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const mongoose = require('mongoose');
const { describe, it, beforeEach } = require('mocha');
const request = require('supertest');

const server = require('../server');
const saveTestData = require('../seed/test.seed');

describe('API', () => {
  let usefulData;
  beforeEach((done) => {
    mongoose.connection
      .dropDatabase()
      .then(saveTestData)
      .then((data) => {
        usefulData = data;
        console.log(`Useful data: ${Object.keys(usefulData)}`);
        done();
      })
      .catch(done);
  });
  describe('GET /', () => {
    it('responds with status code 200', (done) => {
      request(server)
        .get('/')
        .end((err, res) => {
          if (err) done(err);
          else {
            const output =
              '<h1>Welcome to the Hacker News Clone API</h1> \n Go to /api for more...';
            expect(res.status).to.equal(200);
            expect(res.text).to.equal(output);
            done();
          }
        });
    });
  });
  describe('GET /api/', () => {
    it('responds with status code 200', (done) => {
      request(server)
        .get('/api/')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).to.equal(200);
            done();
          }
        });
    });
  });
  describe('GET /api/topics', () => {
    it('responds with status code 200 & returns topics', (done) => {
      request(server)
        .get('/api/topics')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).to.equal(200);
            expect(res.body.topics).to.be.an('array');
            expect(res.body.topics.length).to.equal(3);
            done();
          }
        });
    });
  });
});
