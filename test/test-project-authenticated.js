var request = require('supertest');
var assert = require('chai').assert;
var app = require('../server/server');
var credentials = require('../server/credentials.example.json').admin;
var fs = require('fs');
var loopback = require('loopback');
var storagecfg = require('../server/datasources.json');
var fs = require('fs');
var setup = require('./setup-test');

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
  var createdProjetId = -1;
  var createdAssetId = -1;
  var resourceUrl;

  it('should be allowed, with valid credentials, to login and get the token', function(done){
    json('post', '/api/Users/login')
      .set('Content-Type', 'application/json')
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
      .set('Content-Type', 'application/json')
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

  it("should be able to add an asset to the new project", function(done){
    json('post', '/api/Projects/' + createdProjetId + '/Assets/upload?access_token=' + accessToken)
    .set('Content-Type', 'multipart/form-data')
    .attach('image','./test/avatar.png')
    .field('extra_info', '{"name":"booya"}')
    .expect(200, function(err, res){
      if (err) return done(err);
      createdAssetId = res.body.id;
      assert(res.body.url,"Download url should be provided");
      resourceUrl = res.body.url;
      done();
    });
  });

  it("should be able to find the new asset", function(done){
    json('get', '/api/Assets/'+ createdAssetId + '?access_token=' + accessToken)
    .expect(200, function(err, res){
      if (err) return done(err);
      done();
    })
  });

  it("should be able to find the new asset without being identified", function(done){
    json('get', '/api/Assets/'+createdAssetId)
    .expect(200, function(err, res){
      if (err) return done(err);
      done();
    })
  });

  it("should be able to find the new asset among all assets through the project related method (with no identification)", function(done){
    json('get', '/api/Projects/' + createdProjetId + '/assets/?access_token=' + accessToken)
    .expect(200, function(err, res){
      if (err) return done(err);
      var asset1 = res.body[0]
      assert.equal(asset1.name,'avatar.png');
      assert.equal(asset1.projectId,createdProjetId);
      done();
    })
  });

  it("should be able to find the new asset through the project related method", function(done){
    json('get', '/api/Projects/' + createdProjetId + '/assets/'+ createdAssetId + '?access_token=' + accessToken)
    .expect(200, function(err, res){
      if (err) return done(err);
      done();
    })
  });

  it("should have uploaded the new asset to the project folder", function(done){
    fs.access(storagecfg.local.root + '/project' + createdProjetId + '/' + 'avatar.png', fs.F_OK, function(err){
      if (err) return done(err);
      done();
    });
  });

  it("should be able to download the newly uploaded asset", function(done){
    png('get',resourceUrl)
      .expect(200, function(err, res){
        if(err) return done(err);
        done();
      });
  });

  it("should be able to delete asset from new project", function(done){
    json('delete', '/api/Projects/' + createdProjetId + '/assets/' + createdAssetId + '?access_token=' + accessToken)
    .expect(204, function(err, res){
      if (err) return done(err);
      done();
    });
  });

  it("should not be able to find the deleted asset through the project related method", function(done){
    json('get', '/api/Projects/' + createdProjetId + '/assets/'+ createdAssetId + '?access_token=' + accessToken)
    .expect(404, function(err, res){
      if (err) return done(err);
      done();
    })
  });

  it("should not be able to find the deleted asset", function(done){
    json('get', '/api/Assets/'+ createdAssetId + '?access_token=' + accessToken)
    .expect(404, function(err, res){
      if (err) return done(err);
      done();
    })
  });

  it("should be able to delete an existing project", function(done){
    json('delete', '/api/Projects/' + createdProjetId + '?access_token=' + accessToken)
    .set('Content-Type', 'application/json')
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
