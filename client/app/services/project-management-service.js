angular.module("brofolioApp").factory("projects",["$log","_",function($log,_){
  var projects = {};
  projects.projectId = 0;
  projects.list = [];

  projects.add = function(data){
    projects.list.push({
      id: projects.projectId,
      title: data.title,
      description: data.description,
      assets: []
    });
    projects.projectId++;
  };

  projects.edit = function(id,data){
    var entry = _.find(projects.list,function(chr){
      return chr.id == id;
    });

    if(entry){
      entry.title = data.title;
      entry.description = data.description;
    }
    else{
      $log.warn('id ', id,' not founds for edition.');
    }
  };

  projects.addAsset = function(id, asset){
    var entry = _.find(projects.list,function(chr){
      return chr.id == id;
    });

    if(entry){
      entry.assets.push(asset);
    }
    else{
      $log.warn('id ', id,' not found for asset addition.');
    }
  };

  projects.removeAsset = function(id, asset){
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

  projects.get = function(id){
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

  projects.add({title: "Gas can", description: "A can of gas."});
  projects.add({title: "Abandonned cabin", description: "A cabin in the woods."});
  projects.add({title: "Flamethrower", description: "A cool instant barbecue flame throwing machine."});

  return projects;
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
