var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cred = require('./credentials');
var database = require('./database');
var router = require('./routes');

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api',router);

app.get('/', function(req, res) {
	// console.log('redirectin to /api');
	res.send('Hello World');  
});

//404 page redirection
// app.use(function(req,res,next){
// 	console.log('404 not found, redirection to root');
// 	res.redirect('/api');  
// 	next();
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


