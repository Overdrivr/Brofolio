angular.module("brofolioApp").controller("GalleryController",["projects",function(projectService){
  var self = this;
  //this.projects = projectService.list;
  self.displayables = images;
  self.thumbsleft = [];
  self.thumbsright = [];

  for(var i = 0 ; i < 5 ; i++){
    self.thumbsleft.push(images[0].thumb);
  }

  for(var i = 0 ; i < 5 ; i++){
    self.thumbsright.push(images[0].thumb);
  }
}]);

var images = [
  {
    full: "assets/img/01/Pilote.jpg",
    link: "assets/img/01/Pilot_square.png",
    thumb: "assets/img/01/Pilot_thumbnail.png"
  },
  {
    link: "assets/img/07/Gas_square.png"
  },
  {
    link: "assets/img/12/Pouches_square.jpg"
  },
  {
    link: "assets/img/16/Bruleur_square.png"
  }
]
