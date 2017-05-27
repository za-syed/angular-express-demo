var schemas = {
    Customer: {
        CustomerID: String,
        CompanyName: String,
        ContactName: String,
        ContactTitle: String,
        Address: String,
        City: String,
        Phone: String,
        Success: Boolean,
        Message: String
    },
     User: {        
        Username: String,
        Password: String,
        UserID: String,
        UserRole: String, 
        Valid:Boolean,
        Success:Boolean,
        Message:String      
    }
}
// Customer.CreateInstance=function(custid, compname,contname,conttitle,address,city,phone){
//     var cust=new Customer;
//     cust.CustomerID =custid;
//     cust.CompanyName =compname;
//     cust.ContactName =contname;
//     cust.ContactTitle =conttitle;
//     cust.Address =address;
//     cust.City =city;
//     cust.Phone =phone;
//     return cust;
// };
module.exports = schemas;