module.exports = function(Project) {

  Project.on('dataSourceAttached', function(obj){
    // Add container creation to Project.create
    var create = Project.create;
    Project.create = function(data, cb) {

      var datasource = Project.app.datasources.Local;

      create.apply(this, [data, function(err, model){
        if (err) return cb(err);

        var containerName = "project" + model.id;

        datasource.connector.createContainer({"name": containerName}, function(err,container){
          if(err) return cb(err);
          return cb(null,model);
        });
      }]);
    };
  });

  // Use operation hook to clean after a delete operation
  Project.observe("before delete", function(ctx, next){
    var datasource = Project.app.datasources.Local;
    datasource.connector.destroyContainer("project" + ctx.where.id, function(err){
      if (err) return next(err);
      return next();
    });
  });
};
