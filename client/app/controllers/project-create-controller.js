angular.module("brofolioApp").controller("projectCreationController",["projects","$state","$log",function(projects,$state,$log){
  var self = this;
  self.projectList = projects.list;
  self.data = {};

  this.save = function(data){
    projects.add(data);
    self.data = {};
    $state.go("admin");
  };
}]);
