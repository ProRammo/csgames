var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {});
});

router.get('/login', function(req, res, next){
	res.render('login', {});
});

router.get('/register', function(req, res, next){
	res.render('register', {errors: []});
});

router.get('/:name', function(req, res, next) {
	res.render('index', {});
});

router.post('/register', function(req, res, next){

	let email = req.body.email;
	let username = req.body.username;
	let password = req.body.password;
	let password2 = req.body.password2;

	// Validation
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(password);

	let errors = req.validationErrors()

	if (req.validationErrors()) {
		console.log(errors);
		res.render('register', {errors: errors});
	}
	else {
		let newUser = {	email: email,
						username: username, 
						password: password };

		User.createUser(newUser, function(err, post){
			if (err) console.log(err);
		});

		req.flash('success_msg', 'You are registered and can now login');
		res.redirect('/users/login');

	}


});

passport.use(new LocalStrategy(function(username, password, done) {

	User.getUserByUsername(username, function(err, user){
		if(err) throw err;

		if(!user){
			return done(null, false, {message: 'Unknown User'});
		}

		User.comparePassword(password, user.password, function(err, isMatch){
			if(err) throw err;

			console.log("-== BEGINNING MATCH SEARCH ==-");

			if(isMatch){
				console.log("-== MATCH FOUND ==-");
				return done(null, user);
			}
			else {
				return done(null, false, {message: 'Invalid password'});
			}

		});

	});

}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err, user);
	});
});

router.post('/login',
  			passport.authenticate('local'),
  			function(req, res) {
  				console.log(res.data);
    			res.redirect('/');
  			});

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;




























