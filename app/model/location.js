var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({

	name: { type : String, required :true},
	addressStreet : {type : String, required : true},
	addressCity : {type : String, required : true},
	addressState: {type : String, required : true},
	addressZip : {type : String, required : true}
},
{collection: 'location'}
);

LocationSchema.index({name:1}, {unique:true});

module.exports = mongoose.model('Location' , LocationSchema);