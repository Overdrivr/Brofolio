angular.module("brofolioApp")
  .factory("projects",[
    "$log",
    "_",
    "Upload",
    function($log,_,$upload){

  var projects = {};

  //-- Bindable methods

  projects.addAsset = addAsset;
  projects.create = create;
  projects.delete = _delete;
  projects.edit = edit;
  projects.get = get;
  projects.removeAsset = removeAsset;


  //-- Bound data
  projects.projectId = 0;
  projects.list = [];

  projects.create("Gas can");
  projects.edit(0,{description: "A can of gas."});
  projects.create("Abandonned cabin");
  projects.edit(1,{description: "A cabin in the woods."});
  projects.create("Flamethrower");
  projects.edit(2,{description: "A cool instant barbecue flame throwing machine."});

  return projects;

  //-- Implementations

  function addAsset(projectId, file, doneCb, progressCb){
    var entry = _.find(projects.list,function(chr){
      return chr.id == projectId;
    });

    if(entry){
      $upload.upload({
          url: 'api/Containers/test/upload',
          data: {file: file}
      }).then(function (resp) {
          entry.assets.push(file.name);
          doneCb();
          return;
      }, function (resp) {
          var err = "Upload failed with status " + resp.status;
          doneCb(new Error(err));
          return;
      }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          progressCb(progressPercentage);
      });
    }
    else{
      var err = 'id ' + id + ' not found for asset addition.';
      return doneCb(new RangeError(err));
    }
  };

  function create(title){
    projects.list.push({
      id: projects.projectId,
      title: title,
      description: "",
      assets: []
    });
    projects.projectId++;
  };

  function _delete(id){
    var deletedProject = _.remove(projects.list,function(chr){
      return chr.id == id;
    });

    if(deletedProject){
      // Success
    }
    else {
      // Error
    }
  };

  function edit(id,data){
    var entry = _.find(projects.list,function(chr){
      return chr.id == id;
    });

    if(entry){
      entry.title = data.title || entry.title;
      entry.description = data.description || entry.description;
    }
    else{
      $log.warn('id ', id,' not founds for edition.');
    }
  };

  function get(id){
    var entry = _.find(projects.list,function(chr){
      return chr.id == id;
    });

    if(entry){
      return {
        "title": entry.title,
        "description": entry.description,
        "assets": _.clone(entry.assets)
      };
    }
    else{
      $log.warn('id ', id,' not found for get.');
      return;
    }
  };

  function removeAsset(id, asset){
    var entry = _.find(projects.list,function(chr){
      return chr.id == id;
    });

    if(entry){
      var removedAsset = _.remove(entry.assets,function(chr){
        return chr == asset;
      });

      if(removedAsset != asset){
        $log.warn('id ', id,' found but asset ',asset,' could not be deleted.');
        $log.warn(entry.assets);
      }
    }
    else{
      $log.warn('id ', id,' not found for asset deletion.');
    }
  }
}]);


var assets = [
  {
    title: "Poches",
    description: "Des poches, en veux tu, en voila.",
    images: {
      square:"/assets/img/12/Pouches_square.jpg",
      thumbnails:[
        "/assets/img/12/Pouches_thumbs.jpg",
      ],
      all:[
        "/assets/img/12/Pouches.jpg"
      ]
    }
  },
  {
    title: "Bruleur",
    description: "Attention les doigts.",
    images: {
      square:"/assets/img/16/Bruleur_square.png",
      thumbnails:[
        "/assets/img/16/Bruleur_thumbs.jpg",
      ],
      all:[
        "/assets/img/16/Bruleur.jpg"
      ]
    }
  },
  {
    title: "Gas can",
    description: "Pour garder le gasoil dans un endroit sur.",
    images: {
      square:"/assets/img/07/Gas_square.png",
      thumbnails:[
        "/assets/img/07/Gas_thumbs.jpg",
      ],
      all:[
        "/assets/img/07/Gas.jpg"
      ]
    }
  },
  {
    title: "Pilote",
    description: "Un bon gaillard.",
    images: {
      square:"/assets/img/01/Pilot_square.png",
      thumbnails:[
        "/assets/img/07/Pilot_thumbs.jpg",
      ],
      all:[
        "/assets/img/07/Pilot.jpg"
      ]
    }
  },
];
