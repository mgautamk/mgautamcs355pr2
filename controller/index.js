var express = require('express');
var router = express.Router();

// Example 1: Return the home page
router.get('/', function(req, res){
    res.render('template_example');
});


//More Information
router.get('/about', function(req, res){
    res.render('template_about');

});



module.exports = router;

