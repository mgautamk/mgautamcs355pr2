/**
 * Created by mgautam on 5/9/2015.
 */

var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all transactions in a <table> */
router.get('/all', function (req, res) {
    db.GetAllTransaction(function (err, result) {
            if (err) throw err;
            res.render('DisplayTransactionTable.ejs', {rs: result});
        }
    );
});

/* View a single transaction information */
router.get('/', function (req, res) {
    console.log(req.query.TransactionID)
    if(req.query.TransactionID == null) {
        res.redirect('/transaction/all');
    }
    else {
        db.GetByTransactionID(req.query.TransactionID, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original transaction id in case there were no results
                res.render('displayTransactionInfo.ejs', {rstran: result, TransactionID: req.query.TransactionID});
            }
        );
    }
});

/* View a single Transaction information */
router.post('/', function (req, res) {
    if(req.body.DealerID == null) {
        res.send("The transaction parameter was not provided")
    }
    else {
        db.GetByTransactionID(req.body.DealerID, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayTransactionInfoSnippet.ejs', {rs: result, DealerID: req.body.DealerID});
            }
        );
    }
});

// Create Dealer Transaction Form ,
router.get('/create', function(req, res){
    console.log(req.query);
    db.GetAllVehicle(function (err, resultvehicle) {
        if (err) throw err;
        db.GetAllCustomer(function (err, resultcustomers) {
            if (err) throw err;
            res.render('createTransactionForm.ejs', {rsvehicle: resultvehicle, rscustomer: resultcustomers, action: '/transaction/create'});
        });
    });
});

//
router.post('/create', function (req, res) {
    console.log("inserted function");
    db.TransactionInsert( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
            if(typeof req.body !== 'undefined') {
                console.log(req.body);
                db.GetByTransactionID(result.insertId, function(err, result){
                    console.log(result);
                    res.render('DisplayTransactionInfoSnippet.ejs', {rs: result, TransactionID: result.insertId});
                });
            }
            else {
                res.send('Movie Rating was not inserted.');
            }
        }
    );
});

//Delete
router.get('/delete', function (req, res) {
    console.log(req.query.TransactionID);
    if(req.query.TransactionID == null) {
        res.send('null');
    }
    else {
        db.TransactionDelete(req.query.TransactionID, function (err, result) {
            if (err) throw err;
            res.redirect('/transaction/all');
        });
    }
});

module.exports = router;

