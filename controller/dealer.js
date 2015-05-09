/**
 * Created by Mahesh on 5/4/2015.
 */
var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all dealers in a <table> */
router.get('/all', function (req, res) {
    db.GetAllDealer(function (err, result) {
            if (err) throw err;
            res.render('DisplayDealerTable.ejs', {rs: result});
        }
    );
});


/* View a single students information */
router.get('/', function (req, res) {
    if(req.query.DealerID == null) {
        res.redirect('/dealer/all');
    }
    else {
        db.GetByDealerID(req.query.dealerid, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayDealerInfo.ejs', {rs: result, dealerid: req.query.dealerid});
            }
        );
    }
});

// Create Student Form , to do convert to Dealer create
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


