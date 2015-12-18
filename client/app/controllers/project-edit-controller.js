angular.module("brofolioApp")
.controller("projectEditionController",
         ["projects","$state","$stateParams","$mdDialog","Upload",
  function(projects,  $state,  $stateParams,  $mdDialog, Upload){
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

  this.removeAsset = function(asset){
    console.log(asset);
    // Ask for confirmation
    var confirm = $mdDialog.confirm()
          .title('Asset')
          .textContent('Do you want to remove the asset from the project ?')
          .ariaLabel('Delete the asset or not ?')
          .ok('Yes')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      projects.removeAsset(self.id,asset);
      self.data = projects.get(self.id);
    }, function() {
      // Do nothing
    });
  };


  // upload on file select or drop
  this.uploadAsset = function (file) {
    console.log("file",file);
    if(!file){
      return;
    }
     Upload.upload({
         url: 'api/Containers/test/upload',
         data: {file: file, 'username': 'bouffon'}
     }).then(function (resp) {
         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
         projects.addAsset(self.id,file.name);
         self.data = projects.get(self.id);
     }, function (resp) {
         console.log('Error status: ' + resp.status);
     }, function (evt) {
         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
     });
  };
}])
