var request = require('supertest');
var assert = require('chai').assert;
var app = require('./setup-test-server.js');
var credentials = require('../server/credentials.example.json').admin;
var fs = require('fs');

function json(verb, url) {
    return request(app)[verb](url)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  };

describe("Unauthenticated user",function() {

  var accessToken;
  var createdProjetId = -1;

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

  it("should be able to create a new project", function(done){
    json('post', '/api/Projects/?access_token=' + accessToken)
      .send({
        title:"testProject"
      })
      .expect(200, function(err, res){
        if (err) return  done(err);
        console.log(res.headers);
        console.log(res.body);
        createdProjetId = res.body.id;
        done();
      });
  });

  it("should have created a folder in storage for the new project", function(done){
    fs.access('./server/storage/project' + createdProjetId + '/', fs.F_OK, function(err){
      if (err) return done(err);
      done();
    })
  })
});
