(function(){
  var app = angular.module("navBar", []);

  app.directive("navigationBar", function(){
    return {
      restrict: 'E',
      templateUrl: "/app/shared/navbar.html"
    };
  });
})();
