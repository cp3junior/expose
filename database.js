var mongoose = require('mongoose');
var cred = require('./credentials');
var dbUser = cred.c.dbUser;
var dbPass = cred.c.dbPass;

// mongoose.connect('mongodb://'+dbUser+':'+dbPass+'@ds157667.mlab.com:57667/exposedb');
mongoose.connect('mongodb://'+dbUser+':'+dbPass+'@ds050559.mlab.com:50559/expose');

//mongodb://<dbuser>:<dbpassword>@ds157667.mlab.com:57667/exposedb

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('Database connected');
});

var schemaTodo = mongoose.Schema({
	title: String,
	note: String
});

var todoModel = mongoose.model('todo_colection', schemaTodo);

module.exports = todoModel;


  

