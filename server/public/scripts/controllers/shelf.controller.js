myApp.controller('ShelfController', function(UserService) { // ShelfController talks to UserService
    console.log('ShelfController created');
    var vm = this;
    // vm.userObject = UserService.userObject;
    vm.itemData = UserService.itemData

UserService.getitems(); // this is what tells this just runs the function in our service that communicates to the user services to get items off of the database

  });
  