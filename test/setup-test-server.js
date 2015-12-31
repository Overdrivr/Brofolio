require('supertest');
var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

/* Set up the test server */
before(function(done){
  // Bootstrap the application, configure models, datasources and middleware.
  // Sub-apps like REST API are mounted via boot scripts.
  rootfolder = './server';
  console.log("Booting test server...");

  boot(app, rootfolder,function(err) {
    if (err){
      console.log("Booting error: ",err)
      return done(err);
    }
      done();
      console.log("Booting complete.");
  });
});
