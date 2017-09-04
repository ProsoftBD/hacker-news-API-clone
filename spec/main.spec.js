const { expect } = require('chai');
const { describe, it } = require('mocha');
const request = require('supertest');
const server = require('../server');

describe('API', () => {
  describe('GET /', () => {
    it('responds with status code 200', (done) => {
      request(server)
        .get('/')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).to.equal(200);
            expect(res.text).to.equal('<h1>Welcome to the Hacker News Clone API</h1> \n Go to /api for more...');
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
});
