angular.module("brofolioApp")
.controller("projectEditController",[
  "projects",
  "$state",
  "$stateParams",
  "$mdDialog",
  function(projects,  $state,  $stateParams,  $mdDialog){

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

  // TODO : Move to service
  function uploadAsset(file) {
    if(!file){
      return;
    }

    projects.addAsset(vm.id,file,function(err){
      // On operation complete
      if(err) return console.log(err);
      vm.data = projects.get(vm.id);
      console.log("Uploaded successfully.");
    }, function(progress){
      // During operation
      console.log("Progress ",progress," %");
    });
  };
}])
