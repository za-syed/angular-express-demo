app.controller('loginContoller', ['$scope', '$q', '$location', 'userService', 'categoryService', function ($scope,
    $q, $location, userService, categoryService) {
    // $scope.$watch(userService.isLoggedIn, function (newVal) {
    //     $scope.loggedIn = newVal;
    // });   
    Users = [];
    $scope.user = {
        Username: "",
        Password: "",
        isValid: false,
        loggedIn: false
    };
    $scope.user = userService.user;
    $scope.login = function () {
        var promise = userService.performLogin($scope.user);
        promise.then(
            function (resp) {
                if (resp) {
                    if (resp.user) {
                        if (resp.user.Valid) {
                            $scope.user.Username = resp.user.Username;
                            $scope.user.Password = '';
                            $scope.user.isValid = true;
                            $scope.user.loggedIn = true;
                            $scope.changeView('category');
                        }
                        else {
                            $scope.errorMessage = 'Invalid username or password!';
                            $scope.user.Username = '';
                            $scope.user.Password = '';
                            $scope.user.isValid = false;
                            $scope.user.loggedIn = false;
                            $scope.changeView('login');
                        }

                    }
                    else {
                        $scope.errorMessage = 'Invalid username or password!';
                        $scope.changeView('login');
                    }
                }
            },
            function (error) {
            },
            function (progress) {
            });
    };
    //   $scope.login = function () {
    //       var customers = customersService.getCustomers();
    //       $scope.user= userService.performLogin($scope.user);
    //     if ( $scope.user.Valid) {
    //         $scope.errorMessage = '';          
    //         userService.login($scope.user);
    //         $scope.changeView('category')
    //     }
    //     else {
    //         $scope.loggedIn = null;
    //           userService.user =null;
    //         $scope.errorMessage = "Invalid username or password!";
    //     }
    // };   

    $scope.logout = function () {
        userService.logout();
        $scope.changeView('login')
    };
    $scope.changeView = function (view) {
        $location.path(view); // path not hash       
        console.log($location.path());
    };

    $scope.getUsers = function () {
        var promise = userService.getUsers();
        promise.then(
            function (resp) {
                if (resp) {
                    if (resp.Users) {
                        $scope.Users = resp.Users;
                        //lc.Users = resp.Users;
                        //lc.displayedCollection = [].concat(lc.Users);
                    }
                    else {
                        $scope.errorMessage = resp.data;
                        // $scope.usernameNotAvailable = null;
                    }
                }
            },
            function (error) {
            },
            function (progress) {
            });
    };
    $scope.getUsers();
    $scope.getUser = function () {
        var promise = userService.getUser($scope.user.Username);
        promise.then(
            function (resp) {
                if (resp) {
                    if (resp.user) {
                        $scope.Users = resp.user;
                    }
                    else {
                        $scope.errorMessage = resp.data;
                        // $scope.usernameNotAvailable = null;
                    }
                }
            },
            function (error) {
            },
            function (progress) {
            });
        // if ($scope.errorOccured) {
        //     $scope.errorMessage = "Error Occured";
        // }
    };

}]);
app.controller('userCreateContoller', ['$scope', '$location', 'userService', function ($scope, $location, userService) {
    $scope.user = {
        Username: "",
        Password: "",
        UserID: "",
        UserRole: "",
        Valid: false
    };
    // $scope.createUser = function (valid) {
    //     if (valid) {
    //         // userService.createUser($scope.user,
    //         //     success =function (data, status, headers, config) {
    //         //        alert('Success');
    //         //     }
    //         //     , error= function (data, status, headers, config) {
    //         //         $scope.errorMessage = "Failed to create new user.";
    //         //     }
    //         // );
    //         $scope.errorMessage = "";
    //         userService.createUser($scope.user).then(
    //             success = function (data) {
    //                 if (data.data) {
    //                     if (data.data.Valid) {
    //                         $scope.successMessage = data.data.Message;
    //                         $scope.changeView('category');

    //                     }
    //                     else {
    //                         $scope.errorMessage = data.data.Message;
    //                         if (!$scope.errorMessage) {
    //                             $scope.changeView('category');
    //                         }
    //                     }
    //                 }
    //             }
    //             , error = function (data) {
    //                 $scope.errorMessage = "Failed to create new user.";
    //             }
    //         );

    //     }
    // };


    $scope.createUser = function () {
        $scope.usernameNotAvailable = "";
        $scope.UsernameInUse = false;
        // $scope.errorOccured = false;
        var promise = userService.createUser($scope.user);
        promise.then(
            function (resp) {
                if (resp) {
                    if (resp.user) {
                        if (resp.user.Success) {
                            //  $scope.successMessage = resp.user.Message;
                            $scope.user = resp.user;
                            $scope.changeView('admin');
                        }
                        else {
                            $scope.errorMessage = resp.user.Message;
                            // $scope.changeView('category');
                        }
                    }
                    else {
                        $scope.errorMessage = resp.data;
                        // $scope.usernameNotAvailable = null;
                    }
                }
            },
            function (error) {
            },
            function (progress) {
            });
        // if ($scope.errorOccured) {
        //     $scope.errorMessage = "Error Occured";
        // }
    };

    $scope.doesUserExist = function () {
        $scope.usernameNotAvailable = "";
        $scope.UsernameInUse = false;
        // $scope.errorOccured = false;
        var promise = userService.doesUserExist($scope.user.Username);
        promise.then(
            function (resp) {
                if (resp) {
                    if (resp.usercheck) {
                        $scope.UsernameInUse = resp.usercheck;
                        $scope.usernameNotAvailable = "Oops username is already in use!";
                    }
                    else {
                        $scope.UsernameInUse = resp.usercheck;
                        $scope.usernameNotAvailable = null;
                    }
                }
            },
            function (error) {
            },
            function (progress) {
            });
        // if ($scope.errorOccured) {
        //     $scope.errorMessage = "Error Occured";
        // }
    };
    $scope.getUsers = function () {
        var promise = userService.getUsers();
        promise.then(
            function (resp) {
                if (resp) {
                    if (resp.Users) {
                        $scope.Users = resp.Users;
                        //lc.Users = resp.Users;
                        //lc.displayedCollection = [].concat(lc.Users);
                    }
                    else {
                        $scope.errorMessage = resp.data;
                        // $scope.usernameNotAvailable = null;
                    }
                }
            },
            function (error) {
            },
            function (progress) {
            });
    };
    $scope.getUsers();
    $scope.changeView = function (view) {
        $location.path(view); // path not hash       
        console.log($location.path());
    };

}]);
app.controller('expContoller', ['$scope', '$q', '$location', 'userService', function ($scope,
    $q, $location, userService) {
    var lc = this;
    lc.rowList = [];
    $scope.changeView = function (view) {
        $location.path(view); // path not hash       
        console.log($location.path());
    };

    lc.getUsers = function () {
        var promise = userService.getUsers();
        promise.then(
            function (resp) {
                if (resp) {
                    if (resp.Users) {
                        //$scope.Users = resp.Users;
                        lc.rowList = resp.Users;
                        lc.displayedCollection = [].concat(lc.rowList);
                    }
                    else {
                        $scope.errorMessage = resp.data;
                        // $scope.usernameNotAvailable = null;
                    }
                }
            },
            function (error) {
            },
            function (progress) {
            });
    };
    lc.getUsers();
    lc.showPopup = function () {
        $("#myModal").modal('show');
    };

}])