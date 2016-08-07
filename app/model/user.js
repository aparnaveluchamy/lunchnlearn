var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	firstName : {type: String},
	lastName : {type : String},
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

module.exports = mongoose.model('User' , UserSchema);