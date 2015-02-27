var flightApp = angular.module('flightApp', []);
flightApp.controller('flightApp.FirstController', function($scope){
  $scope.airports = [{
      "code": "PDX",
      "name": "Portland International Airport",
      "city": "Portland",
      "destinations": ["LAX","SFO"]
    },{
      "code": "STL",
      "name": "Lambert-St. Louis International Airport",
      "city": "St. Louis",
      "destinations": ["LAX","MKE"]
    },{
      "code": "MCI",
      "name": "Kansas City International Airport",
      "city": "Kansas City",
      "destinations": ["LAX","DFW"]
    }];

});