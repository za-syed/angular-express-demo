app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: './partial/home/index.html',
      controller: 'loginContoller'

    })
      .when("/home", {
      templateUrl: './partial/home/index.html',
      controller: 'loginContoller'

    })
     .when("/contact", {
      templateUrl: './partial/home/contact.html',
      controller: 'loginContoller'

    })
      .when("/about", {
      templateUrl: './partial/home/about.html',
      controller: 'loginContoller'

    })
    .when("/customer", {
      templateUrl: './partial/customer/index.html',
      controller: 'customerContoller'

    })
    .when("/customer/index", {
      templateUrl: './partial/customer/index.html',
      controller: 'customerContoller'

    })
    .when("/customer/details", {
      templateUrl: './partial/customer/details.html',
      controller: 'customerDetailsContoller'
    })
    .when("/customer/create", {
      templateUrl: './partial/customer/create.html',
      controller: 'customerCreateContoller'
    })
    .when("/category/details", {
      templateUrl: './partial/category/details.html',
      controller: 'categoryDetailsContoller'
    })
    .when("/category/edit", {
      templateUrl: './partial/category/edit.html',
      controller: 'categoryEditContoller'
    })
    .when("/category/create", {
      templateUrl: './partial/category/create.html',
      controller: 'categoryCreateContoller'
    })
     .when("/login", {
      templateUrl: './partial/login/login.html',
      controller: 'loginContoller'
    })
     .when("/admin", {
      templateUrl: './partial/login/index.html',
      controller: 'userCreateContoller'
    })
     .when("/exp", {
      templateUrl: './partial/login/exp.html',
      controller: 'expContoller'
    })
    .when("/register", {
      templateUrl: './partial/login/register.html',
      controller: 'loginContoller'
    })
    .when("/category", {
      templateUrl: './partial/category/index.html',
      controller: 'categoryContoller'
    });

});