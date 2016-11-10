var express = require('express');
var router = express.Router();
var todoModel = require('./database');

router.get('/',function(req,res){
	res.redirect('/api/gettodo'); 
});

//get all notes
router.get('/gettodo',function(req,res){
	todoModel.find(function(err, resp){
		if (err){
			res.json({err: 'An error occured'});
			console.log(err);
		}else{
			res.json(resp);
		}
	});
});

//get note by id
router.get('/gettodo/:id_todo',function(req,res){
	var id = req.params.id_todo;
	todoModel.findById({ _id: id }, function(err, resp){
		if (err){
			res.json({err: 'An error occured'});
			console.log(err);
		}else{
			res.json(resp);
		}
	});
});

//add note
router.post('/addtodo/:title/:note',function(req,res){
	console.log(req.params.title);
	var data = {
		title: req.params.title,
		note: req.params.note 
	};

	var db = new todoModel(data);
  	db.save(function(err){
  		if(err){
  			res.json({err: 'An error occured'});
			console.log(err);
  		}else{
  			res.json({message: 'Data saved successfuly'});
  		}
  	});
	
});

//update note
router.put('/edittodo/:id_todo/:title/:note',function(req,res){
	var id = req.params.id_todo;
	var data = {
		title: req.params.title,
		note: req.params.note 
	};
	todoModel.findOneAndUpdate({ _id: id },data, function(err, resp){
		if (err){
			res.json({err: 'An error occured'});
			console.log(err);
		}else{
			res.json({message: 'Data updated successfuly'});
		}
	});
});

//delete note
router.delete('/deletetodo/:id_todo',function(req,res){
	var id = req.params.id_todo;
	todoModel.remove({ _id: id }, function(err, resp){
		if (err){
			res.json({err: 'An error occured'});
			console.log(err);
		}else{
			res.json({message: 'Data deleted successfuly'});
		}
	});
	
});

module.exports = router;