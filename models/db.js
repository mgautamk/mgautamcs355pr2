var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('select * from Student',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

//GetAllDealer
exports.GetAllDealer = function(callback) {
    connection.query('select * from DEALER',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}
//GetAllDealerAddress
exports.GetAllDealerAddress = function(callback) {
    connection.query('SELECT d.DealerID,d.DealerName,dr.City,dr.State FROM DEALER d ' +
    'JOIN DEALERADDRESS dr on dr.DealerID = d.DealerID ' +
    'ORDER BY DealerName;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}
//GetAllTransaction   //Make this a subquery?
exports.GetAllTransaction = function(callback) {
    connection.query('SELECT DISTINCT t.TransactionID,v.VehicleID,v.Make,v.Model,v.YEAR,v.PRICE,c.CustomerID,c.FirstName,c.LastName From TRANSACTION t ' +
    'LEFT JOIN VEHICLE v on t.VehicleID = v.VehicleID ' +
    'LEFT JOIN CUSTOMER c on t.CustomerID = c.CustomerID ' +
    'ORDER BY TransactionID;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

//GetAllVehicles
exports.GetAllVehicle = function(callback) {
    connection.query('select * from VEHICLE',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

//GetAllCustomer
exports.GetAllCustomer = function(callback) {
    connection.query('select * from CUSTOMER',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}
exports.GetAllView = function(callback) {
    console.log("You must create the StudentsView MySQL VIEW for the sql statement below to work.");
    // To create the StudentsView run the CREATE VIEW query below via the mysql client or mysql workbench.
    // CREATE VIEW StudentsView AS SELECT * FROM Students;
    connection.query('select Student_number, Name from StudentsView',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}


exports.GetByID = function(studentid, callback) {
    console.log(studentid);
    var query = 'select * from Student WHERE Student_number=' + studentid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
//GetByDealerID
exports.GetByDealerID = function(dealerid, callback) {
    console.log(dealerid);
    var query = 'select * from DEALER WHERE DealerID=' + dealerid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
//delete
exports.DealerDelete = function(dealerid, callback) {
    console.log(dealerid);
    var query = 'DELETE from DEALER WHERE DealerID=' + dealerid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
//This is using a View
exports.GetByDealerAddressID = function(DealerID, callback) {
    console.log(DealerID);
    var query = 'Select *  From DealerAddressViewByID WHERE DealerID=' + DealerID;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}

//Using a Procedure
exports.GetByTransactionID = function(TransactionID, callback) {
    console.log(TransactionID);
    var query = 'SELECT  * From TRANSACTIONVIEW WHERE TransactionID=' + TransactionID;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
//not using Procedure
//Using a Procedure
exports.GetByTransactionID2 = function(TransactionID, callback) {
    console.log(TransactionID);
    var query = 'CALL TransactionByID(' + (TransactionID) + ')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}



//GetByDealerAddress -- This can be modified to use a view OR a function
exports.GetByDealerAddress = function(DealerAddressID, callback) {
    console.log(DealerAddressID);
    var query = 'SELECT * From DEALERADDRESS WHERE DealerID=' + DealerAddressID;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
//DealerAddressDelete
//delete
exports.DealerAddressDelete = function(dealerid, callback) {
    console.log(dealerid);
    var query = 'DELETE from DEALERADDRESS WHERE DealerID=' + dealerid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
//GetByVehicleID
exports.GetByVehicleID = function(vehicleid, callback) {
    console.log(vehicleid);
    var query = 'select * from VEHICLE WHERE VehicleID=' + vehicleid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
//VehicleDelete
exports.VehicleDelete = function(VehicleID, callback) {
    console.log(VehicleID);
    var query = 'DELETE from VEHICLE WHERE VehicleID=' + VehicleID;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
//GetByCustomerID
exports.GetByCustomerID = function(customerid, callback) {
    console.log(customerid);
    var query = 'select * from CUSTOMER WHERE CustomerID=' + customerid;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
//CustomerDelete
exports.CustomerDelete = function(CustomerID, callback) {
    console.log(CustomerID);
    var query = 'DELETE from CUSTOMER WHERE CustomerID=' + CustomerID;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
//TransactionDelete
exports.TransactionDelete = function(TransactionID, callback) {
    console.log(TransactionID);
    var query = 'DELETE from TRANSACTION WHERE TransactionID=' + TransactionID;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
}
exports.Insert = function(student_info, callback) {
    console.log(student_info);
    var query = 'INSERT INTO Student (Name, Major, Location) VALUES (\'' + student_info.name + '\', \'' + student_info.major + '\', \'' + student_info.location + '\')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}

//Dealer Insert
exports.DealerInsert = function(dealer_info, callback) {
    console.log(dealer_info);
    var query = 'INSERT INTO DEALER (DealerName) VALUES (\'' + dealer_info.DealerName + '\')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}
//DealerUpdate
exports.DealerUpdate = function(dealer_info, callback) {
    console.log(dealer_info);
    var query = 'UPDATE DEALER SET DealerName=' + dealer_info.DealerName + 'WHERE DealerID=' + dealer_info.DealerID + '\')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}


//DealerAddressInsert
exports.DealerAddressInsert = function(dealer_address_info, callback) {
    console.log(dealer_address_info);
    //console.log(dealer_info);
    var query = 'INSERT INTO DEALERADDRESS (DealerID, City, State, Zip) VALUES ('
        + dealer_address_info.DealerID + ','
        + '\'' + dealer_address_info.City + '\','
        + '\'' + dealer_address_info.State + '\','
        + dealer_address_info.Zip + ')';
    ;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}
//TransactionInsert
exports.TransactionInsert = function(transaction_info, callback) {
    console.log(transaction_info);
    //console.log(dealer_info);
    var query = 'INSERT INTO TRANSACTION (VehicleID,CustomerID ) VALUES ('
        + transaction_info.VehicleID + ','
        + transaction_info.CustomerID + ')';
    ;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}
//VehicleInsert
exports.VehicleInsert = function(vehicle_info, callback) {
    console.log(vehicle_info);
    var query = 'INSERT INTO VEHICLE (Make,Model,YEAR, PRICE) VALUES (\'' + vehicle_info.Make +
        '\', \'' + vehicle_info.Model +
        '\', +  \'' + vehicle_info.YEAR +
        '\', + \'' + vehicle_info.PRICE + '\')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}
//CustomerInsert
exports.CustomerInsert = function(customer_info, callback) {
    console.log(customer_info);
    var query = 'INSERT INTO CUSTOMER (FirstName,LastName) VALUES (\'' + customer_info.FirstName +
        '\', \'' + customer_info.LastName + '\')';
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return
            }
            callback(false, result);
        }
    );
}
