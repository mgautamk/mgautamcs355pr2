/**
 * Created by mgautam on 5/10/2015.
 */
var express = require('express');
var router  = express.Router();
var db   = require('../models/db');


/* View all Vehicles in a <table> */
router.get('/all', function (req, res) {
    db.GetAllVehicle(function (err, result) {
            if (err) throw err;
            res.render('displayVehicleTable.ejs', {rs: result});
        }
    );
});


/* View a single vehicles information */
router.get('/', function (req, res) {
    if(req.query.VehicleID == null) {
        res.redirect('/vehicle/all');
    }
    else {
        db.GetByVehicleID(req.query.VehicleID, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayVehicleInfo.ejs', {rs: result, VehicleID: req.query.VehicleID});
            }
        );
    }
});


/* View a single vehicles information */
router.post('/', function (req, res) {
    if(req.body.VehicleID == null) {
        res.send("The vehicleid parameter was not provided")
    }
    else {
        db.GetByVehicleID(req.body.VehicleID, function (err, result) {
                if (err) throw err;

                // Send result to the template along with the original student id in case there were no results
                res.render('displayVehicleInfoSnippet.ejs', {rs: result, VehicleID: req.body.VehicleID});
            }
        );
    }
});

// Create Vehicle Form
router.get('/create', function(req, res){
    res.render('createVehicleForm.ejs', {action: '/vehicle/create'});
});

// Save Vehicle information
router.post('/create', function (req, res) {
    db.VehicleInsert( req.body, function (err, result) {
            if (err) {
                throw err;
            }
            console.log(result);

            if(typeof result.insertId !== 'undefined') {
                db.GetByVehicleID(result.insertId, function(err, result){

                    res.render('displayVehicleInfoSnippet.ejs', {rs: result, VehicleID: result.VehicleID});

                });
            }
            else {
                res.send('Vehicle was not inserted.');
            }
        }
    );
});

//Delete
router.get('/delete', function (req, res) {
    console.log(req.query.VehicleID);
    if(req.query.VehicleID == null) {
        res.send('null');
    }
    else {
        db.VehicleDelete(req.query.VehicleID, function (err, result) {
            if (err) throw err;
            res.redirect('/vehicle/all');
        });
    }
});
module.exports = router;

