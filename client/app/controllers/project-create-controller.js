angular.module("brofolioApp")
  .controller("projectCreationController",
  ["projects","$state","$log","$scope","$mdMedia","$mdDialog",
  function(projects,$state,$log,$scope,$mdMedia,$mdDialog){

  var self = this;
  self.projectList = projects.list;

  $scope.showCreateProjectDialog = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    // Open the dialog to request project name
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/app/templates/dialog-create-project.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    // Actions to perform once dialog is closed
    .then(function(title) {
      projects.add(title);
    }, function() {
      // Dialog cancelled, do nothing
    });

    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };
}]);

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
