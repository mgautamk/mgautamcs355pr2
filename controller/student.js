var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all students in a <table> */
router.get('/all', function (req, res) {
    db.GetAll(function (err, result) {
            if (err) throw err;
            res.render('displayStudentsTable.ejs', {rs: result});
        }
    );
});


/* View a single students information */
router.get('/', function (req, res) {
    if(req.query.studentid == null) {
        res.redirect('/student/all');
    }
    else {
        db.GetByID(req.query.studentid, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayStudentInfo.ejs', {rs: result, studentid: req.query.studentid});
            }
        );
    }
});

// Create Student Form
router.get('/create', function(req, res){
    res.render('createStudentForm.ejs', {action: '/student/create'});
});

// Save Student information
router.post('/create', function (req, res) {
    db.Insert( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result.insertId !== 'undefined') {
                db.GetByID(result.insertId, function(err, result){

                    res.render('displayStudentInfoSnippet.ejs', {rs: result, studentid: result.insertId});

                });
            }
            else {
                res.send('Student was not inserted.');
            }
        }
    );
});

/* View all users in a drop down menu */
router.get('/dropdown', function (req, res) {
    db.GetAllView(function (err, result) {
            if (err) throw err;
            res.render('displayStudentDropDown.ejs', {rs: result});
        }
    );
});

module.exports = router;

