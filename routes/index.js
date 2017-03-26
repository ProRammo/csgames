var express = require('express');
var router = express.Router();
var Video = require('../models/video');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
	res.render('home', {data: req.data});
});

router.get('/addvid', function(req, res, next){

	let newVid = {link: '/images/vid.mp4', name: 'video 2', UID: 2}

	Video.create(newVid, function(err, vid){
		res.redirect('/');
	});

})

router.get('/videos', ensureAuthenticatedVideos, function(req, res, next){

	Video.find({})
			.exec(function(err, data){
				res.render('videos', {videos: data});
			});

})

router.get('/:ID', function(req, res, next) {

	Video.findOne({UID: req.params.ID})
		.exec(function(err, vid){
			res.render('video-page', {video: vid});
		});

});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}
function ensureAuthenticatedVideos(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
