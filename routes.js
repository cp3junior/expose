var express = require('express');
var router = express.Router();
var todoModel = require('./database');
var cors = require('cors');


// app.del('/products/:id', cors(), function(req, res, next){
//   res.json({msg: 'This is CORS-enabled for all origins!'});
// });


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
router.options('/addtodo', cors()); // enable pre-flight request for DELETE request

router.post('/addtodo',cors(), function(req,res){
	var data = {
		title: req.body.title,
		note: req.body.note 
	};

	var db = new todoModel(data);
  	db.save(function(err,doc){
  		if(err){
  			res.json({err: 'An error occured'});
  		}else{
  			res.json(doc);
  		}
  	});	
});

//update note
router.put('/edittodo/:id_todo',function(req,res){
	var id = req.params.id_todo;
	var data = {
		title: req.body.title,
		note: req.body.note 
	};
	todoModel.findOneAndUpdate({ _id: id },data, function(err, resp){
		if (err){
			res.json({err: 'An error occured'});
			console.log(err);
		}else{
			res.json(resp);
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