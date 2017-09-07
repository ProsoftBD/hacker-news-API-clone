/* eslint-disable no-underscore-dangle */

process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const mongoose = require('mongoose');
const { describe, it, beforeEach } = require('mocha');
const request = require('supertest');

const server = require('../server');
const saveTestData = require('../seed/test.seed');
const { Articles, Users, Comments } = require('../models/models');

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
  describe('GET /api/topics/:topic_id/articles', () => {
    it('responds with status code 200 & returns articles for a particular topic', (done) => {
      request(server)
        .get('/api/topics/cats/articles')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).to.equal(200);
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles.length).to.equal(1);
            done();
          }
        });
    });
  });
  describe('GET /api/articles', () => {
    it('responds with status code 200 & returns articles', (done) => {
      request(server)
        .get('/api/articles')
        .end((err, res) => {
          if (err) done(err);
          else {
            expect(res.status).to.equal(200);
            expect(res.body.articles).to.be.an('array');
            expect(res.body.articles.length).to.equal(2);
            done();
          }
        });
    });
  });
  describe('GET /api/articles/:article_id/comments', () => {
    it('responds with status code 200 & returns article comments', (done) => {
      Articles.findOne({}, (err, article) => {
        if (err) done(err);
        request(server)
          .get(`/api/articles/${article._id}/comments`)
          .end((error, res) => {
            if (error) done(error);
            else {
              expect(res.status).to.equal(200);
              expect(res.body.comments).to.be.an('array');
              expect(res.body.comments.length).to.equal(2);
              done();
            }
          });
      });
    });
  });
  describe('GET /api/users/:username', () => {
    it('responds with status code 200 & returns user by username', (done) => {
      Users.findOne({}, (err, user) => {
        if (err) done(err);
        request(server)
          .get(`/api/users/${user.username}`)
          .end((error, res) => {
            if (error) done(error);
            else {
              expect(res.status).to.equal(200);
              expect(res.body.user).to.be.an('object');
              expect(res.body.user.name).to.eql(user.name);
              done();
            }
          });
      });
    });
  });
  describe('PUT /api/articles/:article_id', () => {
    it('responds with status code 200 & increases article votes', (done) => {
      Articles.findOne({}, (err, article) => {
        if (err) done(err);
        request(server)
          .put(`/api/articles/${article._id}?vote=up`)
          .end((error, res) => {
            if (error) done(error);
            else {
              expect(res.status).to.equal(200);
              expect(res.body.votes).to.equal(1);
              done();
            }
          });
      });
    });
    it('responds with status code 200 & decreases article votes', (done) => {
      Articles.findOne({}, (err, article) => {
        if (err) done(err);
        request(server)
          .put(`/api/articles/${article._id}?vote=down`)
          .end((error, res) => {
            if (error) done(error);
            else {
              expect(res.status).to.equal(200);
              expect(res.body.votes).to.equal(-1);
              done();
            }
          });
      });
    });
  });
  describe('PUT /api/comments/:comment_id', () => {
    it('responds with status code 200 & increases comment votes', (done) => {
      Comments.findOne({}, (err, comment) => {
        if (err) done(err);
        request(server)
          .put(`/api/comments/${comment._id}?vote=up`)
          .end((error, res) => {
            if (error) done(error);
            else {
              expect(res.status).to.equal(200);
              expect(res.body.votes).to.equal(1);
              done();
            }
          });
      });
    });
    it('responds with status code 200 & decreases comment votes', (done) => {
      Comments.findOne({}, (err, comment) => {
        if (err) done(err);
        request(server)
          .put(`/api/comments/${comment._id}?vote=down`)
          .end((error, res) => {
            if (error) done(error);
            else {
              expect(res.status).to.equal(200);
              expect(res.body.votes).to.equal(-1);
              done();
            }
          });
      });
    });
  });
});
