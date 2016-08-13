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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(express.static(__dirname + '/public/views/'));

app.use('/api', routes);

app.listen(config.port, function(err){
	if(err) {
		console.log(err);
	}
	else {
		console.log("Listening on port 3000");
	}
});

