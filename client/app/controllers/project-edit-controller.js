angular.module("brofolioApp")
.controller("projectEditController",[
  "Project",
  "$state",
  "$stateParams",
  "$mdDialog",
  "Upload",
  function(Project,  $state,  $stateParams,  $mdDialog, $upload){

  var vm = this;

  //-- Function members
  vm.removeAsset = removeAsset;
  vm.uploadAsset = uploadAsset;
  vm.save = save;

  //-- Bound objects
  vm.projectList = [];
  vm.containerId = undefined;

  //-- Initialization
  init();

  //-- Implementations

  function init(){
    // Find project in list by id
    var existingData = Project.findById({
      id: $stateParams.id
    },
    function(value,responseHeaders){
      console.log(value);
      vm.projectList = value;
      //vm.data = existingData;
      vm.containerId = value.containerId
    },
    function(httpResponse){
      console.error(httpResponse);
      $state.go("admin");
    });
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
    if(!file) return console.error("File is undefined");
    if(!vm.containerId) return console.error("containerId is undefined");

    $upload.upload({
        url: 'api/Containers/' + vm.containerId + '/upload',
        data: {file: file}
    }).then(function (resp) {
        console.log("Uploaded file");
    }, function (resp) {
        console.error("Upload failed with status " + resp.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log("Progress : " + progressPercentage)
    });
  };

}])
