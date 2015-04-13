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

exports.GetAllView = function(callback) {
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