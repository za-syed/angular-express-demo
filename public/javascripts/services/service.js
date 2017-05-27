app.factory('customersService', function ($http) {
  var customerID = '';
  var customer={};
  return {
    getCustomers: function () {
      return $http.get('getCustomers');
    },
    createCustomer: function (customer) {      
      return $http.post("createCustomer",customer).then(
        success=function(data){

        },
        failure=function(err){

        });
    },
     updateCustomer: function (customer) {      
      return $http.put("updateCustomer/"+customer.CustomerID,customer).then(
        success=function(data){

        },
        failure=function(err){

        });
    },
      deleteCustomer: function (customerID) {
      return $http.delete("deleteCustomer/" + customerID);
    },
    getCustomer: function (customerID) {
      return $http.get("getCustomer/" + customerID);
    },
    getCustomerID: function () {
      return customerID;
    },
    setCustomerID: function (value) {
      customerID = value;
    },
     getSelectedCustomer: function (customerID) {
      return customer;
    },
    setSelectedCustomer: function (cust) {
      customer = cust;
    }
   
  }
});