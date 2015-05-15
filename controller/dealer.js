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


/* View a single dealers information */
router.get('/', function (req, res) {
    console.log(req.query.dealerid);
    if(req.query.dealerid == null) {
        res.redirect('/dealer/all');
    }
    else {
        db.GetByDealerID(req.query.dealerid, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original dealer id in case there were no results
                res.render('displayDealerInfo.ejs', {rs: result, dealerid: req.query.dealerid});
            }
        );
    }
});

// Create Dealer Form ,
router.get('/create', function(req, res){
    res.render('createDealerForm.ejs', {action: '/dealer/create'});
});

// Save Dealers information
router.post('/create', function (req, res) {
    console.log(req.body.dealerid);
    db.DealerInsert( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result.insertId !== 'undefined') {
                db.GetByDealerID(result.insertId, function(err, result){

                    res.render('displayDealerInfoSnippet.ejs', {rs: result, dealerid: result.insertId});

                });
            }
            else {
                res.send('Dealer was not inserted.');
            }
        }
    );
});

//EDIT
// Create Dealer Edit Form ,
router.get('/edit', function(req, res){
    console.log(req.query.dealerid);
    res.render('editDealerForm.ejs', {rs: res, action: '/dealer/edit'});
});

// Save Dealers information
router.post('/edit/', function (req, res) {
    console.log(req.body.dealerid);
    db.DealerUpdate( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result.insertId !== 'undefined') {
                db.GetByDealerID(result.insertId, function(err, result){

                    res.render('displayDealerInfoSnippet.ejs', {rs: result, dealerid: result.insertId});

                });
            }
            else {
                res.send('Dealer was not updated');
            }
        }
    );
});


//Delete
router.get('/delete/', function (req, res) {
    console.log(req.query.dealerid);
    if(req.query.dealerid == null) {
        res.redirect('/dealer/all');
    }
    else {
        db.DealerDelete(req.query.dealerid, function (err, result) {
            if (err) throw err;
            res.redirect('/dealer/all');
        });
    }
});


module.exports = router;


