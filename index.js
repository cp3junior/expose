var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://cp3junior:cp3killerCROSS@ds050559.mlab.com:50559/expose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('database connected');
});

var schemaUser = mongoose.Schema({
	name: String,
	email: String
});
var userModel = mongoose.model('userModel', schemaUser);



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

var me = {
	name: "andrew",
	email: "r3andrew@gmail.com"
};

app.get('/', function(req, res) {
  //var data = new userModel(me);
  //data.save();

  // var out = {};

  userModel.find(function(err, resp){
  	if (err){
  		res.send(err);
  	}
  	res.json(resp);
  });

  
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


