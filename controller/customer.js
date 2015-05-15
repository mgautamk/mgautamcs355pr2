/**
 * Created by mgautam on 5/10/2015.
 */
var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all Vehicles in a <table> */
router.get('/all', function (req, res) {
    db.GetAllCustomer(function (err, result) {
            if (err) throw err;
            res.render('displayCustomerTable.ejs', {rs: result});
        }
    );
});


/* View a single vehicles information */
router.get('/', function (req, res) {
    if(req.query.CustomerID == null) {
        res.redirect('/customer/all');
    }
    else {
        db.GetByCustomerID(req.query.CustomerID, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayCustomerInfo.ejs', {rs: result, CustomerID: req.query.CustomerID});
            }
        );
    }
});


/* View a single vehicles information */
router.post('/', function (req, res) {
    if(req.body.VehicleID == null) {
        res.send("The customerid parameter was not provided")
    }
    else {
        db.GetByCustomerID(req.body.CustomerID, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayCustomerInfoSnippet.ejs', {rs: result, CustomerID: req.body.CustomerID});
            }
        );
    }
});

// Create Customer Form
router.get('/create', function(req, res){
    res.render('createCustomerForm.ejs', {action: '/customer/create'});
});

// Save Customers information
router.post('/create', function (req, res) {
    db.CustomerInsert( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result.insertId !== 'undefined') {
                db.GetByCustomerID(result.insertId, function(err, result){

                    res.render('displayCustomerInfoSnippet.ejs', {rs: result, CustomerID: result.CustomerID});

                });
            }
            else {
                res.send('Customer was not inserted.');
            }
        }
    );
});

//Delete
router.get('/delete', function (req, res) {
    console.log(req.query.CustomerID);
    if(req.query.CustomerID == null) {
        res.send('null');
    }
    else {
        db.CustomerDelete(req.query.CustomerID, function (err, result) {
            if (err) throw err;
            res.redirect('/customer/all');
        });
    }
});

module.exports = router;


