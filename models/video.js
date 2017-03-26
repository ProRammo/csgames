var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var Schema = mongoose.Schema;

var VideoSchema = new Schema({
	link: {type: String, required: true},
	name: {type: String, required: true},
	UID: Number,
	description: String,
	likes: Number,
	dislikes: Number,
	comments: Array
});

var Video = module.exports = mongoose.model('videos', VideoSchema);
