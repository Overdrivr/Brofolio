var rimraf = require('rimraf');
var storagecfg = require('../server/datasources.json');
var fs = require('fs');
var path = require('path');

before(function(done){
  // Storage folder path for local storage
  var storagePath = path.join(__dirname,'../',storagecfg.local.root);
  console.log('Deleting storage folder: ',storagePath);
  // Delete test projects folder recursively
  rimraf(storagePath,[],function(err){
    if (err) return done(err);

    fs.mkdir(storagecfg.local.root,function(err){
      if (err) return done(err);
      done();
    });
  });
});
