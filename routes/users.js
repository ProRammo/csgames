var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {});
});

router.post('/login', function(req, res, next) {
	
	User.find({})
		.exec(function(err, data){
			res.render('index', {});
		})

});

router.post('/register', function(req, res, next){

	let newUser = {	username: req.body.username, 
					password: req.body.password };

	User.create(newUser, function(err, post){
		if (err) console.log(err);
		res.redirect('/');
	});

});

module.exports = router;
