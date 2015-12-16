(function(){
  var app = angular.module("brofolioApp",["ngMaterial","ui.router"]);


  app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('login', {
      url: "/",
      templateUrl: "/app/authentication/form.html"
    })
    .state('admin', {
      url: "/projects",
      templateUrl: "/app/authentication/project-list.html",
      controller: "projectCreationController",
      controllerAs: "projects"
    })
    .state('create', {
      url: "/create",
      templateUrl: "/app/authentication/project-edit.html",
      controller: "projectCreationController",
      controllerAs: "projects"
    })
    .state('edit', {
      url: "/edit/:id",
      templateUrl: "/app/authentication/project-edit.html",
      controller: "projectEditionController",
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

  app.factory("projects",["$log",function($log){
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
    };

    projects.add({title: "Gas can", description: "A can of gas.", assets: ["a.jpg","b.jpg"]});
    projects.add({title: "Abandonned cabin", description: "A cabin in the woods.", assets: ["a.jpg","b.jpg"]});
    projects.add({title: "Flamethrower", description: "A cool instant barbecue flame throwing machine.", assets: ["a.jpg","b.jpg"]});

    return projects;
  }]);

  app.controller("projectCreationController",["projects","$state","$log",function(projects,$state,$log){
    var self = this;
    self.projectList = projects.list;
    self.data = {};

    this.save = function(data){
      projects.add(data);
      self.data = {};
      $state.go("admin");
    };
  }]);

  app.controller("projectEditionController",["projects","$state","$stateParams",function(projects,$state,$stateParams){
    var self = this;
    self.projectList = projects.list;

    // Find project in list by id

    self.data = {};
    self.data.title = "test";

    this.save = function(data){
      projects.edit(0,data);
      self.data = {};
      $state.go("admin");
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
