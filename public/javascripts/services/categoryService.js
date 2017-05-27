app.factory('categoryService', function ($http) {
  var categoryID = '';
  var category = {};
  return {
    getCategories: function () {
      return $http.get('getCategories');
    },
    createCategory: function (category) {
      return $http.post("createCategory", category).then(
        success = function (data) {

        },
        failure = function (err) {

        });
    },
    getCategoryID: function () {
      return categoryID;
    },
    setCategoryID: function (value) {
      categoryID = value;
    },
    getSelectedCategory: function (categoryID) {
      return category;
    },
    setSelectedCategory: function (cat) {
      category = cat;
    },
    updateCategory: function (category) {
      return $http.put("updateCategory/" + category.CategoryID, category).then(
        success = function (data) {

        },
        failure = function (err) {

        });
    },
    createCategory: function (category) {
      return $http.post("createCategory", category).then(
        success = function (data) {

        },
        failure = function (err) {

        });
    },
    deleteCategory: function (categoryID) {
      return $http.delete("deleteCategory/" + categoryID).then(
        success=function(data)
        {

        },
        failure =function(data){

        });
    }
  }
});
