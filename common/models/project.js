module.exports = function(Project) {

  Project.on('dataSourceAttached', function(obj){
    var create = Project.create;
    Project.create = function(data, cb) {
      // Create folder

      // Resume built-in method execution
      console.log("Folder: ", data);
      return create.apply(this, [data, cb]);
    };
  });
};
