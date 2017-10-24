myApp.factory('UserService', function ($http, $location) {
  console.log('UserService Loaded');

  var userObject = {};
  var itemData = {list:[]};
  var userList = {list:[]};
  
  return {
    userObject: userObject,
    itemData: itemData,
    userList: userList,

    getuser: function () {
      $http.get('/user').then(function (response) {
        if (response.data.username) {
          // user has a curret session on the server
          userObject.userName = response.data.username;
          console.log('User Data: ', userObject.userName);
        } else {
          // user has no session, bounce them back to the login page
          $location.path("/home");
        }
      });
    },

    logout: function () {
      $http.get('/user/logout').then(function (response) {
        console.log('logged out');
        $location.path("/home");
      });
    },

    getitems: function () {
      $http.get('/shelf').then(function (response) {
        console.log('response is', response)
        if (response.status == 200) {
          itemData.list = response.data;
          console.log('response from shelf get req', response);
      
        }


      });
    },

    getUserList: function() {
      $http.get('/userList').then(function(response){
        console.log('response is:', response);
        userList.list = response.data;
       
      });
    }

  };

});
