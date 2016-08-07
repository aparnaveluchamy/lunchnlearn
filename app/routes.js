var Location = require('./model/location.js');
var User = require('./model/user');
var Event = require('./model/event');
var express = require('express');
	
	var router = express.Router();

	router.post('/signup', function(req, res) {
		var user = new User({
			firstName: req.body.firstName,
			lastName : req.body.lastName,
			password : req.body.password,
			email : req.body.email,
			/*location : {
				name : req.body.locationName,
				addressStreet : req.body.locationAddressStreet,
				addressCity : req.body.locationAddressCity,
				addressState : req.body.locationAddressState,
				addressZip : req.body.locationAddressZip
			}*/
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

	router.post('/login', function(req, res) {

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

	router.get('/events', function(req, res) {
		
		Event.find({}).exec(function(err, events) 
		{
			if (err) throw err;

			res.json(events);
		});

	});

	router.post('/event', function(req, res) {
		console.log("Got name as " + req.body.name);
		var event = new Event({
			name : req.body.name,
			date: req.body.date,
			duration : req.body.duration,
			keys : req.body.keys,
			/*location : {
				name : req.body.locationName,
				addressStreet : req.body.locationAddressStreet,
				addressCity : req.body.locationAddressCity,
				addressState : req.body.locationAddressState,
				addressZip : req.body.locationAddressZip
		}*/
		});

		event.save(function(err, save) {
			if(err){
				res.json({error:err});
			}
			else {
				console.log('Event created');
				res.status(201);
				res.json(event);
			}
		});

	});

	router.get('/location/:name', function(req, res){

		Location.find({name: req.param.name}).exec(function(err, location){
			if (err) {
				res.json({error:err});
			}
			res.json(location);
		});
	});

	router.post('/location', function(req, res)
	{
		var loc = new Location({
				name : req.body.locationName,
				addressStreet : req.body.locationAddressStreet,
				addressCity : req.body.locationAddressCity,
				addressState : req.body.locationAddressState,
				addressZip : req.body.locationAddressZip
		});

		loc.save(function(err, save) {
			if(err) {
				res.json({error:err});
			}
			else {
				console.log("New location added");
				res.status(201);
				res.json(loc);
			}
		});
	});

	router.get('/locations', function(req, res)
	{
		Location.find({}).exec(function(err, locations) 
		{
			if (err) {
				res.json({error:err});
			}
			res.json(locations);
		});			
	});

module.exports = router;