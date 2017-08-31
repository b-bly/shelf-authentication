myApp.controller('InfoController', ['$http', 'UserService', function($http, UserService) {
  console.log('InfoController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject; // pulls in data from UserService so that the info partial can see it and display the username

  vm.addItem = function(){
    console.log('addItem', vm.newItem);
    $http.post('/shelf', vm.newItem).then(function(response){
      console.log('post response', response);

    });
  };




}]);


