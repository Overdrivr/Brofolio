angular.module("brofolioApp").controller("GalleryController",["projects",function(projectService){
  this.projects = projectService.list;
}]);
