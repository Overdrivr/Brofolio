var request = require('supertest');
var assert = require('chai').assert;
var app = require('./setup-test-server.js');
var credentials = require('../server/credentials.example.json').admin;

function json(verb, url) {
    return request(app)[verb](url)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  };

describe("Unauthenticated user",function() {
  var accessToken;
  it('should be allowed, with valid credentials, to login and get the token', function(done){
    json('post', '/api/Users/login')
      .send(credentials)
      .expect(200, function(err, res) {
        if (err)  return done(err);
        assert(typeof res.body === 'object');
        assert(res.body.id, 'must have an access token');
        assert.equal(res.body.userId, 1); // Only have 1 authenticated user
        accessToken = res.body.id;
        done();
      });
  });
});
