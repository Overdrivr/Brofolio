require('supertest');
var loopback = require('loopback');
var boot = require('loopback-boot');

var storagecfg = require('../server/datasources.json');
var fs = require('fs');
var rimraf = require('rimraf');

var app = module.exports = loopback();

/* Set up the test server */
before(function(done){

  storagecfg.local.root ='./test/testStorage';
  // Delete test projects folder recursively
  rimraf(storagecfg.local.root,[],function(err){
    if (err) return done(err);

    fs.mkdir(storagecfg.local.root,function(err){
      if (err) return done(err);
      // Bootstrap the application, configure models, datasources and middleware.
      // Sub-apps like REST API are mounted via boot scripts.
      rootfolder = './server';
      console.log("Booting test server...");

      boot(app, rootfolder,function(err) {
        if (err){
          console.log("Booting error: ",err)
          return done(err);
        }

        console.log("Booting complete.");
        done();

      });
    });
  });
});
