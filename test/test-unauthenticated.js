var request = require('supertest');
var assert = require('chai').assert;
var app = require('./setup-test-server.js');

function json(verb, url) {
    return request(app)[verb](url)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  };

describe("Unauthenticated user",function() {
  var accessToken;

  var wrongCredentials = {
    email:'wrong@wrong.com',
    password:'wrong'
  };

  it('should NOT be allowed, with non-valid credentials, to login and get the token', function(done){
    json('post', '/api/Users/login')
      .send(wrongCredentials)
      .expect(401, function(err, res) {
        if (err)  return done(err);
        done();
      });
  });
});