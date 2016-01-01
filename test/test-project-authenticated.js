var request = require('supertest');
var assert = require('chai').assert;
var app = require('./setup-test-server.js');
var credentials = require('../server/credentials.example.json').admin;
var fs = require('fs');
var storagecfg = require('../server/datasources.json');

function json(verb, url) {
    return request(app)[verb](url)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  };

describe("User",function() {

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
        createdProjetId = res.body.id;
        done();
      });
  });

  it("should have created a folder in storage for the new project", function(done){
    fs.access(storagecfg.local.root + '/project' + createdProjetId + '/', fs.F_OK, function(err){
      if (err) return done(err);
      done();
    });
  });

  it("should be able to delete an existing project", function(done){
    json('delete', '/api/Projects/' + createdProjetId + '?access_token=' + accessToken)
    .expect(200, function(err,res){
      if (err) return done(err);
      done();
    });
  });

  it("should have removed deleted project folder from storage", function(done){
    fs.access(storagecfg.local.root + '/project' + createdProjetId + '/', fs.F_OK, function(err){
      if(err) return done();
      done(new Error("Folder not removed."));
    });
  });
});
