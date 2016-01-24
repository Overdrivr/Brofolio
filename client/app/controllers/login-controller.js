angular.module("brofolioApp")
  .controller('LoginCtrl',function($scope, User, $state){
    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.login = function(credentials) {
      $scope.loginResult = User.login(credentials,
      function() {
        // success
        $state.go('admin')
      },
      function(res) {
        // failure
        // Display error banner
        console.log("Failed to login :",res)
      });
    }
  });
