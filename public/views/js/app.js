var app = angular.module('lunchnlearn', ['ngRoute']);

app.config(function($routeProvider){
$routeProvider
		//the timeline display
		.when('/home', {
			templateUrl: 'events.html',
			controller: 'eventController'
		})
		.when('/event', {
			templateUrl : 'event.html',
			controller : 'eventController'
		})
		//the login display
		.when('/', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'authController'
		})
		.when('/location', {
			templateUrl : 'location.html',
			controller : 'eventController'
		});
});

app.factory('userService', function($http){
	var userFactory = {};

	userFactory.login = function(email, password) {

		return $http.post('/api/login', {
			email: email,
			password: password
		});
	};

	userFactory.create = function(userData) {
		return $http.post('/api/signup', userData);
	};

	return userFactory;

});

app.factory('eventService', function($http)
{
	var factory = {};
	factory.getAll = function(){
		return $http.get('/api/events');
	};

	factory.create = function(newEvent) {
		return $http.post('/api/event', newEvent);
	};

	factory.get = function(location){
		return $http.get('/api/events/' + location);
	};

	return factory;

});

app.factory('locationService', function($http){

	var factory = {};
	factory.getAll = function(){
		var result = $http.get('/api/locations');
		console.log(result.data);
		return result;
	};

	factory.add = function(loc){
		var result = $http.post('/api/location', loc);
		console.log(result);
		return result;
	};

	factory.get = function(name){
		var result = $http.get('/api/location/' + name);
		console.log(result);
		return result;
	};

	return factory;

});

app.controller('authController', function($scope, $location, userService, locationService){
	$scope.login = function(){
		userService.login($scope.login.email, $scope.login.password).success(function(data){
			if(data.error){
				alert(data.error);
			}
			else {
				$location.path('/home');
			}
		});
	};

	$scope.register = function(){
		locationService.get($scope.locationName).success(function(data){
			$scope.register.user.location = data.id;
			userService.create($scope.register.user).success(function(message){
				if(message.error){
					alert("Registration Unsuccessful. Please try again!");
				}
				else {	
				alert("Thank you for registering!");
				$location.path('/');
			}
			});
		});
	};

	locationService.getAll().success(function(locations){		
		$scope.locNames = [];
		locations.forEach(function(obj){
			$scope.locNames.push(obj.name);
		});
	});
});

app.controller('eventController', function($scope, $location, eventService, locationService){

	$scope.events = [];

	eventService.getAll().success(function(data){

		$scope.events = data;

	});

	locationService.getAll().success(function(locations){
		//console.log(locations);
		$scope.locNames = [];
		locations.forEach(function(obj){
			$scope.locNames.push(obj.name);
		});
	});

	$scope.addEvent = function(){
		
		$scope.newEvent.time = new Date($scope.eventTime.year, $scope.eventTime.month, $scope.eventTime.day,
											 $scope.eventTime.hour, $scope.eventTime.minute, 0, 0);

		if ($scope.newEvent.time < new Date()){
			alert("Event cannot be in the past!");
		}
		else {
		console.log($scope.newEvent.time);
		locationService.get($scope.locationName).success(function(data){
			$scope.newEvent.location = data.id;
			eventService.create($scope.newEvent);
			$scope.events.push($scope.newEvent);
			console.log($scope.newEvent);
			$location.path('/home');
		});
		}
	};

	$scope.updateEvents = function(){
		locationService.get($scope.locationSelected).success(function(data){
			if(data.id){
				eventService.get(data.id).success(function(data){
					$scope.events = data;
				});
			}
		});
	}

	$scope.addLocation = function(){
		locationService.add($scope.newLocation);
		$scope.locNames.push($scope.newLocation.name);
		 $location.path('/event');
	}


});







