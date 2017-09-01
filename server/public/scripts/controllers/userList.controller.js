myApp.controller('UserListController',['UserService', '$http', function (UserService, $http) {
    console.log('UserListController created');
    
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.userList = UserService.userList;
    UserService.getUserList();
  }]);