// import libraries
var express = require('express'),
    ejs     = require('ejs'),
    bodyParser = require('body-parser');

// import routes
var routes = require('./controller/index');
var dealer_route = require('./controller/dealer');
var dealeradd_route = require('./controller/dealeraddress');
var vehicle_route  = require('./controller/vehicle');
var customer_route  = require('./controller/customer');
var transaction_route  = require('./controller/transaction');


// initialize express web application framework
// http://expressjs.com/
var app = express();

// allow json data to be parsed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


//configure template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// example of a global variable that can be passed to a template
app.set('subtitle', 'Lab 18');

//configure routes
app.use('/', routes);
app.use('/dealer', dealer_route);
app.use('/dealeraddress', dealeradd_route);
app.use('/vehicle', vehicle_route);
app.use('/customer', customer_route);
app.use('/transaction', transaction_route);
// configure static directory for javascript, css, etc.
app.use(express.static('public'));

app.set('port', 3080);  //use your own port
app.listen(app.get('port'));
console.log("Express server listening on port", app.get('port'));