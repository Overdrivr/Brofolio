angular.module("brofolioApp").controller("GalleryController",["projects",function(projectService){
  var self = this;
  //this.projects = projectService.list;
  self.displayables = images;


  console.log(self.displayables);
}]);

var images = [
  {
    link: "assets/img/01/Pilot_square.png"
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
