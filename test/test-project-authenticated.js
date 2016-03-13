var request = require('supertest');
var assert = require('chai').assert;
var app = require('../server/server');
var credentials = require('../server/credentials.example.json').admin;
var fs = require('fs');
var loopback = require('loopback');
var storagecfg = require('../server/datasources.json');
var fs = require('fs');

// test order
require("./test-unauthenticated.js");

function json(verb, url) {
    return request(app)[verb](url)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  };

function png(verb, url) {
    return request(app)[verb](url)
      .set('Accept', 'image/png')
      .expect('Content-Type', /image/);
  };

describe("User",function() {

  var accessToken;
  var createdProjet;
  var createdAsset;

  it('should be allowed, with valid credentials, to login and get the token', function(done){
    json('post', '/api/Users/login')
      .set('Content-Type', 'application/json')
      .send(credentials)
      .expect(200, function(err, res) {
        if (err)  return done(err);
        assert.isObject(res.body, 'response must have a body object');
        assert.isDefined(res.body.id, 'body must have an access token');
        assert.equal(res.body.userId, 1);
        accessToken = res.body.id;
        done();
      });
  });

  it("should be able to create a new project", function(done){
    json('post', '/api/Projects/?access_token=' + accessToken)
      .set('Content-Type', 'application/json')
      .send({
        title:"testProject"
      })
      .expect(200, function(err, res){
        if (err) return  done(err);
        createdProject = res.body;
        assert.isDefined(createdProject.id);
        assert.isDefined(createdProject.containerId);
        assert.isNumber(createdProject.id);
        assert.isString(createdProject.containerId);
        done();
      });
  });

  it("should have created a folder in storage for the new project", function(done){
    fs.access(storagecfg.local.root + '/' + createdProject.containerId + '/', fs.F_OK, function(err){
      if (err) return done(err);
      done();
    });
  });

  it("should be able to add an asset to the new project", function(done){
    json('post', '/api/Projects/' + createdProject.id + '/Assets/upload?access_token=' + accessToken)
    .set('Content-Type', 'multipart/form-data')
    .attach('image','./test/avatar.png')
    .field('extra_info', '{"name":"booya"}')
    .expect(200, function(err, res){
      if (err) return done(err);
      createdAsset = res.body;
      assert.isNumber(createdAsset.id);
      assert.isString(createdAsset.url,"Download url should be provided");
      done();
    });
  });

  it("should be able to find the new asset", function(done){
    json('get', '/api/Assets/'+ createdAsset.id + '?access_token=' + accessToken)
    .expect(200, function(err, res){
      if (err) return done(err);
      done();
    })
  });

  it("should be able to find the new asset without being identified", function(done){
    json('get', '/api/Assets/' + createdAsset.id)
    .expect(200, function(err, res){
      if (err) return done(err);
      done();
    })
  });

  it("should be able to find the new asset among all assets through the project related method (with no identification)", function(done){
    json('get', '/api/Projects/' + createdProject.id + '/assets/?access_token=' + accessToken)
    .expect(200, function(err, res){
      if (err) return done(err);
      assert.isArray(res.body);
      assert.lengthOf(res.body,1,"expecting a single asset at this point");
      assert.strictEqual(res.body[0].name,'avatar.png');
      assert.strictEqual(res.body[0].projectId,createdProject.id);
      done();
    })
  });

  it("should be able to find the new asset through the project related method", function(done){
    json('get', '/api/Projects/' + createdProject.id + '/assets/'+ createdAsset.id + '?access_token=' + accessToken)
    .expect(200, function(err, res){
      if (err) return done(err);
      done();
    })
  });

  it("should have uploaded the new asset to the project folder", function(done){
    fs.access(storagecfg.local.root + '/' + createdProject.containerId + '/' + 'avatar.png', fs.F_OK, function(err){
      if (err) return done(err);
      done();
    });
  });

  it("should be able to download the newly uploaded asset", function(done){
    png('get',createdAsset.url)
      .expect(200, function(err, res){
        if(err) return done(err);
        done();
      });
  });

  it("should be able to delete asset from new project", function(done){
    json('delete', '/api/Projects/' + createdProject.id + '/assets/' + createdAsset.id + '?access_token=' + accessToken)
    .expect(204, function(err, res){
      if (err) return done(err);
      done();
    });
  });

  it("should not be able to find the deleted asset through the project related method", function(done){
    json('get', '/api/Projects/' + createdProject.id + '/assets/'+ createdAsset.id + '?access_token=' + accessToken)
    .expect(404, function(err, res){
      if (err) return done(err);
      done();
    })
  });

  it("should not be able to find the deleted asset", function(done){
    json('get', '/api/Assets/'+ createdAsset.id + '?access_token=' + accessToken)
    .expect(404, function(err, res){
      if (err) return done(err);
      done();
    })
  });

  it("should be able to delete an existing project", function(done){
    json('delete', '/api/Projects/' + createdProject.id + '?access_token=' + accessToken)
    .set('Content-Type', 'application/json')
    .expect(200, function(err,res){
      if (err) return done(err);
      done();
    });
  });

  it("should have removed deleted project folder from storage", function(done){
    fs.access(storagecfg.local.root + '/project' + createdProject.id + '/', fs.F_OK, function(err){
      if(err) return done();
      done(new Error("Folder not removed."));
    });
  });

  after(function() {
    json('post', '/api/Projects/?access_token=' + accessToken)
      .set('Content-Type', 'application/json')
      .send({
        title:"testProject"
      })
      .expect(200, function(err, res){
        if (err) return err;
        createdProject = res.body;
        assert.isDefined(createdProject.id);
        assert.isDefined(createdProject.containerId);
        assert.isNumber(createdProject.id);
        assert.isString(createdProject.containerId);
      });
  });
});
