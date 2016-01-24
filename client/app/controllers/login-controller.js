angular.module("brofolioApp")
  .controller('LoginCtrl',function($scope, User){
    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.login = function(credentials) {
      $scope.loginResult = User.login(credentials,
      function() {
        // success
        console.log("Logged in")
      },
      function(res) {
        // failure
        console.log("Failed to log :",res)
      });
    }
  });
