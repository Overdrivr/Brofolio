module.exports = function(Project) {

  Project.on('dataSourceAttached', function(obj){
    var create = Project.create;
    Project.create = function(data, cb) {
      // Create folder
      var datasource = Project.app.datasources.Local;
      // Resume built-in method execution
      /*console.log("Folder: ", data);
      for(i in Project.app.datasources.Local.connector){
        console.log(i);
      }*/

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
};
