'use strict';
 
angular.module('myApp.welcome', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])
 
.controller('WelcomeCtrl', ['$scope','CommonProp',function($scope,CommonProp) {
	var firebaseObj = new Firebase("https://incandescent-inferno-7635.firebaseio.com/Articles");
	var sync = $firebase(firebaseObj);

	$scope.articles = sync.$asArray();
 	$scope.username = CommonProp.getUser();
}]);