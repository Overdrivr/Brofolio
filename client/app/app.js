(function(){
  var app = angular.module("brofolioApp",["ngMaterial","ui.router"]);


  app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('adminHome', {
      url: "/",
      templateUrl: "/app/authentication/form.html"
    })
    .state('projectList', {
      url: "/projects",
      templateUrl: "/app/authentication/project-list.html",
      controller: "projectListController",
      controllerAs: "projects"
    })
    .state('projectEdit', {
      url: "/projects/edit",
      templateUrl: "/app/authentication/project-edit.html",
      controller: "projectListController",
      controllerAs: "projects"
    });
  });


  app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme("default")
    .primaryPalette("cyan")
    .accentPalette("orange");
  });

  app.controller("GalleryController",function(){
    this.assets = assets;
  });

  app.factory("projects",function(){
    var projects = {};

    projects.list = [];

    projects.add = function(projectData){
      projects.list.push({title: projectData.title, description: projectData.description, assets: projectData.assets})
    };

    projects.add({title: "Gas can", description: "A can of gas.", assets: ["a.jpg","b.jpg"]});
    projects.add({title: "Abandonned cabin", description: "A cabin in the woods.", assets: ["a.jpg","b.jpg"]});
    projects.add({title: "Flamethrower", description: "A cool instant barbecue flame throwing machine.", assets: ["a.jpg","b.jpg"]});

    return projects;
  });

  app.controller("projectListController",["projects","$state",function(projects,$state){
    var self = this;
    self.projectList = projects.list;
    self.newProject = {};

    this.addProject = function(projectData){
      console.log("data",projectData);
      projects.add(projectData);
      self.newProject = {};
      $state.go("projectList");
    };
  }]);


})();

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
