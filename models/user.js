var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {type: String, required: true},
	username: {type: String, required: true},
	password: {type: String, required: true},
	bio: String
});

var User = module.exports = mongoose.model('users', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        User.create(newUser, callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}