angular.module("brofolioApp").controller("projectEditionController",["projects","$state","$stateParams",function(projects,$state,$stateParams){
  var self = this;
  self.projectList = projects.list;

  // Find project in list by id
  var existingData = projects.get($stateParams.id);

  if(existingData){
    self.data = existingData;
    self.id = $stateParams.id
  }
  else {
    $state.go("admin");
  }

  this.save = function(data){
    projects.edit(self.id,self.data);
    self.data = {};
    $state.go("admin");
  };
}]);
