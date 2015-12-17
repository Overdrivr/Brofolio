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
    var entry = _.find(projects.list,id);

    if(entry){
      entry.title = data.title;
      entry.description = data.description;
      $log.warn('Edited ', id,'.');
    }
    else{
      $log.warn('id ', id,' not founds for edition.');
    }
  };

  projects.addAsset = function(id, asset){
    for(var i = 0 ; i < projects.list.length ; i++){
      if(projects.list[i].id == id){
          // TODO ?
          projects.list[i].assets.push(asset);
        return;
      }
    }
    $log.warn('id ', id,' not found for asset addition.');
    return;
  };

  projects.removeAsset = function(id, asset){
    for(var i = 0 ; i < projects.list.length ; i++){
      if(projects.list[i].id == id){

      }
    }
  }



  projects.get = function(id){
    for(var i = 0 ; i < projects.list.length ; i++){
      if(projects.list[i].id == id){
        return projects.list[i];
      }
    }
    $log.warn('id ', id,' not found for get.');
    return;
  };

  projects.add({title: "Gas can", description: "A can of gas.", assets: ["a.jpg","b.jpg"]});
  projects.add({title: "Abandonned cabin", description: "A cabin in the woods.", assets: ["a.jpg","b.jpg"]});
  projects.add({title: "Flamethrower", description: "A cool instant barbecue flame throwing machine.", assets: ["a.jpg","b.jpg"]});

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
