module.exports = function(Project) {

  var CONTAINERS_URL = '/api/Containers/';

  Project.prototype.upload = function (ctx,options,cb) {
    if(!options) options = {};

    // Set container name so that Container API can upload file correctly
    ctx.req.params.container = this.containerId;
    var projectId = this.id;

    Project.app.models.Container.upload(ctx.req,ctx.result,options,function (err,fileObj) {
      if(err) return cb(err);

      var fileInfo = fileObj.files.image[0];
      var Asset = Project.app.models.Asset;

      Asset.create({
          name: fileInfo.name,
          type: fileInfo.type,
          container: ctx.req.params.container,
          projectId: projectId,
          url: CONTAINERS_URL + ctx.req.params.container + '/download/' + fileInfo.name
      },function (err,obj) {
          if (err) return cb(err);
          cb(null, obj);
      });
    });
  };

  Project.remoteMethod(
      'upload',
      {
          isStatic: false,
          description: 'Uploads a file',
          accepts: [
              { arg: 'ctx', type: 'object', http: { source:'context' } },
              { arg: 'options', type: 'object', http:{ source: 'query'} }
          ],
          returns: {
              arg: 'fileObject', type: 'object', root: true
          },
          http: {path: '/Assets/upload', verb: 'post'}
      }
    );

  Project.on('dataSourceAttached', function(obj){
    // Add container creation to Project.create
    var create = Project.create;
    Project.create = function(data, cb) {

      var datasource = Project.app.datasources.Local;

      create.apply(this, [data, function(err, model){
        if (err) return cb(err);
        datasource.connector.createContainer({"name": model.containerId}, function(err,container){
          if(err) return cb(err);
          return cb(null,model);
        });
      }]);
    };
  });

  // Use operation hook to clean after a delete operation
  // Deprecated by using guid for containers
  // however it was impossible to get delete instance despite docs
  // https://docs.strongloop.com/display/public/LB/Operation+hooks#Operationhooks-beforedelete
  // TODO : investigate later
  /*Project.observe("before delete", function(ctx, next){
    var datasource = Project.app.datasources.Local;
    for(i in ctx)
      console.log("-----------Context:",i)
    datasource.connector.destroyContainer(ctx.where.containerId, function(err){
      if (err) return next(err);
      return next();
    });
    next();
  });
  */
};
