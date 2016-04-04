var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config.js');
var routes = require('./app/routes.js');

var app = express();

mongoose.connect(config.database, function(err){
	if(err){
		console.log(err);
	} else {
		console.log('Connected to the database');
	}
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended : true}));

routes.addAPIRouter(app, mongoose);

app.listen(config.port, function(err){
	if(err) {
		console.log(err);
	}
	else {
		console.log("Listening on port 3000");
	}
});

