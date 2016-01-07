module.exports = function(Asset) {
  var CONTAINERS_URL = '/api/Containers/';

  Asset.upload = function (ctx,options,cb) {
    var response = "YOLOLO";

    if(!options) options = {};
    ctx.req.params.container = 'project1';

    Asset.app.models.Container.upload(ctx.req,ctx.result,options,function (err,fileObj) {
        if(err) return cb(err);

        var fileInfo = fileObj.files.image[0];

        Asset.create({
            name: fileInfo.name,
            type: fileInfo.type,
            container: fileInfo.container,
            url: CONTAINERS_URL+fileInfo.container+'/download/'+fileInfo.name
        },function (err,obj) {
            console.log(err);
            console.log(obj);
            if (err) return cb(err);
            cb(null, obj);
        });
      });
    };

    Asset.remoteMethod(
        'upload',
        {
            description: 'Uploads a file',
            accepts: [
                { arg: 'ctx', type: 'object', http: { source:'context' } },
                { arg: 'options', type: 'object', http:{ source: 'query'} }
            ],
            returns: {
                arg: 'fileObject', type: 'object', root: true
            },
            http: {verb: 'post'}
        }
    );
};
