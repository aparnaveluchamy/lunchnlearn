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
	interests : {type : Array},
	skills : [String],
	mentorIds : {type: String},
	menteeIds : {type : String},
	location : {
		name: { type : String, required :true},
		addressStreet : {type : String, required : true},
		addressCity : {type : String, required : true},
		addressState: {type : String, required : true},
		addressZip : {type : String, required : true}
		}
	},
	{collection: 'user'}
);

UserSchema.index({email:1}, {unique:true});

module.exports = mongoose.model('User' , UserSchema);