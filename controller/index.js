var express = require('express');
var router = express.Router();

// Example 1: Return the home page
router.get('/', function(req, res){
    res.sendFile('index.html', {root: './public'});
});

// Example 2: Return the text Hello, World!.
router.get('/hello', function(req, res){
    res.send('Hello, World!');
});

//More Information
router.get('/moreinfo', function(req, res){
    res.send('Here you can get more Information about Car Dealership DataBase');

});

/* Example 3: A simple template example */
router.get('/template_example', function(req, res){
    // use render instead of send, to render a template instead of sending back a static file.
    res.render('template_example');
});

/* Example 1 - HTML Form w/o Ajax or Database Interaction */
router.get('/simpleForm', function(req, res){
    res.render('simpleform.ejs', {action: '/displayFormData'});
});

/* Example 1 - Display form data submitted above */
router.post('/displayFormData', function(req, res) {
    console.log(req.body);
    res.render('displayFormData.ejs', req.body );
});

module.exports = router;

