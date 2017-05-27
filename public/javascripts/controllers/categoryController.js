app.controller('categoryContoller', ['$scope', '$location', 'categoryService', function ($scope, $location, categoryService) {
    $scope.categories = [];
    $scope.category = {};
    $scope.getCategories = function () {
        $scope.categories = null;
        categoryService.getCategories().
            success(function (data, status, headers, config) {
                $scope.categories = data;
            })
            .error(function (data, status, headers, config) {
            });
    };

    $scope.getCategories();

    $scope.doSomething = function (view) {
        $location.path(view); // path not hash       
        console.log($location.path());
    };
    $scope.displayCategory = function (cat) {
        $scope.category = cat;
        categoryService.setSelectedCategory(cat);
        $scope.doSomething('category/details');
    };
    $scope.addCategory = function () {
        $scope.doSomething('category/create');
    };
    $scope.EditCategory = function (cat) {
        $scope.category = cat;
        categoryService.setSelectedCategory(cat);
        $scope.doSomething('category/edit');
    };
    $scope.deleteCategory = function (id) {
        categoryService.deleteCategory(id);
        $scope.getCategories();
        $scope.doSomething('category');
    };

}]);
app.controller('categoryDetailsContoller', ['$scope', '$location', 'categoryService', function ($scope, $location, categoryService) {
    $scope.getCategory = function () {
        var cat = {};
        cat = categoryService.getSelectedCategory();
        $scope.cat = cat;
    };
    $scope.getCategory();
    $scope.changeView = function (view) {
        $location.path(view); // path not hash       
        console.log($location.path());
    };
}]);
app.controller('categoryEditContoller', ['$scope', '$location', 'categoryService', function ($scope, $location, categoryService) {

    $scope.getCategory = function () {
        var cat = {};
        cat = categoryService.getSelectedCategory();
        $scope.cat = cat;
    };
    $scope.updateCategory = function (valid) {
        if (valid) {
            var category = {
                CategoryID: $scope.cat.CategoryID,
                CategoryName: $scope.cat.CategoryName,
                Description: $scope.cat.Description,
            };
            categoryService.updateCategory(category);
            $scope.cat = category;
            $scope.changeView('category');
        }
    };
    $scope.getCategory();
    $scope.changeView = function (view) {
        $location.path(view); // path not hash       
        console.log($location.path());
    };
}]);
app.controller('categoryCreateContoller', ['$scope', '$location', 'categoryService', function ($scope, $location, categoryService) {
    $scope.cat = {
        CategoryID: "",
        CategoryName: "",
        Description: ""
        // Success: true,
        // Message: ""
    };
    $scope.createCategory = function (valid) {
        if (valid) {
            categoryService.createCategory($scope.cat);
            $scope.changeView('category');
        }
    };
    $scope.changeView = function (view) {
        $location.path(view); // path not hash       
        console.log($location.path());
    };

}]);