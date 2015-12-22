angular.module("brofolioApp",["ngMaterial","ui.router","lodash","ngFileUpload"])
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "/app/templates/login.html"
      })
      .state('admin', {
        url: "/projects",
        templateUrl: "/app/templates/project-list.html",
        controller: "projectCreationController",
        controllerAs: "projects"
      })
      .state('create', {
        url: "/create",
        templateUrl: "/app/templates/project-create.html",
        controller: "projectCreationController",
        controllerAs: "projects"
      })
      .state('edit', {
        url: "/edit/:id",
        templateUrl: "/app/templates/project-edit.html",
        controller: "projectEditionController",
        controllerAs: "projects"
      })
      .state('gallery', {
        url:"/",
        templateUrl: "/app/templates/gallery.html",
        controller: "GalleryController",
        controllerAs: "galleryCtrl"
      }).
      state('details', {
        url:"/details/:id",
        templateUrl: "/app/templates/details.html",
        controller: "GalleryController",
        controllerAs: "detailsCtrl"
      });
    })
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme("default")
  .primaryPalette("cyan")
  .accentPalette("orange");
});
