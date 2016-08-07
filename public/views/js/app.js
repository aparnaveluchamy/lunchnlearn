var app = angular.module('lunchnlearn', ['ngRoute']);

app.config(function($routeProvider){
$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'events.html',
			controller: 'eventController'
		})
		//the login display
		.when('/login', {
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

app.controller('authController', function($scope){
	$scope.login = function()
	{
		$scope.login_error = 'login request for ' + $scope.login.username;
		//$scope.login.password
	};
	$scope.register = function()
	{
		$scope.register_error = $scope.register.username;
		//$scope.register.password
	}
});

app.controller('eventController', function($scope, eventService, locationService){

	$scope.events = [];

	eventService.getAll().success(function(data){

		$scope.events = data;

	});

	locationService.getAll().success(function(locations){
		console.log(locations);
		$scope.locNames = [];
		locations.forEach(function(obj){
			$scope.locNames.push(obj.name);
		});
	});

	$scope.addEvent = function(){
		
		eventService.create($scope.newEvent);
	};

	$scope.addLocation = function(){
		locationService.add($scope.newLocation);
	}


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

	return factory;

});

app.factory('locationService', function($http){

	var factory = {};
	factory.getAll = function(){
		return $http.get('/api/locations');
	};

	factory.add = function(loc){
		return $http.post('/api/location', loc);
	};

	return factory;

});

