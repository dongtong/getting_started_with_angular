var flightApp = angular.module('flightApp', []);
flightApp.controller('flightApp.FirstController', ['$scope', '$interval', function($scope, $interval){
	//The reason is that two-way binding in angular uses dirty checking. 
	//This is a good article to read about angular's dirty checking. 
	//$scope.$apply() kicks off a $digest cycle. 
	//This will apply the binding. $timeout handles the $apply for you so it is the recommended service to use when using timeouts.
	$scope.today = Date.now();
	// setInterval(function(){
	// 	$scope.today = Date.now();
	// 	$scope.$apply(); 
	// }, 1000);
  $interval(function(){
    $scope.today = Date.now();
  },1000);
  $scope.airports = {
  	"PDX": {
      "code": "PDX",
      "name": "Portland International Airport",
      "city": "Portland",
      "destinations": ["LAX","SFO"]
    },
    "STL": {
      "code": "STL",
      "name": "Lambert-St. Louis International Airport",
      "city": "St. Louis",
      "destinations": ["LAX","MKE"]
    },
    "MCI": {
      "code": "MCI",
      "name": "Kansas City International Airport",
      "city": "Kansas City",
      "destinations": ["LAX","DFW"]
    }
  };

  $scope.isCapitalized = function(str){
		return str[0] == str[0].toUpperCase();
  }

  $scope.currentAirport = $scope.airports["PDX"];
  $scope.setAirport = function(code){
  	$scope.currentAirport = $scope.airports[code];
  }

}]);