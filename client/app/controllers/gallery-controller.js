angular.module("brofolioApp").controller("GalleryController",["projects",function(projectService){
  var self = this;
  this.projects = projectService.list;
  self.displayables = [];

  for(var i = 0 ; i < this.projects.length ; i++){
    if(this.projects[i].assets.length){
      this.displayables.push(this.projects[i].assets[0]);
    }
  }

  console.log(self.displayables);
}]);
