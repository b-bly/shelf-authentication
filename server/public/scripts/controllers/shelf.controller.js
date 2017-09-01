myApp.controller('ShelfController', ['UserService', '$http', function (UserService, $http) { // ShelfController talks to UserService
  console.log('ShelfController created');
  var vm = this;
  // vm.userObject = UserService.userObject;
  vm.itemData = UserService.itemData

  UserService.getitems(); // this is what tells this just runs the function in our service that communicates to the user services to get items off of the database

  vm.deleteItem = function (id) {
    $http.delete('/shelf/' + id).then(function (response) {
      console.log(response);
      UserService.getitems();
    });
  };
}]);
