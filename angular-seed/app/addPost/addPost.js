'use strict';
 
angular.module('myApp.addPost', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addPost', {
        templateUrl: 'addPost/addPost.html',
        controller: 'AddPostCtrl'
    });
}])
 
.controller('AddPostCtrl', ['$scope','CommonProp','$firebase',function($scope,CommonProp,$firebase) {
	var firebaseObj = new Firebase("https://incandescent-inferno-7635.firebaseio.com/Articles");
	var fb = $firebase(firebaseObj);
	
 	$scope.AddPost = function() {
    var title = $scope.article.title;
	var post = $scope.article.post;    
      // Add Post logic will be here
      fb.$push({
    title: title,
    post: post,
    emailId: CommonProp.getUser()
}).then(function(ref) {
    console.log(ref);
    $location.path('/welcome');
}, function(error) {
    console.log("Error:", error);
});
   
    	}
}]);