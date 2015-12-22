angular.module("brofolioApp")
  .controller("projectCreationController",
  ["projects","$state","$log","$scope","$mdMedia","$mdDialog",
  function(projects,$state,$log,$scope,$mdMedia,$mdDialog){

  var self = this;
  self.projectList = projects.list;
  self.data = {};

  this.save = function(data){
    projects.add(data);
    self.data = {};
    $state.go("admin");
  };

  $scope.showCreateProjectDialog = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/app/templates/dialog-create-project.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
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
