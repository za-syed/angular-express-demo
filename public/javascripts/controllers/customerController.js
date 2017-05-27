app.controller('customerContoller', ['$scope', '$location', 'customersService', function ($scope, $location, customersService) {
    $scope.customers = [];
    $scope.cust = {};
    $scope.getCustomers = function () {
        customersService.getCustomers().
            success(function (data, status, headers, config) {
                $scope.customers = data;
            })
            .error(function (data, status, headers, config) {
            });
    };

    $scope.getCustomers();

    $scope.doSomething = function (view) {
        $location.path(view); // path not hash       
        console.log($location.path());
    };
    $scope.displayCustomer = function (customer) {
        $scope.cust = customer;
        customersService.setSelectedCustomer(customer);
        $scope.doSomething('customer/details');
    };
    $scope.addCustomer = function () {
        $scope.doSomething('customer/create');
    };
    $scope.EditCustomer = function (customer) {
        $scope.cust = customer;
        customersService.setSelectedCustomer(customer);
        $scope.doSomething('customer/edit');
    };
    $scope.deleteCustomer = function (id) {
        customersService.deleteCustomer(id);
        $scope.doSomething('customer/index');
    };

}]);
app.controller('customerDetailsContoller', ['$scope', '$location', 'customersService', function ($scope, $location, customersService) {
    $scope.getCustomer = function () {
        var cust = {};
        cust = customersService.getSelectedCustomer();
        $scope.cust = cust;
    };
    $scope.getCustomer();
    $scope.changeView = function (view) {
        $location.path(view); // path not hash       
        console.log($location.path());
    };
    $scope.changeView = function (view) {
        $location.path(view); // path not hash       
        console.log($location.path());
    };
}]);
app.controller('customerEditContoller', ['$scope', '$location', 'customersService', function ($scope, $location, customersService) {

    $scope.getCustomer = function () {
        var cust = {};
        cust = customersService.getSelectedCustomer();
        $scope.cust = cust;
    };
    $scope.updateCustomer = function () {
        var customer = {
            CustomerID: $scope.cust.CustomerID,
            CompanyName: $scope.cust.CompanyName,
            ContactName: $scope.cust.ContactName,
            ContactTitle: $scope.cust.ContactTitle,
            Address: $scope.cust.Address,
            City: $scope.cust.City,
            Phone: $scope.cust.Phone,
            Success: true,
            Message: ""
        };
        customersService.updateCustomer(customer);
        $scope.cust = customer;
        $scope.changeView('customer/index');
    };
    $scope.getCustomer();
    $scope.changeView = function (view) {
        $location.path(view); // path not hash       
        console.log($location.path());
    };
}]);
app.controller('customerCreateContoller', ['$scope', '$location', 'customersService', function ($scope, $location, customersService) {
    $scope.cust = {
        CustomerID: "",
        CompanyName: "",
        ContactName: "",
        ContactTitle: "",
        Address: "",
        City: "",
        Phone: "",
        Success: true,
        Message: ""
    };
    $scope.hasFocus=false;
    $scope.createCustomer = function (valid) {
         $scope.hasFocus=true;
        if (valid) {
            customersService.createCustomer($scope.cust);
            $scope.changeView('customer/index');
        }
    };
    $scope.changeView = function (view) {
        $location.path(view); // path not hash       
        console.log($location.path());
    };

}]);