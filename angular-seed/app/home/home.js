'use strict';
 
angular.module('myApp.home', ['ngRoute','firebase'])
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

// Home controller
.controller('HomeCtrl',['$scope','$location','CommonProp','$firebaseAuth',function($scope,$location,CommonProp,$firebaseAuth) {

	var firebaseObj = new Firebase("https://incandescent-inferno-7635.firebaseio.com"); 
    var loginObj = $firebaseAuth(firebaseObj); 
  	$scope.user = {};
 	$scope.SignIn = function(e) {
 	e.preventDefault();  // To prevent form refresh
    var username = $scope.user.email;
    var password = $scope.user.password;

        loginObj.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            //On success callback
            console.log('Username and password found');
            $location.path('/welcome');
            CommonProp.setUser(user.password.email);
        }, function(error) {
            //On Failure callback
            console.log('Username and password not found');
        });
	}

}])
.service('CommonProp', function() {
    var user = '';
 
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
});