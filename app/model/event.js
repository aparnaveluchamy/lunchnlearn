var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	name : {type: String, required: true},
	time: {type : Date},
	duration : {type: Number},
	keys : {type : Array},
	location : {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required : true
    }
	},
	{collection: 'event'}
);


module.exports = mongoose.model('Event' , EventSchema);