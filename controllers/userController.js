var schemas = require("../models/schemas");
var user = schemas.User;
user.Valid = false;
users = [];
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


exports.performLogin = function (req, res) {

    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        var Username = req.params.Username;
        var Password = req.params.Password;
        request.input('Username', sql.VarChar, Username);
        request.input('Password', sql.NVarChar, Password);
        request.query("SELECT [ID],[Username],[Password],[UserID],[UserRole] FROM [Northwind].[dbo].[Users] WHERE [Username]= @Username AND [Password] =@Password;",
            function (err, recordset) {
                if (recordset) {
                    if (recordset.length > 0) {
                        user = recordset[0];
                        user.Valid = true;
                    }
                    else {
                        //user = null;
                        user.UserID = "";
                        user.Password = "";
                        user.UserRole = "";
                        user.Username = "";
                        user.Valid = false;
                    }
                }
                else {
                    user.Valid = false;
                }
                if (err) console.log(err)

                // send the updated user object as response.
                res.send(user);

            });
    });

};
exports.doesUserExist = function (req, res) {

    sql.connect(config, function (err) {

        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();

        // query to the database and get the records
        var Username = req.params.Username;
        var Password = req.params.Password;
        var UserExist = false;
        request.input('Username', sql.VarChar, Username);
        request.query("SELECT [Username],[Password],[UserID],[UserRole] FROM [Northwind].[dbo].[Users] WHERE [Username]= @Username",
            function (err, recordset) {
                if (recordset) {
                    if (recordset.length > 0) {
                        user = recordset[0];
                        UserExist = true;
                        //user.Valid = true;
                    }
                    else {
                        //user.Valid = false;
                        UserExist = false;
                    }
                }
                else {
                    //  UserExist = false;
                    user.Valid = false;
                }
                if (err) console.log(err)

                // send the updated user object as response.
                res.send(UserExist);

            });
    });

};
exports.createUser = function (req, res) {
    var user = req.body;
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
                    .input("Username", sql.VarChar, user.Username)
                    .input("Password", sql.VarChar, user.Password)
                    .input("UserID", sql.VarChar, user.UserID)
                    .input("UserRole", sql.VarChar, user.UserRole)
                    .query("INSERT INTO [dbo].[Users] ([Username],[Password],[UserID],[UserRole]) VALUES(@Username,@Password,@UserID,@UserRole)",
                    function (err, recordset) {
                        if (err) {
                            if (!rollBack) {
                                myTransaction.rollback(function (err) {
                                    console.dir(err);
                                    user.Success = false;
                                    user.Message = "User was not added.";
                                });
                                res.send(user);
                            }
                        } else {
                            myTransaction.commit().then(function (recordset) {
                                console.dir('Data is inserted successfully!');
                                user.Success = true;
                                user.Message = "User was added successfully";
                                res.send(user);
                            }).catch(function (err) {
                                console.dir('Error in transaction commit ' + err);
                            });
                        }
                    });
            });
        });
};
exports.getUser = function (req, res) {
    var id = req.params.Username;
    sql.connect(config, function (err) {
        new sql.Request()
            .input("Username", sql.VarChar, id)
            .query("SELECT [ID],[Username],[Password],[UserID],[UserRole] FROM [Northwind].[dbo].[Users] where [Username] = @Username")
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
exports.getUsers = function (req, res) {
    sql.connect(config, function (err) {
        new sql.Request()
            .query("SELECT [ID],[Username],[Password],[UserID],[UserRole] FROM [Northwind].[dbo].[Users]")
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



