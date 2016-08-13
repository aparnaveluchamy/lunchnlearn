var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	fullName : {type: String},
	email : {
		type: String,
		required : true,
		unique : true
	},
	password : {type : String},
	location : { 
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required : true
    }
	},
	{collection: 'user'}
);

UserSchema.index({email:1}, {unique:true});

UserSchema.pre('save', function(next) {

	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.hash(user.password, null, null, function(err, hash) {
		if(err) return next(err);

		user.password = hash;
		next();

	});
});

UserSchema.methods.comparePassword = function(password) {

	var user = this;
	console.log(user.password);

	return bcrypt.compareSync(password, user.password);
}

module.exports = mongoose.model('User' , UserSchema);