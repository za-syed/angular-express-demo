app.factory('userService', ['$http', '$q', function ($http, $q) {
  var loggedIn = false;
  var _user = {
    Username: "",
    Password: "",
    loggedIn: false
  };
  var Users = [];

  // var doesUserExist = function (username) {
  //   var deferred = $q.defer();
  //   var UserExist = null;
  //   var promise= $http.get("doesUserExist/" + username)
  //   // promise.then(
  //   //   function (data) {
  //   //     UserExist = data;
  //   //   },
  //   //   function (error) {
  //   //   },
  //   //   function (progress) {
  //   //   });

  //   deferred.resolve(UserExist);
  //   return deferred.promise;
  // };


  return {
    user: _user,
    isLoggedIn: function () {
      return loggedIn;
    },
    login: function (User) {
      User.loggedIn = true;
      this.user = User;
    },
    logout: function () {
      this.user.loggedIn = false;
      // _user=user;
    },
    // createUser: function (u) {
    //   return $http.post("createUser", u);
    //   // success = function (data) {        
    //   //   },
    //   //   failure = function (err) {

    //   //   });
    // },
    createUser: function (u) {
      var deferred = $q.defer();
      $http.post("createUser", u)
        .success(function (data) {
          this.user = data;
          deferred.resolve({
            user: data
          });
        }).error(function (msg, code) {
          deferred.reject(msg);
          // $log.error(msg, code);
        });
      return deferred.promise;
    },
    getUser: function (u) {
      var deferred = $q.defer();
      $http.get("getUser", u)
        .success(function (data) {
          this.user = data;
          deferred.resolve({
            user: data
          });
        }).error(function (msg, code) {
          deferred.reject(msg);
          // $log.error(msg, code);
        });
      return deferred.promise;
    },
    getUsers: function () {
      var deferred = $q.defer();
      $http.get("getUsers")
        .success(function (data) {
          this.Users = data;
          deferred.resolve({
            Users: data
          });
        }).error(function (msg, code) {
          deferred.reject(msg);
          // $log.error(msg, code);
        });
      return deferred.promise;
    },

    doesUserExist: function (username) {
      var deferred = $q.defer();
      $http.get("doesUserExist/" + username)
        .success(function (data) {
          deferred.resolve({
            usercheck: data
          });
        }).error(function (msg, code) {
          deferred.reject(msg);
          // $log.error(msg, code);
        });
      return deferred.promise;
    },

    performLogin: function (user) {
      var deferred = $q.defer();
      $http.get("performLogin/" + user.Username + "/" + user.Password)
        .success(function (data) {
          deferred.resolve({
            user: data
          });
        }).error(function (msg, code) {
          deferred.reject(msg);
          // $log.error(msg, code);
        });
      return deferred.promise;
      //return $http.get("performLogin/" + user.Username+"/"+user.Password);

      //.then(
      //   success=function(resp){

      //   },
      //   error=function(err){

      //   }
      // )
      // if (test) {
      //   if (test.Valid) {
      //     _user.isValid=true;
      //     _user.loggedIn = true;
      //   }
      //   else
      //   {
      //      _user.isValid=false;
      //     _user.loggedIn = false;
      //   }
      // }
      // return test;
    }
  };

}]);