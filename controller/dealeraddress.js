/**
 * Created by mgautam on 5/9/2015.
 */

var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all dealers address in a <table> */
router.get('/all', function (req, res) {
    db.GetAllDealerAddress(function (err, result) {
            if (err) throw err;
            res.render('DisplayDealerAddressTable.ejs', {rs: result});
        }
    );
});

/* View a single dealers address information */
router.get('/', function (req, res) {
    console.log(req.query.DealerID)
    if(req.query.DealerID == null) {
        res.redirect('/dealeraddress/all');
    }
    else {
        db.GetByDealerAddressID(req.query.DealerID, function (err, result) {   //GetByDealerAddressID is for more Info
                if (err) throw err;

                // Send result to the template along with the original dealer id in case there were no results
                res.render('displayDealerAddressInfo.ejs', {rs: result, DealerID: req.query.DealerID});
            }
        );
    }
});
/* View a single dealers address information */
router.post('/', function (req, res) {
    if(req.body.DealerID == null) {
        res.send("The dealerid parameter was not provided")
    }
    else {
        db.GetByDealerAddressID(req.body.DealerID, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayDealerAddressInfoSnippet.ejs', {rs: result, DealerID: req.body.DealerID});
            }
        );
    }
});

// Create Dealer Address Form ,
router.get('/create', function(req, res) {
    console.log(req.query);
    db.GetAllDealer(function (err, result) {
        res.render('createDealerAddressForm.ejs', {rsDealers: result, action: '/dealeraddress/create'});
    });
});


//Save Dealers Address
router.post('/create', function (req, res) {
    console.log("inserted function");
    db.DealerAddressInsert( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
            if(typeof req.body !== 'undefined') {
                console.log(req.body);
                db.GetByDealerAddressID(req.body.DealerID, function (err, result) {
                        if (err) throw err;
                        // Send result to the template along with the original student id in case there were no results
                        res.render('displayDealerAddressInfoSnippet.ejs', {addressrs: result, DealerID: req.body.DealerID});
                    }
                );
            }
            else {
                res.send('Address for Dealer was not Inserted.');
            }
        }
    );
});

//Delete
router.get('/delete', function (req, res) {
    console.log(req.query.DealerID);
    if(req.query.DealerID == null) {
        res.send('null');
    }
    else {
        db.DealerAddressDelete(req.query.DealerID, function (err, result) {
            if (err) throw err;
            res.redirect('/dealeraddress/all');
        });
    }
});

module.exports = router;

