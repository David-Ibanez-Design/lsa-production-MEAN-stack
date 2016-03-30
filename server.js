// server.js

// modules =================================================
alert('eeeeeee')
var express			= require('express');
var mongoose		= require('mongoose');
var bodyParser		= require('body-parser');
var app				= express();
var methodOverride	= require('method-override');
var router = express.Router();

// configuration ===========================================


// config files
//var db = require('./config/db');
//"mongodb://<user>:<password>@paulo.mongohq.com:10095/mean-on-heroku",
// set our port
var port = process.env.PORT || 3000;

// connect to our mongoDB database
// mongoose.connect(db.url);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://david:Roses38100@ds011860.mlab.com:11860/heroku_8dzkshdf');

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

//set up router


// middleware to use for all requests
// router.use(function(req, res, next) {
//     // do logging
//     console.log('Something is happening.');
//     next(); // make sure we go to the next routes and don't stop here
// });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
// router.get('/', function(req, res) {
//     res.json({ message: 'hooray! welcome to our api!' });
// });

// routes ================================================== // charger les routes public à la fin

require('./app/routes/panier')(app);
require('./app/routes/clients')(app);
require('./app/routes/avoirs')(app);
require('./app/routes/stocks')(app);
require('./app/routes/commandes')(app);
require('./app/routes/factures')(app);
require('./app/routes/notifications')(app);
require('./app/routes/produits')(app);
require('./app/routes/user-login')(app);


require('./app/routes/public-routes')(app);

// start app ===============================================

// startup our app at http://localhost:8080
app.listen(port);


// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
