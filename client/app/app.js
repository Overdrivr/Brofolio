angular.module("brofolioApp",["ngMaterial","ui.router"])
  .config(function($stateProvider, $urlRouterProvider){

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
    })
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme("default")
  .primaryPalette("cyan")
  .accentPalette("orange");
});
