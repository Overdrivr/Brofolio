var request = require('supertest');
var assert = require('chai').assert;
var app = require('../server/server');

// test order
require('./test-project-authenticated.js');

function json(verb, url) {
    return request(app)[verb](url)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  };

describe("Unauthenticated user",function() {

  it('should be allowed to find a project by ID', function(done){
    json('get', '/api/Projects/2')
      .expect(200, function(err, res) {
        if (err)  return done(err);
        done();
      });
  });
  
});
