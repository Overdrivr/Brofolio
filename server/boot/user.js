module.exports = function(app, cb){
  var User = app.models.User;

  User.create({email: `a@foo.fr`, password: `abc`},function(err,user){
    if(err){
      console.log(err);
      cb();
    }
    console.log("Created admin credentials.");
    cb();
  });
};
