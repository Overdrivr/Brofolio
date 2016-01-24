angular.module("brofolioApp")
  .controller("projectListController",[
    "$state",
    "$log",
    "$scope",
    "$mdMedia",
    "$mdDialog",
    "User",
    "Project",
  function($state,$log,$scope,$mdMedia,$mdDialog,User,Project){

  // methods

  // bound data
  var self = this;
  self.projectList = [];

  // init
  getProjects();

  function getProjects() {
    Project.find({},
    function(list){
      self.projectList = list;
    },
    function(err){
      console.log("Cannot get project list");
    });
  }

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
      Project.create({
        title : title
        },
        function(value, responseHeaders) {
          // success
          getProjects();
        },
        function(httpResponse) {
          // failure
          console.log("project creation failed : ",httpResponse);
        });
    }, function() {
      // Dialog cancelled, do nothing
    });

    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

  $scope.showDeleteProjectDialog = function(data) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Project deletion')
          .textContent('Do you want to delete project '+ data.title + ' (id: '+ data.id +') ?')
          .ariaLabel('delete project ' + data.id)
          .ok('Confirm')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      Project.deleteById({
        id: data.id
      },function(value, responseHeaders) {
        getProjects();
      },function(httpResponse) {
        console.log("project deletion failed : ",httpResponse);
      });
    }, function() {
      // Cancelled, do noting
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
