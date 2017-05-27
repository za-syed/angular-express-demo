var schemas = require("../models/schemas");
cust = schemas.Customer;
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

exports.createCategory = function (req, res) {
    var cat = req.body;
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
                    .input("categoryName", sql.VarChar, cat.CategoryName)
                    .input("description", sql.VarChar, cat.Description)
                    .query("INSERT INTO [dbo].[Categories] ([CategoryName] ,[Description]) VALUES (@categoryName ,@description)",
                    function (err, recordset) {
                        if (err) {
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

exports.updateCategory = function (req, res) {
    var cat = req.body;
    var id = req.params.id
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
                    .input("categoryName", sql.VarChar, cat.CategoryName)
                    .input("description", sql.VarChar, cat.Description)
                    .input("id", sql.VarChar, id)
                    .query("UPDATE [dbo].[Categories] SET [CategoryName] = @categoryName, [Description] = @description WHERE CategoryID = @id",
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
exports.deleteCategory = function (req, res) {
    var cat = req.body;
    var id = req.params.id;
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
                    .input("id", sql.VarChar, id)
                    .query("delete from Categories where CategoryID = @id",
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
exports.getCategory = function (req, res) {
    var id = req.params.id;
    sql.connect(config, function (err) {
        new sql.Request()
            .input("input_param", sql.Int, id)
            .query("select CategoryID as [ID],CategoryName as [Name], Description as [Desc] from Categories where CategoryID = @input_param")
            .then(function (dbData) {
                if (dbData == null || dbData.length === 0)
                    return;
                //  console.dir('All the courses');
                res.send(dbData[0]);
            })
            .catch(function (error) {
                console.dir(error);
            });
    });

};
exports.getCategories = function (req, res) {
    sql.connect(config, function (err) {
        new sql.Request()
            .query("select CategoryID,CategoryName, Description from Categories")
            .then(function (dbData) {
                if (dbData == null || dbData.length === 0)
                    return;
                //  console.dir('All the courses');
                res.send(dbData);
            })
            .catch(function (error) {
                console.dir(error);
            });
    });
};


