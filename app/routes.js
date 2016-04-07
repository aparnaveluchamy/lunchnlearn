var User = require('./model/user.js');
var express = require('express');

module.exports.addAPIRouter = function(app, mongoose){
	
	var router = express.Router();

	app.post('/signup', function(req, res, next) {
		var user = new User({
			firstName: req.body.firstName,
			lastName : req.body.lastName,
			password : req.body.password,
			email : req.body.email,
			location : {
				name : req.body.locationName,
				addressStreet : req.body.locationAddressStreet,
				addressCity : req.body.locationAddressCity,
				addressState : req.body.locationAddressState,
				addressZip : req.body.locationAddressZip
			}
		});

		user.save(function(err, save) {
			if(err){
				res.json({error:err});
			}
			else {
				console.log('User created');
				res.status(201);
				res.json(user);
			}
		});
	});

	app.post('/login', function(req, res, next) {

		User.findOne({email:req.body.email})
		.exec(function(err, user) {
			if (err) throw err;

			if(!user) {
				res.send({error:"User does not exist."});
			} else {
				if (req.body.password === user.password){
					res.json({
						success : true,
						message: "Login Success!"
					});
				}
				else {
					res.send({error: "Login failed. Please try again"});
				}
			}
		});
	});

	app.get('/locations', function(req, res, next) {
		
		User.find({}).distinct('location', function(err, locations) {

			res.send(locations);
		});

	});

	app.get('/findmentors', function(req, res, next) {
		//find other users with skills that the current user is interested in
		User.find({});
	});

	

}