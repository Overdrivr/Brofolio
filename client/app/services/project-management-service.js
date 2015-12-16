angular.module("brofolioApp").factory("projects",["$log",function($log){
  var projects = {};
  projects.projectId = 0;
  projects.list = [];

  projects.add = function(projectData){
    projects.list.push({
      id: projects.projectId,
      title: projectData.title,
      description: projectData.description,
      assets: projectData.assets});
    projects.projectId++;
  };

  projects.edit = function(id,projectData){
    // TODO : Check inputs
    for(var i = 0 ; i < projects.list.length ; i++){
      if(projects.list[i].id == id){
        projects.list[i].title = projectData.title;
        projects.list[i].description = projectData.description;
        projects.list[i].assets = projectData.assets;
        return;
      }
    }
    $log.warn('id ', id,' not found for edition.');
    return;
  };

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
