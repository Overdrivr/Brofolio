module.exports = function(Project) {

  var CONTAINERS_URL = '/api/Containers/';

  Project.upload = function (ctx,id,options,cb) {
    var response = "YOLOLO";

    if(!options) options = {};

    ctx.req.params.container = 'project1';

    Project.app.models.Container.upload(ctx.req,ctx.result,options,function (err,fileObj) {
        if(err) return cb(err);

        var fileInfo = fileObj.files.image[0];

        var Asset = Project.app.models.Asset;
        Asset.create({
            name: fileInfo.name,
            type: fileInfo.type,
            container: fileInfo.container,
            projectId: id,
            url: CONTAINERS_URL+fileInfo.container+'/download/'+fileInfo.name
        },function (err,obj) {
            if (err) return cb(err);
            cb(null, obj);
        });
      });
    };

    Project.remoteMethod(
        'upload',
        {
            description: 'Uploads a file',
            accepts: [
                { arg: 'ctx', type: 'object', http: { source:'context' } },
                { arg: 'id', type: 'number', required: true },
                { arg: 'options', type: 'object', http:{ source: 'query'} }
            ],
            returns: {
                arg: 'fileObject', type: 'object', root: true
            },
            http: {path: '/:id/Assets/upload', verb: 'post'}
        }
    );

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
