var mongoose = require('mongoose');
var cred = require('./credentials');
var dbUser = cred.c.dbUser;
var dbPass = cred.c.dbPass;

mongoose.connect('mongodb://'+dbUser+':'+dbPass+'@ds050559.mlab.com:50559/expose');

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


  

