var schemas = require("../models/schemas");
var cust = schemas.Customer;
custs = [];
var sql = require("mssql");
var config = {
    user: 'sa',
    password: 'Abid@123',
    server: 'L-AI419547',
    database: 'Northwind',
    debug: true,
    options: {
        encrypt: false // Use this if you're on Windows Azure
        , instanceName: 'ABID'
    }
}
exports.getCustomers = function (req, res) {
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        request.query('SELECT [CustomerID] ,[CompanyName],[ContactName],[ContactTitle],[Address],[City],[Phone] FROM [Northwind].[dbo].[Customers]',
            function (err, recordset) {
                if (err) console.log(err)
                custs = recordset;
                res.send(custs);

            });
    });

};


exports.getCustomerByID = function (req, res) {

    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        var cid = req.params.id;
        request.input('input_parameter', sql.VarChar, cid);
        request.query("SELECT [CustomerID] ,[CompanyName],[ContactName],[ContactTitle],[Address],[City],[Phone] FROM [Northwind].[dbo].[Customers] WHERE CustomerID = @input_parameter",
            function (err, recordset) {
                cust = recordset[0]; //customer  recordset[0];
                if (err) console.log(err)

                // send records as a response
                res.send(cust);

            });
    });

};
exports.createCustomer = function (req, res) {
    cust = req.body;
    var dbConn = new sql.Connection(config,
        function (err) {
            var myTransaction = new sql.Transaction(dbConn);
            myTransaction.begin(function (error) {
                var rollBack = false;
                myTransaction.on('rollback',
                    function (aborted) {
                        rollBack = true;
                    });
                new sql.Request(myTransaction)
                    .input('customerID', sql.VarChar, cust.CustomerID)
                    .input('companyName', sql.VarChar, cust.CompanyName)
                    .input('contactName', sql.VarChar, cust.ContactName)
                    .input('contactTitle', sql.VarChar, cust.ContactTitle)
                    .input('address', sql.VarChar, cust.Address)
                    .input('city', sql.VarChar, cust.City)
                    .input('phone', sql.VarChar, cust.Phone)
                    .query('INSERT INTO Customers([CustomerID],[CompanyName],[ContactName],[ContactTitle],[Address],[City],[Phone]) VALUES (@customerID,@companyName,@ContactName,@contactTitle,@address,@city,@phone)',
                    function (err, recordset) {
                        if (err) {
                            cust.Success=false;
                            cust.Message=err.message;
                            if (!rollBack) {
                                myTransaction.rollback(function (err) {
                                    console.dir(err);
                                });
                            }
                        } else {
                            myTransaction.commit().then(function (recordset) {
                                console.dir('Data is inserted successfully!');
                            }).catch(function (err) {
                                console.dir('Error in transaction commit ' + err);
                            });
                        }
                    });
            });
        });
};
exports.updateCustomer = function (req, res) {
    var cid = req.params.id;
    var cust = req.body;
    var dbConn = new sql.Connection(config,
        function (err) {
            var myTransaction = new sql.Transaction(dbConn);
            myTransaction.begin(function (error) {
                var rollBack = false;
                myTransaction.on('rollback',
                    function (aborted) {
                        rollBack = true;
                    });
                new sql.Request(myTransaction)
                    .input('companyName', sql.VarChar, cust.CompanyName)
                    .input('contactName', sql.VarChar, cust.ContactName)
                    .input('contactTitle', sql.VarChar, cust.ContactTitle)
                    .input('address', sql.VarChar, cust.Address)
                    .input('city', sql.VarChar, cust.City)
                    .input('phone', sql.VarChar, cust.Phone)
                    .input('customerID', sql.VarChar, cid)
                    .query('UPDATE Customers SET CompanyName = @companyName, ContactName = @contactName, ContactTitle = @contactTitle, Address = @address, City = @city, Phone = @phone WHERE CustomerID = @customerID',
                    function (err, recordset) {
                        if (err) {
                            if (!rollBack) {
                                myTransaction.rollback(function (err) {
                                    console.dir(err);
                                });
                            }
                        } else {
                            myTransaction.commit().then(function (recordset) {
                                console.dir('Data is updated successfully!');
                            }).catch(function (err) {
                                console.dir('Error in transaction commit ' + err);
                            });
                        }
                    });
            });
        });
};
exports.deleteCustomer = function (req, res) {
    var cid = req.params.id;
    var cust = req.body;
    var dbConn = new sql.Connection(config,
        function (err) {
            var myTransaction = new sql.Transaction(dbConn);
            myTransaction.begin(function (error) {
                var rollBack = false;
                myTransaction.on('rollback',
                    function (aborted) {
                        rollBack = true;
                    });
                new sql.Request(myTransaction)
                    .input('customerID', sql.VarChar, cid)
                    .query('delete from Customers WHERE CustomerID = @customerID',
                    function (err, recordset) {
                        if (err) {
                            if (!rollBack) {
                                myTransaction.rollback(function (err) {
                                    console.dir(err);
                                });
                            }
                        } else {
                            myTransaction.commit().then(function (recordset) {
                                console.dir('Data is deleted successfully!');
                            }).catch(function (err) {
                                console.dir('Error in transaction commit ' + err);
                            });
                        }
                    });
            });
        });
};


