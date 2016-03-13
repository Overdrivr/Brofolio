angular.module("brofolioApp").controller("GalleryController",["Project",function(Project){
  var self = this;
  self.displayables = [];

  // Get project list with limit of ten
  Project.find("[where][id][lt]=10",
    function(value,responseHeaders){
      console.log(value);
      self.displayables = value;
    },
    function(httpResponse){
      console.error(httpResponse);
    });
}]);
