var Location = require('./model/location.js');
var User = require('./model/user');
var Event = require('./model/event');
var mongoose = require('mongoose');
var express = require('express');
	
	var router = express.Router();

	router.post('/signup', function(req, res) {		
		var user = new User({
			fullName: req.body.fullName,
			password : req.body.password,
			email : req.body.email,
			location : req.body.location
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
				var validPassword = user.comparePassword(req.body.password);

				if(!validPassword) {
					res.send({ error: "Invalid Password"});
				} else {
					res.json({
						success : true,
						message: "Login Success!"
					});
				}
			}
		});
	});

	router.get('/events', function(req, res) {
		
		Event.find({time :{$gt:new Date()}}).exec(function(err, events) 
		{
			if (err) {
				console.log(err);
				res.json({error:err});
			}
			res.json(events);
		});

	});

	router.get('/events/:locationId', function(req, res){
		Event.find({location : req.params.locationId, time :{$gt:new Date()}}).exec(function(err, events){
			if(err) throw err;

			res.json(events);
		});
	});

	router.post('/event', function(req, res) {
		console.log("Got time as " + req.body.time);
		var event = new Event({
			name : req.body.name,
			time: req.body.time,
			duration : req.body.duration,
			keys : req.body.keys,
			location : req.body.location,
		});

		event.save(function(err, save) {
			if(err){
				console.log(err);
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
		var locName = req.params.name;
		//console.log(locName.trim());
		locName = locName.trim();
		Location.findOne({name: locName}).exec(function(err, location){
			if (err) {
				res.json({error:err});
			}
			if(location){
			//console.log(location._id);
			res.json({id: mongoose.Types.ObjectId(location._id)});
		}
		else{
			res.json({error:"location is null"});
		}
		});
	});

	router.post('/location', function(req, res)
	{
		var loc = new Location({
				name : req.body.name,
				addressStreet : req.body.addressStreet,
				addressCity : req.body.addressCity,
				addressState : req.body.addressState,
				addressZip : req.body.addressZip
		});
		console.log(loc);
		loc.save(function(err, save) {
			if(err) {
				console.log(err);
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