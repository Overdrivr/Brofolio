angular.module("brofolioApp")
.controller("projectEditController",[
  "projects",
  "$state",
  "$stateParams",
  "$mdDialog",
  "Upload",
  function(projects,  $state,  $stateParams,  $mdDialog, Upload){

  var vm = this;

  //-- Function members
  vm.removeAsset = removeAsset;
  vm.uploadAsset = uploadAsset;
  vm.save = save;

  //-- Bound objects
  vm.projectList = projects.list;

  //-- Initialization
  init();

  //-- Implementations

  function init(){
    // Find project in list by id
    var existingData = projects.get($stateParams.id);

    if(existingData){
      vm.data = existingData;
      vm.id = $stateParams.id
    }
    else {
      $state.go("admin");
    }
  };

  function removeAsset(asset){
    // Ask for confirmation
    var confirm = $mdDialog.confirm()
          .title('Asset')
          .textContent('Do you want to remove the asset from the project ?')
          .ariaLabel('Delete the asset or not ?')
          .ok('Yes')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
      projects.removeAsset(vm.id,asset);
      vm.data = projects.get(vm.id);
    }, function() {
      // Do nothing
    });
  };

  function save(data){
    projects.edit(vm.id,vm.data);
    vm.data = {};
    $state.go("admin");
  };

  function uploadAsset(file) {
    if(!file){
      return;
    }
     Upload.upload({
         url: 'api/Containers/test/upload',
         data: {file: file, 'username': 'bouffon'}
     }).then(function (resp) {
         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
         projects.addAsset(vm.id,file.name);
         vm.data = projects.get(vm.id);
     }, function (resp) {
         console.log('Error status: ' + resp.status);
     }, function (evt) {
         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
     });
  };
}])
